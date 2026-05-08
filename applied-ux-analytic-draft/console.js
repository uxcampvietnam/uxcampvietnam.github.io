

// ============================================================
//  UX ANALYTICS LIVE CONSOLE — Real Tracking Module
//
//  All persistent data is stored in localStorage under STORAGE_KEY.
//  Data shape saved to localStorage:
//  {
//    firstVisit      : ISO string — very first page load ever
//    totalPageViews  : number    — incremented on every page load
//    totalDuration   : number    — accumulated ms from past sessions
//    sessionStart    : ISO string — reset each page load
//    registerClicks  : number    — clicks on any register / CTA link
//    isRegistered    : boolean   — true after first register click
//    registeredDate  : ISO string | null
//    funnelDone      : object    — which funnel steps are complete
//    sectionTime     : object    — cumulative seconds user spent in each section
//    eventLog        : array     — last 50 events [{time, label, isAlert}]
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
            totalDuration: 0,       // accumulated ms from all past sessions
            sessionStart: null,
            registerClicks: 0,
            isRegistered: false,
            registeredDate: null,
            funnelDone: {
                landing_view: false,
                scroll_50: false,
                view_register: false,  // shown as "view_pricing" in the funnel UI
                click_cta: false,
                start_form: false,
                submit_form: false,
            },
            sectionTime: {
                intro: 0,      // cumulative seconds the user has spent with this section visible
                goal: 0,
                register: 0,
                syllabus: 0,   // displayed as "Modules" in the heatmap
                general: 0,
                footer: 0,
                demo: 0,
            },
            eventLog: [],    // [{time:"HH:MM:SS", label:"...", isAlert:bool}]
        };
    }

    /** Serialize and save the current state object */
    function saveState() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
        catch (e) { /* storage quota exceeded — fail silently */ }
    }

    // Initialise state
    const state = loadState();

    // ── State migration ──────────────────────────────────────────
    //  If localStorage contains the old "scrollHeatmap" key (saved before
    //  the redesign), migrate it: zero out the new sectionTime bucket so the
    //  rest of the code never sees `undefined` and crashes silently.
    if (!state.sectionTime) {
        state.sectionTime = { intro: 0, goal: 0, register: 0, syllabus: 0, general: 0, footer: 0, demo: 0 };
        delete state.scrollHeatmap; // remove stale key
        saveState();
    }

    // ─────────────────────────────────────────────────────────────
    // 2. SESSION INIT — runs once per page load
    // ─────────────────────────────────────────────────────────────

    // Count this load as a new page view
    state.totalPageViews += 1;

    // Stamp a fresh session start (used for elapsed-time calculations)
    state.sessionStart = new Date().toISOString();

    // Funnel step 1: user just did a landing_view
    if (!state.funnelDone.landing_view) {
        state.funnelDone.landing_view = true;
        pushEvent('landing_view');  // hoisted — defined in §4
    }

    saveState();

    // ─────────────────────────────────────────────────────────────
    // 3. TIME / DATE HELPERS
    // ─────────────────────────────────────────────────────────────

    /**
     * Format milliseconds as "Xm:Ys" — used for all duration displays.
     * e.g. 1_870_000 ms → "31m:10s"
     * Hours are folded into minutes for readability (e.g. 90m:05s).
     */
    function fmtDuration(ms) {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${m}m:${String(s).padStart(2, '0')}s`;
    }

    /** Vietnamese short date from ISO string → "Thứ 4, 7/5/2026" */
    function fmtDate(isoStr) {
        if (!isoStr) return '—';
        const d = new Date(isoStr);
        const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return `${days[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    /** Elapsed ms since this page was loaded (current session only) */
    function sessionElapsedMs() {
        return Date.now() - new Date(state.sessionStart).getTime();
    }

    /** Total ms = all past sessions + current session */
    function totalElapsedMs() {
        return state.totalDuration + sessionElapsedMs();
    }

    // ─────────────────────────────────────────────────────────────
    // 4. EVENT STREAM
    // ─────────────────────────────────────────────────────────────

    /** Append one entry to the event log and re-render the stream panel */
    function pushEvent(label, isAlert = false) {
        const time = new Date().toTimeString().slice(0, 8); // "HH:MM:SS"
        state.eventLog.push({ time, label, isAlert });
        if (state.eventLog.length > 50) state.eventLog.shift(); // keep last 50
        saveState();
        renderEventStream();
    }

    /** Rebuild the event stream DOM from state.eventLog */
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
    // 5. SCROLL TRACKING  (global depth only — heatmap uses time, not scroll %)
    // ─────────────────────────────────────────────────────────────

    // Maps section element IDs → sectionTime state keys
    const SECTION_MAP = {
        intro: 'intro', goal: 'goal', register: 'register',
        syllabus: 'syllabus', general: 'general', footer: 'footer', demo: 'demo',
    };

    // Global scroll-depth milestones fired this session (reset on reload)
    const scrollMilestones = { 25: false, 50: false, 75: false, 90: false };

    function onScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Global page scroll percentage (0-100)
        const globalPct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        // Fire scroll-depth milestone events (each fires once per session)
        [25, 50, 75, 90].forEach(milestone => {
            if (!scrollMilestones[milestone] && globalPct >= milestone) {
                scrollMilestones[milestone] = true;
                pushEvent(`scroll_depth: ${milestone}%`);
            }
        });

        // Funnel step: scroll_50 reached
        if (!state.funnelDone.scroll_50 && globalPct >= 50) {
            state.funnelDone.scroll_50 = true;
            saveState();
            renderFunnel();
        }

        // Update live scroll-progress bar + percentage text
        const fillEl = document.getElementById('demo-scroll-fill');
        const pctEl = document.getElementById('demo-scroll-pct');
        if (fillEl) fillEl.style.width = globalPct + '%';
        if (pctEl) pctEl.textContent = globalPct + '%';

        // sections_viewed: count sections where user has spent ≥ 3 s
        const viewed = Object.values(state.sectionTime).filter(v => v >= 3).length;
        const sectionsEl = document.getElementById('demo-sections');
        if (sectionsEl) sectionsEl.textContent = `${viewed} / ${Object.keys(state.sectionTime).length}`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─────────────────────────────────────────────────────────────
    // 6. SECTION TIME TRACKING (IntersectionObserver)
    //
    //  Each section element is observed. When it enters the viewport
    //  we record `enterTime`. When it leaves we add the elapsed seconds
    //  to state.sectionTime[key] and save. The live tick also flushes
    //  currently-visible sections every second so the chart updates live.
    // ─────────────────────────────────────────────────────────────

    const seenSections = new Set();   // sections that have fired view_section event
    const sectionEnter = {};          // sectionId → Date.now() when it entered viewport

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const key = SECTION_MAP[id];

            if (entry.isIntersecting) {
                // ── Section entered viewport ──────────────────────────
                sectionEnter[id] = Date.now();

                // Fire view_section event once per session
                if (!seenSections.has(id)) {
                    seenSections.add(id);
                    pushEvent(`view_section: ${id}`);
                }

                // Funnel: view_register step (maps to "view_pricing" in the UI)
                if (id === 'register' && !state.funnelDone.view_register) {
                    state.funnelDone.view_register = true;
                    saveState();
                    renderFunnel();
                }

            } else {
                // ── Section left viewport — flush accumulated time ─────
                if (sectionEnter[id] && key) {
                    const elapsedSec = (Date.now() - sectionEnter[id]) / 1000;
                    state.sectionTime[key] = (state.sectionTime[key] || 0) + elapsedSec;
                    delete sectionEnter[id];
                    saveState();
                    renderHeatmap();
                }
            }
        });
    }, { threshold: 0.2 }); // 20% visibility threshold

    Object.keys(SECTION_MAP).forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });

    /**
     * Flush time for ALL currently-visible sections.
     * Called every second from the live tick so the chart updates in real time
     * without waiting for the section to leave the viewport.
     */
    function flushVisibleSectionTime() {
        const now = Date.now();
        Object.entries(sectionEnter).forEach(([id, enterTs]) => {
            const key = SECTION_MAP[id];
            if (!key) return;
            const elapsedSec = (now - enterTs) / 1000;
            // Add incremental time since last flush, then reset the enter timestamp
            state.sectionTime[key] = (state.sectionTime[key] || 0) + elapsedSec;
            sectionEnter[id] = now; // reset so next flush doesn't double-count
        });
        saveState();
        renderHeatmap();
    }

    // ─────────────────────────────────────────────────────────────
    // 7. REGISTER / CTA CLICK TRACKING
    // ─────────────────────────────────────────────────────────────

    function onRegisterClick() {
        state.registerClicks += 1;

        // First click → mark as registered and stamp the date
        if (!state.isRegistered) {
            state.isRegistered = true;
            state.registeredDate = new Date().toISOString();
        }

        // Advance funnel steps
        if (!state.funnelDone.click_cta) state.funnelDone.click_cta = true;
        if (!state.funnelDone.start_form) state.funnelDone.start_form = true;

        pushEvent('click: [REGISTER_CTA]');
        saveState();
        render();
    }

    /** Attach click listeners to register/CTA links (idempotent) */
    function attachRegisterListeners() {
        document.querySelectorAll(
            '.register-link, a[href*="form"], a[href*="register"]'
        ).forEach(el => {
            if (!el.dataset.uxTracked) {
                el.dataset.uxTracked = '1';
                el.addEventListener('click', onRegisterClick);
            }
        });
    }

    // Re-attach after async bootcamp list is injected into the DOM
    new MutationObserver(attachRegisterListeners)
        .observe(document.body, { childList: true, subtree: true });

    // ─────────────────────────────────────────────────────────────
    // 8. IDLE / ATTENTION STATE
    // ─────────────────────────────────────────────────────────────

    let lastActivity = Date.now();
    let isIdle = false;
    const IDLE_THRESHOLD_MS = 5000; // 5 s without interaction = IDLE

    function resetActivity() {
        lastActivity = Date.now();
        if (isIdle) {
            isIdle = false;
            pushEvent('attention: ACTIVE');
        }
    }

    ['mousemove', 'keydown', 'click', 'touchstart'].forEach(evt =>
        window.addEventListener(evt, resetActivity, { passive: true })
    );

    // ─────────────────────────────────────────────────────────────
    // 9. RAGE-CLICK DETECTION
    // ─────────────────────────────────────────────────────────────

    let recentClicks = []; // timestamps of recent clicks

    document.addEventListener('click', e => {
        const now = Date.now();

        // Collect clicks within a 2-second window
        recentClicks.push(now);
        recentClicks = recentClicks.filter(t => now - t < 2000);

        // 5+ clicks in 2 s = rage click
        if (recentClicks.length >= 5) {
            pushEvent(`rage_click detected (x${recentClicks.length})`, true /* isAlert */);
            recentClicks = [];
        }

        // Update last_action display with a human-readable click target label
        const tag = e.target.tagName.toLowerCase();
        const id = e.target.id ? `#${e.target.id}` : '';
        const cls = typeof e.target.className === 'string' && e.target.className.trim()
            ? '.' + e.target.className.trim().split(/\s+/)[0]
            : '';
        const clickLabel = `click_${tag}${id || cls}`;
        const lastActionEl = document.getElementById('demo-last-action');
        if (lastActionEl) lastActionEl.textContent = clickLabel;

        // Also push every click into the Event Stream
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
    // 11. ENGAGEMENT SCORE (0-100)
    //
    //  Breakdown (each sub-score contributes 0-20 pts):
    //    scroll_score   — global scroll depth reached (0-100% → 0-20 pts)
    //    section_score  — sections scrolled into (out of 7 → 0-20 pts)
    //    time_score     — time on page, capped at 10 min (0-20 pts)
    //    cta_score      — 20 pts if any CTA was clicked, else 0
    //    funnel_score   — funnel steps completed / 6 → 0-20 pts
    // ─────────────────────────────────────────────────────────────

    function calcEngagement() {
        const scrollPct = parseInt(document.getElementById('demo-scroll-fill')?.style.width) || 0;
        const scrollScore = Math.round((scrollPct / 100) * 20);

        // sections_viewed: sections where user spent ≥ 3 s
        const viewed = Object.values(state.sectionTime).filter(v => v >= 3).length;
        const sectionScore = Math.round((viewed / 7) * 20);

        const timeMs = sessionElapsedMs();
        const timeScore = Math.min(20, Math.round((timeMs / 600000) * 20)); // cap 10 min

        const ctaScore = state.funnelDone.click_cta ? 20 : 0;

        const funnelSteps = Object.values(state.funnelDone).filter(Boolean).length;
        const funnelScore = Math.round((funnelSteps / 6) * 20);

        return Math.min(100, scrollScore + sectionScore + timeScore + ctaScore + funnelScore);
    }

    // ─────────────────────────────────────────────────────────────
    // 12. HEATMAP RENDERER  (time-spent per section, Y-axis in seconds)
    // ─────────────────────────────────────────────────────────────

    const HEATMAP_LABELS = ['Intro', 'Goal', 'Register', 'Modules', 'General', 'Link', 'Demo'];
    const HEATMAP_KEYS = ['intro', 'goal', 'register', 'syllabus', 'general', 'footer', 'demo'];

    /**
     * Pick a "nice" tick step so the Y-axis has at most MAX_TICKS labels.
     * Rounds up to a clean number: 1, 2, 5, 10, 15, 30, 60, 120, …
     * @param {number} maxVal  The maximum data value (seconds)
     * @param {number} maxTicks  Desired maximum number of tick lines
     */
    function niceStep(maxVal, maxTicks = 6) {
        if (maxVal <= 0) return 1;
        const raw = maxVal / maxTicks;
        // Candidate steps: 1,2,5,10,15,30,60,120,300,600 …
        const steps = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 1800];
        for (const s of steps) {
            if (s >= raw) return s;
        }
        return Math.ceil(raw / 600) * 600; // fall back to multiples of 600 s
    }

    function renderHeatmap() {
        const barsContainer = document.querySelector('.ux-heatmap-bars');
        const yAxis = document.querySelector('.ux-heatmap-yaxis');
        if (!barsContainer) return;

        // Time values in seconds for each section
        const values = HEATMAP_KEYS.map(k => state.sectionTime[k] || 0);
        const maxVal = Math.max(...values, 1); // at least 1 s so chart always renders

        // ── Smart Y-axis ─────────────────────────────────────────
        const step = niceStep(maxVal);         // tick interval in seconds
        const topTick = Math.ceil(maxVal / step) * step; // round max up to next tick
        const tickCount = Math.round(topTick / step); // number of ticks (≤ ~6)

        // Rebuild Y-axis labels (top → bottom)
        if (yAxis) {
            const tickLabels = [];
            for (let t = tickCount; t >= 0; t--) {
                const sec = t * step;
                // Format tick: "Xs" for <60 s, "Xm" for ≥60 s
                const label = sec >= 60 ? `${Math.round(sec / 60)}m` : `${sec}s`;
                tickLabels.push(`<span class="mono-body secondary-text">${label}</span>`);
            }
            yAxis.innerHTML = tickLabels.join('');
        }

        // ── Bar columns ──────────────────────────────────────────────
        //  Bar height is in PIXELS matched to the CSS constant CHART_PX=120.
        //  Using px (not %) avoids flexbox percentage-height resolution issues.
        const CHART_PX = 120; // must match .ux-bar-wrap height in CSS

        barsContainer.innerHTML = HEATMAP_KEYS.map((key, i) => {
            const sec = state.sectionTime[key] || 0;

            // Pixel height of this bar proportional to the tallest bar (topTick)
            const barPx = topTick > 0 ? Math.max(0, Math.round((sec / topTick) * CHART_PX)) : 0;

            return `
        <div class="ux-heatmap-col">
          <div class="ux-bar-wrap">
            ${barPx > 0
                    ? `<div class="ux-bar" style="height:${barPx}px" title="${sec.toFixed(1)}s"></div>`
                    : ''
                }
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
        { key: 'submit_form', label: 'submit_form' },
    ];

    function renderFunnel() {
        const container = document.querySelector('.ux-funnel');
        if (!container) return;

        container.innerHTML = FUNNEL_STEPS.map(({ key, label }) => {
            const done = !!state.funnelDone[key];
            return `
        <div class="ux-event-row">
          <span class="mono-body secondary-text ux-pipe">|</span>
          <span class="mono-body ${done ? 'primary-text ux-funnel-check done' : 'secondary-text ux-funnel-check'}">[${done ? '√' : ' '}]</span>
          <span class="mono-body ${done ? 'primary-text' : 'secondary-text'}">${label}</span>
        </div>`;
        }).join('');
    }

    // ─────────────────────────────────────────────────────────────
    // 14. MAIN RENDER — updates every DOM element in the console
    // ─────────────────────────────────────────────────────────────

    function render() {

        // ── Overall ───────────────────────────────────────────────

        // total_page_view: pageviews this user has ever made (persisted across sessions)
        const pvEl = document.getElementById('demo-total-pv');
        if (pvEl) pvEl.textContent = `${state.totalPageViews} lần`;

        // first_page_view: date the user first visited this page (ever)
        const fpEl = document.getElementById('demo-first-pv');
        if (fpEl) fpEl.textContent = fmtDate(state.firstVisit);

        // total_session_duration: sum of all past session times + current elapsed ("Xm:Ys")
        const totalDurEl = document.getElementById('demo-total-dur');
        if (totalDurEl) totalDurEl.textContent = fmtDuration(totalElapsedMs());

        // currrent_session_duration: elapsed time since this page load ("Xm:Ys")
        const curDurEl = document.getElementById('demo-cur-dur');
        if (curDurEl) curDurEl.textContent = fmtDuration(sessionElapsedMs());

        // register_click: number of times user clicked any register/CTA link
        const regClickEl = document.getElementById('demo-reg-click');
        if (regClickEl) regClickEl.textContent = `${state.registerClicks} lần`;

        // is_registered: becomes true after the first register link click
        const isRegEl = document.getElementById('demo-is-reg');
        if (isRegEl) isRegEl.textContent = state.isRegistered ? 'true' : 'false';

        // registered_date: date of first register click (or '—' if never clicked)
        const regDateEl = document.getElementById('demo-reg-date');
        if (regDateEl) regDateEl.textContent = fmtDate(state.registeredDate);

        // ── User State ────────────────────────────────────────────

        // time_on_page: live elapsed time for this session in "Xm:Ys" format
        const timeEl = document.getElementById('demo-time-on-page');
        if (timeEl) timeEl.textContent = fmtDuration(sessionElapsedMs());

        // attention_state: ACTIVE if user interacted in last 5 s, else IDLE
        const nowTs = Date.now();
        if (nowTs - lastActivity > IDLE_THRESHOLD_MS && !isIdle) {
            isIdle = true;
            pushEvent(`idle: ${Math.round((nowTs - lastActivity) / 1000)}s`);
        }
        const attentionEl = document.getElementById('demo-attention');
        if (attentionEl) attentionEl.textContent = isIdle ? 'IDLE' : 'ACTIVE';

        // cta_clicks: same as register_click count
        const ctaEl = document.getElementById('demo-cta');
        if (ctaEl) ctaEl.textContent = state.registerClicks;

        // engagement_score: weighted formula (see §11)
        const engEl = document.getElementById('demo-eng');
        if (engEl) engEl.textContent = `${calcEngagement()} / 100`;

        // ── User State grid (right panel) ─────────────────────────

        // country: requires server-side IP lookup — shown as '—' (honest)
        // device_type, os, browser, version: from navigator.userAgent
        // is_dark_mode: from window.matchMedia
        // screen dimensions: from window.screen

        const cells = document.querySelectorAll('.ux-state-cell');
        if (cells.length >= 9) {
            // [0] country — cannot determine client-side without IP API
            cells[0].querySelector('span:last-child').textContent = '—';
            // [1] device_type
            cells[1].querySelector('span:last-child').textContent = getDeviceType();
            // [2] operating_system
            cells[2].querySelector('span:last-child').textContent = getOS();
            // [3] is_dark_mode — system-level dark mode preference
            cells[3].querySelector('span:last-child').textContent =
                window.matchMedia('(prefers-color-scheme: dark)').matches ? 'true' : 'false';
            // [4] region — cannot determine client-side without IP API
            cells[4].querySelector('span:last-child').textContent = '—';
            // [5] browser
            cells[5].querySelector('span:last-child').textContent = getBrowser();
            // [6] browser_version — major version number
            cells[6].querySelector('span:last-child').textContent = getBrowserVersion();
            // [7] screen_height_px — physical screen height in CSS pixels
            cells[7].querySelector('span:last-child').textContent = window.screen.height;
            // [8] screen_width_px — physical screen width in CSS pixels
            cells[8].querySelector('span:last-child').textContent = window.screen.width;
        }

        // ── Sub-renderers ─────────────────────────────────────────
        renderHeatmap();
        renderFunnel();
    }

    // ─────────────────────────────────────────────────────────────
    // 15. PERSIST DURATION ON PAGE LEAVE
    //  Save the current session's elapsed time so totalDuration keeps
    //  growing across page reloads / navigation.
    // ─────────────────────────────────────────────────────────────

    function persistDuration() {
        state.totalDuration += sessionElapsedMs();
        // Reset sessionStart so double-firing (pagehide + beforeunload) doesn't double-count
        state.sessionStart = new Date().toISOString();
        saveState();
    }

    window.addEventListener('pagehide', persistDuration);
    window.addEventListener('beforeunload', persistDuration);

    // ─────────────────────────────────────────────────────────────
    // 16. LIVE TICK — refresh time-sensitive displays every second
    // ─────────────────────────────────────────────────────────────

    // Live tick: update time displays AND flush visible-section time counters
    setInterval(() => {
        flushVisibleSectionTime(); // accumulate time for sections currently on screen
        render();                  // refresh all DOM values
    }, 1000);

    // ─────────────────────────────────────────────────────────────
    // 17. BOOTSTRAP — initial renders on page load
    // ─────────────────────────────────────────────────────────────

    render();
    renderEventStream();
    attachRegisterListeners();
    onScroll(); // seed scroll state from current scroll position

})(); // end UX Analytics Live Console module
