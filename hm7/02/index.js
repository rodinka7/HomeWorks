'use strict';
for (let i = 0; i < 3; i++){
	document.cookie = `cookie${i}=cookieName${i}`;
}

let cookies = document.cookie.split(';'),
	arr = cookies.map(function(item){ return item.split('='); });

arr.forEach(function(item){
	var row = document.createElement('tr');
	row.innerHTML = `<td>${item[0]}</td><td>${item[1]}</td><td><button>Удалить</button></td>`;

	table.appendChild(row);
});

table.addEventListener('click', function(e){
	if (e.target.tagName === 'BUTTON') {
		deleteCookie(e.target);
	}
});

let deleteCookie = (e)=>{
	let parent = e.parentNode.parentNode, 
		name = parent.firstElementChild.textContent,
		answer = confirm(`Вы действительно хотите удалить ${name}?`);

	if(answer){
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';

		table.removeChild(parent);
	}
}

submit.addEventListener('click', function(e){
	e.preventDefault();
	
	let inputArr = document.querySelectorAll('input'),
		form = document.forms.form,
		p = new Promise(function(resolve,reject){
			let empty = [].some.call(inputArr, function(item){
				return !item.value.length;
			});

			if(empty){
				alert('Все поля формы должны быть заполнены!');
				reject();
			}

			resolve();
		});

		p.then(function(){
			let cookieName = form.name.value,
				val = form.val.value,
				expire = +form.expire.value,
				d = new Date(),
				el = document.createElement('tr');

			if (!isNaN(expire)){
				el.innerHTML=`<td>${cookieName}</td><td>${val}</td><td><button>Удалить</button></td>`;
				table.appendChild(el);
			
				d.setDate(d.getDate() + expire);
				
				document.cookie = `${cookieName}=${val}; expires=${d.toUTCString()}`;
			} else {
				alert('Введите количество дней жизни cookie цифрами');
			}

			form.reset();
		})
})