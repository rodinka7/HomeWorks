'use strict';

let array = [1, 2, 3, 4, 5, 6];

let greaterThan = (a,b) => {
	return a - b;
}

let greaterThanZero = (a,b) => {
	if (a < 0 && b < 0 && a < b) {
		return 5
	} else if (a > 0 && b > 0 && a > b) {
		return 6
	} else if (a >= 0 && b >= 0) {
		return 1
	} else if (a < 0 && b < 0) {
		return 2
	} else if (a > 0 && b < 0) {
		return 3
	} else if (a < 0 && b > 0) {
		return 4
	}
}

let arrReverce = arr => {
	var arrNew = [],
		j = 0;

	for (let i = arr.length-1; i >= 0; i--) {
		arrNew[j] = arr[i];
		j++;
	}
	return arrNew;
}

let selectArr = (arr1, arr2) => {
	var a = arr1.length,
		b = arr2.length;

	if (greaterThan(a, b) >= 0) {
		return a
	} else return b
}

let arrDif = (arr1, arr2) => {
	
	var res = [],
		j = 0, 
		k = 0;

	for (var i = 0; i < selectArr(arr1, arr2); i++) {
		
		for (var j = 0; j < selectArr(arr1, arr2); j++) {
		
			if (arr2[j] === arr1[i]) {
				
				res[k] = arr2[j];
				k++;
			}
		}

	}
	return res;
}

let slice = (arr, firstVal, lastVal) => {
	
	if (greaterThanZero(firstVal, lastVal) === 1) {
		return slice1(arr, firstVal, lastVal);
	} else if (greaterThanZero(firstVal, lastVal) === 2 ) {
		return slice2(arr, firstVal, lastVal);
	} else if (greaterThanZero(firstVal, lastVal) === 3 ) {
		return slice3(arr, firstVal, lastVal);
	} else if (greaterThanZero(firstVal, lastVal) === 4 ) {
		return slice4(arr, firstVal, lastVal);
	} else if (greaterThanZero(firstVal, lastVal) === 5 ) {
		return slice5(arr, firstVal, lastVal);
	} else if (greaterThanZero(firstVal, lastVal) === 6 ) {
		return slice6(arr, firstVal, lastVal);
	}
}

let slice1  = (arr, firstVal, lastVal) => {
	var j = 0,
		res = [];

	for (var i = 0; i < arr.length; i++) {
		if ((i >= firstVal) && (i < lastVal)) {
			res[j] = arr[i];
			j++;
		}
	}

	return res;	
}

let slice2 = (arr, firstVal, lastVal) => {
	var j = 0,
	res = [],
	arrNew = arrReverce(arr);

	for (let i = 0; i < arrNew.length ; i++ ){

		if ((i >= (Math.abs(firstVal)-1)) && (i < (Math.abs(lastVal)-1))) {
			res[j] = arrNew[i];

			j++;
		}	
	}  
	return res;	
}

let slice3 = (arr, firstVal, lastVal) => {
	var j = 0,
	k = 0,
	res1 = [],
	res2 = [],
	res = [],
	arrNew = arrReverce(arr),
	arrNew2 = [];

	for(var i = 0; i < arr.length; i++) {
		if(i >= firstVal) {
			res1[j] = arr[i];			
			j++;
		}
	}

	for(var i = 0; i < arr.length; i++) {
		if(i > (Math.abs(lastVal)-1)) {
			res2[k] = arrNew[i];			
			k++;
		}
	}

	arrNew2 = arrReverce(res2);

	res = arrDif(res1, arrNew2);

	return res
}

let slice4 = (arr, firstVal, lastVal) => {
	var j = 0,
	k = 0,
	res1 = [],
	res2 = [],
	res = [],
	arrNew = arrReverce(arr),
	arrNew2 = [];

	for(var i = 0; i < arr.length; i++) {
		if(i >= (Math.abs(firstVal)-1)) {
			res1[k] = arrNew[i];			
			k++;
		}
	}

	for(var i = 0; i < arr.length; i++) {
		if(i > lastVal) {
			res2[j] = arr[i];			
			j++;
		}
	}
	
	arrNew2 = arrReverce(res1);
	
	res = arrDif(res2, arrNew2);

	return res
}

let slice5 = (arr, firstVal, lastVal) => {
	var j = 0,
	res = [],
	arrNew = arrReverce(arr);
	for (let i = 0; i < arrNew.length ; i++ ){

		if ((i <= (Math.abs(firstVal)-1)) && (i > (Math.abs(lastVal)-1))) {
			res[j] = arrNew[i];

			j++;
		}	
	}  

	res = arrReverce(res);

	return res;	
}

let slice6  = (arr, firstVal, lastVal) => {
	var j = 0,
		res = [];
	for (var i = 0; i < arr.length; i++) {
		if ((i <= firstVal) && (i > lastVal)) {
			res[j] = arr[i];
			j++;
		}
	}
	 res = arrReverce(res);

	return res;	
}

console.log(array);

console.log(slice(array, 5, 1));