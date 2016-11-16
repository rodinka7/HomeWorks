
var container = document.querySelector('#container'),
	newElement = document.createElement('div'),
	btn = document.querySelector('button');

newElement.innerHTML='<a class="link subLink" href="#">Сcылка 4</a>';

document.ready = function() {
	
	removeElement(container, newElement);
}

function prepand(container, elem) {

	var firstChild = container.firstElementChild;

	container.insertBefore(elem, firstChild);
}

function removeElement(container, elem) {
	container.removeChild(elem);
}

btn.addEventListener('click', function(){prepand(container, newElement)});