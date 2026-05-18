
// ============================================================
//  UX ANALYTICS LIVE CONSOLE — Real Tracking Module
//
//  All persistent data is stored in localStorage under STORAGE_KEY.
//  Data shape saved to localStorage:
//  {
//    firstVisit      : ISO string — very first page load ever
//    totalPageViews  : number    — incremented on every page load
//    totalDuration   : number    — accumulated ms from past sessions (active only)
//    sessionStart    : ISO string — reset each page load
//    registerClicks  : number    — clicks on any register / CTA link
//    isRegistered    : boolean   — true after first register click
//    registeredDate  : ISO string | null
//    funnelDone      : object    — which funnel steps are complete
//    sectionTime     : object    — cumulative seconds user spent in each section
//    eventLog        : array     — last 50 events [{time, label, isAlert}]
//    registrationStats : object  — frozen metrics at time of registration
//  }
// ============================================================

(function () {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // 1. STORAGE HELPERS
    // ─────────────────────────────────────────────────────────────

    const STORAGE_KEY = 'uxConsole_v1';

    /** Load persisted state from localStorage, or return fresh defaults */
    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) { /* ignore corrupt / unavailable storage */ }

        // First ever visit — return clean defaults
        return {
            firstVisit: new Date().toISOString(),
            totalPageViews: 0,
            totalDuration: 0,       // accumulated ms from all past sessions (active only)
            sessionStart: null,
            registerClicks: 0,
            isRegistered: false,
            registeredDate: null,
            formProgress: 0,        // tracks form completion %
            sectionProgress: {
                general: 0,
                environment: 0,
                characteristics: 0,
                problem: 0,
                expectations: 0,
                registration: 0
            },
            registrationStats: null, // frozen stats at time of registration
            funnelDone: {
                landing_view: false,
                scroll_50: false,
                view_register: false,
                click_cta: false,
                start_form: false,
                submit_form: false,
            },
            sectionTime: {
                intro: 0, goal: 0, register: 0, syllabus: 0, general: 0, footer: 0, demo: 0,
            },
            eventLog: [],
        };
    }

    /** Serialize and save the current state object */
    function saveState() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
        catch (e) { /* storage quota exceeded — fail silently */ }
    }

    // Initialise state
    const state = loadState();

    // Per-session active timer (non-persistent, added to totalDuration on exit)
    let sessionActiveMs = 0;

    // ── State migration ──────────────────────────────────────────
    if (!state.sectionTime) {
        state.sectionTime = { intro: 0, goal: 0, register: 0, syllabus: 0, general: 0, footer: 0, demo: 0 };
        saveState();
    }
    if (!state.sectionProgress) {
        state.sectionProgress = {
            general: 0,
            environment: 0,
            characteristics: 0,
            problem: 0,
            expectations: 0,
            registration: 0
        };
        saveState();
    }

    // ─────────────────────────────────────────────────────────────
    // 2. SESSION INIT — runs once per page load
    // ─────────────────────────────────────────────────────────────

    // Count this load as a new page view
    state.totalPageViews += 1;
    state.sessionStart = new Date().toISOString();

    // Funnel step 1: user just did a landing_view
    if (!state.funnelDone.landing_view) {
        state.funnelDone.landing_view = true;
        pushEvent('landing_view');
    }

    saveState();

    // ─────────────────────────────────────────────────────────────
    // 3. TIME / DATE HELPERS
    // ─────────────────────────────────────────────────────────────

    function fmtDuration(ms) {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${m}m:${String(s).padStart(2, '0')}s`;
    }

    function fmtDate(isoStr) {
        if (!isoStr) return '—';
        const d = new Date(isoStr);
        const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    function sessionElapsedMs() {
        return sessionActiveMs;
    }

    function totalElapsedMs() {
        return state.totalDuration + sessionActiveMs;
    }

    // ─────────────────────────────────────────────────────────────
    // 4. EVENT STREAM
    // ─────────────────────────────────────────────────────────────

    function pushEvent(label, isAlert = false) {
        const time = new Date().toTimeString().slice(0, 8);
        state.eventLog.push({ time, label, isAlert });
        if (state.eventLog.length > 50) state.eventLog.shift();
        saveState();
        renderEventStream();
    }

    function renderEventStream() {
        const container = document.getElementById('demo-event-stream');
        if (!container) return;

        const MAX_VISIBLE = 12;
        const visible = state.eventLog.slice(-MAX_VISIBLE);

        container.innerHTML =
            visible.map(ev => `
        <div class="ux-event-row${ev.isAlert ? ' ux-event-alert' : ''}">
          <span class="mono-body secondary-text ux-pipe">|</span>
          <span class="mono-body secondary-text ux-event-time">${ev.time}</span>
          <span class="mono-body secondary-text ux-event-sep">›</span>
          <span class="mono-body primary-text">${ev.label}</span>
        </div>`).join('') +
            `<div class="ux-event-row">
        <span class="mono-body secondary-text ux-pipe">|</span>
        <span class="mono-body secondary-text ux-event-time"></span>
        <span class="mono-body secondary-text ux-event-sep"></span>
        <span class="mono-body secondary-text ux-cursor-blink">▋</span>
      </div>`;
    }

    // ─────────────────────────────────────────────────────────────
    // 5. SCROLL TRACKING
    // ─────────────────────────────────────────────────────────────

    const SECTION_MAP = {
        intro: 'intro', goal: 'goal', register: 'register',
        syllabus: 'syllabus', general: 'general', footer: 'footer', console: 'demo',
    };

    const scrollMilestones = { 25: false, 50: false, 75: false, 90: false };

    function onScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const globalPct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        [25, 50, 75, 90].forEach(milestone => {
            if (!scrollMilestones[milestone] && globalPct >= milestone) {
                scrollMilestones[milestone] = true;
                pushEvent(`scroll_depth: ${milestone}%`);
            }
        });

        if (!state.funnelDone.scroll_50 && globalPct >= 50) {
            state.funnelDone.scroll_50 = true;
            saveState();
            renderFunnel();
        }

        const fillEl = document.getElementById('demo-scroll-fill');
        const pctEl = document.getElementById('demo-scroll-pct');
        if (fillEl) fillEl.style.width = globalPct + '%';
        if (pctEl) pctEl.textContent = globalPct + '%';

        const viewed = Object.values(state.sectionTime).filter(v => v >= 3).length;
        const sectionsEl = document.getElementById('demo-sections');
        if (sectionsEl) sectionsEl.textContent = `${viewed} / ${Object.keys(state.sectionTime).length}`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─────────────────────────────────────────────────────────────
    // 6. SECTION TIME TRACKING
    // ─────────────────────────────────────────────────────────────

    const seenSections = new Set();
    const sectionEnter = {};

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const key = SECTION_MAP[id];

            if (entry.isIntersecting) {
                sectionEnter[id] = Date.now();
                if (!seenSections.has(id)) {
                    seenSections.add(id);
                    pushEvent(`view_section: ${id}`);
                }
                if (id === 'register' && !state.funnelDone.view_register) {
                    state.funnelDone.view_register = true;
                    saveState();
                    renderFunnel();
                }
            } else {
                if (sectionEnter[id] && key) {
                    if (!isIdle) {
                        const elapsedSec = (Date.now() - sectionEnter[id]) / 1000;
                        state.sectionTime[key] = (state.sectionTime[key] || 0) + elapsedSec;
                    }
                    delete sectionEnter[id];
                    saveState();
                    renderHeatmap();
                }
            }
        });
    }, { threshold: 0.2 });

    Object.keys(SECTION_MAP).forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });

    function flushVisibleSectionTime() {
        const now = Date.now();
        Object.entries(sectionEnter).forEach(([id, enterTs]) => {
            const key = SECTION_MAP[id];
            if (!key) return;
            if (!isIdle) {
                const elapsedSec = (now - enterTs) / 1000;
                state.sectionTime[key] = (state.sectionTime[key] || 0) + elapsedSec;
            }
            sectionEnter[id] = now;
        });
        saveState();
        renderHeatmap();
    }

    // ─────────────────────────────────────────────────────────────
    // 7. REGISTER / CTA CLICK TRACKING
    // ─────────────────────────────────────────────────────────────

    function onRegisterClick() {
        state.registerClicks += 1;
        if (!state.isRegistered) {
            state.isRegistered = true;
            state.registeredDate = new Date().toISOString();
        }
        if (!state.funnelDone.click_cta) state.funnelDone.click_cta = true;
        if (!state.funnelDone.start_form) state.funnelDone.start_form = true;

        pushEvent('click: [REGISTER_CTA]');
        saveState();
        render();
    }

    function attachRegisterListeners() {
        document.querySelectorAll('.register-link, a[href*="form"], a[href*="register"]').forEach(el => {
            if (!el.dataset.uxTracked) {
                el.dataset.uxTracked = '1';
                el.addEventListener('click', onRegisterClick);
            }
        });
    }

    new MutationObserver(attachRegisterListeners).observe(document.body, { childList: true, subtree: true });

    // ─────────────────────────────────────────────────────────────
    // 8. IDLE / ATTENTION STATE
    // ─────────────────────────────────────────────────────────────

    let lastActivity = Date.now();
    let isIdle = false;
    const IDLE_THRESHOLD_MS = 5000;

    function resetActivity() {
        lastActivity = Date.now();
        if (isIdle) {
            isIdle = false;
            pushEvent('attention: ACTIVE');
        }
    }

    ['mousemove', 'keydown', 'click', 'touchstart', 'scroll', 'wheel'].forEach(evt =>
        window.addEventListener(evt, resetActivity, { passive: true })
    );

    // ─────────────────────────────────────────────────────────────
    // 9. RAGE-CLICK DETECTION
    // ─────────────────────────────────────────────────────────────

    let recentClicks = [];
    document.addEventListener('click', e => {
        const now = Date.now();
        recentClicks.push(now);
        recentClicks = recentClicks.filter(t => now - t < 2000);
        if (recentClicks.length >= 5) {
            pushEvent(`rage_click detected (x${recentClicks.length})`, true);
            recentClicks = [];
        }
        const tag = e.target.tagName.toLowerCase();
        const id = e.target.id ? `#${e.target.id}` : '';
        const cls = typeof e.target.className === 'string' && e.target.className.trim() ? '.' + e.target.className.trim().split(/\s+/)[0] : '';
        const clickLabel = `click_${tag}${id || cls}`;
        const lastActionEl = document.getElementById('demo-last-action');
        if (lastActionEl) lastActionEl.textContent = clickLabel;
        pushEvent(clickLabel);
    });

    // ─────────────────────────────────────────────────────────────
    // 10. DEVICE / BROWSER DETECTION
    // ─────────────────────────────────────────────────────────────

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/Mobi|Android/i.test(ua)) return 'Mobile';
        if (/Tablet|iPad/i.test(ua)) return 'Tablet';
        return 'Computer';
    }

    function getOS() {
        const ua = navigator.userAgent;
        if (/Windows/i.test(ua)) return 'Windows';
        if (/Mac OS X/i.test(ua)) return 'macOS';
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad/i.test(ua)) return 'iOS';
        if (/Linux/i.test(ua)) return 'Linux';
        return 'Unknown';
    }

    function getBrowser() {
        const ua = navigator.userAgent;
        if (/Edg\//i.test(ua)) return 'Edge';
        if (/OPR\//i.test(ua)) return 'Opera';
        if (/Chrome\//i.test(ua)) return 'Chrome';
        if (/Firefox\//i.test(ua)) return 'Firefox';
        if (/Safari\//i.test(ua)) return 'Safari';
        return 'Unknown';
    }

    function getBrowserVersion() {
        const ua = navigator.userAgent;
        const m = ua.match(/(?:Chrome|Firefox|Version|Edg)\/(\d+)/);
        return m ? m[1] : '—';
    }

    // ─────────────────────────────────────────────────────────────
    // 11. ENGAGEMENT SCORE
    // ─────────────────────────────────────────────────────────────



    // ─────────────────────────────────────────────────────────────
    // 12. HEATMAP RENDERER
    // ─────────────────────────────────────────────────────────────

    const HEATMAP_LABELS = ['Intro', 'Goal', 'Register', 'Syllabus', 'General', 'Link', 'Demo'];
    const HEATMAP_KEYS = ['intro', 'goal', 'register', 'syllabus', 'general', 'footer', 'demo'];

    function niceStep(maxVal, maxTicks = 6) {
        if (maxVal <= 0) return 1;
        const raw = maxVal / maxTicks;
        const steps = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 1800];
        for (const s of steps) { if (s >= raw) return s; }
        return Math.ceil(raw / 600) * 600;
    }

    function renderHeatmap() {
        const barsContainer = document.querySelector('.ux-heatmap-bars');
        const yAxis = document.querySelector('.ux-heatmap-yaxis');
        if (!barsContainer) return;

        const values = HEATMAP_KEYS.map(k => state.sectionTime[k] || 0);
        const maxVal = Math.max(...values, 1);
        const step = niceStep(maxVal);
        const topTick = Math.ceil(maxVal / step) * step;
        const tickCount = Math.round(topTick / step);

        if (yAxis) {
            const tickLabels = [];
            for (let t = tickCount; t >= 0; t--) {
                const sec = t * step;
                const label = sec >= 60 ? `${Math.round(sec / 60)}m` : `${sec}s`;
                tickLabels.push(`<span class="mono-body secondary-text">${label}</span>`);
            }
            yAxis.innerHTML = tickLabels.join('');
        }

        const CHART_PX = 120;
        barsContainer.innerHTML = HEATMAP_KEYS.map((key, i) => {
            const sec = state.sectionTime[key] || 0;
            const barPx = topTick > 0 ? Math.max(0, Math.round((sec / topTick) * CHART_PX)) : 0;
            return `
        <div class="ux-heatmap-col">
          <div class="ux-bar-wrap">
            ${barPx > 0 ? `<div class="ux-bar" style="height:${barPx}px" title="${sec.toFixed(1)}s"></div>` : ''}
          </div>
          <span class="mono-body secondary-text">${HEATMAP_LABELS[i]}</span>
        </div>`;
        }).join('');
    }

    // ─────────────────────────────────────────────────────────────
    // 13. FUNNEL RENDERER
    // ─────────────────────────────────────────────────────────────

    const FUNNEL_STEPS = [
        { key: 'landing_view', label: 'landing_view' },
        { key: 'scroll_50', label: 'scroll_50%' },
        { key: 'view_register', label: 'view_pricing' },
        { key: 'click_cta', label: 'click_cta' },
        { key: 'start_form', label: 'start_form' },
        { key: 'form_general_section_completion', label: 'form_general_section_completion', isFormSection: true, total: 6, secKey: 'general' },
        { key: 'form_environment_section_completion', label: 'form_environment_section_completion', isFormSection: true, total: 5, secKey: 'environment' },
        { key: 'form_characteristics_section_completion', label: 'form_characteristics_section_completion', isFormSection: true, total: 24, secKey: 'characteristics' },
        { key: 'form_problem_section_completion', label: 'form_problem_section_completion', isFormSection: true, total: 20, secKey: 'problem' },
        { key: 'form_expectations_section_completion', label: 'form_expectations_section_completion', isFormSection: true, total: 23, secKey: 'expectations' },
        { key: 'form_registration_section_completion', label: 'form_registration_section_completion', isFormSection: true, total: 1, secKey: 'registration' },
        { key: 'submit_form', label: 'submit_form' },
    ];

    function renderFunnel() {
        const container = document.querySelector('.ux-funnel');
        if (!container) return;
        container.innerHTML = FUNNEL_STEPS.map((step) => {
            let done = false;
            let displayLabel = step.label;
            
            if (step.isFormSection) {
                const filled = (state.sectionProgress && state.sectionProgress[step.secKey]) || 0;
                done = filled === step.total;
                displayLabel = `${step.label}: ${filled}/${step.total}`;
            } else {
                done = !!state.funnelDone[step.key];
            }
            
            return `
        <div class="ux-event-row">
          <span class="mono-body secondary-text ux-pipe">|</span>
          <span class="mono-body ${done ? 'primary-text ux-funnel-check done' : 'secondary-text ux-funnel-check'}">[${done ? '√' : ' '}]</span>
          <span class="mono-body ${done ? 'primary-text' : 'secondary-text'}">${displayLabel}</span>
        </div>`;
        }).join('');
    }

    // ─────────────────────────────────────────────────────────────
    // 14. MAIN RENDER
    // ─────────────────────────────────────────────────────────────

    function render() {
        const submittedData = localStorage.getItem('bootcamp_submitted_data');
        if (submittedData && !state.funnelDone.submit_form) {
            state.funnelDone.submit_form = true;
            state.formProgress = 100;
            if (!state.registrationStats) {
                const firstVisit = new Date(state.firstVisit);
                const now = new Date();
                const daysSinceFirstVisit = Math.floor((now - firstVisit) / (1000 * 60 * 60 * 24));
                state.registrationStats = {
                    totalPageViewToRegister: state.totalPageViews,
                    firstPageView: state.firstVisit,
                    daySinceFirstPageViewToRegister: daysSinceFirstVisit,
                    registerClickCountToRegister: state.registerClicks,
                    sectionTimes: { ...state.sectionTime }
                };
            }
            pushEvent('FORM_SUBMIT_SUCCESS', true);
            saveState();
        }

        const pvEl = document.getElementById('demo-total-pv');
        if (pvEl) pvEl.textContent = `${state.totalPageViews} lần`;

        const fpEl = document.getElementById('demo-first-pv');
        if (fpEl) fpEl.textContent = fmtDate(state.firstVisit);

        const totalDurEl = document.getElementById('demo-total-dur');
        if (totalDurEl) totalDurEl.textContent = fmtDuration(totalElapsedMs());

        const curDurEl = document.getElementById('demo-cur-dur');
        if (curDurEl) curDurEl.textContent = fmtDuration(sessionElapsedMs());

        const regClickEl = document.getElementById('demo-reg-click');
        if (regClickEl) regClickEl.textContent = `${state.registerClicks} lần`;

        const isRegEl = document.getElementById('demo-is-reg');
        if (isRegEl) isRegEl.textContent = state.isRegistered ? 'true' : 'false';

        const regDateEl = document.getElementById('demo-reg-date');
        if (regDateEl) regDateEl.textContent = fmtDate(state.registeredDate);

        const timeEl = document.getElementById('demo-time-on-page');
        if (timeEl) timeEl.textContent = fmtDuration(sessionElapsedMs());

        const nowTs = Date.now();
        if (nowTs - lastActivity > IDLE_THRESHOLD_MS && !isIdle) {
            isIdle = true;
            pushEvent(`idle: ${Math.round((nowTs - lastActivity) / 1000)}s`);
        }
        const attentionEl = document.getElementById('demo-attention');
        if (attentionEl) attentionEl.textContent = isIdle ? 'IDLE' : 'ACTIVE';

        const cells = document.querySelectorAll('.ux-state-cell');
        if (cells.length >= 8) {
            cells[0].querySelector('span:last-child').textContent = getDeviceType();
            cells[1].querySelector('span:last-child').textContent = getOS();
            const progressLabel = cells[2].querySelector('span:first-child');
            if (progressLabel) progressLabel.textContent = 'form_progress:';
            cells[2].querySelector('span:last-child').textContent = `${state.formProgress || 0}%`;
            cells[3].querySelector('span:last-child').textContent = '—';
            cells[4].querySelector('span:last-child').textContent = getBrowser();
            cells[5].querySelector('span:last-child').textContent = getBrowserVersion();
            cells[6].querySelector('span:last-child').textContent = window.screen.height;
            cells[7].querySelector('span:last-child').textContent = window.screen.width;
        }

        renderHeatmap();
        renderFunnel();
        renderRegistrationSection();
    }

    function renderRegistrationSection() {
        if (!state.registrationStats) return;
        let container = document.getElementById('registration-stats-section');
        if (!container) {
            const body = document.querySelector('.ux-panel-right');
            if (!body) return;
            container = document.createElement('div');
            container.id = 'registration-stats-section';
            container.className = 'ux-block';
            container.style.marginTop = '20px';
            body.appendChild(container);
        }
        const stats = state.registrationStats;
        container.innerHTML = `
            <div class="ux-block-title mono-body primary-text" style="color: var(--applied-analytic-primary)">[ FROM FIRST PAGE VIEW TO REGISTER ]<span class="ux-dash"></span></div>
            <div class="ux-kv-grid">
                <span class="mono-body secondary-text">total_page_view_to_register</span>
                <span class="mono-body secondary-text">:</span>
                <span class="mono-body primary-text">${stats.totalPageViewToRegister}</span>
                <span class="mono-body secondary-text">first_page_view</span>
                <span class="mono-body secondary-text">:</span>
                <span class="mono-body primary-text">${fmtDate(stats.firstPageView)}</span>
                <span class="mono-body secondary-text">day_since_first_page_view_to_register</span>
                <span class="mono-body secondary-text">:</span>
                <span class="mono-body primary-text">${stats.daySinceFirstPageViewToRegister} days</span>
                <span class="mono-body secondary-text">register_click_count_to_register</span>
                <span class="mono-body secondary-text">:</span>
                <span class="mono-body primary-text">${stats.registerClickCountToRegister}</span>
            </div>`;
    }

    // ─────────────────────────────────────────────────────────────
    // 15. PERSIST DURATION
    // ─────────────────────────────────────────────────────────────

    function persistDuration() {
        state.totalDuration += sessionActiveMs;
        sessionActiveMs = 0;
        saveState();
    }

    window.addEventListener('pagehide', persistDuration);
    window.addEventListener('beforeunload', persistDuration);

    // ─────────────────────────────────────────────────────────────
    // 16. LIVE TICK
    // ─────────────────────────────────────────────────────────────

    setInterval(() => {
        if (!isIdle) {
            sessionActiveMs += 1000;
        }
        flushVisibleSectionTime();
        render();
    }, 1000);

    // ── Real-time localStorage Sync across tabs ──────────────────
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
            try {
                const newState = JSON.parse(e.newValue);
                if (newState) {
                    Object.assign(state, newState);
                    render();
                    renderEventStream();
                }
            } catch (err) {}
        }
    });

    // ─────────────────────────────────────────────────────────────
    // 17. BOOTSTRAP
    // ─────────────────────────────────────────────────────────────

    render();
    renderEventStream();
    attachRegisterListeners();
    onScroll();

})();
