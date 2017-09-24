function ScrollTracker() {
	var self = this;

	self.offset = window.innerHeight/2;
	self.setOffset = function(offset) {
		if (!arguments.length) return;
		self.offset = offset;
		self.updateTracker();
	};

	this.tracker = window.pageYOffset + window.innerHeight/2;

	self.updateTracker = function() {
		this.tracker = window.pageYOffset + self.offset;
	};

	// allows for auto-update of the tracker whenever the user scrolls
	window.addEventListener("scroll", function(e){
		self.updateTracker();
	});

	this.trackInterval = function(start, end) {
		var a = {};
		a.start = start;
		a.end = end;
		a.loc = this.tracker;

		if (this.tracker >= start && this.tracker <= end) {
			a.state = "inside";
			a.progress = (this.tracker - start) / (end - start);
		}
		else if (this.tracker < start) {
			a.state = "before";
			a.progress = 0;
		}
		else {
			a.state = "after";
			a.progress = 1;
		}
		return a;
	};

	this.trackElement = function(e) {
		var rect = e.getBoundingClientRect();
		return this.trackInterval(rect.top, rect.bottom);
	};
}