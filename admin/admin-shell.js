/**
 * =============================================================================
 * UXCAMP VIETNAM — ADMIN SHELL CONTROLLER
 * =============================================================================
 * Quản lý khung giao diện (Shell), Sidebar Menu, Auth Gate & Firebase dùng chung
 * cho tất cả các trang Admin độc lập.
 * =============================================================================
 */

(function () {
	'use strict';

	// =========================================================================
	// 1. FIREBASE INITIALIZATION
	// =========================================================================
	const firebaseConfig = {
		apiKey: "AIzaSyC6KmQxFzAwI9RnIMtdUsMktQ0CCkM7z-E",
		authDomain: "uxcampvn.firebaseapp.com",
		projectId: "uxcampvn",
		storageBucket: "uxcampvn.firebasestorage.app",
		messagingSenderId: "491407083539",
		appId: "1:491407083539:web:8c1635c421989082a397e6",
		measurementId: "G-NLJWC0L47K"
	};

	if (window.firebase && !window.firebase.apps.length) {
		window.firebase.initializeApp(firebaseConfig);
	}

	const auth = window.firebase ? window.firebase.auth() : null;
	const db = window.firebase ? window.firebase.firestore() : null;

	window.adminAuth = auth;
	window.adminDb = db;

	// =========================================================================
	// 2. ROOT PATH COMPUTATION
	// =========================================================================
	// Tự động tính toán đường dẫn tương đối về thư mục gốc của website
	function computeRootPath() {
		if (window.ADMIN_CONFIG && window.ADMIN_CONFIG.root) {
			return window.ADMIN_CONFIG.root;
		}
		const path = window.location.pathname.replace(/\\/g, '/');
		const adminIdx = path.indexOf('/admin/');
		if (adminIdx !== -1) {
			const sub = path.substring(adminIdx + '/admin/'.length);
			const segments = sub.split('/').filter(Boolean);
			// segments.length: nếu sub là LMS/course/create.html -> 3 segments -> cần 3 '../' để về root
			return '../'.repeat(segments.length);
		}
		return '../../../';
	}

	const rootPath = computeRootPath();
	window.adminRootPath = rootPath;

	// =========================================================================
	// 3. TOAST NOTIFICATION UTILITY
	// =========================================================================
	function showAdminToast(msg, type = 'info') {
		let toastBox = document.getElementById('admin-toast-box');
		if (!toastBox) {
			toastBox = document.createElement('div');
			toastBox.id = 'admin-toast-box';
			toastBox.className = 'admin-toast-box';
			document.body.appendChild(toastBox);
		}

		let icon = '🔔';
		if (type === 'success' || msg.includes('✅') || msg.includes('✓')) icon = '✅';
		else if (type === 'error' || msg.includes('❌') || msg.includes('⛔')) icon = '❌';
		else if (type === 'warning' || msg.includes('⚠️')) icon = '⚠️';

		toastBox.innerHTML = `<span>${icon}</span> <span>${escapeHtml(msg.replace(/^[✅❌⚠️🔔]\s*/, ''))}</span>`;
		toastBox.classList.add('show');

		if (window._toastTimeout) clearTimeout(window._toastTimeout);
		window._toastTimeout = setTimeout(() => {
			toastBox.classList.remove('show');
		}, 3500);
	}
	window.showAdminToast = showAdminToast;
	window.showToast = showAdminToast;

	function escapeHtml(str) {
		return String(str || '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}
	window.adminEscapeHtml = escapeHtml;

	// =========================================================================
	// 3B. SHARED UTILITIES FOR LMS & CMS
	// =========================================================================
	function adminGenerateUUID(prefix = 'id') {
		if (typeof crypto !== 'undefined' && crypto.randomUUID) {
			return `${prefix}_${crypto.randomUUID().replace(/-/g, '').substring(0, 12)}`;
		}
		return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
	}
	window.adminGenerateUUID = adminGenerateUUID;

	function adminExportJson(data, filename = 'backup.json') {
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
		const dlAnchor = document.createElement('a');
		dlAnchor.setAttribute('href', dataStr);
		dlAnchor.setAttribute('download', filename);
		document.body.appendChild(dlAnchor);
		dlAnchor.click();
		dlAnchor.remove();
		showAdminToast(`💾 Đã xuất file: ${filename}`, 'success');
	}
	window.adminExportJson = adminExportJson;

	function adminGetUrlParam(param) {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(param);
	}
	window.adminGetUrlParam = adminGetUrlParam;

	function adminInitModals() {
		// Tự động gắn sự kiện đóng modal cho nút .btn-close-modal và backdrop
		document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
			overlay.querySelectorAll('.btn-close-modal').forEach(btn => {
				btn.onclick = () => overlay.classList.remove('show');
			});
			overlay.onclick = (e) => {
				if (e.target === overlay) overlay.classList.remove('show');
			};
		});
	}
	window.adminInitModals = adminInitModals;

	// =========================================================================
	// 4. SIDEBAR MENU TEMPLATE & RENDERER
	// =========================================================================
	const activeTab = (window.ADMIN_CONFIG && window.ADMIN_CONFIG.activeTab) || (document.body && document.body.dataset.tab) || '';

	function renderSidebar() {
		const sidebarContainer = document.getElementById('sidebar');
		if (!sidebarContainer) return;

		sidebarContainer.innerHTML = `
			<!-- Desktop Sidebar Toggle Button -->
			<button id="sidebar-toggle-btn" class="sidebar-toggle-btn" aria-label="Thu nhỏ menu">
				<svg class="toggle-icon" viewBox="0 0 24 24" width="16" height="16">
					<path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
				</svg>
			</button>

			<div class="sidebar-content">
				<!-- Brand Header -->
				<div class="brand">
					<a href="${rootPath}index.html" class="brand-icon" title="Về trang chủ UXCamp">
						<img class="eye-logo" src="${rootPath}asset/icon/eye.svg" alt="UXCamp">
					</a>
					<div class="brand-info">
						<h4 class="font-sans-h4 medium m-0" style="color: var(--main-colors-foreground-f100); font-size: 15px;">UXCamp Admin</h4>
						<span class="font-sans-small" style="color: var(--main-colors-foreground-f700);">Management Portal</span>
					</div>
				</div>

				<!-- Navigation Menu LMS -->
				<div class="nav-section">
					<div class="nav-section-title">HỆ THỐNG ĐÀO TẠO (LMS)</div>
					<nav class="nav-links">
						<a href="${rootPath}admin/LMS/user/index.html" class="admin-nav-item ${activeTab === 'tab-users' ? 'active' : ''}" data-tab="tab-users">
							<span class="nav-icon">👥</span>
							<span class="nav-text">Tài khoản Users</span>
						</a>
						<a href="${rootPath}admin/LMS/course/index.html" class="admin-nav-item ${activeTab === 'tab-courses' ? 'active' : ''}" data-tab="tab-courses">
							<span class="nav-icon">🎓</span>
							<span class="nav-text">Khóa học (Courses)</span>
						</a>
						<a href="${rootPath}admin/LMS/cohort/index.html" class="admin-nav-item ${activeTab === 'tab-cohorts' ? 'active' : ''}" data-tab="tab-cohorts">
							<span class="nav-icon">🏛️</span>
							<span class="nav-text">Lớp học (Cohorts)</span>
						</a>
						<a href="${rootPath}admin/LMS/certificate/index.html" class="admin-nav-item ${activeTab === 'tab-certificates' ? 'active' : ''}" data-tab="tab-certificates">
							<span class="nav-icon">🎖️</span>
							<span class="nav-text">Chứng chỉ (Certificates)</span>
						</a>
					</nav>
				</div>

				<!-- Navigation Menu CMS -->
				<div class="nav-section mt-3">
					<div class="nav-section-title">DỮ LIỆU WEBSITE (CMS)</div>
					<nav class="nav-links">
						<a href="${rootPath}admin/CMS/casestudy/index.html" class="admin-nav-item ${activeTab === 'tab-case-studies' ? 'active' : ''}" data-tab="tab-case-studies">
							<span class="nav-icon">💼</span>
							<span class="nav-text">Case Studies</span>
						</a>
						<a href="${rootPath}admin/CMS/participant/index.html" class="admin-nav-item ${activeTab === 'tab-participants' ? 'active' : ''}" data-tab="tab-participants">
							<span class="nav-icon">🌐</span>
							<span class="nav-text">Người tham dự 3D</span>
						</a>
						<a href="${rootPath}admin/CMS/knowledge/index.html" class="admin-nav-item ${activeTab === 'tab-knowledge' ? 'active' : ''}" data-tab="tab-knowledge">
							<span class="nav-icon">🧠</span>
							<span class="nav-text">Đồ thị Kiến thức</span>
						</a>
						<a href="${rootPath}admin/CMS/book/index.html" class="admin-nav-item ${activeTab === 'tab-books' ? 'active' : ''}" data-tab="tab-books">
							<span class="nav-icon">📚</span>
							<span class="nav-text">Tủ Sách UX</span>
						</a>
					</nav>
				</div>

				<!-- User Account Widget at bottom of Sidebar -->
				<div class="sidebar-user-widget admin-sidebar-user">
					<div class="admin-user-info">
						<img class="admin-user-avatar" id="admin-avatar" src="" alt="Avatar" style="display: none;">
						<div class="d-flex flex-column" style="overflow: hidden;">
							<span class="font-sans-caption" id="admin-name" style="color: var(--main-colors-foreground-f200); font-weight: 500;">Đang kiểm tra...</span>
							<span class="sidebar-user-role-badge admin" style="width: fit-content; font-size: 10px; padding: 1px 6px;">ADMIN</span>
						</div>
					</div>
					<div class="d-flex gap-2 mt-2">
						<a href="${rootPath}index.html" class="btn-sidebar-home" title="Trang chủ">← Home</a>
						<button class="btn-signout" id="btn-signout" style="flex: 1;">Đăng xuất</button>
					</div>
				</div>
			</div>
		`;

		initSidebarInteractions();
	}

	function initSidebarInteractions() {
		const appContainer = document.querySelector('.admin-app-container');
		const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
		const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
		const sidebar = document.getElementById('sidebar');

		// Desktop Collapse
		if (sidebarToggleBtn && appContainer) {
			const isCollapsed = localStorage.getItem('admin_sidebar_collapsed') === 'true';
			if (isCollapsed) {
				appContainer.classList.add('sidebar-collapsed');
			}
			sidebarToggleBtn.onclick = () => {
				const collapsed = appContainer.classList.toggle('sidebar-collapsed');
				localStorage.setItem('admin_sidebar_collapsed', collapsed);
			};
		}

		// Mobile Drawer
		if (mobileMenuToggle && sidebar) {
			mobileMenuToggle.onclick = (e) => {
				e.stopPropagation();
				sidebar.classList.toggle('active');
			};

			document.addEventListener('click', (e) => {
				if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
					if (!sidebar.contains(e.target) && e.target !== mobileMenuToggle) {
						sidebar.classList.remove('active');
					}
				}
			});
		}

		// Signout
		const btnSignout = document.getElementById('btn-signout');
		if (btnSignout) {
			btnSignout.onclick = async () => {
				if (auth) await auth.signOut();
				sessionStorage.removeItem('uxcamp_auth');
				window.location.href = rootPath + 'authentication.html';
			};
		}
	}

	// =========================================================================
	// 5. AUTH GATE LOGIC & SESSION CACHE
	// =========================================================================
	function getCachedAdminSession() {
		try {
			const cached = sessionStorage.getItem('uxcamp_auth');
			if (cached) {
				const parsed = JSON.parse(cached);
				// Thời hạn session cache hợp lệ (2 giờ)
				const MAX_SESSION_AGE = 2 * 60 * 60 * 1000;
				if (parsed && parsed.authorized && parsed.role === 'admin' && parsed.email) {
					if (parsed.cachedAt && (Date.now() - parsed.cachedAt > MAX_SESSION_AGE)) {
						sessionStorage.removeItem('uxcamp_auth');
						return null;
					}
					return parsed;
				}
			}
		} catch (e) {
			console.warn('[AdminShell] Lỗi đọc session cache:', e);
		}
		return null;
	}

	async function findAuthorizedUser(email, firebaseUser) {
		const cleanEmail = (email || '').trim().toLowerCase();
		if (!cleanEmail) return { exists: false };

		try {
			// 1. Thử doc ID = cleanEmail
			const docDirect = await db.collection('authorizedUsers').doc(cleanEmail).get();
			let directData = docDirect.exists ? { exists: true, docId: docDirect.id, ...docDirect.data() } : null;

			// Nếu docDirect tồn tại và là admin
			if (directData && directData.role === 'admin') {
				return directData;
			}

			// 2. Tra cứu mảng emails (tìm tài khoản cha nếu cleanEmail là email phụ của Admin)
			const qEmails = await db.collection('authorizedUsers').where('emails', 'array-contains', cleanEmail).limit(1).get();
			if (!qEmails.empty) {
				const d = qEmails.docs[0];
				const parentData = { exists: true, docId: d.id, ...d.data() };
				// Nếu tài khoản cha có quyền admin hoặc docDirect không phải admin
				if (parentData.role === 'admin' || !directData) {
					// Nếu tài khoản cha có quyền admin, đảm bảo cleanEmail cũng có doc role: 'admin' trong authorizedUsers
					// để Firestore Security Rules (hasUserDoc() && getUserDoc().role == 'admin') cấp quyền ghi server-side!
					if (parentData.role === 'admin') {
						db.collection('authorizedUsers').doc(cleanEmail).set({
							email: cleanEmail,
							primaryEmail: parentData.primaryEmail || parentData.email || parentData.docId,
							role: 'admin',
							status: 'active',
							displayName: parentData.displayName || cleanEmail,
							updatedAt: firebase.firestore.FieldValue.serverTimestamp()
						}, { merge: true }).catch(() => {});
					}
					return parentData;
				}
			}

			if (directData) return directData;

			// 3. Tra cứu primaryEmail
			const qPrimary = await db.collection('authorizedUsers').where('primaryEmail', '==', cleanEmail).limit(1).get();
			if (!qPrimary.empty) {
				const d = qPrimary.docs[0];
				return { exists: true, docId: d.id, ...d.data() };
			}

			// 4. Tra cứu firebaseUid & firebaseUids nếu có
			if (firebaseUser && firebaseUser.uid) {
				const qUid = await db.collection('authorizedUsers').where('firebaseUid', '==', firebaseUser.uid).limit(1).get();
				if (!qUid.empty) {
					const d = qUid.docs[0];
					return { exists: true, docId: d.id, ...d.data() };
				}
				const qUids = await db.collection('authorizedUsers').where('firebaseUids', 'array-contains', firebaseUser.uid).limit(1).get();
				if (!qUids.empty) {
					const d = qUids.docs[0];
					return { exists: true, docId: d.id, ...d.data() };
				}
			}
		} catch (err) {
			console.warn('[AdminShell] findAuthorizedUser warning:', err);
		}
		return { exists: false };
	}

	function initAuthGate() {
		const authGate = document.getElementById('auth-gate');
		const contentWrapper = document.getElementById('admin-content');
		const sidebar = document.getElementById('sidebar');

		if (!auth) {
			if (authGate) {
				authGate.innerHTML = `<div class="empty-state"><span class="h5" style="color: var(--alternative-foreground-red);">Lỗi: Không tìm thấy Firebase Auth SDK</span></div>`;
			}
			return;
		}

		let cachedSession = getCachedAdminSession();
		let hasDispatchedAdminReady = false;

		function unlockUI(user, profile) {
			window.currentAdminUser = user;
			window.currentAdminProfile = profile;

			if (authGate) authGate.style.display = 'none';
			if (sidebar) sidebar.style.display = 'flex';
			if (contentWrapper) contentWrapper.style.display = 'flex';

			// Cập nhật thông tin avatar & tên
			const avatarEl = document.getElementById('admin-avatar');
			const nameEl = document.getElementById('admin-name');
			if (avatarEl) {
				const photo = profile.photoURL || (user && user.photoURL) || '';
				avatarEl.src = photo;
				avatarEl.style.display = photo ? 'block' : 'none';
			}
			if (nameEl) {
				nameEl.textContent = profile.displayName || (user && user.displayName) || profile.email || (user && user.email) || 'Admin';
			}
		}

		// FAST-PATH: Mở khóa UI tức thì nếu có session admin hợp lệ trong sessionStorage (0ms latency, không chớp nháy)
		if (cachedSession) {
			unlockUI(auth.currentUser || cachedSession, cachedSession);
		}

		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				sessionStorage.removeItem('uxcamp_auth');
				window.location.href = rootPath + 'authentication.html';
				return;
			}

			// Nếu đã có cached session và khớp đúng email của user đăng nhập
			if (cachedSession && cachedSession.email.toLowerCase() === user.email.trim().toLowerCase()) {
				// Cập nhật Firebase User thật sự
				window.currentAdminUser = user;
				unlockUI(user, cachedSession);

				if (!hasDispatchedAdminReady) {
					hasDispatchedAdminReady = true;
					window.dispatchEvent(new CustomEvent('adminReady', { detail: { user, userProfile: cachedSession, db, auth } }));
				}
				return;
			}

			// Chưa có cache hoặc chuyển sang tài khoản khác -> Gọi Firestore kiểm tra quyền
			try {
				const userProfile = await findAuthorizedUser(user.email, user);
				if (!userProfile.exists || userProfile.role !== 'admin') {
					sessionStorage.removeItem('uxcamp_auth');
					if (authGate) {
						authGate.style.display = 'flex';
						if (sidebar) sidebar.style.display = 'none';
						if (contentWrapper) contentWrapper.style.display = 'none';
						authGate.innerHTML = `
							<div class="empty-state">
								<span class="h4" style="color: var(--main-colors-foreground-f300);">⛔ Không có quyền truy cập</span>
								<p class="caption" style="color: var(--main-colors-foreground-f700); max-width: 380px; margin-top: 8px;">
									Tài khoản <strong>${escapeHtml(user.email)}</strong> không có quyền admin.
								</p>
								<div class="d-flex gap-2 mt-3">
									<a class="btn-outline-custom" href="${rootPath}index.html" style="text-decoration: none;">← Về trang chủ</a>
									<button class="btn-signout" onclick="adminAuth.signOut().then(() => { sessionStorage.removeItem('uxcamp_auth'); window.location.href='${rootPath}authentication.html'; })">Đăng nhập tài khoản khác</button>
								</div>
							</div>
						`;
					}
					return;
				}

				// Lưu vào sessionStorage để tất cả các lần điều hướng tiếp theo tải tức thì
				const sessionData = {
					uid: user.uid,
					id: userProfile.id || userProfile.docId || user.uid,
					email: user.email.toLowerCase(),
					primaryEmail: userProfile.primaryEmail || user.email.toLowerCase(),
					displayName: userProfile.displayName || user.displayName || user.email.split('@')[0],
					photoURL: userProfile.photoUrl || user.photoURL || '',
					role: 'admin',
					status: userProfile.status || 'active',
					authorized: true,
					cachedAt: Date.now()
				};
				sessionStorage.setItem('uxcamp_auth', JSON.stringify(sessionData));
				cachedSession = sessionData;

				// Đảm bảo document của user.email và user.uid trong authorizedUsers có role: 'admin' (chỉ chạy 1 lần khi xác thực lần đầu)
				if (user.email) {
					const curEmail = user.email.trim().toLowerCase();
					db.collection('authorizedUsers').doc(curEmail).set({
						role: 'admin',
						status: 'active',
						email: curEmail,
						primaryEmail: userProfile.primaryEmail || userProfile.email || userProfile.docId || curEmail,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true }).catch(err => console.warn('Could not sync admin email doc:', err));
				}
				if (user.uid) {
					db.collection('authorizedUsers').doc(user.uid).set({
						role: 'admin',
						status: 'active',
						firebaseUid: user.uid,
						email: user.email ? user.email.trim().toLowerCase() : '',
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true }).catch(err => console.warn('Could not sync admin uid doc:', err));
				}

				unlockUI(user, sessionData);

				// Phát sự kiện adminReady để trang nghiệp vụ nạp dữ liệu
				if (!hasDispatchedAdminReady) {
					hasDispatchedAdminReady = true;
					window.dispatchEvent(new CustomEvent('adminReady', { detail: { user, userProfile: sessionData, db, auth } }));
				}

			} catch (err) {
				sessionStorage.removeItem('uxcamp_auth');
				if (authGate) {
					authGate.style.display = 'flex';
					authGate.innerHTML = `
						<div class="empty-state">
							<span class="h5" style="color: var(--alternative-foreground-red);">Lỗi kiểm tra quyền</span>
							<span class="caption" style="color: var(--main-colors-foreground-f700);">${escapeHtml(err.message)}</span>
							<a class="btn-outline-custom mt-2" href="${rootPath}authentication.html" style="text-decoration: none;">Đăng nhập lại</a>
						</div>
					`;
				}
			}
		});
	}

	// Khi DOM sẵn sàng
	document.addEventListener('DOMContentLoaded', () => {
		renderSidebar();
		adminInitModals();
		initAuthGate();
	});

})();
