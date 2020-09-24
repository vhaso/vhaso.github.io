// Constants
const canvasses = [
    ['canvas#lattice', Lattice],
]
var running_simulations = [];

$(document).ready(function(){
    slides = new Slides(".slides-container", change_canvas);
    if (canvasses.length > 1) {
        setInterval(()=>slides.next(), 15000);
    }
});

function change_canvas(n) {
    running_simulations.forEach(function (simulation) {
        simulation.stop = true;
    });
    running_simulations = [];
    selector = canvasses[n][0];
    simulation = new canvasses[n][1](canvasses[n][0]);
    running_simulations.push(simulation);
}