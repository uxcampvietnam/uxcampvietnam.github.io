window.ADMIN_CONFIG = {
	root: '../../../',
	activeTab: 'tab-knowledge'
};

// =========================================================================
// GLOBAL STATE
// =========================================================================
let nodesData = [];
let nodesMap = new Map(); // id -> node
let selectedNodeIds = new Set();
let lastClickedIndex = null;
let currentDragState = null;
let currentValidationFilter = 'ALL'; // ALL, UNVALIDATED, VALIDATED
let unsavedChangesCount = 0;
let currentDb = null;

// Connection chips selection & clipboard state
let selectedChips = new Map(); // key `${nodeIndex}_${connIdx}_${targetId}` -> { nodeIndex, connIdx, targetId }
let lastClickedChip = null; // { nodeIndex, connIdx, targetId, key }
let activeDropZoneIndex = null; // nodeIndex of active drop zone
let chipClipboard = null; // { action: 'copy' | 'cut', chips: [...] }

function getChipKey(nodeIndex, connIdx, targetId) {
	return `${nodeIndex}_${connIdx}_${targetId}`;
}

function clearChipSelection() {
	selectedChips.clear();
	lastClickedChip = null;
	updateChipSelectionUI();
	updateChipActionToolbar();
}

function updateChipSelectionUI() {
	document.querySelectorAll('.conn-chip').forEach(el => {
		const key = el.dataset.chipKey;
		el.classList.toggle('selected', selectedChips.has(key));
	});
	document.querySelectorAll('.connections-drop-zone').forEach(zone => {
		const idx = parseInt(zone.dataset.nodeIndex, 10);
		zone.classList.toggle('active-zone', idx === activeDropZoneIndex);
	});
}

function updateChipActionToolbar() {
	const bar = document.getElementById('chipActionToolbar');
	const countEl = document.getElementById('chipSelCount');
	if (!bar || !countEl) return;
	const count = selectedChips.size;
	if (count > 0) {
		bar.style.display = 'inline-flex';
		countEl.textContent = count;
	} else {
		bar.style.display = 'none';
	}
}

let initialNodesSnapshot = new Map(); // id -> string fingerprint
let deletedInitialNodeIds = new Set(); // Set các id ban đầu đã bị xóa

function formatHexColor(color) {
	if (!color) return '#ffb703';
	color = String(color).trim();
	if (!color.startsWith('#') && /^[0-9a-fA-F]{6}$/.test(color)) color = '#' + color;
	if (/^#[0-9a-fA-F]{6}$/.test(color)) return color.toLowerCase();
	if (/^#[0-9a-fA-F]{3}$/.test(color)) {
		const r = color[1], g = color[2], b = color[3];
		return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
	}
	return '#ffb703';
}

function getNodeFingerprint(node) {
	if (!node) return '';
	const conns = Array.isArray(node.connections) ? [...node.connections].sort() : [];
	return JSON.stringify({
		label: String(node.label || '').trim(),
		level: parseInt(node.level, 10) || 3,
		desc: String(node.desc || '').trim(),
		connections: conns,
		color: formatHexColor(node.color),
		validated: Boolean(node.validated)
	});
}

function updateDirtyState() {
	let modifiedCount = 0;
	let newCount = 0;
	let deletedCount = deletedInitialNodeIds.size;

	nodesData.forEach(node => {
		if (!initialNodesSnapshot.has(node.id)) {
			newCount++;
		} else {
			const initialFp = initialNodesSnapshot.get(node.id);
			const currentFp = getNodeFingerprint(node);
			if (initialFp !== currentFp) {
				modifiedCount++;
			}
		}
	});

	unsavedChangesCount = modifiedCount + newCount + deletedCount;

	const badge = document.getElementById('dirtyBadge');
	const countEl = document.getElementById('dirtyCount');
	if (badge && countEl) {
		countEl.textContent = unsavedChangesCount;
		if (unsavedChangesCount > 0) {
			badge.classList.add('show');
			const details = [];
			if (newCount > 0) details.push(`${newCount} node mới`);
			if (modifiedCount > 0) details.push(`${modifiedCount} node sửa`);
			if (deletedCount > 0) details.push(`${deletedCount} node đã xóa`);
			badge.title = details.join(', ');
		} else {
			badge.classList.remove('show');
			badge.removeAttribute('title');
		}
	}

	return unsavedChangesCount;
}

function markDirty() {
	return updateDirtyState();
}

window.addEventListener('beforeunload', (e) => {
	if (unsavedChangesCount > 0) {
		e.preventDefault();
		e.returnValue = 'Bạn có thay đổi chưa lưu lên Firebase. Bạn có chắc muốn rời đi?';
	}
});

// Helper UUID
function generateUUID() {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function rebuildNodesMap() {
	nodesMap.clear();
	nodesData.forEach(n => nodesMap.set(n.id, n));
}

// =========================================================================
// FIREBASE LOAD & SAVE
// =========================================================================
window.addEventListener('adminReady', async (e) => {
	currentDb = e.detail.db;
	await loadNodesFromFirebase();
	initEvents();
	initMarqueeSelection();
});

async function loadNodesFromFirebase() {
	try {
		let snapshot = await currentDb.collection('knowledgeNodes').get();
		if (snapshot.empty) {
			snapshot = await currentDb.collection('knowledge_nodes').get();
		}

		if (!snapshot.empty) {
			nodesData = [];
			snapshot.forEach(doc => {
				const d = doc.data();
				nodesData.push({
					id: doc.id,
					label: d.label || doc.id,
					level: parseInt(d.level, 10) || 3,
					desc: d.desc || '',
					connections: Array.isArray(d.connections) ? d.connections : (d.connections ? String(d.connections).split(/[;,]/).map(s => s.trim()).filter(Boolean) : []),
					color: d.color || '#ffb703',
					validated: d.validated === true || d.validated === 'true'
				});
			});
			showAdminToast(`✅ Đã nạp ${nodesData.length} node từ Firebase Firestore!`, 'success');

			initialNodesSnapshot.clear();
			deletedInitialNodeIds.clear();
			nodesData.forEach(n => {
				initialNodesSnapshot.set(n.id, getNodeFingerprint(n));
			});
		} else {
			// Fallback sang knowledge_nodes.tsv nếu Firestore rỗng
			console.log('Firestore rỗng, nạp từ file TSV...');
			await loadFromStaticTSV();
			return;
		}
	} catch (err) {
		console.warn('Lỗi load từ Firebase, fallback TSV:', err);
		await loadFromStaticTSV();
		return;
	}

	rebuildNodesMap();
	renderPalette();
	renderTable();
	updateDirtyState();
}

async function loadFromStaticTSV() {
	try {
		const res = await fetch('../../../data/knowledge_nodes.tsv');
		if (res.ok) {
			const text = await res.text();
			parseTSV(text);
			initialNodesSnapshot.clear();
			deletedInitialNodeIds.clear();
			showAdminToast(`📁 Đã nạp ${nodesData.length} node từ knowledge_nodes.tsv (Chưa lưu lên DB)!`, 'info');
		}
	} catch (err) {
		console.error('Không thể load TSV:', err);
	}
	rebuildNodesMap();
	renderPalette();
	renderTable();
	updateDirtyState();
}

// LƯU LÊN FIREBASE BATCH COMMIT
async function saveAllToFirebase() {
	if (nodesData.length === 0 && deletedInitialNodeIds.size === 0) {
		showAdminToast('⚠️ Không có node nào để lưu!', 'warning');
		return;
	}

	const btnSave = document.getElementById('btnSaveToFirebase');
	const progressWrap = document.getElementById('firebaseProgressWrap');
	const progressBar = document.getElementById('firebaseProgressBar');

	btnSave.disabled = true;
	btnSave.textContent = 'Đang lưu lên Firebase...';
	progressWrap.style.display = 'block';
	progressBar.style.width = '10%';

	try {
		const chunkSize = 400; // Batch limit an toàn

		// 1. Xóa các node đã bị xóa trong Firestore
		if (deletedInitialNodeIds.size > 0) {
			const delIds = Array.from(deletedInitialNodeIds);
			for (let i = 0; i < delIds.length; i += chunkSize) {
				const chunk = delIds.slice(i, i + chunkSize);
				const batch = currentDb.batch();
				chunk.forEach(id => {
					batch.delete(currentDb.collection('knowledgeNodes').doc(id));
				});
				await batch.commit();
			}
		}

		// 2. Lưu / cập nhật các node
		const totalChunks = Math.ceil(nodesData.length / chunkSize) || 1;
		for (let i = 0; i < nodesData.length; i += chunkSize) {
			const chunk = nodesData.slice(i, i + chunkSize);
			const batch = currentDb.batch();

			chunk.forEach(n => {
				const docRef = currentDb.collection('knowledgeNodes').doc(n.id);
				batch.set(docRef, {
					id: n.id,
					label: n.label || '',
					level: parseInt(n.level, 10) || 3,
					desc: n.desc || '',
					connections: Array.isArray(n.connections) ? n.connections : [],
					color: (n.color || '#ffb703').toUpperCase(),
					validated: Boolean(n.validated),
					updatedAt: firebase.firestore.FieldValue.serverTimestamp()
				}, { merge: true });
			});

			await batch.commit();
			const pct = Math.round(((i + chunk.length) / nodesData.length) * 100);
			progressBar.style.width = `${pct}%`;
		}

		showAdminToast(`✅ Đã lưu thành công ${nodesData.length} node lên Firebase!`, 'success');
		initialNodesSnapshot.clear();
		deletedInitialNodeIds.clear();
		nodesData.forEach(n => {
			initialNodesSnapshot.set(n.id, getNodeFingerprint(n));
		});
		updateDirtyState();
	} catch (err) {
		showAdminToast(`❌ Lỗi lưu Firebase: ${err.message}`, 'error');
	} finally {
		btnSave.disabled = false;
		btnSave.textContent = '💾 Lưu Lên Firebase';
		setTimeout(() => { progressWrap.style.display = 'none'; }, 800);
	}
}

// =========================================================================
// TSV PARSER & GENERATOR
// =========================================================================
function parseTSV(text) {
	const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
	const lines = cleanText.trim().split('\n');
	if (lines.length < 2) return false;
	const headers = lines[0].split('\t').map(h => h.trim().toLowerCase());

	const newNodes = [];
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;
		const cols = lines[i].split('\t');
		const row = {};
		headers.forEach((h, idx) => {
			row[h] = (cols[idx] || '').trim().replace(/^["']|["']$/g, '');
		});

		let id = row.id || row['mã'] || row['mã node'] || generateUUID();
		const label = row.label || row['tiêu đề'] || row.title || 'Untitled Node';
		const level = parseInt(row.level || row['cấp độ'] || row.capdo, 10) || 3;
		const desc = row.desc || row['mô tả'] || row.description || '';
		const connStr = row.connections || row['liên kết'] || row.lienket || '';
		let color = row.color || row['màu'] || row.mau || '#ffb703';
		const valStr = (row.validated || row['xác thực'] || row.verify || '').toLowerCase();
		const validated = valStr === 'true' || valStr === '1' || valStr === 'yes';

		newNodes.push({
			id,
			label,
			level,
			desc,
			connections: connStr ? connStr.split(/[;,]/).map(c => c.trim()).filter(Boolean) : [],
			color,
			validated
		});
	}

	if (newNodes.length > 0) {
		nodesData = newNodes;
		return true;
	}
	return false;
}

function generateTSV() {
	const headers = ['id', 'label', 'level', 'desc', 'connections', 'color', 'validated'];
	const lines = [headers.join('\t')];
	nodesData.forEach(n => {
		const row = [
			n.id,
			n.label || '',
			n.level || 3,
			(n.desc || '').replace(/[\t\n\r]/g, ' '),
			(n.connections || []).join(';'),
			(n.color || '').toUpperCase(),
			n.validated ? 'true' : 'false'
		];
		lines.push(row.join('\t'));
	});
	return lines.join('\n');
}

// =========================================================================
// PALETTE RENDERING
// =========================================================================
function getVisiblePaletteNodes() {
	const searchQ = (document.getElementById('paletteSearch')?.value || '').trim().toLowerCase();
	const valFilter = document.getElementById('paletteFilterValidated')?.value || 'ALL';

	return nodesData.filter(n => {
		if (valFilter === 'VALIDATED' && !n.validated) return false;
		if (valFilter === 'UNVALIDATED' && n.validated) return false;
		if (searchQ && !n.label.toLowerCase().includes(searchQ) && !n.desc.toLowerCase().includes(searchQ)) return false;
		return true;
	});
}

function renderPalette() {
	const listEl = document.getElementById('paletteList');
	if (!listEl) return;
	const visibleNodes = getVisiblePaletteNodes();

	listEl.innerHTML = '';
	visibleNodes.forEach((node, idx) => {
		const div = document.createElement('div');
		const nodeIdStr = String(node.id);
		div.className = `drag-node-item ${selectedNodeIds.has(nodeIdStr) ? 'selected' : ''}`;
		div.draggable = true;
		div.dataset.id = nodeIdStr;
		div.dataset.index = idx;

		div.innerHTML = `
					<div class="d-flex align-items-center gap-2" style="overflow: hidden; flex: 1;">
						<span style="width: 8px; height: 8px; border-radius: 50%; background: ${formatHexColor(node.color)}; flex-shrink: 0;"></span>
						<span class="drag-node-label font-sans-small" title="${adminEscapeHtml(node.label)}">${adminEscapeHtml(node.label)}</span>
					</div>
					<span class="drag-node-badge font-sans-small">Lv${node.level}</span>
				`;

		// Drag events
		div.addEventListener('dragstart', (e) => {
			if (!selectedNodeIds.has(nodeIdStr)) {
				selectedNodeIds.clear();
				selectedNodeIds.add(nodeIdStr);
				listEl.querySelectorAll('.drag-node-item').forEach(it => {
					it.classList.toggle('selected', selectedNodeIds.has(String(it.dataset.id)));
				});
				updateSelectionUI();
			}
			currentDragState = { type: 'palette-nodes', nodeIds: Array.from(selectedNodeIds) };
			const jsonStr = JSON.stringify(currentDragState);
			try {
				e.dataTransfer.setData('application/json', jsonStr);
			} catch (_) { }
			try {
				e.dataTransfer.setData('text/plain', jsonStr);
			} catch (_) { }
			e.dataTransfer.effectAllowed = 'copyMove';
			div.classList.add('dragging');
		});

		div.addEventListener('dragend', () => {
			div.classList.remove('dragging');
			document.querySelectorAll('.connections-drop-zone').forEach(z => z.classList.remove('drag-over', 'drag-over-clone'));
			document.querySelectorAll('#tableBody tr').forEach(r => r.classList.remove('drag-over-row'));
			setTimeout(() => {
				currentDragState = null;
			}, 100);
		});

		div.addEventListener('click', (e) => {
			if (e.ctrlKey || e.metaKey) {
				if (selectedNodeIds.has(nodeIdStr)) selectedNodeIds.delete(nodeIdStr);
				else selectedNodeIds.add(nodeIdStr);
			} else {
				selectedNodeIds.clear();
				selectedNodeIds.add(nodeIdStr);
			}
			updateSelectionUI();
			listEl.querySelectorAll('.drag-node-item').forEach(it => {
				it.classList.toggle('selected', selectedNodeIds.has(String(it.dataset.id)));
			});
		});

		listEl.appendChild(div);
	});

	updateSelectionUI();
}

function updateSelectionUI() {
	const badge = document.getElementById('selectedCountBadge');
	const clearBtn = document.getElementById('btnClearPaletteSelection');
	const count = selectedNodeIds.size;
	if (count > 0) {
		badge.style.display = 'inline-block';
		badge.textContent = `Selected: ${count}`;
		clearBtn.style.display = 'inline-block';
	} else {
		badge.style.display = 'none';
		clearBtn.style.display = 'none';
	}
}

// =========================================================================
// TABLE RENDERING (INLINE EDITABLE)
// =========================================================================
function renderTable() {
	const tbody = document.getElementById('tableBody');
	const searchQ = (document.getElementById('tableSearch')?.value || '').trim().toLowerCase();
	const filterLvl = document.getElementById('filterLevel')?.value || 'ALL';

	let visibleCount = 0;
	let totalLinks = 0;

	tbody.innerHTML = '';

	nodesData.forEach((node, index) => {
		if (filterLvl !== 'ALL' && node.level !== parseInt(filterLvl, 10)) return;
		if (currentValidationFilter === 'VALIDATED' && !node.validated) return;
		if (currentValidationFilter === 'UNVALIDATED' && node.validated) return;
		if (searchQ && !node.label.toLowerCase().includes(searchQ) && !node.desc.toLowerCase().includes(searchQ)) return;

		visibleCount++;
		totalLinks += (node.connections || []).length;

		const tr = document.createElement('tr');
		tr.dataset.index = index;
		if (node.validated) tr.classList.add('row-validated');

		tr.innerHTML = `
					<td class="font-sans-small" style="color: var(--main-colors-foreground-f700); text-align: center;">${index + 1}</td>
					<td style="text-align: center;">
						<input type="checkbox" class="val-checkbox" ${node.validated ? 'checked' : ''} data-index="${index}" title="Duyệt / Hủy duyệt">
					</td>
					<td>
						<textarea class="cell-input fw-semibold" data-field="label" rows="2" placeholder="Tiêu đề node...">${adminEscapeHtml(node.label)}</textarea>
					</td>
					<td style="text-align: center;">
						<select class="cell-select" data-field="level">
							${[1, 2, 3, 4, 5, 6, 7].map(lv => `<option value="${lv}" ${node.level === lv ? 'selected' : ''}>Lv ${lv}</option>`).join('')}
						</select>
					</td>
					<td>
						<textarea class="cell-input" data-field="desc" rows="6" placeholder="Mô tả tóm tắt...">${adminEscapeHtml(node.desc)}</textarea>
					</td>
					<td>
						<div class="connections-drop-zone" data-node-index="${index}">
							${renderConnectionChips(node.connections || [], index)}
						</div>
					</td>
					<td>
						<div class="color-picker-wrap">
							<input type="color" class="cell-color-picker" value="${formatHexColor(node.color)}" data-field="color" title="Chọn màu trực quan">
							<input type="text" class="cell-color-text" value="${adminEscapeHtml(node.color || '#ffb703')}" data-field="color-text" placeholder="#HEX">
						</div>
					</td>
					<td style="text-align: center;">
						<button type="button" class="btn-icon-action delete btn-delete-row" data-index="${index}" title="Xóa node này">🗑️</button>
					</td>
				`;

		tbody.appendChild(tr);
	});

	document.getElementById('statVisible').textContent = visibleCount;
	document.getElementById('statTotal').textContent = nodesData.length;
	document.getElementById('statLinks').textContent = totalLinks;

	attachTableEvents();
}

function renderConnectionChips(connections, nodeIndex) {
	let html = '';
	connections.forEach((targetId, connIdx) => {
		const targetNode = nodesMap.get(targetId);
		const displayLabel = targetNode ? targetNode.label : targetId;
		const chipKey = getChipKey(nodeIndex, connIdx, targetId);
		const isSelected = selectedChips.has(chipKey);

		html += `
					<span class="font-sans-small conn-chip ${isSelected ? 'selected' : ''}" 
						draggable="true" 
						data-chip-key="${chipKey}"
						data-source-node-index="${nodeIndex}" 
						data-conn-index="${connIdx}"
						data-target-id="${adminEscapeHtml(targetId)}" 
						title="ID: ${targetId} (Click/Shift+Click chọn, Kéo sang dòng khác, Giữ Alt để Clone)">
						${adminEscapeHtml(displayLabel)}
						<span class="conn-chip-remove" data-node-index="${nodeIndex}" data-conn-index="${connIdx}" title="Xóa liên kết này">×</span>
					</span>
				`;
	});
	html += `<span style="font-size: 10px; color: var(--main-colors-foreground-f800); font-style: italic; pointer-events: none;">+ Thả node</span>`;
	return html;
}

// GẮN SỰ KIỆN CHỈNH SỬA TRỰC TIẾP TRÊN BẢNG
function attachTableEvents() {
	// 1. Hỗ trợ kéo thả trực tiếp lên toàn bộ hàng (Row) hoặc các ô trong hàng (bao gồm cột Node, Mô tả, Liên kết)
	document.querySelectorAll('#tableBody tr').forEach(tr => {
		const nodeIndex = parseInt(tr.dataset.index, 10);
		const dropZone = tr.querySelector('.connections-drop-zone');
		let dragEnterCount = 0;

		tr.addEventListener('dragenter', (e) => {
			if (!currentDragState) return;
			dragEnterCount++;
			e.preventDefault();
			tr.classList.add('drag-over-row');
			if (dropZone) {
				const isPalette = currentDragState.type === 'palette-nodes';
				const isClone = isPalette || e.altKey || e.ctrlKey || e.metaKey;
				if (isClone) {
					dropZone.classList.add('drag-over-clone');
					dropZone.classList.remove('drag-over');
				} else {
					dropZone.classList.add('drag-over');
					dropZone.classList.remove('drag-over-clone');
				}
			}
		});

		// Kéo thả trực tiếp lên toàn bộ hàng (tr)
		tr.addEventListener('dragover', (e) => {
			if (!currentDragState) return;
			e.preventDefault();
			const isPalette = currentDragState.type === 'palette-nodes';
			const isClone = isPalette || e.altKey || e.ctrlKey || e.metaKey;
			e.dataTransfer.dropEffect = isClone ? 'copy' : 'move';
			tr.classList.add('drag-over-row');
			if (dropZone) {
				if (isClone) {
					dropZone.classList.add('drag-over-clone');
					dropZone.classList.remove('drag-over');
				} else {
					dropZone.classList.add('drag-over');
					dropZone.classList.remove('drag-over-clone');
				}
			}
		});

		tr.addEventListener('dragleave', (e) => {
			dragEnterCount--;
			if (dragEnterCount <= 0) {
				dragEnterCount = 0;
				tr.classList.remove('drag-over-row');
				if (dropZone) dropZone.classList.remove('drag-over', 'drag-over-clone');
			}
		});

		tr.addEventListener('drop', (e) => {
			dragEnterCount = 0;
			tr.classList.remove('drag-over-row');
			if (dropZone) dropZone.classList.remove('drag-over', 'drag-over-clone');
			if (e.target.closest('.connections-drop-zone')) return; // Đã có zone xử lý
			e.preventDefault();
			handleDropOnNode(nodeIndex, e);
		});

		// Ngăn textarea và input nuốt sự kiện drop hoặc dán chuỗi JSON thô vào văn bản
		tr.querySelectorAll('textarea, input, select').forEach(field => {
			field.addEventListener('dragover', (e) => {
				if (currentDragState) {
					e.preventDefault();
					const isPalette = currentDragState.type === 'palette-nodes';
					const isClone = isPalette || e.altKey || e.ctrlKey || e.metaKey;
					e.dataTransfer.dropEffect = isClone ? 'copy' : 'move';
				}
			});
			field.addEventListener('drop', (e) => {
				if (currentDragState) {
					e.preventDefault();
				}
			});
		});
	});

	// Checkbox validated riêng
	document.querySelectorAll('.val-checkbox').forEach(cb => {
		cb.onchange = (e) => {
			const index = parseInt(cb.dataset.index, 10);
			if (!isNaN(index) && nodesData[index]) {
				nodesData[index].validated = cb.checked;
				markDirty(1);
				renderTable();
			}
		};
	});

	// 2. Chỉnh sửa nội dung in-place (label, level, desc, color)
	document.querySelectorAll('.cell-input, .cell-select, .cell-color-picker, .cell-color-text').forEach(input => {
		input.oninput = (e) => {
			const tr = e.target.closest('tr');
			if (!tr) return;
			const index = parseInt(tr.dataset.index, 10);
			const field = e.target.dataset.field;
			let val = e.target.value;

			if (field === 'level') {
				nodesData[index][field] = parseInt(val, 10);
			} else if (field === 'color') {
				nodesData[index]['color'] = val.toUpperCase();
				const textInput = tr.querySelector('.cell-color-text');
				if (textInput) textInput.value = val.toUpperCase();
			} else if (field === 'color-text') {
				nodesData[index]['color'] = val.toUpperCase();
				const picker = tr.querySelector('.cell-color-picker');
				if (picker && /^#[0-9a-fA-F]{6}$/.test(val)) picker.value = val.toLowerCase();
			} else {
				nodesData[index][field] = val;
			}

			markDirty(1);
			rebuildNodesMap();
			renderPalette();
		};
	});

	// 3. Xóa node
	document.querySelectorAll('.btn-delete-row').forEach(btn => {
		btn.onclick = (e) => {
			e.stopPropagation();
			const index = parseInt(btn.dataset.index, 10);
			const targetNode = nodesData[index];
			if (confirm(`Xóa node "${targetNode.label}" và tự động dọn dẹp liên kết?`)) {
				const deletedId = targetNode.id;
				selectedNodeIds.delete(deletedId);
				if (initialNodesSnapshot.has(deletedId)) {
					deletedInitialNodeIds.add(deletedId);
				}
				nodesData.splice(index, 1);

				// Dọn dẹp liên kết
				nodesData.forEach(n => {
					if (n.connections) n.connections = n.connections.filter(c => c !== deletedId);
				});

				markDirty();
				rebuildNodesMap();
				renderPalette();
				renderTable();
				showAdminToast(`🗑️ Đã xóa node "${targetNode.label}"!`, 'info');
			}
		};
	});

	// 4. Xóa chip liên kết
	document.querySelectorAll('.conn-chip-remove').forEach(rm => {
		rm.onclick = (e) => {
			e.stopPropagation();
			const nodeIdx = parseInt(rm.dataset.nodeIndex, 10);
			const connIdx = parseInt(rm.dataset.connIndex, 10);
			nodesData[nodeIdx].connections.splice(connIdx, 1);
			markDirty(1);
			renderTable();
		};
	});

	// 5. Tương tác chọn, Shift-chọn, và Kéo thả chip liên kết
	document.querySelectorAll('.conn-chip').forEach(chip => {
		chip.addEventListener('click', (e) => {
			if (e.target.closest('.conn-chip-remove')) return;
			e.stopPropagation();

			const key = chip.dataset.chipKey;
			const sNodeIdx = parseInt(chip.dataset.sourceNodeIndex, 10);
			const connIdx = parseInt(chip.dataset.connIndex, 10);
			const targetId = chip.dataset.targetId;

			activeDropZoneIndex = sNodeIdx;

			if (e.shiftKey && lastClickedChip && lastClickedChip.nodeIndex === sNodeIdx) {
				// Shift-click chọn dải liên tiếp trong cùng dòng
				const minIdx = Math.min(lastClickedChip.connIdx, connIdx);
				const maxIdx = Math.max(lastClickedChip.connIdx, connIdx);
				const chipsInZone = chip.closest('.connections-drop-zone')?.querySelectorAll('.conn-chip') || [];
				chipsInZone.forEach(c => {
					const cIdx = parseInt(c.dataset.connIndex, 10);
					if (cIdx >= minIdx && cIdx <= maxIdx) {
						selectedChips.set(c.dataset.chipKey, {
							nodeIndex: sNodeIdx,
							connIdx: cIdx,
							targetId: c.dataset.targetId
						});
					}
				});
			} else if (e.ctrlKey || e.metaKey) {
				// Ctrl/Cmd-click toggle chọn nhiều
				if (selectedChips.has(key)) {
					selectedChips.delete(key);
				} else {
					selectedChips.set(key, { nodeIndex: sNodeIdx, connIdx, targetId });
				}
				lastClickedChip = { nodeIndex: sNodeIdx, connIdx, targetId, key };
			} else {
				// Click chọn đơn lẻ
				selectedChips.clear();
				selectedChips.set(key, { nodeIndex: sNodeIdx, connIdx, targetId });
				lastClickedChip = { nodeIndex: sNodeIdx, connIdx, targetId, key };
			}

			updateChipSelectionUI();
			updateChipActionToolbar();
		});

		// Kéo thả chip (Dragstart & Dragend)
		chip.addEventListener('dragstart', (e) => {
			const key = chip.dataset.chipKey;
			const sNodeIdx = parseInt(chip.dataset.sourceNodeIndex, 10);
			const connIdx = parseInt(chip.dataset.connIndex, 10);
			const targetId = chip.dataset.targetId;

			if (!selectedChips.has(key)) {
				selectedChips.clear();
				selectedChips.set(key, { nodeIndex: sNodeIdx, connIdx, targetId });
				lastClickedChip = { nodeIndex: sNodeIdx, connIdx, targetId, key };
				updateChipSelectionUI();
				updateChipActionToolbar();
			}

			activeDropZoneIndex = sNodeIdx;
			const chipsToDrag = Array.from(selectedChips.values());
			currentDragState = {
				type: 'conn-chips',
				sourceNodeIndex: sNodeIdx,
				chips: chipsToDrag
			};

			e.dataTransfer.setData('application/json', JSON.stringify(currentDragState));
			e.dataTransfer.effectAllowed = 'copyMove';

			document.querySelectorAll('.conn-chip.selected').forEach(c => c.classList.add('dragging'));
		});

		chip.addEventListener('dragend', () => {
			document.querySelectorAll('.conn-chip.dragging').forEach(c => c.classList.remove('dragging'));
			document.querySelectorAll('.connections-drop-zone').forEach(z => z.classList.remove('drag-over', 'drag-over-clone'));
			document.querySelectorAll('#tableBody tr').forEach(r => r.classList.remove('drag-over-row'));
			setTimeout(() => {
				currentDragState = null;
			}, 100);
		});
	});

	// 6. Kéo thả vào drop-zone kết nối & Bôi đen (Marquee Selection)
	document.querySelectorAll('.connections-drop-zone').forEach(zone => {
		const nodeIndex = parseInt(zone.dataset.nodeIndex, 10);

		// Click vào khoảng trống của ô liên kết để kích hoạt dòng
		zone.addEventListener('click', (e) => {
			if (e.target.closest('.conn-chip, .conn-chip-remove')) return;
			activeDropZoneIndex = nodeIndex;
			if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
				clearChipSelection();
			}
			updateChipSelectionUI();
		});

		// Marquee: Bôi đen chuột để chọn các node liên kết
		zone.addEventListener('mousedown', (e) => {
			if (e.button !== 0 || e.target.closest('.conn-chip, .conn-chip-remove')) return;

			activeDropZoneIndex = nodeIndex;
			const startClientX = e.clientX;
			const startClientY = e.clientY;
			let isMarquee = false;
			let marqueeBox = null;

			const onMouseMove = (moveEv) => {
				const dist = Math.hypot(moveEv.clientX - startClientX, moveEv.clientY - startClientY);
				if (!isMarquee && dist > 3) {
					isMarquee = true;
					if (!moveEv.ctrlKey && !moveEv.metaKey && !moveEv.shiftKey) {
						selectedChips.clear();
					}
					marqueeBox = document.createElement('div');
					marqueeBox.className = 'selection-box';
					document.body.appendChild(marqueeBox);
				}

				if (!isMarquee || !marqueeBox) return;

				const curClientX = moveEv.clientX;
				const curClientY = moveEv.clientY;
				const minX = Math.min(startClientX, curClientX);
				const maxX = Math.max(startClientX, curClientX);
				const minY = Math.min(startClientY, curClientY);
				const maxY = Math.max(startClientY, curClientY);

				marqueeBox.style.left = (minX + window.scrollX) + 'px';
				marqueeBox.style.top = (minY + window.scrollY) + 'px';
				marqueeBox.style.width = (maxX - minX) + 'px';
				marqueeBox.style.height = (maxY - minY) + 'px';

				// Hit test với các chip trong drop-zone này
				zone.querySelectorAll('.conn-chip').forEach(chip => {
					const rect = chip.getBoundingClientRect();
					const hit = !(rect.right < minX || rect.left > maxX || rect.bottom < minY || rect.top > maxY);
					const key = chip.dataset.chipKey;
					const targetId = chip.dataset.targetId;
					const connIdx = parseInt(chip.dataset.connIndex, 10);
					const sNodeIdx = parseInt(chip.dataset.sourceNodeIndex, 10);

					if (hit) {
						selectedChips.set(key, { nodeIndex: sNodeIdx, connIdx, targetId });
						chip.classList.add('selected');
					} else if (!moveEv.ctrlKey && !moveEv.metaKey && !moveEv.shiftKey) {
						selectedChips.delete(key);
						chip.classList.remove('selected');
					}
				});
				updateChipActionToolbar();
			};

			const onMouseUp = () => {
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
				if (marqueeBox) {
					marqueeBox.remove();
					marqueeBox = null;
				}
				updateChipSelectionUI();
				updateChipActionToolbar();
			};

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});

		// Dragover: Hiển thị clone (xanh lá) nếu giữ Alt/Ctrl/Cmd hoặc từ palette, hoặc move (vàng) nếu kéo thường
		zone.addEventListener('dragover', (e) => {
			e.preventDefault();
			const isPalette = currentDragState && currentDragState.type === 'palette-nodes';
			const isClone = isPalette || e.altKey || e.ctrlKey || e.metaKey;
			if (isClone) {
				e.dataTransfer.dropEffect = 'copy';
				zone.classList.add('drag-over-clone');
				zone.classList.remove('drag-over');
			} else {
				e.dataTransfer.dropEffect = 'move';
				zone.classList.add('drag-over');
				zone.classList.remove('drag-over-clone');
			}
		});

		zone.addEventListener('dragleave', (e) => {
			if (!zone.contains(e.relatedTarget)) {
				zone.classList.remove('drag-over', 'drag-over-clone');
			}
		});

		// Drop: Xử lý Move hoặc Clone
		zone.addEventListener('drop', (e) => {
			e.preventDefault();
			e.stopPropagation();
			zone.classList.remove('drag-over', 'drag-over-clone');
			const targetNodeIndex = parseInt(zone.dataset.nodeIndex, 10);
			handleDropOnNode(targetNodeIndex, e);
		});
	});
}

// HÀM XỬ LÝ THẢ NODE VÀO MỘT ROW / DROP ZONE
function handleDropOnNode(targetNodeIndex, e) {
	const targetNode = nodesData[targetNodeIndex];
	if (!targetNode) return;

	try {
		let rawData = null;
		if (e.dataTransfer) {
			try { rawData = e.dataTransfer.getData('application/json'); } catch (_) { }
			if (!rawData) {
				try { rawData = e.dataTransfer.getData('text/plain'); } catch (_) { }
			}
		}

		let data = null;
		if (rawData) {
			try { data = JSON.parse(rawData); } catch (_) { }
		}
		if (!data && currentDragState) {
			data = currentDragState;
		}
		if (!data) return;

		if (!Array.isArray(targetNode.connections)) {
			targetNode.connections = [];
		}

		// 1. Kéo từ khay node bên trái (Palette)
		if (data.type === 'palette-nodes' && Array.isArray(data.nodeIds)) {
			let added = 0;
			const targetIdStr = String(targetNode.id);
			const currentConnSet = new Set(targetNode.connections.map(c => String(c)));

			data.nodeIds.forEach(id => {
				const idStr = String(id);
				if (idStr !== targetIdStr && !currentConnSet.has(idStr)) {
					targetNode.connections.push(id);
					currentConnSet.add(idStr);
					added++;
				}
			});
			if (added > 0) {
				markDirty(added);
				renderTable();
				showAdminToast(`🔗 Đã thêm ${added} liên kết vào "${targetNode.label}"!`, 'success');
			} else {
				showAdminToast(`ℹ️ Node "${targetNode.label}" đã có liên kết này rồi hoặc tự liên kết với chính nó!`, 'info');
			}
			currentDragState = null;
			return;
		}

		// 2. Kéo chip từ một dòng sang dòng khác (Move hoặc Clone)
		if (data.type === 'conn-chips' && Array.isArray(data.chips)) {
			const isClone = e.altKey || e.ctrlKey || e.metaKey;
			const droppedChips = data.chips;

			let addedCount = 0;
			const targetSet = new Set(targetNode.connections);

			droppedChips.forEach(c => {
				if (c.targetId !== targetNode.id && !targetSet.has(c.targetId)) {
					targetNode.connections.push(c.targetId);
					targetSet.add(c.targetId);
					addedCount++;
				}
			});

			// Nếu là MOVE (mặc định, không bấm Alt để clone): xóa khỏi dòng nguồn
			if (!isClone) {
				const removeByNode = new Map();
				droppedChips.forEach(c => {
					if (c.nodeIndex !== targetNodeIndex) {
						if (!removeByNode.has(c.nodeIndex)) removeByNode.set(c.nodeIndex, new Set());
						removeByNode.get(c.nodeIndex).add(c.targetId);
					}
				});

				removeByNode.forEach((targetIdsToRemove, sNodeIdx) => {
					if (nodesData[sNodeIdx] && nodesData[sNodeIdx].connections) {
						nodesData[sNodeIdx].connections = nodesData[sNodeIdx].connections.filter(
							tid => !targetIdsToRemove.has(tid)
						);
					}
				});
			}

			clearChipSelection();
			activeDropZoneIndex = targetNodeIndex;
			markDirty(Math.max(1, addedCount));
			renderTable();

			if (isClone) {
				showAdminToast(`👯 Đã clone (nhân bản) ${droppedChips.length} node sang "${targetNode.label}"!`, 'success');
			} else {
				showAdminToast(`🚚 Đã di chuyển ${droppedChips.length} node sang "${targetNode.label}"!`, 'success');
			}
			currentDragState = null;
		}
	} catch (err) {
		console.warn('Drop error:', err);
	}
}

// Marquee Selection Box
function initMarqueeSelection() {
	const paletteList = document.getElementById('paletteList');
	let isSelecting = false;
	let startX = 0, startY = 0;
	let marqueeBox = null;

	paletteList.addEventListener('mousedown', (e) => {
		if (e.button !== 0 || e.target.closest('.drag-node-item')) return;
		isSelecting = true;
		const rect = paletteList.getBoundingClientRect();
		startX = e.clientX;
		startY = e.clientY;

		marqueeBox = document.createElement('div');
		marqueeBox.className = 'selection-box';
		document.body.appendChild(marqueeBox);

		marqueeBox.style.left = startX + 'px';
		marqueeBox.style.top = startY + 'px';
		marqueeBox.style.width = '0px';
		marqueeBox.style.height = '0px';
	});

	document.addEventListener('mousemove', (e) => {
		if (!isSelecting || !marqueeBox) return;
		const curX = e.clientX;
		const curY = e.clientY;
		const minX = Math.min(startX, curX);
		const maxX = Math.max(startX, curX);
		const minY = Math.min(startY, curY);
		const maxY = Math.max(startY, curY);

		marqueeBox.style.left = minX + 'px';
		marqueeBox.style.top = minY + 'px';
		marqueeBox.style.width = (maxX - minX) + 'px';
		marqueeBox.style.height = (maxY - minY) + 'px';

		// Hit testing
		document.querySelectorAll('.drag-node-item').forEach(item => {
			const r = item.getBoundingClientRect();
			const hit = !(r.right < minX || r.left > maxX || r.bottom < minY || r.top > maxY);
			const id = item.dataset.id;
			if (hit) selectedNodeIds.add(id);
			else if (!e.ctrlKey && !e.metaKey) selectedNodeIds.delete(id);
		});
		updateSelectionUI();
		document.querySelectorAll('.drag-node-item').forEach(it => {
			it.classList.toggle('selected', selectedNodeIds.has(it.dataset.id));
		});
	});

	document.addEventListener('mouseup', () => {
		if (isSelecting) {
			isSelecting = false;
			if (marqueeBox) marqueeBox.remove();
			marqueeBox = null;
		}
	});
}

// =========================================================================
// EVENT LISTENERS & MODALS
// =========================================================================
function initEvents() {
	// Nút Lưu lên Firebase
	document.getElementById('btnSaveToFirebase')?.addEventListener('click', saveAllToFirebase);

	// Nút Nạp từ Firebase
	document.getElementById('btnReloadFirebase')?.addEventListener('click', async () => {
		if (unsavedChangesCount > 0 && !confirm('Bạn có thay đổi chưa lưu, nạp lại từ Firebase sẽ ghi đè thay đổi này?')) return;
		await loadNodesFromFirebase();
	});

	// Tìm kiếm bảng & Level filter
	document.getElementById('tableSearch')?.addEventListener('input', renderTable);
	document.getElementById('filterLevel')?.addEventListener('change', renderTable);

	// Pill buttons duyệt
	document.querySelectorAll('#validationFilterPills .pill-btn').forEach(btn => {
		btn.onclick = () => {
			document.querySelectorAll('#validationFilterPills .pill-btn').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			currentValidationFilter = btn.dataset.val;
			renderTable();
		};
	});

	// Palette events
	document.getElementById('paletteSearch')?.addEventListener('input', renderPalette);
	document.getElementById('paletteFilterValidated')?.addEventListener('change', renderPalette);

	document.getElementById('btnSelectAllPalette')?.addEventListener('click', () => {
		getVisiblePaletteNodes().forEach(n => selectedNodeIds.add(n.id));
		renderPalette();
	});

	document.getElementById('btnClearPaletteSelection')?.addEventListener('click', () => {
		selectedNodeIds.clear();
		renderPalette();
	});

	// Thêm node mới
	document.getElementById('btnAddRow')?.addEventListener('click', () => {
		const newId = generateUUID();
		nodesData.unshift({
			id: newId,
			label: 'Khái niệm mới',
			level: 3,
			desc: 'Mô tả khái niệm...',
			connections: [],
			color: '#6366f1',
			validated: false
		});
		deletedInitialNodeIds.delete(newId);
		markDirty();
		rebuildNodesMap();
		renderPalette();
		renderTable();
		showAdminToast('➕ Đã thêm node mới ở đầu bảng!', 'success');
	});

	// Copy TSV
	document.getElementById('btnCopyTSV')?.addEventListener('click', async () => {
		const tsv = generateTSV();
		try {
			await navigator.clipboard.writeText(tsv);
			showAdminToast(`📋 Đã sao chép ${nodesData.length} node dạng TSV!`, 'success');
		} catch (e) {
			showAdminToast('⚠️ Không thể tự động sao chép clipboard', 'warning');
		}
	});

	// Download TSV
	document.getElementById('btnDownloadTSV')?.addEventListener('click', () => {
		const tsv = generateTSV();
		const blob = new Blob([tsv], { type: 'text/tab-separated-values;charset=utf-8' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'knowledge_nodes.tsv';
		a.click();
		showAdminToast('💾 Đã tải xuống tệp knowledge_nodes.tsv', 'success');
	});

	// Modal Import TSV
	const modalImport = document.getElementById('modalImportTSV');
	const taImport = document.getElementById('importTSVTextarea');

	document.getElementById('btnPasteTSV')?.addEventListener('click', () => {
		modalImport.classList.add('open');
		taImport.focus();
	});

	document.getElementById('btnCloseImportModal')?.addEventListener('click', () => modalImport.classList.remove('open'));
	document.getElementById('btnCancelImport')?.addEventListener('click', () => modalImport.classList.remove('open'));

	document.getElementById('btnPasteFromClipboard')?.addEventListener('click', async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (text) {
				taImport.value = text;
				showAdminToast('📋 Đã dán nội dung từ clipboard!', 'info');
			}
		} catch (err) {
			showAdminToast('Hãy dùng phím tắt Ctrl+V để dán trực tiếp', 'info');
		}
	});

	document.getElementById('fileInputTSV')?.addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => {
			taImport.value = ev.target.result;
			showAdminToast(`📁 Đã đọc file "${file.name}"`, 'info');
		};
		reader.readAsText(file);
	});

	document.getElementById('btnApplyImport')?.addEventListener('click', () => {
		const text = taImport.value.trim();
		if (!text) {
			alert('Vui lòng nhập hoặc dán nội dung TSV!');
			return;
		}
		const ok = parseTSV(text);
		if (ok) {
			const currentIds = new Set(nodesData.map(n => n.id));
			initialNodesSnapshot.forEach((_, oldId) => {
				if (!currentIds.has(oldId)) {
					deletedInitialNodeIds.add(oldId);
				} else {
					deletedInitialNodeIds.delete(oldId);
				}
			});
			rebuildNodesMap();
			renderPalette();
			renderTable();
			modalImport.classList.remove('open');
			markDirty();
			showAdminToast(`✅ Đã nạp thành công ${nodesData.length} node! Nhớ bấm "Lưu Lên Firebase".`, 'success');
		} else {
			alert('Không thể đọc dữ liệu TSV. Vui lòng kiểm tra lại định dạng dữ liệu.');
		}
	});

	// Chip toolbar buttons
	document.getElementById('btnCopySelectedChips')?.addEventListener('click', copySelectedChips);
	document.getElementById('btnCutSelectedChips')?.addEventListener('click', cutSelectedChips);
	document.getElementById('btnDeleteSelectedChips')?.addEventListener('click', deleteSelectedChips);
	document.getElementById('btnClearChipSelection')?.addEventListener('click', clearChipSelection);

	// Global Keyboard Shortcuts
	window.addEventListener('keydown', (e) => {
		const activeEl = document.activeElement;
		const isInputActive = activeEl && (
			activeEl.tagName === 'INPUT' ||
			activeEl.tagName === 'TEXTAREA' ||
			activeEl.tagName === 'SELECT' ||
			activeEl.isContentEditable
		);

		// Phím Escape: Bỏ chọn node đang chọn
		if (e.key === 'Escape') {
			if (selectedChips.size > 0) {
				clearChipSelection();
				e.preventDefault();
			}
			return;
		}

		// Nếu người dùng đang gõ trong ô nhập liệu (textarea, input...), không bắt phím tắt chỉnh sửa chip
		if (isInputActive) return;

		const isCtrlOrCmd = e.ctrlKey || e.metaKey;

		// Phím Delete hoặc Backspace: Xóa các chip đang chọn
		if ((e.key === 'Delete' || e.key === 'Backspace') && selectedChips.size > 0) {
			e.preventDefault();
			deleteSelectedChips();
			return;
		}

		// Ctrl+C / Cmd+C: Copy / Clone liên kết
		if (isCtrlOrCmd && (e.key === 'c' || e.key === 'C')) {
			if (selectedChips.size > 0) {
				e.preventDefault();
				copySelectedChips();
			}
			return;
		}

		// Ctrl+X / Cmd+X: Cut / Di chuyển liên kết
		if (isCtrlOrCmd && (e.key === 'x' || e.key === 'X')) {
			if (selectedChips.size > 0) {
				e.preventDefault();
				cutSelectedChips();
			}
			return;
		}

		// Ctrl+V / Cmd+V: Dán liên kết vào dòng đang chọn
		if (isCtrlOrCmd && (e.key === 'v' || e.key === 'V')) {
			if (chipClipboard && chipClipboard.chips && chipClipboard.chips.length > 0) {
				e.preventDefault();
				pasteChipsToActiveZone();
			}
			return;
		}

		// Ctrl+A / Cmd+A: Chọn tất cả liên kết trong dòng đang chọn
		if (isCtrlOrCmd && (e.key === 'a' || e.key === 'A')) {
			if (activeDropZoneIndex !== null && nodesData[activeDropZoneIndex]) {
				e.preventDefault();
				selectedChips.clear();
				const conns = nodesData[activeDropZoneIndex].connections || [];
				conns.forEach((tid, cIdx) => {
					const key = getChipKey(activeDropZoneIndex, cIdx, tid);
					selectedChips.set(key, { nodeIndex: activeDropZoneIndex, connIdx: cIdx, targetId: tid });
				});
				updateChipSelectionUI();
				updateChipActionToolbar();
			}
		}
	});
}

// =========================================================================
// CHIP ACTION HANDLERS & CLIPBOARD (COPY, CUT, PASTE, DELETE, CLONE)
// =========================================================================
function copySelectedChips() {
	if (selectedChips.size === 0) return;
	chipClipboard = {
		action: 'copy',
		chips: Array.from(selectedChips.values())
	};
	showAdminToast(`📋 Đã sao chép ${selectedChips.size} liên kết (Nhấn Ctrl+V để dán / clone)!`, 'info');
}

function cutSelectedChips() {
	if (selectedChips.size === 0) return;
	chipClipboard = {
		action: 'cut',
		chips: Array.from(selectedChips.values())
	};
	showAdminToast(`✂️ Đã cắt ${selectedChips.size} liên kết (Nhấn Ctrl+V để di chuyển sang dòng khác)!`, 'info');
}

function deleteSelectedChips() {
	if (selectedChips.size === 0) return;
	const count = selectedChips.size;

	const removeMap = new Map();
	selectedChips.forEach(c => {
		if (!removeMap.has(c.nodeIndex)) removeMap.set(c.nodeIndex, new Set());
		removeMap.get(c.nodeIndex).add(c.targetId);
	});

	removeMap.forEach((targets, nodeIdx) => {
		if (nodesData[nodeIdx] && nodesData[nodeIdx].connections) {
			nodesData[nodeIdx].connections = nodesData[nodeIdx].connections.filter(tid => !targets.has(tid));
		}
	});

	clearChipSelection();
	markDirty(count);
	renderTable();
	showAdminToast(`🗑️ Đã xóa ${count} liên kết đã chọn!`, 'info');
}

function pasteChipsToActiveZone() {
	if (!chipClipboard || !chipClipboard.chips || chipClipboard.chips.length === 0) {
		showAdminToast('⚠️ Bộ nhớ tạm chưa có liên kết nào. Hãy chọn node rồi nhấn Ctrl+C hoặc Ctrl+X!', 'warning');
		return;
	}

	if (activeDropZoneIndex === null || !nodesData[activeDropZoneIndex]) {
		showAdminToast('⚠️ Vui lòng click vào ô "Liên kết" của dòng muốn dán vào!', 'warning');
		return;
	}

	const targetNode = nodesData[activeDropZoneIndex];
	const isCut = chipClipboard.action === 'cut';
	const targetSet = new Set(targetNode.connections);
	let addedCount = 0;

	chipClipboard.chips.forEach(c => {
		if (c.targetId !== targetNode.id && !targetSet.has(c.targetId)) {
			targetNode.connections.push(c.targetId);
			targetSet.add(c.targetId);
			addedCount++;
		}
	});

	if (isCut) {
		const removeMap = new Map();
		chipClipboard.chips.forEach(c => {
			if (c.nodeIndex !== activeDropZoneIndex) {
				if (!removeMap.has(c.nodeIndex)) removeMap.set(c.nodeIndex, new Set());
				removeMap.get(c.nodeIndex).add(c.targetId);
			}
		});

		removeMap.forEach((targets, sIdx) => {
			if (nodesData[sIdx] && nodesData[sIdx].connections) {
				nodesData[sIdx].connections = nodesData[sIdx].connections.filter(tid => !targets.has(tid));
			}
		});

		chipClipboard = null; // Clear clipboard sau khi cut và paste
	}

	clearChipSelection();
	markDirty(Math.max(1, addedCount));
	renderTable();
	showAdminToast(isCut ? `🚚 Đã di chuyển ${addedCount} liên kết vào "${targetNode.label}"!` : `👯 Đã clone ${addedCount} liên kết vào "${targetNode.label}"!`, 'success');
}
