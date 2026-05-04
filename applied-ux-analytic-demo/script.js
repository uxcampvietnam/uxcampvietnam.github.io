function showFluidText() {
    config.SPLAT_RADIUS = defaultConfig.SPLAT_RADIUS;
    // config.SPLASH_COLOR = { r: 0, g: 0, b: 255 };
    config.BACK_COLOR = defaultConfig.BACK_COLOR;
    config.SPLASH_COLOR = defaultConfig.SPLASH_COLOR;
    // fullscreenSplats(20);
    document.querySelector('.bootcamp-name-hero').classList.remove('bootcamp-name-hero-hide');
}

function hideFluidText() {
    // config.SPLASH_COLOR = { r: 0, g: 0, b: 255 };
    // fullscreenSplats(90);
    // config.BACK_COLOR = isDarkMode ? { r: 1, g: 4, b: 9 } : { r: 244, g: 237, b: 228 };
    document.querySelector('.bootcamp-name-hero').classList.add('bootcamp-name-hero-hide');
    config.SPLAT_RADIUS = 0.15;
}

const applieduxanalyticIntroHeader = new SplitType('.bootcamp-section-header h2, .bootcamp-section-header p', {
    types: 'words, chars'
});

ScrollTrigger.create({
    trigger: ".applied-ux-analytic",
    start: "top 80%",
    end: "top 80%",
    // markers: true,
    onEnter: () => hideFluidText(),
    onEnterBack: () => showFluidText(),
    // onLeave: () => hideFluidText(),
    // onLeaveBack: () => showFluidText(),
});

// ======================================


window.onload = () => {


    gsap.to('.applied-ux-analytic-name-fluid.text *', {
        opacity: 1,
        delay: "random(1, 2)",
        ease: "bounce.in",
        duration: 0.5,
    });


    document.querySelectorAll('.syllabus-obstacle').forEach(syllabusObstacle => {
        syllabusObstacle.style.position = 'fixed';
    });

    document.querySelectorAll('.bootcamp-section-full').forEach(bootcampSectionFull => {
        gsap.to(bootcampSectionFull.getElementsByClassName('char'), {
            scrollTrigger: {
                trigger: bootcampSectionFull,
                start: "top bottom-=100",
                end: "bottom top",
                // markers: true,
                toggleActions: 'play reverse play reverse', //onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
            },
            opacity: 1,
            delay: "random(0.3, 0.9)",
            // ease: "elastic.out(0.6, 1)",
        });
    })

    document.querySelectorAll('.syllabus-container').forEach(container => {
        gsap.from(container.getElementsByClassName('fluid-obstacle'), {
            scrollTrigger: {
                trigger: container,
                start: "top center+=10%",
                end: "bottom center+=10%",
                toggleActions: 'play reset play reset',
                // markers: true,
            },
            opacity: 0,
            duration: 0.5,
        })

        gsap.from(container, {
            scrollTrigger: {
                trigger: container,
                start: "top center+=10%",
                end: "bottom center+=10%",
                toggleActions: 'play reset play reset',
            },
            opacity: 0.4,
        })
    });

}




fetch("https://script.google.com/macros/s/AKfycbxPCuSjC8CPnc_jIuow8ZuVvi0e9Zhb82XWQqXdKR6e1pXvTUtCATu95jnd0QouBwyD/exec")
    .then(res => res.json())
    .then(data => {
        const bootcamps = data.applied_ux_analytic.filter(item => item.listing == 1);
        const container = document.getElementById('bootcamp-list-container');
        if (!container) return;

        container.innerHTML = '';

        bootcamps.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col';

            col.innerHTML = `
                <p class="mono-h3">${item.bootcamp_name}</p>
                <p class="mono-body">${item.offline == 1 ? "Offline, " + item.location : "Online"}</p>
                <p class="mono-body">${item.pricing}</p>
                <p class="mono-body">${item.is_open == 1 ? "Đang mở đăng ký" : "Form closed"}</p>
                ${item.is_open == 1 ? `<a href="${item.register_link}" class="mono-body">Đăng ký</a>` : ''}
            `;

            container.appendChild(col);
        });
    });