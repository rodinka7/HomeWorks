'use strict';

let array = [1, 2, 3, 4, 5, 6];

let forEach = (arr, callback) => {
	for (var i = 0; i < arr.length; i++) {
		callback(arr[i]);
	}	
};


forEach(array, function(item){
	console.log(item);
});