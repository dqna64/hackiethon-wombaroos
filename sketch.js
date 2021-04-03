let DIS_WIDTH = 1280;
let DIS_HEIGHT = 720;
let FPS = 24;
let debug = true;
let aesthetics = true;

function setup() {
    createCanvas(DIS_WIDTH, DIS_HEIGHT);
    frameRate(FPS);


}

function draw() {
    background(20);
    stroke(0);
    strokeWeight(2);
    fill(50, 250, 203);
    rect(DIS_WIDTH / 4, DIS_HEIGHT / 4, DIS_WIDTH / 2, DIS_HEIGHT / 2);

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
