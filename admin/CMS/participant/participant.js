window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-participants'
		};

		function generateUUID() {
			if (window.adminGenerateUUID) return window.adminGenerateUUID('pt');
			return 'pt_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		let allParts = [];
		let currentDb = null;

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			await loadParticipants();
			initEvents();
		});

		async function loadParticipants() {
			const container = document.getElementById('parts-list-container');
			try {
				const snapshot = await currentDb.collection('participants').get();
				allParts = [];
				snapshot.forEach(doc => {
					allParts.push({ id: doc.id, ...doc.data() });
				});

				renderPartsTable();
			} catch (err) {
				if (container) {
					container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải dữ liệu: ${err.message}</div>`;
				}
			}
		}

		function renderPartsTable() {
			const container = document.getElementById('parts-list-container');
			const query = (document.getElementById('search-parts')?.value || '').trim().toLowerCase();

			let list = allParts;
			if (query) {
				list = list.filter(p =>
					(p.name && p.name.toLowerCase().includes(query)) ||
					(p.role && p.role.toLowerCase().includes(query)) ||
					(p.company && p.company.toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state p-4 text-center">
						<span class="font-sans-caption">Chưa có người tham dự nào phù hợp.</span>
						<div class="mt-2"><button type="button" class="btn-admin btn-admin-primary btn-admin-sm" onclick="openAddPart()">+ Thêm Mới</button></div>
					</div>
				`;
				return;
			}

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 50px;">Ảnh</th>
							<th>Họ và Tên</th>
							<th>Chức danh / Role</th>
							<th>Công ty</th>
							<th style="width: 100px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(p => `
							<tr>
								<td>
									<img src="${adminEscapeHtml(p.avatar || p.photoUrl || p.image || '../../../asset/icon/user-circle.svg')}" alt="avatar" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 0.5px solid var(--console-stroke);">
								</td>
								<td><span class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(p.name || 'Người tham dự')}</span></td>
								<td class="font-sans-caption" style="color: var(--main-colors-foreground-f600);">${adminEscapeHtml(p.role || p.title || '—')}</td>
								<td class="font-sans-caption">${adminEscapeHtml(p.company || '—')}</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<button class="btn-icon-action" title="Sửa" onclick="openEditPart('${adminEscapeHtml(p.id)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
										<button class="btn-icon-action delete" title="Xóa" onclick="deletePart('${adminEscapeHtml(p.id)}', '${adminEscapeHtml(p.name)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
										</button>
									</div>
								</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
			`;
		}

		window.openAddPart = function() {
			document.getElementById('part-id').value = '';
			document.getElementById('part-name').value = '';
			document.getElementById('part-role').value = '';
			document.getElementById('part-avatar').value = '';
			document.getElementById('part-company').value = '';
			document.getElementById('modal-part-title').textContent = 'Thêm Người Tham Dự 3D Mới';
			document.getElementById('modal-participant').classList.add('open');
		};

		window.openEditPart = function(id) {
			const item = allParts.find(p => p.id === id);
			if (!item) return;
			document.getElementById('part-id').value = item.id;
			document.getElementById('part-name').value = item.name || '';
			document.getElementById('part-role').value = item.role || item.title || '';
			document.getElementById('part-avatar').value = item.avatar || item.photoUrl || '';
			document.getElementById('part-company').value = item.company || '';
			document.getElementById('modal-part-title').textContent = `Chỉnh sửa: ${item.name || id}`;
			document.getElementById('modal-participant').classList.add('open');
		};

		window.deletePart = async function(id, name) {
			if (!confirm(`Xóa người tham dự "${name}"?`)) return;
			try {
				await currentDb.collection('participants').doc(id).delete();
				showAdminToast(`✅ Đã xóa "${name}"`, 'success');
				await loadParticipants();
			} catch (err) {
				showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
			}
		};

		function initEvents() {
			document.getElementById('btn-open-add-part')?.addEventListener('click', openAddPart);
			document.getElementById('search-parts')?.addEventListener('input', renderPartsTable);

			document.querySelectorAll('.btn-close-modal').forEach(b => {
				b.onclick = () => document.getElementById('modal-participant').classList.remove('open');
			});

			document.getElementById('form-participant')?.addEventListener('submit', async function(e) {
				e.preventDefault();
				const id = document.getElementById('part-id').value.trim() || generateUUID();
				const name = document.getElementById('part-name').value.trim();
				const role = document.getElementById('part-role').value.trim();
				const avatar = document.getElementById('part-avatar').value.trim();
				const company = document.getElementById('part-company').value.trim();

				try {
					await currentDb.collection('participants').doc(id).set({
						id,
						name,
						role,
						avatar,
						company,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					showAdminToast(`✅ Đã lưu thông tin người tham dự!`, 'success');
					document.getElementById('modal-participant').classList.remove('open');
					await loadParticipants();
				} catch (err) {
					showAdminToast(`❌ Lỗi lưu: ${err.message}`, 'error');
				}
			});

			document.getElementById('btn-export-parts')?.addEventListener('click', () => {
				const filename = `participants_backup_${new Date().toISOString().slice(0, 10)}.json`;
				if (window.adminExportJson) {
					window.adminExportJson(allParts, filename);
				} else {
					const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allParts, null, 2));
					const dlAnchor = document.createElement('a');
					dlAnchor.setAttribute("href", dataStr);
					dlAnchor.setAttribute("download", filename);
					document.body.appendChild(dlAnchor);
					dlAnchor.click();
					dlAnchor.remove();
				}
			});
		}
