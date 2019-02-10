class QueryableDictionary extends Array {
	constructor(dict) {
		super(...Object.entries(dict || {}));
	}

	clone() {
		return new QueryableDictionary(...this.dict);
	}

	get(i) {
		return this.data.find(x => x[0] == i)[1];
	}

	get dict() {
		var out = {};
		for (var _ of this)
			out[_[0]] = _[1];
		return out;
	}

	static convertToDict(qd) {
		var out = {};
		for (var _ of qd)
			out[_[0]] = _[1];
		return out;
	}

	static fromArray(qd) {
		return new QueryableDictionary(QueryableDictionary.convertToDict(qd));
	}
}

class LINQQuery {
	constructor(...queue) {
		this.queue = queue || [];
	}

	clone() {
		return new LINQQuery(...this.queue);
	}

	query(data) {
		var out = /*log(*/ data /*, 'base data')*/;
		for (var _ of this.queue)
			out = /*log(*/ _.f(out, ..._.args) /*, _.f)*/;
		return out;
	}

	add(f, ...args) {
		this.queue.push({
			f: f,
			args: args,
		});
	}

	// map
	Select(f) {
		this.add(LINQQuery._select, f);
		return this;
	}
	static * _select(g, f) {
		/*log(g);*/
		for (var _ of g)
			yield /*log(*/ f(/*log(*/ _ /*, 'Select#_')*/) /*, 'Select#f_')*/;
	}

	// filter
	Where(f) {
		this.add(LINQQuery._where, f);
		return this;
	}
	static * _where(g, f) {
		/*log(g);*/
		for (var _ of g)
			if (/*log(*/ f(/*log(*/ _ /*, 'Where#_')*/) /*, 'Where#f_')*/)
				yield _;
	}

	GroupBy(f) {
		this.add(LINQQuery._groupby, f);
		return this;
	}
	static * _groupby(g, f) {
		/*log(g);*/
		var out = {};
		for (var _ of g) {
			var i = /*log(*/ f(/*log(*/ _ /*, 'GoupBy#_')*/) /*, 'GoupBy#f_')*/;
			if (out[i])
				out[i].push(_);
			else
				out[i] = [_];
		}
		yield * new QueryableDictionary(/*log(*/ out /*, 'GoupBy#out')*/);
	}

	// ~sort
	Order(f) {
		this.add(LINQQuery._order, f);
		return this;
	}
	static * _order(g, f) {
		/*log(g);*/
		yield * /*log(*/[...g()].sort(f) /*, 'Order#sorted')*/;
	}

	First(f) {
		this.add(LINQQuery._first, f);
		return this;
	}
	static _first(g, f) {
		/*log(g);*/
		for (var _ of g)
			if (/*log(*/ f(/*log(*/ _ /*, 'First#_')*/) /*, 'First#f_')*/)
				return _;
	}

	Last(f) {
		this.add(LINQQuery._last, f);
		return this;
	}
	static _last(g, f) {
		/*log(g);*/
		var out = null;
		for (var _ of g)
			if (/*log(*/ f(/*log(*/ _ /*, 'Last#_')*/) /*, 'Last#f_')*/)
				out = _;
		return out;
	}

	// every
	All(f) {
		this.add(LINQQuery._all, f);
		return this;
	}
	static _all(g, f) {
		/*log(g);*/
		for (var _ of g)
			if (!/*log(*/ f(/*log(*/ _ /*, 'All#_')*/) /*, 'All#f_')*/)
				return false;
		return true;
	}

	// some
	Any(f) {
		this.add(LINQQuery._any, f);
		return this;
	}
	static _any(g, f) {
		/*log(g);*/
		for (var _ of g)
			if (/*log(*/ f(/*log(*/ _ /*, 'Any#_')*/) /*, 'Any#f_')*/)
				return true;
		return false;
	}

	ToDictionary(k, v) {
		this.add(LINQQuery._todictionary, k, v);
		return this;
	}
	static * _todictionary(g, k, v) {
		/*log(g);*/
		var out = {};
		for (var _ of g) {
			out[/*log(*/ k(/*log(*/ _ /*, 'ToDictionary#_')*/) /*, 'ToDictionary#f_')*/] = /*log(*/ v(_) /*, 'ToDictionary#v_')*/;
		}
		yield * new QueryableDictionary(/*log(*/ out /*, 'ToDictionary#out')*/);
	}

	ToArray(v) {
		this.add(LINQQuery._toarray, v);
		return this;
	}
	static * _toarray(g, v) {
		/*log(g);*/
		for (var _ of g)
			yield /*log(*/ v(/*log(*/ _ /*, 'ToArray#_')*/) /*, 'ToArray#v_')*/;
	}
}

function test(n) {
	a = (new LINQQuery())
	.Select(x => {
		return {
			value: x
		}
	})
	.Where(x => x.value > 10)
	.Select(x => {
		x.sqrt = Math.floor(Math.sqrt(x.value));
		return x
	})
	.GroupBy(x => x.sqrt)
	.ToDictionary(x => x[0], x => x[1]);
	var b = log(a.query(range(n || 100)));
	return QueryableDictionary.fromArray(b).dict;
}
