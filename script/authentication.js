/**
 * UXCamp Vietnam — Firebase Authentication + Firestore Authorization
 * 
 * Luồng hoạt động:
 * 1. User click "Đăng nhập bằng Google" → Firebase Auth popup
 * 2. Sau khi đăng nhập → check email trong Firestore collection "authorized_users"
 * 3. Nếu authorized → hiện profile + role badge
 * 4. Nếu không → hiện thông báo chưa được cấp quyền
 * 
 * Firestore structure:
 *   authorized_users/{email} → { role: "admin" | "member", displayName: "..." }
 * 
 * ⚠️ SETUP: Thay firebaseConfig bên dưới bằng config từ Firebase Console của bạn.
 */

// ============================================================
// FIREBASE CONFIG — Thay bằng config thật từ Firebase Console
// ============================================================

const firebaseConfig = {
	apiKey: "AIzaSyC6KmQxFzAwI9RnIMtdUsMktQ0CCkM7z-E",
	authDomain: "uxcampvn.firebaseapp.com",
	projectId: "uxcampvn",
	storageBucket: "uxcampvn.firebasestorage.app",
	messagingSenderId: "491407083539",
	appId: "1:491407083539:web:8c1635c421989082a397e6",
	measurementId: "G-NLJWC0L47K"
};

// ============================================================
// INITIALIZATION
// ============================================================
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Force account selection every time (useful when multiple Google accounts)
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ============================================================
// DOM ELEMENTS
// ============================================================
const elements = {
	spinnerContainer: document.getElementById('auth-spinner-container'),
	spinner: document.getElementById('auth-spinner'),
	loginSection: document.getElementById('login-section'),
	btnGoogleSignIn: document.getElementById('btn-google-signin'),
	status: document.getElementById('auth-status'),
	statusText: document.getElementById('auth-status-text'),
	userProfile: document.getElementById('user-profile'),
	userAvatar: document.getElementById('user-avatar'),
	userName: document.getElementById('user-name'),
	userEmail: document.getElementById('user-email'),
	userRoleBadge: document.getElementById('user-role-badge'),
	btnSignOut: document.getElementById('btn-signout'),
	btnGoHome: document.getElementById('btn-go-home'),
};

// ============================================================
// UI HELPERS
// ============================================================

function showSpinner() {
	if (elements.spinnerContainer) elements.spinnerContainer.classList.add('visible');
	if (elements.spinner) elements.spinner.classList.add('visible');
}

function hideSpinner() {
	if (elements.spinnerContainer) elements.spinnerContainer.classList.remove('visible');
	if (elements.spinner) elements.spinner.classList.remove('visible');
}

function showLogin() {
	elements.loginSection.style.display = 'block';
	elements.userProfile.classList.remove('visible');
	hideStatus();
}

function hideLogin() {
	elements.loginSection.style.display = 'none';
}

/**
 * Show a status message
 * @param {string} message - The message text
 * @param {'success'|'error'|'warning'|'info'} type - Message type
 */
function showStatus(message, type = 'info') {
	elements.status.className = 'auth-status visible ' + type;
	elements.statusText.textContent = message;
}

function hideStatus() {
	elements.status.classList.remove('visible');
}

function showUserProfile(user, authData) {
	hideLogin();

	// Avatar
	if (user.photoURL) {
		elements.userAvatar.src = user.photoURL;
		elements.userAvatar.style.display = 'block';
	} else {
		elements.userAvatar.style.display = 'none';
	}

	// Name & email
	elements.userName.textContent = user.displayName || 'Người dùng';
	elements.userEmail.textContent = user.email;

	// Role badge
	if (authData && authData.role) {
		const roleLabels = {
			admin: 'Admin',
			member: 'Thành viên',
			instructor: 'Giảng viên',
			alumni: 'Alumni',
		};
		elements.userRoleBadge.textContent = roleLabels[authData.role] || authData.role;
		elements.userRoleBadge.className = 'user-role-badge ' + authData.role;
		elements.userRoleBadge.style.display = 'inline-flex';
	} else {
		elements.userRoleBadge.textContent = 'CHƯA ĐƯỢC CẤP QUYỀN';
		elements.userRoleBadge.className = 'user-role-badge unauthorized';
		elements.userRoleBadge.style.display = 'inline-flex';
	}

	elements.userProfile.classList.add('visible');
}

// ============================================================
// AUTHORIZATION CHECK (Firestore)
// ============================================================

/**
 * Check if the user's email exists in the authorized_users collection.
 * @param {string} email 
 * @returns {Promise<{authorized: boolean, data: object|null, error?: string}>}
 */
async function checkAuthorization(email) {
	try {
		const cleanEmail = email.trim();
		// 1. Thử tìm chính xác email chữ thường
		let doc = await db.collection('authorized_users').doc(cleanEmail.toLowerCase()).get();
		if (doc.exists) {
			return { authorized: true, data: doc.data() };
		}

		// 2. Thử tìm chính xác dạng nguyên bản (nếu lưu chữ hoa)
		if (cleanEmail !== cleanEmail.toLowerCase()) {
			doc = await db.collection('authorized_users').doc(cleanEmail).get();
			if (doc.exists) {
				return { authorized: true, data: doc.data() };
			}
		}

		return { authorized: false, data: null };
	} catch (error) {
		console.error('Authorization check failed:', error);

		// If Firestore is not set up yet, treat as unauthorized but don't error out
		if (error.code === 'permission-denied' || error.code === 'unavailable') {
			console.warn('Firestore chưa được cấu hình hoặc chưa có security rules. Xem hướng dẫn setup.');
			return { authorized: false, data: null, error: error.message };
		}
		throw error;
	}
}

// Lấy tham số redirect từ URL nếu có
const urlParams = new URLSearchParams(window.location.search);
const redirectTarget = urlParams.get('redirect');

// ============================================================
// AUTH STATE OBSERVER
// ============================================================

auth.onAuthStateChanged(async (user) => {
	hideSpinner();

	if (user) {
		// User is signed in
		hideLogin();
		showSpinner();

		try {
			const { authorized, data, error } = await checkAuthorization(user.email);

			hideSpinner();

			if (authorized) {
				showStatus('Đăng nhập thành công.', 'success');
				showUserProfile(user, data);

				// Lưu trạng thái auth vào sessionStorage
				sessionStorage.setItem('uxcamp_auth', JSON.stringify({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					role: data ? data.role : 'member',
					authorized: true
				}));

				// Nếu có trang redirect trước đó -> Tự động chuyển hướng về trang đó
				if (redirectTarget) {
					showStatus('Đăng nhập thành công! Đang chuyển hướng về công cụ...', 'success');
					if (elements.btnGoHome) {
						elements.btnGoHome.textContent = 'Tiếp tục truy cập công cụ';
						elements.btnGoHome.href = redirectTarget;
					}
					setTimeout(() => {
						window.location.href = redirectTarget;
					}, 600);
				}
			} else {
				showStatus('Vợ iu chưa được cấp quyền truy cập.', 'warning');
				showUserProfile(user, null);

				sessionStorage.setItem('uxcamp_auth', JSON.stringify({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					role: null,
					authorized: false
				}));
			}
		} catch (error) {
			hideSpinner();
			showStatus('Không thể kiểm tra trạng thái đăng nhập: ' + error.message, 'error');
			showUserProfile(user, null);
		}

	} else {
		// User is signed out
		showLogin();
		sessionStorage.removeItem('uxcamp_auth');
	}
});

// ============================================================
// EVENT HANDLERS
// ============================================================

// Google Sign-In
elements.btnGoogleSignIn.addEventListener('click', async () => {
	try {
		hideStatus();
		showSpinner();
		hideLogin();

		await auth.signInWithPopup(googleProvider);
		// onAuthStateChanged sẽ xử lý phần còn lại

	} catch (error) {
		hideSpinner();
		showLogin();

		// Handle specific error codes
		switch (error.code) {
			case 'auth/popup-closed-by-user':
				showStatus('Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.', 'info');
				break;
			case 'auth/popup-blocked':
				showStatus('Trình duyệt đã chặn popup. Vui lòng cho phép popup và thử lại.', 'warning');
				break;
			case 'auth/network-request-failed':
				showStatus('Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.', 'error');
				break;
			case 'auth/cancelled-popup-request':
				// Ignore — happens when multiple popups are triggered
				break;
			default:
				showStatus('Lỗi đăng nhập: ' + error.message, 'error');
				console.error('Sign-in error:', error);
		}
	}
});

// Sign Out
elements.btnSignOut.addEventListener('click', async () => {
	try {
		await auth.signOut();
		sessionStorage.removeItem('uxcamp_auth');
		showStatus('Đã đăng xuất thành công.', 'info');
	} catch (error) {
		showStatus('Lỗi khi đăng xuất: ' + error.message, 'error');
	}
});

// ============================================================
// AUTH GUARD — Dùng cho các trang khác
// ============================================================

/**
 * Hàm tiện ích để kiểm tra trạng thái auth từ các trang khác.
 * Import script này và gọi UXCampAuth.requireAuth() để gate features.
 * 
 * Cách dùng trên trang khác:
 *   <script src="script/authentication.js"></script>
 *   <script>
 *     // Redirect đến trang login nếu chưa đăng nhập hoặc chưa authorized
 *     UXCampAuth.requireAuth({ redirectTo: 'authentication.html' });
 * 
 *     // Hoặc chỉ ẩn/hiện element tùy trạng thái
 *     UXCampAuth.onAuthReady((authState) => {
 *       if (authState.authorized) {
 *         document.getElementById('protected-feature').style.display = 'block';
 *       }
 *     });
 *   </script>
 */
window.UXCampAuth = {

	/**
	 * Trả về trạng thái auth hiện tại (từ sessionStorage).
	 * @returns {object|null}
	 */
	getAuthState() {
		try {
			const data = sessionStorage.getItem('uxcamp_auth');
			return data ? JSON.parse(data) : null;
		} catch {
			return null;
		}
	},

	/**
	 * Kiểm tra user có đang đăng nhập và authorized không.
	 * Nếu không → redirect đến trang login.
	 * @param {object} options
	 * @param {string} options.redirectTo - URL trang login (default: 'authentication.html')
	 * @param {boolean} options.requireAuthorized - Có yêu cầu nằm trong danh sách authorized không (default: true)
	 */
	requireAuth(options = {}) {
		const { redirectTo = 'authentication.html', requireAuthorized = true } = options;

		const state = this.getAuthState();
		if (!state) {
			window.location.href = redirectTo;
			return;
		}
		if (requireAuthorized && !state.authorized) {
			window.location.href = redirectTo;
			return;
		}
	},

	/**
	 * Gọi callback khi Firebase Auth state sẵn sàng.
	 * @param {function} callback - Hàm nhận authState làm tham số
	 */
	onAuthReady(callback) {
		// Nếu auth đã có trong sessionStorage → gọi ngay
		const cached = this.getAuthState();
		if (cached) {
			callback(cached);
			return;
		}

		// Nếu chưa → lắng nghe Firebase Auth state change
		if (typeof firebase !== 'undefined' && firebase.auth) {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					try {
						const { authorized, data } = await checkAuthorization(user.email);
						const authState = {
							uid: user.uid,
							email: user.email,
							displayName: user.displayName,
							photoURL: user.photoURL,
							role: data ? data.role : null,
							authorized: authorized
						};
						sessionStorage.setItem('uxcamp_auth', JSON.stringify(authState));
						callback(authState);
					} catch {
						callback({ authorized: false });
					}
				} else {
					callback(null);
				}
			});
		} else {
			callback(null);
		}
	},

	/**
	 * Kiểm tra user có role cụ thể không.
	 * @param {string|string[]} roles - Role hoặc mảng roles cần kiểm tra
	 * @returns {boolean}
	 */
	hasRole(roles) {
		const state = this.getAuthState();
		if (!state || !state.role) return false;
		if (Array.isArray(roles)) return roles.includes(state.role);
		return state.role === roles;
	}
};
