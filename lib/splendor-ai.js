var combos = [
	new Tuple(0, 1, 2),
	new Tuple(0, 1, 3),
	new Tuple(0, 1, 4),
	new Tuple(0, 2, 3),
	new Tuple(0, 2, 4),
	new Tuple(0, 3, 4),
	new Tuple(1, 2, 3),
	new Tuple(1, 2, 4),
	new Tuple(1, 3, 4),
	new Tuple(2, 3, 4)
];

Tuple.prototype.sum = function() {
	var sum = 0;
	this.forEach(function(count) {
		sum += count;
	});
	return sum;
}

function isSubset(d1, d2) {
	return d1.toArray().every(function(v, i) {
		return v === 0 || d2[i] === v;
	});
}

function minimize(draws) {
	var uniq = draws.filter(function(v, i, self) {
		return self.indexOf(v) == i;
	});
	var subsets = {};
	uniq.forEach(function(d1, i) {
		uniq.forEach(function(d2, j) {
			if (i != j && isSubset(d1, d2)) {
				subsets[i] = true;
			}
		});
	});
	return uniq.filter(function(_, i) {
		return subsets[i] !== true;
	});
}

function LegalChipDraws(chips) {
	return minimize(combos.map(function(combo) {
		var draw = new Tuple(0, 0, 0, 0, 0);
		combo.forEach(function(i) {
			if (chips[i] > 0) {
				draw[i] = 1;
			}
		});
		return draw;
	}).concat(chips.toArray().map(function(count, i) {
		var draw = new Tuple(0, 0, 0, 0, 0);
		if (count >= 4) {
			draw[i] = 2;
		}
		return draw;
	})).filter(function(draw) {
		return draw.sum() > 0;
	}));
}