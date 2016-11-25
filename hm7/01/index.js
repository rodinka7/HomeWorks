'use strict';
for (let i = 0; i < 10; i++){
	document.cookie = `cookie${i}=cookieName${i}`;
}

let cookies = document.cookie.split(';');

for (let item of cookies) {
	var c = item.split('='),
		row = document.createElement('tr');

	row.innerHTML = `<td>${c[0]}</td><td>${c[1]}</td><td><button>Remove</button></td>`;

	table.appendChild(row);
}

table.addEventListener('click', function(e){
	if (e.target.tagName === 'BUTTON') {
		deleteCookie(e.target);
	}
});

let deleteCookie = (e)=>{
	let name = e.parentNode.previousElementSibling.previousElementSibling.textContent,
		answer = confirm(`Do you really want to remove ${name}?`);

	if(answer){
    
		document.cookie = `${name}=''; expires=d.toUTCString()`;
		console.log(document.cookie);
	}
}