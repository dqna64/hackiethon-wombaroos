let DIS_WIDTH = 720;
let DIS_HEIGHT = 720;
let FPS = 24;
let debug = true;
let aesthetics = true;

let PLANET_YOFF = 80; // Must be >= planet radius for planet to show on screen.
let PLANET_RAD = 40;
// let planetMask;
let planet1_img;
let planet1;
let planet2_img;
let planet2;
let rocket_img;
let rocket;

function preload() {
    planet1_img = loadImage('graphics/assets/jupiter.png');
    planet2_img = loadImage('graphics/assets/neptune.png');
    rocket_img = loadImage('graphics/assets/rocket.png');

}

function setup() {
    let myCanvas = createCanvas(DIS_WIDTH, DIS_HEIGHT);
    myCanvas.parent('canvas-container');

    // planetMask = createGraphics(PLANET_RAD * 2, PLANET_RAD * 2);
    // planetMask.clear();

    frameRate(FPS);
    // colorMode(RGB);
    planet1 = new Planet(DIS_WIDTH / 2, DIS_HEIGHT - PLANET_YOFF, PLANET_RAD, planet1_img);

    planet2 = new Planet(DIS_WIDTH / 2, PLANET_YOFF, PLANET_RAD, planet2_img);
    rocket = new Rocket(DIS_WIDTH / 2, DIS_HEIGHT - PLANET_YOFF - 150, 80, 80, rocket_img);

}

function draw() {
    background(20);
    // stroke(0);
    // strokeWeight(2);
    // image(planet1_img, 0, 0);

    planet1.display();
    planet2.display();
    rocket.display();

}

loopBool = true;
function keyPressed() {
    if (key == " ") {
        if (loopBool) {
            noLoop();
            loopBool = !loopBool;
        } else {
            loop();
            loopBool = !loopBool;
        }
    } else if (key == 'd') {
        debug = !debug;
    } else if (key == 'a') {
        aesthetics = !aesthetics;
    }
}

function getRandomColor(h, s, l, a) {
    let hue = getRandomNumber(h[0], h[1]); // [0, 360]
    let saturation = getRandomNumber(s[0], s[1]); // [0, 100]
    let lightness = getRandomNumber(l[0], l[1]); // [0, 100]
    let alpha = getRandomNumber(a[0] * 100, a[1] * 100) / 100; // [0, 1]

    return {
        h: hue,
        s: saturation,
        l: lightness,
        a: alpha,
        hslaValue: getHSLAColor(hue, saturation, lightness, alpha)
    }
}

function getRandomNumber(low, high) {
    let r = Math.floor(Math.random() * (high - low)) + low;
    return r;
}

function getHSLAColor(h, s, l, a) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

function setGradient(x, y, w, h, c1, c2, axis) {
    push();
    noFill();
    strokeWeight(2);

    if (axis == 'Y_AXIS') {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            // color(c1) converts hsla c1 to whatever current colourMode (rgb)
            let c = lerpColor(color(c1), color(c2), inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis == 'X_AXIS') {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(color(c1), color(c2), inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
    pop();
}