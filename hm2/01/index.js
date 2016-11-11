var allNumbers = [1, 2, 4, 5, 6, 7, 8],
	someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
	noNumbers = ['это', 'массив', 'без', 'чисел'],
	res;

function isNumber(val) {

  return typeof val === 'number';

}

function isAllTrue(source, filterFn) {

	if (!source.length){
		throw new Error('Нельзя, чтобы массив был пустым!');
	}

	for(var i = 0; i < source.length; i++) {
	
		res = filterFn(source[i]);
		
		if (!res) {
			return false
		}
	}

	return true;
}

try {
	console.log(isAllTrue([], isNumber));
} catch(e) {
	console.log(e.message);
}