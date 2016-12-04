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
		content = document.getElementById('content'),
		source = script.innerHTML,
		fn = Handlebars.compile(source),
		template = fn({list: res}),
		obj = {},
		i = 0;

	list.innerHTML = template;

	content.addEventListener('input', function(e){
		var target = e.target;

		if(target.classList.contains('search__input')){
			if (target.classList.contains('right'))
			var val = e.target.value,
				ul = document.querySelector('.content__list'),
				arr = res.filter(function(item){
				return item.first_name.indexOf(val)>=0 || 
				item.first_name.toLowerCase().indexOf(val)>=0 ||
				item.last_name.indexOf(val)>=0 || 
				item.last_name.toLowerCase().indexOf(val)>=0;
			});

			if(ul) list.removeChild(ul);
	
			template = fn({list: arr});
			list.innerHTML = template;
		}
	});

	content.addEventListener('mousedown', function(e){
		var target = e.target;
		if(target.classList.contains('content__list-item')){
			target.onmousemove = function(e){
				let obj = createObj(),
					script = document.getElementById('friendsListNew'),
					list = document.getElementById('listNew'), 
					source = script.innerHTML,
					fn = Handlebars.compile(source),
					template = fn({list: obj});

				list.innerHTML = template;

				target.style.position = 'absolute';
				move(e);




			};

			target.onmouseup = function(e){
				this.onmousemove = null;
			}
		}
		var move = (e) => {
			target.style.top = e.clientY + 'px';
			target.style.left = e.clientX + 'px';
			target.style.transform = 'translate(-50%, -50%)';
		}

		var createObj = () => {
			obj[i] = {};
			obj[i].img = target.firstElementChild.children[0].getAttribute('src');
			obj[i].name = target.children[1].textContent;

			return obj;
		}


		i++;
	});



	
	
})