'use strict';

let array = [1,2,3,4,5,6],
	prevSum = 0,
	res;

let reduce = (arr, item, callback) => {	
	var i;

	if (item === 0) {
		i = 1
	} else i = item

	while (i < arr.length) {

		console.log(arr[i-1], arr[i])
		res = callback(arr[i-1], arr[i]);

		i += 2;
	}

	return res  
}

console.log(reduce(array, 0, function(prevNum, curNum){
	
	prevSum +=  prevNum + curNum;

	return prevSum; 
}));