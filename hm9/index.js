new Promise(function(resolve){
	if (document.readyState === 'complete'){
		resolve();
	} else {
		window.onload = resolve();
	}
}).then(function(){
	return new Promise(function(resolve){
		VK.init({
			apiId: 5755700
		});

		VK.Auth.login(function(response, reject){
			if(response.session){
				console.log('Подключение прошло успешно!');
				resolve(response);
			} else {
				console.log(new Error('Что-то пошло не так!'));
				reject();
			}
		}, 2);
	})
}).then(function(){
	return new Promise(function(resolve){
		VK.api('friends.get', {'fields': 'photo_50'}, function(response){
			if(response.error){
				reject(new Error(response.error.error_msg));
			} else {
				resolve(response.response);
			}
		});
	})
}).then(function(res){
	let script = document.getElementById('friendsList'),
		list = document.getElementById('list'), 
		source = script.innerHTML,
		fn = Handlebars.compile(source),
		template = fn({list: res});

	list.innerHTML = template;

	window.onscroll = function(e){
		window.dispatchEvent(new CustomEvent('scroll'));
		let list = document.querySelector('.content__list');



		console.log(scroll)

		//list.style.top = 
	}

})