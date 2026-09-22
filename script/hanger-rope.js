/**
 * Interactive Physics Rope & Hanging Photos (Quy trình tham dự)
 * UXCamp Vietnam
 * 
 * Tính năng chính:
 * 1. Mô phỏng vật lý sợi dây bằng thuật toán Verlet Integration (Rope Dynamics)
 * 2. Tương tác khi cuộn trang (Scroll Impulse & Wave Inertia)
 * 3. Tương tác kéo thả chuột / cảm ứng (Interactive Drag & Rebound):
 *    - Kéo trực tiếp vào sợi dây: dây uốn cong theo tay kéo và bật nảy khi thả
 *    - Cầm nắm trực tiếp từng bức ảnh: ảnh xoay theo góc tay kéo, kéo căng sợi dây
 * 4. Hiệu ứng con lắc (Pendulum Sway) cho từng bức ảnh:
 *    - Tự động dao động theo gia tốc của điểm treo trên dây
 *    - Nghiêng tự nhiên theo độ dốc tiếp tuyến của dây
 * 5. Hiệu ứng gió thoảng tự nhiên (Idle Gentle Breeze): lắc nhẹ sống động
 * 6. Điều hướng mượt mà: Click vào các thẻ tag ("Đăng ký ↗", "Orientation ↗", ...)
 *    sẽ cuộn mượt xuống đúng card quy trình tương ứng
 * 7. Bộ cấu hình tập trung HANGER_ROPE_CONFIG dễ dàng tinh chỉnh
 */

(function () {
    'use strict';



    // =========================================================================
    // 0. BẬT / TẮT BẢNG ĐIỀU KHIỂN CẤU HÌNH TRÊN UI (CONFIG PANEL TOGGLE)
    // Đặt true để hiển thị nút "⚙️ Chỉnh vật lý dây", đặt false để ẩn hoàn toàn.
    // =========================================================================
    const ENABLE_CONFIG_PANEL = false;
    window.ENABLE_HANGER_CONFIG_PANEL = ENABLE_CONFIG_PANEL;

    // =========================================================================
    // 1. CẤU HÌNH VẬT LÝ VÀ DỮ LIỆU (CONFIGURATION)
    // Toàn bộ cấu hình luôn lấy từ DEFAULT_CONFIG trong code (không dùng localStorage)
    // =========================================================================

    const DEFAULT_CONFIG = {
        // Cấu hình chế độ phát triển (Developer Mode)
        "devMode": {
            "showLiveTuner": false // Bật/tắt giao diện tùy chỉnh thông số trực tiếp (GUI Live Tuner)
        },
        // Cấu hình vật lý & giao diện sợi dây (Rope Physics & Styling)
        "rope": {
            "pointCount": 16,            // Số lượng nút/điểm mô phỏng trên dây (càng cao dây càng mềm mượt nhưng tốn CPU)
            "stiffness": 0.85,           // Độ cứng/co giãn của dây (0.0 - 1.0)
            "constraintIterations": 8,   // Số lần lặp giải độ dài liên kết giữa các điểm (giữ độ ổn định chiều dài dây)
            "gravity": 1.5,              // Trọng lực kéo dây xuống
            "damping": 0.9,              // Hệ số cản/ma sát của dây (giảm chấn gia tốc qua thời gian)
            "sagRatio": 0.05,            // Tỷ lệ độ võng tự nhiên của dây khi ở trạng thái nghỉ
            "restoreSpeed": 0.077,       // Tốc độ dây đàn hồi trở lại hình dạng võng ban đầu
            "color": "#b5a184",          // Mã màu hiển thị của sợi dây
            "shadowColor": "rgba(40, 25, 10, 0)", // Màu và độ trong suốt của bóng đổ bên dưới dây
            "highlightColor": "#e8decb",   // Màu của đường viền phản quang/sáng trên thân dây
            "lineWidth": 2,              // Độ dày nét vẽ sợi dây (pixel)
            "pinOffsetTop": 28           // Khoảng cách cố định từ mép trên khung chứa đến 2 điểm ghim đầu dây (px)
        },
        // Cấu hình phản hồi khi cuộn trang (Scroll Physics)
        "scroll": {
            "influence": 0.1,  // Mức độ ảnh hưởng của thao tác cuộn trang tới lực tác động lên dây
            "maxImpulse": 6,   // Giới hạn xung lực tối đa từ cuộn trang (tránh dây đung đưa quá mạnh)
            "damping": 0.85    // Hệ số giảm chấn xung lực cuộn theo thời gian
        },
        // Cấu hình tương tác kéo rê bằng chuột / cảm ứng (Drag / Touch Interaction)
        "drag": {
            "radius": 400,          // Bán kính vùng tác động tương tác xung quanh con trỏ (px)
            "strength": 0.78,       // Mức độ mạnh của lực kéo dây theo con trỏ chuột
            "releaseImpulse": 1.4,  // Xung lực nẩy ban đầu khi thả chuột khỏi dây
            "cardPullStrength": 0.5 // Mức độ kéo lệch dây khi người dùng nắm trực tiếp các thẻ treo
        },
        // Cấu hình hiệu ứng lắc/đung đưa của các thẻ treo (Card Items Sway & 3D Rotation)
        "itemsSway": {
            "swayAxis": "depth",         // Trục lắc chính ("depth" cho hiệu ứng lắc chiều sâu 3D)
            "depthSwayEnabled": true,    // Bật/tắt hiệu ứng đung đưa 3D theo trục Z
            "depthFrequency": 0.04,      // Tần số / tốc độ dao động đung đưa 3D
            "depthDamping": 0.96,        // Hệ số dập tắt dao động đung đưa 3D
            "depthMaxAngleDeg": 53,      // Góc xoay nghiêng 3D tối đa của thẻ (độ - deg)
            "depthScrollInfluence": 1,   // Mức độ tác động của cuộn trang lên độ lắc 3D
            "depthScrollFlutter": 0.011, // Độ rung lắc nhè nhẹ (flutter) tạo ra khi cuộn trang
            "depthScrollWaveFreq": 0.016,// Tần số sóng dao động lan truyền khi cuộn trang nhanh
            "depthScrollBias": 0.18,     // Độ nghiêng thiên vị cố định theo chiều cuộn trang
            "depthBreezeInfluence": 10,  // Mức độ ảnh hưởng của gió (breeze) đến độ đung đưa 3D
            "depthInertiaFactor": 0.2,   // Quán tính xoay nghiêng 3D của thẻ khi di chuyển
            "depthReleaseImpulse": 0.7,  // Xung lực xoay 3D tạo ra khi thả kéo dây
            "perspective": 900,          // Khoảng cách góc nhìn 3D (CSS perspective px)
            "rollStrength": 0,           // Độ cuộn/xoay nghiêng nhẹ theo chiều ngang (roll)
            "frequency": 0.035,          // Tần số lắc 2D chuẩn
            "damping": 0.958,            // Hệ số dập tắt lắc 2D
            "inertiaFactor": 1.6,        // Hệ số quán tính lắc 2D
            "tangentInfluence": 0.62,    // Mức độ ảnh hưởng từ độ nghiêng tiếp tuyến của dây lên góc thẻ
            "maxAngleDeg": 46            // Góc lắc 2D tối đa (độ)
        },
        // Cấu hình hiệu ứng gió đung đưa tự nhiên (Natural Breeze Simulation)
        "breeze": {
            "enabled": false,   // Bật/tắt hiệu ứng gió tự nhiên đung đưa dây
            "strength": 0.8,    // Cường độ / lực đẩy của gió
            "speed": 0.0018     // Tốc độ biến thiên/thay đổi hướng gió theo thời gian
        },
        // Danh sách các thẻ (items) treo trên dây
        "items": [
            {
                "id": "step-1",                     // ID duy nhất đại diện cho thẻ
                "title": "Đăng ký",                 // Tiêu đề hiển thị trên thẻ
                "imageUrl": "asset/icon/rope-img-01.webp", // Đường dẫn ảnh minh họa cho thẻ
                "ropePosition": 0.1,                // Vị trí gắn thẻ trên dây (tỷ lệ từ 0.0 ở đầu dây đến 1.0 ở cuối dây)
                "widthDesktop": 225,                // Chiều rộng thẻ trên màn hình Desktop (px)
                "widthMobile": 50,                  // Chiều rộng thẻ trên màn hình Mobile (px)
                "baseAngle": 5,                     // Góc xoay nghiêng tự nhiên ban đầu của thẻ (độ)
                "targetSelector": ".wrapper-1"      // Selector CSS của phần tử DOM liên kết
            },
            {
                "id": "step-2",
                "title": "Orientation",
                "imageUrl": "asset/icon/rope-img-02.webp",
                "ropePosition": 0.3,
                "widthDesktop": 220,
                "widthMobile": 50,
                "baseAngle": 3,
                "targetSelector": ".wrapper-2"
            },
            {
                "id": "step-3",
                "title": "Học hành",
                "imageUrl": "asset/icon/rope-img-03.webp",
                "ropePosition": 0.5,
                "widthDesktop": 340,
                "widthMobile": 70,
                "baseAngle": -4.86,
                "targetSelector": ".wrapper-3"
            },
            {
                "id": "step-4",
                "title": "Bảo vệ",
                "imageUrl": "asset/icon/rope-img-04.webp",
                "ropePosition": 0.71,
                "widthDesktop": 320,
                "widthMobile": 70,
                "baseAngle": 0.12,
                "targetSelector": ".wrapper-4"
            },
            {
                "id": "step-5",
                "title": "Về bờ",
                "imageUrl": "asset/icon/rope-img-05.webp",
                "ropePosition": 0.9,
                "widthDesktop": 355,
                "widthMobile": 70,
                "baseAngle": -5,
                "targetSelector": ".wrapper-5"
            }
        ]
    };
    window.HANGER_ROPE_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

    // =========================================================================
    // 2. CLASS MÔ PHỎNG VẬT LÝ DÂY TREO (VERLET ROPE SIMULATOR)
    // =========================================================================
    class HangerRopeSimulator {
        constructor(containerEl) {
            this.container = containerEl;
            this.canvas = containerEl.querySelector('#hanger-rope-canvas');
            this.itemsLayer = containerEl.querySelector('#hanger-items-layer');
            this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

            this.width = 0;
            this.height = 0;
            this.canvasBufferY = 250;
            // Giới hạn dpr tối đa là 2 để tối ưu bộ nhớ GPU và fill rate trên màn hình 3x/4K/Retina
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            this.points = [];
            this.segmentLength = 0;
            this.itemInstances = [];

            // Quán tính cuộn trang & nhịp lắc khi đang cuộn (Scroll Flutter)
            this.lastScrollY = window.scrollY || window.pageYOffset;
            this.scrollImpulse = 0;
            this.scrollSpeed = 0;
            this.smoothScrollSpeed = 0;
            this.scrollWavePhase = 0;

            // Kéo thả chuột / chạm
            this.isDragging = false;
            this.hasDragged = false;
            this.dragStartClientX = 0;
            this.dragStartClientY = 0;
            this.dragItemInstance = null;
            this.dragItemGrabOffsetY = 0;
            this.pointerX = 0;
            this.pointerY = 0;
            this.pointerVelocityX = 0;
            this.pointerVelocityY = 0;

            // Đồng hồ gió idle
            this.breezeTime = 0;

            // Quản lý vòng lặp và tối ưu Viewport
            this.rafId = null;
            this.isRunning = false;
            this.isVisible = false;
            this.isDestroyed = false;
            this.observer = null;
            this._onVisibilityChange = null;

            this.init();
        }

        init() {
            if (!this.canvas || !this.ctx || !this.itemsLayer) return;

            this.handleResize();
            this.buildDOMItems();
            this.bindEvents();

            this.lastScrollY = window.scrollY || window.pageYOffset;
            this.loop = this.loop.bind(this);

            // Render khung hình đầu tiên ngay lập tức để dây và ảnh vào đúng vị trí nghỉ
            this.updatePhysics();
            this.updateItems();
            this.drawRope();

            // Kích hoạt IntersectionObserver: Tự động dừng vòng lặp khi section ra khỏi màn hình
            this.initIntersectionObserver();
        }

        startLoop() {
            if (this.isRunning || this.isDestroyed || !this.isVisible) return;
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.loop);
        }

        stopLoop() {
            if (!this.isRunning) return;
            this.isRunning = false;
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
        }

        initIntersectionObserver() {
            if (typeof IntersectionObserver === 'undefined') {
                this.isVisible = true;
                this.startLoop();
                return;
            }

            // Theo dõi toàn bộ section #admissions (hoặc sticky container)
            const target = this.container.closest('#admissions') ||
                this.container.closest('.admissions-sticky-container') ||
                this.container;

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.isVisible = entry.isIntersecting;
                    if (this.isVisible) {
                        this.lastScrollY = window.scrollY || window.pageYOffset;
                        this.startLoop();
                    } else {
                        this.stopLoop();
                    }
                });
            }, {
                rootMargin: '300px 0px' // Bắt đầu tính toán mượt mà trước 300px khi người dùng cuộn tới
            });

            this.observer.observe(target);

            // Page Visibility API: Tắt ngay lập tức khi người dùng chuyển sang tab khác
            this._onVisibilityChange = () => {
                if (document.hidden) {
                    this.stopLoop();
                } else if (this.isVisible) {
                    this.lastScrollY = window.scrollY || window.pageYOffset;
                    this.startLoop();
                }
            };
            document.addEventListener('visibilitychange', this._onVisibilityChange, { passive: true });
        }

        handleResize() {
            const rect = this.container.getBoundingClientRect();
            this.width = rect.width || window.innerWidth;
            this.height = rect.height || 900;
            this.canvasBufferY = 250;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            const totalCanvasHeight = this.height + this.canvasBufferY * 2;
            this.canvas.width = Math.floor(this.width * this.dpr);
            this.canvas.height = Math.floor(totalCanvasHeight * this.dpr);
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, this.canvasBufferY * this.dpr);

            this.initRopePoints();
        }

        initRopePoints() {
            const cfg = window.HANGER_ROPE_CONFIG.rope;
            const N = cfg.pointCount;
            this.points = [];

            const isMobile = this.width <= 768;
            const startX = 0;
            const endX = this.width;
            const pinY = isMobile ? Math.min(cfg.pinOffsetTop, 18) : cfg.pinOffsetTop;
            const sagRatio = isMobile ? Math.min(cfg.sagRatio * 1.8, 0.10) : cfg.sagRatio;
            const maxSag = this.width * sagRatio;

            for (let i = 0; i < N; i++) {
                const t = i / (N - 1);
                const x = startX + (endX - startX) * t;
                // Parabol võng tự nhiên
                const sagOffset = 4 * maxSag * t * (1 - t);
                const y = pinY + sagOffset;

                this.points.push({
                    x: x,
                    y: y,
                    oldX: x,
                    oldY: y,
                    restX: x,
                    restY: y,
                    pinned: (i === 0 || i === N - 1)
                });
            }

            // Chiều dài liên kết nghỉ giữa 2 hạt
            let totalLength = 0;
            for (let i = 0; i < N - 1; i++) {
                const dx = this.points[i + 1].x - this.points[i].x;
                const dy = this.points[i + 1].y - this.points[i].y;
                totalLength += Math.sqrt(dx * dx + dy * dy);
            }
            this.segmentLength = totalLength / (N - 1);
        }

        buildDOMItems() {
            const items = window.HANGER_ROPE_CONFIG.items;
            this.itemsLayer.innerHTML = '';
            this.itemInstances = [];

            const isMobile = window.innerWidth <= 768;

            items.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'hanger-item';
                itemEl.setAttribute('data-id', item.id);
                itemEl.setAttribute('data-index', index);

                const itemWidth = isMobile ? (item.widthMobile || 105) : Math.min((item.widthDesktop || 175), window.innerWidth * 0.15);
                itemEl.style.width = itemWidth + 'px';

                // Paperclip SVG kim loại đồng sáng bóng
                const clipHtml = `
                    <div class="hanger-clip">
                        <svg viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V35C12 38.3 9.3 41 6 41C2.7 41 0 38.3 0 35V14C0 8.5 4.5 4 10 4C15.5 4 20 8.5 20 14V37" 
                                  stroke="rgba(0,0,0,0.18)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(1, 1.5)"/>
                            <path d="M12 8V35C12 38.3 9.3 41 6 41C2.7 41 0 38.3 0 35V14C0 8.5 4.5 4 10 4C15.5 4 20 8.5 20 14V37" 
                                  stroke="#C4A875" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8V35C12 38.3 9.3 41 6 41C2.7 41 0 38.3 0 35V14C0 8.5 4.5 4 10 4C15.5 4 20 8.5 20 14V37" 
                                  stroke="#FFF1D0" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
                        </svg>
                    </div>
                `;

                // Thẻ ảnh Polaroid & Tag ghi chú
                const cardHtml = `
                    <div class="hanger-card" data-id="${item.id}" data-target="${item.targetSelector || ''}">
                        <div class="hanger-card-inner" data-target="${item.targetSelector || ''}">
                            <img src="${item.imageUrl}" alt="${item.title}" />
                        </div>
                        <button type="button" class="hanger-tag" data-id="${item.id}" data-target="${item.targetSelector || ''}">
                            <span class="font-serif-caption medium" style="font-style: italic; color: #0000009f">${item.title}</span>
                        </button>
                    </div>
                `;

                itemEl.innerHTML = clipHtml + cardHtml;
                this.itemsLayer.appendChild(itemEl);

                // Lưu thực thể con lắc
                this.itemInstances.push({
                    el: itemEl,
                    config: item,
                    width: itemWidth,
                    angle: item.baseAngle || 0,
                    angVel: 0,
                    pitchAngle: 0,
                    pitchVel: 0,
                    ropeT: item.ropePosition,
                    lastAttachX: 0,
                    lastAttachY: 0,
                    lastVx: 0,
                    lastVy: 0,
                    lastTransform: ''
                });
            });
        }

        bindEvents() {
            // Resize debounce
            let resizeTimer;
            let lastHangerWidth = window.innerWidth;
            window.addEventListener('resize', () => {
                const curW = window.innerWidth;
                const widthChanged = Math.abs(curW - lastHangerWidth) > 5;
                const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                if (isTouch && !widthChanged) {
                    return;
                }
                lastHangerWidth = curW;

                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.handleResize();
                    this.buildDOMItems();
                }, 100);
            }, { passive: true });

            // Scroll Physics Listener: Chỉ xử lý và đánh thức vòng lặp khi section đang hiển thị
            window.addEventListener('scroll', () => {
                const currentY = window.scrollY || window.pageYOffset;
                if (!this.isVisible) {
                    this.lastScrollY = currentY;
                    return;
                }
                const delta = currentY - this.lastScrollY;
                this.lastScrollY = currentY;

                const scrollCfg = window.HANGER_ROPE_CONFIG.scroll;
                const swayCfg = window.HANGER_ROPE_CONFIG.itemsSway;
                const impulse = Math.max(-scrollCfg.maxImpulse, Math.min(scrollCfg.maxImpulse, delta * scrollCfg.influence));
                this.scrollImpulse += impulse;

                // Cập nhật tốc độ cuộn tức thời & nhịp pha sóng lắc khi đang cuộn
                this.scrollSpeed = delta;
                const waveFreq = swayCfg.depthScrollWaveFreq || 0.016;
                this.scrollWavePhase += Math.abs(delta) * waveFreq;

                if (!this.isRunning) {
                    this.startLoop();
                }
            }, { passive: true });

            // Click vào Tag hoặc Ảnh để cuộn mượt đến bước tương ứng
            this.itemsLayer.addEventListener('click', (e) => {
                if (this.hasDragged) {
                    this.hasDragged = false;
                    return;
                }
                const clickable = e.target.closest('.hanger-tag, .hanger-card, [data-target]');
                if (!clickable) return;
                const targetSelector = clickable.getAttribute('data-target');
                if (targetSelector) {
                    const targetEl = document.querySelector(targetSelector);
                    if (targetEl) {
                        e.preventDefault();
                        e.stopPropagation();
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });

            // Pointer Drag Events (Tối ưu hóa: chỉ gán move/up khi bắt đầu kéo)
            const getPointerPos = (e) => {
                const rect = this.container.getBoundingClientRect();
                return {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            };

            const onPointerMove = (e) => {
                if (!this.isDragging) return;
                if (!this.hasDragged && (Math.abs(e.clientX - this.dragStartClientX) > 6 || Math.abs(e.clientY - this.dragStartClientY) > 6)) {
                    this.hasDragged = true;
                }
                const pos = getPointerPos(e);
                this.pointerVelocityX = pos.x - this.pointerX;
                this.pointerVelocityY = pos.y - this.pointerY;
                this.pointerX = pos.x;
                this.pointerY = pos.y;
            };

            const onPointerUp = () => {
                if (!this.isDragging) return;
                this.isDragging = false;
                this.container.classList.remove('is-dragging');

                if (this.hasDragged) {
                    setTimeout(() => {
                        this.hasDragged = false;
                    }, 120);
                }

                // Tháo gỡ listener move & up ngay khi nhả chuột/thả tay để giải phóng 100% CPU
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
                window.removeEventListener('pointercancel', onPointerUp);

                if (this.dragItemInstance) {
                    this.dragItemInstance.el.classList.remove('is-dragging');
                    const swayCfg = window.HANGER_ROPE_CONFIG.itemsSway;
                    // Khi thả ảnh, truyền lực nảy góc theo tốc độ tay
                    if ((swayCfg.rollStrength || 0) > 0) {
                        this.dragItemInstance.angVel += (this.pointerVelocityX * 0.4);
                    }
                    if (swayCfg.depthSwayEnabled) {
                        this.dragItemInstance.pitchVel += (this.pointerVelocityY * (swayCfg.depthReleaseImpulse || 0.7));
                    }
                    this.dragItemInstance = null;
                }

                // Xung lực bật nảy (rebound) cho các điểm lân cận
                const dragCfg = window.HANGER_ROPE_CONFIG.drag;
                const radius = dragCfg.radius;
                const impulseMult = dragCfg.releaseImpulse;

                for (let i = 1; i < this.points.length - 1; i++) {
                    const p = this.points[i];
                    const dx = p.x - this.pointerX;
                    const dy = p.y - this.pointerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < radius) {
                        const falloff = (1 - dist / radius);
                        p.oldX -= this.pointerVelocityX * impulseMult * falloff;
                        p.oldY -= this.pointerVelocityY * impulseMult * falloff;
                    }
                }
            };

            const startDrag = (e, itemTarget) => {
                this.isDragging = true;
                this.hasDragged = false;
                this.dragStartClientX = e.clientX;
                this.dragStartClientY = e.clientY;
                this.container.classList.add('is-dragging');
                const pos = getPointerPos(e);
                this.pointerX = pos.x;
                this.pointerY = pos.y;
                this.pointerVelocityX = 0;
                this.pointerVelocityY = 0;

                if (itemTarget) {
                    const idx = parseInt(itemTarget.getAttribute('data-index'), 10);
                    if (!isNaN(idx) && this.itemInstances[idx]) {
                        this.dragItemInstance = this.itemInstances[idx];
                        this.dragItemGrabOffsetY = pos.y - this.dragItemInstance.lastAttachY;
                        itemTarget.classList.add('is-dragging');
                    }
                } else {
                    this.dragItemInstance = null;
                }

                // Chỉ gắn listener move & up khi đang kéo thực sự
                window.addEventListener('pointermove', onPointerMove, { passive: true });
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);

                if (!this.isRunning) {
                    this.startLoop();
                }
            };

            const onPointerDown = (e) => {
                if (e.target.closest('.hanger-config-panel') || e.target.closest('.hanger-config-toggle')) return;
                if (e.target.closest('.hanger-tag')) return;

                const itemTarget = e.target.closest('.hanger-item');
                if (itemTarget) {
                    startDrag(e, itemTarget);
                    return;
                }

                // Kiểm tra xem vị trí bấm có nằm gần đường dây (bán kính 45px) không
                const pos = getPointerPos(e);
                if (pos.x >= 0 && pos.x <= this.width) {
                    const ropePt = this.getRopePointAt(pos.x / this.width);
                    if (Math.abs(pos.y - ropePt.y) <= 45) {
                        startDrag(e, null);
                    }
                }
            };

            window.addEventListener('pointerdown', onPointerDown);
        }

        // =====================================================================
        // 3. VÒNG LẶP VẬT LÝ (PHYSICS UPDATE)
        // =====================================================================
        updatePhysics() {
            const ropeCfg = window.HANGER_ROPE_CONFIG.rope;
            const dragCfg = window.HANGER_ROPE_CONFIG.drag;
            const scrollCfg = window.HANGER_ROPE_CONFIG.scroll;
            const breezeCfg = window.HANGER_ROPE_CONFIG.breeze;
            const N = this.points.length;
            if (N < 2) return;

            // 3.1. Hiệu ứng gió thoảng idle breeze
            this.breezeTime += breezeCfg.speed;
            if (breezeCfg.enabled) {
                for (let i = 1; i < N - 1; i++) {
                    const t = i / (N - 1);
                    const windWave = Math.sin(this.breezeTime * 2 + t * Math.PI * 2);
                    this.points[i].y += windWave * breezeCfg.strength * Math.sin(Math.PI * t) * 0.15;
                }
            }

            // 3.2. Xung lực cuộn trang (Scroll Impulse Wave) & làm mịn tốc độ cuộn
            this.smoothScrollSpeed += (this.scrollSpeed - this.smoothScrollSpeed) * 0.2;
            this.scrollSpeed *= 0.85;

            if (Math.abs(this.scrollImpulse) > 0.05) {
                for (let i = 1; i < N - 1; i++) {
                    const t = i / (N - 1);
                    const wave = Math.sin(Math.PI * t);
                    this.points[i].y += this.scrollImpulse * wave * 0.28;
                }
                this.scrollImpulse *= scrollCfg.damping;
            } else {
                this.scrollImpulse = 0;
            }

            // 3.3. Tương tác kéo thả chuột
            if (this.isDragging) {
                // Nếu đang cầm trực tiếp một bức ảnh
                if (this.dragItemInstance) {
                    const ropeT = this.dragItemInstance.ropeT;
                    const floatIdx = ropeT * (N - 1);
                    const targetIdx = Math.max(1, Math.min(N - 2, Math.round(floatIdx)));
                    const targetPoint = this.points[targetIdx];

                    // Kéo điểm treo của bức ảnh về phía con trỏ
                    const pullTargetY = this.pointerY - Math.max(10, this.dragItemGrabOffsetY);
                    targetPoint.x += (this.pointerX - targetPoint.x) * dragCfg.cardPullStrength;
                    targetPoint.y += (pullTargetY - targetPoint.y) * dragCfg.cardPullStrength;

                    // Xoay ảnh nghiêng theo hướng tay kéo
                    const swayCfg = window.HANGER_ROPE_CONFIG.itemsSway;
                    if ((swayCfg.rollStrength || 0) > 0) {
                        const dragAngle = Math.max(-28, Math.min(28, (this.pointerVelocityX * 1.8)));
                        this.dragItemInstance.angle += (dragAngle - this.dragItemInstance.angle) * 0.2;
                    }
                    if (swayCfg.depthSwayEnabled) {
                        const dragPitch = Math.max(-swayCfg.depthMaxAngleDeg, Math.min(swayCfg.depthMaxAngleDeg, (this.pointerVelocityY * 1.6)));
                        this.dragItemInstance.pitchAngle += (dragPitch - this.dragItemInstance.pitchAngle) * 0.2;
                    }
                } else {
                    // Kéo dây tự do
                    const radius = dragCfg.radius;
                    const strength = dragCfg.strength;

                    for (let i = 1; i < N - 1; i++) {
                        const p = this.points[i];
                        const dx = this.pointerX - p.x;
                        const dy = this.pointerY - p.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < radius) {
                            const factor = Math.pow(1 - dist / radius, 2) * strength;
                            p.x += dx * factor;
                            p.y += dy * factor;
                        }
                    }
                }
            }

            // 3.4. Verlet Integration cho từng hạt
            for (let i = 0; i < N; i++) {
                const p = this.points[i];
                if (p.pinned) continue;

                const vx = (p.x - p.oldX) * ropeCfg.damping;
                const vy = (p.y - p.oldY) * ropeCfg.damping;

                p.oldX = p.x;
                p.oldY = p.y;

                // Lực hồi phục về vị trí cong võng ban đầu
                const rx = (p.restX - p.x) * ropeCfg.restoreSpeed;
                const ry = (p.restY - p.y) * ropeCfg.restoreSpeed;

                p.x += vx + rx;
                p.y += vy + ry + ropeCfg.gravity;
            }

            // 3.5. Ràng buộc khoảng cách (Distance Constraints)
            for (let iter = 0; iter < ropeCfg.constraintIterations; iter++) {
                for (let i = 0; i < N - 1; i++) {
                    const p1 = this.points[i];
                    const p2 = this.points[i + 1];

                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
                    const diff = (dist - this.segmentLength) / dist;

                    const offsetX = dx * diff * 0.5 * ropeCfg.stiffness;
                    const offsetY = dy * diff * 0.5 * ropeCfg.stiffness;

                    if (!p1.pinned) {
                        p1.x += offsetX;
                        p1.y += offsetY;
                    }
                    if (!p2.pinned) {
                        p2.x -= offsetX;
                        p2.y -= offsetY;
                    }
                }
            }

            // 3.6. Tự động chuyển sang trạng thái ngủ sâu (0% CPU) khi không có tương tác, không có gió và dây đã cân bằng
            if (!breezeCfg.enabled && !this.isDragging && Math.abs(this.scrollImpulse) < 0.005) {
                let isMoving = false;
                for (let i = 1; i < N - 1; i++) {
                    const p = this.points[i];
                    if (Math.abs(p.x - p.oldX) > 0.005 || Math.abs(p.y - p.oldY) > 0.005) {
                        isMoving = true;
                        break;
                    }
                }
                if (!isMoving) {
                    for (let i = 0; i < this.itemInstances.length; i++) {
                        const it = this.itemInstances[i];
                        if (Math.abs(it.angVel) > 0.005 || Math.abs(it.pitchVel || 0) > 0.005) {
                            isMoving = true;
                            break;
                        }
                    }
                }
                if (!isMoving) {
                    this.stopLoop();
                    return;
                }
            }
        }

        // Nội suy tọa độ và độ dốc tại bất kỳ vị trí t nào trên dây
        getRopePointAt(t) {
            const N = this.points.length;
            if (N < 2) return { x: 0, y: 0, angle: 0 };

            const clampedT = Math.max(0, Math.min(1, t));
            const floatIdx = clampedT * (N - 1);
            const idx = Math.min(Math.floor(floatIdx), N - 2);
            const u = floatIdx - idx;

            const p0 = idx > 0 ? this.points[idx - 1] : this.points[idx];
            const p1 = this.points[idx];
            const p2 = this.points[idx + 1];
            const p3 = idx < N - 2 ? this.points[idx + 2] : p2;

            // Catmull-Rom Spline
            const x = 0.5 * (
                (2 * p1.x) +
                (-p0.x + p2.x) * u +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u * u +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u * u * u
            );

            const y = 0.5 * (
                (2 * p1.y) +
                (-p0.y + p2.y) * u +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u * u +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u * u * u
            );

            // Độ dốc tiếp tuyến của dây tại t
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const slopeAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            return { x, y, angle: slopeAngle };
        }

        // Cập nhật vị trí & góc lắc lư con lắc của từng ảnh
        updateItems() {
            const swayCfg = window.HANGER_ROPE_CONFIG.itemsSway;
            const breezeCfg = window.HANGER_ROPE_CONFIG.breeze;

            this.itemInstances.forEach(item => {
                const { x, y, angle: ropeSlope } = this.getRopePointAt(item.ropeT);

                // Gia tốc ngang & dọc của điểm neo trên dây
                const vx = x - item.lastAttachX;
                const ax = vx - item.lastVx;
                item.lastVx = vx;
                item.lastAttachX = x;

                const vy = y - item.lastAttachY;
                const ay = vy - (item.lastVy || 0);
                item.lastVy = vy;
                item.lastAttachY = y;

                // 1. Lắc trước - sau theo trục Z (3D Depth / RotateX)
                if (swayCfg.depthSwayEnabled) {
                    if (this.dragItemInstance !== item) {
                        // Gió thoảng đung đưa trước sau (lệch pha nhẹ theo vị trí trên dây để tạo độ tự nhiên)
                        const windPitch = breezeCfg.enabled
                            ? Math.sin(this.breezeTime * 2.2 + item.ropeT * Math.PI * 2.5) * (swayCfg.depthBreezeInfluence || 10.0) * breezeCfg.strength
                            : 0;

                        // Lực lắc trước - sau khi đang cuộn (Scroll Flutter Wave):
                        // Luôn đổi chiều dao động liên tục theo quãng đường cuộn thay vì bị ngửa cứng 1 hướng
                        const speedMag = Math.min(30, Math.abs(this.smoothScrollSpeed));
                        const flutterWave = Math.sin(this.scrollWavePhase + item.ropeT * Math.PI * 2.5);
                        const flutterForce = flutterWave * speedMag * (swayCfg.depthScrollFlutter || 0.032);
                        const scrollDir = Math.sign(this.smoothScrollSpeed || this.scrollImpulse || 1);
                        const biasForce = scrollDir * Math.min(swayCfg.depthScrollBias || 0.18, speedMag * 0.008);
                        const scrollPitch = (flutterForce + biasForce) * (swayCfg.depthScrollInfluence || 1.0);

                        // Quán tính giật dọc của dây
                        const bouncePitch = -ay * (swayCfg.depthInertiaFactor || 0.2);

                        const targetPitch = windPitch;
                        const springForceZ = -(item.pitchAngle - targetPitch) * (swayCfg.depthFrequency || 0.038);
                        const inertiaForceZ = scrollPitch + bouncePitch;

                        item.pitchVel = (item.pitchVel + springForceZ + inertiaForceZ) * (swayCfg.depthDamping || 0.96);
                        item.pitchAngle += item.pitchVel;

                        const maxPitch = swayCfg.depthMaxAngleDeg || 36;
                        item.pitchAngle = Math.max(-maxPitch, Math.min(maxPitch, item.pitchAngle));
                    }
                } else {
                    item.pitchAngle = 0;
                    item.pitchVel = 0;
                }

                // 2. Lắc trái - phải (2D Roll / RotateZ)
                const rollStrength = typeof swayCfg.rollStrength !== 'undefined' ? swayCfg.rollStrength : (swayCfg.rollSwayEnabled ? 1 : 0);
                if (rollStrength > 0) {
                    if (this.dragItemInstance !== item) {
                        const targetAngle = (item.config.baseAngle || 0) + (ropeSlope * swayCfg.tangentInfluence);
                        const springForce = -(item.angle - targetAngle) * swayCfg.frequency;
                        const inertiaForce = -ax * swayCfg.inertiaFactor;

                        item.angVel = (item.angVel + springForce + inertiaForce) * swayCfg.damping;
                        item.angle += item.angVel;

                        const maxAngle = swayCfg.maxAngleDeg;
                        item.angle = Math.max(-maxAngle, Math.min(maxAngle, item.angle));
                    }
                } else {
                    // Khi tắt lắc trái-phải: giữ góc nghiêng tĩnh tự nhiên ban đầu (baseAngle)
                    item.angle = item.config.baseAngle || 0;
                    item.angVel = 0;
                }

                // 3. Cập nhật DOM bằng transform GPU 3D
                const posX = (x - (item.width / 2)).toFixed(1);
                const posY = y.toFixed(1);
                const rotX = (item.pitchAngle || 0).toFixed(2);
                const rotZ = item.angle.toFixed(2);
                const persp = swayCfg.perspective || 900;

                const newTransform = `translate3d(${posX}px, ${posY}px, 0) perspective(${persp}px) rotateX(${rotX}deg) rotate(${rotZ}deg)`;
                if (item.lastTransform !== newTransform) {
                    item.el.style.transform = newTransform;
                    item.lastTransform = newTransform;
                }
            });
        }

        // Vẽ sợi dây lên canvas
        drawRope() {
            const ctx = this.ctx;
            const N = this.points.length;
            if (!ctx || N < 2) return;

            const bufferY = this.canvasBufferY || 0;
            const totalCanvasHeight = this.height + bufferY * 2;
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, bufferY * this.dpr);
            ctx.clearRect(0, -bufferY, this.width, totalCanvasHeight);

            const ropeCfg = window.HANGER_ROPE_CONFIG.rope;

            // 1. Bóng đổ
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y + 3);
            for (let i = 1; i < N - 1; i++) {
                const xc = (this.points[i].x + this.points[i + 1].x) / 2;
                const yc = (this.points[i].y + this.points[i + 1].y) / 2 + 3;
                ctx.quadraticCurveTo(this.points[i].x, this.points[i].y + 3, xc, yc);
            }
            ctx.lineTo(this.points[N - 1].x, this.points[N - 1].y + 3);
            ctx.strokeStyle = ropeCfg.shadowColor;
            ctx.lineWidth = ropeCfg.lineWidth + 1.6;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();

            // 2. Thân dây chính
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 1; i < N - 1; i++) {
                const xc = (this.points[i].x + this.points[i + 1].x) / 2;
                const yc = (this.points[i].y + this.points[i + 1].y) / 2;
                ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
            }
            ctx.lineTo(this.points[N - 1].x, this.points[N - 1].y);
            ctx.strokeStyle = ropeCfg.color;
            ctx.lineWidth = ropeCfg.lineWidth;
            ctx.lineCap = 'round';
            ctx.stroke();

            // 3. Highlight tạo khối sáng
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y - 0.5);
            for (let i = 1; i < N - 1; i++) {
                const xc = (this.points[i].x + this.points[i + 1].x) / 2;
                const yc = (this.points[i].y + this.points[i + 1].y) / 2 - 0.5;
                ctx.quadraticCurveTo(this.points[i].x, this.points[i].y - 0.5, xc, yc);
            }
            ctx.lineTo(this.points[N - 1].x, this.points[N - 1].y - 0.5);
            ctx.strokeStyle = ropeCfg.highlightColor;
            ctx.lineWidth = ropeCfg.lineWidth * 0.45;
            ctx.stroke();
            ctx.restore();

            // 4. Chốt đinh ghim kim loại 2 đầu
            const drawPin = (x, y) => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, 4.5, 0, Math.PI * 2);
                ctx.fillStyle = '#8f7a5c00';
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#5a493300';
                ctx.stroke();
                ctx.restore();
            };

            drawPin(this.points[0].x, this.points[0].y);
            drawPin(this.points[N - 1].x, this.points[N - 1].y);
        }

        loop() {
            if (this.isDestroyed || !this.isRunning) return;

            this.updatePhysics();
            this.updateItems();
            this.drawRope();

            if (this.isRunning && !this.isDestroyed) {
                this.rafId = requestAnimationFrame(this.loop);
            }
        }

        destroy() {
            this.isDestroyed = true;
            this.stopLoop();
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            if (this._onVisibilityChange) {
                document.removeEventListener('visibilitychange', this._onVisibilityChange);
                this._onVisibilityChange = null;
            }
        }
    }

    // =========================================================================
    // 4. BẢNG ĐIỀU KHIỂN CẤU HÌNH TRỰC TIẾP TRÊN UI (UI CONFIGURATION PANEL)
    // =========================================================================
    // =========================================================================
    // 4. BẢNG ĐIỀU KHIỂN CẤU HÌNH TRỰC TIẾP TRÊN UI (UI CONFIGURATION PANEL)
    // =========================================================================
    class HangerConfigUI {
        constructor(simulator) {
            this.simulator = simulator;
            this.defaultConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
            this.panelEl = null;
            this.toastEl = null;

            this.init();
        }

        init() {
            // Bảng điều khiển Panel hiển thị trực tiếp khi bật cấu hình
            this.panelEl = document.createElement('div');
            this.panelEl.className = 'motion-tuner-panel rope-tuner-panel';
            this.panelEl.innerHTML = `
                <div class="motion-tuner-header">
                    <h4 class="motion-tuner-title">⚙️ Rope Physics Tuner</h4>
                </div>
                <div class="motion-tuner-body" id="hanger-config-body"></div>
                <div class="motion-tuner-actions">
                    <button type="button" class="motion-tuner-btn motion-tuner-btn-secondary" id="hanger-btn-reset-cfg">Reset</button>
                    <button type="button" class="motion-tuner-btn" id="hanger-btn-copy-cfg">📋 Copy JSON</button>
                </div>
            `;
            document.body.appendChild(this.panelEl);

            // Toast thông báo
            this.toastEl = document.createElement('div');
            this.toastEl.className = 'motion-tuner-toast';
            this.toastEl.textContent = '✓ Đã sao chép cấu hình vào clipboard!';
            document.body.appendChild(this.toastEl);

            this.renderControls();
            this.bindEvents();
        }

        renderControls() {
            const body = this.panelEl.querySelector('#hanger-config-body');
            if (!body) return;
            body.innerHTML = '';

            const SCHEMAS = [
                {
                    title: '🪢 Sợi dây (Rope Physics)',
                    section: 'rope',
                    fields: [
                        { key: 'stiffness', label: 'Độ căng dây', min: 0.2, max: 1.0, step: 0.01, digits: 2 },
                        { key: 'gravity', label: 'Trọng lực', min: 0.0, max: 1.5, step: 0.02, digits: 2 },
                        { key: 'damping', label: 'Giảm chấn quán tính', min: 0.90, max: 0.999, step: 0.001, digits: 3 },
                        { key: 'sagRatio', label: 'Độ võng tự nhiên', min: 0.01, max: 0.15, step: 0.005, digits: 3, requiresReinit: true },
                        { key: 'restoreSpeed', label: 'Tốc độ hồi phục', min: 0.005, max: 0.12, step: 0.002, digits: 3 },
                        { key: 'pointCount', label: 'Số điểm hạt', min: 16, max: 50, step: 2, digits: 0, requiresReinit: true },
                        { key: 'lineWidth', label: 'Độ dày nét dây (px)', min: 1.0, max: 5.0, step: 0.2, digits: 1 },
                    ]
                },
                {
                    title: '📜 Cuộn trang (Scroll Physics)',
                    section: 'scroll',
                    fields: [
                        { key: 'influence', label: 'Lực đẩy cuộn', min: 0.0, max: 1.5, step: 0.02, digits: 2 },
                        { key: 'maxImpulse', label: 'Xung lực tối đa', min: 5, max: 70, step: 1, digits: 0 },
                        { key: 'damping', label: 'Tiêu tán cuộn', min: 0.50, max: 0.98, step: 0.01, digits: 2 },
                    ]
                },
                {
                    title: '🖐️ Kéo chuột / Chạm (Drag)',
                    section: 'drag',
                    fields: [
                        { key: 'radius', label: 'Bán kính hút (px)', min: 80, max: 400, step: 10, digits: 0 },
                        { key: 'strength', label: 'Độ bám kéo', min: 0.20, max: 1.0, step: 0.02, digits: 2 },
                        { key: 'releaseImpulse', label: 'Lực nảy khi thả', min: 0.2, max: 3.0, step: 0.1, digits: 1 },
                        { key: 'cardPullStrength', label: 'Lực kéo khi cầm ảnh', min: 0.20, max: 1.0, step: 0.05, digits: 2 },
                    ]
                },
                {
                    title: '🎭 Lắc trước - sau (3D Depth / Trục Z)',
                    section: 'itemsSway',
                    fields: [
                        { key: 'depthSwayEnabled', label: 'Bật lắc trước - sau (Trục Z)', type: 'checkbox' },
                        { key: 'depthMaxAngleDeg', label: 'Góc lắc trước-sau tối đa (°)', min: 10, max: 60, step: 1, digits: 0 },
                        { key: 'depthFrequency', label: 'Tần số lắc trước-sau', min: 0.01, max: 0.15, step: 0.002, digits: 3 },
                        { key: 'depthDamping', label: 'Giảm chấn trước-sau', min: 0.88, max: 0.995, step: 0.002, digits: 3 },
                        { key: 'depthScrollFlutter', label: 'Lực lắc khi đang cuộn (Flutter)', min: 0.005, max: 0.08, step: 0.002, digits: 3 },
                        { key: 'depthScrollWaveFreq', label: 'Nhịp tần số cuộn', min: 0.005, max: 0.04, step: 0.001, digits: 3 },
                        { key: 'depthScrollBias', label: 'Độ nghiêng gió theo hướng cuộn', min: 0.0, max: 0.6, step: 0.02, digits: 2 },
                        { key: 'depthScrollInfluence', label: 'Lực cuộn trang tổng thể', min: 0.0, max: 3.0, step: 0.05, digits: 2 },
                        { key: 'depthBreezeInfluence', label: 'Gió đung đưa trước-sau (°)', min: 0, max: 25, step: 0.5, digits: 1 },
                        { key: 'depthReleaseImpulse', label: 'Lực nảy khi thả kéo chuột', min: 0.0, max: 2.5, step: 0.05, digits: 2 },
                        { key: 'perspective', label: 'Độ sâu 3D Perspective (px)', min: 400, max: 2000, step: 50, digits: 0 },
                    ]
                },
                {
                    title: '↔️ Lắc trái - phải (2D Roll)',
                    section: 'itemsSway',
                    fields: [
                        { key: 'rollStrength', label: 'Cường độ lắc trái-phải (0 = tắt)', min: 0.0, max: 1.0, step: 0.05, digits: 2 },
                        { key: 'tangentInfluence', label: 'Nghiêng theo dốc dây', min: 0.0, max: 0.8, step: 0.02, digits: 2 },
                        { key: 'maxAngleDeg', label: 'Góc lắc trái-phải tối đa (°)', min: 10, max: 60, step: 1, digits: 0 },
                        { key: 'frequency', label: 'Tần số con lắc trái-phải', min: 0.01, max: 0.18, step: 0.005, digits: 3 },
                        { key: 'damping', label: 'Giảm chấn trái-phải', min: 0.88, max: 0.995, step: 0.002, digits: 3 },
                    ]
                },
                {
                    title: '🍃 Gió thoảng (Idle Breeze)',
                    section: 'breeze',
                    fields: [
                        { key: 'enabled', label: 'Bật gió thoảng', type: 'checkbox' },
                        { key: 'strength', label: 'Cường độ gió', min: 0.0, max: 0.8, step: 0.02, digits: 2 },
                        { key: 'speed', label: 'Tốc độ gió', min: 0.0005, max: 0.006, step: 0.0002, digits: 4 },
                    ]
                }
            ];

            SCHEMAS.forEach(group => {
                const titleEl = document.createElement('div');
                titleEl.className = 'motion-tuner-group-title';
                titleEl.textContent = group.title;
                body.appendChild(titleEl);

                group.fields.forEach(field => {
                    const currentVal = window.HANGER_ROPE_CONFIG[group.section][field.key];

                    if (field.type === 'checkbox') {
                        const row = document.createElement('div');
                        row.className = 'motion-tuner-row';
                        row.style.flexDirection = 'row';
                        row.style.justifyContent = 'space-between';
                        row.style.alignItems = 'center';
                        row.innerHTML = `
                            <span style="font-size:11px;color:#cbd5e1">${field.label}</span>
                            <input type="checkbox" id="cfg-${group.section}-${field.key}" ${currentVal ? 'checked' : ''} style="cursor:pointer;accent-color:#38bdf8;" />
                        `;
                        const checkbox = row.querySelector('input');
                        checkbox.addEventListener('change', (e) => {
                            window.HANGER_ROPE_CONFIG[group.section][field.key] = e.target.checked;
                        });
                        body.appendChild(row);
                    } else {
                        const ctrl = document.createElement('div');
                        ctrl.className = 'motion-tuner-row';
                        const digits = field.digits !== undefined ? field.digits : 2;
                        ctrl.innerHTML = `
                            <div class="motion-tuner-label-wrap">
                                <span>${field.label}</span>
                                <span class="motion-tuner-val" id="val-${group.section}-${field.key}">
                                    ${Number(currentVal).toFixed(digits)}
                                </span>
                            </div>
                            <input type="range" class="motion-tuner-slider"
                                   id="cfg-${group.section}-${field.key}"
                                   min="${field.min}" max="${field.max}" step="${field.step}"
                                   value="${currentVal}" />
                        `;

                        const slider = ctrl.querySelector('input');
                        const badge = ctrl.querySelector(`#val-${group.section}-${field.key}`);

                        slider.addEventListener('input', (e) => {
                            const val = parseFloat(e.target.value);
                            window.HANGER_ROPE_CONFIG[group.section][field.key] = val;
                            badge.textContent = Number(val).toFixed(digits);

                            if (field.requiresReinit && this.simulator) {
                                this.simulator.initRopePoints();
                            }
                        });

                        body.appendChild(ctrl);
                    }
                });
            });
        }

        bindEvents() {
            // Nút Copy Config
            this.panelEl.querySelector('#hanger-btn-copy-cfg').addEventListener('click', () => {
                const jsonStr = JSON.stringify(window.HANGER_ROPE_CONFIG, null, 4);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(jsonStr).then(() => {
                        this.showToast('✓ Đã copy cấu hình vào clipboard!');
                    });
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = jsonStr;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    this.showToast('✓ Đã copy cấu hình vào clipboard!');
                }
            });

            // Nút Reset Config
            this.panelEl.querySelector('#hanger-btn-reset-cfg').addEventListener('click', () => {
                window.HANGER_ROPE_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
                this.renderControls();
                if (this.simulator) {
                    this.simulator.initRopePoints();
                }
                this.showToast('↺ Đã khôi phục cấu hình mặc định!');
            });
        }

        showToast(msg) {
            if (!this.toastEl) return;
            this.toastEl.textContent = msg;
            this.toastEl.classList.add('show');
            clearTimeout(this._toastTimer);
            this._toastTimer = setTimeout(() => {
                this.toastEl.classList.remove('show');
            }, 2400);
        }
    }

    // Khởi tạo
    function initHangerRope() {
        const container = document.getElementById('hanger-rope-container');
        if (container && !container._ropeInstance) {
            const simulator = new HangerRopeSimulator(container);
            container._ropeInstance = simulator;

            // Khởi tạo bảng điều khiển UI (chỉ khi ENABLE_CONFIG_PANEL hoặc showLiveTuner: true trong code)
            const shouldShowPanel = ENABLE_CONFIG_PANEL ||
                (window.HANGER_ROPE_CONFIG && window.HANGER_ROPE_CONFIG.devMode && window.HANGER_ROPE_CONFIG.devMode.showLiveTuner) ||
                (typeof window.ENABLE_HANGER_CONFIG_PANEL !== 'undefined' && window.ENABLE_HANGER_CONFIG_PANEL);

            if (shouldShowPanel) {
                window._hangerConfigUI = new HangerConfigUI(simulator);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHangerRope);
    } else {
        initHangerRope();
    }

    window.HangerRopeSimulator = HangerRopeSimulator;
})();
