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
		arr = str.map(function(item){return item.name}).sort();
	document.body.innerHTML = arr.map(function(item){return `<div>${item}</div>`;}).join('\n');
});