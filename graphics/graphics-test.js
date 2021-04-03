function draw() {
    var canvas = document.getElementById('stage');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#D74022";
        ctx.fillRect(25, 25, 150, 150);

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.clearRect(60, 60, 120, 120);
        ctx.strokeRect(90, 90, 80, 80);
    }
}
draw();