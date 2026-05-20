'use strict';

window.addEventListener('load', () => {
    if (!document.querySelector('.uxcamp-homepage')) return;

    const chars = document.querySelectorAll('.uxcamp-homepage .title .char, .uxcamp-homepage .sub-title .char');
    if (chars.length) {
        gsap.from(chars, {
            opacity: 0,
            y: 30,
            stagger: 0.012,
            duration: 0.7,
            ease: 'power2.out'
        });
    }

    if (typeof randomSplats === 'function' && document.getElementById('fluidCanvas')) {
        setTimeout(() => randomSplats(8, 0, 1, 0.2, 0.8), 400);
    }
});
