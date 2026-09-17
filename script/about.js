document.addEventListener("DOMContentLoaded", () => {
	if (typeof gsap === "undefined") {
		console.warn("GSAP is not loaded.");
		return;
	}

	if (typeof ScrollTrigger !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
	}

	/* ---------------------------------------------------------------------
	   TEXT SCROLL CHARACTER-BY-CHARACTER ANIMATION
	   --------------------------------------------------------------------- */

	const aboutUsTextEl = document.getElementById("manifestoScrollText");
	// Use SplitType if available to split into words and characters
	if (typeof SplitType !== "undefined") {
		const split = new SplitType(aboutUsTextEl, { types: "words, chars" });
		const chars = aboutUsTextEl.querySelectorAll(".char");

		if (chars && chars.length > 0) {
			// Initially dim all characters
			gsap.set(chars, { opacity: 0 });

			// Animate smoothly to 1.0 based on scroll progress
			gsap.to(chars, {
				opacity: 1,
				stagger: 0.02,
				ease: "none",
				scrollTrigger: {
					trigger: "#manifestoScrollText",
					start: "top 90%",
					end: "top 50%",
					scrub: 0.5,
				}
			});
		}
	}

	const industryTextEl = new SplitType('.industry-item', {
		types: 'words, chars'
	});

	gsap.from(industryTextEl.chars, {
		opacity: 0.2,
		stagger: 0.1,
		ease: "none",
		scrollTrigger: {
			trigger: ".industries-list",
			start: "top 80%",
			end: "top top",
			scrub: true,
			toggleActions: 'play none play reset', //onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
		}
	});


	// Corporate Training ================

	var slidingImg = document.getElementById('sliding-img-container');

	if (slidingImg != null) {
		const graduationSection = new SplitType('.graduation-section p, .graduation-section h2', {
			types: 'words, chars'
		});
		var totalImg = 50;
		var slidingImgInnerHTML = ``;
		for (var i = 1; i <= totalImg; i++) {
			slidingImgInnerHTML += `<img class="sliding-img" src="asset/image/graduation/${i}.webp" alt="Graduation ${i}" draggable="false">`;
		}

		slidingImg.innerHTML = slidingImgInnerHTML;

		var slidingTimeline = gsap.timeline({
			repeat: 0,
			scrollTrigger: {
				trigger: "#graduationSection",
				start: "top center",
				toggleActions: "play none none none"
			},
			onComplete: () => { ScrollTrigger.refresh() }
		});

		slidingTimeline
			.from(graduationSection.chars, {
				opacity: 0,
				y: 20,
				stagger: 0.01,
				duration: 1,
				ease: "elastic.out(1.5,0.9)",
			},)
			.from('#sliding-img-container', {
				height: '0px',
				duration: 2,
				ease: "elastic.out(1.5,0.9)",
			}, '<')
			.from('.graduation-section h2', {
				gap: '0px',
				duration: 2,
				ease: "elastic.out(1.5,0.9)",
			}, '<')
			.from('.sliding-img', {
				right: 8000,
				stagger: {
					each: 0.05,
					from: "end" // Animates from the last element to the first
				},
				duration: 2,
				ease: "power4.inOut",
			}, '<')
			.from('.sliding-img', {
				scale: 0,
				opacity: 0,
				stagger: {
					each: 0.05,
					from: "end" // Animates from the last element to the first
				},
				duration: 0.4,
				ease: "power3.inOut",
			}, '<')
			;

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

			// If user paused mouse movement before releasing, reset velocity
			const timeSinceLastMove = performance.now() - lastTime;
			if (timeSinceLastMove > 80) {
				velocity = 0;
			}

			// Momentum glide based on release velocity
			if (Math.abs(velocity) > 0.1) {
				let currentVelocity = velocity * 16; // Velocity in pixels per frame (~16ms)
				const friction = 0.94; // Deceleration factor

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
				// Smooth velocity using exponential moving average to filter polling noise
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
	}

});







