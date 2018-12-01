function log(_, ...o) {
	console.log([_, ...o])
	return _
}

function  * range(a, b = undefined, c = undefined, l = undefined) {
	!b && ([b, a] = [a, 0]);
	if (l) {
		while (a < 0)
			a += l;
		while (a >= l)
			a -= l;
		while (b < 0)
			b += l;
		while (b >= l)
			b -= l;
	}
	c = !c && (a > b ? -1 : 1) || c;
	if ((a > b) ^ (c < 0))
		return;
	if (a < b)
		for (var i = a; i <= b; i += c)
			yield i;
	else
		for (var i = a; i >= b; i += c)
			yield i;
}

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

String.prototype.f = function (..._) {
	var s = this;
	for (var i in args) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
	}
	return s;
}

String.prototype.format = function (args) {
	var s = this;
	for (var i in args) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
	}
	return s;
}

Array.prototype.iterate = function  * (a, b, c) {
	var l = this.length;
	for (i of range(a, b, c, l)) {
		yield this[i];
	}
}

Array.prototype.get = function (a, b, c) {
	return [...this.iterate(a, b, c)]
}
