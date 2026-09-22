window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-case-studies'
		};

		function generateUUID() {
			if (window.adminGenerateUUID) return window.adminGenerateUUID('cs');
			return 'cs_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		let currentDb = null;
		let currentUser = null;

		window.addEventListener('adminReady', (e) => {
			currentDb = e.detail.db;
			currentUser = e.detail.user;
		});

		document.getElementById('create-case-form').addEventListener('submit', async function(e) {
			e.preventDefault();
			const title = document.getElementById('case-title').value.trim();
			const author = document.getElementById('case-author').value.trim();
			const thumbnail = document.getElementById('case-thumbnail').value.trim();
			const published = document.getElementById('case-published').value === 'true';
			const figma = document.getElementById('case-figma').value.trim();
			const presentation = document.getElementById('case-presentation').value.trim();
			const summary = document.getElementById('case-summary').value.trim();
			const content = document.getElementById('case-content').value.trim();

			const btnSave = document.getElementById('btn-save-case');
			btnSave.disabled = true;
			btnSave.textContent = 'Đang lưu...';

			try {
				const id = generateUUID();
				const payload = {
					id,
					title,
					author,
					studentName: author,
					thumbnail,
					published,
					figmaUrl: figma,
					presentationUrl: presentation,
					summary,
					desc: summary,
					content,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
					createdBy: currentUser?.email || 'admin'
				};

				await currentDb.collection('caseStudies').doc(id).set(payload);
				showAdminToast(`✅ Đã thêm case study "${title}"!`, 'success');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 1000);
			} catch (err) {
				showAdminToast(`❌ Lỗi tạo case study: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Lưu Bài Viết Case Study';
			}
		});
