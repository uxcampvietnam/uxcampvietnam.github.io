// --- QUẢN LÝ DỰ ÁN & STATE CHO HEURISTIC EVALUATION ---
let projects = [];
let currentProjectId = 'default';
let activeChecklist = 'nielsen';
let activeCategoryFilter = 'all';
let activeStatusFilter = 'all';
let searchQuery = '';
let activeCardId = null;
let activeView = 'checklist'; // 'checklist' hoặc 'report'

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
  window.trackEvent('view_page', { page_name: 'heuristic_evaluation' });
  initLocalStorage();
  initSidebarCollapse();
  renderProjectDropdown();
  renderCategoryDropdown();
  bindEvents();
  switchTab(activeView);
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

      if (!p.failReasons) {
        p.failReasons = {
          nielsen: {},
          gerhardt: {},
          shneiderman: {},
          weinschenk: {}
        };
      } else {
        if (!p.failReasons.nielsen) p.failReasons.nielsen = {};
        if (!p.failReasons.gerhardt) p.failReasons.gerhardt = {};
        if (!p.failReasons.shneiderman) p.failReasons.shneiderman = {};
        if (!p.failReasons.weinschenk) p.failReasons.weinschenk = {};
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
        },
        failReasons: {
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

// Khởi tạo trạng thái thu nhỏ sidebar từ LocalStorage
function initSidebarCollapse() {
  const isCollapsed = localStorage.getItem('heuristic_designer_sidebar_collapsed') === 'true';
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

// Render các tùy chọn nhóm danh mục (dropdown select) động dựa trên bộ checklist
function renderCategoryDropdown() {
  const select = document.getElementById('category-filter');
  if (!select) return;

  select.innerHTML = '';

  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  const optionAll = document.createElement('option');
  optionAll.value = 'all';
  optionAll.textContent = 'Tất cả nhóm';
  if (activeCategoryFilter === 'all') {
    optionAll.selected = true;
  }
  select.appendChild(optionAll);

  checklistData.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id.toString();
    opt.textContent = `${prefix}${cat.id}: ${cat.name}`;
    if (activeCategoryFilter === cat.id.toString()) {
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
    window.trackEvent('switch_project', {
      project_id: currentProjectId,
      project_name: currentProject ? currentProject.name : ''
    });
    switchTab(activeView);
    updateProgressAndStats();
  });

  // Thay đổi bộ checklist quy chuẩn
  document.getElementById('checklist-select').addEventListener('change', (e) => {
    activeChecklist = e.target.value;
    activeCategoryFilter = 'all';
    activeCardId = null;
    saveToStorage();
    window.trackEvent('switch_heuristic_type', {
      heuristic_type: activeChecklist
    });
    renderCategoryDropdown();
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
      state: {
        nielsen: {},
        gerhardt: {},
        shneiderman: {},
        weinschenk: {}
      },
      failReasons: {
        nielsen: {},
        gerhardt: {},
        shneiderman: {},
        weinschenk: {}
      }
    });
    currentProjectId = newId;
    saveToStorage();
    window.trackEvent('create_project', {
      project_id: newId,
      project_name: name
    });
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
      window.trackEvent('rename_project', {
        project_id: currentProjectId,
        old_name: oldName,
        new_name: name
      });
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
      const deletedId = currentProjectId;
      const deletedName = currentProject.name;
      projects = projects.filter(p => p.id !== currentProjectId);
      currentProjectId = projects[0].id;
      saveToStorage();
      window.trackEvent('delete_project', {
        project_id: deletedId,
        project_name: deletedName
      });
      renderProjectDropdown();
      switchTab(activeView);
      updateProgressAndStats();
      showToast('Đã xóa dự án thành công.');
    }
  });

  // Tìm kiếm thời gian thực
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    window.trackSearchDebounced(searchQuery);
    renderChecklist();
  });

  // Lọc theo nhóm danh mục
  document.getElementById('category-filter').addEventListener('change', (e) => {
    activeCategoryFilter = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    window.trackEvent('change_filter_category', {
      category_id: activeCategoryFilter,
      category_name: selectedOption ? selectedOption.textContent : ''
    });
    renderChecklist();
  });

  // Lọc theo trạng thái checkbox (Done, Todo, NA)
  document.getElementById('status-filter').addEventListener('change', (e) => {
    activeStatusFilter = e.target.value;
    window.trackEvent('change_filter_status', {
      status: activeStatusFilter
    });
    renderChecklist();
  });

  // Chuyển đổi Dark Mode/Light Mode
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('wcag_designer_theme', newTheme);
    window.trackEvent('change_theme', {
      theme: newTheme
    });
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
    const currentProject = projects.find(p => p.id === currentProjectId);
    window.trackEvent('export_report', {
      project_name: currentProject ? currentProject.name : '',
      checklist_type: `Heuristics (${activeChecklist})`,
      format: 'markdown'
    });
    exportToMarkdown();
  });

  // Nút Tải Agent Skills
  document.getElementById('btn-download-skills').addEventListener('click', () => {
    window.trackEvent('download_agent_skills', {
      checklist_type: `Heuristics (${activeChecklist})`
    });
    const knowledgeFiles = {
      nielsen: { path: 'skills/nielsens-heuristics-knowledge.json', name: 'nielsens-heuristics-knowledge.json', label: "Nielsen's Heuristics" },
      gerhardt: { path: 'skills/cognitive-engineering-gerhardt-powals-knowledge.json', name: 'cognitive-engineering-gerhardt-powals-knowledge.json', label: 'Gerhardt-Powals' },
      shneiderman: { path: 'skills/shneidermans-eight-golden-rules-knowledge.json', name: 'shneidermans-eight-golden-rules-knowledge.json', label: 'Shneiderman' },
      weinschenk: { path: 'skills/weinschenk-barker-classification-knowledge.json', name: 'weinschenk-barker-classification-knowledge.json', label: 'Weinschenk' }
    };
    const selectedKnowledge = knowledgeFiles[activeChecklist];
    if (selectedKnowledge) {
      downloadAgentSkills([
        { url: 'skills/heuristics-skill.md', name: 'heuristics-skill.md' },
        { url: selectedKnowledge.path, name: selectedKnowledge.name }
      ], `Heuristics (${selectedKnowledge.label})`);
    }
  });

  // Nút Reset dự án hiện tại
  document.getElementById('btn-reset-project').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả các tiêu chí của bộ quy chuẩn hiện tại trong dự án này về trạng thái chưa đánh giá?')) {
      const project = projects.find(p => p.id === currentProjectId);
      if (project) {
        project.state[activeChecklist] = {};
        saveToStorage();
        window.trackEvent('reset_project', {
          project_id: currentProjectId,
          project_name: project.name,
          checklist_type: `Heuristics (${activeChecklist})`
        });
        switchTab(activeView);
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

  // Toggle thu nhỏ sidebar trên desktop
  const sidebarToggle = document.getElementById('sidebar-toggle-btn');
  const container = document.querySelector('.app-container');
  if (sidebarToggle && container) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = container.classList.toggle('sidebar-collapsed');
      localStorage.setItem('heuristic_designer_sidebar_collapsed', isCollapsed);
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

  // Tab Navigation clicks
  document.getElementById('tab-checklist').addEventListener('click', () => {
    switchTab('checklist');
  });

  document.getElementById('tab-report').addEventListener('click', () => {
    switchTab('report');
  });

  // Report filters and selectors
  document.getElementById('report-category-select').addEventListener('change', (e) => {
    window.trackEvent('report_filter_category', {
      category_id: e.target.value
    });
    renderReportDetails();
  });

  document.getElementById('rep-filter-pass').addEventListener('change', () => {
    window.trackEvent('report_filter_status', {
      show_pass: document.getElementById('rep-filter-pass').checked,
      show_fail: document.getElementById('rep-filter-fail').checked,
      show_na: document.getElementById('rep-filter-na').checked
    });
    renderReportDetails();
  });

  document.getElementById('rep-filter-fail').addEventListener('change', () => {
    window.trackEvent('report_filter_status', {
      show_pass: document.getElementById('rep-filter-pass').checked,
      show_fail: document.getElementById('rep-filter-fail').checked,
      show_na: document.getElementById('rep-filter-na').checked
    });
    renderReportDetails();
  });

  document.getElementById('rep-filter-na').addEventListener('change', () => {
    window.trackEvent('report_filter_status', {
      show_pass: document.getElementById('rep-filter-pass').checked,
      show_fail: document.getElementById('rep-filter-fail').checked,
      show_na: document.getElementById('rep-filter-na').checked
    });
    renderReportDetails();
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
        window.trackEvent('click_virtual_dpad', {
          key: keyName
        });
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
        if (status !== activeStatusFilter) {
          return;
        }
      }

      // 3. Lọc theo từ khóa tìm kiếm (searchQuery)
      if (searchQuery) {
        const matchTitle = (crit.title || '').toLowerCase().includes(searchQuery);
        const matchDesc = (crit.desc || '').toLowerCase().includes(searchQuery);
        const matchWhy = (crit.why || '').toLowerCase().includes(searchQuery);
        const matchCat = cat.name.toLowerCase().includes(searchQuery);
        const matchId = `${prefix.toLowerCase()}${cat.id}.${crit.id}`.includes(searchQuery) || itemId.includes(searchQuery);

        if (!matchTitle && !matchDesc && !matchWhy && !matchCat && !matchId) {
          return;
        }
      }

      filteredItems.push({
        catId: cat.id,
        catName: cat.name,
        id: crit.id,
        itemId: itemId,
        title: crit.title,
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
        if (step && step.trim() !== '') {
          howListHtml += `<li>${step}</li>`;
        }
      });
    }

    let whySectionHtml = '';
    if (item.why && item.why.trim() !== '') {
      whySectionHtml = `
          <div class="details-section">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>              Tại sao điều này quan trọng?
            </h4>
            <p style="color:var(--text-muted); padding-left: 20px;">${item.why}</p>
          </div>
      `;
    }

    let howSectionHtml = '';
    if (howListHtml !== '') {
      howSectionHtml = `
          <div class="details-section">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              Hướng dẫn thiết kế cho Designer
            </h4>
            <ul>
              ${howListHtml}
            </ul>
          </div>
      `;
    }

    let doBoxHtml = '';
    if (item.do && item.do.trim() !== '') {
      doBoxHtml = `
            <div class="compare-box do-box">
              <h5>
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                NÊN LÀM (DO)
              </h5>
              <p>${item.do}</p>
            </div>
      `;
    }

    let dontBoxHtml = '';
    if (item.dont && item.dont.trim() !== '') {
      dontBoxHtml = `
            <div class="compare-box dont-box">
              <h5>
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                TRÁNH LÀM (DON'T)
              </h5>
              <p>${item.dont}</p>
            </div>
      `;
    }

    let compareContainerHtml = '';
    if (doBoxHtml !== '' || dontBoxHtml !== '') {
      compareContainerHtml = `
          <div class="compare-container">
            ${doBoxHtml}
            ${dontBoxHtml}
          </div>
      `;
    }

    let detailsHtml = '';
    if (whySectionHtml !== '' || howSectionHtml !== '' || compareContainerHtml !== '') {
      detailsHtml = `
      <details class="card-details">
        <summary>Chi tiết & ví dụ</summary>
        <div class="details-content">
          ${whySectionHtml}
          ${howSectionHtml}
          ${compareContainerHtml}
        </div>
      </details>
      `;
    }

    // Lấy lý do fail đã lưu (nếu có)
    const failReasons = (currentProject.failReasons && currentProject.failReasons[activeChecklist]) || {};
    const failReasonText = failReasons[item.itemId] || '';

    // Tạo icon indicator dựa trên trạng thái
    let indicatorHtml = '';
    if (item.status === 'done') {
      indicatorHtml = `<span class="status-indicator indicator-done" aria-label="Pass"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>`;
    } else if (item.status === 'todo') {
      indicatorHtml = `<span class="status-indicator indicator-todo" aria-label="Fail"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span>`;
    } else {
      indicatorHtml = `<span class="status-indicator indicator-hidden" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg></span>`;
    }

    card.innerHTML = `
      <div class="card-header-main">
        <div class="card-title-group">
          <div class="card-badges">
            ${indicatorHtml}
            <span class="badge badge-id">${code}</span>
            <span class="badge" style="background:var(--bg-secondary); color:var(--text-muted); border:1px solid var(--border-color); font-weight:500;">${item.catName}</span>
          </div>
          <h6 style="font-size: 1.05rem; line-height: 1.5; font-weight: 500; margin-top: 8px; color: var(--text-color);">${item.title}</h6>
          ${item.desc && item.desc.trim() !== '' ? `<p class="font-sans-caption">${item.desc}</p>` : ''}
        </div>
        
        <div class="status-selector">
          <button class="status-btn btn-na ${item.status === 'na' ? 'active' : ''}" data-status="na" title="Không áp dụng cho luồng này">N/A</button>
          <button class="status-btn btn-todo ${item.status === 'todo' ? 'active' : ''}" data-status="todo" title="Fail">Fail</button>
          <button class="status-btn btn-done ${item.status === 'done' ? 'active' : ''}" data-status="done" title="Pass">Pass</button>
        </div>
      </div>
      <div class="fail-reason-container" style="display: ${item.status === 'todo' ? 'flex' : 'none'};">
        <label class="fail-reason-label">Lý do đánh fail luồng.</label>
        <input type="text" class="fail-reason-input" placeholder="Ấn Enter để bắt đầu nhập" value="${failReasonText.replace(/"/g, '&quot;')}" />
        <div class="fail-reason-hint">Bấm Enter để hoàn thành</div>
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

        window.trackEvent('change_criterion_status', {
          criterion_id: item.itemId,
          criterion_title: item.title,
          status: newStatus,
          checklist_type: `Heuristics (${activeChecklist})`,
          project_id: currentProjectId
        });

        // Cập nhật trạng thái active trên các nút
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Cập nhật màu viền & nền thẻ
        card.classList.remove('card-done', 'card-todo', 'card-na');
        if (newStatus === 'done') card.classList.add('card-done');
        if (newStatus === 'todo') card.classList.add('card-todo');
        if (newStatus === 'na') card.classList.add('card-na');

        // Cập nhật hiển thị ô nhập lý do fail
        const failContainer = card.querySelector('.fail-reason-container');
        if (failContainer) {
          failContainer.style.display = newStatus === 'todo' ? 'flex' : 'none';
        }

        // Cập nhật icon indicator
        updateIndicatorIcon(card, newStatus);

        // Cập nhật thanh tiến trình và tổng số lượng
        updateProgressAndStats();
      });
    });

    // Lắng nghe sự kiện nhập lý do fail
    const reasonInput = card.querySelector('.fail-reason-input');
    if (reasonInput) {
      reasonInput.addEventListener('input', (e) => {
        if (!currentProject.failReasons) {
          currentProject.failReasons = { nielsen: {}, gerhardt: {}, shneiderman: {}, weinschenk: {} };
        }
        if (!currentProject.failReasons[activeChecklist]) {
          currentProject.failReasons[activeChecklist] = {};
        }
        currentProject.failReasons[activeChecklist][item.itemId] = e.target.value;
        saveToStorage();
      });
      reasonInput.addEventListener('change', (e) => {
        window.trackEvent('input_fail_reason', {
          criterion_id: item.itemId,
          reason_length: e.target.value.trim().length,
          checklist_type: `Heuristics (${activeChecklist})`,
          project_id: currentProjectId
        });
      });
      reasonInput.addEventListener('keydown', (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        if (e.key === 'Enter') {
          e.preventDefault();
          reasonInput.blur();
          card.focus();
        }
      });
    }

    // Nếu có tìm kiếm và từ khóa khớp với nội dung chi tiết ẩn, hãy mở rộng details
    if (searchQuery) {
      const matchWhy = (item.why || '').toLowerCase().includes(searchQuery);
      const matchHow = item.how && item.how.some(h => h.toLowerCase().includes(searchQuery));
      if (matchWhy || matchHow) {
        card.querySelector('.card-details').setAttribute('open', '');
      }
    }

    const detailsEl = card.querySelector('.card-details');
    if (detailsEl) {
      detailsEl.addEventListener('toggle', (e) => {
        window.trackEvent('toggle_criterion_details', {
          criterion_id: item.itemId,
          is_open: detailsEl.hasAttribute('open'),
          checklist_type: `Heuristics (${activeChecklist})`
        });
      });
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

  const failReasons = (currentProject.failReasons && currentProject.failReasons[activeChecklist]) || {};

  checklistData.categories.forEach(cat => {
    cat.criteria.forEach(crit => {
      const itemId = `${cat.id}_${crit.id}`;
      const status = state[itemId] || 'unselected';
      const code = `${prefix}${cat.id}.${crit.id}`;
      const detailPart = crit.desc ? `\n   - *Chi tiết*: ${crit.desc}` : '';
      
      let itemText = `**[${code}] ${cat.name}**: ${crit.title}${detailPart}\n   - *Lý do*: ${crit.why}`;
      
      const failReasonText = failReasons[itemId] || '';
      if (status === 'todo' && failReasonText) {
        itemText += `\n   - **Lý do chưa đạt**: ${failReasonText}`;
      }

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
  md += `- **Đạt chuẩn**: ${doneList.length}\n`;
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
    
    // Hide the fail reason container
    const failContainer = cardEl.querySelector('.fail-reason-container');
    if (failContainer) {
      failContainer.style.display = 'none';
    }

    updateIndicatorIcon(cardEl, 'unselected');
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

  const key = e.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(key)) {
    window.trackEvent('press_keyboard_shortcut', {
      key: key
    });
  }

  const visibleCards = Array.from(document.querySelectorAll('.checklist-card'));
  if (visibleCards.length === 0) return;

  const currentFocusedIndex = visibleCards.findIndex(c => c.classList.contains('focused-card'));

  // Xử lý phím Enter để đóng/mở chi tiết thẻ đang focus hoặc focus vào input lý do fail
  if (key === 'Enter') {
    highlightDpadKey('key-enter');
    if (activeCardId) {
      const activeCardEl = document.getElementById(`card-${activeCardId}`);
      if (activeCardEl && document.activeElement === activeCardEl) {
        const currentProject = projects.find(p => p.id === currentProjectId);
        const state = (currentProject && currentProject.state[activeChecklist]) || {};
        const isFailed = state[activeCardId] === 'todo';

        if (isFailed) {
          const reasonInput = activeCardEl.querySelector('.fail-reason-input');
          if (reasonInput) {
            e.preventDefault();
            reasonInput.focus();
            return;
          }
        }

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

// --- BÁO CÁO DASHBOARD ---
function switchTab(tabId) {
  window.trackEvent('switch_tab', {
    tab_name: tabId
  });

  const checklistFilter = document.querySelector('.filter-panel');
  const checklistContainer = document.getElementById('checklist-container');
  const reportContainer = document.getElementById('report-container');

  const tabChecklist = document.getElementById('tab-checklist');
  const tabReport = document.getElementById('tab-report');

  const titleEl = document.getElementById('current-project-title');
  const descEl = document.getElementById('current-project-desc');
  const currentProject = projects.find(p => p.id === currentProjectId);
  const checklistData = HEURISTIC_DATA[activeChecklist];

  if (tabId === 'report') {
    activeView = 'report';
    checklistFilter.style.display = 'none';
    checklistContainer.style.display = 'none';
    reportContainer.style.display = 'flex';

    tabChecklist.classList.remove('active');
    tabReport.classList.add('active');

    // Cập nhật text tiêu đề và desc
    if (currentProject) {
      titleEl.innerText = `Báo cáo Heuristic luồng: ${currentProject.name}`;
    }
    if (descEl && checklistData) {
      descEl.innerText = `Báo cáo đánh giá Trải nghiệm Người dùng dựa trên bộ quy chuẩn ${checklistData.title}`;
    }

    populateReportCategorySelect();
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
      titleEl.innerText = currentProject.name;
    }
    if (descEl) {
      descEl.innerText = 'Đánh giá Heuristics sản phẩm dựa trên 4 bộ quy chuẩn thiết kế phổ biến';
    }

    renderChecklist();
    updateProgressAndStats();
  }

  // Cuộn lên đầu trang
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateReportCategorySelect() {
  const select = document.getElementById('report-category-select');
  if (!select) return;

  const savedValue = select.value || 'all';
  select.innerHTML = '';

  const optionAll = document.createElement('option');
  optionAll.value = 'all';
  optionAll.textContent = 'Tất cả nhóm';
  select.appendChild(optionAll);

  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  checklistData.categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id.toString();
    option.textContent = `${prefix}${cat.id}: ${cat.name}`;
    select.appendChild(option);
  });

  // Bảo toàn giá trị nếu hợp lệ
  if (Array.from(select.options).some(opt => opt.value === savedValue)) {
    select.value = savedValue;
  } else {
    select.value = 'all';
  }
}

function calculateStatsForCategory(catId) {
  const currentProject = projects.find(p => p.id === currentProjectId);
  const state = (currentProject && currentProject.state) ? (currentProject.state[activeChecklist] || {}) : {};
  const checklistData = HEURISTIC_DATA[activeChecklist];

  let doneCount = 0;
  let todoCount = 0;
  let naCount = 0;
  let unselectedCount = 0;
  let totalItems = 0;

  if (checklistData) {
    checklistData.categories.forEach(cat => {
      if (catId !== 'all' && cat.id.toString() !== catId.toString()) return;

      cat.criteria.forEach(crit => {
        totalItems++;
        const itemId = `${cat.id}_${crit.id}`;
        const status = state[itemId] || 'unselected';

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
    });
  }

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

  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

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

  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  checklistData.categories.forEach(cat => {
    const stats = calculateStatsForCategory(cat.id);
    const barColor = getColorForPercentage(stats.percentage);
    const item = document.createElement('div');
    item.className = 'category-bar-item';
    item.innerHTML = `
      <div class="category-bar-header">
        <span class="category-bar-label">${prefix}${cat.id}: ${cat.name}</span>
        <span class="category-bar-pct" style="color: ${barColor};">${stats.percentage}% đạt chuẩn</span>
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
  const state = (currentProject && currentProject.state) ? (currentProject.state[activeChecklist] || {}) : {};
  const selectedCat = document.getElementById('report-category-select').value;
  const grid = document.getElementById('report-details-grid');
  grid.innerHTML = '';

  const checklistData = HEURISTIC_DATA[activeChecklist];
  if (!checklistData) return;

  const showPass = document.getElementById('rep-filter-pass').checked;
  const showFail = document.getElementById('rep-filter-fail').checked;
  const showNA = document.getElementById('rep-filter-na').checked;
  const isAnyFilterActive = showPass || showFail || showNA;

  const categoriesToRender = selectedCat === 'all'
    ? checklistData.categories.map(c => c.id)
    : [parseInt(selectedCat)];

  const statusOrder = { 'done': 1, 'todo': 2, 'unselected': 3, 'na': 4 };
  const prefix = activeChecklist === 'nielsen' ? 'H' : activeChecklist === 'gerhardt' ? 'P' : activeChecklist === 'shneiderman' ? 'R' : 'C';

  categoriesToRender.forEach(catId => {
    const cat = checklistData.categories.find(c => c.id === catId);
    if (!cat) return;

    let items = cat.criteria.map(crit => ({
      ...crit,
      itemId: `${cat.id}_${crit.id}`,
      code: `${prefix}${cat.id}.${crit.id}`
    }));

    // Lọc theo trạng thái Pass / Fail / NA
    items = items.filter(item => {
      const status = state[item.itemId] || 'unselected';
      if (!isAnyFilterActive) return true; // Hiển thị tất cả nếu không chọn gì

      if (showPass && status === 'done') return true;
      if (showFail && (status === 'todo' || status === 'unselected')) return true;
      if (showNA && status === 'na') return true;

      return false;
    });

    if (items.length === 0) return;

    // Sắp xếp: Pass -> Fail -> Chưa đánh giá -> N/A
    items.sort((a, b) => {
      const statusA = state[a.itemId] || 'unselected';
      const statusB = state[b.itemId] || 'unselected';
      return statusOrder[statusA] - statusOrder[statusB];
    });

    const stats = calculateStatsForCategory(cat.id);
    const groupContainer = document.createElement('div');
    groupContainer.className = 'report-group-container';

    let itemsHtml = items.map(item => {
      const status = state[item.itemId] || 'unselected';
      let indicatorHtml = '';

      if (status === 'done') {
        indicatorHtml = `<span class="status-indicator indicator-done" title="Pass"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>`;
      } else if (status === 'todo') {
        indicatorHtml = `<span class="status-indicator indicator-todo" title="Fail"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span>`;
      } else { // 'unselected' or 'na'
        const titleText = status === 'na' ? 'N/A' : 'Chưa đánh giá';
        indicatorHtml = `<span class="status-indicator indicator-hidden" title="${titleText}"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg></span>`;
      }

      const itemFailReasons = (currentProject.failReasons && currentProject.failReasons[activeChecklist]) || {};
      const failReasonText = itemFailReasons[item.itemId] || '';
      const reasonHtml = (status === 'todo' && failReasonText)
        ? `<div class="report-item-fail-reason">Lý do fail: ${failReasonText}</div>`
        : '';

      return `
        <div class="report-item-wrapper">
          <div class="report-item-row">
            ${indicatorHtml}
            <span class="badge badge-id">${item.code}</span>
            <span class="report-item-title">${item.title}</span>
          </div>
          ${reasonHtml}
        </div>
      `;
    }).join('');

    groupContainer.innerHTML = `
      <div class="report-group-title">
        <span>${prefix}${cat.id}: ${cat.name}</span>
        <span class="report-group-badge">Đạt ${stats.percentage}% (${stats.done} Pass, ${stats.todo} Fail, ${stats.na} N/A)</span>
      </div>
      <div class="report-items-list">
        ${itemsHtml}
      </div>
    `;
    grid.appendChild(groupContainer);
  });
}
