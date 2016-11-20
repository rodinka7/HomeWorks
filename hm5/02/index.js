'use strict';
(function(){
	let wrapper = document.querySelector('.wrapper'),
		x,
		y;

	wrapper.addEventListener('click', function(e){
		if (e.target.classList.contains('btn')){
			var div = document.createElement('div');

			let randomColor = () => {
				var letters = '0123456789ABCDEF'.split(''),
					color = '#';

				for (var i = 0; i < 6; i++) {
					color += letters[Math.round(Math.random()*15)];
				}
				return color;
			}

			div.style.position = 'absolute';
			div.style.height = '50px';
			div.style.width = '100px';
			div.style.background = randomColor();
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
		}
	});
})();