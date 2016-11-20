'use strict';

let array = [1,2,3,4,5,6];

function forEach (callback, thisArg){
    let array = thisArg || this.array;
    for(let i = 0; i < array.length; i++){
      callback(array[i], i, array);
    }
}

function filter (callback, thisArg){
	let array = thisArg || this.array;
	let newArray = [];
	for(let i = 0; i < array.length; i++){
  		if(callback(array[i], i, array)){
    		newArray[newArray.length] = array[i];
  		}
	}	
	return newArray;
}

function map (callback, thisArg){
    let array = thisArg || this.array;
    let newArray = [];
    for(let i = 0; i < array.length; i++){
      newArray[newArray.length] = callback(array[i], i, array);
    }
    return newArray;
}

function slice (begin = 0, end = this.array.length){
    let array = this.array;
    let newArray = [];

    if(begin < 0){
      begin = array.length + begin;
    }

    if(end > array.length){
      end = array.length;
    }

    for(let i = begin; i < end; i++){
      newArray[newArray.length] = array[i];
    }

    return newArray;
}

function reduce (callback, initialValue){
    let array = this.array, previousValue, i;

    if(arguments.length == 1){
      if(array.length == 0){
        throw new TypeError('Reduce of empty array with no initial value');
      }
      previousValue = array[0];
      i = 1;
    }else if (arguments.length == 2){
      previousValue = initialValue;
      i = 0;
    }

    while(i < array.length){
      previousValue = callback(previousValue, array[i], i, array);
      i++;
    }

    return previousValue;
  }

function splice (start, deleteCount){
    let array = this.array;

    let newArray = [],
        cuttedArray = [],
        arrayLength = array.length;

    if(start > arrayLength){
      start = arrayLength;
    }else if(start < -arrayLength){
      start = 0;
    }else if(start < 0) {
      start = arrayLength + start;
    }

    if((deleteCount + start) > arrayLength){
      deleteCount = arrayLength - start;
    }

    for(let i = 0; i < start; i++){
      newArray[newArray.length] = array[i];
    }

    for(let i = 2; i < arguments.length; i++){
      newArray[newArray.length] = arguments[i];
    }

    for(let i = start + deleteCount; i < arrayLength; i++){
      newArray[newArray.length] = array[i];
    }

    for(let i = start; i < start + deleteCount; i++){
      cuttedArray[cuttedArray.length] = array[i];
    }

    this.array = newArray;
    return cuttedArray;
}