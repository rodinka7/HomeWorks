'use strict';

let array = [1, 2, 3, 4, 5, 6],
	res = [],
	j = 0;

let filter = (arr, callback) => {
	for (var i = 0; i < arr.length; i++) {
		callback(arr[i]);
	}

	return res;
}

let greaterThan4 = filter(array, function(item) {
	if (item > 4) {
		res[j] = item;

		j++;
	}
});
console.log(greaterThan4);