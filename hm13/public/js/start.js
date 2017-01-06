module.exports = function() {
	return new Promise(function(resolve){
		let result = [];

		function requestGet(){
			return new Promise(function(resolve){
				let xhr = new XMLHttpRequest();
				xhr.open('GET','post.json');
				xhr.send();
				xhr.onload = function(){
					console.log(xhr.response)
					resolve(xhr.response);
				}
			});
		};

		function handlebar(res){
			result = JSON.parse(res);
			
			let source = review.innerHTML,
				source2 = place.innerHTML,
				fn = Handlebars.compile(source),
				fn2 = Handlebars.compile(source2);
			
			document.querySelector('.popup__main-reviews').innerHTML = fn({list: result}); 
			document.querySelector('.popup__header-text').innerHTML = fn2({list: result}); 
		};

		requestGet().then(function(res){
			if (res.length){
				handlebar(res);
				resolve(res);
			}
		});
	});
}