var array = [1,2,3,4,5,6],
	arr = [];

function arrSplice(arg, arr) {
	var arrNew = [],
		j = 0;

	for (var i = arg[1]; i < (arg[1] + arg[2]); i++) {
		arrNew[j] = arr[i];
		j++;
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
		if (arr[i] === ('' || undefined)) {

			for (var k = i; k < arr.length; k++) {
		
				arr[k] = arr[k+1];
			}

			arr.length -= 1;

			arrTransform(arr);
		}
		
	}
}

function argReplace (arr, arg) {

	var k = 3;

	for(var i = 0; i < arr.length; i++) {
			
		if(arr[i] === '') {
			arr[i] = arg[k]
			k++;
		}
			
	}

	return arr;
}

function arrIncrease (j, arr, arg) {
	
	while (j > 0) {

		for (m = arr.length; m > arg[1]; m--) {
			arr[m] = arr[m-1]; 
		}

		j--;
	}
}

function addArguments(arg, arr) {
	var k = 3,
		j,
		p = 0;

	if (arg.length > 3 && arg[2] === 0) {
		
		arrIncrease(arg.length - 3, arr, arg);
		
		for(var i = arg[1]+1; i < (arg[1] + arg.length-2); i++) {
			arr[i] = arg[k]

			k++			
		}

		
	} else if (arg.length > 3 && arg[2] < arg.length - 3) {
		
		argReplace(arr, arg);

		j = arg.length - 3 - arg[2];

		while (j > 0) {

			for (m = arr.length; m >= arg[1]+arg[2]; m--) {
				
				arr[m] = arr[m-1]; 
			}

			j--;
		}


		for(var i = arg[1]+arg[2]; i < (arg[1]+arg.length-3); i++){
			
			arr[i] = arg[3+arg[2] + p]

			p++;
		}

	} else if (arg.length > 3) {
		argReplace(arr, arg);
	} 

	return arr;
}

function splice() {
	
	var arr = arguments[0],
		arrSpliced = arrSplice(arguments, arr);
	
	elRemove(arr, arrSpliced); 

	addArguments(arguments, arr);

	arrTransform(arr);
	
	return arrSpliced;
	
} 

console.log(splice(array,2,3, "Hello", "world"));

console.log('array=' + array)
