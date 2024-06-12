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
    // Defining the system of differential equations

    // Parameters
    // p[0] = frequency of entraining oscillator
    // p[1] = coupling strength
    // p[2] = time scale for the x variable

    console.log(coupling_func(x[2], c1, c2))

    x0 = 2*Math.PI*coupling_func(x[2], c1, c2) + p[1]*Math.sin(x[1] - x[0])   
    x1 = 2*Math.PI*p[0]
    x2 = -p[2]*(x[2] - x0/(2*Math.PI))



    return [x0, x1, x2]
}


function integrator(diff, p, u0, tStart, tEnd, timeStep){
    // Declare the variables used

    
    // Temporary values of the dynamical variables
    let phi = u0[0];
    let theta = u0[1];
    let xVar = u0[2];

    // Array storing the values of the simulations
    let phi_arr = [phi];
    let theta_arr = [theta];
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


