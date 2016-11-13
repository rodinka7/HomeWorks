var array = [1,2,3,4,5,6],
	arr = [];

function arrCreate(val){
	for(var i = 0; i< val.length; i++){
		arr[i] = val[i];
	}

	return arr
}

function arrSplice(arg, arr) {
	var arrNew = [],
		j = 0;

	for (var i = arg[1]; i <= arg[2]; i++) {
		arrNew[j++] = arr[i];
	}

	return arrNew;
}

function arrCompare(arr1, arr2) {
	if((arr.length - arrSpliced.length) >= 0) {
		return true
	}
}

function elRemove(arr1, arr2) {

	for (var i = 0; i < arr1.length; i++) {
		
		for (var k = 0; k < arr1.length; k++) {
			if (arr2[k] === arr1[i]) {
				arr1[i] = '';
			}
		}
	}

	return arr;
}

function arrTransform(arr) {
	for ( var i = 0; i < arr.length; i++) {
		if (arr[i] === '') {

			for (var k = i; (k+i) < arr.length; k++) {
				arr[k] = arr[k+1];
			}

			arr.length -= 1;
		}
	}

	for ( var i = 0; i < arr.length; i++) {
		if (arr[i] === '') {
			arrTransform(arr);
		}
	} return arr;
}

function toAdd(arg) {
	var arr = [],
		k = arg[3]; 

	for (var i = 0; i < (arg.length - 3); i++) {
		while (k < arg.length) {
			arr[i] = arg[k];

			k++;
		}
	}

	return arr;
}

function splice() {
	var arr = arrCreate(arguments[0]),
		arrSpliced = arrSplice(arguments, arr);
		res = elRemove(arr, arrSpliced); 
		i = 0;
		
		res = arrTransform(res);

		console.log(res);

		if(arguments.length > 3) {
			console.log(toAdd(arguments));
		}

	return arrSpliced;
	
} 

console.log(splice(array, 3,5, 'hello', 'Vanya'));
