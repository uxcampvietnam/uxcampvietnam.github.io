/**
 * =========================================================================
 * UXCAMP VIETNAM — UNIFIED BOOK SHELF ENGINE (book-shelf.js)
 * =========================================================================
 * - Auto-mounts 3D bookshelves into any element with .book-shelf-gallery
 * - Auto-loads `books-data.json` relative to this script path (No data-source needed in HTML!)
 * - Built-in GSAP 3D interactive flip & unfold animation
 * =========================================================================
 */

(function (global) {
  'use strict';

  // 1. Automatically resolve default path to books-data.json relative to book-shelf.js location
  const SCRIPT_DIR = (function () {
    if (document.currentScript && document.currentScript.src) {
      return new URL('.', document.currentScript.src).href;
    }
    return '';
  })();

  const DEFAULT_DATA_SOURCE = SCRIPT_DIR ? `${SCRIPT_DIR}books-data.json` : 'script/books-data.json';

  // Global cache for loaded JSON data so multiple shelves share one request
  let cachedDataPromise = null;

  /**
   * Automatically resolve relative asset paths based on page context (root vs subfolder)
   */
  function resolveAssetUrl(src) {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
      return src;
    }
    const path = window.location.pathname;
    if (
      path.includes('/tool/statistic-calculator/') ||
      path.includes('/tool/checklist/') ||
      path.includes('/applied-ux-analytic/bootcamp-register.html') ||
      path.includes('/certificate/individual/')
    ) {
      return '../../' + src;
    } else if (
      path.includes('/certificate/') ||
      path.includes('/applied-ux-analytic/') ||
      path.includes('/for-business/') ||
      path.includes('/tabandtask/') ||
      path.includes('/today/') ||
      path.includes('/tool/')
    ) {
      return '../' + src;
    }
    return src;
  }

  // =========================================================================
  // 🟢 [ANIMATION CONFIG] 1. CÁC THÔNG SỐ ĐIỀU KHIỂN CHUYỂN ĐỘNG TOÀN CỤC
  // =========================================================================
  const DEFAULT_CONFIG = {
    openDuration: 1,       // ⏱️ Thời gian mở sách (giây)
    closeDuration: 1,      // ⏱️ Thời gian đóng sách (giây)
    easing: "expo.out",    // 🌊 Đường cong gia tốc chuyển động mở (expo.out, power4.out, power3.out, back.out...)
    sideGap: 92,           // 📏 Khoảng cách giãn ra với các sách 2 bên (px) - tạo khoảng hở cách ly
    infoPanelWidth: 360,   // 📐 Chiều rộng của bảng thông tin book-info-panel (px) - có thể tùy chỉnh
    gap: 32,               // 📏 Khoảng cách giữa bìa sách và bảng thông tin (px)
    perspective: 4000,     // 👁️ Độ sâu phối cảnh không gian 3D (px)
    coverAngle: 90,        // 📐 Góc xoay trục Y ban đầu của bìa sách trước khi lật ra (độ) - 90 độ vuông góc hoàn toàn
    staggerDelay: 0,       // ⏳ Độ trễ xuất hiện phân tầng của các dòng thông tin (giây)
    scale: 1,             // 🔍 Độ phóng to của bìa sách khi mở ra (%)
    liftUp: 32,            // 🛫 Độ nâng cao lên của bìa sách khi mở (px)
  };

  // Expose global animation config (cho phép UI Animation Studio truy cập và điều chỉnh)
  global.animationConfig = { ...DEFAULT_CONFIG, ...(global.animationConfig || {}) };

  /**
   * Main BookShelfGallery Component Class
   */
  class BookShelfGallery {
    constructor(options = {}) {
      this.container = typeof options.target === 'string'
        ? document.querySelector(options.target)
        : (options.target || document.querySelector('.book-shelf-gallery'));

      // Default to DEFAULT_DATA_SOURCE inside book-shelf.js if data-source attribute is not specified
      this.source = options.source || (this.container && this.container.dataset.source) || DEFAULT_DATA_SOURCE;
      this.filter = options.filter || (this.container && this.container.dataset.filter) || 'all';
      this.shelfId = options.shelfId || (this.container && this.container.dataset.shelfId) || null;
      this.config = { ...global.animationConfig, ...(options.config || {}) };

      this.data = options.data || null;
      this.currentOpenBook = null;
      this.currentTimeline = null;
      this.selectedTag = 'All';

      if (this.container) {
        this.init();
      }
    }

    async init() {
      // 1. Load Data from JSON (with caching)
      if (!this.data) {
        const rawData = await this.loadData(this.source);
        this.parseData(rawData);
      } else {
        this.parseData(this.data);
      }

      if (!this.shelves || !Array.isArray(this.shelves) || this.shelves.length === 0) {
        console.error("[BookShelfGallery] Failed to load shelves data from:", this.source);
        return;
      }

      // 2. Render Shelves
      this.render();

      // 3. Bind Events
      this.bindEvents();

      // Dispatch loaded custom event
      this.container.dispatchEvent(new CustomEvent('bookshelf:ready', {
        detail: { gallery: this, totalShelves: this.shelves.length, totalBooks: this.books.length }
      }));
    }

    /**
     * Parse and normalize relational data (Shelves & Books)
     */
    parseData(rawData) {
      if (!rawData) {
        this.shelves = [];
        this.books = [];
        this.booksMap = new Map();
        this.data = [];
        return;
      }

      // Case 1: Relational structure { shelves: [...], books: [...] }
      if (typeof rawData === 'object' && !Array.isArray(rawData) && rawData.shelves && rawData.books) {
        this.books = Array.isArray(rawData.books) ? rawData.books : Object.values(rawData.books);
        this.booksMap = new Map();
        this.books.forEach(b => {
          if (b && b.id) {
            this.booksMap.set(b.id, b);
          }
        });

        this.shelves = (rawData.shelves || []).map(shelf => {
          const bookIds = shelf.book_ids || shelf.bookIds || [];
          const resolvedBooks = bookIds.map(id => this.booksMap.get(id)).filter(Boolean);
          return {
            ...shelf,
            books: resolvedBooks
          };
        });
      }
      // Case 2: Legacy Array structure [ { id, category, books: [...] } ]
      else if (Array.isArray(rawData)) {
        this.shelves = rawData;
        this.books = [];
        this.booksMap = new Map();
        this.shelves.forEach(shelf => {
          if (shelf.books && Array.isArray(shelf.books)) {
            shelf.books.forEach(b => {
              if (b && b.id) {
                this.books.push(b);
                this.booksMap.set(b.id, b);
              }
            });
          }
        });
      }

      // Maintain this.data pointing to shelves for full backward compatibility
      this.data = this.shelves;
    }

    /**
     * Load data from JSON URL with shared cache and fallbacks
     */
    async loadData(sourceUrl) {
      const candidates = [
        sourceUrl,
        DEFAULT_DATA_SOURCE,
        'script/books-data.json',
        '../script/books-data.json',
        'books-data.json'
      ].filter(Boolean);

      for (const src of candidates) {
        try {
          const res = await fetch(src);
          if (res.ok) {
            return await res.json();
          }
        } catch (e) { }
      }
      return null;
    }

    /**
     * Render Shelves inside target container
     */
    render(filter = this.filter) {
      if (!this.container) return;
      this.filter = filter;
      this.container.innerHTML = '';

      let renderedShelvesCount = 0;
      let totalBooksCount = 0;

      // Filter shelves to be rendered in this gallery instance
      const activeShelves = (this.shelves || []).filter(shelf => {
        if (this.shelfId && shelf.id !== this.shelfId) return false;
        return true;
      });

      if (activeShelves.length === 0) return;

      // 1. Render Shelf Header at the very top (above tags filter chips)
      const firstShelf = activeShelves[0];
      if (firstShelf) {
        const activeBooksCount = activeShelves.reduce((sum, s) => sum + (s.books ? s.books.length : 0), 0);
        const headerEl = document.createElement('div');
        headerEl.className = 'shelf-header-bar';
        headerEl.innerHTML = `
          <h3 class="italic">${firstShelf.category || 'CURRICULUM'}</h3>
          <p class="shelf-volumes-count mono-caption">${activeBooksCount} VOLUMES</p>
        `;
        this.container.appendChild(headerEl);
      }

      // 2. Gather tags ONLY from books that exist in the active shelf/shelves
      const tags = new Set();
      activeShelves.forEach(shelf => {
        if (shelf.books && Array.isArray(shelf.books)) {
          shelf.books.forEach(book => {
            if (book && book.tags) {
              book.tags.split(',').forEach(t => {
                const trimmed = t.trim();
                if (trimmed) tags.add(trimmed);
              });
            }
          });
        }
      });

      if (this.selectedTag !== 'All' && !tags.has(this.selectedTag)) {
        this.selectedTag = 'All';
      }

      if (tags.size > 0) {
        const sortedTags = ['All', ...Array.from(tags).sort()];
        const filterContainer = document.createElement('div');
        filterContainer.className = 'shelf-filter-container';

        sortedTags.forEach(tag => {
          const chip = document.createElement('button');
          chip.className = `font-sans-caption shelf-filter-chip${tag === this.selectedTag ? ' active' : ''}`;
          chip.textContent = tag;
          chip.addEventListener('click', () => {
            filterContainer.querySelectorAll('.shelf-filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            this.selectedTag = tag;
            this.applyTagFilter();
          });
          filterContainer.appendChild(chip);
        });
        this.container.appendChild(filterContainer);
      }

      // 3. Render each shelf in activeShelves
      this.shelves.forEach((shelf, shelfIndex) => {
        if (this.shelfId && shelf.id !== this.shelfId) return;

        renderedShelvesCount++;
        totalBooksCount += (shelf.books ? shelf.books.length : 0);

        const shelfEl = document.createElement('div');
        shelfEl.className = 'shelf-block';
        shelfEl.dataset.shelfIndex = shelfIndex;
        shelfEl.dataset.shelfId = shelf.id || `shelf-${shelfIndex}`;

        // Books track container
        const booksContainer = document.createElement('div');
        booksContainer.className = 'shelf-books-container';

        if (shelf.books && Array.isArray(shelf.books)) {
          shelf.books.forEach((book, bookIndex) => {
            const bookSlot = this.createBookElement(book, shelfIndex, bookIndex);
            booksContainer.appendChild(bookSlot);
          });
        }

        shelfEl.appendChild(booksContainer);
        this.bindDragScroll(booksContainer);

        // Shelf base line
        const shelfLine = document.createElement('div');
        shelfLine.className = 'shelf-base-line';
        shelfEl.appendChild(shelfLine);

        this.container.appendChild(shelfEl);
      });

      // Update statistics element if exists
      const statsEl = document.getElementById('shelfStats') || document.querySelector('[data-shelf-stats]');
      if (statsEl) {
        statsEl.textContent = `${renderedShelvesCount} SHELVES • ${totalBooksCount} TITLES`;
      }

      // Apply initial tag filter
      this.applyTagFilter();
    }

    /**
     * Apply tag chip filter to DOM elements
     */
    applyTagFilter() {
      if (this.currentOpenBook) {
        this.closeBook(this.currentOpenBook);
      }

      if (!this.shelves) return;

      let totalVisibleCount = 0;

      this.shelves.forEach((shelf, shelfIndex) => {
        if (this.shelfId && shelf.id !== this.shelfId) return;

        const shelfEl = this.container.querySelector(`.shelf-block[data-shelf-index="${shelfIndex}"]`);
        if (!shelfEl) return;

        const booksContainer = shelfEl.querySelector('.shelf-books-container');
        if (!booksContainer) return;

        let shelfVisibleCount = 0;
        const slots = booksContainer.querySelectorAll('.book-slot');
        slots.forEach(slot => {
          const bookTags = slot.dataset.tags ? slot.dataset.tags.split(',').map(t => t.trim()) : [];
          if (this.selectedTag === 'All' || bookTags.includes(this.selectedTag)) {
            slot.classList.remove('tag-filtered-out');
            shelfVisibleCount++;
          } else {
            slot.classList.add('tag-filtered-out');
          }
        });

        totalVisibleCount += shelfVisibleCount;
      });

      // Update volumes count dynamically
      const countEl = this.container.querySelector('.shelf-volumes-count');
      if (countEl) {
        countEl.textContent = `${totalVisibleCount} VOLUMES`;
      }
    }

    /**
     * Kéo trượt ngang mượt mà bằng chuột (Desktop drag-to-scroll với hiệu ứng quán tính)
     */
    bindDragScroll(container) {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let hasDragged = false;
      let lastX = 0;
      let lastTime = 0;
      let velX = 0;
      let momentumTween = null;

      container.addEventListener('mousedown', (e) => {
        isDown = true;
        hasDragged = false;
        container._hasDragged = false;
        container.classList.add('is-dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        lastX = e.pageX;
        lastTime = performance.now();
        velX = 0;

        if (momentumTween) {
          momentumTween.kill();
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX);

        if (Math.abs(walk) > 5) {
          hasDragged = true;
          container._hasDragged = true;
        }

        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 0) {
          velX = (e.pageX - lastX) / dt;
          lastX = e.pageX;
          lastTime = now;
        }

        container.scrollLeft = scrollLeft - walk;
      });

      window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        container.classList.remove('is-dragging');

        if (Math.abs(velX) > 0.15 && global.gsap) {
          const momentumDistance = velX * 320;
          const targetScroll = container.scrollLeft - momentumDistance;

          momentumTween = global.gsap.to(container, {
            scrollLeft: targetScroll,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        setTimeout(() => {
          hasDragged = false;
          container._hasDragged = false;
        }, 50);
      });
    }

    /**
     * Create DOM element for a single book (Spine + Expanded 3D Content)
     */
    createBookElement(book, shelfIndex, bookIndex) {
      const bookHeight = book.height || 330;
      // Chiều rộng khởi tạo mặc định (sẽ được tự động cập nhật chính xác theo naturalWidth/naturalHeight của ảnh gáy sách khi nạp)
      let bookWidth = book.width || (book.widthRatio ? Math.round(bookHeight * book.widthRatio) : Math.round(bookHeight * 0.12));

      const slot = document.createElement('div');
      slot.className = 'book-slot';
      slot.id = `book-${book.id || `${shelfIndex}-${bookIndex}`}`;
      slot.dataset.shelf = shelfIndex;
      slot.dataset.book = bookIndex;
      slot.dataset.defaultWidth = bookWidth;
      slot.dataset.tags = book.tags || '';
      slot.style.width = `${bookWidth}px`;

      // 1. Spine View (Gáy sách)
      const spine = document.createElement('div');
      spine.className = 'book-spine';
      spine.style.width = `${bookWidth}px`;
      spine.style.height = `${bookHeight}px`;

      const spineImgSrc = resolveAssetUrl(book.spineImage);
      const coverImgSrc = resolveAssetUrl(book.coverImage);

      // 2. Expanded 3D View (Bìa 3D và Bảng thông tin động)
      const expanded = document.createElement('div');
      expanded.className = 'book-expanded-content';
      expanded.style.left = `${bookWidth}px`;
      expanded.style.perspectiveOrigin = 'left center';

      // Hàm cập nhật kích thước chiều ngang tự động theo tỷ lệ naturalWidth / naturalHeight của ảnh gáy
      const updateSpineDimensions = (naturalW, naturalH) => {
        if (naturalW && naturalH && naturalH > 0) {
          const autoWidth = Math.round(bookHeight * (naturalW / naturalH));
          slot.dataset.defaultWidth = autoWidth;
          if (!slot.classList.contains('is-open')) {
            slot.style.width = `${autoWidth}px`;
          }
          spine.style.width = `${autoWidth}px`;
          if (expanded) {
            expanded.style.left = `${autoWidth}px`;
          }
        }
      };

      if (book.spineImage) {
        const spineImg = document.createElement('img');
        spineImg.className = 'spine-image-layer';
        spineImg.src = spineImgSrc;
        spineImg.alt = book.title || '';
        spineImg.loading = 'eager';

        if (spineImg.complete && spineImg.naturalHeight > 0) {
          updateSpineDimensions(spineImg.naturalWidth, spineImg.naturalHeight);
        } else {
          spineImg.addEventListener('load', () => {
            updateSpineDimensions(spineImg.naturalWidth, spineImg.naturalHeight);
          });
        }

        spine.appendChild(spineImg);
        const overlay = document.createElement('div');
        overlay.className = 'spine-emboss-overlay';
        spine.appendChild(overlay);
      } else {
        spine.innerHTML = `
          ${book.topBadge ? `<div class="spine-top-badge mono-small bold">${book.topBadge}</div>` : ''}
          <div class="spine-title-wrap">
            <div class="spine-title font-sans-caption bold">${book.title || ''}</div>
          </div>
          <div class="spine-emboss-overlay"></div>
        `;
      }

      // Tự động render mọi cặp Key-Value trong "meta" của từng cuốn sách
      const metaEntries = Object.entries(book.meta || {});
      const metaRowsHtml = metaEntries.map(([key, val]) => `
        <div class="meta-row">
          <span class="meta-label mono-small">${key}</span>
          <span class="meta-value font-sans-small">${val}</span>
        </div>
      `).join('');

      expanded.innerHTML = `
        <div class="book-cover-3d-wrapper" id="cover-${book.id}" style="height: ${bookHeight}px;">
          <img class="book-cover-img" src="${coverImgSrc}" alt="${book.title || ''}">
          <div class="book-cover-crease"></div>
        </div>
        <div class="book-info-panel" id="info-${book.id}">
          <h4 class="book-info-title h5 italic">${book.title || ''}</h4>
          ${book.description ? `<p class="book-info-description caption">${book.description}</p>` : ''}
          
          ${metaEntries.length > 0 ? `<div class="book-meta-table">${metaRowsHtml}</div>` : ''}
        </div>
      `;

      slot.appendChild(spine);
      slot.appendChild(expanded);

      // Event handlers
      // 1. Bấm vào gáy sách (spine) thì mở sách ra
      spine.addEventListener('click', (e) => {
        const container = slot.closest('.shelf-books-container');
        if (container && container._hasDragged) {
          return;
        }

        if (this.currentOpenBook !== slot) {
          e.stopPropagation();
          this.openBook(slot, book);
        }
      });

      // 2. Bấm vào bìa sách (cover) thì đóng sách lại khi đang mở
      const cover = expanded.querySelector('.book-cover-3d-wrapper');
      cover.addEventListener('click', (e) => {
        const container = slot.closest('.shelf-books-container');
        if (container && container._hasDragged) {
          return;
        }

        if (this.currentOpenBook === slot) {
          e.stopPropagation();
          this.closeBook(slot);
        }
      });

      return slot;
    }

    // =========================================================================
    // 🟢 [ANIMATION - OPEN BOOK] CHUYỂN ĐỘNG MỞ SÁCH 3D CHI TIẾT (GSAP TIMELINE)
    // =========================================================================
    openBook(slot, book) {
      if (!global.gsap) {
        console.error("[BookShelfGallery] GSAP 3.x library is required for animations.");
        return;
      }

      // Hủy timeline cũ nếu người dùng click liên tục để tránh xung đột chuyển động
      if (this.currentTimeline) {
        this.currentTimeline.kill();
      }

      const cfg = global.animationConfig || DEFAULT_CONFIG;
      const previousOpenBook = this.currentOpenBook;
      this.currentOpenBook = slot;

      // Set z-index của cuốn sách đang mở xuống thấp nhất (0) trong suốt quá trình chuyển động
      slot.style.zIndex = '0';

      // Khởi tạo GSAP Timeline chính điều phối toàn bộ hiệu ứng mở
      const tl = global.gsap.timeline({
        defaults: { ease: cfg.easing },
        onComplete: () => {
          slot.style.zIndex = '';
          this.currentTimeline = null;
        }
      });
      this.currentTimeline = tl;

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 1: Thu gọn sách cũ đang mở (nếu có cuốn khác đang mở trước đó)
      // -----------------------------------------------------------------------
      if (previousOpenBook && previousOpenBook !== slot) {
        const prevSpine = previousOpenBook.querySelector('.book-spine');
        const prevCover = previousOpenBook.querySelector('.book-cover-3d-wrapper');
        const prevInfo = previousOpenBook.querySelector('.book-info-panel');
        const prevExpanded = previousOpenBook.querySelector('.book-expanded-content');
        const defaultWidth = parseFloat(previousOpenBook.dataset.defaultWidth);
        const prevCloseDur = cfg.closeDuration * 0.45;

        if (prevCover) {
          prevCover.classList.remove('has-shadow');
        }

        tl.to(prevInfo, { opacity: 0, x: 10, duration: prevCloseDur * 0.35 }, 0)
          .to(prevCover, { rotateY: cfg.coverAngle, scale: 1, y: 0, duration: prevCloseDur }, 0)
          .to(prevCover, { opacity: 0, duration: prevCloseDur * 0.35, ease: "power2.in" }, prevCloseDur * 0.65)
          .to(prevSpine, { opacity: 1, rotateY: 0, scale: 1, y: 0, duration: prevCloseDur }, 0)
          .to(previousOpenBook, {
            width: defaultWidth,
            marginLeft: 0,
            marginRight: 0,
            duration: prevCloseDur,
            ease: cfg.easing,
            onComplete: () => {
              previousOpenBook.style.zIndex = '';
              previousOpenBook.classList.remove('is-open');
              if (prevExpanded) global.gsap.set(prevExpanded, { visibility: "hidden", opacity: 0 });
              if (prevInfo) global.gsap.set(prevInfo, { opacity: 0 });
            }
          }, 0);
      }

      const allSlots = this.container.querySelectorAll('.book-slot');
      allSlots.forEach(otherSlot => {
        if (otherSlot !== slot && otherSlot !== previousOpenBook && otherSlot.classList.contains('is-open')) {
          otherSlot.classList.remove('is-open');
          otherSlot.style.zIndex = '';
          otherSlot.style.width = `${otherSlot.dataset.defaultWidth}px`;
          otherSlot.style.marginLeft = '0px';
          otherSlot.style.marginRight = '0px';
          const otherExp = otherSlot.querySelector('.book-expanded-content');
          if (otherExp) global.gsap.set(otherExp, { visibility: "hidden", opacity: 0 });
          const otherCov = otherSlot.querySelector('.book-cover-3d-wrapper');
          if (otherCov) {
            otherCov.classList.remove('has-shadow');
            global.gsap.set(otherCov, { rotateY: cfg.coverAngle, scale: 1, y: 0, opacity: 0 });
          }
          const otherInf = otherSlot.querySelector('.book-info-panel');
          if (otherInf) global.gsap.set(otherInf, { opacity: 0 });
        }
      });

      const spine = slot.querySelector('.book-spine');
      const expanded = slot.querySelector('.book-expanded-content');
      const cover = slot.querySelector('.book-cover-3d-wrapper');
      const coverImg = cover.querySelector('.book-cover-img');
      const info = slot.querySelector('.book-info-panel');
      const infoItems = info.querySelectorAll('.book-info-title, .book-info-description, .book-meta-table');

      if (cover) {
        cover.classList.add('has-shadow');
      }

      // 1. Kích hoạt tạm thời layout hiển thị để đo đạc chính xác kích cỡ thật của các thẻ con
      slot.classList.add('is-open');
      global.gsap.set(expanded, { visibility: "visible", opacity: 0 });
      global.gsap.set(info, { opacity: 0 });

      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;

      // 1. Chiều rộng của bảng book-info-panel lấy từ DEFAULT_CONFIG (có thể setup)
      let infoPanelWidth = cfg.infoPanelWidth || 360;
      if (isMobile) {
        infoPanelWidth = Math.min(infoPanelWidth, 260);
      } else if (isTablet) {
        infoPanelWidth = Math.min(infoPanelWidth, 320);
      }
      info.style.width = `${infoPanelWidth}px`;
      info.style.minWidth = `${infoPanelWidth}px`;

      // 2. Khoảng cách gap giữa bìa sách và book-info-panel từ config
      const gap = isMobile ? Math.min(cfg.gap || 36, 20) : (cfg.gap || 36);
      expanded.style.gap = `${gap}px`;

      // 3. Tính toán chiều rộng bìa sách riêng biệt cho cuốn sách này
      const bookHeight = book.height || slot.offsetHeight || 330;
      let coverWidth = cover.offsetWidth;
      if (coverImg && coverImg.naturalWidth && coverImg.naturalHeight) {
        coverWidth = Math.round(bookHeight * (coverImg.naturalWidth / coverImg.naturalHeight));
      }
      if (!coverWidth || coverWidth < 50) {
        coverWidth = Math.round(bookHeight * 0.75); // tỷ lệ mặc định nếu chưa nạp xong ảnh
      }

      // Bìa sách khi xoay mở có scale nhẹ (transformOrigin: left center)
      const scale = cfg.scale || 1.05;
      const effectiveCoverWidth = Math.round(coverWidth * scale);

      // 4. Chiều rộng expandedWidth customize riêng cho từng cuốn sách = Chiều rộng bìa sách + gap + Chiều rộng book-info-panel
      const expandedWidth = effectiveCoverWidth + gap + infoPanelWidth;
      const sideGap = cfg.sideGap || 32;

      slot.style.perspective = `${cfg.perspective}px`;
      expanded.style.perspective = `${cfg.perspective}px`;
      expanded.style.perspectiveOrigin = "left center";

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 2: Chuẩn bị trạng thái ban đầu của bìa sách & gáy sách (Chiều cao chuẩn 100%, không scale)
      // -----------------------------------------------------------------------
      global.gsap.set(expanded, { visibility: "visible", opacity: 1 });
      global.gsap.set(spine, { transformOrigin: "right center", scale: 1, y: 0 });
      global.gsap.set(cover, {
        rotateY: cfg.coverAngle,      // Góc nghiêng ban đầu (90 độ vuông góc, chiều rộng thị giác = 0)
        opacity: 1,                   // Opacity = 1 từ đầu
        scale: 1,
        y: 0,
        transformOrigin: "left center" // Trục xoay nằm ở mép trái bìa sách (trùng cạnh phải gáy sách)
      });
      global.gsap.set(info, { opacity: 1, x: 0 });
      global.gsap.set(infoItems, { opacity: 0, y: 12, x: 6 });

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 3: Mở rộng slot, Đóng gáy sách & Mở bìa sách DIỄN RA ĐỒNG THỜI (Không khựng, không delay)
      // -----------------------------------------------------------------------
      // 1. Mở rộng kích thước slot đẩy đều các sách hai bên với khoảng cách đối xứng chuẩn
      tl.to(slot, {
        width: expandedWidth,
        marginLeft: 0,
        marginRight: sideGap,
        duration: cfg.openDuration,
        ease: cfg.easing
      }, 0);

      // 2. Gáy sách xoay gập lại từ 0 về -90 độ (giữ nguyên opacity = 1, khi xoay gập hết mới ẩn opacity = 0)
      tl.set(spine, { opacity: 1 }, 0);
      tl.to(spine, {
        rotateY: -90,
        duration: cfg.openDuration,
        ease: cfg.easing,
        scale: cfg.scale || 1.06,
        y: -(cfg.liftUp || 16),
        // left: '-32px',
      }, 0);
      tl.set(spine, { opacity: 0 }, cfg.openDuration);

      // 3. Bìa sách xoay mở từ 89 độ về 0 độ (Đồng thời), phóng to nhẹ và bay lên nhẹ
      tl.set(cover, { opacity: 1 }, 0);
      tl.to(cover, {
        rotateY: 0,
        scale: cfg.scale || 1.06,
        y: -(cfg.liftUp || 16),
        duration: cfg.openDuration,
        ease: cfg.easing,
      }, 0);

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 4: Hiển thị phân tầng tiêu đề, mô tả và bảng metadata (Info Items)
      // -----------------------------------------------------------------------
      tl.to(infoItems, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: cfg.openDuration * 0.7,
        stagger: cfg.staggerDelay,
        ease: cfg.easing,
      }, cfg.openDuration * 0.2);

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 5: Tự động cuộn mượt vào vùng nhìn thấy nếu sách bị tràn mép màn hình
      // -----------------------------------------------------------------------
      const shelfContainer = slot.closest('.shelf-books-container');
      if (shelfContainer) {
        const slotRect = slot.getBoundingClientRect();
        const containerRect = shelfContainer.getBoundingClientRect();
        if (slotRect.right > containerRect.right || slotRect.left < containerRect.left) {
          shelfContainer.scrollTo({
            behavior: "smooth"
          });
        }
      }
    }

    // =========================================================================
    // 🟢 [ANIMATION - CLOSE BOOK] CHUYỂN ĐỘNG ĐÓNG / GẬP SÁCH LẠI VÀO KỆ (GSAP)
    // =========================================================================
    closeBook(slot) {
      if (!slot || !global.gsap) return;

      if (this.currentTimeline) {
        this.currentTimeline.kill();
      }

      const cfg = global.animationConfig || DEFAULT_CONFIG;
      const spine = slot.querySelector('.book-spine');
      const cover = slot.querySelector('.book-cover-3d-wrapper');
      const info = slot.querySelector('.book-info-panel');
      const defaultWidth = parseFloat(slot.dataset.defaultWidth);

      if (cover) {
        cover.classList.remove('has-shadow');
      }

      // Set z-index của cuốn sách đang đóng xuống thấp nhất (0) trong suốt quá trình chuyển động
      slot.style.zIndex = '0';

      // Khởi tạo GSAP Timeline đóng sách
      const tl = global.gsap.timeline({
        defaults: { ease: cfg.easing },
        onComplete: () => {
          slot.style.zIndex = '';
          slot.classList.remove('is-open');
          const expanded = slot.querySelector('.book-expanded-content');
          if (expanded) global.gsap.set(expanded, { visibility: "hidden", opacity: 0 });
          if (cover) {
            cover.classList.remove('has-shadow');
            global.gsap.set(cover, { opacity: 0, scale: 1, y: 0 });
          }
          if (info) global.gsap.set(info, { opacity: 0 });
          this.currentOpenBook = null;
          this.currentTimeline = null;
        }
      });
      this.currentTimeline = tl;

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 1: Ẩn nhanh nội dung chữ
      // -----------------------------------------------------------------------
      tl.to(info, { opacity: 0, x: 10, duration: cfg.closeDuration * 0.35 }, 0);

      // -----------------------------------------------------------------------
      // 👉 BƯỚC 2: Khép bìa sách lại, Mở lại gáy sách & Thu hẹp slot ĐỒNG THỜI
      // -----------------------------------------------------------------------
      // 1. Gáy sách hiển thị lại và xoay từ -90 về 0 độ
      tl.set(spine, { opacity: 1 }, 0);
      tl.to(spine, {
        rotateY: 0,
        duration: cfg.closeDuration * 0.85,
        ease: cfg.easing,
        scale: 1,
        y: 0,
      }, 0);

      // 2. Bìa sách xoay khép lại từ 0 về cfg.coverAngle (90 độ), reset scale & y đồng thời
      tl.set(cover, { opacity: 1 }, 0);
      tl.to(cover, {
        rotateY: cfg.coverAngle,
        scale: 1,
        y: 0,
        duration: cfg.closeDuration * 0.85,
        ease: cfg.easing,
      }, 0);
      // Khi bìa sách xoay sát 90 độ (chiều rộng thị giác tiến về 0), mượt mà triệt tiêu opacity để loại bỏ hoàn toàn viền dư
      tl.to(cover, {
        opacity: 0,
        duration: cfg.closeDuration * 0.25,
        ease: "power2.in",
      }, cfg.closeDuration * 0.6);
      tl.set(cover, { opacity: 0 }, cfg.closeDuration * 0.85);

      // 3. Thu hẹp kích thước slot
      tl.to(slot, {
        width: defaultWidth,
        marginLeft: 0,
        marginRight: 0,
        duration: cfg.closeDuration,
        ease: cfg.easing,
      }, 0);
    }

    bindEvents() {
      // Click outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.book-slot') && this.currentOpenBook) {
          this.closeBook(this.currentOpenBook);
        }
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.currentOpenBook) {
          this.closeBook(this.currentOpenBook);
        }
      });
    }
  }

  // =========================================================================
  // AUTO-INITIALIZATION FOR ANY CONTAINER WITH .book-shelf-gallery or [data-book-shelf]
  // =========================================================================
  function autoInit() {
    const targets = document.querySelectorAll('.book-shelf-gallery, [data-book-shelf]');
    const instances = [];

    targets.forEach((el) => {
      if (el._bookShelfInstance) return;

      const instance = new BookShelfGallery({
        target: el,
        source: el.dataset.source || DEFAULT_DATA_SOURCE,
        filter: el.dataset.filter || 'all',
        shelfId: el.dataset.shelfId || null
      });

      el._bookShelfInstance = instance;
      instances.push(instance);
    });

    global.bookShelfInstances = instances;

    // Filter tags if present
    const filterPills = document.querySelectorAll('.filter-pill, [data-shelf-filter]');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.dataset.filter || pill.dataset.shelfFilter || 'all';

        instances.forEach(inst => {
          if (inst.currentOpenBook) inst.closeBook(inst.currentOpenBook);
          inst.render(filterVal);
        });
      });
    });
  }

  // Export to global window
  global.BookShelfGallery = BookShelfGallery;
  global.initBookShelves = autoInit;

  // Auto run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

})(typeof window !== 'undefined' ? window : this);
