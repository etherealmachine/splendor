(function(Set) {

Set.add = function(set, item) {
  if (set.indexOf(item) == -1) {
    set.push(item);
  }
};

Set.remove = function(set, item) {
	var i = set.indexOf(item);
	if (i != -1) {
		set.splice(i, 1);
	}
};

})(window.Set = window.Set || {});