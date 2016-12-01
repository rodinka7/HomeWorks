new Promise(function(resolve, reject){
	if (document.readyState === 'complete'){
		resolve();
	} else {
		window.onload = resolve();
	}
}).then(function(){
	return new Promise(function(resolve, reject){
		VK.init({
			apiId: 5755700
		});

		VK.Auth.login(function(response){
			if (response.session){
				console.log('Everything is OK');
				resolve();
			} else { console.log('Something is wrong') }
		}, 2);
	}).then(function(){
		return new Promise(function(resolve){
			VK.api('users.get', {'name_case': 'gen'}, function(response){
				if (response.error) {
					console.log(response.error.error_msg);
				} else {
					header.textContent = 'Друзья на странице ' + response.response[0].first_name + ' ' + response.response[0].last_name;
					resolve();
				}
			})
		});
	}).then(function(){
		return new Promise(function(resolve){
			VK.api('friends.get', {'fields': 'bdate, photo_100'}, function(response){
				if (response.error) {
					console.log(response.error.error_msg);
				} else {
					var now = +(new Date());

					var arr = response.response.sort(function(item){
						if (item.bdate){
							let birth = item.bdate.split('.');
							if (birth[2]){
								birthday = +(new Date(birth[2], birth[1], birth[0])); 
								item.age = Math.floor((now - birthday)/(1000*60*60*24*365));
								item.birthday = birthday;
							} else {
								item.age = 'Возраст не указан';
							}
						} else {
							item.age = 'Возраст не указан';
						}						
					}).sort(function(a,b){
						if (a.birthday){
							if(b.birthday >= a.birthday){
								return 1;
							} else return -1;
						}
					});
					
					let source = wrapper.innerHTML,
						fn = Handlebars.compile(source),
						template = fn({list: arr});

					container.innerHTML = template;
					
					resolve();
				}
			})
		});
	}).catch(function(e){
		console.log('Error: ' + e.message);
	});
});