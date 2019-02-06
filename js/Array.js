Array.prototype.iterate = function* (a, b, c) {
	var l = this.length;
	for (i of range(a, b, c, l)) {
		yield this[i];
	}
};

Array.prototype.get = function (a, b, c) {
	return [...this.iterate(a, b, c)];
};
