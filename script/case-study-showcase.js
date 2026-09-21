/**
 * =============================================================================
 * UXCAMP VIETNAM - UNIFIED 3D PARTICIPANT SPHERE & CURVED CASE STUDY SHOWCASE
 * =============================================================================
 * 1. 100% WebGL Three.js Inertial Curved Cover Engine:
 *    - Thẻ ảnh uốn cong mềm mại theo quán tính và đổi hướng theo chiều cuộn
 *    - Tùy chỉnh kích thước ảnh độc lập trên Desktop & Mobile
 *    - Bóng đổ 3D mềm phía sau, không bao giờ bị cắt/đè vào mặt cong
 * 2. Bảo toàn 100% quy trình 4 giai đoạn:
 *    - Giai đoạn 1: Khối cầu 3D tương tác xoay 360 độ (step <= 1.0)
 *    - Giai đoạn 2: Khối cầu thu nhỏ ngẫu nhiên, highlight thành viên Case 1 (1.0 < step <= 2.0)
 *    - Giai đoạn 3: Avatar thành viên Case 1 bay vòng cung parabol sang sidebar (1.0 < step <= 2.65)
 *    - Giai đoạn 4: Sân khấu Case Study 3D bay từ Trái Dưới lên Phải Trên (step >= 2.8)
 * 3. Bảng điều khiển Live Config Tuner 3D hiện đại (3 Tab, 2 Bend Mode, Telemetry, Nút Copy Config)
 * =============================================================================
 */

(function () {
  'use strict';

  // ===========================================================================
  // 1. CẤU HÌNH MẶC ĐỊNH MỚI (NEW 3D CURVED COVER CONFIG)
  // ===========================================================================
  const DEFAULT_CONFIG = {
    "showLiveTuner": false,
    "cardWidthDesktop": 480,
    "cardHeightDesktop": 300,
    "cardWidthMobile": 240,
    "cardHeightMobile": 160,
    "bendMode": "topFixed",
    "bendIntensity": 0.95,
    "recoverySpeed": 0.005,
    "damping": 0.97,
    "curvePower": 5,
    "bendZFactor": 0.65,
    "bendXYLag": 0.25,
    "topFixedSpread": 2,
    "curtainWave": 0.35,
    "velMultiplier": 1.85,
    "wireframe": false,
    "maxDeform": 1.2,
    "overlayOpacityDark": 0.78,
    "overlayColorDark": "#000000",
    "overlayOpacityLight": 0.64,
    "overlayColorLight": "#f9f6f1",
    "sphereStayDurationDesktop": 3.4,
    "avatarShrinkDurationDesktop": 2,
    "avatarFlightDurationDesktop": 1.3,
    "card0EntryDurationDesktop": 1.8,
    "unpinCaseOffsetDesktop": 0,
    "pixelsPerCardDesktop": 100,
    "frictionDesktop": 0.04,
    "cardSpacingDesktop": 600,
    "flyAngleDegDesktop": 31,
    "shadowXDesktop": -5,
    "shadowYDesktop": -120,
    "shadowDepthDesktop": 30,
    "shadowOpacityDesktop": 0.08,
    "sphereStayDurationMobile": 3.4,
    "avatarShrinkDurationMobile": 2,
    "avatarFlightDurationMobile": 1.3,
    "card0EntryDurationMobile": 1.8,
    "unpinCaseOffsetMobile": 0,
    "pixelsPerCardMobile": 70,
    "frictionMobile": 0.025,
    "cardSpacingMobile": 260,
    "flyAngleDegMobile": 75,
    "shadowXMobile": 30,
    "shadowYMobile": -70,
    "shadowDepthMobile": 150,
    "shadowOpacityMobile": 0.08,
    "rotateXDesktop": 0,
    "rotateYDesktop": 19,
    "rotateZDesktop": 5,
    "rotXMultDesktop": 14,
    "rotYMultDesktop": 10,
    "rotZMultDesktop": -8,
    "cameraFovDesktop": 52,
    "rotateXMobile": 16,
    "rotateYMobile": -1,
    "rotateZMobile": 0,
    "rotXMultMobile": 12,
    "rotYMultMobile": 39,
    "rotZMultMobile": -4,
    "cameraFovMobile": 40
  };

  // Bend Mode: 'allCorners' (0) = Cong cả 4 góc, 'topFixed' (1) = Nẹp cứng cạnh trên, thả trôi thân/đáy/2 bên
  const BEND_MODES = {
    allCorners: 0.0,
    topFixed: 1.0
  };

  // Helper: Tự động chọn giá trị Desktop hoặc Mobile dựa trên kích thước viewport
  function getResponsiveValue(cfg, key) {
    const isMobile = window.innerWidth <= 768;
    const suffixedKey = key + (isMobile ? 'Mobile' : 'Desktop');
    if (cfg[suffixedKey] !== undefined) return cfg[suffixedKey];
    return cfg[key]; // fallback cho key chưa tách
  }

  // Toàn bộ cấu hình luôn được khởi tạo trực tiếp từ mã nguồn DEFAULT_CONFIG (không nạp từ localStorage)
  try {
    localStorage.removeItem('UXCAMP_CASE_STUDY_SCROLL_CONFIG_V8');
    localStorage.removeItem('UXCAMP_CASE_STUDY_SCROLL_CONFIG_V7');
  } catch (e) { }
  const initialConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  // Cờ showLiveTuner luôn tuân thủ cấu hình mã nguồn
  initialConfig.showLiveTuner = DEFAULT_CONFIG.showLiveTuner;
  window.CASE_STUDY_CONFIG = initialConfig;

  // ===========================================================================
  // SHADERS & VẬT LÝ UỐN CONG 3D QUÁN TÍNH (INERTIAL CURVED COVER ENGINE)
  // ===========================================================================
  const CURVED_CARD_VERTEX_SHADER = `
    uniform vec3 uDeform;
    uniform float uBendIntensity;
    uniform float uCurvePower;
    uniform float uBendZFactor;
    uniform float uBendXYLag;
    uniform float uBendMode; // 0.0 = allCorners, 1.0 = topFixed
    uniform float uTopFixedSpread; // Độ lan rộng vùng cong (nhỏ=chỉ mép dưới, lớn=lan sát cạnh trên)
    uniform float uCurtainWave; // Nhấp nhô kiểu rèm kéo căng
    varying vec2 vUv;
    varying float vCurvature;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // ========== MODE 0: ALL CORNERS (Cong cả 4 góc đồng đều từ tâm) ==========
      vec2 centeredUv = (uv - vec2(0.5)) * 2.0;
      float dist = length(centeredUv);
      float lagAllCorners = pow(clamp(dist / 1.414, 0.0, 1.0), uCurvePower);

      // ========== MODE 1: TOP FIXED (Nẹp cứng cạnh trên, thả trôi thân/đáy/2 bên) ==========
      // uv.y = 1.0 là cạnh trên (giữ cứng, lag = 0), uv.y = 0.0 là cạnh dưới (lag max)
      // topFixedSpread: nhỏ = chỉ cong mép dưới, lớn = cong lan rộng lên sát cạnh trên
      float rawY = 1.0 - uv.y;
      float spreadPow = uCurvePower / max(uTopFixedSpread, 0.05);
      float yLag = pow(clamp(rawY, 0.0, 1.0), spreadPow);
      float xFlap = pow(clamp(abs(uv.x - 0.5) * 2.0, 0.0, 1.0), 1.5) * 0.4;
      // Curtain ripple: nhấp nhô không đều trái-phải, giống rèm kéo hơi căng
      float curtainPhase = sin(uv.x * 6.28318 * 2.5) * 0.55
                         + sin(uv.x * 6.28318 * 4.0 + 0.8) * 0.30
                         + sin(uv.x * 6.28318 * 7.0 + 2.1) * 0.15;
      float curtainEffect = curtainPhase * uCurtainWave * rawY * rawY;
      float lagTopFixed = yLag * (1.0 + xFlap) + curtainEffect;

      // Nội suy mượt giữa 2 mode trên GPU
      float lag = mix(lagAllCorners, lagTopFixed, uBendMode);

      // 1. UỐN CONG THEO TRỤC Z
      float zLag = -uDeform.z * lag * uBendIntensity * uBendZFactor * 85.0;
      pos.z += zLag;

      // 2. KÉO DÃN QUÁN TÍNH TRÊN MẶT PHẲNG XY
      pos.x += -uDeform.x * lag * uBendIntensity * uBendXYLag * 35.0;
      pos.y += -uDeform.y * lag * uBendIntensity * uBendXYLag * 35.0;

      vCurvature = lag * length(uDeform) * uBendIntensity;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const CURVED_CARD_FRAGMENT_SHADER = `
    uniform sampler2D uTexture;
    uniform vec3 uOverlayColor;
    uniform float uOverlayAlpha;
    varying vec2 vUv;
    varying float vCurvature;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);

      // Ánh sáng phản quang nhẹ theo độ cong
      float sheen = smoothstep(0.05, 0.5, vCurvature) * 0.25;
      vec3 color = texColor.rgb + vec3(sheen * 0.8, sheen * 1.0, sheen * 1.2);
      // vec3 color = texColor.rgb + vec3(sheen * 1.0, sheen * 1.0, sheen * 1.0);

      // Lớp che phủ theo độ sâu (Depth overlay) cho Dark Mode & Light Mode
      if (uOverlayAlpha > 0.001) {
        color = mix(color, uOverlayColor, uOverlayAlpha);
      }

      gl_FragColor = vec4(color, texColor.a);
    }
  `;

  const SHADOW_VERTEX_SHADER = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const SHADOW_FRAGMENT_SHADER = `
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float d = length(p);
      float a = smoothstep(1.0, 0.25, d) * uOpacity;
      gl_FragColor = vec4(0.0, 0.0, 0.0, a);
    }
  `;

  // Spring physics harmonic oscillator 3D
  class SpringDamper3D {
    constructor(stiffness = 0.08, damping = 0.84) {
      this.x = 0; this.y = 0; this.z = 0;
      this.vx = 0; this.vy = 0; this.vz = 0;
      this.targetX = 0; this.targetY = 0; this.targetZ = 0;
      this.stiffness = stiffness;
      this.damping = damping;
    }
    update() {
      const fx = (this.targetX - this.x) * this.stiffness;
      const fy = (this.targetY - this.y) * this.stiffness;
      const fz = (this.targetZ - this.z) * this.stiffness;

      this.vx = (this.vx + fx) * this.damping;
      this.vy = (this.vy + fy) * this.damping;
      this.vz = (this.vz + fz) * this.damping;

      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      return { x: this.x, y: this.y, z: this.z };
    }
    setTarget(tx, ty, tz) {
      this.targetX = tx;
      this.targetY = ty;
      this.targetZ = tz;
    }
    reset() {
      this.x = 0; this.y = 0; this.z = 0;
      this.vx = 0; this.vy = 0; this.vz = 0;
      this.targetX = 0; this.targetY = 0; this.targetZ = 0;
    }
  }

  // ===========================================================================
  // 2. CLASS ĐIỀU KHIỂN SÂN KHẤU HỢP NHẤT
  // ===========================================================================
  class ScrollCaseStudyShowcase {
    constructor(wrapperEl) {
      this.wrapper = wrapperEl;
      this.viewport = wrapperEl.querySelector('.unified-sticky-viewport') || wrapperEl;
      this.stage3d = this.viewport.querySelector('.case-study-3d-stage');
      if (this.stage3d) this.stage3d.style.display = 'none';
      this.authorsSidebarEl = this.viewport.querySelector('#case-study-authors-sidebar');
      this.authorsListEl = this.viewport.querySelector('#case-study-authors-list');
      this.flyingStageEl = this.viewport.querySelector('#case-study-flying-avatars-stage');

      // 3D Curved Cover WebGL Engine
      this.canvas = document.getElementById('case-study-curved-canvas');
      this.springDamper = new SpringDamper3D(DEFAULT_CONFIG.recoverySpeed, DEFAULT_CONFIG.damping);
      this.curDeform = { x: 0, y: 0, z: 0 };
      this.scrollVelocity = 0;
      this.lastRenderTime = 0;
      this.lastCaseProgress = 0;
      this.webglCards = [];
      this.cardMeshesForRaycast = [];
      this.raycaster = null;
      this.mouse = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.previewTheme = 'auto';

      // Pinned HUD Title 3 Section
      this.flowHudEl = document.getElementById('showcaseFlowHud');
      this.flowNavItems = document.querySelectorAll('.showcase-flow-nav-item');
      this.spiralSection = document.getElementById('spiralGallerySection');
      this.currentActiveNavTarget = '';

      this.data = [];
      this.totalCards = 0;

      // Vật lý & Tiến độ
      this.targetProgress = 0;
      this.currentProgress = 0;
      this.currentStep = 0;
      this.currentCaseProgress = 0;
      this.isLoopRunning = false;
      this.rafId = null;

      // Quản lý trạng thái tác giả
      this.currentAuthorCardIndex = -1;
      this.cachedAvatarStarts = null;
      this.card0StaticRevealed = false;
      this.currentAuthorTimeline = null;
      this.currentDisplayedMemberIds = null;

      // Toast feedback
      this.toastEl = null;
      this.toastTimeout = null;

      this.init();
    }

    // Tự động nhận diện Dark Mode hiện thời (hỗ trợ preview từ Live Tuner & data-theme)
    isDarkMode() {
      if (this.previewTheme === 'dark') return true;
      if (this.previewTheme === 'light') return false;

      if (document.documentElement.getAttribute('data-theme') === 'dark' || (document.body && document.body.getAttribute('data-theme') === 'dark')) return true;
      if (document.documentElement.getAttribute('data-theme') === 'light' || (document.body && document.body.getAttribute('data-theme') === 'light')) return false;
      if (document.documentElement.classList.contains('dark-theme') || document.documentElement.classList.contains('dark')) return true;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    async init() {
      await this.loadData();
      this.initWebGL();
      this.initToast();
      this.initFlowHUD();
      this.updateScrollHeight();
      this.bindEvents();
      this.onScroll();
      this.updateFlowHUD();
    }

    async loadData() {
      try {
        const res = await fetch(`data/case-studies.csv?t=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const csvText = await res.text();
        const parsed = this.parseCSV(csvText);
        if (parsed && parsed.length > 0) {
          this.data = parsed;
        } else {
          console.warn('[CaseStudyShowcase] File data/case-studies.csv không có dữ liệu hợp lệ.');
          this.data = [];
        }
      } catch (err) {
        console.error('[CaseStudyShowcase] Lỗi nạp data/case-studies.csv:', err);
        this.data = [];
      }
      this.totalCards = this.data.length;
    }

    parseCSV(text) {
      const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length <= 1) return [];

      const headers = lines[0].split(',').map(h => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const rawLine = lines[i];
        const values = [];
        let inQuotes = false;
        let currentValue = '';

        for (let c = 0; c < rawLine.length; c++) {
          const char = rawLine[c];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue.trim());
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        values.push(currentValue.trim());

        const row = {};
        headers.forEach((h, idx) => {
          row[h] = values[idx] || '';
        });

        const title = row['ten_case_study'] || `Case Study ${i}`;
        const imageSrc = row['anh_case_study'] || 'asset/image/case-study/fallback.webp';
        const url = row['url_case_study'] || '#';
        const memberIds = (row['id_thanh_vien'] || '').split(';').map(s => s.trim()).filter(Boolean);
        const memberNames = memberIds;

        result.push({ title, imageSrc, url, memberIds, memberNames });
      }

      return result;
    }

    // =========================================================================
    // KHỞI TẠO WEBGL THREE.JS VỚI KÍCH THƯỚC ĐỘC LẬP DESKTOP & MOBILE
    // =========================================================================
    initWebGL() {
      if (!this.canvas || typeof THREE === 'undefined') return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cfg = window.CASE_STUDY_CONFIG;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(getResponsiveValue(cfg, 'cameraFov') || 45, w / h, 10, 6000);
      this.camera.position.set(0, 0, 1000);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(0x000000, 0);

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      const textureLoader = new THREE.TextureLoader();
      const isMobile = w <= 768;
      const baseW = isMobile ? cfg.cardWidthMobile : cfg.cardWidthDesktop;
      const baseH = isMobile ? cfg.cardHeightMobile : cfg.cardHeightDesktop;

      this.webglCards = [];
      this.cardMeshesForRaycast = [];

      this.data.forEach((item, index) => {
        const geom = new THREE.PlaneGeometry(baseW, baseH, 36, 36);

        const texture = textureLoader.load(item.imageSrc, (tex) => {
          if (tex && tex.image && tex.image.naturalWidth > 0) {
            const aspect = tex.image.naturalWidth / tex.image.naturalHeight;
            let cardW, cardH;
            if (aspect > baseW / baseH) {
              cardW = baseW;
              cardH = baseW / aspect;
            } else {
              cardH = baseH;
              cardW = baseH * aspect;
            }
            mesh.geometry.dispose();
            mesh.geometry = new THREE.PlaneGeometry(cardW, cardH, 36, 36);

            shadowMesh.geometry.dispose();
            shadowMesh.geometry = new THREE.PlaneGeometry(cardW * 1.08, cardH * 1.08);
          }
        });
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uDeform: { value: new THREE.Vector3(0, 0, 0) },
            uBendIntensity: { value: cfg.bendIntensity },
            uCurvePower: { value: cfg.curvePower },
            uBendZFactor: { value: cfg.bendZFactor },
            uBendXYLag: { value: cfg.bendXYLag },
            uBendMode: { value: BEND_MODES[cfg.bendMode] || 0.0 },
            uTopFixedSpread: { value: cfg.topFixedSpread || 0.6 },
            uCurtainWave: { value: cfg.curtainWave || 0.0 },
            uOverlayColor: { value: new THREE.Color(cfg.overlayColorDark || '#0d121a') },
            uOverlayAlpha: { value: 0.0 }
          },
          vertexShader: CURVED_CARD_VERTEX_SHADER,
          fragmentShader: CURVED_CARD_FRAGMENT_SHADER,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: true,
          wireframe: !!cfg.wireframe
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.renderOrder = 2;
        mesh.visible = false;
        mesh.userData = { index: index, data: item };

        const shadowGeom = new THREE.PlaneGeometry(baseW * 1.08, baseH * 1.08);
        const shadowMat = new THREE.ShaderMaterial({
          uniforms: {
            uOpacity: { value: getResponsiveValue(cfg, 'shadowOpacity') }
          },
          vertexShader: SHADOW_VERTEX_SHADER,
          fragmentShader: SHADOW_FRAGMENT_SHADER,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide
        });
        const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
        shadowMesh.renderOrder = 1;
        shadowMesh.visible = false;

        this.scene.add(shadowMesh);
        this.scene.add(mesh);

        this.webglCards.push({
          index: index,
          mesh: mesh,
          shadowMesh: shadowMesh,
          material: mat,
          shadowMaterial: shadowMat,
          data: item
        });
        this.cardMeshesForRaycast.push(mesh);
      });

      // Tương tác Click mở case study trên Canvas
      let isPointerDownOnCard = false;
      let downPos = { x: 0, y: 0 };

      this.canvas.addEventListener('pointerdown', (e) => {
        downPos.x = e.clientX;
        downPos.y = e.clientY;
        isPointerDownOnCard = true;
      });

      this.canvas.addEventListener('pointermove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const { SPHERE_PHASE } = this.getPhaseThresholds();
        if (this.currentStep > SPHERE_PHASE) {
          this.raycaster.setFromCamera(this.mouse, this.camera);
          const visibleMeshes = this.cardMeshesForRaycast.filter(m => m.visible);
          const intersects = this.raycaster.intersectObjects(visibleMeshes);
          this.canvas.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
        } else {
          this.canvas.style.cursor = 'default';
        }
      });

      this.canvas.addEventListener('pointerup', (e) => {
        if (!isPointerDownOnCard) return;
        isPointerDownOnCard = false;
        const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
        if (dist > 8) return;

        const { SPHERE_PHASE } = this.getPhaseThresholds();
        if (this.currentStep <= SPHERE_PHASE) return;

        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const visibleMeshes = this.cardMeshesForRaycast.filter(m => m.visible);
        const intersects = this.raycaster.intersectObjects(visibleMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const item = hit.userData.data;
          if (item) {
            if (item.url && item.url.startsWith('#')) {
              this.showToast(`Dự án "${item.title}" sẽ sớm được ra mắt!`);
            } else if (item.url) {
              window.open(item.url, '_blank', 'noopener,noreferrer');
            }
          }
        }
      });
    }

    // Cập nhật lại hình học khi người dùng thay đổi kích thước ảnh trên panel tuner
    updateCardDimensions() {
      if (!this.webglCards || !this.webglCards.length) return;
      const cfg = window.CASE_STUDY_CONFIG;
      const isMobile = window.innerWidth <= 768;
      const targetW = isMobile ? cfg.cardWidthMobile : cfg.cardWidthDesktop;
      const targetH = isMobile ? cfg.cardHeightMobile : cfg.cardHeightDesktop;

      this.webglCards.forEach(card => {
        let cardW = targetW;
        let cardH = targetH;
        const tex = card.material.uniforms.uTexture.value;
        if (tex && tex.image && tex.image.naturalWidth > 0) {
          const aspect = tex.image.naturalWidth / tex.image.naturalHeight;
          if (aspect > targetW / targetH) {
            cardW = targetW;
            cardH = targetW / aspect;
          } else {
            cardH = targetH;
            cardW = targetH * aspect;
          }
        }
        card.mesh.geometry.dispose();
        card.mesh.geometry = new THREE.PlaneGeometry(cardW, cardH, 36, 36);

        card.shadowMesh.geometry.dispose();
        card.shadowMesh.geometry = new THREE.PlaneGeometry(cardW * 1.08, cardH * 1.08);
      });
    }

    initToast() {
      let toast = document.querySelector('.case-study-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'case-study-toast';
        document.body.appendChild(toast);
      }
      this.toastEl = toast;
    }

    showToast(message) {
      if (!this.toastEl) return;
      this.toastEl.textContent = message;
      this.toastEl.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toastEl.classList.remove('show');
      }, 2600);
    }

    computeUBottom() {
      const cfg = window.CASE_STUDY_CONFIG || DEFAULT_CONFIG;
      const isMobile = window.innerWidth <= 768;
      const fov = getResponsiveValue(cfg, 'cameraFov') || 55;
      const cameraZ = 1000;
      const cardH = isMobile ? (cfg.cardHeightMobile || 220) : (cfg.cardHeightDesktop || 270);
      const spacing = isMobile ? (cfg.cardSpacingMobile || 380) : (cfg.cardSpacingDesktop || 440);
      const flyAngleDeg = getResponsiveValue(cfg, 'flyAngleDeg') || 36;

      const tanFov2 = Math.tan(((fov * Math.PI) / 180) / 2);
      const travelDistY = spacing * Math.sin(((flyAngleDeg * Math.PI) / 180));
      const travelDistZ = spacing * 0.30;

      // Tìm u tương đối mà tại đó mép dưới của card vừa qua khỏi đáy viewport (lọt hoàn toàn vào màn hình)
      let low = 0.5, high = 4.0;
      for (let iter = 0; iter < 24; iter++) {
        const mid = (low + high) / 2;
        const warped = mid;
        const ty = -warped * travelDistY;
        const tz = -warped * travelDistZ;
        const screenBottom = -(cameraZ - tz) * tanFov2;
        const cardBottom = ty - (cardH / 2);
        if (cardBottom < screenBottom) {
          high = mid; // card còn ở dưới đáy màn hình
        } else {
          low = mid;  // card đã vào trong màn hình
        }
      }
      return (low + high) / 2;
    }

    getPhaseThresholds() {
      const cfg = window.CASE_STUDY_CONFIG || DEFAULT_CONFIG;
      const sphereStay = getResponsiveValue(cfg, 'sphereStayDuration');
      const SPHERE_PHASE = Math.max(0.01, (typeof sphereStay === 'number') ? sphereStay : 1.0);
      const shrinkVal = getResponsiveValue(cfg, 'avatarShrinkDuration');
      const shrinkDur = Math.max(0.1, (typeof shrinkVal === 'number') ? shrinkVal : 1.0);
      const flightVal = getResponsiveValue(cfg, 'avatarFlightDuration');
      const flightDur = Math.max(0.1, (typeof flightVal === 'number') ? flightVal : 1.65);
      const card0Val = getResponsiveValue(cfg, 'card0EntryDuration');
      const card0Dur = Math.max(0.1, (typeof card0Val === 'number') ? card0Val : 1.80);

      const SHRINK_PHASE = SPHERE_PHASE + shrinkDur;
      const AVATARS_FLIGHT_PHASE = SPHERE_PHASE + flightDur;
      const CARD_CENTER_PHASE = SPHERE_PHASE + card0Dur;

      return { SPHERE_PHASE, SHRINK_PHASE, AVATARS_FLIGHT_PHASE, CARD_CENTER_PHASE };
    }

    getUnpinTargetStep() {
      const cfg = window.CASE_STUDY_CONFIG || DEFAULT_CONFIG;
      const { CARD_CENTER_PHASE } = this.getPhaseThresholds();
      if (this.totalCards <= 0) {
        return { endStep: CARD_CENTER_PHASE, endCaseProgress: 0, uBottom: 1.85 };
      }

      const uBottom = this.computeUBottom();
      const unpinOffset = getResponsiveValue(cfg, 'unpinCaseOffset');
      const offset = (typeof unpinOffset === 'number') ? unpinOffset : 0;
      const lastIndex = Math.max(0, this.totalCards - 1);

      // Target card index: offset = 0 => case cuối cùng (lastIndex), offset = 1 => case gần cuối (lastIndex - 1)...
      const targetCardIndex = lastIndex - offset;

      // caseProgress khi targetCardIndex vừa qua khỏi bottom của viewport
      const endCaseProgress = Math.max(0, targetCardIndex - uBottom);
      const endStep = CARD_CENTER_PHASE + endCaseProgress;
      return { endStep, endCaseProgress, uBottom };
    }

    updateScrollHeight() {
      const cfg = window.CASE_STUDY_CONFIG || DEFAULT_CONFIG;
      const { endStep } = this.getUnpinTargetStep();
      const trackHeight = Math.max(window.innerHeight, window.innerHeight + Math.round(endStep * getResponsiveValue(cfg, 'pixelsPerCard')));
      this.wrapper.style.height = `${trackHeight}px`;

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    bindEvents() {
      // Lắng nghe thay đổi theme Dark/Light Mode tự động re-render card
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          this.renderCards(this.currentCaseProgress);
        });
      }
      try {
        const themeObserver = new MutationObserver(() => {
          this.renderCards(this.currentCaseProgress);
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
        if (document.body) {
          themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class'] });
        }
      } catch (e) { }

      window.addEventListener('load', () => {
        this.updateScrollHeight();
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      });

      this.isSectionVisible = true;
      if ('IntersectionObserver' in window) {
        this.sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isSectionVisible = entry.isIntersecting;
            if (!this.isSectionVisible) {
              if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
              }
              this.isLoopRunning = false;
            } else {
              this.onScroll();
            }
          });
        }, { rootMargin: '120px 0px 120px 0px' });
        this.sectionObserver.observe(this.wrapper);
      }

      window.addEventListener('scroll', () => {
        this.onScroll();
        this.updateFlowHUD();
      }, { passive: true });

      window.addEventListener('resize', () => {
        if (this.renderer && this.camera) {
          const rw = window.innerWidth;
          const rh = window.innerHeight;
          this.camera.aspect = rw / rh;
          this.camera.fov = getResponsiveValue(window.CASE_STUDY_CONFIG, 'cameraFov') || 45;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(rw, rh);
        }
        this.cachedAvatarStarts = null;
        this.cachedSidebarTargets = null;
        this.updateCardDimensions();
        this.updateScrollHeight();
      });
    }

    onScroll() {
      const rect = this.wrapper.getBoundingClientRect();
      const scrolledPx = -rect.top;
      const cfg = window.CASE_STUDY_CONFIG || DEFAULT_CONFIG;
      const { CARD_CENTER_PHASE } = this.getPhaseThresholds();
      const { endStep } = this.getUnpinTargetStep();
      const maxScrollPx = Math.max(0, this.wrapper.offsetHeight - window.innerHeight);

      const isSectionInViewport = (rect.top < window.innerHeight + 150 && rect.bottom > -150);

      // Kích hoạt quả cầu avatar hiển thị và chạy ngay lập tức khi section vừa chạm vào viewport từ phía trên
      if (isSectionInViewport && window._participantSphere) {
        if (typeof window._participantSphere.updateVisibilityState === 'function') {
          window._participantSphere.updateVisibilityState();
        } else {
          window._participantSphere.isVisible = true;
          if (!window._participantSphere.isRunning) {
            window._participantSphere.startLoop();
          }
        }
      }

      if (scrolledPx < 0) {
        this.targetProgress = 0;
        // Đảm bảo khối cầu 3D luôn ở Phase 1 đầy đủ ngay khi section vừa cuộn vào viewport
        if (isSectionInViewport && window._participantSphere) {
          if (typeof window._participantSphere.setShrinkProgress === 'function') {
            window._participantSphere.setShrinkProgress(0, []);
          }
        }
      } else {
        // Cho phép case study tiếp tục bay mượt mà theo khoảng cách cuộn thực tế khi nhả sticky cuộn xuống dưới
        const maxTotalStep = CARD_CENTER_PHASE + this.totalCards + 4;
        this.targetProgress = Math.min(maxTotalStep, scrolledPx / getResponsiveValue(cfg, 'pixelsPerCard'));
      }

      if (!this.isLoopRunning) {
        this.isLoopRunning = true;
        this.startRenderLoop();
      }
    }

    startRenderLoop() {
      const loop = () => {
        const cfg = window.CASE_STUDY_CONFIG;
        const diff = this.targetProgress - this.currentProgress;

        if (Math.abs(diff) > 0.0001) {
          this.currentProgress += diff * getResponsiveValue(cfg, 'friction');
        } else {
          this.currentProgress = this.targetProgress;
        }

        const step = this.currentProgress;
        this.currentStep = step;

        const { SPHERE_PHASE, SHRINK_PHASE, AVATARS_FLIGHT_PHASE, CARD_CENTER_PHASE } = this.getPhaseThresholds();

        if (step <= SPHERE_PHASE) {
          // GIAI ĐOẠN 1: QUẢ CẦU 3D ĐẦY ĐỦ
          const case1MemberIds = (this.data[0] && this.data[0].memberIds) ? this.data[0].memberIds : [];
          if (window._participantSphere) {
            if (typeof window._participantSphere.setShrinkProgress === 'function') {
              window._participantSphere.setShrinkProgress(0, []);
            }
            if (typeof window._participantSphere.hideMembers === 'function') {
              window._participantSphere.hideMembers(case1MemberIds, false);
            }
          }
          if (this.authorsSidebarEl) {
            this.authorsSidebarEl.classList.remove('visible');
            this.authorsSidebarEl.style.opacity = '0';
          }
          if (this.flyingStageEl) {
            this.flyingStageEl.style.display = 'none';
            this.flyingStageEl.innerHTML = '';
          }
          if (this.authorsListEl) {
            Array.from(this.authorsListEl.children).forEach(child => {
              child.style.opacity = '0';
              child.style.transform = 'scale(0.0)';
            });
          }
          this.cachedAvatarStarts = null;
          this.cachedSidebarTargets = null;
          this.currentAuthorCardIndex = -1;
          this.card0StaticRevealed = false;

          const uEntry = 3.5;
          this.currentCaseProgress = -uEntry;
          this.renderCards(-uEntry);

        } else if (step > SPHERE_PHASE && step <= CARD_CENTER_PHASE) {
          // GIAI ĐOẠN 2 & 3: QUẢ CẦU THU NHỎ & AVATAR BAY SANG SIDEBAR & CARD 0 TIẾN VÀO
          this.card0StaticRevealed = false;
          const case1MemberIds = (this.data[0] && this.data[0].memberIds) ? this.data[0].memberIds : [];

          if (!this.cachedAvatarStarts && window._participantSphere && typeof window._participantSphere.getMemberPositions === 'function') {
            const spherePositions = window._participantSphere.getMemberPositions(case1MemberIds);
            if (spherePositions && spherePositions.length > 0) {
              const vpRect = this.viewport ? this.viewport.getBoundingClientRect() : { left: 0, top: 0 };
              this.cachedAvatarStarts = case1MemberIds.map((id) => {
                const sp = spherePositions.find(p => p.id === id);
                return {
                  id: id,
                  imageSrc: (sp && sp.imageSrc) ? sp.imageSrc : `asset/image/participant/${id}.webp`,
                  x0: sp ? (sp.screenX - vpRect.left) : (window.innerWidth * 0.5),
                  y0: sp ? (sp.screenY - vpRect.top) : (window.innerHeight * 0.5),
                  size0: sp ? sp.size : (window.innerWidth <= 768 ? 44 : 68)
                };
              });
            }
          }

          const shrinkRatio = Math.min(1.0, (step - SPHERE_PHASE) / (SHRINK_PHASE - SPHERE_PHASE));
          if (window._participantSphere) {
            if (typeof window._participantSphere.setShrinkProgress === 'function') {
              window._participantSphere.setShrinkProgress(shrinkRatio, case1MemberIds);
            }
            if (typeof window._participantSphere.hideMembers === 'function') {
              window._participantSphere.hideMembers(case1MemberIds, true);
            }
          }

          if (this.authorsSidebarEl) {
            this.authorsSidebarEl.classList.add('visible');
            this.authorsSidebarEl.style.opacity = '1';
          }
          if (this.currentAuthorCardIndex !== 0) {
            this.updateAuthorsSidebar(0, true);
          }

          const flyProgress = Math.min(1.0, (step - SPHERE_PHASE) / (AVATARS_FLIGHT_PHASE - SPHERE_PHASE));
          this.renderFlyingAvatars(flyProgress, case1MemberIds);

          const uEntry = 3.5;
          const enterRatio = Math.min(1.0, Math.max(0.0, (step - SPHERE_PHASE) / (CARD_CENTER_PHASE - SPHERE_PHASE)));
          const caseProgress = -uEntry * (1.0 - enterRatio);
          this.currentCaseProgress = caseProgress;
          this.renderCards(caseProgress);

        } else {
          // GIAI ĐOẠN 4: SÂN KHẤU CASE STUDY BAY LIÊN TIẾP
          if (this.flyingStageEl) {
            this.flyingStageEl.style.display = 'none';
          }

          if (!this.card0StaticRevealed) {
            this.card0StaticRevealed = true;
            if (this.authorsListEl) {
              Array.from(this.authorsListEl.children).forEach(child => {
                child.style.opacity = '1';
                child.style.transform = 'scale(1)';
              });
            }
          }

          if (this.authorsSidebarEl) {
            this.authorsSidebarEl.classList.add('visible');
            this.authorsSidebarEl.style.opacity = '1';
          }

          const case1MemberIds = (this.data[0] && this.data[0].memberIds) ? this.data[0].memberIds : [];
          if (window._participantSphere) {
            if (typeof window._participantSphere.setShrinkProgress === 'function') {
              window._participantSphere.setShrinkProgress(1.0, case1MemberIds);
            }
            if (typeof window._participantSphere.hideMembers === 'function') {
              window._participantSphere.hideMembers(case1MemberIds, true);
            }
          }

          const rawCaseProgress = step - CARD_CENTER_PHASE;
          const caseProgress = Math.max(0, rawCaseProgress);
          this.currentCaseProgress = caseProgress;
          this.renderCards(caseProgress);

          const lastCardIndex = this.totalCards - 1;
          let targetAuthorIndex = -1;

          if (caseProgress > lastCardIndex + 0.18) {
            targetAuthorIndex = -1;
          } else {
            const targetIdx = Math.floor(caseProgress + 0.5);
            targetAuthorIndex = Math.max(0, Math.min(lastCardIndex, targetIdx));
          }

          if (targetAuthorIndex !== this.currentAuthorCardIndex) {
            const estDuration = 0.35;
            this.updateAuthorsSidebar(targetAuthorIndex, false, estDuration);
          }
        }

        if (this.isSectionVisible || Math.abs(diff) > 0.0001) {
          this.rafId = requestAnimationFrame(loop);
        } else {
          this.isLoopRunning = false;
          this.rafId = null;
        }
      };

      this.rafId = requestAnimationFrame(loop);
    }

    renderFlyingAvatars(flyProgress, memberIds) {
      if (!this.flyingStageEl) return;
      if (flyProgress <= 0.001) {
        this.flyingStageEl.style.display = 'none';
        this.flyingStageEl.innerHTML = '';
        if (this.authorsListEl) {
          Array.from(this.authorsListEl.children).forEach(slot => {
            slot.style.opacity = '0';
            slot.style.transform = 'scale(0.0)';
          });
        }
        return;
      }
      this.flyingStageEl.style.display = 'block';

      if (!this.cachedAvatarStarts || this.cachedAvatarStarts.length === 0) {
        return;
      }

      const count = memberIds.length;
      if (this.flyingStageEl.children.length !== count) {
        this.flyingStageEl.innerHTML = '';
        for (let i = 0; i < count; i++) {
          const item = document.createElement('div');
          item.className = 'case-study-flying-avatar';
          const img = document.createElement('img');
          img.src = (this.cachedAvatarStarts[i] && this.cachedAvatarStarts[i].imageSrc)
            ? this.cachedAvatarStarts[i].imageSrc
            : `asset/image/participant/${memberIds[i]}.webp`;
          item.appendChild(img);
          this.flyingStageEl.appendChild(item);
        }
      }

      const isMobile = window.innerWidth <= 768;
      const avatarSize = isMobile ? (window.innerWidth <= 576 ? 44 : 52) : 64;
      const vpRect = this.viewport ? this.viewport.getBoundingClientRect() : { left: 0, top: 0 };
      const sidebarRect = this.authorsSidebarEl ? this.authorsSidebarEl.getBoundingClientRect() : null;

      const avatarStagger = 0.1;
      const arcHeight = 45;

      for (let i = 0; i < count; i++) {
        const el = this.flyingStageEl.children[i];
        if (!el) continue;

        const startInfo = this.cachedAvatarStarts[i] || {
          x0: window.innerWidth * 0.5,
          y0: window.innerHeight * 0.5,
          size0: avatarSize
        };

        const targetSlot = (this.authorsListEl && this.authorsListEl.children[i]) ? this.authorsListEl.children[i] : null;

        // Tính tọa độ đích đến x1, y1 chuẩn xác tuyệt đối theo sidebar
        let x1 = 0;
        let y1 = 0;
        let size1 = avatarSize;

        if (sidebarRect && targetSlot) {
          // Tâm X của slot tác giả (sidebarRect.left + sidebarRect.width / 2)
          x1 = sidebarRect.left + sidebarRect.width / 2 - vpRect.left;
          // targetSlot.offsetTop và offsetHeight độc lập với scale biến dạng
          y1 = sidebarRect.top + targetSlot.offsetTop + (targetSlot.offsetHeight || avatarSize) / 2 - vpRect.top;
          size1 = targetSlot.offsetWidth || avatarSize;
        } else {
          // Fallback chuẩn theo CSS nếu DOM slot chưa gắn xong
          const gap = isMobile ? (window.innerWidth <= 576 ? 12 : 16) : 16;
          const sidebarLeft = isMobile ? (window.innerWidth <= 576 ? 14 : 20) : (window.innerWidth <= 992 ? 20 : Math.round(window.innerWidth * 0.05));
          x1 = sidebarLeft + avatarSize / 2;
          const totalColHeight = count * avatarSize + (count - 1) * gap;
          const startColY = (window.innerHeight - totalColHeight) / 2;
          y1 = startColY + i * (avatarSize + gap) + avatarSize / 2;
        }

        const startDelay = i * avatarStagger;
        const activeDuration = Math.max(0.001, 1.0 - (count - 1) * avatarStagger);
        const pRaw = (flyProgress - startDelay) / activeDuration;
        const p = Math.min(1.0, Math.max(0.0, pRaw));

        const easeP = p * p * (3 - 2 * p);

        const curX = startInfo.x0 + (x1 - startInfo.x0) * easeP;
        const linearY = startInfo.y0 + (y1 - startInfo.y0) * easeP;
        const arcOffset = -Math.sin(p * Math.PI) * arcHeight;
        const curY = linearY + arcOffset;

        const curSize = startInfo.size0 + (size1 - startInfo.size0) * easeP;

        el.style.width = `${curSize.toFixed(1)}px`;
        el.style.height = `${curSize.toFixed(1)}px`;
        el.style.transform = `translate3d(${(curX - curSize / 2).toFixed(1)}px, ${(curY - curSize / 2).toFixed(1)}px, 0)`;

        // BÀN GIAO MƯỢT MÀ, TRIỆT TIÊU 100% HIỆN TƯỢNG TRÙNG LẶP AVATAR:
        if (p >= 0.99) {
          // Đã tiếp đất hoàn tất: Ẩn phần tử bay, hiện slot chính thức của sidebar
          el.style.opacity = '0';
          if (targetSlot) {
            targetSlot.style.opacity = '1';
            targetSlot.style.transform = 'scale(1)';
          }
        } else if (p > 0) {
          // Đang trong quỹ đạo bay: Hiện phần tử bay, ẩn slot của sidebar
          el.style.opacity = '1';
          if (targetSlot) {
            targetSlot.style.opacity = '0';
            targetSlot.style.transform = 'scale(0.0)';
          }
        } else {
          // Chưa tới lượt bay
          el.style.opacity = '0';
          if (targetSlot) {
            targetSlot.style.opacity = '0';
            targetSlot.style.transform = 'scale(0.0)';
          }
        }
      }
    }

    // =========================================================================
    // RENDER SÂN KHẤU 3D UỐN CONG QUÁN TÍNH WEBGL (TRÁI DƯỚI LÊN PHẢI TRÊN)
    // =========================================================================
    renderCards(caseProgress) {
      const cfg = window.CASE_STUDY_CONFIG;

      // 1. Tính toán vận tốc cuộn thực tế
      const now = performance.now() * 0.001;
      const dt = this.lastRenderTime > 0 ? Math.max(0.001, Math.min(0.05, now - this.lastRenderTime)) : 0.016;
      this.lastRenderTime = now;

      const dProgress = caseProgress - this.lastCaseProgress;
      this.lastCaseProgress = caseProgress;
      this.scrollVelocity = dt > 0 ? (dProgress / dt) : 0;

      if (!this.renderer || !this.scene || !this.webglCards || !this.webglCards.length) {
        return;
      }

      // 2. Giai đoạn 1: Khối cầu 3D tương tác (ẩn hẳn stage3d và tắt pointer-events để không che khuất quả cầu avatar)
      const { SPHERE_PHASE } = this.getPhaseThresholds();
      if (this.currentStep <= SPHERE_PHASE) {
        if (this.stage3d && this.stage3d.style.display !== 'none') {
          this.stage3d.style.display = 'none';
        }
        if (this.canvas) this.canvas.style.pointerEvents = 'none';
        for (let i = 0; i < this.webglCards.length; i++) {
          this.webglCards[i].mesh.visible = false;
          this.webglCards[i].shadowMesh.visible = false;
        }
        this.renderer.clear();
        return;
      }

      if (this.stage3d && this.stage3d.style.display !== 'flex') {
        this.stage3d.style.display = 'flex';
      }
      if (this.canvas) this.canvas.style.pointerEvents = 'auto';

      // 3. Thiết lập quỹ đạo: Trái Dưới (-X, -Y) lên Phải Trên (+X, +Y)
      const isMobile = window.innerWidth <= 768;
      const spacing = isMobile ? cfg.cardSpacingMobile : cfg.cardSpacingDesktop;

      const radAngle = ((getResponsiveValue(cfg, 'flyAngleDeg') || 33) * Math.PI) / 180;
      const dirX = Math.cos(radAngle);
      const dirY = Math.sin(radAngle);
      const dirZ = 0.30;

      const travelDistX = spacing * dirX;
      const travelDistY = spacing * dirY;
      const travelDistZ = spacing * dirZ;

      // 4. Cập nhật lò xo quán tính SpringDamper3D (CÓ DẤU THEO CHIỀU CUỘN - ĐỒNG NHẤT CẢ 4 GÓC)
      const vScale = 0.50 * (cfg.velMultiplier || 1.0);
      const rawDeformX = this.scrollVelocity * dirX * vScale;
      const rawDeformY = this.scrollVelocity * dirY * vScale;
      const rawDeformZ = this.scrollVelocity * dirZ * vScale;

      // Giới hạn độ cong tối đa khi cuộn rất nhanh (maxDeform)
      const maxDeform = (typeof cfg.maxDeform === 'number' && cfg.maxDeform > 0) ? cfg.maxDeform : Infinity;
      const rawLen = Math.sqrt(rawDeformX * rawDeformX + rawDeformY * rawDeformY + rawDeformZ * rawDeformZ);
      const clampScale = rawLen > maxDeform ? maxDeform / rawLen : 1.0;
      const targetDeformX = rawDeformX * clampScale;
      const targetDeformY = rawDeformY * clampScale;
      const targetDeformZ = rawDeformZ * clampScale;

      this.springDamper.stiffness = cfg.recoverySpeed || 0.08;
      this.springDamper.damping = cfg.damping || 0.84;
      this.springDamper.setTarget(targetDeformX, targetDeformY, targetDeformZ);
      this.curDeform = this.springDamper.update();

      // 5. Cập nhật vị trí, góc xoay và shader cho từng card
      for (let i = 0; i < this.totalCards; i++) {
        const card = this.webglCards[i];
        if (!card) continue;

        const u = i - caseProgress;
        const absU = Math.abs(u);

        // Frustum culling
        if (absU > 3.8) {
          card.mesh.visible = false;
          card.shadowMesh.visible = false;
          continue;
        }

        card.mesh.visible = true;
        card.shadowMesh.visible = true;

        const warpedDist = u;
        // Tọa độ 3D: Dưới Trái (-X, -Y) ➔ Trên Phải (+X, +Y)
        const tx = -warpedDist * travelDistX;
        const ty = -warpedDist * travelDistY;
        const tz = -warpedDist * travelDistZ;

        card.mesh.position.set(tx, ty, tz);

        // Góc xoay 3D động
        const curRotX = THREE.MathUtils.degToRad(getResponsiveValue(cfg, 'rotateX') + warpedDist * getResponsiveValue(cfg, 'rotXMult'));
        const curRotY = THREE.MathUtils.degToRad(getResponsiveValue(cfg, 'rotateY') - warpedDist * getResponsiveValue(cfg, 'rotYMult'));
        const curRotZ = THREE.MathUtils.degToRad(getResponsiveValue(cfg, 'rotateZ') + warpedDist * getResponsiveValue(cfg, 'rotZMult'));
        card.mesh.rotation.set(curRotX, curRotY, curRotZ);

        // Bóng đổ lùi sâu phía sau theo trục Z
        const shadowZ = tz - (getResponsiveValue(cfg, 'shadowDepth') || 120);
        card.shadowMesh.position.set(tx + getResponsiveValue(cfg, 'shadowX'), ty + getResponsiveValue(cfg, 'shadowY'), shadowZ);
        // card.shadowMesh.rotation.set(curRotX, curRotY, curRotZ);
        card.shadowMaterial.uniforms.uOpacity.value = (getResponsiveValue(cfg, 'shadowOpacity') || 0.35) * Math.max(0.1, 1.0 - absU * 0.25);

        // Depth overlay theo Dark Mode & Light Mode
        const isDark = this.isDarkMode();
        const maxOverlayOpacity = isDark
          ? (typeof cfg.overlayOpacityDark === 'number' ? cfg.overlayOpacityDark : 0.85)
          : (typeof cfg.overlayOpacityLight === 'number' ? cfg.overlayOpacityLight : 0.85);

        let overlayAlpha = 0;
        if (absU > 0.8 && maxOverlayOpacity > 0.0001) {
          overlayAlpha = Math.min(maxOverlayOpacity, (absU - 0.8) * (maxOverlayOpacity * 0.53));
        }

        const overlayColorHex = isDark
          ? (cfg.overlayColorDark || '#0d121a')
          : (cfg.overlayColorLight || '#f9f6f1');

        // Cập nhật Uniforms cho shader uốn cong
        card.material.uniforms.uDeform.value.set(this.curDeform.x, this.curDeform.y, this.curDeform.z);
        card.material.uniforms.uBendIntensity.value = cfg.bendIntensity;
        card.material.uniforms.uCurvePower.value = cfg.curvePower;
        card.material.uniforms.uBendZFactor.value = cfg.bendZFactor;
        card.material.uniforms.uBendXYLag.value = cfg.bendXYLag;
        card.material.uniforms.uBendMode.value = BEND_MODES[cfg.bendMode] || 0.0;
        card.material.uniforms.uTopFixedSpread.value = cfg.topFixedSpread || 0.6;
        card.material.uniforms.uCurtainWave.value = cfg.curtainWave || 0.0;
        if (card.material.uniforms.uOverlayColor) {
          card.material.uniforms.uOverlayColor.value.set(overlayColorHex);
        }
        card.material.uniforms.uOverlayAlpha.value = overlayAlpha;
        card.material.wireframe = !!cfg.wireframe;
      }

      this.renderer.render(this.scene, this.camera);
    }

    // =========================================================================
    // FLOW HUD TIÊU ĐỀ 3 SECTION & ĐIỀU HƯỚNG CUỘN (SMOOTH FLOW NAVIGATION)
    // =========================================================================
    initFlowHUD() {
      this.flowHudEl = document.getElementById('showcaseFlowHud');
      this.flowNavItems = document.querySelectorAll('.showcase-flow-nav-item');
      this.spiralSection = document.getElementById('spiralGallerySection');
      this.flowHudRevealed = false;
      this.hudSplitTimeline = null;

      if (this.flowNavItems && this.flowNavItems.length > 0) {
        this.flowNavItems.forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = item.getAttribute('data-flow-target') || item.dataset.flowTarget;
            this.scrollToFlowTarget(target);
          });
        });
      }
    }

    scrollToFlowTarget(target) {
      if (!this.wrapper) return;
      const cfg = window.CASE_STUDY_CONFIG || DEFAULT_CONFIG;
      const wrapperRect = this.wrapper.getBoundingClientRect();
      const wrapperTop = wrapperRect.top + window.pageYOffset;

      if (target === 'from') {
        // Section 1: Đến từ (Logo các công ty người tham dự)
        const companiesSection = document.getElementById('participant-companies');
        if (companiesSection) {
          const companiesTop = companiesSection.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: Math.max(0, companiesTop),
            behavior: 'smooth'
          });
        }
      } else if (target === 'who') {
        // Section 2: Người tham dự (Khối cầu 3D) -> cuộn về đầu Unified Showcase
        window.scrollTo({
          top: Math.max(0, wrapperTop),
          behavior: 'smooth'
        });
      } else if (target === 'what') {
        // Section 3: Case study (Họ học được gì) -> cuộn đến điểm thẻ Case Study 0 xuất hiện
        const { CARD_CENTER_PHASE } = this.getPhaseThresholds();
        const targetScrollPx = (CARD_CENTER_PHASE * getResponsiveValue(cfg, 'pixelsPerCard')) + 20;
        const targetTop = wrapperTop + targetScrollPx;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      } else if (target === 'feedback') {
        // Section 4: Phong bì thư feedback
        const spiral = document.getElementById('spiralGallerySection') || this.spiralSection;
        if (spiral) {
          const pinSpacer = (spiral.parentElement && spiral.parentElement.classList.contains('pin-spacer')) ? spiral.parentElement : null;
          const targetEl = pinSpacer || spiral;
          const feedbackTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: feedbackTop,
            behavior: 'smooth'
          });
        }
      }
    }

    playHudSplitAnimation() {
      if (this.hudSplitTimeline) {
        this.hudSplitTimeline.kill();
      }

      const headerTarget = this.flowHudEl ? (this.flowHudEl.querySelector('#showcaseFlowHeaderTitle') || this.flowHudEl.querySelector('#showcaseFlowHeader h3, #showcaseFlowHeader')) : null;
      let headerChars = [];
      if (headerTarget && typeof SplitType !== 'undefined') {
        const split = new SplitType(headerTarget, { types: 'chars, words', tagName: 'span' });
        headerChars = split.chars || [];
      }

      let navChars = [];
      if (this.flowNavItems && this.flowNavItems.length > 0 && typeof SplitType !== 'undefined') {
        this.flowNavItems.forEach(item => {
          const split = new SplitType(item, { types: 'chars, words', tagName: 'span' });
          if (split.chars) navChars.push(...split.chars);
        });
      }

      if (this.flowHudEl) {
        this.flowHudEl.style.opacity = '1';
        this.flowHudEl.style.pointerEvents = 'none';
        this.flowHudEl.style.transform = 'translate3d(0, 0, 0)';
      }

      if (window.gsap) {
        this.hudSplitTimeline = gsap.timeline({
          onComplete: () => {
            if (headerChars.length > 0) gsap.set(headerChars, { clearProps: "transform,opacity" });
            if (navChars.length > 0) gsap.set(navChars, { clearProps: "transform,opacity" });
          }
        });

        if (headerChars.length > 0) {
          this.hudSplitTimeline.fromTo(
            headerChars,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: "power2.out" },
            0
          );
        }

        if (navChars.length > 0) {
          this.hudSplitTimeline.fromTo(
            navChars,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.012, ease: "power2.out" },
            0.08
          );
        }
      }
    }

    updateFlowHUD() {
      if (!this.flowHudEl) {
        this.flowHudEl = document.getElementById('showcaseFlowHud');
        this.flowNavItems = document.querySelectorAll('.showcase-flow-nav-item');
        this.spiralSection = document.getElementById('spiralGallerySection');
      }
      if (!this.flowHudEl) return;

      const companiesEl = document.getElementById('participant-companies');
      const cRect = companiesEl ? companiesEl.getBoundingClientRect() : null;
      const pRect = this.wrapper.getBoundingClientRect();
      const sRect = this.spiralSection ? this.spiralSection.getBoundingClientRect() : null;
      const pinSpacer = (this.spiralSection && this.spiralSection.parentElement && this.spiralSection.parentElement.classList.contains('pin-spacer')) ? this.spiralSection.parentElement : null;
      const sBox = pinSpacer ? pinSpacer.getBoundingClientRect() : sRect;

      const flowTop = cRect ? cRect.top : pRect.top;
      const flowBottom = sBox ? sBox.bottom : pRect.bottom;

      if (flowTop > window.innerHeight * 0.5) {
        if (this.flowHudRevealed) {
          this.flowHudRevealed = false;
          if (this.hudSplitTimeline) this.hudSplitTimeline.kill();
        }
        this.flowHudEl.style.opacity = '0';
        this.flowHudEl.style.pointerEvents = 'none';
        this.flowHudEl.style.transform = 'translate3d(0, 0, 0)';
        return;
      }

      let isEnvelopeFinished = false;
      if (window._animTriggerInstance && typeof window._animTriggerInstance.progress === 'number') {
        if (window._animTriggerInstance.progress >= 0.96) isEnvelopeFinished = true;
      }
      if (sBox && sBox.bottom <= window.innerHeight * 0.4) {
        isEnvelopeFinished = true;
      }

      if (isEnvelopeFinished || flowBottom < 0) {
        this.flowHudEl.style.opacity = '0';
        this.flowHudEl.style.pointerEvents = 'none';
        return;
      }

      if (!this.flowHudRevealed) {
        this.flowHudRevealed = true;
        this.playHudSplitAnimation();
      } else {
        this.flowHudEl.style.opacity = '1';
        this.flowHudEl.style.pointerEvents = 'none';
      }

      const drift = Math.min(0, flowBottom - window.innerHeight);
      this.flowHudEl.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0)`;

      let activeTarget = 'from';
      if (sRect && sRect.top <= window.innerHeight * 0.4) {
        activeTarget = 'feedback';
      } else if (pRect.top <= 100 && this.currentProgress > 2.0) {
        activeTarget = 'what';
      } else if (pRect.top <= window.innerHeight * 0.35) {
        activeTarget = 'who';
      } else {
        activeTarget = 'from';
      }

      if (this.currentActiveNavTarget !== activeTarget) {
        this.currentActiveNavTarget = activeTarget;
        if (this.flowNavItems) {
          this.flowNavItems.forEach(navItem => {
            const itemTarget = navItem.getAttribute('data-flow-target') || navItem.dataset.flowTarget;
            if (itemTarget === activeTarget) {
              navItem.classList.add('active');
            } else {
              navItem.classList.remove('active');
            }
          });
        }
      }
    }

    // =========================================================================
    // ĐIỀU PHỐI CẬP NHẬT AVATAR TÁC GIẢ BÊN TRÁI
    // =========================================================================
    updateAuthorsSidebar(cardIndex, hideItemsInitially = false, animDuration = 0.15) {
      this.currentAuthorCardIndex = cardIndex;
      if (!this.authorsListEl) return;

      const shrinkDur = Math.min(0.22, animDuration * 0.4);
      const growDur = Math.max(0.20, animDuration * 0.6);

      if (cardIndex < 0 || cardIndex >= this.totalCards) {
        this.currentDisplayedMemberIds = [];
        if (this.currentAuthorTimeline) {
          this.currentAuthorTimeline.kill();
          this.currentAuthorTimeline = null;
        }
        const oldItems = Array.from(this.authorsListEl.querySelectorAll('.case-study-author-item'));
        if (oldItems.length > 0) {
          oldItems.forEach(item => { item.style.pointerEvents = 'none'; });
          if (window.gsap) {
            const tl = gsap.timeline();
            this.currentAuthorTimeline = tl;
            tl.to(oldItems, {
              scale: 0,
              duration: shrinkDur,
              stagger: 0.15,
              ease: 'power2.in',
              overwrite: 'auto',
              onComplete: () => {
                this.authorsListEl.innerHTML = '';
              }
            });
          } else {
            this.authorsListEl.innerHTML = '';
          }
        }
        return;
      }

      const itemData = this.data[cardIndex];
      if (!itemData) return;

      const memberIds = itemData.memberIds || [];
      const memberNames = itemData.memberNames || [];

      if (hideItemsInitially) {
        if (this.currentAuthorTimeline) {
          this.currentAuthorTimeline.kill();
          this.currentAuthorTimeline = null;
        }
        this.authorsListEl.innerHTML = '';
        memberIds.forEach((id, idx) => {
          const name = memberNames[idx] || id;
          const itemEl = this.createAuthorItemDOM(id, name);
          itemEl.style.opacity = '0';
          itemEl.style.transform = 'scale(0.0)';
          this.authorsListEl.appendChild(itemEl);
        });
        this.currentDisplayedMemberIds = memberIds.slice();
        return;
      }

      if (this.currentDisplayedMemberIds &&
        this.currentDisplayedMemberIds.length === memberIds.length &&
        this.currentDisplayedMemberIds.every((id, i) => id === memberIds[i])) {
        return;
      }
      this.currentDisplayedMemberIds = memberIds.slice();

      if (this.currentAuthorTimeline) {
        this.currentAuthorTimeline.kill();
        this.currentAuthorTimeline = null;
      }

      const oldItems = Array.from(this.authorsListEl.querySelectorAll('.case-study-author-item'));

      if (oldItems.length > 0) {
        oldItems.forEach(item => { item.style.pointerEvents = 'none'; });
        if (window.gsap) {
          const tl = gsap.timeline();
          this.currentAuthorTimeline = tl;
          tl.to(oldItems, {
            scale: 0,
            duration: 0.22,
            stagger: 0.05,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      }

      const delayBetween = oldItems.length > 0 ? (oldItems.length * 50 + 200) : 0;
      setTimeout(() => {
        this.authorsListEl.innerHTML = '';
        const newItems = [];
        memberIds.forEach((id, idx) => {
          const name = memberNames[idx] || id;
          const itemEl = this.createAuthorItemDOM(id, name);
          itemEl.style.transform = 'scale(0.0)';
          itemEl.style.opacity = '1';
          itemEl.style.pointerEvents = 'none';
          this.authorsListEl.appendChild(itemEl);
          newItems.push(itemEl);
        });

        if (window.gsap) {
          const staggerAmt = newItems.length > 1 ? Math.min(0.12, (growDur * 0.4) / (newItems.length - 1)) : 0;
          gsap.to(newItems, {
            scale: 1,
            duration: growDur,
            stagger: staggerAmt,
            ease: 'back.out(1.7)',
            overwrite: 'auto',
            onComplete: () => {
              newItems.forEach(item => { item.style.pointerEvents = 'auto'; });
            }
          });
        } else {
          newItems.forEach(item => {
            item.style.transform = 'scale(1)';
            item.style.pointerEvents = 'auto';
          });
        }
      }, delayBetween);
    }

    createAuthorItemDOM(id, name) {
      const authorItem = document.createElement('div');
      authorItem.className = 'case-study-author-item';

      const img = document.createElement('img');
      img.className = 'case-study-author-avatar';
      img.src = `asset/image/participant/${id}.webp`;
      img.alt = name;
      img.onerror = () => { img.src = 'asset/icon/favicon.svg'; };

      const tooltip = document.createElement('span');
      tooltip.className = 'case-study-author-tooltip';
      tooltip.textContent = name;

      authorItem.appendChild(img);
      authorItem.appendChild(tooltip);
      return authorItem;
    }
  }

  // ===========================================================================
  // 3. BẢNG ĐIỀU KHIỂN LIVE CONFIG TUNER 3D (ĐỒNG BỘ 100% VỚI CURVED COVER ENGINE)
  // ===========================================================================
  class LiveTunerGUI {
    constructor(showcase) {
      this.showcase = showcase;
      this.panelEl = null;
      this.toggleBtn = null;
      this.autoFlightActive = false;
      this.autoFlightTween = null;
      this.frameCount = 0;
      this.fpsTimer = performance.now();
      this.currentFps = 60;
      this.init();
    }

    init() {
      const cfg = window.CASE_STUDY_CONFIG;
      // Nếu cấu hình đặt false thì KHÔNG hiển thị trên giao diện
      if (!cfg || !cfg.showLiveTuner) return;

      const oldPanel = document.getElementById('case-study-live-tuner');
      if (oldPanel) oldPanel.remove();
      const oldBtn = document.getElementById('case-study-tuner-toggle');
      if (oldBtn) oldBtn.remove();

      // Nút mở / thu gọn bảng điều khiển
      this.toggleBtn = document.createElement('button');
      this.toggleBtn.id = 'case-study-tuner-toggle';
      this.toggleBtn.className = 'tuner-toggle-btn';
      this.toggleBtn.innerHTML = `<span>⚙ 3D Tuner</span>`;
      document.body.appendChild(this.toggleBtn);

      // Panel Tuner
      this.panelEl = document.createElement('div');
      this.panelEl.className = 'curved-cover-tuner-panel';
      this.panelEl.id = 'case-study-live-tuner';
      this.panelEl.innerHTML = `
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span>Live Config Tuner</span>
          </div>
          <button class="panel-close-btn" id="btnCloseTuner" title="Đóng bảng điều khiển">✕</button>
        </div>
        <div class="panel-header-actions">
          <button class="btn btn-copy-config" id="btnCopyConfig">📋 Sao chép Config</button>
          <button class="btn" id="btnAutoFlight">🚀 Tự động bay</button>
          <button class="btn" id="btnReset">Đặt lại</button>
        </div>

        <!-- Tiến độ cuộn -->
        <div class="scrubber-bar">
          <div class="control-label-row">
            <span>Tiến độ cuộn (Timeline Progress)</span>
            <span class="val-input-box">
              <input type="number" class="val-input" id="numProgress" step="0.01" min="0" max="${Math.max(1, this.showcase.totalCards - 1)}" value="0.00">
            </span>
          </div>
          <input type="range" id="rangeProgress" min="0" max="${Math.max(1, this.showcase.totalCards - 1)}" step="0.01" value="0">
        </div>

        <!-- 3 Tabs Điều Khiển -->
        <div class="tab-bar">
          <button class="tab-btn active" data-tab="tab-physics">1. Vật lý Cong</button>
          <button class="tab-btn" data-tab="tab-trajectory">2. Quỹ đạo Cuộn</button>
          <button class="tab-btn" data-tab="tab-angles">3. Phối cảnh &amp; Kích thước</button>
        </div>

        <!-- TAB 1: VẬT LÝ CONG -->
        <div class="tab-content active" id="tab-physics">
          <div class="section-title">Kiểu uốn cong (Bend Mode)</div>
          <div class="bend-mode-switch">
            <button class="bend-mode-btn ${cfg.bendMode === 'allCorners' ? 'active' : ''}" data-bend-mode="allCorners">
              <span class="bend-mode-icon">◇</span>
              <span class="bend-mode-label">Cong 4 góc</span>
              <span class="bend-mode-desc">All Corners</span>
            </button>
            <button class="bend-mode-btn ${cfg.bendMode === 'topFixed' ? 'active' : ''}" data-bend-mode="topFixed">
              <span class="bend-mode-icon">📄</span>
              <span class="bend-mode-label">Nẹp cạnh trên</span>
              <span class="bend-mode-desc">Top Fixed</span>
            </button>
          </div>

          <div class="topfixed-params-group" style="${cfg.bendMode === 'topFixed' ? '' : 'display:none'}">
            <div class="section-title">Tham số Nẹp cạnh trên (Top Fixed)</div>
            ${this.createControl('topFixedSpread', 'Độ lan rộng vùng cong (Spread)', 0.05, 2.0, 0.05, cfg.topFixedSpread !== undefined ? cfg.topFixedSpread : 0.6)}
            ${this.createControl('curtainWave', 'Nhấp nhô kiểu rèm (Curtain Wave)', 0.0, 0.5, 0.01, cfg.curtainWave !== undefined ? cfg.curtainWave : 0.0)}
          </div>

          <div class="section-title">Tham số Uốn cong &amp; Đàn hồi</div>
          ${this.createControl('bendIntensity', 'Mức độ cong (Bend Intensity)', 0.0, 6.0, 0.05, cfg.bendIntensity)}
          ${this.createControl('recoverySpeed', 'Tốc độ phục hồi phẳng (Recovery Speed)', 0.005, 0.50, 0.005, cfg.recoverySpeed)}
          ${this.createControl('damping', 'Độ giảm chấn đàn hồi (Damping)', 0.20, 0.99, 0.01, cfg.damping)}
          ${this.createControl('curvePower', 'Độ dốc cong từ tâm (Curve Power)', 0.5, 5.0, 0.1, cfg.curvePower)}
          ${this.createControl('bendZFactor', 'Độ sâu võng trục Z (Z Depth Sag)', 0.0, 4.0, 0.05, cfg.bendZFactor)}
          ${this.createControl('bendXYLag', 'Độ kéo dãn quán tính XY (XY Lag)', 0.0, 3.0, 0.05, cfg.bendXYLag)}
          ${this.createControl('velMultiplier', 'Độ nhạy vận tốc (Velocity Mult)', 0.1, 4.0, 0.05, cfg.velMultiplier)}

          <label class="toggle-row">
            <span>Hiển thị Lưới đa giác 3D (Wireframe)</span>
            <div class="switch">
              <input type="checkbox" id="toggleWireframe" ${cfg.wireframe ? 'checked' : ''}>
              <span class="slider-switch"></span>
            </div>
          </label>

          <div class="section-title">🌓 Lớp Phủ Màu Theo Độ Sâu (Depth Overlay)</div>
          ${this.createControl('overlayOpacityDark', 'Độ phủ Dark Mode (Opacity)', 0.0, 1.0, 0.02, cfg.overlayOpacityDark !== undefined ? cfg.overlayOpacityDark : 0.85)}
          <div class="control-group">
            <div class="control-label-row">
              <span>Màu phủ Dark Mode (Color)</span>
              <span class="val-input-box" style="display: inline-flex; align-items: center; gap: 6px;">
                <input type="color" class="val-color-input" id="color-overlayColorDark" value="${cfg.overlayColorDark || '#0d121a'}">
                <input type="text" class="val-input font-mono" id="num-overlayColorDark" value="${cfg.overlayColorDark || '#0d121a'}" style="width: 70px; text-align: center;">
              </span>
            </div>
          </div>
          ${this.createControl('overlayOpacityLight', 'Độ phủ Light Mode (Opacity)', 0.0, 1.0, 0.02, cfg.overlayOpacityLight !== undefined ? cfg.overlayOpacityLight : 0.85)}
          <div class="control-group">
            <div class="control-label-row">
              <span>Màu phủ Light Mode (Color)</span>
              <span class="val-input-box" style="display: inline-flex; align-items: center; gap: 6px;">
                <input type="color" class="val-color-input" id="color-overlayColorLight" value="${cfg.overlayColorLight || '#f9f6f1'}">
                <input type="text" class="val-input font-mono" id="num-overlayColorLight" value="${cfg.overlayColorLight || '#f9f6f1'}" style="width: 70px; text-align: center;">
              </span>
            </div>
          </div>

          <div class="section-title" style="margin-top: 10px;">👁 Xem Thử Theme (Tuner Preview)</div>
          <div class="theme-preview-switch">
            <button class="theme-preview-btn ${this.showcase.previewTheme === 'auto' ? 'active' : ''}" data-theme-preview="auto">
              <span class="theme-preview-icon">⚙</span>
              <span class="theme-preview-label">Tự động</span>
            </button>
            <button class="theme-preview-btn ${this.showcase.previewTheme === 'dark' ? 'active' : ''}" data-theme-preview="dark">
              <span class="theme-preview-icon">🌙</span>
              <span class="theme-preview-label">Dark</span>
            </button>
            <button class="theme-preview-btn ${this.showcase.previewTheme === 'light' ? 'active' : ''}" data-theme-preview="light">
              <span class="theme-preview-icon">☀️</span>
              <span class="theme-preview-label">Light</span>
            </button>
          </div>
        </div>

        <!-- TAB 2: QUỸ ĐẠO CUỘN -->
        <div class="tab-content" id="tab-trajectory">
          <div class="section-title">⏱ Thời Gian Chuyển Cảnh — Desktop</div>
          ${this.createControl('sphereStayDurationDesktop', 'Sphere Stay Step (Desktop)', 0.1, 5.0, 0.1, cfg.sphereStayDurationDesktop !== undefined ? cfg.sphereStayDurationDesktop : 3.4)}
          ${this.createControl('avatarShrinkDurationDesktop', 'Sphere Shrink Step (Desktop)', 0.2, 5.0, 0.1, cfg.avatarShrinkDurationDesktop !== undefined ? cfg.avatarShrinkDurationDesktop : 2)}
          ${this.createControl('avatarFlightDurationDesktop', 'Avatar Flight Step (Desktop)', 0.2, 5.0, 0.1, cfg.avatarFlightDurationDesktop !== undefined ? cfg.avatarFlightDurationDesktop : 1.3)}
          ${this.createControl('card0EntryDurationDesktop', 'Card Entry Step (Desktop)', 0.2, 5.0, 0.1, cfg.card0EntryDurationDesktop !== undefined ? cfg.card0EntryDurationDesktop : 1.8)}

          <div class="section-title">⏱ Thời Gian Chuyển Cảnh — Mobile</div>
          ${this.createControl('sphereStayDurationMobile', 'Sphere Stay Step (Mobile)', 0.1, 5.0, 0.1, cfg.sphereStayDurationMobile !== undefined ? cfg.sphereStayDurationMobile : 3.4)}
          ${this.createControl('avatarShrinkDurationMobile', 'Sphere Shrink Step (Mobile)', 0.2, 5.0, 0.1, cfg.avatarShrinkDurationMobile !== undefined ? cfg.avatarShrinkDurationMobile : 2)}
          ${this.createControl('avatarFlightDurationMobile', 'Avatar Flight Step (Mobile)', 0.2, 5.0, 0.1, cfg.avatarFlightDurationMobile !== undefined ? cfg.avatarFlightDurationMobile : 1.3)}
          ${this.createControl('card0EntryDurationMobile', 'Card Entry Step (Mobile)', 0.2, 5.0, 0.1, cfg.card0EntryDurationMobile !== undefined ? cfg.card0EntryDurationMobile : 1.8)}

          <div class="section-title">🖥 Tốc độ Cuộn &amp; Khoảng cách — Desktop</div>
          ${this.createControl('unpinCaseOffsetDesktop', 'Offset nhả Sticky (Desktop)', 0, 5, 0.1, cfg.unpinCaseOffsetDesktop !== undefined ? cfg.unpinCaseOffsetDesktop : 0)}
          ${this.createControl('pixelsPerCardDesktop', 'Pixels/Card (Desktop)', 40, 600, 10, cfg.pixelsPerCardDesktop, true)}
          ${this.createControl('frictionDesktop', 'Ma sát cuộn (Desktop)', 0.01, 0.25, 0.005, cfg.frictionDesktop)}
          ${this.createControl('cardSpacingDesktop', 'Khoảng cách Card (Desktop px)', 300, 1600, 20, cfg.cardSpacingDesktop, true)}
          ${this.createControl('flyAngleDegDesktop', 'Góc bay chéo (Desktop deg)', 10, 80, 1, cfg.flyAngleDegDesktop, true)}
          ${this.createControl('shadowXDesktop', 'Shadow X (Desktop)', -300, 300, 5, cfg.shadowXDesktop, true)}
          ${this.createControl('shadowYDesktop', 'Shadow Y (Desktop)', -300, 300, 5, cfg.shadowYDesktop, true)}
          ${this.createControl('shadowDepthDesktop', 'Shadow Depth Z (Desktop)', 30, 300, 5, cfg.shadowDepthDesktop, true)}
          ${this.createControl('shadowOpacityDesktop', 'Shadow Opacity (Desktop)', 0.0, 0.8, 0.02, cfg.shadowOpacityDesktop)}

          <div class="section-title">📱 Tốc độ Cuộn &amp; Khoảng cách — Mobile</div>
          ${this.createControl('unpinCaseOffsetMobile', 'Offset nhả Sticky (Mobile)', 0, 5, 0.1, cfg.unpinCaseOffsetMobile !== undefined ? cfg.unpinCaseOffsetMobile : 0)}
          ${this.createControl('pixelsPerCardMobile', 'Pixels/Card (Mobile)', 40, 600, 10, cfg.pixelsPerCardMobile, true)}
          ${this.createControl('frictionMobile', 'Ma sát cuộn (Mobile)', 0.01, 0.25, 0.005, cfg.frictionMobile)}
          ${this.createControl('cardSpacingMobile', 'Khoảng cách Card (Mobile px)', 150, 800, 10, cfg.cardSpacingMobile, true)}
          ${this.createControl('flyAngleDegMobile', 'Góc bay chéo (Mobile deg)', 10, 80, 1, cfg.flyAngleDegMobile, true)}
          ${this.createControl('shadowXMobile', 'Shadow X (Mobile)', -300, 300, 5, cfg.shadowXMobile, true)}
          ${this.createControl('shadowYMobile', 'Shadow Y (Mobile)', -300, 300, 5, cfg.shadowYMobile, true)}
          ${this.createControl('shadowDepthMobile', 'Shadow Depth Z (Mobile)', 30, 300, 5, cfg.shadowDepthMobile, true)}
          ${this.createControl('shadowOpacityMobile', 'Shadow Opacity (Mobile)', 0.0, 0.8, 0.02, cfg.shadowOpacityMobile)}
        </div>

        <!-- TAB 3: PHỐI CẢNH 3D & KÍCH THƯỚC ẢNH -->
        <div class="tab-content" id="tab-angles">
          <div class="section-title">Kích thước Ảnh Case Study (Desktop &amp; Mobile)</div>
          ${this.createControl('cardWidthDesktop', 'Chiều rộng Desktop (Width px)', 300, 1200, 10, cfg.cardWidthDesktop, true)}
          ${this.createControl('cardHeightDesktop', 'Chiều cao Desktop (Height px)', 200, 900, 10, cfg.cardHeightDesktop, true)}
          ${this.createControl('cardWidthMobile', 'Chiều rộng Mobile (Width px)', 180, 500, 10, cfg.cardWidthMobile, true)}
          ${this.createControl('cardHeightMobile', 'Chiều cao Mobile (Height px)', 120, 400, 10, cfg.cardHeightMobile, true)}

          <div class="section-title">🖥 Góc Xoay 3D &amp; Phối Cảnh — Desktop</div>
          ${this.createControl('rotateXDesktop', 'Rotate X (Desktop deg)', -45, 45, 1, cfg.rotateXDesktop, true)}
          ${this.createControl('rotateYDesktop', 'Rotate Y (Desktop deg)', -45, 45, 1, cfg.rotateYDesktop, true)}
          ${this.createControl('rotateZDesktop', 'Rotate Z (Desktop deg)', -45, 45, 1, cfg.rotateZDesktop, true)}
          ${this.createControl('rotXMultDesktop', 'RotX Multiplier (Desktop)', -100, 100, 1, cfg.rotXMultDesktop, true)}
          ${this.createControl('rotYMultDesktop', 'RotY Multiplier (Desktop)', -100, 100, 1, cfg.rotYMultDesktop, true)}
          ${this.createControl('rotZMultDesktop', 'RotZ Multiplier (Desktop)', -100, 100, 0, cfg.rotZMultDesktop, true)}
          ${this.createControl('cameraFovDesktop', 'Camera FOV (Desktop)', 25, 75, 1, cfg.cameraFovDesktop, true)}

          <div class="section-title">📱 Góc Xoay 3D &amp; Phối Cảnh — Mobile</div>
          ${this.createControl('rotateXMobile', 'Rotate X (Mobile deg)', -45, 45, 1, cfg.rotateXMobile, true)}
          ${this.createControl('rotateYMobile', 'Rotate Y (Mobile deg)', -45, 45, 1, cfg.rotateYMobile, true)}
          ${this.createControl('rotateZMobile', 'Rotate Z (Mobile deg)', -45, 45, 1, cfg.rotateZMobile, true)}
          ${this.createControl('rotXMultMobile', 'RotX Multiplier (Mobile)', -100, 100, 1, cfg.rotXMultMobile, true)}
          ${this.createControl('rotYMultMobile', 'RotY Multiplier (Mobile)', -100, 100, 1, cfg.rotYMultMobile, true)}
          ${this.createControl('rotZMultMobile', 'RotZ Multiplier (Mobile)', -100, 100, 0, cfg.rotZMultMobile, true)}
          ${this.createControl('cameraFovMobile', 'Camera FOV (Mobile)', 25, 75, 1, cfg.cameraFovMobile, true)}
        </div>

        <!-- TELEMETRY THỜI GIAN THỰC -->
        <div class="section-title">Telemetry Thời Gian Thực</div>
        <div class="telemetry">
          <div>Vận tốc cuộn: <span class="highlight" id="telScrollSpeed">+0.00 cards/s</span></div>
          <div>Độ biến dạng uDeform: <span class="highlight" id="telDeform">(0.00, 0.00, 0.00)</span></div>
          <div>Trạng thái bề mặt: <span class="highlight" id="telState">Phẳng hoàn toàn (Flat)</span></div>
          <div>FPS: <span class="highlight" id="telFps">60 fps</span></div>
        </div>
      `;

      document.body.appendChild(this.panelEl);
      this.bindEvents();
      this.startTelemetryLoop();
    }

    createControl(key, label, min, max, step, val, isInt = false) {
      const displayVal = isInt ? Math.round(val) : val.toFixed(2);
      return `
        <div class="control-group">
          <div class="control-label-row">
            <span>${label}</span>
            <span class="val-input-box">
              <input type="number" class="val-input" id="num-${key}" min="${min}" max="${max}" step="${step}" value="${displayVal}">
            </span>
          </div>
          <input type="range" id="param-${key}" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${val}">
        </div>
      `;
    }

    bindEvents() {
      // Toggle button
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => {
          const isHidden = window.getComputedStyle(this.panelEl).display === 'none';
          if (isHidden) {
            this.panelEl.style.display = 'block';
            this.toggleBtn.innerHTML = `<span>✕ Đóng Tuner</span>`;
          } else {
            this.panelEl.style.display = 'none';
            this.toggleBtn.innerHTML = `<span>⚙ 3D Tuner</span>`;
          }
        });
      }

      // Close button inside header
      const closeBtn = this.panelEl.querySelector('#btnCloseTuner');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.panelEl.style.display = 'none';
          if (this.toggleBtn) this.toggleBtn.innerHTML = `<span>⚙ 3D Tuner</span>`;
        });
      }

      // Tab switching
      const tabBtns = this.panelEl.querySelectorAll('.tab-btn');
      const tabContents = this.panelEl.querySelectorAll('.tab-content');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          const targetId = btn.dataset.tab;
          const targetContent = this.panelEl.querySelector(`#${targetId}`);
          if (targetContent) targetContent.classList.add('active');
        });
      });

      // Bend Mode Switch
      const bendModeBtns = this.panelEl.querySelectorAll('[data-bend-mode]');
      bendModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.dataset.bendMode;
          if (!BEND_MODES.hasOwnProperty(mode)) return;
          bendModeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          window.CASE_STUDY_CONFIG.bendMode = mode;
          // Cập nhật uniform uBendMode cho toàn bộ card ngay lập tức
          if (this.showcase.webglCards) {
            this.showcase.webglCards.forEach(c => {
              c.material.uniforms.uBendMode.value = BEND_MODES[mode];
            });
          }
          // Ẩn/hiện tham số Top Fixed
          const topFixedGroup = this.panelEl.querySelector('.topfixed-params-group');
          if (topFixedGroup) topFixedGroup.style.display = (mode === 'topFixed') ? '' : 'none';

          this.saveConfig();
          this.showcase.renderCards(this.showcase.currentCaseProgress);
          this.showcase.showToast(mode === 'topFixed' ? '📄 Chế độ: Nẹp cạnh trên (Top Fixed)' : '◇ Chế độ: Cong 4 góc (All Corners)');
        });
      });

      // Wireframe toggle
      const wireframeToggle = this.panelEl.querySelector('#toggleWireframe');
      if (wireframeToggle) {
        wireframeToggle.addEventListener('change', (e) => {
          window.CASE_STUDY_CONFIG.wireframe = e.target.checked;
          if (this.showcase.webglCards) {
            this.showcase.webglCards.forEach(c => {
              c.material.wireframe = e.target.checked;
            });
          }
          this.saveConfig();
        });
      }

      // Màu phủ Dark & Light Mode
      ['overlayColorDark', 'overlayColorLight'].forEach(key => {
        const colorInput = this.panelEl.querySelector(`#color-${key}`);
        const textInput = this.panelEl.querySelector(`#num-${key}`);

        if (colorInput && textInput) {
          colorInput.addEventListener('input', (e) => {
            const hex = e.target.value;
            textInput.value = hex;
            window.CASE_STUDY_CONFIG[key] = hex;
            this.showcase.renderCards(this.showcase.currentCaseProgress);
            this.saveConfig();
          });

          textInput.addEventListener('input', (e) => {
            const hex = e.target.value.trim();
            if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
              colorInput.value = hex;
              window.CASE_STUDY_CONFIG[key] = hex;
              this.showcase.renderCards(this.showcase.currentCaseProgress);
              this.saveConfig();
            }
          });
        }
      });

      // Xem thử Theme (Tuner Preview)
      const previewBtns = this.panelEl.querySelectorAll('[data-theme-preview]');
      previewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.dataset.themePreview;
          this.showcase.previewTheme = mode;
          previewBtns.forEach(b => b.classList.toggle('active', b === btn));
          this.showcase.renderCards(this.showcase.currentCaseProgress);
          const msg = mode === 'auto' ? '⚙ Xem thử: Theo giao diện hệ thống' : (mode === 'dark' ? '🌙 Xem thử: Chế độ Dark Mode' : '☀️ Xem thử: Chế độ Light Mode');
          this.showcase.showToast(msg);
        });
      });

      // Sliders & inputs
      const sliders = this.panelEl.querySelectorAll('input[type="range"][data-key]');
      sliders.forEach(slider => {
        const key = slider.dataset.key;
        const numInput = this.panelEl.querySelector(`#num-${key}`);

        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          window.CASE_STUDY_CONFIG[key] = val;
          if (numInput) numInput.value = Number.isInteger(parseFloat(slider.step)) ? Math.round(val) : val.toFixed(2);
          this.onParamChanged(key, val);
        });

        if (numInput) {
          numInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              window.CASE_STUDY_CONFIG[key] = val;
              slider.value = val;
              this.onParamChanged(key, val);
            }
          });
        }
      });

      // Scrubber
      const rangeProg = this.panelEl.querySelector('#rangeProgress');
      const numProg = this.panelEl.querySelector('#numProgress');
      if (rangeProg && numProg) {
        rangeProg.addEventListener('input', (e) => {
          const p = parseFloat(e.target.value);
          numProg.value = p.toFixed(2);
          this.applyScrubberProgress(p);
        });
        numProg.addEventListener('input', (e) => {
          const p = parseFloat(e.target.value);
          if (!isNaN(p)) {
            rangeProg.value = p.toFixed(2);
            this.applyScrubberProgress(p);
          }
        });
      }

      // Auto Flight
      const btnAuto = this.panelEl.querySelector('#btnAutoFlight');
      if (btnAuto) {
        btnAuto.addEventListener('click', () => {
          if (this.autoFlightActive) this.stopAutoFlight();
          else this.startAutoFlight();
        });
      }

      // Copy Config
      const btnCopy = this.panelEl.querySelector('#btnCopyConfig');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          const json = JSON.stringify(window.CASE_STUDY_CONFIG, null, 2);
          navigator.clipboard.writeText(json).then(() => {
            const orig = btnCopy.textContent;
            btnCopy.textContent = '✓ Đã chép!';
            btnCopy.style.background = '#10b981';
            btnCopy.style.color = '#fff';
            setTimeout(() => {
              btnCopy.textContent = orig;
              btnCopy.style.background = '';
              btnCopy.style.color = '';
            }, 1500);
            this.showcase.showToast('✓ Đã sao chép Config vào Clipboard!');
          }).catch(() => {
            prompt('Sao chép cấu hình JSON bên dưới:', json);
          });
        });
      }

      // Reset
      const btnReset = this.panelEl.querySelector('#btnReset');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          try {
            localStorage.removeItem('UXCAMP_CASE_STUDY_SCROLL_CONFIG_V8');
            localStorage.removeItem('UXCAMP_CASE_STUDY_SCROLL_CONFIG_V7');
          } catch (e) { }
          window.CASE_STUDY_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
          Object.keys(DEFAULT_CONFIG).forEach(k => {
            this.updateInputPair(k, DEFAULT_CONFIG[k]);
          });
          // Reset theme preview switch UI
          const tpBtns = this.panelEl.querySelectorAll('[data-theme-preview]');
          tpBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.themePreview === 'auto');
          });
          this.showcase.previewTheme = 'auto';
          // Reset bend mode switch UI
          const bmBtns = this.panelEl.querySelectorAll('[data-bend-mode]');
          bmBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.bendMode === DEFAULT_CONFIG.bendMode);
          });
          // Reset bend mode uniform cho toàn bộ card
          if (this.showcase.webglCards) {
            this.showcase.webglCards.forEach(c => {
              c.material.uniforms.uBendMode.value = BEND_MODES[DEFAULT_CONFIG.bendMode] || 0.0;
            });
          }
          if (this.showcase.camera) {
            this.showcase.camera.fov = getResponsiveValue(window.CASE_STUDY_CONFIG, 'cameraFov') || 45;
            this.showcase.camera.updateProjectionMatrix();
          }
          this.showcase.updateCardDimensions();
          this.showcase.updateScrollHeight();
          this.showcase.onScroll();
          this.showcase.renderCards(this.showcase.currentCaseProgress);
          this.showcase.showToast('↺ Đã khôi phục cấu hình mặc định!');
        });
      }
    }

    onParamChanged(key, val) {
      if (key.startsWith('cardWidth') || key.startsWith('cardHeight')) {
        this.showcase.updateCardDimensions();
        this.showcase.updateScrollHeight();
      }
      if ((key.startsWith('cameraFov') || key === 'cameraFov') && this.showcase.camera) {
        const activeFov = getResponsiveValue(window.CASE_STUDY_CONFIG, 'cameraFov');
        if (typeof activeFov === 'number') {
          this.showcase.camera.fov = activeFov;
          this.showcase.camera.updateProjectionMatrix();
        }
        this.showcase.updateScrollHeight();
        this.showcase.onScroll();
      }
      if (
        key.startsWith('pixelsPerCard') ||
        key.startsWith('unpinCaseOffset') ||
        key.startsWith('cardSpacing') ||
        key.startsWith('flyAngleDeg') ||
        key.startsWith('sphereStayDuration') ||
        key.startsWith('avatarShrinkDuration') ||
        key.startsWith('avatarFlightDuration') ||
        key.startsWith('card0EntryDuration')
      ) {
        this.showcase.updateScrollHeight();
        this.showcase.onScroll();
      }
      this.saveConfig();
      this.showcase.renderCards(this.showcase.currentCaseProgress);
    }

    updateInputPair(key, val) {
      const slider = this.panelEl.querySelector(`#param-${key}`);
      const numInput = this.panelEl.querySelector(`#num-${key}`);
      const colorInput = this.panelEl.querySelector(`#color-${key}`);
      if (slider) slider.value = val;
      if (numInput) numInput.value = (typeof val === 'number' && !Number.isInteger(val)) ? val.toFixed(2) : val;
      if (colorInput) colorInput.value = val;
    }

    saveConfig() {
      // Cấu hình không lưu vào localStorage; toàn bộ lấy từ DEFAULT_CONFIG trong mã nguồn.
      // Dùng nút "Sao chép Config" trên Live Tuner để copy JSON cấu hình và cập nhật vào DEFAULT_CONFIG.
    }

    applyScrubberProgress(progress) {
      const { CARD_CENTER_PHASE } = this.showcase.getPhaseThresholds();
      const targetStep = CARD_CENTER_PHASE + progress;
      const targetScrollY = this.showcase.wrapper.offsetTop + (targetStep * getResponsiveValue(window.CASE_STUDY_CONFIG, 'pixelsPerCard'));
      window.scrollTo({ top: targetScrollY, behavior: 'auto' });
    }

    startAutoFlight() {
      if (!window.gsap) return;
      this.autoFlightActive = true;
      const btn = this.panelEl.querySelector('#btnAutoFlight');
      if (btn) {
        btn.classList.add('active');
        btn.textContent = '⏸ Tạm dừng';
      }

      let currentIdx = Math.max(0, Math.round(this.showcase.currentCaseProgress));
      const total = this.showcase.totalCards;

      const loop = () => {
        if (!this.autoFlightActive) return;
        currentIdx++;
        if (currentIdx >= total) currentIdx = 0;

        const targetProgress = currentIdx;
        const targetStep = 2.8 + targetProgress;
        const targetScrollY = this.showcase.wrapper.offsetTop + (targetStep * getResponsiveValue(window.CASE_STUDY_CONFIG, 'pixelsPerCard'));

        this.autoFlightTween = gsap.to(window, {
          scrollTo: targetScrollY,
          duration: 1.4,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.delayedCall(0.8, () => {
              if (this.autoFlightActive) loop();
            });
          }
        });
      };

      loop();
    }

    stopAutoFlight() {
      this.autoFlightActive = false;
      if (this.autoFlightTween) this.autoFlightTween.kill();
      const btn = this.panelEl.querySelector('#btnAutoFlight');
      if (btn) {
        btn.classList.remove('active');
        btn.textContent = '🚀 Tự động bay';
      }
    }

    startTelemetryLoop() {
      const telSpeed = this.panelEl.querySelector('#telScrollSpeed');
      const telDeform = this.panelEl.querySelector('#telDeform');
      const telState = this.panelEl.querySelector('#telState');
      const telFps = this.panelEl.querySelector('#telFps');
      const rangeProg = this.panelEl.querySelector('#rangeProgress');
      const numProg = this.panelEl.querySelector('#numProgress');

      const update = () => {
        // FPS
        this.frameCount++;
        const now = performance.now();
        if (now - this.fpsTimer >= 500) {
          this.currentFps = Math.round((this.frameCount * 1000) / (now - this.fpsTimer));
          if (telFps) telFps.textContent = `${this.currentFps} fps`;
          this.frameCount = 0;
          this.fpsTimer = now;
        }

        // Telemetry
        const vel = this.showcase.scrollVelocity || 0;
        const def = this.showcase.curDeform || { x: 0, y: 0, z: 0 };
        const mag = Math.hypot(def.x, def.y, def.z);

        if (telSpeed) telSpeed.textContent = `${vel >= 0 ? '+' : ''}${vel.toFixed(2)} cards/s`;
        if (telDeform) telDeform.textContent = `(${def.x.toFixed(2)}, ${def.y.toFixed(2)}, ${def.z.toFixed(2)})`;

        if (telState) {
          if (mag > 0.04) {
            const isForward = def.z > 0;
            telState.textContent = isForward ? 'Đang cong: Cuộn xuôi (Lõm -Z)' : 'Đang cong: Cuộn ngược (Lồi +Z)';
            telState.style.color = isForward ? '#00f0ff' : '#ff0055';
          } else {
            telState.textContent = 'Phẳng hoàn toàn (Flat)';
            telState.style.color = '#10b981';
          }
        }

        // Cập nhật scrubber nếu người dùng không chạm vào
        const curCP = Math.max(0, this.showcase.currentCaseProgress || 0);
        if (rangeProg && document.activeElement !== rangeProg && document.activeElement !== numProg) {
          rangeProg.value = curCP.toFixed(2);
          if (numProg) numProg.value = curCP.toFixed(2);
        }

        requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    }
  }

  // ===========================================================================
  // 4. KHỞI TẠO TỰ ĐỘNG
  // ===========================================================================
  function initShowcase() {
    const wrapper = document.getElementById('participant-case-study') || document.getElementById('case-study');
    if (!wrapper) return;

    const showcase = new ScrollCaseStudyShowcase(wrapper);
    window._scrollCaseStudyShowcase = showcase;

    const cfg = window.CASE_STUDY_CONFIG;
    if (cfg && cfg.showLiveTuner) {
      const tuner = new LiveTunerGUI(showcase);
      window._caseStudyTuner = tuner;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShowcase);
  } else {
    initShowcase();
  }
})();
