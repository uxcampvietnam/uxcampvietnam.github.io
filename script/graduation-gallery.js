/**
 * =============================================================================
 * GRADUATION GALLERY (UXCAMP VIETNAM)
 * =============================================================================
 * Dải ảnh trượt ngang tương tác trưng bày các khoảnh khắc tốt nghiệp & hoạt động
 * thực tế của các khóa Bootcamp tại UXCamp Vietnam.
 * Hỗ trợ: GSAP ScrollTrigger timeline intro animation, SplitType text reveal,
 * kéo thả chuột / vuốt cảm ứng mượt mà với quán tính giảm chấn EMA & Live Tuner.
 * =============================================================================
 */

(function () {
	'use strict';

	// =========================================================================
	// 1. CẤU HÌNH MẶC ĐỊNH (DEFAULT CONFIGURATION)
	// =========================================================================
	const DEFAULT_CONFIG = {
		// Cấu hình chế độ phát triển (Developer Mode)
		"devMode": {
			"showLiveTuner": false // Bật/tắt giao diện tùy chỉnh thông số trực tiếp (GUI Live Tuner)
		},
		// Cấu hình dải ảnh trưng bày (Gallery Items)
		"gallery": {
			"totalImg": 86               // Tổng số lượng ảnh tốt nghiệp hiển thị
		},
		// Hoạt ảnh xuất hiện GSAP ScrollTrigger (Intro Animation)
		"animation": {
			"triggerStart": "top center",// Vị trí kích hoạt ScrollTrigger
			"splitDuration": 1,          // Thời lượng hoạt ảnh từng ký tự tiêu đề (s)
			"splitStagger": 0.01,        // Độ trễ stagger giữa các ký tự chữ (s)
			"containerDuration": 2,      // Thời lượng bung mở chiều cao container (s)
			"slideDuration": 2,          // Thời lượng trượt dải ảnh từ phải sang trái (s)
			"slideDistance": 12000,      // Khoảng cách xuất phát ngoài màn hình của ảnh (px)
			"slideStagger": 0.05,        // Độ trễ stagger trượt giữa các ảnh (s)
			"fadeDuration": 0.4          // Thời lượng hiện mờ và phóng to ảnh (s)
		},
		// Tương tác kéo thả & quán tính con lăn (Interaction & Inertia)
		"physics": {
			"friction": 0.94,            // Hệ số ma sát hãm quán tính trượt (0.80 - 0.99)
			"velocityMultiplier": 16,    // Hệ số khuếch đại vận tốc kéo chuột khi thả tay
			"emaSmoothing": 0.6          // Hệ số lọc nhiễu vận tốc tức thời EMA (0.1 - 0.9)
		}
	};

	window.GRADUATION_GALLERY_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

	// =========================================================================
	// 2. KHỞI TẠO DẢI ẢNH VÀ HIỆU ỨNG CHUYỂN ĐỘNG
	// =========================================================================
	function initGallery() {
		const slidingImg = document.getElementById('sliding-img-container');
		if (!slidingImg) return;
		if (slidingImg.dataset.initialized === 'true') return;
		slidingImg.dataset.initialized = 'true';

		const cfg = window.GRADUATION_GALLERY_CONFIG || DEFAULT_CONFIG;

		// Split text animation if SplitType is available
		let graduationSplit = null;
		if (typeof SplitType !== "undefined") {
			try {
				graduationSplit = new SplitType('.graduation-section p, .graduation-section h2', {
					types: 'words, chars'
				});
			} catch (e) {
				console.warn("SplitType initialization failed:", e);
			}
		}

		// Tạo danh sách ảnh
		function renderImages(count) {
			let slidingImgInnerHTML = '';
			for (let i = 1; i <= count; i++) {
				slidingImgInnerHTML += `<img class="sliding-img" src="asset/image/graduation/${i}.webp" alt="Graduation ${i}" decoding="async" draggable="false">`;
			}
			slidingImg.innerHTML = slidingImgInnerHTML;
		}
		renderImages(cfg.gallery.totalImg);

		// Animation GSAP ScrollTrigger
		let slidingTimeline = null;
		if (typeof gsap !== "undefined") {
			if (typeof ScrollTrigger !== "undefined") {
				gsap.registerPlugin(ScrollTrigger);
			}

			slidingTimeline = gsap.timeline({
				repeat: 0,
				scrollTrigger: {
					trigger: "#graduationSection",
					start: cfg.animation.triggerStart,
					toggleActions: "play none none none"
				},
				onComplete: () => {
					if (typeof ScrollTrigger !== "undefined") {
						ScrollTrigger.refresh();
					}
				}
			});

			if (graduationSplit && graduationSplit.chars && graduationSplit.chars.length > 0) {
				slidingTimeline.from(graduationSplit.chars, {
					opacity: 0,
					y: 20,
					stagger: cfg.animation.splitStagger,
					duration: cfg.animation.splitDuration,
					ease: "elastic.out(1.5,0.9)",
				});
			}

			slidingTimeline
				.from('#sliding-img-container', {
					height: '0px',
					duration: cfg.animation.containerDuration,
					ease: "elastic.out(1.5,0.9)",
				}, graduationSplit ? '<' : undefined)
				.from('.graduation-section h2', {
					gap: '0px',
					duration: cfg.animation.containerDuration,
					ease: "elastic.out(1.5,0.9)",
				}, '<')
				.from('.sliding-img', {
					right: cfg.animation.slideDistance,
					stagger: {
						each: cfg.animation.slideStagger,
						from: "end"
					},
					duration: cfg.animation.slideDuration,
					ease: "power4.inOut",
				}, '<')
				.from('.sliding-img', {
					scale: 0,
					opacity: 0,
					stagger: {
						each: cfg.animation.slideStagger,
						from: "end"
					},
					duration: cfg.animation.fadeDuration,
					ease: "power3.inOut",
				}, '<');
		}

		// Interactive horizontal scrolling with inertia/momentum
		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;
		let lastClientX = 0;
		let lastTime = 0;
		let velocity = 0;
		let momentumFrame = null;

		function stopMomentum() {
			if (momentumFrame) {
				cancelAnimationFrame(momentumFrame);
				momentumFrame = null;
			}
		}

		slidingImg.addEventListener("touchstart", () => {
			stopMomentum();
		}, { passive: true });

		slidingImg.addEventListener("mousedown", (e) => {
			isDown = true;
			stopMomentum();
			slidingImg.classList.add("is-dragging");
			startX = e.clientX;
			lastClientX = e.clientX;
			lastTime = performance.now();
			velocity = 0;
			scrollLeft = slidingImg.scrollLeft;
		});

		window.addEventListener("mouseup", () => {
			if (!isDown) return;
			isDown = false;
			slidingImg.classList.remove("is-dragging");

			const timeSinceLastMove = performance.now() - lastTime;
			if (timeSinceLastMove > 80) {
				velocity = 0;
			}

			if (Math.abs(velocity) > 0.1) {
				let currentVelocity = velocity * (cfg.physics.velocityMultiplier || 16);
				const friction = cfg.physics.friction || 0.94;

				const glide = () => {
					currentVelocity *= friction;
					slidingImg.scrollLeft -= currentVelocity;

					const maxScroll = slidingImg.scrollWidth - slidingImg.clientWidth;
					const reachedStart = slidingImg.scrollLeft <= 0;
					const reachedEnd = slidingImg.scrollLeft >= maxScroll;

					if (Math.abs(currentVelocity) > 0.5 && !reachedStart && !reachedEnd) {
						momentumFrame = requestAnimationFrame(glide);
					} else {
						stopMomentum();
					}
				};

				momentumFrame = requestAnimationFrame(glide);
			}
		});

		window.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();

			const deltaX = e.clientX - startX;
			slidingImg.scrollLeft = scrollLeft - deltaX;

			const now = performance.now();
			const dt = now - lastTime;
			if (dt > 0) {
				const instantVelocity = (e.clientX - lastClientX) / dt;
				const smoothing = cfg.physics.emaSmoothing || 0.6;
				velocity = velocity * (1 - smoothing) + instantVelocity * smoothing;
			}
			lastClientX = e.clientX;
			lastTime = now;
		});

		slidingImg.addEventListener("wheel", (e) => {
			stopMomentum();
			if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
				const delta = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
				const isScrollingRight = delta > 0;
				const maxScroll = slidingImg.scrollWidth - slidingImg.clientWidth;
				const canScrollRight = Math.ceil(slidingImg.scrollLeft) < maxScroll - 1;
				const canScrollLeft = slidingImg.scrollLeft > 1;

				if ((isScrollingRight && canScrollRight) || (!isScrollingRight && canScrollLeft)) {
					e.preventDefault();
					slidingImg.scrollLeft += delta;
				}
			}
		}, { passive: false });

		// Live Tuner GUI
		const urlParams = new URLSearchParams(window.location.search);
		const shouldShowTuner = cfg.devMode.showLiveTuner ||
			urlParams.get('graduation-tuner') === '1' ||
			window.ENABLE_GRADUATION_TUNER === true;

		if (shouldShowTuner) {
			new GraduationGalleryTuner(slidingImg, renderImages);
		}
	}

	// =========================================================================
	// 3. BẢNG TINH CHỈNH LIVE TUNER (GRADUATION GALLERY TUNER)
	// =========================================================================
	class GraduationGalleryTuner {
		constructor(containerEl, renderImagesCb) {
			this.containerEl = containerEl;
			this.renderImagesCb = renderImagesCb;
			this.init();
		}

		init() {
			this.panelEl = document.createElement('div');
			this.panelEl.className = 'motion-tuner-panel';
			this.panelEl.setAttribute('data-dock', 'bottom-left');
			this.panelEl.id = 'graduation-gallery-tuner';
			this.panelEl.innerHTML = `
				<div class="motion-tuner-header">
					<h4 class="motion-tuner-title">⚙ Graduation Gallery Tuner</h4>
				</div>
				<div class="motion-tuner-body" id="graduation-tuner-body"></div>
				<div class="motion-tuner-actions">
					<button type="button" class="motion-tuner-btn" id="gg-tuner-copy">📋 Copy Config</button>
					<button type="button" class="motion-tuner-btn motion-tuner-btn-secondary" id="gg-tuner-reset">↺ Khôi phục</button>
				</div>
			`;
			document.body.appendChild(this.panelEl);

			this.toastEl = document.createElement('div');
			this.toastEl.className = 'motion-tuner-toast';
			this.toastEl.textContent = '✓ Đã sao chép cấu hình vào clipboard!';
			document.body.appendChild(this.toastEl);

			this.renderControls();
			this.bindEvents();
		}

		renderControls() {
			const body = this.panelEl.querySelector('#graduation-tuner-body');
			if (!body) return;
			body.innerHTML = '';

			const SCHEMAS = [
				{
					title: '🖼️ Dải ảnh (Gallery Items)',
					group: 'gallery',
					fields: [
						{ key: 'totalImg', label: 'Số lượng ảnh tốt nghiệp', min: 10, max: 120, step: 1, digits: 0 }
					]
				},
				{
					title: '✨ Hoạt ảnh ScrollTrigger (Animation)',
					group: 'animation',
					fields: [
						{ key: 'splitDuration', label: 'Thời lượng ký tự chữ (s)', min: 0.2, max: 3.0, step: 0.1, digits: 2 },
						{ key: 'splitStagger', label: 'Độ trễ ký tự chữ (s)', min: 0.005, max: 0.05, step: 0.005, digits: 3 },
						{ key: 'containerDuration', label: 'Thời lượng bung container (s)', min: 0.5, max: 4.0, step: 0.1, digits: 1 },
						{ key: 'slideDuration', label: 'Thời lượng trượt dải ảnh (s)', min: 0.5, max: 4.0, step: 0.1, digits: 1 },
						{ key: 'slideDistance', label: 'Khoảng cách trượt (px)', min: 2000, max: 20000, step: 500, digits: 0 },
						{ key: 'slideStagger', label: 'Độ trễ stagger giữa các ảnh (s)', min: 0.01, max: 0.20, step: 0.01, digits: 2 },
						{ key: 'fadeDuration', label: 'Thời lượng phóng to ảnh (s)', min: 0.1, max: 1.5, step: 0.05, digits: 2 }
					]
				},
				{
					title: '🎯 Kéo thả & Quán tính (Physics)',
					group: 'physics',
					fields: [
						{ key: 'friction', label: 'Hệ số ma sát hãm trượt', min: 0.80, max: 0.99, step: 0.01, digits: 2 },
						{ key: 'velocityMultiplier', label: 'Hệ số khuếch đại vận tốc', min: 4, max: 40, step: 1, digits: 0 },
						{ key: 'emaSmoothing', label: 'Lọc nhiễu vận tốc EMA', min: 0.1, max: 0.9, step: 0.05, digits: 2 }
					]
				}
			];

			const cfg = window.GRADUATION_GALLERY_CONFIG;

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
					const valText = typeof currentVal === 'number' ? currentVal.toFixed(field.digits) : currentVal;

					row.innerHTML = `
						<div class="motion-tuner-label-wrap">
							<span>${field.label}</span>
							<span class="motion-tuner-val" id="val-gg-${schema.group}-${field.key}">${valText}</span>
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

		generateConfigCode() {
			const cfg = window.GRADUATION_GALLERY_CONFIG || DEFAULT_CONFIG;
			const num = (v, fallback = 0, maxDecimals = 4) => {
				const val = typeof v === 'number' && !isNaN(v) ? v : fallback;
				return Number(Number(val).toFixed(maxDecimals));
			};
			const bool = (v, fallback = false) => (v !== undefined ? Boolean(v) : fallback);
			const strVal = (v, fallback = '') => {
				const val = v !== undefined && v !== null ? String(v) : fallback;
				return `"${val.replace(/"/g, '\\"')}"`;
			};

			const devMode = cfg.devMode || {};
			const gallery = cfg.gallery || {};
			const animation = cfg.animation || {};
			const physics = cfg.physics || {};

			return `	const DEFAULT_CONFIG = {
		// Cấu hình chế độ phát triển (Developer Mode)
		"devMode": {
			"showLiveTuner": ${bool(devMode.showLiveTuner, false)} // Bật/tắt giao diện tùy chỉnh thông số trực tiếp (GUI Live Tuner)
		},
		// Cấu hình dải ảnh trưng bày (Gallery Items)
		"gallery": {
			"totalImg": ${num(gallery.totalImg, 86)}               // Tổng số lượng ảnh tốt nghiệp hiển thị
		},
		// Hoạt ảnh xuất hiện GSAP ScrollTrigger (Intro Animation)
		"animation": {
			"triggerStart": ${strVal(animation.triggerStart, 'top center')},// Vị trí kích hoạt ScrollTrigger
			"splitDuration": ${num(animation.splitDuration, 1)},          // Thời lượng hoạt ảnh từng ký tự tiêu đề (s)
			"splitStagger": ${num(animation.splitStagger, 0.01)},        // Độ trễ stagger giữa các ký tự chữ (s)
			"containerDuration": ${num(animation.containerDuration, 2)},      // Thời lượng bung mở chiều cao container (s)
			"slideDuration": ${num(animation.slideDuration, 2)},          // Thời lượng trượt dải ảnh từ phải sang trái (s)
			"slideDistance": ${num(animation.slideDistance, 12000)},      // Khoảng cách xuất phát ngoài màn hình của ảnh (px)
			"slideStagger": ${num(animation.slideStagger, 0.05)},        // Độ trễ stagger trượt giữa các ảnh (s)
			"fadeDuration": ${num(animation.fadeDuration, 0.4)}          // Thời lượng hiện mờ và phóng to ảnh (s)
		},
		// Tương tác kéo thả & quán tính con lăn (Interaction & Inertia)
		"physics": {
			"friction": ${num(physics.friction, 0.94)},            // Hệ số ma sát hãm quán tính trượt (0.80 - 0.99)
			"velocityMultiplier": ${num(physics.velocityMultiplier, 16)},    // Hệ số khuếch đại vận tốc kéo chuột khi thả tay
			"emaSmoothing": ${num(physics.emaSmoothing, 0.6)}          // Hệ số lọc nhiễu vận tốc tức thời EMA (0.1 - 0.9)
		}
	};`;
		}

		fallbackCopy(text) {
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand('copy');
				this.showToast('✓ Đã sao chép code DEFAULT_CONFIG vào clipboard!');
			} catch (err) {
				this.showToast('✕ Lỗi sao chép clipboard');
			}
			document.body.removeChild(ta);
		}

		bindEvents() {
			this.panelEl.addEventListener('input', (e) => {
				const slider = e.target.closest('.motion-tuner-slider');
				if (!slider) return;

				const group = slider.dataset.group;
				const key = slider.dataset.key;
				const digits = parseInt(slider.dataset.digits || '2', 10);
				const val = parseFloat(slider.value);

				window.GRADUATION_GALLERY_CONFIG[group][key] = val;

				const valEl = this.panelEl.querySelector(`#val-gg-${group}-${key}`);
				if (valEl) {
					valEl.textContent = val.toFixed(digits);
				}

				if (group === 'gallery' && key === 'totalImg' && typeof this.renderImagesCb === 'function') {
					this.renderImagesCb(Math.round(val));
				}
			});

			this.panelEl.querySelector('#gg-tuner-copy').addEventListener('click', () => {
				const codeToCopy = this.generateConfigCode();
				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(codeToCopy).then(() => {
						this.showToast('✓ Đã sao chép code DEFAULT_CONFIG vào clipboard!');
					}).catch(() => {
						this.fallbackCopy(codeToCopy);
					});
				} else {
					this.fallbackCopy(codeToCopy);
				}
			});

			this.panelEl.querySelector('#gg-tuner-reset').addEventListener('click', () => {
				window.GRADUATION_GALLERY_CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
				this.renderControls();
				if (typeof this.renderImagesCb === 'function') {
					this.renderImagesCb(DEFAULT_CONFIG.gallery.totalImg);
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
			}, 2500);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initGallery);
	} else {
		initGallery();
	}
})();
