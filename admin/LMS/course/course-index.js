window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-courses'
};

let allCourses = [];
let currentDb = null;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	await loadCourses();
	initEvents();
});

async function loadCourses() {
	const container = document.getElementById('courses-list-container');
	try {
		const snapshot = await currentDb.collection('courses').get();
		allCourses = [];
		snapshot.forEach(doc => {
			allCourses.push({ id: doc.id, ...doc.data() });
		});

		// Update stats
		document.getElementById('stat-courses-total').textContent = allCourses.length;
		document.getElementById('stat-courses-active').textContent = allCourses.filter(c => (c.status || 'active') === 'active').length;
		document.getElementById('stat-courses-upcoming').textContent = allCourses.filter(c => c.status === 'upcoming').length;
		document.getElementById('stat-courses-online').textContent = allCourses.filter(c => c.delivery === 'online' || c.delivery === 'hybrid').length;

		renderCoursesTable();
	} catch (err) {
		if (container) {
			container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải khóa học: ${err.message}</div>`;
		}
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

window.handleSortCourse = function (col) {
	if (currentSortCol === col) {
		currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
	} else {
		currentSortCol = col;
		currentSortDir = 'asc';
	}
	renderCoursesTable();
};

function renderCoursesTable() {
	const container = document.getElementById('courses-list-container');
	const query = (document.getElementById('search-course')?.value || '').trim().toLowerCase();
	const deliveryFilter = document.getElementById('filter-course-delivery')?.value || 'all';
	const statusFilter = document.getElementById('filter-course-status')?.value || 'all';

	let list = [...allCourses];
	if (deliveryFilter !== 'all') list = list.filter(c => (c.delivery || 'online') === deliveryFilter);
	if (statusFilter !== 'all') list = list.filter(c => (c.status || 'active') === statusFilter);
	if (query) {
		list = list.filter(c =>
			(c.code && c.code.toLowerCase().includes(query)) ||
			(c.title && c.title.toLowerCase().includes(query)) ||
			(c.tagline && c.tagline.toLowerCase().includes(query))
		);
	}

	if (currentSortCol) {
		list.sort((a, b) => {
			let valA = a[currentSortCol];
			let valB = b[currentSortCol];
			if (currentSortCol === 'durationHours') {
				valA = Number(valA || a.duration || 0);
				valB = Number(valB || b.duration || 0);
				return currentSortDir === 'asc' ? valA - valB : valB - valA;
			}
			if (currentSortCol === 'isPublic') {
				valA = a.isPublic !== false ? 1 : 0;
				valB = b.isPublic !== false ? 1 : 0;
				return currentSortDir === 'asc' ? valA - valB : valB - valA;
			}
			const strA = (valA ?? '').toString().trim();
			const strB = (valB ?? '').toString().trim();
			const res = strA.localeCompare(strB, 'vi', { sensitivity: 'base', numeric: true });
			return currentSortDir === 'asc' ? res : -res;
		});
	}

	if (list.length === 0) {
		container.innerHTML = `
					<div class="empty-state p-4 text-center">
						<span class="font-sans-caption">Không tìm thấy khóa học phù hợp.</span>
						<div class="mt-2"><a href="create.html" class="btn-admin btn-admin-primary btn-admin-sm">+ Thêm Khóa Học Mới</a></div>
					</div>
				`;
		return;
	}

	const statusBadges = {
		active: '<span class="admin-tag admin-tag-success">Active</span>',
		upcoming: '<span class="admin-tag admin-tag-info">Upcoming</span>',
		archived: '<span class="admin-tag admin-tag-neutral">Archived</span>'
	};

	const deliveryBadges = {
		online: '<span class="role-cell member">Online</span>',
		offline: '<span class="role-cell instructor">Offline</span>',
		hybrid: '<span class="role-cell alumni">Hybrid</span>'
	};

	container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th class="th-sortable ${currentSortCol === 'code' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCourse('code')" style="width: 90px;">Mã ${getSortIndicator('code')}</th>
							<th class="th-sortable ${currentSortCol === 'title' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCourse('title')">Tên Khóa Học ${getSortIndicator('title')}</th>
							<th class="th-sortable ${currentSortCol === 'delivery' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCourse('delivery')" style="width: 110px; text-align: center;">Hình thức ${getSortIndicator('delivery')}</th>
							<th class="th-sortable ${currentSortCol === 'durationHours' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCourse('durationHours')" style="width: 110px; text-align: center;">Thời lượng ${getSortIndicator('durationHours')}</th>
							<th class="th-sortable ${currentSortCol === 'status' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCourse('status')" style="width: 120px; text-align: center;">Trạng thái ${getSortIndicator('status')}</th>
							<th class="th-sortable ${currentSortCol === 'isPublic' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortCourse('isPublic')" style="width: 110px; text-align: center;">Công khai ${getSortIndicator('isPublic')}</th>
							<th style="width: 140px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => `
							<tr>
								<td>
									<span class="badge" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--alternative-foreground-gold); font-family: monospace; font-size: 11px;">
										${adminEscapeHtml(c.code || c.id)}
									</span>
								</td>
								<td>
									<a href="detail.html?id=${encodeURIComponent(c.id)}" class="font-sans-caption fw-semibold text-decoration-none" style="color: var(--main-colors-foreground-f100);">
										${adminEscapeHtml(c.title || 'Untitled Course')}
									</a>
									${c.tagline ? `<div class="font-sans-small text-truncate" style="color: var(--main-colors-foreground-f700); max-width: 380px;">${adminEscapeHtml(c.tagline)}</div>` : ''}
								</td>
								<td style="text-align: center;">${deliveryBadges[c.delivery] || deliveryBadges.online}</td>
								<td style="text-align: center;"><span class="font-sans-caption">${c.durationHours || c.duration || 36}h</span></td>
								<td style="text-align: center;">${statusBadges[c.status] || statusBadges.active}</td>
								<td style="text-align: center;">
									${c.isPublic !== false ? '<span style="color: var(--highlight-green);">✓ Hiện</span>' : '<span style="color: var(--main-colors-foreground-f700);">Ẩn</span>'}
								</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<a href="detail.html?id=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Xem chi tiết">
											👁️
										</a>
										<a href="edit.html?id=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Chỉnh sửa">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</a>
										<button class="btn-icon-action delete" title="Xóa" onclick="deleteCourse('${adminEscapeHtml(c.id)}', '${adminEscapeHtml(c.title)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
										</button>
									</div>
								</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
			`;
}

window.deleteCourse = async function (id, title) {
	if (!confirm(`Bạn có chắc muốn xóa khóa học "${title}"?`)) return;
	try {
		await currentDb.collection('courses').doc(id).delete();
		showAdminToast(`✅ Đã xóa khóa học "${title}"`, 'success');
		await loadCourses();
	} catch (err) {
		showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
	}
};

function initEvents() {
	document.getElementById('search-course')?.addEventListener('input', renderCoursesTable);
	document.getElementById('filter-course-delivery')?.addEventListener('change', renderCoursesTable);
	document.getElementById('filter-course-status')?.addEventListener('change', renderCoursesTable);

	document.getElementById('btn-export-courses')?.addEventListener('click', () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCourses, null, 2));
		const dlAnchor = document.createElement('a');
		dlAnchor.setAttribute("href", dataStr);
		dlAnchor.setAttribute("download", `courses_backup_${new Date().toISOString().slice(0, 10)}.json`);
		document.body.appendChild(dlAnchor);
		dlAnchor.click();
		dlAnchor.remove();
		showAdminToast('💾 Đã xuất file backup courses!', 'success');
	});
}
