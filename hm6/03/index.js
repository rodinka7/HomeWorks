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
		var val = input.value.toLowerCase();
		
		document.querySelector('#container').remove();

		var container = document.createElement('div');
		container.setAttribute('id','container');
		document.body.appendChild(container);

		for (let item of str) {
			var city = item['name'].toLowerCase();
			if (city.indexOf(val) >= 0) {
				var p = document.createElement('p');
				p.textContent = city;
				container.appendChild(p);
			}
		}
	})
});