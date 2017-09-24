function drawUnitSquare() {
	console.log("drawing unit square");
	svg.selectAll("*").style("opacity", 0);

	svg.select(".unit-square").style("opacity", 1);

}