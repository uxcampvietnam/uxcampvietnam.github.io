/**
 * UXCamp Vietnam — Firebase Authentication + Firestore Authorization
 * 
 * Luồng hoạt động chuẩn hóa (100% camelCase collection 'authorizedUsers'):
 * 1. User click "Đăng nhập bằng Google" → Firebase Auth popup (chọn tài khoản Google)
 * 2. Sau khi đăng nhập → tra cứu quyền trong Firestore collection "authorizedUsers"
 *    - Tìm theo primaryEmail
 *    - Tìm theo mảng emails
 *    - Tìm theo firebaseUid
 *    - Tìm theo Document ID trực tiếp
 * 3. Nếu authorized:
 *    - Tự động liên kết firebaseUid, cập nhật photoUrl / emails nếu thiếu
 *    - Hiển thị thông tin profile & badge role (Admin / Giảng viên / Thành viên / Alumni)
 *    - Lưu trạng thái vào sessionStorage ('uxcamp_auth')
 *    - Tự động chuyển tiếp (redirect) nếu có tham số URL ?redirect=...
 * 4. Nếu chưa được cấp quyền:
 *    - Hiển thị badge CHƯA ĐƯỢC CẤP QUYỀN
 *    - Nút Đăng xuất / Về trang chủ
 */

// ============================================================
// FIREBASE CONFIG
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
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

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
	const avatarSrc = (authData && authData.photoUrl) || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=e2a03f&color=000`;
	elements.userAvatar.src = avatarSrc;
	elements.userAvatar.style.display = 'block';

	// Name & email
	elements.userName.textContent = (authData && authData.displayName) || user.displayName || user.email.split('@')[0];
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
// AUTHORIZATION CHECK (Firestore: authorizedUsers)
// ============================================================

function generateUUID() {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	return 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

/**
 * Check if the user's email exists in the authorizedUsers collection.
 * Tra cứu toàn diện: Ưu tiên Document ID = email O(1), sau đó tra cứu dự phòng qua: primaryEmail, emails array, firebaseUid.
 * @param {string} email 
 * @param {object} [firebaseUser]
 * @returns {Promise<{authorized: boolean, data: object|null, error?: string}>}
 */
async function checkAuthorization(email, firebaseUser = null) {
	try {
		if (!email) return { authorized: false, data: null };
		const cleanEmail = email.trim().toLowerCase();
		const currentUid = (firebaseUser && firebaseUser.uid) || (auth.currentUser && auth.currentUser.uid) || '';

		let matchedDoc = null;
		let directDoc = null;
		let directData = null;

		// 1. Tra cứu trực tiếp theo Document ID = cleanEmail (Chuẩn O(1))
		try {
			const docByEmail = await db.collection('authorizedUsers').doc(cleanEmail).get();
			if (docByEmail.exists) {
				directDoc = docByEmail;
				directData = docByEmail.data() || {};
				// Nếu docDirect là admin, dùng luôn
				if (directData.role === 'admin') {
					matchedDoc = docByEmail;
				}
			}
		} catch (errDocEmail) {
			console.warn('[checkAuthorization] get doc by email warning:', errDocEmail);
		}

		// 2. Tra cứu theo mảng emails (tìm tài khoản cha nếu cleanEmail là email phụ của Admin/tài khoản chính)
		if (!matchedDoc) {
			try {
				const snapEmails = await db.collection('authorizedUsers').where('emails', 'array-contains', cleanEmail).get();
				if (!snapEmails.empty) {
					// Ưu tiên tài khoản có quyền cao nhất (admin > instructor > member)
					const docsFound = snapEmails.docs;
					const adminDoc = docsFound.find(d => (d.data() || {}).role === 'admin');
					matchedDoc = adminDoc || docsFound[0];

					// Dọn dẹp docDirect rác nếu trước đó đã bị tạo nhầm với ID là cleanEmail
					if (directDoc && directDoc.id !== matchedDoc.id) {
						db.collection('authorizedUsers').doc(directDoc.id).delete().catch(() => {});
					}
				}
			} catch (errEmails) {
				console.warn('[checkAuthorization] query emails warning:', errEmails);
			}
		}

		// Nếu không tìm thấy qua mảng emails nhưng có directDoc (tài khoản độc lập)
		if (!matchedDoc && directDoc) {
			matchedDoc = directDoc;
		}

		// 3. Tra cứu dự phòng theo primaryEmail
		if (!matchedDoc) {
			try {
				const snapPrimary = await db.collection('authorizedUsers').where('primaryEmail', '==', cleanEmail).get();
				if (!snapPrimary.empty) {
					matchedDoc = snapPrimary.docs[0];
				}
			} catch (errPrimary) {
				console.warn('[checkAuthorization] query primaryEmail warning:', errPrimary);
			}
		}

		// 4. Tra cứu dự phòng theo firebaseUid & firebaseUids
		if (!matchedDoc && currentUid) {
			try {
				const snapUid = await db.collection('authorizedUsers').where('firebaseUid', '==', currentUid).get();
				if (!snapUid.empty) {
					matchedDoc = snapUid.docs[0];
				} else {
					const snapUids = await db.collection('authorizedUsers').where('firebaseUids', 'array-contains', currentUid).get();
					if (!snapUids.empty) {
						matchedDoc = snapUids.docs[0];
					}
				}
			} catch (errUid) {
				console.warn('[checkAuthorization] query firebaseUid warning:', errUid);
			}
		}

		// 5. Tra cứu dự phòng theo Document ID = UID
		if (!matchedDoc && currentUid) {
			try {
				const docByUid = await db.collection('authorizedUsers').doc(currentUid).get();
				if (docByUid.exists) {
					matchedDoc = docByUid;
				}
			} catch (errDocUid) {
				console.warn('[checkAuthorization] get doc by uid warning:', errDocUid);
			}
		}

		if (!matchedDoc) {
			return { authorized: false, data: null };
		}

		const raw = matchedDoc.data() || {};
		const docId = matchedDoc.id;
		const internalId = raw.id || generateUUID();
		const primaryEmail = raw.primaryEmail || (Array.isArray(raw.emails) ? raw.emails[0] : null) || docId;

		// Chuẩn hóa profile trả về theo camelCase schema
		const profile = {
			id: internalId,
			docId: docId,
			primaryEmail: primaryEmail,
			emails: Array.isArray(raw.emails) && raw.emails.length > 0 ? raw.emails : [primaryEmail],
			firebaseUid: raw.firebaseUid || currentUid || '',
			firebaseUids: Array.isArray(raw.firebaseUids) ? raw.firebaseUids : (raw.firebaseUid ? [raw.firebaseUid] : []),
			displayName: raw.displayName || (firebaseUser && firebaseUser.displayName) || cleanEmail.split('@')[0],
			photoUrl: raw.photoUrl || (firebaseUser && firebaseUser.photoURL) || '',
			phone: raw.phone || '',
			role: raw.role || 'member',
			status: raw.status || 'active',
			createdAt: raw.createdAt || null,
			updatedAt: raw.updatedAt || null
		};

		// Kiểm tra trạng thái tài khoản
		if (profile.status === 'disabled' || profile.status === 'inactive') {
			return { authorized: false, data: profile, error: 'Tài khoản của bạn đang bị tạm ngưng.' };
		}

		return { authorized: true, data: profile };
	} catch (error) {
		console.error('Authorization check failed:', error);
		if (error.code === 'permission-denied' || error.code === 'unavailable') {
			console.warn('Firestore security rules hoặc mạng gặp vấn đề.');
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
		// User is signed in via Google
		hideLogin();
		showSpinner();

		try {
			const { authorized, data, error } = await checkAuthorization(user.email, user);

			hideSpinner();

			if (authorized && data) {
				showStatus('Đăng nhập thành công.', 'success');
				showUserProfile(user, data);

				// Tự động đồng bộ và liên kết (Self-healing & account binding):
				// Luôn ghi vào Document ID của tài khoản chính (data.docId hoặc data.primaryEmail)
				// TUYỆT ĐỐI không ghi vào user.email nếu email đó chỉ là email phụ
				const cleanEmail = user.email.toLowerCase();
				const targetDocId = data.docId || data.primaryEmail || cleanEmail;
				const updates = {};

				if (!data.id) {
					updates.id = generateUUID();
					data.id = updates.id;
				}

				// Quản lý đa UID khi user đăng nhập bằng nhiều tài khoản Google khác nhau
				const curUids = Array.isArray(data.firebaseUids) ? data.firebaseUids : (data.firebaseUid ? [data.firebaseUid] : []);
				if (user.uid && !curUids.includes(user.uid)) {
					updates.firebaseUids = Array.from(new Set([...curUids, user.uid]));
					data.firebaseUids = updates.firebaseUids;
				}
				if (!data.firebaseUid || data.firebaseUid !== user.uid) {
					updates.firebaseUid = user.uid;
					data.firebaseUid = user.uid;
				}
				if (!data.photoUrl && user.photoURL) {
					updates.photoUrl = user.photoURL;
					data.photoUrl = user.photoURL;
				}
				if (!data.displayName && user.displayName) {
					updates.displayName = user.displayName;
					data.displayName = user.displayName;
				}
				if (!Array.isArray(data.emails) || !data.emails.includes(cleanEmail)) {
					const curEmails = Array.isArray(data.emails) ? data.emails : [];
					updates.emails = Array.from(new Set([...curEmails, cleanEmail]));
					data.emails = updates.emails;
				}

				if (Object.keys(updates).length > 0) {
					updates.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
					db.collection('authorizedUsers').doc(targetDocId).set(updates, { merge: true }).catch(err => {
						console.warn('[Auth] Không thể cập nhật thông tin user:', err);
					});
				}

				// Nếu đang đăng nhập bằng email phụ và vô tình có document rác mang tên cleanEmail khác targetDocId
				if (cleanEmail !== targetDocId) {
					db.collection('authorizedUsers').doc(cleanEmail).delete().catch(() => {});
				}

				// Lưu trạng thái auth chuẩn hóa vào sessionStorage
				sessionStorage.setItem('uxcamp_auth', JSON.stringify({
					uid: user.uid,
					id: data.id,
					email: user.email.toLowerCase(),
					primaryEmail: data.primaryEmail || user.email.toLowerCase(),
					emails: data.emails || [user.email.toLowerCase()],
					displayName: data.displayName || user.displayName || user.email.split('@')[0],
					photoURL: data.photoUrl || user.photoURL || '',
					role: data.role,
					status: data.status,
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
				showStatus(error || 'Tài khoản chưa được cấp quyền truy cập. Vui lòng liên hệ Admin.', 'warning');
				showUserProfile(user, null);

				sessionStorage.setItem('uxcamp_auth', JSON.stringify({
					uid: user.uid,
					email: user.email.toLowerCase(),
					displayName: user.displayName,
					photoURL: user.photoURL,
					role: null,
					status: 'unauthorized',
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
						const { authorized, data } = await checkAuthorization(user.email, user);
						const authState = {
							uid: user.uid,
							id: data?.id || user.uid,
							email: user.email.toLowerCase(),
							primaryEmail: data?.primaryEmail || user.email.toLowerCase(),
							emails: data?.emails || [user.email.toLowerCase()],
							displayName: data?.displayName || user.displayName || user.email.split('@')[0],
							photoURL: data?.photoUrl || user.photoURL || '',
							role: data ? data.role : null,
							status: data?.status || 'active',
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
