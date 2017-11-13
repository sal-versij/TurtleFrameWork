// initialize requirements
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
		hash = hash & hash; // Convert to 32bit integer
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
codify = function (_, I) {
	if (I == undefined) {
		I = "";
	} else {
		I += "@";
	}
	switch (typeof(_)) {
	case "boolean":
		return I + (_ ? "B#1" : "B#0");
	case "null":
		return I + "X";
	case "undefined":
		return I + "U";
	case "number":
		return I + "N#" + _;
	case "string":
		return I + "S^" + _ + "^";
	default:
		var sub = [];
		for (var i in _)
			sub.push(codify(_[i], i));
		sub.sort();
		return I + "O:" + sub.join('|') + ":";
	}
}
hashObj = function (_) {
	return codify(_).hash();
}

// classes
class environment {
	constructor(version) {
		this._v = "NV00b01";
	}
}

class error {
	constructor(code, msg, args) {
		this.code = code;
		this.message = msg;
		this.args = args;
	}
	get msg() {
		return this.message.format(this.args);
	}
}

var errors = {
	moduleNotFound: class extends error {
		constructor(name, _) {
			super("MDLONF", "Module '{module}' not found\n\tsnapshot: {snapshot}", {
				module: name,
				snapshot: codify(_)
			})
		}
	},
	moduleNotCompiled: class extends error {
		constructor(name, _) {
			super("MDLONC", "Module '{module}' not compiled\n\tsnapshot: {snapshot}", {
				module: name,
				snapshot: codify(_)
			})
		}
	},
	interfaceNotFound: class extends error {
		constructor(name, _) {
			super("NTRFNF", "Interface '{interface}' not found\n\tsnapshot: {snapshot}", {
				module: name,
				snapshot: codify(_)
			})
		}
	},
	interfaceNotInitialized: class extends error {
		constructor(name, _) {
			super("NTRFNI", "Interface '{interface}' not initialized\n\tsnapshot: {snapshot}", {
				module: name,
				snapshot: codify(_)
			})
		}
	},
};

class core {
	constructor(model) {
		this._v = "CR00b03";
		this.modules = {};
		this.interfaces = {};
		this.model = model;
		this.workStatus = [{
				f: "constructor",
				v: this._v,
				m: this.model
			}
		];
	}
	addModule(n, m) {
		if (this.modules[n] == undefined) {
			this.modules[n] = jQuery.extend(true, {}, this.model, m);
			return true;
		} else {
			return false;
		}
	}
	addInterface(n, i) {
		if (this.interfaces[n] == undefined) {
			this.interfaces[n] = i;
			return true;
		} else {
			return false;
		}
	}
	findDependencies(ds) {
		for (var i = 0; i < ds.length; i++) {
			if (this.modules[ds[i]] == undefined)
				throw new errors.moduleNotFound(ds[i], this.modules);
		}
	}
	isCompiled(name) {
		if (!this.modules[name] == undefined) {
			if (!this.modules[name].__compiled__) {}
			else {
				throw new errors.moduleNotCompiled(name, this.modules[name]);
			}
		} else {
			throw new errors.moduleNotFound(name, this.modules);
		}
	}
	preinit() {
		for (var i = 0; i < this.modules.length; i++) {
			try {
				this.modules.__compile__(this);
			} catch (e) {
				console.error(e.msg);
			}
		}
	}
	init() {
		this.preinit();
		for (var i = 0; i < this.interfaces.length; i++) {
			this.interfaces.__init__();
		}
		for (var i = 0; i < this.modules.length; i++) {
			this.modules.__init__();
		}
		this.postinit();
	}
	postinit() {}
};

// setup environment
window.environment = new environment();

// initialize variables
var model = {
	__name__: undefined,
	__version__: undefined,
	__dependencies__: [],
	__extends__: [],
	__interfaces__: [],
	__built_in__: [],
	__attr__: [],
	__init__: function () {},
	__str__: function () {
		return "[{0}>>{3}::{1}#{2}@{4}]".f(this.__dependencies__.join(">"), this.__name__, this.__version__, this.__extends__.join(":"), this.__interfaces__.join("@"), this.hashID());
	},
	__compile__: function (_) {
		try {
			_.findDependencies(this.__dependencies__);
			for (i in this.__extends__) {
				if (!_.find)
					$.extend(true, this, )
			}
		} catch (e) {
			console.error(e.msg);
		}
		finally {
			this.__compiled__ = true;
		}
	},
	__compiled__: false
};

var tfw = new core(model);
$('[data-scriptHolder="TurtleFrameWork"]').ready(function () {});
$(document).ready(function () {
	
	tfw.init();
});
