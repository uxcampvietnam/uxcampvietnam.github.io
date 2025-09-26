mixpanel.init('95a1a163446d82709a0295d9eb1295e2',
    {debug: false,
        track_pageview: true,
        persistence: 'localStorage'});
 
// Identify user ID.
// mixpanel.identify('USER_ID')

// Reset ID to get Device ID (as user logged out)
// mixpanel.reset();
 
// Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
// mixpanel.track('Event Name', {
//   'Properties': 'Properties Value',
//   'Properties': 'Properties Value',
//   'Properties': 'Properties Value',
//   'Properties': 'Properties Value',
// })