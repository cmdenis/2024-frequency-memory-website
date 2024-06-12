// To update the sliders' values when they are used

//console.log(document.getElementById("getTest").textContent);

// Switch per time step
//var flipSlider = document.getElementById("sitesPerTimeStep");
//document.getElementById("sitesTimeStepReading").innerHTML = "flips per time-step: " + 100; 
//var inputFlips = flipSlider.value;



// Slider for coupling function parameter c1
let pC1Slider = document.getElementById("pC1Slider");
document.getElementById("pC1").innerHTML =  pC1Slider.value;
c1 = pC1Slider.value


pC1Slider.oninput = function() {
    document.getElementById("pC1").innerHTML =  this.value;
    c1 = this.value
    plotCoupling(c1, c2)
    plotSim(c1, c2)
}

// Slider for coupling function parameter c2
let pC2Slider = document.getElementById("pC2Slider");
document.getElementById("pC2").innerHTML = pC2Slider.value;
c2 = pC2Slider.value


pC2Slider.oninput = function() {
    document.getElementById("pC2").innerHTML = this.value;
    c2 = this.value
    plotCoupling(c1, c2)
    plotSim(c1, c2)
}

