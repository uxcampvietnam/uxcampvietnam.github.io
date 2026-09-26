window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-certificates'
};

function generateUUID() {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function esc(str) {
	if (!str && str !== 0) return '';
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function notify(msg, type = 'success') {
	if (typeof showAdminToast === 'function') {
		showAdminToast(msg, type);
	} else if (typeof showToast === 'function') {
		showToast(msg);
	} else {
		alert(msg);
	}
}

// Chuyển tiếng Việt có dấu thành chuỗi không dấu, viết liền thường không ký tự đặc biệt
function sanitizeSlug(str) {
	if (!str && str !== 0) return '';
	return String(str)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[đĐ]/g, 'd')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '');
}

// Lấy slug nhận diện lớp học (ưu tiên cohortId chuẩn, nếu id dạng coh_ thì fallback sang code/name)
function getCohortSlug(cohortId) {
	if (!cohortId) return '';
	const cohortData = cohortsMap.get(cohortId);
	let raw = cohortId;
	if ((!raw || raw.startsWith('coh_') || raw.includes('-')) && cohortData) {
		raw = cohortData.code || cohortData.name || cohortData.title || raw;
	}
	let clean = sanitizeSlug(raw);
	// Cắt bỏ các tiền tố thông dụng nếu có
	clean = clean.replace(/^(cohort|lop|khoa)/, '');
	return clean || sanitizeSlug(raw) || 'cohort';
}

// Tạo tên file gợi ý theo format cohortid_tên học viên viết liền không dấu (VD: xonxao_lyhaianh)
function buildCertificateFileName(cohortId, studentName) {
	const cSlug = getCohortSlug(cohortId);
	const sSlug = sanitizeSlug(studentName);
	if (cSlug && sSlug) return `${cSlug}_${sSlug}`;
	if (sSlug) return sSlug;
	if (cSlug) return cSlug;
	return '';
}

// Chuẩn hóa tên file và đường dẫn ảnh lưu trữ vào Firestore
function resolveCertificateImageForSave(inputVal) {
	const raw = (inputVal || '').trim();
	if (!raw) {
		return { imageUrl: '', imgName: '' };
	}
	if (/^https?:\/\//i.test(raw) || raw.startsWith('data:')) {
		const match = raw.match(/\/([^/?#]+)(?:\.[a-z0-9]+)?(?:[?#]|$)/i);
		const imgName = match ? match[1] : '';
		return { imageUrl: raw, imgName };
	}
	if (raw.startsWith('asset/')) {
		const cleanName = raw.replace(/^asset\/image\/certificate\//, '').replace(/\.[a-z0-9]+$/i, '');
		return { imageUrl: raw, imgName: cleanName };
	}
	const cleanFileName = raw.replace(/\.(webp|png|jpe?g)$/i, '');
	return {
		imageUrl: `asset/image/certificate/${cleanFileName}.webp`,
		imgName: cleanFileName
	};
}

// Chuẩn hóa đường dẫn preview từ trang admin/LMS/certificate/
function resolvePreviewUrl(inputVal) {
	const raw = (inputVal || '').trim();
	if (!raw) return '';
	if (/^https?:\/\//i.test(raw) || raw.startsWith('data:') || raw.startsWith('../')) {
		return raw;
	}
	if (raw.startsWith('asset/')) {
		return `../../../${raw}`;
	}
	const cleanFileName = raw.replace(/\.(webp|png|jpe?g)$/i, '');
	return `../../../asset/image/certificate/${cleanFileName}.webp`;
}

// Tiện ích copy tên file vào Clipboard
async function copyToClipboard(text, successMsg = 'Đã copy!') {
	if (!text) return;
	try {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(text);
		} else {
			const tempInput = document.createElement('input');
			tempInput.value = text;
			document.body.appendChild(tempInput);
			tempInput.select();
			document.execCommand('copy');
			document.body.removeChild(tempInput);
		}
		notify(successMsg, 'success');
	} catch (err) {
		notify(`⚠️ Không thể copy: ${err.message}`, 'error');
	}
}

let currentDb = null;
let currentUser = null;
let coursesMap = new Map();
let cohortsMap = new Map();
let usersMap = new Map();

// Batch state
let batchStudents = [];
let activeMode = 'batch'; // 'batch' | 'single'
let isSingleCustomImage = false;

window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	currentUser = e.detail.user;

	// Init default dates & uuid
	const todayStr = new Date().toISOString().slice(0, 10);
	const certDateEl = document.getElementById('cert-date');
	if (certDateEl) certDateEl.value = todayStr;

	const batchGlobalDateEl = document.getElementById('batch-global-date');
	if (batchGlobalDateEl) batchGlobalDateEl.value = todayStr;

	regenSingleUUID();
	initModeSwitcher();
	initBatchEventListeners();
	initSingleEventListeners();

	await loadSelects();

	// Check URL query parameters (e.g. ?mode=single or ?mode=batch&cohortId=...)
	handleUrlParams();
});

// =========================================================================
// 1. MODE SWITCHER
// =========================================================================
function initModeSwitcher() {
	const btnBatch = document.getElementById('tab-btn-batch');
	const btnSingle = document.getElementById('tab-btn-single');
	const viewBatch = document.getElementById('view-batch-cert');
	const viewSingle = document.getElementById('view-single-cert');

	function setMode(mode) {
		activeMode = mode;
		if (mode === 'batch') {
			btnBatch.classList.add('active');
			btnSingle.classList.remove('active');
			viewBatch.style.display = 'block';
			viewSingle.style.display = 'none';
		} else {
			btnSingle.classList.add('active');
			btnBatch.classList.remove('active');
			viewSingle.style.display = 'block';
			viewBatch.style.display = 'none';
		}
	}

	btnBatch.addEventListener('click', () => setMode('batch'));
	btnSingle.addEventListener('click', () => setMode('single'));

	window.setCertCreateMode = setMode;
}

function handleUrlParams() {
	const params = new URLSearchParams(window.location.search);
	const requestedMode = params.get('mode');
	const requestedCohortId = params.get('cohortId');

	if (requestedMode === 'single') {
		if (window.setCertCreateMode) window.setCertCreateMode('single');
	} else {
		if (window.setCertCreateMode) window.setCertCreateMode('batch');
	}

	if (requestedCohortId && cohortsMap.has(requestedCohortId)) {
		const cohortSelect = document.getElementById('batch-cohort-select');
		if (cohortSelect) {
			cohortSelect.value = requestedCohortId;
			handleBatchCohortChange(requestedCohortId);
		}
		const singleCohortSelect = document.getElementById('cert-cohort');
		if (singleCohortSelect) {
			singleCohortSelect.value = requestedCohortId;
			singleCohortSelect.dispatchEvent(new Event('change'));
		}
	}
}

// =========================================================================
// 2. DATA LOADING & POPULATING SELECTS
// =========================================================================
async function loadSelects() {
	try {
		const [coursesSnap, cohortsSnap, usersSnap] = await Promise.all([
			currentDb.collection('courses').get().catch(() => ({ docs: [] })),
			currentDb.collection('cohorts').get().catch(() => ({ docs: [] })),
			currentDb.collection('authorizedUsers').get().catch(() => ({ docs: [] }))
		]);

		// Cache users for quick email -> displayName lookup
		usersSnap.docs.forEach(doc => {
			const data = doc.data() || {};
			const primaryEmail = (data.primaryEmail || data.email || doc.id || '').toLowerCase();
			if (primaryEmail) usersMap.set(primaryEmail, data);
			if (Array.isArray(data.emails)) {
				data.emails.forEach(em => {
					if (em) usersMap.set(em.toLowerCase(), data);
				});
			}
		});

		// 1. Populate Courses
		const batchCourseSelect = document.getElementById('batch-course-select');
		const singleCourseSelect = document.getElementById('cert-course');

		coursesSnap.docs.forEach(doc => {
			const data = doc.data() || {};
			coursesMap.set(doc.id, data);
			const label = `${data.code ? `[${data.code}] ` : ''}${data.title || data.name || doc.id}`;

			if (batchCourseSelect) {
				const opt1 = document.createElement('option');
				opt1.value = doc.id;
				opt1.textContent = label;
				batchCourseSelect.appendChild(opt1);
			}

			if (singleCourseSelect) {
				const opt2 = document.createElement('option');
				opt2.value = doc.id;
				opt2.textContent = label;
				singleCourseSelect.appendChild(opt2);
			}
		});

		// 2. Populate Cohorts
		const batchCohortSelect = document.getElementById('batch-cohort-select');
		const singleCohortSelect = document.getElementById('cert-cohort');

		cohortsSnap.docs.forEach(doc => {
			const data = doc.data() || {};
			cohortsMap.set(doc.id, data);

			const cName = data.name || data.title || data.cohortName || data.cohortTitle || doc.id;
			const cCode = data.code ? `[${data.code}] ` : '';
			const cCourse = data.courseTitle ? ` — ${data.courseTitle}` : '';
			const label = `${cCode}${cName}${cCourse}`;

			if (batchCohortSelect) {
				const opt1 = document.createElement('option');
				opt1.value = doc.id;
				opt1.textContent = label;
				batchCohortSelect.appendChild(opt1);
			}

			if (singleCohortSelect) {
				const opt2 = document.createElement('option');
				opt2.value = doc.id;
				opt2.textContent = label;
				singleCohortSelect.appendChild(opt2);
			}
		});
	} catch (err) {
		console.warn('Could not load select data:', err);
	}
}

// =========================================================================
// 3. BATCH COHORT LOGIC
// =========================================================================
function initBatchEventListeners() {
	const cohortSelect = document.getElementById('batch-cohort-select');
	if (cohortSelect) {
		cohortSelect.addEventListener('change', (e) => {
			handleBatchCohortChange(e.target.value);
		});
	}

	// Auto Sync Date when Global Date changes
	const globalDateInput = document.getElementById('batch-global-date');
	if (globalDateInput) {
		globalDateInput.addEventListener('input', (e) => {
			syncGlobalDateToAll(e.target.value);
		});
		globalDateInput.addEventListener('change', (e) => {
			syncGlobalDateToAll(e.target.value);
		});
	}

	const btnSyncDateNow = document.getElementById('btn-sync-date-now');
	if (btnSyncDateNow) {
		btnSyncDateNow.addEventListener('click', () => {
			const curDate = document.getElementById('batch-global-date').value;
			if (curDate) {
				syncGlobalDateToAll(curDate);
				notify(`⚡ Đã đồng bộ ngày "${curDate}" vào tất cả chứng chỉ!`, 'info');
			}
		});
	}

	// Copy all filenames at once for batch export / file preparation
	const btnCopyAll = document.getElementById('btn-copy-all-filenames');
	if (btnCopyAll) {
		btnCopyAll.addEventListener('click', () => {
			if (batchStudents.length === 0) {
				notify('⚠️ Danh sách học viên đang trống!', 'error');
				return;
			}
			const cohortId = document.getElementById('batch-cohort-select')?.value || '';
			const fileNames = batchStudents.map(s => {
				return (s.imageUrl || buildCertificateFileName(cohortId, s.name)).trim();
			}).filter(Boolean);

			if (fileNames.length === 0) {
				notify('⚠️ Chưa có tên file ảnh nào trong danh sách!', 'error');
				return;
			}
			copyToClipboard(fileNames.join('\n'), `📋 Đã copy toàn bộ ${fileNames.length} tên file ảnh!`);
		});
	}

	// Add Student Row
	const btnAddStudent = document.getElementById('btn-add-student-row');
	if (btnAddStudent) {
		btnAddStudent.addEventListener('click', () => {
			addNewStudentRow();
		});
	}

	// Reload from Cohort
	const btnReload = document.getElementById('btn-reload-cohort-students');
	if (btnReload) {
		btnReload.addEventListener('click', () => {
			const cohortId = document.getElementById('batch-cohort-select').value;
			if (!cohortId) {
				notify('⚠️ Vui lòng chọn Lớp Học trước!', 'error');
				return;
			}
			handleBatchCohortChange(cohortId);
			notify('↺ Đã tải lại danh sách học viên từ Lớp!', 'info');
		});
	}

	// Quick Paste Panel Toggles
	const btnTogglePaste = document.getElementById('btn-toggle-quick-paste');
	const btnClosePaste = document.getElementById('btn-close-quick-paste');
	const pastePanel = document.getElementById('quick-paste-panel');
	const btnApplyPaste = document.getElementById('btn-apply-quick-paste');

	if (btnTogglePaste && pastePanel) {
		btnTogglePaste.addEventListener('click', () => {
			pastePanel.style.display = pastePanel.style.display === 'none' ? 'block' : 'none';
		});
	}
	if (btnClosePaste && pastePanel) {
		btnClosePaste.addEventListener('click', () => {
			pastePanel.style.display = 'none';
		});
	}
	if (btnApplyPaste) {
		btnApplyPaste.addEventListener('click', applyQuickPaste);
	}

	// Form Submit (Batch)
	const batchForm = document.getElementById('batch-cert-form');
	if (batchForm) {
		batchForm.addEventListener('submit', handleBatchFormSubmit);
	}

	// Table Delegated Events (Name, Email, Image, Project, Delete, Regen UUID, Copy file name)
	const tbody = document.getElementById('batch-students-tbody');
	if (tbody) {
		tbody.addEventListener('input', (e) => {
			const target = e.target;
			const idx = parseInt(target.getAttribute('data-idx'), 10);
			if (isNaN(idx) || !batchStudents[idx]) return;

			if (target.classList.contains('batch-input-name')) {
				batchStudents[idx].name = target.value;
				if (!batchStudents[idx].isCustomImage) {
					const cohortId = document.getElementById('batch-cohort-select')?.value || '';
					const suggested = buildCertificateFileName(cohortId, target.value);
					batchStudents[idx].imageUrl = suggested;
					const row = target.closest('tr');
					const imgInput = row?.querySelector('.batch-input-image');
					if (imgInput) {
						imgInput.value = suggested;
						updateRowImagePreview(imgInput, suggested);
					}
				}
			} else if (target.classList.contains('batch-input-email')) {
				batchStudents[idx].email = target.value;
			} else if (target.classList.contains('batch-input-image')) {
				batchStudents[idx].imageUrl = target.value;
				batchStudents[idx].isCustomImage = Boolean(target.value.trim());
				updateRowImagePreview(target, target.value);
			} else if (target.classList.contains('batch-input-project')) {
				batchStudents[idx].project = target.value;
			}
		});

		tbody.addEventListener('click', (e) => {
			const target = e.target.closest('button');
			if (!target) return;
			const idx = parseInt(target.getAttribute('data-idx'), 10);
			if (isNaN(idx) || !batchStudents[idx]) return;

			if (target.classList.contains('batch-btn-delete')) {
				batchStudents.splice(idx, 1);
				renderBatchTable();
			} else if (target.classList.contains('btn-regen-row-uuid')) {
				const newUuid = generateUUID();
				batchStudents[idx].uuid = newUuid;
				renderBatchTable();
				notify('🔄 Đã cấp lại mã UUID mới cho học viên!', 'info');
			} else if (target.classList.contains('btn-copy-row-imgname')) {
				const s = batchStudents[idx];
				const cohortId = document.getElementById('batch-cohort-select')?.value || '';
				const nameToCopy = (s.imageUrl || buildCertificateFileName(cohortId, s.name)).trim();
				if (nameToCopy) {
					copyToClipboard(nameToCopy, `📋 Đã copy tên file: ${nameToCopy}`);
				} else {
					notify('⚠️ Chưa có tên file ảnh để copy!', 'error');
				}
			}
		});
	}
}

function updateRowImagePreview(inputEl, url) {
	const container = inputEl.parentElement;
	let previewWrap = container.querySelector('.row-img-preview-wrap');
	const cleanUrl = resolvePreviewUrl(url);

	if (!previewWrap) {
		previewWrap = document.createElement('div');
		previewWrap.className = 'row-img-preview-wrap';
		previewWrap.style.flexShrink = '0';
		container.appendChild(previewWrap);
	}

	if (cleanUrl) {
		previewWrap.innerHTML = `
			<a href="${esc(cleanUrl)}" target="_blank" title="Xem trước ảnh">
				<img src="${esc(cleanUrl)}" class="cert-thumb-preview" onerror="this.parentElement.style.display='none'">
			</a>
		`;
		previewWrap.style.display = 'inline-block';
	} else {
		previewWrap.innerHTML = '';
		previewWrap.style.display = 'none';
	}
}

function handleBatchCohortChange(cohortId) {
	const selectedCohort = cohortsMap.get(cohortId);
	if (!selectedCohort) {
		batchStudents = [];
		renderBatchTable();
		return;
	}

	// 1. Auto-select course if cohort belongs to a course
	if (selectedCohort.courseId) {
		const courseSelect = document.getElementById('batch-course-select');
		if (courseSelect) courseSelect.value = selectedCohort.courseId;
	}

	// 2. Auto-fill issue date with cohort's endDate or today
	const globalDateInput = document.getElementById('batch-global-date');
	const defaultDate = selectedCohort.endDate || new Date().toISOString().slice(0, 10);
	if (globalDateInput) {
		globalDateInput.value = defaultDate;
	}

	// 3. Load students from cohort.studentEmails and auto-suggest image filenames
	batchStudents = [];
	const studentEmails = Array.isArray(selectedCohort.studentEmails) ? selectedCohort.studentEmails : [];

	studentEmails.forEach(rawEmail => {
		const cleanEmail = (rawEmail || '').trim().toLowerCase();
		if (!cleanEmail) return;

		// Resolve display name from usersMap if available
		let studentName = '';
		const matchedUser = usersMap.get(cleanEmail);
		if (matchedUser && (matchedUser.displayName || matchedUser.name)) {
			studentName = matchedUser.displayName || matchedUser.name;
		}

		if (!studentName) {
			// fallback: capitalize email username
			const prefix = cleanEmail.split('@')[0];
			studentName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
		}

		const suggestedFileName = buildCertificateFileName(cohortId, studentName);

		batchStudents.push({
			uuid: generateUUID(),
			name: studentName,
			email: cleanEmail,
			imageUrl: suggestedFileName,
			isCustomImage: false,
			project: ''
		});
	});

	renderBatchTable();
}

function syncGlobalDateToAll(newDate) {
	// Date sync is maintained via global variable upon submission;
	// Inform user via subtle indicator
	const summaryEl = document.getElementById('batch-summary-text');
	if (summaryEl && batchStudents.length > 0) {
		summaryEl.textContent = `Sẵn sàng phát hành ${batchStudents.length} chứng chỉ với ngày cấp ${newDate}.`;
	}
}

function addNewStudentRow() {
	const cohortId = document.getElementById('batch-cohort-select')?.value || '';
	const newStudent = {
		uuid: generateUUID(),
		name: '',
		email: '',
		imageUrl: '',
		isCustomImage: false,
		project: ''
	};
	batchStudents.push(newStudent);
	renderBatchTable();

	// Focus name input of the last row
	setTimeout(() => {
		const inputs = document.querySelectorAll('.batch-input-name');
		if (inputs.length > 0) inputs[inputs.length - 1].focus();
	}, 50);
}

function renderBatchTable() {
	const tbody = document.getElementById('batch-students-tbody');
	const badge = document.getElementById('batch-student-count-badge');
	const summaryEl = document.getElementById('batch-summary-text');
	const cohortId = document.getElementById('batch-cohort-select')?.value || '';

	if (!tbody) return;

	if (badge) {
		badge.textContent = `${batchStudents.length} học viên`;
	}

	if (batchStudents.length === 0) {
		tbody.innerHTML = `
			<tr>
				<td colspan="7" class="text-center py-4 text-muted">
					Chưa có học viên nào trong danh sách. Vui lòng chọn <strong>Lớp Học</strong> hoặc bấm <strong>+ Thêm Học Viên</strong>.
				</td>
			</tr>
		`;
		if (summaryEl) summaryEl.textContent = 'Chưa có học viên nào được chọn.';
		return;
	}

	const globalDate = document.getElementById('batch-global-date')?.value || 'hôm nay';
	if (summaryEl) {
		summaryEl.innerHTML = `Tổng cộng <strong>${batchStudents.length}</strong> chứng chỉ sẽ được cấp vào ngày <strong>${esc(globalDate)}</strong>.`;
	}

	tbody.innerHTML = batchStudents.map((s, idx) => {
		const suggestedPlaceholder = buildCertificateFileName(cohortId, s.name) || 'VD: xonxao_lyhaianh';
		const previewUrl = resolvePreviewUrl(s.imageUrl);
		const previewHtml = previewUrl ? `
			<div class="row-img-preview-wrap" style="flex-shrink: 0;">
				<a href="${esc(previewUrl)}" target="_blank" title="Xem trước ảnh">
					<img src="${esc(previewUrl)}" class="cert-thumb-preview" onerror="this.parentElement.style.display='none'">
				</a>
			</div>
		` : `<div class="row-img-preview-wrap" style="flex-shrink: 0; display: none;"></div>`;

		return `
			<tr>
				<td style="text-align: center; color: var(--main-colors-foreground-f700); font-weight: 500;">
					${idx + 1}
				</td>
				<td>
					<div class="d-flex align-items-center gap-1">
						<span class="batch-uuid-badge" title="Mã UUID định danh: ${esc(s.uuid)}">${esc(s.uuid.substring(0, 13))}...</span>
						<button type="button" class="btn-icon-action btn-regen-row-uuid" data-idx="${idx}" title="Tạo lại mã UUID mới cho bạn này" style="color: var(--main-colors-foreground-f600); width: 22px; height: 22px; font-size: 11px;">🔄</button>
					</div>
				</td>
				<td>
					<input type="text" class="batch-table-input batch-input-name" data-idx="${idx}" value="${esc(s.name)}" placeholder="VD: Nguyễn Văn A" required>
				</td>
				<td>
					<input type="email" class="batch-table-input batch-input-email" data-idx="${idx}" value="${esc(s.email)}" placeholder="student@gmail.com" required>
				</td>
				<td>
					<div class="d-flex align-items-center gap-1">
						<input type="text" class="batch-table-input batch-input-image" data-idx="${idx}" value="${esc(s.imageUrl || '')}" placeholder="${esc(suggestedPlaceholder)}">
						<button type="button" class="btn-icon-action btn-copy-row-imgname" data-idx="${idx}" title="Copy tên file để tạo file ảnh trong thư mục certificate" style="width: 26px; height: 26px; font-size: 12px; flex-shrink: 0;">📋</button>
						${previewHtml}
					</div>
				</td>
				<td>
					<input type="text" class="batch-table-input batch-input-project" data-idx="${idx}" value="${esc(s.project || '')}" placeholder="Dán tên đồ án tốt nghiệp...">
				</td>
				<td style="text-align: center;">
					<button type="button" class="btn-icon-action delete batch-btn-delete" data-idx="${idx}" title="Xóa học viên khỏi đợt cấp">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
					</button>
				</td>
			</tr>
		`;
	}).join('');
}

function applyQuickPaste() {
	const textarea = document.getElementById('quick-paste-textarea');
	if (!textarea) return;
	const text = textarea.value.trim();
	if (!text) {
		notify('⚠️ Vui lòng dán danh sách dữ liệu trước!', 'error');
		return;
	}

	const cohortId = document.getElementById('batch-cohort-select')?.value || '';
	const lines = text.split('\n');
	let addedCount = 0;

	lines.forEach(line => {
		const trimmed = line.trim();
		if (!trimmed) return;

		// Split by tab, pipe, or comma
		let parts = trimmed.split(/\t|\|/).map(p => p.trim());
		if (parts.length === 1 && trimmed.includes(',')) {
			parts = trimmed.split(',').map(p => p.trim());
		}

		let email = '';
		let name = '';
		let imageUrl = '';
		let project = '';

		// Detect email
		const emailIdx = parts.findIndex(p => p.includes('@'));
		if (emailIdx !== -1) {
			email = parts[emailIdx].toLowerCase();
			parts.splice(emailIdx, 1);
		}

		if (!email) return;

		// Detect imageUrl if starts with http or asset or looks like filename
		const imgIdx = parts.findIndex(p => /^https?:\/\//i.test(p) || p.startsWith('asset/') || /\.(webp|png|jpe?g)$/i.test(p));
		if (imgIdx !== -1) {
			imageUrl = parts[imgIdx];
			parts.splice(imgIdx, 1);
		}

		// First remaining is name, second is project
		if (parts.length > 0) name = parts[0];
		if (parts.length > 1) project = parts.slice(1).join(' ');

		if (!name) {
			const matchedUser = usersMap.get(email);
			name = matchedUser?.displayName || email.split('@')[0];
		}

		let isCustomImage = false;
		if (imageUrl) {
			isCustomImage = true;
		} else {
			imageUrl = buildCertificateFileName(cohortId, name);
		}

		batchStudents.push({
			uuid: generateUUID(),
			name,
			email,
			imageUrl,
			isCustomImage,
			project
		});
		addedCount++;
	});

	renderBatchTable();
	textarea.value = '';
	document.getElementById('quick-paste-panel').style.display = 'none';
	notify(`✅ Đã nạp thêm ${addedCount} học viên vào danh sách!`, 'success');
}

async function handleBatchFormSubmit(e) {
	e.preventDefault();

	const cohortId = document.getElementById('batch-cohort-select').value;
	const courseId = document.getElementById('batch-course-select').value;
	const globalDate = document.getElementById('batch-global-date').value;
	const btnSubmit = document.getElementById('btn-save-batch-certs');

	const selectedCohort = cohortsMap.get(cohortId);
	const selectedCourse = coursesMap.get(courseId);

	if (!cohortId || !courseId) {
		notify('⚠️ Vui lòng chọn Lớp Học và Khóa Học!', 'error');
		return;
	}

	if (!globalDate) {
		notify('⚠️ Vui lòng chọn Ngày Cấp Chứng Chỉ!', 'error');
		return;
	}

	if (batchStudents.length === 0) {
		notify('⚠️ Danh sách học viên đang trống!', 'error');
		return;
	}

	// Validate required fields in rows
	for (let i = 0; i < batchStudents.length; i++) {
		const s = batchStudents[i];
		if (!s.name.trim() || !s.email.trim()) {
			notify(`⚠️ Vui lòng điền đầy đủ Họ Tên và Email cho học viên dòng #${i + 1}`, 'error');
			return;
		}
	}

	const cohortName = selectedCohort ? (selectedCohort.name || selectedCohort.title || selectedCohort.code || cohortId) : cohortId;
	const courseTitle = selectedCourse ? (selectedCourse.title || selectedCourse.name || courseId) : courseId;

	const confirmed = confirm(
		`🎓 XÁC NHẬN CẤP CHỨNG CHỈ HÀNG LOẠT:\n\n` +
		`• Lớp học: ${cohortName}\n` +
		`• Khóa học: ${courseTitle}\n` +
		`• Số lượng chứng chỉ: ${batchStudents.length} học viên\n` +
		`• Ngày cấp (áp dụng chung): ${globalDate}\n\n` +
		`Hệ thống sẽ tự động phát hành mã UUID v4 riêng biệt và lưu trữ lên hệ thống bảo toàn liên kết tra cứu. Tiến hành phát hành?`
	);
	if (!confirmed) return;

	btnSubmit.disabled = true;
	btnSubmit.textContent = `⏳ Đang phát hành ${batchStudents.length} chứng chỉ...`;

	try {
		const BATCH_SIZE = 400;
		const newEmailsForCohort = [];

		for (let i = 0; i < batchStudents.length; i += BATCH_SIZE) {
			const chunk = batchStudents.slice(i, i + BATCH_SIZE);
			const batch = currentDb.batch();

			chunk.forEach(s => {
				const uuid = s.uuid;
				const cleanEmail = s.email.trim().toLowerCase();
				const cleanName = s.name.trim();
				newEmailsForCohort.push(cleanEmail);

				const imgRes = resolveCertificateImageForSave(s.imageUrl || buildCertificateFileName(cohortId, cleanName));

				const docRef = currentDb.collection('certificates').doc(uuid);
				const payload = {
					id: uuid,
					certificateId: uuid,
					uuid: uuid,
					recipientName: cleanName,
					studentName: cleanName,
					name: cleanName,
					recipientEmail: cleanEmail,
					studentEmail: cleanEmail,
					email: cleanEmail,
					courseId,
					courseCode: selectedCourse?.code || '',
					courseTitle: courseTitle,
					cohortId: cohortId,
					cohortCode: selectedCohort?.code || '',
					cohortName: cohortName,
					cohortTitle: selectedCohort?.title || cohortName,
					issueDate: globalDate,
					graduationDate: globalDate,
					finalProject: (s.project || '').trim(),
					certificateImageUrl: imgRes.imageUrl,
					certificateImgName: imgRes.imgName,
					status: 'active',
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
					issuedBy: currentUser?.email || 'admin'
				};

				batch.set(docRef, payload, { merge: true });
			});

			await batch.commit();
		}

		// Also update cohort's studentEmails in Firestore if needed
		if (cohortId && newEmailsForCohort.length > 0) {
			try {
				await currentDb.collection('cohorts').doc(cohortId).set({
					studentEmails: firebase.firestore.FieldValue.arrayUnion(...newEmailsForCohort),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				}, { merge: true });
			} catch (chErr) {
				console.warn('Could not update cohort studentEmails:', chErr);
			}
		}

		notify(`🎉 Đã cấp thành công ${batchStudents.length} chứng chỉ cho lớp "${cohortName}"!`, 'success');
		setTimeout(() => {
			window.location.href = 'index.html';
		}, 1200);
	} catch (err) {
		console.error('[handleBatchFormSubmit] Error:', err);
		notify(`❌ Lỗi cấp chứng chỉ: ${err.message}`, 'error');
		btnSubmit.disabled = false;
		btnSubmit.textContent = '🎓 Phát Hành Toàn Bộ Chứng Chỉ Lớp';
	}
}

// =========================================================================
// 4. SINGLE LEARNER LOGIC
// =========================================================================
function regenSingleUUID() {
	const u = generateUUID();
	const uuidInput = document.getElementById('cert-uuid');
	if (uuidInput) uuidInput.value = u;
	const previewEl = document.getElementById('cert-preview-link');
	if (previewEl) {
		previewEl.textContent = `https://uxcamp.vn/certificate/individual.html?id=${u}`;
	}
}

function initSingleEventListeners() {
	const btnRegen = document.getElementById('btn-regen-uuid');
	if (btnRegen) {
		btnRegen.onclick = regenSingleUUID;
	}

	const nameInput = document.getElementById('cert-student-name');
	const cohortSelect = document.getElementById('cert-cohort');
	const imgUrlInput = document.getElementById('cert-image-url');
	const btnCopySingle = document.getElementById('btn-copy-single-filename');

	function updateSingleSuggestedImg() {
		if (isSingleCustomImage) return;
		const sName = nameInput ? nameInput.value.trim() : '';
		const cId = cohortSelect ? cohortSelect.value : '';
		const suggested = buildCertificateFileName(cId, sName);
		if (imgUrlInput) {
			imgUrlInput.value = suggested;
			updateSingleImagePreview(suggested);
		}
	}

	function updateSingleImagePreview(url) {
		const previewBox = document.getElementById('single-cert-img-preview-box');
		const previewImg = document.getElementById('single-cert-img-preview');
		const previewLink = document.getElementById('single-cert-img-link');
		const resolved = resolvePreviewUrl(url);

		if (resolved && previewBox && previewImg) {
			previewImg.src = resolved;
			if (previewLink) previewLink.href = resolved;
			previewBox.style.display = 'block';
			previewImg.onerror = () => { previewBox.style.display = 'none'; };
		} else if (previewBox) {
			previewBox.style.display = 'none';
		}
	}

	if (nameInput) {
		nameInput.addEventListener('input', updateSingleSuggestedImg);
	}
	if (cohortSelect) {
		cohortSelect.addEventListener('change', updateSingleSuggestedImg);
	}

	if (imgUrlInput) {
		imgUrlInput.addEventListener('input', () => {
			isSingleCustomImage = Boolean(imgUrlInput.value.trim());
			updateSingleImagePreview(imgUrlInput.value.trim());
		});
	}

	if (btnCopySingle) {
		btnCopySingle.addEventListener('click', () => {
			const sName = nameInput ? nameInput.value.trim() : '';
			const cId = cohortSelect ? cohortSelect.value : '';
			const val = (imgUrlInput?.value || buildCertificateFileName(cId, sName)).trim();
			if (val) {
				copyToClipboard(val, `📋 Đã copy tên file: ${val}`);
			} else {
				notify('⚠️ Chưa có tên file ảnh để copy!', 'error');
			}
		});
	}

	const singleForm = document.getElementById('create-single-cert-form');
	if (singleForm) {
		singleForm.addEventListener('submit', handleSingleFormSubmit);
	}
}

async function handleSingleFormSubmit(e) {
	e.preventDefault();
	const studentName = document.getElementById('cert-student-name').value.trim();
	const studentEmail = document.getElementById('cert-student-email').value.trim().toLowerCase();
	const courseId = document.getElementById('cert-course').value;
	const cohortId = document.getElementById('cert-cohort').value;
	const date = document.getElementById('cert-date').value;
	const uuid = document.getElementById('cert-uuid').value.trim();
	const rawImageUrl = (document.getElementById('cert-image-url')?.value || '').trim();
	const project = document.getElementById('cert-project').value.trim();

	const selectedCourse = coursesMap.get(courseId);
	const selectedCohort = cohortsMap.get(cohortId);
	const btnSave = document.getElementById('btn-save-single-cert');

	btnSave.disabled = true;
	btnSave.textContent = 'Đang phát hành...';

	try {
		const cohortName = selectedCohort ? (selectedCohort.name || selectedCohort.title || selectedCohort.cohortName || '') : '';
		const courseTitle = selectedCourse ? (selectedCourse.title || selectedCourse.name || '') : '';

		const effectiveImgInput = rawImageUrl || buildCertificateFileName(cohortId, studentName);
		const imgRes = resolveCertificateImageForSave(effectiveImgInput);

		const payload = {
			id: uuid,
			certificateId: uuid,
			uuid: uuid,
			recipientName: studentName,
			studentName: studentName,
			name: studentName,
			recipientEmail: studentEmail,
			studentEmail: studentEmail,
			email: studentEmail,
			courseId,
			courseCode: selectedCourse?.code || '',
			courseTitle: courseTitle,
			cohortId: cohortId || '',
			cohortCode: selectedCohort?.code || '',
			cohortName: cohortName,
			cohortTitle: selectedCohort?.title || cohortName,
			issueDate: date,
			graduationDate: date,
			finalProject: project,
			certificateImageUrl: imgRes.imageUrl,
			certificateImgName: imgRes.imgName,
			status: 'active',
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
			issuedBy: currentUser?.email || 'admin'
		};

		await currentDb.collection('certificates').doc(uuid).set(payload, { merge: true });
		notify(`✅ Đã cấp chứng chỉ thành công cho "${studentName}"!`, 'success');
		setTimeout(() => {
			window.location.href = 'index.html';
		}, 1000);
	} catch (err) {
		console.error('[handleSingleFormSubmit] Error:', err);
		notify(`❌ Lỗi cấp chứng chỉ: ${err.message}`, 'error');
		btnSave.disabled = false;
		btnSave.textContent = '🎓 Phát Hành Chứng Chỉ';
	}
}

