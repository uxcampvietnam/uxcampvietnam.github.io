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
							<span class="tab-count-badge" id="badge-count-users">—</span>
						</a>
						<a href="${rootPath}admin/LMS/course/index.html" class="admin-nav-item ${activeTab === 'tab-courses' ? 'active' : ''}" data-tab="tab-courses">
							<span class="nav-icon">🎓</span>
							<span class="nav-text">Khóa học (Courses)</span>
							<span class="tab-count-badge" id="badge-count-courses">—</span>
						</a>
						<a href="${rootPath}admin/LMS/cohort/index.html" class="admin-nav-item ${activeTab === 'tab-cohorts' ? 'active' : ''}" data-tab="tab-cohorts">
							<span class="nav-icon">🏛️</span>
							<span class="nav-text">Lớp học (Cohorts)</span>
							<span class="tab-count-badge" id="badge-count-cohorts">—</span>
						</a>
						<a href="${rootPath}admin/LMS/certificate/index.html" class="admin-nav-item ${activeTab === 'tab-certificates' ? 'active' : ''}" data-tab="tab-certificates">
							<span class="nav-icon">🎖️</span>
							<span class="nav-text">Chứng chỉ (Certificates)</span>
							<span class="tab-count-badge" id="badge-count-certificates">—</span>
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
							<span class="tab-count-badge" id="badge-count-case-studies">—</span>
						</a>
						<a href="${rootPath}admin/CMS/participant/index.html" class="admin-nav-item ${activeTab === 'tab-participants' ? 'active' : ''}" data-tab="tab-participants">
							<span class="nav-icon">🌐</span>
							<span class="nav-text">Người tham dự 3D</span>
							<span class="tab-count-badge" id="badge-count-participants">—</span>
						</a>
						<a href="${rootPath}admin/CMS/knowledge/index.html" class="admin-nav-item ${activeTab === 'tab-knowledge' ? 'active' : ''}" data-tab="tab-knowledge">
							<span class="nav-icon">🧠</span>
							<span class="nav-text">Đồ thị Kiến thức</span>
							<span class="tab-count-badge" id="badge-count-knowledge">—</span>
						</a>
						<a href="${rootPath}admin/CMS/book/index.html" class="admin-nav-item ${activeTab === 'tab-books' ? 'active' : ''}" data-tab="tab-books">
							<span class="nav-icon">📚</span>
							<span class="nav-text">Tủ Sách UX</span>
							<span class="tab-count-badge" id="badge-count-books">—</span>
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
		loadBadges();
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

	// Tải số lượng badge từ Firestore
	async function loadBadges() {
		if (!db) return;
		try {
			// Chỉ tải nhẹ danh sách đếm hoặc kích thước
			const usersSnap = await db.collection('authorizedUsers').get();
			const bUsers = document.getElementById('badge-count-users');
			if (bUsers) bUsers.textContent = usersSnap.size;

			const coursesSnap = await db.collection('courses').get();
			const bCourses = document.getElementById('badge-count-courses');
			if (bCourses) bCourses.textContent = coursesSnap.size;

			const cohortsSnap = await db.collection('cohorts').get();
			const bCohorts = document.getElementById('badge-count-cohorts');
			if (bCohorts) bCohorts.textContent = cohortsSnap.size;

			const certsSnap = await db.collection('certificates').get();
			const bCerts = document.getElementById('badge-count-certificates');
			if (bCerts) bCerts.textContent = certsSnap.size;

			const caseSnap = await db.collection('caseStudies').get();
			const bCase = document.getElementById('badge-count-case-studies');
			if (bCase) bCase.textContent = caseSnap.size;

			const knSnap = await db.collection('knowledgeNodes').get();
			const bKn = document.getElementById('badge-count-knowledge');
			if (bKn) bKn.textContent = knSnap.size;
		} catch (err) {
			console.warn('[AdminShell] Could not load all badges:', err);
		}
	}

	// =========================================================================
	// 5. AUTH GATE LOGIC
	// =========================================================================
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
					// Tự động dọn dẹp doc rác nếu trước đó vô tình bị tạo trùng với secondary email
					if (directData && directData.docId !== parentData.docId) {
						db.collection('authorizedUsers').doc(directData.docId).delete().catch(() => {});
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

		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				window.location.href = rootPath + 'authentication.html';
				return;
			}

			try {
				const userProfile = await findAuthorizedUser(user.email, user);
				if (!userProfile.exists || userProfile.role !== 'admin') {
					if (authGate) {
						authGate.innerHTML = `
							<div class="empty-state">
								<span class="h4" style="color: var(--main-colors-foreground-f300);">⛔ Không có quyền truy cập</span>
								<p class="caption" style="color: var(--main-colors-foreground-f700); max-width: 380px; margin-top: 8px;">
									Tài khoản <strong>${escapeHtml(user.email)}</strong> không có quyền admin.
								</p>
								<div class="d-flex gap-2 mt-3">
									<a class="btn-outline-custom" href="${rootPath}index.html" style="text-decoration: none;">← Về trang chủ</a>
									<button class="btn-signout" onclick="adminAuth.signOut().then(() => window.location.href='${rootPath}authentication.html')">Đăng nhập tài khoản khác</button>
								</div>
							</div>
						`;
					}
					return;
				}

				// User là Admin hợp lệ
				window.currentAdminUser = user;
				window.currentAdminProfile = userProfile;

				if (authGate) authGate.style.display = 'none';
				if (sidebar) sidebar.style.display = 'flex';
				if (contentWrapper) contentWrapper.style.display = 'flex';

				// Cập nhật thông tin avatar & tên
				const avatarEl = document.getElementById('admin-avatar');
				const nameEl = document.getElementById('admin-name');
				if (avatarEl) {
					avatarEl.src = user.photoURL || '';
					avatarEl.style.display = user.photoURL ? 'block' : 'none';
				}
				if (nameEl) {
					nameEl.textContent = userProfile.displayName || user.displayName || user.email;
				}

				// Phát sự kiện adminReady để trang nghiệp vụ nạp dữ liệu
				window.dispatchEvent(new CustomEvent('adminReady', { detail: { user, userProfile, db, auth } }));

			} catch (err) {
				if (authGate) {
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
