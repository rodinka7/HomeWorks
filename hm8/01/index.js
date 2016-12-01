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
		input = document.querySelector('input'),
		cities = str.map(function(item){return item.name}).sort();
	
	var	source = city.innerHTML,
		fn = Handlebars.compile(source),
		template = fn({list: cities});

	container.innerHTML = template;
	
	input.addEventListener('input', function(e){ 
		var val = input.value.toLowerCase(),
			ul = document.querySelector('ul');

		container.removeChild(ul);

		var arr = cities.filter(function(item){
				return item.indexOf(val) >= 0 || item.indexOf(input.value) >= 0;
			});

		template = fn({list: arr});

		container.innerHTML = template;
	})
});