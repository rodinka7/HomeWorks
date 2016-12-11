(function(){

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

			VK.Auth.getLoginStatus(function(response){
				if (response.status !== 'connected') {
					VK.Auth.login(function(response, reject){
						if(response.session){
							console.log('Подключение прошло успешно!');
							resolve();
						} else {
							console.log(new Error('Что-то пошло не так!'));
							reject();
						}
					}, 2);
				} else resolve();
			})
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
	}).then(function(result){
		if (localStorage.getItem('listLeft')) {
			var a = JSON.parse(localStorage.listLeft),
				b = JSON.parse(localStorage.listRight);
		}

		let res = a || result,
			newList = b || [],
			script = document.getElementById('friendsList'),
			script1 = document.getElementById('friendsListNew'),
			list = document.getElementById('list'), 
			list1 = document.getElementById('listNew'), 
			content = document.getElementById('content'),
			source = script.innerHTML,
			source1 = script1.innerHTML,
			fn = Handlebars.compile(source),
			fn1 = Handlebars.compile(source1),
			template = fn({list: res}),
			template1 = fn1({list: newList}),
			i = newList.length || 0;
		
		list.innerHTML = template;
		list1.innerHTML = template1;

		content.addEventListener('input', function(e){
			var target = e.target;

			if(target.classList.contains('search__input')){
				if (!target.classList.contains('right')) {
					search(target, res, list, script);
				} else {
					let source = script1.innerHTML;
					search(target, newList, list1, script1);
				}
			}
		});

		content.onmousedown = function(e){
			var listRight = document.querySelector('.content__right'),
				x = listRight.offsetLeft,
				target;

			if ((e.target.tagName === 'IMG')) {
				target = e.target.parentNode.parentNode;
			} else if (e.target.classList.contains('content__list-name')) {
				target = e.target.parentNode;
			} else if (e.target.classList.contains('add') ||
				e.target.classList.contains('remove') ) {
					target = e.target.parentNode.parentNode;
			} else if (e.target.classList.contains('content__list-item')) {
				target = e.target;
			}

			if (target) {
				target.onmousemove = function(e){
					target.style.position = 'absolute';
					target.style.zIndex = '1000';
					move(e, target);
				};

				target.onmouseup = function(e){
					if ((parseInt(target.style.left) > x) && (!target.classList.contains('content__list-item_new'))) {
						newList = createList(createArr(i, target), source1, list1);
						res = deleteFriend(res, list, target, source);
						i++;
					} else if ((parseInt(target.style.left) < x) && (target.classList.contains('content__list-item_new'))) {
						deleteAdd(target);
						i--;
					} else {
						this.style.position = 'static';
						this.style.transform = 'translate(0, 0)';
					}
					this.onmousemove = null;
				}
			}
		};

		content.addEventListener('click', function(e){
			let target = e.target;
				li = target.parentNode.parentNode;

			if (target.classList.contains('remove')) {				
				deleteAdd(li);
				i--;

			} else if (target.classList.contains('add')) {
				newList = createList(createArr(i, li), source1, list1);
				res = deleteFriend(res, list, li, source);
				i++;
			}
		});

		let move = (e, target) => {
				target.style.top = e.pageY + 'px';
				target.style.left = e.pageX + 'px';
				target.style.transform = 'translate(-50%, -50%)';
			};

		let createArr = (i, target) => {
			newList[i] = {};
			newList[i].photo_50 = target.firstElementChild.children[0].getAttribute('src');
			newList[i].first_name = target.children[1].textContent.split(' ')[0];
			newList[i].last_name = target.children[1].textContent.split(' ')[1];
			newList[i].uid = target.id;
			return newList;
		};

		let createList = (array, source, list) => {
			var fn = Handlebars.compile(source);

			template = fn({list: array});
			list.innerHTML = template;

			return array;
		};

		let search = (target,res,list,script) => {
			var val = target.value,
				source = script.innerHTML,
				fn = Handlebars.compile(source),
				ul = target.parentNode.parentNode.parentNode.children[2].children[1].firstElementChild;
			
			res = res.filter(function(item){
				return item.first_name.indexOf(val)>=0 || 
				item.first_name.toLowerCase().indexOf(val)>=0 ||
				item.last_name.indexOf(val)>=0 || 
				item.last_name.toLowerCase().indexOf(val)>=0;
			});

			if (ul) list.removeChild(ul);
			
			template = fn({list: res});
			list.innerHTML = template;

			return res;
		}

		let deleteFriend = (res,list,target,source) => {
			res = res.filter(function(item){
				return +item.uid !== +target.id;
			});
			
			fn = Handlebars.compile(source);

			template = fn({list: res});
			list.innerHTML = template;

			return res;
		}

		let deleteAdd = (target) => {
			newList = deleteFriend(newList, list1, target, source1);

			let obj = {
				uid: target.id,
				first_name: target.children[1].textContent.split(' ')[0],
				last_name: target.children[1].textContent.split(' ')[1],
				photo_50: target.firstElementChild.children[0].getAttribute('src'),
			}

			res.push(obj);
			res = createList(res, source, list);
		}
		document.querySelector('.btn').addEventListener('click', function(e){
			e.preventDefault();
			localStorage.setItem('listLeft', JSON.stringify(res));
			localStorage.setItem('listRight', JSON.stringify(newList));
			alert('Изменения сохранены!');
		});
	});
})();