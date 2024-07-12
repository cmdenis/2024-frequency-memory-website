// Slider for initial condition for x
let averagingButton = document.getElementById("averagingButton");

averagingButton.oninput = function() {
    document.getElementById("u0_3").innerHTML = this.value;
    u0_3 = Number(this.value)
    plotSim(c1, c2)
}