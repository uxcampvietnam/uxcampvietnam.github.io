/**
 * =============================================================================
 * UXCAMP VIETNAM — ATTENDANCE MODULE CONTROLLER
 * =============================================================================
 * Điều khiển điểm danh lớp học linh hoạt theo từng buổi học thực tế.
 * Hỗ trợ điều hướng bàn phím cực nhanh theo phong cách Checklist tương tác:
 * - Mũi tên Lên / Xuống: Di chuyển giữa các học viên
 * - Mũi tên Phải: Đánh dấu Có mặt (Present)
 * - Mũi tên Trái: Đánh dấu Vắng (Absent)
 * - Phím M: Đánh dấu Muộn (Late)
 * =============================================================================
 */

window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-attendance'
};

(function () {
	'use strict';

	// State
	let currentDb = null;
	let allCohorts = [];
	let usersMap = new Map(); // email -> user data
	let currentCohortId = null;
	let currentCohortData = null;
	let attendanceData = null; // { cohortId, sessions: [...] }
	let activeSessionId = null;
	let studentsList = []; // Array of { email, name, avatar }
	let filteredStudents = [];
	let focusedStudentIndex = -1;
	let hasUnsavedChanges = false;
	let currentViewMode = 'matrix'; // 'matrix' (Luồng 2.1: Tổng hợp theo buổi) | 'session' (Luồng 2.2: Điểm danh buổi mới)

	// Helper format Date (YYYY-MM-DD)
	function getTodayDateString() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function formatDateDisplay(dateStr) {
		if (!dateStr) return '';
		const parts = dateStr.split('-');
		if (parts.length === 3) {
			return `${parts[2]}/${parts[1]}`;
		}
		return dateStr;
	}

	// =========================================================================
	// 1. INITIALIZATION & DATA LOADING
	// =========================================================================
	window.addEventListener('adminReady', async (e) => {
		currentDb = e.detail.db;
		await loadInitialData();
		initEventHandlers();
	});

	async function loadInitialData() {
		try {
			// Tải danh sách cohorts và users song song
			const [cohortsSnap, usersSnap, authUsersSnap] = await Promise.all([
				currentDb.collection('cohorts').get(),
				currentDb.collection('users').get().catch(() => ({ docs: [] })),
				currentDb.collection('authorizedUsers').get().catch(() => ({ docs: [] }))
			]);

			allCohorts = [];
			cohortsSnap.forEach(doc => {
				allCohorts.push({ id: doc.id, ...doc.data() });
			});

			// Sắp xếp cohort
			allCohorts.sort((a, b) => {
				const statusWeight = { 'in-progress': 1, 'in_progress': 1, 'open': 2, 'completed': 3 };
				const wA = statusWeight[a.status] || 9;
				const wB = statusWeight[b.status] || 9;
				if (wA !== wB) return wA - wB;
				return String(b.code || b.id).localeCompare(String(a.code || a.id), undefined, { numeric: true });
			});

			// Map users
			usersMap.clear();
			const registerUser = (data) => {
				const emails = [
					data.email,
					data.primaryEmail,
					...(Array.isArray(data.emails) ? data.emails : [])
				].filter(Boolean);

				const name = data.displayName || data.name || '';
				const avatar = data.photoUrl || data.photoURL || '';

				emails.forEach(em => {
					const clean = em.trim().toLowerCase();
					if (clean && !usersMap.has(clean)) {
						usersMap.set(clean, { name, avatar, email: clean });
					}
				});
			};

			usersSnap.docs.forEach(doc => registerUser(doc.data()));
			authUsersSnap.docs.forEach(doc => registerUser(doc.data()));

			// Điền danh sách cohort vào dropdown (Chỉ hiển thị các lớp đang học)
			populateCohortSelect();

			// Kiểm tra URL query param (?cohortId=...)
			const urlParams = new URLSearchParams(window.location.search);
			const requestedCohortId = urlParams.get('cohortId');

			const ongoingCohorts = getOngoingCohorts();

			if (requestedCohortId && allCohorts.some(c => c.id === requestedCohortId)) {
				const select = document.getElementById('select-cohort');
				if (select) select.value = requestedCohortId;
				await switchCohort(requestedCohortId);
			} else if (ongoingCohorts.length > 0) {
				// Mặc định chọn lớp đầu tiên đang học
				const defaultCohort = ongoingCohorts[0];
				const select = document.getElementById('select-cohort');
				if (select) select.value = defaultCohort.id;
				await switchCohort(defaultCohort.id);
			} else if (allCohorts.length > 0) {
				// Nếu không có lớp in-progress nào, chọn lớp đầu tiên
				const select = document.getElementById('select-cohort');
				if (select) select.value = allCohorts[0].id;
				await switchCohort(allCohorts[0].id);
			}

		} catch (err) {
			console.error('[Attendance] Lỗi tải dữ liệu ban đầu:', err);
			showAdminToast(`❌ Lỗi tải dữ liệu: ${err.message}`, 'error');
		}
	}

	function getOngoingCohorts() {
		const urlParams = new URLSearchParams(window.location.search);
		const requestedCohortId = urlParams.get('cohortId');

		return allCohorts.filter(c => {
			const isOngoing = c.status === 'in-progress' || c.status === 'in_progress';
			// Nếu URL có truyền đích danh cohortId thì giữ lại để admin xem được
			return isOngoing || (requestedCohortId && c.id === requestedCohortId);
		});
	}

	function populateCohortSelect() {
		const select = document.getElementById('select-cohort');
		if (!select) return;

		const ongoingCohorts = getOngoingCohorts();

		if (ongoingCohorts.length === 0) {
			select.innerHTML = '<option value="">-- Không có lớp học nào đang diễn ra --</option>';
			return;
		}

		select.innerHTML = '<option value="">-- Chọn Lớp Học (Đang Học) --</option>';

		ongoingCohorts.forEach(c => {
			const opt = document.createElement('option');
			opt.value = c.id;
			const codeText = c.code ? `[${c.code}] ` : '';
			const nameText = c.title || c.name || c.bootcamp_name || c.id;
			const isOngoing = c.status === 'in-progress' || c.status === 'in_progress';
			const statusText = isOngoing ? ' • Đang học' : (c.status ? ` • ${c.status}` : '');
			opt.textContent = `${codeText}${nameText}${statusText}`;
			select.appendChild(opt);
		});
	}

	// =========================================================================
	// 2. SWITCH COHORT & LOAD ATTENDANCE DATA
	// =========================================================================
	async function switchCohort(cohortId) {
		if (hasUnsavedChanges && currentCohortId && currentCohortId !== cohortId) {
			if (!confirm('Bạn có thay đổi điểm danh chưa lưu. Bạn có chắc muốn chuyển lớp khác mà không lưu không?')) {
				const select = document.getElementById('select-cohort');
				if (select) select.value = currentCohortId;
				return;
			}
		}
		hasUnsavedChanges = false;

		if (!cohortId) {
			currentCohortId = null;
			currentCohortData = null;
			document.getElementById('attendance-mode-nav').style.display = 'none';
			document.getElementById('matrix-view-card').style.display = 'none';
			document.getElementById('attendance-table-card').style.display = 'none';
			document.getElementById('sessions-nav-container').style.display = 'none';
			document.getElementById('session-date-container').style.display = 'none';
			document.getElementById('attendance-stats-bar').style.display = 'none';
			document.getElementById('keyboard-nav-guide').style.display = 'none';
			document.getElementById('attendance-matrix-wrapper').innerHTML = `
				<div class="empty-state p-5 text-center" style="color: var(--main-colors-foreground-f700);">
					Vui lòng chọn một lớp học để tải bảng điểm danh.
				</div>
			`;
			return;
		}

		currentCohortId = cohortId;
		currentCohortData = allCohorts.find(c => c.id === cohortId) || null;

		// Cập nhật URL không reload trang
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('cohortId', cohortId);
		window.history.replaceState({}, '', newUrl.toString());

		// Lấy danh sách học viên của lớp
		buildStudentsList();

		// Tải dữ liệu điểm danh từ Cohort Document (hoặc fallback cohort_attendance)
		try {
			updateSaveStatus('saving', 'Đang tải dữ liệu...');

			// 1. Ưu tiên đọc từ cohort document đã nạp sẵn (luôn có quyền truy cập)
			let sessions = Array.isArray(currentCohortData.attendanceSessions) 
				? currentCohortData.attendanceSessions 
				: (currentCohortData.attendance && Array.isArray(currentCohortData.attendance.sessions) ? currentCohortData.attendance.sessions : null);

			// 2. Nếu cohort document chưa có, thử truy vấn doc mới nhất từ Firestore
			if (!sessions) {
				try {
					const cDoc = await currentDb.collection('cohorts').doc(cohortId).get();
					if (cDoc.exists) {
						const cData = cDoc.data();
						if (Array.isArray(cData.attendanceSessions)) {
							sessions = cData.attendanceSessions;
						}
					}
				} catch (cErr) {
					console.warn('[Attendance] Không thể đọc cohorts doc:', cErr);
				}
			}

			// 3. Dự phòng thử đọc từ collection cohort_attendance (nếu rules cho phép)
			if (!sessions) {
				try {
					const docSnap = await currentDb.collection('cohort_attendance').doc(cohortId).get();
					if (docSnap.exists && Array.isArray(docSnap.data().sessions)) {
						sessions = docSnap.data().sessions;
					}
				} catch (rulesErr) {
					console.info('[Attendance] Collection cohort_attendance chưa cấu hình rules, sử dụng lưu trữ trong cohorts document.');
				}
			}

			attendanceData = {
				cohortId: cohortId,
				sessions: sessions || []
			};

			// Nếu lớp chưa có buổi học nào, tự động tạo Buổi 1 hôm nay
			if (attendanceData.sessions.length === 0) {
				const newSess = {
					id: `sess_${Date.now()}`,
					number: 1,
					date: getTodayDateString(),
					records: {}
				};
				attendanceData.sessions.push(newSess);
				activeSessionId = newSess.id;
				await saveAttendanceToFirestore(true);
			} else {
				// Mặc định chọn buổi học gần nhất (buổi cuối)
				if (!activeSessionId || !attendanceData.sessions.some(s => s.id === activeSessionId)) {
					activeSessionId = attendanceData.sessions[attendanceData.sessions.length - 1].id;
				}
			}

			updateSaveStatus('saved', '✓ Đã đồng bộ');

			// Hiển thị thanh chọn chế độ (Mode Nav)
			const modeNav = document.getElementById('attendance-mode-nav');
			if (modeNav) modeNav.style.display = 'flex';

			// Cập nhật số buổi lên tab badge
			updateModeBadges();

			// Kích hoạt chế độ xem hiện tại
			switchViewMode(currentViewMode);

		} catch (err) {
			console.error('[Attendance] Lỗi tải điểm danh lớp:', err);
			showAdminToast(`❌ Lỗi tải điểm danh: ${err.message}`, 'error');
			updateSaveStatus('saved', 'Lỗi đồng bộ');
		}
	}

	function buildStudentsList() {
		studentsList = [];
		if (!currentCohortData) return;

		const rawEmails = Array.isArray(currentCohortData.studentEmails) ? currentCohortData.studentEmails : [];

		rawEmails.forEach(raw => {
			const clean = (raw || '').trim().toLowerCase();
			if (!clean) return;

			let name = '';
			let avatar = '';

			if (usersMap.has(clean)) {
				const u = usersMap.get(clean);
				name = u.name;
				avatar = u.avatar;
			}

			if (!name) {
				// Fallback từ phần trước @ của email
				const prefix = clean.split('@')[0];
				name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
			}

			studentsList.push({
				email: clean,
				name: name,
				avatar: avatar
			});
		});

		// Sắp xếp danh sách học viên theo tên A-Z
		studentsList.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
		filteredStudents = [...studentsList];
	}

	// =========================================================================
	// 2.1 MODE SWITCHER & MATRIX VIEW (LUỒNG 2.1)
	// =========================================================================
	function updateModeBadges() {
		const totalSessions = (attendanceData && Array.isArray(attendanceData.sessions)) ? attendanceData.sessions.length : 0;
		const matrixBadge = document.getElementById('badge-matrix-total-sessions');
		if (matrixBadge) {
			matrixBadge.textContent = `${totalSessions} buổi`;
		}

		const activeSess = getActiveSession();
		const sessionBadge = document.getElementById('badge-session-active-num');
		if (sessionBadge) {
			sessionBadge.textContent = activeSess ? `Buổi ${activeSess.number}` : 'Buổi mới';
		}
	}

	function switchViewMode(mode) {
		currentViewMode = mode;

		const btnMatrix = document.getElementById('btn-mode-matrix');
		const btnSession = document.getElementById('btn-mode-session');
		if (btnMatrix) btnMatrix.classList.toggle('active', mode === 'matrix');
		if (btnSession) btnSession.classList.toggle('active', mode === 'session');

		const matrixCard = document.getElementById('matrix-view-card');
		const sessionCard = document.getElementById('attendance-table-card');
		const sessionNav = document.getElementById('sessions-nav-container');
		const sessionDate = document.getElementById('session-date-container');
		const statsBar = document.getElementById('attendance-stats-bar');
		const keyboardGuide = document.getElementById('keyboard-nav-guide');

		updateModeBadges();

		if (mode === 'matrix') {
			if (matrixCard) matrixCard.style.display = 'block';
			if (sessionCard) sessionCard.style.display = 'none';
			if (sessionNav) sessionNav.style.display = 'none';
			if (sessionDate) sessionDate.style.display = 'none';
			if (statsBar) statsBar.style.display = 'none';
			if (keyboardGuide) keyboardGuide.style.display = 'none';

			renderMatrixTable();
		} else {
			if (matrixCard) matrixCard.style.display = 'none';
			if (sessionCard) sessionCard.style.display = 'block';
			if (sessionNav) sessionNav.style.display = 'flex';
			if (sessionDate) sessionDate.style.display = 'flex';
			if (statsBar) statsBar.style.display = 'grid';
			if (keyboardGuide) keyboardGuide.style.display = 'flex';

			renderSessionTabs();
			renderAttendanceTable();
		}
	}

	function renderMatrixTable() {
		const wrapper = document.getElementById('attendance-matrix-wrapper');
		if (!wrapper) return;

		if (!attendanceData || !currentCohortId) {
			wrapper.innerHTML = `
				<div class="empty-state p-5 text-center" style="color: var(--main-colors-foreground-f700);">
					Vui lòng chọn một lớp học để tải bảng điểm danh.
				</div>
			`;
			return;
		}

		const sessions = attendanceData.sessions || [];
		const searchKeyword = (document.getElementById('matrix-search-input')?.value || '').trim().toLowerCase();

		const displayStudents = studentsList.filter(s => {
			if (!searchKeyword) return true;
			return s.name.toLowerCase().includes(searchKeyword) || s.email.toLowerCase().includes(searchKeyword);
		});

		if (studentsList.length === 0) {
			wrapper.innerHTML = `
				<div class="empty-state p-5 text-center">
					<div class="font-sans-caption fw-semibold mb-2" style="color: var(--main-colors-foreground-f200);">
						Lớp học này chưa có danh sách học viên!
					</div>
					<p class="font-sans-small mb-3" style="color: var(--main-colors-foreground-f700);">
						Bấm vào nút "👥 Học Viên Lớp" ở thanh trên cùng để thêm email học viên.
					</p>
					<button type="button" class="btn-admin btn-admin-primary btn-admin-sm" onclick="document.getElementById('btn-manage-students').click();">
						+ Thêm Học Viên Ngay
					</button>
				</div>
			`;
			return;
		}

		if (displayStudents.length === 0) {
			wrapper.innerHTML = `
				<div class="empty-state p-4 text-center" style="color: var(--main-colors-foreground-f700);">
					Không tìm thấy học viên nào khớp với từ khóa tìm kiếm.
				</div>
			`;
			return;
		}

		if (sessions.length === 0) {
			wrapper.innerHTML = `
				<div class="empty-state p-5 text-center">
					<div class="font-sans-caption fw-semibold mb-2" style="color: var(--main-colors-foreground-f200);">
						Lớp học chưa có buổi học nào!
					</div>
					<button type="button" class="btn-admin btn-admin-primary btn-admin-sm" id="btn-create-first-session">
						+ Tạo Buổi Học Đầu Tiên
					</button>
				</div>
			`;
			document.getElementById('btn-create-first-session')?.addEventListener('click', createNewSession);
			return;
		}

		// Header các cột buổi học
		const sessionHeadersHtml = sessions.map(sess => {
			const records = sess.records || {};
			let presentCount = 0;
			studentsList.forEach(st => {
				const stStatus = records[st.email];
				if (stStatus === 'present' || stStatus === 'late') presentCount++;
			});

			const dateStr = sess.date ? formatDateDisplay(sess.date) : 'Chưa đặt ngày';

			return `
				<th class="matrix-col-session" data-session-id="${sess.id}">
					<div class="matrix-session-header">
						<span class="session-title">
							Buổi ${sess.number}
							<button type="button" class="btn-jump-session" title="Điểm danh buổi ${sess.number} bằng phím bấm" data-jump-session="${sess.id}">⚡</button>
						</span>
						<span class="session-date">${adminEscapeHtml(dateStr)}</span>
						<span class="matrix-session-ratio" title="Số học viên tham gia / Sĩ số">${presentCount}/${studentsList.length}</span>
					</div>
				</th>
			`;
		}).join('');

		// Các hàng học viên
		const rowsHtml = displayStudents.map((st, idx) => {
			const initialChar = (st.name || st.email).charAt(0).toUpperCase();
			let attendedCount = 0;

			const sessionCellsHtml = sessions.map(sess => {
				const records = sess.records || {};
				const status = records[st.email] || 'unmarked';

				if (status === 'present' || status === 'late') {
					attendedCount++;
				}

				let badgeHtml = '';
				if (status === 'present') {
					badgeHtml = '<span class="matrix-badge present">✓ Có</span>';
				} else if (status === 'late') {
					badgeHtml = '<span class="matrix-badge late">⏰ Muộn</span>';
				} else if (status === 'absent') {
					badgeHtml = '<span class="matrix-badge absent">✗ Vắng</span>';
				} else {
					badgeHtml = '<span class="matrix-badge unmarked">—</span>';
				}

				return `
					<td class="matrix-col-session matrix-cell-record" 
						data-email="${adminEscapeHtml(st.email)}" 
						data-session-id="${sess.id}"
						title="${adminEscapeHtml(st.name)} - Buổi ${sess.number}: Click để đổi trạng thái">
						${badgeHtml}
					</td>
				`;
			}).join('');

			const totalSessions = sessions.length;
			const ratePercent = totalSessions > 0 ? Math.round((attendedCount / totalSessions) * 100) : 0;
			const rateClass = ratePercent >= 80 ? 'good' : (ratePercent >= 50 ? 'warning' : 'danger');

			return `
				<tr data-student-email="${adminEscapeHtml(st.email)}">
					<td class="matrix-col-stt">${idx + 1}</td>
					<td class="matrix-col-student">
						<div class="matrix-student-info">
							${st.avatar
								? `<img src="${adminEscapeHtml(st.avatar)}" alt="" class="student-avatar">`
								: `<div class="student-avatar">${initialChar}</div>`
							}
							<div>
								<div class="student-name" title="${adminEscapeHtml(st.name)}">${adminEscapeHtml(st.name)}</div>
								<div class="student-email" title="${adminEscapeHtml(st.email)}">${adminEscapeHtml(st.email)}</div>
							</div>
						</div>
					</td>
					${sessionCellsHtml}
					<td class="matrix-col-summary">
						<div class="attendance-rate-pill">
							<span class="attendance-rate-fraction">${attendedCount}/${totalSessions}</span>
							<span class="attendance-rate-percent ${rateClass}">${ratePercent}%</span>
						</div>
					</td>
				</tr>
			`;
		}).join('');

		wrapper.innerHTML = `
			<table class="attendance-matrix-table">
				<thead>
					<tr>
						<th class="matrix-col-stt">#</th>
						<th class="matrix-col-student">Học Viên (${displayStudents.length})</th>
						${sessionHeadersHtml}
						<th class="matrix-col-summary">Chuyên Cần</th>
					</tr>
				</thead>
				<tbody>
					${rowsHtml}
				</tbody>
			</table>
		`;

		// Sự kiện click ô cell để xoay vòng trạng thái trực tiếp
		wrapper.querySelectorAll('.matrix-cell-record').forEach(cell => {
			cell.addEventListener('click', () => {
				const email = cell.getAttribute('data-email');
				const sessionId = cell.getAttribute('data-session-id');
				quickCycleMatrixCell(email, sessionId, cell);
			});
		});

		// Sự kiện nhảy sang điểm danh buổi
		wrapper.querySelectorAll('.btn-jump-session').forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				const sessId = btn.getAttribute('data-jump-session');
				jumpToSession(sessId);
			});
		});
	}

	async function quickCycleMatrixCell(email, sessionId, cellEl) {
		if (!attendanceData) return;
		const session = attendanceData.sessions.find(s => s.id === sessionId);
		if (!session) return;

		if (!session.records) session.records = {};
		const currentStatus = session.records[email] || 'unmarked';

		const currIdx = STATUS_CYCLE.indexOf(currentStatus);
		const validIdx = currIdx === -1 ? 3 : currIdx;
		const nextIdx = (validIdx + 1) % STATUS_CYCLE.length;
		const nextStatus = STATUS_CYCLE[nextIdx];

		if (nextStatus === 'unmarked') {
			delete session.records[email];
		} else {
			session.records[email] = nextStatus;
		}

		// Cập nhật DOM ô cell ngay lập tức
		let badgeHtml = '';
		if (nextStatus === 'present') {
			badgeHtml = '<span class="matrix-badge present">✓ Có</span>';
		} else if (nextStatus === 'late') {
			badgeHtml = '<span class="matrix-badge late">⏰ Muộn</span>';
		} else if (nextStatus === 'absent') {
			badgeHtml = '<span class="matrix-badge absent">✗ Vắng</span>';
		} else {
			badgeHtml = '<span class="matrix-badge unmarked">—</span>';
		}
		cellEl.innerHTML = badgeHtml;

		// Cập nhật thống kê cột chuyên cần cho dòng này
		const tr = cellEl.closest('tr');
		if (tr) {
			let attendedCount = 0;
			attendanceData.sessions.forEach(s => {
				const st = (s.records && s.records[email]) || 'unmarked';
				if (st === 'present' || st === 'late') attendedCount++;
			});
			const totalSessions = attendanceData.sessions.length;
			const ratePercent = totalSessions > 0 ? Math.round((attendedCount / totalSessions) * 100) : 0;
			const rateClass = ratePercent >= 80 ? 'good' : (ratePercent >= 50 ? 'warning' : 'danger');

			const summaryCell = tr.querySelector('.matrix-col-summary');
			if (summaryCell) {
				summaryCell.innerHTML = `
					<div class="attendance-rate-pill">
						<span class="attendance-rate-fraction">${attendedCount}/${totalSessions}</span>
						<span class="attendance-rate-percent ${rateClass}">${ratePercent}%</span>
					</div>
				`;
			}
		}

		// Cập nhật tỉ lệ trên header cột của buổi đó
		const th = document.querySelector(`.matrix-col-session[data-session-id="${sessionId}"] .matrix-session-ratio`);
		if (th) {
			let presentCount = 0;
			studentsList.forEach(st => {
				const stStatus = session.records[st.email];
				if (stStatus === 'present' || stStatus === 'late') presentCount++;
			});
			th.textContent = `${presentCount}/${studentsList.length}`;
		}

		// Lưu Firestore chế độ ngầm (silent)
		await saveAttendanceToFirestore(true);
	}

	function jumpToSession(sessionId) {
		activeSessionId = sessionId;
		switchViewMode('session');
	}

	function exportMatrixCSV() {
		if (!attendanceData || !currentCohortData) {
			showAdminToast('⚠️ Không có dữ liệu để xuất file!', 'warning');
			return;
		}

		const sessions = attendanceData.sessions || [];
		const cohortName = currentCohortData.title || currentCohortData.name || currentCohortId;

		// Header CSV
		const headers = ['STT', 'Họ Tên', 'Email'];
		sessions.forEach(s => {
			const dateStr = s.date ? formatDateDisplay(s.date) : '';
			headers.push(`Buổi ${s.number}${dateStr ? ` (${dateStr})` : ''}`);
		});
		headers.push('Số Buổi Tham Gia', 'Tổng Số Buổi', 'Tỷ Lệ Chuyên Cần (%)');

		const rows = [headers];

		studentsList.forEach((st, idx) => {
			let attendedCount = 0;
			const rowData = [
				idx + 1,
				`"${(st.name || '').replace(/"/g, '""')}"`,
				`"${st.email}"`
			];

			sessions.forEach(s => {
				const stStatus = (s.records && s.records[st.email]) || 'unmarked';
				let label = 'Chưa điểm';
				if (stStatus === 'present') {
					label = 'Có mặt';
					attendedCount++;
				} else if (stStatus === 'late') {
					label = 'Đi muộn';
					attendedCount++;
				} else if (stStatus === 'absent') {
					label = 'Vắng mặt';
				}
				rowData.push(`"${label}"`);
			});

			const total = sessions.length;
			const pct = total > 0 ? Math.round((attendedCount / total) * 100) : 0;
			rowData.push(attendedCount, total, `${pct}%`);
			rows.push(rowData);
		});

		const csvContent = '\uFEFF' + rows.map(r => r.join(',')).join('\r\n');
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Diem_danh_${currentCohortData.code || currentCohortId}_${getTodayDateString()}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);

		showAdminToast('📥 Đã xuất báo cáo CSV thành công!', 'success');
	}

	// =========================================================================
	// 3. SESSIONS MANAGEMENT
	// =========================================================================
	function getActiveSession() {
		if (!attendanceData || !Array.isArray(attendanceData.sessions)) return null;
		return attendanceData.sessions.find(s => s.id === activeSessionId) || null;
	}

	function renderSessionTabs() {
		const container = document.getElementById('sessions-tabs-scroll');
		if (!container || !attendanceData) return;

		container.innerHTML = '';

		attendanceData.sessions.forEach((sess, idx) => {
			// Đảm bảo có số thứ tự
			sess.number = idx + 1;

			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = `session-tab-btn ${sess.id === activeSessionId ? 'active' : ''}`;
			btn.setAttribute('data-session-id', sess.id);

			const dateLabel = sess.date ? formatDateDisplay(sess.date) : '';

			btn.innerHTML = `
				<span>Buổi ${sess.number}</span>
				${dateLabel ? `<span class="session-tab-date">(${adminEscapeHtml(dateLabel)})</span>` : ''}
			`;

			btn.addEventListener('click', () => {
				activeSessionId = sess.id;
				renderSessionTabs();
				renderAttendanceTable();
			});

			container.appendChild(btn);
		});

		// Cập nhật input ngày của buổi học
		const activeSess = getActiveSession();
		const dateInput = document.getElementById('session-date-input');
		if (dateInput && activeSess) {
			dateInput.value = activeSess.date || '';
		}

		// Scroll tab active vào tầm mắt
		const activeBtn = container.querySelector('.session-tab-btn.active');
		if (activeBtn) {
			activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	}

	async function createNewSession(autoSwitchToSessionMode = false) {
		if (!attendanceData) return;

		const newNumber = attendanceData.sessions.length + 1;
		const newSession = {
			id: `sess_${Date.now()}`,
			number: newNumber,
			date: getTodayDateString(),
			records: {}
		};

		attendanceData.sessions.push(newSession);
		activeSessionId = newSession.id;

		updateModeBadges();
		if (autoSwitchToSessionMode || currentViewMode === 'session') {
			switchViewMode('session');
		} else {
			renderMatrixTable();
		}

		await saveAttendanceToFirestore();
		showAdminToast(`✅ Đã tạo Buổi ${newNumber}!`, 'success');
	}

	async function deleteCurrentSession() {
		const activeSess = getActiveSession();
		if (!activeSess) return;

		if (attendanceData.sessions.length <= 1) {
			showAdminToast('⚠️ Không thể xóa buổi học duy nhất!', 'warning');
			return;
		}

		if (!confirm(`Bạn có chắc chắn muốn xóa "Buổi ${activeSess.number}" và toàn bộ dữ liệu điểm danh của buổi này?`)) {
			return;
		}

		const index = attendanceData.sessions.findIndex(s => s.id === activeSessionId);
		if (index !== -1) {
			attendanceData.sessions.splice(index, 1);
			// Chọn buổi kế bên
			const nextIndex = Math.max(0, index - 1);
			activeSessionId = attendanceData.sessions[nextIndex]?.id || null;

			updateModeBadges();
			if (currentViewMode === 'matrix') {
				renderMatrixTable();
			} else {
				renderSessionTabs();
				renderAttendanceTable();
			}

			await saveAttendanceToFirestore();
			showAdminToast('✅ Đã xóa buổi học.', 'success');
		}
	}

	// =========================================================================
	// 4. ATTENDANCE TABLE & STATS RENDERING
	// =========================================================================
	function renderAttendanceTable() {
		const container = document.getElementById('attendance-table-container');
		const heading = document.getElementById('current-session-heading');
		const activeSess = getActiveSession();

		if (!container) return;

		if (!activeSess) {
			container.innerHTML = `
				<div class="empty-state p-5 text-center" style="color: var(--main-colors-foreground-f700);">
					Không tìm thấy buổi học nào. Nhấp "+ Thêm Buổi" để bắt đầu.
				</div>
			`;
			return;
		}

		if (heading) {
			heading.textContent = `Danh Sách Điểm Danh — Buổi ${activeSess.number} (${formatDateDisplay(activeSess.date)})`;
		}

		// Áp dụng bộ lọc tìm kiếm
		const searchKeyword = (document.getElementById('student-search-input')?.value || '').trim().toLowerCase();
		filteredStudents = studentsList.filter(s => {
			if (!searchKeyword) return true;
			return s.name.toLowerCase().includes(searchKeyword) || s.email.toLowerCase().includes(searchKeyword);
		});

		if (studentsList.length === 0) {
			container.innerHTML = `
				<div class="empty-state p-5 text-center">
					<div class="font-sans-caption fw-semibold mb-2" style="color: var(--main-colors-foreground-f200);">
						Lớp học này chưa có danh sách học viên!
					</div>
					<p class="font-sans-small mb-3" style="color: var(--main-colors-foreground-f700);">
						Bấm vào nút "👥 Học Viên Lớp" ở thanh trên cùng để thêm email học viên.
					</p>
					<button type="button" class="btn-admin btn-admin-primary btn-admin-sm" onclick="document.getElementById('btn-manage-students').click();">
						+ Thêm Học Viên Ngay
					</button>
				</div>
			`;
			updateStats();
			return;
		}

		if (filteredStudents.length === 0) {
			container.innerHTML = `
				<div class="empty-state p-4 text-center" style="color: var(--main-colors-foreground-f700);">
					Không tìm thấy học viên khớp với từ khóa tìm kiếm.
				</div>
			`;
			updateStats();
			return;
		}

		// Reset focus index nếu vượt ngưỡng
		if (focusedStudentIndex >= filteredStudents.length) {
			focusedStudentIndex = filteredStudents.length - 1;
		} else if (focusedStudentIndex < 0 && filteredStudents.length > 0) {
			focusedStudentIndex = 0;
		}

		const records = activeSess.records || {};

		const rowsHtml = filteredStudents.map((st, idx) => {
			const status = records[st.email] || 'unmarked';
			const isFocused = idx === focusedStudentIndex;
			const initialChar = (st.name || st.email).charAt(0).toUpperCase();

			return `
				<tr class="student-row ${isFocused ? 'focused-student-row' : ''}" 
					id="student-row-${idx}" 
					data-index="${idx}" 
					data-email="${adminEscapeHtml(st.email)}">
					<td style="width: 48px; text-align: center; color: var(--main-colors-foreground-f700); font-family: monospace;">
						${idx + 1}
					</td>
					<td>
						<div class="student-info-box">
							${st.avatar
								? `<img src="${adminEscapeHtml(st.avatar)}" alt="" class="student-avatar">`
								: `<div class="student-avatar">${initialChar}</div>`
							}
							<div>
								<div class="student-name">${adminEscapeHtml(st.name)}</div>
								<div class="student-email">${adminEscapeHtml(st.email)}</div>
							</div>
						</div>
					</td>
					<td style="text-align: right; padding-right: 20px;">
						<div class="attendance-actions-group ms-auto">
							<button type="button" class="status-btn btn-present ${status === 'present' ? 'active' : ''}" 
								data-action="present" title="Có mặt (hoặc dùng phím mũi tên Trái / Phải để xoay vòng)">
								✓ Có mặt
							</button>
							<button type="button" class="status-btn btn-late ${status === 'late' ? 'active' : ''}" 
								data-action="late" title="Đi muộn (hoặc dùng phím mũi tên Trái / Phải để xoay vòng)">
								⏰ Muộn
							</button>
							<button type="button" class="status-btn btn-absent ${status === 'absent' ? 'active' : ''}" 
								data-action="absent" title="Vắng mặt (hoặc dùng phím mũi tên Trái / Phải để xoay vòng)">
								✗ Vắng
							</button>
						</div>
					</td>
				</tr>
			`;
		}).join('');

		container.innerHTML = `
			<table class="attendance-table">
				<thead>
					<tr>
						<th style="width: 48px; text-align: center;">#</th>
						<th>Học Viên</th>
						<th style="text-align: right; padding-right: 20px;">Thao Tác Điểm Danh</th>
					</tr>
				</thead>
				<tbody>
					${rowsHtml}
				</tbody>
			</table>
		`;

		// Gán sự kiện click vào từng nút và click chọn dòng
		container.querySelectorAll('.student-row').forEach(row => {
			const idx = parseInt(row.getAttribute('data-index'), 10);
			const email = row.getAttribute('data-email');

			row.addEventListener('click', (e) => {
				const btn = e.target.closest('.status-btn');
				if (btn) {
					const action = btn.getAttribute('data-action');
					setStudentAttendance(email, action, idx);
				} else {
					setFocusedStudent(idx);
				}
			});
		});

		updateStats();
	}

	function renderStatusBadge(status) {
		switch (status) {
			case 'present':
				return '<span class="status-badge present">✓ Có mặt</span>';
			case 'late':
				return '<span class="status-badge late">⏰ Vào muộn</span>';
			case 'absent':
				return '<span class="status-badge absent">✗ Vắng mặt</span>';
			default:
				return '<span class="status-badge unmarked">Chưa đánh dấu</span>';
		}
	}

	function updateStats() {
		const activeSess = getActiveSession();
		const records = (activeSess && activeSess.records) ? activeSess.records : {};

		let presentCount = 0;
		let lateCount = 0;
		let absentCount = 0;
		let unmarkedCount = 0;

		studentsList.forEach(s => {
			const st = records[s.email];
			if (st === 'present') presentCount++;
			else if (st === 'late') lateCount++;
			else if (st === 'absent') absentCount++;
			else unmarkedCount++;
		});

		document.getElementById('stat-total-students').textContent = studentsList.length;
		document.getElementById('stat-present-count').textContent = presentCount;
		document.getElementById('stat-late-count').textContent = lateCount;
		document.getElementById('stat-absent-count').textContent = absentCount;
		document.getElementById('stat-unmarked-count').textContent = unmarkedCount;
	}

	// =========================================================================
	// 5. ATTENDANCE ACTIONS & KEYBOARD CONTROLS
	// =========================================================================
	function setFocusedStudent(index, shouldScroll = true) {
		if (index < 0 || index >= filteredStudents.length) return;

		focusedStudentIndex = index;

		// Xóa focus cũ
		document.querySelectorAll('.student-row.focused-student-row').forEach(r => {
			r.classList.remove('focused-student-row');
		});

		// Bật focus mới
		const targetRow = document.getElementById(`student-row-${index}`);
		if (targetRow) {
			targetRow.classList.add('focused-student-row');
			if (shouldScroll) {
				targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}
		}
	}

	function setStudentAttendance(email, status, index) {
		const activeSess = getActiveSession();
		if (!activeSess) return;

		if (!activeSess.records) {
			activeSess.records = {};
		}

		// Nếu bấm cùng trạng thái đang có thì hủy về unmarked
		if (activeSess.records[email] === status) {
			delete activeSess.records[email];
		} else {
			activeSess.records[email] = status;
		}

		if (typeof index === 'number') {
			setFocusedStudent(index, false);
		}

		// Cập nhật lại giao diện hàng này
		updateRowUI(email, index);
		updateStats();
		markUnsavedChanges();
	}

	const STATUS_CYCLE = ['present', 'late', 'absent', 'unmarked'];

	function cycleStudentAttendance(direction) {
		if (focusedStudentIndex < 0 || focusedStudentIndex >= filteredStudents.length) return;
		const activeSess = getActiveSession();
		if (!activeSess) return;

		if (!activeSess.records) {
			activeSess.records = {};
		}

		const currentStudent = filteredStudents[focusedStudentIndex];
		const email = currentStudent.email;
		const currentStatus = activeSess.records[email] || 'unmarked';

		const currIdx = STATUS_CYCLE.indexOf(currentStatus);
		const validIdx = currIdx === -1 ? 3 : currIdx; // index 3 là 'unmarked' (trống)

		let nextIdx;
		if (direction === 'right') {
			nextIdx = (validIdx + 1) % STATUS_CYCLE.length;
		} else {
			nextIdx = (validIdx - 1 + STATUS_CYCLE.length) % STATUS_CYCLE.length;
		}

		const newStatus = STATUS_CYCLE[nextIdx];
		if (newStatus === 'unmarked') {
			// Trạng thái trống (bỏ chọn): xóa khỏi records
			delete activeSess.records[email];
		} else {
			activeSess.records[email] = newStatus;
		}

		updateRowUI(email, focusedStudentIndex);
		updateStats();
		markUnsavedChanges();
	}

	function updateRowUI(email, index) {
		const targetRow = document.getElementById(`student-row-${index}`);
		if (!targetRow) return;

		const activeSess = getActiveSession();
		const currentStatus = (activeSess && activeSess.records && activeSess.records[email]) || 'unmarked';

		// Cập nhật trạng thái active cho 3 nút
		const btns = targetRow.querySelectorAll('.status-btn');
		btns.forEach(b => {
			const action = b.getAttribute('data-action');
			b.classList.toggle('active', action === currentStatus);
		});
	}

	function markAllPresent() {
		const activeSess = getActiveSession();
		if (!activeSess || studentsList.length === 0) return;

		if (!activeSess.records) activeSess.records = {};

		studentsList.forEach(s => {
			activeSess.records[s.email] = 'present';
		});

		renderAttendanceTable();
		markUnsavedChanges();
		showAdminToast('✓ Đã đánh dấu tất cả có mặt (Nhấn Lưu Điểm Danh để ghi lại)', 'info');
	}

	// =========================================================================
	// 6. KEYBOARD LISTENER & D-PAD ANIMATIONS
	// =========================================================================
	function highlightDpadKey(keyId) {
		const keyEl = document.getElementById(keyId);
		if (keyEl) {
			keyEl.classList.add('active');
			setTimeout(() => {
				keyEl.classList.remove('active');
			}, 180);
		}
	}

	document.addEventListener('keydown', (e) => {
		// Phím tắt lưu: Ctrl+S hoặc Cmd+S
		if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
			e.preventDefault();
			saveAttendanceToFirestore();
			return;
		}

		// Bỏ qua khi người dùng đang nhập văn bản trong modal hoặc search input
		const tag = e.target.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) {
			return;
		}

		if (filteredStudents.length === 0) return;

		const key = e.key;

		// 1. Phím mũi tên Lên / Xuống (Navigate hàng học viên)
		if (key === 'ArrowDown') {
			e.preventDefault();
			highlightDpadKey('key-down');
			let nextIndex = focusedStudentIndex + 1;
			if (nextIndex >= filteredStudents.length) nextIndex = 0;
			setFocusedStudent(nextIndex);
		} else if (key === 'ArrowUp') {
			e.preventDefault();
			highlightDpadKey('key-up');
			let prevIndex = focusedStudentIndex - 1;
			if (prevIndex < 0) prevIndex = filteredStudents.length - 1;
			setFocusedStudent(prevIndex);
		}

		// 2. Phím mũi tên Phải: Xoay vòng trạng thái sang phải (Có -> Muộn -> Vắng -> Có)
		else if (key === 'ArrowRight') {
			e.preventDefault();
			highlightDpadKey('key-right');
			cycleStudentAttendance('right');
		}

		// 3. Phím mũi tên Trái: Xoay vòng trạng thái sang trái (Vắng -> Muộn -> Có -> Vắng)
		else if (key === 'ArrowLeft') {
			e.preventDefault();
			highlightDpadKey('key-left');
			cycleStudentAttendance('left');
		}
	});

	// Cho phép click vào D-Pad ảo trên màn hình
	function initDpadVirtualClicks() {
		document.getElementById('key-up')?.addEventListener('click', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
			document.dispatchEvent(event);
		});
		document.getElementById('key-down')?.addEventListener('click', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
			document.dispatchEvent(event);
		});
		document.getElementById('key-right')?.addEventListener('click', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
			document.dispatchEvent(event);
		});
		document.getElementById('key-left')?.addEventListener('click', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
			document.dispatchEvent(event);
		});
	}

	// =========================================================================
	// 7. FIRESTORE PERSISTENCE & MANUAL SAVE BUTTON
	// =========================================================================
	function updateSaveStatus(state, text) {
		const badge = document.getElementById('save-status-indicator');
		if (!badge) return;

		if (state === 'unsaved') {
			badge.className = 'save-status-badge unsaved';
			badge.textContent = text || '● Chưa lưu';
		} else if (state === 'saving') {
			badge.className = 'save-status-badge saving';
			badge.textContent = text || 'Đang lưu...';
		} else {
			badge.className = 'save-status-badge';
			badge.textContent = text || '✓ Đã lưu';
		}
	}

	function markUnsavedChanges() {
		hasUnsavedChanges = true;
		updateSaveStatus('unsaved', '● Chưa lưu');
		const btn = document.getElementById('btn-save-attendance');
		if (btn) btn.classList.add('has-unsaved');
	}

	async function saveAttendanceToFirestore(isSilent = false) {
		if (!currentDb || !currentCohortId || !attendanceData) return;

		const btn = document.getElementById('btn-save-attendance');

		try {
			if (btn) {
				btn.disabled = true;
				btn.textContent = 'Đang lưu...';
			}
			updateSaveStatus('saving', 'Đang lưu...');
			const sessionsList = attendanceData.sessions || [];

			// 1. Lưu trực tiếp vào document của Cohort (đảm bảo 100% quyền truy cập theo Security Rules)
			await currentDb.collection('cohorts').doc(currentCohortId).set({
				attendanceSessions: sessionsList,
				updatedAt: firebase.firestore.FieldValue.serverTimestamp()
			}, { merge: true });

			// Cập nhật lại cache tại client
			if (currentCohortData) {
				currentCohortData.attendanceSessions = sessionsList;
			}
			const chItem = allCohorts.find(c => c.id === currentCohortId);
			if (chItem) {
				chItem.attendanceSessions = sessionsList;
			}

			// 2. Dự phòng: Thử đồng bộ sang cohort_attendance nếu rules cho phép
			try {
				await currentDb.collection('cohort_attendance').doc(currentCohortId).set({
					cohortId: currentCohortId,
					sessions: sessionsList,
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				}, { merge: true });
			} catch (_) {
				// Bỏ qua lỗi phân quyền của collection riêng
			}

			hasUnsavedChanges = false;
			if (btn) {
				btn.disabled = false;
				btn.textContent = '💾 Lưu Điểm Danh';
				btn.classList.remove('has-unsaved');
			}
			updateSaveStatus('saved', '✓ Đã lưu');

			if (!isSilent) {
				showAdminToast('✅ Đã lưu dữ liệu điểm danh thành công!', 'success');
			}
		} catch (err) {
			console.error('[Attendance] Lỗi lưu Firestore:', err);
			if (btn) {
				btn.disabled = false;
				btn.textContent = '💾 Lưu Điểm Danh';
			}
			updateSaveStatus('unsaved', '❌ Lỗi lưu dữ liệu');
			if (!isSilent) {
				showAdminToast(`❌ Lỗi lưu điểm danh: ${err.message}`, 'error');
			}
		}
	}

	// =========================================================================
	// 8. MODAL QUẢN LÝ HỌC VIÊN CỦA LỚP
	// =========================================================================
	function openManageStudentsModal() {
		if (!currentCohortData) {
			showAdminToast('⚠️ Vui lòng chọn một lớp học trước!', 'warning');
			return;
		}

		const modal = document.getElementById('modal-manage-students');
		const textarea = document.getElementById('cohort-students-textarea');
		const countInd = document.getElementById('students-count-indicator');

		const existingEmails = Array.isArray(currentCohortData.studentEmails) ? currentCohortData.studentEmails : [];
		textarea.value = existingEmails.join('\n');
		countInd.textContent = `${existingEmails.length} học viên hiện tại`;

		textarea.oninput = () => {
			const count = textarea.value.split('\n').filter(e => e.trim().length > 0).length;
			countInd.textContent = `${count} học viên`;
		};

		modal.style.display = 'flex';
	}

	function closeManageStudentsModal() {
		const modal = document.getElementById('modal-manage-students');
		if (modal) modal.style.display = 'none';
	}

	async function saveCohortStudents() {
		if (!currentDb || !currentCohortId) return;

		const textarea = document.getElementById('cohort-students-textarea');
		const raw = textarea.value;
		const cleanEmails = raw
			.split('\n')
			.map(e => e.trim().toLowerCase())
			.filter(e => e.length > 0 && e.includes('@'));

		// Loại bỏ trùng lặp
		const uniqueEmails = Array.from(new Set(cleanEmails));

		try {
			const btn = document.getElementById('btn-save-students');
			btn.disabled = true;
			btn.textContent = 'Đang lưu...';

			await currentDb.collection('cohorts').doc(currentCohortId).update({
				studentEmails: uniqueEmails,
				updatedAt: firebase.firestore.FieldValue.serverTimestamp()
			});

			if (currentCohortData) {
				currentCohortData.studentEmails = uniqueEmails;
			}

			// Cập nhật lại trong allCohorts
			const cItem = allCohorts.find(c => c.id === currentCohortId);
			if (cItem) cItem.studentEmails = uniqueEmails;

			buildStudentsList();
			if (currentViewMode === 'matrix') {
				renderMatrixTable();
			} else {
				renderAttendanceTable();
			}
			closeManageStudentsModal();

			showAdminToast(`✅ Đã cập nhật ${uniqueEmails.length} học viên cho lớp!`, 'success');
			btn.disabled = false;
			btn.textContent = '💾 Lưu Danh Sách Học Viên';
		} catch (err) {
			console.error('[Attendance] Lỗi lưu học viên:', err);
			showAdminToast(`❌ Lỗi cập nhật học viên: ${err.message}`, 'error');
			document.getElementById('btn-save-students').disabled = false;
		}
	}

	// =========================================================================
	// 9. EVENT HANDLERS BINDING
	// =========================================================================
	function initEventHandlers() {
		// Chọn lớp
		document.getElementById('select-cohort')?.addEventListener('change', (e) => {
			switchCohort(e.target.value);
		});

		// Chuyển đổi giữa 2 chế độ nghiệp vụ: Bảng tổng hợp (2.1) & Điểm danh buổi học (2.2)
		document.getElementById('btn-mode-matrix')?.addEventListener('click', () => {
			switchViewMode('matrix');
		});

		document.getElementById('btn-mode-session')?.addEventListener('click', () => {
			switchViewMode('session');
		});

		document.getElementById('btn-back-to-matrix')?.addEventListener('click', () => {
			switchViewMode('matrix');
		});

		// Thao tác trên Luồng 2.1 (Matrix View)
		document.getElementById('matrix-search-input')?.addEventListener('input', () => {
			renderMatrixTable();
		});

		document.getElementById('btn-matrix-add-session')?.addEventListener('click', () => {
			createNewSession(true); // Tạo buổi mới và nhảy luôn sang luồng điểm danh
		});

		document.getElementById('btn-matrix-export-csv')?.addEventListener('click', exportMatrixCSV);

		// Thay đổi ngày buổi học (Luồng 2.2)
		document.getElementById('session-date-input')?.addEventListener('change', (e) => {
			const activeSess = getActiveSession();
			if (activeSess) {
				activeSess.date = e.target.value;
				renderSessionTabs();
				markUnsavedChanges();
			}
		});

		// Nút Lưu Điểm Danh trên header
		document.getElementById('btn-save-attendance')?.addEventListener('click', () => {
			saveAttendanceToFirestore();
		});

		// Thêm / xóa buổi (Luồng 2.2)
		document.getElementById('btn-add-session')?.addEventListener('click', () => createNewSession(false));
		document.getElementById('btn-delete-session')?.addEventListener('click', deleteCurrentSession);

		// Đánh dấu tất cả có mặt
		document.getElementById('btn-mark-all-present')?.addEventListener('click', markAllPresent);

		// Tìm kiếm học viên trong Luồng 2.2
		document.getElementById('student-search-input')?.addEventListener('input', () => {
			renderAttendanceTable();
		});

		// Modal quản lý học viên
		document.getElementById('btn-manage-students')?.addEventListener('click', openManageStudentsModal);
		document.getElementById('btn-close-students-modal')?.addEventListener('click', closeManageStudentsModal);
		document.getElementById('btn-cancel-students')?.addEventListener('click', closeManageStudentsModal);
		document.getElementById('btn-save-students')?.addEventListener('click', saveCohortStudents);

		// Cảnh báo người dùng khi thoát trang nếu có thay đổi chưa lưu
		window.addEventListener('beforeunload', (e) => {
			if (hasUnsavedChanges) {
				e.preventDefault();
				e.returnValue = '';
			}
		});

		// Virtual D-pad clicks
		initDpadVirtualClicks();
	}

})();
