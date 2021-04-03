let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")

drawRocket(0, 0)
drawRocket(200, 200)

// draw rocket at position x and y
function drawRocket(x, y) {
    let image = new Image();
    image.onload = function() {
        console.log("hi")
        ctx.drawImage(image, x, y, 150, 150);
    };
    image.src="graphics/assets/rocket.png";
}

