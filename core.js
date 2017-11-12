// initialize requirements
String.prototype.format = String.prototype.f = function () {
	var s = this,
	i = arguments.length;
	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};

// classes
class environment {
	constructor(version) {
		this._v = "NV00b01";
	}
}

class core {
	constructor(model) {
		this._v = "CR00b02";
		this.modules = {};
		this.interfaces = {};
		this.model = model;
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
		return "[{0}§{1}@{2}::{3}#{4}]".format(__dependencies__.join(","),__name__,__version__,__extends__.join(","),__interfaces__.join(","));
	},
	__compile__: function (_) {
		
	}
};

ç = new core(model);
