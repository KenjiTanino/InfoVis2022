d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W04/task2.csv")
    .then( data => {
        data.forEach( d => {  d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 356,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:80}
        };

        const piechart = new Piechart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

class Piechart {

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
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);
        self.radius = Math.min( self.config.width, self.config.height ) / 2;
//allright


        self.pie = d3.pie()
            .value( d => d.value );

        self.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);
    }

    update() {
        let self = this;

        self.render();
    }

    render() {
        let self = this;


        self.svg.selectAll('pie')
            .data( pie(this.data) )
            .enter()
            .append('path')
            .attr('d', this.arc)
            .attr('fill', 'black')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

    }
}