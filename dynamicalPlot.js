function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function timeStep(u) {

    return [
        2*Math.PI*coupling_func(u[2], c1, c2) + p2Dynamic*Math.sin(u[1] - u[0]),
        2*Math.PI*p1Dynamic,
        -p3Dynamic*u[2]
    ]
}

// Initial parameters
var currentState = [0.0, 0.0, 1.]
var p1Dynamic = 1.0
var p2Dynamic = 1.0
var p3Dynamic = 1.0


// other variables
var loopOn = true
var dt = 0.01
var pastX = Array(101).fill(1).map((i, j) => 1)
var pastPhi = Array(101).fill(1).map((i, j) => 1)
var pastTheta = Array(101).fill(1).map((i, j) => 1)
var pastTimeAxis = Array(101).fill(1).map((i, j) => j)




async function main() {

    while (loopOn == true) {

        // Evolve the system by one time step
        dudt = timeStep(currentState)

        // Check if we need to apply the pulse 
        if (((currentState[0] + dudt[0]*dt) % (2*Math.PI)) < dudt[0]*dt){
            currentState[2] += Number(p3Dynamic)
        }

        currentState = math.add(currentState, math.multiply(dudt, dt))
        //console.log(currentState)

        await sleep(5)

        // Plot values in phase plot
        {
            data = [
                {
                  type: "scatterpolar",
                  mode: "scatter",
                  r: [1],
                  theta: [(currentState[0] % (2*Math.PI))*360/(2*Math.PI)],
                  marker: {
                    size: 20
                  },
                },
                {
                    type: "scatterpolar",
                    mode: "scatter",
                    r: [1],
                    theta: [(currentState[1] % (2*Math.PI))*360/(2*Math.PI)],
                    marker: {
                        size: 20
                      },
                  }
              ]
              
              layout = {
                uirevision:'true',
                polar: {
                  radialaxis: {
                    visible: false,
                    range: [0, 1]
                  }
                },
                showlegend: false,
                height: 200,
                margin: {
                    t: 40,
                    b: 40,
                    l: 30,
                    r: 30,
                  }
                
              }
              var config = {responsive: true}
              
              Plotly.react('dynamicalOscillationsPlot', data, layout, config)   
        }

        // Plot evolution of curves
        {
            // first let's update the arrays
            pastPhi.shift(pastPhi)
            pastPhi.push(Math.cos(currentState[0]))
            pastTheta.shift(pastTheta)
            pastTheta.push(Math.cos(currentState[1]))
            pastX.shift(pastX)
            pastX.push(currentState[2])

            const data = [
                {
                    // phi
                    x: pastTimeAxis,
                    y: pastPhi,
                    mode: "lines",
                    name: "$\cos(ϕ)$",
                    //line: {
                      //color: 'rgb(81, 158, 62)',
                      //width: 3
                    //}θ
  
                  },
                  {
                    // theta
                    x: pastTimeAxis,
                    y: pastTheta,
                    mode: "lines",
                    name: "$\cos(θ)$",
                    //line: {
                      //color: 'rgb(81, 158, 62)',
                      //width: 3
                    //}θ
  
                  },
                  {
                    // x
                    x: pastTimeAxis,
                    y: pastX,
                    mode: "lines",
                    name: "$x$",
                    //line: {
                      //color: 'rgb(81, 158, 62)',
                      //width: 3
                    //}
  
                  }
              ];
              const layout = {
                title: false,
                xaxis: {
                  title: "Time",
                  showticklabels: false
                },
                autosize: true,
                yaxis: {
                  title: "Amplitude",
                },
                margin: {
                  t: 5,
                  l: 0,
                  r: 0,
                  b: 0,
                  pad: 0
                }
              };
    
              const config = { responsive: true };
    
              Plotly.newPlot("evolutionXPlot", data, layout, config);
        }



        

    }

    
      

}

main()

