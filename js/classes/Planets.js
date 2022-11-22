
/** For the Design colour planet on Canvas */
function planet1() {

    //apply a gradient for the halo
    var gradient = c.createRadialGradient(canvas.width * 0.10, canvas.height * 0.2, 0, canvas.width *
        0.10, canvas.height * 0.2, canvas.width * 0.11);
    gradient.addColorStop(0.4, "dodgerblue");
    gradient.addColorStop(1, "black");

    //draw the halo
    c.fillStyle = gradient;
    c.beginPath();
    c.arc(canvas.width * 0.1, canvas.height * 0.2, canvas.width * 0.20, 0, Math.PI * 2, false);
    c.fill();


    //apply a gradient
    gradient = c.createRadialGradient(canvas.width * 0.09, canvas.height * 0.1, 0, canvas.width *
        0.09, canvas.height * 0.1, canvas.width * 0.09);
    /* gradient.addColorStop(0, "blue");
     gradient.addColorStop(1, "midnightblue");*/

    gradient.addColorStop(0.4, "purple");
    gradient.addColorStop(1, "blue");

    //draw the planet
    c.fillStyle = gradient;
    c.beginPath();
    c.arc(canvas.width * 0.1, canvas.height * 0.2, canvas.width * 0.09, 0, Math.PI * 2, false);
    c.fill();
}
