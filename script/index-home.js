'use strict';

window.addEventListener('load', () => {
    if (!document.querySelector('.uxcamp-homepage')) return;


    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

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

    gsap.to('.sticky-graph-overlay', {
        height: '200%',
        ease: "none",
        scrollTrigger: {
            trigger: "#graphContainer",
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
        }
    });


});
