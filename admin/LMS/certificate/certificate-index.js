window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-certificates'
};

let allCerts = [];
let currentDb = null;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	await loadCertificates();
	initEvents();
});

async function loadCertificates() {
	const container = document.getElementById('certs-list-container');
	try {
		const snapshot = await currentDb.collection('certificates').get();
		allCerts = [];
		snapshot.forEach(doc => {
			allCerts.push({ id: doc.id, ...doc.data() });
		});

		renderCertsTable();
	} catch (err) {
		if (container) {
			container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải chứng chỉ: ${err.message}</div>`;
		}
	}
}

function renderCertsTable() {
	const container = document.getElementById('certs-list-container');
	const query = (document.getElementById('search-certs')?.value || '').trim().toLowerCase();

	let list = allCerts;
	if (query) {
		list = list.filter(c =>
			(c.studentName && c.studentName.toLowerCase().includes(query)) ||
			(c.studentEmail && c.studentEmail.toLowerCase().includes(query)) ||
			(c.courseTitle && c.courseTitle.toLowerCase().includes(query)) ||
			(c.cohortCode && c.cohortCode.toLowerCase().includes(query)) ||
			(c.id && c.id.toLowerCase().includes(query)) ||
			(c.certificateId && c.certificateId.toLowerCase().includes(query))
		);
	}

	if (list.length === 0) {
		container.innerHTML = `
					<div class="empty-state p-4 text-center">
						<span class="font-sans-caption">Chưa có chứng chỉ nào phù hợp.</span>
						<div class="mt-2"><a href="create.html" class="btn-admin btn-admin-primary btn-admin-sm">+ Cấp Chứng Chỉ Mới</a></div>
					</div>
				`;
		return;
	}

	container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 40px;">#</th>
							<th>Học Viên Nhận</th>
							<th>Khóa Học & Lớp</th>
							<th style="width: 140px; text-align: center;">Mã UUID Xác Thực</th>
							<th style="width: 120px; text-align: center;">Ngày Cấp</th>
							<th style="width: 100px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map((c, i) => {
		const certUuid = c.certificateId || c.uuid || c.id;
		const verifyUrl = `../../../certificate/index.html?id=${encodeURIComponent(certUuid)}`;
		return `
							<tr>
								<td class="font-sans-caption" style="color: var(--main-colors-foreground-f800);">${i + 1}</td>
								<td>
									<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(c.studentName || c.name || '—')}</div>
									<div class="font-sans-small" style="color: var(--main-colors-foreground-f700);">${adminEscapeHtml(c.studentEmail || c.email || '')}</div>
								</td>
								<td>
									<div class="font-sans-caption" style="color: var(--main-colors-foreground-f200);">${adminEscapeHtml(c.courseTitle || c.courseName || 'Khóa học')}</div>
									<div class="font-sans-small" style="color: var(--alternative-foreground-gold); font-family: monospace;">${adminEscapeHtml(c.cohortCode || c.cohortTitle || '')}</div>
								</td>
								<td style="text-align: center;">
									<span class="badge" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--main-colors-foreground-f300); font-family: monospace; font-size: 10.5px;">
										${adminEscapeHtml(certUuid.substring(0, 13))}...
									</span>
								</td>
								<td style="text-align: center;"><span class="font-sans-caption">${adminEscapeHtml(c.issueDate || c.graduationDate || '—')}</span></td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<a href="${verifyUrl}" target="_blank" class="btn-icon-action" title="Xem trang chứng chỉ số">
											↗
										</a>
										<button class="btn-icon-action delete" title="Thu hồi / Xóa" onclick="deleteCert('${adminEscapeHtml(c.id)}', '${adminEscapeHtml(c.studentName)}')">
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

window.deleteCert = async function (id, student) {
	if (!confirm(`Thu hồi chứng chỉ của học viên "${student}"?`)) return;
	try {
		await currentDb.collection('certificates').doc(id).delete();
		showAdminToast(`✅ Đã thu hồi chứng chỉ`, 'success');
		await loadCertificates();
	} catch (err) {
		showAdminToast(`❌ Lỗi thu hồi: ${err.message}`, 'error');
	}
};

function initEvents() {
	document.getElementById('search-certs')?.addEventListener('input', renderCertsTable);

	document.getElementById('btn-export-certs')?.addEventListener('click', () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCerts, null, 2));
		const dlAnchor = document.createElement('a');
		dlAnchor.setAttribute("href", dataStr);
		dlAnchor.setAttribute("download", `certificates_backup_${new Date().toISOString().slice(0, 10)}.json`);
		document.body.appendChild(dlAnchor);
		dlAnchor.click();
		dlAnchor.remove();
		showAdminToast('💾 Đã xuất file backup certificates!', 'success');
	});
}
