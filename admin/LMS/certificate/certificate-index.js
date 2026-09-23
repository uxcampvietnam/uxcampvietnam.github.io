window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-certificates'
};

let allCerts = [];
let allCourses = [];
let allCohorts = [];
let selectedCertIds = new Set();
let currentDb = null;
let currentUser = null;

// Helpers
function getStudentName(c) {
	return c.recipientName || c.individual_name || c.studentName || c.name || c.displayName || '—';
}

function getStudentEmail(c) {
	return c.recipientEmail || c.individual_email || c.studentEmail || c.email || '';
}

function getCohortName(c) {
	if (c.cohortId) {
		const matched = allCohorts.find(ch => ch.id === c.cohortId);
		if (matched) return matched.name || matched.title || (matched.code ? `[${matched.code}]` : '') || c.cohortId;
	}
	if (c.cohortName) return c.cohortName;
	if (c.cohortTitle) return c.cohortTitle;
	if (c.cohortCode) return c.cohortCode;
	if (c.bootcamp_cohort_name) return c.bootcamp_cohort_name;
	return '—';
}

function getCourseTitle(c) {
	if (c.courseId) {
		const matched = allCourses.find(co => co.id === c.courseId);
		if (matched) return matched.title || matched.name || c.courseId;
	}
	if (c.courseTitle) return c.courseTitle;
	if (c.courseName) return c.courseName;
	if (c.bootcamp_name) return c.bootcamp_name;
	return 'Khóa học UXCamp';
}

function getCertUuid(c) {
	return c.certificateId || c.uuid || c.id || '';
}

function getCertDate(c) {
	return c.issueDate || c.graduationDate || c.bootcamp_cohort_end_date || '—';
}

function getCertStatus(c) {
	return c.status || 'active';
}

function getCertImageUrl(c) {
	if (!c) return '';
	const url = c.certificateImageUrl || c.imageUrl || c.image || c.raw?.certificateImageUrl || '';
	const imgName = c.certificateImgName || c.imgName || c.raw?.certificateImgName || '';

	if (url) {
		if (/^https?:\/\//i.test(url) || url.startsWith('data:')) {
			return url;
		}
		if (url.startsWith('/')) {
			return `../../../${url.replace(/^\/+/, '')}`;
		}
		return `../../../${url}`;
	}
	if (imgName) {
		return `../../../asset/image/certificate/${imgName}.webp`;
	}
	return '';
}

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	currentUser = e.detail.user;

	// Tự động đảm bảo quyền admin cho tài khoản đăng nhập hiện tại
	if (currentUser && currentUser.email) {
		const cleanMail = currentUser.email.trim().toLowerCase();
		currentDb.collection('authorizedUsers').doc(cleanMail).set({
			role: 'admin',
			status: 'active',
			email: cleanMail
		}, { merge: true }).catch(() => {});
	}

	await loadCertificates();
	initEvents();
});

async function loadCertificates() {
	const container = document.getElementById('certs-list-container');
	try {
		const [certsSnap, coursesSnap, cohortsSnap] = await Promise.all([
			currentDb.collection('certificates').get(),
			currentDb.collection('courses').get().catch(() => ({ docs: [] })),
			currentDb.collection('cohorts').get().catch(() => ({ docs: [] }))
		]);

		allCerts = [];
		certsSnap.forEach(doc => {
			allCerts.push({ id: doc.id, ...doc.data() });
		});

		allCourses = [];
		coursesSnap.forEach(doc => {
			allCourses.push({ id: doc.id, ...doc.data() });
		});

		allCohorts = [];
		cohortsSnap.forEach(doc => {
			allCohorts.push({ id: doc.id, ...doc.data() });
		});

		// 1. Chuẩn hóa dữ liệu certificates in-memory và tự động đồng bộ lên Firestore nếu đang lưu tên cũ
		const ddppsamCourse = allCourses.find(co => (co.title || '').includes('Designing Digital Product'));
		allCerts.forEach(c => {
			const isDDPPSAM = (c.courseTitle && c.courseTitle.includes('Designing Digital Product')) ||
				(c.bootcamp_name && c.bootcamp_name.includes('Designing Digital Product')) ||
				(ddppsamCourse && c.courseId === ddppsamCourse.id);

			if (isDDPPSAM && ddppsamCourse) {
				const needDbFix = c.courseTitle === 'Designing Digital Product per State and Metric' || !c.courseId;
				c.courseId = ddppsamCourse.id;
				c.courseTitle = ddppsamCourse.title;
				c.courseCode = ddppsamCourse.code || 'DDPPSAM';
				if (needDbFix && currentDb) {
					currentDb.collection('certificates').doc(c.id).update({
						courseId: ddppsamCourse.id,
						courseTitle: ddppsamCourse.title,
						courseCode: ddppsamCourse.code || 'DDPPSAM'
					}).catch(() => {});
				}
			} else if (c.courseId) {
				const matchedCo = allCourses.find(co => co.id === c.courseId);
				if (matchedCo) {
					c.courseTitle = matchedCo.title;
					c.courseCode = matchedCo.code || '';
				}
			}

			// Chuẩn hóa tên lớp học từ cohortId
			if (c.cohortId) {
				const matchedCh = allCohorts.find(ch => ch.id === c.cohortId);
				if (matchedCh) {
					c.cohortName = matchedCh.name || matchedCh.title || c.cohortName;
					c.cohortCode = matchedCh.code || c.cohortCode;
				}
			}
		});

		// Cập nhật thẻ thống kê (Stats Bar)
		const total = allCerts.length;
		const activeCount = allCerts.filter(c => getCertStatus(c) !== 'revoked').length;
		const revokedCount = allCerts.filter(c => getCertStatus(c) === 'revoked').length;
		const linkedCohortCount = allCerts.filter(c => Boolean(c.cohortId || c.cohortName || c.cohortCode)).length;

		document.getElementById('stat-certs-total').textContent = total;
		document.getElementById('stat-certs-active').textContent = activeCount;
		document.getElementById('stat-certs-revoked').textContent = revokedCount;
		document.getElementById('stat-certs-cohort').textContent = linkedCohortCount;

		// Cập nhật dropdowns bộ lọc & modal selects
		populateDropdowns();

		renderCertsTable();
	} catch (err) {
		if (container) {
			container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải chứng chỉ: ${err.message}</div>`;
		}
	}
}

function populateDropdowns() {
	// 1. Filter Cohort select
	const filterCohort = document.getElementById('filter-cohort');
	if (filterCohort) {
		const currentVal = filterCohort.value;
		filterCohort.innerHTML = '<option value="all">Tất cả Lớp học</option>';

		// Danh sách cohort từ allCohorts
		const cohortList = [];
		allCohorts.forEach(ch => {
			const name = ch.name || ch.title || ch.cohortName || ch.code || ch.id;
			cohortList.push({ id: ch.id, label: `${ch.code ? `[${ch.code}] ` : ''}${name}` });
		});

		// Thêm các cohortId duy nhất từ allCerts nếu chưa có
		allCerts.forEach(c => {
			if (c.cohortId && !cohortList.some(item => item.id === c.cohortId)) {
				cohortList.push({ id: c.cohortId, label: c.cohortName || c.cohortTitle || c.cohortId });
			} else if (!c.cohortId) {
				const name = c.cohortName || c.cohortTitle || '';
				if (name && !cohortList.some(item => item.id === name || item.label.includes(name))) {
					cohortList.push({ id: name, label: name });
				}
			}
		});

		cohortList.forEach(item => {
			const opt = document.createElement('option');
			opt.value = item.id;
			opt.textContent = item.label;
			filterCohort.appendChild(opt);
		});
		if (currentVal) filterCohort.value = currentVal;
	}

	// 2. Filter Course select (Chỉ nạp danh sách khóa học chuẩn từ allCourses, không bị trùng lặp)
	const filterCourse = document.getElementById('filter-course');
	if (filterCourse) {
		const currentVal = filterCourse.value;
		filterCourse.innerHTML = '<option value="all">Tất cả Khóa học</option>';

		const courseList = [];
		allCourses.forEach(co => {
			const title = co.title || co.name || co.id;
			courseList.push({ id: co.id, label: `${co.code ? `[${co.code}] ` : ''}${title}` });
		});

		// Chỉ thêm từ allCerts nếu có khóa học ngoại lệ chưa từng có trong allCourses
		allCerts.forEach(c => {
			if (c.courseId && allCourses.some(co => co.id === c.courseId)) return;
			const title = c.courseTitle || c.courseName || '';
			if (!title) return;
			const isKnown = allCourses.some(co => (co.title || '').toLowerCase() === title.toLowerCase() ||
				(title.includes('Designing Digital Product') && (co.title || '').includes('Designing Digital Product')));
			if (!isKnown && !courseList.some(item => item.id === title || item.label === title)) {
				courseList.push({ id: title, label: title });
			}
		});

		courseList.forEach(item => {
			const opt = document.createElement('option');
			opt.value = item.id;
			opt.textContent = item.label;
			filterCourse.appendChild(opt);
		});
		if (currentVal) filterCourse.value = currentVal;
	}

	// 3. Edit modal selects
	const editCourse = document.getElementById('edit-cert-course');
	if (editCourse) {
		editCourse.innerHTML = '<option value="">-- Chọn khóa học --</option>';
		allCourses.forEach(co => {
			const title = co.title || co.name || co.id;
			const opt = document.createElement('option');
			opt.value = co.id;
			opt.textContent = `${co.code ? `[${co.code}] ` : ''}${title}`;
			opt.dataset.title = title;
			opt.dataset.code = co.code || '';
			editCourse.appendChild(opt);
		});
	}

	const editCohort = document.getElementById('edit-cert-cohort');
	if (editCohort) {
		editCohort.innerHTML = '<option value="">-- Không chọn / Tự do --</option>';
		allCohorts.forEach(ch => {
			const name = ch.name || ch.title || ch.cohortName || ch.id;
			const code = ch.code ? `[${ch.code}] ` : '';
			const course = ch.courseTitle ? ` — ${ch.courseTitle}` : '';
			const opt = document.createElement('option');
			opt.value = ch.id;
			opt.textContent = `${code}${name}${course}`;
			opt.dataset.name = name;
			opt.dataset.code = ch.code || '';
			editCohort.appendChild(opt);
		});
	}
}

function getFilteredCertificates() {
	const query = (document.getElementById('search-certs')?.value || '').trim().toLowerCase();
	const cohortFilter = document.getElementById('filter-cohort')?.value || 'all';
	const courseFilter = document.getElementById('filter-course')?.value || 'all';
	const statusFilter = document.getElementById('filter-status')?.value || 'all';

	return allCerts.filter(c => {
		// 1. Filter theo query
		if (query) {
			const name = getStudentName(c).toLowerCase();
			const email = getStudentEmail(c).toLowerCase();
			const course = getCourseTitle(c).toLowerCase();
			const cohort = getCohortName(c).toLowerCase();
			const uuid = getCertUuid(c).toLowerCase();
			const code = (c.certificateCode || '').toLowerCase();
			const matches = name.includes(query) || email.includes(query) || course.includes(query) ||
				cohort.includes(query) || uuid.includes(query) || code.includes(query);
			if (!matches) return false;
		}

		// 2. Filter theo Lớp học (cohort)
		if (cohortFilter !== 'all') {
			const matched = c.cohortId === cohortFilter || c.cohortName === cohortFilter ||
				c.cohortTitle === cohortFilter || (c.cohortCode && c.cohortCode === cohortFilter);
			if (!matched) return false;
		}

		// 3. Filter theo Khóa học (course)
		if (courseFilter !== 'all') {
			const matched = c.courseId === courseFilter || c.courseTitle === courseFilter ||
				c.courseName === courseFilter || c.bootcamp_name === courseFilter;
			if (!matched) return false;
		}

		// 4. Filter theo Trạng thái (status)
		if (statusFilter !== 'all') {
			const s = getCertStatus(c);
			if (statusFilter === 'active' && s === 'revoked') return false;
			if (statusFilter === 'revoked' && s !== 'revoked') return false;
		}

		return true;
	});
}

function renderCertsTable() {
	const container = document.getElementById('certs-list-container');
	const list = getFilteredCertificates();

	updateBatchBar();

	if (list.length === 0) {
		container.innerHTML = `
			<div class="empty-state p-4 text-center">
				<span class="font-sans-caption">Không tìm thấy chứng chỉ nào phù hợp bộ lọc.</span>
				<div class="mt-2 d-flex gap-2 justify-content-center">
					<button type="button" class="btn-admin btn-admin-secondary btn-admin-sm" onclick="resetFilters()">✕ Đặt lại bộ lọc</button>
					<a href="create.html" class="btn-admin btn-admin-primary btn-admin-sm">+ Cấp Chứng Chỉ Mới</a>
				</div>
			</div>
		`;
		return;
	}

	const allVisibleSelected = list.length > 0 && list.every(c => selectedCertIds.has(c.id));

	container.innerHTML = `
		<table class="user-table">
			<thead>
				<tr>
					<th style="width: 40px; text-align: center;">
						<input type="checkbox" id="select-all-certs" ${allVisibleSelected ? 'checked' : ''} title="Chọn tất cả">
					</th>
					<th style="width: 40px;">#</th>
					<th style="width: 68px; text-align: center;">Ảnh</th>
					<th>Học Viên Nhận</th>
					<th>Khóa Học & Lớp</th>
					<th style="width: 140px; text-align: center;">Mã UUID Xác Thực</th>
					<th style="width: 120px; text-align: center;">Ngày Cấp</th>
					<th style="width: 100px; text-align: center;">Trạng thái</th>
					<th style="width: 140px; text-align: right;">Thao tác</th>
				</tr>
			</thead>
			<tbody>
				${list.map((c, i) => {
					const certUuid = getCertUuid(c);
					const studentName = getStudentName(c);
					const studentEmail = getStudentEmail(c);
					const courseTitle = getCourseTitle(c);
					const cohortName = getCohortName(c);
					const issueDate = getCertDate(c);
					const status = getCertStatus(c);
					const isRevoked = status === 'revoked';
					const isSelected = selectedCertIds.has(c.id);
					const certImg = getCertImageUrl(c);
					// URL CHUẨN XÁC THỰC: /certificate/individual.html?id=...
					const verifyUrl = `../../../certificate/individual.html?id=${encodeURIComponent(certUuid)}`;

					return `
					<tr class="${isSelected ? 'table-row-selected' : ''}" style="${isRevoked ? 'opacity: 0.65;' : ''}">
						<td style="text-align: center;">
							<input type="checkbox" class="cert-checkbox" data-id="${adminEscapeHtml(c.id)}" ${isSelected ? 'checked' : ''}>
						</td>
						<td class="font-sans-caption" style="color: var(--main-colors-foreground-f800);">${i + 1}</td>
						<td style="text-align: center;">
							${certImg ? `
								<div class="cert-thumb-wrapper" onclick="viewCertDetail('${adminEscapeHtml(c.id)}')" title="Nhấn xem chi tiết & ảnh">
									<img src="${adminEscapeHtml(certImg)}" alt="Ảnh chứng chỉ" class="cert-table-thumb" loading="lazy" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
									<div class="cert-thumb-placeholder" style="display: none;">📜</div>
								</div>
							` : `
								<div class="cert-thumb-placeholder" onclick="viewCertDetail('${adminEscapeHtml(c.id)}')" title="Chưa có ảnh (nhấn xem chi tiết)">
									📜
								</div>
							`}
						</td>
						<td>
							<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(studentName)}</div>
							<div class="font-sans-small" style="color: var(--main-colors-foreground-f700);">${adminEscapeHtml(studentEmail || '—')}</div>
						</td>
						<td>
							<div class="font-sans-caption" style="color: var(--main-colors-foreground-f200);">${adminEscapeHtml(courseTitle)}</div>
							<div class="font-sans-small" style="color: var(--alternative-foreground-gold); font-family: monospace;">${adminEscapeHtml(cohortName)}</div>
						</td>
						<td style="text-align: center;">
							<div class="d-inline-flex align-items-center gap-1">
								<span class="badge" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--main-colors-foreground-f300); font-family: monospace; font-size: 10.5px;">
									${adminEscapeHtml(certUuid.substring(0, 13))}...
								</span>
								<button type="button" class="btn-icon-action" style="width: 22px; height: 22px;" title="Sao chép mã UUID" onclick="copyText('${adminEscapeHtml(certUuid)}')">
									<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
								</button>
							</div>
						</td>
						<td style="text-align: center;"><span class="font-sans-caption">${adminEscapeHtml(issueDate)}</span></td>
						<td style="text-align: center;">
							${isRevoked
								? '<span class="admin-tag admin-tag-danger">Thu hồi</span>'
								: '<span class="admin-tag admin-tag-success">Active</span>'}
						</td>
						<td style="text-align: right;">
							<div class="d-inline-flex gap-1 align-items-center">
								<button type="button" class="btn-icon-action" title="Xem chi tiết" onclick="viewCertDetail('${adminEscapeHtml(c.id)}')">
									👁️
								</button>
								<button type="button" class="btn-icon-action" title="Chỉnh sửa" onclick="openEditModal('${adminEscapeHtml(c.id)}')">
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
								</button>
								<a href="${verifyUrl}" target="_blank" class="btn-icon-action" title="Xem trang chứng chỉ số (/certificate/individual.html)">
									↗
								</a>
								<button class="btn-icon-action delete" title="${isRevoked ? 'Xóa vĩnh viễn' : 'Thu hồi chứng chỉ'}" onclick="deleteCert('${adminEscapeHtml(c.id)}', '${adminEscapeHtml(studentName)}')">
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

	// Bind checkbox events
	container.querySelectorAll('.cert-checkbox').forEach(cb => {
		cb.addEventListener('change', (e) => {
			const id = e.target.dataset.id;
			if (e.target.checked) {
				selectedCertIds.add(id);
			} else {
				selectedCertIds.delete(id);
			}
			renderCertsTable();
		});
	});

	const selectAllCb = document.getElementById('select-all-certs');
	if (selectAllCb) {
		selectAllCb.addEventListener('change', (e) => {
			if (e.target.checked) {
				list.forEach(c => selectedCertIds.add(c.id));
			} else {
				list.forEach(c => selectedCertIds.delete(c.id));
			}
			renderCertsTable();
		});
	}
}

function updateBatchBar() {
	const bar = document.getElementById('batch-action-bar');
	const countEl = document.getElementById('batch-selected-count');
	if (!bar || !countEl) return;

	if (selectedCertIds.size > 0) {
		bar.classList.add('active');
		countEl.textContent = `Đã chọn ${selectedCertIds.size} chứng chỉ`;
	} else {
		bar.classList.remove('active');
	}
}

window.copyText = function (text) {
	if (!text) return;
	navigator.clipboard.writeText(text).then(() => {
		showAdminToast('📋 Đã sao chép mã!', 'success');
	}).catch(() => {
		showAdminToast('Lỗi sao chép', 'warning');
	});
};

window.resetFilters = function () {
	document.getElementById('search-certs').value = '';
	document.getElementById('filter-cohort').value = 'all';
	document.getElementById('filter-course').value = 'all';
	document.getElementById('filter-status').value = 'all';
	renderCertsTable();
};

// =========================================================================
// 1. CHI TIẾT CHỨNG CHỈ (DETAIL MODAL)
// =========================================================================
window.viewCertDetail = function (id) {
	const c = allCerts.find(item => item.id === id);
	if (!c) return;

	const certUuid = getCertUuid(c);
	const name = getStudentName(c);
	const email = getStudentEmail(c);
	const course = getCourseTitle(c);
	const cohort = getCohortName(c);
	const date = getCertDate(c);
	const status = getCertStatus(c);
	const isRevoked = status === 'revoked';
	const verifyUrl = `../../../certificate/individual.html?id=${encodeURIComponent(certUuid)}`;

	document.getElementById('modal-detail-title').textContent = `Chi Tiết: ${name}`;
	document.getElementById('modal-detail-name').textContent = name;
	document.getElementById('modal-detail-email').textContent = email || 'Chưa có email';
	document.getElementById('modal-detail-status').innerHTML = isRevoked
		? '<span class="admin-tag admin-tag-danger">Thu hồi (Revoked)</span>'
		: '<span class="admin-tag admin-tag-success">Đang hiệu lực (Active)</span>';
	document.getElementById('modal-detail-course').textContent = course;
	document.getElementById('modal-detail-cohort').textContent = cohort;
	document.getElementById('modal-detail-date').textContent = date;
	document.getElementById('modal-detail-code').textContent = c.certificateCode || '—';
	document.getElementById('modal-detail-project').textContent = c.finalProject || '—';
	document.getElementById('modal-detail-uuid').value = certUuid;

	// Image preview
	const imgBox = document.getElementById('modal-detail-preview-img-box');
	const imgEl = document.getElementById('modal-detail-img');
	const imgUrl = getCertImageUrl(c);
	if (imgUrl) {
		imgEl.src = imgUrl;
		imgEl.style.cursor = 'zoom-in';
		imgEl.title = 'Nhấn để xem ảnh gốc kích thước đầy đủ';
		imgEl.onclick = () => window.open(imgUrl, '_blank');
		imgBox.style.display = 'block';
	} else {
		imgBox.style.display = 'none';
	}

	// Copy UUID button
	document.getElementById('btn-copy-detail-uuid').onclick = () => copyText(certUuid);

	// View online button
	document.getElementById('btn-detail-view-online').href = verifyUrl;

	// Switch to edit modal
	document.getElementById('btn-detail-goto-edit').onclick = () => {
		document.getElementById('modal-cert-detail').classList.remove('open');
		openEditModal(id);
	};

	document.getElementById('modal-cert-detail').classList.add('open');
};

// =========================================================================
// 2. CHỈNH SỬA CHỨNG CHỈ (EDIT MODAL)
// =========================================================================
window.openEditModal = function (id) {
	const c = allCerts.find(item => item.id === id);
	if (!c) return;

	document.getElementById('edit-cert-id').value = c.id;
	document.getElementById('edit-student-name').value = getStudentName(c);
	document.getElementById('edit-student-email').value = getStudentEmail(c);

	// Chọn chính xác khóa học
	let selCourseId = c.courseId || '';
	if (!selCourseId && c.courseTitle) {
		const matchedCo = allCourses.find(co => (co.title || '').toLowerCase() === c.courseTitle.toLowerCase() ||
			(c.courseTitle.includes('Designing Digital Product') && (co.title || '').includes('Designing Digital Product')));
		if (matchedCo) selCourseId = matchedCo.id;
	}
	document.getElementById('edit-cert-course').value = selCourseId;

	// Chọn chính xác lớp học
	let selCohortId = c.cohortId || '';
	if (!selCohortId && c.cohortName) {
		const matchedCh = allCohorts.find(ch => (ch.name || ch.title || '').toLowerCase() === c.cohortName.toLowerCase());
		if (matchedCh) selCohortId = matchedCh.id;
	}
	document.getElementById('edit-cert-cohort').value = selCohortId;

	document.getElementById('edit-cert-date').value = c.issueDate || c.graduationDate || '';
	document.getElementById('edit-cert-status').value = getCertStatus(c);
	document.getElementById('edit-cert-project').value = c.finalProject || '';
	document.getElementById('edit-cert-img-url').value = c.certificateImageUrl || '';
	document.getElementById('edit-cert-pdf-url').value = c.certificatePdfUrl || '';

	document.getElementById('modal-edit-title').textContent = `Chỉnh Sửa: ${getStudentName(c)}`;
	document.getElementById('modal-cert-edit').classList.add('open');
};

// Form submit edit
document.getElementById('form-modal-cert-edit')?.addEventListener('submit', async function (e) {
	e.preventDefault();
	const id = document.getElementById('edit-cert-id').value;
	const studentName = document.getElementById('edit-student-name').value.trim();
	const studentEmail = document.getElementById('edit-student-email').value.trim().toLowerCase();
	const courseId = document.getElementById('edit-cert-course').value;
	const cohortId = document.getElementById('edit-cert-cohort').value;
	const issueDate = document.getElementById('edit-cert-date').value.trim();
	const status = document.getElementById('edit-cert-status').value;
	const finalProject = document.getElementById('edit-cert-project').value.trim();
	const certificateImageUrl = document.getElementById('edit-cert-img-url').value.trim();
	const certificatePdfUrl = document.getElementById('edit-cert-pdf-url').value.trim();

	const matchedCourse = allCourses.find(co => co.id === courseId);
	const matchedCohort = allCohorts.find(ch => ch.id === cohortId);

	const btnSave = document.getElementById('btn-save-edit-cert');
	btnSave.disabled = true;
	btnSave.textContent = 'Đang lưu...';

	try {
		// Đảm bảo quyền admin cho currentUser trong authorizedUsers trước khi ghi Firestore
		if (currentUser && currentUser.email) {
			const cleanMail = currentUser.email.trim().toLowerCase();
			await currentDb.collection('authorizedUsers').doc(cleanMail).set({
				role: 'admin',
				status: 'active',
				email: cleanMail
			}, { merge: true }).catch(() => {});
		}

		const updates = {
			recipientName: studentName,
			studentName: studentName,
			name: studentName,
			recipientEmail: studentEmail,
			studentEmail: studentEmail,
			email: studentEmail,
			courseId: courseId || '',
			courseTitle: matchedCourse ? (matchedCourse.title || matchedCourse.name || '') : '',
			courseCode: matchedCourse?.code || '',
			cohortId: cohortId || '',
			cohortName: matchedCohort ? (matchedCohort.name || matchedCohort.title || matchedCohort.cohortName || '') : '',
			cohortTitle: matchedCohort?.title || matchedCohort?.name || '',
			cohortCode: matchedCohort?.code || '',
			issueDate: issueDate,
			graduationDate: issueDate,
			status: status,
			finalProject: finalProject,
			certificateImageUrl: certificateImageUrl,
			certificatePdfUrl: certificatePdfUrl,
			updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
			updatedBy: currentUser?.email || 'admin'
		};

		await currentDb.collection('certificates').doc(id).set(updates, { merge: true });

		// Update in-memory
		const idx = allCerts.findIndex(c => c.id === id);
		if (idx !== -1) {
			allCerts[idx] = { ...allCerts[idx], ...updates };
		}

		showAdminToast(`✅ Đã cập nhật chứng chỉ cho "${studentName}"!`, 'success');
		document.getElementById('modal-cert-edit').classList.remove('open');
		renderCertsTable();
	} catch (err) {
		showAdminToast(`❌ Lỗi cập nhật: ${err.message}`, 'error');
	} finally {
		btnSave.disabled = false;
		btnSave.textContent = '💾 Lưu Thay Đổi';
	}
});

// =========================================================================
// 3. THU HỒI / XÓA ĐƠN LẺ
// =========================================================================
window.deleteCert = async function (id, student) {
	const c = allCerts.find(item => item.id === id);
	const isRevoked = c && c.status === 'revoked';

	const msg = isRevoked
		? `Xóa vĩnh viễn chứng chỉ của học viên "${student}" khỏi cơ sở dữ liệu?`
		: `Thu hồi chứng chỉ của học viên "${student}"? Học viên sẽ không còn hiển thị trạng thái hợp lệ.`;

	if (!confirm(msg)) return;

	try {
		if (isRevoked) {
			await currentDb.collection('certificates').doc(id).delete();
			allCerts = allCerts.filter(item => item.id !== id);
			selectedCertIds.delete(id);
			showAdminToast(`✅ Đã xóa vĩnh viễn chứng chỉ`, 'success');
		} else {
			await currentDb.collection('certificates').doc(id).update({
				status: 'revoked',
				updatedAt: firebase.firestore.FieldValue.serverTimestamp()
			});
			if (c) c.status = 'revoked';
			showAdminToast(`✅ Đã thu hồi chứng chỉ`, 'success');
		}
		renderCertsTable();
	} catch (err) {
		showAdminToast(`❌ Lỗi thao tác: ${err.message}`, 'error');
	}
};

// =========================================================================
// 4. BATCH ACTIONS (THAO TÁC HÀNG LOẠT)
// =========================================================================
function initBatchActions() {
	// Clear selection
	document.getElementById('btn-batch-clear')?.addEventListener('click', () => {
		selectedCertIds.clear();
		renderCertsTable();
	});

	// Batch Active
	document.getElementById('btn-batch-status-active')?.addEventListener('click', async () => {
		if (selectedCertIds.size === 0) return;
		if (!confirm(`Kích hoạt lại ${selectedCertIds.size} chứng chỉ đã chọn sang trạng thái Active?`)) return;

		try {
			const batch = currentDb.batch();
			selectedCertIds.forEach(id => {
				const ref = currentDb.collection('certificates').doc(id);
				batch.update(ref, {
					status: 'active',
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				});
			});
			await batch.commit();

			allCerts.forEach(c => {
				if (selectedCertIds.has(c.id)) c.status = 'active';
			});
			showAdminToast(`✅ Đã kích hoạt ${selectedCertIds.size} chứng chỉ`, 'success');
			selectedCertIds.clear();
			renderCertsTable();
		} catch (err) {
			showAdminToast(`❌ Lỗi cập nhật: ${err.message}`, 'error');
		}
	});

	// Batch Revoke
	document.getElementById('btn-batch-status-revoked')?.addEventListener('click', async () => {
		if (selectedCertIds.size === 0) return;
		if (!confirm(`Thu hồi ${selectedCertIds.size} chứng chỉ đã chọn?`)) return;

		try {
			const batch = currentDb.batch();
			selectedCertIds.forEach(id => {
				const ref = currentDb.collection('certificates').doc(id);
				batch.update(ref, {
					status: 'revoked',
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				});
			});
			await batch.commit();

			allCerts.forEach(c => {
				if (selectedCertIds.has(c.id)) c.status = 'revoked';
			});
			showAdminToast(`✅ Đã thu hồi ${selectedCertIds.size} chứng chỉ`, 'success');
			selectedCertIds.clear();
			renderCertsTable();
		} catch (err) {
			showAdminToast(`❌ Lỗi cập nhật: ${err.message}`, 'error');
		}
	});

	// Batch Delete
	document.getElementById('btn-batch-delete')?.addEventListener('click', async () => {
		if (selectedCertIds.size === 0) return;
		if (!confirm(`⚠️ CẢNH BÁO: Xóa vĩnh viễn ${selectedCertIds.size} chứng chỉ đã chọn khỏi hệ thống? Thao tác này không thể hoàn tác!`)) return;

		try {
			const batch = currentDb.batch();
			selectedCertIds.forEach(id => {
				const ref = currentDb.collection('certificates').doc(id);
				batch.delete(ref);
			});
			await batch.commit();

			allCerts = allCerts.filter(c => !selectedCertIds.has(c.id));
			showAdminToast(`✅ Đã xóa ${selectedCertIds.size} chứng chỉ`, 'success');
			selectedCertIds.clear();
			renderCertsTable();
		} catch (err) {
			showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
		}
	});

	// Batch Change Date Modal
	document.getElementById('btn-batch-change-date')?.addEventListener('click', () => {
		if (selectedCertIds.size === 0) return;
		const modal = document.getElementById('modal-cert-batch');
		const title = document.getElementById('modal-batch-title');
		const body = document.getElementById('modal-batch-body');
		const btnConfirm = document.getElementById('btn-confirm-batch-action');

		title.textContent = `📅 Đổi Ngày Cấp Cho ${selectedCertIds.size} Chứng Chỉ`;
		body.innerHTML = `
			<div class="form-group">
				<label>Chọn ngày cấp mới <span class="required">*</span></label>
				<input type="date" id="batch-input-date" class="form-control-custom" value="${new Date().toISOString().slice(0, 10)}" required>
				<span class="form-hint">Ngày này sẽ được cập nhật đồng loạt cho toàn bộ ${selectedCertIds.size} chứng chỉ đã chọn.</span>
			</div>
		`;

		btnConfirm.onclick = async () => {
			const newDate = document.getElementById('batch-input-date').value;
			if (!newDate) return;
			btnConfirm.disabled = true;
			btnConfirm.textContent = 'Đang cập nhật...';

			try {
				const batch = currentDb.batch();
				selectedCertIds.forEach(id => {
					const ref = currentDb.collection('certificates').doc(id);
					batch.update(ref, {
						issueDate: newDate,
						graduationDate: newDate,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					});
				});
				await batch.commit();

				allCerts.forEach(c => {
					if (selectedCertIds.has(c.id)) {
						c.issueDate = newDate;
						c.graduationDate = newDate;
					}
				});
				showAdminToast(`✅ Đã cập nhật ngày cấp cho ${selectedCertIds.size} chứng chỉ!`, 'success');
				modal.classList.remove('open');
				selectedCertIds.clear();
				renderCertsTable();
			} catch (err) {
				showAdminToast(`❌ Lỗi: ${err.message}`, 'error');
			} finally {
				btnConfirm.disabled = false;
				btnConfirm.textContent = 'Xác Nhận';
			}
		};

		modal.classList.add('open');
	});

	// Batch Change Cohort Modal
	document.getElementById('btn-batch-change-cohort')?.addEventListener('click', () => {
		if (selectedCertIds.size === 0) return;
		const modal = document.getElementById('modal-cert-batch');
		const title = document.getElementById('modal-batch-title');
		const body = document.getElementById('modal-batch-body');
		const btnConfirm = document.getElementById('btn-confirm-batch-action');

		let cohortOptions = '<option value="">-- Chọn Lớp học để gán --</option>';
		allCohorts.forEach(ch => {
			const name = ch.name || ch.title || ch.cohortName || ch.id;
			const code = ch.code ? `[${ch.code}] ` : '';
			const course = ch.courseTitle ? ` — ${ch.courseTitle}` : '';
			cohortOptions += `<option value="${ch.id}">${code}${name}${course}</option>`;
		});

		title.textContent = `🏫 Gán Lớp Học Cho ${selectedCertIds.size} Chứng Chỉ`;
		body.innerHTML = `
			<div class="form-group">
				<label>Chọn Lớp học (Cohort) <span class="required">*</span></label>
				<select id="batch-input-cohort" class="form-control-custom" required>
					${cohortOptions}
				</select>
				<span class="form-hint">Lớp học và mã lớp sẽ được áp dụng cho toàn bộ ${selectedCertIds.size} chứng chỉ đã chọn.</span>
			</div>
		`;

		btnConfirm.onclick = async () => {
			const cohortId = document.getElementById('batch-input-cohort').value;
			if (!cohortId) {
				showAdminToast('Vui lòng chọn lớp học!', 'warning');
				return;
			}
			const matched = allCohorts.find(ch => ch.id === cohortId);
			const cohortName = matched ? (matched.name || matched.title || matched.cohortName || '') : '';
			const cohortCode = matched?.code || '';

			btnConfirm.disabled = true;
			btnConfirm.textContent = 'Đang cập nhật...';

			try {
				const batch = currentDb.batch();
				selectedCertIds.forEach(id => {
					const ref = currentDb.collection('certificates').doc(id);
					batch.update(ref, {
						cohortId: cohortId,
						cohortName: cohortName,
						cohortTitle: matched?.title || cohortName,
						cohortCode: cohortCode,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					});
				});
				await batch.commit();

				allCerts.forEach(c => {
					if (selectedCertIds.has(c.id)) {
						c.cohortId = cohortId;
						c.cohortName = cohortName;
						c.cohortTitle = matched?.title || cohortName;
						c.cohortCode = cohortCode;
					}
				});
				showAdminToast(`✅ Đã gán lớp học cho ${selectedCertIds.size} chứng chỉ!`, 'success');
				modal.classList.remove('open');
				selectedCertIds.clear();
				renderCertsTable();
			} catch (err) {
				showAdminToast(`❌ Lỗi: ${err.message}`, 'error');
			} finally {
				btnConfirm.disabled = false;
				btnConfirm.textContent = 'Xác Nhận';
			}
		};

		modal.classList.add('open');
	});
}

function initEvents() {
	document.getElementById('search-certs')?.addEventListener('input', renderCertsTable);
	document.getElementById('filter-cohort')?.addEventListener('change', renderCertsTable);
	document.getElementById('filter-course')?.addEventListener('change', renderCertsTable);
	document.getElementById('filter-status')?.addEventListener('change', renderCertsTable);

	// Close modals
	document.querySelectorAll('.btn-close-modal').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('open'));
		});
	});

	// Close modal on background click
	document.querySelectorAll('.admin-modal-overlay').forEach(modal => {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) modal.classList.remove('open');
		});
	});

	// Export JSON
	document.getElementById('btn-export-certs')?.addEventListener('click', () => {
		const filtered = getFilteredCertificates();
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filtered, null, 2));
		const dlAnchor = document.createElement('a');
		dlAnchor.setAttribute("href", dataStr);
		dlAnchor.setAttribute("download", `certificates_backup_${new Date().toISOString().slice(0, 10)}.json`);
		document.body.appendChild(dlAnchor);
		dlAnchor.click();
		dlAnchor.remove();
		showAdminToast('💾 Đã xuất file backup certificates!', 'success');
	});

	initBatchActions();
}
