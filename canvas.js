let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")

// just draw with the y coordinate
drawRocket(0)
drawRocket(300)

// draw rocket at position x and y
function drawRocket(y) {
    let x = (canvas.width - 150) / 2
    let image = new Image();
    image.onload = function () {
        ctx.drawImage(image, x, y, 150, 150);
    };
    image.src = "graphics/assets/rocket.png";
}
