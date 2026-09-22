window.ADMIN_CONFIG = {
			root: '../../../',
			activeTab: 'tab-books'
		};

		function generateUUID() {
			if (window.adminGenerateUUID) return window.adminGenerateUUID('bk');
			return 'bk_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
		}

		let allBooks = [];
		let currentDb = null;

		window.addEventListener('adminReady', async (e) => {
			currentDb = e.detail.db;
			await loadBooks();
			initEvents();
		});

		async function loadBooks() {
			const container = document.getElementById('books-list-container');
			try {
				const snapshot = await currentDb.collection('books').get();
				allBooks = [];
				snapshot.forEach(doc => {
					allBooks.push({ id: doc.id, ...doc.data() });
				});

				renderBooksTable();
			} catch (err) {
				if (container) {
					container.innerHTML = `<div class="empty-state p-4 text-center text-danger">Lỗi tải sách: ${err.message}</div>`;
				}
			}
		}

		function renderBooksTable() {
			const container = document.getElementById('books-list-container');
			const query = (document.getElementById('search-books')?.value || '').trim().toLowerCase();

			let list = allBooks;
			if (query) {
				list = list.filter(b =>
					(b.title && b.title.toLowerCase().includes(query)) ||
					(b.author && b.author.toLowerCase().includes(query)) ||
					(b.category && b.category.toLowerCase().includes(query))
				);
			}

			if (list.length === 0) {
				container.innerHTML = `
					<div class="empty-state p-4 text-center">
						<span class="font-sans-caption">Chưa có đầu sách nào phù hợp. Bấm "Đồng bộ từ books-data.json" để nạp sẵn danh sách.</span>
						<div class="mt-2"><button type="button" class="btn-admin btn-admin-primary btn-admin-sm" onclick="openAddBook()">+ Thêm Sách Mới</button></div>
					</div>
				`;
				return;
			}

			container.innerHTML = `
				<table class="user-table">
					<thead>
						<tr>
							<th style="width: 50px;">Bìa</th>
							<th>Tựa Sách</th>
							<th>Tác Giả</th>
							<th>Kệ Sách / Thể Loại</th>
							<th style="width: 100px; text-align: right;">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						${list.map(b => `
							<tr>
								<td>
									${b.coverUrl || b.cover || b.image ? `<img src="${adminEscapeHtml(b.coverUrl || b.cover || b.image)}" alt="cover" style="width: 32px; height: 44px; object-fit: cover; border-radius: 3px; border: 0.5px solid var(--console-stroke);">` : `<div style="width: 32px; height: 44px; background: var(--body-background-elevate-2); border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 14px;">📚</div>`}
								</td>
								<td>
									<div class="font-sans-caption fw-semibold" style="color: var(--main-colors-foreground-f100);">${adminEscapeHtml(b.title || 'Untitled Book')}</div>
									${b.desc ? `<div class="font-sans-small text-truncate" style="color: var(--main-colors-foreground-f700); max-width: 380px;">${adminEscapeHtml(b.desc)}</div>` : ''}
								</td>
								<td class="font-sans-caption">${adminEscapeHtml(b.author || '—')}</td>
								<td><span class="admin-tag admin-tag-accent">${adminEscapeHtml(b.category || b.shelf || 'General')}</span></td>
								<td style="text-align: right;">
									<div class="d-inline-flex gap-1 align-items-center">
										<button class="btn-icon-action" title="Sửa" onclick="openEditBook('${adminEscapeHtml(b.id)}')">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
										</button>
										<button class="btn-icon-action delete" title="Xóa" onclick="deleteBook('${adminEscapeHtml(b.id)}', '${adminEscapeHtml(b.title)}')">
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

		window.openAddBook = function() {
			document.getElementById('book-id').value = '';
			document.getElementById('book-title').value = '';
			document.getElementById('book-author').value = '';
			document.getElementById('book-category').value = '';
			document.getElementById('book-cover').value = '';
			document.getElementById('book-url').value = '';
			document.getElementById('book-desc').value = '';
			document.getElementById('modal-book-title').textContent = 'Thêm Đầu Sách Mới';
			document.getElementById('modal-book').classList.add('open');
		};

		window.openEditBook = function(id) {
			const item = allBooks.find(b => b.id === id);
			if (!item) return;
			document.getElementById('book-id').value = item.id;
			document.getElementById('book-title').value = item.title || '';
			document.getElementById('book-author').value = item.author || '';
			document.getElementById('book-category').value = item.category || item.shelf || '';
			document.getElementById('book-cover').value = item.coverUrl || item.cover || item.image || '';
			document.getElementById('book-url').value = item.url || item.link || '';
			document.getElementById('book-desc').value = item.desc || '';
			document.getElementById('modal-book-title').textContent = `Chỉnh sửa: ${item.title || id}`;
			document.getElementById('modal-book').classList.add('open');
		};

		window.deleteBook = async function(id, title) {
			if (!confirm(`Xóa sách "${title}"?`)) return;
			try {
				await currentDb.collection('books').doc(id).delete();
				showAdminToast(`✅ Đã xóa "${title}"`, 'success');
				await loadBooks();
			} catch (err) {
				showAdminToast(`❌ Lỗi xóa: ${err.message}`, 'error');
			}
		};

		function initEvents() {
			document.getElementById('btn-open-add-book')?.addEventListener('click', openAddBook);
			document.getElementById('search-books')?.addEventListener('input', renderBooksTable);

			document.querySelectorAll('.btn-close-modal').forEach(b => {
				b.onclick = () => document.getElementById('modal-book').classList.remove('open');
			});

			document.getElementById('form-book')?.addEventListener('submit', async function(e) {
				e.preventDefault();
				const id = document.getElementById('book-id').value.trim() || generateUUID();
				const title = document.getElementById('book-title').value.trim();
				const author = document.getElementById('book-author').value.trim();
				const category = document.getElementById('book-category').value.trim();
				const coverUrl = document.getElementById('book-cover').value.trim();
				const url = document.getElementById('book-url').value.trim();
				const desc = document.getElementById('book-desc').value.trim();

				try {
					await currentDb.collection('books').doc(id).set({
						id,
						title,
						author,
						category,
						shelf: category,
						coverUrl,
						url,
						desc,
						updatedAt: firebase.firestore.FieldValue.serverTimestamp()
					}, { merge: true });

					showAdminToast(`✅ Đã lưu đầu sách!`, 'success');
					document.getElementById('modal-book').classList.remove('open');
					await loadBooks();
				} catch (err) {
					showAdminToast(`❌ Lỗi lưu: ${err.message}`, 'error');
				}
			});

			// Sync from books-data.json
			document.getElementById('btn-sync-books')?.addEventListener('click', async () => {
				if (!confirm('Đồng bộ sách từ script/books-data.json lên Firestore?')) return;
				try {
					const res = await fetch('../../../script/books-data.json');
					if (!res.ok) throw new Error('Không thể tải file books-data.json');
					const data = await res.json();
					const books = data.books || data;
					if (Array.isArray(books)) {
						const batch = currentDb.batch();
						books.forEach(b => {
							const bid = b.id || generateUUID();
							const ref = currentDb.collection('books').doc(bid);
							batch.set(ref, {
								id: bid,
								title: b.title || 'Untitled',
								author: b.author || '',
								category: b.category || b.shelf || 'General',
								coverUrl: b.cover || b.coverUrl || '',
								url: b.url || b.link || '',
								desc: b.desc || '',
								updatedAt: firebase.firestore.FieldValue.serverTimestamp()
							}, { merge: true });
						});
						await batch.commit();
						showAdminToast(`✅ Đã đồng bộ ${books.length} cuốn sách lên Firestore!`, 'success');
						await loadBooks();
					}
				} catch (err) {
					showAdminToast(`❌ Lỗi đồng bộ: ${err.message}`, 'error');
				}
			});
		}
