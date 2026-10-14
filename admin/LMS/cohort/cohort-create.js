window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-cohorts'
		};

		const urlParams = new URLSearchParams(window.location.search);
		const defaultCourseId = urlParams.get('courseId');

		function generateUUID() {
			if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
			return 'coh_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		let currentDb = null;
		let currentUser = null;
		let coursesMap = new Map();

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			currentUser = e.detail.user;
			await loadCoursesSelect();
		});

		async function loadCoursesSelect() {
			const select = document.getElementById('cohort-course');
			try {
				const snapshot = await currentDb.collection('courses').get();
				snapshot.forEach(doc => {
					const data = doc.data();
					coursesMap.set(doc.id, data);
					const opt = document.createElement('option');
					opt.value = doc.id;
					opt.textContent = `${data.code ? `[${data.code}] ` : ''}${data.title || doc.id}`;
					if (defaultCourseId && defaultCourseId === doc.id) {
						opt.selected = true;
					}
					select.appendChild(opt);
				});

				// Trigger change to auto suggest code if course selected
				if (defaultCourseId) {
					select.dispatchEvent(new Event('change'));
				}
			} catch (err) {
				console.warn('Could not load courses:', err);
			}
		}

		document.getElementById('cohort-course').addEventListener('change', function() {
			const selectedCourse = coursesMap.get(this.value);
			if (selectedCourse) {
				const codeInput = document.getElementById('cohort-code');
				if (!codeInput.value) {
					codeInput.value = `${selectedCourse.code || 'COURSE'}-C01`;
				}
				const titleInput = document.getElementById('cohort-title');
				if (!titleInput.value) {
					titleInput.value = `${selectedCourse.title} (Khóa 01)`;
				}
			}
		});

		document.getElementById('create-cohort-form').addEventListener('submit', async function(e) {
			e.preventDefault();
			const courseId = document.getElementById('cohort-course').value;
			const code = document.getElementById('cohort-code').value.trim().toUpperCase();
			const title = document.getElementById('cohort-title').value.trim();
			const status = document.getElementById('cohort-status').value;
			const startDate = (document.getElementById('cohort-start-date')?.value || '').trim();
			const endDate = (document.getElementById('cohort-end-date')?.value || '').trim();
			const format = document.getElementById('cohort-format')?.value || 'online';
			const location = (document.getElementById('cohort-location')?.value || '').trim();
			const capacity = parseInt(document.getElementById('cohort-capacity').value, 10) || 20;
			const tuition = document.getElementById('cohort-tuition').value.trim();
			const schedule = document.getElementById('cohort-schedule').value.trim();
			const isPublic = document.getElementById('cohort-is-public')?.value !== 'false';
			const formUrl = document.getElementById('cohort-form-url').value.trim();

			const rawEmails = (document.getElementById('cohort-student-emails')?.value || '').trim();
			const studentEmails = Array.from(new Set(rawEmails.split('\n').map(e => e.trim().toLowerCase()).filter(e => e.length > 0 && e.includes('@'))));

			const selectedCourse = coursesMap.get(courseId);
			const btnSave = document.getElementById('btn-save-cohort');

			btnSave.disabled = true;
			btnSave.textContent = 'Đang lưu...';

			try {
				const id = generateUUID();
				const isOpen = status === 'open';
				const isOffline = format === 'offline';
				const payload = {
					id,
					courseId,
					courseCode: selectedCourse?.code || '',
					courseTitle: selectedCourse?.title || '',
					code,
					title,
					name: title,
					bootcamp_name: title,
					status,
					is_open: isOpen ? 1 : 0,
					startDate,
					start_date: startDate,
					endDate: endDate || '',
					end_date: endDate || '',
					format,
					offline: isOffline ? 1 : 0,
					location: isOffline ? (location || 'HN') : '',
					isPublic,
					listing: isPublic ? 1 : 0,
					maxCapacity: capacity,
					capacity,
					tuition,
					pricing: tuition,
					schedule,
					formUrl,
					studentEmails,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
					createdBy: currentUser?.email || 'admin'
				};

				await currentDb.collection('cohorts').doc(id).set(payload);

				// Tự động đồng bộ học viên vào authorizedUsers với role: 'member'
				if (Array.isArray(studentEmails) && studentEmails.length > 0) {
					syncCohortStudentsToUsers(currentDb, id, studentEmails, currentUser?.email || 'admin').catch(e => {
						console.warn('[Cohort] Lỗi sync users ngầm:', e);
					});
				}

				showAdminToast(`✅ Đã mở lớp học "${code}" thành công!`, 'success');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 1000);
			} catch (err) {
				showAdminToast(`❌ Lỗi mở lớp: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Tạo Lớp Học Mới';
			}
		});

		async function syncCohortStudentsToUsers(db, cohortId, emails, currentEmail) {
			if (!Array.isArray(emails) || emails.length === 0) return;
			const tasks = emails.map(async raw => {
				const clean = (raw || '').trim().toLowerCase();
				if (!clean || !clean.includes('@')) return;
				const docSnap = await db.collection('authorizedUsers').doc(clean).get().catch(() => null);
				if (docSnap && docSnap.exists) {
					await db.collection('authorizedUsers').doc(clean).set({
						cohortIds: firebase.firestore.FieldValue.arrayUnion(cohortId),
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });
				} else {
					const displayName = clean.split('@')[0];
					await db.collection('authorizedUsers').doc(clean).set({
						id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8),
						primaryEmail: clean,
						emails: [clean],
						displayName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
						role: 'member',
						status: 'active',
						phone: '',
						cohortIds: [cohortId],
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
						updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
						addedBy: currentEmail || 'admin'
					}, { merge: true });
				}
			});
			await Promise.all(tasks);
		}
