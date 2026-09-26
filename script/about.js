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

});







