var sumRes;

function calculator(firstNumber) {
	return {
		sum: function(){
			
			sumRes = firstNumber;

			for (var i = 0; i < arguments.length; i++) {
				sumRes += arguments[i];
			}
		
			return sumRes;
		},

		dif: function(){

			sumRes = firstNumber;

			for (var i = 0; i < arguments.length; i++){
				sumRes -= arguments[i];
			}

			return sumRes;
		},

		div: function(){
			sumRes = firstNumber;

			for (var i = 0; i < arguments.length; i++){

				if (!arguments[i]) {
					throw new Error('На ноль делить нельзя!');
				}

				sumRes /= arguments[i];
			}

			return sumRes;
		},

		mul: function(){
			sumRes = firstNumber;
			
			for (var i = 0; i < arguments.length; i++){
				sumRes *= arguments[i];
			}

			return sumRes;
		}
	}

}

var myCalculator = calculator(100);

try {
	console.log(myCalculator.sum(1, 2, 3));
	console.log(myCalculator.dif(10, 20));
	console.log(myCalculator.div(2, 2));
	console.log(myCalculator.mul(2, 2));
	console.log(myCalculator.div(2, 0));
} catch(e) {
	console.log(e.message);
}