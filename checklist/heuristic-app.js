// --- QUẢN LÝ DỰ ÁN & STATE CHO HEURISTIC EVALUATION ---
let projects = [];
let currentProjectId = 'default';
let activeChecklist = 'nielsen';
let activeCategoryFilter = 'all';
let activeStatusFilter = 'all';
let searchQuery = '';
let activeCardId = null;

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  renderProjectDropdown();
  renderCategoryPills();
  bindEvents();
  renderChecklist();
  updateProgressAndStats();
});

// Khởi tạo bộ nhớ LocalStorage
function initLocalStorage() {
  const savedProjects = localStorage.getItem('heuristic_designer_projects');
  const savedCurrentId = localStorage.getItem('heuristic_designer_current_project');
  const savedActiveChecklist = localStorage.getItem('heuristic_designer_active_checklist');

  if (savedProjects) {
    projects = JSON.parse(savedProjects);
    // Đảm bảo tất cả các dự án đều có cấu trúc state chứa đủ 4 bộ checklist
    projects.forEach(p => {
      if (!p.state) {
        p.state = {
          nielsen: {},
          gerhardt: {},
          shneiderman: {},
          weinschenk: {}
        };
      } else {
        if (!p.state.nielsen) p.state.nielsen = {};
        if (!p.state.gerhardt) p.state.gerhardt = {};
        if (!p.state.shneiderman) p.state.shneiderman = {};
        if (!p.state.weinschenk) p.state.weinschenk = {};
      }
    });
  } else {
    // Dự án mặc định ban đầu
    projects = [
      {
        id: 'default',
        name: 'Default Flow',
        state: {
          nielsen: {},
          gerhardt: {},
          shneiderman: {},
          weinschenk: {}
        }
      }
    ];
    saveToStorage();
  }

  if (savedCurrentId && projects.some(p => p.id === savedCurrentId)) {
    currentProjectId = savedCurrentId;
  } else if (projects.length > 0) {
    currentProjectId = projects[0].id;
  } else {
    currentProjectId = 'default';
  }

  if (savedActiveChecklist && ['nielsen', 'gerhardt', 'shneiderman', 'weinschenk'].includes(savedActiveChecklist)) {
    activeChecklist = savedActiveChecklist;
    document.getElementById('checklist-select').value = activeChecklist;
  } else {
    activeChecklist = 'nielsen';
  }
}

function saveToStorage() {
  localStorage.setItem('heuristic_designer_projects', JSON.stringify(projects));
  localStorage.setItem('heuristic_designer_current_project', currentProjectId);
  localStorage.setItem('heuristic_designer_active_checklist', activeChecklist);
}

// Cập nhật thống kê và thanh tiến trình
function updateProgressAndStats() {
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (!currentProject) return;

  const state = currentProject.state[activeChecklist] || {};
  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  let totalCriteriaCount = 0;
  let totalApplicable = 0;
  let doneCount = 0;
  let todoCount = 0;
  let naCount = 0;

  checklistData.categories.forEach(cat => {
    cat.criteria.forEach(crit => {
      totalCriteriaCount++;
      const itemId = `${cat.id}_${crit.id}`;
      const status = state[itemId] || 'unselected';

      if (status === 'done') {
        doneCount++;
        totalApplicable++;
      } else if (status === 'todo') {
        todoCount++;
        totalApplicable++;
      } else if (status === 'na') {
        naCount++;
      } else { // 'unselected'
        totalApplicable++;
      }
    });
  });

  const percentage = totalApplicable > 0 ? Math.round((doneCount / totalApplicable) * 100) : 0;

  // Cập nhật giao diện
  document.getElementById('progress-percent').innerText = `${percentage}%`;
  document.getElementById('progress-bar-fill').style.width = `${percentage}%`;

  document.getElementById('stat-done').innerText = doneCount;
  document.getElementById('stat-todo').innerText = todoCount;
  document.getElementById('stat-na').innerText = naCount;
  document.getElementById('stat-total').innerText = totalCriteriaCount;
}

// Render dropdown danh sách dự án
function renderProjectDropdown() {
  const select = document.getElementById('project-select');
  select.innerHTML = '';

  projects.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.name;
    if (p.id === currentProjectId) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  // Cập nhật tên dự án ở tiêu đề chính
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (currentProject) {
    document.getElementById('current-project-title').innerText = currentProject.name;
  }
}

// Render các nút chọn nhanh danh mục (Pill buttons) động dựa trên bộ checklist
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  container.innerHTML = '';

  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  const pills = [
    { id: 'all', label: 'Tất cả nhóm' }
  ];

  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  checklistData.categories.forEach(cat => {
    pills.push({
      id: cat.id.toString(),
      label: `${prefix}${cat.id}: ${cat.name}`
    });
  });

  pills.forEach(pill => {
    const btn = document.createElement('button');
    btn.className = `pill-btn ${activeCategoryFilter === pill.id ? 'active' : ''}`;
    btn.textContent = pill.label;
    btn.setAttribute('data-category', pill.id);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategoryFilter = pill.id;
      renderChecklist();
    });
    container.appendChild(btn);
  });
}

// Đăng ký các sự kiện tương tác
function bindEvents() {
  // Thay đổi dự án từ dropdown
  document.getElementById('project-select').addEventListener('change', (e) => {
    currentProjectId = e.target.value;
    saveToStorage();
    const currentProject = projects.find(p => p.id === currentProjectId);
    if (currentProject) {
      document.getElementById('current-project-title').innerText = currentProject.name;
    }
    renderChecklist();
    updateProgressAndStats();
  });

  // Thay đổi bộ checklist quy chuẩn
  document.getElementById('checklist-select').addEventListener('change', (e) => {
    activeChecklist = e.target.value;
    activeCategoryFilter = 'all';
    activeCardId = null;
    saveToStorage();
    renderCategoryPills();
    renderChecklist();
    updateProgressAndStats();
  });

  // Mở modal tạo dự án mới
  document.getElementById('btn-new-project').addEventListener('click', () => {
    openModal('new-project-modal');
  });

  // Mở modal đổi tên dự án
  document.getElementById('btn-rename-project').addEventListener('click', () => {
    const currentProject = projects.find(p => p.id === currentProjectId);
    if (currentProject) {
      document.getElementById('rename-project-name').value = currentProject.name;
      openModal('rename-project-modal');
    }
  });

  // Sự kiện nút Lưu dự án mới
  document.getElementById('form-new-project').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('new-project-name');
    const name = nameInput.value.trim();
    if (!name) return;

    const newId = 'project_' + Date.now();
    projects.push({
      id: newId,
      name: name,
      state: {
        nielsen: {},
        gerhardt: {},
        shneiderman: {},
        weinschenk: {}
      }
    });
    currentProjectId = newId;
    saveToStorage();
    nameInput.value = '';
    closeModal('new-project-modal');
    renderProjectDropdown();
    renderChecklist();
    updateProgressAndStats();
    showToast(`Đã tạo dự án mới: "${name}"`);
  });

  // Sự kiện nút Lưu đổi tên dự án
  document.getElementById('form-rename-project').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('rename-project-name');
    const name = nameInput.value.trim();
    if (!name) return;

    const project = projects.find(p => p.id === currentProjectId);
    if (project) {
      const oldName = project.name;
      project.name = name;
      saveToStorage();
      closeModal('rename-project-modal');
      renderProjectDropdown();
      showToast(`Đã đổi tên dự án từ "${oldName}" thành "${name}"`);
    }
  });

  // Nút xóa dự án hiện tại
  document.getElementById('btn-delete-project').addEventListener('click', () => {
    if (projects.length <= 1) {
      showToast('Không thể xóa dự án duy nhất còn lại!');
      return;
    }
    const currentProject = projects.find(p => p.id === currentProjectId);
    if (confirm(`Bạn có chắc chắn muốn xóa luồng "${currentProject.name}"? Nếu xóa, toàn bộ dữ liệu đánh giá của luồng này sẽ bị mất hoàn toàn và không thể khôi phục.`)) {
      projects = projects.filter(p => p.id !== currentProjectId);
      currentProjectId = projects[0].id;
      saveToStorage();
      renderProjectDropdown();
      renderChecklist();
      updateProgressAndStats();
      showToast('Đã xóa dự án thành công.');
    }
  });

  // Tìm kiếm thời gian thực
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderChecklist();
  });

  // Lọc theo trạng thái checkbox (Done, Todo, NA)
  document.getElementById('status-filter').addEventListener('change', (e) => {
    activeStatusFilter = e.target.value;
    renderChecklist();
  });

  // Chuyển đổi Dark Mode/Light Mode
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('wcag_designer_theme', newTheme);
  });

  // Đọc theme đã lưu
  const savedTheme = localStorage.getItem('wcag_designer_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Nút Xuất báo cáo Markdown
  document.getElementById('btn-export-markdown').addEventListener('click', () => {
    exportToMarkdown();
  });

  // Nút Reset dự án hiện tại
  document.getElementById('btn-reset-project').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả các tiêu chí của bộ quy chuẩn hiện tại trong dự án này về trạng thái chưa đánh giá?')) {
      const project = projects.find(p => p.id === currentProjectId);
      if (project) {
        project.state[activeChecklist] = {};
        saveToStorage();
        renderChecklist();
        updateProgressAndStats();
        showToast('Đã thiết lập lại bộ checklist hiện tại.');
      }
    }
  });

  // Mobile Menu Toggling
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('active');
  });

  // Đóng sidebar khi click ra ngoài trên mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });

  // Sự kiện đóng modal khi nhấn nút Close hoặc click overlay
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });
}

// Hiển thị modal
function openModal(id) {
  document.getElementById(id).classList.add('active');
}

// Ẩn modal cụ thể
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Ẩn tất cả các modal
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
}

// Hiển thị thông báo Toast
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg style="width:16px;height:16px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Tự động biến mất sau 3 giây
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// --- RENDER DỰ ÁN CHECKLIST ---
function renderChecklist() {
  const container = document.getElementById('checklist-container');
  container.innerHTML = '';

  const currentProject = projects.find(p => p.id === currentProjectId);
  if (!currentProject) return;

  const state = currentProject.state[activeChecklist] || {};
  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  const filteredItems = [];
  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  checklistData.categories.forEach(cat => {
    cat.criteria.forEach(crit => {
      const itemId = `${cat.id}_${crit.id}`;
      const status = state[itemId] || 'unselected';

      // 1. Lọc theo danh mục (category)
      if (activeCategoryFilter !== 'all' && activeCategoryFilter !== cat.id.toString()) {
        return;
      }

      // 2. Lọc theo trạng thái hoàn thành (status)
      if (activeStatusFilter !== 'all') {
        if (activeStatusFilter === 'todo') {
          if (status !== 'todo' && status !== 'unselected') {
            return;
          }
        } else if (status !== activeStatusFilter) {
          return;
        }
      }

      // 3. Lọc theo từ khóa tìm kiếm (searchQuery)
      if (searchQuery) {
        const matchTextVi = crit.text.toLowerCase().includes(searchQuery);
        const matchTextEn = (crit.text_en || '').toLowerCase().includes(searchQuery);
        const matchDesc = (crit.desc || '').toLowerCase().includes(searchQuery);
        const matchWhy = (crit.why || '').toLowerCase().includes(searchQuery);
        const matchCat = cat.name.toLowerCase().includes(searchQuery);
        const matchId = `${prefix.toLowerCase()}${cat.id}.${crit.id}`.includes(searchQuery) || itemId.includes(searchQuery);

        if (!matchTextVi && !matchTextEn && !matchDesc && !matchWhy && !matchCat && !matchId) {
          return;
        }
      }

      filteredItems.push({
        catId: cat.id,
        catName: cat.name,
        id: crit.id,
        itemId: itemId,
        text: crit.text,
        text_en: crit.text_en,
        desc: crit.desc,
        why: crit.why,
        how: crit.how,
        do: crit.do,
        dont: crit.dont,
        status: status
      });
    });
  });

  // Hiển thị trạng thái trống (Empty State) nếu không có kết quả khớp
  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <h3>Không tìm thấy tiêu chí nào phù hợp</h3>
        <p>Thử thay đổi bộ lọc hoặc nhập từ khóa tìm kiếm khác xem sao nhé!</p>
      </div>
    `;
    return;
  }

  // Tạo thẻ cho từng tiêu chí
  filteredItems.forEach(item => {
    const card = document.createElement('div');
    card.className = `checklist-card ${item.status === 'done' ? 'card-done' : ''} ${item.status === 'todo' ? 'card-todo' : ''} ${item.status === 'na' ? 'card-na' : ''}`;
    card.setAttribute('id', `card-${item.itemId}`);
    card.setAttribute('tabindex', '0'); // Làm cho thẻ nhận tiêu điểm bàn phím

    // Thêm sự kiện click để đặt tiêu điểm
    card.addEventListener('click', () => {
      document.querySelectorAll('.checklist-card').forEach(c => c.classList.remove('focused-card'));
      card.classList.add('focused-card');
      activeCardId = item.itemId;
    });

    const code = `${prefix}${item.catId}.${item.id}`;

    let howListHtml = '';
    if (item.how && Array.isArray(item.how)) {
      item.how.forEach(step => {
        howListHtml += `<li>${step}</li>`;
      });
    }

    const detailsHtml = `
      <details class="card-details">
        <summary>Hướng dẫn chi tiết & ví dụ thiết kế</summary>
        <div class="details-content">
          <div class="details-section">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              Tại sao điều này quan trọng?
            </h4>
            <p style="color:var(--text-muted); padding-left: 20px;">${item.why}</p>
          </div>
          
          <div class="details-section">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              Hướng dẫn thiết kế cho Designer
            </h4>
            <ul>
              ${howListHtml}
            </ul>
          </div>
          
          <div class="compare-container">
            <div class="compare-box do-box">
              <h5>
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                NÊN LÀM (DO)
              </h5>
              <p>${item.do}</p>
            </div>
            <div class="compare-box dont-box">
              <h5>
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                TRÁNH LÀM (DON'T)
              </h5>
              <p>${item.dont}</p>
            </div>
          </div>
        </div>
      </details>
    `;

    card.innerHTML = `
      <div class="card-header-main">
        <div class="card-title-group">
          <div class="card-badges">
            <span class="badge badge-id">${code}</span>
            <span class="badge" style="background:var(--bg-secondary); color:var(--text-muted); border:1px solid var(--border-color); font-weight:500;">${item.catName}</span>
          </div>
          <h6 style="font-size: 1.05rem; line-height: 1.5; font-weight: 500; margin-top: 8px; color: var(--text-color);">${item.text}</h6>
          <p class="font-sans-caption">${item.desc}</p>
        </div>
        
        <div class="status-selector">
          <button class="status-btn btn-na ${item.status === 'na' ? 'active' : ''}" data-status="na" title="Không áp dụng cho luồng này">N/A</button>
          <button class="status-btn btn-todo ${item.status === 'todo' ? 'active' : ''}" data-status="todo" title="Chưa đạt / Cần kiểm tra">Chưa đạt</button>
          <button class="status-btn btn-done ${item.status === 'done' ? 'active' : ''}" data-status="done" title="Đã đáp ứng thiết kế">Đã đạt</button>
        </div>
      </div>
      ${detailsHtml}
    `;

    // Đăng ký sự kiện đổi trạng thái cho các nút Chưa đạt / Đã đạt / N/A
    const btns = card.querySelectorAll('.status-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài thẻ card làm thay đổi focus
        
        const newStatus = btn.getAttribute('data-status');

        // Cập nhật dữ liệu
        state[item.itemId] = newStatus;
        saveToStorage();

        // Cập nhật trạng thái active trên các nút
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Cập nhật màu viền & nền thẻ
        card.classList.remove('card-done', 'card-todo', 'card-na');
        if (newStatus === 'done') card.classList.add('card-done');
        if (newStatus === 'todo') card.classList.add('card-todo');
        if (newStatus === 'na') card.classList.add('card-na');

        // Cập nhật thanh tiến trình và tổng số lượng
        updateProgressAndStats();
      });
    });

    // Nếu có tìm kiếm và từ khóa khớp với nội dung chi tiết ẩn, hãy mở rộng details
    if (searchQuery) {
      const matchWhy = (item.why || '').toLowerCase().includes(searchQuery);
      const matchHow = item.how && item.how.some(h => h.toLowerCase().includes(searchQuery));
      if (matchWhy || matchHow) {
        card.querySelector('.card-details').setAttribute('open', '');
      }
    }

    container.appendChild(card);
  });

  // Bảo toàn tiêu điểm nếu thẻ vẫn đang hiển thị
  if (activeCardId) {
    const activeCardEl = document.getElementById(`card-${activeCardId}`);
    if (activeCardEl) {
      activeCardEl.classList.add('focused-card');
    } else {
      activeCardId = null;
    }
  }
}

// --- XUẤT BÁO CÁO MARKDOWN ---
function exportToMarkdown() {
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (!currentProject) return;

  const state = currentProject.state[activeChecklist] || {};
  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  let md = `# Báo cáo đánh giá Trải nghiệm Người dùng (Heuristic UX/UI Evaluation Report)\n\n`;
  md += `**Tên luồng thiết kế**: ${currentProject.name}\n`;
  md += `**Thời gian đánh giá**: ${new Date().toLocaleDateString('vi-VN')} \n`;
  md += `**Phương pháp đối chiếu**: ${checklistData.title}\n\n`;

  let doneList = [];
  let todoList = [];
  let naList = [];
  let unselectedList = [];

  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  checklistData.categories.forEach(cat => {
    cat.criteria.forEach(crit => {
      const itemId = `${cat.id}_${crit.id}`;
      const status = state[itemId] || 'unselected';
      const code = `${prefix}${cat.id}.${crit.id}`;
      const itemText = `**[${code}] ${cat.name}**: ${crit.text}\n   - *Chi tiết*: ${crit.desc}\n   - *Lý do*: ${crit.why}`;

      if (status === 'done') {
        doneList.push(itemText);
      } else if (status === 'todo') {
        todoList.push(itemText);
      } else if (status === 'na') {
        naList.push(itemText);
      } else {
        unselectedList.push(itemText);
      }
    });
  });

  const total = doneList.length + todoList.length + naList.length + unselectedList.length;
  const evaluated = doneList.length + todoList.length + naList.length;
  const pct = evaluated > 0 ? Math.round((doneList.length / (doneList.length + todoList.length)) * 100) : 0;

  md += `## Tóm tắt tiến độ đánh giá\n`;
  md += `- **Tổng số tiêu chí**: ${total}\n`;
  md += `- **Đã đánh giá**: ${evaluated} / ${total}\n`;
  md += `- **Đạt thiết kế**: ${doneList.length}\n`;
  md += `- **Chưa đạt**: ${todoList.length}\n`;
  md += `- **Không áp dụng**: ${naList.length}\n`;
  md += `- **Chưa đánh giá**: ${unselectedList.length}\n`;
  md += `- **Tỷ lệ đạt (trên phần áp dụng)**: ${pct}%\n\n`;

  if (todoList.length > 0) {
    md += `## ❌ Danh sách tiêu chí CHƯA ĐẠT (Cần tối ưu)\n`;
    todoList.forEach(item => {
      md += `- [ ] ${item}\n`;
    });
    md += `\n`;
  }

  if (doneList.length > 0) {
    md += `## ✅ Danh sách tiêu chí ĐÃ ĐẠT\n`;
    doneList.forEach(item => {
      md += `- [x] ${item}\n`;
    });
    md += `\n`;
  }

  if (naList.length > 0) {
    md += `## ➖ Danh sách không áp dụng (N/A)\n`;
    naList.forEach(item => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  // Sao chép clipboard
  navigator.clipboard.writeText(md).then(() => {
    showToast('Đã copy báo cáo Markdown vào Clipboard!');
  }).catch(err => {
    console.error('Không thể copy vào clipboard: ', err);
  });

  // Tải file markdown
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const filename = `${currentProject.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_heuristic_${activeChecklist}_report.md`;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- ĐIỀU HƯỚNG BẰNG BÀN PHÍM ---
function highlightDpadKey(keyClass) {
  const keyEl = document.querySelector(`.keyboard-nav-guide .${keyClass}`);
  if (keyEl) {
    keyEl.classList.add('active');
    setTimeout(() => keyEl.classList.remove('active'), 150);
  }
}

function focusCard(cardEl) {
  if (!cardEl) return;
  document.querySelectorAll('.checklist-card').forEach(c => c.classList.remove('focused-card'));
  cardEl.classList.add('focused-card');
  activeCardId = cardEl.id.replace('card-', '');
  cardEl.focus({ preventScroll: true });
  setTimeout(() => {
    cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 30);
}

function cycleStatus(cardEl, direction) {
  const itemId = cardEl.id.replace('card-', '');
  const btns = Array.from(cardEl.querySelectorAll('.status-btn'));
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (!currentProject) return;
  
  const state = currentProject.state[activeChecklist] || {};
  const currentStatus = state[itemId] || 'unselected';

  const statuses = ['unselected', 'na', 'todo', 'done'];
  let idx = statuses.indexOf(currentStatus);
  if (idx === -1) idx = 0;

  let nextIdx = idx + direction;
  if (nextIdx < 0) nextIdx = statuses.length - 1;
  if (nextIdx >= statuses.length) nextIdx = 0;

  const nextStatus = statuses[nextIdx];
  
  if (nextStatus === 'unselected') {
    state[itemId] = 'unselected';
    saveToStorage();
    btns.forEach(b => b.classList.remove('active'));
    cardEl.classList.remove('card-done', 'card-todo', 'card-na');
    updateProgressAndStats();
  } else {
    const targetBtn = cardEl.querySelector(`.status-btn[data-status="${nextStatus}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }
}

// Lắng nghe sự kiện bàn phím
document.addEventListener('keydown', (e) => {
  // Tránh bắt phím khi đang nhập liệu trong ô tìm kiếm hoặc modal
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
    return;
  }

  const visibleCards = Array.from(document.querySelectorAll('.checklist-card'));
  if (visibleCards.length === 0) return;

  const currentFocusedIndex = visibleCards.findIndex(c => c.classList.contains('focused-card'));
  const key = e.key;

  // Xử lý phím Enter để đóng/mở chi tiết thẻ đang focus
  if (key === 'Enter') {
    if (activeCardId) {
      const activeCardEl = document.getElementById(`card-${activeCardId}`);
      if (activeCardEl && document.activeElement === activeCardEl) {
        const detailsEl = activeCardEl.querySelector('.card-details');
        if (detailsEl) {
          e.preventDefault();
          if (detailsEl.hasAttribute('open')) {
            detailsEl.removeAttribute('open');
          } else {
            detailsEl.setAttribute('open', '');
          }
        }
      }
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    highlightDpadKey('key-down');
    let nextIndex = currentFocusedIndex + 1;
    if (currentFocusedIndex === -1 || nextIndex >= visibleCards.length) {
      nextIndex = 0;
    }
    focusCard(visibleCards[nextIndex]);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    highlightDpadKey('key-up');
    let prevIndex = currentFocusedIndex - 1;
    if (currentFocusedIndex === -1 || prevIndex < 0) {
      prevIndex = visibleCards.length - 1;
    }
    focusCard(visibleCards[prevIndex]);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    highlightDpadKey('key-left');
    if (currentFocusedIndex !== -1) {
      cycleStatus(visibleCards[currentFocusedIndex], -1);
    }
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    highlightDpadKey('key-right');
    if (currentFocusedIndex !== -1) {
      cycleStatus(visibleCards[currentFocusedIndex], 1);
    }
  }
});
