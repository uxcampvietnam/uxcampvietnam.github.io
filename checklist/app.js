// --- QUẢN LÝ DỰ ÁN & STATE ---
let projects = [];
let currentProjectId = 'default';
let activeCategoryFilter = 'all';
let activeLevelFilter = 'all';
let activeStatusFilter = 'all';
let showOnlyNew22 = false;
let searchQuery = '';
let activeCardId = null;

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  initSidebarCollapse();
  renderProjectDropdown();
  renderCategoryDropdown();
  bindEvents();
  switchTab(activeView);
  updateProgressAndStats();
});

// Khởi tạo bộ nhớ LocalStorage
function initLocalStorage() {
  const savedProjects = localStorage.getItem('wcag_designer_projects');
  const savedCurrentId = localStorage.getItem('wcag_designer_current_project');

  if (savedProjects) {
    projects = JSON.parse(savedProjects);
    // Migration: rename "Luồng Đăng ký & Đăng nhập" to "Default Flow"
    projects = projects.map(p => {
      if (p.id === 'default' && p.name === 'Luồng Đăng ký & Đăng nhập') {
        p.name = 'Default Flow';
      }
      return p;
    });
    // Migration: remove empty checkout-flow
    projects = projects.filter(p => {
      if (p.id === 'checkout-flow' && Object.keys(p.state || {}).length === 0) {
        return false;
      }
      return true;
    });
    // Ensure we have at least one project
    if (projects.length === 0) {
      projects.push({
        id: 'default',
        name: 'Default Flow',
        state: {}
      });
    }
  } else {
    // Dự án mặc định ban đầu
    projects = [
      {
        id: 'default',
        name: 'Default Flow',
        state: {} // Lưu trạng thái dạng { itemId: 'todo' | 'done' | 'na' }
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
}

function saveToStorage() {
  localStorage.setItem('wcag_designer_projects', JSON.stringify(projects));
  localStorage.setItem('wcag_designer_current_project', currentProjectId);
}

// Khởi tạo trạng thái thu nhỏ sidebar từ LocalStorage
function initSidebarCollapse() {
  const isCollapsed = localStorage.getItem('wcag_designer_sidebar_collapsed') === 'true';
  const container = document.querySelector('.app-container');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');

  if (container && isCollapsed) {
    container.classList.add('sidebar-collapsed');
  }
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', isCollapsed ? 'Mở rộng menu' : 'Thu nhỏ menu');
  }
}

// Cập nhật thống kê và thanh tiến trình
function updateProgressAndStats() {
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (!currentProject) return;

  const state = currentProject.state || {};

  let totalApplicable = 0;
  let doneCount = 0;
  let todoCount = 0;
  let naCount = 0;

  WCAG_DATA.forEach(item => {
    const status = state[item.id] || 'unselected';
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

  const percentage = totalApplicable > 0 ? Math.round((doneCount / totalApplicable) * 100) : 0;

  // Cập nhật giao diện
  document.getElementById('progress-percent').innerText = `${percentage}%`;
  document.getElementById('progress-bar-fill').style.width = `${percentage}%`;

  document.getElementById('stat-done').innerText = doneCount;
  document.getElementById('stat-todo').innerText = todoCount;
  document.getElementById('stat-na').innerText = naCount;
  document.getElementById('stat-total').innerText = WCAG_DATA.length;
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

// Render dropdown danh mục (select)
function renderCategoryDropdown() {
  const select = document.getElementById('category-filter');
  if (!select) return;

  select.innerHTML = '';

  const categories = [
    { id: 'all', label: 'Tất cả nhóm' },
    { id: 'visual', label: 'Bố cục & Thị giác' },
    { id: 'interaction', label: 'Tương tác & Cử chỉ' },
    { id: 'form', label: 'Biểu mẫu & Nhập liệu' },
    { id: 'navigation', label: 'Điều hướng' },
    { id: 'media', label: 'Hình ảnh & Video' }
  ];

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.label;
    if (activeCategoryFilter === cat.id) {
      opt.selected = true;
    }
    select.appendChild(opt);
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
    switchTab(activeView);
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
      state: {}
    });
    currentProjectId = newId;
    saveToStorage();
    nameInput.value = '';
    closeModal('new-project-modal');
    renderProjectDropdown();
    switchTab(activeView);
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
      switchTab(activeView);
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
      switchTab(activeView);
      updateProgressAndStats();
      showToast('Đã xóa dự án thành công.');
    }
  });

  // Tìm kiếm thời gian thực
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderChecklist();
  });

  // Lọc theo nhóm danh mục
  document.getElementById('category-filter').addEventListener('change', (e) => {
    activeCategoryFilter = e.target.value;
    renderChecklist();
  });

  // Lọc theo cấp độ (Level A/AA/AAA)
  document.getElementById('level-filter').addEventListener('change', (e) => {
    activeLevelFilter = e.target.value;
    renderChecklist();
  });

  // Lọc theo trạng thái checkbox (Done, Todo, NA)
  document.getElementById('status-filter').addEventListener('change', (e) => {
    activeStatusFilter = e.target.value;
    renderChecklist();
  });

  // Toggle chỉ hiện các tiêu chí mới của WCAG 2.2
  document.getElementById('wcag22-toggle').addEventListener('change', (e) => {
    showOnlyNew22 = e.target.checked;
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

  // Tab điều hướng Checklist
  document.getElementById('tab-checklist').addEventListener('click', () => {
    switchTab('checklist');
  });

  // Tab điều hướng Báo Cáo
  document.getElementById('tab-report').addEventListener('click', () => {
    switchTab('report');
  });

  // Bộ chọn nhóm tiêu chí trên báo cáo
  document.getElementById('report-category-select').addEventListener('change', () => {
    renderReportDetails();
  });

  // Lọc chi tiết báo cáo theo trạng thái (checkboxes)
  document.getElementById('rep-filter-pass').addEventListener('change', () => {
    renderReportDetails();
  });
  document.getElementById('rep-filter-fail').addEventListener('change', () => {
    renderReportDetails();
  });
  document.getElementById('rep-filter-na').addEventListener('change', () => {
    renderReportDetails();
  });

  // Nút Tải Agent Skills
  document.getElementById('btn-download-skills').addEventListener('click', () => {
    downloadAgentSkills([
      { url: 'skills/wcag-skill.md', name: 'wcag-skill.md' },
      { url: 'skills/wcag-knowledge.json', name: 'wcag-knowledge.json' }
    ], 'WCAG 2.2');
  });

  // Nút Reset dự án hiện tại
  document.getElementById('btn-reset-project').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả các tiêu chí trong dự án này về trạng thái "Chưa đạt"?')) {
      const project = projects.find(p => p.id === currentProjectId);
      if (project) {
        project.state = {};
        saveToStorage();
        switchTab(activeView);
        updateProgressAndStats();
        showToast('Đã thiết lập lại dự án hiện tại.');
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

  // Toggle thu nhỏ sidebar trên desktop
  const sidebarToggle = document.getElementById('sidebar-toggle-btn');
  const container = document.querySelector('.app-container');
  if (sidebarToggle && container) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = container.classList.toggle('sidebar-collapsed');
      localStorage.setItem('wcag_designer_sidebar_collapsed', isCollapsed);
      sidebarToggle.setAttribute('aria-label', isCollapsed ? 'Mở rộng menu' : 'Thu nhỏ menu');
    });
  }

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

  // Đăng ký sự kiện click chuột cho D-Pad ảo
  const keyMappings = {
    'key-up': 'ArrowUp',
    'key-down': 'ArrowDown',
    'key-left': 'ArrowLeft',
    'key-right': 'ArrowRight',
    'key-enter': 'Enter'
  };

  Object.keys(keyMappings).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      // Ngăn mousedown làm mất focus (blur) của thẻ card đang được chọn
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });

      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const keyName = keyMappings[id];
        // Gửi sự kiện keydown
        const downEvent = new KeyboardEvent('keydown', { key: keyName, bubbles: true });
        document.dispatchEvent(downEvent);

        // Gửi sự kiện keyup sau một khoảng trễ ngắn để tạo hiệu ứng active
        setTimeout(() => {
          const upEvent = new KeyboardEvent('keyup', { key: keyName, bubbles: true });
          document.dispatchEvent(upEvent);
        }, 150);
      });
    }
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

// Tải xuống Agent Skills & Knowledge
function downloadAgentSkills(files, flowName) {
  files.forEach((file, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, index * 200);
  });
  showToast(`Đã tải xuống Agent Skills & Knowledge cho ${flowName}!`);
}

// --- RENDER DỰ ÁN CHECKLIST ---
function renderChecklist() {
  const container = document.getElementById('checklist-container');
  container.innerHTML = '';

  const currentProject = projects.find(p => p.id === currentProjectId);
  const state = currentProject ? currentProject.state : {};

  // Lọc dữ liệu theo các tiêu chí đã chọn
  const filteredData = WCAG_DATA.filter(item => {
    // 1. Lọc theo danh mục (category)
    if (activeCategoryFilter !== 'all' && item.category !== activeCategoryFilter) {
      return false;
    }

    // 2. Lọc theo cấp độ (level)
    if (activeLevelFilter !== 'all' && item.level !== activeLevelFilter) {
      return false;
    }

    // 3. Lọc theo trạng thái hoàn thành (state)
    const itemStatus = state[item.id] || 'unselected';
    if (activeStatusFilter !== 'all') {
      if (itemStatus !== activeStatusFilter) {
        return false;
      }
    }

    // 4. Lọc chỉ tiêu chí mới WCAG 2.2
    if (showOnlyNew22 && !item.isNew22) {
      return false;
    }

    // 5. Lọc theo từ khóa tìm kiếm (searchQuery)
    if (searchQuery) {
      const matchTitle = item.title.toLowerCase().includes(searchQuery);
      const matchDesc = item.desc.toLowerCase().includes(searchQuery);
      const matchWcag = item.wcag.includes(searchQuery);
      const matchWhy = item.why.toLowerCase().includes(searchQuery);
      const matchHow = item.how.some(h => h.toLowerCase().includes(searchQuery));

      if (!matchTitle && !matchDesc && !matchWcag && !matchWhy && !matchHow) {
        return false;
      }
    }

    return true;
  });

  // Hiển thị trạng thái trống (Empty State) nếu không có kết quả khớp
  if (filteredData.length === 0) {
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
  filteredData.forEach(item => {
    const itemStatus = state[item.id] || 'unselected';

    const card = document.createElement('div');
    card.className = `checklist-card ${itemStatus === 'done' ? 'card-done' : ''} ${itemStatus === 'todo' ? 'card-todo' : ''} ${itemStatus === 'na' ? 'card-na' : ''}`;
    card.setAttribute('id', `card-${item.id}`);
    card.setAttribute('tabindex', '0'); // Làm cho thẻ nhận tiêu điểm bàn phím

    // Thêm sự kiện click để đặt tiêu điểm
    card.addEventListener('click', () => {
      document.querySelectorAll('.checklist-card').forEach(c => c.classList.remove('focused-card'));
      card.classList.add('focused-card');
      activeCardId = item.id;
    });

    // Tạo icon indicator dựa trên trạng thái
    let indicatorHtml = '';
    if (itemStatus === 'done') {
      indicatorHtml = `<span class="status-indicator indicator-done" aria-label="Pass"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>`;
    } else if (itemStatus === 'todo') {
      indicatorHtml = `<span class="status-indicator indicator-todo" aria-label="Fail"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span>`;
    } else {
      indicatorHtml = `<span class="status-indicator indicator-hidden" aria-hidden="true"><?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="menu-arrow-circle"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-5.16V14a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.5-1.5 1 1 0 0 1-2 0 3.5 3.5 0 1 1 4.5 3.34z"></path></g></g></svg></span>`;
    }

    // Danh sách thẻ badges hiển thị bên trên tiêu đề
    let badgeHtml = `
      <span class="badge badge-item badge-id">${item.wcag}</span>
      <span class="badge badge-level badge-level-${item.level.toLowerCase()}">${item.level}</span>
    `;
    if (item.isNew22) {
      badgeHtml += `<span class="badge badge-new">Mới (WCAG 2.2)</span>`;
    }

    // Tạo danh sách cách thiết kế (How to design)
    let howListHtml = '';
    item.how.forEach(step => {
      howListHtml += `<li>${step}</li>`;
    });

    card.innerHTML = `
      <div class="card-header-main">
        <div class="card-title-group">
          <div class="card-badges">
            ${indicatorHtml}
            ${badgeHtml}
          </div>
          <h6>${item.title}</h6>
          <p class="font-sans-caption">${item.desc}</p>
        </div>
        
        <div class="status-selector">
          <button class="status-btn btn-na ${itemStatus === 'na' ? 'active' : ''}" data-status="na" title="Không áp dụng cho luồng này">N/A</button>
          <button class="status-btn btn-todo ${itemStatus === 'todo' ? 'active' : ''}" data-status="todo" title="Fail">Fail</button>
          <button class="status-btn btn-done ${itemStatus === 'done' ? 'active' : ''}" data-status="done" title="Pass">Pass</button>
        </div>
      </div>
      
      <details class="card-details">
        <summary>Chi tiết & ví dụ</summary>
        <div class="details-content">
          <div class="details-section">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
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

    // Đăng ký sự kiện đổi trạng thái cho các nút Chưa đạt / Đã đạt / N/A
    const btns = card.querySelectorAll('.status-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const newStatus = btn.getAttribute('data-status');

        // Cập nhật dữ liệu
        state[item.id] = newStatus;
        saveToStorage();

        // Cập nhật trạng thái active trên các nút
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Cập nhật màu viền thẻ
        card.classList.remove('card-done', 'card-todo', 'card-na');
        if (newStatus === 'done') card.classList.add('card-done');
        if (newStatus === 'todo') card.classList.add('card-todo');
        if (newStatus === 'na') card.classList.add('card-na');

        // Cập nhật icon indicator
        updateIndicatorIcon(card, newStatus);

        // Cập nhật thanh tiến trình và tổng số lượng
        updateProgressAndStats();
      });
    });

    // Nếu có tìm kiếm và từ khóa khớp với nội dung chi tiết ẩn, hãy mở rộng details
    if (searchQuery) {
      const matchWhy = item.why.toLowerCase().includes(searchQuery);
      const matchHow = item.how.some(h => h.toLowerCase().includes(searchQuery));
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

  const state = currentProject.state || {};

  let md = `# Báo cáo đánh giá Khả năng Tiếp cận (A11y Assessment Report)\n\n`;
  md += `**Tên luồng thiết kế**: ${currentProject.name}\n`;
  md += `**Thời gian đánh giá**: ${new Date().toLocaleDateString('vi-VN')} \n`;
  md += `**Tiêu chuẩn đối chiếu**: Web Content Accessibility Guidelines (WCAG) 2.2\n\n`;

  let doneList = [];
  let todoList = [];
  let naList = [];
  let unselectedList = [];

  WCAG_DATA.forEach(item => {
    const status = state[item.id] || 'unselected';
    const statusText = status === 'done' ? '✅ Đã đạt' : (status === 'na' ? '⚪ Không áp dụng' : (status === 'todo' ? '❌ Chưa đạt' : '❓ Chưa đánh giá'));

    const row = {
      wcag: item.wcag,
      title: item.title,
      level: item.level,
      status: statusText,
      isNew: item.isNew22 ? 'Mới' : 'Thường'
    };

    if (status === 'done') doneList.push(row);
    else if (status === 'todo') todoList.push(row);
    else if (status === 'na') naList.push(row);
    else unselectedList.push(row);
  });

  const total = WCAG_DATA.length;
  const totalApplicable = doneList.length + todoList.length + unselectedList.length;
  const donePct = totalApplicable > 0 ? Math.round((doneList.length / totalApplicable) * 100) : 0;

  md += `## Tóm tắt tiến độ\n`;
  md += `- **Mức độ tuân thủ**: **${donePct}%** (Tính trên các tiêu chí áp dụng)\n`;
  md += `- **Đã đáp ứng**: ${doneList.length} / ${total} tiêu chí\n`;
  md += `- **Chưa đáp ứng**: ${todoList.length} / ${total} tiêu chí\n`;
  md += `- **Chưa đánh giá**: ${unselectedList.length} / ${total} tiêu chí\n`;
  md += `- **Không áp dụng (N/A)**: ${naList.length} / ${total} tiêu chí\n\n`;

  md += `## Chi tiết các hạng mục CHƯA ĐẠT (Cần chỉnh sửa thiết kế)\n`;
  if (todoList.length === 0) {
    md += `🎉 Không có hạng mục nào bị đánh giá "Chưa đạt".\n\n`;
  } else {
    md += `Các hạng mục này cần được kiểm tra lại trên Figma/Prototype để bổ sung chỉ dẫn hoặc sửa giao diện:\n\n`;
    md += `| WCAG | Tiêu chí đánh giá | Cấp độ | Trạng thái |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    todoList.forEach(item => {
      md += `| ${item.wcag} | ${item.title} | **${item.level}** | ${item.status} |\n`;
    });
    md += `\n`;
  }

  if (unselectedList.length > 0) {
    md += `## Chi tiết các hạng mục CHƯA ĐÁNH GIÁ (Cần kiểm tra bổ sung)\n`;
    md += `Các hạng mục này chưa được tích chọn trạng thái trên checklist:\n\n`;
    md += `| WCAG | Tiêu chí đánh giá | Cấp độ | Trạng thái |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    unselectedList.forEach(item => {
      md += `| ${item.wcag} | ${item.title} | **${item.level}** | ${item.status} |\n`;
    });
    md += `\n`;
  }

  md += `## Chi tiết bảng đánh giá đầy đủ\n\n`;
  md += `| WCAG | Tiêu chí đánh giá | Cấp độ | WCAG 2.2 | Trạng thái |\n`;
  md += `| :--- | :--- | :---: | :---: | :--- |\n`;

  WCAG_DATA.forEach(item => {
    const status = state[item.id] || 'unselected';
    const statusText = status === 'done' ? '✅ Đã đạt' : (status === 'na' ? '⚪ N/A' : (status === 'todo' ? '❌ Chưa đạt' : '❓ Chưa đánh giá'));
    md += `| ${item.wcag} | ${item.title} | ${item.level} | ${item.isNew22 ? 'Mới 🆕' : '-'} | ${statusText} |\n`;
  });

  md += `\n---
*Báo cáo được tạo tự động bởi ứng dụng WCAG 2.2 Checklist @UXCamp.vn.*`;

  // Sao chép vào Clipboard
  navigator.clipboard.writeText(md).then(() => {
    showToast('Đã tạo báo cáo Markdown và copy vào Clipboard thành công!');

    // Tự động tải xuống tệp tin .md
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);

    // Chuẩn hóa tên file
    const safeName = currentProject.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.setAttribute('download', `assessment_report_${safeName}.md`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(err => {
    console.error('Lỗi khi copy báo cáo:', err);
    showToast('Lỗi khi lưu vào bộ nhớ tạm. Hãy thử lại.');
  });
}

// Cập nhật trạng thái hiển thị trên thẻ (DOM)
function updateCardStatusUI(cardId, newStatus) {
  const card = document.getElementById(`card-${cardId}`);
  if (!card) return;

  // 1. Cập nhật class trên card
  card.classList.remove('card-done', 'card-todo', 'card-na');
  if (newStatus === 'done') card.classList.add('card-done');
  if (newStatus === 'todo') card.classList.add('card-todo');
  if (newStatus === 'na') card.classList.add('card-na');

  // 2. Cập nhật class active trên các nút bấm của card
  const btns = card.querySelectorAll('.status-btn');
  btns.forEach(btn => {
    const btnStatus = btn.getAttribute('data-status');
    if (btnStatus === newStatus) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 3. Cập nhật icon indicator
  updateIndicatorIcon(card, newStatus);
}

// Hàm cập nhật icon indicator trên card
function updateIndicatorIcon(card, newStatus) {
  const indicator = card.querySelector('.status-indicator');
  if (!indicator) return;

  indicator.className = 'status-indicator';
  if (newStatus === 'done') {
    indicator.classList.add('indicator-done');
    indicator.setAttribute('aria-label', 'Pass');
    indicator.removeAttribute('aria-hidden');
    indicator.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
  } else if (newStatus === 'todo') {
    indicator.classList.add('indicator-todo');
    indicator.setAttribute('aria-label', 'Fail');
    indicator.removeAttribute('aria-hidden');
    indicator.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  } else {
    indicator.classList.add('indicator-hidden');
    indicator.setAttribute('aria-hidden', 'true');
    indicator.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>`;
  }
}

// Lắng nghe sự kiện bàn phím toàn cục để điều hướng nhanh
document.addEventListener('keydown', (e) => {
  const activeEl = document.activeElement;
  if (activeEl && (
    activeEl.tagName === 'INPUT' ||
    activeEl.tagName === 'TEXTAREA' ||
    activeEl.tagName === 'SELECT' ||
    activeEl.isContentEditable
  )) {
    return;
  }

  const key = e.key;

  if (key === 'Enter') {
    highlightVirtualKey(key, true);
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

  const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
  if (!isArrow) return;

  // Chặn cuộn mặc định của trình duyệt để tự điều khiển cuộn mượt mà
  e.preventDefault();

  // Kích hoạt hiệu ứng nhấn phím trên D-pad ảo
  highlightVirtualKey(key, true);

  const visibleCards = Array.from(document.querySelectorAll('.checklist-card'));
  if (visibleCards.length === 0) return;

  // Tìm vị trí của thẻ đang active
  let currentIndex = -1;
  if (activeCardId) {
    currentIndex = visibleCards.findIndex(card => card.id === `card-${activeCardId}`);
  }

  if (key === 'ArrowDown' || key === 'ArrowUp') {
    let nextIndex = 0;
    if (key === 'ArrowDown') {
      nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, visibleCards.length - 1);
    } else {
      nextIndex = currentIndex === -1 ? visibleCards.length - 1 : Math.max(currentIndex - 1, 0);
    }

    const newActiveCard = visibleCards[nextIndex];
    if (newActiveCard) {
      // Hủy focus thẻ cũ
      document.querySelectorAll('.checklist-card').forEach(c => c.classList.remove('focused-card'));

      // Active thẻ mới
      newActiveCard.classList.add('focused-card');
      activeCardId = newActiveCard.id.replace('card-', '');
      newActiveCard.focus({ preventScroll: true }); // Tập trung tiêu điểm trình duyệt

      // Cuộn thẻ vào vùng nhìn thấy
      setTimeout(() => {
        newActiveCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 30);
    }
  } else if (key === 'ArrowRight' || key === 'ArrowLeft') {
    // Nếu chưa có thẻ nào được active, tự động chọn thẻ đầu tiên
    if (currentIndex === -1) {
      const firstCard = visibleCards[0];
      firstCard.classList.add('focused-card');
      activeCardId = firstCard.id.replace('card-', '');
      firstCard.focus({ preventScroll: true });
      setTimeout(() => {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 30);
      return;
    }

    const currentProject = projects.find(p => p.id === currentProjectId);
    if (!currentProject) return;

    const state = currentProject.state || {};
    const currentStatus = state[activeCardId] || 'unselected';
    const STATUS_SEQUENCE = ['unselected', 'na', 'todo', 'done'];
    let statusIndex = STATUS_SEQUENCE.indexOf(currentStatus);
    if (statusIndex === -1) statusIndex = 0;

    let nextIdx = statusIndex + (key === 'ArrowRight' ? 1 : -1);
    if (nextIdx < 0) nextIdx = STATUS_SEQUENCE.length - 1;
    if (nextIdx >= STATUS_SEQUENCE.length) nextIdx = 0;

    const newStatus = STATUS_SEQUENCE[nextIdx];

    if (newStatus !== currentStatus) {
      state[activeCardId] = newStatus;
      saveToStorage();
      updateCardStatusUI(activeCardId, newStatus);
      updateProgressAndStats();
    }
  }
});

// Tắt hiệu ứng nhấn phím khi thả tay khỏi phím mũi tên
document.addEventListener('keyup', (e) => {
  const key = e.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(key)) {
    highlightVirtualKey(key, false);
  }
});

// Hàm chuyển đổi màu sáng cho phím ảo
function highlightVirtualKey(key, isActive) {
  let elementId = '';
  if (key === 'ArrowUp') elementId = 'key-up';
  else if (key === 'ArrowDown') elementId = 'key-down';
  else if (key === 'ArrowLeft') elementId = 'key-left';
  else if (key === 'ArrowRight') elementId = 'key-right';
  else if (key === 'Enter') elementId = 'key-enter';

  const el = document.getElementById(elementId);
  if (el) {
    if (isActive) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
}

// --- BÁO CÁO DASHBOARD ---
let activeView = 'checklist'; // 'checklist' hoặc 'report'

function switchTab(tabId) {
  const checklistFilter = document.querySelector('.filter-panel');
  const checklistContainer = document.getElementById('checklist-container');
  const reportContainer = document.getElementById('report-container');

  const tabChecklist = document.getElementById('tab-checklist');
  const tabReport = document.getElementById('tab-report');

  const titleEl = document.getElementById('current-project-title');
  const descEl = document.getElementById('current-project-desc');
  const currentProject = projects.find(p => p.id === currentProjectId);

  if (tabId === 'report') {
    activeView = 'report';
    checklistFilter.style.display = 'none';
    checklistContainer.style.display = 'none';
    reportContainer.style.display = 'flex';

    tabChecklist.classList.remove('active');
    tabReport.classList.add('active');

    // Cập nhật text tiêu đề và desc
    if (currentProject) {
      titleEl.innerText = `Báo cáo WCAG: ${currentProject.name}`;
    }
    if (descEl) {
      descEl.innerText = 'Báo cáo mức độ tuân thủ tiêu chuẩn WCAG 2.2';
    }

    renderReport();
  } else {
    activeView = 'checklist';
    checklistFilter.style.display = '';
    checklistContainer.style.display = '';
    reportContainer.style.display = 'none';

    tabReport.classList.remove('active');
    tabChecklist.classList.add('active');

    // Cập nhật text tiêu đề và desc
    if (currentProject) {
      titleEl.innerText = `Checklist WCAG: ${currentProject.name}`; //currentProject.name;
    }
    if (descEl) {
      descEl.innerText = 'Tự đánh giá khả năng tiếp cận dựa trên tiêu chí thiết kế WCAG 2.2';
    }

    renderChecklist();
  }

  // Cuộn lên đầu trang
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calculateStatsForCategory(catId) {
  const currentProject = projects.find(p => p.id === currentProjectId);
  const state = currentProject ? currentProject.state : {};

  let doneCount = 0;
  let todoCount = 0;
  let naCount = 0;
  let unselectedCount = 0;
  let totalItems = 0;

  WCAG_DATA.forEach(item => {
    if (catId !== 'all' && item.category !== catId) return;
    totalItems++;
    const status = state[item.id] || 'unselected';
    if (status === 'done') {
      doneCount++;
    } else if (status === 'todo') {
      todoCount++;
    } else if (status === 'na') {
      naCount++;
    } else {
      unselectedCount++;
    }
  });

  const totalApplicable = doneCount + todoCount + unselectedCount;
  const percentage = totalApplicable > 0 ? Math.round((doneCount / totalApplicable) * 100) : 0;

  return {
    done: doneCount,
    todo: todoCount,
    na: naCount,
    unselected: unselectedCount,
    total: totalItems,
    percentage: percentage
  };
}

const categoryNames = {
  visual: 'Bố cục & Thị giác',
  interaction: 'Tương tác & Cử chỉ',
  form: 'Biểu mẫu & Nhập liệu',
  navigation: 'Điều hướng',
  media: 'Hình ảnh & Video'
};

function getColorForPercentage(pct) {
  if (pct < 50) {
    return 'var(--danger)';
  } else if (pct < 80) {
    return 'var(--yellow)';
  } else {
    return 'var(--success)';
  }
}

function renderReport() {
  const currentProject = projects.find(p => p.id === currentProjectId);
  if (!currentProject) return;

  // 1. Thống kê tổng quan
  const overall = calculateStatsForCategory('all');
  document.getElementById('report-pass-count').innerText = overall.done;
  document.getElementById('report-fail-count').innerText = overall.todo;
  document.getElementById('report-na-count').innerText = overall.na;
  document.getElementById('report-unselected-count').innerText = overall.unselected;

  // Vòng tròn SVG
  document.getElementById('gauge-text-val').textContent = `${overall.percentage}%`;

  // Cập nhật màu text % trong gauge
  const overallColor = getColorForPercentage(overall.percentage);
  document.getElementById('gauge-text-val').style.fill = overallColor;

  const circle = document.getElementById('gauge-fill-circle');
  if (circle) {
    const circumference = 251.2; // 2 * PI * r (r=40)
    const offset = circumference - (overall.percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = overallColor;
  }

  // 2. Tiến độ đạt chuẩn của từng nhóm tiêu chí
  const categoryBarsList = document.getElementById('category-bars-list');
  categoryBarsList.innerHTML = '';

  Object.keys(categoryNames).forEach(catId => {
    const stats = calculateStatsForCategory(catId);
    const barColor = getColorForPercentage(stats.percentage);
    const item = document.createElement('div');
    item.className = 'category-bar-item';
    item.innerHTML = `
      <div class="category-bar-header">
        <span class="category-bar-label">${categoryNames[catId]}</span>
        <span class="category-bar-pct" style="color: ${barColor};">${stats.percentage}%</span>
      </div>
      <div class="category-bar-track">
        <div class="category-bar-fill" style="width: ${stats.percentage}%; background-color: ${barColor};"></div>
      </div>
      <span class="category-bar-subtext">
        Đã đạt ${stats.done}/${stats.total - stats.na} tiêu chí áp dụng (${stats.na} N/A, ${stats.todo} Fail, ${stats.unselected} Chưa đánh giá)
      </span>
    `;
    categoryBarsList.appendChild(item);
  });

  // 3. Render danh sách chi tiết các tiêu chí (rút gọn)
  renderReportDetails();
}

function renderReportDetails() {
  const currentProject = projects.find(p => p.id === currentProjectId);
  const state = currentProject ? currentProject.state : {};
  const selectedCat = document.getElementById('report-category-select').value;
  const grid = document.getElementById('report-details-grid');
  grid.innerHTML = '';

  const showPass = document.getElementById('rep-filter-pass').checked;
  const showFail = document.getElementById('rep-filter-fail').checked;
  const showNA = document.getElementById('rep-filter-na').checked;
  const isAnyFilterActive = showPass || showFail || showNA;

  const categoriesToRender = selectedCat === 'all'
    ? ['visual', 'interaction', 'form', 'navigation', 'media']
    : [selectedCat];

  const statusOrder = { 'done': 1, 'todo': 2, 'unselected': 3, 'na': 4 };

  categoriesToRender.forEach(catId => {
    let items = WCAG_DATA.filter(item => item.category === catId);
    if (items.length === 0) return;

    // Lọc theo trạng thái Pass / Fail / NA
    items = items.filter(item => {
      const status = state[item.id] || 'unselected';
      if (!isAnyFilterActive) return true; // Hiển thị tất cả nếu không chọn gì

      if (showPass && status === 'done') return true;
      if (showFail && (status === 'todo' || status === 'unselected')) return true;
      if (showNA && status === 'na') return true;

      return false;
    });

    if (items.length === 0) return;

    // Sắp xếp: Pass -> Fail -> Chưa đánh giá -> N/A
    items.sort((a, b) => {
      const statusA = state[a.id] || 'unselected';
      const statusB = state[b.id] || 'unselected';
      return statusOrder[statusA] - statusOrder[statusB];
    });

    const stats = calculateStatsForCategory(catId);
    const groupContainer = document.createElement('div');
    groupContainer.className = 'report-group-container';

    let itemsHtml = items.map(item => {
      const status = state[item.id] || 'unselected';
      let indicatorHtml = '';

      if (status === 'done') {
        indicatorHtml = `<span class="status-indicator indicator-done" title="Pass"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>`;
      } else if (status === 'todo') {
        indicatorHtml = `<span class="status-indicator indicator-todo" title="Fail"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span>`;
      } else { // 'unselected' or 'na'
        const titleText = status === 'na' ? 'N/A' : 'Chưa đánh giá';
        indicatorHtml = `<span class="status-indicator indicator-hidden" title="${titleText}"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg></span>`;
      }

      return `
        <div class="report-item-row">
          ${indicatorHtml}
          <span class="badge badge-item badge-id">${item.wcag}</span>
          <span class="badge badge-level badge-level-${item.level.toLowerCase()}">${item.level}</span>
          <span class="report-item-title">${item.title}</span>
        </div>
      `;
    }).join('');

    groupContainer.innerHTML = `
      <div class="report-group-title">
        <span>${categoryNames[catId]}</span>
        <span class="report-group-badge">Đạt ${stats.percentage}% (${stats.done} Pass, ${stats.todo} Fail, ${stats.na} N/A)</span>
      </div>
      <div class="report-items-list">
        ${itemsHtml}
      </div>
    `;
    grid.appendChild(groupContainer);
  });
}
