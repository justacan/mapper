var r;


class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(r) {
        this.r = r
        this.start_vector;
        this.end_vector;
    }
    start(vector) {
        this.start_vetor = vector;
        return this;
    }
    end(vector) {
        this.end_vetor = vector;
        return this;
    }
    draw(){
        let lineArray = [];
        lineArray.push('M')
        lineArray.push(this.start_vetor.x)
        lineArray.push(this.start_vetor.y)
        lineArray.push('L')
        lineArray.push(this.end_vetor.x)
        lineArray.push(this.end_vetor.y)
        let line = this.r.path( lineArray )
        .attr({
            'stroke': "black",
            'stroke-width': "4"
        });
    }
}

class Box {

    constructor(r) {
        this.r = r;
        this.x;
        this.y;
        this.attr = {stroke: "black", fill: 'white'}
        this.size;
    }

    size(size) {
        this.size = size;
        return this;
    }

    position(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setAttr(fill) {
        if (!fill) return this;
        this.attr = fill;
        return this;
    }

    findCenter() {
        return new Vector(
            this.x * this.size + (this.size / 2),
            this.y * this.size  + (this.size / 2)
        )
    }

    drawBox() {
        let percentage = .75
        this.r.rect(
            this.x * this.size + (this.size * (1 - percentage) / 2),
            this.y * this.size + (this.size * (1 - percentage) / 2),
            this.size * percentage,
            this.size * percentage
        )
        .attr(this.attr)
        .mousedown(function (e) {
            e.preventDefault();
            // console.log(e.which)
            switch(e.which) {
                case 1: this.attr({stroke: "black", fill: 'black'}); break;
                case 2: break;
                case 3: this.attr({stroke: "black", fill: 'white'}); break;
            }
            // this.attr({stroke: "black", fill: 'black'})
        });
    }

    drawCenter() {
        let vector = this.findCenter();
        this.r.rect(vector.x, vector.y, 1, 1)
        .attr({stroke: "cyan", fill: 'cyan'})
    }

    display() {
        this.drawBox();
        // this.drawCenter();
    }

}


class Canvas {
    constructor(length, width, size) {
        this.length = length;
        this.width = width;
        this.size = size;
        this.r;
        this.makeCanvas();
        this.grid = [];
    }

    coordToPos(x, y) {
        x = 2.0 * x / this.width - 1;
        y = - 2.0 * y / this.length + 1;
        return new Vector(width - 2 )
    }

    makeCanvas() {
        this.r = Raphael(0,0, this.length * this.size, this.width * this.size)
    }

    makeGrid() {
        for (var y = 0; y < this.length; y++ ) {
            for (var x = 0; x < this.width; x++ ) {
                let box = new Box(this.r).size(this.size).position(x, y);
                this.grid.push(box);

            }
        }
    }

    drawGrid() {
        this.grid.map((box) => {
            box.display();
        });
    }

    drawConnections() {
        let a = _.find(this.grid, {x: 0, y: 0})
        let b = _.find(this.grid, {x: 1, y: 1})
        let c = _.find(this.grid, {x: 2, y: 1})
        let d = _.find(this.grid, {x: 0, y: 1})
        a.setAttr({stroke: "black", fill: 'black'})
        b.setAttr({stroke: "black", fill: 'black'})
        c.setAttr({stroke: "black", fill: 'black'})
        d.setAttr({stroke: "black", fill: 'black'})
        new Line(this.r).start(a.findCenter()).end(b.findCenter()).draw()
        new Line(this.r).start(b.findCenter()).end(c.findCenter()).draw()
        new Line(this.r).start(a.findCenter()).end(d.findCenter()).draw()
        new Line(this.r).start(d.findCenter()).end(b.findCenter()).draw()
        // line.draw()
    }
}



$(document).ready(() => {    
    $('body').on('contextmenu', function(e) {
        e.preventDefault();
        return false;
    })
    let canvas = new Canvas(5, 5, 64);
    canvas.makeGrid();
    // canvas.drawConnections();
    canvas.drawGrid();

    
})