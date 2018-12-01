String.prototype.f = function () {
	var s = this,
	i = arguments.length;
	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};

String.prototype.hash = function () {
	var str = this;
	var hash = 0;
	if (str.length == 0)
		return hash;
	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash;
	}
	return hash;
}

String.prototype.format = function (args) {
	var s = this;
	for (var i in args) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
	}
	return s;
}

function log(_, ...o) {
	console.log([_, ...o])
	return _
}

function  * range(a, b = undefined, c = 1) {
	if (b == undefined) {
		b = a;
		a = 0;
	}
	for (var i = a; i < b; i += c) {
		yield i;
	}
}

Array.prototype.iterate = function  * (a, b, c) {
	var l = this.length;
	for (i of range(a, b, c)) {
		while (i < 0)
			i += l;
		while (i >= l)
			i -= l;
		yield this[i];
	}
}

Array.prototype.get = function (a, b, c) {
	return [...this.iterate(a, b, c)]
}
