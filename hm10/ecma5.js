function inherit(child, parent){
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.prototype.parent = parent;
}

var Calc = function(num){
	this.result = num;
};

Calc.prototype.sum = function(){
	return [].reduce.call(arguments, function(prev,current){
		return prev += current;
	}, this.result);
}
Calc.prototype.dif = function(){
	return [].reduce.call(arguments, function(prev,current){
		return prev -= current;
	}, this.result);
}
Calc.prototype.div = function(){
	return [].reduce.call(arguments, function(prev,current){
			return prev /= current; 
		}, this.result);
}
Calc.prototype.mul = function(){
	return [].reduce.call(arguments, function(prev,current){
			return prev *= current; 
		}, this.result);
}

var SqrCalc = function(num) {
	this.result = num;
}

inherit(SqrCalc, Calc);

SqrCalc.prototype.sum = function(){
	return Math.pow(this.parent.prototype.sum.apply(this, arguments),2);
}
SqrCalc.prototype.dif = function(){
	return Math.pow(this.parent.prototype.dif.apply(this,arguments),2);
}
SqrCalc.prototype.div = function(){
	return Math.pow(this.parent.prototype.div.apply(this,arguments),2);
}
SqrCalc.prototype.mul = function(){
	return Math.pow(this.parent.prototype.mul.apply(this,arguments),2);
}

var myCalc = new SqrCalc(100);

console.log(myCalc.mul(2,2));