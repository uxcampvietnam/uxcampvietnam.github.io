// new --------------------------------------------------

const canvas = document.getElementById('interactiveImage');

/* ===============================
   BASIC DOM
================================ */
var container1 = document.getElementById('flyingContainer');
var container2 = document.getElementById('flyingContainer2');

/* ===============================
   IMAGE LIST
================================ */
var numberOfFallingImg, fallingImgCount = 0;

const imageGraduationUrls = [
    'asset/image/graduation/1.webp',
    'asset/image/graduation/2.webp',
    'asset/image/graduation/3.webp',
    'asset/image/graduation/4.webp',
    'asset/image/graduation/5.webp',
    'asset/image/graduation/6.webp',
    'asset/image/graduation/7.webp',
    'asset/image/graduation/8.webp',
    'asset/image/graduation/9.webp',
    'asset/image/graduation/10.webp',
    'asset/image/graduation/11.webp',
    'asset/image/graduation/12.webp',
    'asset/image/graduation/13.webp',
    'asset/image/graduation/14.webp',
    'asset/image/graduation/15.webp',
    'asset/image/graduation/16.webp',
    'asset/image/graduation/17.webp',
    'asset/image/graduation/18.webp',
    'asset/image/graduation/19.webp',
    'asset/image/graduation/20.webp',
    'asset/image/graduation/21.webp',
    'asset/image/graduation/22.webp',
    'asset/image/graduation/23.webp',
    'asset/image/graduation/24.webp',
    'asset/image/graduation/25.webp',
    'asset/image/graduation/26.webp',
    'asset/image/graduation/27.webp',
    'asset/image/graduation/28.webp',
    'asset/image/graduation/29.webp',
    'asset/image/graduation/30.webp',
    'asset/image/graduation/31.webp',
    'asset/image/graduation/32.webp',
    'asset/image/graduation/33.webp',
    'asset/image/graduation/34.webp',
    'asset/image/graduation/35.webp',
    'asset/image/graduation/36.webp',
    'asset/image/graduation/37.webp',
    'asset/image/graduation/38.webp',
    'asset/image/graduation/39.webp',
    'asset/image/graduation/40.webp',
    'asset/image/graduation/41.webp',
    'asset/image/graduation/42.webp',
    'asset/image/graduation/43.webp',
    'asset/image/graduation/44.webp',
    'asset/image/graduation/45.webp',
    'asset/image/graduation/46.webp',
    'asset/image/graduation/47.webp',
    'asset/image/graduation/48.webp',
    'asset/image/graduation/49.webp',
    'asset/image/graduation/50.webp',
    'asset/image/graduation/51.webp',
    'asset/image/graduation/52.webp',
    'asset/image/graduation/53.webp',
    'asset/image/graduation/54.webp',
    'asset/image/graduation/55.webp',
    'asset/image/graduation/56.webp',
    'asset/image/graduation/57.webp',
    'asset/image/graduation/58.webp',
    'asset/image/graduation/59.webp',
    'asset/image/graduation/60.webp',
    'asset/image/graduation/61.webp',
    'asset/image/graduation/62.webp',
    'asset/image/graduation/63.webp',
    'asset/image/graduation/64.webp',
    'asset/image/graduation/65.webp',
    'asset/image/graduation/66.webp',
    'asset/image/graduation/67.webp',
    'asset/image/graduation/68.webp',
    'asset/image/graduation/69.webp',
    'asset/image/graduation/70.webp',
    'asset/image/graduation/71.webp',
    'asset/image/graduation/72.webp',
    'asset/image/graduation/73.webp',
    'asset/image/graduation/74.webp',
    'asset/image/graduation/75.webp',
    'asset/image/graduation/76.webp',
    'asset/image/graduation/77.webp',
    'asset/image/graduation/78.webp',
    'asset/image/graduation/79.webp',
    'asset/image/graduation/80.webp',
    'asset/image/graduation/81.webp',
    'asset/image/graduation/82.webp',
    'asset/image/graduation/83.webp',
    'asset/image/graduation/84.webp',
    'asset/image/graduation/85.webp',
    'asset/image/graduation/86.webp',
    'asset/image/graduation/87.webp',
    'asset/image/graduation/88.webp',
    'asset/image/graduation/89.webp',
    'asset/image/graduation/90.webp',
    'asset/image/graduation/91.webp',
    'asset/image/graduation/92.webp',
    'asset/image/graduation/93.webp',
    'asset/image/graduation/94.webp',
    'asset/image/graduation/95.webp',
    'asset/image/graduation/96.webp',
    'asset/image/graduation/97.webp',
    // 'asset/image/graduation/98.webp',
    // 'asset/image/graduation/99.webp',
    // 'asset/image/graduation/100.webp',
    // 'asset/image/graduation/101.webp',
    // 'asset/image/graduation/102.webp',
    // 'asset/image/graduation/103.webp',
    // 'asset/image/graduation/104.webp',
    // 'asset/image/graduation/105.webp',
    // 'asset/image/graduation/106.webp',
    // 'asset/image/graduation/107.webp',
    // 'asset/image/graduation/108.webp',
    // 'asset/image/graduation/109.webp',
    // 'asset/image/graduation/110.webp',
    // 'asset/image/graduation/111.webp',
    // 'asset/image/graduation/112.webp'
];

const imageBootcampUrls = [
    'asset/image/bootcamp-img/bootcamp-1.webp',
    'asset/image/bootcamp-img/bootcamp-2.webp',
    'asset/image/bootcamp-img/bootcamp-3.webp',
    'asset/image/bootcamp-img/bootcamp-4.webp',
    'asset/image/bootcamp-img/bootcamp-5.webp',
    'asset/image/bootcamp-img/bootcamp-6.webp',
    'asset/image/bootcamp-img/bootcamp-7.webp',
    'asset/image/bootcamp-img/bootcamp-8.webp',
    'asset/image/bootcamp-img/bootcamp-9.webp',
    'asset/image/bootcamp-img/bootcamp-10.webp',
    'asset/image/bootcamp-img/bootcamp-11.webp',
    'asset/image/bootcamp-img/bootcamp-12.webp'
];

const imageParticipantUrls = [
    'asset/image/participant/adat.webp',
    'asset/image/participant/conghiep.webp',
    'asset/image/participant/doanngocthach.webp',
    'asset/image/participant/dohuongquynh.webp',
    'asset/image/participant/duchai.webp',
    'asset/image/participant/duchanh.webp',
    'asset/image/participant/haianh.webp',
    'asset/image/participant/haibac.webp',
    'asset/image/participant/hailong.webp',
    'asset/image/participant/hoangdam.webp',
    'asset/image/participant/hoangnhung.webp',
    'asset/image/participant/hongdam.webp',
    'asset/image/participant/hungpham.webp',
    'asset/image/participant/huong.webp',
    'asset/image/participant/huyenthuong.webp',
    'asset/image/participant/ivyhua.webp',
    'asset/image/participant/kimchi.webp',
    'asset/image/participant/lan.webp',
    'asset/image/participant/lannguyen.webp',
    'asset/image/participant/lebach.webp',
    'asset/image/participant/minhgiang.webp',
    'asset/image/participant/minhle.webp',
    'asset/image/participant/minhquan.webp',
    'asset/image/participant/thanhha.webp',
    'asset/image/participant/nam.webp',
    'asset/image/participant/ngan.webp',
    'asset/image/participant/ngocxuyen.webp',
    'asset/image/participant/nguyenduydat.webp',
    'asset/image/participant/nguyenngoctu.webp',
    'asset/image/participant/nguyenphanlinhchi.webp',
    'asset/image/participant/nguyenphuongha.webp',
    'asset/image/participant/nguyentienthanh.webp',
    'asset/image/participant/nguyentrungthanh.webp',
    'asset/image/participant/nhung.webp',
    'asset/image/participant/phuong.webp',
    'asset/image/participant/phuongmai.webp',
    'asset/image/participant/quynh.webp',
    'asset/image/participant/sontruonggiang.webp',
    'asset/image/participant/tamminh.webp',
    'asset/image/participant/taquangdat.webp',
    'asset/image/participant/thanhluan.webp',
    'asset/image/participant/thao.webp',
    'asset/image/participant/thehai.webp',
    'asset/image/participant/thinh.webp',
    'asset/image/participant/thu.webp',
    'asset/image/participant/thuha.webp',
    'asset/image/participant/thuonghuyen.webp',
    'asset/image/participant/thuytien.webp',
    'asset/image/participant/tram.webp',
    'asset/image/participant/tramanh.webp',
    'asset/image/participant/trangtran.webp',
    'asset/image/participant/tranhanh.webp',
    'asset/image/participant/trankhanhlinh.webp',
    'asset/image/participant/truongthuhuong.webp',
    'asset/image/participant/vietha.webp',
    'asset/image/participant/vucaocuong.webp',
    'asset/image/participant/vuhaianh.webp',
    'asset/image/participant/xuananh.webp',
    'asset/image/participant/chuthao.webp',
    'asset/image/participant/daothaiha.webp',
    'asset/image/participant/duongngochuyen.webp',
    'asset/image/participant/hanvietanh.webp',
    'asset/image/participant/lekimhong.webp',
    'asset/image/participant/lethanhtung.webp',
    'asset/image/participant/ngoclong.webp',
    'asset/image/participant/phamduythanh.webp',
    'asset/image/participant/vuphuonghoa.webp'
];

const imageUrls = shuffle(imageGraduationUrls.concat(imageParticipantUrls));

var imageUrlsWithDimension = [];

/* ===============================
   UTILS
================================ */
function shuffle(array) {
    let copy = [];
    let n = array.length;
    while (n) {
        const i = Math.floor(Math.random() * array.length);
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }
    return copy;
}

function deviceHasMouse() {
    return matchMedia('(pointer:fine)').matches;
}

let scaleFactor = 0.4;
let InfiniteLoadingWidth;
let InfiniteLoadingHeight;

if (window.innerWidth < 500) {
    numberOfFallingImg = 40;
    scaleFactor = 0.28;
    InfiniteLoadingWidth = window.innerWidth;
    InfiniteLoadingHeight = 250;
}
else {
    numberOfFallingImg = 130;
    scaleFactor = 0.37;
    InfiniteLoadingWidth = window.innerWidth * 0.8 / 2;
    InfiniteLoadingHeight = container1
        ? container1.getBoundingClientRect().height / 2 - 40
        : 300;
}

/* ===============================
   MATTER INIT
================================ */
if (canvas) {
    const {
        Engine,
        Render,
        Runner,
        World,
        Bodies,
        Composite,
        Mouse,
        MouseConstraint,
        Query
    } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    engine.world.gravity.y = -0.4;

    let width = window.innerWidth;
    let height = window.innerHeight * 2;

    canvas.width = width;
    canvas.height = height;

    /* ===============================
       WORLD BORDERS
    ================================ */
    function createWorldBorders(w, h) {
        const t = 10;
        return {
            top: Bodies.rectangle(w / 2, -t / 2, w, t, {
                isStatic: true, render: {
                    strokeStyle: '#00000000', // Custom stroke color (black)
                    lineWidth: 0            // Custom stroke width (in pixels)
                }
            }),
            left: Bodies.rectangle(-t / 2, h / 2, t, h, {
                isStatic: true, render: {
                    strokeStyle: '#00000000', // Custom stroke color (black)
                    lineWidth: 0            // Custom stroke width (in pixels)
                }
            }),
            right: Bodies.rectangle(w + t / 2, h / 2, t, h, {
                isStatic: true, render: {
                    strokeStyle: '#00000000', // Custom stroke color (black)
                    lineWidth: 0            // Custom stroke width (in pixels)
                }
            })
        };
    }

    let borders = createWorldBorders(width, height);
    World.add(world, Object.values(borders));

    /* ===============================
       RENDER
    ================================ */
    const render = Render.create({
        canvas,
        engine,
        options: {
            width,
            height,
            wireframes: false,
            pixelRatio: window.devicePixelRatio
        }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    /* ===============================
       MOUSE
    ================================ */
    const mouse = Mouse.create(render.canvas);
    mouse.pixelRatio = window.devicePixelRatio;

    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    // Cho phép scroll page khi wheel trên canvas
    render.canvas.addEventListener(
        'wheel',
        (e) => {
            e.stopPropagation();
            // KHÔNG preventDefault
        },
        { passive: true }
    );

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    /* ===============================
       IMAGE BODY
    ================================ */
    function createImageBody(x, y, image) {
        const randomScale = 0.95 + Math.random() * 0.05;
        return Bodies.rectangle(
            x,
            y,
            image.width * scaleFactor * randomScale + 10,
            image.height * scaleFactor * randomScale + 10,
            {
                friction: 0.2,
                frictionAir: 0.01,
                restitution: 0,
                render: {
                    sprite: {
                        texture: image.url,
                        xScale: scaleFactor * randomScale,
                        yScale: scaleFactor * randomScale
                    },
                }
            }
        );
    }

    /* ===============================
       LOAD IMAGES
    ================================ */
    async function loadImagesInfo(urls) {
        const promises = urls.map(url => {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    const data = {
                        url,
                        width: img.width,
                        height: img.height
                    };
                    imageUrlsWithDimension.push(data);

                    if (fallingImgCount < numberOfFallingImg) {
                        World.add(
                            world,
                            createImageBody(width / 2, height / 2, data)
                        );
                        fallingImgCount++;
                    }
                    resolve();
                };
                img.src = url;
            });
        });
        await Promise.all(promises);
    }

    loadImagesInfo(imageUrls);

    /* ===============================
       CLICK ADD IMAGE
    ================================ */
    function handleClickAt(x, y) {
        if (!imageUrlsWithDimension.length) return;
        const img =
            imageUrlsWithDimension[
            Math.floor(Math.random() * imageUrlsWithDimension.length)
            ];
        World.add(world, createImageBody(x, y, img));
    }

    render.canvas.addEventListener('mouseup', e => {
        const rect = render.canvas.getBoundingClientRect();
        handleClickAt(e.clientX - rect.left, e.clientY - rect.top);
    });

    /* ===============================
       RESIZE FIX
    ================================ */
    function resizeMatter() {
        const cssWidth = window.innerWidth;
        const cssHeight = window.innerHeight * 2;
        const ratio = window.devicePixelRatio || 1;

        // 1. CSS size (QUAN TRỌNG)
        canvas.style.width = cssWidth + 'px';
        canvas.style.height = cssHeight + 'px';

        // 2. Internal canvas size
        canvas.width = cssWidth * ratio;
        canvas.height = cssHeight * ratio;

        // 3. Update render
        render.options.width = cssWidth;
        render.options.height = cssHeight;
        render.pixelRatio = ratio;

        // 4. Update bounds
        Matter.Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: cssWidth, y: cssHeight }
        });

        // 5. Rebuild borders
        World.remove(world, Object.values(borders));
        borders = createWorldBorders(cssWidth, cssHeight);
        World.add(world, Object.values(borders));

        // 6. Update mouse
        mouse.pixelRatio = ratio;

        // 7. Update orbit animation size
        if (container1) {
            if (window.innerWidth < 500) {
                InfiniteLoadingWidth = window.innerWidth * 0.6;
                InfiniteLoadingHeight = 150;
            } else {
                InfiniteLoadingWidth = window.innerWidth * 0.8 / 2;
                InfiniteLoadingHeight =
                    container1.getBoundingClientRect().height / 2 - 40;
            }
        }

        Composite.allBodies(world).forEach(body => {
            if (!body.isStatic) {
                Matter.Body.setPosition(body, {
                    x: Math.min(Math.max(body.position.x, 20), window.innerWidth - 20),
                    y: Math.min(Math.max(body.position.y, 20), window.innerHeight * 2 - 20)
                });
            }
        });

    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeMatter, 150);
    });
}
