var data;
var width = parseFloat(d3.select('#scatter').style('width'));
var height = width*.66;
var radius = width*.02;

var svg = d3.select('#scatter').append('svg');

// Set the dimensions and margin of the graph
svg
    .style('border','2px solid black')
    .style('width',width)
    .style('height',height)

// append the svg object to the body of the page
var text = svg.append('g');

 svg.append('g')
    .call(d3.axisLeft(d3.scaleLinear().range([height, 0])));

// Add X variable labels
var xText = text.append('g').attr('transform',`translate(${width/2}, ${height})`);

xText
    .append('text')
    .text('In Poverty (%)')
    .attr('class','aText x active')
    .attr('y',-height*.15)
    .attr('dataId', 'poverty')

xText
    .append('text')
    .text('Age (Median)')
    .attr('class','aText x inactive')
    .attr('y',-height*.10)
    .attr('dataId', 'age')

xText
    .append('text')
    .text('Household Income (Median)')
    .attr('class','aText x inactive')
    .attr('y',-height*.05)
    .attr('dataId', 'income')

//Add Y variable labels
yText = svg.append("g")
.attr("transform", `translate(0,${height/2})rotate(-90)`)
.style("text-anchor", "middle")

yText
    .append('text')
    .text('Obese (%)')
    .attr('class','aText y active')
    .attr('y',width*.04)
    .attr('dataId', 'obesity')

yText
    .append('text')
    .text('Smokes (%)')
    .attr('class','aText y inactive')
    .attr('y',width*.08)
    .attr('dataId', 'smokes')

yText
    .append('text')
    .text('Lacks Healthcare (%)')
    .attr('class','aText y inactive')
    .attr('y',width*.12)
    .attr('dataId', 'healthcare')

// Add X & Y axis
var yAxis = svg.append('g').attr('transform',`translate(${width*.16},${height/2})`);
var xAxis = svg.append('g').attr('transform',`translate(${width/2},${height*.75})`);

// Filter for selected variable 
var yValue = d3.selectAll('.y').filter('.active').attr('dataId');
var xValue = d3.selectAll('.x').filter('.active').attr('dataId');

// Read the data
d3.csv('assets/data/data.csv').then(csvData => {
    data = csvData;

    // Convert String to Integer
    data.forEach(data => {
        data.poverty = +data.poverty,
        data.healthcare = +data.healthcare,
        data.obesity = +data.obesity,
        data.income = +data.income,
        data.smokes = +data.smokes,
        data.age = +data.age
    });


// Assigning min & max values
    var xMin = d3.min(data.forEach(d=>d[xValue])*.9);
    var xMax = d3.max(data.forEach(d=>d[xValue])*1.1);
    var yMin = d3.min(data.forEach(d=>d[yValue])*.9);
    var yMax = d3.max(data.forEach(d=>d[yValue])*1.1);


// Create Scales
    var xScale = d3.scaleLinear().domain([xMin,xMax]).range([width*.16, height*.16]);
    var yScale = d3.scaleLinear().domain([xMin,xMax]).range([width*.10, height*.16]);

// create path

// append circles to data points
var circlesGroup = chartGroup.selectAll("circle").data(data)


    xAxis.call(xScale)

// Event listeners w/ transitions


});