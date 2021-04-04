let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")

// Planet size is 512 * 2/8 = 192;
let planet_size = 64;
// Distance from top and bottom edge
let edge_offset = 24;

// Rocket square size
let rocket_size = 50;

// Asteroid square size
let asteroid_size = 32;

// An array with the file names of all 8 available planets
let allPlanets = [
    'cheese',
    'jupiter',
    'jupiter2',
    'jupiter3',
    'neptune',
    'saturn',
    'titan',
    'uranus'
]

// Test user_preferences object
let user_preferences = {
    'position': 4,
}

function updateCanvas(user_preferences) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // For i is 1 to 6
    for (let i = 1; i < 7; i++) {
        drawAsteroid(i)
    }
    drawPlanet('A', user_preferences['currentPlanetA'])
    drawPlanet('B', user_preferences['currentPlanetB'])
    // (planet A) + (planet B - planet A) * position / 7
    let updatedY = (canvas.height - planet_size - edge_offset - rocket_size) + ((edge_offset) - (canvas.height - planet_size - edge_offset - rocket_size)) * user_preferences["position"] / 7;
    drawRocket(updatedY);
}

// draw rocket at position x and y
function drawRocket(y) {
    let x = (canvas.width - rocket_size) / 2
    let image = new Image();
    image.onload = function () {
        console.log("Displaying rocket")
        ctx.drawImage(image, x, y, rocket_size, rocket_size);
    };
    image.src = "graphics/assets/rocket.png";
}

function drawPlanet(planetType, planetsIndex) {
    let x = (canvas.width - planet_size) / 2
    let y;
    if (planetType == 'A') {
        // If planet A:
        // Draw at bottom of screen
        y = canvas.height - planet_size - edge_offset
    } else if (planetType == 'B') {
        // If planet B:
        // Draw at top of screen
        y = edge_offset
    }
    let image = new Image();
    image.onload = function () {
        console.log("Displaying planet " + planetType)
        // Draw planets at 256x256 pixels 
        ctx.drawImage(image, x, y, planet_size, planet_size);
    };
    // image.src = `graphics/assets/${allPlanets[planetsIndex]}.png`;
    image.src = `graphics/assets/${allPlanets[planetsIndex]}.png`;

}

function drawAsteroid(num) {
    let x = (canvas.width - asteroid_size) / 2
    let y = rocket_size - 5 + (canvas.height - planet_size - edge_offset - rocket_size) + ((edge_offset) - (canvas.height - planet_size - edge_offset - rocket_size)) * num / 7;
    let image = new Image();
    image.onload = function () {
        console.log("Displaying asteroid " + num)
        ctx.drawImage(image, x, y, asteroid_size, asteroid_size);
    };
    image.src = "graphics/assets/asteroid.png";
}