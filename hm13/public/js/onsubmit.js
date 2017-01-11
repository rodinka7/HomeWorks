let start = require('./start.js');

module.exports = function(coords){
	return new Promise(function(resolve){
		let result = [];

		start().then((res)=>{
			result = JSON.parse(res);
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
			formdata.coords = coords;

			console.log(formdata)
			result.push(formdata);
			
			return new Promise(function(resolve, reject){
				
				let	xhr = new XMLHttpRequest();
				
				xhr.open('POST','/');
				xhr.send(JSON.stringify(result));	
				
				xhr.onreadystatechange = function(e){
					if (xhr.readyState === 4){
						resolve(xhr.response);
					}
				}
			}).then(function(){
				return requestGet();		
			}).then(function(res){
				result = JSON.parse(res);
				handlebar();
				document.forms.form.reset();
				resolve(res);
			})
		})
	});
};