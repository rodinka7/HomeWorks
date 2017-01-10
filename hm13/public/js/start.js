module.exports = function() {
	return new Promise(function(resolve){

		function requestGet(){
			return new Promise(function(resolve){
				let xhr = new XMLHttpRequest();
				xhr.open('GET','post.json');
				xhr.send();
				xhr.onload = function(){
					resolve(xhr.response);
				}
			});
		};

		requestGet().then(function(res){
			if (res.length){
				resolve(res);
			}
		});
	});
}