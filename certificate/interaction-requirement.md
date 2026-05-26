Create a premium interactive hover effect for every HTML image element with the class `.certificate-preview-image`.

Goal:
- When hovering on desktop/laptop, the image tilts in 3D following mouse position.
- Add a realistic matte holographic / coated paper reflection effect, similar to luxury printed certificates, premium paper, laminated foil, or slightly metallic UV coating.
- The lighting/reflection should softly move based on cursor position.
- The effect must feel elegant, smooth, cinematic, premium, subtle, and realistic — NOT neon/glassmorphism/gaming style.

Technical requirements:
- Automatically apply to ALL `.certificate-preview-image` elements on the page.
- Must fully support responsive layouts.
- The image size can vary depending on container size.
- Effect must work regardless of aspect ratio.
- Use GPU-friendly transforms (`transform`, `translateZ`, `rotateX`, `rotateY`).
- Use requestAnimationFrame for smooth animation.
- Use CSS variables for dynamic cursor positioning.
- Use perspective and transform-style preserve-3d.
- Add smooth easing when entering/leaving hover.
- Reset animation smoothly on mouse leave.
- Mobile/tablet:
  - Disable ALL hover animations/effects on touch devices.
  - On mobile the image behaves like a normal static image.
  - Detect touch/coarse pointer with media query or JS.

Visual effect requirements:
- Add a soft moving specular highlight layer.
- Add subtle paper grain / matte reflection feel.
- Add directional lighting that follows cursor.
- Add slight inner shadow depth.
- Add subtle edge glow from reflection.
- Reflection should not overpower the image content.
- Effect should feel like physical material reacting to light.
- No rainbow foil unless configured.
- No aggressive shine.

Recommended rendering approach:
- Use layered DOM elements + CSS gradients for performance.
- Optional:
  - Use canvas or WebGL ONLY for advanced reflection/noise rendering.
  - Prefer lightweight DOM/CSS solution first.
- If using canvas/WebGL:
  - Keep it isolated and optimized.
  - Must still support responsive resizing.

Implementation requirements:
- Write:
  1. HTML structure expectation
  2. CSS
  3. Vanilla JS
- No frameworks.
- No external dependencies unless absolutely necessary.
- Code should be production-ready and modular.
- Use ResizeObserver if needed.
- Support multiple images simultaneously.

Desired interaction feel:
- Similar to:
  - premium trading cards
  - Apple-like reflective surfaces
  - luxury certificate paper
  - embossed print material
  - matte UV coating
  - soft holographic paper reflections

Extra polish:
- Add configurable options:
  - tilt intensity
  - shine intensity
  - transition speed
  - shadow depth
  - reflection opacity
  - perspective amount
- Make config easy to edit.

Accessibility:
- Respect `prefers-reduced-motion`.
- If reduced motion enabled:
  - disable tilt animation
  - keep only static subtle shadow.

Performance:
- Avoid layout thrashing.
- Use passive listeners when possible.
- Minimize repaint cost.
- Use will-change carefully.

Deliver:
- Complete CSS + JS implementation.
- Clean readable code.
- Comment important logic.
- Include explanation of how reflection layer works.