var allNumbers = [1, 2, 4, 5, 6, 7, 8],
	someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
	noNumbers = ['это', 'массив', 'без', 'чисел'],
	res;

function isNumber(val) {
	return typeof val === 'number';  
}

function isSomeTrue(source, filterFn){

	if(!source.length) {
		throw new Error('Введите значения элементов массива. Он пустой!');
	}

	for (var i = 0; i < source.length; i++){
		
		res = filterFn(source[i]);

		console.log(i + ':  ' + filterFn(source[i]));

		if (res) {
			return true
		}
	}

	return false
}


try {
	console.log(isSomeTrue([], isNumber));
} catch (e) {
	console.log(e.message);
}