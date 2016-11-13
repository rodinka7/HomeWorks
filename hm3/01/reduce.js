'use strict';

let array = [1,2,3,4,5,6],
	prevSum = 0,
	res;

let reduce = (arr, item, callback) => {	
	var i = item;

	while (i < arr.length) {

		res = callback(arr[i]);

		i++
	}

	return res  
}

console.log(reduce(array, 0, function(curNum){
	
	prevSum +=curNum;

	return prevSum; 
}));