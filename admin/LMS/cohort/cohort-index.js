window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-cohorts'
};

let allCohorts = [];
let currentDb = null;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	await loadCohorts();
	initEvents();
});

async function loadCohorts() {
	const container = document.getElementById('cohorts-list-container');
	try {
		const snapshot = await currentDb.collection('cohorts').get();
		allCohorts = [];
		snapshot.forEach(doc => {
			allCohorts.push({ id: doc.id, ...doc.data() });
		});

		// Update stats
		document.getElementById('stat-cohorts-total').textContent = allCohorts.length;
		document.getElementById('stat-cohorts-open').textContent = allCohorts.filter(c => (c.status || 'open') === 'open').length;
		document.getElementById('stat-cohorts-running').textContent = allCohorts.filter(c => c.status === 'in-progress').length;
		document.getElementById('stat-cohorts-completed').textContent = allCohorts.filter(c => c.status === 'completed').length;

		renderCohortsTable();
	} catch (err) {
		if (container) {
			container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải lớp học: ${err.message}</div>`;
		}
	}
}

function renderCohortsTable() {
	const container = document.getElementById('cohorts-list-container');
	const query = (document.getElementById('search-cohort')?.value || '').trim().toLowerCase();
	const statusFilter = document.getElementById('filter-cohort-status')?.value || 'all';

	let list = allCohorts;
	if (statusFilter !== 'all') list = list.filter(c => (c.status || 'open') === statusFilter);
	if (query) {
		list = list.filter(c =>
			(c.code && c.code.toLowerCase().includes(query)) ||
			(c.title && c.title.toLowerCase().includes(query)) ||
			(c.courseTitle && c.courseTitle.toLowerCase().includes(query)) ||
			(c.instructor && c.instructor.toLowerCase().includes(query))
		);
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
							<th style="width: 100px;">Mã Lớp</th>
							<th>Tên Lớp / Khóa học</th>
							<th>Lịch học</th>
							<th>Giảng viên</th>
							<th style="width: 110px; text-align: center;">Học viên</th>
							<th style="width: 130px; text-align: center;">Trạng thái</th>
							<th style="width: 110px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => `
							<tr>
								<td>
									<span class="badge" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--alternative-foreground-gold); font-family: monospace;">
										${adminEscapeHtml(c.code || c.id)}
									</span>
								</td>
								<td>
									<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(c.title || c.name || 'Lớp học')}</div>
									${c.courseTitle ? `<div class="font-sans-small" style="color: var(--main-colors-foreground-f700);">${adminEscapeHtml(c.courseTitle)}</div>` : ''}
								</td>
								<td class="font-sans-caption">${adminEscapeHtml(c.schedule || '—')}</td>
								<td class="font-sans-caption">${adminEscapeHtml(c.instructor || c.trainer || '—')}</td>
								<td style="text-align: center;"><span class="font-sans-caption">${c.currentStudents || 0} / ${c.maxCapacity || c.capacity || 20}</span></td>
								<td style="text-align: center;">${statusBadges[c.status] || statusBadges['open']}</td>
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
						`).join('')}
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
