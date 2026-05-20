/**
 * TextRepulsion - An interactive text repulsion effect.
 * Applies physics-based movement to .ascii-char elements within .avoid-mouse containers.
 */

export default class TextRepulsion {
    constructor(options = {}) {
        this.config = {
            radius: options.radius || 100,
            repulsionStrength: options.repulsionStrength || 25,
            damping: options.damping || 0.85,
            returnForce: options.returnForce || 0.1,
            debug: options.debug || false,
            selector: '.avoid-mouse',
            charSelector: '.character'
        };

        this.characters = [];
        this.activeContainer = null;
        this.isHovering = false;

        this.mouseX = -1000;
        this.mouseY = -1000;
        this.targetMouseX = -1000;
        this.targetMouseY = -1000;
        this.clientMouseX = -1000;
        this.clientMouseY = -1000;

        this.rafId = null;
        this.debugCanvas = null;
        this.debugCtx = null;

        this.hasMouse = window.matchMedia ? window.matchMedia('(pointer: fine)').matches : true;

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        setTimeout(() => this.init(), 0);
    }

    init() {
        this.setupEventListeners();
        if (this.config.debug) this.setupDebug();
    }

    setupEventListeners() {
        if (this.hasMouse) {
            document.addEventListener('mouseover', this.handleMouseOver);
            document.addEventListener('mouseout', this.handleMouseOut);
            document.addEventListener('mousemove', this.handleMouseMove);
        } else {
            window.addEventListener('scroll', this.handleScroll);
            setTimeout(() => this.checkViewportIntersection(), 100);
        }
        window.addEventListener('resize', this.handleResize);
    }

    handleMouseOver(e) {
        this.clientMouseX = e.clientX;
        this.clientMouseY = e.clientY;

        const container = e.target.closest(this.config.selector);
        if (!container) return;

        // Only activate if data-avoid is true
        if (container.getAttribute('data-avoid') !== 'true') return;

        if (container !== this.activeContainer) {
            this.activateContainer(container);
        } else if (!this.isHovering) {
            // Mouse re-entered the same container before it fully returned to origin
            this.isHovering = true;
            this.targetMouseX = this.clientMouseX + window.scrollX;
            this.targetMouseY = this.clientMouseY + window.scrollY;
            this.startLoop();
        }
    }

    handleMouseOut(e) {
        this.clientMouseX = e.clientX;
        this.clientMouseY = e.clientY;

        if (!this.activeContainer) return;

        const container = e.target.closest(this.config.selector);
        if (container === this.activeContainer) {
            // Check if mouse actually left the container, not just moved between children
            if (!e.relatedTarget || !container.contains(e.relatedTarget)) {
                this.isHovering = false;
                // We keep activeContainer set so the loop can finish animating them back to origin
            }
        }
    }

    handleMouseMove(e) {
        this.clientMouseX = e.clientX;
        this.clientMouseY = e.clientY;

        if (this.isHovering && this.activeContainer) {
            this.targetMouseX = this.clientMouseX + window.scrollX;
            this.targetMouseY = this.clientMouseY + window.scrollY;
            this.startLoop();
        }
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (this.characters.length > 0) {
                this.updateAnchors();
            }
            if (!this.hasMouse) {
                this.checkViewportIntersection();
            }
        }, 200);
    }

    handleScroll() {
        if (!this.hasMouse) {
            this.checkViewportIntersection();
        }
    }

    checkViewportIntersection() {
        const centerY = window.innerHeight / 2;
        let crossingContainer = null;

        const containers = document.querySelectorAll(this.config.selector);
        for (const container of containers) {
            if (container.getAttribute('data-avoid') !== 'true') continue;
            const rect = container.getBoundingClientRect();
            if (rect.top <= centerY && rect.bottom >= centerY) {
                crossingContainer = container;
                break;
            }
        }

        if (crossingContainer) {
            if (crossingContainer !== this.activeContainer) {
                this.activateContainer(crossingContainer);
            } else {
                this.clientMouseX = window.innerWidth / 2;
                this.clientMouseY = window.innerHeight / 2;
                this.targetMouseX = this.clientMouseX + window.scrollX;
                this.targetMouseY = this.clientMouseY + window.scrollY;
                this.startLoop();
            }
        } else if (this.activeContainer) {
            this.isHovering = false;
        }
    }

    activateContainer(container) {
        // If there are existing characters returning, snap them immediately and clear
        if (this.activeContainer && this.activeContainer !== container) {
            this.clearCharacters();
        }

        this.activeContainer = container;
        this.isHovering = true;
        this.characters = [];

        const chars = container.querySelectorAll(this.config.charSelector);

        // Batch read bounding boxes to avoid layout thrashing
        const rects = [];
        chars.forEach(el => {
            rects.push(el.getBoundingClientRect());
        });

        chars.forEach((el, i) => {
            const rect = rects[i];
            this.characters.push({
                el: el,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                anchorX: rect.left + window.scrollX + rect.width / 2,
                anchorY: rect.top + window.scrollY + rect.height / 2
            });
        });

        // Initialize mouse positions instantly to avoid sweeping effect from old positions
        if (this.hasMouse) {
            this.mouseX = this.clientMouseX + window.scrollX;
            this.mouseY = this.clientMouseY + window.scrollY;
        } else {
            this.clientMouseX = window.innerWidth / 2;
            this.clientMouseY = window.innerHeight / 2;
            this.mouseX = this.clientMouseX + window.scrollX;
            this.mouseY = this.clientMouseY + window.scrollY;
        }
        this.targetMouseX = this.mouseX;
        this.targetMouseY = this.mouseY;

        this.startLoop();
    }

    clearCharacters() {
        this.characters.forEach(char => {
            char.el.style.transform = '';
        });
        this.characters = [];
        this.activeContainer = null;
        this.isHovering = false;
    }

    refresh() {
        // Now only used by GSAP when pinning elements if we happen to be hovering them
        if (this.characters.length > 0) {
            this.updateAnchors();
        }
    }

    updateAnchors() {
        const transforms = [];
        this.characters.forEach((char, i) => {
            transforms[i] = char.el.style.transform;
            char.el.style.transform = 'none';
        });

        this.characters.forEach(char => {
            const rect = char.el.getBoundingClientRect();
            char.anchorX = rect.left + window.scrollX + rect.width / 2;
            char.anchorY = rect.top + window.scrollY + rect.height / 2;
        });

        this.characters.forEach((char, i) => {
            char.el.style.transform = transforms[i];
        });
    }

    setupDebug() {
        if (this.debugCanvas) return;
        this.debugCanvas = document.createElement('canvas');
        this.debugCanvas.style.position = 'fixed';
        this.debugCanvas.style.top = '0';
        this.debugCanvas.style.left = '0';
        this.debugCanvas.style.pointerEvents = 'none';
        this.debugCanvas.style.zIndex = '9999';
        this.debugCanvas.width = window.innerWidth;
        this.debugCanvas.height = window.innerHeight;
        document.body.appendChild(this.debugCanvas);
        this.debugCtx = this.debugCanvas.getContext('2d');
    }

    update() {
        let isActive = false;
        let allSettled = true;

        if (this.isHovering) {
            // Also ensure we check data-avoid dynamically in case it changed while hovering
            if (this.activeContainer && this.activeContainer.getAttribute('data-avoid') !== 'true') {
                this.isHovering = false; // Force them to return
            } else {
                if (this.hasMouse) {
                    this.targetMouseX = this.clientMouseX + window.scrollX;
                    this.targetMouseY = this.clientMouseY + window.scrollY;
                } else {
                    this.clientMouseX = window.innerWidth / 2;
                    this.clientMouseY = window.innerHeight / 2;
                    this.targetMouseX = this.clientMouseX + window.scrollX;
                    this.targetMouseY = this.clientMouseY + window.scrollY;
                }
            }
        }

        if (Math.abs(this.targetMouseX - this.mouseX) > 0.1 || Math.abs(this.targetMouseY - this.mouseY) > 0.1) {
            this.mouseX += (this.targetMouseX - this.mouseX) * 0.15;
            this.mouseY += (this.targetMouseY - this.mouseY) * 0.15;
            isActive = true;
        }

        const { radius, repulsionStrength, damping, returnForce } = this.config;
        const radiusSq = radius * radius;

        this.characters.forEach(char => {
            const dx = char.anchorX - this.mouseX;
            const dy = char.anchorY - this.mouseY;
            const distSq = dx * dx + dy * dy;

            // Apply repulsion only if actively hovering
            if (this.isHovering && distSq < radiusSq) {
                const force = (1 - distSq / radiusSq) * repulsionStrength;
                char.vx += (dx / radius) * force;
                char.vy += (dy / radius) * force;
            }

            char.vx += (0 - char.x) * returnForce;
            char.vy += (0 - char.y) * returnForce;

            char.vx *= damping;
            char.vy *= damping;

            const isMoving = Math.abs(char.vx) > 0.01 || Math.abs(char.vy) > 0.01;
            const isDisplaced = Math.abs(char.x) > 0.01 || Math.abs(char.y) > 0.01;

            if (isMoving || isDisplaced) {
                if (isMoving) {
                    char.x += char.vx;
                    char.y += char.vy;
                    // Only update DOM if moving, and limit precision to save CSS engine parsing time
                    char.el.style.transform = `translate(${char.x.toFixed(1)}px, ${char.y.toFixed(1)}px)`;
                }
                isActive = true;
                allSettled = false;
            } else if (char.x !== 0 || char.y !== 0) {
                char.x = 0;
                char.y = 0;
                char.vx = 0;
                char.vy = 0;
                char.el.style.transform = '';
            }
        });

        // Once everything has returned to origin after mouse leaves, clear cache
        if (!this.isHovering && allSettled) {
            this.clearCharacters();
            isActive = false; // This will stop the RAF loop
        }

        if (this.config.debug && this.debugCtx) {
            this.renderDebug();
            isActive = true;
        }

        if (isActive) {
            this.rafId = requestAnimationFrame(() => this.update());
        } else {
            this.rafId = null;
        }
    }

    renderDebug() {
        const ctx = this.debugCtx;
        ctx.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);

        ctx.beginPath();
        ctx.arc(this.mouseX - window.scrollX, this.mouseY - window.scrollY, this.config.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.characters.forEach(char => {
            ctx.fillRect(char.anchorX - window.scrollX - 1, char.anchorY - window.scrollY - 1, 2, 2);
        });
    }

    startLoop() {
        if (!this.rafId) {
            this.rafId = requestAnimationFrame(() => this.update());
        }
    }

    stopLoop() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        document.removeEventListener('mouseover', this.handleMouseOver);
        document.removeEventListener('mouseout', this.handleMouseOut);
        document.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
    }
}
