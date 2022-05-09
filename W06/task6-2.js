d3.csv("https://KenjiTanino.github.io/InfoVis2022/W04/data.csv")
.then( data => {
data.forEach( d => { d.x = +d.x; d.y = +d.y; });
var config = {
parent: '#drawing_region',
width: 512,
height: 512,
margin: {top:40, right:40, bottom:40, left:40} };
const scatter_plot = new ScatterPlot( config, data );
scatter_plot.update();
})
.catch( error => { console.log( error ); } );



class ScatterPlot{
constructor( config, data ) {
this.config = {
parent: config.parent,
width: config.width || 256,
height: config.height || 256,
margin: config.margin || {top:10, right:10, bottom:10, left:10}
}
this.data = data;
this.init();
}

init() {
let self = this;
self.svg = d3.select( self.config.parent )
.attr('width', self.config.width)
.attr('height', self.config.height);
self.chart = self.svg.append('g')
.attr('transform',
`translate(${self.config.margin.left}, ${self.config.margin.top})`);

self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

self.xscale = d3.scaleLinear()
.range( [0, self.inner_width] );
self.yscale = d3.scaleLinear()
.range( [self.inner_height,0] );
self.xaxis = d3.axisBottom( self.xscale )
.ticks(6);
self.yaxis = d3.axisLeft( self.yscale )
.ticks(6);
self.xaxis_group = self.chart.append('g')
.attr('transform', `translate(0, ${self.inner_height})`);
self.yaxis_group = self.chart.append('g')
.attr('transform', `translate(0,0)`);
}

update() {
let self = this;
var margin=20;
const xmin = d3.min( self.data, d => d.x );
const xmax = d3.max( self.data, d => d.x );
self.xscale.domain( [xmin-margin, xmax+margin] );
const ymin = d3.min( self.data, d => d.y );
const ymax = d3.max( self.data, d => d.y );
self.yscale.domain( [ymin-margin, ymax+margin] );
self.render();
}

render() {
let self = this;
self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

self.chart.selectAll("circle")
.data(self.data)
.enter()
.append("circle")
.attr("cx", d => self.xscale( d.x ))
.attr("cy", d => self.yscale( d.y ) )
.attr("r", d => d.r );

self.chart.append('g')
.append("text")
.attr("fill","black")
.attr("text-anchor","middle")
.attr("x",(self.inner_width)/2+self.config.margin.left)
.attr("y",0)
.attr("font-size","30")
.text("Chart Title");

self.xaxis_group
.call( self.xaxis );
self.chart.append('g')
.append("text")
.attr("fill","black")
.attr("text-anchor","middle")
.attr("x",(self.inner_width)/2)
.attr("y",self.inner_height+30)
.attr("font-size","10")
.text("X-label");

self.yaxis_group
.call( self.yaxis );

self.chart.append('g')
.append("text")
.attr("x",-20)
.attr("y",(this.inner_height)/2)
.attr("transform","rotate(-90,-20,216)")
.attr("text-anchor","middle")
.attr("font-size","10")
.text("Y-label");
}
}