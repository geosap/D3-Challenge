// set the dimensions and margins of the graph

xValue = "age"
yValue = "smokes"
labelValue = "abbr"

var data = [];
var animationDuration = 1000;

// margin setup
var margin = {top: 10, right: 30, bottom: 150, left: 150},
    width = 1060 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// function used for updating circles group with new tooltip
var tooltip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html((d) => `State: <b>${d.state}</b> </br> Smokers: <b>${d.smokes}%</b> </br> Age (Median): <b>${d.age}</b> </br> Obesity: <b>${d.obesity}%</b> </br> Healthcare: <b>${d.healthcare}%</b> </br> Income: $<b>${d.income}</b>`);
    
var svg = d3.select('#scatter')
  .append("svg").call(tooltip).style("border", "2px solid black")
    .style("background", "#f5f2f0")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.style('width',width)
    .style('height',height)
    .style("font-family", "Arial")
    .style("font-size", "8pt")


function redraw(oldX, oldY, xValue, yValue){

    // Assigning min & max values
    
    svg.selectAll(".chart-object-temp").remove(); // destroy all that existed previously

    var xMin = d3.min(data.map(d=>d[oldX])) * .9;
    var xMax = d3.max(data.map(d=>d[oldX])) * 1.1;
    var yMin = d3.min(data.map(d=>d[oldY])) * .9;
    var yMax = d3.max(data.map(d=>d[oldY])) * 1.1;
    
    // Add X axis
    var x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([ 0, width ]);
    
    // Add X Axis scale 
    var scaleX = svg.append("g")
        .attr("class", "chart-object-temp")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);
      
    var scaleY = svg.append("g")
        .attr("class", "chart-object-temp")
        .call(d3.axisLeft(y))

    var circles = svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "chart-object-temp")
        .attr("cx", function (d) { return x(d[oldX]); } )
        .attr("cy", function (d) { return y(d[oldY]); } )
        .attr("r", 10)
        .attr("stroke","black")
        .attr("fill", "#f5f2f0");
     
     var texts = svg.append('g')
        .selectAll(null)
        .data(data)
        .enter().append("text")
        .attr("class", "chart-object-temp")
        .attr("x", function (d) { return x(d[oldX]) - 5; } )
        .attr("y", function (d) { return y(d[oldY]) + 3; } )
        .style("cursor", "pointer")
        .text((d) => d[labelValue])
        .style("font-size", "6pt")
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide);

    xMin = d3.min(data.map(d=>d[xValue])) * .9;
    xMax = d3.max(data.map(d=>d[xValue])) * 1.1;
    yMin = d3.min(data.map(d=>d[yValue])) * .9;
    yMax = d3.max(data.map(d=>d[yValue])) * 1.1;
    
    // Add X axis
    x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([ 0, width ]);
   
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);
      
    scaleY.transition()
        .duration(animationDuration)
        .call(d3.axisLeft(y))

    scaleX.transition()
        .duration(animationDuration)
        .call(d3.axisBottom(x))

    circles.transition()
        .duration(animationDuration)
        .attr("cx", function (d) { return x(d[xValue]); })
        .attr("cy", function (d) { return y(d[yValue]); })

    texts.transition()
        .duration(animationDuration)
        .attr("x", function (d) { return x(d[xValue]) - 5; } )
        .attr("y", function (d) { return y(d[yValue]) + 3; } )
};

// Sync axis w/ value
function changeAxis(element, key, isYAxis){
    var oldX = xValue
    var oldY = yValue
    if (isYAxis) {
        yValue = key
    } else {
        xValue = key
    }
    d3.selectAll(`.axis-control.active.${isYAxis ? 'y' : 'x'}`).attr("class", `axis-control ${isYAxis ? 'y' : 'x'}`)
    d3.select(element[0]).attr("class", `axis-control active ${isYAxis ? 'y' : 'x'}`)
    redraw(oldX, oldY, xValue, yValue)
}

//Read the data
d3.csv("assets/data/data.csv").then((csvData) => {
    
    data = csvData;

    data = data.map(d => {
        d.poverty = +d.poverty,
        d.healthcare = +d.healthcare,
        d.obesity = +d.obesity,
        d.income = +d.income,
        d.smokes = +d.smokes,
        d.age = +d.age
        return d;
    });

// text labels for the x axis
    svg.append("text")             
        .attr("transform",
            "translate(" + (width / 2) + " ," + 
                           (height + margin.top + 30) + ")")
        .style("text-anchor", "middle")
        .text("Age (Median)")
        .attr("class", "axis-control active x")
        .on("click", (datum, i, element) => changeAxis(element, "age", false))

    svg.append("text")             
        .attr("transform",
            "translate(" + (width / 2) + " ," + 
                           (height + margin.top + 60) + ")")
        .style("text-anchor", "middle")
        .text("Poverty %")
        .attr("class", "axis-control x")
        .on("click", (datum, i, element) => changeAxis(element, "poverty", false))

    svg.append("text")             
        .attr("transform",
            "translate(" + (width / 2) + " ," + 
                           (height + margin.top + 90 ) + ")")
        .style("text-anchor", "middle")
        .text("Income ($)")
        .attr("class", "axis-control x")
        .on("click", (datum, i, element) => changeAxis(element, "income", false))

      // text labels for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Smokes %")
        .attr("class", "axis-control active y")
        .on("click", (datum, i, element) => changeAxis(element, "smokes", true))

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10 + 30)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Healthcare %")
        .attr("class", "axis-control y")
        .on("click", (datum, i, element) => changeAxis(element, "healthcare", true))

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10 + 60)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Obesity %")
        .attr("class", "axis-control y")
        .on("click", (datum, i, element) => changeAxis(element, "obesity", true))

    redraw(xValue, yValue, xValue, yValue)
        
})
