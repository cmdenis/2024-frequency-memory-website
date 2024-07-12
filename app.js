// First I should write an integrator
// Forward Euler is probably ok?

// Making a class for vectors
class Vector extends Array {
    // example methods
    add(other) {
      return this.map((e, i) => e + other[i]);
    }
  }
  
function coupling_func(x, c1, c2){
    // Function for the nonlinear coupling in the system of differential equations
    return Math.atan(c1*(1-x))/c2 + x
}
function direct_core_diff(x, p){
    // Defining the system of differential equations for the direct (averaging) core

    // Parameters
    // p[0] = frequency of entraining oscillator
    // p[1] = coupling strength
    // p[2] = time scale for the x variable
    //onsole.log(p)

    x0 = 2*Math.PI*coupling_func(x[2], c1, c2) + p[1]*Math.sin(x[1] - x[0])   
    x1 = 2*Math.PI*p[0]
    x2 = -p[2]*(x[2] - x0/(2*Math.PI))

    return [x0, x1, x2]
}


function pulsatile_core_diff(x, p){
    // Defining the system of differential equations for the pulsatile core

    // Parameters
    // p[0] = frequency of entraining oscillator
    // p[1] = coupling strength
    // p[2] = time scale for the x variable
    //onsole.log(p)
    x0 = 2*Math.PI*coupling_func(x[2], c1, c2) + p[1]*Math.sin(x[1] - x[0])   
    x1 = 2*Math.PI*p[0]
    x2 = -p[2]*(x[2])

    return [x0, x1, x2]
}



function integrator_avg(diff, p, u0, tStart, tEnd, timeStep){
    // Declare the variables used

    
    // Temporary values of the dynamical variables
    let phi = u0[0];
    let theta = u0[1];
    let xVar = u0[2];

    // Array storing the values of the simulations
    let phi_arr = [Math.cos(phi)];
    let theta_arr = [Math.cos(theta)];
    let xVar_arr = [xVar];
    let t_arr = [tStart];
    
    // Iterate over time steps
    for (let t = 0; t < (tEnd - tStart)/timeStep; t++) {
        // Compute derivatives
        derivs = diff([phi, theta, xVar], p);

        //console.log(diff([1, 1, 1], [1, 1, 1]))

        // Update the variables using forward Euler
        phi += derivs[0]*timeStep;
        theta += derivs[1]*timeStep;
        xVar += derivs[2]*timeStep;

        // Store values in the array
        phi_arr.push(Math.cos(phi));
        theta_arr.push(Math.cos(theta));
        xVar_arr.push(xVar);
        t_arr.push(t*timeStep);
    }
    
    return [t_arr, phi_arr, theta_arr, xVar_arr]
}


function integrator_pulse(diff, p, u0, tStart, tEnd, timeStep){
    // Declare the variables used

    
    // Temporary values of the dynamical variables
    let phi = u0[0];
    let theta = u0[1];
    let xVar = u0[2];

    // Array storing the values of the simulations
    let phi_arr = [Math.cos(phi)];
    let theta_arr = [Math.cos(theta)];
    let xVar_arr = [xVar];
    let t_arr = [tStart];
    
    // Iterate over time steps
    for (let t = 0; t < (tEnd - tStart)/timeStep; t++) {
        // Compute derivatives
        derivs = diff([phi, theta, xVar], p);

        //console.log(diff([1, 1, 1], [1, 1, 1]))

    
        
        // Apply the pulse by checking if phi crosses the end of its cycle
        if (((phi + derivs[0]*timeStep) % (2*Math.PI)) < derivs[0]*timeStep){
            xVar += Number(p[2])
        }

        // Update the variables using forward Euler
        phi += derivs[0]*timeStep;
        theta += derivs[1]*timeStep;
        xVar += derivs[2]*timeStep;

        // Store values in the array
        phi_arr.push(Math.cos(phi));
        theta_arr.push(Math.cos(theta));
        xVar_arr.push(xVar);
        t_arr.push(t*timeStep);
    }
    
    return [t_arr, phi_arr, theta_arr, xVar_arr]
}

