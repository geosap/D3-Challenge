var data;
var width = parseFloat(d3.select('#scatter').style('width'));
var height = width*.66;
var radius = width*.02;

var svg = d3.select('#scatter').append('svg');

svg
    .style('border','2px solid black')
    .style('width',width)
    .style('height',height)

var text = svg.append('g');
// var xText = text.append('g').attr('transform',`translate(${width/2}, ${height})`);
 // Add the y Axis
 svg.append('g')
    .call(d3.axisLeft(y));

// text label for the y axis
    svg.append("g")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Value");    

// xText
//     .append('text')
//     .text('In Poverty (%)')
//     .attr('class','aText active')
//     .attr('y',-height*.15)
//     .attr('dataId', 'poverty')

// xText
//     .append('text')
//     .text('Age (Median)')
//     .attr('class','aText inactive')
//     .attr('y',-height*.10)
//     .attr('dataId', 'age')

// xText
//     .append('text')
//     .text('Household Income (Median)')
//     .attr('class','aText inactive')
//     .attr('y',-height*.05)
//     .attr('dataId', 'income')

yText
    .append('text')
    .text('Obese (%)')
    .attr('class','aText active')
    .attr('y',-height*.15)
    .attr('dataId', 'obesity')

yText
    .append('text')
    .text('Smokes (%)')
    .attr('class','aText inactive')
    .attr('y',-height*.10)
    .attr('dataId', 'smokes')

yText
    .append('text')
    .text('Lacks Healthcare (%)')
    .attr('class','aText inactive')
    .attr('y',-height*.05)
    .attr('dataId', 'healthcare')



d3.csv('assets/data/data.csv').then(csvData => {
    data = csvData;
});