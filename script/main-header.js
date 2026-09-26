/**
 * UXCamp Vietnam - Shared Site Header Component
 * Supports Desktop (with bell-curve indicator) and Mobile (collapsed bar + full-screen drawer).
 */
(function () {
  'use strict';

  function getRootPrefix() {
    const path = window.location.pathname;
    if (
      path.includes('/tool/statistic-calculator/') ||
      path.includes('/tool/checklist/') ||
      path.includes('/tool/compress-webp/') ||
      path.includes('/applied-ux-analytic/bootcamp-register.html') ||
      path.includes('/certificate/individual/')
    ) {
      return '../../';
    } else if (
      path.includes('/certificate/') ||
      path.includes('/applied-ux-analytic/') ||
      path.includes('/for-business/') ||
      path.includes('/tabandtask/') ||
      path.includes('/today/') ||
      path.includes('/tool/')
    ) {
      return '../';
    }
    return '';
  }

  function detectActiveItem(customActive) {
    if (customActive) return customActive;
    const path = window.location.pathname;

    if (path.includes('for-business')) return 'Business';
    if (path.includes('certificate')) return 'Alumni';
    if (path.includes('/tool/')) return 'Tool';
    if (path.includes('about')) return 'AboutUs';
    if (
      path.includes('designing-digital') ||
      path.includes('applied-ux-analytic') ||
      path.endsWith('index.html') ||
      path === '/' ||
      path === ''
    ) {
      return 'Individual';
    }
    return '';
  }

  function initHeader() {
    let headerEl = document.querySelector('.site-main-header') || document.getElementById('siteMainHeader');
    if (!headerEl) {
      headerEl = document.createElement('header');
      headerEl.className = 'site-main-header';
      headerEl.id = 'siteMainHeader';
      document.body.insertBefore(headerEl, document.body.firstChild);
    }

    const root = getRootPrefix();
    const customActive = headerEl.getAttribute('data-active');
    const activeItem = detectActiveItem(customActive);

    const navItems = [
      { id: 'Individual', label: 'Individual', href: `${root}index.html` },
      { id: 'Business', label: 'Business', href: `${root}for-business/index.html` },
      { id: 'Alumni', label: 'Alumni', href: `${root}certificate/find-your-certificate.html` },
      { id: 'Brand', isBrand: true, href: `${root}index.html` },
      { id: 'Article', label: 'Article', href: 'https://blog.uxcamp.vn/' },
      { id: 'Tool', label: 'Tool', href: `${root}tool/index.html` },
      { id: 'AboutUs', label: 'About Us', href: `${root}about.html` }
    ];

    const customTitle = headerEl.getAttribute('data-title');
    const activeNavItem = navItems.find((item) => item.id === activeItem);
    const pageTitle = customTitle || (activeNavItem ? activeNavItem.label : (activeItem || ''));

    // Desktop Nav HTML
    const desktopLinksHtml = navItems
      .map((item) => {
        if (item.isBrand) {
          return `
            <a href="${item.href}" class="site-nav-item site-nav-brand" aria-label="UXCamp Vietnam">
              <img class="site-brand-logo" src="${root}asset/icon/uxcamp-logo.svg" alt="UXCAMP VIETNAM" onload="typeof SVGInject === 'function' && SVGInject(this)">
            </a>
          `;
        }

        const isActive = item.id === activeItem;
        const activeClass = isActive ? ' active' : '';
        const fontClass = isActive ? 'font-serif-caption italic' : 'font-sans-small';
        const bellCurveHtml = isActive
          ? `<img class="nav-bell-curve" src="${root}asset/icon/bell-curve-shape-header.svg" alt="" onload="typeof SVGInject === 'function' && SVGInject(this)">`
          : '';

        return `
          <a href="${item.href}" class="site-nav-item${activeClass}" data-item="${item.id}">
            ${bellCurveHtml}
            <span class="nav-text ${fontClass}">${item.label}</span>
          </a>
        `;
      })
      .join('');

    // Mobile Drawer Links HTML
    const mobileLinksHtml = navItems
      .filter((item) => !item.isBrand)
      .map((item) => {
        const isActive = item.id === activeItem;
        const fontClass = isActive
          ? 'font-serif-title italic mobile-nav-item-active'
          : 'font-sans-h2 mobile-nav-item-link';

        return `
          <a href="${item.href}" class="mobile-drawer-link ${fontClass}">
            ${item.label}
          </a>
        `;
      })
      .join('');

    headerEl.innerHTML = `
      <!-- Desktop Navigation Bar -->
      <nav class="site-main-nav site-desktop-nav" aria-label="Main Navigation">
        ${desktopLinksHtml}
      </nav>

      <!-- Mobile Header (Contains Top Section & Drawer Directly Below It) -->
      <div class="site-mobile-header" id="siteMobileHeader">
        <!-- Top Section: Brand Logo, Menu Toggle & Close Button -->
        <div class="mobile-header-top-section">

          <!-- Top Bar: Brand Logo, Page Title, Menu Toggle & Close Button -->
          <div class="site-mobile-top-bar">
            <div class="site-mobile-brand-group">
              <a href="${root}index.html" class="site-mobile-brand" aria-label="UXCamp Vietnam">
                <img class="site-mobile-brand-logo" src="${root}asset/icon/name-new.svg" alt="UXCamp" onload="typeof SVGInject === 'function' && SVGInject(this)">
              </a>
              ${pageTitle ? `
                <span class="site-mobile-divider" aria-hidden="true"></span>
                <span class="font-sans-small header-title">${pageTitle}</span>
              ` : ''}
            </div>

            <button type="button" class="site-mobile-menu-btn" id="siteMobileMenuToggle" aria-label="Mở menu điều hướng">
              <img src="${root}asset/icon/menu-mobile.svg" alt="Menu" onload="typeof SVGInject === 'function' && SVGInject(this)">
            </button>

            <button type="button" class="site-mobile-close-btn" id="siteMobileMenuClose" aria-label="Đóng menu">
              <img src="${root}asset/icon/close.svg" alt="Close" onload="typeof SVGInject === 'function' && SVGInject(this)">
            </button>
          </div>

        </div>

        <!-- Mobile Drawer: Navigation Links & Contact Footer -->
        <div class="site-mobile-drawer" id="siteMobileDrawer" aria-hidden="true">
          <!-- Drawer Navigation Links -->
          <nav class="mobile-drawer-nav">
            ${mobileLinksHtml}
          </nav>

          <!-- Contact Us Footer -->
          <div class="mobile-drawer-footer">
            <p class="font-serif-caption italic footer-contact-title">Contact Us</p>
            <p class="footer-social-links font-serif-caption">
              <a href="https://linkedin.com" target="_blank" rel="noopener">Linkedin</a>, 
              <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>, 
              <a href="https://youtube.com" target="_blank" rel="noopener">Youtube</a>
            </p>
            <p class="footer-email font-serif-caption">
              <a href="mailto:hello@uxcamp.vn">hello@uxcamp.vn</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Event binding for mobile drawer toggle
    const toggleBtn = document.getElementById('siteMobileMenuToggle');
    const closeBtn = document.getElementById('siteMobileMenuClose');
    const mobileHeader = document.getElementById('siteMobileHeader');
    const drawer = document.getElementById('siteMobileDrawer');

    function openDrawer() {
      if (mobileHeader) {
        mobileHeader.classList.add('open');
      }
      if (drawer) {
        drawer.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!mobileHeader || !mobileHeader.classList.contains('open')) return;
      mobileHeader.classList.remove('open');
      if (drawer) {
        drawer.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }

  window.renderUXCampHeader = initHeader;
})();
