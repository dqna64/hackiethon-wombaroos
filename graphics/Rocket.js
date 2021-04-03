class Rocket {
    constructor(posX, posY, w, h, img) {
        this.posX = posX;
        this.posY = posY;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    display() {
        push();
        translate(this.posX, this.posY);

        image(this.img, -this.w / 2, -this.h / 2, this.w, this.h);

        pop();

    }
}