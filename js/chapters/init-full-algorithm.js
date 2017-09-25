var n = 5000;
var x = buildCustomArray(n, function(){ return randReal(0,1); });
var y = buildCustomArray(n, function(){ return randReal(0,1); });
var points = zip(x,y);

var circle = { point: [0.5, 0.5], r: 0.5 };

var points = vecOp(points, function(d,i){
	var dist = euclideanDist(d, circle.point);
	var indicator = dist <= circle.r ? 1 : 0;
	return { point: d, inCircle: indicator };
});

var inCircleCount = sum(quickMap(points, "inCircle"));
var inCircleProp = inCircleCount / n;

console.log(inCircleProp);
console.log(4 * inCircleProp);
console.log(1 - inCircleProp);
console.log( inCircleProp / (1 - inCircleProp) );

var container = d3.select("#scroll-vis");
var containerBox = container.node().getBoundingClientRect();
var margin = { left: 20, right: 20, top: 20, bottom: 20 };
var width = containerBox.width - margin.left - margin.right;
var height = containerBox.height - margin.top - margin.bottom;

var svg = container.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		// .style("border", "1px solid black")
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svgBounds = { x1: 0, x2: width, y1: 0, y2: height };

var xscale = d3.scaleLinear()
	.domain([0,1])
	.range([0, width]);

var yscale = d3.scaleLinear()
	.domain([0,1])
	.range([0, width]);

svg.append("rect")
		.attr("class", "unit-square")
		.attr("x", xscale(0))
		.attr("width", xscale(1) - xscale(0))
		.attr("y", yscale(0))
		.attr("height", yscale(1) - yscale(0))
		.attr("fill", "transparent")
		.attr("stroke", "transparent")
	.transition()
		.delay(500)
		.duration(1000)
		.attr("stroke", "black")
	.on("end", inscribeCircle);

function buildPoints(){
	svg.selectAll(".points").data(points)
		.enter().append("circle")
			.attr("class", "points")
			.attr("cx", function(d,i){ return xscale(d.point[0]); })
			.attr("cy", function(d,i){ return xscale(d.point[1]); })
			.attr("r", 2)
			.attr("fill", "transparent")
		.transition()
			.delay(function(d,i){ return i * 10000 / points.length; })
			.duration(100)
			.attr("fill", function(d,i){ return d.inCircle == 1 ? "#0099ff" : "black"; });	
			// .attr("fill", "black")
		// .on("end", inscribeCircle);
}

function inscribeCircle(){
	svg.append("circle")
			.attr("class", "inscribed-circle")
			.attr("cx", xscale(circle.point[0]))
			.attr("cy", yscale(circle.point[1]))
			.attr("r", xscale(circle.r))
			.attr("fill", "transparent")
			.attr("stroke", "transparent")
			.attr("fill-opacity", 0)
		.transition()
			.duration(1500)
			.attr("fill", "#0099ff")
			.attr("fill-opacity", 0.1)
			.attr("stroke", "#0099ff")
		.on("end", buildPoints);

	// svg.selectAll(".points")
	// 	.transition()
	// 		.attr("fill", function(d,i){ return d.inCircle === 1 ? "#0099ff" : "black"; });
}





// svg.append("line")
// 	.attr("class", "radius-line")
// 	.attr("x1", xscale(circle.point[0]))
// 	.attr("y1", yscale(circle.point[1]))
// 	.attr("x2", xscale(1))
// 	.attr("y2", yscale(circle.point[1]))
// 	.attr("stroke", "#333");

// svg.append("text")
// 	.attr("class", "radius-text")
// 	.attr("x", xscale(0.75))
// 	.attr("y", yscale(0.49))
// 	.text("r");
	
svg.selectAll("*").style("opacity", 1);
