'use strict';
let promise1 = new Promise(function(resolve,reject){
		window.addEventListener('load', function(){
			resolve();
		});
	}),
	promise = new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.open('get', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
		xhr.send();
		xhr.addEventListener('load', function(){
			resolve(xhr.responseText);
		});
	});


promise1.then(function(){
	return promise
}).then(function(res){
	var str = JSON.parse(res),
		arr = [],
		input = document.querySelector('input');
	
	input.addEventListener('keyup', function(e){
		var valArr = createArr(input.value.toLowerCase());
		for (let item of str) {
			var cityArr = createArr(item['name'].toLowerCase());
			console.log(compareArr(valArr,cityArr));
		}
	})


});

let createArr = (item) => {
		return item.split('');
	},
	compareArr = (arr1,arr2) => {
		
	};