function drawInscribedCircle() {
	console.log("drawing inscribed circle");
	svg.selectAll("*").style("opacity", 0);
	svg.select(".unit-square").style("opacity", 1);
	svg.selectAll(".points").attr("fill", "black").style("opacity", 1);
	svg.select(".inscribed-circle").style("opacity", 1);
	svg.selectAll(".points").attr("fill", function(d,i){ return d.inCircle == 1 ? "#0099ff" : "black"; });
}