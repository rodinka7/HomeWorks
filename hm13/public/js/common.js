module.exports = function(){
	map.addEventListener('click', function(e){
		if (e.target.tagName === 'YMAPS') {
			popup.style.display = 'block';
			popup.style.left = e.pageX + 'px';
			popup.style.top = e.pageY + 'px';
		}

		if (e.target.classList.contains('popup__header-close')){
			popup.style.display = 'none';
		}
	});

	btn.addEventListener('click', function(e){
		e.preventDefault();
		
		let formdata = new FormData(document.forms.form),
			xhr = new XMLHttpRequest();
		
		xhr.open('POST','../post.json');
		xhr.send(formdata);
	})

};