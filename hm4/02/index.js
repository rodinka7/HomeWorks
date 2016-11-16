'use strict';
var container = document.querySelector('#container'),
	childrenBefore = container.childNodes;

console.log(childrenBefore);

function deleteTextNodes(elem){
	var children = elem.childNodes;

	for (var child of children) {
		if (child.nodeType === 3) {
			elem.removeChild(child);
		}
	}

	console.log(children)
}

deleteTextNodes(container);