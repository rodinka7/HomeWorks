module.exports = function(){
	let source = review.innerHTML,
		source2 = place.innerHTML,
		fn = Handlebars.compile(source),
		fn2 = Handlebars.compile(source2);
	
	document.querySelector('.popup__main-reviews').innerHTML = fn({list: result}); 
	document.querySelector('.popup__header-text').innerHTML = fn2({list: result}); 
};