/**
 * ==============================================================================
 * ⚙️ CẤU HÌNH MINDMAP 3D (STICKY GRAPH CONFIG)
 * ==============================================================================
 * 📌 Chỉnh sửa trực tiếp các thông số bên dưới để tùy biến toàn bộ Mindmap 3D.
 * ==============================================================================
 */
const STICKY_GRAPH_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. DỮ LIỆU & CONTAINER (Data & Mounting)
  // ----------------------------------------------------------------------------
  dataSource: 'firebase',                       // Nguồn dữ liệu: 'firebase' (tải trực tiếp từ Firestore)
  firebaseCollection: 'knowledgeNodes',        // Tên Collection Firestore chứa dữ liệu node kiến thức
  container: '#graphContainer',                 // DOM element hoặc selector CSS chứa canvas 3D

  // 💾 CẤU HÌNH BỘ NHỚ ĐỆM LOCAL (Local Cache / LocalStorage)
  // Lưu dữ liệu đã tải từ Firebase vào LocalStorage trình duyệt để không phải gọi Firebase liên tục mỗi khi tải trang
  enableLocalCache: true,                       // Bật/tắt lưu cache vào LocalStorage (true = lưu local, false = luôn tải mới từ Firebase)
  localCacheKey: 'sticky_graph_nodes_cache',   // Tên khóa lưu trữ trong LocalStorage
  localCacheTTL: 86400000,                     // Thời gian hết hạn cache (ms): 24h = 86400000 ms (Đặt 0 để không hết hạn tự động)

  // 🛡️ LỌC KIỂM DUYỆT (Validation Filter)
  onlyValidated: true,                          // Chỉ hiển thị các node đã được kiểm duyệt (validated === true)

  // ----------------------------------------------------------------------------
  // 2. CHẾ ĐỘ HIỂN THỊ (Theme & Appearance)
  // ----------------------------------------------------------------------------
  mode: 'auto',                         // Chế độ giao diện: 'auto' (ăn theo hệ thống OS) | 'dark' | 'light'

  // ----------------------------------------------------------------------------
  // 3. THIẾT KẾ STICKY NOTE (Note Dynamics & Typography)
  // ----------------------------------------------------------------------------
  borderRadius: 8,                      // Độ bo góc sticky note (pixel, 0 = vuông vức, 8-12 = bo mượt)
  paperCurl: 15,                        // Độ cong vênh mép giấy (0 = phẳng, 5-15px = cong tự nhiên)
  flutterAmp: 40.0,                     // Độ rung lắc mép giấy khi camera xoay/di chuyển (0 -> 100)
  hierarchyDepth: false,                // Phân tầng độ sâu trục Z: L1 nổi lên trước (+Z), các tầng sau lùi dần (-Z)
  noteScale: 1.0,                       // Hệ số phóng to / thu nhỏ kích thước tất cả note (VD: 0.7 = 70%)
  fontSize: 8,                          // Kích thước font tiêu đề (title) trong sticky note (null = tự động theo level)
  descFontSize: 6.2,                    // Kích thước font mô tả (description) trong sticky note (null = tự động)
  hoverScale: 1.08,                     // Phóng to nhẹ sticky note khi hover chuột (1.0 = giữ nguyên, 1.08 = to lên 8%)
  hoverBrightness: 0.18,                // Độ sáng tăng thêm khi hover sticky note (0.0 -> 1.0)

  // ----------------------------------------------------------------------------
  // 4. KHÔNG GIAN, MÀU NỀN & CAMERA (Environment & Camera)
  // ----------------------------------------------------------------------------
  canvasBgDark: '#000000',            // Màu nền canvas ở chế độ Dark mode (Hex/RGB, ví dụ: '#000000' hoặc '#0a0c10')
  canvasBgLight: '#F9F6F1',           // Màu nền canvas ở chế độ Light mode (Hex/RGB, ví dụ: '#F9F6F1' hoặc '#f8fafc')
  fogType: 'exp2',                      // Loại sương mù chiều sâu: 'exp2' (hàm mũ tự nhiên) | 'linear' (tuyến tính)
  depthFade: 0.2,                       // Mức độ làm mờ sương mù chiều sâu theo trục Z (0% -> 100%)
  minDistance: 500,                     // Khoảng cách zoom gần nhất của camera (pixel)
  maxDistance: 6000,                    // Khoảng cách zoom xa nhất của camera (pixel)
  // 📸 CẤU HÌNH KHOẢNG CÁCH CAMERA (ZOOM DISTANCE) & GÓC NGHIÊNG CHO DESKTOP & MOBILE
  // Mặc định luôn tự động xoay ngẫu nhiên 360° xung quanh tâm; góc máy chiếu ngang trực diện tầm mắt vào khối sticky note.
  cameraDistanceDesktop: 3000,          // Khoảng cách camera trên Desktop / Laptop (pixel)
  cameraDistanceMobile: 5000,           // Khoảng cách camera trên Mobile / Điện thoại (pixel)
  cameraPitch: -0.4,                     // Góc nghiêng camera (radian: 0.0 = chiếu ngang trực diện tầm mắt, >0 = chúc nhẹ từ trên xuống)

  rotateSpeed: 2.0,                     // Tốc độ xoay camera khi kéo drag chuột (0.1 -> 3.0)
  dampingFactor: 0.05,                  // Hệ số hãm quán tính khi xoay camera (0.01 -> 0.3, nhỏ hơn = mượt hơn)

  // ----------------------------------------------------------------------------
  // 5. THIẾT LẬP NGUỒN SÁNG 3D (3D Lighting Settings)
  // ----------------------------------------------------------------------------
  ambientLightColorDark: '#ffffff',    // Màu ánh sáng môi trường tỏa đều (Dark mode)
  ambientLightColorLight: '#ffffff',   // Màu ánh sáng môi trường tỏa đều (Light mode)
  ambientIntensityDark: 0.85,          // Cường độ ánh sáng môi trường Dark mode (0.0 -> 2.0)
  ambientIntensityLight: 1.1,          // Cường độ ánh sáng môi trường Light mode (0.0 -> 2.0)

  dirLight1ColorDark: '#ffffff',       // Màu nguồn sáng chính 1 (Directional Light 1) Dark mode
  dirLight1ColorLight: '#fbbf24',      // Màu nguồn sáng chính 1 Light mode
  dirLight1IntensityDark: 0.3,        // Cường độ nguồn sáng chính 1 Dark mode (0.0 -> 2.0)
  dirLight1IntensityLight: 0.0,        // Cường độ nguồn sáng chính 1 Light mode (0.0 -> 2.0)

  dirLight2ColorDark: '#ffffff',       // Màu nguồn sáng phụ 2 (Directional Light 2) Dark mode
  dirLight2ColorLight: '#38bdf8',      // Màu nguồn sáng phụ 2 Light mode
  dirLight2IntensityDark: 0.3,        // Cường độ nguồn sáng phụ 2 Dark mode (0.0 -> 2.0)
  dirLight2IntensityLight: 0.0,        // Cường độ nguồn sáng phụ 2 Light mode (0.0 -> 2.0)

  cameraLightIntensityDark: 0.3,       // Cường độ nguồn sáng rọi đi theo Camera ở Dark mode
  cameraLightIntensityLight: 0.0,      // Cường độ nguồn sáng rọi đi theo Camera ở Light mode

  // ----------------------------------------------------------------------------
  // 6. ĐƯỜNG LIÊN KẾT MẶC ĐỊNH (Default Connection Lines)
  // ----------------------------------------------------------------------------
  lineMorphology: 'bezier',             // Kiểu đường nối: 'bezier' (cong mềm) | 'straight' (thẳng) | 'orthogonal' (gấp khúc 90°)
  lineWidth: 1,                       // Độ dày đường liên kết mặc định (pixel, ví dụ: 1.0, 1.5, 2.0...)
  lineColorDark: '#242b92',             // Màu đường liên kết mặc định ở Dark mode (Hex)
  lineColorLight: '#b4935e',            // Màu đường liên kết mặc định ở Light mode (Hex)
  lineOpacityDark: 1.0,                 // Độ mờ / trong suốt của đường nối mặc định ở Dark mode (0.0 -> 1.0)
  lineOpacityLight: 0.4,                // Độ mờ / trong suốt của đường nối mặc định ở Light mode (0.0 -> 1.0)

  // ----------------------------------------------------------------------------
  // 7. TRẠNG THÁI HIGHLIGHT KHI CLICK VÀO 1 STICKY NOTE (Active Highlight State)
  // ----------------------------------------------------------------------------
  // 7.1. Sticky Notes khi có 1 note được click chọn:
  noteDimmedOpacityDark: 0.15,           // Độ mờ (opacity) của các note KHÔNG được highlight ở Dark mode (0.0 -> 1.0; nếu 0 sẽ ẩn luôn note)
  noteDimmedOpacityLight: 0.4,          // Độ mờ (opacity) của các note KHÔNG được highlight ở Light mode (0.0 -> 1.0; nếu 0 sẽ ẩn luôn note)

  // 7.2. Connection ĐƯỢC highlight (đường nối trực tiếp với note đang chọn):
  lineActiveColorDark: '#ffffff',       // Màu đường liên kết được highlight ở Dark mode (Hex)
  lineActiveColorLight: '#3b3b3b',      // Màu đường liên kết được highlight ở Light mode (Hex)
  lineActiveWidth: 1.5,                   // Độ dày của connection được highlight (pixel)
  lineActiveOpacity: 1.0,              // Độ trong suốt / opacity của connection được highlight (0.0 -> 1.0; nếu = 0 sẽ ẩn luôn)

  // 7.3. Connection KHÔNG ĐƯỢC highlight (các đường nối còn lại không liên quan):
  lineDimmedWidth: 1,                   // Độ dày của connection không được highlight (pixel)
  lineDimmedOpacity: 0.1,              // Độ trong suốt / opacity của connection không được highlight (0.0 -> 1.0; nếu = 0 sẽ ẩn luôn)

  // ----------------------------------------------------------------------------
  // 8. ĐỘNG LỰC HỌC & TƯƠNG TÁC (Physics Dynamics)
  // ----------------------------------------------------------------------------
  physicsRepulsion: false,              // Lực đẩy lò xo né chỗ giữa các note khi kéo thả (true/false)
  repulsionStrength: 0.0,               // Cường độ lực đẩy lò xo (0.1 -> 2.0)
  wobbleSpeed: 1.4,                     // Tốc độ nhấp nhô lơ lửng ngẫu nhiên của các note (0.1 -> 3.0)
  wobbleAmp: 0.0,                       // Biên độ nhấp nhô lơ lửng của các note (0 = đứng yên, >0 = nhấp nhô)

  // ----------------------------------------------------------------------------
  // 9. BỐ CỤC KHÔNG GIAN & QUỸ ĐẠO (Layout & Orbit)
  // ----------------------------------------------------------------------------
  layoutType: 'galaxy',                   // Bố cục phân bố: 'auto' (tự chọn theo màn hình) | 'galaxy' | 'cylinder'
  layoutTypeDesktop: 'galaxy',          // Bố cục mặc định cho màn hình Desktop (rộng >= 768px)
  layoutTypeMobile: 'galaxy',           // Bố cục mặc định cho màn hình Mobile (rộng < 768px)
  adaptiveAspectShape: true,            // Tự động phân bổ hình dạng khối theo tỷ lệ canvas (dài ngang trên desktop, cao dọc trên mobile)
  aspectRatioPower: 0.2,                // Độ co dãn theo size màn hình (0.0 tròn -> 1.0 méo)
  aspectScaleX: 1.0,                    // Hệ số tùy chỉnh dãn trục X
  aspectScaleY: 1.0,                    // Hệ số tùy chỉnh dãn trục Y
  aspectScaleZ: 1.0,                    // Hệ số tùy chỉnh dãn trục Z
  spreadRadius: 1100,                   // Bán kính khoảng cách tỏa ra của các note trong không gian 3D
  autoRotate: true,                     // Bật/Tắt tự động xoay nhẹ camera xung quanh trung tâm
  autoRotateSpeed: 0.1,                 // Tốc độ tự động xoay camera (0.1 -> 2.0)
  onNodeClick: null,                    // Callback hàm JS khi click vào 1 note: null hoặc (node) => { ... }

  // ----------------------------------------------------------------------------
  // 10. KÍCH THƯỚC CƠ SỞ THEO CẤP BẬC (Level Dimensions & Base Font Sizes)
  // ----------------------------------------------------------------------------
  levelBaseConfig: {
    1: { width: 150, height: 130 },    // Cấp 1 (Node Trung tâm)
    2: { width: 145, height: 115 },    // Cấp 2 (Chủ đề chính)
    3: { width: 145, height: 100 },    // Cấp 3 (Nhánh con)
    4: { width: 145, height: 90 },     // Cấp 4
    5: { width: 145, height: 82 },     // Cấp 5
    6: { width: 145, height: 74 },     // Cấp 6 (Câu hỏi thực hành)
    7: { width: 145, height: 74 }      // Cấp 7
  },

  // ----------------------------------------------------------------------------
  // 11. HIỆU ỨNG XUẤT HIỆN BAN ĐẦU (Intro & Entrance Animation)
  // ----------------------------------------------------------------------------
  enableIntroAnim: true,               // Bật/tắt animation xuất hiện từng note khi nạp dữ liệu
  introDuration: 120,                  // Thời gian phóng to của mỗi sticky note (ms)
  introStagger: 10,                    // Khoảng thời gian giãn cách giữa các note xuất hiện nối tiếp nhau (ms)
  introOrder: 'random',                // Thứ tự xuất hiện: 'random' (ngẫu nhiên) | 'centerOut' (từ tâm lõi lan ra ngoài) | 'level' (theo cấp độ 1 -> 7) | 'sequential'
  introEasing: 'backOut',              // Hiệu ứng nảy: 'backOut' (phóng to nảy nhẹ đàn hồi) | 'cubicOut' (mượt mà tự nhiên) | 'elasticOut' (nảy mạnh đàn hồi)
  introShowConnections: true,          // Bật/tắt tự động xuất hiện connection theo từng cặp note đã hiện
  introLineFadeDuration: 100           // Thời gian mờ dần hiện rõ của đường dây nối (ms)
};

(function (global) {
  'use strict';

  // Màu mặc định fallback nếu node chưa khai báo màu cụ thể
  const DEFAULT_FALLBACK_COLOR = '#dbeafe';

  class StickyGraph3D {
    // Lấy thông số kích thước cơ sở theo Level (tự động mở rộng mượt mà cho bất kỳ level nào)
    _getLevelBaseConfig(lvl) {
      const level = parseInt(lvl, 10) || 3;
      const baseCfg = (this.options && this.options.levelBaseConfig) ? this.options.levelBaseConfig : STICKY_GRAPH_CONFIG.levelBaseConfig;
      if (baseCfg && baseCfg[level]) return baseCfg[level];
      if (level <= 1) return baseCfg[1];
      const diff = level - 7;
      return {
        width: Math.max(80, 150 - diff * 8),
        height: Math.max(60, 74 - diff * 6)
      };
    }

    constructor(options = {}) {
      // Tự động gộp cấu hình từ const STICKY_GRAPH_CONFIG ở đầu file
      const baseConfig = typeof STICKY_GRAPH_CONFIG !== 'undefined' ? STICKY_GRAPH_CONFIG : {};
      this.options = Object.assign({
        dataSource: 'firebase',
        firebaseCollection: 'knowledgeNodes',
        enableLocalCache: true,
        localCacheKey: 'sticky_graph_nodes_cache',
        localCacheTTL: 86400000,
        onlyValidated: true,
        cameraPitch: 0.0,
        autoRotateSpeed: 0.2,
        wobbleSpeed: 1.4,
        lineWidth: 1.5,
        noteDimmedOpacityDark: 0.3,
        noteDimmedOpacityLight: 0.5,
        lineActiveWidth: 1,
        lineActiveOpacity: 1.0,
        lineDimmedWidth: 1,
        lineDimmedOpacity: 0.0,
        onNodeClick: null,
        onNodeHover: null
      }, baseConfig, options);

      if (options.onlyValidated !== undefined) this.options.onlyValidated = !!options.onlyValidated;

      // Hỗ trợ alias tên cấu hình: saveLocalhost, useLocalCache, saveToLocalStorage
      if (options.saveLocalhost !== undefined) this.options.enableLocalCache = !!options.saveLocalhost;
      if (options.useLocalCache !== undefined) this.options.enableLocalCache = !!options.useLocalCache;
      if (options.saveToLocalStorage !== undefined) this.options.enableLocalCache = !!options.saveToLocalStorage;

      this.container = typeof this.options.container === 'string'
        ? document.querySelector(this.options.container)
        : this.options.container;

      if (!this.container) {
        console.error('[StickyGraph3D] Container không hợp lệ:', this.options.container);
        return;
      }

      this.nodes = [];
      this.links = [];
      this.categories = {};
      this.nodeMap = new Map();
      this.meshMap = new Map();
      this.linkMeshes = [];
      this._activeTubeMeshes = [];

      this.selectedNode = null;
      this.hoveredNode = null;
      this.hoveredMesh = null;

      // Trạng thái hiệu ứng xuất hiện ban đầu (Stagger Entrance Animation)
      this.isIntroAnimating = false;

      // Vectors theo dõi vận tốc xoay và di chuyển camera để tạo độ rung lắc mép giấy
      this.prevCamPos = null;
      this.prevCamRot = null;
      this.motionVelocity = 0.0;

      this.activeLevelFilter = 'ALL';
      this.activeCategoryFilter = 'ALL';
      this.searchQuery = '';

      this.clock = null;
      this.isInitialized = false;

      // Trạng thái tối ưu hiệu năng Viewport & Tab
      this.isInViewport = true;
      this.isTabVisible = !document.hidden;
      this.animRunning = false;
      this.observer = null;

      // Nạp Three.js nếu chưa có sẵn trên trang
      this._ensureThreeReady().then(() => {
        this._initScene();
        this._initEvents();
        if (this.options.dataSource) {
          this.loadData(this.options.dataSource);
        }
      });
    }

    // --- TỰ ĐỘNG NẠP THREE.JS, ORBITCONTROLS & GOOGLE FONTS NẾU CHƯA CÓ ---
    async _ensureThreeReady() {
      // 1. Nạp Google Fonts: Crimson Pro (Label) & Work Sans (Desc, Category)
      if (!document.getElementById('google-fonts-sticky-mindmap')) {
        const link = document.createElement('link');
        link.id = 'google-fonts-sticky-mindmap';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
        document.head.appendChild(link);
      }

      // Đảm bảo cập nhật lại texture khi font đã tải xong về trình duyệt
      if (document.fonts) {
        document.fonts.ready.then(() => {
          if (this.isInitialized) {
            this._regenerateTextures();
          }
        });
      }

      if (window.THREE && window.THREE.OrbitControls) return;

      const loadScript = (src) => new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.crossOrigin = 'anonymous';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });

      if (!window.THREE) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      }
      if (!window.THREE.OrbitControls) {
        await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
      }
    }

    // --- LẤY KÍCH THƯỚC CONTAINER THEO CSS ---
    _getContainerSize() {
      if (!this.wrapper) {
        return {
          width: window.innerWidth || 800,
          height: window.innerHeight || 600
        };
      }
      const rect = this.wrapper.getBoundingClientRect();
      const compStyle = window.getComputedStyle ? window.getComputedStyle(this.wrapper) : null;
      const padX = compStyle ? (parseFloat(compStyle.paddingLeft || 0) + parseFloat(compStyle.paddingRight || 0)) : 0;
      const padY = compStyle ? (parseFloat(compStyle.paddingTop || 0) + parseFloat(compStyle.paddingBottom || 0)) : 0;

      // Ưu tiên kích thước content-box thực tế của container do CSS quy định
      const clientW = this.wrapper.clientWidth > 0 ? (this.wrapper.clientWidth - padX) : 0;
      const clientH = this.wrapper.clientHeight > 0 ? (this.wrapper.clientHeight - padY) : 0;
      const rectW = rect.width > 0 ? (rect.width - padX) : 0;
      const rectH = rect.height > 0 ? (rect.height - padY) : 0;

      const w = Math.round(clientW || rectW);
      const h = Math.round(clientH || rectH);

      return {
        width: w > 0 ? w : (window.innerWidth || 800),
        height: h > 0 ? h : (window.innerHeight || 600)
      };
    }

    // --- CẬP NHẬT KÍCH THƯỚC CANVAS & CAMERA KHI CONTAINER THAY ĐỔI THEO CSS ---
    _onContainerResize(w, h) {
      if (!this.renderer || !this.camera) return;
      if (w <= 0 || h <= 0) return;
      if (this.width === w && this.height === h) return;

      // Tối ưu hóa cho thiết bị cảm ứng / Mobile Safari:
      // Khi người dùng cuộn, Safari liên tục thay đổi kích thước thanh URL bar (chỉ thay đổi chiều cao, chiều rộng giữ nguyên).
      // Việc gọi renderer.setSize() liên tục sẽ ép GPU giải phóng & cấp phát lại WebGL framebuffer gây giật lag (pipeline stall).
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const widthChanged = Math.abs(w - (this.width || 0)) > 2;
      const heightDiff = Math.abs(h - (this.height || 0));

      if (isTouch && !widthChanged && heightDiff < 180 && this.width > 0) {
        return;
      }

      this.width = w;
      this.height = h;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      // updateStyle = false để giữ nguyên width: 100%, height: 100% không đè px cố định lên inline CSS của canvas
      this.renderer.setSize(this.width, this.height, false);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Tự động phân bổ lại hình dạng khối theo tỷ lệ khung hình mới (Adaptive Aspect Shape)
      if (this.options.adaptiveAspectShape !== false && this.nodes && this.nodes.length > 0) {
        this._calculateLayoutPositions();
        this.meshMap.forEach(mesh => {
          const n = mesh.userData.node;
          mesh.userData.basePos.set(n.x, n.y, n.z);
          if (!this.isIntroAnimating) {
            mesh.position.set(n.x, n.y, n.z);
          }
        });
        this.linkMeshes.forEach(line => this._updateLinkGeometry(line));
      }

      if (this.controls) {
        this.controls.update();
      }
    }

    // Lấy khoảng cách camera (zoom distance) theo thiết bị (Desktop / Mobile)
    _getActiveCameraDistance() {
      const isMobile = (this.width || window.innerWidth) < 768;
      return isMobile
        ? (this.options.cameraDistanceMobile !== undefined ? this.options.cameraDistanceMobile : 2800)
        : (this.options.cameraDistanceDesktop !== undefined ? this.options.cameraDistanceDesktop : 2400);
    }

    // Tự động tính toán góc máy (X, Y, Z) từ khoảng cách zoom:
    // - Mặc định luôn xoay ngẫu nhiên 360° xung quanh tâm (random azimuth)
    // - Góc nghiêng (pitch): Mặc định chiếu ngang trực diện (tầm mắt, ngang ngang nhìn vào khối sticky note)
    _calculateCameraPreset(customDistance) {
      const d = Math.max(200, Number(customDistance !== undefined ? customDistance : this._getActiveCameraDistance()) || 2400);
      const pitch = (this.options && this.options.cameraPitch !== undefined)
        ? (Number(this.options.cameraPitch) || 0.0)
        : 0.0;

      const y = Math.round(d * Math.sin(pitch));
      const horizontalRadius = d * Math.cos(pitch);

      // Random góc xoay 360° ngẫu nhiên xung quanh trục Y
      const randomAngle = Math.random() * Math.PI * 2;
      const x = Math.round(Math.cos(randomAngle) * horizontalRadius);
      const z = Math.round(Math.sin(randomAngle) * horizontalRadius);

      return { x, y, z, distance: d, pitch, horizontalRadius };
    }

    _getBaseCameraPreset() {
      return this._calculateCameraPreset();
    }

    // --- PHƯƠNG THỨC QUAY CAMERA TRÁI/PHẢI QUANH TÂM KHỐI CẦU ---
    _rotateCameraHorizontal(deltaX) {
      if (!this.controls || !this.camera) return;
      const dom = this.renderer ? this.renderer.domElement : null;
      const height = (dom && dom.clientHeight) || this.height || window.innerHeight;
      const rotateSpeed = (this.options.rotateSpeed !== undefined ? this.options.rotateSpeed : 1.5);

      // Tính góc quay (radian) tỷ lệ theo chuyển động vuốt trên màn hình (đảo dấu để vuốt sang phải thì khối cầu quay sang phải theo tay)
      const angle = -(2 * Math.PI * deltaX / height) * (rotateSpeed * 0.35);

      const target = this.controls.target;
      const offset = new window.THREE.Vector3().subVectors(this.camera.position, target);

      // Xoay quanh trục thẳng đứng Y quanh tâm khối cầu (giữ nguyên khoảng cách zoom & độ cao Y)
      offset.applyAxisAngle(new window.THREE.Vector3(0, 1, 0), angle);

      this.camera.position.copy(target).add(offset);
      this.camera.lookAt(target);
      this.controls.update();
    }

    // --- PHƯƠNG THỨC PAN CAMERA TRÁI/PHẢI (NGANG) TRONG KHÔNG GIAN 3D ---
    _panCamera(deltaX, deltaY = 0) {
      if (!this.controls || !this.camera) return;
      const dom = this.renderer ? this.renderer.domElement : null;
      const height = (dom && dom.clientHeight) || this.height || window.innerHeight;
      const targetDistance = this.camera.position.distanceTo(this.controls.target);

      // Tỷ lệ chuyển đổi pixel màn hình sang đơn vị 3D theo góc nhìn fov
      const factor = 2 * (targetDistance * Math.tan((this.camera.fov / 2) * Math.PI / 180)) / height;
      const panSpeed = (this.controls.panSpeed !== undefined ? this.controls.panSpeed : 1.0);

      // Vector trục X camera (ngang trái/phải trong world space)
      const vLeft = new window.THREE.Vector3();
      vLeft.setFromMatrixColumn(this.camera.matrix, 0);
      vLeft.multiplyScalar(-deltaX * factor * panSpeed);

      this.camera.position.add(vLeft);
      this.controls.target.add(vLeft);

      if (deltaY !== 0) {
        const vUp = new window.THREE.Vector3();
        vUp.setFromMatrixColumn(this.camera.matrix, 1);
        vUp.multiplyScalar(deltaY * factor * panSpeed);
        this.camera.position.add(vUp);
        this.controls.target.add(vUp);
      }

      this.controls.update();
    }

    // --- KHỞI TẠO THREE.JS SCENE, CAMERA, RENDERER ---
    _initScene() {
      const THREE = window.THREE;
      this.clock = new THREE.Clock();

      // Mặc định container trong HTML là thẻ div, tự động tạo canvas và gắn vào thẻ div đó
      this.wrapper = this.container;

      const overlay = document.createElement('div');
      overlay.classList = "sticky-graph-overlay";
      this.wrapper.appendChild(overlay);

      this.canvas = document.createElement('canvas');
      this.wrapper.appendChild(this.canvas);


      // Đảm bảo canvas chiếm toàn bộ 100% kích thước thẻ div chứa nó do CSS quy định
      this.canvas.style.display = 'block';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';

      // Đảm bảo wrapper có vị trí relative để canvas 3D hiển thị chuẩn
      if (window.getComputedStyle && this.wrapper && this.wrapper !== document.body) {
        const compStyle = window.getComputedStyle(this.wrapper);
        if (compStyle.position === 'static') {
          this.wrapper.style.position = 'relative';
        }
      }

      // Lấy kích thước thực tế từ div container theo CSS
      const initialSize = this._getContainerSize();
      this.width = initialSize.width;
      this.height = initialSize.height;

      // Scene, Background & Depth Fading (Fog)
      const currentBg = this.getCanvasBgColor();
      const bgCol = new THREE.Color(currentBg);
      this.scene = new THREE.Scene();
      this.scene.background = bgCol;
      this._updateDepthFade();

      // Camera: Tự động tính góc máy và khoảng cách từ cấu hình zoom Desktop/Mobile, random 360°
      const aspect = this.width / this.height;
      const basePreset = this._getBaseCameraPreset();
      const initialX = basePreset.x;
      const initialY = basePreset.y;
      const initialZ = basePreset.z;

      this.camera = new THREE.PerspectiveCamera(50, aspect, 10, 10000);
      this.camera.position.set(initialX, initialY, initialZ);

      // Lưu vị trí xuất phát ban đầu để khi reset camera sẽ quay về đúng vị trí đẹp này
      this.initialRandomCamPos = { x: initialX, y: initialY, z: initialZ };

      // Renderer: updateStyle = false để CSS của container div toàn quyền quản lý kích thước hiển thị
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(this.width, this.height, false);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(bgCol, 1);
      this.renderer.shadowMap.enabled = false;

      // OrbitControls (Tối ưu tương tác: Cho phép Pan bằng chuột phải/chuột giữa, Xoay bằng chuột trái)
      const domElement = this.renderer.domElement;
      const originalAddEventListener = domElement.addEventListener.bind(domElement);

      let orbitTouchStart = null;
      let orbitTouchMove = null;
      let orbitTouchEnd = null;

      // Chặn OrbitControls tự ý gắn touch listener gọi preventDefault() vô điều kiện làm kẹt cuộn trang HTML trên mobile
      domElement.addEventListener = function (type, listener, options) {
        if (type === 'touchstart') {
          orbitTouchStart = listener;
          return;
        }
        if (type === 'touchmove') {
          orbitTouchMove = listener;
          return;
        }
        if (type === 'touchend') {
          orbitTouchEnd = listener;
          return;
        }
        return originalAddEventListener(type, listener, options);
      };

      this.controls = new THREE.OrbitControls(this.camera, domElement);

      // Khôi phục addEventListener chuẩn
      domElement.addEventListener = originalAddEventListener;

      this.controls.enableDamping = true;
      this.controls.dampingFactor = this.options.dampingFactor !== undefined ? this.options.dampingFactor : 0.05;
      this.controls.rotateSpeed = this.options.rotateSpeed !== undefined ? this.options.rotateSpeed : 0.7;
      this.controls.panSpeed = 1.0;     // Tốc độ di chuyển camera (pan)
      this.controls.enableZoom = false; // Tắt Zoom bằng scroll wheel -> cuộn trang HTML bình thường
      this.controls.enablePan = true;   // Cho phép Pan (tọa độ không gian 3D) bằng chuột giữa hoặc chuột phải
      this.controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,       // Chuột trái: Xoay camera 3D
        MIDDLE: THREE.MOUSE.PAN,        // Chuột giữa: Bấm giữ kéo để Di chuyển / Pan camera
        RIGHT: THREE.MOUSE.PAN          // Chuột phải: Bấm giữ kéo để Di chuyển / Pan camera
      };
      this.controls.minPolarAngle = -Infinity;
      this.controls.maxPolarAngle = Infinity;
      this.controls.minDistance = this.options.minDistance !== undefined ? this.options.minDistance : 300;
      this.controls.maxDistance = this.options.maxDistance !== undefined ? this.options.maxDistance : 4400;
      this.controls.autoRotate = this.options.autoRotate;
      this.controls.autoRotateSpeed = this.options.autoRotateSpeed;

      // Cử chỉ Touch thông minh trên Mobile:
      // - 1 ngón tay vuốt dọc (vertical): Để trình duyệt cuộn dọc trang HTML (pan-y) tự nhiên, không bị kẹt.
      // - 1 ngón tay vuốt ngang (horizontal): Xoay camera 3D quanh tâm khối cầu. Khi đã bắt đầu vuốt ngang, cho phép đổi hướng xoay đa hướng.
      // - 2 ngón tay: Chuyển tiếp tới OrbitControls để Pinch/Zoom hoặc xoay 3D.
      let isTwoFingerTouch = false;
      let isTouchLockedToOrbit = false;
      let touchStartX = 0;
      let touchStartY = 0;
      let touchIntent = null; // null | 'horizontal' | 'vertical'
      let savedTouchStartEvent = null;

      // 🛡️ Wrapper an toàn tuyệt đối cho OrbitControls:
      // OrbitControls r128 mặc định luôn gọi event.preventDefault() bên trong onTouchStart/onTouchMove.
      // Khi event.cancelable === false (ví dụ trình duyệt đã bắt đầu cuộn trang hoặc sự kiện passive),
      // việc gọi preventDefault() sẽ bị Chrome chặn và ném lỗi đỏ:
      // "[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false..."
      // Hàm này tạm thời vô hiệu hóa ev.preventDefault trong lúc OrbitControls thực thi để loại bỏ 100% lỗi đỏ,
      // đồng thời chúng ta chủ động gọi if (e.cancelable) e.preventDefault() ở ngoài khi thực sự cần chặn cuộn.
      const safeOrbitCall = (fn, ev) => {
        if (!fn || !ev) return;
        const orig = ev.preventDefault;
        ev.preventDefault = () => { };
        try {
          fn(ev);
        } finally {
          ev.preventDefault = orig;
        }
      };

      domElement.addEventListener('touchstart', (e) => {
        if (this._rotateInertiaRaf) {
          cancelAnimationFrame(this._rotateInertiaRaf);
          this._rotateInertiaRaf = null;
        }
        if (this._panInertiaRaf) {
          cancelAnimationFrame(this._panInertiaRaf);
          this._panInertiaRaf = null;
        }

        if (e.touches.length >= 2) {
          isTwoFingerTouch = true;
          isTouchLockedToOrbit = false;
          touchIntent = null;
          savedTouchStartEvent = null;
          safeOrbitCall(orbitTouchStart, e);
        } else if (e.touches.length === 1) {
          isTwoFingerTouch = false;
          isTouchLockedToOrbit = false;
          touchIntent = null;
          savedTouchStartEvent = e;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      domElement.addEventListener('touchmove', (e) => {
        if (e.touches.length >= 2) {
          if (e.cancelable) e.preventDefault();
          safeOrbitCall(orbitTouchMove, e);
          return;
        }

        if (e.touches.length === 1) {
          const currentX = e.touches[0].clientX;
          const currentY = e.touches[0].clientY;

          // 🎯 PHÁT HIỆN Ý ĐỊNH VUỐT (DIRECTION INTENT DETECTION):
          // - Nếu vuốt dọc ngay từ đầu (|dy| >= |dx|): Trình duyệt cuộn dọc trang HTML tự nhiên, không can thiệp.
          // - Nếu vuốt ngang ngay từ đầu (|dx| > |dy|): Khóa cử chỉ vào canvas 3D và cho phép quay camera đa hướng (ngang, dọc, chéo).
          if (!touchIntent) {
            // Nếu trình duyệt đã bắt đầu cuộn trang (event không thể cancel) -> nhường quyền cuộn cho HTML
            if (!e.cancelable) {
              touchIntent = 'vertical';
              return;
            }

            const dx = currentX - touchStartX;
            const dy = currentY - touchStartY;
            const dist = Math.hypot(dx, dy);

            if (dist >= 8) {
              if (Math.abs(dx) > Math.abs(dy)) {
                touchIntent = 'horizontal';
                isTouchLockedToOrbit = true;
                if (e.cancelable) e.preventDefault();
                // Khởi tạo điểm xoay cho OrbitControls từ tọa độ chạm ban đầu và kích hoạt bước xoay đầu tiên
                safeOrbitCall(orbitTouchStart, savedTouchStartEvent || e);
                safeOrbitCall(orbitTouchMove, e);
              } else {
                touchIntent = 'vertical';
              }
            }
          }

          if (touchIntent === 'horizontal' && isTouchLockedToOrbit) {
            if (e.cancelable) e.preventDefault();
            // Cho phép người dùng tự do đổi hướng vuốt trong suốt cử chỉ (xoay ngang, dọc và mọi hướng)
            safeOrbitCall(orbitTouchMove, e);
          }
          // Nếu touchIntent === 'vertical': Không gọi preventDefault, trình duyệt tự do cuộn dọc HTML
        }
      }, { passive: false });

      domElement.addEventListener('touchend', (e) => {
        savedTouchStartEvent = null;
        if (isTwoFingerTouch) {
          safeOrbitCall(orbitTouchEnd, e);
          if (e.touches.length < 2) {
            isTwoFingerTouch = false;
          }
        }
        if (isTouchLockedToOrbit) {
          safeOrbitCall(orbitTouchEnd, e);
          isTouchLockedToOrbit = false;
        }
        if (e.touches.length === 0) {
          touchIntent = null;
        }
      }, { passive: true });

      domElement.addEventListener('touchcancel', (e) => {
        savedTouchStartEvent = null;
        if (isTwoFingerTouch) {
          safeOrbitCall(orbitTouchEnd, e);
          isTwoFingerTouch = false;
        }
        if (isTouchLockedToOrbit) {
          safeOrbitCall(orbitTouchEnd, e);
          isTouchLockedToOrbit = false;
        }
        touchIntent = null;
      }, { passive: true });

      // Cuộn chuột & Trackpad trên Laptop/Desktop:
      // - Cuộn dọc (deltaY): Để tự nhiên ăn theo cuộn trang HTML (enableZoom = false).
      // - Vuốt ngang 2 ngón trên Trackpad (deltaX): Xoay camera trái/phải quanh tâm khối cầu.
      domElement.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 1.5) {
          if (e.cancelable) e.preventDefault();
          this._rotateCameraHorizontal(-e.deltaX);
        }
      }, { passive: false });

      // Cho phép cuộn dọc trang HTML trên cảm ứng (touch devices)
      if (this.canvas) {
        this.canvas.style.touchAction = 'pan-y';
      }
      if (this.wrapper) {
        this.wrapper.style.touchAction = 'pan-y';
      }

      // Lighting (Khởi tạo nguồn sáng 3D từ STICKY_GRAPH_CONFIG)
      const isLight = this.isLightMode();
      const ambColor = isLight ? (this.options.ambientLightColorLight || '#ffffff') : (this.options.ambientLightColorDark || '#ffffff');
      const ambIntensity = isLight ? (this.options.ambientIntensityLight !== undefined ? this.options.ambientIntensityLight : 1.1) : (this.options.ambientIntensityDark !== undefined ? this.options.ambientIntensityDark : 0.85);

      this.ambientLight = new THREE.AmbientLight(ambColor, ambIntensity);
      this.scene.add(this.ambientLight);

      const d1Color = isLight ? (this.options.dirLight1ColorLight || '#fbbf24') : (this.options.dirLight1ColorDark || '#6366f1');
      const d1Intensity = isLight ? (this.options.dirLight1IntensityLight !== undefined ? this.options.dirLight1IntensityLight : 0.0) : (this.options.dirLight1IntensityDark !== undefined ? this.options.dirLight1IntensityDark : 0.85);

      this.dirLight1 = new THREE.DirectionalLight(d1Color, d1Intensity);
      this.dirLight1.position.set(800, 1200, 800);
      this.scene.add(this.dirLight1);

      const d2Color = isLight ? (this.options.dirLight2ColorLight || '#38bdf8') : (this.options.dirLight2ColorDark || '#ec4899');
      const d2Intensity = isLight ? (this.options.dirLight2IntensityLight !== undefined ? this.options.dirLight2IntensityLight : 0.0) : (this.options.dirLight2IntensityDark !== undefined ? this.options.dirLight2IntensityDark : 0.45);

      this.dirLight2 = new THREE.DirectionalLight(d2Color, d2Intensity);
      this.dirLight2.position.set(-800, -600, -800);
      this.scene.add(this.dirLight2);

      // Point light đi theo camera để mặt sticky note luôn sáng rõ
      const camLightIntensity = isLight ? (this.options.cameraLightIntensityLight !== undefined ? this.options.cameraLightIntensityLight : 0.0) : (this.options.cameraLightIntensityDark !== undefined ? this.options.cameraLightIntensityDark : 0.4);
      this.cameraLight = new THREE.PointLight(0xffffff, camLightIntensity, 3000);
      this.camera.add(this.cameraLight);
      this.scene.add(this.camera);

      // Nhóm chứa nodes & links
      this.graphGroup = new THREE.Group();
      this.scene.add(this.graphGroup);

      // Lưu trạng thái camera ban đầu để đo vận tốc chuyển động 3D
      this.prevCamPos = new THREE.Vector3().copy(this.camera.position);
      this.prevCamRot = new THREE.Quaternion().copy(this.camera.quaternion);

      // Raycaster cho hover và click chọn node
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      this.isInitialized = true;
      this._initViewportObserver();
      this._initSystemThemeListener();
      this._startAnimation();
    }

    // Tự động nạp Firebase SDK (compat) nếu trang chưa có sẵn
    async _ensureFirebaseReady() {
      if (typeof window === 'undefined') return null;
      if (window.firebase && window.firebase.firestore) return window.firebase;

      const loadScript = (src) => new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          if (window.firebase && window.firebase.firestore) return resolve();
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', (e) => reject(e), { once: true });
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.crossOrigin = 'anonymous';
        s.onload = () => resolve();
        s.onerror = (e) => reject(new Error(`Không thể nạp script: ${src}`));
        document.head.appendChild(s);
      });

      if (!window.firebase) {
        await loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
      }
      if (!window.firebase.firestore) {
        await loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js');
      }
      return window.firebase;
    }

    // Lấy instance Firestore (tận dụng config sẵn có hoặc cấu hình từ options)
    _getFirestoreDb() {
      if (!window.firebase) return null;
      const firebaseConfig = this.options.firebaseConfig || {
        apiKey: "AIzaSyC6KmQxFzAwI9RnIMtdUsMktQ0CCkM7z-E",
        authDomain: "uxcampvn.firebaseapp.com",
        projectId: "uxcampvn",
        storageBucket: "uxcampvn.firebasestorage.app",
        messagingSenderId: "491407083539",
        appId: "1:491407083539:web:8c1635c421989082a397e6",
        measurementId: "G-NLJWC0L47K"
      };

      if (!window.firebase.apps || !window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }
      return window.firebase.firestore();
    }

    // Dự phòng tải trực tiếp qua REST API (không phụ thuộc SDK nếu bị chặn bởi trình duyệt / adblocker)
    async _fetchFirestoreRest(collectionName = 'knowledgeNodes') {
      const projectId = (this.options.firebaseConfig && this.options.firebaseConfig.projectId) || 'uxcampvn';
      let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?pageSize=300`;
      const allDocs = [];

      while (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Firestore REST API HTTP ${res.status}`);
        const json = await res.json();
        if (json.documents && Array.isArray(json.documents)) {
          allDocs.push(...json.documents);
        }
        if (json.nextPageToken) {
          url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?pageSize=300&pageToken=${encodeURIComponent(json.nextPageToken)}`;
        } else {
          url = null;
        }
      }

      const nodes = [];
      const links = [];

      allDocs.forEach(doc => {
        const f = doc.fields || {};
        const docId = doc.name ? doc.name.split('/').pop() : '';
        const id = (f.id && f.id.stringValue) || docId;
        if (!id) return;

        const isValidated = f.validated ? (f.validated.booleanValue === true || f.validated.stringValue === 'true') : false;
        if (this.options.onlyValidated && !isValidated) {
          return;
        }

        const label = (f.label && f.label.stringValue) || id;
        const level = parseInt((f.level && (f.level.integerValue || f.level.stringValue)) || '3', 10) || 3;
        const desc = (f.desc && f.desc.stringValue) || '';
        const category = ((f.category && f.category.stringValue) || 'KEYWORD').toUpperCase();
        const color = (f.color && f.color.stringValue) || '#ffb703';
        const urlLink = (f.url && f.url.stringValue) || '';

        nodes.push({ id, label, level, category, desc, url: urlLink, color, validated: isValidated });

        if (f.connections && f.connections.arrayValue && Array.isArray(f.connections.arrayValue.values)) {
          f.connections.arrayValue.values.forEach(v => {
            const targetId = v.stringValue || '';
            if (targetId && targetId !== id) {
              links.push({ source: id, target: targetId });
            }
          });
        }
      });

      return { nodes, links };
    }

    // Đọc dữ liệu từ bộ nhớ cache LocalStorage
    _getLocalCache() {
      if (!this.options.enableLocalCache || typeof window === 'undefined' || !window.localStorage) return null;
      try {
        const raw = window.localStorage.getItem(this.options.localCacheKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.data || !Array.isArray(parsed.data.nodes) || parsed.data.nodes.length === 0) {
          return null;
        }
        // Kiểm tra tương thích phiên bản cache và bộ lọc kiểm duyệt
        if (parsed.version !== '2.0' || parsed.onlyValidated !== !!this.options.onlyValidated) {
          return null; // Bỏ qua cache cũ không cùng chế độ lọc duyệt để tải mới đúng dữ liệu
        }
        const ttl = Number(this.options.localCacheTTL) || 0;
        const isExpired = ttl > 0 && (Date.now() - (parsed.timestamp || 0) > ttl);
        return {
          isExpired,
          timestamp: parsed.timestamp,
          data: parsed.data
        };
      } catch (e) {
        return null;
      }
    }

    // Lưu dữ liệu vào bộ nhớ cache LocalStorage
    _saveLocalCache(data) {
      if (!this.options.enableLocalCache || typeof window === 'undefined' || !window.localStorage) return;
      if (!data || !Array.isArray(data.nodes) || data.nodes.length === 0) return;
      try {
        const payload = {
          timestamp: Date.now(),
          version: '2.0',
          onlyValidated: !!this.options.onlyValidated,
          count: data.nodes.length,
          data: {
            nodes: data.nodes,
            links: data.links || []
          }
        };
        window.localStorage.setItem(this.options.localCacheKey, JSON.stringify(payload));
      } catch (e) {
      }
    }

    // Nạp dữ liệu từ Firebase Firestore
    async _loadFromFirebase() {
      const colName = this.options.firebaseCollection || 'knowledgeNodes';

      // 1. Thử qua Firebase SDK compat
      try {
        await this._ensureFirebaseReady();
        const db = this._getFirestoreDb();
        if (db) {
          let snapshot = await db.collection(colName).get();
          if (snapshot.empty && colName !== 'knowledge_nodes') {
            snapshot = await db.collection('knowledge_nodes').get();
          }

          if (!snapshot.empty) {
            const nodes = [];
            const links = [];

            snapshot.forEach(doc => {
              const d = doc.data() || {};
              const id = String(d.id || doc.id).trim();
              if (!id) return;

              const isValidated = d.validated === true || d.validated === 'true';
              if (this.options.onlyValidated && !isValidated) {
                return;
              }

              const label = d.label || id;
              const level = parseInt(d.level, 10) || 3;
              const desc = d.desc || '';
              const category = (d.category || 'KEYWORD').toUpperCase();
              const color = d.color || '#ffb703';
              const url = d.url || '';

              nodes.push({ id, label, level, category, desc, url, color, validated: isValidated });

              const rawConn = d.connections;
              let connList = [];
              if (Array.isArray(rawConn)) {
                connList = rawConn;
              } else if (typeof rawConn === 'string') {
                connList = rawConn.split(/[;,]/);
              }

              connList.forEach(c => {
                const targetId = typeof c === 'object' && c !== null ? (c.id || c.target) : String(c).trim();
                if (targetId && targetId !== id) {
                  links.push({ source: id, target: targetId });
                }
              });
            });

            if (nodes.length > 0) {
              return { nodes, links };
            }
          }
        }
      } catch (sdkErr) {
      }

      // 2. Dự phòng: Thử qua REST API
      try {
        let restResult = await this._fetchFirestoreRest(colName);
        if (!restResult || !restResult.nodes || restResult.nodes.length === 0) {
          if (colName !== 'knowledge_nodes') {
            restResult = await this._fetchFirestoreRest('knowledge_nodes');
          }
        }
        if (restResult && restResult.nodes && restResult.nodes.length > 0) {
          return restResult;
        }
      } catch (restErr) {
      }

      return null;
    }

    // --- NẠP DỮ LIỆU TỪ FIREBASE (KÈM LOCAL CACHE) ---
    async loadData(dataSource) {
      // 1. Kiểm tra cache Local (LocalStorage) trước nếu enableLocalCache = true
      const cached = this._getLocalCache();
      if (cached && !cached.isExpired) {
        this._processData(cached.data);
        this.buildGraph();
        return;
      }

      if (cached && cached.isExpired) {
      }

      // 2. Tải dữ liệu mới từ Firebase Firestore
      try {
        const fbData = await this._loadFromFirebase();
        if (fbData && fbData.nodes && fbData.nodes.length > 0) {
          this._saveLocalCache(fbData);
          this._processData(fbData);
          this.buildGraph();
          return;
        }
        throw new Error('Dữ liệu từ Firestore rỗng.');
      } catch (fbErr) {
        // Nếu có cache local cũ (dù đã hết hạn), ưu tiên tái sử dụng để không làm gián đoạn hiển thị
        if (cached && cached.data && Array.isArray(cached.data.nodes) && cached.data.nodes.length > 0) {
          this._processData(cached.data);
          this.buildGraph();
          return;
        }

      }
    }

    // Tải lại dữ liệu từ Firebase (tùy chọn xóa cache local để buộc làm mới hoàn toàn)
    async reloadFromFirebase(forceRefresh = true) {
      if (forceRefresh) {
        StickyGraph3D.clearLocalCache(this.options.localCacheKey);
      }
      await this.loadData('firebase');
    }

    _processData(data) {
      if (data.categories) {
        this.categories = Object.assign(this.categories, data.categories);
      }

      this.nodes = data.nodes || [];
      const rawLinks = data.links || [];

      this.nodeMap.clear();
      this.nodes.forEach(n => {
        n.level = parseInt(n.level, 10) || 3;
        n.category = (n.category || 'KEYWORD').toUpperCase();
        n.connections = [];
        this.nodeMap.set(n.id, n);
      });

      // Lọc trùng lặp liên kết (Undirected Deduplication):
      // Đồ thị tri thức sử dụng liên kết vô hướng giữa 2 node.
      // Nếu Node A liên kết với Node B và Node B cũng liên kết với Node A (hoặc lặp lại),
      // chỉ giữ duy nhất 1 connection giữa 2 node và loại bỏ kết nối tới chính mình (self-loop).
      const seenEdges = new Set();
      const uniqueLinks = [];

      rawLinks.forEach(l => {
        const sId = typeof l.source === 'object' ? l.source.id : l.source;
        const tId = typeof l.target === 'object' ? l.target.id : l.target;
        if (!sId || !tId || sId === tId) return;

        // Bỏ qua nếu một trong hai node không tồn tại trong tập nodeMap
        if (!this.nodeMap.has(sId) || !this.nodeMap.has(tId)) return;

        // Chuẩn hóa edgeKey không phụ thuộc chiều (u < v ? u---v : v---u)
        const edgeKey = sId < tId ? `${sId}---${tId}` : `${tId}---${sId}`;
        if (!seenEdges.has(edgeKey)) {
          seenEdges.add(edgeKey);
          uniqueLinks.push({ source: sId, target: tId });
        }
      });

      this.links = uniqueLinks;

      // Bổ sung danh sách connections 2 chiều cho mỗi node để phục vụ highlight quan hệ tương tác
      this.links.forEach(l => {
        const s = this.nodeMap.get(l.source);
        const t = this.nodeMap.get(l.target);
        if (s && t) {
          if (!s.connections.includes(t.id)) s.connections.push(t.id);
          if (!t.connections.includes(s.id)) t.connections.push(s.id);
        }
      });
    }

    // --- TẠO TOÀN BỘ GRAPH: STICKY NOTES 3D & DÂY NỐI ---
    buildGraph() {
      const THREE = window.THREE;
      if (!this.isInitialized) return;

      // Dọn dẹp đồ thị cũ
      this._clearActiveTubes();
      while (this.graphGroup.children.length > 0) {
        const obj = this.graphGroup.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        this.graphGroup.remove(obj);
      }
      this.meshMap.clear();
      this.linkMeshes = [];
      this.hoveredMesh = null;
      this.hoveredNode = null;
      if (this.canvas) this.canvas.style.cursor = 'default';

      // 1. Phân bố vị trí ban đầu theo thuật toán không gian chống tụ đống
      this._calculateLayoutPositions();

      // 2. Tạo 3D Sticky Note Mesh cho mỗi node
      this.nodes.forEach(node => {
        const mesh = this._createStickyNoteMesh(node);
        this.graphGroup.add(mesh);
        this.meshMap.set(node.id, mesh);
      });

      // 3. Tạo 3D Curved Bezier Lines nối các node
      this._buildConnectionLines();

      // 4. Áp dụng bộ lọc hiện tại
      this._applyFilters();

      // 5. Khởi chạy hiệu ứng xuất hiện ban đầu (Stagger Entrance Animation)
      if (this.options.enableIntroAnim !== false) {
        this.playEntranceAnimation();
      }
    }

    _getActiveLayoutType() {
      let layout = this.options.layoutType || 'auto';
      if (layout === 'auto') {
        const isMobile = (this.width || window.innerWidth) < 768;
        layout = isMobile
          ? (this.options.layoutTypeMobile || 'galaxy')
          : (this.options.layoutTypeDesktop || 'cylinder');
      }
      return layout;
    }

    // --- THUẬT TOÁN PHÂN BỐ KHÔNG GIAN (ANTI-CLUMPING SPREAD) ---
    _calculateLayoutPositions() {
      const R = this.options.spreadRadius;
      const activeLayout = this._getActiveLayoutType();

      switch (activeLayout) {
        case 'galaxy':
          this._layoutGalaxyShells(R);
          break;
        case 'cylinder':
        default:
          this._layoutCylinder(R);
          break;
      }

      // 🎯 Thích ứng hình dạng theo tỷ lệ khung hình canvas (Adaptive Aspect Shape):
      // Dãn rộng ngang trên màn hình rộng (Desktop / Laptop) và dãn dọc trên màn hình hẹp (Mobile)
      // Giúp hạn chế tối đa các sticky note bị lọt ra ngoài mép canvas ở góc nhìn ban đầu.
      if (this.options.adaptiveAspectShape !== false) {
        const w = this.width || (this.wrapper && this.wrapper.clientWidth) || window.innerWidth || 1200;
        const h = this.height || (this.wrapper && this.wrapper.clientHeight) || window.innerHeight || 800;
        const aspect = (w > 0 && h > 0) ? (w / h) : 1.6;
        const power = this.options.aspectRatioPower !== undefined ? this.options.aspectRatioPower : 0.6;

        let scaleXZ = 1.0;
        let scaleY = 1.0;

        if (aspect >= 1.0) {
          // Màn hình ngang (Laptop / Desktop / Tablet ngang):
          // Dãn rộng bề ngang X/Z, nén chiều cao Y để khối không bị trượt ra ngoài mép trên/dưới canvas
          scaleXZ = Math.min(1.7, Math.max(1.0, Math.pow(aspect, power))) * (this.options.aspectScaleX || 1.0);
          scaleY = Math.max(0.45, Math.min(1.0, Math.pow(1 / aspect, power))) * (this.options.aspectScaleY || 1.0);
        } else {
          // Màn hình dọc (Mobile / Tablet dọc):
          // Thu gọn bề ngang X/Z để tránh bị tràn mép trái/phải, dãn chiều cao Y tận dụng khoảng trống dọc
          scaleXZ = Math.max(0.5, Math.min(1.0, Math.pow(aspect, power))) * (this.options.aspectScaleX || 1.0);
          scaleY = Math.min(1.7, Math.max(1.0, Math.pow(1 / aspect, power))) * (this.options.aspectScaleY || 1.0);
        }

        const scaleZ = scaleXZ * (this.options.aspectScaleZ || 1.0);

        this.nodes.forEach(n => {
          n.x *= scaleXZ;
          n.y *= scaleY;
          n.z *= scaleZ;
        });
      }

      // Phân tầng độ sâu theo cấp bậc (Depth by Hierarchy): Lõi nổi về phía trước (+Z), các tầng sau lùi dần (-Z)
      if (this.options.hierarchyDepth) {
        const levels = Array.from(new Set(this.nodes.map(n => n.level || 1))).sort((a, b) => a - b);
        const minL = levels[0] || 1;
        const maxL = levels[levels.length - 1] || 4;
        const midL = (minL + maxL) / 2;
        this.nodes.forEach(n => {
          const lvl = n.level || midL;
          const zOffset = (midL - lvl) * 90;
          n.z += zOffset;
        });
      }
    }

    // Phân bố vỏ cầu & vành quỹ đạo phân tầng (Fibonacci Sphere Shells) theo danh sách Level thực tế
    _layoutGalaxyShells(baseRadius) {
      const levels = Array.from(new Set(this.nodes.map(n => n.level || 1))).sort((a, b) => a - b);
      if (levels.length === 0) return;

      const byLevel = {};
      levels.forEach(lvl => { byLevel[lvl] = []; });
      this.nodes.forEach(n => {
        const lvl = n.level || levels[0];
        if (!byLevel[lvl]) byLevel[lvl] = [];
        byLevel[lvl].push(n);
      });

      const goldenRatio = (1 + Math.sqrt(5)) / 2;

      levels.forEach((lvl, index) => {
        const list = byLevel[lvl];
        if (!list || list.length === 0) return;

        const r = baseRadius * (0.35 + index * 0.35);

        if (index === 0) {
          // Level 1: Vành lõi trong
          list.forEach((n, i) => {
            const angle = (i / Math.max(list.length, 1)) * Math.PI * 2;
            n.x = Math.cos(angle) * r;
            n.y = Math.sin(i * 1.5) * 60;
            n.z = Math.sin(angle) * r;
          });
        } else if (index === 1) {
          // Level 2: Quỹ đạo trung gian
          list.forEach((n, i) => {
            const phi = Math.acos(-1 + (2 * i) / Math.max(list.length, 1));
            const theta = Math.sqrt(list.length * Math.PI) * phi;
            n.x = r * Math.cos(theta) * Math.sin(phi);
            n.y = (r * Math.cos(phi)) * 0.6;
            n.z = r * Math.sin(theta) * Math.sin(phi);
          });
        } else {
          // Level 3, 4, 5, 6...: Phân bố đều trên vỏ cầu Fibonacci Spiral
          list.forEach((n, i) => {
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / Math.max(list.length, 1));
            n.x = r * Math.cos(theta) * Math.sin(phi);
            n.y = (r * Math.cos(phi)) * 0.8;
            n.z = r * Math.sin(theta) * Math.sin(phi);
          });
        }
      });
    }



    // Phân bố trụ tròn phân tầng (Cylindrical Discs) theo danh sách Level thực tế
    _layoutCylinder(baseRadius) {
      const levels = Array.from(new Set(this.nodes.map(n => n.level || 1))).sort((a, b) => a - b);
      if (levels.length === 0) return;

      const byLevel = {};
      levels.forEach(lvl => { byLevel[lvl] = []; });
      this.nodes.forEach(n => {
        const lvl = n.level || levels[0];
        if (!byLevel[lvl]) byLevel[lvl] = [];
        byLevel[lvl].push(n);
      });

      const numLevels = levels.length;
      const maxY = 480;
      const minY = -480;

      levels.forEach((lvl, index) => {
        const list = byLevel[lvl];
        if (!list || list.length === 0) return;

        const t = numLevels > 1 ? index / (numLevels - 1) : 0.5;
        const baseY = maxY - t * (maxY - minY);
        const r = baseRadius * (0.35 + index * 0.38);

        list.forEach((n, i) => {
          const angle = (i / Math.max(list.length, 1)) * Math.PI * 2;
          const yStagger = (i % 2 === 0 ? 1 : -1) * 35 + Math.sin(i * 3.5) * 20;
          n.x = Math.cos(angle) * r;
          n.y = baseY + yStagger;
          n.z = Math.sin(angle) * r;
        });
      });
    }



    // Kiểm tra màu sáng để tự động chọn độ tương phản cho text và keo dán
    _isLightColor(hex) {
      if (!hex || typeof hex !== 'string') return true;
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      if (c.length !== 6) return true;
      const r = parseInt(c.substr(0, 2), 16);
      const g = parseInt(c.substr(2, 2), 16);
      const b = parseInt(c.substr(4, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return yiq >= 135;
    }

    // Tính toán chiều cao cần thiết để chứa đầy đủ nội dung chữ (Label & Description)
    _calculateNodeDimensions(node) {
      const lvlConfig = this._getLevelBaseConfig(node.level);
      const width = lvlConfig.width;
      const padX = 14;
      const maxTextWidth = width - (padX * 2);
      const tapeHeight = Math.round(lvlConfig.height * 0.22);

      // Canvas tạm thời để đo chữ
      const dummyCanvas = document.createElement('canvas');
      const ctx = dummyCanvas.getContext('2d');

      const titleFontSize = this.options.fontSize || lvlConfig.fontSize || 16;
      ctx.font = `italic 600 ${titleFontSize}px "Crimson Pro", Georgia, serif`;
      const titleLineHeight = Math.round(titleFontSize * 1.25);
      const titleLines = this._getWrappedLines(ctx, node.label, maxTextWidth);
      const titleTotalHeight = titleLines.length * titleLineHeight;

      let descTotalHeight = 0;
      if (node.desc) {
        const descFontSize = this.options.descFontSize || Math.max(Math.min(titleFontSize - 4, 11), 8);
        const descLineHeight = Math.round(descFontSize * 1.35);
        ctx.font = `400 ${descFontSize}px "Work Sans", -apple-system, sans-serif`;
        const descLines = this._getWrappedLines(ctx, node.desc, maxTextWidth);
        descTotalHeight = descLines.length * descLineHeight + 16; // 16px gap
      }

      const contentHeight = tapeHeight + 8 + titleTotalHeight + descTotalHeight + 14; // 14px padding dưới
      const height = Math.max(lvlConfig.height, contentHeight);

      return { width, height };
    }

    _getWrappedLines(ctx, text, maxWidth) {
      if (!text) return [];
      const words = String(text).split(' ');
      const lines = [];
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line.trim());
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      if (line.trim()) {
        lines.push(line.trim());
      }
      return lines;
    }

    // --- TẠO CANVAS TEXTURE CHO STICKY NOTE (BO GÓC NÉT, 4X SIÊU NÉT KHI ZOOM, CHUẨN POST-IT) ---
    _createStickyNoteTexture(node, width, height) {
      const canvas = document.createElement('canvas');
      const dpr = 3; // Tăng lên 4x High-DPI để khi zoom sát chữ vẫn siêu nét, không bị vỡ hoặc nhòe
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      // Cải thiện chất lượng font & vector rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Màu nền: màu sắc lấy từ dữ liệu node (node.color) hoặc fallback
      // Không cắt xén (clip) trong canvas 2D để tránh pixel đen trong suốt (0,0,0,0) gây viền răng cưa đen.
      // Việc bo tròn 4 góc được xử lý bằng SDF shader vector mượt mà ở cấp độ sub-pixel.
      const bgColor = node.color || DEFAULT_FALLBACK_COLOR;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Phần keo dán phía trên: lớp border xám mờ (opacity 0.10)
      const tapeHeight = Math.round(height * 0.15);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
      ctx.fillRect(0, 0, width, tapeHeight);

      // Tự động chọn màu chữ theo độ sáng nền để tương phản tối đa
      const isLightBg = this._isLightColor(bgColor);
      const titleColor = isLightBg ? '#0f172a' : '#ffffff';
      const descColor = isLightBg ? '#1e293b' : '#e2e8f0';

      const padX = 14;
      const maxTextWidth = width - (padX * 2);

      // 3. Label: Sử dụng font Crimson Pro (Italic trang nhã như mẫu thiết kế)
      const lvlConfig = this._getLevelBaseConfig(node.level);
      const titleFontSize = this.options.fontSize || lvlConfig.fontSize || 16;
      ctx.font = `italic 600 ${titleFontSize}px "Crimson Pro", Georgia, serif`;
      ctx.fillStyle = titleColor;

      const titleLineHeight = Math.round(titleFontSize * 1.25);
      const titleStartY = tapeHeight + titleFontSize + 8;
      const titleLines = this._getWrappedLines(ctx, node.label, maxTextWidth);

      let currentY = titleStartY;
      titleLines.forEach(l => {
        ctx.fillText(l, padX, currentY);
        currentY += titleLineHeight;
      });

      // 4. Description: Sử dụng font Work Sans (rõ nét, đọc hết nội dung chữ không bị cắt)
      if (node.desc) {
        const descStartY = currentY + 8;
        const descFontSize = this.options.descFontSize || Math.max(Math.min(titleFontSize - 4, 11), 8);
        const descLineHeight = Math.round(descFontSize * 1.35);

        ctx.font = `400 ${descFontSize}px "Work Sans", -apple-system, sans-serif`;
        ctx.fillStyle = descColor;

        const descLines = this._getWrappedLines(ctx, node.desc, maxTextWidth);
        let dY = descStartY;
        descLines.forEach(l => {
          ctx.fillText(l, padX, dY);
          dY += descLineHeight;
        });
      }

      const texture = new window.THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = window.THREE.LinearMipmapLinearFilter;
      texture.magFilter = window.THREE.LinearFilter;
      if (this.renderer && this.renderer.capabilities) {
        texture.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy() || 1);
      }
      return texture;
    }

    // --- TẠO 3D MESH CHO TỪNG STICKY NOTE (2D PLANE, GIẤY NHÁM MATTE, PAPER CURL & RUNG LẮC FLUTTER) ---
    _createStickyNoteMesh(node) {
      const dims = this._calculateNodeDimensions(node);
      const width = dims.width * this.options.noteScale;
      const height = dims.height * this.options.noteScale;
      const borderRadius = this.options.borderRadius !== undefined ? this.options.borderRadius : 8;

      // Luôn là mặt phẳng 2D (PlaneGeometry) với lưới 20x20 segments để uốn cong và rung lắc mép mềm mại
      const geometry = new THREE.PlaneGeometry(width, height, 20, 20);

      // Gắn thông số kích thước thẻ & bán kính bo góc vào vertex attribute để SDF shader bo tròn góc mượt mà
      const posCount = geometry.attributes.position.count;
      const cardParams = new Float32Array(posCount * 3);
      for (let i = 0; i < posCount; i++) {
        cardParams[i * 3 + 0] = dims.width;
        cardParams[i * 3 + 1] = dims.height;
        cardParams[i * 3 + 2] = borderRadius;
      }
      geometry.setAttribute('aCardParams', new THREE.BufferAttribute(cardParams, 3));

      // Tạo canvas texture mặt trước (chứa keo dán, Crimson Pro label, Work Sans desc)
      const frontTexture = this._createStickyNoteTexture(node, dims.width, dims.height);

      // Chất liệu bề mặt: mặc định giấy nhám mịn (Matte / Paper), double-sided
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.88,
        metalness: 0.02,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
      });

      // Tham số biến dạng riêng biệt (random range) cho từng note
      const randCurlLeft = 0.5 + Math.random() * 0.9;
      const randCurlRight = 0.5 + Math.random() * 0.9;
      const randPhase = Math.random() * Math.PI * 2;
      const randFreq = 7.5 + Math.random() * 4.0;

      // Shader tùy biến:
      // 1. Vertex Shader: Độ cong mép giấy (Paper Curl) + Rung lắc mép dưới trái & phải khi di chuyển trong không gian 3D
      // 2. Fragment Shader: Bo góc SDF khử hoàn toàn răng cưa & viền đen + Độ sâu trường ảnh (DoF Blur Bokeh 13-tap)
      frontMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.uPaperCurl = { value: this.options.paperCurl !== undefined ? this.options.paperCurl : 3.0 };
        shader.uniforms.uFlutterAmp = { value: this.options.flutterAmp !== undefined ? this.options.flutterAmp : 3.5 };
        shader.uniforms.uMotionVel = { value: 0.0 };
        shader.uniforms.uTime = { value: 0.0 };
        shader.uniforms.uRandCurl = { value: new THREE.Vector2(randCurlLeft, randCurlRight) };
        shader.uniforms.uRandPhase = { value: randPhase };
        shader.uniforms.uRandFreq = { value: randFreq };
        shader.uniforms.uDoFBlur = { value: 0.0 };

        shader.vertexShader = `
          attribute vec3 aCardParams;
          varying vec2 vCardSize;
          varying float vRadius;
          uniform float uPaperCurl;
          uniform float uFlutterAmp;
          uniform float uMotionVel;
          uniform float uTime;
          uniform vec2 uRandCurl;
          uniform float uRandPhase;
          uniform float uRandFreq;
        ` + shader.vertexShader;

        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
          #include <begin_vertex>
          vCardSize = aCardParams.xy;
          vRadius = aCardParams.z;
          // Top mép có keo dán (uv.y = 1.0) giữ nguyên; mép dưới (uv.y = 0.0) vênh cong và rung lắc
          float bottomFactor = pow(1.0 - uv.y, 2.0);
          float leftCorner = pow(1.0 - uv.x, 2.0) * uRandCurl.x;
          float rightCorner = pow(uv.x, 2.0) * uRandCurl.y;

          // 1. Độ cong vênh mép giấy cơ sở (Static paper curl)
          float staticCurl = (leftCorner + rightCorner) * bottomFactor * uPaperCurl;

          // 2. Hiệu ứng rung lắc mép giấy (Dynamic vibration/flutter) khi xoay hoặc di chuyển 3D
          float flutterL = sin(uTime * uRandFreq + uRandPhase) * leftCorner * bottomFactor;
          float flutterR = cos(uTime * (uRandFreq * 1.1) + uRandPhase + 1.25) * rightCorner * bottomFactor;
          float motionFactor = 0.15 + clamp(uMotionVel * 2.2, 0.0, 3.5);
          float dynamicVibe = (flutterL + flutterR) * motionFactor * uFlutterAmp;

          transformed.z += staticCurl + dynamicVibe;
          `
        );

        shader.fragmentShader = `
          varying vec2 vCardSize;
          varying float vRadius;
          uniform float uDoFBlur;
        ` + shader.fragmentShader;

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          `
          #ifdef USE_MAP
            vec4 texelColor;
            if (uDoFBlur <= 0.001) {
              texelColor = texture2D( map, vUv );
            } else {
              // 13-tap Gaussian / Poisson disc blur cho DoF Bokeh thật sự (giữ nguyên opacity 1.0)
              vec2 bRad = vec2(uDoFBlur * 0.0055, uDoFBlur * 0.0055);
              texelColor = texture2D( map, vUv ) * 0.16;
              texelColor += texture2D( map, vUv + vec2( 0.0,  1.0) * bRad ) * 0.09;
              texelColor += texture2D( map, vUv + vec2( 0.0, -1.0) * bRad ) * 0.09;
              texelColor += texture2D( map, vUv + vec2( 1.0,  0.0) * bRad ) * 0.09;
              texelColor += texture2D( map, vUv + vec2(-1.0,  0.0) * bRad ) * 0.09;
              texelColor += texture2D( map, vUv + vec2( 0.707,  0.707) * bRad * 1.5 ) * 0.07;
              texelColor += texture2D( map, vUv + vec2(-0.707,  0.707) * bRad * 1.5 ) * 0.07;
              texelColor += texture2D( map, vUv + vec2( 0.707, -0.707) * bRad * 1.5 ) * 0.07;
              texelColor += texture2D( map, vUv + vec2(-0.707, -0.707) * bRad * 1.5 ) * 0.07;
              texelColor += texture2D( map, vUv + vec2( 0.0,  2.0) * bRad ) * 0.07;
              texelColor += texture2D( map, vUv + vec2( 0.0, -2.0) * bRad ) * 0.07;
              texelColor += texture2D( map, vUv + vec2( 2.0,  0.0) * bRad ) * 0.07;
              texelColor += texture2D( map, vUv + vec2(-2.0,  0.0) * bRad ) * 0.07;
            }
            texelColor = mapTexelToLinear( texelColor );
            diffuseColor *= texelColor;

            // Bo 4 góc siêu mịn mượt (SDF Antialiasing), triệt tiêu hoàn toàn viền răng cưa đen
            if (vRadius > 0.0) {
              vec2 p = (vUv - 0.5) * vCardSize;
              vec2 halfSize = vCardSize * 0.5;
              vec2 q = abs(p) - (halfSize - vec2(vRadius));
              float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - vRadius;
              float delta = fwidth(dist);
              float cornerAlpha = clamp(0.5 - dist / max(delta, 0.0001), 0.0, 1.0);
              if (cornerAlpha <= 0.0) discard;
              diffuseColor.a *= cornerAlpha;
            }
          #endif
          `
        );

        frontMaterial.userData.shader = shader;
      };

      const mesh = new THREE.Mesh(geometry, frontMaterial);
      mesh.position.set(node.x || 0, node.y || 0, node.z || 0);

      mesh.userData = {
        node: node,
        basePos: mesh.position.clone(),
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeedFactor: 0.8 + Math.random() * 0.4,
        frontMaterial: frontMaterial,
        accentColor: new THREE.Color(node.color || DEFAULT_FALLBACK_COLOR),
        filterMatch: true,
        targetScale: 1.0,
        targetOpacity: 1.0,
        currentEmissive: 0.0,
        intro: null
      };

      return mesh;
    }

    // Tái tạo toàn bộ mesh khi thay đổi hình dạng card (Box / Plane / Bevel) hoặc chất liệu
    _rebuildMeshes() {
      this.hoveredMesh = null;
      this.hoveredNode = null;
      if (this.canvas) this.canvas.style.cursor = 'default';

      this.meshMap.forEach((oldMesh, id) => {
        const node = oldMesh.userData.node;
        const pos = oldMesh.position.clone();
        const basePos = oldMesh.userData.basePos ? oldMesh.userData.basePos.clone() : pos.clone();

        this.graphGroup.remove(oldMesh);
        if (oldMesh.geometry) oldMesh.geometry.dispose();
        if (Array.isArray(oldMesh.material)) {
          oldMesh.material.forEach(m => m.dispose());
        } else if (oldMesh.material) {
          oldMesh.material.dispose();
        }

        const newMesh = this._createStickyNoteMesh(node);
        newMesh.position.copy(pos);
        newMesh.userData.basePos.copy(basePos);
        newMesh.userData.targetScale = oldMesh.userData.targetScale || 1.0;
        newMesh.userData.targetOpacity = oldMesh.userData.targetOpacity !== undefined ? oldMesh.userData.targetOpacity : 1.0;
        newMesh.userData.currentEmissive = 0.0;
        this.graphGroup.add(newMesh);
        this.meshMap.set(id, newMesh);
      });

      // Cập nhật lại tham chiếu của dây nối đến mesh mới
      this.linkMeshes.forEach(line => {
        line.userData.sourceMesh = this.meshMap.get(line.userData.link.source);
        line.userData.targetMesh = this.meshMap.get(line.userData.link.target);
        this._updateLinkGeometry(line);
      });
    }

    // Hàm phụ trợ tạo đường cong nối theo hình thái (Bezier, Thẳng, Vuông góc Orthogonal)
    _createLineCurve(p1, p2, idx, midOffset) {
      const THREE = window.THREE;
      const morph = this.options.lineMorphology || 'bezier';

      if (morph === 'straight') {
        // Đường thẳng dứt khoát
        return new THREE.LineCurve3(p1.clone(), p2.clone());
      } else if (morph === 'orthogonal') {
        // Đường gấp khúc vuông góc (Orthogonal pipe 90°)
        const curvePath = new THREE.CurvePath();
        const c1 = new THREE.Vector3(p2.x, p1.y, p1.z);
        const c2 = new THREE.Vector3(p2.x, p2.y, p1.z);
        curvePath.add(new THREE.LineCurve3(p1.clone(), c1));
        curvePath.add(new THREE.LineCurve3(c1, c2));
        curvePath.add(new THREE.LineCurve3(c2, p2.clone()));
        return curvePath;
      } else {
        // Đường cong Bezier mềm mại (Curved splines)
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        if (midOffset) mid.add(midOffset);
        return new THREE.QuadraticBezierCurve3(p1.clone(), mid, p2.clone());
      }
    }

    // --- TẠO CÁC DÂY NỐI 3D GIỮA CÁC NOTE (CONNECTION LINES) ---
    _buildConnectionLines() {
      const THREE = window.THREE;
      const isLight = this.isLightMode();
      const configuredLineColor = isLight ? this.options.lineColorLight : this.options.lineColorDark;
      const lineOpacity = isLight
        ? (this.options.lineOpacityLight !== undefined ? this.options.lineOpacityLight : 0.9)
        : (this.options.lineOpacityDark !== undefined ? this.options.lineOpacityDark : 0.6);
      const defaultLineWidth = this.options.lineWidth !== undefined ? this.options.lineWidth : 1.5;

      this.links.forEach((link, idx) => {
        const sourceMesh = this.meshMap.get(link.source);
        const targetMesh = this.meshMap.get(link.target);
        if (!sourceMesh || !targetMesh) return;

        const p1 = sourceMesh.position;
        const p2 = targetMesh.position;
        const dist = p1.distanceTo(p2);
        const curveOffset = new THREE.Vector3(
          Math.sin(idx * 1.7) * (dist * 0.12),
          Math.cos(idx * 1.3) * (dist * 0.15) + (dist * 0.05),
          Math.sin(idx * 0.9) * (dist * 0.12)
        );

        const curve = this._createLineCurve(p1, p2, idx, curveOffset);
        const points = curve.getPoints(36);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        let linkColor;
        if (configuredLineColor) {
          linkColor = new THREE.Color(configuredLineColor);
        } else {
          const sourceColor = sourceMesh.userData.node.color || DEFAULT_FALLBACK_COLOR;
          const targetColor = targetMesh.userData.node.color || DEFAULT_FALLBACK_COLOR;
          linkColor = new THREE.Color(sourceColor).lerp(new THREE.Color(targetColor), 0.5);
        }

        const material = new THREE.LineBasicMaterial({
          color: linkColor,
          transparent: true,
          opacity: Math.max(0, lineOpacity),
          linewidth: defaultLineWidth
        });

        const line = new THREE.Line(geometry, material);
        line.userData = {
          link: link,
          sourceMesh: sourceMesh,
          targetMesh: targetMesh,
          curve: curve,
          midOffset: curveOffset,
          baseOpacity: lineOpacity,
          baseWidth: defaultLineWidth,
          baseColor: linkColor.clone(),
          intro: null
        };

        // Nếu opacity mặc định <= 0 thì ẩn luôn connection đi
        if (lineOpacity <= 0) {
          line.visible = false;
        }

        this.graphGroup.add(line);
        this.linkMeshes.push(line);
      });
    }

    // --- CÁC HÀM EASING CHO HIỆU ỨNG XUẤT HIỆN BAN ĐẦU ---
    _easeBackOut(t) {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    _easeCubicOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    _easeElasticOut(t) {
      if (t === 0) return 0;
      if (t === 1) return 1;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    }

    // --- HIỆU ỨNG XUẤT HIỆN BAN ĐẦU (STAGGER ENTRANCE ANIMATION) ---
    playEntranceAnimation() {
      if (!this.meshMap || this.meshMap.size === 0) return;

      const visibleMeshes = Array.from(this.meshMap.values()).filter(m => m.userData.filterMatch !== false);
      if (visibleMeshes.length === 0) return;

      const orderType = this.options.introOrder || 'random';
      if (orderType === 'random') {
        // Trộn ngẫu nhiên (Fisher-Yates)
        for (let i = visibleMeshes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = visibleMeshes[i];
          visibleMeshes[i] = visibleMeshes[j];
          visibleMeshes[j] = temp;
        }
      } else if (orderType === 'centerOut' || orderType === 'radial') {
        // Từ tâm (0, 0, 0) lan tỏa dần ra ngoài biên
        visibleMeshes.sort((a, b) => a.position.length() - b.position.length());
      } else if (orderType === 'level') {
        // Theo cấp độ Level 1 -> 2 -> 3... với một chút jitter ngẫu nhiên trong cùng level
        visibleMeshes.sort((a, b) => {
          const lvlA = (a.userData.node.level || 1) + Math.random() * 0.3;
          const lvlB = (b.userData.node.level || 1) + Math.random() * 0.3;
          return lvlA - lvlB;
        });
      }

      const now = performance.now();
      const stagger = this.options.introStagger !== undefined ? this.options.introStagger : 15;
      const duration = this.options.introDuration !== undefined ? this.options.introDuration : 650;

      // 1. Khởi tạo trạng thái ban đầu cho các node: Scale = 0.0001, Opacity = 0
      visibleMeshes.forEach((mesh, idx) => {
        mesh.scale.set(0.0001, 0.0001, 0.0001);
        if (mesh.userData.frontMaterial) {
          mesh.userData.frontMaterial.opacity = 0;
        }
        mesh.userData.intro = {
          startTime: now + idx * stagger,
          duration: duration,
          done: false,
          progress: 0
        };
      });

      // 2. Khởi tạo trạng thái cho các dây nối liên kết: Opacity = 0
      const lineFadeDuration = this.options.introLineFadeDuration !== undefined ? this.options.introLineFadeDuration : 400;
      this.linkMeshes.forEach(line => {
        line.material.opacity = 0;
        line.userData.intro = {
          fadeStartTime: null,
          duration: lineFadeDuration,
          progress: 0,
          done: false
        };
      });

      this.isIntroAnimating = true;
    }

    // Dọn dẹp các mesh 3D Tube của đường liên kết được highlight
    _clearActiveTubes() {
      if (this._activeTubeMeshes && this._activeTubeMeshes.length > 0) {
        this._activeTubeMeshes.forEach(mesh => {
          this.graphGroup.remove(mesh);
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) mesh.material.dispose();
        });
        this._activeTubeMeshes = [];
      }
      if (this.linkMeshes) {
        this.linkMeshes.forEach(line => {
          line.userData.activeTube = null;
        });
      }
    }

    // Cập nhật lại hình dạng đường nối khi kéo thả node
    _updateLinkGeometry(line) {
      const p1 = line.userData.sourceMesh.position;
      const p2 = line.userData.targetMesh.position;
      const curve = this._createLineCurve(p1, p2, 0, line.userData.midOffset);
      line.userData.curve = curve;

      const posAttr = line.geometry.attributes.position;
      const points = curve.getPoints(36);
      if (posAttr && posAttr.count === points.length) {
        for (let i = 0; i < points.length; i++) {
          posAttr.setXYZ(i, points[i].x, points[i].y, points[i].z);
        }
        posAttr.needsUpdate = true;
      } else {
        line.geometry.setFromPoints(points);
      }

      // Cập nhật lại hình dạng 3D Tube mesh nếu connection đang được highlight
      if (line.userData.activeTube) {
        line.userData.activeTube.geometry.dispose();
        const activeWidth = this.options.lineActiveWidth !== undefined ? this.options.lineActiveWidth : 3;
        const radius = Math.max(0.4, activeWidth * 0.45);
        line.userData.activeTube.geometry = new window.THREE.TubeGeometry(curve, 20, radius, 6, false);
      }
    }

    // Tái tạo toàn bộ đường nối khi thay đổi hình thái (Morphology)
    _rebuildLines() {
      this._clearActiveTubes();
      this.linkMeshes.forEach(l => {
        this.graphGroup.remove(l);
        if (l.geometry) l.geometry.dispose();
        if (l.material) l.material.dispose();
      });
      this.linkMeshes = [];
      this._buildConnectionLines();
    }

    // --- BỘ LỌC & TÌM KIẾM ---
    filterLevel(level) {
      this.activeLevelFilter = level;
      this._applyFilters();
    }

    filterCategory(catKey) {
      this.activeCategoryFilter = catKey;
      this._applyFilters();
    }

    search(query) {
      this.searchQuery = (query || '').trim().toLowerCase();
      this._applyFilters();

      // Nếu có kết quả tìm kiếm duy nhất, tự động focus vào
      if (this.searchQuery) {
        const matches = this.nodes.filter(n =>
          n.label.toLowerCase().includes(this.searchQuery) ||
          n.desc.toLowerCase().includes(this.searchQuery) ||
          n.id.toLowerCase().includes(this.searchQuery)
        );
        if (matches.length > 0) {
          this.focusNode(matches[0].id);
        }
      }
    }

    _applyFilters() {
      this.nodes.forEach(node => {
        const mesh = this.meshMap.get(node.id);
        if (!mesh) return;

        let visible = true;
        if (this.activeLevelFilter !== 'ALL' && node.level !== parseInt(this.activeLevelFilter, 10)) {
          visible = false;
        }
        if (this.activeCategoryFilter !== 'ALL' && node.category !== this.activeCategoryFilter) {
          visible = false;
        }
        if (this.searchQuery) {
          const match = node.label.toLowerCase().includes(this.searchQuery) ||
            node.desc.toLowerCase().includes(this.searchQuery) ||
            node.id.toLowerCase().includes(this.searchQuery);
          if (!match) visible = false;
        }

        mesh.userData.filterMatch = visible;
        mesh.visible = visible;
      });

      // Đồng bộ trạng thái đường nối và highlight theo bộ lọc mới
      this._updateAllLineStates();
    }

    // --- ZOOM / FOCUS VÀO MỘT NODE CỤ THỂ ---
    focusNode(nodeId) {
      const mesh = this.meshMap.get(nodeId);
      if (!mesh) return;

      const targetPos = mesh.position.clone();
      const offset = new window.THREE.Vector3(0, 80, 320);
      const camPos = targetPos.clone().add(offset);

      this._animateCameraTo(camPos, targetPos);
      this.selectNode(nodeId);
    }

    _animateCameraTo(targetCamPos, targetLookAt, duration = 800) {
      const startCamPos = this.camera.position.clone();
      const startLookAt = this.controls.target.clone();
      const startTime = performance.now();

      const updateAnim = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1.0);
        // Easing cubic out
        const ease = 1 - Math.pow(1 - progress, 3);

        this.camera.position.lerpVectors(startCamPos, targetCamPos, ease);
        this.controls.target.lerpVectors(startLookAt, targetLookAt, ease);
        this.controls.update();

        if (progress < 1.0) {
          requestAnimationFrame(updateAnim);
        }
      };
      requestAnimationFrame(updateAnim);
    }

    // --- CHỌN NODE & HIGHLIGHT LIÊN KẾT (ACTIVE HIGHLIGHT STATE) ---
    selectNode(nodeId) {
      const node = nodeId ? this.nodeMap.get(nodeId) : null;
      this.selectedNode = node;

      const connectedSet = new Set(node ? node.connections : []);
      if (node) connectedSet.add(node.id);

      const isLight = this.isLightMode();

      // Xác định độ mờ của các note không được highlight theo chế độ Light / Dark mode
      let noteDimmedOpacity;
      if (isLight) {
        noteDimmedOpacity = this.options.noteDimmedOpacityLight !== undefined
          ? this.options.noteDimmedOpacityLight
          : (this.options.noteDimmedOpacity !== undefined ? this.options.noteDimmedOpacity : 0.5);
      } else {
        noteDimmedOpacity = this.options.noteDimmedOpacityDark !== undefined
          ? this.options.noteDimmedOpacityDark
          : (this.options.noteDimmedOpacity !== undefined ? this.options.noteDimmedOpacity : 0.3);
      }

      // 1. Cập nhật trạng thái hiển thị của các Sticky Notes
      this.nodes.forEach(n => {
        const mesh = this.meshMap.get(n.id);
        if (!mesh) return;

        const isFilterMatch = mesh.userData.filterMatch !== false;

        if (!node) {
          // Trạng thái bình thường: khôi phục kích thước và opacity 100%
          mesh.userData.targetScale = 1.0;
          mesh.userData.targetOpacity = 1.0;
          mesh.visible = isFilterMatch;
        } else if (connectedSet.has(n.id)) {
          // Node được chọn hoặc liên kết trực tiếp với node được chọn: giữ nguyên kích thước & sáng rõ
          mesh.userData.targetScale = 1.0;
          mesh.userData.targetOpacity = 1.0;
          mesh.visible = isFilterMatch;
        } else {
          // Node KHÔNG liên quan: thu nhỏ nhẹ và giảm opacity theo cấu hình noteDimmedOpacity
          mesh.userData.targetScale = 0.85;
          mesh.userData.targetOpacity = Math.max(0, noteDimmedOpacity);
          // Nếu opacity <= 0 thì ẩn luôn note đi
          mesh.visible = isFilterMatch && (noteDimmedOpacity > 0);
        }

        if (!this.animRunning) {
          mesh.scale.setScalar(mesh.userData.targetScale);
          mesh.userData.frontMaterial.opacity = mesh.userData.targetOpacity;
        }
      });

      // 2. Cập nhật trạng thái hiển thị của các đường liên kết (Connection Lines)
      const activeColorHex = isLight
        ? (this.options.lineActiveColorLight || '#e4e4e4')
        : (this.options.lineActiveColorDark || '#b5b5b5');
      const activeColor = new window.THREE.Color(activeColorHex);

      const defaultLineWidth = this.options.lineWidth !== undefined ? this.options.lineWidth : 1.5;
      const lineActiveWidth = this.options.lineActiveWidth !== undefined ? this.options.lineActiveWidth : 3;
      const lineActiveOpacity = this.options.lineActiveOpacity !== undefined ? this.options.lineActiveOpacity : 0.95;
      const lineDimmedWidth = this.options.lineDimmedWidth !== undefined ? this.options.lineDimmedWidth : 1;
      const lineDimmedOpacity = this.options.lineDimmedOpacity !== undefined ? this.options.lineDimmedOpacity : 0.10;

      // Dọn dẹp các mesh 3D Tube của lần highlight trước
      this._clearActiveTubes();

      this.linkMeshes.forEach(line => {
        const sMesh = line.userData.sourceMesh;
        const tMesh = line.userData.targetMesh;
        const isBothEndpointsVisible = sMesh && tMesh && sMesh.visible && tMesh.visible;

        if (!node) {
          // Trạng thái bình thường: khôi phục màu sắc, độ dày và opacity mặc định
          const baseOpacity = line.userData.baseOpacity !== undefined ? line.userData.baseOpacity : 0.6;
          line.material.color.copy(line.userData.baseColor);
          line.material.opacity = Math.max(0, baseOpacity);
          line.material.linewidth = defaultLineWidth;
          // Nếu opacity <= 0 hoặc 1 trong 2 node bị ẩn thì ẩn connection đi
          line.visible = isBothEndpointsVisible && (baseOpacity > 0);
        } else {
          // Trạng thái đang chọn/highlight 1 sticky note
          const isRelated = line.userData.link.source === node.id || line.userData.link.target === node.id;

          if (isRelated) {
            // Connection ĐƯỢC highlight (đường nối trực tiếp với note đang chọn)
            if (lineActiveOpacity <= 0 || !isBothEndpointsVisible) {
              line.visible = false;
            } else if (lineActiveWidth > 1.5) {
              // WebGL chuẩn (LineBasicMaterial) bị giới hạn cứng linewidth = 1px trên các trình duyệt và GPU hiện đại.
              // Do đó khi lineActiveWidth > 1.5px, tạo 3D TubeGeometry mesh để đường nối hiển thị đúng độ dày thực tế.
              line.visible = false;
              const radius = Math.max(0.4, lineActiveWidth * 0.45);
              const tubeGeom = new window.THREE.TubeGeometry(line.userData.curve, 24, radius, 8, false);
              const tubeMat = new window.THREE.MeshBasicMaterial({
                color: activeColor,
                transparent: true,
                opacity: lineActiveOpacity
              });
              const tubeMesh = new window.THREE.Mesh(tubeGeom, tubeMat);
              this.graphGroup.add(tubeMesh);
              this._activeTubeMeshes.push(tubeMesh);
              line.userData.activeTube = tubeMesh;
            } else {
              line.visible = true;
              line.material.color.copy(activeColor);
              line.material.opacity = lineActiveOpacity;
              line.material.linewidth = lineActiveWidth;
            }
          } else {
            // Connection KHÔNG được highlight (các đường nối còn lại không liên quan)
            if (lineDimmedOpacity <= 0 || !isBothEndpointsVisible) {
              line.visible = false;
            } else {
              line.visible = true;
              line.material.color.copy(line.userData.baseColor);
              line.material.opacity = lineDimmedOpacity;
              line.material.linewidth = lineDimmedWidth;
            }
          }
        }
      });

      if (typeof this.options.onNodeClick === 'function') {
        this.options.onNodeClick(node);
      }
    }

    // Đồng bộ lại trạng thái hiển thị của các đường nối theo trạng thái chọn node hiện tại
    _updateAllLineStates() {
      if (this.selectedNode) {
        this.selectNode(this.selectedNode.id);
      } else {
        const defaultLineWidth = this.options.lineWidth !== undefined ? this.options.lineWidth : 1.5;
        this.linkMeshes.forEach(line => {
          const sMesh = line.userData.sourceMesh;
          const tMesh = line.userData.targetMesh;
          const isBothEndpointsVisible = sMesh && tMesh && sMesh.visible && tMesh.visible;
          const baseOpacity = line.userData.baseOpacity !== undefined ? line.userData.baseOpacity : 0.6;
          line.material.color.copy(line.userData.baseColor);
          line.material.opacity = Math.max(0, baseOpacity);
          line.material.linewidth = defaultLineWidth;
          line.visible = isBothEndpointsVisible && (baseOpacity > 0);
        });
      }
    }

    resetSelection() {
      this.selectedNode = null;
      this.selectNode(null);
    }

    resetCamera() {
      const targetCamPos = this.initialRandomCamPos || this._getBaseCameraPreset();
      this._animateCameraTo(
        new window.THREE.Vector3(targetCamPos.x, targetCamPos.y, targetCamPos.z),
        new window.THREE.Vector3(0, 0, 0)
      );
    }

    // --- XỬ LÝ SỰ KIỆN CHUỘT & KÉO THẢ 3D (INTERACTIONS & PHYSICS) ---
    _initEvents() {
      const dom = this.renderer.domElement;

      // Resize: Quan sát sự thay đổi kích thước của container div do CSS quy định
      let resizeRaf = null;
      let lastStickyWidth = window.innerWidth;
      const triggerResize = (w, h) => {
        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const widthChanged = Math.abs(w - lastStickyWidth) > 5;
        if (isTouch && !widthChanged) {
          return;
        }
        lastStickyWidth = w;

        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          resizeRaf = null;
          this._onContainerResize(w, h);
        });
      };

      if (typeof ResizeObserver !== 'undefined' && this.wrapper) {
        this.resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            let w = 0;
            let h = 0;
            if (entry.contentRect) {
              w = Math.round(entry.contentRect.width);
              h = Math.round(entry.contentRect.height);
            }
            if (!w || !h) {
              const s = this._getContainerSize();
              w = s.width;
              h = s.height;
            }
            if (w > 0 && h > 0) {
              triggerResize(w, h);
            }
          }
        });
        this.resizeObserver.observe(this.wrapper);
      }

      // Resize window fallback
      window.addEventListener('resize', () => {
        const s = this._getContainerSize();
        if (s.width > 0 && s.height > 0) {
          triggerResize(s.width, s.height);
        }
      }, { passive: true });

      // Vô hiệu hóa menu ngữ cảnh mặc định của trình duyệt để bấm chuột phải kéo Pan mượt mà
      dom.addEventListener('contextmenu', (e) => e.preventDefault());

      // Phân định thao tác Chuột & Cảm ứng:
      // - Drag (kéo giữ chuột/ngón tay ở bất cứ đâu): Xoay hoặc Pan toàn bộ khối cầu trong canvas qua OrbitControls
      // - Click nhẹ (khoảng cách chuột di chuyển < 8px): Chọn/Focus sticky note nếu click trúng note, hoặc Bỏ chọn nếu click ra khoảng trống
      let isPointerDown = false;
      let pointerDownPos = null;

      // Pointer Down
      dom.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        isPointerDown = true;
        pointerDownPos = { x: e.clientX, y: e.clientY };

        // Luôn giữ OrbitControls kích hoạt để việc kéo chuột ở bất kỳ đâu (kể cả bắt đầu từ trên sticky note)
        // cũng đều xoay khối cầu mượt mà, không bao giờ bị đè hoặc xung đột
      });

      // Pointer Move (Hover hiệu ứng sáng/phóng to khi không drag)
      dom.addEventListener('pointermove', (e) => {
        // Trên màn hình cảm ứng: cử chỉ vuốt đã được xử lý bởi touch listener chuyên biệt
        if (e.pointerType === 'touch') return;

        // Nếu đang nhấn giữ chuột (đang kéo xoay khối cầu), đổi cursor grabbing và bỏ hover
        if (isPointerDown || (e.buttons && e.buttons > 0)) {
          dom.style.cursor = 'grabbing';
          if (this.hoveredMesh) {
            this.hoveredMesh = null;
            this.hoveredNode = null;
            if (typeof this.options.onNodeHover === 'function') {
              this.options.onNodeHover(null);
            }
          }
          return;
        }

        // Hover raycast khi chuột di chuyển tự do (buttons === 0)
        const rect = dom.getBoundingClientRect();
        const rw = rect.width || this.width;
        const rh = rect.height || this.height;
        this.mouse.x = ((e.clientX - rect.left) / rw) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rh) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const visibleMeshes = Array.from(this.meshMap.values()).filter(m => m.visible);
        const intersects = this.raycaster.intersectObjects(visibleMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          dom.style.cursor = 'pointer';
          if (this.hoveredMesh !== hit) {
            this.hoveredMesh = hit;
            this.hoveredNode = hit.userData.node;
            if (typeof this.options.onNodeHover === 'function') {
              this.options.onNodeHover(this.hoveredNode);
            }
          }
        } else {
          dom.style.cursor = 'default';
          if (this.hoveredMesh) {
            this.hoveredMesh = null;
            this.hoveredNode = null;
            if (typeof this.options.onNodeHover === 'function') {
              this.options.onNodeHover(null);
            }
          }
        }
      });

      // Pointer Leave: Khi chuột rời khỏi vùng canvas, khôi phục chuột mặc định và hủy hover
      dom.addEventListener('pointerleave', () => {
        isPointerDown = false;
        pointerDownPos = null;
        dom.style.cursor = 'default';
        if (this.hoveredMesh) {
          this.hoveredMesh = null;
          this.hoveredNode = null;
          if (typeof this.options.onNodeHover === 'function') {
            this.options.onNodeHover(null);
          }
        }
      });

      // Pointer Up (Phân biệt Click vs Drag)
      window.addEventListener('pointerup', (e) => {
        if (pointerDownPos) {
          const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
          // Ngưỡng di chuyển < 8px được xác định chính xác là hành vi Click / Tap
          if (dist < 8) {
            const rect = dom.getBoundingClientRect();
            const rw = rect.width || this.width;
            const rh = rect.height || this.height;
            this.mouse.x = ((e.clientX - rect.left) / rw) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rh) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const visibleMeshes = Array.from(this.meshMap.values()).filter(m => m.visible);
            const intersects = this.raycaster.intersectObjects(visibleMeshes);

            if (intersects.length > 0) {
              const hitMesh = intersects[0].object;
              const hitNodeId = hitMesh.userData.node.id;
              this.focusNode(hitNodeId);
            } else {
              // Click vào khoảng trống canvas: Bỏ chọn node & Zoom out về vị trí camera ban đầu
              this.resetSelection();
              this.resetCamera();
            }
          }
        }

        isPointerDown = false;
        pointerDownPos = null;

        // Khôi phục cursor dựa trên vị trí hiện tại
        if (e.pointerType !== 'touch') {
          const rect = dom.getBoundingClientRect();
          const rw = rect.width || this.width;
          const rh = rect.height || this.height;
          this.mouse.x = ((e.clientX - rect.left) / rw) * 2 - 1;
          this.mouse.y = -((e.clientY - rect.top) / rh) * 2 + 1;
          this.raycaster.setFromCamera(this.mouse, this.camera);
          const visibleMeshes = Array.from(this.meshMap.values()).filter(m => m.visible);
          const intersects = this.raycaster.intersectObjects(visibleMeshes);
          dom.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
          this.hoveredMesh = intersects.length > 0 ? intersects[0].object : null;
          this.hoveredNode = this.hoveredMesh ? this.hoveredMesh.userData.node : null;
        } else {
          dom.style.cursor = 'default';
        }
      });

      // Pointer Cancel
      window.addEventListener('pointercancel', () => {
        isPointerDown = false;
        pointerDownPos = null;
        dom.style.cursor = 'default';
      });
    }

    // --- TỐI ƯU HIỆU NĂNG: QUAN SÁT VIEWPORT & TAB VISIBILITY ---
    _initViewportObserver() {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const wasIn = this.isInViewport;
            this.isInViewport = entry.isIntersecting;

            if (this.isInViewport && !wasIn) {
              // Canvas quay trở lại viewport -> tiếp tục vòng lặp render animation
              if (!this.animRunning && this.isTabVisible) {
                if (this.clock) this.clock.start();
                this._startAnimation();
              }
            } else if (!this.isInViewport && wasIn) {
              // Canvas ra khỏi viewport -> dừng hẳn vòng lặp render và ngắt clock
              this.animRunning = false;
              if (this.clock) this.clock.stop();
            }
          });
        }, { threshold: 0.0 });

        const targetEl = this.canvas || this.wrapper || this.container;
        if (targetEl) {
          this.observer.observe(targetEl);
        }
      }

      document.addEventListener('visibilitychange', () => {
        this.isTabVisible = !document.hidden;
        if (this.isTabVisible && this.isInViewport && !this.animRunning) {
          if (this.clock) this.clock.start();
          this._startAnimation();
        } else if (!this.isTabVisible) {
          this.animRunning = false;
          if (this.clock) this.clock.stop();
        }
      });
    }

    _startAnimation() {
      if (this.animRunning) return;
      this.animRunning = true;
      if (this.clock) this.clock.start();
      this._animate();
    }

    // Lắng nghe thay đổi Dark / Light mode từ hệ thống OS (tương đương CSS @media (prefers-color-scheme))
    _initSystemThemeListener() {
      if (typeof window === 'undefined' || !window.matchMedia) return;
      this._systemThemeMedia = window.matchMedia('(prefers-color-scheme: light)');
      const onThemeChange = () => {
        if (!this.options.mode || this.options.mode === 'auto') {
          this._applyTheme();
        }
      };
      if (this._systemThemeMedia.addEventListener) {
        this._systemThemeMedia.addEventListener('change', onThemeChange);
      } else if (this._systemThemeMedia.addListener) {
        this._systemThemeMedia.addListener(onThemeChange);
      }
    }

    // Kiểm tra chế độ hiển thị sáng hay tối: tự động phát hiện theo hệ thống OS (@media prefers-color-scheme)
    isLightMode() {
      if (this.options.mode === 'light') return true;
      if (this.options.mode === 'dark') return false;
      // Mặc định hoặc 'auto': Tự động phát hiện theo CSS @media (prefers-color-scheme: light)
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: light)').matches;
      }
      return false;
    }

    // Lấy màu nền canvas hiện tại theo Dark / Light mode
    getCanvasBgColor() {
      return this.isLightMode() ? (this.options.canvasBgLight || '#f8fafc') : (this.options.canvasBgDark || '#0a0c10');
    }

    // Cập nhật chiều sâu không gian (độ fade màu khi sticky note ở càng sâu theo trục Z, hỗ trợ Linear Fog & FogExp2)
    _updateDepthFade() {
      if (!this.scene) return;
      const fade = this.options.depthFade !== undefined ? this.options.depthFade : 50;
      const currentBg = this.getCanvasBgColor();
      const bgCol = new window.THREE.Color(currentBg);

      if (fade <= 0) {
        this.scene.fog = null;
      } else {
        if (this.options.fogType === 'exp2') {
          // FogExp2: làm mờ dần các node ở xa theo hàm mũ và màu nền canvas, tạo độ sâu vô tận
          const density = 0.00015 + (fade * 0.000025);
          this.scene.fog = new window.THREE.FogExp2(bgCol, density);
        } else {
          // Linear Fog: sương mù khoảng cách tuyến tính
          const near = Math.max(200, 1400 - (fade * 10));
          const far = Math.max(near + 400, 3800 - (fade * 22));

          if (this.scene.fog && this.scene.fog.isFog && !this.scene.fog.isFogExp2) {
            this.scene.fog.color.copy(bgCol);
            this.scene.fog.near = near;
            this.scene.fog.far = far;
          } else {
            this.scene.fog = new window.THREE.Fog(bgCol, near, far);
          }
        }
      }
    }

    // --- ANIMATION LOOP (TỐI ƯU HIỆU NĂNG THEO VIEWPORT & TAB VISIBILITY) ---
    _animate() {
      // Dừng toàn bộ tính toán nếu canvas không nằm trong viewport hoặc tab đang bị ẩn
      if (!this.isInViewport || !this.isTabVisible) {
        this.animRunning = false;
        return;
      }

      this.animRunning = true;
      requestAnimationFrame(() => this._animate());

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // 1. Cập nhật OrbitControls
      const controlsChanged = this.controls.update();

      // Đo vận tốc di chuyển và xoay camera trong không gian 3D để tạo hiệu ứng rung mép giấy
      const THREE = window.THREE;
      const camPos = this.camera.position;
      const camPosDelta = camPos.distanceTo(this.prevCamPos);
      const camRotAngle = this.camera.quaternion.angleTo(this.prevCamRot);
      this.prevCamPos.copy(camPos);
      this.prevCamRot.copy(this.camera.quaternion);

      const rawVel = (camPosDelta * 0.015) + (camRotAngle * 18.0);
      this.motionVelocity = (this.motionVelocity || 0) * 0.78 + rawVel * 0.22;

      const isCameraMoving = camPosDelta > 0.001 || camRotAngle > 0.0001 || this.motionVelocity > 0.001 || controlsChanged || !!this.options.autoRotate;

      // 2. Xử lý Billboarding, Hover Lift & Tilt, và Stagger Entrance Animation
      const now = performance.now();
      const wobbleSpeed = this.options.wobbleSpeed;
      const wobbleAmp = this.options.wobbleAmp;
      const hoverScaleSetting = this.options.hoverScale !== undefined ? this.options.hoverScale : 1.08;
      const hoverBrightSetting = this.options.hoverBrightness !== undefined ? this.options.hoverBrightness : 0.18;
      const easingType = this.options.introEasing || 'backOut';
      const easingFn = easingType === 'elasticOut' ? this._easeElasticOut.bind(this) : (easingType === 'cubicOut' ? this._easeCubicOut.bind(this) : this._easeBackOut.bind(this));

      let allIntroDone = true;

      this.meshMap.forEach(mesh => {
        if (!mesh.visible) return;
        const u = mesh.userData;

        // Mặt trước của sticky note luôn hướng về phía camera (Billboarding)
        mesh.quaternion.copy(this.camera.quaternion);

        // Vị trí: bập bềnh lơ lửng + lò xo đàn hồi về basePos
        if (wobbleAmp > 0) {
          const t = time * wobbleSpeed * u.wobbleSpeedFactor + u.wobblePhase;
          mesh.position.y = u.basePos.y + Math.sin(t) * wobbleAmp;
        } else {
          mesh.position.lerp(u.basePos, 0.1);
        }

        // 🌟 Hiệu ứng Hover & Entrance Animation
        const isHovered = (this.hoveredMesh === mesh);
        const baseScale = u.targetScale !== undefined ? u.targetScale : 1.0;
        const targetScale = isHovered ? (baseScale * hoverScaleSetting) : baseScale;
        const baseOpacity = u.targetOpacity !== undefined ? u.targetOpacity : 1.0;
        const targetOpacity = isHovered ? Math.max(baseOpacity, 0.88) : baseOpacity;

        // Kiểm tra tiến trình Entrance Animation (nếu đang kích hoạt)
        if (this.isIntroAnimating && u.intro && !u.intro.done) {
          if (now < u.intro.startTime) {
            mesh.scale.set(0.0001, 0.0001, 0.0001);
            if (u.frontMaterial) u.frontMaterial.opacity = 0;
            allIntroDone = false;
          } else {
            const elapsed = now - u.intro.startTime;
            const progress = Math.min(1.0, elapsed / u.intro.duration);
            u.intro.progress = progress;
            const easedScale = Math.max(0.0001, easingFn(progress) * targetScale);
            mesh.scale.set(easedScale, easedScale, easedScale);

            const opProgress = Math.min(1.0, progress * 1.5);
            if (u.frontMaterial) {
              u.frontMaterial.opacity = opProgress * targetOpacity;
            }

            if (progress >= 1.0) {
              u.intro.done = true;
              mesh.scale.set(targetScale, targetScale, targetScale);
              if (u.frontMaterial) u.frontMaterial.opacity = targetOpacity;
            } else {
              allIntroDone = false;
            }
          }
        } else {
          // Trạng thái bình thường: mượt mà lerp kích thước (to lên nhẹ ~1.08x) và opacity
          mesh.scale.x += (targetScale - mesh.scale.x) * 0.18;
          mesh.scale.y += (targetScale - mesh.scale.y) * 0.18;
          mesh.scale.z += (targetScale - mesh.scale.z) * 0.18;

          if (u.frontMaterial) {
            u.frontMaterial.opacity += (targetOpacity - u.frontMaterial.opacity) * 0.18;
          }
        }

        // Mượt mà lerp độ sáng (emissive)
        const targetEmissive = isHovered ? hoverBrightSetting : 0.0;
        u.currentEmissive = (u.currentEmissive || 0) + (targetEmissive - (u.currentEmissive || 0)) * 0.18;
        if (u.frontMaterial && u.frontMaterial.emissive) {
          u.frontMaterial.emissive.setRGB(u.currentEmissive, u.currentEmissive, u.currentEmissive);
        }

        // Ưu tiên hiển thị note đang hover đè lên trên các note khác
        mesh.renderOrder = isHovered ? 99 : 0;

        // Cập nhật shader uniforms cho độ cong vênh & rung lắc mép giấy (Paper Curl & Flutter)
        const shader = u.frontMaterial.userData.shader;
        if (shader && shader.uniforms) {
          if (shader.uniforms.uTime) shader.uniforms.uTime.value = time;
          if (shader.uniforms.uMotionVel) shader.uniforms.uMotionVel.value = this.motionVelocity;
          if (shader.uniforms.uPaperCurl) shader.uniforms.uPaperCurl.value = this.options.paperCurl !== undefined ? this.options.paperCurl : 3.0;
          if (shader.uniforms.uFlutterAmp) shader.uniforms.uFlutterAmp.value = this.options.flutterAmp !== undefined ? this.options.flutterAmp : 3.5;
        }
      });

      // 3. Cập nhật dây nối liên kết và tiến trình xuất hiện theo cặp node
      if (this.isIntroAnimating && this.options.introShowConnections !== false) {
        this.linkMeshes.forEach(line => {
          const intro = line.userData.intro;
          if (!intro || intro.done) return;

          const srcIntro = line.userData.sourceMesh.userData.intro;
          const tgtIntro = line.userData.targetMesh.userData.intro;

          // Cả source và target đều đã bắt đầu nở ra (tiến trình >= 35%)
          const srcReady = (!srcIntro || srcIntro.progress >= 0.35);
          const tgtReady = (!tgtIntro || tgtIntro.progress >= 0.35);

          if (srcReady && tgtReady) {
            if (intro.fadeStartTime === null) {
              intro.fadeStartTime = now;
            }
            const lineElapsed = now - intro.fadeStartTime;
            const lineProg = Math.min(1.0, lineElapsed / intro.duration);
            intro.progress = lineProg;
            const lineEased = this._easeCubicOut(lineProg);
            const baseOp = line.userData.baseOpacity !== undefined ? line.userData.baseOpacity : 0.6;
            line.material.opacity = lineEased * baseOp;

            if (lineProg >= 1.0) {
              intro.done = true;
              line.material.opacity = baseOp;
            } else {
              allIntroDone = false;
            }
          } else {
            line.material.opacity = 0;
            allIntroDone = false;
          }
        });
      }

      if (this.isIntroAnimating && allIntroDone) {
        this.isIntroAnimating = false;
      }

      // Cập nhật đường nối theo chuyển động của camera/nodes
      if (isCameraMoving || wobbleAmp > 0) {
        this.linkMeshes.forEach(line => {
          this._updateLinkGeometry(line);
        });
      }

      // 4. Render Scene
      this.renderer.render(this.scene, this.camera);
    }

    // --- CẬP NHẬT CẤU HÌNH TRỰC TIẾP (API) ---
    updateConfig(newConfig = {}) {
      Object.assign(this.options, newConfig);

      // 1. Hiệu ứng Bề mặt & Chất liệu Note
      if (newConfig.paperCurl !== undefined) {
        this.meshMap.forEach(mesh => {
          const shader = mesh.userData.frontMaterial.userData.shader;
          if (shader && shader.uniforms && shader.uniforms.uPaperCurl) {
            shader.uniforms.uPaperCurl.value = this.options.paperCurl;
          }
        });
      }
      if (newConfig.flutterAmp !== undefined) {
        this.meshMap.forEach(mesh => {
          const shader = mesh.userData.frontMaterial.userData.shader;
          if (shader && shader.uniforms && shader.uniforms.uFlutterAmp) {
            shader.uniforms.uFlutterAmp.value = this.options.flutterAmp;
          }
        });
      }
      if (newConfig.hierarchyDepth !== undefined) {
        this._calculateLayoutPositions();
        this.meshMap.forEach(mesh => {
          const n = mesh.userData.node;
          mesh.position.set(n.x, n.y, n.z);
          mesh.userData.basePos.set(n.x, n.y, n.z);
        });
        this.linkMeshes.forEach(line => this._updateLinkGeometry(line));
      }
      if (newConfig.noteScale !== undefined) {
        this.meshMap.forEach(mesh => {
          mesh.scale.x = this.options.noteScale;
          mesh.scale.y = this.options.noteScale;
        });
      }
      if (newConfig.fontSize !== undefined || newConfig.descFontSize !== undefined || newConfig.borderRadius !== undefined) {
        this._rebuildMeshes();
      }
      if (newConfig.hoverScale !== undefined) {
        this.options.hoverScale = newConfig.hoverScale;
      }
      if (newConfig.hoverBrightness !== undefined) {
        this.options.hoverBrightness = newConfig.hoverBrightness;
      }

      // 2. Không gian, Ánh sáng & Chế độ Dark/Light
      if (newConfig.mode !== undefined) {
        this.setMode(newConfig.mode);
      } else if (newConfig.theme !== undefined) {
        this.setTheme(newConfig.theme);
      }

      if (newConfig.canvasBgDark !== undefined || newConfig.canvasBgLight !== undefined) {
        const currentBg = this.getCanvasBgColor();
        const bgCol = new window.THREE.Color(currentBg);
        this.scene.background = bgCol;
        if (this.renderer) {
          this.renderer.setClearColor(bgCol, 1);
        }
        this._updateDepthFade();
      }
      if (newConfig.depthFade !== undefined || newConfig.fogType !== undefined) {
        this._updateDepthFade();
      }

      // 3. Đường liên kết & Cấu trúc mạng
      if (newConfig.lineMorphology !== undefined) {
        this._rebuildLines();
      }
      if (newConfig.minDistance !== undefined) {
        this.controls.minDistance = this.options.minDistance;
      }
      if (newConfig.maxDistance !== undefined) {
        this.controls.maxDistance = this.options.maxDistance;
      }
      if (newConfig.rotateSpeed !== undefined) {
        this.controls.rotateSpeed = this.options.rotateSpeed;
      }
      if (newConfig.dampingFactor !== undefined) {
        this.controls.dampingFactor = this.options.dampingFactor;
      }
      if (newConfig.cameraPitch !== undefined) {
        this.options.cameraPitch = Number(newConfig.cameraPitch) || 0.0;
        const targetDist = this._getActiveCameraDistance();
        const preset = this._calculateCameraPreset(targetDist);
        if (this.camera && this.controls) {
          this.camera.position.set(preset.x, preset.y, preset.z);
          this.controls.update();
        }
      }
      if (newConfig.cameraDistanceDesktop !== undefined || newConfig.cameraDistanceMobile !== undefined) {
        const targetDist = this._getActiveCameraDistance();
        if (this.camera && this.controls) {
          const dir = new window.THREE.Vector3().subVectors(this.camera.position, this.controls.target);
          if (dir.lengthSq() > 0.001) {
            dir.normalize().multiplyScalar(targetDist);
            this.camera.position.copy(this.controls.target).add(dir);
            this.controls.update();
          } else {
            const preset = this._calculateCameraPreset(targetDist);
            this.camera.position.set(preset.x, preset.y, preset.z);
            this.controls.update();
          }
        }
      }
      if (newConfig.cameraPos !== undefined && this.camera) {
        const cp = this.options.cameraPos;
        if (cp.x !== undefined) this.camera.position.x = cp.x;
        if (cp.y !== undefined) this.camera.position.y = cp.y;
        if (cp.z !== undefined) this.camera.position.z = cp.z;
        this.controls.update();
      }
      if (newConfig.lineColorDark !== undefined || newConfig.lineColorLight !== undefined || newConfig.lineOpacityDark !== undefined || newConfig.lineOpacityLight !== undefined) {
        const isLight = this.isLightMode();
        const hex = isLight ? this.options.lineColorLight : this.options.lineColorDark;
        const opacity = isLight
          ? (this.options.lineOpacityLight !== undefined ? this.options.lineOpacityLight : 0.9)
          : (this.options.lineOpacityDark !== undefined ? this.options.lineOpacityDark : 0.6);
        if (hex) {
          const col = new window.THREE.Color(hex);
          this.linkMeshes.forEach(line => {
            line.userData.baseColor.copy(col);
          });
        }
        this.linkMeshes.forEach(line => {
          line.userData.baseOpacity = opacity;
        });
        this._updateAllLineStates();
      }

      // Cập nhật các thông số độ dày và highlight khi chọn note
      if (newConfig.lineWidth !== undefined || newConfig.lineActiveWidth !== undefined ||
        newConfig.lineActiveOpacity !== undefined || newConfig.lineDimmedWidth !== undefined ||
        newConfig.lineDimmedOpacity !== undefined || newConfig.noteDimmedOpacity !== undefined ||
        newConfig.noteDimmedOpacityDark !== undefined || newConfig.noteDimmedOpacityLight !== undefined) {
        this._updateAllLineStates();
      }

      // 4. Bố cục & Chuyển động
      if (newConfig.autoRotate !== undefined) {
        this.controls.autoRotate = this.options.autoRotate;
      }
      if (newConfig.autoRotateSpeed !== undefined) {
        this.controls.autoRotateSpeed = this.options.autoRotateSpeed;
      }
      if (newConfig.spreadRadius !== undefined ||
        newConfig.layoutType !== undefined ||
        newConfig.adaptiveAspectShape !== undefined ||
        newConfig.aspectRatioPower !== undefined ||
        newConfig.aspectScaleX !== undefined ||
        newConfig.aspectScaleY !== undefined ||
        newConfig.aspectScaleZ !== undefined) {
        this._calculateLayoutPositions();
        this.meshMap.forEach(mesh => {
          const n = mesh.userData.node;
          mesh.userData.basePos.set(n.x, n.y, n.z);
          if (!this.isIntroAnimating) {
            mesh.position.set(n.x, n.y, n.z);
          }
        });
        this.linkMeshes.forEach(line => this._updateLinkGeometry(line));
      }
    }

    // Tạo lại toàn bộ textures của các sticky notes khi đổi màu / font
    _regenerateTextures() {
      this.meshMap.forEach(mesh => {
        const node = mesh.userData.node;
        const dims = this._calculateNodeDimensions(node);
        const newTex = this._createStickyNoteTexture(node, dims.width, dims.height);
        if (mesh.userData.frontMaterial.map) {
          mesh.userData.frontMaterial.map.dispose();
        }
        mesh.userData.frontMaterial.map = newTex;
        mesh.userData.frontMaterial.needsUpdate = true;
      });
    }

    // Chuyển đổi chế độ: 'auto' (ăn theo hệ thống OS) | 'dark' | 'light'
    setMode(mode) {
      this.options.mode = mode || 'auto';
      this._applyMode();
    }

    // Áp dụng chế độ Dark / Light mode cho Scene, Nguồn sáng 3D và Đường liên kết
    _applyMode() {
      const isLight = this.isLightMode();
      const currentBg = this.getCanvasBgColor();
      const bgCol = new window.THREE.Color(currentBg);
      if (this.scene) this.scene.background = bgCol;
      if (this.renderer) {
        this.renderer.setClearColor(bgCol, 1);
      }
      this._updateDepthFade();

      if (this.ambientLight && this.dirLight1 && this.dirLight2) {
        if (isLight) {
          this.ambientLight.color.set(this.options.ambientLightColorLight || '#ffffff');
          this.ambientLight.intensity = this.options.ambientIntensityLight !== undefined ? this.options.ambientIntensityLight : 1.1;
          this.dirLight1.color.set(this.options.dirLight1ColorLight || '#fbbf24');
          this.dirLight1.intensity = this.options.dirLight1IntensityLight !== undefined ? this.options.dirLight1IntensityLight : 0.0;
          this.dirLight2.color.set(this.options.dirLight2ColorLight || '#38bdf8');
          this.dirLight2.intensity = this.options.dirLight2IntensityLight !== undefined ? this.options.dirLight2IntensityLight : 0.0;
          if (this.cameraLight) {
            this.cameraLight.intensity = this.options.cameraLightIntensityLight !== undefined ? this.options.cameraLightIntensityLight : 0.0;
          }
        } else {
          this.ambientLight.color.set(this.options.ambientLightColorDark || '#ffffff');
          this.ambientLight.intensity = this.options.ambientIntensityDark !== undefined ? this.options.ambientIntensityDark : 0.85;
          this.dirLight1.color.set(this.options.dirLight1ColorDark || '#6366f1');
          this.dirLight1.intensity = this.options.dirLight1IntensityDark !== undefined ? this.options.dirLight1IntensityDark : 0.85;
          this.dirLight2.color.set(this.options.dirLight2ColorDark || '#ec4899');
          this.dirLight2.intensity = this.options.dirLight2IntensityDark !== undefined ? this.options.dirLight2IntensityDark : 0.45;
          if (this.cameraLight) {
            this.cameraLight.intensity = this.options.cameraLightIntensityDark !== undefined ? this.options.cameraLightIntensityDark : 0.4;
          }
        }
      }

      // Đồng bộ màu & opacity cơ sở của các đường liên kết theo chế độ Dark / Light
      const hex = isLight ? this.options.lineColorLight : this.options.lineColorDark;
      const opacity = isLight
        ? (this.options.lineOpacityLight !== undefined ? this.options.lineOpacityLight : 0.9)
        : (this.options.lineOpacityDark !== undefined ? this.options.lineOpacityDark : 0.6);
      if (hex && this.linkMeshes) {
        const col = new window.THREE.Color(hex);
        this.linkMeshes.forEach(line => {
          line.userData.baseColor.copy(col);
          line.userData.baseOpacity = opacity;
        });
      }

      // Cập nhật lại màu sắc và hiển thị của các đường nối hiện có
      this._updateAllLineStates();
    }

    // Alias tương thích ngược cho _applyMode
    _applyTheme() {
      this._applyMode();
    }

    // Đổi Theme (tương thích ngược với các lệnh gọi cũ)
    setTheme(themeName) {
      const mode = (themeName === 'sunlight' || themeName === 'light') ? 'light' : (themeName === 'auto' ? 'auto' : 'dark');
      this.setMode(mode);
    }



    // --- HỦY BỎ & DỌN DẸP INSTANCE ---
    destroy() {
      this._clearActiveTubes();
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      this.animRunning = false;
      if (this._rotateInertiaRaf) {
        cancelAnimationFrame(this._rotateInertiaRaf);
        this._rotateInertiaRaf = null;
      }
      if (this._panInertiaRaf) {
        cancelAnimationFrame(this._panInertiaRaf);
        this._panInertiaRaf = null;
      }
      if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }

    }
  }

  // Khởi tạo nhanh phương thức static: StickyGraph3D.init(options)
  StickyGraph3D.init = function (options) {
    return new StickyGraph3D(options);
  };

  // Xóa cache trong localStorage
  StickyGraph3D.clearLocalCache = function (key) {
    const cacheKey = key || (typeof STICKY_GRAPH_CONFIG !== 'undefined' ? STICKY_GRAPH_CONFIG.localCacheKey : 'sticky_graph_nodes_cache');
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(cacheKey);
      }
    } catch (e) {
    }
  };

  // Đăng ký toàn cục
  global.StickyGraph3D = StickyGraph3D;

  // --- TỰ ĐỘNG KHỞI CHẠY (ZERO-CONFIG AUTO INIT) ---
  if (typeof document !== 'undefined') {
    const autoInit = () => {
      const containerSelector = (typeof STICKY_GRAPH_CONFIG !== 'undefined' && STICKY_GRAPH_CONFIG.container)
        ? STICKY_GRAPH_CONFIG.container
        : '#graphContainer';

      const targetEl = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;

      if (targetEl && !targetEl._stickyGraphInstance) {
        targetEl._stickyGraphInstance = StickyGraph3D.init();
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInit);
    } else {
      autoInit();
    }
  }

})(typeof window !== 'undefined' ? window : this);
