/**
 * =============================================================================
 * UXCAMP VIETNAM — ADMIN MULTI-COLLECTION DATA MANAGER
 * =============================================================================
 * Quản lý dữ liệu Firestore cho:
 * 1. Case Studies (Collection 'case_studies')
 * 2. Participants 3D Sphere (Collection 'participants')
 * 3. Knowledge Graph Nodes (Collection 'knowledge_nodes')
 * 4. Books & Shelves (Collections 'books' & 'book_shelves')
 *
 * Tính năng chính:
 * - Hiển thị danh sách, tìm kiếm, đếm số lượng
 * - Thêm / Sửa / Xóa (CRUD) an toàn với phân quyền Admin
 * - 1-Click Migration: Nạp toàn bộ dữ liệu từ file tĩnh (.csv, .tsv, .json) lên Firestore
 * - Export Backup: Tải về bản sao lưu JSON bất cứ lúc nào
 * =============================================================================
 */

(function () {
	'use strict';

	// Đợi Firebase và trang admin sẵn sàng
	window.addEventListener('DOMContentLoaded', () => {
		// Tham chiếu Firebase DB từ admin.html
		const db = window.firebase ? firebase.firestore() : null;
		if (!db) {
			console.warn('[AdminDataManager] Firebase Firestore chưa khởi tạo.');
			return;
		}

		// Helper escape HTML
		function esc(str) {
			return String(str || '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;');
		}

		function showToast(msg) {
			if (typeof window.showToast === 'function') {
				window.showToast(msg);
			} else {
				const toast = document.getElementById('admin-toast');
				if (toast) {
					toast.textContent = msg;
					toast.classList.add('show');
					setTimeout(() => toast.classList.remove('show'), 3500);
				}
			}
		}

		// =========================================================================
		// 1. SIDEBAR NAVIGATION & VIEWPORT CONTROLLER
		// =========================================================================
		const navButtons = document.querySelectorAll('.admin-nav-item, .admin-tab-btn');
		const tabPanes = document.querySelectorAll('.admin-tab-pane');
		const pageTitleEl = document.getElementById('current-page-title');
		const pageDescEl = document.getElementById('current-page-desc');
		const sidebar = document.getElementById('sidebar');
		const appContainer = document.querySelector('.admin-app-container');

		const tabMetadata = {
			'tab-users': {
				title: 'Phân quyền Users',
				desc: 'Quản lý tài khoản và phân quyền người tham dự'
			},
			'tab-courses': {
				title: 'Quản lý Danh mục Khóa học',
				desc: 'Danh mục các chương trình đào tạo cộng đồng (Bootcamp) & Doanh nghiệp'
			},
			'tab-cohorts': {
				title: 'Quản lý Lớp học Tuyển sinh',
				desc: 'Các lớp học theo từng khóa, tiến độ tuyển sinh & danh sách học viên'
			},
			'tab-certificates': {
				title: 'Quản lý Chứng chỉ Tốt nghiệp',
				desc: 'Chứng chỉ xác thực tốt nghiệp của học viên UXCamp, bảo toàn UUID v4 liên kết'
			},
			'tab-case-studies': {
				title: 'Quản lý Case Studies',
				desc: 'Các bài tập tốt nghiệp & đồ án thực tế của học viên UXCamp'
			},
			'tab-participants': {
				title: 'Quả cầu Người tham dự 3D',
				desc: 'Hình ảnh hiển thị trên quả cầu Three.js Sphere ở trang chủ'
			},
			'tab-knowledge': {
				title: 'Đồ thị Kiến thức 3D',
				desc: 'Cấu trúc đồ thị mạng lưới hiển thị trong Sticky 3D Graph'
			},
			'tab-books': {
				title: 'Tủ Sách UX',
				desc: 'Các đầu sách tương tác 3D hiển thị trên Book Shelf'
			}
		};

		function switchTab(targetTabId) {
			navButtons.forEach(btn => {
				const isActive = btn.getAttribute('data-tab') === targetTabId;
				btn.classList.toggle('active', isActive);
			});

			tabPanes.forEach(pane => {
				const isActive = pane.id === targetTabId;
				pane.classList.toggle('active', isActive);
			});

			// Cập nhật tiêu đề trang
			if (tabMetadata[targetTabId]) {
				if (pageTitleEl) pageTitleEl.textContent = tabMetadata[targetTabId].title;
				if (pageDescEl) pageDescEl.textContent = tabMetadata[targetTabId].desc;
			}

			// Đóng drawer trên mobile khi chọn xong
			if (window.innerWidth <= 1024 && sidebar) {
				sidebar.classList.remove('active');
			}

			// Lazy load dữ liệu khi vào tab lần đầu
			if (targetTabId === 'tab-courses' && !coursesLoaded) {
				loadCourses();
			} else if (targetTabId === 'tab-cohorts' && !cohortsLoaded) {
				loadCohorts();
			} else if (targetTabId === 'tab-certificates' && !certificatesLoaded) {
				loadCertificates();
			} else if (targetTabId === 'tab-case-studies' && !caseStudiesLoaded) {
				loadCaseStudies();
			} else if (targetTabId === 'tab-participants' && !participantsLoaded) {
				loadParticipants();
			} else if (targetTabId === 'tab-knowledge' && !knowledgeNodesLoaded) {
				loadKnowledgeNodes();
			} else if (targetTabId === 'tab-books' && !booksLoaded) {
				loadBooks();
			}
		}

		navButtons.forEach(btn => {
			btn.addEventListener('click', () => {
				const tabId = btn.getAttribute('data-tab');
				if (tabId) switchTab(tabId);
			});
		});

		// Desktop Sidebar Collapse Toggle
		const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
		if (sidebarToggleBtn && appContainer) {
			const isCollapsed = localStorage.getItem('admin_sidebar_collapsed') === 'true';
			if (isCollapsed) {
				appContainer.classList.add('sidebar-collapsed');
				sidebarToggleBtn.setAttribute('aria-label', 'Mở rộng menu');
			}

			sidebarToggleBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				const collapsed = appContainer.classList.toggle('sidebar-collapsed');
				localStorage.setItem('admin_sidebar_collapsed', collapsed);
				sidebarToggleBtn.setAttribute('aria-label', collapsed ? 'Mở rộng menu' : 'Thu nhỏ menu');
			});
		}

		// Mobile Menu Drawer Toggle
		const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
		if (mobileMenuToggle && sidebar) {
			mobileMenuToggle.addEventListener('click', (e) => {
				e.stopPropagation();
				sidebar.classList.toggle('active');
			});

			document.addEventListener('click', (e) => {
				if (window.innerWidth <= 1024 && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
					sidebar.classList.remove('active');
				}
			});
		}

		// =========================================================================
		// 2. MODAL CONTROLLER
		// =========================================================================
		function openModal(id) {
			const modal = document.getElementById(id);
			if (modal) modal.classList.add('open');
		}

		function closeModal(id) {
			const modal = document.getElementById(id);
			if (modal) modal.classList.remove('open');
		}

		window.openAdminModal = openModal;
		window.closeAdminModal = closeModal;

		// Gán sự kiện cho các nút đóng modal
		document.querySelectorAll('.btn-close-modal').forEach(btn => {
			btn.addEventListener('click', () => {
				const modal = btn.closest('.admin-modal-overlay');
				if (modal) modal.classList.remove('open');
			});
		});

		// Helper UUID v4
		function generateUUID() {
			if (typeof crypto !== 'undefined' && crypto.randomUUID) {
				return crypto.randomUUID();
			}
			return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		// Helper Download JSON backup
		function downloadJSON(data, filename) {
			const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}

		// =========================================================================
		// 3. COURSES MANAGER (Collection 'courses')
		// =========================================================================
		let allCourses = [];
		let coursesLoaded = false;

		async function loadCourses() {
			const container = document.getElementById('container-courses-list');
			const badge = document.getElementById('badge-count-courses');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải danh sách Khóa học từ Firestore...</span>
				</div>
			`;

			try {
				const snapshot = await db.collection('courses').get();
				allCourses = [];
				snapshot.forEach(doc => {
					allCourses.push({ id: doc.id, ...doc.data() });
				});

				// Sắp xếp theo code hoặc title
				allCourses.sort((a, b) => (a.code || '').localeCompare(b.code || ''));

				// Cập nhật stats
				const statTotal = document.getElementById('stat-courses-total');
				const statActive = document.getElementById('stat-courses-active');
				const statPublic = document.getElementById('stat-courses-public');
				const statCorp = document.getElementById('stat-courses-corporate');

				if (statTotal) statTotal.textContent = allCourses.length;
				if (statActive) statActive.textContent = allCourses.filter(c => c.status === 'active').length;
				if (statPublic) statPublic.textContent = allCourses.filter(c => c.isPublic !== false).length;
				if (statCorp) statCorp.textContent = allCourses.filter(c => c.deliveryType === 'corporate_training').length;
				if (badge) badge.textContent = allCourses.length;

				// Cập nhật dropdown chọn khóa học cho tab Cohorts
				populateCourseDropdowns();

				renderCourses();
				coursesLoaded = true;
			} catch (err) {
				console.error('[loadCourses] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Khóa học: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function renderCourses() {
			const container = document.getElementById('container-courses-list');
			const searchInput = document.getElementById('search-courses');
			const deliveryFilter = document.getElementById('filter-course-delivery');

			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
			const selectedDelivery = deliveryFilter ? deliveryFilter.value : 'all';

			let list = allCourses;
			if (query) {
				list = list.filter(c =>
					(c.code && c.code.toLowerCase().includes(query)) ||
					(c.title && c.title.toLowerCase().includes(query)) ||
					(c.tagline && c.tagline.toLowerCase().includes(query))
				);
			}

			if (selectedDelivery !== 'all') {
				list = list.filter(c => c.deliveryType === selectedDelivery);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query || selectedDelivery !== 'all' ? 'Không tìm thấy Khóa học phù hợp bộ lọc.' : 'Chưa có Khóa học nào trên Firestore.'}</span>
						${!query && selectedDelivery === 'all' ? `
							<div class="d-flex gap-2 mt-2">
								<button type="button" class="btn-add" onclick="document.getElementById('btn-add-course').click()">+ Thêm Khóa học mới</button>
								<button type="button" class="btn-outline-custom" onclick="window.adminDataManager.seedSampleCourses()">⚡ Nạp Khóa học mẫu</button>
							</div>
						` : ''}
					</div>
				`;
				return;
			}

			const deliveryLabels = {
				public_bootcamp: '<span class="admin-tag" style="background: rgba(46, 213, 115, 0.15); color: #2ed573; border-color: rgba(46, 213, 115, 0.3);">Bootcamp</span>',
				corporate_training: '<span class="admin-tag" style="background: rgba(255, 177, 66, 0.15); color: #ffb142; border-color: rgba(255, 177, 66, 0.3);">Doanh nghiệp</span>',
				custom_workshop: '<span class="admin-tag" style="background: rgba(112, 161, 255, 0.15); color: #70a1ff; border-color: rgba(112, 161, 255, 0.3);">Workshop</span>'
			};

			const statusLabels = {
				active: '<span style="color: var(--highlight-green); font-size: 12px; font-weight: 500;">● Đang dạy</span>',
				draft: '<span style="color: var(--main-colors-foreground-f700); font-size: 12px; font-weight: 500;">○ Dự thảo</span>',
				archived: '<span style="color: var(--alternative-foreground-red); font-size: 12px; font-weight: 500;">✕ Đã lưu trữ</span>'
			};

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 80px;">Mã khóa</th>
							<th style="min-width: 220px;">Tên Khóa Học</th>
							<th style="min-width: 130px;">Hình thức</th>
							<th style="width: 90px; text-align: center;">Thời lượng</th>
							<th style="width: 90px; text-align: center;">Lớp học</th>
							<th style="width: 110px; text-align: center;">Hiển thị Web</th>
							<th style="width: 110px;">Trạng thái</th>
							<th style="width: 90px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => {
							const cohortCount = (allCohorts || []).filter(ch => ch.courseId === c.id).length;
							return `
							<tr>
								<td>
									<span class="role-cell admin" style="font-weight: 700; letter-spacing: 0.5px;">${esc(c.code || '—')}</span>
								</td>
								<td>
									<div class="caption" style="font-weight: 600; color: var(--main-colors-foreground-f200);">${esc(c.title || 'Chưa đặt tên')}</div>
									${c.tagline ? `<div class="x-small" style="color: var(--main-colors-foreground-f700);">${esc(c.tagline)}</div>` : ''}
									${c.courseUrl ? `<a href="${esc(c.courseUrl)}" target="_blank" rel="noopener" class="x-small" style="color: var(--alternative-foreground-gold); text-decoration: none;">Link Khóa ↗</a>` : ''}
								</td>
								<td>${deliveryLabels[c.deliveryType] || `<span class="admin-tag">${esc(c.deliveryType || '—')}</span>`}</td>
								<td class="caption" style="text-align: center; color: var(--main-colors-foreground-f300);">${c.durationHours ? `${c.durationHours}h` : '—'}</td>
								<td style="text-align: center;">
									<span class="admin-tag" style="background: rgba(255, 199, 0, 0.12); color: var(--alternative-foreground-gold); border-color: rgba(255, 199, 0, 0.25); font-weight: 600;">${cohortCount} lớp</span>
								</td>
								<td style="text-align: center;">
									${c.isPublic !== false
										? '<span class="admin-tag" style="background: rgba(30, 144, 255, 0.15); color: #1e90ff; border-color: rgba(30, 144, 255, 0.3);">Công khai</span>'
										: '<span class="admin-tag" style="background: rgba(120, 120, 120, 0.15); color: #888; border-color: rgba(120, 120, 120, 0.3);">Ẩn web</span>'}
								</td>
								<td>${statusLabels[c.status] || esc(c.status || 'active')}</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1">
										<button class="btn-icon-action" title="Chỉnh sửa" onclick="window.adminDataManager.editCourse('${esc(c.id)}')">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
										<button class="btn-icon-action delete" title="Xóa" onclick="window.adminDataManager.deleteCourse('${esc(c.id)}', '${esc(c.code || c.title)}')">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
										</button>
									</div>
								</td>
							</tr>
						`;
						}).join('')}
					</tbody>
				</table>
			`;
		}

		function populateCourseDropdowns() {
			// 1. Dropdown trong modal Thêm/Sửa Cohort
			const selectCohortCourse = document.getElementById('modal-cohort-course-id');
			if (selectCohortCourse) {
				const currentVal = selectCohortCourse.value;
				selectCohortCourse.innerHTML = `
					<option value="" disabled selected>-- Chọn khóa học liên kết --</option>
					${allCourses.map(c => `<option value="${esc(c.id)}">${esc(c.code)} - ${esc(c.title)}</option>`).join('')}
				`;
				if (currentVal) selectCohortCourse.value = currentVal;
			}

			// 2. Dropdown bộ lọc ở tab Cohorts
			const filterCohortCourse = document.getElementById('filter-cohort-course');
			if (filterCohortCourse) {
				const currentFilter = filterCohortCourse.value;
				filterCohortCourse.innerHTML = `
					<option value="all">Tất cả khóa học</option>
					${allCourses.map(c => `<option value="${esc(c.id)}">${esc(c.code)} - ${esc(c.title)}</option>`).join('')}
				`;
				if (currentFilter) filterCohortCourse.value = currentFilter;
			}
		}

		window.adminDataManager = window.adminDataManager || {};

		window.adminDataManager.editCourse = function (id) {
			const item = allCourses.find(c => c.id === id);
			if (!item) return;

			document.getElementById('modal-course-id').value = item.id;
			document.getElementById('modal-course-code').value = item.code || '';
			document.getElementById('modal-course-title').value = item.title || '';
			document.getElementById('modal-course-delivery').value = item.deliveryType || 'public_bootcamp';
			document.getElementById('modal-course-status').value = item.status || 'active';
			document.getElementById('modal-course-duration').value = item.durationHours || 36;
			document.getElementById('modal-course-public').value = item.isPublic !== false ? 'true' : 'false';
			document.getElementById('modal-course-url').value = item.courseUrl || '';
			document.getElementById('modal-course-slug').value = item.slug || '';
			document.getElementById('modal-course-tagline').value = item.tagline || '';
			document.getElementById('modal-course-skills').value = Array.isArray(item.skills) ? item.skills.join(', ') : (item.skills || '');
			const descEl = document.getElementById('modal-course-desc');
			if (descEl) descEl.value = item.description || '';
			document.getElementById('modal-course-title-header').textContent = `Chỉnh sửa Khóa học: ${item.code || item.title}`;

			openModal('modal-course');
		};

		window.adminDataManager.deleteCourse = async function (id, code) {
			if (!confirm(`Bạn có chắc muốn xóa Khóa học "${code}"? Các lớp học thuộc khóa này có thể bị ảnh hưởng.`)) return;
			try {
				await db.collection('courses').doc(id).delete();
				showToast(`✅ Đã xóa Khóa học "${code}"`);
				await loadCourses();
			} catch (err) {
				showToast(`❌ Lỗi khi xóa: ${err.message}`);
			}
		};

		// Submit form Course
		const formCourse = document.getElementById('form-modal-course');
		if (formCourse) {
			formCourse.addEventListener('submit', async (e) => {
				e.preventDefault();
				const idInput = document.getElementById('modal-course-id') ? document.getElementById('modal-course-id').value.trim() : '';
				const code = document.getElementById('modal-course-code') ? document.getElementById('modal-course-code').value.trim().toUpperCase() : '';
				const title = document.getElementById('modal-course-title') ? document.getElementById('modal-course-title').value.trim() : '';
				const deliveryType = document.getElementById('modal-course-delivery') ? document.getElementById('modal-course-delivery').value : 'public_bootcamp';
				const status = document.getElementById('modal-course-status') ? document.getElementById('modal-course-status').value : 'active';
				const durationHours = parseInt(document.getElementById('modal-course-duration') ? document.getElementById('modal-course-duration').value : '36', 10) || 0;
				const isPublic = document.getElementById('modal-course-public') ? document.getElementById('modal-course-public').value === 'true' : true;
				const courseUrl = document.getElementById('modal-course-url') ? document.getElementById('modal-course-url').value.trim() : '';
				const slug = (document.getElementById('modal-course-slug') ? document.getElementById('modal-course-slug').value.trim() : '') || code.toLowerCase();
				const tagline = document.getElementById('modal-course-tagline') ? document.getElementById('modal-course-tagline').value.trim() : '';
				const skillsRaw = document.getElementById('modal-course-skills') ? document.getElementById('modal-course-skills').value.trim() : '';
				const description = document.getElementById('modal-course-desc') ? document.getElementById('modal-course-desc').value.trim() : '';

				const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
				const btnSave = formCourse.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					const id = idInput || generateUUID();
					const courseData = {
						id,
						code,
						title,
						slug,
						tagline,
						deliveryType,
						status,
						durationHours,
						isPublic,
						courseUrl,
						skills,
						description,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					};

					if (!idInput) {
						courseData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
					}

					await db.collection('courses').doc(id).set(courseData, { merge: true });
					showToast(`✅ Đã lưu Khóa học "${code} - ${title}"`);
					closeModal('modal-course');
					formCourse.reset();
					await loadCourses();
				} catch (err) {
					showToast(`❌ Lỗi khi lưu: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		// Button events for Courses
		const btnAddCourse = document.getElementById('btn-add-course');
		if (btnAddCourse) {
			btnAddCourse.addEventListener('click', () => {
				if (formCourse) formCourse.reset();
				document.getElementById('modal-course-id').value = '';
				document.getElementById('modal-course-duration').value = 36;
				document.getElementById('modal-course-public').value = 'true';
				document.getElementById('modal-course-title-header').textContent = 'Thêm Khóa Học Mới';
				openModal('modal-course');
			});
		}

		const btnRefreshCourses = document.getElementById('btn-refresh-courses');
		if (btnRefreshCourses) btnRefreshCourses.addEventListener('click', loadCourses);

		const searchCoursesInput = document.getElementById('search-courses');
		if (searchCoursesInput) searchCoursesInput.addEventListener('input', renderCourses);

		const filterCourseDelivery = document.getElementById('filter-course-delivery');
		if (filterCourseDelivery) filterCourseDelivery.addEventListener('change', renderCourses);

		const btnExportCourses = document.getElementById('btn-export-courses');
		if (btnExportCourses) {
			btnExportCourses.addEventListener('click', () => {
				downloadJSON(allCourses, `courses_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}


		// Seeder mẫu cho Khóa học & Lớp học
		window.adminDataManager.seedSampleCourses = async function () {
			if (!confirm('Khởi tạo 3 khóa học mẫu chuẩn LMS vào Firestore?')) return;
			const sampleCourses = [
				{
					code: 'DT',
					title: 'Design Thinking & Innovation Bootcamp',
					tagline: 'Làm chủ tư duy thiết kế sản phẩm số thực chiến từ vấn đề tới giải pháp',
					slug: 'design-thinking-bootcamp',
					deliveryType: 'public_bootcamp',
					durationHours: 36,
					isPublic: true,
					courseUrl: 'https://uxcamp.vn/courses/design-thinking',
					status: 'active',
					skills: ['User Research', 'Empathy Mapping', 'Ideation', 'Rapid Prototyping', 'Usability Testing'],
					description: 'Chương trình đào tạo thực chiến 8 tuần dành cho Product Designer, UX/UI Designer và Product Manager.'
				},
				{
					code: 'UXA',
					title: 'UX Architecture & Design System Masterclass',
					tagline: 'Xây dựng kiến trúc thông tin phức tạp và hệ thống Design System quy mô doanh nghiệp',
					slug: 'ux-architecture-design-system',
					deliveryType: 'public_bootcamp',
					durationHours: 48,
					isPublic: true,
					courseUrl: 'https://uxcamp.vn/courses/ux-architecture',
					status: 'active',
					skills: ['Information Architecture', 'Design Tokens', 'Figma Variables', 'Component Architecture', 'Accessibility WCAG'],
					description: 'Nâng cấp tư duy kiến trúc và quy chuẩn thiết kế sản phẩm số quy mô lớn.'
				},
				{
					code: 'CORP-UX',
					title: 'Enterprise UX & Product Discovery Coaching',
					tagline: 'Đào tạo & tư vấn tối ưu năng lực Product Experience in-house cho doanh nghiệp',
					slug: 'corporate-ux-coaching',
					deliveryType: 'corporate_training',
					durationHours: 24,
					isPublic: false,
					courseUrl: '',
					status: 'active',
					skills: ['Product Discovery', 'Design Strategy', 'Design Operations (DesignOps)', 'Stakeholder Alignment'],
					description: 'Chương trình thiết kế riêng cho các đội ngũ phát triển sản phẩm của ngân hàng, fintech và tập đoàn công nghệ.'
				}
			];

			try {
				for (const c of sampleCourses) {
					const id = generateUUID();
					await db.collection('courses').doc(id).set({
						id,
						...c,
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					});
				}
				showToast('✅ Đã nạp thành công 3 khóa học mẫu!');
				await loadCourses();
			} catch (err) {
				showToast(`❌ Lỗi: ${err.message}`);
			}
		};

		window.adminDataManager.seedSampleCohorts = async function () {
			if (allCourses.length === 0) {
				showToast('⚠️ Vui lòng nạp hoặc tạo Khóa học trước khi tạo Lớp học!');
				return;
			}
			if (!confirm('Khởi tạo lớp học mẫu liên kết với Khóa học?')) return;
			const dtCourse = allCourses.find(c => c.code === 'DT') || allCourses[0];
			try {
				const id = generateUUID();
				await db.collection('cohorts').doc(id).set({
					id,
					code: 'DT-C08',
					name: 'Design Thinking Cohort 08 (Weekend)',
					courseId: dtCourse.id,
					startDate: '2026-04-18',
					endDate: '2026-06-20',
					status: 'enrolling',
					studentEmails: ['student@uxcamp.vn'],
					instructorEmails: ['mentor@uxcamp.vn'],
					notes: 'Học trực tuyến qua Google Meet và Figma Jam.',
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				});
				showToast('✅ Đã nạp Lớp học mẫu thành công!');
				await loadCohorts();
			} catch (err) {
				showToast(`❌ Lỗi: ${err.message}`);
			}
		};

		// =========================================================================
		// 4. COHORTS MANAGER (Collection 'cohorts')
		// =========================================================================
		let allCohorts = [];
		let cohortsLoaded = false;

		async function loadCohorts() {
			const container = document.getElementById('container-cohorts-list');
			const badge = document.getElementById('badge-count-cohorts');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải danh sách Lớp học từ Firestore...</span>
				</div>
			`;

			try {
				// Đảm bảo allCourses đã nạp để ánh xạ tên khóa
				if (allCourses.length === 0) {
					const cSnap = await db.collection('courses').get();
					allCourses = [];
					cSnap.forEach(d => allCourses.push({ id: d.id, ...d.data() }));
					populateCourseDropdowns();
				}

				const snapshot = await db.collection('cohorts').get();
				allCohorts = [];
				snapshot.forEach(doc => {
					allCohorts.push({ id: doc.id, ...doc.data() });
				});

				// Sắp xếp: lớp mới nhất lên đầu
				allCohorts.sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));

				// Cập nhật stats
				const statTotal = document.getElementById('stat-cohorts-total');
				const statEnrolling = document.getElementById('stat-cohorts-enrolling');
				const statInprogress = document.getElementById('stat-cohorts-inprogress');
				const statCompleted = document.getElementById('stat-cohorts-completed');

				if (statTotal) statTotal.textContent = allCohorts.length;
				if (statEnrolling) statEnrolling.textContent = allCohorts.filter(c => c.status === 'enrolling').length;
				if (statInprogress) statInprogress.textContent = allCohorts.filter(c => c.status === 'in_progress').length;
				if (statCompleted) statCompleted.textContent = allCohorts.filter(c => c.status === 'completed').length;
				if (badge) badge.textContent = allCohorts.length;

				renderCohorts();
				cohortsLoaded = true;
			} catch (err) {
				console.error('[loadCohorts] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Lớp học: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function renderCohorts() {
			const container = document.getElementById('container-cohorts-list');
			const searchInput = document.getElementById('search-cohorts');
			const courseFilter = document.getElementById('filter-cohort-course');

			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
			const selectedCourse = courseFilter ? courseFilter.value : 'all';

			let list = allCohorts;
			if (query) {
				list = list.filter(c =>
					(c.name && c.name.toLowerCase().includes(query)) ||
					(c.code && c.code.toLowerCase().includes(query))
				);
			}

			if (selectedCourse !== 'all') {
				list = list.filter(c => c.courseId === selectedCourse);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query || selectedCourse !== 'all' ? 'Không tìm thấy Lớp học phù hợp.' : 'Chưa có Lớp học nào trên Firestore.'}</span>
						${!query && selectedCourse === 'all' ? `
							<div class="d-flex gap-2 mt-2">
								<button type="button" class="btn-add" onclick="document.getElementById('btn-add-cohort').click()">+ Mở Lớp học mới</button>
								<button type="button" class="btn-outline-custom" onclick="window.adminDataManager.seedSampleCohorts()">⚡ Nạp Lớp học mẫu</button>
							</div>
						` : ''}
					</div>
				`;
				return;
			}

			const cohortStatusLabels = {
				enrolling: '<span class="admin-tag" style="background: rgba(255, 177, 66, 0.15); color: #ffb142; border-color: rgba(255, 177, 66, 0.3);">Tuyển sinh</span>',
				in_progress: '<span class="admin-tag" style="background: rgba(46, 213, 115, 0.15); color: #2ed573; border-color: rgba(46, 213, 115, 0.3);">Đang học</span>',
				completed: '<span class="admin-tag" style="background: rgba(112, 161, 255, 0.15); color: #70a1ff; border-color: rgba(112, 161, 255, 0.3);">Đã bế giảng</span>',
				paused: '<span class="admin-tag" style="background: rgba(120, 120, 120, 0.15); color: #888; border-color: rgba(120, 120, 120, 0.3);">Tạm dừng</span>'
			};

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="min-width: 160px;">Tên Lớp học</th>
							<th style="min-width: 180px;">Khóa học trực thuộc</th>
							<th style="width: 180px;">Thời gian học</th>
							<th style="width: 100px; text-align: center;">Học viên</th>
							<th style="width: 120px;">Trạng thái</th>
							<th style="min-width: 140px;">Giảng viên</th>
							<th style="width: 90px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => {
							const matchedCourse = allCourses.find(item => item.id === c.courseId);
							const studentCount = Array.isArray(c.studentEmails) ? c.studentEmails.length : 0;
							const instructors = Array.isArray(c.instructorEmails) ? c.instructorEmails.join(', ') : (c.instructorEmails || '—');

							return `
								<tr>
									<td>
										<div class="caption" style="font-weight: 600; color: var(--main-colors-foreground-f200);">${esc(c.name || '—')}</div>
										${c.code ? `<div class="x-small" style="color: var(--main-colors-foreground-f700); font-family: monospace;">Mã: ${esc(c.code)}</div>` : ''}
									</td>
									<td>
										${matchedCourse
											? `<span class="admin-tag" style="background: rgba(255, 199, 0, 0.12); color: var(--alternative-foreground-gold); border-color: rgba(255, 199, 0, 0.3); font-weight: 500;">${esc(matchedCourse.code)} - ${esc(matchedCourse.title)}</span>`
											: `<span class="caption" style="color: var(--main-colors-foreground-f700); font-style: italic;">(ID: ${esc(c.courseId || '—')})</span>`}
									</td>
									<td class="caption" style="color: var(--main-colors-foreground-f400); font-size: 12px;">
										${c.startDate ? esc(c.startDate) : '—'} → ${c.endDate ? esc(c.endDate) : '—'}
									</td>
									<td style="text-align: center;">
										<span class="role-cell member" style="font-weight: 600;">${studentCount} HV</span>
									</td>
									<td>${cohortStatusLabels[c.status] || esc(c.status || 'enrolling')}</td>
									<td class="caption" style="color: var(--main-colors-foreground-f400); font-size: 12px;">${esc(instructors)}</td>
									<td style="text-align: right;">
										<div class="d-inline-flex gap-1">
											<button class="btn-icon-action" title="Cấp Chứng Chỉ Tốt Nghiệp cho Lớp này" style="color: var(--alternative-foreground-gold);" onclick="window.adminDataManager.openBatchCreateCertsForCohort('${esc(c.id)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
											</button>
											<button class="btn-icon-action" title="Chỉnh sửa" onclick="window.adminDataManager.editCohort('${esc(c.id)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
											</button>
											<button class="btn-icon-action delete" title="Xóa" onclick="window.adminDataManager.deleteCohort('${esc(c.id)}', '${esc(c.name)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
											</button>
										</div>
									</td>
								</tr>
							`;
						}).join('')}
					</tbody>
				</table>
			`;
		}

		window.adminDataManager.editCohort = function (id) {
			const item = allCohorts.find(c => c.id === id);
			if (!item) return;

			populateCourseDropdowns();

			document.getElementById('modal-cohort-id').value = item.id;
			document.getElementById('modal-cohort-code').value = item.code || '';
			document.getElementById('modal-cohort-name').value = item.name || '';
			document.getElementById('modal-cohort-course-id').value = item.courseId || '';
			document.getElementById('modal-cohort-start-date').value = item.startDate || '';
			document.getElementById('modal-cohort-end-date').value = item.endDate || '';
			document.getElementById('modal-cohort-status').value = item.status || 'enrolling';
			document.getElementById('modal-cohort-student-emails').value = Array.isArray(item.studentEmails) ? item.studentEmails.join('\n') : '';
			document.getElementById('modal-cohort-instructor-emails').value = Array.isArray(item.instructorEmails) ? item.instructorEmails.join(', ') : (item.instructorEmails || '');
			document.getElementById('modal-cohort-notes').value = item.notes || '';
			document.getElementById('modal-cohort-title-header').textContent = `Chỉnh sửa Lớp: ${item.name}`;

			openModal('modal-cohort');
		};

		window.adminDataManager.deleteCohort = async function (id, name) {
			if (!confirm(`Bạn có chắc muốn xóa Lớp học "${name}"? Dữ liệu điểm danh và chứng chỉ của lớp có thể bị mất liên kết.`)) return;
			try {
				await db.collection('cohorts').doc(id).delete();
				showToast(`✅ Đã xóa Lớp học "${name}"`);
				await loadCohorts();
			} catch (err) {
				showToast(`❌ Lỗi khi xóa: ${err.message}`);
			}
		};

		// Submit form Cohort
		const formCohort = document.getElementById('form-modal-cohort');
		if (formCohort) {
			formCohort.addEventListener('submit', async (e) => {
				e.preventDefault();
				const idInput = document.getElementById('modal-cohort-id').value.trim();
				const code = document.getElementById('modal-cohort-code').value.trim().toUpperCase();
				const name = document.getElementById('modal-cohort-name').value.trim();
				const courseId = document.getElementById('modal-cohort-course-id').value;
				const startDate = document.getElementById('modal-cohort-start-date').value;
				const endDate = document.getElementById('modal-cohort-end-date').value;
				const status = document.getElementById('modal-cohort-status').value;
				const rawStudentEmails = document.getElementById('modal-cohort-student-emails').value;
				const rawInstructors = document.getElementById('modal-cohort-instructor-emails').value.trim();
				const notes = document.getElementById('modal-cohort-notes').value.trim();

				if (!courseId) {
					showToast('⚠️ Vui lòng chọn Khóa học liên kết!');
					return;
				}

				// Parse student emails
				const studentEmails = rawStudentEmails
					.split(/\r?\n/)
					.map(s => s.trim().toLowerCase())
					.filter(s => s.includes('@'));

				// Parse instructor emails
				const instructorEmails = rawInstructors
					.split(',')
					.map(s => s.trim().toLowerCase())
					.filter(Boolean);

				const btnSave = formCohort.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					const id = idInput || generateUUID();
					const cohortData = {
						id,
						code,
						name,
						courseId,
						startDate,
						endDate,
						status,
						studentEmails,
						instructorEmails,
						notes,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					};

					if (!idInput) {
						cohortData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
					}

					await db.collection('cohorts').doc(id).set(cohortData, { merge: true });
					showToast(`✅ Đã lưu Lớp học "${name}" với ${studentEmails.length} học viên`);
					closeModal('modal-cohort');
					formCohort.reset();
					await loadCohorts();
				} catch (err) {
					showToast(`❌ Lỗi khi lưu: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		// Button events for Cohorts
		const btnAddCohort = document.getElementById('btn-add-cohort');
		if (btnAddCohort) {
			btnAddCohort.addEventListener('click', () => {
				populateCourseDropdowns();
				if (formCohort) formCohort.reset();
				document.getElementById('modal-cohort-id').value = '';
				document.getElementById('modal-cohort-code').value = '';
				document.getElementById('modal-cohort-notes').value = '';
				document.getElementById('modal-cohort-title-header').textContent = 'Mở Lớp Học Mới (Cohort)';
				openModal('modal-cohort');
			});
		}

		const btnRefreshCohorts = document.getElementById('btn-refresh-cohorts');
		if (btnRefreshCohorts) btnRefreshCohorts.addEventListener('click', loadCohorts);

		const searchCohortsInput = document.getElementById('search-cohorts');
		if (searchCohortsInput) searchCohortsInput.addEventListener('input', renderCohorts);

		const filterCohortCourse = document.getElementById('filter-cohort-course');
		if (filterCohortCourse) filterCohortCourse.addEventListener('change', renderCohorts);

		const btnExportCohorts = document.getElementById('btn-export-cohorts');
		if (btnExportCohorts) {
			btnExportCohorts.addEventListener('click', () => {
				downloadJSON(allCohorts, `cohorts_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}


		// =========================================================================
		// =========================================================================
		// 4.1 CERTIFICATES MANAGER (Collection 'certificates')
		// =========================================================================
		let allCertificates = [];
		let currentFilteredCertificates = [];
		let selectedCertIds = new Set();
		let certificatesLoaded = false;

		async function loadCertificates() {
			const container = document.getElementById('container-certificates-list');
			const badge = document.getElementById('badge-count-certificates');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải danh sách Chứng chỉ từ Firestore...</span>
				</div>
			`;

			try {
				// Đảm bảo cohorts & courses đã nạp để ánh xạ dropdown & lớp
				if (allCohorts.length === 0) {
					const chSnap = await db.collection('cohorts').get();
					allCohorts = [];
					chSnap.forEach(d => allCohorts.push({ id: d.id, ...d.data() }));
				}
				if (allCourses.length === 0) {
					const coSnap = await db.collection('courses').get();
					allCourses = [];
					coSnap.forEach(d => allCourses.push({ id: d.id, ...d.data() }));
				}

				const snapshot = await db.collection('certificates').get();
				allCertificates = [];
				snapshot.forEach(doc => {
					allCertificates.push({ id: doc.id, ...doc.data() });
				});

				// Sắp xếp: ngày cấp mới nhất lên đầu, rồi tới tên học viên
				allCertificates.sort((a, b) => {
					const dateDiff = (b.issueDate || '').localeCompare(a.issueDate || '');
					if (dateDiff !== 0) return dateDiff;
					return (a.recipientName || '').localeCompare(b.recipientName || '');
				});

				// Cập nhật stats
				const statTotal = document.getElementById('stat-certificates-total');
				const statLinkedCohort = document.getElementById('stat-certificates-linked-cohort');
				const statLinkedUser = document.getElementById('stat-certificates-linked-user');
				const statActive = document.getElementById('stat-certificates-active');

				if (statTotal) statTotal.textContent = allCertificates.length;
				if (statLinkedCohort) statLinkedCohort.textContent = allCertificates.filter(c => Boolean(c.cohortId)).length;
				if (statLinkedUser) statLinkedUser.textContent = allCertificates.filter(c => Boolean(c.userId || c.recipientEmail)).length;
				if (statActive) statActive.textContent = allCertificates.filter(c => c.status !== 'revoked').length;
				if (badge) badge.textContent = allCertificates.length;

				populateFilterAndCohortDropdowns();
				renderCertificates();
				certificatesLoaded = true;
			} catch (err) {
				console.error('[loadCertificates] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Chứng chỉ: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function populateFilterAndCohortDropdowns() {
			const selectCohort = document.getElementById('modal-cert-cohort-id');
			const filterCohort = document.getElementById('filter-certificate-cohort');
			const filterCourse = document.getElementById('filter-certificate-course');
			const batchSelectCohort = document.getElementById('batch-cohort-select');

			// Thu thập danh sách Lớp học (từ allCohorts + unique cohortName từ allCertificates)
			const cohortsMap = new Map();
			allCohorts.forEach(ch => {
				const label = `${ch.code ? ch.code + ' - ' : ''}${ch.name || ch.id}`;
				cohortsMap.set(ch.id, { id: ch.id, label: label, name: ch.name || '', courseTitle: ch.courseTitle || '' });
			});

			const uniqueCohortNames = new Set();
			allCertificates.forEach(c => {
				if (c.cohortName && c.cohortName.trim()) {
					uniqueCohortNames.add(c.cohortName.trim());
				}
			});

			// Tạo options cho modal chọn Cohort chính thống
			const cohortStandardOptions = Array.from(cohortsMap.values()).map(item =>
				`<option value="${esc(item.id)}">${esc(item.label)}</option>`
			).join('');

			if (selectCohort) {
				const curVal = selectCohort.value;
				selectCohort.innerHTML = `
					<option value="" selected>-- Chọn lớp học liên kết --</option>
					${cohortStandardOptions}
				`;
				if (curVal) selectCohort.value = curVal;
			}

			if (batchSelectCohort) {
				batchSelectCohort.innerHTML = `
					<option value="" selected>-- Chọn lớp học --</option>
					${cohortStandardOptions}
				`;
			}

			const batchCreateCohortSelect = document.getElementById('batch-create-cohort-select');
			if (batchCreateCohortSelect) {
				const curVal = batchCreateCohortSelect.value;
				batchCreateCohortSelect.innerHTML = `
					<option value="" disabled ${!curVal ? 'selected' : ''}>-- Chọn lớp học tốt nghiệp --</option>
					${cohortStandardOptions}
				`;
				if (curVal) batchCreateCohortSelect.value = curVal;
			}

			// Tạo options cho bộ lọc Lớp học (gồm cả Cohort chính thức & Cohort Name từ chứng chỉ lịch sử)
			if (filterCohort) {
				const curFilter = filterCohort.value;
				let filterOpts = `<option value="all">Tất cả lớp học</option>`;
				if (cohortsMap.size > 0) {
					filterOpts += `<optgroup label="Lớp học trên hệ thống">`;
					cohortsMap.forEach(item => {
						filterOpts += `<option value="id:${esc(item.id)}">${esc(item.label)}</option>`;
					});
					filterOpts += `</optgroup>`;
				}
				if (uniqueCohortNames.size > 0) {
					filterOpts += `<optgroup label="Theo tên Lớp học">`;
					uniqueCohortNames.forEach(cName => {
						filterOpts += `<option value="name:${esc(cName)}">${esc(cName)}</option>`;
					});
					filterOpts += `</optgroup>`;
				}
				filterCohort.innerHTML = filterOpts;
				if (curFilter) filterCohort.value = curFilter;
			}

			// Tạo options cho bộ lọc Khóa học
			if (filterCourse) {
				const curCourseFilter = filterCourse.value;
				const courseTitles = new Set();
				allCourses.forEach(c => { if (c.title) courseTitles.add(c.title); });
				allCertificates.forEach(c => { if (c.courseTitle) courseTitles.add(c.courseTitle); });

				let courseOpts = `<option value="all">Tất cả khóa học</option>`;
				courseTitles.forEach(t => {
					courseOpts += `<option value="${esc(t)}">${esc(t)}</option>`;
				});
				filterCourse.innerHTML = courseOpts;
				if (curCourseFilter) filterCourse.value = curCourseFilter;
			}
		}

		function updateBatchActionBar() {
			const bar = document.getElementById('cert-batch-action-bar');
			const countSpan = document.getElementById('cert-batch-selected-count');
			const selectAllCheckbox = document.getElementById('select-all-certs');

			const count = selectedCertIds.size;
			if (countSpan) countSpan.textContent = `Đã chọn: ${count}`;

			if (bar) {
				if (count > 0) {
					bar.classList.add('active');
				} else {
					bar.classList.remove('active');
				}
			}

			// Cập nhật trạng thái select-all checkbox
			if (selectAllCheckbox && currentFilteredCertificates.length > 0) {
				const allVisibleSelected = currentFilteredCertificates.every(c => selectedCertIds.has(c.id));
				const someVisibleSelected = currentFilteredCertificates.some(c => selectedCertIds.has(c.id));
				selectAllCheckbox.checked = allVisibleSelected;
				selectAllCheckbox.indeterminate = !allVisibleSelected && someVisibleSelected;
			}

			// Highlight các dòng được chọn trong table
			document.querySelectorAll('.cert-row').forEach(tr => {
				const id = tr.dataset.certId;
				if (selectedCertIds.has(id)) {
					tr.classList.add('table-row-selected');
				} else {
					tr.classList.remove('table-row-selected');
				}
			});
		}

		function renderCertificates() {
			const container = document.getElementById('container-certificates-list');
			const searchInput = document.getElementById('search-certificates');
			const cohortFilter = document.getElementById('filter-certificate-cohort');
			const courseFilter = document.getElementById('filter-certificate-course');
			const statusFilter = document.getElementById('filter-certificate-status');
			const healthFilter = document.getElementById('filter-certificate-health');
			const countBadge = document.getElementById('cert-counter-badge');

			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
			const selectedCohort = cohortFilter ? cohortFilter.value : 'all';
			const selectedCourse = courseFilter ? courseFilter.value : 'all';
			const selectedStatus = statusFilter ? statusFilter.value : 'all';
			const selectedHealth = healthFilter ? healthFilter.value : 'all';

			let list = allCertificates;

			// 1. Lọc theo từ khóa tìm kiếm
			if (query) {
				list = list.filter(c =>
					(c.recipientName && c.recipientName.toLowerCase().includes(query)) ||
					(c.recipientEmail && c.recipientEmail.toLowerCase().includes(query)) ||
					(c.certificateCode && c.certificateCode.toLowerCase().includes(query)) ||
					(c.cohortName && c.cohortName.toLowerCase().includes(query)) ||
					(c.courseTitle && c.courseTitle.toLowerCase().includes(query)) ||
					(c.id && c.id.toLowerCase().includes(query))
				);
			}

			// 2. Lọc theo Lớp học
			if (selectedCohort !== 'all') {
				if (selectedCohort.startsWith('id:')) {
					const cid = selectedCohort.substring(3);
					list = list.filter(c => c.cohortId === cid);
				} else if (selectedCohort.startsWith('name:')) {
					const cname = selectedCohort.substring(5);
					list = list.filter(c => c.cohortName === cname);
				} else {
					list = list.filter(c => c.cohortId === selectedCohort || c.cohortName === selectedCohort);
				}
			}

			// 3. Lọc theo Khóa học
			if (selectedCourse !== 'all') {
				list = list.filter(c => c.courseTitle === selectedCourse || c.courseId === selectedCourse);
			}

			// 4. Lọc theo Trạng thái
			if (selectedStatus !== 'all') {
				if (selectedStatus === 'active') {
					list = list.filter(c => c.status !== 'revoked');
				} else if (selectedStatus === 'revoked') {
					list = list.filter(c => c.status === 'revoked');
				}
			}

			// 5. Lọc theo Kiểm tra chất lượng dữ liệu
			if (selectedHealth !== 'all') {
				if (selectedHealth === 'missing-date') {
					list = list.filter(c => !c.issueDate || !c.issueDate.trim());
				} else if (selectedHealth === 'missing-cohort-link') {
					list = list.filter(c => !c.cohortId || !c.cohortId.trim());
				} else if (selectedHealth === 'missing-image') {
					list = list.filter(c => !c.certificateImageUrl || !c.certificateImageUrl.trim());
				} else if (selectedHealth === 'missing-pdf') {
					list = list.filter(c => !c.certificatePdfUrl || !c.certificatePdfUrl.trim());
				}
			}

			currentFilteredCertificates = list;

			if (countBadge) {
				countBadge.textContent = `Hiển thị: ${list.length}/${allCertificates.length} chứng chỉ`;
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query || selectedCohort !== 'all' || selectedCourse !== 'all' || selectedStatus !== 'all' || selectedHealth !== 'all' ? 'Không tìm thấy Chứng chỉ phù hợp bộ lọc hiện tại.' : 'Chưa có Chứng chỉ nào trên Firestore.'}</span>
						<div class="d-flex gap-2 mt-2">
							<button type="button" class="btn-outline-custom" id="btn-reset-filters-empty">✕ Đặt lại bộ lọc</button>
							<button type="button" class="btn-add" onclick="document.getElementById('btn-add-certificate').click()">+ Cấp Chứng Chỉ Mới</button>
						</div>
					</div>
				`;
				const btnEmptyReset = document.getElementById('btn-reset-filters-empty');
				if (btnEmptyReset) {
					btnEmptyReset.addEventListener('click', resetCertificateFilters);
				}
				updateBatchActionBar();
				return;
			}

			const allVisibleSelected = list.length > 0 && list.every(c => selectedCertIds.has(c.id));

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 40px; text-align: center;">
								<input type="checkbox" id="select-all-certs" ${allVisibleSelected ? 'checked' : ''} title="Chọn tất cả bản ghi hiển thị">
							</th>
							<th style="width: 60px; text-align: center;">Ảnh bằng</th>
							<th style="width: 150px;">Mã / UUID</th>
							<th style="min-width: 190px;">Học viên Nhận Bằng</th>
							<th style="min-width: 180px;">Lớp Học & Khóa</th>
							<th style="width: 110px;">Ngày cấp</th>
							<th style="width: 75px; text-align: center;">File PDF</th>
							<th style="width: 105px; text-align: center;">Trạng thái</th>
							<th style="width: 115px; text-align: center;">Xác thực</th>
							<th style="width: 85px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => {
							const isSelected = selectedCertIds.has(c.id);
							const matchedCohort = allCohorts.find(ch => ch.id === c.cohortId);
							const cohortDisplay = matchedCohort ? (matchedCohort.code || matchedCohort.name) : (c.cohortName || '—');
							const verifyUrl = `certificate/individual.html?id=${encodeURIComponent(c.id)}`;
							const shortId = c.id && c.id.length > 12 ? `${c.id.substring(0, 8)}...` : (c.id || '—');
							const imgUrl = c.certificateImageUrl || '';
							const isRevoked = c.status === 'revoked';

							return `
								<tr class="cert-row ${isSelected ? 'table-row-selected' : ''}" data-cert-id="${esc(c.id)}">
									<td style="text-align: center;">
										<input type="checkbox" class="cert-row-checkbox" data-id="${esc(c.id)}" ${isSelected ? 'checked' : ''}>
									</td>
									<td style="text-align: center;">
										${imgUrl ? `
											<a href="${esc(imgUrl)}" target="_blank" rel="noopener" title="Xem ảnh chứng chỉ">
												<img src="${esc(imgUrl)}" alt="Cert" class="cert-thumb">
											</a>
										` : '<span class="admin-tag" style="background: rgba(235, 77, 75, 0.1); color: #eb4d4b; font-size: 10px;" title="Chưa có ảnh bằng">Thiếu ảnh</span>'}
									</td>
									<td>
										<div class="d-flex align-items-center gap-1">
											<span class="caption" style="font-weight: 700; font-family: monospace; color: var(--alternative-foreground-gold);">${esc(c.certificateCode || 'CERT')}</span>
											<button type="button" class="btn-copy-mini" title="Copy mã Code" onclick="window.adminDataManager.copyToClipboard('${esc(c.certificateCode || '')}')">
												<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
											</button>
										</div>
										<div class="d-flex align-items-center gap-1 mt-1">
											<span class="x-small" style="color: var(--main-colors-foreground-f700); font-family: monospace;" title="UUID v4: ${esc(c.id)}">${esc(shortId)}</span>
											<button type="button" class="btn-copy-mini" title="Copy UUID v4" onclick="window.adminDataManager.copyToClipboard('${esc(c.id)}')">
												<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
											</button>
											${c.migratedFromGoogleSheet ? `<span class="admin-tag" style="font-size: 9px; padding: 1px 4px; background: rgba(255, 199, 0, 0.08); color: var(--alternative-foreground-gold); border-color: rgba(255, 199, 0, 0.2);">Sheet</span>` : ''}
										</div>
									</td>
									<td>
										<div class="caption" style="font-weight: 600; color: var(--main-colors-foreground-f200);">${esc(c.recipientName || 'Chưa đặt tên')}</div>
										<div class="x-small" style="color: var(--main-colors-foreground-f600);">${esc(c.recipientEmail || '—')}</div>
										${c.recipientSocialLink ? `<a href="${esc(c.recipientSocialLink)}" target="_blank" rel="noopener" class="x-small" style="color: #1e90ff; text-decoration: none; display: inline-block; margin-top: 2px;">🔗 LinkedIn ↗</a>` : ''}
									</td>
									<td>
										<span class="admin-tag" style="background: rgba(255, 199, 0, 0.1); color: var(--alternative-foreground-gold); border-color: rgba(255, 199, 0, 0.25); font-weight: 500;">${esc(cohortDisplay)}</span>
										${!c.cohortId ? `<span class="x-small" style="color: #f39c12; display: block; margin-top: 2px;" title="Chưa liên kết Cohort Document">⚠️ Chưa link CohortId</span>` : ''}
										${c.courseTitle ? `<div class="x-small" style="color: var(--main-colors-foreground-f700); margin-top: 2px; max-width: 220px; white-space: normal; line-height: 1.3;">${esc(c.courseTitle)}</div>` : ''}
									</td>
									<td>
										${c.issueDate ? `
											<span class="caption" style="color: var(--main-colors-foreground-f300); font-size: 12px;">${esc(c.issueDate)}</span>
										` : `
											<span class="admin-tag" style="background: rgba(243, 156, 18, 0.15); color: #f39c12; border-color: rgba(243, 156, 18, 0.3); font-size: 11px;">⚠️ Thiếu ngày</span>
										`}
									</td>
									<td style="text-align: center;">
										${c.certificatePdfUrl ? `
											<a href="${esc(c.certificatePdfUrl)}" target="_blank" rel="noopener" class="admin-tag" style="background: rgba(30, 144, 255, 0.1); color: #1e90ff; border-color: rgba(30, 144, 255, 0.25); font-size: 11px; text-decoration: none;" title="Tải/Xem File PDF">
												PDF ↗
											</a>
										` : `<span class="x-small" style="color: var(--main-colors-foreground-f800);">—</span>`}
									</td>
									<td style="text-align: center;">
										<span class="admin-tag badge-clickable" onclick="window.adminDataManager.quickToggleCertStatus('${esc(c.id)}')"
											style="${isRevoked ? 'background: rgba(235, 77, 75, 0.15); color: #eb4d4b; border-color: rgba(235, 77, 75, 0.3);' : 'background: rgba(46, 213, 115, 0.15); color: #2ed573; border-color: rgba(46, 213, 115, 0.3);'}"
											title="Bấm để đổi sang ${isRevoked ? 'Hiệu lực (Active)' : 'Thu hồi (Revoked)'}">
											${isRevoked ? '✕ Thu hồi' : '● Hiệu lực'}
										</span>
									</td>
									<td style="text-align: center;">
										<div class="d-inline-flex gap-1 align-items-center">
											<a href="${verifyUrl}" target="_blank" rel="noopener" class="admin-tag" style="background: rgba(30, 144, 255, 0.12); color: #1e90ff; border-color: rgba(30, 144, 255, 0.25); text-decoration: none; font-size: 11px;">
												Xem ↗
											</a>
											<button type="button" class="btn-icon-action" title="Copy link xác thực công khai" onclick="window.adminDataManager.copyCertLink('${esc(c.id)}')">
												<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
											</button>
										</div>
									</td>
									<td style="text-align: right;">
										<div class="d-inline-flex gap-1">
											<button type="button" class="btn-icon-action" title="Chỉnh sửa chi tiết (Bảo toàn UUID)" onclick="window.adminDataManager.editCertificate('${esc(c.id)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
											</button>
											<button type="button" class="btn-icon-action delete" title="Xóa" onclick="window.adminDataManager.deleteCertificate('${esc(c.id)}', '${esc(c.recipientName || c.id)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
											</button>
										</div>
									</td>
								</tr>
							`;
						}).join('')}
					</tbody>
				</table>
			`;

			// Gắn sự kiện checkbox
			const selectAllBox = document.getElementById('select-all-certs');
			if (selectAllBox) {
				selectAllBox.addEventListener('change', (e) => {
					const checked = e.target.checked;
					list.forEach(c => {
						if (checked) {
							selectedCertIds.add(c.id);
						} else {
							selectedCertIds.delete(c.id);
						}
					});
					updateBatchActionBar();
				});
			}

			container.querySelectorAll('.cert-row-checkbox').forEach(cb => {
				cb.addEventListener('change', (e) => {
					const id = e.target.dataset.id;
					if (e.target.checked) {
						selectedCertIds.add(id);
					} else {
						selectedCertIds.delete(id);
					}
					updateBatchActionBar();
				});
			});

			updateBatchActionBar();
		}

		function resetCertificateFilters() {
			const searchInput = document.getElementById('search-certificates');
			const cohortFilter = document.getElementById('filter-certificate-cohort');
			const courseFilter = document.getElementById('filter-certificate-course');
			const statusFilter = document.getElementById('filter-certificate-status');
			const healthFilter = document.getElementById('filter-certificate-health');

			if (searchInput) searchInput.value = '';
			if (cohortFilter) cohortFilter.value = 'all';
			if (courseFilter) courseFilter.value = 'all';
			if (statusFilter) statusFilter.value = 'all';
			if (healthFilter) healthFilter.value = 'all';

			renderCertificates();
		}

		window.adminDataManager.copyToClipboard = function (text) {
			if (!text) return;
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(() => showToast(`📋 Đã copy: ${text}`));
			} else {
				prompt('Copy nội dung:', text);
			}
		};

		window.adminDataManager.copyCertLink = function (id) {
			const url = `${window.location.origin}${window.location.pathname.replace(/admin\.html$/, '')}certificate/individual.html?id=${id}`;
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(url).then(() => showToast('📋 Đã copy link xác thực chứng chỉ!'));
			} else {
				prompt('Link chứng chỉ xác thực:', url);
			}
		};

		// 1-Click Quick Toggle Certificate Status
		window.adminDataManager.quickToggleCertStatus = async function (id) {
			const cert = allCertificates.find(c => c.id === id);
			if (!cert) return;

			const newStatus = cert.status === 'revoked' ? 'active' : 'revoked';
			const actionName = newStatus === 'active' ? 'Kích hoạt hiệu lực' : 'Thu hồi';

			// Optimistic UI update
			cert.status = newStatus;
			renderCertificates();

			try {
				await db.collection('certificates').doc(id).update({
					status: newStatus,
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				});
				showToast(`⚡ Đã ${actionName} chứng chỉ của "${cert.recipientName || id}"`);
				const statActive = document.getElementById('stat-certificates-active');
				if (statActive) statActive.textContent = allCertificates.filter(c => c.status !== 'revoked').length;
			} catch (err) {
				console.error('[quickToggleCertStatus] Error:', err);
				showToast(`❌ Lỗi cập nhật trạng thái: ${err.message}`);
				// Revert on failure
				cert.status = newStatus === 'active' ? 'revoked' : 'active';
				renderCertificates();
			}
		};

		window.adminDataManager.editCertificate = function (id) {
			const item = allCertificates.find(c => c.id === id);
			if (!item) return;

			populateFilterAndCohortDropdowns();

			document.getElementById('modal-cert-id').value = item.id;
			document.getElementById('modal-cert-id').readOnly = true;
			document.getElementById('modal-cert-code').value = item.certificateCode || '';
			document.getElementById('modal-cert-status').value = item.status || 'active';
			document.getElementById('modal-cert-cohort-id').value = item.cohortId || '';
			document.getElementById('modal-cert-cohort-name').value = item.cohortName || '';
			document.getElementById('modal-cert-course-title').value = item.courseTitle || '';
			document.getElementById('modal-cert-recipient-email').value = item.recipientEmail || '';
			document.getElementById('modal-cert-recipient-name').value = item.recipientName || '';
			document.getElementById('modal-cert-image-url').value = item.certificateImageUrl || '';
			document.getElementById('modal-cert-pdf-url').value = item.certificatePdfUrl || '';
			document.getElementById('modal-cert-issue-date').value = item.issueDate || '';
			document.getElementById('modal-cert-social-link').value = item.recipientSocialLink || '';
			document.getElementById('modal-cert-title-header').textContent = `Chỉnh sửa Chứng chỉ: ${item.recipientName || item.id}`;

			openModal('modal-certificate');
		};

		window.adminDataManager.deleteCertificate = async function (id, name) {
			if (!confirm(`Bạn có chắc muốn xóa Chứng chỉ của "${name}"?\nLink tra cứu cá nhân cho chứng chỉ này sẽ không còn hoạt động.`)) return;
			try {
				await db.collection('certificates').doc(id).delete();
				showToast(`✅ Đã xóa Chứng chỉ của "${name}"`);
				selectedCertIds.delete(id);
				await loadCertificates();
			} catch (err) {
				showToast(`❌ Lỗi khi xóa: ${err.message}`);
			}
		};

		// =========================================================================
		// BATCH OPERATIONS FOR CERTIFICATES
		// =========================================================================
		// 1. Batch Assign Cohort
		const btnBatchAssignCohort = document.getElementById('btn-batch-assign-cohort');
		if (btnBatchAssignCohort) {
			btnBatchAssignCohort.addEventListener('click', () => {
				if (selectedCertIds.size === 0) return;
				populateFilterAndCohortDropdowns();
				const countText = document.getElementById('batch-cohort-count-text');
				if (countText) countText.textContent = selectedCertIds.size;
				openModal('modal-batch-cert-cohort');
			});
		}

		const formBatchCohort = document.getElementById('form-batch-cert-cohort');
		if (formBatchCohort) {
			formBatchCohort.addEventListener('submit', async (e) => {
				e.preventDefault();
				if (selectedCertIds.size === 0) return;

				const selectCohortId = document.getElementById('batch-cohort-select').value;
				const customCohortName = document.getElementById('batch-cohort-custom-name').value.trim();
				const customCourseTitle = document.getElementById('batch-cohort-course-title').value.trim();

				let cohortId = selectCohortId || '';
				let cohortName = customCohortName;
				let courseId = '';
				let courseTitle = customCourseTitle;

				if (selectCohortId) {
					const matched = allCohorts.find(ch => ch.id === selectCohortId);
					if (matched) {
						if (!cohortName) cohortName = matched.name || matched.code || '';
						courseId = matched.courseId || '';
						if (!courseTitle) {
							const co = allCourses.find(c => c.id === courseId);
							courseTitle = (co ? co.title : matched.courseTitle) || '';
						}
					}
				}

				if (!cohortName && !cohortId) {
					showToast('⚠️ Vui lòng chọn Lớp học hoặc nhập tên Lớp tùy chỉnh!');
					return;
				}

				const btnSubmit = formBatchCohort.querySelector('button[type="submit"]');
				if (btnSubmit) btnSubmit.disabled = true;

				showToast(`⏳ Đang cập nhật Lớp học cho ${selectedCertIds.size} chứng chỉ...`);

				try {
					const idList = Array.from(selectedCertIds);
					const BATCH_SIZE = 400;

					for (let i = 0; i < idList.length; i += BATCH_SIZE) {
						const chunk = idList.slice(i, i + BATCH_SIZE);
						const batch = db.batch();

						chunk.forEach(cid => {
							const ref = db.collection('certificates').doc(cid);
							const updateData = {
								cohortId: cohortId,
								cohortName: cohortName,
								updatedAt: firebase.firestore.FieldValue.serverTimestamp()
							};
							if (courseId) updateData.courseId = courseId;
							if (courseTitle) updateData.courseTitle = courseTitle;
							batch.update(ref, updateData);
						});

						await batch.commit();
					}

					showToast(`✅ Đã gán lớp "${cohortName}" thành công cho ${idList.length} chứng chỉ!`);
					closeModal('modal-batch-cert-cohort');
					formBatchCohort.reset();
					selectedCertIds.clear();
					await loadCertificates();
				} catch (err) {
					console.error('[batchAssignCohort] Error:', err);
					showToast(`❌ Lỗi cập nhật hàng loạt: ${err.message}`);
				} finally {
					if (btnSubmit) btnSubmit.disabled = false;
				}
			});
		}

		// 2. Batch Update Issue Date
		const btnBatchSetDate = document.getElementById('btn-batch-set-date');
		if (btnBatchSetDate) {
			btnBatchSetDate.addEventListener('click', () => {
				if (selectedCertIds.size === 0) return;
				const countText = document.getElementById('batch-date-count-text');
				if (countText) countText.textContent = selectedCertIds.size;
				const dateInput = document.getElementById('batch-date-input');
				if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
				openModal('modal-batch-cert-date');
			});
		}

		const formBatchDate = document.getElementById('form-batch-cert-date');
		if (formBatchDate) {
			formBatchDate.addEventListener('submit', async (e) => {
				e.preventDefault();
				if (selectedCertIds.size === 0) return;

				const newDate = document.getElementById('batch-date-input').value;
				if (!newDate) {
					showToast('⚠️ Vui lòng chọn ngày cấp!');
					return;
				}

				const btnSubmit = formBatchDate.querySelector('button[type="submit"]');
				if (btnSubmit) btnSubmit.disabled = true;

				showToast(`⏳ Đang cập nhật ngày cấp cho ${selectedCertIds.size} chứng chỉ...`);

				try {
					const idList = Array.from(selectedCertIds);
					const BATCH_SIZE = 400;

					for (let i = 0; i < idList.length; i += BATCH_SIZE) {
						const chunk = idList.slice(i, i + BATCH_SIZE);
						const batch = db.batch();

						chunk.forEach(cid => {
							const ref = db.collection('certificates').doc(cid);
							batch.update(ref, {
								issueDate: newDate,
								updatedAt: firebase.firestore.FieldValue.serverTimestamp()
							});
						});

						await batch.commit();
					}

					showToast(`✅ Đã cập nhật ngày cấp (${newDate}) cho ${idList.length} chứng chỉ!`);
					closeModal('modal-batch-cert-date');
					formBatchDate.reset();
					selectedCertIds.clear();
					await loadCertificates();
				} catch (err) {
					console.error('[batchUpdateDate] Error:', err);
					showToast(`❌ Lỗi cập nhật ngày cấp: ${err.message}`);
				} finally {
					if (btnSubmit) btnSubmit.disabled = false;
				}
			});
		}

		// 3. Batch Activate
		const btnBatchActivate = document.getElementById('btn-batch-activate');
		if (btnBatchActivate) {
			btnBatchActivate.addEventListener('click', async () => {
				if (selectedCertIds.size === 0) return;
				if (!confirm(`Bạn có muốn kích hoạt HIỆU LỰC (Active) cho ${selectedCertIds.size} chứng chỉ đã chọn?`)) return;

				showToast(`⏳ Đang kích hoạt ${selectedCertIds.size} chứng chỉ...`);
				try {
					const idList = Array.from(selectedCertIds);
					const BATCH_SIZE = 400;

					for (let i = 0; i < idList.length; i += BATCH_SIZE) {
						const chunk = idList.slice(i, i + BATCH_SIZE);
						const batch = db.batch();

						chunk.forEach(cid => {
							const ref = db.collection('certificates').doc(cid);
							batch.update(ref, {
								status: 'active',
								updatedAt: firebase.firestore.FieldValue.serverTimestamp()
							});
						});

						await batch.commit();
					}

					showToast(`✅ Đã chuyển ${idList.length} chứng chỉ sang trạng thái Hiệu lực!`);
					selectedCertIds.clear();
					await loadCertificates();
				} catch (err) {
					showToast(`❌ Lỗi kích hoạt hàng loạt: ${err.message}`);
				}
			});
		}

		// 4. Batch Revoke
		const btnBatchRevoke = document.getElementById('btn-batch-revoke');
		if (btnBatchRevoke) {
			btnBatchRevoke.addEventListener('click', async () => {
				if (selectedCertIds.size === 0) return;
				if (!confirm(`Bạn có muốn THU HỒI (Revoke) ${selectedCertIds.size} chứng chỉ đã chọn? Link tra cứu của những chứng chỉ này sẽ hiển thị đã thu hồi.`)) return;

				showToast(`⏳ Đang thu hồi ${selectedCertIds.size} chứng chỉ...`);
				try {
					const idList = Array.from(selectedCertIds);
					const BATCH_SIZE = 400;

					for (let i = 0; i < idList.length; i += BATCH_SIZE) {
						const chunk = idList.slice(i, i + BATCH_SIZE);
						const batch = db.batch();

						chunk.forEach(cid => {
							const ref = db.collection('certificates').doc(cid);
							batch.update(ref, {
								status: 'revoked',
								updatedAt: firebase.firestore.FieldValue.serverTimestamp()
							});
						});

						await batch.commit();
					}

					showToast(`✅ Đã thu hồi ${idList.length} chứng chỉ!`);
					selectedCertIds.clear();
					await loadCertificates();
				} catch (err) {
					showToast(`❌ Lỗi thu hồi hàng loạt: ${err.message}`);
				}
			});
		}

		// 5. Batch Delete
		const btnBatchDelete = document.getElementById('btn-batch-delete');
		if (btnBatchDelete) {
			btnBatchDelete.addEventListener('click', async () => {
				if (selectedCertIds.size === 0) return;
				const confirmed = confirm(
					`⚠️ CẢNH BÁO NGUY HIỂM:\n\n` +
					`Bạn có chắc chắn muốn XÓA VĨNH VIỄN ${selectedCertIds.size} chứng chỉ đã chọn?\n` +
					`Hành động này không thể hoàn tác và link tra cứu tương ứng sẽ bị vô hiệu hoàn toàn.`
				);
				if (!confirmed) return;

				showToast(`⏳ Đang xóa ${selectedCertIds.size} chứng chỉ...`);
				try {
					const idList = Array.from(selectedCertIds);
					const BATCH_SIZE = 400;

					for (let i = 0; i < idList.length; i += BATCH_SIZE) {
						const chunk = idList.slice(i, i + BATCH_SIZE);
						const batch = db.batch();

						chunk.forEach(cid => {
							const ref = db.collection('certificates').doc(cid);
							batch.delete(ref);
						});

						await batch.commit();
					}

					showToast(`✅ Đã xóa vĩnh viễn ${idList.length} chứng chỉ!`);
					selectedCertIds.clear();
					await loadCertificates();
				} catch (err) {
					showToast(`❌ Lỗi xóa hàng loạt: ${err.message}`);
				}
			});
		}

		// 6. Deselect all
		const btnBatchDeselect = document.getElementById('btn-batch-deselect');
		if (btnBatchDeselect) {
			btnBatchDeselect.addEventListener('click', () => {
				selectedCertIds.clear();
				updateBatchActionBar();
			});
		}

		// =========================================================================
		// 7. BATCH CREATE CERTIFICATES FOR AN ENTIRE COHORT
		// =========================================================================
		function slugifyVietnamese(str) {
			if (!str) return '';
			return str
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/[đĐ]/g, 'd')
				.replace(/[^a-z0-9]/g, '')
				.trim();
		}

		window.adminDataManager.openBatchCreateCertsModal = function (targetCohortId) {
			populateFilterAndCohortDropdowns();
			const cohortSelect = document.getElementById('batch-create-cohort-select');
			const previewContainer = document.getElementById('batch-create-preview-container');

			if (previewContainer) previewContainer.style.display = 'none';

			if (targetCohortId && cohortSelect) {
				cohortSelect.value = targetCohortId;
				onBatchCreateCohortChanged(targetCohortId);
			} else if (cohortSelect && cohortSelect.options.length > 1) {
				cohortSelect.selectedIndex = 1;
				onBatchCreateCohortChanged(cohortSelect.value);
			}

			openModal('modal-batch-create-certs');
		};

		window.adminDataManager.openBatchCreateCertsForCohort = function (cohortId) {
			if (cohortId) {
				window.location.href = `LMS/certificate/create.html?mode=batch&cohortId=${encodeURIComponent(cohortId)}`;
				return;
			}
			window.adminDataManager.openBatchCreateCertsModal(cohortId);
		};

		function onBatchCreateCohortChanged(cohortId) {
			const matchedCohort = allCohorts.find(c => c.id === cohortId);
			const courseTitleField = document.getElementById('batch-create-course-title');
			const issueDateField = document.getElementById('batch-create-issue-date');
			const codePrefixField = document.getElementById('batch-create-code-prefix');
			const imgPatternField = document.getElementById('batch-create-image-pattern');
			const studentsRawField = document.getElementById('batch-create-students-raw');
			const studentCountHint = document.getElementById('batch-create-student-count-hint');
			const previewContainer = document.getElementById('batch-create-preview-container');

			if (previewContainer) previewContainer.style.display = 'none';
			if (!matchedCohort) return;

			// 1. Nạp course title
			const matchedCourse = allCourses.find(co => co.id === matchedCohort.courseId);
			const cTitle = (matchedCourse ? matchedCourse.title : matchedCohort.courseTitle) || matchedCohort.name || '';
			if (courseTitleField) courseTitleField.value = cTitle;

			// 2. Nạp ngày cấp (mặc định lấy endDate của lớp, hoặc ngày hôm nay)
			if (issueDateField) {
				issueDateField.value = matchedCohort.endDate || new Date().toISOString().slice(0, 10);
			}

			// 3. Sinh tiền tố mã mẫu (VD: UXCVN-2026-DT08-)
			const cYear = matchedCohort.endDate ? matchedCohort.endDate.substring(0, 4) : new Date().getFullYear();
			const cCode = (matchedCohort.code || matchedCohort.name || 'CERT').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
			if (codePrefixField) {
				codePrefixField.value = `UXCVN-${cYear}-${cCode}-`;
			}

			// 4. Mẫu ảnh mặc định
			if (imgPatternField) {
				imgPatternField.value = `asset/image/certificate/${cCode.toLowerCase()}-{slug_name}.webp`;
			}

			// 5. Nạp danh sách học viên từ cohort.studentEmails nếu có
			if (Array.isArray(matchedCohort.studentEmails) && matchedCohort.studentEmails.length > 0) {
				const formattedList = matchedCohort.studentEmails.map(em => {
					const emClean = (em || '').trim().toLowerCase();
					if (!emClean) return '';
					let uName = '';
					if (typeof allUsers !== 'undefined' && Array.isArray(allUsers)) {
						const u = allUsers.find(user =>
							(user.primaryEmail && user.primaryEmail.toLowerCase() === emClean) ||
							(user.emails && user.emails.some(e => e.toLowerCase() === emClean))
						);
						if (u && u.displayName) uName = u.displayName;
					}
					return uName ? `${emClean}, ${uName}` : emClean;
				}).filter(Boolean).join('\n');

				if (studentsRawField) studentsRawField.value = formattedList;
				if (studentCountHint) studentCountHint.textContent = `${matchedCohort.studentEmails.length} học viên từ Lớp`;
			} else {
				if (studentsRawField) studentsRawField.value = '';
				if (studentCountHint) studentCountHint.textContent = '0 học viên';
			}
		}

		function parseBatchCreateStudentsInput() {
			const cohortSelect = document.getElementById('batch-create-cohort-select');
			const cohortId = cohortSelect ? cohortSelect.value : '';
			const rawTextField = document.getElementById('batch-create-students-raw');
			const rawText = rawTextField ? rawTextField.value : '';
			const codePrefix = (document.getElementById('batch-create-code-prefix').value || '').trim().toUpperCase();
			const startSeq = parseInt(document.getElementById('batch-create-code-start-seq').value, 10) || 1;
			const imgPattern = (document.getElementById('batch-create-image-pattern').value || '').trim();

			const lines = rawText.split('\n');
			const parsedStudents = [];
			let seq = startSeq;

			const matchedCohort = allCohorts.find(c => c.id === cohortId);
			const cCode = matchedCohort ? (matchedCohort.code || matchedCohort.name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : '';

			lines.forEach(line => {
				const trimmed = line.trim();
				if (!trimmed) return;

				// Hỗ trợ phân tách bằng tab, phẩy, gạch đứng, hoặc chấm phẩy
				let parts = trimmed.split(/[\t,|;]/).map(p => p.trim()).filter(Boolean);
				let email = '';
				let name = '';

				const emailIndex = parts.findIndex(p => p.includes('@'));
				if (emailIndex !== -1) {
					email = parts[emailIndex].toLowerCase();
					const nameParts = parts.filter((_, idx) => idx !== emailIndex);
					if (nameParts.length > 0) {
						name = nameParts.join(' ');
					}
				} else {
					email = parts[0].toLowerCase();
					if (parts.length > 1) name = parts.slice(1).join(' ');
				}

				if (!email || !email.includes('@')) return;

				// Tra cứu tên trong allUsers nếu chưa có
				if (!name && typeof allUsers !== 'undefined' && Array.isArray(allUsers)) {
					const u = allUsers.find(user =>
						(user.primaryEmail && user.primaryEmail.toLowerCase() === email) ||
						(user.emails && user.emails.some(e => e.toLowerCase() === email))
					);
					if (u && u.displayName) name = u.displayName;
				}

				if (!name) {
					const prefix = email.split('@')[0];
					name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
				}

				// Kiểm tra chứng chỉ đã tồn tại trong lớp này chưa
				const existingCert = allCertificates.find(c =>
					c.cohortId === cohortId &&
					c.recipientEmail &&
					c.recipientEmail.toLowerCase() === email
				);

				let certCode = '';
				if (existingCert && existingCert.certificateCode) {
					certCode = existingCert.certificateCode;
				} else if (codePrefix) {
					certCode = `${codePrefix}${String(seq).padStart(3, '0')}`;
					seq++;
				} else {
					certCode = `UXCVN-${generateUUID().substring(0, 8).toUpperCase()}`;
				}

				let imageUrl = '';
				if (existingCert && existingCert.certificateImageUrl) {
					imageUrl = existingCert.certificateImageUrl;
				} else if (imgPattern) {
					imageUrl = imgPattern
						.replace(/\{slug_name\}/g, slugifyVietnamese(name))
						.replace(/\{email_prefix\}/g, email.split('@')[0])
						.replace(/\{cohort_code\}/g, cCode);
				}

				parsedStudents.push({
					email,
					name,
					certCode,
					imageUrl,
					existingCert: existingCert || null
				});
			});

			return parsedStudents;
		}

		function renderBatchCreatePreview() {
			const students = parseBatchCreateStudentsInput();
			const container = document.getElementById('batch-create-preview-container');
			const tbody = document.getElementById('batch-create-preview-tbody');
			const studentCountHint = document.getElementById('batch-create-student-count-hint');

			if (studentCountHint) {
				studentCountHint.textContent = `${students.length} học viên hợp lệ`;
			}

			if (!container || !tbody) return;

			if (students.length === 0) {
				showToast('⚠️ Không tìm thấy email học viên hợp lệ trong danh sách!');
				container.style.display = 'none';
				return;
			}

			tbody.innerHTML = students.map((s, idx) => {
				const isExisting = Boolean(s.existingCert);
				return `
					<tr>
						<td style="text-align: center; color: var(--main-colors-foreground-f700);">${idx + 1}</td>
						<td style="font-family: monospace; color: var(--main-colors-foreground-f300);">${esc(s.email)}</td>
						<td style="font-weight: 600; color: var(--main-colors-foreground-f100);">${esc(s.name)}</td>
						<td style="font-family: monospace; color: var(--alternative-foreground-gold);">${esc(s.certCode)}</td>
						<td style="text-align: center;">
							${isExisting
								? `<span class="admin-tag" style="background: rgba(243, 156, 18, 0.15); color: #f39c12; font-size: 11px;" title="UUID gốc: ${esc(s.existingCert.id)}">Đã có (Bảo toàn UUID)</span>`
								: `<span class="admin-tag" style="background: rgba(46, 213, 115, 0.15); color: #2ed573; font-size: 11px;">Cấp mới (New)</span>`}
						</td>
					</tr>
				`;
			}).join('');

			container.style.display = 'block';
		}

		// Event: Cohort dropdown change in batch create modal
		const batchCreateCohortSelect = document.getElementById('batch-create-cohort-select');
		if (batchCreateCohortSelect) {
			batchCreateCohortSelect.addEventListener('change', (e) => {
				onBatchCreateCohortChanged(e.target.value);
			});
		}

		// Event: Reload from cohort emails button
		const btnLoadCohortEmails = document.getElementById('btn-load-cohort-emails');
		if (btnLoadCohortEmails) {
			btnLoadCohortEmails.addEventListener('click', () => {
				const cohortId = document.getElementById('batch-create-cohort-select').value;
				if (!cohortId) {
					showToast('⚠️ Vui lòng chọn Lớp học trước!');
					return;
				}
				onBatchCreateCohortChanged(cohortId);
				showToast('↺ Đã tải lại danh sách học viên từ Lớp!');
			});
		}

		// Event: Preview button
		const btnPreviewBatchCreate = document.getElementById('btn-preview-batch-create');
		if (btnPreviewBatchCreate) {
			btnPreviewBatchCreate.addEventListener('click', renderBatchCreatePreview);
		}

		// Event: Open Batch Create modal from Certificates toolbar button
		const btnOpenBatchCreateCerts = document.getElementById('btn-open-batch-create-certs');
		if (btnOpenBatchCreateCerts) {
			btnOpenBatchCreateCerts.addEventListener('click', () => {
				window.adminDataManager.openBatchCreateCertsModal();
			});
		}

		// Event: Submit Batch Create Certificates Form
		const formBatchCreate = document.getElementById('form-batch-create-certs');
		if (formBatchCreate) {
			formBatchCreate.addEventListener('submit', async (e) => {
				e.preventDefault();
				const cohortId = document.getElementById('batch-create-cohort-select').value;
				const matchedCohort = allCohorts.find(c => c.id === cohortId);
				if (!matchedCohort) {
					showToast('⚠️ Vui lòng chọn Lớp học tốt nghiệp!');
					return;
				}

				const students = parseBatchCreateStudentsInput();
				if (students.length === 0) {
					showToast('⚠️ Vui lòng nhập ít nhất 1 email học viên hợp lệ!');
					return;
				}

				const issueDate = document.getElementById('batch-create-issue-date').value;
				if (!issueDate) {
					showToast('⚠️ Vui lòng chọn ngày cấp chứng chỉ!');
					return;
				}

				const overwriteExisting = document.getElementById('batch-create-overwrite-existing').checked;
				const cohortName = matchedCohort.name || matchedCohort.code || '';
				const courseId = matchedCohort.courseId || '';
				const matchedCourse = allCourses.find(co => co.id === courseId);
				const courseTitle = (matchedCourse ? matchedCourse.title : matchedCohort.courseTitle) || '';

				const confirmed = confirm(
					`🎓 XÁC NHẬN CẤP CHỨNG CHỈ TỐT NGHIỆP HÀNG LOẠT:\n\n` +
					`• Lớp học: ${cohortName}\n` +
					`• Khóa học: ${courseTitle}\n` +
					`• Số lượng học viên: ${students.length}\n` +
					`• Ngày cấp: ${issueDate}\n\n` +
					`Hệ thống sẽ tự động tạo Document chứng chỉ trên Firestore (bảo toàn 100% UUID của các chứng chỉ đã tồn tại). Tiếp tục?`
				);
				if (!confirmed) return;

				const btnSubmit = document.getElementById('btn-submit-batch-create');
				if (btnSubmit) btnSubmit.disabled = true;

				showToast(`⏳ Đang cấp chứng chỉ cho ${students.length} học viên lớp ${cohortName}...`);

				try {
					const BATCH_SIZE = 400;
					let createdCount = 0;

					for (let i = 0; i < students.length; i += BATCH_SIZE) {
						const chunk = students.slice(i, i + BATCH_SIZE);
						const batch = db.batch();

						chunk.forEach(s => {
							let docId = '';
							let isNew = true;

							if (s.existingCert) {
								if (!overwriteExisting) return; // bỏ qua nếu không chọn ghi đè
								docId = s.existingCert.id; // BẢO TOÀN 100% UUID GỐC
								isNew = false;
							} else {
								docId = generateUUID();
							}

							const docRef = db.collection('certificates').doc(docId);

							// Tra cứu userId
							let userId = '';
							if (typeof allUsers !== 'undefined' && Array.isArray(allUsers)) {
								const u = allUsers.find(user =>
									(user.primaryEmail && user.primaryEmail.toLowerCase() === s.email) ||
									(user.emails && user.emails.some(e => e.toLowerCase() === s.email))
								);
								if (u) userId = u.id || u.docId || '';
							}

							const payload = {
								id: docId,
								certificateCode: s.certCode,
								cohortId: cohortId,
								cohortName: cohortName,
								courseId: courseId,
								courseTitle: courseTitle,
								recipientEmail: s.email,
								recipientName: s.name,
								certificateImageUrl: s.imageUrl || '',
								certificatePdfUrl: s.existingCert ? (s.existingCert.certificatePdfUrl || '') : '',
								issueDate: issueDate,
								recipientSocialLink: s.existingCert ? (s.existingCert.recipientSocialLink || '') : '',
								status: 'active',
								updatedAt: firebase.firestore.FieldValue.serverTimestamp()
							};

							if (userId) payload.userId = userId;
							if (isNew) {
								payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
							}

							batch.set(docRef, payload, { merge: true });
							createdCount++;
						});

						await batch.commit();
					}

					showToast(`🎉 Cấp thành công ${createdCount} chứng chỉ cho lớp "${cohortName}"!`);
					closeModal('modal-batch-create-certs');
					formBatchCreate.reset();

					// Tự động lọc bảng Certificates theo lớp vừa cấp để admin xem ngay
					const filterCohort = document.getElementById('filter-certificate-cohort');
					if (filterCohort) {
						filterCohort.value = `id:${cohortId}`;
					}

					await loadCertificates();

					// Chuyển sang tab Certificates nếu đang ở tab khác
					const certNavBtn = document.querySelector('[data-tab="tab-certificates"]');
					if (certNavBtn) certNavBtn.click();

				} catch (err) {
					console.error('[batchCreateCerts] Error:', err);
					showToast(`❌ Lỗi cấp chứng chỉ hàng loạt: ${err.message}`);
				} finally {
					if (btnSubmit) btnSubmit.disabled = false;
				}
			});
		}

		// Submit form Certificate (Single Edit / Add)
		const formCertificate = document.getElementById('form-modal-certificate');
		if (formCertificate) {
			formCertificate.addEventListener('submit', async (e) => {
				e.preventDefault();
				const idInput = document.getElementById('modal-cert-id').value.trim();
				const code = document.getElementById('modal-cert-code').value.trim().toUpperCase();
				const status = document.getElementById('modal-cert-status').value;
				const cohortId = document.getElementById('modal-cert-cohort-id').value;
				const cohortNameInput = document.getElementById('modal-cert-cohort-name').value.trim();
				const courseTitleInput = document.getElementById('modal-cert-course-title').value.trim();
				const recipientEmail = document.getElementById('modal-cert-recipient-email').value.trim().toLowerCase();
				const recipientName = document.getElementById('modal-cert-recipient-name').value.trim();
				const certificateImageUrl = document.getElementById('modal-cert-image-url').value.trim();
				const certificatePdfUrl = document.getElementById('modal-cert-pdf-url').value.trim();
				const issueDate = document.getElementById('modal-cert-issue-date').value;
				const recipientSocialLink = document.getElementById('modal-cert-social-link').value.trim();

				if (!idInput) {
					showToast('⚠️ Mã định danh UUID không được để trống!');
					return;
				}

				const matchedCohort = allCohorts.find(ch => ch.id === cohortId);
				let finalCohortName = cohortNameInput;
				let finalCourseTitle = courseTitleInput;
				let courseId = '';

				if (matchedCohort) {
					if (!finalCohortName) finalCohortName = matchedCohort.name || matchedCohort.code || '';
					courseId = matchedCohort.courseId || '';
					if (!finalCourseTitle) {
						const co = allCourses.find(c => c.id === courseId);
						finalCourseTitle = (co ? co.title : matchedCohort.courseTitle) || '';
					}
				}

				const btnSave = formCertificate.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					const id = idInput;
					const certData = {
						id,
						certificateCode: code || `UXCVN-${id.substring(0, 8).toUpperCase()}`,
						status,
						cohortId,
						cohortName: finalCohortName,
						courseId: courseId,
						courseTitle: finalCourseTitle,
						recipientEmail,
						recipientName,
						certificateImageUrl,
						certificatePdfUrl,
						issueDate,
						recipientSocialLink,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					};

					// Tìm xem có user trong allUsers để gắn userId không
					if (typeof allUsers !== 'undefined' && Array.isArray(allUsers)) {
						const existingUser = allUsers.find(u =>
							(u.primaryEmail && u.primaryEmail.toLowerCase() === recipientEmail) ||
							(u.emails && u.emails.some(em => em.toLowerCase() === recipientEmail))
						);
						if (existingUser) {
							certData.userId = existingUser.id || existingUser.docId;
						}
					}

					// Kiểm tra xem đã tồn tại chưa để gắn createdAt
					const existingDoc = allCertificates.find(c => c.id === id);
					if (!existingDoc) {
						certData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
					}

					await db.collection('certificates').doc(id).set(certData, { merge: true });
					showToast(`✅ Đã lưu Chứng chỉ cho "${recipientName}"`);
					closeModal('modal-certificate');
					formCertificate.reset();
					await loadCertificates();
				} catch (err) {
					showToast(`❌ Lỗi khi lưu: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		// Auto fill cohort name & course title when selecting cohort dropdown
		const modalCertCohortSelect = document.getElementById('modal-cert-cohort-id');
		if (modalCertCohortSelect) {
			modalCertCohortSelect.addEventListener('change', (e) => {
				const cid = e.target.value;
				const matched = allCohorts.find(ch => ch.id === cid);
				if (matched) {
					const nameField = document.getElementById('modal-cert-cohort-name');
					const courseField = document.getElementById('modal-cert-course-title');
					if (nameField) nameField.value = matched.name || matched.code || '';
					if (courseField) {
						const co = allCourses.find(c => c.id === matched.courseId);
						courseField.value = (co ? co.title : matched.courseTitle) || '';
					}
				}
			});
		}

		const batchCertCohortSelect = document.getElementById('batch-cohort-select');
		if (batchCertCohortSelect) {
			batchCertCohortSelect.addEventListener('change', (e) => {
				const cid = e.target.value;
				const matched = allCohorts.find(ch => ch.id === cid);
				if (matched) {
					const nameField = document.getElementById('batch-cohort-custom-name');
					const courseField = document.getElementById('batch-cohort-course-title');
					if (nameField) nameField.value = matched.name || matched.code || '';
					if (courseField) {
						const co = allCourses.find(c => c.id === matched.courseId);
						courseField.value = (co ? co.title : matched.courseTitle) || '';
					}
				}
			});
		}

		// Button events for Certificates
		const btnAddCert = document.getElementById('btn-add-certificate');
		if (btnAddCert) {
			btnAddCert.addEventListener('click', () => {
				populateFilterAndCohortDropdowns();
				if (formCertificate) formCertificate.reset();
				const newId = generateUUID();
				const idField = document.getElementById('modal-cert-id');
				if (idField) {
					idField.value = newId;
					idField.readOnly = false;
				}
				const codeField = document.getElementById('modal-cert-code');
				if (codeField) {
					codeField.value = `UXCVN-${new Date().getFullYear()}-${newId.substring(0, 6).toUpperCase()}`;
				}
				const dateField = document.getElementById('modal-cert-issue-date');
				if (dateField) {
					dateField.value = new Date().toISOString().slice(0, 10);
				}
				document.getElementById('modal-cert-title-header').textContent = 'Cấp Chứng Chỉ Tốt Nghiệp Mới';
				openModal('modal-certificate');
			});
		}

		const btnRegenCertId = document.getElementById('btn-cert-regen-id');
		if (btnRegenCertId) {
			btnRegenCertId.addEventListener('click', () => {
				const newId = generateUUID();
				document.getElementById('modal-cert-id').value = newId;
				showToast(`✨ Đã tạo UUID mới: ${newId}`);
			});
		}

		const btnRefreshCertificates = document.getElementById('btn-refresh-certificates');
		if (btnRefreshCertificates) btnRefreshCertificates.addEventListener('click', loadCertificates);

		// Multi-Filter event listeners
		const searchCertificatesInput = document.getElementById('search-certificates');
		if (searchCertificatesInput) searchCertificatesInput.addEventListener('input', renderCertificates);

		const filterCertCohort = document.getElementById('filter-certificate-cohort');
		if (filterCertCohort) filterCertCohort.addEventListener('change', renderCertificates);

		const filterCertCourse = document.getElementById('filter-certificate-course');
		if (filterCertCourse) filterCertCourse.addEventListener('change', renderCertificates);

		const filterCertStatus = document.getElementById('filter-certificate-status');
		if (filterCertStatus) filterCertStatus.addEventListener('change', renderCertificates);

		const filterCertHealth = document.getElementById('filter-certificate-health');
		if (filterCertHealth) filterCertHealth.addEventListener('change', renderCertificates);

		const btnResetFilters = document.getElementById('btn-reset-cert-filters');
		if (btnResetFilters) btnResetFilters.addEventListener('click', resetCertificateFilters);

		const btnExportCertificates = document.getElementById('btn-export-certificates');
		if (btnExportCertificates) {
			btnExportCertificates.addEventListener('click', () => {
				downloadJSON(allCertificates, `certificates_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}

		// Tự động gợi ý họ tên khi nhập email học viên trong modal chứng chỉ
		const certEmailInput = document.getElementById('modal-cert-recipient-email');
		if (certEmailInput) {
			certEmailInput.addEventListener('blur', () => {
				const em = certEmailInput.value.trim().toLowerCase();
				if (!em || typeof allUsers === 'undefined' || !Array.isArray(allUsers)) return;
				const matched = allUsers.find(u =>
					(u.primaryEmail && u.primaryEmail.toLowerCase() === em) ||
					(u.emails && u.emails.some(e => e.toLowerCase() === em))
				);
				if (matched && matched.displayName) {
					const nameField = document.getElementById('modal-cert-recipient-name');
					if (nameField && !nameField.value.trim()) {
						nameField.value = matched.displayName;
						showToast(`💡 Đã tự động điền họ tên: ${matched.displayName}`);
					}
				}
			});
		}


		// =========================================================================
		// 5. CASE STUDIES MANAGER (Collection 'caseStudies')
		// =========================================================================
		let allCaseStudies = [];
		let caseStudiesLoaded = false;

		async function loadCaseStudies() {
			const container = document.getElementById('case-studies-list-container');
			const badge = document.getElementById('badge-count-case-studies');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải danh sách Case Studies từ Firestore...</span>
				</div>
			`;

			try {
				// Thử nạp từ camelCase 'caseStudies'
				let snapshot = await db.collection('caseStudies').get();
				// Fallback sang collection cũ nếu đang rỗng
				if (snapshot.empty) {
					snapshot = await db.collection('case_studies').get();
				}

				allCaseStudies = [];
				snapshot.forEach(doc => {
					allCaseStudies.push({ id: doc.id, ...doc.data() });
				});

				// Sắp xếp theo order hoặc title
				allCaseStudies.sort((a, b) => (a.order || 999) - (b.order || 999));

				if (badge) badge.textContent = allCaseStudies.length;
				renderCaseStudies();
				caseStudiesLoaded = true;
			} catch (err) {
				console.error('[loadCaseStudies] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Case Studies: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function renderCaseStudies() {
			const container = document.getElementById('case-studies-list-container');
			const searchInput = document.getElementById('search-case-studies');
			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

			let list = allCaseStudies;
			if (query) {
				list = list.filter(item =>
					(item.title && item.title.toLowerCase().includes(query)) ||
					(item.memberIds && item.memberIds.join(' ').toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query ? 'Không tìm thấy Case Study phù hợp.' : 'Chưa có Case Study nào trên Firestore. Bạn có thể bấm "Đồng bộ từ file CSV" bên trên.'}</span>
					</div>
				`;
				return;
			}

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 40px; text-align: center;">#</th>
							<th style="width: 60px;">Ảnh</th>
							<th style="min-width: 180px;">Tên Case Study</th>
							<th style="min-width: 220px;">Thành viên thực hiện</th>
							<th style="min-width: 140px;">Link Figma / Web</th>
							<th style="width: 90px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map((cs, i) => {
				const members = Array.isArray(cs.memberIds) ? cs.memberIds : (cs.memberIds ? String(cs.memberIds).split(';') : []);
				return `
								<tr>
									<td class="caption" style="color: var(--main-colors-foreground-f800); text-align: center;">${cs.order || (i + 1)}</td>
									<td>
										<img class="admin-thumb" src="${esc(cs.image || '')}" alt="${esc(cs.title)}" onerror="this.src='asset/icon/eye.svg'">
									</td>
									<td>
										<span class="caption" style="font-weight: 600; color: var(--main-colors-foreground-f200);">${esc(cs.title)}</span>
									</td>
									<td>
										<div>
											${members.map(m => `<span class="admin-tag">${esc(m.trim())}</span>`).join('')}
										</div>
									</td>
									<td>
										${cs.url ? `<a href="${esc(cs.url)}" target="_blank" rel="noopener" class="x-small" style="color: var(--alternative-foreground-gold); text-decoration: none; word-break: break-all;">Mở liên kết ↗</a>` : '—'}
									</td>
									<td style="text-align: right;">
										<div class="d-inline-flex gap-1">
											<button class="btn-icon-action" title="Chỉnh sửa" onclick="window.adminDataManager.editCaseStudy('${esc(cs.id)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
											</button>
											<button class="btn-icon-action delete" title="Xóa" onclick="window.adminDataManager.deleteCaseStudy('${esc(cs.id)}', '${esc(cs.title)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
											</button>
										</div>
									</td>
								</tr>
							`;
			}).join('')}
					</tbody>
				</table>
			`;
		}

		// 1-Click Sync Case Studies từ data/case-studies.csv
		async function syncCaseStudiesFromCSV() {
			if (!confirm('Hành động này sẽ đọc file "data/case-studies.csv" và ghi đè/cập nhật toàn bộ lên Firestore collection "caseStudies". Bạn có muốn tiếp tục?')) return;

			const btn = document.getElementById('btn-sync-case-studies');
			const progressBar = document.getElementById('progress-case-studies');
			const progressContainer = document.getElementById('progress-container-case-studies');
			if (btn) btn.disabled = true;
			if (progressContainer) progressContainer.style.display = 'block';
			if (progressBar) progressBar.style.width = '20%';

			try {
				const res = await fetch(`data/case-studies.csv?t=${Date.now()}`);
				if (!res.ok) throw new Error(`Không thể nạp file data/case-studies.csv (${res.status})`);
				const csvText = await res.text();

				const lines = csvText.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
				if (lines.length <= 1) throw new Error('File data/case-studies.csv không có dữ liệu.');

				if (progressBar) progressBar.style.width = '40%';

				// Parse CSV
				const batch = db.batch();
				let count = 0;

				for (let i = 1; i < lines.length; i++) {
					const line = lines[i];
					const parts = line.split(',').map(p => p.trim());
					if (parts.length < 2) continue;

					const title = parts[0] || '';
					const image = parts[1] || '';
					const url = parts[2] || '';
					const rawMembers = parts[3] || '';
					const memberIds = rawMembers.split(';').map(m => m.trim()).filter(Boolean);

					// Dùng title đã chuẩn hóa làm docId để tránh trùng lặp
					const docId = 'cs_' + String(i).padStart(2, '0');
					const docRef = db.collection('caseStudies').doc(docId);

					batch.set(docRef, {
						id: docId,
						title,
						image,
						url,
						memberIds,
						order: i,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					count++;
				}

				if (progressBar) progressBar.style.width = '75%';
				await batch.commit();
				if (progressBar) progressBar.style.width = '100%';

				showToast(`✅ Đã đồng bộ thành công ${count} Case Studies lên Firestore (caseStudies)!`);
				await loadCaseStudies();
			} catch (err) {
				console.error('[syncCaseStudiesFromCSV] Error:', err);
				showToast(`❌ Lỗi đồng bộ: ${err.message}`);
			} finally {
				if (btn) btn.disabled = false;
				setTimeout(() => {
					if (progressContainer) progressContainer.style.display = 'none';
					if (progressBar) progressBar.style.width = '0%';
				}, 1000);
			}
		}

		// Edit Case Study
		window.adminDataManager = window.adminDataManager || {};

		window.adminDataManager.editCaseStudy = function (id) {
			const item = allCaseStudies.find(c => c.id === id);
			if (!item) return;

			document.getElementById('modal-cs-id').value = item.id;
			document.getElementById('modal-cs-title').value = item.title || '';
			document.getElementById('modal-cs-image').value = item.image || '';
			document.getElementById('modal-cs-url').value = item.url || '';
			document.getElementById('modal-cs-members').value = Array.isArray(item.memberIds) ? item.memberIds.join(';') : (item.memberIds || '');
			document.getElementById('modal-cs-order').value = item.order || '';
			document.getElementById('modal-cs-title-header').textContent = 'Chỉnh sửa Case Study';

			openModal('modal-case-study');
		};

		window.adminDataManager.deleteCaseStudy = async function (id, title) {
			if (!confirm(`Bạn có chắc muốn xóa Case Study "${title || id}"?`)) return;
			try {
				await db.collection('caseStudies').doc(id).delete();
				await db.collection('case_studies').doc(id).delete().catch(() => {});
				showToast(`✅ Đã xóa Case Study "${title || id}"`);
				await loadCaseStudies();
			} catch (err) {
				showToast(`❌ Lỗi khi xóa: ${err.message}`);
			}
		};

		// Submit form Case Study
		const formCaseStudy = document.getElementById('form-modal-case-study');
		if (formCaseStudy) {
			formCaseStudy.addEventListener('submit', async (e) => {
				e.preventDefault();
				const id = document.getElementById('modal-cs-id').value.trim();
				const title = document.getElementById('modal-cs-title').value.trim();
				const image = document.getElementById('modal-cs-image').value.trim();
				const url = document.getElementById('modal-cs-url').value.trim();
				const membersRaw = document.getElementById('modal-cs-members').value.trim();
				const orderVal = parseInt(document.getElementById('modal-cs-order').value.trim(), 10) || (allCaseStudies.length + 1);

				const memberIds = membersRaw.split(';').map(m => m.trim()).filter(Boolean);

				const btnSave = formCaseStudy.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					const data = {
						title,
						image,
						url,
						memberIds,
						order: orderVal,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					};

					if (id) {
						data.id = id;
						await db.collection('caseStudies').doc(id).set(data, { merge: true });
						showToast(`✅ Đã cập nhật "${title}"`);
					} else {
						const newDoc = await db.collection('caseStudies').add(data);
						await newDoc.set({ id: newDoc.id }, { merge: true });
						showToast(`✅ Đã thêm mới "${title}"`);
					}

					closeModal('modal-case-study');
					formCaseStudy.reset();
					await loadCaseStudies();
				} catch (err) {
					showToast(`❌ Lỗi lưu: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		// Nút Thêm mới Case Study
		const btnAddCs = document.getElementById('btn-add-case-study');
		if (btnAddCs) {
			btnAddCs.addEventListener('click', () => {
				if (formCaseStudy) formCaseStudy.reset();
				document.getElementById('modal-cs-id').value = '';
				document.getElementById('modal-cs-order').value = allCaseStudies.length + 1;
				document.getElementById('modal-cs-title-header').textContent = 'Thêm Case Study mới';
				openModal('modal-case-study');
			});
		}

		const btnSyncCs = document.getElementById('btn-sync-case-studies');
		if (btnSyncCs) btnSyncCs.addEventListener('click', syncCaseStudiesFromCSV);

		const searchCs = document.getElementById('search-case-studies');
		if (searchCs) searchCs.addEventListener('input', renderCaseStudies);

		// =========================================================================
		// 4. PARTICIPANTS MANAGER (Quả cầu 3D Người tham dự)
		// =========================================================================
		let allParticipants = [];
		let participantsLoaded = false;

		async function loadParticipants() {
			const container = document.getElementById('participants-list-container');
			const badge = document.getElementById('badge-count-participants');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải danh sách Người tham dự từ Firestore...</span>
				</div>
			`;

			try {
				const snapshot = await db.collection('participants').get();
				allParticipants = [];
				snapshot.forEach(doc => {
					allParticipants.push({ id: doc.id, ...doc.data() });
				});

				allParticipants.sort((a, b) => (a.order || 999) - (b.order || 999));

				if (badge) badge.textContent = allParticipants.length;
				renderParticipants();
				participantsLoaded = true;
			} catch (err) {
				console.error('[loadParticipants] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Participants: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function renderParticipants() {
			const container = document.getElementById('participants-list-container');
			const searchInput = document.getElementById('search-participants');
			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

			let list = allParticipants;
			if (query) {
				list = list.filter(p =>
					(p.image && p.image.toLowerCase().includes(query)) ||
					(p.id && p.id.toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query ? 'Không tìm thấy kết quả.' : 'Chưa có Participant nào trên Firestore. Hãy bấm nút "Đồng bộ từ file CSV" phía trên.'}</span>
					</div>
				`;
				return;
			}

			container.innerHTML = `
				<div class="participants-grid">
					${list.map((p, i) => {
				const filename = (p.image || '').split('/').pop().replace(/\.[^/.]+$/, '');
				return `
							<div class="participant-item-card">
								<button type="button" class="btn-delete-card" title="Xóa" onclick="window.adminDataManager.deleteParticipant('${esc(p.id)}', '${esc(filename)}')">×</button>
								<img src="${esc(p.image || '')}" alt="${esc(filename)}" onerror="this.src='asset/icon/eye.svg'">
								<span class="participant-name" title="${esc(filename)}">${esc(filename)}</span>
								<span class="x-small" style="color: var(--main-colors-foreground-f800); font-size: 10px;">#${p.order || (i + 1)}</span>
							</div>
						`;
			}).join('')}
				</div>
			`;
		}

		// 1-Click Sync Participants từ data/participants.csv
		async function syncParticipantsFromCSV() {
			if (!confirm('Đồng bộ toàn bộ danh sách ảnh từ "data/participants.csv" lên Firestore collection "participants"?')) return;

			const btn = document.getElementById('btn-sync-participants');
			const progressBar = document.getElementById('progress-participants');
			const progressContainer = document.getElementById('progress-container-participants');
			if (btn) btn.disabled = true;
			if (progressContainer) progressContainer.style.display = 'block';
			if (progressBar) progressBar.style.width = '15%';

			try {
				const res = await fetch(`data/participants.csv?t=${Date.now()}`);
				if (!res.ok) throw new Error(`Không thể nạp file data/participants.csv (${res.status})`);
				const csvText = await res.text();

				const lines = csvText.trim().split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
				if (lines.length <= 1) throw new Error('File data/participants.csv trống.');

				if (progressBar) progressBar.style.width = '35%';

				// Firestore batch chỉ cho tối đa 500 writes/batch
				const CHUNK_SIZE = 400;
				let totalSynced = 0;

				for (let c = 1; c < lines.length; c += CHUNK_SIZE) {
					const batch = db.batch();
					const slice = lines.slice(c, c + CHUNK_SIZE);

					slice.forEach((line, idx) => {
						const image = line.trim();
						if (!image || image === 'anh_participant') return;

						const cleanId = image.split('/').pop().replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
						const docId = `pt_${cleanId || (c + idx)}`;
						const docRef = db.collection('participants').doc(docId);

						batch.set(docRef, {
							image,
							order: c + idx,
							updatedAt: firebase.firestore.FieldValue.serverTimestamp()
						}, { merge: true });

						totalSynced++;
					});

					await batch.commit();
					const pct = Math.min(95, Math.round(((c + slice.length) / lines.length) * 100));
					if (progressBar) progressBar.style.width = `${pct}%`;
				}

				if (progressBar) progressBar.style.width = '100%';
				showToast(`✅ Đã đồng bộ thành công ${totalSynced} Người tham dự lên Firestore!`);
				await loadParticipants();
			} catch (err) {
				console.error('[syncParticipantsFromCSV] Error:', err);
				showToast(`❌ Lỗi đồng bộ: ${err.message}`);
			} finally {
				if (btn) btn.disabled = false;
				setTimeout(() => {
					if (progressContainer) progressContainer.style.display = 'none';
					if (progressBar) progressBar.style.width = '0%';
				}, 1000);
			}
		}

		window.adminDataManager.deleteParticipant = async function (id, name) {
			if (!confirm(`Xóa người tham dự "${name || id}"?`)) return;
			try {
				await db.collection('participants').doc(id).delete();
				showToast(`✅ Đã xóa "${name || id}"`);
				await loadParticipants();
			} catch (err) {
				showToast(`❌ Lỗi khi xóa: ${err.message}`);
			}
		};

		// Thêm mới 1 participant
		const formParticipant = document.getElementById('form-modal-participant');
		if (formParticipant) {
			formParticipant.addEventListener('submit', async (e) => {
				e.preventDefault();
				const image = document.getElementById('modal-pt-image').value.trim();
				const orderVal = parseInt(document.getElementById('modal-pt-order').value.trim(), 10) || (allParticipants.length + 1);

				if (!image) return;
				const btnSave = formParticipant.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					const cleanId = image.split('/').pop().replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
					const docId = `pt_${cleanId || Date.now()}`;

					await db.collection('participants').doc(docId).set({
						image,
						order: orderVal,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					showToast('✅ Đã thêm người tham dự mới!');
					closeModal('modal-participant');
					formParticipant.reset();
					await loadParticipants();
				} catch (err) {
					showToast(`❌ Lỗi: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		const btnAddPt = document.getElementById('btn-add-participant');
		if (btnAddPt) {
			btnAddPt.addEventListener('click', () => {
				if (formParticipant) formParticipant.reset();
				document.getElementById('modal-pt-order').value = allParticipants.length + 1;
				openModal('modal-participant');
			});
		}

		const btnSyncPt = document.getElementById('btn-sync-participants');
		if (btnSyncPt) btnSyncPt.addEventListener('click', syncParticipantsFromCSV);

		const searchPt = document.getElementById('search-participants');
		if (searchPt) searchPt.addEventListener('input', renderParticipants);

		// =========================================================================
		// 6. KNOWLEDGE NODES MANAGER (Đồ thị kiến thức 3D - Collection 'knowledgeNodes')
		// =========================================================================
		let allKnowledgeNodes = [];
		let knowledgeNodesLoaded = false;

		async function loadKnowledgeNodes() {
			const container = document.getElementById('knowledge-list-container');
			const badge = document.getElementById('badge-count-knowledge');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải danh sách Kiến thức từ Firestore...</span>
				</div>
			`;

			try {
				let snapshot = await db.collection('knowledgeNodes').get();
				if (snapshot.empty) {
					snapshot = await db.collection('knowledge_nodes').get();
				}

				allKnowledgeNodes = [];
				snapshot.forEach(doc => {
					allKnowledgeNodes.push({ id: doc.id, ...doc.data() });
				});

				allKnowledgeNodes.sort((a, b) => (a.level || 1) - (b.level || 1));

				if (badge) badge.textContent = allKnowledgeNodes.length;
				renderKnowledgeNodes();
				knowledgeNodesLoaded = true;
			} catch (err) {
				console.error('[loadKnowledgeNodes] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Knowledge Nodes: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function renderKnowledgeNodes() {
			const container = document.getElementById('knowledge-list-container');
			const searchInput = document.getElementById('search-knowledge');
			const filterLevel = document.getElementById('filter-knowledge-level');

			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
			const selectedLevel = filterLevel ? filterLevel.value : 'all';

			let list = allKnowledgeNodes;
			if (selectedLevel !== 'all') {
				list = list.filter(n => String(n.level) === selectedLevel);
			}
			if (query) {
				list = list.filter(n =>
					(n.label && n.label.toLowerCase().includes(query)) ||
					(n.desc && n.desc.toLowerCase().includes(query)) ||
					(n.id && n.id.toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query || selectedLevel !== 'all' ? 'Không tìm thấy node kiến thức phù hợp.' : 'Chưa có Knowledge Node nào. Hãy bấm "Đồng bộ từ file TSV" phía trên.'}</span>
					</div>
				`;
				return;
			}

			// Giới hạn hiển thị 150 items đầu nếu danh sách quá dài để tăng tốc DOM
			const displayList = list.slice(0, 150);

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 28px; text-align: center;">Màu</th>
							<th style="min-width: 180px;">Tên Node (Label)</th>
							<th style="width: 80px; text-align: center;">Level</th>
							<th style="min-width: 240px;">Mô tả</th>
							<th style="width: 90px; text-align: center;">Liên kết</th>
							<th style="width: 80px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${displayList.map(n => {
				const connCount = Array.isArray(n.connections) ? n.connections.length : (n.connections ? String(n.connections).split(';').length : 0);
				return `
								<tr>
									<td style="text-align: center;">
										<span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; background: ${esc(n.color || '#999')}; border: 1px solid rgba(255,255,255,0.2);"></span>
									</td>
									<td>
										<span class="caption" style="font-weight: 600; color: var(--main-colors-foreground-f200);">${esc(n.label || n.id)}</span>
										<div class="x-small" style="color: var(--main-colors-foreground-f800); font-family: monospace; font-size: 10px;">${esc(n.id)}</div>
									</td>
									<td style="text-align: center;">
										<span class="role-cell member" style="font-size: 11px;">Lv ${n.level || 1}</span>
									</td>
									<td>
										<span class="caption" style="color: var(--main-colors-foreground-f600); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
											${esc(n.desc || '—')}
										</span>
									</td>
									<td style="text-align: center;">
										<span class="admin-tag admin-tag-accent">${connCount} nodes</span>
									</td>
									<td style="text-align: right;">
										<div class="d-inline-flex gap-1">
											<button class="btn-icon-action" title="Chỉnh sửa" onclick="window.adminDataManager.editKnowledgeNode('${esc(n.id)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
											</button>
											<button class="btn-icon-action delete" title="Xóa" onclick="window.adminDataManager.deleteKnowledgeNode('${esc(n.id)}', '${esc(n.label)}')">
												<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
											</button>
										</div>
									</td>
								</tr>
							`;
			}).join('')}
					</tbody>
				</table>
				${list.length > 150 ? `<div class="p-3 text-center x-small" style="color: var(--main-colors-foreground-f700);">Đang hiển thị 150 / ${list.length} nodes (Hãy dùng ô tìm kiếm để lọc chính xác node cần tìm).</div>` : ''}
			`;
		}

		// 1-Click Sync Knowledge Nodes từ data/knowledge_nodes.tsv
		async function syncKnowledgeNodesFromTSV() {
			if (!confirm('Đồng bộ hơn 300 node kiến thức từ "data/knowledge_nodes.tsv" lên Firestore (knowledgeNodes)? Quá trình sẽ chạy qua batch.')) return;

			const btn = document.getElementById('btn-sync-knowledge');
			const progressBar = document.getElementById('progress-knowledge');
			const progressContainer = document.getElementById('progress-container-knowledge');
			if (btn) btn.disabled = true;
			if (progressContainer) progressContainer.style.display = 'block';
			if (progressBar) progressBar.style.width = '20%';

			try {
				const res = await fetch(`data/knowledge_nodes.tsv?t=${Date.now()}`);
				if (!res.ok) throw new Error(`Không thể đọc data/knowledge_nodes.tsv (${res.status})`);
				const tsvText = await res.text();

				const lines = tsvText.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
				if (lines.length <= 1) throw new Error('File data/knowledge_nodes.tsv trống.');

				const CHUNK_SIZE = 400;
				let totalSynced = 0;

				for (let c = 1; c < lines.length; c += CHUNK_SIZE) {
					const batch = db.batch();
					const slice = lines.slice(c, c + CHUNK_SIZE);

					slice.forEach(line => {
						const parts = line.split('\t');
						if (parts.length < 2) return;

						const id = parts[0].trim();
						const label = parts[1] ? parts[1].trim() : '';
						const level = parseInt(parts[2], 10) || 1;
						const desc = parts[3] ? parts[3].trim() : '';
						const rawConn = parts[4] ? parts[4].trim() : '';
						const connections = rawConn ? rawConn.split(';').map(s => s.trim()).filter(Boolean) : [];
						const color = parts[5] ? parts[5].trim() : '#999999';
						const validated = parts[6] ? parts[6].trim().toLowerCase() === 'true' : false;

						if (!id) return;

						const docRef = db.collection('knowledgeNodes').doc(id);
						batch.set(docRef, {
							id,
							label,
							level,
							desc,
							connections,
							color,
							validated,
							updatedAt: firebase.firestore.FieldValue.serverTimestamp()
						}, { merge: true });

						totalSynced++;
					});

					await batch.commit();
					const pct = Math.min(95, Math.round(((c + slice.length) / lines.length) * 100));
					if (progressBar) progressBar.style.width = `${pct}%`;
				}

				if (progressBar) progressBar.style.width = '100%';
				showToast(`✅ Đã đồng bộ thành công ${totalSynced} Node kiến thức lên Firestore (knowledgeNodes)!`);
				await loadKnowledgeNodes();
			} catch (err) {
				console.error('[syncKnowledgeNodesFromTSV] Error:', err);
				showToast(`❌ Lỗi đồng bộ: ${err.message}`);
			} finally {
				if (btn) btn.disabled = false;
				setTimeout(() => {
					if (progressContainer) progressContainer.style.display = 'none';
					if (progressBar) progressBar.style.width = '0%';
				}, 1000);
			}
		}

		window.adminDataManager.editKnowledgeNode = function (id) {
			const node = allKnowledgeNodes.find(n => n.id === id);
			if (!node) return;

			document.getElementById('modal-kn-id').value = node.id;
			document.getElementById('modal-kn-label').value = node.label || '';
			document.getElementById('modal-kn-level').value = node.level || 1;
			document.getElementById('modal-kn-color').value = node.color || '#F8B195';
			document.getElementById('modal-kn-desc').value = node.desc || '';
			document.getElementById('modal-kn-connections').value = Array.isArray(node.connections) ? node.connections.join(';') : (node.connections || '');
			document.getElementById('modal-kn-title-header').textContent = 'Chỉnh sửa Node Kiến Thức';

			openModal('modal-knowledge');
		};

		window.adminDataManager.deleteKnowledgeNode = async function (id, label) {
			if (!confirm(`Xóa node "${label || id}" khỏi cơ sở dữ liệu?`)) return;
			try {
				await db.collection('knowledgeNodes').doc(id).delete();
				await db.collection('knowledge_nodes').doc(id).delete().catch(() => {});
				showToast(`✅ Đã xóa "${label || id}"`);
				await loadKnowledgeNodes();
			} catch (err) {
				showToast(`❌ Lỗi: ${err.message}`);
			}
		};

		const formKnowledge = document.getElementById('form-modal-knowledge');
		if (formKnowledge) {
			formKnowledge.addEventListener('submit', async (e) => {
				e.preventDefault();
				let id = document.getElementById('modal-kn-id').value.trim();
				const label = document.getElementById('modal-kn-label').value.trim();
				const level = parseInt(document.getElementById('modal-kn-level').value.trim(), 10) || 1;
				const color = document.getElementById('modal-kn-color').value.trim();
				const desc = document.getElementById('modal-kn-desc').value.trim();
				const connectionsRaw = document.getElementById('modal-kn-connections').value.trim();
				const connections = connectionsRaw.split(';').map(s => s.trim()).filter(Boolean);

				if (!label) return;
				if (!id) {
					// Tạo id dạng uuid/slug
					id = 'node_' + Math.random().toString(36).substr(2, 9);
				}

				const btnSave = formKnowledge.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					await db.collection('knowledgeNodes').doc(id).set({
						id,
						label,
						level,
						color,
						desc,
						connections,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					showToast(`✅ Đã lưu node "${label}"`);
					closeModal('modal-knowledge');
					formKnowledge.reset();
					await loadKnowledgeNodes();
				} catch (err) {
					showToast(`❌ Lỗi: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		const btnAddKn = document.getElementById('btn-add-knowledge');
		if (btnAddKn) {
			btnAddKn.addEventListener('click', () => {
				if (formKnowledge) formKnowledge.reset();
				document.getElementById('modal-kn-id').value = '';
				document.getElementById('modal-kn-color').value = '#F8B195';
				document.getElementById('modal-kn-title-header').textContent = 'Thêm Node Kiến Thức mới';
				openModal('modal-knowledge');
			});
		}

		const btnSyncKn = document.getElementById('btn-sync-knowledge');
		if (btnSyncKn) btnSyncKn.addEventListener('click', syncKnowledgeNodesFromTSV);

		const searchKn = document.getElementById('search-knowledge');
		if (searchKn) searchKn.addEventListener('input', renderKnowledgeNodes);

		const filterKnLevel = document.getElementById('filter-knowledge-level');
		if (filterKnLevel) filterKnLevel.addEventListener('change', renderKnowledgeNodes);

		// =========================================================================
		// 6. BOOKS & SHELVES MANAGER (Tủ sách UX)
		// =========================================================================
		let allBooks = [];
		let allShelves = [];
		let booksLoaded = false;

		async function loadBooks() {
			const container = document.getElementById('books-list-container');
			const badge = document.getElementById('badge-count-books');
			if (!container) return;

			container.innerHTML = `
				<div class="empty-state">
					<div class="auth-spinner"></div>
					<span class="caption">Đang tải Tủ sách từ Firestore...</span>
				</div>
			`;

			try {
				let [booksSnap, shelvesSnap] = await Promise.all([
					db.collection('books').get(),
					db.collection('bookShelves').get()
				]);

				if (shelvesSnap.empty) {
					shelvesSnap = await db.collection('book_shelves').get();
				}

				allBooks = [];
				booksSnap.forEach(doc => allBooks.push({ id: doc.id, ...doc.data() }));

				allShelves = [];
				shelvesSnap.forEach(doc => allShelves.push({ id: doc.id, ...doc.data() }));

				if (badge) badge.textContent = allBooks.length;
				renderBooks();
				booksLoaded = true;
			} catch (err) {
				console.error('[loadBooks] Error:', err);
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption" style="color: var(--alternative-foreground-red);">Lỗi tải Tủ sách: ${esc(err.message)}</span>
					</div>
				`;
			}
		}

		function renderBooks() {
			const container = document.getElementById('books-list-container');
			const searchInput = document.getElementById('search-books');
			const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

			let list = allBooks;
			if (query) {
				list = list.filter(b =>
					(b.title && b.title.toLowerCase().includes(query)) ||
					(b.description && b.description.toLowerCase().includes(query)) ||
					(b.id && b.id.toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state">
						<span class="caption">${query ? 'Không tìm thấy cuốn sách phù hợp.' : 'Chưa có sách trên Firestore. Hãy bấm "Đồng bộ từ books-data.json" phía trên.'}</span>
					</div>
				`;
				return;
			}

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 50px; text-align: center;">Badge</th>
							<th style="min-width: 180px;">Tựa sách</th>
							<th style="width: 80px;">Tags</th>
							<th style="min-width: 240px;">Mô tả ngắn</th>
							<th style="width: 80px; text-align: center;">Chiều cao</th>
							<th style="width: 80px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(b => `
							<tr>
								<td style="text-align: center;">
									<span class="role-cell instructor" style="font-size: 11px; padding: 2px 6px;">${esc(b.topBadge || '•')}</span>
								</td>
								<td>
									<span class="caption" style="font-weight: 600; color: var(--main-colors-foreground-f200);">${esc(b.title)}</span>
									<div class="x-small" style="color: var(--main-colors-foreground-f800); font-family: monospace; font-size: 10px;">${esc(b.id)}</div>
								</td>
								<td>
									<span class="admin-tag">${esc(b.tags || '—')}</span>
								</td>
								<td>
									<span class="caption" style="color: var(--main-colors-foreground-f600); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
										${esc(b.description || '—')}
									</span>
								</td>
								<td style="text-align: center;">
									<span class="x-small" style="color: var(--main-colors-foreground-f700);">${b.height || 380}px</span>
								</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1">
										<button class="btn-icon-action" title="Chỉnh sửa" onclick="window.adminDataManager.editBook('${esc(b.id)}')">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
										<button class="btn-icon-action delete" title="Xóa" onclick="window.adminDataManager.deleteBook('${esc(b.id)}', '${esc(b.title)}')">
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
										</button>
									</div>
								</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
			`;
		}

		// 1-Click Sync Books từ script/books-data.json
		async function syncBooksFromJSON() {
			if (!confirm('Đồng bộ các kệ sách và đầu sách từ "script/books-data.json" lên Firestore (books & bookShelves)?')) return;

			const btn = document.getElementById('btn-sync-books');
			const progressBar = document.getElementById('progress-books');
			const progressContainer = document.getElementById('progress-container-books');
			if (btn) btn.disabled = true;
			if (progressContainer) progressContainer.style.display = 'block';
			if (progressBar) progressBar.style.width = '20%';

			try {
				const res = await fetch(`script/books-data.json?t=${Date.now()}`);
				if (!res.ok) throw new Error(`Không thể nạp script/books-data.json (${res.status})`);
				const json = await res.json();

				const batch = db.batch();

				// 1. Ghi Shelves lên camelCase bookShelves
				if (Array.isArray(json.shelves)) {
					json.shelves.forEach(sh => {
						if (!sh.id) return;
						const docRef = db.collection('bookShelves').doc(sh.id);
						const bookIds = sh.book_ids || sh.bookIds || [];
						batch.set(docRef, {
							id: sh.id,
							category: sh.category || '',
							bookIds: bookIds,
							book_ids: bookIds,
							updatedAt: firebase.firestore.FieldValue.serverTimestamp()
						}, { merge: true });
					});
				}

				if (progressBar) progressBar.style.width = '50%';

				// 2. Ghi Books
				let bookCount = 0;
				if (Array.isArray(json.books)) {
					json.books.forEach(b => {
						if (!b.id) return;
						const docRef = db.collection('books').doc(b.id);
						batch.set(docRef, {
							title: b.title || '',
							topBadge: b.topBadge || '',
							tags: b.tags || '',
							description: b.description || '',
							height: b.height || 380,
							updatedAt: firebase.firestore.FieldValue.serverTimestamp()
						}, { merge: true });
						bookCount++;
					});
				}

				if (progressBar) progressBar.style.width = '80%';
				await batch.commit();
				if (progressBar) progressBar.style.width = '100%';

				showToast(`✅ Đã đồng bộ thành công ${bookCount} cuốn sách và ${(json.shelves || []).length} kệ sách!`);
				await loadBooks();
			} catch (err) {
				console.error('[syncBooksFromJSON] Error:', err);
				showToast(`❌ Lỗi: ${err.message}`);
			} finally {
				if (btn) btn.disabled = false;
				setTimeout(() => {
					if (progressContainer) progressContainer.style.display = 'none';
					if (progressBar) progressBar.style.width = '0%';
				}, 1000);
			}
		}

		window.adminDataManager.editBook = function (id) {
			const b = allBooks.find(item => item.id === id);
			if (!b) return;

			document.getElementById('modal-bk-id').value = b.id;
			document.getElementById('modal-bk-title').value = b.title || '';
			document.getElementById('modal-bk-badge').value = b.topBadge || '';
			document.getElementById('modal-bk-tags').value = b.tags || '';
			document.getElementById('modal-bk-height').value = b.height || 380;
			document.getElementById('modal-bk-desc').value = b.description || '';
			document.getElementById('modal-bk-title-header').textContent = 'Chỉnh sửa Cuốn Sách';

			openModal('modal-book');
		};

		window.adminDataManager.deleteBook = async function (id, title) {
			if (!confirm(`Xóa cuốn sách "${title || id}" khỏi Tủ sách?`)) return;
			try {
				await db.collection('books').doc(id).delete();
				showToast(`✅ Đã xóa cuốn sách "${title || id}"`);
				await loadBooks();
			} catch (err) {
				showToast(`❌ Lỗi: ${err.message}`);
			}
		};

		const formBook = document.getElementById('form-modal-book');
		if (formBook) {
			formBook.addEventListener('submit', async (e) => {
				e.preventDefault();
				let id = document.getElementById('modal-bk-id').value.trim();
				const title = document.getElementById('modal-bk-title').value.trim();
				const topBadge = document.getElementById('modal-bk-badge').value.trim();
				const tags = document.getElementById('modal-bk-tags').value.trim();
				const height = parseInt(document.getElementById('modal-bk-height').value.trim(), 10) || 380;
				const description = document.getElementById('modal-bk-desc').value.trim();

				if (!title) return;
				if (!id) {
					id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
				}

				const btnSave = formBook.querySelector('button[type="submit"]');
				if (btnSave) btnSave.disabled = true;

				try {
					await db.collection('books').doc(id).set({
						title,
						topBadge,
						tags,
						height,
						description,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					showToast(`✅ Đã lưu cuốn sách "${title}"`);
					closeModal('modal-book');
					formBook.reset();
					await loadBooks();
				} catch (err) {
					showToast(`❌ Lỗi: ${err.message}`);
				} finally {
					if (btnSave) btnSave.disabled = false;
				}
			});
		}

		const btnAddBk = document.getElementById('btn-add-book');
		if (btnAddBk) {
			btnAddBk.addEventListener('click', () => {
				if (formBook) formBook.reset();
				document.getElementById('modal-bk-id').value = '';
				document.getElementById('modal-bk-height').value = 380;
				document.getElementById('modal-bk-title-header').textContent = 'Thêm Cuốn Sách mới';
				openModal('modal-book');
			});
		}

		const btnSyncBk = document.getElementById('btn-sync-books');
		if (btnSyncBk) btnSyncBk.addEventListener('click', syncBooksFromJSON);

		const searchBk = document.getElementById('search-books');
		if (searchBk) searchBk.addEventListener('input', renderBooks);

		// =========================================================================
		// 7. BACKUP / EXPORT CONTROLLER
		// =========================================================================
		function downloadJSON(data, filename) {
			const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}

		const btnExportCs = document.getElementById('btn-export-case-studies');
		if (btnExportCs) {
			btnExportCs.addEventListener('click', () => {
				downloadJSON(allCaseStudies, `case_studies_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}

		const btnExportPt = document.getElementById('btn-export-participants');
		if (btnExportPt) {
			btnExportPt.addEventListener('click', () => {
				downloadJSON(allParticipants, `participants_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}

		const btnExportKn = document.getElementById('btn-export-knowledge');
		if (btnExportKn) {
			btnExportKn.addEventListener('click', () => {
				downloadJSON(allKnowledgeNodes, `knowledge_nodes_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}

		const btnExportBk = document.getElementById('btn-export-books');
		if (btnExportBk) {
			btnExportBk.addEventListener('click', () => {
				downloadJSON({ shelves: allShelves, books: allBooks }, `books_backup_${new Date().toISOString().slice(0, 10)}.json`);
			});
		}

		// Public API
		window.adminDataManager.loadAll = function () {
			loadCourses();
			loadCohorts();
			loadCaseStudies();
			loadParticipants();
			loadKnowledgeNodes();
			loadBooks();
		};
	});
})();
