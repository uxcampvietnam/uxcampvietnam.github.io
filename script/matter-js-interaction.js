window.onload = function () {
    const {
        Engine,
        Render,
        Runner,
        World,
        Bodies,
        Body,
        Composite,
        Mouse,
        MouseConstraint,
        Query
    } = Matter;

    const canvas = document.getElementById('interactiveImage');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const width = canvas.width;
    const height = canvas.height;

    const engine = Engine.create();
    engine.world.gravity.y = -0.2;
    engine.world.gravity.x = 0;

    const world = engine.world;

    const render = Render.create({
        engine: engine,
        canvas: canvas,
        options: {
            width: width,
            height: height,
            // disable debug lines to show images only
            wireframes: false

        }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    const imageUrls = [
        'asset/image/interactive-img/1.png',
        'asset/image/interactive-img/2.png',
        'asset/image/interactive-img/3.png',
        'asset/image/interactive-img/4.png',
        'asset/image/interactive-img/5.png',
        'asset/image/interactive-img/6.png',
        'asset/image/interactive-img/7.png',
        'asset/image/interactive-img/8.png',
        'asset/image/interactive-img/9.png',
        'asset/image/interactive-img/10.png',
        'asset/image/interactive-img/11.png',
        'asset/image/interactive-img/12.png',
        'asset/image/interactive-img/13.png',
        'asset/image/interactive-img/14.png',
        'asset/image/interactive-img/15.png',
        'asset/image/interactive-img/16.png',
        'asset/image/interactive-img/17.png',
        'asset/image/interactive-img/18.png',
        'asset/image/interactive-img/19.png',
        'asset/image/interactive-img/20.png',
        'asset/image/interactive-img/21.png',
        'asset/image/interactive-img/22.png',
        'asset/image/interactive-img/23.png',
        'asset/image/interactive-img/24.png',
        'asset/image/interactive-img/25.png',
        'asset/image/interactive-img/26.png',
        'asset/image/interactive-img/27.png',
        'asset/image/interactive-img/28.png',
        'asset/image/interactive-img/29.png',
        'asset/image/interactive-img/30.png',
        'asset/image/interactive-img/31.png',
        'asset/image/interactive-img/32.png',
        'asset/image/interactive-img/33.png',
        'asset/image/interactive-img/34.png',
        'asset/image/interactive-img/35.png',
        'asset/image/interactive-img/36.png',
        'asset/image/interactive-img/37.png',
        'asset/image/interactive-img/38.png',
        'asset/image/interactive-img/39.png',
        'asset/image/interactive-img/40.png',
        'asset/image/interactive-img/41.png',
        'asset/image/interactive-img/42.png',
        'asset/image/interactive-img/43.png',
        'asset/image/interactive-img/44.png',
        'asset/image/interactive-img/45.png',
        'asset/image/interactive-img/46.png',
        'asset/image/interactive-img/47.png',
        'asset/image/interactive-img/48.png',
        'asset/image/interactive-img/49.png',
        'asset/image/interactive-img/50.png',
        'asset/image/interactive-img/51.png',
        'asset/image/interactive-img/52.png',
        'asset/image/interactive-img/53.png',
        'asset/image/interactive-img/54.png',
        'asset/image/interactive-img/55.png',
        'asset/image/interactive-img/56.png',
        'asset/image/interactive-img/57.png',
        'asset/image/interactive-img/58.png',
        'asset/image/interactive-img/59.png',
        'asset/image/interactive-img/60.png',
        'asset/image/interactive-img/61.png',
        'asset/image/interactive-img/62.png',
        'asset/image/interactive-img/63.png',
        'asset/image/interactive-img/64.png',
        'asset/image/interactive-img/65.png',
        'asset/image/interactive-img/66.png',
        'asset/image/interactive-img/67.png',
        'asset/image/interactive-img/68.png',
        'asset/image/interactive-img/69.png',
        'asset/image/interactive-img/70.png',
        'asset/image/interactive-img/71.png',
        'asset/image/interactive-img/72.png',
        'asset/image/interactive-img/73.png',
        'asset/image/interactive-img/74.png',
        'asset/image/interactive-img/75.png',
        'asset/image/interactive-img/76.png',
        'asset/image/interactive-img/77.png',
        'asset/image/interactive-img/78.png',
        'asset/image/interactive-img/79.png',
        'asset/image/interactive-img/80.png',
        'asset/image/interactive-img/81.png',
        'asset/image/interactive-img/82.png',
        'asset/image/interactive-img/83.png',
        'asset/image/interactive-img/84.png',
        'asset/image/interactive-img/85.png',
        'asset/image/interactive-img/86.png',
        'asset/image/interactive-img/87.png',
        'asset/image/interactive-img/88.png',
        'asset/image/interactive-img/89.png',
        'asset/image/interactive-img/90.png',
        'asset/image/interactive-img/91.png',
        'asset/image/interactive-img/92.png',
        'asset/image/interactive-img/93.png'
        // 'asset/image/interactive-img/94.png',
        // 'asset/image/interactive-img/95.png',
        // 'asset/image/interactive-img/96.png',
        // 'asset/image/interactive-img/97.png',
        // 'asset/image/interactive-img/98.png',
        // 'asset/image/interactive-img/99.png',
        // 'asset/image/interactive-img/100.png',
        // 'asset/image/interactive-img/101.png',
        // 'asset/image/interactive-img/102.png',
        // 'asset/image/interactive-img/103.png',
        // 'asset/image/interactive-img/104.png',
        // 'asset/image/interactive-img/105.png',
        // 'asset/image/interactive-img/106.png',
        // 'asset/image/interactive-img/107.png',
        // 'asset/image/interactive-img/108.png'
    ];

    const imageWidth = Math.round(Math.sqrt((canvas.width * canvas.height)/(imageUrls.length*1.8))); // pixels
    const imageHeight = Math.round(Math.sqrt((canvas.width * canvas.height)/(imageUrls.length*1.8)));
    const bodies = [];

    function isAreaFree(x, y, w, h) {
        const region = {
            min: { x: x - w / 2, y: y - h / 2 },
            max: { x: x + w / 2, y: y + h / 2 }
        };
        return Query.region(Composite.allBodies(world), region).length === 0;
    }

    function createImageBody(x, y, textureUrl) {
        return Bodies.rectangle(x, y, imageWidth, imageHeight, {
            inertia: 1000000,
            restitution: 0.1,
            friction: 0.01,
            frictionAir: 0.01,
            angle: 0.15 - Math.random() * 0.3, // slight tilt
            render: {
                sprite: {
                    texture: textureUrl,
                    xScale: imageWidth / 500,
                    yScale: imageHeight / 500
                }
            }
        });
    }

    let tries = 0;
    while (bodies.length < imageUrls.length && tries < 1000) {
        const x = width / 2;
        const y = height / 4 * 3;
        if (isAreaFree(x, y, imageWidth, imageHeight)) {
            const body = createImageBody(x, y, imageUrls[bodies.length]);
            bodies.push(body);
        }
        tries++;
    }

    World.add(world, bodies);

    World.add(world, [
        Bodies.rectangle(width / 2, height + 1, width, 20, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        }),
        Bodies.rectangle(width / 2, -1, width, 20, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        }),
        Bodies.rectangle(-10, height / 2, 1, height, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        }),
        Bodies.rectangle(width + 10, height / 2, 1, height, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        })
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    window.addEventListener('mousedown', () => {
        const { x, y } = mouse.position;
        if (isAreaFree(x, y, imageWidth, imageHeight)) {
            const img = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            const body = createImageBody(x, y, img);
            World.add(world, body);
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Clear any existing timeout to reset the timer
        clearTimeout(resizeTimeout);

        // Set a new timeout
        resizeTimeout = setTimeout(() => {
            // This function will execute only after the user stops resizing for 200ms
            handleResizeEnd();
        }, 200); // Adjust the delay (in milliseconds) as needed
    });


    function handleResizeEnd() {
        window.innerWidth <= canvas.width ? console.log("cho nhỏ đi") : location.reload();;
    }

};


document.getElementById("interactiveImage").onwheel = function (event) {
    // event.preventDefault();
};

document.getElementById("interactiveImage").onmousewheel = function (event) {
    // event.preventDefault();
};