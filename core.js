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
		constructor(loc, name, _) {
			super("MDLONF", "Module '{module}' not found\n\tLocation: {loc}\n\tsnapshot: {snapshot}", {
				loc: loc,
				module: name,
				snapshot: codify(_)
			})
		}
	},
	moduleNotCompiled: class extends error {
		constructor(name, _) {
			super("MDLONC", "Module '{module}' not compiled\n\tLocation: {loc}\n\tsnapshot: {snapshot}", {
				loc: loc,
				module: name,
				snapshot: codify(_)
			})
		}
	},
	interfaceNotFound: class extends error {
		constructor(name, _) {
			super("NTRFNF", "Interface '{interface}' not found\n\tLocation: {loc}\n\tsnapshot: {snapshot}", {
				loc: loc,
				module: name,
				snapshot: codify(_)
			})
		}
	},
	interfaceNotInitialized: class extends error {
		constructor(name, _) {
			super("NTRFNI", "Interface '{interface}' not initialized\n\tLocation: {loc}\n\tsnapshot: {snapshot}", {
				loc: loc,
				module: name,
				snapshot: codify(_)
			})
		}
	},
};

class core {
	constructor(model) {
		this._v = "CR00b06";
		this.modules = {};
		this.interfaces = {};
		this.model = model;
	}
	addModule(m) {
		if (this.modules[m.__name__] == undefined) {
			this.modules[m.__name__] = jQuery.extend(true, {}, this.model, m);
			return true;
		} else {
			return false;
		}
	}
	addInterface(i) {
		if (this.interfaces[i.__name__] == undefined) {
			this.interfaces[i.__name__] = i;
			return true;
		} else {
			return false;
		}
	}
	exist(name) {
		if (this.modules[name] == undefined)
			throw new errors.moduleNotFound("[core]>(exist)>_if", name, this.modules);
	}
	exists(ds) {
		for (var i = 0; i < ds.length; i++) {
			this.exist(ds[i]);
		}
	}
	isCompiled(name) {
		if (this.modules[name] != undefined) {
			if (!this.modules[name].__compiled__) {
				return true;
			} else {
				return false;
			}
		} else {
			throw new errors.moduleNotFound("[core]>(isCompiled)>_else",name, this.modules);
		}
	}
	forceCompile(n) {
		if(!this.modules[n].__compiling__)
			this.modules[n].__compile__(this);
	}
	preinit() {
		for (var i in this.modules) {
			try {
				this.modules[i].__compile__(this);
			} catch (e) {
				console.error(e.msg);
			}
		}
		this.scriptHolder = $('[data-scriptHolder="TurtleFrameWork"]');
	}
	init() {
		this.preinit();
		for (var i in this.interfaces) {
			this.interfaces[i].__init__(this);
		}
		for (var i in this.modules) {
			this.modules[i].__init__(this);
		}
		this.postinit();
	}
	postinit() {
		for (var i in this.modules) {
			this.modules[i].__exec__(this);
		}
	}
	addScript(script) {
		this.scriptHolder.append("<script>" + script + "</script>");
	}
};

window.environment = new environment();

var model = {
	__name__: undefined,
	__version__: undefined,
	__dependencies__: [],
	__extends__: [],
	__interfaces__: [],
	__built_in__: [],
	__attr__: [],
	__str__: function () {
		return "[{0}>>{3}::{1}#{2}@{4}//{5}]".f(this.__dependencies__.join(">"), this.__name__, this.__version__, this.__extends__.join(":"), this.__interfaces__.join("@"), hashObj(this));
	},
	__compile__: function (_) {
		this.__compiling__ = true;
		try {
			_.exists(this.__dependencies__);
			for (var i = 0; i < this.__extends__.length; i++) {
				if (_.isCompiled(this.__extends__[i])) {
					$.extend(true, this, this.__extends__[i])
				} else {
					_.forceCompile(this.__extends__[i]);
				}
			}
			this.__preinit__(_);
		} catch (e) {
			console.log(e);
			console.error(e.msg);
		}
		finally {
			this.__compiled__ = true;
		}
	},
	__preinit__: function (_) {},
	__init__: function () {},
	__exec__: function () {},
	__compiling__: false,
	__compiled__: false
};

var tfw = new core(model);
$(document).ready(function () {
	tfw.init();
});
