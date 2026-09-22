window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-courses'
		};

		const urlParams = new URLSearchParams(window.location.search);
		const courseId = urlParams.get('id');

		let currentDb = null;

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			if (!courseId) {
				showAdminToast('⚠️ Không tìm thấy tham số id khóa học!', 'warning');
				setTimeout(() => window.location.href = 'index.html', 1500);
				return;
			}
			await loadCourseData();
		});

		async function loadCourseData() {
			try {
				const doc = await currentDb.collection('courses').doc(courseId).get();
				if (!doc.exists) {
					showAdminToast(`❌ Khóa học ${courseId} không tồn tại trên hệ thống!`, 'error');
					setTimeout(() => window.location.href = 'index.html', 1500);
					return;
				}

				const data = doc.data();
				document.getElementById('course-id').value = doc.id;
				document.getElementById('course-id-label').textContent = `ID: ${doc.id}`;
				document.getElementById('page-title').textContent = `Chỉnh sửa: ${data.title || doc.id}`;
				document.getElementById('breadcrumb-course-name').textContent = data.title || doc.id;
				document.getElementById('link-view-detail').href = `detail.html?id=${encodeURIComponent(doc.id)}`;

				document.getElementById('course-code').value = data.code || '';
				document.getElementById('course-title').value = data.title || '';
				document.getElementById('course-delivery').value = data.delivery || 'online';
				document.getElementById('course-status').value = data.status || 'active';
				document.getElementById('course-duration').value = data.durationHours || data.duration || 36;
				document.getElementById('course-slug').value = data.slug || '';
				document.getElementById('course-public').value = data.isPublic !== false ? 'true' : 'false';
				document.getElementById('course-tagline').value = data.tagline || '';
				document.getElementById('course-url').value = data.url || '';
				document.getElementById('course-skills').value = Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || '');
				document.getElementById('course-desc').value = data.desc || '';

			} catch (err) {
				showAdminToast(`❌ Lỗi tải dữ liệu: ${err.message}`, 'error');
			}
		}

		document.getElementById('edit-course-form').addEventListener('submit', async function(e) {
			e.preventDefault();
			const code = document.getElementById('course-code').value.trim().toUpperCase();
			const title = document.getElementById('course-title').value.trim();
			const delivery = document.getElementById('course-delivery').value;
			const status = document.getElementById('course-status').value;
			const duration = parseInt(document.getElementById('course-duration').value, 10) || 36;
			const slug = document.getElementById('course-slug').value.trim();
			const isPublic = document.getElementById('course-public').value === 'true';
			const tagline = document.getElementById('course-tagline').value.trim();
			const url = document.getElementById('course-url').value.trim();
			const skillsRaw = document.getElementById('course-skills').value.trim();
			const desc = document.getElementById('course-desc').value.trim();

			const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
			const btnSave = document.getElementById('btn-save-course');

			btnSave.disabled = true;
			btnSave.textContent = 'Đang lưu...';

			try {
				const payload = {
					code,
					title,
					delivery,
					status,
					durationHours: duration,
					duration,
					slug,
					isPublic,
					tagline,
					url,
					skills,
					desc,
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				};

				await currentDb.collection('courses').doc(courseId).set(payload, { merge: true });
				showAdminToast(`✅ Đã cập nhật khóa học "${title}"!`, 'success');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Cập Nhật Thay Đổi';
			} catch (err) {
				showAdminToast(`❌ Lỗi lưu thay đổi: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Cập Nhật Thay Đổi';
			}
		});
