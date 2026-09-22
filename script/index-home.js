'use strict';

window.addEventListener('load', () => {
    if (!document.querySelector('.uxcamp-homepage')) return;


    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });
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


    gsap.to('#graphContainer', {
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
            trigger: "#graphContainer",
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
        }
    });


});
