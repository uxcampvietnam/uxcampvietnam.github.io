window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-case-studies'
		};

		const caseId = (window.adminGetUrlParam && window.adminGetUrlParam('id')) || (new URLSearchParams(window.location.search)).get('id');

		let currentDb = null;

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			if (!caseId) {
				showAdminToast('⚠️ Không tìm thấy id case study!', 'warning');
				setTimeout(() => window.location.href = 'index.html', 1500);
				return;
			}
			await loadCaseData();
		});

		async function loadCaseData() {
			try {
				const doc = await currentDb.collection('caseStudies').doc(caseId).get();
				if (!doc.exists) {
					showAdminToast(`❌ Case study ${caseId} không tồn tại!`, 'error');
					setTimeout(() => window.location.href = 'index.html', 1500);
					return;
				}

				const data = doc.data();
				document.getElementById('case-id').value = doc.id;
				document.getElementById('case-id-label').textContent = `ID: ${doc.id}`;
				document.getElementById('page-title').textContent = `Chỉnh sửa: ${data.title || doc.id}`;
				document.getElementById('breadcrumb-case-name').textContent = data.title || doc.id;

				document.getElementById('case-title').value = data.title || '';
				document.getElementById('case-author').value = data.author || data.studentName || '';
				document.getElementById('case-thumbnail').value = data.thumbnail || '';
				document.getElementById('case-published').value = data.published !== false ? 'true' : 'false';
				document.getElementById('case-figma').value = data.figmaUrl || '';
				document.getElementById('case-presentation').value = data.presentationUrl || '';
				document.getElementById('case-summary').value = data.summary || data.desc || '';
				document.getElementById('case-content').value = data.content || '';

			} catch (err) {
				showAdminToast(`❌ Lỗi tải dữ liệu: ${err.message}`, 'error');
			}
		}

		document.getElementById('edit-case-form').addEventListener('submit', async function(e) {
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
				const payload = {
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
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				};

				await currentDb.collection('caseStudies').doc(caseId).set(payload, { merge: true });
				showAdminToast(`✅ Đã cập nhật case study "${title}"!`, 'success');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Cập Nhật Thay Đổi';
			} catch (err) {
				showAdminToast(`❌ Lỗi cập nhật: ${err.message}`, 'error');
				btnSave.disabled = false;
				btnSave.textContent = '💾 Cập Nhật Thay Đổi';
			}
		});
