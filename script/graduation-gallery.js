'use strict';

document.addEventListener("DOMContentLoaded", () => {
	const slidingImg = document.getElementById('sliding-img-container');
	if (!slidingImg) return;
	if (slidingImg.dataset.initialized === 'true') return;
	slidingImg.dataset.initialized = 'true';

	if (typeof gsap === "undefined") {
		console.warn("GSAP is not loaded.");
		return;
	}

	if (typeof ScrollTrigger !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
	}

	// Split text animation if SplitType is available
	let graduationSplit = null;
	if (typeof SplitType !== "undefined") {
		try {
			graduationSplit = new SplitType('.graduation-section p, .graduation-section h2', {
				types: 'words, chars'
			});
		} catch (e) {
			console.warn("SplitType initialization failed:", e);
		}
	}

	const totalImg = 100;
	let slidingImgInnerHTML = '';
	for (let i = 1; i <= totalImg; i++) {
		slidingImgInnerHTML += `<img class="sliding-img" src="asset/image/graduation/${i}.webp" alt="Graduation ${i}" loading="lazy" decoding="async" draggable="false">`;
	}
	slidingImg.innerHTML = slidingImgInnerHTML;

	const slidingTimeline = gsap.timeline({
		repeat: 0,
		scrollTrigger: {
			trigger: "#graduationSection",
			start: "top center",
			toggleActions: "play none none none"
		},
		onComplete: () => {
			if (typeof ScrollTrigger !== "undefined") {
				ScrollTrigger.refresh();
			}
		}
	});

	if (graduationSplit && graduationSplit.chars && graduationSplit.chars.length > 0) {
		slidingTimeline.from(graduationSplit.chars, {
			opacity: 0,
			y: 20,
			stagger: 0.01,
			duration: 1,
			ease: "elastic.out(1.5,0.9)",
		});
	}

	slidingTimeline
		.from('#sliding-img-container', {
			height: '0px',
			duration: 2,
			ease: "elastic.out(1.5,0.9)",
		}, graduationSplit ? '<' : undefined)
		.from('.graduation-section h2', {
			gap: '0px',
			duration: 2,
			ease: "elastic.out(1.5,0.9)",
		}, '<')
		.from('.sliding-img', {
			right: 8000,
			stagger: {
				each: 0.05,
				from: "end"
			},
			duration: 2,
			ease: "power4.inOut",
		}, '<')
		.from('.sliding-img', {
			scale: 0,
			opacity: 0,
			stagger: {
				each: 0.05,
				from: "end"
			},
			duration: 0.4,
			ease: "power3.inOut",
		}, '<');

	// Interactive horizontal scrolling with inertia/momentum
	let isDown = false;
	let startX = 0;
	let scrollLeft = 0;
	let lastClientX = 0;
	let lastTime = 0;
	let velocity = 0;
	let momentumFrame = null;

	function stopMomentum() {
		if (momentumFrame) {
			cancelAnimationFrame(momentumFrame);
			momentumFrame = null;
		}
	}

	slidingImg.addEventListener("touchstart", () => {
		stopMomentum();
	}, { passive: true });

	slidingImg.addEventListener("mousedown", (e) => {
		isDown = true;
		stopMomentum();
		slidingImg.classList.add("is-dragging");
		startX = e.clientX;
		lastClientX = e.clientX;
		lastTime = performance.now();
		velocity = 0;
		scrollLeft = slidingImg.scrollLeft;
	});

	window.addEventListener("mouseup", () => {
		if (!isDown) return;
		isDown = false;
		slidingImg.classList.remove("is-dragging");

		const timeSinceLastMove = performance.now() - lastTime;
		if (timeSinceLastMove > 80) {
			velocity = 0;
		}

		if (Math.abs(velocity) > 0.1) {
			let currentVelocity = velocity * 16;
			const friction = 0.94;

			const glide = () => {
				currentVelocity *= friction;
				slidingImg.scrollLeft -= currentVelocity;

				const maxScroll = slidingImg.scrollWidth - slidingImg.clientWidth;
				const reachedStart = slidingImg.scrollLeft <= 0;
				const reachedEnd = slidingImg.scrollLeft >= maxScroll;

				if (Math.abs(currentVelocity) > 0.5 && !reachedStart && !reachedEnd) {
					momentumFrame = requestAnimationFrame(glide);
				} else {
					stopMomentum();
				}
			};

			momentumFrame = requestAnimationFrame(glide);
		}
	});

	window.addEventListener("mousemove", (e) => {
		if (!isDown) return;
		e.preventDefault();

		const deltaX = e.clientX - startX;
		slidingImg.scrollLeft = scrollLeft - deltaX;

		const now = performance.now();
		const dt = now - lastTime;
		if (dt > 0) {
			const instantVelocity = (e.clientX - lastClientX) / dt;
			velocity = velocity * 0.4 + instantVelocity * 0.6;
		}
		lastClientX = e.clientX;
		lastTime = now;
	});

	slidingImg.addEventListener("wheel", (e) => {
		stopMomentum();
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			const delta = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
			const isScrollingRight = delta > 0;
			const maxScroll = slidingImg.scrollWidth - slidingImg.clientWidth;
			const canScrollRight = Math.ceil(slidingImg.scrollLeft) < maxScroll - 1;
			const canScrollLeft = slidingImg.scrollLeft > 1;

			if ((isScrollingRight && canScrollRight) || (!isScrollingRight && canScrollLeft)) {
				e.preventDefault();
				slidingImg.scrollLeft += delta;
			}
		}
	}, { passive: false });
});
