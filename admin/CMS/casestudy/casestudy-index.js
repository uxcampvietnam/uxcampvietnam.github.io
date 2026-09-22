window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-case-studies'
		};

		let allCases = [];
		let currentDb = null;

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			await loadCaseStudies();
			initEvents();
		});

		async function loadCaseStudies() {
			const container = document.getElementById('cases-list-container');
			try {
				const snapshot = await currentDb.collection('caseStudies').get();
				allCases = [];
				snapshot.forEach(doc => {
					allCases.push({ id: doc.id, ...doc.data() });
				});

				renderCasesTable();
			} catch (err) {
				if (container) {
					container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải case studies: ${err.message}</div>`;
				}
			}
		}

		function renderCasesTable() {
			const container = document.getElementById('cases-list-container');
			const query = (document.getElementById('search-cases')?.value || '').trim().toLowerCase();

			let list = allCases;
			if (query) {
				list = list.filter(c =>
					(c.title && c.title.toLowerCase().includes(query)) ||
					(c.author && c.author.toLowerCase().includes(query)) ||
					(c.summary && c.summary.toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state p-4 text-center">
						<span class="font-sans-caption">Chưa có bài viết case study nào phù hợp.</span>
						<div class="mt-2"><a href="create.html" class="btn-admin btn-admin-primary btn-admin-sm">+ Thêm Case Study Mới</a></div>
					</div>
				`;
				return;
			}

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 60px;">Ảnh</th>
							<th>Tiêu đề & Tóm tắt</th>
							<th style="width: 150px;">Tác giả / Học viên</th>
							<th style="width: 100px; text-align: center;">Trạng thái</th>
							<th style="width: 100px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(c => `
							<tr>
								<td>
									${c.thumbnail ? `<img src="${adminEscapeHtml(c.thumbnail)}" alt="thumb" style="width: 44px; height: 32px; object-fit: cover; border-radius: 4px; border: 0.5px solid var(--console-stroke);">` : `<div style="width: 44px; height: 32px; background: var(--body-background-elevate-2); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 14px;">💼</div>`}
								</td>
								<td>
									<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(c.title || 'Untitled Case Study')}</div>
									<div class="font-sans-small text-truncate" style="color: var(--main-colors-foreground-f700); max-width: 420px;">${adminEscapeHtml(c.summary || c.desc || '')}</div>
								</td>
								<td class="font-sans-caption">${adminEscapeHtml(c.author || c.studentName || '—')}</td>
								<td style="text-align: center;">
									${c.published !== false ? '<span class="admin-tag admin-tag-success">Published</span>' : '<span class="admin-tag admin-tag-neutral">Draft</span>'}
								</td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<a href="edit.html?id=${encodeURIComponent(c.id)}" class="btn-icon-action" title="Sửa bài">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</a>
										<button class="btn-icon-action delete" title="Xóa" onclick="deleteCase('${adminEscapeHtml(c.id)}', '${adminEscapeHtml(c.title)}')">
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

		window.deleteCase = async function(id, title) {
			if (!confirm(`Bạn có chắc muốn xóa case study "${title}"?`)) return;
			try {
				await currentDb.collection('caseStudies').doc(id).delete();
				showAdminToast(`✅ Đã xóa case study "${title}"`, 'success');
				await loadCaseStudies();
			} catch (err) {
				showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
			}
		};

		function initEvents() {
			document.getElementById('search-cases')?.addEventListener('input', renderCasesTable);

			document.getElementById('btn-export-cases')?.addEventListener('click', () => {
				const filename = `casestudies_backup_${new Date().toISOString().slice(0, 10)}.json`;
				if (window.adminExportJson) {
					window.adminExportJson(allCases, filename);
				} else {
					const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCases, null, 2));
					const dlAnchor = document.createElement('a');
					dlAnchor.setAttribute("href", dataStr);
					dlAnchor.setAttribute("download", filename);
					document.body.appendChild(dlAnchor);
					dlAnchor.click();
					dlAnchor.remove();
				}
			});
		}
