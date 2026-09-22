window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-courses'
		};

		function generateUUID() {
			if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
			return 'crs_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		let currentDb = null;
		let currentUser = null;

		window.addEventListener('adminReady', (e) => {
			currentDb = e.detail.db;
			currentUser = e.detail.user;
		});

		// Auto generate slug from title
		document.getElementById('course-title').addEventListener('input', function() {
			const slugInput = document.getElementById('course-slug');
			if (!slugInput.value || slugInput.dataset.manual !== 'true') {
				slugInput.value = this.value
					.toLowerCase()
					.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
					.replace(/[đĐ]/g, 'd')
					.replace(/[^a-z0-9\s-]/g, '')
					.trim()
					.replace(/\s+/g, '-');
			}
		});

		document.getElementById('course-slug').addEventListener('input', function() {
			this.dataset.manual = 'true';
		});

		document.getElementById('create-course-form').addEventListener('submit', async function(e) {
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
				const id = generateUUID();
				const payload = {
					id,
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
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
					createdBy: currentUser?.email || 'admin'
				};

				await currentDb.collection('courses').doc(id).set(payload);
				showAdminToast(`✅ Đã tạo khóa học "${title}" thành công!`, 'success');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 1000);
			} catch (err) {
				showAdminToast(`❌ Lỗi tạo khóa học: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Lưu Khóa Học Lên Database';
			}
		});
