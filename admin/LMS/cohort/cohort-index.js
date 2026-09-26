window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-cohorts'
};

let allCohorts = [];
let allCourses = [];
let currentDb = null;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	await loadCohorts();
	initEvents();
});

async function loadCohorts() {
	const container = document.getElementById('cohorts-list-container');
	try {
		const [snapshot, coursesSnap] = await Promise.all([
			currentDb.collection('cohorts').get(),
			currentDb.collection('courses').get().catch(() => ({ docs: [] }))
		]);
		allCohorts = [];
		snapshot.forEach(doc => {
			allCohorts.push({ id: doc.id, ...doc.data() });
		});

		allCourses = [];
		coursesSnap.forEach(doc => {
			allCourses.push({ id: doc.id, ...doc.data() });
		});

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
								</td>
								<td class="font-sans-caption" style="font-weight: 500;">${adminEscapeHtml(startDateText)}</td>
								<td>${formatText}</td>
								<td class="font-sans-caption">${adminEscapeHtml(tuitionText)}</td>
								<td style="text-align: center;"><span class="font-sans-caption">${c.maxCapacity || c.capacity || 20}</span></td>
								<td style="text-align: center;">
									${statusBadges[c.status] || (c.is_open == 1 ? statusBadges['open'] : statusBadges['completed'])}
									${!isPub ? `<br><small style="color: var(--main-colors-foreground-f700); font-size: 10px;">(Ẩn web)</small>` : ''}
								</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
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

async function seedOpenCohorts() {
	if (!confirm('Khởi tạo / Cập nhật 2 đợt mở đăng ký mẫu (Design Thinking: Early Bird 2027 & Applied UX Analytic: THÁNG 9) lên Firestore?')) return;
	try {
		// Find courses
		const coursesSnap = await currentDb.collection('courses').get();
		let dtCourseId = 'dc44e305-9111-490e-b3ab-363dff00f91f';
		let dtCourseTitle = 'Design Thinking';
		let auaCourseId = '2106d881-8e2f-4675-9b6d-eb25beae8489';
		let auaCourseTitle = 'Applied UX Analytic';

		coursesSnap.forEach(doc => {
			const d = doc.data();
			if (d.code === 'DT' || d.code === 'DDPPSAM' || d.slug?.includes('design')) {
				dtCourseId = doc.id;
				dtCourseTitle = d.title || 'Design Thinking';
			}
			if (d.code === 'AUXA' || d.code === 'UXA' || d.slug?.includes('analytic')) {
				auaCourseId = doc.id;
				auaCourseTitle = d.title || 'Applied UX Analytic';
			}
		});

		const batch = currentDb.batch();

		// 1. Flagship Design Thinking Cohort
		const dtRef = currentDb.collection('cohorts').doc('cohort_dt_early_bird_2027');
		batch.set(dtRef, {
			id: 'cohort_dt_early_bird_2027',
			courseId: dtCourseId,
			courseCode: 'DT',
			courseTitle: dtCourseTitle,
			code: 'DT-2027',
			title: 'Early Bird 2027',
			name: 'Early Bird 2027',
			bootcamp_name: 'Early Bird 2027',
			bootcamp_id: 13,
			status: 'open',
			is_open: 1,
			startDate: 'Tháng 2, 2027',
			start_date: 'Tháng 2, 2027',
			format: 'offline',
			offline: 1,
			location: 'HN',
			tuition: 'Early bird',
			pricing: 'Early bird',
			maxCapacity: 20,
			isPublic: true,
			listing: 1,
			schedule: 'Thứ 7 & CN (Offline tại Hà Nội)',
			updatedAt: firebase.firestore.FieldValue.serverTimestamp()
		}, { merge: true });

		// 2. Applied UX Analytic Cohort
		const auaRef = currentDb.collection('cohorts').doc('cohort_auxa_thang_9');
		batch.set(auaRef, {
			id: 'cohort_auxa_thang_9',
			courseId: auaCourseId,
			courseCode: 'AUXA',
			courseTitle: auaCourseTitle,
			code: 'AUXA-T09',
			title: 'THÁNG 9',
			name: 'THÁNG 9',
			bootcamp_name: 'THÁNG 9',
			bootcamp_id: 'analytic_3',
			status: 'open',
			is_open: 1,
			startDate: '30/9/2026',
			start_date: '30/9/2026',
			format: 'online',
			offline: 0,
			location: '',
			tuition: '9.999.999',
			pricing: '9.999.999',
			isPublic: true,
			listing: 1,
			schedule: 'Online qua Google Meet',
			updatedAt: firebase.firestore.FieldValue.serverTimestamp()
		}, { merge: true });

		await batch.commit();
		showAdminToast('✅ Đã nạp thành công 2 đợt tuyển sinh đang mở lên Firestore!', 'success');
		await loadCohorts();
	} catch (err) {
		showAdminToast(`❌ Lỗi nạp dữ liệu: ${err.message}`, 'error');
	}
}

function initEvents() {
	document.getElementById('search-cohort')?.addEventListener('input', renderCohortsTable);
	document.getElementById('filter-cohort-status')?.addEventListener('change', renderCohortsTable);
	document.getElementById('filter-cohort-course')?.addEventListener('change', renderCohortsTable);
	document.getElementById('btn-seed-open-cohorts')?.addEventListener('click', seedOpenCohorts);

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
