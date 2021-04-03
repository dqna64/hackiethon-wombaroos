let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")

drawPlanet('A')
drawPlanet('B')

// let user_preferences = getItem("user", {})
// console.log(user_preferences)
let user_preferences = {
    'position': 7,
}
updateCanvas(user_preferences);

function updateCanvas(user_preferences) {
    let updatedY = (canvas.height - 192) - user_preferences["position"] * (canvas.height - 2 * 192) / 7;
    drawRocket(updatedY);
}

// draw rocket at position x and y
function drawRocket(y) {
    let x = (canvas.width - 150) / 2
    let image = new Image();
    image.onload = function () {
        console.log("Displaying rocket")
        ctx.drawImage(image, x, y, 150, 150);
    };
    image.src = "graphics/assets/rocket.png";
}

function drawPlanet(planetType) {
    let x = (canvas.width - 192) / 2
    let y;
    if (planetType == 'A') {
        y = canvas.height - 48
    } else if (planetType == 'B') {
        y = 48
    }
    let image = new Image();
    image.onload = function () {
        console.log("Displaying planet " + planetType)
        // Draw planets at 256x256 pixels 
        ctx.drawImage(image, x, y, 192, 192);
    };
    image.src = "graphics/assets/jupiter.png";
}
