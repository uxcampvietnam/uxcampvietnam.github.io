/**
 * ============================================================================
 * UXCamp Vietnam - 3D Helical Spiral Envelope Gallery Engine
 * ============================================================================
 * 
 * 💡 HƯỚNG DẪN TÍCH HỢP / NHÚNG VÀO BẤT KỲ TRANG HTML NÀO:
 * ----------------------------------------------------------------------------
 * Bước 1: Đặt thẻ container div tại vị trí bạn muốn hiển thị hòm thư:
 *         <div id="spiralGallerySection"></div>
 *         (Hoặc dùng id="uxcampFeedbackWidget", hoặc attribute: <div data-envelope-widget></div>)
 * 
 * Bước 2: Thêm 1 dòng nhúng script vào cuối trang (ngay trước thẻ </body>):
 *         <script src="script/envelope.js"></script>
 * 
 * ----------------------------------------------------------------------------
 * TỐI ƯU
 * 1. Single-Driver Scroll Architecture: Loại bỏ 100% xung đột kép giữa ScrollTrigger và Wheel Event.
 * 2. Zero-Layout-Thrashing: Caching hình học 100%, không layout read/write trong RAF.
 * 3. DOM Write-Diffing: Chỉ ghi style vào DOM khi giá trị thực sự thay đổi.
 * 4. Micro Virtual Culling Window: Chỉ render các thẻ trong tầm nhìn thực tế ($|i - S| \le 3.5$).
 * 5. Active Viewport IntersectionObserver: Tự động ngủ sâu (0% CPU/GPU) khi cuộn ra ngoài.
 * 6. GPU Shader Bypass: Tự động tắt filter khi ở vùng tiêu điểm sắc nét.
 * ============================================================================
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CẤU HÌNH TÙY BIẾN CHUYỂN ĐỘNG 100% (FULL 100% MOTION CONFIGURATION)
  // Toàn bộ cấu hình luôn lấy trực tiếp từ DEFAULT_CONFIG trong code (không nạp từ localStorage)
  // =========================================================================

  const DEFAULT_CONFIG = {
    "devMode": {
      "showLiveTuner": false,
      "allowExportConfig": true
    },
    "geometry": {
      "mode": "container-relative",
      "itemSpacingRatio": 1.1,
      "mobileItemSpacingRatio": 1.45,
      "radiusXRatio": 1.2,
      "radiusZRatio": 1.2,
      "verticalPitchRatio": 0.2,
      "curveWaveYRatio": 0.05,
      "perspectiveRatio": 1.35,
      "cardWidthRatio": 0.25,
      "mobileCardWidthRatio": 0.55,
      "minRadiusX": 60,
      "maxRadiusX": 1600,
      "minRadiusZ": 30,
      "maxRadiusZ": 1200,
      "minVerticalPitch": 30,
      "maxVerticalPitch": 800,
      "minCardWidth": 100,
      "maxCardWidth": 1200,
      "minCardWidthMobile": 180,
      "maxCardWidthMobile": 450,
      "spiralTightness": -0.69,
      "cameraTiltX": 0,
      "cameraAngleY": -5,
      "offsetY": 0
    },
    "transform": {
      "rotateYMultiplier": -0.65,
      "rotateXMultiplier": 0.28,
      "rotateZMultiplier": 0.1,
      "baseScale": 0.85,
      "mobileBaseScale": 0.8,
      "activeScale": 0.9,
      "mobileActiveScale": 1.14,
      "minScale": 0.02,
      "mobileMinScale": 0.02
    },
    "depth": {
      "focalRange": 10,
      "enableBlur": true,
      "maxBlur": 100,
      "darkDepthShading": 0.1,
      "lightDepthBrightness": 0.1,
      "cullZDistance": -100
    },
    "physics": {
      "scrollDistancePerItem": 100,
      "initialScrollOffset": -4,
      "finalScrollOffset": 12,
      "scrollTriggerStart": "top 69%",
      "earlyUnpinItems": 13,
      "damping": 0.055,
      "wheelSensitivity": 0.0001,
      "dragSensitivity": 0.0012,
      "snapToCenter": true,
      "snapDelay": 400,
      "autoFloat": false,
      "autoFloatSpeed": 0.0002
    }
  };;

  // Cấu hình Timeline hoạt ảnh Mở Thư 3D Modal
  const MODAL_MOTION_CONFIG = {
    flipDuration: 1.65,
    letterFlyDuration: 0.8,
    envelopeWidth: 480,
    envelopeHeight: 361
  };

  // Google Sheets API URL đồng bộ dữ liệu
  const API_URL = "https://script.google.com/macros/s/AKfycbwW79mfaIZX5DHGSV9jX2o95GDWxCK_GqVlWqTxwmV9ZxVO4RnJnDsCLxF_9HpVM-WZ/exec";

  // =========================================================================
  // 2. TRẠNG THÁI (STATE) & BIẾN ĐIỀU KHIỂN
  // =========================================================================
  let allFeedbacks = [];
  let filteredFeedbacks = [];
  let currentIndex = 0;
  let activeTimeline = null;
  let activeCardElement = null;
  let savedScrollY = 0;

  // Trạng thái điều khiển 3D Scroll Physics
  let currentScroll = 0;
  let targetScroll = 0;
  let lastInteractionTime = Date.now();
  let rafId = null;
  let isPhysicsRunning = false;
  let isSectionVisible = true;
  let scrollTriggerInstance = null;
  let cardElements = [];
  let cachedGeometry = null;
  let cardDomStates = []; // Bộ nhớ cache DOM Style Diffing

  const elements = {};
  // Khởi tạo cấu hình chuyển động từ DEFAULT_CONFIG (không nạp từ localStorage)
  const ENVELOPE_SCROLL_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  window.ENVELOPE_SCROLL_CONFIG = ENVELOPE_SCROLL_CONFIG;

  // =========================================================================
  // 3. TỰ ĐỘNG NẠP DEPENDENCIES, DOM & CSS (UNIVERSAL AUTO-EMBED)
  // =========================================================================

  function registerScrollTrigger() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  function ensureCSSLoaded() {
    const existingLink = Array.from(document.querySelectorAll("link[rel='stylesheet']")).find(link =>
      link.href && link.href.includes("envelope.css")
    );
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "style/envelope.css";
      document.head.appendChild(link);
    }
  }

  function ensureDependencies(callback) {
    ensureCSSLoaded();

    const needsGSAP = typeof gsap === "undefined";
    const needsScrollTrigger = typeof ScrollTrigger === "undefined";

    if (!needsGSAP && !needsScrollTrigger) {
      registerScrollTrigger();
      callback();
      return;
    }

    function loadScript(src, cb) {
      const s = document.createElement("script");
      s.src = src;
      s.onload = cb;
      s.onerror = cb;
      document.head.appendChild(s);
    }

    if (needsGSAP) {
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", () => {
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js", () => {
          registerScrollTrigger();
          callback();
        });
      });
    } else if (needsScrollTrigger) {
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js", () => {
        registerScrollTrigger();
        callback();
      });
    }
  }

  function ensureGalleryDOM() {
    const mountContainer = document.getElementById("spiralGallerySection") ||
      document.getElementById("uxcampFeedbackWidget") ||
      document.querySelector("[data-envelope-widget]") ||
      document.querySelector(".spiral-gallery-section");

    if (!mountContainer) {
      return false;
    }

    if (!mountContainer.classList.contains("spiral-gallery-section")) {
      mountContainer.classList.add("spiral-gallery-section");
    }

    // Cơ chế bảo vệ tự động: Nếu mountContainer có chứa các section khác (do người dùng quên đóng thẻ </div>), tự động di dời ra ngoài an toàn
    const rogueChildren = Array.from(mountContainer.children).filter(child =>
      child.id !== 'spiralViewport' && !child.classList.contains('spiral-viewport')
    );
    if (rogueChildren.length > 0 && mountContainer.parentNode) {
      rogueChildren.forEach(child => {
        mountContainer.parentNode.insertBefore(child, mountContainer.nextSibling);
      });
    }

    if (!mountContainer.querySelector("#spiralViewport")) {
      mountContainer.innerHTML = `
        <div class="spiral-viewport" id="spiralViewport">
          <div class="spiral-stage" id="spiralStage">
            <div id="envelopeGrid" class="spiral-track" aria-live="polite">
              <div class="spiral-loading-state">
                <div class="spinner"></div>
                <p>Đợi 1 tí</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    return true;
  }

  function ensureModalDOM() {
    if (document.getElementById("envelopeModal")) return;

    const modalDiv = document.createElement("div");
    modalDiv.id = "envelopeModal";
    modalDiv.className = "envelope-modal";
    modalDiv.setAttribute("role", "dialog");
    modalDiv.setAttribute("aria-modal", "true");
    modalDiv.setAttribute("aria-label", "Chi tiết thư cảm nhận");

    modalDiv.innerHTML = `
        <button id="modalCloseBtn" class="modal-close-btn" title="Đóng (Esc)" aria-label="Đóng thư">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <nav class="modal-bottom-nav" aria-label="Điều hướng thư">
            <button id="modalPrevBtn" class="modal-nav-btn" title="Thư trước (Phím ←)" aria-label="Thư trước">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button id="modalNextBtn" class="modal-nav-btn" title="Thư tiếp theo (Phím →)" aria-label="Thư tiếp theo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </nav>

        <div class="envelope-modal-stage">
            <div class="stage-3d">
                <div id="envelope3dObject" class="envelope-3d-object">
                    <div id="envelopeWrapper" class="envelope-wrapper">
                        <!-- 1. Mặt trước chính của phong bì (Hiển thị khi ở chế độ 0deg) -->
                        <div id="faceFront" class="envelope-face-front">
                            <div class="face-bg envelope-face-main-bg" role="img" aria-label="Envelope Front Main Face"></div>
                            <div class="front-sender-block front-content">
                                <h3 id="frontSenderName" class="front-sender-name">--</h3>
                                <p id="frontSenderTitle" class="front-sender-title">--</p>
                                <p id="frontSenderCompany" class="front-sender-title">--</p>
                            </div>
                            <div class="front-stamp-area front-content">
                                <div class="front-stamp">
                                    <img id="frontStampImg" src="asset/icon/stamp.svg" alt="Stamp" />
                                </div>
                            </div>
                            <div class="front-bootcamp-block front-content">
                                <p id="frontCohortName" class="front-cohort-text">--</p>
                                <p id="frontBootcampName" class="front-bootcamp-text">--</p>
                            </div>
                        </div>

                        <!-- 2. Lưng trong phong bì (Nằm sau cùng khi lật 180deg) -->
                        <div id="envelopeLiner" class="envelope-interior-liner"></div>

                        <!-- 3. Ruột thư (Nằm kẹp giữa Lưng trong z:0 và Túi trước z:4) -->
                        <div id="letter3dContainer" class="letter-3d-container">
                            <div class="letter-content-scroll">
                                <header class="letter-header">
                                    <div class="letter-profile">
                                        <img id="letterAvatar" class="letter-avatar" src="asset/icon/favicon.svg" alt="Avatar" />
                                        <div class="letter-profile-info">
                                            <h2 id="letterName" class="letter-name">--</h2>
                                            <p id="letterTitleCompany" class="letter-title-company">--</p>
                                        </div>
                                    </div>
                                    <div class="letter-stamp-box">
                                        <img id="letterStampImg" src="asset/icon/stamp.svg" alt="Stamp" />
                                    </div>
                                </header>
                                <hr class="letter-divider" />
                                <article id="letterFeedbackBody" class="letter-body caption">
                                    --
                                </article>
                                <footer class="letter-footer">
                                    <p id="letterBootcampName" class="letter-bootcamp">--</p>
                                    <p id="letterCohortName" class="letter-cohort">--</p>
                                </footer>
                            </div>
                        </div>

                        <!-- 4. Túi trước của mặt sau (Bao phủ che nửa dưới ruột thư) -->
                        <div id="faceBack" class="envelope-face-back">
                            <div class="face-bg envelope-face-back-bg" role="img" aria-label="Envelope Back Body"></div>
                        </div>

                        <!-- 5. Nắp mở phong bì (Lật ngửa mở lên trên) -->
                        <div id="coverFlap" class="envelope-cover-flap">
                            <div class="envelope-cover-flap-bg" role="img" aria-label="Envelope Cover Flap"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);
  }

  function bindElements() {
    elements.gallerySection = document.getElementById("spiralGallerySection") ||
      document.getElementById("uxcampFeedbackWidget") ||
      document.querySelector("[data-envelope-widget]") ||
      document.querySelector(".spiral-gallery-section");
    elements.viewport = document.getElementById("spiralViewport");
    elements.stage = document.getElementById("spiralStage");
    elements.envelopeGrid = document.getElementById("envelopeGrid");

    elements.modal = document.getElementById("envelopeModal");
    elements.modalCloseBtn = document.getElementById("modalCloseBtn");
    elements.modalPrevBtn = document.getElementById("modalPrevBtn");
    elements.modalNextBtn = document.getElementById("modalNextBtn");

    elements.envelopeObject = document.getElementById("envelope3dObject");
    elements.envelopeWrapper = document.getElementById("envelopeWrapper");
    elements.faceFront = document.getElementById("faceFront");
    elements.envelopeLiner = document.getElementById("envelopeLiner");
    elements.faceBack = document.getElementById("faceBack");
    elements.coverFlap = document.getElementById("coverFlap");
    elements.letter3dContainer = document.getElementById("letter3dContainer");

    elements.frontSenderName = document.getElementById("frontSenderName");
    elements.frontSenderTitle = document.getElementById("frontSenderTitle");
    elements.frontSenderCompany = document.getElementById("frontSenderCompany");
    elements.frontStampImg = document.getElementById("frontStampImg");
    elements.frontCohortName = document.getElementById("frontCohortName");
    elements.frontBootcampName = document.getElementById("frontBootcampName");

    elements.letterAvatar = document.getElementById("letterAvatar");
    elements.letterName = document.getElementById("letterName");
    elements.letterTitleCompany = document.getElementById("letterTitleCompany");
    elements.letterStampImg = document.getElementById("letterStampImg");
    elements.letterFeedbackBody = document.getElementById("letterFeedbackBody");
    elements.letterBootcampName = document.getElementById("letterBootcampName");
    elements.letterCohortName = document.getElementById("letterCohortName");
  }

  function getParticipantAvatarSrc(f) {
    if (!f || !f.img) return "asset/icon/favicon.svg";
    const imgName = f.img.split('/').pop().split('\\').pop();
    return `asset/image/participant/${imgName}`;
  }

  function getBootcampStampSrc(f) {
    if (f && f.thumbnail) {
      const imgName = f.thumbnail.split('/').pop().split('\\').pop();
      return `asset/image/bootcamp-img/${imgName}`;
    }
    return "asset/icon/stamp.svg";
  }

  // =========================================================================
  // 4. CACHED GEOMETRY ENGINE (ZERO-LAYOUT-THRASHING)
  // =========================================================================

  /**
   * Tính toán và lưu cache cấu hình hình học 3D.
   * Chỉ thực thi khi khởi tạo, thay đổi kích thước màn hình (Resize) hoặc khi chỉnh Tuner.
   */
  function updateCachedGeometry() {
    const container = elements.gallerySection || elements.viewport || document.body;
    const cWidth = container.clientWidth || container.offsetWidth || window.innerWidth;
    const cHeight = container.clientHeight || container.offsetHeight || window.innerHeight;
    const isMobile = window.innerWidth <= 768;

    const geo = ENVELOPE_SCROLL_CONFIG.geometry;

    let radiusX, radiusZ, verticalPitch, curveWaveY, perspective, cardWidth;

    const effectiveCardWidthRatio = isMobile
      ? (geo.mobileCardWidthRatio !== undefined ? geo.mobileCardWidthRatio : 0.58)
      : (geo.cardWidthRatio !== undefined ? geo.cardWidthRatio : 0.25);

    const minCardW = isMobile
      ? (geo.minCardWidthMobile !== undefined ? geo.minCardWidthMobile : 180)
      : geo.minCardWidth;

    const maxCardW = isMobile
      ? (geo.maxCardWidthMobile !== undefined ? geo.maxCardWidthMobile : 450)
      : geo.maxCardWidth;

    const effectiveItemSpacing = isMobile
      ? (geo.mobileItemSpacingRatio !== undefined ? geo.mobileItemSpacingRatio : 1.15)
      : (geo.itemSpacingRatio !== undefined ? geo.itemSpacingRatio : 1.1);

    if (geo.mode === "container-relative") {
      // Bán kính X từ tâm = (Chiều rộng container * tỷ lệ % mong muốn) / 2
      // Giúp dải bay trải đều từ -radiusX đến +radiusX và chiếm đúng radiusXRatio (% chiều ngang container)
      radiusX = Math.max(geo.minRadiusX, Math.min(geo.maxRadiusX, (cWidth * geo.radiusXRatio) / 2));
      radiusZ = Math.max(geo.minRadiusZ, Math.min(geo.maxRadiusZ, cWidth * geo.radiusZRatio));
      verticalPitch = Math.max(geo.minVerticalPitch, Math.min(geo.maxVerticalPitch, cHeight * geo.verticalPitchRatio));
      curveWaveY = cHeight * geo.curveWaveYRatio;
      perspective = Math.max(900, Math.min(2600, cWidth * geo.perspectiveRatio));
      cardWidth = Math.max(minCardW, Math.min(maxCardW, cWidth * effectiveCardWidthRatio));
    } else {
      radiusX = geo.radiusX || 520;
      radiusZ = geo.radiusZ || 440;
      verticalPitch = geo.verticalPitch || 155;
      curveWaveY = geo.curveWaveY || 50;
      perspective = geo.perspective || 1800;
      cardWidth = isMobile ? 240 : 440;
    }

    const cardHeight = Math.round(cardWidth * (677 / 900));

    cachedGeometry = {
      cWidth,
      cHeight,
      radiusX,
      radiusZ,
      verticalPitch,
      curveWaveY,
      perspective,
      cardWidth,
      cardHeight,
      spiralTightness: geo.spiralTightness,
      itemSpacingRatio: effectiveItemSpacing,
      cameraTiltX: geo.cameraTiltX,
      cameraAngleY: geo.cameraAngleY,
      offsetY: geo.offsetY
    };

    if (elements.viewport) {
      elements.viewport.style.perspective = `${perspective}px`;
    }

    // Thiết lập kích thước thẻ 1 LẦN DUY NHẤT khi cập nhật hình học
    if (cardElements && cardElements.length > 0) {
      const ml = `${-cardWidth / 2}px`;
      const mt = `${-cardHeight / 2}px`;
      const w = `${cardWidth}px`;
      for (let i = 0; i < cardElements.length; i++) {
        const c = cardElements[i];
        c.style.width = w;
        c.style.marginLeft = ml;
        c.style.marginTop = mt;
      }
    }
  }

  /**
   * Cập nhật vị trí thẻ trong không gian 3D với DOM Write-Diffing & Micro Virtual Culling
   */
  function update3DPositions() {
    if (!cardElements || cardElements.length === 0 || !cachedGeometry) return;

    const geo = cachedGeometry;
    const { transform, depth } = ENVELOPE_SCROLL_CONFIG;
    const isMobile = window.innerWidth <= 768;

    const effectiveActiveScale = isMobile
      ? (transform.mobileActiveScale !== undefined ? transform.mobileActiveScale : 1.05)
      : (transform.activeScale !== undefined ? transform.activeScale : 0.9);

    const effectiveMinScale = isMobile
      ? (transform.mobileMinScale !== undefined ? transform.mobileMinScale : transform.minScale)
      : transform.minScale;

    const total = cardElements.length;
    const CULL_RANGE = depth.focalRange + 1.6; // Render cửa sổ hẹp tối ưu (chỉ ~5 thẻ quanh tâm)

    for (let i = 0; i < total; i++) {
      const card = cardElements[i];
      if (!card) continue;

      const state = cardDomStates[i] || (cardDomStates[i] = {
        visible: null,
        transform: "",
        filter: "",
        pointerEvents: "",
        faces: Array.from(card.querySelectorAll('.envelope-card-front, .envelope-card-liner, .envelope-card-back, .envelope-card-cover-flap'))
      });

      const relativePos = i - currentScroll;
      const delta = relativePos;

      const spacedDelta = delta * (geo.itemSpacingRatio !== undefined ? geo.itemSpacingRatio : 1.0);
      const distFromCenter = Math.abs(spacedDelta);

      // ⚡ 1. Micro Virtual Culling: Ẩn hoàn toàn thẻ ngoài tầm nhìn
      if (distFromCenter > CULL_RANGE) {
        if (state.visible !== false) {
          card.style.display = "none";
          state.visible = false;
        }
        continue;
      } else {
        if (state.visible !== true) {
          card.style.display = "block";
          state.visible = true;
        }
      }

      // 2. Góc quay theo quỹ đạo xoắn ốc
      const theta = spacedDelta * geo.spiralTightness;

      // 3. Tọa độ không gian 3D (X, Y, Z)
      const posX = Math.sin(theta) * geo.radiusX;
      const posY = spacedDelta * geo.verticalPitch - Math.sin(2 * theta) * geo.curveWaveY + geo.offsetY;
      const posZ = (Math.cos(theta) - 1) * geo.radiusZ;

      // 4. Góc xoay 3D của thẻ (Rotations)
      const rotY = -theta * (180 / Math.PI) * transform.rotateYMultiplier + geo.cameraAngleY;
      const rotX = geo.cameraTiltX + (delta * transform.rotateXMultiplier * 8);
      const rotZ = -Math.sin(theta) * (180 / Math.PI) * transform.rotateZMultiplier;

      // 5. Tiêu điểm & Scale
      const proximity = Math.max(0, 1 - distFromCenter / depth.focalRange);
      const easeProximity = proximity * proximity * (3 - 2 * proximity);
      const scale = effectiveMinScale + (effectiveActiveScale - effectiveMinScale) * easeProximity;

      // 6. Quang học: Blur & Z-Depth Shading
      const blur = depth.enableBlur ? (1 - easeProximity) * depth.maxBlur : 0;

      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      let brightness = 1;
      if (isDarkMode) {
        brightness = 1 - (1 - easeProximity) * depth.darkDepthShading;
      } else {
        brightness = 1 + (1 - easeProximity) * depth.lightDepthBrightness;
      }

      // 7. GPU Filter String
      let filterStr = "none";
      if (blur > 0.6) {
        filterStr = `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
      } else if (brightness < 0.98 || brightness > 1.02) {
        filterStr = `brightness(${brightness.toFixed(2)})`;
      }

      // 8. Transform String
      // ⚡ Match GSAP's default transform order: translate, rotateZ, rotateX, rotateY, scale
      // This is crucial to prevent "snapping" or "gapping" when GSAP takes over the element during opening/closing
      const transformStr = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, ${posZ.toFixed(1)}px) rotate(${rotZ.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      const zIndex = Math.round(posZ + 2000);
      const pointerStr = distFromCenter <= CULL_RANGE ? "auto" : "none";

      // ⚡ 9. DOM Write-Diffing: Chỉ ghi DOM khi giá trị thay đổi
      // Áp dụng filter vào CÁC MẶT BÊN TRONG (faces) để KHÔNG làm phẳng (flatten) hệ tọa độ 3D của envelope-card
      if (state.filter !== filterStr) {
        for (let j = 0; j < state.faces.length; j++) {
          state.faces[j].style.filter = filterStr;
        }
        state.filter = filterStr;
      }
      if (state.transform !== transformStr) {
        card.style.transform = transformStr;
        state.transform = transformStr;
      }
      if (state.pointerEvents !== pointerStr) {
        card.style.pointerEvents = pointerStr;
        state.pointerEvents = pointerStr;
      }
    }
  }

  /**
   * Đánh thức vòng lặp physics khi có tương tác người dùng
   */
  function wakeUpPhysicsLoop() {
    if (!isPhysicsRunning && isSectionVisible) {
      isPhysicsRunning = true;
      startPhysicsLoop();
    }
  }

  /**
   * Vòng lặp vật lý RequestAnimationFrame (Tối ưu Adaptive Idle Sleep)
   */
  function startPhysicsLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    isPhysicsRunning = true;

    function tick() {
      if (!isSectionVisible) {
        isPhysicsRunning = false;
        return;
      }

      const cfg = ENVELOPE_SCROLL_CONFIG;
      const maxScroll = Math.max(0, filteredFeedbacks.length - 1);

      // Tự động lơ lửng dải phong bì nếu bật autoFloat
      if (cfg.physics.autoFloat && Date.now() - lastInteractionTime > 2000) {
        targetScroll += cfg.physics.autoFloatSpeed;
        if (targetScroll > maxScroll) targetScroll = 0;
      }

      // Tự động Snap vào giữa thẻ gần nhất khi dừng cuộn
      if (cfg.physics.snapToCenter && Date.now() - lastInteractionTime > cfg.physics.snapDelay) {
        const nearestIndex = Math.round(targetScroll);
        const diff = nearestIndex - targetScroll;
        if (Math.abs(diff) > 0.001) {
          targetScroll += diff * 0.06;
        }
      }

      // Nội suy chuyển động mượt mà (Lerp Damping)
      const diff = targetScroll - currentScroll;
      currentScroll += diff * cfg.physics.damping;

      // Cập nhật tọa độ 3D
      update3DPositions();

      // ⚡ Adaptive Idle Sleep: Tự động dừng RAF khi đạt vị trí cân bằng
      if (Math.abs(diff) < 0.0002 && !cfg.physics.autoFloat) {
        currentScroll = targetScroll;
        update3DPositions();
        isPhysicsRunning = false;
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  }

  // =========================================================================
  // 5. HIỂN THỊ DANH SÁCH THẺ PHONG BÌ 3D (RENDER 3D CARDS)
  // =========================================================================
  function renderCards() {
    if (!elements.envelopeGrid) return;

    if (filteredFeedbacks.length === 0) {
      elements.envelopeGrid.innerHTML = `
        <div class="envelope-empty-state">
          <p>Không tìm thấy thư cảm nhận nào hoặc không thể kết nối tới máy chủ.</p>
        </div>
      `;
      return;
    }

    // Dọn dẹp ScrollTrigger cũ
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === elements.gallerySection) st.kill();
      });
    }

    let cardsHtml = "";
    filteredFeedbacks.forEach((f, idx) => {
      const stampSrc = getBootcampStampSrc(f);
      const companyText = f.company && f.company !== "-" ? `${f.company}` : "";
      const cohortName = f.bootcamp_name ? `${f.bootcamp_name}` : "Bootcamp";
      let bootcampTitle = f.bootcamp || "Design Thinking";
      if (bootcampTitle === "Product Design") {
        bootcampTitle = "Design Thinking";
      }

      cardsHtml += `
        <article class="envelope-card" data-index="${idx}" tabindex="0" role="button" aria-label="Mở phong bì thư của ${f.name}">
          <!-- 1. Mặt trước phong bì -->
          <div class="envelope-card-front">
            <div class="envelope-card-bg envelope-face-main-bg"></div>
            <div class="front-sender-block front-content">
              <h3 class="front-sender-name">${f.name}</h3>
              <p class="front-sender-title">${f.title}</p>
              <p class="front-sender-title">${companyText}</p>
            </div>
            <div class="front-stamp-area front-content">
              <div class="front-stamp">
                <img src="${stampSrc}" alt="Stamp ${cohortName}" onerror="this.src='asset/icon/stamp.svg'" />
              </div>
            </div>
            <div class="front-bootcamp-block front-content">
              <p class="front-cohort-text">${cohortName}</p>
              <p class="front-bootcamp-text">${bootcampTitle}</p>
            </div>
          </div>

          <!-- 2. Lưng trong lót đáy (nằm sau cùng khi nhìn từ mặt 180deg) -->
          <div class="envelope-card-liner"></div>

          <!-- 3. Túi trước của mặt sau -->
          <div class="envelope-card-back">
            <div class="envelope-card-bg envelope-face-back-bg"></div>
          </div>

          <!-- 4. Nắp mở phong bì (Lật ngửa mở lên trên) -->
          <div class="envelope-card-cover-flap">
            <div class="envelope-cover-flap-bg"></div>
          </div>
        </article>
      `;
    });

    elements.envelopeGrid.innerHTML = cardsHtml;
    cardElements = Array.from(elements.envelopeGrid.querySelectorAll(".envelope-card"));
    cardDomStates = [];

    // Gắn sự kiện click mở thư 3D tương tác
    cardElements.forEach((card, idx) => {
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        // console.log("Phong bì thư được bấm (Card Element):", card);
        openFeedbackModal(idx, card);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // console.log("Phong bì thư được bấm (Card Element):", card);
          openFeedbackModal(idx, card);
        }
      });
    });

    // Cập nhật cấu hình hình học ban đầu
    updateCachedGeometry();

    // Khởi tạo ScrollTrigger Ghim Section khi cuộn trang
    setupScrollTrigger();

    // Bắt đầu vòng lặp chuyển động vật lý 3D
    wakeUpPhysicsLoop();
  }

  // =========================================================================
  // 6. TÍCH HỢP GSAP SCROLLTRIGGER, INTERSECTIONOBSERVER & SCROLL/WHEEL
  // =========================================================================

  function setupScrollTrigger() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || !elements.gallerySection) {
      return;
    }

    // Kiểm tra nếu là trang độc lập (demo-open-envelope.html không có thanh cuộn dài)
    const isStandalone = document.documentElement.scrollHeight <= window.innerHeight + 150;
    if (isStandalone) return;

    const maxScroll = Math.max(0, filteredFeedbacks.length - 1);
    if (maxScroll <= 0) return;

    // Đọc khoảng lùi/vượt từ cấu hình
    const initialScrollOffset = ENVELOPE_SCROLL_CONFIG.physics.initialScrollOffset !== undefined ? ENVELOPE_SCROLL_CONFIG.physics.initialScrollOffset : -5;
    const finalScrollOffset = ENVELOPE_SCROLL_CONFIG.physics.finalScrollOffset !== undefined ? ENVELOPE_SCROLL_CONFIG.physics.finalScrollOffset : 3;
    const scrollRange = (maxScroll + finalScrollOffset) - initialScrollOffset;

    // Chiều cao cuộn của container phụ thuộc trực tiếp vào số lượng thư bên trong
    const scrollPerItem = ENVELOPE_SCROLL_CONFIG.physics.scrollDistancePerItem || 160;
    const totalPinDistance = Math.max(window.innerHeight * 1.5, (filteredFeedbacks.length + Math.abs(initialScrollOffset) + finalScrollOffset) * scrollPerItem);

    // Đọc cấu hình bỏ ghim sớm
    const earlyUnpinItems = ENVELOPE_SCROLL_CONFIG.physics.earlyUnpinItems !== undefined ? ENVELOPE_SCROLL_CONFIG.physics.earlyUnpinItems : 0;
    const earlyUnpinDistance = earlyUnpinItems * scrollPerItem;

    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    if (window._animTriggerInstance) {
      window._animTriggerInstance.kill();
      window._animTriggerInstance = null;
    }

    // Lấy cấu hình điểm bắt đầu hiệu ứng bay
    const animStart = ENVELOPE_SCROLL_CONFIG.physics.scrollTriggerStart || "top center";

    // 1. ScrollTrigger chuyên trách Ghim (Pin) - luôn ghim ở top màn hình
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: elements.gallerySection,
      start: "top top",
      // Bỏ ghim sớm hơn một chút để container trôi lên trước khi hết animation
      end: () => `+=${Math.max(0, totalPinDistance - earlyUnpinDistance)}px`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,
      fastScrollEnd: true,
      preventOverlaps: true,
      onRefresh: (self) => {
        if (self.spacer) {
          self.spacer.style.pointerEvents = "none";
          self.spacer.style.overflowX = "clip";
          self.spacer.style.maxWidth = "100%";
        }
      },
      onUpdate: () => {
        if (window._scrollCaseStudyShowcase && typeof window._scrollCaseStudyShowcase.updateFlowHUD === 'function') {
          window._scrollCaseStudyShowcase.updateFlowHUD();
        }
      }
    });

    // 2. ScrollTrigger chuyên trách Animation (Scrub) - bắt đầu theo config
    window._animTriggerInstance = ScrollTrigger.create({
      trigger: elements.gallerySection,
      start: animStart,
      // Tổng quãng đường animation vẫn giữ nguyên (bằng totalPinDistance) kể từ điểm bắt đầu ghim
      end: () => scrollTriggerInstance.start + totalPinDistance,
      scrub: true,
      onUpdate: (self) => {
        targetScroll = initialScrollOffset + (self.progress * scrollRange);
        lastInteractionTime = Date.now();
        wakeUpPhysicsLoop();
        if (window._scrollCaseStudyShowcase && typeof window._scrollCaseStudyShowcase.updateFlowHUD === 'function') {
          window._scrollCaseStudyShowcase.updateFlowHUD();
        }
      },
      onRefresh: (self) => {
        targetScroll = initialScrollOffset + (self.progress * scrollRange);
        currentScroll = targetScroll;
        cardDomStates = [];
        updateCachedGeometry();
        update3DPositions();
        if (window._scrollCaseStudyShowcase && typeof window._scrollCaseStudyShowcase.updateFlowHUD === 'function') {
          window._scrollCaseStudyShowcase.updateFlowHUD();
        }
      }
    });

    // ⚡ Snap vị trí ban đầu ngay lập tức khi tải/refresh trang để tránh thẻ bay lung tung
    const initProgress = window._animTriggerInstance.progress || 0;
    targetScroll = initialScrollOffset + (initProgress * scrollRange);
    currentScroll = targetScroll;
    cardDomStates = [];
    updateCachedGeometry();
    update3DPositions();
  }

  function initInteractionEvents() {
    const vp = elements.viewport;
    if (!vp) return;

    const maxScroll = () => Math.max(0, filteredFeedbacks.length - 1);

    // ⚡ 1. Viewport IntersectionObserver: Tắt hoàn toàn vòng lặp khi không ở trong màn hình (0% CPU)
    if (typeof IntersectionObserver !== "undefined" && elements.gallerySection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isSectionVisible = entry.isIntersecting;
          if (isSectionVisible) {
            wakeUpPhysicsLoop();
          } else {
            if (rafId) {
              cancelAnimationFrame(rafId);
              isPhysicsRunning = false;
            }
          }
        });
      }, { rootMargin: "250px 0px" });
      observer.observe(elements.gallerySection);
    }

    // ⚡ 2. Cuộn chuột (Mouse Wheel): Nhận khi ở Standalone Mode (trang demo)
    window.addEventListener("wheel", (e) => {
      if (elements.modal && elements.modal.classList.contains("active")) return;

      const isStandalone = !scrollTriggerInstance || document.documentElement.scrollHeight <= window.innerHeight + 150;
      if (isStandalone) {
        const delta = (Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * ENVELOPE_SCROLL_CONFIG.physics.wheelSensitivity;
        targetScroll = Math.max(0, Math.min(maxScroll(), targetScroll + delta));
        lastInteractionTime = Date.now();
        wakeUpPhysicsLoop();
      }
    }, { passive: true });

    // 3. Phím mũi tên (Keyboard Arrow Navigation)
    window.addEventListener("keydown", (e) => {
      if (elements.modal && elements.modal.classList.contains("active")) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        targetScroll = Math.min(maxScroll(), targetScroll + 1);
        lastInteractionTime = Date.now();
        wakeUpPhysicsLoop();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        targetScroll = Math.max(0, targetScroll - 1);
        lastInteractionTime = Date.now();
        wakeUpPhysicsLoop();
      }
    });

    // 4. Cập nhật khi Resize màn hình (Debounced & Sync)
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCachedGeometry();
        if (scrollTriggerInstance) {
          scrollTriggerInstance.refresh();
          const maxScroll = Math.max(0, filteredFeedbacks.length - 1);
          targetScroll = scrollTriggerInstance.progress * maxScroll;
          currentScroll = targetScroll;
        }
        cardDomStates = []; // Xóa cache để vẽ lại thẻ với kích thước màn hình mới
        update3DPositions();
        wakeUpPhysicsLoop();
      }, 100);
    });
  }

  // =========================================================================
  // 7. NẠP VÀ ĐỒNG BỘ DỮ LIỆU GOOGLE SHEETS & LOCALSTORAGE
  // =========================================================================
  function loadFeedbacks() {
    try {
      const cached = localStorage.getItem("uxcamp_feedbacks_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allFeedbacks = parsed;
          filteredFeedbacks = [...allFeedbacks];
          renderCards();
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc cache LocalStorage:", e);
    }

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        let rawItems = [];
        if (Array.isArray(data)) {
          rawItems = data;
        } else if (data && Array.isArray(data.feedback)) {
          rawItems = data.feedback;
        }

        const freshItems = rawItems.filter(item => item && (item.listing == 1 || item.listing === undefined) && (item.name || item.feedback));

        if (freshItems.length > 0) {
          const isChanged = JSON.stringify(freshItems) !== JSON.stringify(allFeedbacks);
          allFeedbacks = freshItems;
          filteredFeedbacks = [...allFeedbacks];

          try {
            localStorage.setItem("uxcamp_feedbacks_cache", JSON.stringify(freshItems));
          } catch (e) {
            console.warn("Lỗi lưu LocalStorage:", e);
          }

          if (isChanged || cardElements.length === 0) {
            renderCards();
          }
        }
      })
      .catch(err => {
        console.warn("Lỗi gọi API Google Sheets:", err);
      });
  }

  // =========================================================================
  // 8. ĐỒNG BỘ DỮ LIỆU VÀO MODAL MỞ THƯ
  // =========================================================================
  function populateModalDetails(f) {
    const avatarSrc = getParticipantAvatarSrc(f);
    const stampSrc = getBootcampStampSrc(f);
    const companyText = f.company && f.company !== "-" ? `${f.company}` : "";
    const cohortName = f.bootcamp_name ? `${f.bootcamp_name}` : "Bootcamp";
    let bootcampTitle = f.bootcamp || "Design Thinking";
    if (bootcampTitle === "Product Design") {
      bootcampTitle = "Design Thinking";
    }

    if (elements.frontSenderName) elements.frontSenderName.textContent = f.name;
    if (elements.frontSenderTitle) elements.frontSenderTitle.textContent = f.title || "";
    if (elements.frontSenderCompany) {
      elements.frontSenderCompany.textContent = companyText;
      elements.frontSenderCompany.style.display = companyText ? "" : "none";
    }
    if (elements.frontStampImg) {
      elements.frontStampImg.src = stampSrc;
      elements.frontStampImg.onerror = function () { this.src = "asset/icon/stamp.svg"; };
    }
    if (elements.frontCohortName) elements.frontCohortName.textContent = cohortName;
    if (elements.frontBootcampName) elements.frontBootcampName.textContent = bootcampTitle;

    if (elements.letterAvatar) {
      elements.letterAvatar.src = avatarSrc;
      elements.letterAvatar.onerror = function () { this.src = "asset/icon/favicon.svg"; };
    }
    if (elements.letterName) elements.letterName.textContent = f.name;
    if (elements.letterTitleCompany) elements.letterTitleCompany.textContent = `${f.title} ${" - " + companyText
      } `;
    if (elements.letterStampImg) {
      elements.letterStampImg.src = stampSrc;
      elements.letterStampImg.onerror = function () { this.src = "asset/icon/stamp.svg"; };
    }
    if (elements.letterFeedbackBody) {
      elements.letterFeedbackBody.innerHTML = (f.feedback || "").replace(/\n/g, "<br>");
    }
    if (elements.letterBootcampName) elements.letterBootcampName.textContent = bootcampTitle;
    if (elements.letterCohortName) elements.letterCohortName.textContent = cohortName;
  }

  // =========================================================================
  // 9. HOẠT ẢNH MỞ THƯ GSAP TIMELINE 3D (CLICK-TO-OPEN 3D FLIP)
  // =========================================================================
  function getEnvelopeTargetProps(sourceCard, sourceIndex, forceScrollIndex = null) {
    const envW = elements.envelopeObject.offsetWidth || 440;
    const envH = elements.envelopeObject.offsetHeight || 330;

    let props = {
      x: 0, y: 0, z: 0, scale: 1,
      rotateX: 0, rotateY: 0, rotateZ: 0,
      filter: "none",
      boxShadow: "none",
      borderRadius: "6px"
    };

    if (sourceCard) {
      try {
        const compStyle = window.getComputedStyle(sourceCard);
        if (compStyle) {
          if (compStyle.filter && compStyle.filter !== "none") props.filter = compStyle.filter;
          if (compStyle.boxShadow) props.boxShadow = compStyle.boxShadow;
          if (compStyle.borderRadius) props.borderRadius = compStyle.borderRadius;
        }
      } catch (e) {
        console.warn("Lỗi đọc computedStyle thẻ:", e);
      }

      if (typeof sourceIndex === "number" && cachedGeometry) {
        const geo = cachedGeometry;
        const { transform, depth } = ENVELOPE_SCROLL_CONFIG;

        const modalStage3D = elements.modal.querySelector('.stage-3d');
        if (modalStage3D) {
          modalStage3D.style.perspective = `${geo.perspective} px`;
        }

        const scrollPos = forceScrollIndex !== null ? forceScrollIndex : currentScroll;
        const delta = sourceIndex - scrollPos;
        const spacedDelta = delta * (geo.itemSpacingRatio !== undefined ? geo.itemSpacingRatio : 1.0);
        const distFromCenter = Math.abs(spacedDelta);
        const theta = spacedDelta * geo.spiralTightness;

        props.x = Math.sin(theta) * geo.radiusX;
        props.y = spacedDelta * geo.verticalPitch - Math.sin(2 * theta) * geo.curveWaveY + geo.offsetY;
        props.z = (Math.cos(theta) - 1) * geo.radiusZ;

        props.rotateY = -theta * (180 / Math.PI) * transform.rotateYMultiplier + geo.cameraAngleY;
        props.rotateX = geo.cameraTiltX + (delta * transform.rotateXMultiplier * 8);
        props.rotateZ = -Math.sin(theta) * (180 / Math.PI) * transform.rotateZMultiplier;

        const proximity = Math.max(0, 1 - distFromCenter / depth.focalRange);
        const easeProximity = proximity * proximity * (3 - 2 * proximity);

        const isMobile = window.innerWidth <= 768;
        const effectiveActiveScale = isMobile
          ? (transform.mobileActiveScale !== undefined ? transform.mobileActiveScale : 1.05)
          : (transform.activeScale !== undefined ? transform.activeScale : 0.9);
        const effectiveMinScale = isMobile
          ? (transform.mobileMinScale !== undefined ? transform.mobileMinScale : transform.minScale)
          : transform.minScale;

        const cardActualWidth = sourceCard ? sourceCard.offsetWidth : (geo.cardWidth || 440);
        const spiralScale = effectiveMinScale + (effectiveActiveScale - effectiveMinScale) * easeProximity;
        props.scale = (cardActualWidth * spiralScale) / envW;

        if (elements.viewport) {
          const rect = elements.viewport.getBoundingClientRect();
          const stageCenterY = rect.top + rect.height / 2;
          const stageCenterX = rect.left + rect.width / 2;

          let viewportCenterY = window.innerHeight / 2;
          let viewportCenterX = document.documentElement.clientWidth / 2; // Loại trừ chiều rộng của thanh cuộn

          if (elements.modal) {
            const modalRect = elements.modal.getBoundingClientRect();
            if (modalRect.width > 0) {
              viewportCenterX = modalRect.left + modalRect.width / 2;
              viewportCenterY = modalRect.top + modalRect.height / 2;
            }
          }

          props.y += (stageCenterY - viewportCenterY);
          props.x += (stageCenterX - viewportCenterX);
        }

        const blur = depth.enableBlur ? (1 - easeProximity) * depth.maxBlur : 0;
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        let brightness = 1;
        if (isDarkMode) {
          brightness = 1 - (1 - easeProximity) * depth.darkDepthShading;
        } else {
          brightness = 1 + (1 - easeProximity) * depth.lightDepthBrightness;
        }

        if (props.filter === "none" || !props.filter) {
          props.filter = `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
        }
      }
    }
    return props;
  }

  function createEnvelopeTimeline(sourceCard, sourceIndex) {
    if (!window.gsap) {
      console.error("GSAP 3 is required.");
      return null;
    }
    gsap.ticker.lagSmoothing(0);
    if (activeTimeline) {
      activeTimeline.kill();
    }

    const envelopeWrapper = elements.envelopeWrapper;
    const coverFlap = elements.coverFlap;
    const letterContainer = elements.letter3dContainer;
    const faceFront = elements.faceFront;
    const faceBack = elements.faceBack;

    const envW = elements.envelopeObject.offsetWidth || 440;
    const envH = elements.envelopeObject.offsetHeight || 330;
    const initProps = getEnvelopeTargetProps(sourceCard, sourceIndex);

    // Kích thước mục tiêu cuối cùng của lá thư khi mở hoàn toàn
    const targetW = Math.min(600, window.innerWidth * 0.92);
    const targetH = Math.min(760, window.innerHeight * 0.82);
    const targetLeft = (envW - targetW) / 2;
    const targetY = (envH - targetH) / 2 - 14;

    // Chiều rộng khả dụng bên trong phong bì
    const initLetterMargin = Math.round(envW * (20 / 480));
    const pocketInnerW = envW - (initLetterMargin * 2);

    // Tỷ lệ scale ban đầu khi lá thư nằm gọn trong phong bì:
    // Container giữ nguyên targetW từ đầu để layout chữ không bị reflow hay giật dòng khi animate,
    // toàn bộ nội dung (chữ, avatar, stamp) được thu nhỏ bằng scale và phóng to khi mở ra.
    const initScale = Math.min(1, pocketInnerW / targetW);

    // Chiều cao hiển thị trực quan ban đầu trong miệng phong bì
    const initVisualH = Math.round(envH * (240 / 361));
    // Chiều cao container thực tế tương ứng với initScale để đạt được initVisualH
    const initLetterH = Math.round(initVisualH / initScale);

    // Điểm rút thư trượt thẳng lên trên (đáy thư thoát khỏi miệng phong bì)
    const pullUpY = -initVisualH - 45;

    // ⚡ Khởi tạo phong bì Modal với vị trí, tỷ lệ, độ mờ/blur và bóng đổ thực tế
    // THỨ TỰ Z ĐƯỢC CỐ ĐỊNH CHUẨN XÁC THEO HỆ QUY CHIẾU MODAL:
    gsap.set(envelopeWrapper, {
      x: initProps.x,
      y: initProps.y,
      z: initProps.z,
      scale: initProps.scale,
      rotateX: initProps.rotateX,
      rotateY: initProps.rotateY,
      rotateZ: initProps.rotateZ,
      boxShadow: initProps.boxShadow,
      borderRadius: "6px",
      opacity: 1
    });

    // 1. Mặt trước phong bì (nằm ngoài cùng khi nhìn ở mặt 0deg)
    gsap.set(faceFront, {
      rotateY: 0,
      z: 1,
      opacity: 1
    });

    // 2. Lưng trong lót đáy (nằm sau cùng khi nhìn ở mặt 180deg)
    if (elements.envelopeLiner) {
      gsap.set(elements.envelopeLiner, {
        rotateY: 180,
        z: -1,
        opacity: 1
      });
    }

    // Gắn filter vào các thành phần con thay vì wrapper để giữ được preserve-3d
    const envelopeFaces = [faceFront, faceBack, coverFlap, elements.envelopeLiner].filter(Boolean);
    gsap.set(envelopeFaces, { filter: initProps.filter });

    // 3. Ruột thư (nằm kẹp giữa lưng lót đáy z:-1 và túi trước z:-3)
    // Cố định width = targetW và left = targetLeft, scale thu nhỏ theo initScale
    gsap.set(letterContainer, {
      y: 0,
      z: -2,
      rotateY: 180,
      transformOrigin: "50% 0%",
      left: targetLeft,
      width: targetW,
      height: initLetterH,
      scale: initScale,
      opacity: 1,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
      overflowY: "hidden"
    });

    const letterScroll = letterContainer.querySelector(".letter-content-scroll");
    if (letterScroll) {
      gsap.set(letterScroll, { overflowY: "hidden" });
      letterScroll.scrollTop = 0;
    }

    // 4. Túi trước của mặt sau (bao phủ che nửa dưới ruột thư)
    gsap.set(faceBack, {
      rotateY: 180,
      z: -3,
      opacity: 1
    });

    // 5. Nắp mở phong bì (khi đóng nằm ngoài cùng z:-4)
    gsap.set(coverFlap, {
      rotateY: 180,
      rotateX: 0,
      scaleY: 1,
      z: -4,
      transformOrigin: "50% 0%"
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut" }
    });

    // ⚡ GIAI ĐOẠN 1: Thư bay từ đúng tọa độ, góc xoay 3D, làm sáng/rõ nét từ độ mờ/blur hiện tại về chính giữa tâm màn hình
    tl.to(envelopeWrapper, {
      x: 0,
      y: 0,
      z: 40,
      scale: 1,
      rotateX: 0,
      rotateY: 180,
      rotateZ: 0,
      opacity: 1,
      boxShadow: "0 22px 55px rgba(0, 0, 0, 0.55)",
      borderRadius: "6px",
      duration: 0.65,
      ease: "power2.out"
    })
      .to(envelopeFaces, {
        filter: "blur(0px) brightness(1)",
        duration: 0.65,
        ease: "power2.out"
      }, "<")
      .to(coverFlap, {
        rotateX: 180,
        z: -1, // Đẩy nắp ra phía sau ruột thư (ruột thư đang ở z: -2)
        duration: 0.75,
        ease: "power2.inOut"
      }, "<")

      // ⚡ GIAI ĐOẠN 2 & 3: Rút thư lên trên và mở hoàn toàn (Scale & Chiều cao)
      .addLabel("pullOut", 0.65)
      // 1. Rút thư trượt thẳng lên trên thoát khỏi miệng túi phong bì
      .to(letterContainer, {
        y: pullUpY,
        duration: 0.45,
        ease: "power2.out"
      }, "pullOut")
      // 2. Đưa lá thư ra lớp trước ngoài cùng sau khi đáy thư đã rút thoát khỏi miệng túi
      .set(letterContainer, { z: -6 }, "pullOut+=0.38")
      // 3. Phóng to thư bằng scale (ảnh hưởng đều toàn bộ chữ & icon mà không reflow text)
      //    và đồng thời mở rộng chiều cao container để mở hoàn toàn lá thư
      .to(letterContainer, {
        scale: 1,
        height: targetH,
        duration: 0.8,
        ease: "power2.out"
      }, "pullOut+=0.35")
      // 4. Đồng thời trượt y xuống đúng vị trí trung tâm hiển thị
      .to(letterContainer, {
        y: targetY,
        boxShadow: "0 28px 70px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        duration: 0.8,
        ease: "power2.out"
      }, "pullOut+=0.35")

      // ⚡ GIAI ĐOẠN 4: Hiện các nút điều hướng sau khi hoạt ảnh hoàn tất
      .to([elements.modalCloseBtn, elements.modalPrevBtn, elements.modalNextBtn].filter(Boolean), {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out"
      });

    tl.add(() => {
      gsap.set(letterContainer, { overflowY: "hidden" });
      if (letterScroll) {
        gsap.set(letterScroll, { overflowY: "auto" });
      }
    });

    return tl;
  }

  let originalOpenedIndex = -1; // Lưu lại index gốc khi mở

  function openFeedbackModal(index, cardEl) {
    if (!filteredFeedbacks[index]) return;

    currentIndex = index;
    originalOpenedIndex = index;
    activeCardElement = cardEl || null;
    savedScrollY = window.scrollY;

    const f = filteredFeedbacks[currentIndex];
    populateModalDetails(f);

    elements.modal.classList.add("active");
    document.body.classList.add("envelope-modal-open");
    document.documentElement.classList.add("envelope-modal-open");

    if (activeCardElement) {
      activeCardElement.style.opacity = "0";
    }

    gsap.set([elements.modalCloseBtn, elements.modalPrevBtn, elements.modalNextBtn].filter(Boolean), {
      opacity: 0,
      pointerEvents: "none"
    });

    activeTimeline = createEnvelopeTimeline(activeCardElement, currentIndex);
    if (activeTimeline) {
      activeTimeline.play();
    }
  }

  function closeFeedbackModal() {
    if (!elements.modal.classList.contains("active")) return;

    if (activeTimeline) {
      activeTimeline.kill();
    }

    // Tắt hiệu ứng transition của CSS để đóng modal ngay lập tức
    elements.modal.style.transition = "none";

    finishCloseModal();

    // Khôi phục lại transition sau một khoảng trễ nhỏ để lần mở tiếp theo vẫn có hiệu ứng fade-in
    setTimeout(() => {
      elements.modal.style.transition = "";
    }, 50);
  }

  function finishCloseModal() {
    elements.modal.classList.remove("active");
    document.body.classList.remove("envelope-modal-open");
    document.documentElement.classList.remove("envelope-modal-open");
    if (activeCardElement) {
      activeCardElement.style.opacity = "";
      if (cardDomStates[currentIndex]) cardDomStates[currentIndex].opacity = null;
      activeCardElement = null;
    }
    update3DPositions();
  }

  function showNextFeedback() {
    if (filteredFeedbacks.length <= 1) return;
    const nextIdx = (currentIndex + 1) % filteredFeedbacks.length;
    switchModalFeedbackContent(nextIdx);
  }

  function showPrevFeedback() {
    if (filteredFeedbacks.length <= 1) return;
    const prevIdx = (currentIndex - 1 + filteredFeedbacks.length) % filteredFeedbacks.length;
    switchModalFeedbackContent(prevIdx);
  }

  function switchModalFeedbackContent(newIndex) {
    currentIndex = newIndex;
    const f = filteredFeedbacks[currentIndex];

    const envH = elements.envelopeObject.offsetHeight || 330;
    const targetH = Math.min(760, window.innerHeight * 0.82);
    const targetY = (envH - targetH) / 2 - 14;

    gsap.to(elements.letter3dContainer, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        populateModalDetails(f);
        if (elements.letter3dContainer) {
          elements.letter3dContainer.scrollTop = 0;
          const scrollInner = elements.letter3dContainer.querySelector(".letter-content-scroll");
          if (scrollInner) scrollInner.scrollTop = 0;
        }
        gsap.fromTo(elements.letter3dContainer,
          { opacity: 0, y: targetY + 20 },
          { opacity: 1, y: targetY, duration: 0.25, ease: "power2.out" }
        );
      }
    });

    const targetCard = elements.envelopeGrid.querySelector(`.envelope-card[data-index="${currentIndex}"]`);
    if (targetCard) {
      if (activeCardElement) activeCardElement.style.opacity = "1";
      activeCardElement = targetCard;
      activeCardElement.style.opacity = "0";
    }

    // Tự động cuộn nền phía sau (quỹ đạo) tới đúng vị trí của phong bì mới
    if (window._animTriggerInstance) {
      const initialScrollOffset = ENVELOPE_SCROLL_CONFIG.physics.initialScrollOffset !== undefined ? ENVELOPE_SCROLL_CONFIG.physics.initialScrollOffset : -5;
      const finalScrollOffset = ENVELOPE_SCROLL_CONFIG.physics.finalScrollOffset !== undefined ? ENVELOPE_SCROLL_CONFIG.physics.finalScrollOffset : 3;
      const maxScroll = filteredFeedbacks.length - 1;
      const scrollRange = (maxScroll + finalScrollOffset) - initialScrollOffset;

      if (scrollRange > 0) {
        const progress = (newIndex - initialScrollOffset) / scrollRange;
        const st = window._animTriggerInstance;
        const targetY = st.start + progress * (st.end - st.start);

        // Cập nhật lại savedScrollY để khi đóng modal sẽ ở vị trí mới
        savedScrollY = targetY;

        // Cuộn cửa sổ tới vị trí này để trigger ScrollTrigger cập nhật
        window.scrollTo({ top: targetY, behavior: "instant" });
        ScrollTrigger.update();
      }
    }
  }

  function initModalEvents() {
    if (elements.modalCloseBtn) elements.modalCloseBtn.addEventListener("click", closeFeedbackModal);
    if (elements.modalPrevBtn) elements.modalPrevBtn.addEventListener("click", showPrevFeedback);
    if (elements.modalNextBtn) elements.modalNextBtn.addEventListener("click", showNextFeedback);

    document.addEventListener("keydown", (e) => {
      if (!elements.modal || !elements.modal.classList.contains("active")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeFeedbackModal();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextFeedback();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevFeedback();
      }
    });

    if (elements.modal) {
      elements.modal.addEventListener("click", (e) => {
        if (e.target === elements.modal) {
          closeFeedbackModal();
        }
      });
    }
  }

  // =========================================================================
  // 10. BẢNG ĐIỀU KHIỂN TRỰC QUAN TRÊN MÀN HÌNH (LIVE INTERACTIVE TUNER UI)
  // =========================================================================
  function createLiveTunerUI() {
    const isEnabled = ENVELOPE_SCROLL_CONFIG && (
      (ENVELOPE_SCROLL_CONFIG.devMode && (ENVELOPE_SCROLL_CONFIG.devMode.showLiveTuner || ENVELOPE_SCROLL_CONFIG.devMode.showConfigToggle)) ||
      ENVELOPE_SCROLL_CONFIG.showLiveTuner ||
      ENVELOPE_SCROLL_CONFIG.showConfigToggle
    );
    if (!isEnabled) return;
    if (document.getElementById("envelopeLiveTuner")) return;

    const panel = document.createElement("div");
    panel.id = "envelopeLiveTuner";
    panel.className = "motion-tuner-panel envelope-tuner-panel";

    panel.innerHTML = `
      <div class="motion-tuner-body">
        <div class="motion-tuner-group-title">1. Không gian Container (Container Geometry)</div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Item Spacing Desktop</span>
            <span class="motion-tuner-val" id="val_itemSpacingRatio">${Math.round((ENVELOPE_SCROLL_CONFIG.geometry.itemSpacingRatio !== undefined ? ENVELOPE_SCROLL_CONFIG.geometry.itemSpacingRatio : 1.0) * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_itemSpacingRatio" min="0.20" max="3.00" step="0.05" value="${ENVELOPE_SCROLL_CONFIG.geometry.itemSpacingRatio !== undefined ? ENVELOPE_SCROLL_CONFIG.geometry.itemSpacingRatio : 1.0}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Item Spacing Mobile</span>
            <span class="motion-tuner-val" id="val_mobileItemSpacingRatio">${Math.round((ENVELOPE_SCROLL_CONFIG.geometry.mobileItemSpacingRatio !== undefined ? ENVELOPE_SCROLL_CONFIG.geometry.mobileItemSpacingRatio : 1.15) * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_mobileItemSpacingRatio" min="0.20" max="3.00" step="0.05" value="${ENVELOPE_SCROLL_CONFIG.geometry.mobileItemSpacingRatio !== undefined ? ENVELOPE_SCROLL_CONFIG.geometry.mobileItemSpacingRatio : 1.15}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Radius X Ratio (% Width)</span>
            <span class="motion-tuner-val" id="val_radiusXRatio">${Math.round(ENVELOPE_SCROLL_CONFIG.geometry.radiusXRatio * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_radiusXRatio" min="0.05" max="1.50" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.geometry.radiusXRatio}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Radius Z Ratio (% Width)</span>
            <span class="motion-tuner-val" id="val_radiusZRatio">${Math.round(ENVELOPE_SCROLL_CONFIG.geometry.radiusZRatio * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_radiusZRatio" min="0.01" max="1.20" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.geometry.radiusZRatio}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Vertical Pitch (% Height)</span>
            <span class="motion-tuner-val" id="val_verticalPitchRatio">${Math.round(ENVELOPE_SCROLL_CONFIG.geometry.verticalPitchRatio * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_verticalPitchRatio" min="0.02" max="1.00" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.geometry.verticalPitchRatio}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Card Width (% Width Desktop)</span>
            <span class="motion-tuner-val" id="val_cardWidthRatio">${Math.round(ENVELOPE_SCROLL_CONFIG.geometry.cardWidthRatio * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_cardWidthRatio" min="0.05" max="0.90" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.geometry.cardWidthRatio}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Card Width Mobile (% Width)</span>
            <span class="motion-tuner-val" id="val_mobileCardWidthRatio">${Math.round((ENVELOPE_SCROLL_CONFIG.geometry.mobileCardWidthRatio !== undefined ? ENVELOPE_SCROLL_CONFIG.geometry.mobileCardWidthRatio : 0.58) * 100)}%</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_mobileCardWidthRatio" min="0.10" max="1.00" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.geometry.mobileCardWidthRatio !== undefined ? ENVELOPE_SCROLL_CONFIG.geometry.mobileCardWidthRatio : 0.58}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Spiral Tightness (Độ xoắn)</span>
            <span class="motion-tuner-val" id="val_spiralTightness">${ENVELOPE_SCROLL_CONFIG.geometry.spiralTightness}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_spiralTightness" min="-3" max="3.00" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.geometry.spiralTightness}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Camera Tilt X (Góc nghiêng)</span>
            <span class="motion-tuner-val" id="val_cameraTiltX">${ENVELOPE_SCROLL_CONFIG.geometry.cameraTiltX}°</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_cameraTiltX" min="-60" max="60" step="1" value="${ENVELOPE_SCROLL_CONFIG.geometry.cameraTiltX}">
        </div>

        <div class="motion-tuner-group-title">2. Biến dạng thẻ (Transform)</div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Active Scale (Phóng to Desktop)</span>
            <span class="motion-tuner-val" id="val_activeScale">${ENVELOPE_SCROLL_CONFIG.transform.activeScale}x</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_activeScale" min="0.2" max="3.0" step="0.02" value="${ENVELOPE_SCROLL_CONFIG.transform.activeScale}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Active Scale Mobile</span>
            <span class="motion-tuner-val" id="val_mobileActiveScale">${ENVELOPE_SCROLL_CONFIG.transform.mobileActiveScale !== undefined ? ENVELOPE_SCROLL_CONFIG.transform.mobileActiveScale : 1.05}x</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_mobileActiveScale" min="0.2" max="3.0" step="0.02" value="${ENVELOPE_SCROLL_CONFIG.transform.mobileActiveScale !== undefined ? ENVELOPE_SCROLL_CONFIG.transform.mobileActiveScale : 1.05}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Base Scale Mobile</span>
            <span class="motion-tuner-val" id="val_mobileBaseScale">${ENVELOPE_SCROLL_CONFIG.transform.mobileBaseScale !== undefined ? ENVELOPE_SCROLL_CONFIG.transform.mobileBaseScale : 0.95}x</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_mobileBaseScale" min="0.2" max="3.0" step="0.02" value="${ENVELOPE_SCROLL_CONFIG.transform.mobileBaseScale !== undefined ? ENVELOPE_SCROLL_CONFIG.transform.mobileBaseScale : 0.95}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Min Scale (Thu nhỏ ở xa)</span>
            <span class="motion-tuner-val" id="val_minScale">${ENVELOPE_SCROLL_CONFIG.transform.minScale}x</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_minScale" min="0.02" max="1.5" step="0.01" value="${ENVELOPE_SCROLL_CONFIG.transform.minScale}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Rotate Y Multiplier (Xoay Y)</span>
            <span class="motion-tuner-val" id="val_rotateYMultiplier">${ENVELOPE_SCROLL_CONFIG.transform.rotateYMultiplier}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_rotateYMultiplier" min="-2.0" max="4.0" step="0.05" value="${ENVELOPE_SCROLL_CONFIG.transform.rotateYMultiplier}">
        </div>

        <div class="motion-tuner-group-title">3. Chiều sâu & Mờ (Depth & Blur)</div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Focal Range (Vùng rõ)</span>
            <span class="motion-tuner-val" id="val_focalRange">${ENVELOPE_SCROLL_CONFIG.depth.focalRange}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_focalRange" min="0.5" max="10.0" step="0.1" value="${ENVELOPE_SCROLL_CONFIG.depth.focalRange}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Max Blur (Mờ cực đại)</span>
            <span class="motion-tuner-val" id="val_maxBlur">${ENVELOPE_SCROLL_CONFIG.depth.maxBlur}px</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_maxBlur" min="0" max="100" step="0.5" value="${ENVELOPE_SCROLL_CONFIG.depth.maxBlur}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Dark Mode Shading</span>
            <span class="motion-tuner-val" id="val_darkDepthShading">${ENVELOPE_SCROLL_CONFIG.depth.darkDepthShading}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_darkDepthShading" min="0.0" max="1.0" step="0.05" value="${ENVELOPE_SCROLL_CONFIG.depth.darkDepthShading}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Light Mode Brightness</span>
            <span class="motion-tuner-val" id="val_lightDepthBrightness">${ENVELOPE_SCROLL_CONFIG.depth.lightDepthBrightness}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_lightDepthBrightness" min="0.0" max="2.0" step="0.1" value="${ENVELOPE_SCROLL_CONFIG.depth.lightDepthBrightness}">
        </div>

        <div class="motion-tuner-group-title">4. Cuộn & Quán tính (Scroll & Physics)</div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Scroll Dist / Item (Độ dài cuộn)</span>
            <span class="motion-tuner-val" id="val_scrollDistancePerItem">${ENVELOPE_SCROLL_CONFIG.physics.scrollDistancePerItem}px</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_scrollDistancePerItem" min="10" max="800" step="5" value="${ENVELOPE_SCROLL_CONFIG.physics.scrollDistancePerItem}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Start Offset (Bắt đầu cuộn)</span>
            <span class="motion-tuner-val" id="val_initialScrollOffset">${ENVELOPE_SCROLL_CONFIG.physics.initialScrollOffset}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_initialScrollOffset" min="-15" max="0" step="1" value="${ENVELOPE_SCROLL_CONFIG.physics.initialScrollOffset}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>End Offset (Kết thúc bay)</span>
            <span class="motion-tuner-val" id="val_finalScrollOffset">${ENVELOPE_SCROLL_CONFIG.physics.finalScrollOffset}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_finalScrollOffset" min="0" max="15" step="1" value="${ENVELOPE_SCROLL_CONFIG.physics.finalScrollOffset}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Early Unpin (Bỏ ghim sớm)</span>
            <span class="motion-tuner-val" id="val_earlyUnpinItems">${ENVELOPE_SCROLL_CONFIG.physics.earlyUnpinItems}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_earlyUnpinItems" min="0" max="25" step="1" value="${ENVELOPE_SCROLL_CONFIG.physics.earlyUnpinItems}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Trigger Start %</span>
            <span class="motion-tuner-val" id="val_scrollTriggerStart">${ENVELOPE_SCROLL_CONFIG.physics.scrollTriggerStart}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_scrollTriggerStart" min="0" max="100" step="1" value="${parseInt((ENVELOPE_SCROLL_CONFIG.physics.scrollTriggerStart || 'top 60%').replace(/[^0-9]/g, '')) || 0}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Wheel Sensitivity</span>
            <span class="motion-tuner-val" id="val_wheelSensitivity">${(ENVELOPE_SCROLL_CONFIG.physics.wheelSensitivity * 10000).toFixed(1)}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_wheelSensitivity" min="0.00005" max="0.0100" step="0.00005" value="${ENVELOPE_SCROLL_CONFIG.physics.wheelSensitivity}">
        </div>

        <div class="motion-tuner-row">
          <div class="motion-tuner-label-wrap">
            <span>Damping (Độ mượt quán tính)</span>
            <span class="motion-tuner-val" id="val_damping">${ENVELOPE_SCROLL_CONFIG.physics.damping}</span>
          </div>
          <input type="range" class="motion-tuner-slider" id="sld_damping" min="0.005" max="1.00" step="0.005" value="${ENVELOPE_SCROLL_CONFIG.physics.damping}">
        </div>
      </div>

      <div class="motion-tuner-actions">
        <button class="motion-tuner-btn motion-tuner-btn-secondary" id="btnResetTuner" title="Khôi phục thông số mặc định">Reset</button>
        <button class="motion-tuner-btn" id="btnExportConfig" title="Sao chép toàn bộ JSON cấu hình vào bộ nhớ tạm">📋 Copy JSON</button>
      </div>
  `;

    document.body.appendChild(panel);

    const toast = document.createElement("div");
    toast.className = "motion-tuner-toast";
    toast.textContent = "✓ Đã sao chép ENVELOPE_SCROLL_CONFIG vào Clipboard!";
    document.body.appendChild(toast);

    function showToast(msg) {
      if (msg) toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }

    function bindSlider(id, section, key, unit = "", multiplier = 1, isFloat = false, isPercent = false) {
      const sld = panel.querySelector(`#sld_${id} `);
      const valEl = panel.querySelector(`#val_${id} `);
      if (!sld || !valEl) return;

      sld.addEventListener("input", () => {
        const val = isFloat ? parseFloat(sld.value) : parseInt(sld.value, 10);
        ENVELOPE_SCROLL_CONFIG[section][key] = val * multiplier;
        if (isPercent) {
          valEl.textContent = `${Math.round(val * 100)}% `;
        } else if (key === "wheelSensitivity") {
          valEl.textContent = `${(val * 10000).toFixed(1)} `;
        } else {
          valEl.textContent = `${sld.value}${unit} `;
        }

        if (section === "physics") {
          setupScrollTrigger();
        } else {
          updateCachedGeometry();
          update3DPositions();
          if (scrollTriggerInstance) scrollTriggerInstance.refresh();
          wakeUpPhysicsLoop();
        }
      });
    }

    bindSlider("itemSpacingRatio", "geometry", "itemSpacingRatio", "", 1, true, true);
    bindSlider("mobileItemSpacingRatio", "geometry", "mobileItemSpacingRatio", "", 1, true, true);
    bindSlider("radiusXRatio", "geometry", "radiusXRatio", "", 1, true, true);
    bindSlider("radiusZRatio", "geometry", "radiusZRatio", "", 1, true, true);
    bindSlider("verticalPitchRatio", "geometry", "verticalPitchRatio", "", 1, true, true);
    bindSlider("cardWidthRatio", "geometry", "cardWidthRatio", "", 1, true, true);
    bindSlider("mobileCardWidthRatio", "geometry", "mobileCardWidthRatio", "", 1, true, true);
    bindSlider("spiralTightness", "geometry", "spiralTightness", "", 1, true);
    bindSlider("cameraTiltX", "geometry", "cameraTiltX", "°");

    bindSlider("activeScale", "transform", "activeScale", "x", 1, true);
    bindSlider("mobileActiveScale", "transform", "mobileActiveScale", "x", 1, true);
    bindSlider("mobileBaseScale", "transform", "mobileBaseScale", "x", 1, true);
    bindSlider("minScale", "transform", "minScale", "x", 1, true);
    bindSlider("rotateYMultiplier", "transform", "rotateYMultiplier", "", 1, true);

    bindSlider("focalRange", "depth", "focalRange", "", 1, true);
    bindSlider("maxBlur", "depth", "maxBlur", "px", 1, true);
    bindSlider("darkDepthShading", "depth", "darkDepthShading", "", 1, true);
    bindSlider("lightDepthBrightness", "depth", "lightDepthBrightness", "", 1, true);

    bindSlider("scrollDistancePerItem", "physics", "scrollDistancePerItem", "px");
    bindSlider("initialScrollOffset", "physics", "initialScrollOffset");
    bindSlider("finalScrollOffset", "physics", "finalScrollOffset");
    bindSlider("earlyUnpinItems", "physics", "earlyUnpinItems");
    bindSlider("wheelSensitivity", "physics", "wheelSensitivity", "", 1, true);
    bindSlider("damping", "physics", "damping", "", 1, true);

    const triggerStartSlider = panel.querySelector("#sld_scrollTriggerStart");
    const triggerStartVal = panel.querySelector("#val_scrollTriggerStart");
    if (triggerStartSlider && triggerStartVal) {
      triggerStartSlider.addEventListener("input", () => {
        const val = parseInt(triggerStartSlider.value, 10);
        ENVELOPE_SCROLL_CONFIG.physics.scrollTriggerStart = `top ${val}% `;
        triggerStartVal.textContent = `top ${val}% `;
        setupScrollTrigger();
      });
    }

    const btnExport = panel.querySelector("#btnExportConfig");
    btnExport.addEventListener("click", () => {
      const jsonStr = "const ENVELOPE_SCROLL_CONFIG = " + JSON.stringify(ENVELOPE_SCROLL_CONFIG, null, 2) + ";";
      navigator.clipboard.writeText(jsonStr).then(() => {
        showToast("✓ Đã sao chép cấu hình JSON vào Clipboard!");
      }).catch(() => {
        showToast("✓ Đã in cấu hình ra Console!");
        // console.log("ENVELOPE_SCROLL_CONFIG:", ENVELOPE_SCROLL_CONFIG);
      });
    });

    const btnReset = panel.querySelector("#btnResetTuner");
    btnReset.addEventListener("click", () => {
      Object.assign(ENVELOPE_SCROLL_CONFIG, JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
      panel.remove();
      toast.remove();
      createLiveTunerUI();
      updateCachedGeometry();
      update3DPositions();
      wakeUpPhysicsLoop();
      showToast("↺ Đã khôi phục thông số mặc định");
    });
  }

  // =========================================================================
  // 11. KHỞI CHẠY ỨNG DỤNG (APPLICATION ENTRY POINT)
  // =========================================================================
  function initApp() {
    ensureDependencies(() => {
      const hasGallery = ensureGalleryDOM();
      if (!hasGallery) return;

      ensureModalDOM();
      bindElements();
      initModalEvents();
      initInteractionEvents();
      loadFeedbacks();
      createLiveTunerUI();
    });

    window.addEventListener("load", () => {
      if (typeof ScrollTrigger !== "undefined") {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

  // Expose global controller for developers
  window.__envelopeDemo = {
    get config() { return ENVELOPE_SCROLL_CONFIG; },
    get allFeedbacks() { return allFeedbacks; },
    get activeTimeline() { return activeTimeline; },
    get currentScroll() { return currentScroll; },
    set targetScroll(val) {
      targetScroll = val;
      wakeUpPhysicsLoop();
    },
    openFeedbackModal,
    closeFeedbackModal,
    showNextFeedback,
    showPrevFeedback,
    updateCachedGeometry,
    update3DPositions
  };

})();
