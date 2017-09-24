function addRandomPoints() {
	console.log("adding random points");
	svg.selectAll("*").style("opacity", 0);
	svg.select(".unit-square").style("opacity", 1);
	svg.selectAll(".points").attr("fill", "black").style("opacity", 1);
}