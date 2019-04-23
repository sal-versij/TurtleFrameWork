window.debugger = {
	trace: {
		enabled: false,
		container: [],
	},
	debug: {
		enabled: false,
		container: [],
	},
	info: {
		enabled: false,
		container: [],
	},
	warning: {
		enabled: true,
		container: [],
	},
	error: {
		enabled: true,
		container: [],
	},
};

function trace(..._) {
	if (window.debugger.trace.enabled) {
		console.trace();
		log(..._);
		window.debugger.trace.container.push(_);
	}
}

function debug(..._) {
	if (window.debugger.debug.enabled) {
		log(..._);
		window.debugger.debug.container.push(_);
	}
}

function info(..._) {
	if (window.debugger.info.enabled) {
		print(..._);
		window.debugger.info.container.push(_);
	}
}

function warning(..._) {
	if (window.debugger.warning.enabled) {
		log(..._);
		window.debugger.warning.container.push(_);
	}
}

function error(..._) {
	if (window.debugger.error.enabled) {
		log(..._);
		window.debugger.error.container.push(_);
	}
}

function log(..._) {
	console.log([..._]);
	return _[0];
}

function print(..._) {
	console.log(_.join('\n'));
	return _[0];
}
