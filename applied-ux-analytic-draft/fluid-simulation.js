// Obstacle configuration. <--- search this.
// Obstacle size
// first random fluid
// function generateColor()  <--- cái này để generate color.
// FIRST SPLASH CONFIG

// fluid Container:

// fluid form thành shape container: 
//fluidToContainer('.fluid-container'),

// container shape biến thành fluid: 
//containerToFluid('.fluid-container'),


'use strict';


var isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;


// Simulation section

const fluid_canvas = document.getElementById('fluidCanvas');
resizeCanvas();

var defaultConfig = {

    // DENSITY_DIFFUSION
    DENSITY_DISSIPATION: isDarkMode ? 2 : 2,

    VELOCITY_DISSIPATION: isDarkMode ? 0.1 : 0.1,
    PRESSURE: isDarkMode ? 0 : 0.63,
    PRESSURE_ITERATIONS: 0.5,

    // VORTICITY
    CURL: isDarkMode ? 0 : 0.13,
    SPLAT_RADIUS: isDarkMode ? 0.5 : 0.5,

    BACK_COLOR: isDarkMode ? { r: 0, g: 0, b: 0 } : { r: 245, g: 245, b: 245 },

    // Obstacle configuration

    // ASCII rendering
    ASCII: true,
    ASCII_CHARS: " .:-=+*%#@",
    // ASCII_CHARS: " ⋅∘∙◌◯◎●",
    // ASCII_CHARS: " ▁▂▃▄▅▆▇█▃▂▁",

    ASCII_CELL_SIZE: 14,
    ASCII_COLOR: isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 },
}

var config = {
    SIM_RESOLUTION: 256,
    // Obstacle configuration
    DYE_RESOLUTION: 1024,

    // DENSITY_DIFFUSION
    DENSITY_DISSIPATION: defaultConfig.DENSITY_DISSIPATION,

    VELOCITY_DISSIPATION: defaultConfig.VELOCITY_DISSIPATION,
    PRESSURE: defaultConfig.PRESSURE,
    PRESSURE_ITERATIONS: 200,

    // VORTICITY
    CURL: defaultConfig.CURL,
    SPLAT_RADIUS: defaultConfig.SPLAT_RADIUS,

    SPLAT_FORCE: 6000,

    PAUSED: false,
    BACK_COLOR: defaultConfig.BACK_COLOR,
    OBSTACLE_ENABLED: true,


    // ASCII rendering
    ASCII: defaultConfig.ASCII,
    ASCII_CHARS: defaultConfig.ASCII_CHARS,
    ASCII_CELL_SIZE: defaultConfig.ASCII_CELL_SIZE,
    ASCII_COLOR: defaultConfig.ASCII_COLOR,
}

// setting config in dark and light mode. ===================================

const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

colorSchemeQuery.addEventListener('change', (event) => {
    isDarkMode = event.matches;
    config.DENSITY_DISSIPATION = isDarkMode ? 2 : 2;
    config.VELOCITY_DISSIPATION = isDarkMode ? 0.001 : 0.1;
    config.PRESSURE = isDarkMode ? 0 : 0.63;
    config.CURL = isDarkMode ? 0 : 0.13;
    config.SPLAT_RADIUS = isDarkMode ? 1 : 1;

    if (isDarkMode) {
        config.BACK_COLOR = { r: 0, g: 0, b: 0 };
        config.ASCII_COLOR = { r: 255, g: 255, b: 255 };
    } else {
        config.BACK_COLOR = { r: 245, g: 245, b: 245 };
        config.ASCII_COLOR = { r: 0, g: 0, b: 0 };
    }
});

// end setting config in dark and light mode. ===================================



function pointerPrototype() {
    this.id = -1;
    this.texcoordX = 0;
    this.texcoordY = 0;
    this.prevTexcoordX = 0;
    this.prevTexcoordY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.down = false;
    this.moved = false;
    this.color = { r: 0.15, g: 0.15, b: 0.15 };
}

let pointers = [];
let splatStack = [];
let customSplatStack = [];
let activeContainers = new Set();
let activeContainingContainers = new Set();
pointers.push(new pointerPrototype());

const { gl, ext } = getWebGLContext(fluid_canvas);

if (isMobile()) {
    config.DYE_RESOLUTION = 512;
}
if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 512;
}

function getWebGLContext(fluid_canvas) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

    let gl = fluid_canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2)
        gl = fluid_canvas.getContext('webgl', params) || fluid_canvas.getContext('experimental-webgl', params);

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
    let formatRGBA;
    let formatRG;
    let formatR;

    if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    }
    else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return {
        gl,
        ext: {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering
        }
    };
}

function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
            case gl.R16F:
                return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
                return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
                return null;
        }
    }

    return {
        internalFormat,
        format
    }
}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status == gl.FRAMEBUFFER_COMPLETE;
}



function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}



class Material {
    constructor(vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
    }

    setKeywords(keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++)
            hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null) {
            let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
            program = createProgram(this.vertexShader, fragmentShader);
            this.programs[hash] = program;
        }

        if (program == this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
    }

    bind() {
        gl.useProgram(this.activeProgram);
    }
}

class Program {
    constructor(vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
    }

    bind() {
        gl.useProgram(this.program);
    }
}

function createProgram(vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

    return program;
}

function getUniforms(program) {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
}

function compileShader(type, source, keywords) {
    source = addKeywords(source, keywords);

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

    return shader;
};

function addKeywords(source, keywords) {
    if (keywords == null) return source;
    let keywordsString = '';
    keywords.forEach(keyword => {
        keywordsString += '#define ' + keyword + '\n';
    });
    return keywordsString + source;
}

const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`);


const copyShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`);

const clearShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`);

const colorShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`);

const checkerboardShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`);

const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    // ASCII Uniforms
    uniform sampler2D uAsciiTexture;
    uniform float uAsciiCharsCount;
    uniform float uAsciiCellSize;
    uniform vec3 uAsciiColor;
    uniform vec2 uScreenSize;

    void main () {
        vec2 cellPixels = uScreenSize / uAsciiCellSize;
        vec2 cellCenterUv = (floor(vUv * cellPixels) + 0.5) / cellPixels;
        
        vec3 cellColor = texture2D(uTexture, cellCenterUv).rgb;
        float brightness = max(cellColor.r, max(cellColor.g, cellColor.b));
        
        brightness = clamp(brightness * 1.5, 0.0, 0.999);
        
        float charIndex = floor(brightness * uAsciiCharsCount);
        
        vec2 localUv = fract(vUv * cellPixels);
        vec2 asciiUv = vec2((charIndex + localUv.x) / uAsciiCharsCount, 1.0 - localUv.y);
        
        float asciiMask = texture2D(uAsciiTexture, asciiUv).r;
        vec3 c = uAsciiColor * asciiMask;
        gl_FragColor = vec4(c, asciiMask);
    }
`;



const splatShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`);

const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform sampler2D uObstacle;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
        if (texture2D(uObstacle, vUv).a > 0.1) {
            gl_FragColor = vec4(0.0);
            return;
        }
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,
    ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
);

const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uObstacle;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0 || texture2D(uObstacle, vL).a > 0.1) { L = -C.x; }
        if (vR.x > 1.0 || texture2D(uObstacle, vR).a > 0.1) { R = -C.x; }
        if (vT.y > 1.0 || texture2D(uObstacle, vT).a > 0.1) { T = -C.y; }
        if (vB.y < 0.0 || texture2D(uObstacle, vB).a > 0.1) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`);

const curlShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`);

const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    uniform sampler2D uObstacle;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;

        if (texture2D(uObstacle, vL).a > 0.1) L = C;
        if (texture2D(uObstacle, vR).a > 0.1) R = C;
        if (texture2D(uObstacle, vT).a > 0.1) T = C;
        if (texture2D(uObstacle, vB).a > 0.1) B = C;

        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`);

const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    uniform sampler2D uObstacle;

    void main () {
        if (texture2D(uObstacle, vUv).a > 0.1) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
        }
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (target, clear = false) => {
        if (target == null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        // CHECK_FRAMEBUFFER_STATUS();
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
})();


let dye;
let velocity;
let divergence;
let curl;
let pressure;
let obstacle;
const copyProgram = new Program(baseVertexShader, copyShader);
const clearProgram = new Program(baseVertexShader, clearShader);
const colorProgram = new Program(baseVertexShader, colorShader);
const checkerboardProgram = new Program(baseVertexShader, checkerboardShader);
const splatProgram = new Program(baseVertexShader, splatShader);
const advectionProgram = new Program(baseVertexShader, advectionShader);
const divergenceProgram = new Program(baseVertexShader, divergenceShader);
const curlProgram = new Program(baseVertexShader, curlShader);
const vorticityProgram = new Program(baseVertexShader, vorticityShader);
const pressureProgram = new Program(baseVertexShader, pressureShader);
const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);

const displayMaterial = new Material(baseVertexShader, displayShaderSource);

function initFramebuffers() {
    let simRes = getResolution(config.SIM_RESOLUTION);
    let dyeRes = getResolution(config.DYE_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    if (dye == null)
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

    if (velocity == null)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    else
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

    initObstacleFramebuffer();
}

function initObstacleFramebuffer() {
    let res = getResolution(config.DYE_RESOLUTION);
    if (obstacle == null || obstacle.width != res.width || obstacle.height != res.height)
        obstacle = createFBO(res.width, res.height, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);
    renderObstacleMask();
}


function createFBO(w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let texelSizeX = 1.0 / w;
    let texelSizeY = 1.0 / h;

    return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };
}

function createDoubleFBO(w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);

    return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
            return fbo1;
        },
        set read(value) {
            fbo1 = value;
        },
        get write() {
            return fbo2;
        },
        set write(value) {
            fbo2 = value;
        },
        swap() {
            let temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
        }
    }
}

function resizeFBO(target, w, h, internalFormat, format, type, param) {
    let newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
}

function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
    if (target.width == w && target.height == h)
        return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
}


let asciiTexture = null;
function updateAsciiTexture() {
    if (!config.ASCII) return;

    let chars = config.ASCII_CHARS;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let size = 64; // size per character
    canvas.width = chars.length * size;
    canvas.height = size;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 54px monospace";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < chars.length; i++) {
        ctx.fillText(chars[i], i * size + size / 2, size / 2 + 4);
    }

    if (asciiTexture == null) {
        asciiTexture = {
            texture: gl.createTexture(),
            attach(id) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                return id;
            }
        };
    }

    gl.bindTexture(gl.TEXTURE_2D, asciiTexture.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
}


function updateKeywords() {
    displayMaterial.setKeywords([]);
    updateObstacle();
}

function updateObstacle() {
    renderObstacleMask();
}

let lastObstaclesState = "";
function checkObstacleUpdates() {
    const canvasRect = fluid_canvas.getBoundingClientRect();

    // Check for changes in any .fluid-obstacle or .fluid-container
    const fluidContainers = document.querySelectorAll('.fluid-obstacle, .fluid-container');
    let state = `${canvasRect.width},${canvasRect.height},${activeContainingContainers.size}|`;

    fluidContainers.forEach((fluidContainer) => {
        if (!fluidContainer._fluidImage) {
            fluidContainer._fluidImage = new Image();
            fluidContainer._fluidImage.onload = () => { fluidContainer._fluidImageReady = true; checkObstacleUpdates(); };
            fluidContainer._fluidImage.onerror = () => { fluidContainer._fluidImageReady = true; };

            const tagName = fluidContainer.tagName.toLowerCase();
            const isSVG = fluidContainer instanceof SVGElement;

            if (tagName === 'svg') {
                const svgString = new XMLSerializer().serializeToString(fluidContainer);
                const blob = new Blob([svgString], { type: 'image/svg+xml' });
                fluidContainer._fluidImage.src = URL.createObjectURL(blob);
            } else if (tagName === 'img') {
                if (fluidContainer.src) {
                    fluidContainer._fluidImage.src = fluidContainer.src;
                }
            } else if (isSVG) {
                // If it's an SVG element but not the root <svg> (like <text>, <path>)
                // We wrap it in an <svg> tag to make it a valid image source
                const rect = fluidContainer.getBoundingClientRect();
                const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">${new XMLSerializer().serializeToString(fluidContainer)}</svg>`;
                const blob = new Blob([svgString], { type: 'image/svg+xml' });
                fluidContainer._fluidImage.src = URL.createObjectURL(blob);
            } else {
                fluidContainer._fluidImageReady = true;
            }
        }

        if (fluidContainer._fluidImageReady) {
            const rect = fluidContainer.getBoundingClientRect();
            const opacity = getComputedStyle(fluidContainer).opacity;
            const display = getComputedStyle(fluidContainer).display;
            state += `${rect.left.toFixed(1)},${rect.top.toFixed(1)},${rect.width.toFixed(1)},${rect.height.toFixed(1)},${opacity},${display}|`;
        }
    });

    if (state !== lastObstaclesState) {
        lastObstaclesState = state;
        updateObstacle();
    }
}

function renderObstacleMask() {
    let res = getResolution(config.DYE_RESOLUTION);
    if (obstacle == null || obstacle.width != res.width || obstacle.height != res.height)
        obstacle = createFBO(res.width, res.height, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gl.LINEAR);

    gl.bindFramebuffer(gl.FRAMEBUFFER, obstacle.fbo);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (!config.OBSTACLE_ENABLED) {
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = res.width;
    canvas.height = res.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRect = fluid_canvas.getBoundingClientRect();

    function getFitContain(boxWidth, boxHeight, imgWidth, imgHeight) {
        if (!imgWidth || !imgHeight) return { x: 0, y: 0, width: boxWidth, height: boxHeight };
        const boxRatio = boxWidth / boxHeight;
        const imgRatio = imgWidth / imgHeight;
        let finalWidth, finalHeight;

        if (boxRatio > imgRatio) {
            finalHeight = boxHeight;
            finalWidth = boxHeight * imgRatio;
        } else {
            finalWidth = boxWidth;
            finalHeight = boxWidth / imgRatio;
        }

        return {
            x: (boxWidth - finalWidth) / 2,
            y: (boxHeight - finalHeight) / 2,
            width: finalWidth,
            height: finalHeight
        };
    }

    // --- CONTAINING LOGIC ---
    if (activeContainingContainers.size > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-out';

        activeContainingContainers.forEach(el => {
            const rect = el.getBoundingClientRect();
            const drawX = ((rect.left - canvasRect.left) / fluid_canvas.clientWidth) * res.width;
            const drawY = ((rect.top - canvasRect.top) / fluid_canvas.clientHeight) * res.height;
            const drawWidth = (rect.width / fluid_canvas.clientWidth) * res.width;
            const drawHeight = (rect.height / fluid_canvas.clientHeight) * res.height;

            if (el._fluidImageReady && el._fluidImage.src) {
                ctx.drawImage(el._fluidImage, drawX, drawY, drawWidth, drawHeight);
            } else {
                ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
            }
        });

        ctx.globalCompositeOperation = 'source-over';
    }

    // --- NORMAL OBSTACLES ---
    const els = document.querySelectorAll('.fluid-obstacle');
    els.forEach(el => {
        if (el._fluidImageReady) {
            const rect = el.getBoundingClientRect();
            const opacity = parseFloat(getComputedStyle(el).opacity);
            const display = getComputedStyle(el).display;

            if (rect.width > 0 && rect.height > 0 && display !== 'none' && opacity > 0) {
                const drawX = ((rect.left - canvasRect.left) / fluid_canvas.clientWidth) * res.width;
                const drawY = ((rect.top - canvasRect.top) / fluid_canvas.clientHeight) * res.height;
                const drawWidth = (rect.width / fluid_canvas.clientWidth) * res.width;
                const drawHeight = (rect.height / fluid_canvas.clientHeight) * res.height;

                ctx.globalAlpha = opacity;

                if (el._fluidImage && el._fluidImage.src && el._fluidImage.complete && el._fluidImage.naturalWidth > 0) {
                    // It's an image or SVG
                    let imgWidth = el._fluidImage.width || rect.width;
                    let imgHeight = el._fluidImage.height || rect.height;
                    const fit = getFitContain(rect.width, rect.height, imgWidth, imgHeight);

                    const actualRelX = rect.left + fit.x - canvasRect.left;
                    const actualRelY = rect.top + fit.y - canvasRect.top;
                    const fDrawX = (actualRelX / fluid_canvas.clientWidth) * res.width;
                    const fDrawY = (actualRelY / fluid_canvas.clientHeight) * res.height;
                    const fDrawWidth = (fit.width / fluid_canvas.clientWidth) * res.width;
                    const fDrawHeight = (fit.height / fluid_canvas.clientHeight) * res.height;

                    ctx.drawImage(el._fluidImage, fDrawX, fDrawY, fDrawWidth, fDrawHeight);
                } else if (el.tagName.toLowerCase() === 'text' || (el.innerText && el.innerText.length < 50 && !el.children.length)) {
                    // It's a text element (HTML or SVG text if it failed to load as image)
                    const style = window.getComputedStyle(el);
                    ctx.fillStyle = 'white';
                    ctx.font = style.font;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(el.innerText || el.textContent, drawX + drawWidth / 2, drawY + drawHeight / 2);
                } else {
                    // Fallback for div and other boxes
                    ctx.fillStyle = 'white';
                    ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
                }

                ctx.globalAlpha = 1.0;
            }
        }
    });

    gl.bindTexture(gl.TEXTURE_2D, obstacle.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
}

updateKeywords();
initFramebuffers();

let lastUpdateTime = Date.now();

window.fluidToContainer = function (fluidContainer) {
    // console.log('fluid to container');

    if (typeof fluidContainer === 'string') fluidContainer = document.querySelector(fluidContainer);
    if (!fluidContainer) return;

    config.DENSITY_DISSIPATION = 0.5;

    activeContainers.add(fluidContainer);
    activeContainingContainers.add(fluidContainer);
    fluidContainer.style.opacity = '0';
    updateObstacle();

    // Burst of fluid inside
    const rect = fluidContainer.getBoundingClientRect();
    const canvasRect = fluid_canvas.getBoundingClientRect();
    const area = rect.width * rect.height;
    let burstCount = Math.min(Math.floor(area / 100), 20);
    // if (burstCount < 30) burstCount = 30;

    for (let i = 0; i < burstCount; i++) {
        const x = rect.left + Math.random() * rect.width - canvasRect.left;
        const y = rect.top + Math.random() * rect.height - canvasRect.top;
        const texX = x / canvasRect.width;
        const texY = 1.0 - (y / canvasRect.height);
        const dx = 2000 * (Math.random() - 0.5);
        const dy = 2000 * (Math.random() - 0.5);
        const color = { r: 0, g: 0, b: 1 };
        // const color = generateColor();

        customSplatStack.push({ x: texX, y: texY, dx, dy, color });
    }
    activeContainingContainers.delete(fluidContainer);

    // After filling, show the container and release the fluid
    setTimeout(() => {
        fluidContainer.style.transition = 'opacity 0.4s ease-in-out';
        fluidContainer.style.opacity = '1';
        updateObstacle();
        config.DENSITY_DISSIPATION = defaultConfig.DENSITY_DISSIPATION;
    }, 300);
};


window.containerToFluid = function (fluidContainer) {
    if (typeof fluidContainer === 'string') fluidContainer = document.querySelector(fluidContainer);
    if (!fluidContainer) return;

    config.DENSITY_DISSIPATION = 5;

    // Optional: add a burst when hiding to "turn it into fluid"
    const rect = fluidContainer.getBoundingClientRect();
    const canvasRect = fluid_canvas.getBoundingClientRect();
    const area = rect.width * rect.height;
    let burstCount = Math.min(Math.floor(area / 900), 20);
    if (burstCount < 20) burstCount = 20;


    for (let i = 0; i < burstCount; i++) {
        const x = rect.left + Math.random() * rect.width - canvasRect.left;
        const y = rect.top + Math.random() * rect.height - canvasRect.top;
        const texX = x / canvasRect.width;
        const texY = 1.0 - (y / canvasRect.height);
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        const color = { r: 0, g: 0, b: 1 };
        // const color = generateColor();
        customSplatStack.push({ x: texX, y: texY, dx, dy, color });
    }

    fluidContainer.style.transition = 'opacity 0s';
    fluidContainer.style.opacity = '0';
    activeContainers.delete(fluidContainer);
    activeContainingContainers.delete(fluidContainer);
    updateObstacle();

    setTimeout(() => {
        config.DENSITY_DISSIPATION = defaultConfig.DENSITY_DISSIPATION;
    }, 1000);
};

function checkContainerUpdates() {
    document.querySelectorAll('.fluid-container-hover').forEach(fluidContainer => {

        if (!fluidContainer._fluidContainerInitialized) {
            fluidContainer._fluidContainerInitialized = true;

            fluidContainer.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (fluidContainer.classList.contains('fluid-container-show')) {
                        fluidToContainer(fluidContainer);
                        fluidContainer.classList.remove('fluid-container-show');
                    }
                }, 500);
            });

            // fluidContainer.addEventListener('mouseenter', () => {
            //     if (!fluidContainer.classList.contains('fluid-container-show')) {
            //         fluidContainer.classList.add('fluid-container-show');
            //         containerToFluid(fluidContainer);
            //     }
            // });

        }
    });
}

update();

function update() {
    const dt = calcDeltaTime();
    if (resizeCanvas())
        initFramebuffers();
    checkObstacleUpdates();
    checkContainerUpdates();
    applyInputs();
    if (!config.PAUSED)
        step(dt);
    render(null);
    requestAnimationFrame(update);
}

function calcDeltaTime() {
    let now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
}

function resizeCanvas() {
    let width = scaleByPixelRatio(fluid_canvas.clientWidth);
    let height = scaleByPixelRatio(fluid_canvas.clientHeight);
    if (fluid_canvas.width != width || fluid_canvas.height != height) {
        fluid_canvas.width = width;
        fluid_canvas.height = height;
        return true;
    }
    return false;
}



function applyInputs() {
    if (splatStack.length > 0)
        multipleSplats(splatStack.pop());

    while (customSplatStack.length > 0) {
        let s = customSplatStack.pop();
        splat(s.x, s.y, s.dx, s.dy, s.color);
    }

    pointers.forEach(p => {
        if (p.moved) {
            p.moved = false;
            splatPointer(p);
        }
    });
}

function step(dt) {
    gl.disable(gl.BLEND);

    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(divergenceProgram.uniforms.uObstacle, obstacle.attach(1));
    blit(divergence);

    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    gl.uniform1i(pressureProgram.uniforms.uObstacle, obstacle.attach(1));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(2));
        blit(pressure.write);
        pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    gl.uniform1i(gradienSubtractProgram.uniforms.uObstacle, obstacle.attach(2));
    blit(velocity.write);
    velocity.swap();

    advectionProgram.bind();
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    let velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uObstacle, obstacle.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1i(advectionProgram.uniforms.uObstacle, obstacle.attach(2));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
}

function render(target) {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    drawColor(target, normalizeColor(config.BACK_COLOR));
    drawDisplay(target);
}

function drawColor(target, color) {
    colorProgram.bind();
    gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
    blit(target);
}

function drawDisplay(target) {
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;

    displayMaterial.bind();
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));

    if (config.ASCII) {
        if (!asciiTexture) updateAsciiTexture();
        let pixelRatio = window.devicePixelRatio || 1;
        gl.uniform1i(displayMaterial.uniforms.uAsciiTexture, asciiTexture.attach(5));
        gl.uniform1f(displayMaterial.uniforms.uAsciiCharsCount, config.ASCII_CHARS.length);
        gl.uniform1f(displayMaterial.uniforms.uAsciiCellSize, config.ASCII_CELL_SIZE * pixelRatio);
        gl.uniform3f(displayMaterial.uniforms.uAsciiColor, config.ASCII_COLOR.r / 255.0, config.ASCII_COLOR.g / 255.0, config.ASCII_COLOR.b / 255.0);
        gl.uniform2f(displayMaterial.uniforms.uScreenSize, width, height);
    }

    blit(target);
}



function splatPointer(pointer) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}

// FIRST SPLASH CONFIG
function multipleSplats(amount) {
    for (let i = 0; i < amount; i++) {
        const color = { r: 1.5, g: 1.5, b: 1.5 };
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        // splat(x, y, dx, dy, color);
        // splat(0.5, 0.6, dx, dy, color);
        splat(0.5 + 0.4 * (Math.random() - 0.5), 0.6 + 0.2 * (Math.random() - 0.5), dx, dy, color);
    }
}


function splat(x, y, dx, dy, color) {
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, fluid_canvas.width / fluid_canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
}

function correctRadius(radius) {
    let aspectRatio = fluid_canvas.width / fluid_canvas.height;
    if (aspectRatio > 1)
        radius *= aspectRatio;
    return radius;
}

fluid_canvas.addEventListener('mousedown', e => {
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);
    let pointer = pointers.find(p => p.id == -1);
    if (pointer == null)
        pointer = new pointerPrototype();
    updatePointerDownData(pointer, -1, posX, posY);
});

fluid_canvas.addEventListener('click', e => {
    let pointer = pointers[0];
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);

    splat(posX / fluid_canvas.width, 1.0 - posY / fluid_canvas.height, 0, 0, { r: 0, g: 0, b: 1 });
});

fluid_canvas.addEventListener('mousemove', e => {
    let pointer = pointers[0];
    let posX = scaleByPixelRatio(e.offsetX);
    let posY = scaleByPixelRatio(e.offsetY);

    if (pointer.texcoordX === 0 && pointer.texcoordY === 0) {
        pointer.texcoordX = posX / fluid_canvas.width;
        pointer.texcoordY = 1.0 - posY / fluid_canvas.height;
        return;
    }

    updatePointerMoveData(pointer, posX, posY);
});

window.addEventListener('mouseup', () => {
    updatePointerUpData(pointers[0]);
});

fluid_canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    while (touches.length >= pointers.length)
        pointers.push(new pointerPrototype());
    for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].pageX);
        let posY = scaleByPixelRatio(touches[i].pageY);
        updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
    }
});

fluid_canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i + 1];
        if (!pointer.down) continue;
        let posX = scaleByPixelRatio(touches[i].pageX);
        let posY = scaleByPixelRatio(touches[i].pageY);
        updatePointerMoveData(pointer, posX, posY);
    }
}, false);

window.addEventListener('touchend', e => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let pointer = pointers.find(p => p.id == touches[i].identifier);
        if (pointer == null) continue;
        updatePointerUpData(pointer);
    }
});

window.addEventListener('keydown', e => {
    if (e.code === 'KeyP')
        config.PAUSED = !config.PAUSED;
    if (e.key === ' ')
        splatStack.push(parseInt(Math.random() * 20) + 5);
});

function updatePointerDownData(pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / fluid_canvas.width;
    pointer.texcoordY = 1.0 - posY / fluid_canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = { r: 0.15, g: 0.15, b: 0.15 };
}

function updatePointerMoveData(pointer, posX, posY) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / fluid_canvas.width;
    pointer.texcoordY = 1.0 - posY / fluid_canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
}

function updatePointerUpData(pointer) {
    pointer.down = false;
}

function correctDeltaX(delta) {
    let aspectRatio = fluid_canvas.width / fluid_canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
}

function correctDeltaY(delta) {
    let aspectRatio = fluid_canvas.width / fluid_canvas.height;
    if (aspectRatio > 1) delta /= aspectRatio;
    return delta;
}


function normalizeColor(input) {
    let output = {
        r: input.r / 255,
        g: input.g / 255,
        b: input.b / 255
    };
    return output;
}


function getResolution(resolution) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1)
        aspectRatio = 1.0 / aspectRatio;

    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
    else
        return { width: min, height: max };
}


function scaleByPixelRatio(input) {
    let pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
}

function hashCode(s) {
    if (s.length == 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};