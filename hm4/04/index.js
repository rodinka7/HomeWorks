var nodeCount = 0,
	tagCount = 0,
	res = {},
	tags = ['A','P','DIV','INPUT','FORM','BR','SPAN','SECTION','ARTICLE','LABEL','BUTTON','SCRIPT','HEADER','IMG','SVG'],
	prop,
	classes = [];

function findClass(elem){
	if(elem.classList.length) {
		for (var item of elem.classList) {
			for (var i = 0; i < classes.length; i++) {
				
				if (item !== classes[i]) {
				} else break;
			}
			classes[i] = item;
		}
	}

	return classes;
}

function classCompare(elem) {
	for (var classs of classes) {
		for (var item of elem.classList) {
			if (item === classs) {

				prop = "Класс " + item;
				
				if (prop in res){
					tagCount = res[prop];
				} else tagCount = 0;

				Object.defineProperty(res, "Класс " + item, {
					enumerable: true,
					writable: true,
					value: ++tagCount
				});
			}
		}
	}

	return res;
}

function findTag(elem){

	for (var tag of tags) {

		if (elem.tagName === tag) {

			prop = "Тег " + elem.tagName;
			
			if (prop in res){
				tagCount = res[prop];
			} else tagCount = 0;

			Object.defineProperty(res, "Тег " + elem.tagName, {
				enumerable: true,
				writable: true,
				value: ++tagCount
			});
		}
	}

	return res;
}

function scan(elem) {
	var elements = elem.childNodes;

	for (var element of elements) {
		if (element.nodeType === 3) {
			nodeCount++;
		} else {
			findTag(element);
			findClass(element);
			classCompare(element);
		}	
	}

	/* Recursion */
	for (var element of elements) {
		if (element.childNodes.length) {
			scan(element);
		}
	}

	Object.defineProperty(res, 'Количество текстовых узлов', {
		enumerable: true,
		writable: true,
		value: nodeCount //21
	});

	return res;
}

function scanDom() {
	var body = document.querySelector('body'),
		result = scan(body);

	for (var key in result) {
		console.log(key + ' = ' + result[key]);
	}
}

scanDom();