'use strict';

class Calc {
	constructor(num){
		this.result = num;
	};
	sum(){
		return [].reduce.call(arguments, function(prev,current){
			return prev += current; 
		}, this.result);
	};
	dif(){
		return [].reduce.call(arguments, function(prev,current){
			return prev -= current; 
		}, this.result);
	};
	div(){
		return [].reduce.call(arguments, function(prev,current){
			return prev /= current; 
		}, this.result);
	};
	mul(){
		return [].reduce.call(arguments, function(prev,current){
			return prev *= current; 
		}, this.result);
	};

};

class SqrCalc extends Calc {
	sum(){
		return Math.pow(super.sum.apply(this, arguments), 2);
	};
	dif(){
		return Math.pow(super.dif.apply(this, arguments),2);
	};
	div(){
		return Math.pow(super.div.apply(this, arguments),2);
	};
	mul(){
		return Math.pow(super.mul.apply(this, arguments),2);
	};
}

let myCalc = new SqrCalc(100);

console.log(myCalc.mul(2,2))