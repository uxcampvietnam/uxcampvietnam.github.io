/**
 * =============================================================================
 * PARTICIPANT 3D ORBITING PHOTO SPHERE (UXCAMP VIETNAM)
 * =============================================================================
 * Hiển thị danh sách ảnh người tham dự bay quanh một khối cầu 3D tương tác.
 * Sử dụng HTML5 Canvas 2D tối ưu hóa phần cứng, phân bố Fibonacci Sphere,
 * phép chiếu phối cảnh chiều sâu 3D, sắp xếp Z-sorting (Painter's Algorithm),
 * tương tác vuốt/kéo quán tính mượt mà và bảng điều khiển Live Config UI.
 *
 * HƯỚNG DẪN BỔ SUNG ẢNH KHÓA MỚI:
 * 1. Thả file ảnh mới (định dạng .webp, .png, .jpg) vào thư mục:
 *    asset/image/participant/ten-hoc-vien.webp
 * 2. Thêm dòng tương đối vào file CSV: data/participants.csv
 *    Hệ thống sẽ tự động nạp từ CSV, phân bố lại vị trí và hiển thị mượt mà.
 * =============================================================================
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. DANH SÁCH ẢNH NGƯỜI THAM DỰ (Được nạp từ data/participants.csv)
    // =========================================================================
    let PARTICIPANT_IMAGES = [];
    window.PARTICIPANT_IMAGES = PARTICIPANT_IMAGES;

    // =========================================================================
    // 2. CẤU HÌNH MẶC ĐỊNH (DEFAULT CONFIGURATION)
    // =========================================================================



    const DEFAULT_CONFIG = {
        "devMode": {
            "showLiveTuner": false,
            "showConfigToggle": false
        },
        "sphere": {
            "radiusDesktop": 775,
            "radiusMobile": 185,
            "focalLength": 5150,
            "maxItems": 200,
            "canvasPadding": 40
        },
        "item": {
            "sizeDesktop": 66,
            "sizeMobile": 24,
            "minScale": 0.27,
            "minBrightness": 0.28
        },
        "motion": {
            "autoSpinY": 0.006,
            "autoSpinX": 0,
            "dragSensitivity": 0.0077,
            "inertiaDamping": 0.978,
            "idleRestoreSpeed": 0.399
        },
        "exitAnimation": {
            "triggerRatio": 0.1,
            "shrinkDuration": 2,
            "randomStaggerWindow": 2
        }
    };

    // Toàn bộ cấu hình luôn được khởi tạo trực tiếp từ mã nguồn DEFAULT_CONFIG (không nạp từ localStorage)
    try {
        localStorage.removeItem('UXCAMP_PARTICIPANT_SPHERE_CONFIG');
    } catch (e) { }
    window.PARTICIPANT_SPHERE_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

    // =========================================================================
    // 3. CLASS MÔ PHỎNG VÀ VẼ KHỐI CẦU ẢNH 3D (CANVAS 2D)
    // =========================================================================
    class ParticipantSphere {
        constructor(wrapperEl) {
            this.wrapper = wrapperEl;
            this.canvas = wrapperEl.querySelector('#participant-sphere-canvas');
            this.interactionEl = wrapperEl.querySelector('#participant-sphere-interaction');
            if (!this.interactionEl && this.wrapper) {
                this.interactionEl = document.createElement('div');
                this.interactionEl.id = 'participant-sphere-interaction';
                this.interactionEl.className = 'participant-sphere-interaction';
                this.interactionEl.setAttribute('aria-label', 'Khu vực kéo xoay khối cầu');
                this.wrapper.appendChild(this.interactionEl);
            }
            this.loadingEl = wrapperEl.querySelector('.participant-sphere-loading');
            this.ctx = this.canvas ? this.canvas.getContext('2d', { alpha: true }) : null;

            this.width = 0;
            this.height = 0;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            // Tọa độ và vật lý xoay
            this.items = [];
            this.cachedCanvases = [];
            this.loadedTextures = new Map(); // Kho lưu trữ các texture ảnh đã tải xong
            this.imagesLoadedCount = 0;

            // Ma trận xoay 3x3 theo định hướng không gian màn hình (Identity matrix ban đầu)
            this.rotMatrix = [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            ];
            this.velX = 0; // Vận tốc góc theo chiều ngang (kéo sang phải -> quay sang phải)
            this.velY = 0; // Vận tốc góc theo chiều dọc (kéo xuống -> quay xuống)
            this.isFrozen = false; // Đóng băng quay khi thu nhỏ để khớp 100% tọa độ avatar trong cả 2 chiều scroll

            // Hướng tự quay theo lần tương tác cuối cùng của user
            // Mặc định ban đầu xoay ngang thuần túy: autoSpinDirX = 1, autoSpinDirY = 0
            this.autoSpinDirX = 1;
            this.autoSpinDirY = 0;
            this.pauseSpinUntil = 0; // Tạm nghỉ khi người dùng cố ý dừng tay ngắm ảnh

            // Trạng thái tương tác
            this.isDragging = false;
            this.lastPointerX = 0;
            this.lastPointerY = 0;
            this.lastPointerTime = 0;
            this.strokeDx = 0;
            this.strokeDy = 0;
            this.lastMoveDx = 0;
            this.lastMoveDy = 0;
            this.userInteracted = false;
            this.idleTimer = null;
            this.pointerHistory = [];

            // Kiểm soát vòng lặp animation
            this.rafId = null;
            this.isRunning = false;
            this.isVisible = false;

            // Kiểm soát hiệu ứng ScrollTrigger thu nhỏ khi cuộn qua
            this.isShrunk = undefined;
            this.isExitAnimating = false;
            this.exitAnimStartTime = 0;

            this.initPromise = this.init();
        }

        async init() {
            if (!this.canvas || !this.ctx) return;
            if (document.getElementById('case-study-sticky-viewport') || document.getElementById('case-study-3d-stage')) {
                this.isControlledByShowcase = true;
            }

            await this.loadImagesData();

            const cfg = window.PARTICIPANT_SPHERE_CONFIG;
            const baseSpeed = Math.abs(cfg.motion.autoSpinY) || 0.02;
            this.velX = this.autoSpinDirX * baseSpeed;
            this.velY = this.autoSpinDirY * baseSpeed;

            this.updateThemeColors();
            this.handleResize();
            this.setupPreloader();
            this.bindEvents();
            this.setupIntersectionObserver();

            // Khởi tạo tọa độ sơ bộ và kiểm tra trạng thái hiển thị tức thời
            this.updateVisibilityState();
            this.updatePhysics(16, true);
            if (this.isVisible) {
                this.render();
                if (!this.isRunning) {
                    this.startLoop();
                }
            }
        }

        // Nạp danh sách ảnh người tham gia từ file CSV
        async loadImagesData() {
            try {
                const res = await fetch(`data/participants.csv?t=${Date.now()}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const csvText = await res.text();
                const parsed = this.parseCSV(csvText);
                if (parsed && parsed.length > 0) {
                    PARTICIPANT_IMAGES = parsed;
                    window.PARTICIPANT_IMAGES = PARTICIPANT_IMAGES;
                }
            } catch (err) {
                console.warn('[ParticipantSphere] Không thể tải data/participants.csv:', err);
            }
        }

        // Phân tích dữ liệu CSV thành mảng đường dẫn ảnh
        parseCSV(text) {
            if (!text || typeof text !== 'string') return [];
            const lines = text.trim().split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
            if (lines.length === 0) return [];

            const firstLine = lines[0].toLowerCase();
            const hasHeader = firstLine.includes('anh') || firstLine.includes('image') || firstLine.includes('url') || firstLine.includes('src') || firstLine.includes('participant') || firstLine.includes('id');
            const startIndex = hasHeader ? 1 : 0;
            const images = [];

            let targetColIndex = 0;
            if (hasHeader) {
                const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));
                const matchedCol = headers.findIndex(h => h.includes('anh') || h.includes('image') || h.includes('url') || h.includes('src'));
                if (matchedCol !== -1) {
                    targetColIndex = matchedCol;
                }
            }

            for (let i = startIndex; i < lines.length; i++) {
                const rawLine = lines[i];
                const cols = [];
                let inQuotes = false;
                let current = '';

                for (let c = 0; c < rawLine.length; c++) {
                    const char = rawLine[c];
                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        cols.push(current.trim().replace(/^["']|["']$/g, ''));
                        current = '';
                    } else {
                        current += char;
                    }
                }
                cols.push(current.trim().replace(/^["']|["']$/g, ''));

                const val = cols[targetColIndex] || cols[0];
                if (val && val.length > 0) {
                    images.push(val);
                }
            }

            return images;
        }

        // Tự động nhận diện Dark Mode hiện thời
        isDarkMode() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        // Đọc giá trị màu từ biến CSS theo definition.css và parse thành mảng [r, g, b]
        getCssVariableRgb(varName, fallbackHex) {
            try {
                const style = window.getComputedStyle(document.documentElement);
                let val = style.getPropertyValue(varName).trim();
                if (!val) val = fallbackHex;
                return this.parseColorToRgb(val);
            } catch (e) {
                return this.parseColorToRgb(fallbackHex);
            }
        }

        parseColorToRgb(colorStr) {
            if (!colorStr) return [0, 0, 0];
            colorStr = colorStr.trim();

            if (colorStr.startsWith('#')) {
                let hex = colorStr.slice(1);
                if (hex.length === 3) {
                    hex = hex.split('').map(c => c + c).join('');
                }
                const num = parseInt(hex, 16);
                return [
                    (num >> 16) & 255,
                    (num >> 8) & 255,
                    num & 255
                ];
            }

            const match = colorStr.match(/\d+/g);
            if (match && match.length >= 3) {
                return [parseInt(match[0], 10), parseInt(match[1], 10), parseInt(match[2], 10)];
            }

            return this.isDarkMode() ? [0, 0, 0] : [249, 246, 241];
        }

        // Cập nhật màu overlay theo theme Dark Mode / Light Mode từ definition.css
        updateThemeColors() {
            const isDark = this.isDarkMode();
            // Lấy chính xác biến màu --body-background từ definition.css
            // (Dark Mode: #000000; Light Mode: #F9F6F1)
            this.overlayRgb = this.getCssVariableRgb('--body-background', isDark ? '#000000' : '#F9F6F1');
            this.lastDarkState = isDark;
        }

        // Cập nhật kích thước Canvas đồng bộ 100% với Viewport/Wrapper và thích ứng bán kính khối cầu
        handleResize() {
            const cfg = window.PARTICIPANT_SPHERE_CONFIG;

            // Đồng bộ kích thước width/height 100% khớp viewport/wrapper thực tế
            this.width = this.wrapper ? (this.wrapper.clientWidth || window.innerWidth) : window.innerWidth;
            this.height = this.wrapper ? (this.wrapper.clientHeight || window.innerHeight) : window.innerHeight;

            const isMobile = this.width <= 768;
            const maxRadius = isMobile ? cfg.sphere.radiusMobile : cfg.sphere.radiusDesktop;
            const baseSize = isMobile ? cfg.item.sizeMobile : cfg.item.sizeDesktop;
            const focal = Math.max(150, cfg.sphere.focalLength || 550);
            const focalFactor = 450 / focal;
            const maxPerspective = 1.0 + (0.15 * focalFactor);

            // Giới hạn bán kính thích ứng an toàn: đảm bảo quả cầu luôn nằm trọn vẹn trong màn hình
            // Trừ khoảng an toàn cho HUD Header trên cùng (80px) và HUD Nav dưới cùng (84px)
            const safePadding = typeof cfg.sphere.canvasPadding === 'number' ? cfg.sphere.canvasPadding : 140;
            const maxAllowedRadius = Math.max(80, Math.round((Math.min(this.width, this.height) - baseSize * 2 - safePadding) / (2 * maxPerspective)));
            this.currentRadius = Math.min(maxRadius, maxAllowedRadius);

            // Khớp kích thước canvas pixel và style 100% với wrapper
            this.canvas.width = Math.round(this.width * this.dpr);
            this.canvas.height = Math.round(this.height * this.dpr);
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';

            // Cập nhật vùng tương tác hình vuông bọc gọn gàng quanh quả cầu
            // Bán kính ngoài cùng = tâm item xa nhất + nửa kích thước avatar
            const outerRadius = this.currentRadius * maxPerspective + (baseSize / 2);
            // Kích thước cạnh hình vuông (thêm đệm nhẹ 12px để người dùng dễ chạm mép các avatar)
            const squareSize = Math.round(outerRadius * 2 + 12);
            this.interactionBoxSize = squareSize;
            if (this.interactionEl) {
                this.interactionEl.style.width = `${squareSize}px`;
                this.interactionEl.style.height = `${squareSize}px`;
            }
            if (this.wrapper) {
                this.wrapper.style.setProperty('--sphere-box-size', `${squareSize}px`);
            }

            this.rebuildSphereItems();
        }

        // Sinh tọa độ phân bố đều hoàn hảo trên mặt cầu (Thomson Coulomb Relaxation trên Equal-Area Spiral)
        // Triệt tiêu hoàn toàn sự chênh lệch khoảng cách giữa các ảnh ở cực và xích đạo
        generateUniformSpherePoints(N) {
            if (!this._spherePointsCache) {
                this._spherePointsCache = new Map();
            }
            if (this._spherePointsCache.has(N)) {
                return this._spherePointsCache.get(N);
            }

            if (N <= 0) return [];
            if (N === 1) {
                const pts = [[0, 0, 1]];
                this._spherePointsCache.set(N, pts);
                return pts;
            }
            if (N === 2) {
                const pts = [[0, 1, 0], [0, -1, 0]];
                this._spherePointsCache.set(N, pts);
                return pts;
            }
            if (N === 3) {
                const pts = [
                    [1, 0, 0],
                    [-0.5, 0, Math.sqrt(3) / 2],
                    [-0.5, 0, -Math.sqrt(3) / 2]
                ];
                this._spherePointsCache.set(N, pts);
                return pts;
            }
            if (N === 4) {
                const a = 1 / Math.sqrt(3);
                const pts = [
                    [a, a, a],
                    [-a, -a, a],
                    [-a, a, -a],
                    [a, -a, -a]
                ];
                this._spherePointsCache.set(N, pts);
                return pts;
            }

            // 1. Khởi tạo điểm ban đầu với Equal-Area Fibonacci Spiral (bù trừ biên để không co cụm ở 2 cực)
            const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad
            const pts = [];
            for (let i = 0; i < N; i++) {
                const y = 1 - ((i + 0.5) / N) * 2;
                const r = Math.sqrt(Math.max(0, 1 - y * y));
                const theta = goldenAngle * i;
                pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
            }

            // 2. Tối ưu hóa lực đẩy điện tích (Coulomb / Thomson Relaxation)
            // Giúp các điểm tự động đẩy nhau dàn đều hoàn hảo trên mặt cầu, khoảng cách lân cận tương đồng nhau
            const iterations = Math.min(26, Math.max(14, Math.round(1000 / N)));
            const step = 0.08 / Math.sqrt(N);

            for (let iter = 0; iter < iterations; iter++) {
                const forces = Array.from({ length: N }, () => [0, 0, 0]);

                for (let i = 0; i < N; i++) {
                    const pi = pts[i];
                    for (let j = i + 1; j < N; j++) {
                        const pj = pts[j];
                        const dx = pi[0] - pj[0];
                        const dy = pi[1] - pj[1];
                        const dz = pi[2] - pj[2];
                        const distSq = dx * dx + dy * dy + dz * dz + 1e-6;
                        const dist = Math.sqrt(distSq);

                        // Lực đẩy tỷ lệ nghịch với lập phương khoảng cách
                        const f = 1 / (distSq * dist);
                        const fx = dx * f;
                        const fy = dy * f;
                        const fz = dz * f;

                        forces[i][0] += fx;
                        forces[i][1] += fy;
                        forces[i][2] += fz;

                        forces[j][0] -= fx;
                        forces[j][1] -= fy;
                        forces[j][2] -= fz;
                    }
                }

                // Cập nhật vị trí và chiếu lại về mặt cầu đơn vị
                for (let i = 0; i < N; i++) {
                    const x = pts[i][0] + forces[i][0] * step;
                    const y = pts[i][1] + forces[i][1] * step;
                    const z = pts[i][2] + forces[i][2] * step;
                    const invLen = 1 / Math.sqrt(x * x + y * y + z * z);
                    pts[i][0] = x * invLen;
                    pts[i][1] = y * invLen;
                    pts[i][2] = z * invLen;
                }
            }

            this._spherePointsCache.set(N, pts);
            return pts;
        }

        // Tái tạo phân bố đều ảnh trên mặt cầu (chỉ lấy các ảnh đã tải xong)
        rebuildSphereItems() {
            const cfg = window.PARTICIPANT_SPHERE_CONFIG;
            const isMobile = window.innerWidth <= 768;
            const baseSize = isMobile ? cfg.item.sizeMobile : cfg.item.sizeDesktop;

            const maxTarget = Math.min(cfg.sphere.maxItems, PARTICIPANT_IMAGES.length);

            // Thu thập các ID ảnh hợp lệ từ các ảnh đang hiển thị và kho loadedTextures
            const targetIds = [];
            for (let i = 0; i < this.items.length; i++) {
                const id = this.items[i].id;
                if (targetIds.length < maxTarget && this.loadedTextures.has(id)) {
                    targetIds.push(id);
                }
            }

            // Nếu người dùng kéo tăng slider maxItems, lấy thêm từ kho ảnh đã load sẵn
            if (targetIds.length < maxTarget) {
                for (const [idx] of this.loadedTextures) {
                    if (targetIds.length >= maxTarget) break;
                    if (!targetIds.includes(idx)) {
                        targetIds.push(idx);
                    }
                }
            }

            const count = targetIds.length;
            if (count === 0) {
                this.items = [];
                return;
            }

            const unitPoints = this.generateUniformSpherePoints(count);
            const newItems = [];

            // Phân phối độ trễ ngẫu nhiên đồng đều (Fisher-Yates Shuffle)
            const delays = [];
            for (let j = 0; j < count; j++) {
                delays.push(j / Math.max(1, count - 1));
            }
            for (let j = count - 1; j > 0; j--) {
                const k = Math.floor(Math.random() * (j + 1));
                const tmp = delays[j];
                delays[j] = delays[k];
                delays[k] = tmp;
            }

            for (let i = 0; i < count; i++) {
                const id = targetIds[i];
                const [ux, uy, uz] = unitPoints[i];
                const cached = this.loadedTextures.get(id) || null;
                const prev = this.items.find(it => it.id === id);

                const randomOffset = (prev && typeof prev.randomOffset === 'number') ? prev.randomOffset : delays[i];
                const currentExitScale = (prev && typeof prev.currentExitScale === 'number') ? prev.currentExitScale : 1.0;

                newItems.push({
                    id: id,
                    imageSrc: PARTICIPANT_IMAGES[id],
                    cachedCanvas: cached,
                    ux: prev ? prev.ux : ux,
                    uy: prev ? prev.uy : uy,
                    uz: prev ? prev.uz : uz,
                    targetUx: ux,
                    targetUy: uy,
                    targetUz: uz,
                    entryScale: prev ? prev.entryScale : 1.0,
                    randomOffset: randomOffset,
                    currentExitScale: currentExitScale,
                    animStartScale: (prev && typeof prev.animStartScale === 'number') ? prev.animStartScale : currentExitScale,
                    x: 0,
                    y: 0,
                    z: 0,
                    screenX: 0,
                    screenY: 0,
                    scale: 1,
                    brightness: 1,
                    darkness: 0,
                    baseSize: baseSize
                });
            }

            this.items = newItems;

            if (this.loadingEl && (this.items.length >= 1 || this.items.length >= maxTarget)) {
                this.loadingEl.classList.add('hidden');
            }
        }

        // Tải trước và vẽ sẵn từng ảnh avatar lên offscreen canvas (Offscreen Texture Caching)
        setupPreloader() {
            const total = PARTICIPANT_IMAGES.length;
            this.cachedCanvases = new Array(total);

            PARTICIPANT_IMAGES.forEach((src, idx) => {
                const img = new Image();
                let isHandled = false;

                const handleSuccess = () => {
                    if (isHandled) return;
                    isHandled = true;
                    this.cacheAvatarTexture(idx, img);
                    this.imagesLoadedCount++;
                };

                const handleError = () => {
                    if (isHandled) return;
                    isHandled = true;
                    // Nếu lỗi ảnh thì tạo avatar fallback chữ cái
                    this.cacheFallbackTexture(idx);
                    this.imagesLoadedCount++;
                };

                img.onload = handleSuccess;
                img.onerror = handleError;
                // KHÔNG dùng img.crossOrigin = "anonymous" vì đây là ảnh same-origin (local).
                // Dùng crossOrigin sẽ làm tách phân vùng HTTP cache với các script khác (như matter-js)
                // và bắt trình duyệt phải gửi thêm request CORS mới bị nghẽn hàng đợi trên mạng chậm.
                img.src = src;

                // Nếu ảnh đã sẵn sàng trong bộ nhớ cache trình duyệt, xử lý ngay lập tức
                if (img.complete) {
                    if (img.naturalWidth > 0) {
                        handleSuccess();
                    } else if (img.naturalWidth === 0) {
                        handleError();
                    }
                }
            });
        }

        // Khi một ảnh tải xong -> tự động add vào khối cầu và căn chỉnh lại vị trí để các ảnh luôn cách đều nhau
        addLoadedAvatar(idx, cachedCanvas) {
            const cfg = window.PARTICIPANT_SPHERE_CONFIG;
            const maxTarget = Math.min(cfg.sphere.maxItems, PARTICIPANT_IMAGES.length);

            // Lưu vào kho ảnh đã tải sẵn
            this.loadedTextures.set(idx, cachedCanvas);

            // Nếu số lượng ảnh trên khối cầu đã đạt mốc tối đa theo cấu hình -> không thêm nữa
            if (this.items.length >= maxTarget) return;

            // Tránh thêm trùng lặp cùng 1 ảnh
            if (this.items.some(item => item.id === idx)) return;

            const isMobile = window.innerWidth <= 768;
            const baseSize = isMobile ? cfg.item.sizeMobile : cfg.item.sizeDesktop;
            const newCount = this.items.length + 1;
            const newPoints = this.generateUniformSpherePoints(newCount);

            if (this.items.length === 0) {
                // Ảnh đầu tiên xuất hiện trên khối cầu
                const [ux, uy, uz] = newPoints[0];
                this.items.push({
                    id: idx,
                    imageSrc: PARTICIPANT_IMAGES[idx],
                    cachedCanvas: cachedCanvas,
                    ux: ux,
                    uy: uy,
                    uz: uz,
                    targetUx: ux,
                    targetUy: uy,
                    targetUz: uz,
                    entryScale: 0.1,
                    randomOffset: Math.random(),
                    currentExitScale: this.isShrunk ? 0.0 : 1.0,
                    animStartScale: this.isShrunk ? 0.0 : 1.0,
                    x: 0, y: 0, z: 0,
                    screenX: 0, screenY: 0,
                    scale: 1, brightness: 1, darkness: 0,
                    baseSize: baseSize
                });
            } else {
                // Đã có K ảnh: Dùng thuật toán tham lam tìm điểm mới gần nhất cho từng ảnh cũ
                // Giúp các ảnh cũ chỉ trôi nhẹ trên mặt cầu để nhường chỗ, không bị nhảy loạn vị trí
                const used = new Set();
                for (let i = 0; i < this.items.length; i++) {
                    const item = this.items[i];
                    let bestJ = -1;
                    let bestDistSq = Infinity;
                    for (let j = 0; j < newPoints.length; j++) {
                        if (used.has(j)) continue;
                        const [tx, ty, tz] = newPoints[j];
                        const dx = item.targetUx - tx;
                        const dy = item.targetUy - ty;
                        const dz = item.targetUz - tz;
                        const dSq = dx * dx + dy * dy + dz * dz;
                        if (dSq < bestDistSq) {
                            bestDistSq = dSq;
                            bestJ = j;
                        }
                    }
                    if (bestJ !== -1) {
                        used.add(bestJ);
                        item.targetUx = newPoints[bestJ][0];
                        item.targetUy = newPoints[bestJ][1];
                        item.targetUz = newPoints[bestJ][2];
                    }
                }

                // Điểm còn lại duy nhất trong newPoints chính là khoảng trống vừa mở cho ảnh mới
                let newSlot = -1;
                for (let j = 0; j < newPoints.length; j++) {
                    if (!used.has(j)) {
                        newSlot = j;
                        break;
                    }
                }
                if (newSlot === -1) newSlot = newPoints.length - 1;
                const [nux, nuy, nuz] = newPoints[newSlot];

                this.items.push({
                    id: idx,
                    imageSrc: PARTICIPANT_IMAGES[idx],
                    cachedCanvas: cachedCanvas,
                    ux: nux,
                    uy: nuy,
                    uz: nuz,
                    targetUx: nux,
                    targetUy: nuy,
                    targetUz: nuz,
                    entryScale: 0.05,
                    randomOffset: Math.random(),
                    currentExitScale: this.isShrunk ? 0.0 : 1.0,
                    animStartScale: this.isShrunk ? 0.0 : 1.0,
                    x: 0, y: 0, z: 0,
                    screenX: 0, screenY: 0,
                    scale: 1, brightness: 1, darkness: 0,
                    baseSize: baseSize
                });
            }

            // Ẩn spinner loading ngay khi có ảnh đầu tiên hoặc đã đủ mục tiêu
            if (this.loadingEl && (this.items.length >= 1 || this.items.length >= maxTarget)) {
                this.loadingEl.classList.add('hidden');
            }

            // Bật animation loop nếu khối cầu đang trong tầm nhìn
            if (!this.isRunning && this.isVisible) {
                this.startLoop();
            }
        }

        // Cache avatar tròn không viền (borderless) trên Offscreen Canvas
        cacheAvatarTexture(idx, img) {
            const texSize = 160; // Kích thước render gốc sắc nét
            const offscreen = document.createElement('canvas');
            offscreen.width = texSize;
            offscreen.height = texSize;
            const octx = offscreen.getContext('2d');

            const center = texSize / 2;
            const radius = texSize / 2; // Chuẩn xác 100% bán kính để khớp hoàn toàn khi render

            octx.save();
            // Cắt viền tròn hoàn hảo, sạch sẽ, không có viền stroke
            octx.beginPath();
            octx.arc(center, center, radius, 0, Math.PI * 2);
            octx.closePath();
            octx.clip();

            // Đảm bảo nền canvas texture hoàn toàn trong suốt, không nền trắng, không bo góc vuông
            octx.clearRect(0, 0, texSize, texSize);

            // Cắt ảnh theo tỉ lệ 1:1 căn giữa (cover fit) và vẽ khít hình tròn
            const iw = img.naturalWidth || img.width;
            const ih = img.naturalHeight || img.height;
            let sx = 0, sy = 0, sw = iw, sh = ih;
            if (iw > ih) {
                sw = ih;
                sx = (iw - ih) / 2;
            } else if (ih > iw) {
                sh = iw;
                sy = (ih - iw) / 2;
            }

            octx.drawImage(img, sx, sy, sw, sh, 0, 0, texSize, texSize);
            octx.restore();

            // ĐÃ BỎ HOÀN TOÀN STROKE THEO YÊU CẦU

            this.cachedCanvases[idx] = offscreen;
            this.addLoadedAvatar(idx, offscreen);
        }

        cacheFallbackTexture(idx) {
            const texSize = 160;
            const offscreen = document.createElement('canvas');
            offscreen.width = texSize;
            offscreen.height = texSize;
            const octx = offscreen.getContext('2d');

            const center = texSize / 2;
            const radius = texSize / 2;

            octx.save();
            octx.beginPath();
            octx.arc(center, center, radius, 0, Math.PI * 2);
            octx.closePath();
            octx.fillStyle = '#eb4f0c';
            octx.fill();
            octx.fillStyle = '#ffffff';
            octx.font = 'bold 50px sans-serif';
            octx.textAlign = 'center';
            octx.textBaseline = 'middle';
            octx.fillText('UX', center, center);
            octx.restore();

            this.cachedCanvases[idx] = offscreen;
            this.addLoadedAvatar(idx, offscreen);
        }

        // Lắng nghe sự kiện kéo chuột và vuốt chạm
        bindEvents() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.handleResize();
                    this.updateVisibilityState();
                }, 120);
            }, { passive: true });

            // Lắng nghe cuộn trang để kích hoạt hiển thị và render khối cầu ngay lập tức
            window.addEventListener('scroll', () => {
                this.updateVisibilityState();
                this.checkScrollTrigger(performance.now());
            }, { passive: true });

            // Chuyển đổi Dark/Light mode tự động cập nhật màu overlay và vẽ lại texture nếu cần
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    this.updateThemeColors();
                    this.setupPreloader();
                });
            }

            const canvas = this.canvas;
            const interactionTarget = this.interactionEl || canvas;

            const onPointerDown = (e) => {
                this.isDragging = true;
                this.userInteracted = true;
                this.lastPointerX = e.clientX;
                this.lastPointerY = e.clientY;
                this.lastPointerTime = performance.now();
                this.strokeDx = 0;
                this.strokeDy = 0;
                this.lastMoveDx = 0;
                this.lastMoveDy = 0;
                this.velX = 0;
                this.velY = 0;
                this.pointerHistory = [{ x: e.clientX, y: e.clientY, time: performance.now() }];

                try {
                    interactionTarget.setPointerCapture(e.pointerId);
                } catch (err) { }

                if (!this.isRunning && this.isVisible) {
                    this.startLoop();
                }
            };

            const onPointerMove = (e) => {
                if (!this.isDragging) return;

                const cfg = window.PARTICIPANT_SPHERE_CONFIG;
                const now = performance.now();
                const dx = e.clientX - this.lastPointerX;
                const dy = e.clientY - this.lastPointerY;

                this.lastPointerX = e.clientX;
                this.lastPointerY = e.clientY;
                this.lastPointerTime = now;

                this.strokeDx += dx;
                this.strokeDy += dy;

                if (Math.hypot(dx, dy) > 0.5) {
                    this.lastMoveDx = dx;
                    this.lastMoveDy = dy;
                }

                // Cập nhật góc và vận tốc kéo tức thời trực tiếp theo hướng kéo trên màn hình
                const sensitivity = cfg.motion.dragSensitivity;
                const currentVelX = dx * sensitivity;
                const currentVelY = dy * sensitivity;

                this.rotateByScreenDeltas(currentVelX, currentVelY);

                // Lọc thông thấp (exponential moving average) để quán tính thả tay êm ái, mượt mà
                this.velX = this.velX * 0.35 + currentVelX * 0.65;
                this.velY = this.velY * 0.35 + currentVelY * 0.65;

                // Lưu bộ đệm lịch sử di chuyển trong 120ms gần nhất (tối ưu cho touchpad lift-off)
                if (!this.pointerHistory) this.pointerHistory = [];
                this.pointerHistory.push({ x: e.clientX, y: e.clientY, time: now });
                const historyCutoff = now - 120;
                while (this.pointerHistory.length > 1 && this.pointerHistory[0].time < historyCutoff) {
                    this.pointerHistory.shift();
                }
            };

            const onPointerUp = (e) => {
                if (this.isDragging) {
                    this.isDragging = false;
                    try {
                        if (interactionTarget.hasPointerCapture && interactionTarget.hasPointerCapture(e.pointerId)) {
                            interactionTarget.releasePointerCapture(e.pointerId);
                        }
                    } catch (err) { }

                    const now = performance.now();
                    const timeSinceLastMove = now - this.lastPointerTime;
                    const cfg = window.PARTICIPANT_SPHERE_CONFIG;
                    const sensitivity = cfg.motion.dragSensitivity;

                    // Trên Touchpad/Trackpad của Mac, khi nhấc ngón tay thường có độ trễ 80-140ms
                    // Tính vận tốc từ bộ đệm các di chuyển thực tế gần nhất trước khi nhấc tay
                    if (this.pointerHistory && this.pointerHistory.length >= 2) {
                        const oldest = this.pointerHistory[0];
                        const newest = this.pointerHistory[this.pointerHistory.length - 1];
                        const dt = newest.time - oldest.time;
                        if (dt > 10 && (now - newest.time) < 220) {
                            const sampledVx = ((newest.x - oldest.x) / dt) * 16.67 * sensitivity;
                            const sampledVy = ((newest.y - oldest.y) / dt) * 16.67 * sensitivity;
                            if (Math.hypot(sampledVx, sampledVy) > Math.hypot(this.velX, this.velY)) {
                                this.velX = sampledVx;
                                this.velY = sampledVy;
                            }
                        }
                    }

                    // Chỉ coi là người dùng cố ý dừng hẳn tay khi đã giữ yên trên 260ms
                    if (timeSinceLastMove > 260) {
                        this.velX = 0;
                        this.velY = 0;
                    }
                    this.pauseSpinUntil = 0;

                    // TÍNH TOÁN HƯỚNG TỰ QUAY ĂN THEO LẦN KÉO CUỐI CÙNG CỦA USER:
                    const velSpeed = Math.hypot(this.velX, this.velY);
                    const strokeDist = Math.hypot(this.strokeDx, this.strokeDy);
                    let rawDirX = null;
                    let rawDirY = null;

                    if (velSpeed > 0.0002) {
                        // Nhả tay khi đang văng (flick): hướng theo vector vận tốc văng
                        rawDirX = this.velX / velSpeed;
                        rawDirY = this.velY / velSpeed;
                    } else if (strokeDist > 5) {
                        // Kéo rồi dừng lại trước khi nhả: lấy hướng từ bước kéo cuối hoặc tổng quãng kéo
                        const moveDist = Math.hypot(this.lastMoveDx, this.lastMoveDy);
                        if (moveDist > 1) {
                            rawDirX = this.lastMoveDx / moveDist;
                            rawDirY = this.lastMoveDy / moveDist;
                        } else {
                            rawDirX = this.strokeDx / strokeDist;
                            rawDirY = this.strokeDy / strokeDist;
                        }
                    }

                    if (rawDirX !== null && rawDirY !== null) {
                        // Tối ưu trải nghiệm:
                        // - Nếu kéo gần như ngang (< 8 độ dọc) -> snap về xoay ngang thuần túy
                        // - Nếu kéo gần như dọc (< 8 độ ngang) -> snap về xoay dọc thuần túy
                        // - Nếu kéo chéo -> giữ nguyên góc chéo theo đúng hướng kéo của user
                        if (Math.abs(rawDirY) < 0.14) {
                            rawDirY = 0;
                            rawDirX = Math.sign(rawDirX) || 1;
                        } else if (Math.abs(rawDirX) < 0.14) {
                            rawDirX = 0;
                            rawDirY = Math.sign(rawDirY) || 1;
                        } else {
                            const len = Math.hypot(rawDirX, rawDirY);
                            rawDirX /= len;
                            rawDirY /= len;
                        }

                        this.autoSpinDirX = rawDirX;
                        this.autoSpinDirY = rawDirY;
                    }
                }
            };

            interactionTarget.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        }

        checkVisibility() {
            const targetEl = document.getElementById('participant-case-study') || this.wrapper;
            if (!targetEl) return false;
            const rect = targetEl.getBoundingClientRect();
            // Section hiển thị trong viewport khi mép trên cách mép dưới màn hình < 150px và mép dưới > -150px
            return (rect.top < window.innerHeight + 150 && rect.bottom > -150);
        }

        updateVisibilityState() {
            const wasVisible = this.isVisible;
            const isNowVisible = this.checkVisibility();
            this.isVisible = isNowVisible;

            if (this.isVisible) {
                if (!this.isRunning) {
                    this.startLoop();
                }
                if (this.interactionEl && !this.isShrunk && !this.isFrozen) {
                    this.interactionEl.style.pointerEvents = 'auto';
                }
            } else if (wasVisible && !this.isExitAnimating) {
                this.stopLoop();
                if (this.interactionEl) {
                    this.interactionEl.style.pointerEvents = 'none';
                }
            }
            return this.isVisible;
        }

        setupIntersectionObserver() {
            if (!('IntersectionObserver' in window)) {
                // Fallback an toàn cho môi trường không hỗ trợ IntersectionObserver
                this.isVisible = true;
                this.startLoop();
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const wasVisible = this.isVisible;
                    this.isVisible = entry.isIntersecting || this.checkVisibility();

                    if (this.isVisible) {
                        // Vừa cuộn vào viewport -> Kích hoạt vòng lặp tính toán và render mượt mà
                        if (!this.isRunning) {
                            this.startLoop();
                        }
                        if (this.interactionEl && !this.isShrunk && !this.isFrozen) {
                            this.interactionEl.style.pointerEvents = 'auto';
                        }
                    } else if (wasVisible && !this.isExitAnimating) {
                        // Cuộn ra khỏi viewport -> Tạm dừng hoàn toàn vòng lặp, triệt tiêu 100% CPU/GPU
                        this.stopLoop();
                        if (this.interactionEl) {
                            this.interactionEl.style.pointerEvents = 'none';
                        }
                    }
                });
            }, {
                root: null, // Theo dõi viewport trình duyệt
                rootMargin: '150px 0px 150px 0px', // Đệm 150px để khởi động sẵn trước khi lọt vào tầm mắt
                threshold: 0 // Kích hoạt ngay khi 1px mép section chạm vào viewport
            });

            const targetObserved = document.getElementById('participant-case-study') || this.wrapper;
            observer.observe(targetObserved);
            this.observer = observer;

            // Tối ưu hóa khi chuyển đổi Tab trình duyệt (Page Visibility API)
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stopLoop();
                } else if (this.isVisible) {
                    this.startLoop();
                }
            });
        }

        startLoop() {
            // Chỉ chạy khi chưa chạy VÀ đang hiển thị trong viewport VÀ tab đang mở
            if (this.isRunning || !this.isVisible || document.hidden) return;
            this.isRunning = true;
            let lastTime = performance.now();

            const tick = (now) => {
                // Bảo vệ vòng lặp: Nếu rời khỏi viewport thì lập tức dừng ngay
                if (!this.isRunning || !this.isVisible || document.hidden) {
                    this.stopLoop();
                    return;
                }

                const dt = Math.min(32, now - lastTime);
                lastTime = now;

                this.updatePhysics(dt);
                this.render();

                this.rafId = requestAnimationFrame(tick);
            };

            this.rafId = requestAnimationFrame(tick);
        }

        stopLoop() {
            this.isRunning = false;
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
        }

        // Xoay ma trận định hướng 3D trực tiếp theo độ dời kéo trên màn hình (Screen-Space Incremental Rotation)
        // Đảm bảo kéo sang bên nào thì mặt trước của khối cầu luôn xoay theo đúng bên đó,
        // bất kể quả cầu đang ở góc xoay hay hướng lật nào trong không gian.
        rotateByScreenDeltas(deltaX, deltaY) {
            if (Math.abs(deltaX) < 1e-7 && Math.abs(deltaY) < 1e-7) return;

            const alpha = deltaX;
            const beta = -deltaY;
            const ca = Math.cos(alpha), sa = Math.sin(alpha);
            const cb = Math.cos(beta), sb = Math.sin(beta);

            // Ma trận xoay gia số R = Ry(alpha) * Rx(beta) trong hệ quy chiếu màn hình
            const r00 = ca, r01 = sa * sb, r02 = sa * cb;
            const r10 = 0, r11 = cb, r12 = -sb;
            const r20 = -sa, r21 = ca * sb, r22 = ca * cb;

            const m = this.rotMatrix;
            const m00 = m[0], m01 = m[1], m02 = m[2];
            const m10 = m[3], m11 = m[4], m12 = m[5];
            const m20 = m[6], m21 = m[7], m22 = m[8];

            // Nhân ma trận từ bên trái (M_new = R * M_old) để quay quanh các trục màn hình cố định
            m[0] = r00 * m00 + r01 * m10 + r02 * m20;
            m[1] = r00 * m01 + r01 * m11 + r02 * m21;
            m[2] = r00 * m02 + r01 * m12 + r02 * m22;

            m[3] = r10 * m00 + r11 * m10 + r12 * m20;
            m[4] = r10 * m01 + r11 * m11 + r12 * m21;
            m[5] = r10 * m02 + r11 * m12 + r12 * m22;

            m[6] = r20 * m00 + r21 * m10 + r22 * m20;
            m[7] = r20 * m01 + r21 * m11 + r22 * m21;
            m[8] = r20 * m02 + r21 * m12 + r22 * m22;

            // Trực chuẩn hóa Gram-Schmidt (chống tích lũy sai số trôi số thực)
            let len0 = Math.hypot(m[0], m[1], m[2]);
            if (len0 > 1e-6) {
                m[0] /= len0;
                m[1] /= len0;
                m[2] /= len0;
            }

            const dot01 = m[3] * m[0] + m[4] * m[1] + m[5] * m[2];
            m[3] -= dot01 * m[0];
            m[4] -= dot01 * m[1];
            m[5] -= dot01 * m[2];
            let len1 = Math.hypot(m[3], m[4], m[5]);
            if (len1 > 1e-6) {
                m[3] /= len1;
                m[4] /= len1;
                m[5] /= len1;
            }

            m[6] = m[1] * m[5] - m[2] * m[4];
            m[7] = m[2] * m[3] - m[0] * m[5];
            m[8] = m[0] * m[4] - m[1] * m[3];
        }

        // Cập nhật vật lý xoay và ma trận 3D (chỉ tính toán khi trong viewport hoặc đang chạy animation)
        updatePhysics(dt, force = false) {
            if ((!this.isVisible && !this.isExitAnimating && !force) || document.hidden) return;
            const cfg = window.PARTICIPANT_SPHERE_CONFIG;

            // 1. Kiểm tra ScrollTrigger kích hoạt thu nhỏ khối cầu độc lập với tốc độ cuộn chuột
            const now = performance.now();
            this.checkScrollTrigger(now);
            this.updateExitAnimation(now);

            if (!this.isDragging) {
                if (this.isFrozen) {
                    this.velX = 0;
                    this.velY = 0;
                } else {
                    // Tốc độ tự quay chuẩn (Target Cruise Speed)
                    const baseSpeed = Math.hypot(cfg.motion.autoSpinY, cfg.motion.autoSpinX) || Math.abs(cfg.motion.autoSpinY) || 0.02;
                    const targetVelX = this.autoSpinDirX * baseSpeed;
                    const targetVelY = this.autoSpinDirY * baseSpeed;

                    const currentSpeed = Math.hypot(this.velX, this.velY);
                    const isPaused = performance.now() < this.pauseSpinUntil;

                    if (isPaused) {
                        // Đang trong khoảng nghỉ ngắn sau khi người dùng cố ý dừng tay xem ảnh
                        this.velX = 0;
                        this.velY = 0;
                    } else if (currentSpeed > baseSpeed) {
                        // Khi vừa thả tay với vận tốc quán tính cao: Hãm đà quán tính êm ái
                        this.velX *= cfg.motion.inertiaDamping;
                        this.velY *= cfg.motion.inertiaDamping;

                        // Khi giảm tốc về gần tốc độ tự quay, chuyển tiếp mượt mà vào tốc độ tự quay
                        const newSpeed = Math.hypot(this.velX, this.velY);
                        if (newSpeed <= baseSpeed) {
                            this.velX = targetVelX;
                            this.velY = targetVelY;
                        }
                    } else {
                        // Khi tốc độ thấp hơn tốc độ tự quay: êm ái tăng tốc về targetVel theo hướng kéo cuối cùng
                        const restore = Math.max(0.015, cfg.motion.idleRestoreSpeed || 0.02);
                        this.velX += (targetVelX - this.velX) * restore;
                        this.velY += (targetVelY - this.velY) * restore;
                    }

                    this.rotateByScreenDeltas(this.velX, this.velY);
                }
            }

            const m = this.rotMatrix;
            const isMobile = window.innerWidth <= 768;
            const radius = this.currentRadius || (isMobile ? cfg.sphere.radiusMobile : cfg.sphere.radiusDesktop);
            const baseSize = isMobile ? cfg.item.sizeMobile : cfg.item.sizeDesktop;
            const minScale = typeof cfg.item.minScale !== 'undefined' ? cfg.item.minScale : 0.36;
            const minBrightness = typeof cfg.item.minBrightness !== 'undefined' ? cfg.item.minBrightness : 0.18;
            const focal = Math.max(150, cfg.sphere.focalLength || 640);

            const centerX = this.width / 2;
            const centerY = this.height / 2;

            // Xoay từng item trong không gian 3D
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];

                // Hiệu ứng dịch chuyển mượt mà về tọa độ cân bằng mới (Thomson Relaxation Lerp)
                const dux = item.targetUx - item.ux;
                const duy = item.targetUy - item.uy;
                const duz = item.targetUz - item.uz;
                if (dux * dux + duy * duy + duz * duz > 1e-6) {
                    item.ux += dux * 0.12;
                    item.uy += duy * 0.12;
                    item.uz += duz * 0.12;
                    const inv = 1 / Math.hypot(item.ux, item.uy, item.uz);
                    item.ux *= inv;
                    item.uy *= inv;
                    item.uz *= inv;
                } else {
                    item.ux = item.targetUx;
                    item.uy = item.targetUy;
                    item.uz = item.targetUz;
                }

                // Hiệu ứng bung nở ảnh mượt mà khi mới xuất hiện (Pop-in Bloom)
                if (item.entryScale < 0.999) {
                    item.entryScale += (1.0 - item.entryScale) * 0.14;
                } else {
                    item.entryScale = 1.0;
                }

                // Tọa độ 3D sau khi xoay bằng ma trận trực tiếp theo không gian màn hình
                const rx = m[0] * item.ux + m[1] * item.uy + m[2] * item.uz;
                const ry = m[3] * item.ux + m[4] * item.uy + m[5] * item.uz;
                const rz = m[6] * item.ux + m[7] * item.uy + m[8] * item.uz;

                // rz nằm trong khoảng [-1.0, +1.0]
                // +1.0 là MẶT TRƯỚC (gần camera nhất)
                // -1.0 là MẶT SAU (xa camera nhất)
                item.x = rx * radius;
                item.y = ry * radius;
                item.z = rz * radius;
                item.normDepth = rz; // -1 (xa nhất) đến +1 (gần nhất)

                // 3. Phối cảnh vị trí dựa trên focalLength:
                // focalLength càng nhỏ thì góc nhìn càng rộng/cong (fisheye), lớn thì phẳng hơn
                const focalFactor = 450 / focal;
                const posPerspective = 1.0 + (rz * 0.15 * focalFactor);
                item.screenX = centerX + item.x * posPerspective;
                item.screenY = centerY + item.y * posPerspective;

                // 4. KÍCH THƯỚC ẢNH VÀ ĐỘ SÁNG MƯỢT MÀ THEO CHIỀU SÂU Z:
                // Chuẩn hóa chiều sâu về khoảng [0, 1]: 1 (ở gần nhất), 0 (ở xa nhất)
                const t = Math.max(0, Math.min(1, (rz + 1) / 2));

                // Sử dụng hàm làm mượt Hermite Smoothstep (C1 Continuous Curve):
                // tSmooth = 3*t^2 - 2*t^3 triệt tiêu hoàn toàn hiện tượng nhảy nấc / giật ở biên
                const tSmooth = t * t * (3 - 2 * t);

                // Kích thước: Mặt trước to nhất (1.0), mặt sau nhỏ dần về minScale
                item.scale = minScale + (1 - minScale) * tSmooth;
                item.baseSize = baseSize;

                // Độ sáng: Mặt gần nhất sáng 100% (1.0), mặt xa nhất tối mượt mà về minBrightness
                item.brightness = minBrightness + (1 - minBrightness) * tSmooth;
            }

            // 5. Painter's Algorithm: Sắp xếp theo chiều sâu z từ xa đến gần
            // Nhờ đó ảnh ở trước (z lớn hơn) sẽ vẽ đè lên và che khuất ảnh ở sau (z nhỏ hơn)
            this.items.sort((a, b) => a.z - b.z);
        }

        // ---------------------------------------------------------------------
        // ĐIỀU KHIỂN TIẾN TRÌNH THU NHỎ TỪ SHOWCASE ĐIỀU PHỐI CHUNG
        // ---------------------------------------------------------------------
        setShrinkProgress(ratio, keepMemberIds = []) {
            this.isControlledByShowcase = true;
            const r = Math.max(0, Math.min(1, ratio));
            const hasKeep = Array.isArray(keepMemberIds) && keepMemberIds.length > 0;

            // Nếu đang ở Phase 1 (r <= 0): đảm bảo quả cầu luôn ở trạng thái hiển thị đầy đủ, không bị ẩn hay dừng
            if (r <= 0) {
                this.isVisible = true;
                this.isShrunk = false;
                this.isFrozen = false;
                if (this.wrapper) {
                    this.wrapper.style.opacity = '1';
                    this.wrapper.style.pointerEvents = 'none';
                }
                if (this.interactionEl) {
                    this.interactionEl.style.pointerEvents = 'auto';
                }
                if (this.items) {
                    for (let i = 0; i < this.items.length; i++) {
                        this.items[i].currentExitScale = 1.0;
                    }
                }
                if (!this.isRunning) {
                    this.startLoop();
                }
            }

            // Đọc cấu hình thời gian delay và thời gian thu nhỏ
            const cfg = window.PARTICIPANT_SPHERE_CONFIG;
            const caseCfg = window.CASE_STUDY_CONFIG;
            const exitCfg = (cfg && cfg.exitAnimation) ? cfg.exitAnimation : DEFAULT_CONFIG.exitAnimation;

            const shrinkDuration = (caseCfg && typeof caseCfg.sphereShrinkDuration === 'number')
                ? caseCfg.sphereShrinkDuration
                : ((exitCfg && typeof exitCfg.shrinkDuration === 'number') ? exitCfg.shrinkDuration : 0.35);

            const staggerWindow = (caseCfg && typeof caseCfg.sphereRandomStagger === 'number')
                ? caseCfg.sphereRandomStagger
                : ((exitCfg && typeof exitCfg.randomStaggerWindow === 'number') ? exitCfg.randomStaggerWindow : 0.50);

            const totalDuration = Math.max(0.01, staggerWindow + shrinkDuration);

            for (let i = 0; i < this.items.length; i++) {
                const it = this.items[i];
                const memberId = it.imageSrc ? it.imageSrc.split('/').pop().replace(/\.[^/.]+$/, '') : '';
                const isMemberToKeep = hasKeep && keepMemberIds.includes(memberId);

                if (isMemberToKeep) {
                    // Thành viên của Case Study 1: giữ nguyên scale 1.0 (hoặc 0.0 nếu showcase đang render bay sang sidebar)
                    it.currentExitScale = this.membersHidden ? 0.0 : 1.0;
                } else {
                    // Ảnh không thuộc Case Study 1: thu nhỏ ngẫu nhiên và có delay giữa các ảnh
                    if (r <= 0) {
                        it.currentExitScale = 1.0;
                    } else if (r >= 1.0) {
                        it.currentExitScale = 0.0;
                    } else {
                        if (typeof it.randomOffset !== 'number') {
                            it.randomOffset = (i * 0.381966) % 1.0;
                        }
                        const startRatio = (it.randomOffset * staggerWindow) / totalDuration;
                        const endRatio = startRatio + (shrinkDuration / totalDuration);

                        if (r <= startRatio) {
                            it.currentExitScale = 1.0;
                        } else if (r >= endRatio) {
                            it.currentExitScale = 0.0;
                        } else {
                            const localP = (r - startRatio) / Math.max(0.0001, endRatio - startRatio);
                            // Easing mượt mà cubicInOut
                            const ease = localP < 0.5 ? 4 * localP * localP * localP : 1 - Math.pow(-2 * localP + 2, 3) / 2;
                            it.currentExitScale = Math.max(0, Math.min(1, 1.0 - ease));
                        }
                    }
                }
            }

            // Khi bắt đầu chuyển cảnh (r > 0): đóng băng chuyển động xoay quả cầu để tọa độ xuất phát avatar Case 1 cố định
            if (r > 0) {
                this.velX = 0;
                this.velY = 0;
                this.isFrozen = true;
                if (this.interactionEl) {
                    this.interactionEl.style.pointerEvents = 'none';
                }
            } else {
                this.isFrozen = false;
                if (this.interactionEl && !this.isShrunk) {
                    this.interactionEl.style.pointerEvents = 'auto';
                }
            }

            // Toàn bộ quả cầu chỉ ẩn đi khi tất cả các ảnh khác đã thu nhỏ xong hoàn toàn (r >= 0.98)
            const allOthersDone = r >= 0.98;
            this.isShrunk = allOthersDone;
            if (this.wrapper) {
                this.wrapper.style.opacity = allOthersDone ? '0' : '1';
                this.wrapper.style.pointerEvents = 'none';
            }
            if (this.interactionEl) {
                this.interactionEl.style.pointerEvents = (allOthersDone || r > 0) ? 'none' : 'auto';
            }

            // Quản lý vòng lặp rAF: chỉ dừng khi quả cầu đã ẩn hoàn toàn
            if (allOthersDone) {
                this.stopLoop();
            } else {
                if (this.checkVisibility()) {
                    this.isVisible = true;
                }
                if (!this.isRunning && this.isVisible) {
                    this.startLoop();
                }
            }
        }

        // Lấy tọa độ màn hình thực tế của các avatar thành viên đang đứng trên khối cầu
        getMemberPositions(memberIds) {
            if (!Array.isArray(memberIds) || !this.items) return [];
            const rect = this.canvas ? this.canvas.getBoundingClientRect() : { left: 0, top: 0 };
            const results = [];

            for (const id of memberIds) {
                const item = this.items.find(it => {
                    if (!it.imageSrc) return false;
                    const itId = it.imageSrc.split('/').pop().replace(/\.[^/.]+$/, '');
                    return itId === id;
                });

                if (item) {
                    const normZ = typeof item.normDepth === 'number' ? item.normDepth : 1.0;
                    results.push({
                        id: id,
                        imageSrc: item.imageSrc,
                        screenX: Math.round((item.screenX || (this.width / 2)) + rect.left),
                        screenY: Math.round((item.screenY || (this.height / 2)) + rect.top),
                        size: Math.round((item.baseSize || 68) * (item.scale || 1.0)),
                        normZ: normZ
                    });
                }
            }
            return results;
        }

        // Ẩn/Hiện riêng các ảnh của thành viên trên canvas khi bắt đầu bay sang sidebar
        hideMembers(memberIds, hide = true) {
            this.membersHidden = hide;
            if (this.items && Array.isArray(memberIds)) {
                for (let i = 0; i < this.items.length; i++) {
                    const it = this.items[i];
                    const itId = it.imageSrc ? it.imageSrc.split('/').pop().replace(/\.[^/.]+$/, '') : '';
                    if (memberIds.includes(itId)) {
                        it.currentExitScale = hide ? 0.0 : 1.0;
                    }
                }
            }

            if (!hide) {
                // Khi hiển thị lại toàn bộ khối cầu (cuộn ngược lại step <= 1.0)
                if (this.items) {
                    for (let i = 0; i < this.items.length; i++) {
                        this.items[i].currentExitScale = 1.0;
                    }
                }
                if (this.wrapper) {
                    this.wrapper.style.opacity = '1';
                    this.wrapper.style.pointerEvents = 'none';
                }
                if (this.interactionEl) {
                    this.interactionEl.style.pointerEvents = 'auto';
                }
                this.isShrunk = false;
                this.isFrozen = false;
                if (this.checkVisibility()) {
                    this.isVisible = true;
                }
                if (!this.isRunning && this.isVisible) {
                    this.startLoop();
                }
            }
        }

        // ---------------------------------------------------------------------
        // KIỂM TRA SCROLLTRIGGER THU NHỎ / BUNG NỞ KHỐI CẦU NGẪU NHIÊN
        // ---------------------------------------------------------------------
        checkScrollTrigger(now = performance.now()) {
            if (this.isControlledByShowcase) return;
            if (!this.wrapper) return;
            const cfg = window.PARTICIPANT_SPHERE_CONFIG;
            const exitCfg = (cfg && cfg.exitAnimation) ? cfg.exitAnimation : DEFAULT_CONFIG.exitAnimation;
            const triggerRatio = typeof exitCfg.triggerRatio === 'number' ? exitCfg.triggerRatio : 0.75;

            const bRect = this.wrapper.getBoundingClientRect();
            // scrolledRatio: tỉ lệ phần quả cầu đã cuộn vượt qua đỉnh viewport
            // Khi bRect.top <= -bRect.height * 0.75 -> 3/4 quả cầu đã đi đến đỉnh viewport
            const scrolledRatio = -bRect.top / Math.max(1, bRect.height);

            const shouldShrink = scrolledRatio >= triggerRatio;

            if (typeof this.isShrunk === 'undefined') {
                this.isShrunk = shouldShrink;
                const initialScale = shouldShrink ? 0.0 : 1.0;
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].currentExitScale = initialScale;
                    this.items[i].animStartScale = initialScale;
                }
                return;
            }

            if (shouldShrink !== this.isShrunk) {
                this.isShrunk = shouldShrink;
                this.exitAnimStartTime = now;
                this.isExitAnimating = true;

                for (let i = 0; i < this.items.length; i++) {
                    const it = this.items[i];
                    it.animStartScale = (typeof it.currentExitScale === 'number') ? it.currentExitScale : (shouldShrink ? 1.0 : 0.0);
                }

                if (!this.isRunning) {
                    this.startLoop();
                }
            }
        }

        // Cập nhật scale thu nhỏ ngẫu nhiên theo thời gian thực (autonomous RAF animation)
        updateExitAnimation(now = performance.now()) {
            if (this.isControlledByShowcase) return;
            if (!this.isExitAnimating) return;

            const cfg = window.PARTICIPANT_SPHERE_CONFIG;
            const exitCfg = (cfg && cfg.exitAnimation) ? cfg.exitAnimation : DEFAULT_CONFIG.exitAnimation;
            const shrinkDuration = Math.max(0.05, exitCfg.shrinkDuration || 0.65) * 1000;
            const staggerWindow = Math.max(0.01, exitCfg.randomStaggerWindow || 0.45) * 1000;
            const totalDuration = staggerWindow + shrinkDuration;

            const elapsed = now - (this.exitAnimStartTime || now);
            const targetScale = this.isShrunk ? 0.0 : 1.0;
            let allFinished = true;

            for (let i = 0; i < this.items.length; i++) {
                const it = this.items[i];
                if (typeof it.randomOffset !== 'number') it.randomOffset = Math.random();
                if (typeof it.animStartScale !== 'number') it.animStartScale = (typeof it.currentExitScale === 'number') ? it.currentExitScale : (this.isShrunk ? 1.0 : 0.0);

                // Khi thu nhỏ: rải theo randomOffset. Khi bung nở: rải theo (1.0 - randomOffset)
                const delay = (this.isShrunk ? it.randomOffset : (1.0 - it.randomOffset)) * staggerWindow;
                const localElapsed = elapsed - delay;

                if (localElapsed <= 0) {
                    it.currentExitScale = it.animStartScale;
                    allFinished = false;
                } else if (localElapsed < shrinkDuration) {
                    const p = localElapsed / shrinkDuration;
                    // EaseInOutCubic mượt mà
                    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
                    it.currentExitScale = it.animStartScale + (targetScale - it.animStartScale) * ease;
                    allFinished = false;
                } else {
                    it.currentExitScale = targetScale;
                }
            }

            if (elapsed >= totalDuration && allFinished) {
                this.isExitAnimating = false;
            }
        }

        // Vẽ tất cả avatar lên Canvas 2D (chỉ render khi trong viewport hoặc đang chạy animation)
        render() {
            if ((!this.isVisible && !this.isExitAnimating) || document.hidden) return;
            const ctx = this.ctx;
            if (!ctx) return;

            ctx.save();
            ctx.scale(this.dpr, this.dpr);
            ctx.clearRect(0, 0, this.width, this.height);

            const isDark = this.isDarkMode();
            if (isDark !== this.lastDarkState || !this.overlayRgb) {
                this.updateThemeColors();
            }
            const [ovR, ovG, ovB] = this.overlayRgb;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                const cached = item.cachedCanvas;
                if (!cached) continue;

                // Sử dụng tỉ lệ thu nhỏ ngẫu nhiên đã được tính toán trong updateExitAnimation
                const exitScale = (typeof item.currentExitScale === 'number') ? item.currentExitScale : 1.0;
                const entry = (item.entryScale || 1.0) * exitScale;
                const renderSize = item.baseSize * item.scale * entry;
                if (renderSize < 0.5 || entry <= 0.001) continue;

                const drawX = item.screenX - renderSize / 2;
                const drawY = item.screenY - renderSize / 2;
                const radius = renderSize / 2;

                ctx.save();
                // Tuyệt đối không dùng opacity mờ để tránh bóng ma (ghosting)
                ctx.globalAlpha = 1.0;

                // 1. Bóng đổ chuyển mượt theo độ sâu (chỉ cho các avatar ở nửa trước)
                const normZ = item.normDepth; // [-1.0, +1.0]
                if (normZ > 0.15 && entry > 0.3) {
                    const shadowFactor = (normZ - 0.15) / 0.85;
                    const shadowAlpha = shadowFactor * shadowFactor * (isDark ? 0.45 : 0.14) * entry;
                    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha.toFixed(2)})`;
                    ctx.shadowBlur = Math.round(10 * item.scale * entry);
                    ctx.shadowOffsetY = Math.round(3 * item.scale * entry);
                }

                // 2. Vẽ ảnh avatar tròn đặc hoàn toàn từ Offscreen Canvas (siêu mượt, GPU blitted)
                ctx.drawImage(cached, drawX, drawY, renderSize, renderSize);

                // 3. Phủ lớp overlay theo độ sâu (Continuous Depth Atmospheric Shading):
                // Ăn theo trực tiếp biến CSS --body-background từ definition.css:
                // - Dark Mode:  --body-background (#000000) -> hòa quyện tự nhiên vào nền đen
                // - Light Mode: --body-background (#F9F6F1) -> hòa quyện tự nhiên vào nền sáng kem
                const depthFade = 1 - item.brightness;
                if (depthFade > 0.01) {
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetY = 0;

                    ctx.beginPath();
                    ctx.arc(item.screenX, item.screenY, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${ovR}, ${ovG}, ${ovB}, ${depthFade.toFixed(3)})`;
                    ctx.fill();
                }

                ctx.restore();
            }

            ctx.restore();
        }
    }

    // =========================================================================
    // 4. BẢNG ĐIỀU KHIỂN CẤU HÌNH LIVE (CONFIG UI PANEL)
    // =========================================================================
    class ParticipantSphereConfigUI {
        constructor(sphereInstance) {
            this.sphere = sphereInstance;
            this.panelEl = null;
            this.toggleEl = null;
            this.toastEl = null;
            this.isOpen = false;

            this.init();
        }

        init() {
            // Bảng điều khiển Panel (Hiện trực tiếp khi devMode.showConfigToggle = true)
            this.panelEl = document.createElement('div');
            this.panelEl.className = 'motion-tuner-panel sphere-tuner-panel';
            this.panelEl.id = 'participant-config-panel';
            this.panelEl.innerHTML = `
                <div class="motion-tuner-header">
                    <h4 class="motion-tuner-title">⚙ Sphere 3D Motion Tuner</h4>
                </div>
                <div class="motion-tuner-body" id="participant-config-body"></div>
                <div class="motion-tuner-actions">
                    <button type="button" class="motion-tuner-btn" id="p-cfg-copy">📋 Copy Config</button>
                    <button type="button" class="motion-tuner-btn motion-tuner-btn-secondary" id="p-cfg-reset">↺ Khôi phục</button>
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
            const body = this.panelEl.querySelector('#participant-config-body');
            if (!body) return;
            body.innerHTML = '';

            const SCHEMAS = [
                {
                    title: '🌐 Khối cầu 3D (Sphere Geometry)',
                    group: 'sphere',
                    fields: [
                        { key: 'radiusDesktop', label: 'Bán kính Desktop (px)', min: 20, max: 1600, step: 5, digits: 0 },
                        { key: 'radiusMobile', label: 'Bán kính Mobile (px)', min: 10, max: 800, step: 5, digits: 0 },
                        { key: 'canvasPadding', label: 'Đệm an toàn canvas (px)', min: 40, max: 600, step: 10, digits: 0 },
                        { key: 'focalLength', label: 'Tiêu cự phối cảnh (Focal Length)', min: 50, max: 6000, step: 20, digits: 0 },
                        { key: 'maxItems', label: 'Số lượng ảnh hiển thị', min: 2, max: 400, step: 1, digits: 0 }
                    ]
                },
                {
                    title: '🖼️ Ảnh đại diện (Avatars)',
                    group: 'item',
                    fields: [
                        { key: 'sizeDesktop', label: 'Kích thước ảnh Desktop (px)', min: 8, max: 360, step: 2, digits: 0 },
                        { key: 'sizeMobile', label: 'Kích thước ảnh Mobile (px)', min: 6, max: 240, step: 2, digits: 0 },
                        { key: 'minScale', label: 'Tỉ lệ thu nhỏ ở mặt sau', min: 0.01, max: 1.00, step: 0.01, digits: 2 },
                        { key: 'minBrightness', label: 'Độ sáng mặt sau (0=đen, 1=sáng)', min: 0.00, max: 1.00, step: 0.01, digits: 2 }
                    ]
                },
                {
                    title: '✨ Chuyển động & Quán tính (Motion Physics)',
                    group: 'motion',
                    fields: [
                        { key: 'autoSpinY', label: 'Tốc độ tự quay ngang (Y)', min: -0.100, max: 0.100, step: 0.001, digits: 4 },
                        { key: 'autoSpinX', label: 'Tốc độ tự quay dọc (X)', min: -0.080, max: 0.080, step: 0.001, digits: 4 },
                        { key: 'dragSensitivity', label: 'Độ nhạy vuốt / kéo chuột', min: 0.0002, max: 0.0800, step: 0.0005, digits: 4 },
                        { key: 'inertiaDamping', label: 'Giảm chấn quán tính', min: 0.200, max: 0.999, step: 0.001, digits: 3 },
                        { key: 'idleRestoreSpeed', label: 'Tốc độ hồi về tự xoay', min: 0.001, max: 0.400, step: 0.002, digits: 3 }
                    ]
                },
                {
                    title: '💥 Hiệu ứng thu nhỏ khi thoát (Exit Animation)',
                    group: 'exitAnimation',
                    fields: [
                        { key: 'triggerRatio', label: 'Tọa độ trigger (tỉ lệ top)', min: 0.10, max: 1.00, step: 0.05, digits: 2 },
                        { key: 'shrinkDuration', label: 'Thời gian thu nhỏ mỗi ảnh (s)', min: 0.05, max: 2.00, step: 0.05, digits: 2 },
                        { key: 'randomStaggerWindow', label: 'Thời gian delay giữa các ảnh (s)', min: 0.05, max: 2.00, step: 0.05, digits: 2 }
                    ]
                }
            ];

            const cfg = window.PARTICIPANT_SPHERE_CONFIG;

            SCHEMAS.forEach(schema => {
                const groupEl = document.createElement('div');
                groupEl.style.display = 'flex';
                groupEl.style.flexDirection = 'column';
                groupEl.style.gap = '8px';

                const titleEl = document.createElement('div');
                titleEl.className = 'motion-tuner-group-title';
                titleEl.textContent = schema.title;
                groupEl.appendChild(titleEl);

                schema.fields.forEach(field => {
                    const row = document.createElement('div');
                    row.className = 'motion-tuner-row';

                    const currentVal = cfg[schema.group][field.key];
                    let valText = typeof currentVal === 'number' ? currentVal.toFixed(field.digits) : currentVal;
                    if (field.key === 'maxItems') {
                        const totalFiles = PARTICIPANT_IMAGES.length;
                        const actual = Math.min(Math.round(currentVal), totalFiles);
                        valText = currentVal > totalFiles ? `${Math.round(currentVal)} (hiện có: ${actual} ảnh)` : `${Math.round(currentVal)} ảnh`;
                    }

                    row.innerHTML = `
                        <div class="motion-tuner-label-wrap">
                            <span>${field.label}</span>
                            <span class="motion-tuner-val" id="val-${schema.group}-${field.key}">${valText}</span>
                        </div>
                        <input type="range" class="motion-tuner-slider" 
                               min="${field.min}" max="${field.max}" step="${field.step}" value="${currentVal}"
                               data-group="${schema.group}" data-key="${field.key}" data-digits="${field.digits}" />
                    `;
                    groupEl.appendChild(row);
                });

                body.appendChild(groupEl);
            });
        }

        bindEvents() {
            // Lắng nghe slider thay đổi thời gian thực
            this.panelEl.addEventListener('input', (e) => {
                const slider = e.target.closest('.motion-tuner-slider');
                if (!slider) return;

                const group = slider.dataset.group;
                const key = slider.dataset.key;
                const digits = parseInt(slider.dataset.digits || '2', 10);
                const val = parseFloat(slider.value);

                window.PARTICIPANT_SPHERE_CONFIG[group][key] = val;

                const valEl = this.panelEl.querySelector(`#val-${group}-${key}`);
                if (valEl) {
                    if (key === 'maxItems') {
                        const totalFiles = PARTICIPANT_IMAGES.length;
                        const actual = Math.min(Math.round(val), totalFiles);
                        valEl.textContent = val > totalFiles ? `${Math.round(val)} (hiện có: ${actual} ảnh)` : `${Math.round(val)} ảnh`;
                    } else {
                        valEl.textContent = val.toFixed(digits);
                    }
                }


                // Khi chỉnh tốc độ quay: Lập tức kích hoạt tốc độ mới ngay lập tức
                if (key === 'autoSpinY' || key === 'autoSpinX') {
                    const spdY = window.PARTICIPANT_SPHERE_CONFIG.motion.autoSpinY;
                    const spdX = window.PARTICIPANT_SPHERE_CONFIG.motion.autoSpinX;
                    const mag = Math.hypot(spdY, spdX);
                    if (mag > 0.0001) {
                        this.sphere.autoSpinDirX = spdY / mag;
                        this.sphere.autoSpinDirY = spdX / mag;
                    }
                    this.sphere.pauseSpinUntil = 0;
                    this.sphere.velX = spdY;
                    this.sphere.velY = spdX;
                }

                // Cập nhật lại hình học và kích thước canvas nếu thay đổi bán kính, kích thước, tiêu cự, số lượng hoặc đệm canvas
                if (key === 'radiusDesktop' || key === 'radiusMobile' || key === 'sizeDesktop' || key === 'sizeMobile' || key === 'maxItems' || key === 'focalLength' || key === 'canvasPadding') {
                    this.sphere.handleResize();
                }

                if (group === 'exitAnimation') {
                    if (window.CASE_STUDY_CONFIG) {
                        if (key === 'shrinkDuration') window.CASE_STUDY_CONFIG.sphereShrinkDuration = val;
                        if (key === 'randomStaggerWindow') window.CASE_STUDY_CONFIG.sphereRandomStagger = val;
                    }
                    this.sphere.checkScrollTrigger(performance.now());
                }

                if (!this.sphere.isRunning && this.sphere.isVisible) {
                    this.sphere.startLoop();
                }
            });

            // Copy Config
            this.panelEl.querySelector('#p-cfg-copy').addEventListener('click', () => {
                const json = JSON.stringify(window.PARTICIPANT_SPHERE_CONFIG, null, 4);
                navigator.clipboard.writeText(json).then(() => {
                    this.showToast('✓ Đã sao chép cấu hình vào clipboard!');
                }).catch(() => {
                    this.showToast('✕ Lỗi sao chép clipboard');
                });
            });

            // Reset Config
            this.panelEl.querySelector('#p-cfg-reset').addEventListener('click', () => {
                try {
                    localStorage.removeItem('UXCAMP_PARTICIPANT_SPHERE_CONFIG');
                } catch (e) { }
                window.PARTICIPANT_SPHERE_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
                this.renderControls();
                this.sphere.rotMatrix = [
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
                ];
                this.sphere.autoSpinDirX = 1;
                this.sphere.autoSpinDirY = 0;
                this.sphere.pauseSpinUntil = 0;
                this.sphere.velX = DEFAULT_CONFIG.motion.autoSpinY;
                this.sphere.velY = DEFAULT_CONFIG.motion.autoSpinX;
                this.sphere.handleResize();
                this.showToast('↺ Đã khôi phục cấu hình mặc định!');
            });
        }

        showToast(msg) {
            this.toastEl.textContent = msg;
            this.toastEl.classList.add('show');
            clearTimeout(this._toastTimer);
            this._toastTimer = setTimeout(() => {
                this.toastEl.classList.remove('show');
            }, 2500);
        }
    }

    // =========================================================================
    // 5. KHỞI TẠO TỰ ĐỘNG KHI TRANG TẢI XONG
    // =========================================================================
    async function initParticipantSphere() {
        const wrapper = document.getElementById('participant-sphere-wrapper');
        if (!wrapper) return;

        const sphere = new ParticipantSphere(wrapper);
        window._participantSphere = sphere;
        if (sphere.initPromise) {
            await sphere.initPromise;
        }

        // Khởi tạo bảng điều khiển Live Config nếu được bật
        const cfg = window.PARTICIPANT_SPHERE_CONFIG;
        const urlParams = new URLSearchParams(window.location.search);
        const forceConfig = urlParams.has('config') || urlParams.has('sphere_config') || urlParams.has('participant_config');

        const isConfigEnabled = cfg && (
            (cfg.devMode && (cfg.devMode.showConfigToggle || cfg.devMode.showLiveTuner)) ||
            cfg.showConfigToggle ||
            cfg.showLiveTuner ||
            forceConfig
        );

        if (isConfigEnabled) {
            window._participantConfigUI = new ParticipantSphereConfigUI(sphere);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticipantSphere);
    } else {
        initParticipantSphere();
    }

})();
