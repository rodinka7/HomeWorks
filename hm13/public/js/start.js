module.exports = function(method, url, data) {
	return new Promise(function(resolve, reject){
		let xhr = new XMLHttpRequest();
		
		xhr.open(method, url, true);
		
		xhr.onload = function(){
			if (this.status === 200){
				resolve(this.response)
			} else {
				reject(new Error(this.statusText));
			}
		}

		xhr.onerror = function(){
			reject(new Error('Ошибка сети'));
		}
		
		if (data === undefined){
			xhr.send();
		} else {
			xhr.send(data);
		};
	});
}