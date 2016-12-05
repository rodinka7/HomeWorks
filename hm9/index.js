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
			script1 = document.getElementById('friendsListNew'),
			list = document.getElementById('list'), 
			list1 = document.getElementById('listNew'), 
			content = document.getElementById('content'),
			source = script.innerHTML,
			source1 = script1.innerHTML,
			fn = Handlebars.compile(source),
			template = fn({list: res}),
			arr = [], // для создания массива в функции createArr
			newList = [],   // для фильтрации друзей в правом списке
			i = 0;

		list.innerHTML = template;

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
			var target = e.target,
				listRight = document.querySelector('.content__right'),
				x = listRight.offsetLeft;

			if (target.classList.contains('content__list-item')){
				target.onmousemove = function(e){
					target.style.position = 'absolute';
					target.style.zIndex = '1000';
					move(e, target);
				};

				target.onmouseup = function(e){
					if ((parseInt(target.style.left) > x) && (!target.classList.contains('content__list-item_new'))) {
						newList = createList(createArr(i, target), source1, list1);
						res = deleteFriend(res, list, target, source);
					} else if ((parseInt(target.style.left) < x) && (target.classList.contains('content__list-item_new'))) {
						deleteAdd(target);
					} else {
						this.style.position = 'static';
						this.style.transform = 'translate(0, 0)';
					}
					i++;
					this.onmousemove = null;
				}
			}
		};

		content.addEventListener('click', function(e){
			let target = e.target;
				li = target.parentNode;
				
			if (target.classList.contains('content__list-add_new')) {				
				deleteAdd(li);

			} else if (target.classList.contains('content__list-add')) {
				
				newList = createList(createArr(i, li), source1, list1);
				
				res = deleteFriend(res, list, li, source);

				i++;
			}
		});

		let move = (e, target) => {
				target.style.top = e.clientY + 'px';
				target.style.left = e.clientX + 'px';
				target.style.transform = 'translate(-50%, -50%)';
			};

		let createArr = (i, target) => {
			arr[i] = {};
			arr[i].photo_50 = target.firstElementChild.children[0].getAttribute('src');
			arr[i].first_name = target.children[1].textContent.split(' ')[0];
			arr[i].last_name = target.children[1].textContent.split(' ')[1];
			arr[i].uid = target.id;
			return arr;
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
				ul = target.parentNode.parentNode.parentNode.children[2].children[1].firstElementChild,
				arr = res.filter(function(item){
				return item.first_name.indexOf(val)>=0 || 
				item.first_name.toLowerCase().indexOf(val)>=0 ||
				item.last_name.indexOf(val)>=0 || 
				item.last_name.toLowerCase().indexOf(val)>=0;
			});

			if (ul) list.removeChild(ul);
			
			template = fn({list: arr});
			list.innerHTML = template;

			return arr;
		}

		let deleteFriend = (res,list,target,source) => {
			let arr = res.filter(function(item){
				return +item.uid !== +target.id;
			});
			
			fn = Handlebars.compile(source);

			template = fn({list: arr});
			list.innerHTML = template;

			return arr;
		}

		let deleteAdd = (target) => {
			newList = deleteFriend(newList, list1, target, source1);

			if(!newList.length) {
				arr = [];
			};
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
			console.log(localStorage)	
		});
	});
})();