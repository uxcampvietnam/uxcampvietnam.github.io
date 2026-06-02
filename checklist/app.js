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
  renderProjectDropdown();
  renderCategoryPills();
  bindEvents();
  renderChecklist();
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

// Render các nút chọn nhanh danh mục (Pill buttons)
function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  container.innerHTML = '';

  const categories = [
    { id: 'all', label: 'Tất cả nhóm' },
    { id: 'visual', label: 'Bố cục & Thị giác' },
    { id: 'interaction', label: 'Tương tác & Cử chỉ' },
    { id: 'form', label: 'Biểu mẫu & Nhập liệu' },
    { id: 'navigation', label: 'Điều hướng' },
    { id: 'media', label: 'Hình ảnh & Video' }
  ];

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `pill-btn ${activeCategoryFilter === cat.id ? 'active' : ''}`;
    btn.textContent = cat.label;
    btn.setAttribute('data-category', cat.id);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategoryFilter = cat.id;
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

  // Nút Reset dự án hiện tại
  document.getElementById('btn-reset-project').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả các tiêu chí trong dự án này về trạng thái "Chưa đạt"?')) {
      const project = projects.find(p => p.id === currentProjectId);
      if (project) {
        project.state = {};
        saveToStorage();
        renderChecklist();
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
      if (activeStatusFilter === 'todo') {
        if (itemStatus !== 'todo' && itemStatus !== 'unselected') {
          return false;
        }
      } else if (itemStatus !== activeStatusFilter) {
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

    // Danh sách thẻ badges hiển thị bên trên tiêu đề
    let badgeHtml = `
      <span class="badge badge-id">WCAG ${item.wcag}</span>
      <span class="badge badge-level-${item.level.toLowerCase()}">Cấp độ ${item.level}</span>
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
            ${badgeHtml}
          </div>
          <h6>${item.title}</h6>
          <p class="font-sans-caption">${item.desc}</p>
        </div>
        
        <div class="status-selector">
          <button class="status-btn btn-na ${itemStatus === 'na' ? 'active' : ''}" data-status="na" title="Không áp dụng cho luồng này">N/A</button>
          <button class="status-btn btn-todo ${itemStatus === 'todo' ? 'active' : ''}" data-status="todo" title="Chưa đạt / Cần kiểm tra">Chưa đạt</button>
          <button class="status-btn btn-done ${itemStatus === 'done' ? 'active' : ''}" data-status="done" title="Đã đáp ứng thiết kế">Đã đạt</button>
        </div>
      </div>
      
      <details class="card-details">
        <summary>Hướng dẫn chi tiết & ví dụ thiết kế</summary>
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
*Báo cáo được tạo tự động bởi ứng dụng WCAG 2.2 Designer Checklist.*`;

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

    let newStatus = currentStatus;
    if (key === 'ArrowRight') {
      if (statusIndex < STATUS_SEQUENCE.length - 1) {
        newStatus = STATUS_SEQUENCE[statusIndex + 1];
      }
    } else {
      if (statusIndex > 0) {
        newStatus = STATUS_SEQUENCE[statusIndex - 1];
      }
    }

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
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
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

  const el = document.getElementById(elementId);
  if (el) {
    if (isActive) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
}
