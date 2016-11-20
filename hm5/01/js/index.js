'use strict';

let accordeon = document.querySelector('.accordeon'),
	current;

accordeon.addEventListener('click', function(e){

	var target = e.target,
		list = target.nextElementSibling,
		svgUp = target.children[0].children[0],
		svgDown = target.children[0].children[1];

	if (target.classList.contains('header')){
		
		if (!target.classList.contains('active')) {
			target.classList.add('active');
			list.classList.add('activeList');
			svgUp.style.display = 'block';
			svgDown.style.display = 'none';

			if (current) {
				current.classList.remove('active');
				current.nextElementSibling.classList.remove('activeList');
				current.children[0].children[0].style.display = 'none';
				current.children[0].children[1].style.display = 'block';
			}

			current = e.target;
		} else {
			target.classList.remove('active');
			list.classList.remove('activeList');
			svgUp.style.display = 'none';
			svgDown.style.display = 'block';
		}
	}
})