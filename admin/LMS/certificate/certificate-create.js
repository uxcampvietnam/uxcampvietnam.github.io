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

		let currentDb = null;
		let currentUser = null;
		let coursesMap = new Map();
		let cohortsMap = new Map();

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			currentUser = e.detail.user;

			// Init default date & uuid
			document.getElementById('cert-date').value = new Date().toISOString().slice(0, 10);
			regenUUID();

			await loadSelects();
		});

		function regenUUID() {
			const u = generateUUID();
			document.getElementById('cert-uuid').value = u;
			document.getElementById('cert-preview-link').textContent = `https://uxcamp.vn/certificate/index.html?id=${u}`;
		}
		document.getElementById('btn-regen-uuid').onclick = regenUUID;

		async function loadSelects() {
			try {
				const [coursesSnap, cohortsSnap] = await Promise.all([
					currentDb.collection('courses').get(),
					currentDb.collection('cohorts').get()
				]);

				const courseSelect = document.getElementById('cert-course');
				coursesSnap.forEach(doc => {
					const data = doc.data();
					coursesMap.set(doc.id, data);
					const opt = document.createElement('option');
					opt.value = doc.id;
					opt.textContent = `${data.code ? `[${data.code}] ` : ''}${data.title || doc.id}`;
					courseSelect.appendChild(opt);
				});

				const cohortSelect = document.getElementById('cert-cohort');
				cohortsSnap.forEach(doc => {
					const data = doc.data();
					cohortsMap.set(doc.id, data);
					const opt = document.createElement('option');
					opt.value = doc.id;
					opt.textContent = `${data.code ? `[${data.code}] ` : ''}${data.title || doc.id}`;
					cohortSelect.appendChild(opt);
				});
			} catch (err) {
				console.warn('Could not load select data:', err);
			}
		}

		document.getElementById('create-cert-form').addEventListener('submit', async function(e) {
			e.preventDefault();
			const studentName = document.getElementById('cert-student-name').value.trim();
			const studentEmail = document.getElementById('cert-student-email').value.trim().toLowerCase();
			const courseId = document.getElementById('cert-course').value;
			const cohortId = document.getElementById('cert-cohort').value;
			const date = document.getElementById('cert-date').value;
			const uuid = document.getElementById('cert-uuid').value.trim();
			const project = document.getElementById('cert-project').value.trim();

			const selectedCourse = coursesMap.get(courseId);
			const selectedCohort = cohortsMap.get(cohortId);
			const btnSave = document.getElementById('btn-save-cert');

			btnSave.disabled = true;
			btnSave.textContent = 'Đang phát hành...';

			try {
				const payload = {
					id: uuid,
					certificateId: uuid,
					uuid: uuid,
					studentName,
					name: studentName,
					studentEmail,
					email: studentEmail,
					courseId,
					courseCode: selectedCourse?.code || '',
					courseTitle: selectedCourse?.title || '',
					cohortId: cohortId || '',
					cohortCode: selectedCohort?.code || '',
					cohortTitle: selectedCohort?.title || '',
					issueDate: date,
					graduationDate: date,
					finalProject: project,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					issuedBy: currentUser?.email || 'admin'
				};

				await currentDb.collection('certificates').doc(uuid).set(payload);
				showAdminToast(`✅ Đã cấp chứng chỉ thành công cho "${studentName}"!`, 'success');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 1000);
			} catch (err) {
				showAdminToast(`❌ Lỗi cấp chứng chỉ: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '🎓 Phát Hành Chứng Chỉ';
			}
		});
