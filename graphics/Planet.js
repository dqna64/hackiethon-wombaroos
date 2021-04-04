class Planet {
    constructor(posX, posY, r, img) {
        this.posX = posX;
        this.posY = posY;
        this.r = r;
        this.img = img;
        this.c1 = getRandomColor([0, 360], [80, 90], [80, 90], [1, 1]).hslaValue;
        this.c2 = getRandomColor([0, 360], [80, 90], [80, 90], [1, 1]).hslaValue;
    }

    display() {
        push();
        translate(this.posX, this.posY);
        // rotate(PI / 4);
        // strokeWeight(2); // setGradient needs this to work for some reason.
        // colorMode(HSL);

        // strokeWeight(0);
        // setGradient(
        //     -this.r, // x
        //     -this.r, // y
        //     2 * this.r, // w
        //     2 * this.r, // h
        //     this.c1, // 
        //     this.c2,
        //     'X_AXIS'
        // );

        // planetMask.push();
        // planetMask.translate(-this.r, -this.r);
        // planetMask.background(180);
        // planetMask.fill('rgba(0,235,228,1)');
        // planetMask.circle(0, 0, this.r);
        // planetMask.pop();
        // image(planetMask, 0, 0)

        image(this.img, -this.r, -this.r, this.r * 2, this.r * 2);
        // fill(this.c1);
        // circle(0, 0, this.r);
        pop();

    }
}