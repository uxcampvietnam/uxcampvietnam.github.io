/**
 * UXCamp Vietnam — Centralized Tool Authentication & Authorization Guard
 * 
 * Luồng bảo mật & hoạt động (Đồng bộ 100% giao diện với authentication.html):
 * 1. Khởi tạo Firebase App / Auth / Firestore.
 * 2. Bảo vệ nội dung (Content Protection):
 *    - Khi CHƯA xác thực / Unauthorized: Toàn bộ thẻ .app-container được bóc tách (detach)
 *      hoàn toàn khỏi cây DOM. Ngay cả khi người dùng xóa overlay trong DevTools Console,
 *      DOM cũng hoàn toàn rỗng, không thể xem được bất kỳ nội dung, bảng biểu hay công thức nào.
 * 3. Kiểm tra session cache (sessionStorage 'uxcamp_auth'):
 *    - Nếu hợp lệ: Giữ/Gắn lại .app-container và unlock UI tức thì (0ms latency).
 * 4. Lắng nghe auth.onAuthStateChanged:
 *    - Chưa đăng nhập (Unauthenticated):
 *      + Chuyển hướng ngay lập tức (redirect) về authentication.html?redirect=... mà không render
 *        popup/card gây chớp nháy (flicker-free).
 *    - Đã đăng nhập: Tra cứu email trong Firestore collection "authorizedUsers":
 *      + ĐƯỢC CẤP QUYỀN (Authorized): Gắn lại .app-container vào DOM, kích hoạt tool, render User Widget.
 *      + CHƯA ĐƯỢC CẤP QUYỀN (Unauthorized): Hiển thị Auth Card đồng bộ 100% với authentication.html.
 *      + LỖI XÁC THỰC (Error/Offline): Hiển thị Auth Card thông báo lỗi và nút Thử lại.
 */

(function () {
  'use strict';

  // 1. Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyC6KmQxFzAwI9RnIMtdUsMktQ0CCkM7z-E",
    authDomain: "uxcampvn.firebaseapp.com",
    projectId: "uxcampvn",
    storageBucket: "uxcampvn.firebasestorage.app",
    messagingSenderId: "491407083539",
    appId: "1:491407083539:web:8c1635c421989082a397e6",
    measurementId: "G-NLJWC0L47K"
  };

  // State
  let auth = null;
  let db = null;
  let googleProvider = null;
  let currentUser = null;
  let currentAuthState = null;
  let isInitialized = false;
  let protectedDOMNode = null;
  let hasTriggeredAuthorized = false;

  let config = {
    toolName: 'Công cụ UXCamp Vietnam',
    toolDesc: 'Đăng nhập để truy cập các công cụ và tài nguyên dành riêng cho thành viên',
    sidebarSelector: '#sidebar',
    appSelector: '.app-container',
    homeUrl: '../../index.html',
    authPageUrl: '../../authentication.html',
    onAuthorized: null
  };

  /**
   * Helper an toàn để gán/gỡ class auth-verified trên body
   */
  function markBodyAuthVerified(isVerified) {
    if (document.body) {
      if (isVerified) {
        document.body.classList.add('auth-verified');
      } else {
        document.body.classList.remove('auth-verified');
      }
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        if (document.body) {
          if (isVerified) {
            document.body.classList.add('auth-verified');
          } else {
            document.body.classList.remove('auth-verified');
          }
        }
      });
    }
  }

  /**
   * Kiểm tra nhanh trạng thái cache trong sessionStorage
   */
  function getCachedAuth() {
    try {
      const cached = sessionStorage.getItem('uxcamp_auth');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.authorized && parsed.email) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[ToolAuthGuard] Lỗi đọc session storage:', e);
    }
    return null;
  }

  /**
   * Bóc tách (detach) thẻ .app-container ra khỏi cây DOM hoàn toàn
   */
  function detachProtectedContent() {
    const appEl = document.querySelector(config.appSelector);
    if (appEl && appEl.parentNode) {
      protectedDOMNode = appEl;
      appEl.remove();
    }
    markBodyAuthVerified(false);
  }

  /**
   * Gắn lại (restore) thẻ .app-container vào cây DOM khi đã xác thực
   */
  function restoreProtectedContent() {
    markBodyAuthVerified(true);

    if (document.body) {
      if (protectedDOMNode && !document.body.contains(protectedDOMNode)) {
        const overlay = document.getElementById('tool-auth-overlay');
        if (overlay && overlay.parentNode === document.body) {
          document.body.insertBefore(protectedDOMNode, overlay);
        } else {
          document.body.appendChild(protectedDOMNode);
        }
      }
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        restoreProtectedContent();
      });
    }
  }

  // Tự động bảo vệ nội dung ngay khi DOM bắt đầu render
  const initialCachedAuth = getCachedAuth();
  if (!initialCachedAuth) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        if (!currentAuthState || !currentAuthState.authorized) {
          detachProtectedContent();
        }
      });
    } else {
      detachProtectedContent();
    }
  } else {
    markBodyAuthVerified(true);
  }

  /**
   * Khởi tạo Firebase SDK
   */
  function initFirebase() {
    if (typeof firebase === 'undefined') {
      console.error('[ToolAuthGuard] Firebase SDK chưa được nạp!');
      return false;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    auth = firebase.auth();
    db = firebase.firestore();
    googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    return true;
  }

  /**
   * Tạo cấu trúc Auth Gate Overlay trên DOM khi cần thiết (Đồng bộ 100% với authentication.html)
   */
  function getOrCreateAuthOverlayDOM() {
    if (!document.body) return null;

    let overlay = document.getElementById('tool-auth-overlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'tool-auth-overlay';
    overlay.className = 'tool-auth-overlay hidden';

    overlay.innerHTML = `
      <div class="auth-card">
        <!-- Header -->
        <header class="auth-header">
          <a href="${config.homeUrl}" aria-label="Về trang chủ">
            <img class="eye-logo" src="../../asset/icon/eye.svg" alt="UXCamp Vietnam" onload="if(typeof SVGInject==='function') SVGInject(this)">
          </a>
          <div class="h6 text-logo">UXCAMP VIETNAM</div>
          <p class="auth-subtitle caption" id="tool-auth-header-desc">${config.toolDesc}</p>
        </header>

        <!-- Panel -->
        <div class="auth-panel">
          
          <!-- STATE 1: UNAUTHORIZED -->
          <div class="user-profile" id="tool-auth-state-unauthorized">
            <img class="user-avatar" id="tool-unauth-avatar" src="" alt="Avatar">
            <div class="user-info">
              <span class="h5 medium user-name" id="tool-unauth-name"></span>
              <span class="caption user-email" id="tool-unauth-email"></span>
              <span class="user-role-badge unauthorized" id="tool-unauth-badge">CHƯA ĐƯỢC CẤP QUYỀN</span>
            </div>

            <div class="auth-status warning visible">
              <span class="caption" id="tool-unauth-msg">Vợ iu chưa được cấp quyền truy cập.</span>
            </div>

            <div class="auth-actions">
              <button type="button" class="cta-large paragraph" id="tool-btn-switch-account">
                Đổi tài khoản
              </button>
              <button type="button" class="secondary-button-large paragraph" id="tool-btn-unauth-signout">
                Đăng xuất
              </button>
            </div>
          </div>

          <!-- STATE 2: ERROR -->
          <div class="user-profile" id="tool-auth-state-error" style="display: none;">
            <div class="auth-status error visible">
              <span class="caption" id="tool-auth-error-msg">Không thể kiểm tra trạng thái đăng nhập. Vui lòng thử lại.</span>
            </div>

            <div class="auth-actions">
              <button type="button" class="cta-large paragraph" id="tool-btn-retry-auth">
                Thử lại
              </button>
              <button type="button" class="secondary-button-large paragraph" id="tool-btn-error-relogin">
                Đến trang đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Gắn sự kiện nút bấm trên Auth Card
    const btnSwitch = document.getElementById('tool-btn-switch-account');
    if (btnSwitch) {
      btnSwitch.addEventListener('click', () => ToolAuthGuard.switchAccount());
    }

    const btnSignoutUnauth = document.getElementById('tool-btn-unauth-signout');
    if (btnSignoutUnauth) {
      btnSignoutUnauth.addEventListener('click', () => ToolAuthGuard.signOut());
    }

    const btnRetry = document.getElementById('tool-btn-retry-auth');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => window.location.reload());
    }

    const btnErrorRelogin = document.getElementById('tool-btn-error-relogin');
    if (btnErrorRelogin) {
      btnErrorRelogin.addEventListener('click', () => {
        window.location.href = `${config.authPageUrl}?redirect=${encodeURIComponent(window.location.href)}`;
      });
    }

    return overlay;
  }

  /**
   * Chuyển đổi trạng thái giao diện Auth Gate
   * @param {'unauthorized' | 'error' | 'authorized' | 'hide'} state 
   * @param {object} [data] 
   */
  function setAuthStateUI(state, data = null) {
    if (state === 'authorized' || state === 'hide') {
      const existingOverlay = document.getElementById('tool-auth-overlay');
      if (existingOverlay) existingOverlay.classList.add('hidden');
      return;
    }

    const overlay = getOrCreateAuthOverlayDOM();
    if (!overlay) return;

    overlay.classList.remove('hidden');

    const stateUnauth = document.getElementById('tool-auth-state-unauthorized');
    const stateError = document.getElementById('tool-auth-state-error');

    if (stateUnauth) {
      stateUnauth.style.display = (state === 'unauthorized') ? 'flex' : 'none';
      stateUnauth.classList.toggle('visible', state === 'unauthorized');
    }
    if (stateError) {
      stateError.style.display = (state === 'error') ? 'flex' : 'none';
      stateError.classList.toggle('visible', state === 'error');
    }

    if (state === 'unauthorized' && data) {
      const avatarEl = document.getElementById('tool-unauth-avatar');
      const nameEl = document.getElementById('tool-unauth-name');
      const emailEl = document.getElementById('tool-unauth-email');
      if (avatarEl) {
        avatarEl.src = data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.displayName || data.email)}&background=e2a03f&color=000`;
      }
      if (nameEl) {
        nameEl.textContent = data.displayName || data.email.split('@')[0];
      }
      if (emailEl) {
        emailEl.textContent = data.email || 'Email';
      }
    }

    if (state === 'error' && data && data.message) {
      const errorMsgEl = document.getElementById('tool-auth-error-msg');
      if (errorMsgEl) {
        errorMsgEl.textContent = data.message;
      }
    }
  }

  /**
   * Kiểm tra email trong Firestore collection authorizedUsers
   * @param {string} email 
   * @returns {Promise<{ authorized: boolean, data: object|null, error?: string }>}
   */
  async function checkFirestoreAuthorization(email) {
    if (!db || !email) return { authorized: false, data: null };

    try {
      const cleanEmail = email.trim().toLowerCase();
      const currentUid = (auth && auth.currentUser) ? auth.currentUser.uid : '';

      let matchedDoc = null;
      let directDoc = null;
      let directData = null;

      // 1. Tra cứu trực tiếp theo Document ID = cleanEmail (Chuẩn O(1))
      try {
        const docByEmail = await db.collection('authorizedUsers').doc(cleanEmail).get();
        if (docByEmail.exists) {
          directDoc = docByEmail;
          directData = docByEmail.data() || {};
          // Nếu docDirect là admin, dùng luôn
          if (directData.role === 'admin') {
            matchedDoc = docByEmail;
          }
        }
      } catch (e0) {
        console.warn('[ToolAuthGuard] docId email notice:', e0);
      }

      // 2. Tra cứu theo mảng emails (tìm tài khoản cha nếu cleanEmail là email phụ của Admin/tài khoản chính)
      if (!matchedDoc) {
        try {
          const snapEmails = await db.collection('authorizedUsers').where('emails', 'array-contains', cleanEmail).get();
          if (!snapEmails.empty) {
            const docsFound = snapEmails.docs;
            const adminDoc = docsFound.find(d => (d.data() || {}).role === 'admin');
            matchedDoc = adminDoc || docsFound[0];

            // Dọn dẹp docDirect rác nếu trước đó đã bị tạo nhầm với ID là cleanEmail
            if (directDoc && directDoc.id !== matchedDoc.id) {
              db.collection('authorizedUsers').doc(directDoc.id).delete().catch(() => {});
            }
          }
        } catch (e2) {
          console.warn('[ToolAuthGuard] emails array query notice:', e2);
        }
      }

      // Nếu không tìm thấy qua mảng emails nhưng có directDoc (tài khoản độc lập)
      if (!matchedDoc && directDoc) {
        matchedDoc = directDoc;
      }

      // 3. Tra cứu dự phòng theo primaryEmail
      if (!matchedDoc) {
        try {
          const snapPrimary = await db.collection('authorizedUsers').where('primaryEmail', '==', cleanEmail).get();
          if (!snapPrimary.empty) {
            matchedDoc = snapPrimary.docs[0];
          }
        } catch (e1) {
          console.warn('[ToolAuthGuard] primaryEmail query notice:', e1);
        }
      }

      // 4. Tra cứu dự phòng theo firebaseUid & firebaseUids
      if (!matchedDoc && currentUid) {
        try {
          const snapUid = await db.collection('authorizedUsers').where('firebaseUid', '==', currentUid).get();
          if (!snapUid.empty) {
            matchedDoc = snapUid.docs[0];
          } else {
            const snapUids = await db.collection('authorizedUsers').where('firebaseUids', 'array-contains', currentUid).get();
            if (!snapUids.empty) {
              matchedDoc = snapUids.docs[0];
            }
          }
        } catch (e3) {
          console.warn('[ToolAuthGuard] firebaseUid query notice:', e3);
        }
      }

      // 5. Tra cứu dự phòng theo Document ID = UID
      if (!matchedDoc && currentUid) {
        try {
          const docByUid = await db.collection('authorizedUsers').doc(currentUid).get();
          if (docByUid.exists) {
            matchedDoc = docByUid;
          }
        } catch (e5) {
          console.warn('[ToolAuthGuard] docId uid notice:', e5);
        }
      }

      if (!matchedDoc) {
        return { authorized: false, data: null };
      }

      const d = matchedDoc.data() || {};
      return { authorized: true, data: { id: matchedDoc.id, docId: matchedDoc.id, ...d } };
    } catch (error) {
      console.error('[ToolAuthGuard] Lỗi kiểm tra Firestore authorizedUsers:', error);
      return { authorized: false, data: null, error: error.message };
    }
  }

  /**
   * Render User Account Widget trên Sidebar
   * @param {object} userState 
   */
  function renderSidebarUserWidget(userState) {
    const sidebar = document.querySelector(config.sidebarSelector);
    if (!sidebar) return;

    let widget = document.getElementById('sidebar-user-widget');
    const sidebarContent = sidebar.querySelector('.sidebar-content') || sidebar;

    if (!widget) {
      widget = document.createElement('div');
      widget.id = 'sidebar-user-widget';
      widget.className = 'sidebar-user-widget';
      sidebarContent.appendChild(widget);
    } else if (!sidebarContent.contains(widget)) {
      sidebarContent.appendChild(widget);
    }

    if (!userState || !userState.authorized) {
      widget.style.display = 'none';
      widget.innerHTML = '';
      return;
    }

    const roleLabels = {
      admin: 'Admin',
      member: 'Thành viên',
      instructor: 'Giảng viên',
      alumni: 'Alumni'
    };

    const roleKey = (userState.role || 'member').toLowerCase();
    const roleTitle = roleLabels[roleKey] || userState.role || 'Thành viên';
    const avatarUrl = userState.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userState.displayName || userState.email)}&background=e2a03f&color=000`;
    const displayName = userState.displayName || userState.email.split('@')[0];

    widget.style.display = 'flex';
    widget.innerHTML = `
      <div class="sidebar-user-info-group" title="${userState.email}">
        <img class="sidebar-user-avatar" src="${avatarUrl}" alt="${displayName}">
        <div class="sidebar-user-text">
          <span class="sidebar-user-name">${displayName}</span>
          <div class="sidebar-user-meta">
            <span class="font-sans-small sidebar-user-role-badge ${roleKey}">${roleTitle}</span>
          </div>
        </div>
      </div>
      <button type="button" class="sidebar-btn-signout" id="sidebar-btn-signout" title="Đăng xuất (${userState.email})">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    `;

    const btnSignout = widget.querySelector('#sidebar-btn-signout');
    if (btnSignout) {
      btnSignout.addEventListener('click', (e) => {
        e.stopPropagation();
        ToolAuthGuard.signOut();
      });
    }
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  window.ToolAuthGuard = {
    /**
     * Khởi tạo Auth Guard cho trang
     * @param {object} options
     */
    init: function (options = {}) {
      config = Object.assign(config, options);

      if (isInitialized) {
        const descEl = document.getElementById('tool-auth-header-desc');
        if (descEl && options.toolDesc) descEl.textContent = options.toolDesc;

        if (currentAuthState && currentAuthState.authorized && typeof config.onAuthorized === 'function' && !hasTriggeredAuthorized) {
          hasTriggeredAuthorized = true;
          config.onAuthorized(currentAuthState);
        }
        return;
      }
      isInitialized = true;

      if (!initFirebase()) return;

      // Kiểm tra cache sessionStorage để hiển thị nhanh tức thì
      const cached = getCachedAuth();
      if (cached) {
        currentAuthState = cached;
        restoreProtectedContent();
        setAuthStateUI('authorized');

        if (typeof config.onAuthorized === 'function' && !hasTriggeredAuthorized) {
          hasTriggeredAuthorized = true;
          config.onAuthorized(cached);
        }

        renderSidebarUserWidget(cached);
      } else {
        // Chưa có cache -> bóc tách DOM ngay lập tức
        detachProtectedContent();
      }

      // Lắng nghe Firebase Auth State
      auth.onAuthStateChanged(async (user) => {
        currentUser = user;

        if (user) {
          // User đã đăng nhập Google → Kiểm tra whitelist Firestore
          const authCheck = await checkFirestoreAuthorization(user.email);

          if (authCheck.error) {
            // Không kiểm tra được trạng thái (offline/lỗi kết nối)
            detachProtectedContent();
            setAuthStateUI('error', {
              message: `Không thể kiểm tra trạng thái đăng nhập (${authCheck.error}). Vui lòng kiểm tra kết nối mạng và thử lại.`
            });
            renderSidebarUserWidget(null);
            hasTriggeredAuthorized = false;
            return;
          }

          if (authCheck.authorized) {
            // ĐƯỢC CẤP QUYỀN
            const authDoc = authCheck.data || {};
            const cleanUserEmail = user.email.toLowerCase();
            const targetDocId = authDoc.docId || authDoc.primaryEmail || authDoc.id || cleanUserEmail;

            // Tự động liên kết firebaseUid vào authorizedUsers nếu chưa có (Luôn ghi vào targetDocId)
            const updates = {};
            const curUids = Array.isArray(authDoc.firebaseUids) ? authDoc.firebaseUids : (authDoc.firebaseUid ? [authDoc.firebaseUid] : []);
            if (user.uid && !curUids.includes(user.uid)) {
              updates.firebaseUids = Array.from(new Set([...curUids, user.uid]));
            }
            if (!authDoc.firebaseUid || authDoc.firebaseUid !== user.uid) {
              updates.firebaseUid = user.uid;
            }
            if (!authDoc.photoUrl && user.photoURL) {
              updates.photoUrl = user.photoURL;
            }
            if (!authDoc.displayName && user.displayName) {
              updates.displayName = user.displayName;
            }
            if (Object.keys(updates).length > 0) {
              updates.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
              db.collection('authorizedUsers').doc(targetDocId).set(updates, { merge: true }).catch(() => {});
            }

            // Nếu email đang đăng nhập là email phụ và vô tình có doc rác mang tên cleanUserEmail khác targetDocId
            if (cleanUserEmail !== targetDocId) {
              db.collection('authorizedUsers').doc(cleanUserEmail).delete().catch(() => {});
            }

            currentAuthState = {
              uid: user.uid,
              id: authDoc.id || user.uid,
              email: user.email.toLowerCase(),
              primaryEmail: authDoc.primaryEmail || user.email.toLowerCase(),
              emails: authDoc.emails || [user.email.toLowerCase()],
              displayName: authDoc.displayName || user.displayName || user.email.split('@')[0],
              photoURL: authDoc.photoUrl || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=e2a03f&color=000`,
              role: authDoc.role || 'member',
              status: authDoc.status || 'active',
              authorized: true
            };

            sessionStorage.setItem('uxcamp_auth', JSON.stringify(currentAuthState));
            restoreProtectedContent();
            setAuthStateUI('authorized');

            if (typeof config.onAuthorized === 'function' && !hasTriggeredAuthorized) {
              hasTriggeredAuthorized = true;
              config.onAuthorized(currentAuthState);
            }

            renderSidebarUserWidget(currentAuthState);

            window.dispatchEvent(new CustomEvent('uxcamp:auth:ready', { detail: currentAuthState }));

          } else {
            // CHƯA CÓ TRONG authorizedUsers (KHÔNG ĐƯỢC XEM)
            currentAuthState = {
              uid: user.uid,
              email: user.email.toLowerCase(),
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: null,
              status: 'unauthorized',
              authorized: false
            };

            sessionStorage.setItem('uxcamp_auth', JSON.stringify(currentAuthState));
            detachProtectedContent();
            setAuthStateUI('unauthorized', currentAuthState);
            renderSidebarUserWidget(null);
            hasTriggeredAuthorized = false;
          }

        } else {
          // CHƯA ĐĂNG NHẬP -> Tự động chuyển hướng ngay lập tức sang authentication.html (Flicker-Free)
          currentAuthState = null;
          currentUser = null;
          sessionStorage.removeItem('uxcamp_auth');
          detachProtectedContent();
          setAuthStateUI('hide');
          renderSidebarUserWidget(null);
          hasTriggeredAuthorized = false;

          const currentUrl = window.location.href;
          const authTarget = `${config.authPageUrl}?redirect=${encodeURIComponent(currentUrl)}`;
          window.location.replace(authTarget);
        }
      });
    },

    /**
     * Đăng xuất
     */
    signOut: async function () {
      if (!auth) return;
      try {
        await auth.signOut();
        sessionStorage.removeItem('uxcamp_auth');
        currentAuthState = null;
        currentUser = null;
        hasTriggeredAuthorized = false;
        detachProtectedContent();
        window.location.href = config.authPageUrl;
      } catch (error) {
        console.error('[ToolAuthGuard] Đăng xuất thất bại:', error);
        alert('Lỗi đăng xuất: ' + error.message);
      }
    },

    /**
     * Đổi tài khoản Google khác
     */
    switchAccount: async function () {
      if (!auth) return;
      try {
        await auth.signOut();
        sessionStorage.removeItem('uxcamp_auth');
        currentAuthState = null;
        currentUser = null;
        hasTriggeredAuthorized = false;
        detachProtectedContent();
        const currentUrl = window.location.href;
        window.location.href = `${config.authPageUrl}?redirect=${encodeURIComponent(currentUrl)}`;
      } catch (error) {
        console.error('[ToolAuthGuard] Đổi tài khoản thất bại:', error);
      }
    },

    /**
     * Lấy auth state hiện tại
     */
    getAuthState: function () {
      return currentAuthState;
    },

    /**
     * Kiểm tra user có được phép sử dụng không
     */
    isAuthorized: function () {
      return !!(currentAuthState && currentAuthState.authorized);
    },

    /**
     * Re-render widget nếu sidebar vừa được cập nhật qua script khác
     */
    refreshSidebarWidget: function () {
      const state = currentAuthState || getCachedAuth();
      if (state && state.authorized) {
        renderSidebarUserWidget(state);
      } else {
        const widget = document.getElementById('sidebar-user-widget');
        if (widget) {
          widget.style.display = 'none';
          widget.innerHTML = '';
        }
      }
    }
  };

})();
