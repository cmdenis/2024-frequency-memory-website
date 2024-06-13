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

// Slider for simulation parameter p1
let p1Slider = document.getElementById("p1Slider");
document.getElementById("p1").innerHTML = p1Slider.value;
p1 = p1Slider.value


p1Slider.oninput = function() {
    document.getElementById("p1").innerHTML = this.value;
    p1 = this.value
    plotSim(c1, c2)
}


// Slider for simulation parameter p2
let p2Slider = document.getElementById("p2Slider");
document.getElementById("p2").innerHTML = p2Slider.value;
p2 = p2Slider.value


p2Slider.oninput = function() {
    document.getElementById("p2").innerHTML = this.value;
    p2 = this.value
    plotSim(c1, c2)
}

// Slider for simulation parameter p3
let p3Slider = document.getElementById("p3Slider");

document.getElementById("p3").innerHTML = p3Slider.value;
p3 = p3Slider.value
//console.log(typeof(p3))


p3Slider.oninput = function() {
    document.getElementById("p3").innerHTML = this.value;
    p3 = this.value
    plotSim(c1, c2)

}


// Slider for initial condition for phi
let u0_1Slider = document.getElementById("u0_1Slider");

document.getElementById("u0_1").innerHTML = u0_1Slider.value;
u0_1 = Number(u0_1Slider.value)

u0_1Slider.oninput = function() {
    document.getElementById("u0_1").innerHTML = this.value;
    u0_1 = Number(this.value)
    plotSim(c1, c2)

}

// Slider for initial condition for theta
let u0_2Slider = document.getElementById("u0_2Slider");

document.getElementById("u0_2").innerHTML = u0_2Slider.value;
u0_2 = Number(u0_2Slider.value)

u0_2Slider.oninput = function() {
    document.getElementById("u0_2").innerHTML = this.value;
    u0_2 = Number(this.value)
    plotSim(c1, c2)

}

// Slider for initial condition for x
let u0_3Slider = document.getElementById("u0_3Slider");

document.getElementById("u0_3").innerHTML = u0_3Slider.value;
u0_3 = Number(u0_3Slider.value)

u0_3Slider.oninput = function() {
    document.getElementById("u0_3").innerHTML = this.value;
    u0_3 = Number(this.value)
    plotSim(c1, c2)

}

// Slider for final time
let timeSlider = document.getElementById("timeSlider");

//document.getElementById("u0_3").innerHTML = u0_3Slider.value;
simulationTime = Number(timeSlider.value)

timeSlider.oninput = function() {
    //document.getElementById("u0_3").innerHTML = this.value;
    simulationTime = Number(this.value)
    plotSim(c1, c2)

}


