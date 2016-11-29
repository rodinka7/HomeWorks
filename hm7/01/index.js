'use strict';
for (let i = 0; i < 10; i++){
	document.cookie = `cookie${i}=cookieName${i}`;
}

let cookies = document.cookie.split(';'),
	arr = cookies.map(function(item){ return item.split('='); });

arr.forEach(function(item){
	var row = document.createElement('tr');
	row.innerHTML = `<td>${item[0]}</td><td>${item[1]}</td><td><button>Remove</button></td>`;

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
		answer = confirm(`Do you really want to remove ${name}?`);

	if(answer){
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';

		table.removeChild(parent);
	}
}