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
		input = document.querySelector('input');
	
	input.addEventListener('keyup', function(e){
		var val = input.value.toLowerCase();
		
		document.querySelector('#container').remove();

		var container = document.createElement('div');
		container.setAttribute('id','container');
		document.body.appendChild(container);

		var arr = str.map(function(item){return item.name.toLowerCase();}),
			arrNew = arr.filter(function(item){
				return item.indexOf(val) >= 0;
			});

		return arrNew.map(function(item){
			var p = document.createElement('p');
			p.textContent = item;
			container.appendChild(p);
		});
	})
});