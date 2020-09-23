$(document).ready(function(){
    // Constants
    const lineWidth = 5;
    const margin = 15;
    const om_max = 0.075;
    const pi = Math.PI;
    const rand = Math.random;
    const size = 40;

    // Setup
    var canvas = $('canvas.lattice');
    var context = canvas[0].getContext('2d');
    var height = canvas.height();
    var width = canvas.width();
    var lattice = new Lattice(context);
    
    canvas.attr({'height': height, 'width': width});
    const numCols = Math.floor(width/(size+margin));
    const numRows = Math.floor(height/(size+margin));
    const paddingx = (width - numCols * (size+margin)) / 2;
    const paddingy = (height - numRows * (size+margin)) / 2;

    var x,y;
    for (var i=1/2; i<numCols; i++) {
        for (var j=1/2; j<numRows; j++) {
            x = paddingx + i * (size+margin);
            y = paddingy + j * (size+margin);
            var bec = new BEC(x, y, rand()*pi*2, rand()*om_max*2 - om_max );
            lattice.becs.push(bec);
        }
    }

    window.requestAnimationFrame(Lattice.draw_callback(lattice, size, lineWidth));
});

function clear_context(context) {
    const height = context.canvas.height;
    const width = context.canvas.width;
    context.clearRect(0, 0, width, height);
}

class Lattice {
    constructor(context) {
        this.context = context;
        this.becs = [];
    }

    draw(size, lineWidth) {
        this.becs.forEach(bec => bec.advance_phase());
        clear_context(this.context);
        this.becs.forEach(bec => bec.draw(this.context, size, lineWidth));
    }

    static draw_callback(lattice, size, lineWidth) {
        return function () {
            lattice.draw(size, lineWidth);
            window.requestAnimationFrame(Lattice.draw_callback(lattice, size, lineWidth));
        }
    }
}

class BEC {
    constructor(x, y, theta, omega) {
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.omega = omega;
    }

    draw(context, size, lineWidth) {
        const r1 = 0.9 * size / 2;
        const r2 = 0.5 * size / 2;

        const dot1 = new Dot(r1, this.x, this.y, '#F03C69');
        dot1.draw(context);
        const dot2 = new Dot(r2, this.x, this.y, '#FFAC28');
        dot2.draw(context);
        const arrow = new Arrow(this.x, this.y, this.theta);
        arrow.draw(context, size, lineWidth);
    }

    advance_phase() {
        this.theta = this.theta + this.omega;
    }
}

class Dot {
    constructor(r, x, y, color) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Arrow {
    constructor(x, y, theta) {
        this.x = x;
        this.y = y;
        this.theta = theta;
    }

    draw(context, len, width) {
        context.lineWidth = width;
        const th = this.theta;
        const pi = Math.PI;
        const cos = Math.cos;
        const sin = Math.sin;
        const start = {x: this.x - cos(th)*len/2, y: this.y - sin(th)*len/2}
        const end = {x: this.x + cos(th)*len/2, y: this.y + sin(th)*len/2}
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.beginPath();
        context.moveTo(end.x-cos(th-pi/4)*len/3, (end.y-sin(th-pi/4)*len/3));
        context.lineTo(end.x, end.y);
        context.lineTo(end.x-cos(th+pi/4)*len/3, (end.y-sin(th+pi/4)*len/3));
        context.stroke();
    }
}