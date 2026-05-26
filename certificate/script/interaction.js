/**
 * Premium WebGL 3D Soft-Bending Paper & PBR Material Controller
 * High-performance, modular, vanilla JS utilizing Three.js.
 * Automatically wraps and applies the interaction to all .certificate-preview-image elements.
 */

(function initCertificate3DWebGL() {
  "use strict";

  // Expose the EXACT configuration structure requested by the user
  const CONFIG = {
    scene: {
      environmentIntensity: 1.0,
      ambientLight: 0.5,
      directionalLight: 1.2
    },
    transform: {
      enableTilt: true,
      maxTilt: 16,
      floatAnimation: true,
      floatSpeed: 0.8
    },
    material: {
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.9,
      sheen: 0.5
    },
    foil: {
      enabled: true,
      intensity: 0.42,
      rainbowStrength: 0.65,
      shimmerSpeed: 0.8,
      viewingAngleBoost: 0.6,
      sparkleDensity: 0.35
    },
    sparkle: {
      enabled: true,
      count: 32,
      flickerSpeed: 1.5,
      mouseReactive: true
    },
    paper: {
      grainIntensity: 0.07,
      normalStrength: 0.35
    },
    interaction: {
      parallax: 0.04,
      glowFollowCursor: true
    },
    animation: {
      introDuration: 1.5,
      shineSweep: true,
      shineInterval: 4500
    }
  };

  // Helper to check touch device (coarse pointer)
  function isTouchDevice() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  // Helper to check prefers-reduced-motion
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /**
   * Generates a high-frequency procedural normal map representing fine textured paper grain.
   * This is entirely procedural to maintain zero external file dependencies!
   */
  function generatePaperNormalTexture(normalStrength) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Generate high-density white noise
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = (Math.random() * 0.4 + 0.3) * 255;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // Run Sobel-like filter to map height differences to normals (PBR bumps)
    const normalCanvas = document.createElement("canvas");
    normalCanvas.width = size;
    normalCanvas.height = size;
    const nCtx = normalCanvas.getContext("2d");
    const nImgData = nCtx.createImageData(size, size);
    const nData = nImgData.data;

    const strength = normalStrength * 6.5;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;

        const getVal = (px, py) => {
          const cx = (px + size) % size;
          const cy = (py + size) % size;
          return data[(cy * size + cx) * 4] / 255;
        };

        // Neighbor samples
        const tl = getVal(x - 1, y - 1);
        const t  = getVal(x, y - 1);
        const tr = getVal(x + 1, y - 1);
        const l  = getVal(x - 1, y);
        const r  = getVal(x + 1, y);
        const bl = getVal(x - 1, y + 1);
        const b  = getVal(x, y + 1);
        const br = getVal(x + 1, y + 1);

        const dx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
        const dy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);

        let nx = -dx * strength;
        let ny = -dy * strength;
        let nz = 1.0;

        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx /= len;
        ny /= len;
        nz /= len;

        nData[idx]     = (nx * 0.5 + 0.5) * 255;
        nData[idx + 1] = (ny * 0.5 + 0.5) * 255;
        nData[idx + 2] = (nz * 0.5 + 0.5) * 255;
        nData[idx + 3] = 255;
      }
    }
    nCtx.putImageData(nImgData, 0, 0);

    const texture = new THREE.CanvasTexture(normalCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16); // High-density grid overlay
    return texture;
  }

  /**
   * Initializes the WebGL rendering scene for a specific image target.
   */
  function setupWebGLCard(img) {
    // 1. Gather original layouts
    const originalSrc = img.src;
    const parent = img.parentNode;

    // Create wrapper card
    const card = document.createElement("div");
    card.className = "certificate-3d-card";

    // Create container canvas
    const canvas = document.createElement("canvas");
    canvas.className = "certificate-3d-canvas";
    card.appendChild(canvas);

    // Hide original image and insert canvas wrapper
    img.classList.add("webgl-hidden");
    parent.insertBefore(card, img);

    // 2. Initialize Three.js WebGL Scene Elements
    const width = card.clientWidth || 550;
    const height = Math.round(width / 1.414); // Locked aspect ratio (A4 root-2 landscape)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false); // Do not force DOM styles, let CSS handle width
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();

    // Camera setup (Orthographic/Low-fov Perspective to mimic a camera lens)
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.z = 18;

    // 3. Add PBR Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, CONFIG.scene.ambientLight);
    scene.add(ambientLight);

    // Directional cursor light (Spotlight following cursor)
    const dirLight = new THREE.DirectionalLight(0xffffff, CONFIG.scene.directionalLight);
    dirLight.position.set(0, 0, 8);
    scene.add(dirLight);

    // Extra subtle backlight for edge glow
    const backLight = new THREE.DirectionalLight(0xffffff, 0.25);
    backLight.position.set(5, 5, -5);
    scene.add(backLight);

    // 4. Load Texture and Build Paper Mesh
    const textureLoader = new THREE.TextureLoader();
    const paperTexture = textureLoader.load(originalSrc, () => {
      // Re-trigger render dimensions once loaded
      onResize();
    });
    paperTexture.generateMipmaps = true;
    paperTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Generate procedural paper normal map texture
    const normalMap = generatePaperNormalTexture(CONFIG.paper.normalStrength);

    // High density grid for soft vertex bending mesh (40x40 segments)
    const geometry = new THREE.PlaneGeometry(8, 8 / 1.414, 40, 40);
    
    // Store original vertex positions to apply physical bending calculations relative to them
    const originalPositions = geometry.attributes.position.clone();

    // Base PBR Physical Material
    const material = new THREE.MeshPhysicalMaterial({
      map: paperTexture,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(CONFIG.paper.grainIntensity, CONFIG.paper.grainIntensity),
      roughness: CONFIG.material.roughness,
      metalness: CONFIG.material.metalness,
      clearcoat: CONFIG.material.clearcoat,
      clearcoatRoughness: 0.2,
      sheen: CONFIG.material.sheen,
      sheenRoughness: 0.35,
      side: THREE.DoubleSide
    });

    // Custom shader injection via .onBeforeCompile to render the dynamic rainbow foil shimmer!
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uFoilEnabled = { value: CONFIG.foil.enabled ? 1.0 : 0.0 };
      shader.uniforms.uFoilIntensity = { value: CONFIG.foil.intensity };
      shader.uniforms.uFoilRainbow = { value: CONFIG.foil.rainbowStrength };
      shader.uniforms.uFoilTime = { value: 0.0 };
      shader.uniforms.uFoilAngleBoost = { value: CONFIG.foil.viewingAngleBoost };
      shader.uniforms.uFoilSparkleDensity = { value: CONFIG.foil.sparkleDensity };
      shader.uniforms.uShineSweepX = { value: -2.0 };

      // Inject uniforms in the standard #include <common> section which is guaranteed to exist
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
         uniform float uFoilEnabled;
         uniform float uFoilIntensity;
         uniform float uFoilRainbow;
         uniform float uFoilTime;
         uniform float uFoilAngleBoost;
         uniform float uFoilSparkleDensity;
         uniform float uShineSweepX;
        `
      );

      // Inject custom foil overlay and sparkles right before dithering (final output stage)
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        if (uFoilEnabled > 0.5) {
          // Use PBR perturbed normal if available, otherwise geometry normal
          #ifdef USE_NORMALMAP
            vec3 normalVec = normalize(normal);
          #else
            vec3 normalVec = normalize(vNormal);
          #endif

          vec3 viewDir = normalize(vViewPosition);
          
          // Fresnel viewing angle reflection boost
          float fresnel = pow(1.0 - max(dot(normalVec, viewDir), 0.0), 3.0) * uFoilAngleBoost;

          // Rainbow gradient wave calculation
          float wave = sin((normalVec.x + normalVec.y) * 3.5 + uFoilTime * 1.2) * 0.5 + 0.5;
          vec3 rainbowColor = vec3(
            sin(wave * 6.28318) * 0.5 + 0.5,
            sin(wave * 6.28318 + 2.09439) * 0.5 + 0.5,
            sin(wave * 6.28318 + 4.18879) * 0.5 + 0.5
          );

          // Calculate interactive shine sweep beam
          float sweepDist = abs(vUv.x - uShineSweepX);
          float sweepShine = exp(-pow(sweepDist * 3.5, 2.0)) * 0.22;

          // Combine rainbow spectrum, viewing angles, and shine sweeps
          float foilBlend = (uFoilIntensity + fresnel) * uFoilRainbow;
          vec3 finalFoil = mix(gl_FragColor.rgb, gl_FragColor.rgb * rainbowColor * 2.2, foilBlend);
          gl_FragColor.rgb = finalFoil + vec3(sweepShine);

          // Add minor spectral sparkles directly on texture pixels based on normal mapping
          float sparkleNoise = fract(sin(dot(vUv.xy, vec2(12.9898, 78.233))) * 43758.5453);
          if (sparkleNoise > (1.0 - uFoilSparkleDensity * 0.08)) {
             float shimmer = sin(uFoilTime * 8.0 + sparkleNoise * 100.0) * 0.5 + 0.5;
             gl_FragColor.rgb += vec3(shimmer * 0.18);
          }
        }
        `
      );
      material.userData.shader = shader;
    };

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Micro Sparkles point cloud (Point particles floating overlay)
    let sparkleParticles = null;
    let sparkleSpeeds = [];
    let sparklePhases = [];

    if (CONFIG.sparkle.enabled) {
      const sparkleCount = CONFIG.sparkle.count;
      const sparkleGeometry = new THREE.BufferGeometry();
      const sparklePositions = new Float32Array(sparkleCount * 3);

      for (let i = 0; i < sparkleCount; i++) {
        // Disperse over mesh bounds with minor elevation
        sparklePositions[i * 3]     = (Math.random() - 0.5) * 8.0;
        sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * (8.0 / 1.414);
        sparklePositions[i * 3 + 2] = 0.05 + Math.random() * 0.04; // elevated

        sparkleSpeeds.push(Math.random() * 0.4 + 0.8);
        sparklePhases.push(Math.random() * Math.PI * 2.0);
      }

      sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));

      // Twinkling white particle texture map (Procedurally drawn point map)
      const sparkleCanvas = document.createElement("canvas");
      sparkleCanvas.width = 16;
      sparkleCanvas.height = 16;
      const sCtx = sparkleCanvas.getContext("2d");
      const grad = sCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 16, 16);

      const sparkleTex = new THREE.CanvasTexture(sparkleCanvas);
      const sparkleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        map: sparkleTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      sparkleParticles = new THREE.Points(sparkleGeometry, sparkleMaterial);
      scene.add(sparkleParticles);
    }

    // 6. Interactive Physics & Bending parameters
    let rx = 0, ry = 0;           // Mouse target tilt rotations
    let cx = 0, cy = 0;           // Current smoothed tilt rotations
    let bendX = 0, bendY = 0;     // Target localized soft bending values
    let cbendX = 0, cbendY = 0;   // Smoothed soft bending values
    let hoverState = 0;           // 0 = resting, 1 = hovering
    let hoverProgress = 0;        // smoothed hover state for spring actions
    let time = 0;
    
    // Track mouse speed for spring flex animations
    let lastMouseTime = 0;
    let lastMousePos = { x: 0, y: 0 };
    let mouseSpeed = 0;
    let smoothSpeed = 0;

    let rect = canvas.getBoundingClientRect();

    function updateBounds() {
      rect = canvas.getBoundingClientRect();
    }

    // Standard resize handler (Updates drawing buffer resolution without altering styles)
    function onResize() {
      const w = card.clientWidth || 550;
      const h = Math.round(w / 1.414);
      
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updateBounds();
    }

    // Strictly listen to window resizing to completely prevent infinite feedback loops!
    window.addEventListener("resize", onResize, { passive: true });
    
    // Initial size calculation
    onResize();

    // Shine sweep sequence controller
    let sweepTime = 0;
    let isSweeping = CONFIG.animation.shineSweep;
    let sweepInterval = null;

    if (CONFIG.animation.shineSweep) {
      sweepInterval = setInterval(() => {
        isSweeping = true;
        sweepTime = -1.5;
      }, CONFIG.animation.shineInterval);
    }

    // Setup input listeners
    card.addEventListener("mouseenter", () => {
      hoverState = 1;
      updateBounds();
    });

    card.addEventListener("mousemove", (e) => {
      if (!CONFIG.transform.enableTilt) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Map mouse inside card boundaries to -0.5 to 0.5
      const px = (mouseX / rect.width) - 0.5;
      const py = (mouseY / rect.height) - 0.5;

      // 3D Card Tilt Rotations
      rx = px * CONFIG.transform.maxTilt * (Math.PI / 180);
      ry = -py * CONFIG.transform.maxTilt * (Math.PI / 180);

      // Localized soft-bending target values (bend edges opposing cursor)
      bendX = px * 0.45;
      bendY = py * 0.45;

      // Track cursor speed to apply spring dynamic flexing
      const now = performance.now();
      if (lastMouseTime > 0) {
        const dt = Math.max(1, now - lastMouseTime);
        const dx = mouseX - lastMousePos.x;
        const dy = mouseY - lastMousePos.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        mouseSpeed = dist / dt; // pixels per ms
      }
      lastMouseTime = now;
      lastMousePos = { x: mouseX, y: mouseY };

      // Update directional light coordinates dynamically (spotlight effect)
      if (CONFIG.interaction.glowFollowCursor) {
        const lx = px * 8.0;
        const ly = -py * (8.0 / 1.414);
        dirLight.position.set(lx, ly, 6);
      }
    });

    card.addEventListener("mouseleave", () => {
      hoverState = 0;
      rx = 0;
      ry = 0;
      bendX = 0;
      bendY = 0;
      mouseSpeed = 0;
      
      // Return light back to center
      if (CONFIG.interaction.glowFollowCursor) {
        dirLight.position.set(0, 0, 8);
      }
    });

    // 7. Continuous Rendering Loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      time += delta * CONFIG.foil.shimmerSpeed;

      // Smooth coordinate interpolation (spring-damper easing)
      const ease = 0.08;
      cx += (rx - cx) * ease;
      cy += (ry - cy) * ease;
      
      cbendX += (bendX - cbendX) * ease;
      cbendY += (bendY - cbendY) * ease;
      
      hoverProgress += (hoverState - hoverProgress) * 0.08;

      smoothSpeed += (mouseSpeed - smoothSpeed) * 0.05;
      mouseSpeed *= 0.95; // decay velocity

      // Apply base 3D rotative transforms
      mesh.rotation.y = cx;
      mesh.rotation.x = cy;

      // Interactive Parallax position shifts
      if (CONFIG.interaction.parallax > 0) {
        mesh.position.x = cx * CONFIG.interaction.parallax * 30.0;
        mesh.position.y = cy * CONFIG.interaction.parallax * 30.0;
      }

      // Physics float animation (Slow bobbing up/down when idle)
      if (CONFIG.transform.floatAnimation) {
        const floatCycle = time * 0.8 * CONFIG.transform.floatSpeed;
        const floatOffset = Math.sin(floatCycle) * 0.12;
        const floatRotate = Math.cos(floatCycle * 0.5) * 0.02;
        
        mesh.position.y += floatOffset;
        mesh.rotation.z = floatRotate + cx * 0.05;
      } else {
        mesh.rotation.z = cx * 0.05;
      }

      // Soft paper mesh bending math!
      const positionAttr = geometry.attributes.position;
      const originalArr = originalPositions.array;
      const currentArr = positionAttr.array;

      // Soft physical bending coefficients
      const flexAmplitude = smoothSpeed * 0.015 * hoverProgress;
      const dynamicBendX = cbendX * hoverProgress;
      const dynamicBendY = cbendY * hoverProgress;

      for (let i = 0; i < positionAttr.count; i++) {
        const idx = i * 3;
        
        const vx = originalArr[idx];
        const vy = originalArr[idx + 1];

        const nx = vx / 4.0;
        const ny = vy / (4.0 / 1.414);

        // Standard bending calculation: Parabolic curve toward edges
        const curveX = (1.0 - nx * nx) * dynamicBendX;
        const curveY = (1.0 - ny * ny) * dynamicBendY;

        // Wave flexing distortion: Ripple induced by cursor movements
        const ripple = Math.sin(nx * Math.PI * 2.0 + time * 2.0) * Math.cos(ny * Math.PI * 2.0) * flexAmplitude;

        // Apply physical deformation on the Z coordinate (depth)
        currentArr[idx + 2] = (curveX + curveY) * 0.55 + ripple;
      }
      
      positionAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      // Holographic Shader uniforms update
      if (material.userData.shader) {
        const shader = material.userData.shader;
        shader.uniforms.uFoilTime.value = time;

        // Compute shine sweep movement
        if (isSweeping) {
          sweepTime += delta * 1.5;
          shader.uniforms.uShineSweepX.value = sweepTime;
          if (sweepTime > 2.5) {
            isSweeping = false;
          }
        } else {
          shader.uniforms.uShineSweepX.value = -3.0;
        }
      }

      // Twinkling sparkle animations
      if (CONFIG.sparkle.enabled && sparkleParticles) {
        const positions = sparkleParticles.geometry.attributes.position.array;
        const count = CONFIG.sparkle.count;

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          
          const phase = sparklePhases[i] + time * CONFIG.sparkle.flickerSpeed * sparkleSpeeds[i];
          const twinkle = Math.sin(phase) * 0.5 + 0.5;

          // Lift particles slightly to trace mesh deformations
          const vx = positions[idx];
          const vy = positions[idx + 1];
          const nx = vx / 4.0;
          const ny = vy / (4.0 / 1.414);
          const curveZ = ((1.0 - nx * nx) * dynamicBendX + (1.0 - ny * ny) * dynamicBendY) * 0.55;

          positions[idx + 2] = 0.05 + curveZ + twinkle * 0.02;

          // Drifts toward mouse if enabled
          if (CONFIG.sparkle.mouseReactive && hoverState > 0) {
            const tx = cbendX * 8.0;
            const ty = -cbendY * (8.0 / 1.414);
            positions[idx]     += (tx - positions[idx])     * 0.005;
            positions[idx + 1] += (ty - positions[idx + 1]) * 0.005;
          }
        }
        sparkleParticles.geometry.attributes.position.needsUpdate = true;
        
        // flicker particle sizing
        sparkleParticles.material.size = (0.12 + Math.sin(time * 3.5) * 0.04) * hoverProgress;
      }

      // Calculate dynamic CSS box shadow parameters
      const shadowX = -cx * 40.0;
      const shadowY = 20 - (cy * 40.0) + (CONFIG.transform.floatAnimation ? Math.sin(time * 0.8) * 4.0 : 0);
      const shadowBlur = 40 + (Math.abs(cx) + Math.abs(cy)) * 30.0;
      const shadowOpacity = 0.12 + (Math.abs(cx) + Math.abs(cy)) * 0.04;

      canvas.style.setProperty("--shadow-x", shadowX.toFixed(1) + "px");
      canvas.style.setProperty("--shadow-y", shadowY.toFixed(1) + "px");
      canvas.style.setProperty("--shadow-blur", shadowBlur.toFixed(1) + "px");
      canvas.style.setProperty("--shadow-opacity", shadowOpacity.toFixed(3));

      renderer.render(scene, camera);
    }

    // Trigger initial entering shine sweep
    setTimeout(() => {
      isSweeping = true;
      sweepTime = -1.5;
    }, 300);

    // Run render loop
    animate();
  }

  /**
   * Main entry point.
   */
  function init() {
    // 1. Skip on touch screen hardware or reduced motion setting to fall back gracefully
    if (isTouchDevice() || prefersReducedMotion()) {
      return;
    }

    // 2. Discover all certificate images
    const images = document.querySelectorAll(".certificate-preview-image");

    images.forEach(img => {
      // Prevent double initialization
      if (img.closest(".certificate-3d-card")) {
        return;
      }

      // Make sure Three.js is loaded
      if (typeof THREE === "undefined") {
        console.warn("Three.js not loaded. Skipping premium WebGL paper interaction.");
        return;
      }

      // Set up after image loads to ensure texture resolution matches
      if (img.complete) {
        setupWebGLCard(img);
      } else {
        img.addEventListener("load", () => setupWebGLCard(img), { once: true });
      }
    });
  }

  // Fire when DOM is fully structured
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
