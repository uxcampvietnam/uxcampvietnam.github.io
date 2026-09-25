window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-courses'
};

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

let currentDb = null;
let courseData = null;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	if (!courseId) {
		showAdminToast('⚠️ Không tìm thấy id khóa học!', 'warning');
		setTimeout(() => window.location.href = 'index.html', 1500);
		return;
	}
	await loadCourseDetails();
	await loadAssociatedCohorts();
});

async function loadCourseDetails() {
	try {
		const doc = await currentDb.collection('courses').doc(courseId).get();
		if (!doc.exists) {
			showAdminToast(`❌ Khóa học ${courseId} không tồn tại!`, 'error');
			setTimeout(() => window.location.href = 'index.html', 1500);
			return;
		}

		courseData = doc.data();
		document.getElementById('breadcrumb-course-title').textContent = courseData.title || doc.id;
		document.getElementById('detail-title').textContent = courseData.title || doc.id;
		document.getElementById('detail-code').textContent = courseData.code || doc.id;
		document.getElementById('detail-name').textContent = courseData.title || 'Untitled Course';
		document.getElementById('detail-tagline').textContent = courseData.tagline || '';
		document.getElementById('detail-delivery').textContent = (courseData.delivery || 'online').toUpperCase();
		document.getElementById('detail-duration').textContent = `${courseData.durationHours || courseData.duration || 36} giờ`;
		document.getElementById('detail-slug').textContent = courseData.slug || '—';
		document.getElementById('detail-desc').textContent = courseData.desc || 'Chưa có mô tả chi tiết.';

		document.getElementById('btn-edit-course').href = `edit.html?id=${encodeURIComponent(doc.id)}`;
		document.getElementById('btn-open-cohort').href = `../cohort/create.html?courseId=${encodeURIComponent(doc.id)}`;
		document.getElementById('btn-add-cohort-sub').href = `../cohort/create.html?courseId=${encodeURIComponent(doc.id)}`;

		if (courseData.url) {
			document.getElementById('detail-url-container').innerHTML = `<a href="${adminEscapeHtml(courseData.url)}" target="_blank" class="text-decoration-none" style="color: var(--alternative-foreground-gold);">Mở tài liệu ↗</a>`;
		} else {
			document.getElementById('detail-url-container').textContent = '—';
		}

		// Badges
		const isPub = courseData.isPublic !== false;
		document.getElementById('detail-status-badges').innerHTML = `
					<span class="admin-tag ${courseData.status === 'active' ? 'admin-tag-success' : 'admin-tag-info'}">
						${(courseData.status || 'active').toUpperCase()}
					</span>
					<span class="admin-tag ${isPub ? 'admin-tag-success' : 'admin-tag-neutral'}">
						${isPub ? '✓ Public' : '○ Private'}
					</span>
				`;

		// Skills
		const skills = Array.isArray(courseData.skills) ? courseData.skills : (courseData.skills ? String(courseData.skills).split(',') : []);
		const skillsEl = document.getElementById('detail-skills-container');
		if (skills.length > 0) {
			skillsEl.innerHTML = skills.map(s => `
						<span class="admin-tag" style="background: var(--body-background-elevate-2); border: 0.5px solid var(--console-stroke); color: var(--main-colors-foreground-f200);">
							${adminEscapeHtml(s.trim())}
						</span>
					`).join('');
		} else {
			skillsEl.innerHTML = '<span class="font-sans-caption" style="color: var(--main-colors-foreground-f700); font-style: italic;">Chưa có danh sách kỹ năng đầu ra.</span>';
		}

	} catch (err) {
		showAdminToast(`❌ Lỗi tải chi tiết: ${err.message}`, 'error');
	}
}

async function loadAssociatedCohorts() {
	const container = document.getElementById('cohorts-sub-container');
	try {
		const snapshot = await currentDb.collection('cohorts').get();
		const matchedCohorts = [];
		snapshot.forEach(doc => {
			const data = doc.data();
			if (data.courseId === courseId || data.courseCode === courseData?.code) {
				matchedCohorts.push({ id: doc.id, ...data });
			}
		});

		if (matchedCohorts.length === 0) {
			container.innerHTML = `
						<div class="empty-state p-4 text-center">
							<span class="font-sans-caption">Khóa học này chưa có lớp học nào được mở.</span>
							<div class="mt-2">
								<a href="../cohort/create.html?courseId=${encodeURIComponent(courseId)}" class="btn-admin btn-admin-primary btn-admin-sm">+ Mở Lớp Học Đầu Tiên</a>
							</div>
						</div>
					`;
			return;
		}

		container.innerHTML = `
					<table class="user-table">
						<thead>
							<tr>
								<th>Mã Lớp</th>
								<th>Tên Lớp / Đợt</th>
								<th>Khai giảng</th>
								<th>Hình thức</th>
								<th>Học phí</th>
								<th style="text-align: center;">Sĩ số</th>
								<th style="text-align: center;">Trạng thái</th>
								<th style="text-align: right;">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							${matchedCohorts.map(c => {
								const formatText = (c.format === 'offline' || c.offline == 1)
									? `<span class="role-cell instructor">Offline, ${adminEscapeHtml(c.location || 'HN')}</span>`
									: `<span class="role-cell member">Online</span>`;
								const startDateText = c.startDate || c.start_date || c.schedule || '—';
								const tuitionText = c.tuition || c.pricing || '—';
								return `
								<tr>
									<td><span class="badge" style="background: var(--body-background-elevate-2); color: var(--alternative-foreground-gold); font-family: monospace;">${adminEscapeHtml(c.code || c.id)}</span></td>
									<td class="font-sans-caption fw-semibold">${adminEscapeHtml(c.title || c.name || c.bootcamp_name || 'Lớp học')}</td>
									<td class="font-sans-caption" style="font-weight: 500;">${adminEscapeHtml(startDateText)}</td>
									<td>${formatText}</td>
									<td class="font-sans-caption">${adminEscapeHtml(tuitionText)}</td>
									<td style="text-align: center;"><span class="font-sans-caption">${c.maxCapacity || c.capacity || 20}</span></td>
									<td style="text-align: center;"><span class="admin-tag ${c.status === 'open' ? 'admin-tag-success' : 'admin-tag-info'}">${adminEscapeHtml(c.status || 'open')}</span></td>
									<td style="text-align: right;">
										<a href="../cohort/edit.html?id=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Sửa lớp">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</a>
									</td>
								</tr>
								`;
							}).join('')}
						</tbody>
					</table>
				`;
	} catch (err) {
		container.innerHTML = `<div class="p-3 text-danger text-center">Lỗi tải lớp học: ${err.message}</div>`;
	}
}
