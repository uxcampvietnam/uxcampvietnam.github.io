// Common layout builder and cart state manager for Nha Thuoc Hay Wireframe Prototype

// --- CART STATE MANAGER (localStorage wrapper) ---
const CartManager = {
  getCart() {
    try {
      const cart = localStorage.getItem("nth_cart");
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error("Error reading cart from localStorage", e);
      return [];
    }
  },
  
  saveCart(cart) {
    try {
      localStorage.setItem("nth_cart", JSON.stringify(cart));
      // Dispatch custom event to update header badge on current page
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      console.error("Error writing cart to localStorage", e);
    }
  },
  
  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        specification: product.specification,
        category1: product.category1,
        is_prescription: product.is_prescription,
        quantity: quantity
      });
    }
    this.saveCart(cart);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  },
  
  updateQty(productId, quantity) {
    let cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart(cart);
    }
  },
  
  removeFromCart(productId) {
    let cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    if (item) {
      showToast(`Đã xóa "${item.name}" khỏi giỏ hàng.`);
    }
  },
  
  clearCart() {
    this.saveCart([]);
  },
  
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
};

// --- GLOBAL TOAST NOTIFICATION UTILITY ---
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);
  
  // Remove toast from DOM after animation completes (3s)
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// --- DYNAMIC HEADER, FOOTER, CHAT WIDGET GENERATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  setupNavDropdown();
  renderFooter();
  renderChatWidget();
  highlightActiveLink();
  
  // Listen for cart update events to refresh the badge count
  window.addEventListener("cartUpdated", updateCartBadgeCount);
  updateCartBadgeCount();
});

function renderHeader() {
  const header = document.querySelector("header");
  if (!header) return;
  
  // We identify the page name to resolve correct links in relative paths if needed
  const currentPath = window.location.pathname;
  const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  header.innerHTML = `
    <div class="header-top container">
      <a href="index.html" class="logo">
        <div class="logo-icon">H</div>
        <span>Nhà Thuốc Hay</span>
      </a>
      
      <div class="search-bar-container">
        <input type="text" id="global-search-input" class="search-input" placeholder="Tìm tên thuốc, bệnh lý, dược chất..." value="">
        <button id="global-search-btn" class="search-btn">Tìm kiếm</button>
      </div>
      
      <div class="header-actions">
        <select class="location-selector" id="location-select">
          <option value="HN">Hà Nội</option>
          <option value="HCM">TP. Hồ Chí Minh</option>
          <option value="DN">Đà Nẵng</option>
          <option value="CT">Cần Thơ</option>
        </select>
        
        <a href="tai-don-thuoc.html" class="header-btn primary">
          <span>📋</span> Cần mua thuốc (Tải đơn)
        </a>
        
        <a href="gio-hang.html" class="cart-icon-container" title="Giỏ hàng">
          <span>🛒</span>
          <span class="cart-badge" id="cart-badge-count">0</span>
        </a>
        
        <a href="tai-khoan.html" class="header-btn" title="Tài khoản">
          <span>👤</span> Cá nhân
        </a>
      </div>
    </div>
    
    <nav class="main-nav container">
      <a href="thuoc.html" class="nav-link" data-page="thuoc.html" data-category="Thuốc">Thuốc</a>
      <a href="thuc-pham-chuc-nang.html" class="nav-link" data-page="thuc-pham-chuc-nang.html" data-category="Thực phẩm chức năng">Thực phẩm chức năng</a>
      <a href="duoc-my-pham.html" class="nav-link" data-page="duoc-my-pham.html" data-category="Dược mỹ phẩm">Dược mỹ phẩm</a>
      <a href="cham-soc-ca-nhan-thiet-bi-y-te.html" class="nav-link" data-page="cham-soc-ca-nhan-thiet-bi-y-te.html" data-category="Chăm sóc cá nhân & Thiết bị y tế">Chăm sóc cá nhân & TB Y tế</a>
      <a href="tu-van-bac-si.html" class="nav-link" data-page="tu-van-bac-si.html">Tư vấn chuyên gia</a>
      <a href="goc-suc-khoe.html" class="nav-link" data-page="goc-suc-khoe.html">Góc sức khỏe</a>
      <a href="he-thong-nha-thuoc.html" class="nav-link" data-page="he-thong-nha-thuoc.html">Hệ thống nhà thuốc</a>
    </nav>
    <div id="nav-dropdown-portal" class="nav-dropdown-portal"></div>
  `;
  
  // Set search bar search parameter if present in URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchInput = document.getElementById("global-search-input");
  if (searchInput && urlParams.has("q")) {
    searchInput.value = urlParams.get("q");
  }
  
  // Search button action
  const searchBtn = document.getElementById("global-search-btn");
  if (searchBtn && searchInput) {
    const doSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `tra-cuu.html?q=${encodeURIComponent(query)}`;
      }
    };
    searchBtn.addEventListener("click", doSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") doSearch();
    });
  }
  
  // Load saved location if any
  const locationSelect = document.getElementById("location-select");
  if (locationSelect) {
    const savedLoc = localStorage.getItem("nth_location");
    if (savedLoc) locationSelect.value = savedLoc;
    locationSelect.addEventListener("change", (e) => {
      localStorage.setItem("nth_location", e.target.value);
      showToast(`Đã chuyển khu vực mua hàng sang: ${locationSelect.options[locationSelect.selectedIndex].text}`);
    });
  }
}

function renderFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  
  footer.innerHTML = `
    <div class="footer-grid container">
      <div class="footer-col">
        <h4>Về chúng tôi</h4>
        <ul class="footer-links">
          <li><a href="index.html">Giới thiệu Nhà Thuốc Hay</a></li>
          <li><a href="he-thong-nha-thuoc.html">Hệ thống cửa hàng vật lý</a></li>
          <li><a href="#">Tuyển dụng Dược sĩ</a></li>
          <li><a href="#">Liên hệ & Góp ý</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Chính sách dịch vụ</h4>
        <ul class="footer-links">
          <li><a href="#">Chính sách đổi trả trong 30 ngày</a></li>
          <li><a href="#">Chính sách giao hàng siêu tốc 2h</a></li>
          <li><a href="#">Bảo mật thông tin khách hàng</a></li>
          <li><a href="#">Điều khoản sử dụng website</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Tra cứu nhanh</h4>
        <ul class="footer-links">
          <li><a href="tra-cuu.html">Tra cứu thuốc chính hãng</a></li>
          <li><a href="tra-cuu.html?tab=don-hang">Kiểm tra tiến độ đơn hàng</a></li>
          <li><a href="goc-suc-khoe.html">Tra cứu bệnh học & sức khỏe</a></li>
          <li><a href="tra-cuu.html?tab=duoc-chat">Tra cứu danh mục dược chất</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Liên kết & Hỗ trợ</h4>
        <ul class="footer-links">
          <li><strong>Tổng đài hỗ trợ (Miễn cước):</strong></li>
          <li><span style="color:#ef4444; font-size:16px; font-weight:bold;">1800.6789</span> (8:00 - 22:00)</li>
          <li style="margin-top:12px;"><strong>Tải ứng dụng Nhà Thuốc Hay:</strong></li>
          <li><a href="#">📱 App Store (iOS)</a> | <a href="#">📱 Google Play (Android)</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom container">
      <p>© 2026 Bản quyền thuộc về Công ty Cổ phần Nhà Thuốc Hay. Wireframe Demo Bản quyền thử nghiệm cấu trúc.</p>
      <p style="font-size:11px; margin-top:4px; color:#64748b;">Mô phỏng cấu trúc website dựa trên tham khảo Long Châu & Pharmacity. Không giao dịch thật.</p>
    </div>
  `;
}

function renderChatWidget() {
  // Create bubble button
  const chatBubble = document.createElement("div");
  chatBubble.className = "chat-widget-btn";
  chatBubble.innerHTML = "💬";
  chatBubble.title = "Chat với Dược sĩ";
  document.body.appendChild(chatBubble);
  
  // Create chat window
  const chatWindow = document.createElement("div");
  chatWindow.className = "chat-window";
  chatWindow.id = "floating-chat-window";
  chatWindow.innerHTML = `
    <div class="chat-header">
      <span>Dược Sĩ Trực Tuyến 24/7</span>
      <span id="close-chat-widget" style="cursor:pointer; font-size:18px;">×</span>
    </div>
    <div class="chat-messages" id="chat-widget-msgs">
      <div class="chat-msg bot">
        Chào bạn! Tôi là Dược sĩ trực ban của Nhà Thuốc Hay. Bạn đang cần tư vấn vấn đề gì ạ?
        <div class="chat-options-list">
          <button class="chat-opt-btn" onclick="sendQuickChatMsg('Cần tìm mua thuốc')">Tìm thuốc</button>
          <button class="chat-opt-btn" onclick="sendQuickChatMsg('Hỏi cách sử dụng thuốc')">Cách dùng thuốc</button>
          <button class="chat-opt-btn" onclick="sendQuickChatMsg('Tra cứu đơn hàng vừa đặt')">Tra cứu đơn hàng</button>
        </div>
      </div>
    </div>
    <div class="chat-input-row">
      <input type="text" id="chat-widget-input" class="chat-input" placeholder="Nhập câu hỏi của bạn...">
      <button id="chat-widget-send" class="chat-send-btn">Gửi</button>
    </div>
  `;
  document.body.appendChild(chatWindow);
  
  // Toggle chat window
  chatBubble.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
  });
  
  const closeBtn = document.getElementById("close-chat-widget");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      chatWindow.classList.remove("active");
    });
  }
  
  // Send button
  const sendBtn = document.getElementById("chat-widget-send");
  const inputEl = document.getElementById("chat-widget-input");
  if (sendBtn && inputEl) {
    const handleSend = () => {
      const msg = inputEl.value.trim();
      if (msg) {
        addUserMsgToWidget(msg);
        inputEl.value = "";
      }
    };
    sendBtn.addEventListener("click", handleSend);
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSend();
    });
  }
}

function addUserMsgToWidget(msg) {
  const msgsContainer = document.getElementById("chat-widget-msgs");
  if (!msgsContainer) return;
  
  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg user";
  userMsg.innerText = msg;
  msgsContainer.appendChild(userMsg);
  msgsContainer.scrollTop = msgsContainer.scrollHeight;
  
  // Generate automated replies based on keywords
  setTimeout(() => {
    let reply = "Cảm ơn bạn đã nhắn tin. Dược sĩ trực tuyến đang kiểm tra thông tin và sẽ trả lời bạn chi tiết ngay lập tức.";
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes("tìm") || lowerMsg.includes("mua")) {
      reply = "Dạ, để tìm sản phẩm nhanh, bạn có thể gõ tên thuốc lên ô Tìm kiếm ở trên đầu trang, hoặc click vào danh mục sản phẩm (Thuốc, TPCN...) trên thanh menu điều hướng nhé.";
    } else if (lowerMsg.includes("dùng") || lowerMsg.includes("uống") || lowerMsg.includes("liều")) {
      reply = "Dạ đối với cách sử dụng thuốc, bạn vui lòng cho tôi biết tên cụ thể của thuốc hoặc chụp ảnh đơn thuốc gửi qua trang 'Cần mua thuốc' để dược sĩ chuyên môn kê liều chính xác nhé.";
    } else if (lowerMsg.includes("đơn hàng") || lowerMsg.includes("order") || lowerMsg.includes("tra cứu")) {
      reply = "Để kiểm tra đơn hàng, bạn có thể nhập Mã đơn hàng tại trang 'Tra cứu nhanh' hoặc xem lịch sử trong mục 'Cá nhân -> Quản lý đơn hàng'.";
    }
    
    const botMsg = document.createElement("div");
    botMsg.className = "chat-msg bot";
    botMsg.innerText = reply;
    msgsContainer.appendChild(botMsg);
    msgsContainer.scrollTop = msgsContainer.scrollHeight;
  }, 800);
}

// Global helper function for chat buttons
window.sendQuickChatMsg = function(msg) {
  addUserMsgToWidget(msg);
};

function updateCartBadgeCount() {
  const badge = document.getElementById("cart-badge-count");
  if (badge) {
    badge.innerText = CartManager.getCartCount();
  }
}

function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute("data-page");
    if (fileName === linkPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// --- CATEGORY MAPS AND HOVER DROPDOWN INTERACTIVITY ---

const CATEGORY_MAPS = {
  "Thực phẩm chức năng": [
    {
      id: "vitamin-khoang-chat",
      name: "Vitamin & Khoáng chất",
      icon: "💊",
      category2_matches: ["vitamin và khoáng chất", "vitamin khoáng chất", "vitamin và khoáng chất", "bổ sung sắt", "vitamin - bà bầu"],
      quick_links: [
        { name: "Dầu cá - Omega 3", img: "images/dau_ca_omega3.png", query: "Dầu cá - Omega 3" },
        { name: "Kẽm - Magie", img: "images/kem_magie.png", query: "Kẽm - Magie" },
        { name: "Vitamin tổng hợp", img: "images/vitamin_tong_hop.png", query: "Vitamin tổng hợp" },
        { name: "Canxi & Vitamin D", img: "images/canxi_vitamind.png", query: "Canxi & Vitamin D" },
        { name: "Vitamin C", img: "images/vitaminc.png", query: "Vitamin C" }
      ]
    },
    {
      id: "mien-dich-de-khang",
      name: "Miễn dịch - Đề kháng",
      icon: "🛡️",
      category2_matches: ["dị ứng và miễn dịch", "miễn dịch", "tăng cường sức khỏe"],
      quick_links: [
        { name: "Tăng đề kháng", img: "images/vitaminc.png", query: "đề kháng" },
        { name: "Vitamin tổng hợp", img: "images/vitamin_tong_hop.png", query: "Vitamin tổng hợp" }
      ]
    },
    {
      id: "sinh-ly-noi-tiet-to",
      name: "Sinh lý - Nội tiết tố",
      icon: "👥",
      category2_matches: ["sinh lý - nội tiết tố", "sinh lý nam", "nội tiết nữ", "thuốc nội tiết - sinh lý", "nội tiết và sinh lý"],
      quick_links: [
        { name: "Sinh lý nam", img: "images/kem_magie.png", query: "sinh lý nam" },
        { name: "Nội tiết tố nữ", img: "images/vitaminc.png", query: "nội tiết" }
      ]
    },
    {
      id: "mat-thi-luc",
      name: "Mắt - Thị lực",
      icon: "👁️",
      category2_matches: ["mắt"],
      quick_links: [
        { name: "Bổ mắt", img: "images/dau_ca_omega3.png", query: "bổ mắt" }
      ]
    },
    {
      id: "tieu-hoa",
      name: "Tiêu hóa",
      icon: "🧪",
      category2_matches: ["tiêu hóa - men vi sinh", "tiêu hóa gan mật", "tiết niệu sinh dục", "tiết niệu, sinh dục"],
      quick_links: [
        { name: "Men vi sinh", img: "images/vitamin_tong_hop.png", query: "men vi sinh" }
      ]
    },
    {
      id: "than-kinh-nao",
      name: "Thần kinh não",
      icon: "🧠",
      category2_matches: ["thần kinh", "thần kinh não bộ", "thần kinh - giấc ngủ", "tuần hoàn não"],
      quick_links: [
        { name: "Bổ não Ginkgo", img: "images/vitamin_tong_hop.png", query: "ginkgo" }
      ]
    },
    {
      id: "ho-tro-lam-dep",
      name: "Hỗ trợ làm đẹp",
      icon: "💆‍♀️",
      category2_matches: ["chăm sóc sắc đẹp", "nội tiết nữ - tiền mãn kinh"],
      quick_links: [
        { name: "Collagen sáng da", img: "images/vitaminc.png", query: "collagen" }
      ]
    },
    {
      id: "duong-huyet-tieu-duong",
      name: "Đường huyết - Tiểu đường",
      icon: "🩸",
      category2_matches: ["đái tháo đường"],
      quick_links: [
        { name: "Đường ăn kiêng", img: "images/vitamin_tong_hop.png", query: "đường ăn kiêng" }
      ]
    },
    {
      id: "tim-mach-huyet-ap",
      name: "Tim mạch - Huyết áp",
      icon: "❤️",
      category2_matches: ["tim mạch", "tim mạch huyết áp", "tim mạch - tuần hoàn", "tim mạch não bộ"],
      quick_links: [
        { name: "Huyết áp tim mạch", img: "images/dau_ca_omega3.png", query: "huyết áp" }
      ]
    },
    {
      id: "ho-hap-tai-mui-hong",
      name: "Hô hấp - Tai mũi họng",
      icon: "🫁",
      category2_matches: ["hô hấp", "hô hấp - giảm ho", "thuốc hô hấp", "hô hấp ho"],
      quick_links: [
        { name: "Xịt họng", img: "images/vitaminc.png", query: "xịt họng" }
      ]
    },
    {
      id: "co-xuong-khop",
      name: "Cơ xương khớp",
      icon: "🦵",
      category2_matches: ["xương khớp", "xương khớp vitamin", "cơ xương khớp"],
      quick_links: [
        { name: "Canxi & Vitamin D", img: "images/canxi_vitamind.png", query: "Canxi & Vitamin D" }
      ]
    }
  ],
  "Thuốc": [
    {
      id: "thuoc-ke-don",
      name: "Thuốc kê đơn",
      icon: "📄",
      category2_matches: ["kháng sinh", "kháng virus", "thuốc kháng sinh", "thuốc da liễu", "thuốc tim mạch - máu", "thuốc tiêu hóa - gan mật"],
      quick_links: [
        { name: "Kháng sinh", img: "images/kem_magie.png", query: "kháng sinh" }
      ]
    },
    {
      id: "thuoc-khong-ke-don",
      name: "Thuốc không kê đơn",
      icon: "💊",
      category2_matches: ["giảm đau hạ sốt", "giảm đau, chống viêm", "cao xoa dầu gió", "hạ sốt giảm đau"],
      quick_links: [
        { name: "Giảm đau hạ sốt", img: "images/vitaminc.png", query: "giảm đau" }
      ]
    }
  ],
  "Dược mỹ phẩm": [
    {
      id: "my-pham",
      name: "Mỹ phẩm chăm sóc",
      icon: "🧴",
      category2_matches: ["chăm sóc da", "dưỡng ẩm da", "chăm sóc da sẹo", "chăm sóc cơ thể", "khử mùi chăm sóc cơ thể"],
      quick_links: [
        { name: "Sữa rửa mặt", img: "images/vitaminc.png", query: "sữa rửa mặt" }
      ]
    }
  ],
  "Chăm sóc cá nhân & Thiết bị y tế": [
    {
      id: "trang-thiet-bi-y-te",
      name: "Trang thiết bị y tế",
      icon: "🩺",
      category2_matches: ["máy móc và thiết bị đo", "máy móc và thiết bị đo", "dụng cụ y tế", "que thử/bút thử/test", "vật tư y tế"],
      quick_links: [
        { name: "Nhiệt kế điện tử", img: "images/canxi_vitamind.png", query: "nhiệt kế" },
        { name: "Que thử thai", img: "images/vitamin_tong_hop.png", query: "que thử" }
      ]
    },
    {
      id: "hang-tieu-dung",
      name: "Hàng tiêu dùng",
      icon: "🪥",
      category2_matches: ["chăm sóc cá nhân", "chăm sóc răng miệng", "chăm sóc mẹ và bé", "bao cao su"],
      quick_links: [
        { name: "Khẩu trang y tế", img: "images/vitamin_tong_hop.png", query: "khẩu trang" }
      ]
    }
  ]
};

let hideTimeout = null;
let activeCategoryName = null;
let activeSubcategoryIndex = 0;

function setupNavDropdown() {
  const portal = document.getElementById("nav-dropdown-portal");
  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  if (!portal) return;

  const clearHideTimeout = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  };

  const startHideTimeout = () => {
    clearHideTimeout();
    hideTimeout = setTimeout(() => {
      portal.classList.remove("active");
      navLinks.forEach(l => l.classList.remove("hover-active"));
      activeCategoryName = null;
    }, 250);
  };

  navLinks.forEach(link => {
    const categoryName = link.getAttribute("data-category");
    if (!categoryName || !CATEGORY_MAPS[categoryName]) {
      link.addEventListener("mouseenter", startHideTimeout);
      return;
    }

    link.addEventListener("mouseenter", () => {
      clearHideTimeout();
      navLinks.forEach(l => l.classList.remove("hover-active"));
      link.classList.add("hover-active");

      portal.classList.add("active");
      if (activeCategoryName !== categoryName) {
        activeCategoryName = categoryName;
        activeSubcategoryIndex = 0;
        renderDropdown(categoryName);
      }
    });

    link.addEventListener("mouseleave", startHideTimeout);
  });

  portal.addEventListener("mouseenter", clearHideTimeout);
  portal.addEventListener("mouseleave", startHideTimeout);
}

function renderDropdown(catName) {
  const portal = document.getElementById("nav-dropdown-portal");
  if (!portal) return;

  const subcats = CATEGORY_MAPS[catName];
  if (!subcats || subcats.length === 0) {
    portal.classList.remove("active");
    return;
  }

  const sidebarHTML = subcats.map((sub, index) => `
    <div class="nav-dropdown-sidebar-item ${index === activeSubcategoryIndex ? 'active' : ''}" data-index="${index}">
      <span class="nav-dropdown-sidebar-item-icon">${sub.icon}</span>
      <span>${sub.name}</span>
    </div>
  `).join("");

  portal.innerHTML = `
    <div class="nav-dropdown-container">
      <div class="nav-dropdown-sidebar">
        ${sidebarHTML}
      </div>
      <div class="nav-dropdown-content" id="nav-dropdown-right-content">
      </div>
    </div>
  `;

  const sidebarItems = portal.querySelectorAll(".nav-dropdown-sidebar-item");
  sidebarItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      const index = parseInt(item.getAttribute("data-index"), 10);
      if (activeSubcategoryIndex !== index) {
        sidebarItems.forEach(sib => sib.classList.remove("active"));
        item.classList.add("active");
        activeSubcategoryIndex = index;
        renderDropdownRightSide(catName, index);
      }
    });
  });

  renderDropdownRightSide(catName, activeSubcategoryIndex);
}

function renderDropdownRightSide(catName, subcatIndex) {
  const container = document.getElementById("nav-dropdown-right-content");
  if (!container) return;

  const subcat = CATEGORY_MAPS[catName][subcatIndex];
  if (!subcat) return;

  const quickLinksHTML = subcat.quick_links.map(link => `
    <div class="nav-dropdown-quick-link-card" onclick="window.location.href='tra-cuu.html?q=${encodeURIComponent(link.query)}'">
      <img src="${link.img}" class="nav-dropdown-quick-link-img" alt="${link.name}">
      <span class="nav-dropdown-quick-link-name">${link.name}</span>
    </div>
  `).join("") + `
    <div class="nav-dropdown-quick-link-card" style="justify-content: center; background-color: #f1f5f9; border-style: dashed;" onclick="window.location.href='${getCategoryPageLink(catName)}'">
      <span class="nav-dropdown-quick-link-name" style="color: var(--wireframe-blue);">••• Xem thêm</span>
    </div>
  `;

  const matches = subcat.category2_matches.map(m => m.toLowerCase());
  const allProducts = typeof MOCK_PRODUCTS !== 'undefined' ? MOCK_PRODUCTS : [];
  
  const filteredProducts = allProducts.filter(p => {
    const isMainCat = p.page_category && p.page_category.toLowerCase() === catName.toLowerCase();
    if (!isMainCat) return false;

    const cat2 = (p.category2 || "").toLowerCase();
    const cat1 = (p.category1 || "").toLowerCase();
    return matches.some(match => cat2.includes(match) || cat1.includes(match));
  });

  const bestSellers = filteredProducts
    .sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0))
    .slice(0, 5);

  if (bestSellers.length === 0) {
    const fallbackProducts = allProducts
      .filter(p => p.page_category && p.page_category.toLowerCase() === catName.toLowerCase())
      .slice(0, 5);
    bestSellers.push(...fallbackProducts);
  }

  const bestSellersHTML = bestSellers.map(p => {
    const discount = p.original_price > p.price ? Math.round((1 - p.price / p.original_price) * 100) : 0;
    const discountTag = discount > 0 ? `<span class="nav-dropdown-product-discount-tag">-${discount}%</span>` : '';
    const oldPriceHTML = p.original_price > p.price ? `<span class="nav-dropdown-product-old-price">${p.original_price.toLocaleString()}đ</span>` : '';
    
    let imgPath = "images/dau_ca_omega3.png";
    const nameLower = p.name.toLowerCase();
    if (nameLower.includes("kẽm") || nameLower.includes("magie") || nameLower.includes("zinc")) {
      imgPath = "images/kem_magie.png";
    } else if (nameLower.includes("sắt") || nameLower.includes("ferr") || nameLower.includes("calcium") || nameLower.includes("canxi")) {
      imgPath = "images/canxi_vitamind.png";
    } else if (nameLower.includes("vitamin c")) {
      imgPath = "images/vitaminc.png";
    } else if (nameLower.includes("vitamin") || nameLower.includes("gummy") || nameLower.includes("sữa") || nameLower.includes("kẹo")) {
      imgPath = "images/vitamin_tong_hop.png";
    }

    return `
      <div class="nav-dropdown-product-card" onclick="window.location.href='chi-tiet-san-pham.html?id=${p.id}'">
        <div class="nav-dropdown-product-img-wrapper">
          ${discountTag}
          <img src="${imgPath}" class="nav-dropdown-product-img" alt="${p.name}">
        </div>
        <div class="nav-dropdown-product-title" title="${p.name}">${p.name}</div>
        <div class="nav-dropdown-product-price-row">
          <span class="nav-dropdown-product-price">${p.price.toLocaleString()}đ <span class="nav-dropdown-product-unit">/ ${p.specification.split(' ').pop() || 'Hộp'}</span></span>
          ${oldPriceHTML}
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="nav-dropdown-quick-links">
      ${quickLinksHTML}
    </div>
    
    <div class="nav-dropdown-divider"></div>
    
    <div class="nav-dropdown-best-sellers">
      <div class="nav-dropdown-best-sellers-header">
        <span class="nav-dropdown-best-sellers-title">Bán chạy nhất</span>
        <a href="${getCategoryPageLink(catName)}" class="section-link" style="font-size: 13px;">Xem tất cả ></a>
      </div>
      <div class="nav-dropdown-best-sellers-grid">
        ${bestSellersHTML}
      </div>
    </div>
  `;
}

function getCategoryPageLink(catName) {
  if (catName === "Thuốc") return "thuoc.html";
  if (catName === "Thực phẩm chức năng") return "thuc-pham-chuc-nang.html";
  if (catName === "Dược mỹ phẩm") return "duoc-my-pham.html";
  if (catName === "Chăm sóc cá nhân & Thiết bị y tế") return "cham-soc-ca-nhan-thiet-bi-y-te.html";
  return "index.html";
}

