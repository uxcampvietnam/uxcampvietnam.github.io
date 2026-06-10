/**
 * UX Checklist Event Tracking Module
 * Provides unified event tracking functionality across both Heuristic and WCAG 2.2 checklists.
 */
(function() {
  'use strict';

  // Define debounced tracking handler specifically for search input to prevent event flood
  let searchDebounceTimeout = null;

  window.trackEvent = function(eventName, properties) {
    const timestamp = new Date().toISOString();
    const trackingData = {
      ...properties,
      timestamp: timestamp,
      url: window.location.href,
      path: window.location.pathname
    };

    // 1. Log to console for verification / testing
    console.log(`[Event Tracking] ${eventName}:`, trackingData);

    // 2. Forward to Google Analytics (gtag.js) if present
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, trackingData);
    }

    // 3. Dispatch a custom window event for external plugins/consumers
    const customEvent = new CustomEvent('app_track_event', {
      detail: { eventName, properties: trackingData }
    });
    window.dispatchEvent(customEvent);
  };

  // Debounced search helper to be used by apps
  window.trackSearchDebounced = function(query) {
    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout);
    }
    searchDebounceTimeout = setTimeout(() => {
      window.trackEvent('search_criteria', { query: query });
    }, 1000); // 1 second debounce
  };
})();
