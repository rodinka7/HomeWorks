'use strict';
(function(){
	let wrapper = document.querySelector('.wrapper'),
		x,
		y,
		obj = {},
		k = 0;

	wrapper.addEventListener('click', function(e){
		if (e.target.classList.contains('divCreate')){
			var div = document.createElement('div');

			let randomColor = () => {
				var letters = '0123456789ABCDEF'.split(''),
					color = '#';

				for (var i = 0; i < 6; i++) {
					color += letters[Math.round(Math.random()*15)];
				}
				return color;
			},
			randomHeight = () => {
				var height = Math.round(Math.random()*250);
				return (height <= 250 && height >= 50) ? height : 250;
			},
			randomWidth = () => {
				var width = Math.round(Math.random()*350);
				return (width <= 350 && width >= 100) ? width : 350;
			},
			randomTop = (height) => {
				return Math.round(Math.random()*(wrapper.clientHeight - height));
			},
			randomLeft = (width) => {
				return Math.round(Math.random()*(wrapper.clientWidth - width));
			}

			obj[`figure${k}`] = {};
			
			div.style.position = 'absolute';
			obj[`figure${k}`].height = div.style.height = randomHeight() + 'px';
			obj[`figure${k}`].width = div.style.width = randomWidth() + 'px';
			div.style.top = randomTop(randomHeight()) + 'px';
			div.style.left = randomLeft(randomWidth())  + 'px';
			obj[`figure${k}`].color = div.style.background = randomColor();
			div.style.cursor = 'pointer'; 

			this.appendChild(div);

			div.addEventListener('mousedown', function(e) {
				this.onmousemove = function(e){
					moveIt(e);
				};

				let moveIt = (e) => {
					x = e.pageX;
					y = e.pageY;

					div.style.top = y + 'px';
					div.style.left = x + 'px';
					div.style.transform = 'translate(-50%,-50%)';
				};

				this.onmouseup = function(e){
					this.onmousemove = null;
				}
			});

			obj[`figure${k}`].top = div.style.top;
			obj[`figure${k}`].left = div.style.left;
			k++;
		};

		if(e.target.classList.contains('save')){
			document.cookie = `cookie=${JSON.stringify(obj)}`;
			alert('Изменения сохранены!')
		}
	});

	window.addEventListener('load', function(){
		let cookie = document.cookie.split('=')[1],
			obj = JSON.parse(cookie);
		for (var item in obj){
			let div = document.createElement('div');

			div.style.position = 'absolute';
			div.style.background = obj[item].color;
			div.style.height = obj[item].height;
			div.style.left = obj[item].left;
			div.style.top = obj[item].top;
			div.style.width = obj[item].width;
			
			wrapper.appendChild(div);
		}
	})
})();