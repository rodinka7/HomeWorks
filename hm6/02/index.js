'use strict';

let	promise = new Promise(function(resolve, reject){
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
	xhr.send();

	xhr.addEventListener('load', function(){
		resolve(xhr.responseText);
	})
});

promise.then(function(result){
	var str = JSON.parse(result),
		arr = [];

	for (var i=0; i<str.length; i++) {
		arr.push(str[i]['name']);
	}

	arr.sort();
	for (var item of arr) {
		var div = document.createElement('div');
		div.textContent = item;
		document.body.appendChild(div); 
	}
});