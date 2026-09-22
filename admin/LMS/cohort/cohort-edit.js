window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-cohorts'
		};

		const urlParams = new URLSearchParams(window.location.search);
		const cohortId = urlParams.get('id');

		let currentDb = null;
		let coursesMap = new Map();

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			if (!cohortId) {
				showAdminToast('⚠️ Không tìm thấy id lớp học!', 'warning');
				setTimeout(() => window.location.href = 'index.html', 1500);
				return;
			}
			await loadCoursesSelect();
			await loadCohortData();
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
					select.appendChild(opt);
				});
			} catch (err) {
				console.warn('Could not load courses:', err);
			}
		}

		async function loadCohortData() {
			try {
				const doc = await currentDb.collection('cohorts').doc(cohortId).get();
				if (!doc.exists) {
					showAdminToast(`❌ Lớp học ${cohortId} không tồn tại!`, 'error');
					setTimeout(() => window.location.href = 'index.html', 1500);
					return;
				}

				const data = doc.data();
				document.getElementById('cohort-id').value = doc.id;
				document.getElementById('cohort-id-label').textContent = `ID: ${doc.id}`;
				document.getElementById('page-title').textContent = `Chỉnh sửa: ${data.code || data.title || doc.id}`;
				document.getElementById('breadcrumb-cohort-name').textContent = data.code || doc.id;

				if (data.courseId) document.getElementById('cohort-course').value = data.courseId;
				document.getElementById('cohort-code').value = data.code || '';
				document.getElementById('cohort-title').value = data.title || data.name || '';
				document.getElementById('cohort-status').value = data.status || 'open';
				document.getElementById('cohort-trainer').value = data.instructor || data.trainer || '';
				document.getElementById('cohort-capacity').value = data.maxCapacity || data.capacity || 20;
				document.getElementById('cohort-current-students').value = data.currentStudents || 0;
				document.getElementById('cohort-tuition').value = data.tuition || '';
				document.getElementById('cohort-schedule').value = data.schedule || '';
				document.getElementById('cohort-form-url').value = data.formUrl || '';
				document.getElementById('cohort-notes').value = data.notes || '';

			} catch (err) {
				showAdminToast(`❌ Lỗi tải dữ liệu: ${err.message}`, 'error');
			}
		}

		document.getElementById('edit-cohort-form').addEventListener('submit', async function(e) {
			e.preventDefault();
			const courseId = document.getElementById('cohort-course').value;
			const code = document.getElementById('cohort-code').value.trim().toUpperCase();
			const title = document.getElementById('cohort-title').value.trim();
			const status = document.getElementById('cohort-status').value;
			const trainer = document.getElementById('cohort-trainer').value.trim();
			const capacity = parseInt(document.getElementById('cohort-capacity').value, 10) || 20;
			const currentStudents = parseInt(document.getElementById('cohort-current-students').value, 10) || 0;
			const tuition = document.getElementById('cohort-tuition').value.trim();
			const schedule = document.getElementById('cohort-schedule').value.trim();
			const formUrl = document.getElementById('cohort-form-url').value.trim();
			const notes = document.getElementById('cohort-notes').value.trim();

			const selectedCourse = coursesMap.get(courseId);
			const btnSave = document.getElementById('btn-save-cohort');

			btnSave.disabled = true;
			btnSave.textContent = 'Đang lưu...';

			try {
				const payload = {
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
					currentStudents,
					tuition,
					schedule,
					formUrl,
					notes,
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				};

				await currentDb.collection('cohorts').doc(cohortId).set(payload, { merge: true });
				showAdminToast(`✅ Đã cập nhật lớp học "${code}"!`, 'success');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Cập Nhật Lớp Học';
			} catch (err) {
				showAdminToast(`❌ Lỗi cập nhật: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Cập Nhật Lớp Học';
			}
		});
