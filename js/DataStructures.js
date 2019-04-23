Array.prototype.iterate = function  * (a, b, c) {
	var l = this.length;
	for (i of range(a, b, c, l)) {
		yield this[i];
	}
};

Array.prototype.get = function (a, b, c) {
	return [...this.iterate(a, b, c)];
};

Array.prototype.peekPop = function () {
	return this[this.length - 1];
};

Array.prototype.peekShift = function () {
	return this[0];
};

class PriorityQueue {
	constructor(comparator = (a, b) => a > b) {
		this._heap = [];
		this._comparator = comparator;
	}

	size() {
		return this._heap.length;
	}

	isEmpty() {
		return this.size() == 0;
	}

	peek() {
		return this._heap[this.size() - 1];
	}

	push(...values) {
		values.forEach(value => {
			this._heap.push(v);
			this._sift(value);
		});
		return this.size();
	}

	pop() {
		return this._heap.pop();
	}

	replace(value) {
		this.pop();
		this.push(value);
	}

	_greater(i, j) {
		return this._comparator(this._heap[i], this._heap[j]);
	}

	_swap(i, j) {
		[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
	}

	_sift() {
		let i = this.size() - 2;
		while (i > 0 && this._greater(i, i - 1)) {
			this._swap(i, i - 1);
			i--;
		}
	}
}
