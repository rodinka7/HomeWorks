'use strict';

let array = [1, 2, 3, 4, 5, 6],
	res = [];

let map = (arr, callback) => {
	for (var i = 0; i < arr.length; i++) {
		
		res[i] = callback(arr[i]);
	}

	return res;
}

let square = map(array, function(item){
	return item*item
});

console.log(square);

