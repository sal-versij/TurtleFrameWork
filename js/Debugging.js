function debug(..._) {
	console.trace();
	return log(..._);
}

function log(..._) {
	console.log([..._]);
	return _[0];
}

function info(_) {
	console.log(_);
}
