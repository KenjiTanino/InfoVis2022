d3.csv("https://kenjitanino.github.io/InfoVis2022/W08/task8-2.csv")
    .then( data => {
        data.forEach( d => {  d.x = +d.x; d.y = +d.y;  });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:10, left:10}
        };

        const barchart = new Barchart( config, data );
        barchart.update();
    })
    .catch( error => {
        console.log( error );
    });

class Barchart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:40, left:10}
        };
        this.data = data;
        this.init();
    }



    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);


//allright




        this.line = d3.line()
            .x( d => d.x )
            .y( d => d.y );

    }

    update() {
        let self = this;


        self.render();
    }

    render() {
        let self = this;


        self.svg.append('path')
            .attr('d', this.line(this.data))
            .attr('stroke', 'black')
            .attr('fill', 'none');

    }
}