'use strict';
var container = document.querySelector('#container'),
	childrenBefore = container.childNodes,
	btn = document.getElementById('button');

console.log(childrenBefore);

function deleteTextNodes(elem){
	var children = elem.childNodes;

	for(var child of children) {
		
		if (child.nodeType === 3) {
			elem.removeChild(child);
		} 
	}

	for(var child of children) {
		if (child.childNodes.length) {
			deleteTextNodes(child);
		}
	}
}

btn.addEventListener('click', function(){
	deleteTextNodes(container);
});