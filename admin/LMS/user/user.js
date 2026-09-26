window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-users'
		};

		// Helper UUID
		function generateUUID() {
			if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
			return 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		let allUsers = [];
		let allCourses = [];
		let allCohorts = [];
		let batchUsers = [];
		let currentDb = null;
		let currentUser = null;

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			currentUser = e.detail.user;
			await loadUsers();
			initUserEvents();
		});

		async function loadUsers() {
			const container = document.getElementById('user-list-container');
			try {
				const [usersSnap, coursesSnap, cohortsSnap, certsSnap] = await Promise.all([
					currentDb.collection('authorizedUsers').get(),
					currentDb.collection('courses').get().catch(() => ({ docs: [] })),
					currentDb.collection('cohorts').get().catch(() => ({ docs: [] })),
					currentDb.collection('certificates').get().catch(() => ({ docs: [] }))
				]);

				allCourses = [];
				coursesSnap.forEach(doc => {
					allCourses.push({ id: doc.id, ...doc.data() });
				});

				allCohorts = [];
				cohortsSnap.forEach(doc => {
					allCohorts.push({ id: doc.id, ...doc.data() });
				});

				// Index certificates by email -> { courseIds: Set, cohortIds: Set }
				const certsByEmail = new Map();
				certsSnap.forEach(doc => {
					const c = doc.data() || {};
					const mail = (c.recipientEmail || c.individual_email || c.studentEmail || c.email || '').trim().toLowerCase();
					if (!mail) return;
					if (!certsByEmail.has(mail)) {
						certsByEmail.set(mail, { courseIds: new Set(), cohortIds: new Set() });
					}
					const entry = certsByEmail.get(mail);
					if (c.courseId) entry.courseIds.add(c.courseId);
					if (c.cohortId) entry.cohortIds.add(c.cohortId);
				});

				allUsers = [];
				const docs = [];
				usersSnap.forEach(doc => {
					docs.push({ docId: doc.id, data: doc.data() });
				});

				// Gom nhóm tất cả email phụ của các tài khoản chính để phát hiện document rác
				const secondaryEmailToPrimary = new Map();
				docs.forEach(({ docId, data }) => {
					const primaryEmail = (data.primaryEmail || (Array.isArray(data.emails) ? data.emails[0] : null) || data.email || docId).toLowerCase();
					if (Array.isArray(data.emails)) {
						data.emails.forEach(e => {
							const cleanE = (e || '').trim().toLowerCase();
							if (cleanE && cleanE !== primaryEmail) {
								secondaryEmailToPrimary.set(cleanE, primaryEmail);
							}
						});
					}
				});

				// Lọc và tự động dọn dẹp các document trùng với email phụ của tài khoản khác
				for (const { docId, data } of docs) {
					const cleanDocId = docId.trim().toLowerCase();
					if (secondaryEmailToPrimary.has(cleanDocId)) {
						const parentPrimary = secondaryEmailToPrimary.get(cleanDocId);
						console.log(`[LMS User] Tự động dọn dẹp document rác trùng với email phụ của ${parentPrimary}: ${cleanDocId}`);
						currentDb.collection('authorizedUsers').doc(docId).delete().catch(() => {});
						continue;
					}

					const primaryEmail = (data.primaryEmail || (Array.isArray(data.emails) ? data.emails[0] : null) || data.email || docId).toLowerCase();
					const emails = Array.isArray(data.emails) && data.emails.length > 0 ? data.emails : [primaryEmail];

					// Tập hợp courseIds và cohortIds liên kết với user
					const userCourseIds = new Set();
					const userCohortIds = new Set();

					if (data.courseId) userCourseIds.add(data.courseId);
					if (Array.isArray(data.courseIds)) data.courseIds.forEach(id => userCourseIds.add(id));
					if (data.cohortId) userCohortIds.add(data.cohortId);
					if (Array.isArray(data.cohortIds)) data.cohortIds.forEach(id => userCohortIds.add(id));

					// Quét từ cohorts studentEmails / memberEmails
					const allUserMails = new Set([primaryEmail, ...emails.map(e => (e || '').toLowerCase())]);
					allCohorts.forEach(ch => {
						const rawList = ch.studentEmails || ch.memberEmails || ch.students || [];
						const chEmails = Array.isArray(rawList) ? rawList.map(e => (typeof e === 'string' ? e : e?.email || '').toLowerCase()) : [];
						const hasUser = chEmails.some(ce => ce && allUserMails.has(ce));
						if (hasUser) {
							userCohortIds.add(ch.id);
							if (ch.courseId) userCourseIds.add(ch.courseId);
						}
					});

					// Quét từ certificates
					allUserMails.forEach(mail => {
						if (certsByEmail.has(mail)) {
							const cEntry = certsByEmail.get(mail);
							cEntry.courseIds.forEach(id => userCourseIds.add(id));
							cEntry.cohortIds.forEach(id => userCohortIds.add(id));
						}
					});

					allUsers.push({
						id: data.id || generateUUID(),
						docId: docId,
						primaryEmail,
						emails,
						displayName: data.displayName || '',
						role: data.role || 'member',
						status: data.status || 'active',
						phone: data.phone || '',
						photoUrl: data.photoUrl || '',
						firebaseUid: data.firebaseUid || '',
						_courseIds: userCourseIds,
						_cohortIds: userCohortIds,
						...data
					});
				}

				// Update stats
				document.getElementById('stat-total').textContent = allUsers.length;
				document.getElementById('stat-admin').textContent = allUsers.filter(u => u.role === 'admin').length;
				document.getElementById('stat-member').textContent = allUsers.filter(u => u.role === 'member').length;
				document.getElementById('stat-alumni').textContent = allUsers.filter(u => u.role === 'alumni').length;
				document.getElementById('stat-instructor').textContent = allUsers.filter(u => u.role === 'instructor').length;

				populateUserFilters();
				renderUsersTable();
			} catch (err) {
				if (container) {
					container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải danh sách: ${err.message}</div>`;
				}
			}
		}

		function populateUserFilters() {
			const filterCourse = document.getElementById('filter-user-course');
			const filterCohort = document.getElementById('filter-user-cohort');
			if (!filterCourse || !filterCohort) return;

			const selectedCourse = filterCourse.value || 'all';
			const selectedCohort = filterCohort.value || 'all';

			// Nạp danh sách Khóa học (Hiển thị bằng Title, không hiển thị bằng mã)
			const prevCourseVal = filterCourse.value;
			filterCourse.innerHTML = '<option value="all">Tất cả Khóa học</option>';
			allCourses.forEach(c => {
				const title = c.title || c.name || c.id;
				const opt = document.createElement('option');
				opt.value = c.id;
				opt.textContent = title;
				filterCourse.appendChild(opt);
			});
			if (prevCourseVal && [...filterCourse.options].some(o => o.value === prevCourseVal)) {
				filterCourse.value = prevCourseVal;
			}

			// Nạp danh sách Lớp học phụ thuộc vào Course được chọn (Hiển thị bằng Title, không hiển thị mã)
			updateUserCohortDropdown();
		}

		function updateUserCohortDropdown() {
			const filterCourse = document.getElementById('filter-user-course');
			const filterCohort = document.getElementById('filter-user-cohort');
			if (!filterCohort) return;

			const courseVal = filterCourse ? filterCourse.value : 'all';
			const prevCohortVal = filterCohort.value;

			filterCohort.innerHTML = '<option value="all">Tất cả Lớp học</option>';

			let cohortsToShow = allCohorts;
			if (courseVal !== 'all') {
				cohortsToShow = allCohorts.filter(ch => ch.courseId === courseVal);
			}

			cohortsToShow.forEach(ch => {
				const title = ch.title || ch.name || ch.bootcamp_name || ch.cohortName || ch.id;
				const opt = document.createElement('option');
				opt.value = ch.id;
				opt.textContent = title;
				filterCohort.appendChild(opt);
			});

			if (prevCohortVal && [...filterCohort.options].some(o => o.value === prevCohortVal)) {
				filterCohort.value = prevCohortVal;
			} else {
				filterCohort.value = 'all';
			}
		}

		let currentSortCol = 'role';
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

		window.handleSortUser = function (col) {
			if (currentSortCol === col) {
				currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				currentSortCol = col;
				currentSortDir = 'asc';
			}
			renderUsersTable();
		};

		function renderUsersTable() {
			const container = document.getElementById('user-list-container');
			const query = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
			const roleFilter = document.getElementById('filter-user-role')?.value || 'all';
			const statusFilter = document.getElementById('filter-user-status')?.value || 'all';
			const courseFilter = document.getElementById('filter-user-course')?.value || 'all';
			const cohortFilter = document.getElementById('filter-user-cohort')?.value || 'all';

			let filtered = [...allUsers];

			// Lọc theo Khóa học & Lớp học
			if (courseFilter !== 'all') {
				filtered = filtered.filter(u => u._courseIds && u._courseIds.has(courseFilter));
			}
			if (cohortFilter !== 'all') {
				filtered = filtered.filter(u => u._cohortIds && u._cohortIds.has(cohortFilter));
			}

			if (query) {
				filtered = filtered.filter(u =>
					(u.primaryEmail && u.primaryEmail.toLowerCase().includes(query)) ||
					(u.emails && u.emails.some(e => e.toLowerCase().includes(query))) ||
					(u.displayName && u.displayName.toLowerCase().includes(query)) ||
					(u.phone && u.phone.toLowerCase().includes(query))
				);
			}
			if (roleFilter !== 'all') filtered = filtered.filter(u => u.role === roleFilter);
			if (statusFilter !== 'all') filtered = filtered.filter(u => (u.status || 'active') === statusFilter);

			if (filtered.length === 0) {
				container.innerHTML = `<div class="empty-state p-4 text-center">Không tìm thấy user nào phù hợp.</div>`;
				return;
			}

			if (currentSortCol) {
				filtered.sort((a, b) => {
					if (currentSortCol === 'role') {
						const roleOrder = { admin: 0, instructor: 1, member: 2, alumni: 3 };
						const rA = roleOrder[a.role] ?? 99;
						const rB = roleOrder[b.role] ?? 99;
						return currentSortDir === 'asc' ? rA - rB : rB - rA;
					}
					if (currentSortCol === 'email') {
						const strA = (a.primaryEmail || a.emails?.[0] || a.id || '').toLowerCase();
						const strB = (b.primaryEmail || b.emails?.[0] || b.id || '').toLowerCase();
						const res = strA.localeCompare(strB, 'vi', { numeric: true });
						return currentSortDir === 'asc' ? res : -res;
					}
					if (currentSortCol === 'uid') {
						const uA = a.firebaseUid ? 1 : 0;
						const uB = b.firebaseUid ? 1 : 0;
						return currentSortDir === 'asc' ? uB - uA : uA - uB;
					}
					const valA = a[currentSortCol] || '';
					const valB = b[currentSortCol] || '';
					const res = String(valA).localeCompare(String(valB), 'vi', { sensitivity: 'base', numeric: true });
					return currentSortDir === 'asc' ? res : -res;
				});
			}

			const statusLabels = {
				active: '<span class="admin-tag admin-tag-success">Active</span>',
				inactive: '<span class="admin-tag admin-tag-warning">Inactive</span>',
				disabled: '<span class="admin-tag admin-tag-danger">Disabled</span>'
			};

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 40px;">#</th>
							<th class="th-sortable ${currentSortCol === 'email' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortUser('email')">Email chính & Phụ ${getSortIndicator('email')}</th>
							<th class="th-sortable ${currentSortCol === 'role' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortUser('role')">Role ${getSortIndicator('role')}</th>
							<th class="th-sortable ${currentSortCol === 'displayName' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortUser('displayName')">Tên hiển thị ${getSortIndicator('displayName')}</th>
							<th class="th-sortable ${currentSortCol === 'phone' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortUser('phone')">SĐT ${getSortIndicator('phone')}</th>
							<th class="th-sortable ${currentSortCol === 'status' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortUser('status')" style="text-align: center;">Trạng thái ${getSortIndicator('status')}</th>
							<th class="th-sortable ${currentSortCol === 'uid' ? 'sorted-' + currentSortDir : ''}" onclick="handleSortUser('uid')" style="text-align: center;">Auth UID ${getSortIndicator('uid')}</th>
							<th style="width: 100px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${filtered.map((u, i) => {
							const displayEmail = u.primaryEmail || (u.emails ? u.emails[0] : u.id);
							const extraEmails = (u.emails || []).filter(e => e.toLowerCase() !== displayEmail.toLowerCase());
							const isCurrent = (u.primaryEmail === currentUser?.email) || (u.emails && u.emails.includes(currentUser?.email));
							const isUidLinked = Boolean(u.firebaseUid);

							return `
							<tr>
								<td class="font-sans-caption" style="color: var(--main-colors-foreground-f800);">${i + 1}</td>
								<td>
									<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f200);">${adminEscapeHtml(displayEmail)}</div>
									${extraEmails.length > 0 ? `<div class="font-sans-small" style="color: var(--main-colors-foreground-f700);">${extraEmails.map(e => `+ ${adminEscapeHtml(e)}`).join(', ')}</div>` : ''}
								</td>
								<td><span class="role-cell ${adminEscapeHtml(u.role || 'member')}">${adminEscapeHtml(u.role || 'member')}</span></td>
								<td class="font-sans-caption">${adminEscapeHtml(u.displayName || '—')}</td>
								<td class="font-sans-caption" style="font-family: monospace; font-size: 12px;">${adminEscapeHtml(u.phone || '—')}</td>
								<td style="text-align: center;">${statusLabels[u.status] || statusLabels.active}</td>
								<td style="text-align: center;">
									${isUidLinked ? '<span class="admin-tag admin-tag-success">✓ Linked</span>' : '<span class="admin-tag admin-tag-neutral">○ Chờ login</span>'}
								</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<button class="btn-icon-action" title="Sửa" onclick="openEditModal('${adminEscapeHtml(u.docId || u.primaryEmail)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
										${!isCurrent ? `
											<button class="btn-icon-action delete" title="Xóa" onclick="deleteSingleUser('${adminEscapeHtml(u.docId || u.primaryEmail)}', '${adminEscapeHtml(displayEmail)}')">
												<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
											</button>` : `<span class="font-sans-small" style="color: var(--main-colors-foreground-f800); font-style: italic; margin-left: 4px;">Bạn</span>`}
									</div>
								</td>
							</tr>
							`;
						}).join('')}
					</tbody>
				</table>
			`;
		}

		window.openEditModal = function(userId) {
			const user = allUsers.find(u => u.id === userId || u.docId === userId || u.primaryEmail === userId);
			if (!user) return;

			document.getElementById('modal-user-id').value = user.id || generateUUID();
			document.getElementById('modal-user-primary-email').value = user.primaryEmail || user.docId || '';
			document.getElementById('modal-user-role').value = user.role || 'member';
			document.getElementById('modal-user-name').value = user.displayName || '';
			document.getElementById('modal-user-status').value = user.status || 'active';
			document.getElementById('modal-user-phone').value = user.phone || '';
			document.getElementById('modal-user-uid').value = user.firebaseUid || '';
			document.getElementById('modal-user-emails').value = Array.isArray(user.emails) ? user.emails.join('\n') : (user.primaryEmail || '');
			document.getElementById('modal-user-photo').value = user.photoUrl || '';
			document.getElementById('modal-user-title-header').textContent = `Chỉnh sửa: ${user.displayName || user.primaryEmail}`;

			document.getElementById('modal-user').classList.add('open');
		};

		window.deleteSingleUser = async function(docId, email) {
			const targetEmail = (email || docId || '').trim().toLowerCase();
			if (!confirm(`Xóa quyền truy cập của user ${targetEmail}?`)) return;

			try {
				if (targetEmail) await currentDb.collection('authorizedUsers').doc(targetEmail).delete();
				if (docId && docId !== targetEmail) await currentDb.collection('authorizedUsers').doc(docId).delete().catch(() => {});
				showAdminToast(`✅ Đã xóa quyền user ${targetEmail}`, 'success');
				await loadUsers();
			} catch (err) {
				showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
			}
		};

		function initUserEvents() {
			// Toggle Add / Batch Section
			const btnToggleAdd = document.getElementById('btn-toggle-add-section');
			const addSec = document.getElementById('addUserSection');
			if (btnToggleAdd && addSec) {
				btnToggleAdd.onclick = () => {
					const isHidden = addSec.style.display === 'none';
					addSec.style.display = isHidden ? 'flex' : 'none';
					btnToggleAdd.textContent = isHidden ? '✕ Đóng Thêm / Nạp' : '+ Thêm / Nạp Users';
					btnToggleAdd.classList.toggle('btn-admin-secondary', isHidden);
					btnToggleAdd.classList.toggle('btn-admin-primary', !isHidden);
				};
			}

			document.getElementById('searchInput')?.addEventListener('input', renderUsersTable);
			document.getElementById('filter-user-role')?.addEventListener('change', renderUsersTable);
			document.getElementById('filter-user-status')?.addEventListener('change', renderUsersTable);
			document.getElementById('filter-user-course')?.addEventListener('change', () => {
				updateUserCohortDropdown();
				renderUsersTable();
			});
			document.getElementById('filter-user-cohort')?.addEventListener('change', renderUsersTable);
			document.getElementById('btn-refresh')?.addEventListener('click', loadUsers);

			// Export Users to JSON
			document.getElementById('btn-export-users')?.addEventListener('click', () => {
				const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allUsers, null, 2));
				const dlAnchor = document.createElement('a');
				dlAnchor.setAttribute("href", dataStr);
				dlAnchor.setAttribute("download", `users_backup_${new Date().toISOString().slice(0, 10)}.json`);
				document.body.appendChild(dlAnchor);
				dlAnchor.click();
				dlAnchor.remove();
				showAdminToast('💾 Đã xuất file JSON backup!', 'success');
			});

			// Add single user form
			document.getElementById('add-user-form')?.addEventListener('submit', async (e) => {
				e.preventDefault();
				const email = document.getElementById('input-email').value.trim().toLowerCase();
				const displayName = document.getElementById('input-name').value.trim();
				const phone = document.getElementById('input-phone').value.trim();
				const role = document.getElementById('input-role').value;
				const status = document.getElementById('input-status').value;
				const btnAdd = document.getElementById('btn-add-user');

				if (!email || !email.includes('@')) {
					showAdminToast('⚠️ Vui lòng nhập email hợp lệ!', 'warning');
					return;
				}

				btnAdd.disabled = true;
				btnAdd.textContent = 'Đang lưu...';

				try {
					const userData = {
						id: generateUUID(),
						primaryEmail: email,
						emails: [email],
						firebaseUid: '',
						displayName,
						role,
						photoUrl: '',
						phone,
						status,
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
						updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
						addedBy: currentUser.email
					};

					await currentDb.collection('authorizedUsers').doc(email).set(userData, { merge: true });
					showAdminToast(`✅ Đã thêm ${email} vào authorizedUsers`, 'success');
					e.target.reset();
					await loadUsers();
				} catch (err) {
					showAdminToast(`❌ Lỗi: ${err.message}`, 'error');
				} finally {
					btnAdd.disabled = false;
					btnAdd.textContent = '+ Thêm User Này';
				}
			});

			// Modal edit user submit
			document.getElementById('form-modal-user')?.addEventListener('submit', async (e) => {
				e.preventDefault();
				const internalId = document.getElementById('modal-user-id').value.trim() || generateUUID();
				const primaryEmail = document.getElementById('modal-user-primary-email').value.trim().toLowerCase();
				const role = document.getElementById('modal-user-role').value;
				const displayName = document.getElementById('modal-user-name').value.trim();
				const status = document.getElementById('modal-user-status').value;
				const phone = document.getElementById('modal-user-phone').value.trim();
				const photoUrl = document.getElementById('modal-user-photo').value.trim();
				const rawEmails = document.getElementById('modal-user-emails').value.trim();

				let emails = rawEmails.split(/\r?\n|,/).map(s => s.trim().toLowerCase()).filter(s => s.includes('@'));
				if (!emails.includes(primaryEmail)) emails.unshift(primaryEmail);
				emails = Array.from(new Set(emails));

				try {
					await currentDb.collection('authorizedUsers').doc(primaryEmail).set({
						id: internalId,
						primaryEmail,
						emails,
						role,
						displayName,
						status,
						phone,
						photoUrl,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					// Tự động dọn dẹp nếu có email phụ nào từng bị tạo thành document riêng lẻ
					for (const secEmail of emails) {
						if (secEmail !== primaryEmail) {
							await currentDb.collection('authorizedUsers').doc(secEmail).delete().catch(() => {});
						}
					}

					showAdminToast(`✅ Đã cập nhật ${primaryEmail}`, 'success');
					document.getElementById('modal-user').classList.remove('open');
					await loadUsers();
				} catch (err) {
					showAdminToast(`❌ Lỗi cập nhật: ${err.message}`, 'error');
				}
			});

			// Close modal
			document.querySelectorAll('.btn-close-modal').forEach(btn => {
				btn.onclick = () => document.getElementById('modal-user').classList.remove('open');
			});

			// Batch Parsing Logic
			const rawInput = document.getElementById('rawBatchInput');
			const batchSec = document.getElementById('batchPreviewSection');
			const batchInfo = document.getElementById('parseStatusInfo');
			const batchTableBody = document.getElementById('batchTableBody');
			const btnClear = document.getElementById('btnClearBatch');
			const btnAddRow = document.getElementById('btnAddEmptyRow');
			const btnSubmitBatch = document.getElementById('btn-submit-batch');

			function parseBatch() {
				const text = rawInput.value.trim();
				if (!text) {
					batchUsers = [];
					batchSec.style.display = 'none';
					batchInfo.innerHTML = 'Chưa có dữ liệu hàng loạt.';
					return;
				}
				const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
				const delimiter = lines[0].includes('\t') ? '\t' : (lines[0].includes(',') ? ',' : ';');
				const rows = [];
				lines.forEach(line => {
					const parts = line.split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));
					if (!parts[0] || !parts[0].includes('@')) return;
					rows.push({
						email: parts[0].toLowerCase(),
						role: ['member', 'alumni', 'instructor', 'admin'].includes(parts[1]?.toLowerCase()) ? parts[1].toLowerCase() : 'member',
						displayName: parts[2] || ''
					});
				});

				batchUsers = rows;
				if (batchUsers.length > 0) {
					batchInfo.innerHTML = `<span style="color: var(--highlight-green);">✓ Nhận diện <b>${batchUsers.length} users</b>. Bạn có thể chỉnh sửa trực tiếp bên dưới:</span>`;
					renderBatchGrid();
					batchSec.style.display = 'flex';
				} else {
					batchInfo.innerHTML = '<span style="color: var(--highlight-yellow);">Không tìm thấy dòng email hợp lệ nào.</span>';
					batchSec.style.display = 'none';
				}
			}

			function renderBatchGrid() {
				document.getElementById('batchCountBadge').textContent = `${batchUsers.length} users`;
				batchTableBody.innerHTML = batchUsers.map((u, idx) => `
					<tr>
						<td style="text-align: center; color: var(--main-colors-foreground-f800);">${idx + 1}</td>
						<td><input type="email" value="${adminEscapeHtml(u.email)}" oninput="batchUsers[${idx}].email=this.value.trim().toLowerCase()"></td>
						<td>
							<select onchange="batchUsers[${idx}].role=this.value">
								<option value="member" ${u.role === 'member' ? 'selected' : ''}>Member</option>
								<option value="alumni" ${u.role === 'alumni' ? 'selected' : ''}>Alumni</option>
								<option value="instructor" ${u.role === 'instructor' ? 'selected' : ''}>Instructor</option>
								<option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
							</select>
						</td>
						<td><input type="text" value="${adminEscapeHtml(u.displayName)}" oninput="batchUsers[${idx}].displayName=this.value.trim()"></td>
						<td style="text-align: center;"><button type="button" class="btn-row-delete" onclick="batchUsers.splice(${idx},1);renderBatchGrid();">&times;</button></td>
					</tr>
				`).join('');
			}

			rawInput.addEventListener('input', parseBatch);
			btnClear.onclick = () => { rawInput.value = ''; parseBatch(); };
			btnAddRow.onclick = () => { batchUsers.push({ email: '', role: 'member', displayName: '' }); renderBatchGrid(); };

			// File upload
			const fileInput = document.getElementById('batch-file-input');
			document.getElementById('btn-trigger-file').onclick = () => fileInput.click();
			fileInput.onchange = (e) => {
				const file = e.target.files[0];
				if (!file) return;
				const reader = new FileReader();
				reader.onload = (ev) => { rawInput.value = ev.target.result; parseBatch(); };
				reader.readAsText(file);
			};

			// Submit Batch
			btnSubmitBatch.onclick = () => {
				const valid = batchUsers.filter(u => u.email && u.email.includes('@'));
				if (valid.length === 0) {
					showAdminToast('⚠️ Không có user hợp lệ nào để lưu!', 'warning');
					return;
				}
				const confirmModal = document.getElementById('confirmBatchModal');
				document.getElementById('confirmModalMsg').innerHTML = `Lưu <b>${valid.length} user</b> này vào danh sách phân quyền trên Firebase?`;
				confirmModal.style.display = 'flex';
			};

			document.getElementById('btnModalCancel').onclick = () => document.getElementById('confirmBatchModal').style.display = 'none';
			document.getElementById('btnModalConfirm').onclick = async () => {
				document.getElementById('confirmBatchModal').style.display = 'none';
				const valid = batchUsers.filter(u => u.email && u.email.includes('@'));
				btnSubmitBatch.disabled = true;
				btnSubmitBatch.textContent = 'Đang lưu lên Database...';

				try {
					const chunkSize = 400;
					for (let i = 0; i < valid.length; i += chunkSize) {
						const chunk = valid.slice(i, i + chunkSize);
						const batch = currentDb.batch();
						chunk.forEach(u => {
							const docRef = currentDb.collection('authorizedUsers').doc(u.email);
							batch.set(docRef, {
								id: generateUUID(),
								primaryEmail: u.email,
								emails: [u.email],
								displayName: u.displayName || '',
								role: u.role || 'member',
								status: 'active',
								updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
								addedBy: currentUser.email
							}, { merge: true });
						});
						await batch.commit();
					}
					showAdminToast(`✅ Đã lưu ${valid.length} users thành công!`, 'success');
					rawInput.value = '';
					parseBatch();
					await loadUsers();
				} catch (err) {
					showAdminToast(`❌ Lỗi lưu: ${err.message}`, 'error');
				} finally {
					btnSubmitBatch.disabled = false;
					btnSubmitBatch.textContent = '💾 Lưu Tất Cả Vào Database';
				}
			};
		}
