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
			const trainer = document.getElementById('cohort-trainer').value.trim();
			const capacity = parseInt(document.getElementById('cohort-capacity').value, 10) || 20;
			const tuition = document.getElementById('cohort-tuition').value.trim();
			const schedule = document.getElementById('cohort-schedule').value.trim();
			const formUrl = document.getElementById('cohort-form-url').value.trim();
			const notes = document.getElementById('cohort-notes').value.trim();

			const selectedCourse = coursesMap.get(courseId);
			const btnSave = document.getElementById('btn-save-cohort');

			btnSave.disabled = true;
			btnSave.textContent = 'Đang lưu...';

			try {
				const id = generateUUID();
				const payload = {
					id,
					courseId,
					courseCode: selectedCourse?.code || '',
					courseTitle: selectedCourse?.title || '',
					code,
					title,
					name: title,
					status,
					instructor: trainer,
					trainer: trainer,
					maxCapacity: capacity,
					capacity,
					currentStudents: 0,
					tuition,
					schedule,
					formUrl,
					notes,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
					createdBy: currentUser?.email || 'admin'
				};

				await currentDb.collection('cohorts').doc(id).set(payload);
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
