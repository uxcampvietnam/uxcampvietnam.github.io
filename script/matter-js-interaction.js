// variable definition
// Flying image in Graduation project defense section
const container = document.getElementById('flyingContainer');
const container2 = document.getElementById('flyingContainer2');

var numberOfFallingImg, fallingImgCount = 0;
var scaleFactor = 0.4;
var InfiniteLoadingWidth; // horizontal radius (x-axis)
var InfiniteLoadingHeight = container.getBoundingClientRect().height / 2 - 40; // vertical radius (y-axis)
var centerX = container.getBoundingClientRect().width / 2;
var centerY = container.getBoundingClientRect().height / 2;
var randomFallingImg = 0;
const canvas = document.getElementById('interactiveImage');

canvas.style.opacity = 1;
var worldTopBorder, worldLeftBorder, worldRightBorder;

// Define scale factor, number of falling img ================================================================
if (window.innerWidth < 500) {
    numberOfFallingImg = 40;
    scaleFactor = 0.22;
    // InfiniteLoadingWidth = 550;
    InfiniteLoadingWidth = window.innerWidth / 2;
    InfiniteLoadingHeight = 150;
}
// if desktop size
else {
    numberOfFallingImg = 150;
    scaleFactor = 0.45;
    InfiniteLoadingWidth = window.innerWidth * 0.8 / 2;
}

// Image List =============================================================================================

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
    'asset/image/participant/xuananh.webp'
];

const imageUrls = shuffle(imageGraduationUrls.concat(imageParticipantUrls));

var imageUrlsWithDimension = [];

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
const runner = Matter.Runner.create();
const engine = Engine.create();
engine.world.gravity.y = -0.3;
engine.world.gravity.x = 0;
var width, height
const world = engine.world;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
width = canvas.width;
height = canvas.height * 2;

worldTopBorder = Bodies.rectangle(width / 2, 5, width, 1, {
    isStatic: true,
    render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 0,
    }
});
worldLeftBorder = Bodies.rectangle(5, height / 2, 1, height, {
    isStatic: true,
    render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 0,
    }
});
worldRightBorder = Bodies.rectangle(width - 5, height / 2, 1, height, {
    isStatic: true,
    render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 0,
    }
});
World.add(world, [worldTopBorder, worldLeftBorder, worldRightBorder]);


function createImageBody(x, y, image) {
    var randomScale = 0.95 + Math.random() * (1 - scaleFactor);

    return Bodies.rectangle(x, y, image.width * scaleFactor * randomScale + 10, image.height * scaleFactor * randomScale + 10, {
        // url: 'test',
        // title: 'test',
        // imgtype: 'bootcamp-cover',
        inertia: 0,
        restitution: 0,
        friction: 0.4,
        frictionAir: 0.03,
        angularVelocity: 1,
        angle: 0.2 - Math.random() * 0.4, // slight tilt
        render: {
            sprite: {
                texture: image.url,
                xScale: scaleFactor * randomScale,
                yScale: scaleFactor * randomScale
            }
        }
    });
}

function shuffle(array) {
    var copy = [], n = array.length, i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);

        // If not already shuffled, move it to the new array.
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }

    return copy;
}

// Lấy kích thước width height của ảnh. ========================
async function loadImagesInfo(urls) {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                // console.log("Image Loaded");
                resolve({
                    url: url,
                    width: img.width,
                    height: img.height,
                    shape: 'rect'
                });

                var testing = {
                    url: url,
                    width: img.width,
                    height: img.height,
                    shape: 'rect'
                }
                imageUrlsWithDimension[imageUrlsWithDimension.length] = testing;
                // Ảnh sau khi load xong được đẩy vào fallingImg
                if (fallingImgCount < numberOfFallingImg) {
                    const x = width / 2;
                    const y = height / 4;

                    const body = createImageBody(x, y, testing);
                    World.add(world, body);
                    fallingImgCount++;
                }
            };

            img.onerror = () => {
                console.warn(`Failed to load image: ${url}`);
                resolve(null); // Hoặc reject nếu muốn bỏ qua ảnh lỗi
            };
            img.src = url;
        });
    });
    const results = await Promise.all(promises);
    return results.filter(item => item !== null); // Loại bỏ ảnh bị lỗi nếu có
}

loadImagesInfo(imageUrls).then(imageInfos => {
    // imageUrlsWithDimension = imageInfos;
    // console.log(imageInfos);
});

// =============================================================================================

const render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
        width: width,
        height: height,
        pixelRatio: window.devicePixelRatio,  // <-- Add this
        // disable debug lines to show images only
        wireframes: false,
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;

const mouse = Matter.Mouse.create(render.canvas);
mouse.pixelRatio = window.devicePixelRatio;  // <- this is the fix

const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    element: document.body,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Matter.World.add(engine.world, mouseConstraint);
render.mouse = mouse;

render.canvas.addEventListener('mousedown', function (event) {

    const { x, y } = mouse.position;

    // Use Matter.Query.point to find which body is under the mouse
    const bodiesAtPoint = Query.point(Composite.allBodies(engine.world), { x, y });

    if (bodiesAtPoint.length > 0) {
        // console.log("Clicked on body:", bodiesAtPoint[0].url);
        console.log("Clicked on body:", bodiesAtPoint[0]);
    } else {
        console.log("Clicked on empty space.");
        if (randomFallingImg < imageUrlsWithDimension.length - 1) { randomFallingImg++ }
        else {
            randomFallingImg = 0;
        };
        const img = imageUrlsWithDimension[randomFallingImg];
        const body = createImageBody(x, y, img);
        World.add(world, body);
        // }
    }
});


let resizeTimeout;
var oldWidthScreenSize;
window.addEventListener('resize', () => {
    InfiniteLoadingWidth = window.innerWidth * 0.8 / 2; // horizontal radius (x-axis)
    InfiniteLoadingHeight = container.getBoundingClientRect().height / 2 - 40; // vertical radius (y-axis)
    centerX = container.getBoundingClientRect().width / 2;
    centerY = container.getBoundingClientRect().height / 2;

    // Clear any existing timeout to reset the timer
    clearTimeout(resizeTimeout);

    // Set a new timeout
    resizeTimeout = setTimeout(() => {
        // This function will execute only after the user stops resizing for 200ms
        handleResizeEnd();
    }, 50); // Adjust the delay (in milliseconds) as needed
});

function handleResizeEnd() {
    // location.reload();
    // Render.run(render);
    if (oldWidthScreenSize < document.getElementsByTagName('body')[0].getBoundingClientRect().width) {
        location.reload();
        // console.log("resized");
    }
    oldWidthScreenSize = document.getElementsByTagName('body')[0].getBoundingClientRect().width;
}





// Settings =======================================================================================

const smallestSize = 0.1;
const largestSize = 0.5;
const graduationImgEls = [];
const graduationImgEls2 = [];

var speed = 0.00003; // radians per ms


// Animate 1 =======================================================================================

// Create image elements
for (let i = 0; i < imageGraduationUrls.length; i++) {

    const img = document.createElement('img');
    img.src = imageGraduationUrls[i];
    img.className = 'flyer';

    const flyerContainer = document.createElement('div');
    flyerContainer.className = 'flyer-container';
    flyerContainer.style.backgroundImage = `url("${imageGraduationUrls[i]}")`;

    // flyerContainer.appendChild(img);
    container.appendChild(flyerContainer);
    graduationImgEls.push({
        el: flyerContainer,
        angle: (i / imageGraduationUrls.length) * 2 * Math.PI // spread evenly
    });
}

var animation1, animation2;
var animation1Animating = false, animation2Animating = false;
function animate() {
    graduationImgEls.forEach(img => {
        img.angle += speed * 16;
        const percentageX = 2 * (mouseX - (container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2)) / window.innerWidth;
        const percentageY = 2 * (mouseY - (container.getBoundingClientRect().top + container.getBoundingClientRect().height / 2)) / window.innerHeight;

        var distance = Math.sqrt(percentageX * percentageX + percentageY * percentageY);
        speed = 0.0007 * percentageX / 2 + 0.00003;

        // speed = 0;

        // Position on oval
        const x = centerX + InfiniteLoadingWidth * Math.sin(img.angle);
        const y = centerY + InfiniteLoadingHeight * Math.sin(img.angle) * Math.cos(img.angle) * 2;


        const relativeX = Math.cos(img.angle); // -1 (left) to 1 (right)

        // const scale = smallestSize + largestSize * (2.2 - Math.abs(distance)) * (1 - relativeX)/2; // 0.5 to 1
        const scale = smallestSize + largestSize * (Math.abs(relativeX));

        img.el.style.transform = `translate(${x - 75}px, ${y - 75}px) scale(${scale})`;
        // img.el.style.transform = `translate(${centerX - x * Math.sin(img.angle) * Math.cos(img.angle) - 50}px, ${y - 50}px) scale(${scale})`;

    });
    animation1 = requestAnimationFrame(animate);
}

function startAnimation1() {
    if (!animation1Animating) {
        animation1Animating = true;
        animate();
    }
}

function stopAnimation1() {
    if (animation1Animating) {
        cancelAnimationFrame(animation1);
        animation1Animating = false;
    }
}

// requestAnimationFrame(animate);


// Animate 2 ===================================================================================
// Create image elements

for (let i = 0; i < imageGraduationUrls.length; i++) {

    const flyerContainer = document.createElement('div');
    flyerContainer.className = 'flyer-container';
    flyerContainer.style.backgroundImage = `url("${imageGraduationUrls[i]}")`;

    // flyerContainer.appendChild(img);
    container2.appendChild(flyerContainer);
    graduationImgEls2.push({
        el: flyerContainer,
        angle: (i / imageGraduationUrls.length) * 2 * Math.PI // spread evenly
    });
}

function animate2() {
    graduationImgEls2.forEach(img => {
        img.angle += 0.0001 * 16;

        // Position on oval
        const x = container2.getBoundingClientRect().width / 2 + container2.getBoundingClientRect().width * Math.sin(img.angle) / 1.5;
        const y = container2.getBoundingClientRect().height / 2 + container2.getBoundingClientRect().height * Math.sin(img.angle) / 2.9;

        var centerImgX = img.el.getBoundingClientRect().left + img.el.getBoundingClientRect().width / 2;
        var centerImgY = img.el.getBoundingClientRect().top + img.el.getBoundingClientRect().height / 2;

        var relativeImgX = Math.abs(mouseX - centerImgX);
        var relativeImgY = Math.abs(mouseY - centerImgY);
        var distance = Math.sqrt(relativeImgX * relativeImgX + relativeImgY * relativeImgY) / (Math.sqrt(flyingContainer2.getBoundingClientRect().height / 2 * flyingContainer2.getBoundingClientRect().height / 2 + flyingContainer2.getBoundingClientRect().width / 2 * flyingContainer2.getBoundingClientRect().width / 2));

        var scale;
        distance < 1 ? scale = 0.08 * (smoothGrowth(distance)) + 0.02 : scale = 0.1; // 0.5 to 1


        img.el.style.transform = `translate(${centerX - x * Math.sin(img.angle) * Math.cos(img.angle) - 60}px, ${y - 100}px) scale(${scale})`;
    });
    animation2 = requestAnimationFrame(animate2);
}


function startAnimation2() {
    if (!animation2Animating) {
        animation2Animating = true;
        animate2();
    }
}

function stopAnimation2() {
    if (animation2Animating) {
        cancelAnimationFrame(animation2);
        animation2Animating = false;
    }
}

// ===================================================================================

document.getElementById("interactiveImage").onwheel = function (event) {
    // event.preventDefault();
};

document.getElementById("interactiveImage").onmousewheel = function (event) {
    // event.preventDefault();
};

var mouseX = 0, mouseY = 0;
function getMousePositionOnScreen(e) {
    mouseX = e.x;
    mouseY = e.y;
}


function smoothGrowth(x) {
    const k = 0.2; // độ dốc, càng lớn càng dốc ở giữa
    const f = x => 1 / (1 + Math.exp(-k * (x - 0.5)));
    const min = f(0);
    const max = f(1);
    return (f(x) - min) / (max - min);
}

