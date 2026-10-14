window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-cohorts'
};

let allCohorts = [];
let allCourses = [];
let usersMap = new Map();
let allUsersList = [];
let currentDb = null;
let currentUser = null;
let modalActiveCohortId = null;
let transferTargetStudentEmail = null;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	currentUser = e.detail.user;
	await loadCohorts();
	initEvents();
	initStudentModalEvents();
});

async function loadCohorts() {
	const container = document.getElementById('cohorts-list-container');
	try {
		const [snapshot, coursesSnap, usersSnap, authUsersSnap] = await Promise.all([
			currentDb.collection('cohorts').get(),
			currentDb.collection('courses').get().catch(() => ({ docs: [] })),
			currentDb.collection('users').get().catch(() => ({ docs: [] })),
			currentDb.collection('authorizedUsers').get().catch(() => ({ docs: [] }))
		]);
		allCohorts = [];
		snapshot.forEach(doc => {
			allCohorts.push({ id: doc.id, ...doc.data() });
		});

		allCourses = [];
		coursesSnap.forEach(doc => {
			allCourses.push({ id: doc.id, ...doc.data() });
		});

		// Map Users
		usersMap.clear();
		allUsersList = [];
		const registerUser = (data) => {
			const emails = [
				data.email,
				data.primaryEmail,
				...(Array.isArray(data.emails) ? data.emails : [])
			].filter(Boolean);

			const name = data.displayName || data.name || '';
			const avatar = data.photoUrl || data.photoURL || '';
			const phone = data.phone || '';

			emails.forEach(em => {
				const clean = em.trim().toLowerCase();
				if (clean && !usersMap.has(clean)) {
					const uObj = { name, avatar, phone, email: clean, role: data.role || 'member' };
					usersMap.set(clean, uObj);
					allUsersList.push(uObj);
				}
			});
		};

		usersSnap.docs.forEach(doc => registerUser(doc.data()));
		authUsersSnap.docs.forEach(doc => registerUser(doc.data()));

		// Update stats
		document.getElementById('stat-cohorts-total').textContent = allCohorts.length;
		document.getElementById('stat-cohorts-open').textContent = allCohorts.filter(c => (c.status || 'open') === 'open').length;
		document.getElementById('stat-cohorts-running').textContent = allCohorts.filter(c => c.status === 'in-progress').length;
		document.getElementById('stat-cohorts-completed').textContent = allCohorts.filter(c => c.status === 'completed').length;

		populateCohortCourseFilter();
		renderCohortsTable();
	} catch (err) {
		if (container) {
			container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải lớp học: ${err.message}</div>`;
		}
	}
}

function populateCohortCourseFilter() {
	const select = document.getElementById('filter-cohort-course');
	if (!select) return;

	const prevVal = select.value;
	select.innerHTML = '<option value="all">Tất cả Khóa học</option>';

	// Danh sách khóa học - hiển thị theo Title, không hiển thị mã
	allCourses.forEach(c => {
		const title = c.title || c.name || c.id;
		const opt = document.createElement('option');
		opt.value = c.id;
		opt.textContent = title;
		select.appendChild(opt);
	});

	if (prevVal && [...select.options].some(o => o.value === prevVal)) {
		select.value = prevVal;
	}
}

let currentSortCol = null;
let currentSortDir = 'asc';

function getSortIndicator(colKey) {
	if (currentSortCol !== colKey) {
		return `<span class="sort-indicator" title="Nhấn để sắp xếp"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></span>`;
	}
	if (currentSortDir === 'asc') {
		return `<span class="sort-indicator sorted-asc" title="Đang sắp xếp A → Z"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m18 15-6-6-6 6"/></svg></span>`;
	}
	return `<span class="sort-indicator sorted-desc" title="Đang sắp xếp Z → A"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg></span>`;
}

window.handleSortCohort = function (col) {
	if (currentSortCol === col) {
		currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
	} else {
		currentSortCol = col;
		currentSortDir = 'asc';
	}
	renderCohortsTable();
};

function renderCohortsTable() {
	const container = document.getElementById('cohorts-list-container');
	const query = (document.getElementById('search-cohort')?.value || '').trim().toLowerCase();
	const statusFilter = document.getElementById('filter-cohort-status')?.value || 'all';
	const courseFilter = document.getElementById('filter-cohort-course')?.value || 'all';

	let list = [...allCohorts];

	// Lọc theo Khóa học
	if (courseFilter !== 'all') {
		const matchedCo = allCourses.find(co => co.id === courseFilter);
		const courseTitle = matchedCo ? (matchedCo.title || '').toLowerCase() : '';
		list = list.filter(c => {
			if (c.courseId === courseFilter) return true;
			if (courseTitle && c.courseTitle && c.courseTitle.toLowerCase() === courseTitle) return true;
			return false;
		});
	}

	if (statusFilter !== 'all') list = list.filter(c => (c.status || 'open') === statusFilter);
	if (query) {
		list = list.filter(c =>
			(c.code && c.code.toLowerCase().includes(query)) ||
			(c.title && c.title.toLowerCase().includes(query)) ||
			(c.courseTitle && c.courseTitle.toLowerCase().includes(query)) ||
			(c.instructor && c.instructor.toLowerCase().includes(query))
		);
	}

	if (currentSortCol) {
		list.sort((a, b) => {
			if (currentSortCol === 'capacity' || currentSortCol === 'tuition') {
				const valA = a[currentSortCol] || a.pricing || 0;
				const valB = b[currentSortCol] || b.pricing || 0;
				const numA = Number(String(valA).replace(/[^\d]/g, '')) || 0;
				const numB = Number(String(valB).replace(/[^\d]/g, '')) || 0;
				return currentSortDir === 'asc' ? numA - numB : numB - numA;
			}
			if (currentSortCol === 'startDate') {
				const strA = (a.startDate || a.start_date || a.schedule || '').toString();
				const strB = (b.startDate || b.start_date || b.schedule || '').toString();
				const res = strA.localeCompare(strB, 'vi', { numeric: true });
				return currentSortDir === 'asc' ? res : -res;
			}
			if (currentSortCol === 'title') {
				const strA = (a.title || a.name || a.bootcamp_name || '').toString();
				const strB = (b.title || b.name || b.bootcamp_name || '').toString();
				const res = strA.localeCompare(strB, 'vi', { sensitivity: 'base', numeric: true });
				return currentSortDir === 'asc' ? res : -res;
			}
			const valA = a[currentSortCol];
			const valB = b[currentSortCol];
			const strA = (valA ?? '').toString().trim();
			const strB = (valB ?? '').toString().trim();
			const res = strA.localeCompare(strB, 'vi', { sensitivity: 'base', numeric: true });
			return currentSortDir === 'asc' ? res : -res;
		});
	}

	if (list.length === 0) {
		container.innerHTML = `
					<div class="empty-state p-4 text-center">
						<span class="font-sans-caption">Chưa có lớp học nào phù hợp.</span>
						<div class="mt-2"><a href="create.html" class="btn-admin btn-admin-primary btn-admin-sm">+ Mở Lớp Học Mới</a></div>
					</div>
				`;
		return;
	}

	const statusBadges = {
		'open': '<span class="admin-tag admin-tag-success">Đang tuyển sinh</span>',
		'in-progress': '<span class="admin-tag admin-tag-info">Đang học</span>',
		'completed': '<span class="admin-tag admin-tag-warning">Đã kết thúc</span>'
	};

	container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th class="th-sortable ${currentSortCol === 'code' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('code')" style="width: 110px;">Mã Lớp ${getSortIndicator('code')}</th>
							<th class="th-sortable ${currentSortCol === 'title' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('title')">Tên Lớp / Khóa học ${getSortIndicator('title')}</th>
							<th class="th-sortable ${currentSortCol === 'startDate' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('startDate')" style="width: 130px;">Khai giảng ${getSortIndicator('startDate')}</th>
							<th class="th-sortable ${currentSortCol === 'format' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('format')" style="width: 120px;">Hình thức ${getSortIndicator('format')}</th>
							<th class="th-sortable ${currentSortCol === 'tuition' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('tuition')" style="width: 120px;">Học phí ${getSortIndicator('tuition')}</th>
							<th class="th-sortable ${currentSortCol === 'capacity' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('capacity')" style="width: 110px; text-align: center;">Sĩ số tối đa ${getSortIndicator('capacity')}</th>
							<th class="th-sortable ${currentSortCol === 'status' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCohort('status')" style="width: 130px; text-align: center;">Trạng thái ${getSortIndicator('status')}</th>
							<th style="width: 110px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => {
							const formatText = (c.format === 'offline' || c.offline == 1)
								? `<span class="role-cell instructor">Offline, ${adminEscapeHtml(c.location || 'HN')}</span>`
								: `<span class="role-cell member">Online</span>`;
							const startDateText = c.startDate || c.start_date || c.schedule || '—';
							const tuitionText = c.tuition || c.pricing || '—';
							const isPub = c.isPublic !== false && c.listing !== 0;

							return `
							<tr>
								<td>
									<span class="badge" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--alternative-foreground-gold); font-family: monospace;">
										${adminEscapeHtml(c.code || c.id)}
									</span>
								</td>
								<td>
									<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(c.title || c.name || c.bootcamp_name || 'Lớp học')}</div>
									${c.courseTitle ? `<div class="font-sans-small" style="color: var(--main-colors-foreground-f700);">${adminEscapeHtml(c.courseTitle)}</div>` : ''}
								<td class="font-sans-caption" style="font-weight: 500;">
									<div>${adminEscapeHtml(startDateText)}</div>
									${c.endDate ? `<div class="font-sans-small" style="color: var(--main-colors-foreground-f700); font-size: 11px;">Kết thúc: ${adminEscapeHtml(c.endDate)}</div>` : ''}
								</td>
								<td>${formatText}</td>
								<td class="font-sans-caption">${adminEscapeHtml(tuitionText)}</td>
								<td style="text-align: center;">
									${(() => {
										const studentCount = Array.isArray(c.studentEmails) ? c.studentEmails.length : 0;
										const maxCap = c.maxCapacity || c.capacity || 20;
										const isFull = studentCount >= maxCap;
										const tagClass = isFull ? 'admin-tag-warning' : (studentCount > 0 ? 'admin-tag-gold' : 'admin-tag-neutral');
										return `<span class="admin-tag ${tagClass}" style="cursor: pointer;" onclick="openCohortStudentsModal('${adminEscapeHtml(c.id)}')" title="Nhấp để xem và quản lý ${studentCount} học viên trong lớp">👥 ${studentCount} / ${maxCap}</span>`;
									})()}
								</td>
								<td style="text-align: center;">
									${statusBadges[c.status] || (c.is_open == 1 ? statusBadges['open'] : statusBadges['completed'])}
									${!isPub ? `<br><small style="color: var(--main-colors-foreground-f700); font-size: 10px;">(Ẩn web)</small>` : ''}
								</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<button type="button" class="btn-icon-action" title="Quản lý danh sách Học viên của lớp này" style="color: var(--highlight-blue);" onclick="openCohortStudentsModal('${adminEscapeHtml(c.id)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
										</button>
										<a href="../attendance/index.html?cohortId=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Điểm danh Lớp học này" style="color: var(--highlight-green);">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
										</a>
										<a href="../certificate/create.html?mode=batch&cohortId=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Cấp Chứng Chỉ Tốt Nghiệp cho Lớp này" style="color: var(--alternative-foreground-gold);">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
										</a>
										<a href="edit.html?id=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Sửa lớp">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</a>
										<button class="btn-icon-action delete" title="Xóa" onclick="deleteCohort('${adminEscapeHtml(c.id)}', '${adminEscapeHtml(c.code || c.title)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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

window.deleteCohort = async function (id, name) {
	if (!confirm(`Bạn có chắc muốn xóa lớp học "${name}"?`)) return;
	try {
		await currentDb.collection('cohorts').doc(id).delete();
		showAdminToast(`✅ Đã xóa lớp học "${name}"`, 'success');
		await loadCohorts();
	} catch (err) {
		showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
	}
};

function initEvents() {
	document.getElementById('search-cohort')?.addEventListener('input', renderCohortsTable);
	document.getElementById('filter-cohort-status')?.addEventListener('change', renderCohortsTable);
	document.getElementById('filter-cohort-course')?.addEventListener('change', renderCohortsTable);

	document.getElementById('btn-export-cohorts')?.addEventListener('click', () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCohorts, null, 2));
		const dlAnchor = document.createElement('a');
		dlAnchor.setAttribute("href", dataStr);
		dlAnchor.setAttribute("download", `cohorts_backup_${new Date().toISOString().slice(0, 10)}.json`);
		document.body.appendChild(dlAnchor);
		dlAnchor.click();
		dlAnchor.remove();
		showAdminToast('💾 Đã xuất file backup cohorts!', 'success');
	});
}

// =============================================================================
// COHORT STUDENT MANAGEMENT MODULE (EDITABLE TABLE & AUTO USER SYNC)
// =============================================================================

let cohortStudentsList = [];
let isCohortStudentsDirty = false;

function generateUUID() {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
	return 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

function markCohortStudentsDirty(dirty) {
	isCohortStudentsDirty = dirty;
	const statusEl = document.getElementById('cohort-students-save-status');
	if (statusEl) {
		if (dirty) {
			statusEl.classList.remove('d-none');
			statusEl.classList.add('d-inline-flex');
		} else {
			statusEl.classList.add('d-none');
			statusEl.classList.remove('d-inline-flex');
		}
	}
	const btnTop = document.getElementById('btn-save-cohort-students');
	const btnBottom = document.getElementById('btn-save-cohort-students-footer');
	if (btnTop) {
		btnTop.style.boxShadow = dirty ? '0 0 10px rgba(255, 184, 0, 0.4)' : '';
	}
	if (btnBottom) {
		btnBottom.style.boxShadow = dirty ? '0 0 10px rgba(255, 184, 0, 0.4)' : '';
	}
}

window.openCohortStudentsModal = function (cohortId) {
	modalActiveCohortId = cohortId;
	const c = allCohorts.find(item => item.id === cohortId);
	if (!c) return;

	const modal = document.getElementById('modal-cohort-students');
	const titleEl = document.getElementById('modal-cohort-title');
	const subEl = document.getElementById('modal-cohort-subtitle');
	const linkAtt = document.getElementById('btn-modal-attendance');

	const studentCount = Array.isArray(c.studentEmails) ? c.studentEmails.length : 0;
	const maxCap = c.maxCapacity || c.capacity || 20;

	if (titleEl) {
		titleEl.innerHTML = `Học Viên Lớp: <strong>${adminEscapeHtml(c.title || c.code)}</strong> <span class="badge ms-2" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--alternative-foreground-gold); font-family: monospace;">${adminEscapeHtml(c.code || '')}</span>`;
	}
	if (subEl) {
		subEl.innerHTML = `Sĩ số: <strong>${studentCount} / ${maxCap}</strong> học viên • Khai giảng: ${adminEscapeHtml(c.startDate || c.start_date || '—')}`;
	}
	if (linkAtt) {
		linkAtt.href = `../attendance/index.html?cohortId=${encodeURIComponent(cohortId)}`;
	}

	// Khởi tạo danh sách học viên từ cohort
	const rawEmails = Array.isArray(c.studentEmails) ? c.studentEmails : [];
	cohortStudentsList = rawEmails.map(rawEmail => {
		const clean = (rawEmail || '').trim().toLowerCase();
		const uInfo = usersMap.get(clean) || null;
		let name = uInfo ? uInfo.name : '';
		if (!name && clean) {
			const prefix = clean.split('@')[0];
			name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
		}
		return {
			tempId: generateUUID(),
			email: clean,
			name: name,
			phone: uInfo ? uInfo.phone || '' : '',
			hasAccount: !!uInfo,
			role: uInfo ? uInfo.role || 'member' : 'member',
			isNew: false
		};
	});

	markCohortStudentsDirty(false);
	populateSystemUserSelect(c);

	const searchInput = document.getElementById('cohort-student-search');
	if (searchInput) searchInput.value = '';

	const addPanel = document.getElementById('panel-add-students');
	if (addPanel) addPanel.style.display = 'none';

	renderModalStudentsTable();
	if (modal) {
		modal.classList.add('open');
		modal.style.display = 'flex';
	}
};

function populateSystemUserSelect(cohort) {
	const select = document.getElementById('select-system-user');
	if (!select) return;

	const currentEmails = new Set(cohortStudentsList.map(s => (s.email || '').toLowerCase()));
	select.innerHTML = '<option value="">-- Tìm chọn người dùng --</option>';

	const availableUsers = allUsersList.filter(u => u.email && !currentEmails.has(u.email));
	availableUsers.sort((a, b) => a.name.localeCompare(b.name, 'vi'));

	availableUsers.forEach(u => {
		const opt = document.createElement('option');
		opt.value = u.email;
		opt.textContent = `${u.name || 'Người dùng'} (${u.email})${u.phone ? ' - ' + u.phone : ''}`;
		select.appendChild(opt);
	});
}

window.updateStudentField = function (tempId, field, value) {
	const st = cohortStudentsList.find(item => item.tempId === tempId);
	if (!st) return;

	st[field] = value;
	if (field === 'email') {
		const clean = (value || '').trim().toLowerCase();
		const uInfo = usersMap.get(clean);
		if (uInfo) {
			st.hasAccount = true;
			st.role = uInfo.role || 'member';
			if (!st.name && uInfo.name) st.name = uInfo.name;
			if (!st.phone && uInfo.phone) st.phone = uInfo.phone;
		} else {
			st.hasAccount = false;
			st.role = 'member';
		}
	}
	markCohortStudentsDirty(true);
};

window.removeStudentTableRow = function (tempId) {
	const idx = cohortStudentsList.findIndex(item => item.tempId === tempId);
	if (idx === -1) return;

	const st = cohortStudentsList[idx];
	const nameOrEmail = st.name || st.email || 'dòng này';
	if (st.email && !confirm(`Xóa học viên "${nameOrEmail}" khỏi danh sách lớp?`)) {
		return;
	}

	cohortStudentsList.splice(idx, 1);
	markCohortStudentsDirty(true);
	renderModalStudentsTable();
};

window.addEmptyStudentRow = function () {
	const newSt = {
		tempId: generateUUID(),
		email: '',
		name: '',
		phone: '',
		hasAccount: false,
		role: 'member',
		isNew: true
	};
	cohortStudentsList.push(newSt);
	markCohortStudentsDirty(true);
	renderModalStudentsTable();

	// Focus vào ô họ tên của dòng mới
	setTimeout(() => {
		const inputName = document.querySelector(`input[data-temp-id="${newSt.tempId}"][data-field="name"]`);
		if (inputName) inputName.focus();
	}, 50);
};

function renderModalStudentsTable() {
	const container = document.getElementById('modal-cohort-students-table');
	if (!container || !modalActiveCohortId) return;

	const searchKeyword = (document.getElementById('cohort-student-search')?.value || '').trim().toLowerCase();

	let displayList = cohortStudentsList;
	if (searchKeyword) {
		displayList = cohortStudentsList.filter(s =>
			(s.name || '').toLowerCase().includes(searchKeyword) ||
			(s.email || '').toLowerCase().includes(searchKeyword) ||
			(s.phone || '').includes(searchKeyword)
		);
	}

	if (cohortStudentsList.length === 0) {
		container.innerHTML = `
			<div class="empty-state p-4 text-center">
				<span class="font-sans-caption" style="color: var(--main-colors-foreground-f700);">Lớp học này hiện chưa có học viên nào.</span>
				<div class="mt-2 d-flex justify-content-center gap-2">
					<button type="button" class="btn-admin btn-admin-primary btn-admin-sm" onclick="addEmptyStudentRow()">+ Thêm Dòng Đầu Tiên</button>
					<button type="button" class="btn-admin btn-admin-secondary btn-admin-sm" onclick="document.getElementById('btn-toggle-add-panel').click();">📋 Nạp Hàng Loạt</button>
				</div>
			</div>
		`;
		return;
	}

	const rows = displayList.map((st, idx) => {
		const roleBadge = st.hasAccount
			? `<span class="admin-tag admin-tag-success" title="Đã có tài khoản trong hệ thống">✓ ${adminEscapeHtml(st.role || 'Member')}</span>`
			: `<span class="admin-tag admin-tag-neutral" title="Tài khoản sẽ được tự động tạo với role Member khi lưu">+ Tạo Member</span>`;

		return `
			<tr>
				<td style="width: 36px; text-align: center; color: var(--main-colors-foreground-f700); font-family: monospace; font-size: 11px;">
					${idx + 1}
				</td>
				<td style="min-width: 170px;">
					<input type="text"
						class="form-control-custom"
						placeholder="Họ và tên..."
						value="${adminEscapeHtml(st.name || '')}"
						data-temp-id="${st.tempId}"
						data-field="name"
						oninput="updateStudentField('${st.tempId}', 'name', this.value)"
						style="height: 32px; font-size: 12.5px; border-radius: 6px; padding: 4px 8px;">
				</td>
				<td style="min-width: 220px;">
					<input type="email"
						class="form-control-custom"
						placeholder="email@gmail.com..."
						value="${adminEscapeHtml(st.email || '')}"
						data-temp-id="${st.tempId}"
						data-field="email"
						oninput="updateStudentField('${st.tempId}', 'email', this.value)"
						style="height: 32px; font-size: 12.5px; font-family: monospace; border-radius: 6px; padding: 4px 8px;"
						required>
				</td>
				<td style="width: 130px;">
					<input type="tel"
						class="form-control-custom"
						placeholder="0901234567..."
						value="${adminEscapeHtml(st.phone || '')}"
						data-temp-id="${st.tempId}"
						data-field="phone"
						oninput="updateStudentField('${st.tempId}', 'phone', this.value)"
						style="height: 32px; font-size: 12px; font-family: monospace; border-radius: 6px; padding: 4px 8px;">
				</td>
				<td style="width: 110px; text-align: center;">
					${roleBadge}
				</td>
				<td style="width: 90px; text-align: right; padding-right: 8px !important;">
					<div class="d-inline-flex gap-1 align-items-center">
						${st.email ? `
							<button type="button" class="btn-icon-action" title="Chuyển lớp học viên này" onclick="openTransferCohortModal('${adminEscapeHtml(st.email)}')">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
							</button>
						` : ''}
						<button type="button" class="btn-icon-action delete" title="Xóa dòng" onclick="removeStudentTableRow('${st.tempId}')">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
						</button>
					</div>
				</td>
			</tr>
		`;
	}).join('');

	container.innerHTML = `
		<table class="editable-table table align-middle m-0" style="font-size: 13px;">
			<thead>
				<tr style="border-bottom: 0.5px solid var(--console-stroke);">
					<th style="width: 36px; text-align: center;">#</th>
					<th>Họ Và Tên</th>
					<th>Email Google <span class="required" style="color: var(--alternative-foreground-red);">*</span></th>
					<th style="width: 130px;">Số Điện Thoại</th>
					<th style="width: 110px; text-align: center;">Role / Tài Khoản</th>
					<th style="width: 90px; text-align: right;">Thao Tác</th>
				</tr>
			</thead>
			<tbody>
				${rows}
			</tbody>
		</table>
	`;
}

function addSystemUserToTable(email) {
	if (!email) return;
	const clean = email.trim().toLowerCase();

	const exists = cohortStudentsList.some(s => (s.email || '').toLowerCase() === clean);
	if (exists) {
		showAdminToast('⚠️ Học viên này đã có sẵn trên bảng rồi!', 'warning');
		return;
	}

	const u = usersMap.get(clean);
	cohortStudentsList.push({
		tempId: generateUUID(),
		email: clean,
		name: u ? u.name || '' : '',
		phone: u ? u.phone || '' : '',
		hasAccount: !!u,
		role: u ? u.role || 'member' : 'member',
		isNew: !u
	});

	markCohortStudentsDirty(true);
	renderModalStudentsTable();
	showAdminToast(`✅ Đã chèn "${u?.name || clean}" vào bảng!`, 'success');
}

function addBulkStudentsToTable(rawText) {
	if (!rawText || !rawText.trim()) {
		showAdminToast('⚠️ Vui lòng dán dữ liệu danh sách học viên!', 'warning');
		return;
	}

	const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
	const existingSet = new Set(cohortStudentsList.map(s => (s.email || '').toLowerCase()));
	let addedCount = 0;

	lines.forEach(line => {
		// Tách theo Tab, Phẩy, Chấm phẩy hoặc Gạch đứng
		const parts = line.split(/[\t,;|]+/).map(p => p.trim()).filter(p => p.length > 0);
		if (parts.length === 0) return;

		let email = '';
		let phone = '';
		let name = '';

		// Tự động nhận dạng email, phone, name
		parts.forEach(part => {
			if (part.includes('@') && !email) {
				email = part.toLowerCase();
			} else if (/^[0-9+() -]{9,15}$/.test(part) && !phone) {
				phone = part;
			} else if (!name && !part.includes('@')) {
				name = part;
			}
		});

		if (!email || existingSet.has(email)) return;

		existingSet.add(email);
		const uInfo = usersMap.get(email);
		cohortStudentsList.push({
			tempId: generateUUID(),
			email: email,
			name: name || (uInfo ? uInfo.name : '') || '',
			phone: phone || (uInfo ? uInfo.phone : '') || '',
			hasAccount: !!uInfo,
			role: uInfo ? uInfo.role || 'member' : 'member',
			isNew: !uInfo
		});
		addedCount++;
	});

	if (addedCount === 0) {
		showAdminToast('⚠️ Không tìm thấy email mới nào hợp lệ (hoặc tất cả đã có trên bảng)!', 'warning');
		return;
	}

	const textarea = document.getElementById('textarea-bulk-emails');
	if (textarea) textarea.value = '';

	markCohortStudentsDirty(true);
	renderModalStudentsTable();
	showAdminToast(`✅ Đã nạp ${addedCount} học viên vào bảng! Nhấn 'Lưu Thay Đổi' để hoàn tất.`, 'success');
}

window.saveCohortStudentsTable = async function () {
	if (!modalActiveCohortId) return;

	// Lọc các hàng có email
	const validList = [];
	const seenEmails = new Set();
	let hasError = false;

	for (let i = 0; i < cohortStudentsList.length; i++) {
		const st = cohortStudentsList[i];
		const cleanEmail = (st.email || '').trim().toLowerCase();
		const cleanName = (st.name || '').trim();
		const cleanPhone = (st.phone || '').trim();

		// Bỏ qua dòng trống hoàn toàn
		if (!cleanEmail && !cleanName && !cleanPhone) {
			continue;
		}

		if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
			showAdminToast(`⚠️ Dòng #${i + 1}: Email "${st.email || ''}" không hợp lệ!`, 'warning');
			hasError = true;
			break;
		}

		if (seenEmails.has(cleanEmail)) {
			showAdminToast(`⚠️ Email trùng lặp trên bảng: "${cleanEmail}"!`, 'warning');
			hasError = true;
			break;
		}

		seenEmails.add(cleanEmail);
		validList.push({
			...st,
			email: cleanEmail,
			name: cleanName,
			phone: cleanPhone
		});
	}

	if (hasError) return;

	const c = allCohorts.find(item => item.id === modalActiveCohortId);
	if (!c) return;

	const finalEmails = validList.map(s => s.email);

	try {
		showAdminToast('⏳ Đang lưu bảng học viên & đồng bộ User...', 'info');

		// 1. Cập nhật studentEmails trong Cohort document
		await currentDb.collection('cohorts').doc(modalActiveCohortId).update({
			studentEmails: finalEmails,
			updatedAt: firebase.firestore.FieldValue.serverTimestamp()
		});

		c.studentEmails = finalEmails;

		// 2. TỰ ĐỘNG ĐỒNG BỘ VÀO authorizedUsers VỚI ROLE LÀ MEMBER
		const syncPromises = validList.map(async st => {
			const cleanEmail = st.email;
			const existingUser = usersMap.get(cleanEmail);

			if (existingUser) {
				// Đã có tài khoản: đảm bảo có cohortId và cập nhật Tên, SĐT nếu có
				const updatePayload = {
					cohortIds: firebase.firestore.FieldValue.arrayUnion(modalActiveCohortId),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				};
				if (st.name) updatePayload.displayName = st.name;
				if (st.phone) updatePayload.phone = st.phone;

				await currentDb.collection('authorizedUsers').doc(cleanEmail).set(updatePayload, { merge: true });

				// Đồng bộ RAM
				if (st.name) existingUser.name = st.name;
				if (st.phone) existingUser.phone = st.phone;
				if (!existingUser.cohortIds) existingUser.cohortIds = [];
				if (!existingUser.cohortIds.includes(modalActiveCohortId)) existingUser.cohortIds.push(modalActiveCohortId);
			} else {
				// CHƯA có tài khoản: TỰ ĐỘNG TẠO MỚI với role = 'member'
				const newUserData = {
					id: generateUUID(),
					primaryEmail: cleanEmail,
					emails: [cleanEmail],
					displayName: st.name || cleanEmail.split('@')[0],
					role: 'member',
					status: 'active',
					phone: st.phone || '',
					cohortIds: [modalActiveCohortId],
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
					addedBy: currentUser ? currentUser.email : 'admin'
				};

				await currentDb.collection('authorizedUsers').doc(cleanEmail).set(newUserData, { merge: true });

				// Thêm vào cache RAM
				const newU = {
					email: cleanEmail,
					name: newUserData.displayName,
					role: 'member',
					phone: newUserData.phone,
					cohortIds: [modalActiveCohortId],
					avatar: ''
				};
				usersMap.set(cleanEmail, newU);
				allUsersList.push(newU);
			}
		});

		await Promise.all(syncPromises);

		// 3. Cập nhật trạng thái RAM & UI
		cohortStudentsList = validList.map(s => ({
			...s,
			hasAccount: true,
			role: usersMap.get(s.email)?.role || 'member',
			isNew: false
		}));

		markCohortStudentsDirty(false);
		populateSystemUserSelect(c);
		renderModalStudentsTable();
		renderCohortsTable();

		// Cập nhật phụ đề sĩ số trên header modal
		const subEl = document.getElementById('modal-cohort-subtitle');
		if (subEl) {
			const maxCap = c.maxCapacity || c.capacity || 20;
			subEl.innerHTML = `Sĩ số: <strong>${finalEmails.length} / ${maxCap}</strong> học viên • Khai giảng: ${adminEscapeHtml(c.startDate || c.start_date || '—')}`;
		}

		showAdminToast(`✅ Đã lưu ${finalEmails.length} học viên & tự động đồng bộ User (Role: Member)!`, 'success');
	} catch (err) {
		console.error('[Cohort] Lỗi lưu bảng học viên:', err);
		showAdminToast(`❌ Lỗi lưu dữ liệu: ${err.message}`, 'error');
	}
};

window.openTransferCohortModal = function (email) {
	transferTargetStudentEmail = (email || '').trim().toLowerCase();
	const u = usersMap.get(transferTargetStudentEmail);
	const displayName = u ? u.name : transferTargetStudentEmail;

	document.getElementById('transfer-student-name').textContent = displayName;
	document.getElementById('transfer-student-email').textContent = transferTargetStudentEmail;

	const select = document.getElementById('transfer-target-cohort');
	if (select) {
		select.innerHTML = '';
		const otherCohorts = allCohorts.filter(c => c.id !== modalActiveCohortId);
		otherCohorts.forEach(c => {
			const opt = document.createElement('option');
			opt.value = c.id;
			const code = c.code ? `[${c.code}] ` : '';
			const title = c.title || c.name || c.id;
			const studentCount = Array.isArray(c.studentEmails) ? c.studentEmails.length : 0;
			opt.textContent = `${code}${title} (${studentCount}/${c.maxCapacity || 20} HV)`;
			select.appendChild(opt);
		});
	}

	const transferModal = document.getElementById('modal-transfer-cohort');
	if (transferModal) {
		transferModal.classList.add('open');
		transferModal.style.display = 'flex';
	}
};

async function confirmTransferCohort() {
	if (!modalActiveCohortId || !transferTargetStudentEmail) return;

	const select = document.getElementById('transfer-target-cohort');
	const targetCohortId = select ? select.value : null;

	if (!targetCohortId || targetCohortId === modalActiveCohortId) {
		showAdminToast('⚠️ Vui lòng chọn lớp học đích hợp lệ!', 'warning');
		return;
	}

	const oldCohort = allCohorts.find(c => c.id === modalActiveCohortId);
	const targetCohort = allCohorts.find(c => c.id === targetCohortId);

	try {
		const batch = currentDb.batch();

		// 1. Xóa khỏi lớp cũ
		const oldRef = currentDb.collection('cohorts').doc(modalActiveCohortId);
		batch.update(oldRef, {
			studentEmails: firebase.firestore.FieldValue.arrayRemove(transferTargetStudentEmail),
			updatedAt: firebase.firestore.FieldValue.serverTimestamp()
		});

		// 2. Thêm vào lớp mới
		const targetRef = currentDb.collection('cohorts').doc(targetCohortId);
		batch.update(targetRef, {
			studentEmails: firebase.firestore.FieldValue.arrayUnion(transferTargetStudentEmail),
			updatedAt: firebase.firestore.FieldValue.serverTimestamp()
		});

		await batch.commit();

		// Cập nhật local caches
		if (oldCohort) {
			oldCohort.studentEmails = (oldCohort.studentEmails || []).filter(e => (e || '').toLowerCase() !== transferTargetStudentEmail);
		}
		if (targetCohort) {
			if (!Array.isArray(targetCohort.studentEmails)) targetCohort.studentEmails = [];
			targetCohort.studentEmails.push(transferTargetStudentEmail);
		}

		// Cập nhật user doc
		currentDb.collection('authorizedUsers').doc(transferTargetStudentEmail).update({
			cohortIds: firebase.firestore.FieldValue.arrayRemove(modalActiveCohortId)
		}).catch(() => {});
		currentDb.collection('authorizedUsers').doc(transferTargetStudentEmail).set({
			cohortIds: firebase.firestore.FieldValue.arrayUnion(targetCohortId)
		}, { merge: true }).catch(() => {});

		document.getElementById('modal-transfer-cohort').style.display = 'none';
		showAdminToast(`✅ Đã chuyển học viên sang lớp "${targetCohort ? (targetCohort.code || targetCohort.title) : ''}"!`, 'success');

		populateSystemUserSelect(oldCohort);
		renderModalStudentsTable();
		renderCohortsTable();
	} catch (err) {
		console.error('[Cohort] Lỗi chuyển lớp:', err);
		showAdminToast(`❌ Lỗi chuyển lớp: ${err.message}`, 'error');
	}
}

function exportCohortStudentsCSV() {
	if (!modalActiveCohortId) return;
	const c = allCohorts.find(item => item.id === modalActiveCohortId);
	if (!c) return;

	const rawEmails = Array.isArray(c.studentEmails) ? c.studentEmails : [];
	if (rawEmails.length === 0) {
		showAdminToast('⚠️ Lớp học chưa có học viên để xuất file!', 'warning');
		return;
	}

	const headers = ['STT', 'Họ Và Tên', 'Email', 'Số Điện Thoại', 'Mã Lớp', 'Tên Lớp Học'];
	const rows = rawEmails.map((email, idx) => {
		const clean = (email || '').trim().toLowerCase();
		const u = usersMap.get(clean);
		const name = u ? u.name : '';
		const phone = u ? u.phone : '';
		return [
			idx + 1,
			`"${(name || '').replace(/"/g, '""')}"`,
			`"${clean}"`,
			`"${phone}"`,
			`"${c.code || c.id}"`,
			`"${(c.title || c.name || '').replace(/"/g, '""')}"`
		].join(',');
	});

	const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('download', `danh_sach_hoc_vien_${c.code || c.id}_${new Date().toISOString().slice(0, 10)}.csv`);
	document.body.appendChild(link);
	link.click();
	link.remove();
	showAdminToast('📥 Đã tải file CSV danh sách học viên!', 'success');
}

function initStudentModalEvents() {
	// Đóng modal
	const closeModal = () => {
		if (isCohortStudentsDirty) {
			if (!confirm('⚠️ Bạn có thay đổi trên bảng học viên chưa được lưu! Bạn có chắc chắn muốn đóng không?')) {
				return;
			}
		}
		const modal = document.getElementById('modal-cohort-students');
		if (modal) {
			modal.classList.remove('open', 'show');
			modal.style.display = 'none';
		}
		markCohortStudentsDirty(false);
		modalActiveCohortId = null;
	};

	document.getElementById('btn-close-cohort-students')?.addEventListener('click', closeModal);
	document.getElementById('btn-modal-close-footer')?.addEventListener('click', closeModal);
	document.getElementById('modal-cohort-students')?.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) closeModal();
	});

	// Nút thêm dòng trực tiếp trên bảng
	document.getElementById('btn-add-student-row')?.addEventListener('click', () => {
		addEmptyStudentRow();
	});

	// Nút Lưu bảng học viên (header toolbar & footer)
	document.getElementById('btn-save-cohort-students')?.addEventListener('click', () => {
		saveCohortStudentsTable();
	});
	document.getElementById('btn-save-cohort-students-footer')?.addEventListener('click', () => {
		saveCohortStudentsTable();
	});

	// Toggle panel nạp học viên nhanh
	document.getElementById('btn-toggle-add-panel')?.addEventListener('click', () => {
		const panel = document.getElementById('panel-add-students');
		if (panel) {
			panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
		}
	});

	document.getElementById('btn-close-add-panel')?.addEventListener('click', () => {
		const panel = document.getElementById('panel-add-students');
		if (panel) panel.style.display = 'none';
	});

	// Tab chuyển đổi phương thức thêm
	const tabUser = document.getElementById('tab-btn-add-system-user');
	const tabBulk = document.getElementById('tab-btn-add-bulk-emails');
	const modeUser = document.getElementById('add-mode-system-user');
	const modeBulk = document.getElementById('add-mode-bulk-emails');

	tabUser?.addEventListener('click', () => {
		tabUser.classList.add('active');
		tabBulk?.classList.remove('active');
		if (modeUser) modeUser.style.display = 'block';
		if (modeBulk) modeBulk.style.display = 'none';
	});

	tabBulk?.addEventListener('click', () => {
		tabBulk.classList.add('active');
		tabUser?.classList.remove('active');
		if (modeUser) modeUser.style.display = 'none';
		if (modeBulk) modeBulk.style.display = 'block';
	});

	// Chèn từ system user vào bảng
	document.getElementById('btn-submit-add-user')?.addEventListener('click', () => {
		const select = document.getElementById('select-system-user');
		const email = select ? select.value : '';
		if (!email) {
			showAdminToast('⚠️ Vui lòng chọn người dùng từ danh sách!', 'warning');
			return;
		}
		addSystemUserToTable(email);
		select.value = '';
	});

	// Nạp hàng loạt từ textarea vào bảng
	document.getElementById('btn-submit-bulk-emails')?.addEventListener('click', () => {
		const textarea = document.getElementById('textarea-bulk-emails');
		addBulkStudentsToTable(textarea ? textarea.value : '');
	});

	// Tìm kiếm học viên trong modal
	document.getElementById('cohort-student-search')?.addEventListener('input', () => {
		renderModalStudentsTable();
	});

	// Xuất CSV
	document.getElementById('btn-export-cohort-students-csv')?.addEventListener('click', exportCohortStudentsCSV);

	// Phím tắt bàn phím Ctrl+S / Cmd+S để lưu nhanh
	window.addEventListener('keydown', (e) => {
		const modal = document.getElementById('modal-cohort-students');
		const isModalOpen = modal && (modal.classList.contains('open') || modal.style.display === 'flex');
		if (isModalOpen && (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
			e.preventDefault();
			saveCohortStudentsTable();
		}
	});

	// Modal Chuyển lớp
	const closeTransferModal = () => {
		const m = document.getElementById('modal-transfer-cohort');
		if (m) {
			m.classList.remove('open', 'show');
			m.style.display = 'none';
		}
	};
	document.getElementById('btn-close-transfer-modal')?.addEventListener('click', closeTransferModal);
	document.getElementById('btn-cancel-transfer')?.addEventListener('click', closeTransferModal);
	document.getElementById('modal-transfer-cohort')?.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) closeTransferModal();
	});
	document.getElementById('btn-confirm-transfer')?.addEventListener('click', confirmTransferCohort);
}

