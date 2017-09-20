var r;

class Canvas {
    constructor(length, width, size) {
        this.length = length;
        this.width = width;
        this.size = size;
        this.r;
        this.makeCanvas();
    }

    makeCanvas() {
        this.r = Raphael(0,0, this.length * this.size, this.width * this.size)
    }

    drawGrid() {    
        for (var y = 0; y < this.length; y++ ) {
            for (var x = 0; x < this.width; x++ ) {                
                this.drawBox(x, y);
                this.drawCenter(x, y);
            }
        }
    }

    drawCenter(x, y) {
        this.r.rect(x * this.size + (this.size / 2) - 8, y * this.size  + (this.size / 2) - 8, 1, 1)
        .attr({stroke: "cyan", fill: 'cyan'})
    }

    drawBox(x, y) {
        console.log('here')
        this.r.rect(x * this.size, y * this.size, this.size - 16, this.size - 16)
        .attr({stroke: "black", fill: 'white'})
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

}







$(document).ready(() => {    
    $('body').on('contextmenu', function(e) {
        e.preventDefault();
        return false;
    })
    let canvas = new Canvas(5, 5, 64);
    canvas.drawGrid();
    
    
})