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
		
		let formdata = {},
			elements = document.forms.form.elements;

		[].forEach.call(elements, function(item){
			if(item.value.length){
				formdata[item.name] = item.value;
			}
		});
		formdata.date = new Date();
		
		return new Promise(function(resolve, reject){
			
			let	xhr = new XMLHttpRequest();
			
			xhr.open('POST','/');
			xhr.send(JSON.stringify(formdata));	
			
			xhr.onreadystatechange = function(e){
				if (xhr.readyState === 4){
					resolve(xhr.response);
				}
			}
		}).then(function(res){
			return new Promise(function(resolve){
				let xhr = new XMLHttpRequest();
				xhr.open('GET','post.json');
				xhr.send();
				xhr.onload = function(){
					resolve(xhr.response);
				}
			})			
		}).then(function(res){
			let result = JSON.parse(res);

			let source = review.innerHTML,
				source2 = place.innerHTML,
				fn = Handlebars.compile(source),
				fn2 = Handlebars.compile(source2);
			
			document.querySelector('.popup__main-reviews').innerHTML = fn(result); 
			document.querySelector('.popup__header-text').innerHTML = fn2(result); 
		})
	})

};