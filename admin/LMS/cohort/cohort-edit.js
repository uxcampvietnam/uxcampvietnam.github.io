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
				document.getElementById('cohort-title').value = data.title || data.name || data.bootcamp_name || '';
				document.getElementById('cohort-status').value = data.status || (data.is_open == 1 ? 'open' : 'completed');
				document.getElementById('cohort-start-date').value = data.startDate || data.start_date || '';
				document.getElementById('cohort-format').value = data.format || (data.offline == 1 ? 'offline' : 'online');
				document.getElementById('cohort-location').value = data.location || '';
				document.getElementById('cohort-capacity').value = data.maxCapacity || data.capacity || 20;
				document.getElementById('cohort-tuition').value = data.tuition || data.pricing || '';
				document.getElementById('cohort-schedule').value = data.schedule || '';
				document.getElementById('cohort-is-public').value = data.isPublic !== false && data.listing !== 0 ? 'true' : 'false';
				document.getElementById('cohort-form-url').value = data.formUrl || '';

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
			const startDate = (document.getElementById('cohort-start-date')?.value || '').trim();
			const format = document.getElementById('cohort-format')?.value || 'online';
			const location = (document.getElementById('cohort-location')?.value || '').trim();
			const capacity = parseInt(document.getElementById('cohort-capacity').value, 10) || 20;
			const tuition = document.getElementById('cohort-tuition').value.trim();
			const schedule = document.getElementById('cohort-schedule').value.trim();
			const isPublic = document.getElementById('cohort-is-public')?.value !== 'false';
			const formUrl = document.getElementById('cohort-form-url').value.trim();

			const selectedCourse = coursesMap.get(courseId);
			const btnSave = document.getElementById('btn-save-cohort');

			btnSave.disabled = true;
			btnSave.textContent = 'Đang lưu...';

			try {
				const isOpen = status === 'open';
				const isOffline = format === 'offline';
				const payload = {
					courseId,
					courseCode: selectedCourse?.code || '',
					courseTitle: selectedCourse?.title || '',
					code,
					title,
					name: title,
					bootcamp_name: title,
					bootcamp_id: code,
					status,
					is_open: isOpen ? 1 : 0,
					startDate,
					start_date: startDate,
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
