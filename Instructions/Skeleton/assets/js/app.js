// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import the csv file
d3.csv("data.csv", function(err, data) {
    if (err) throw err;

    // Parse the data as numbers
    data.forEach(function(item) {
        item.home_owner_percent = +item.home_owner_percent
        item.Mean_income = +item.Mean_income;
    });

    // Create Scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(data, d => d.home_owner_percent)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0,d3.max(data, d => d.Mean_income)])
        .range([heght, 0]);

    // Create Axes functions
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // Create the labels for the chart data
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.home_owner_percent))
    .attr("cy", d => yLinearScale(d.Mean_income))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".9");

    // Initialize the tooltip in the chart
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>Percent home owners: ${d.home_owner_percent}<br>Mean Income: ${d.Mean_income}`);
        });

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    circlesGroup.on("click", function(item) {
        tooTip.show(item);
    })
    // onmouseout event
        .on("mouseout", function(item, index) {
            toolTip.hide(item);
        });

    // Create axes table
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Mean Income");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Home Owner Percent");
});

