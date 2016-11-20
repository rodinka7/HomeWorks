'use strict';

(function(){
	var elems = document.getElementsByClassName('header');

	accordeon.onclick =  function(e) {

		var target = e.target,
			btns = document.getElementsByClassName('header'),
			lists = document.getElementsByClassName('inside'),
			triangle = target.firstElementChild.firstElementChild,
			triangleDown = target.firstElementChild.lastElementChild,
			triangles = document.getElementsByClassName('polygon-up'),
			trianglesDown = document.getElementsByClassName('polygon-down'),
			list = target.nextSibling.nextSibling,
			start = Date.now();

		if ((target.getAttribute('class') === 'header') || 
			(target.getAttribute('class') === 'header gray')) {

			for (var i = 0; i < btns.length; i++) {

				btns[i].id = '';
				triangles[i].style.display = 'none';
				trianglesDown[i].style.display = 'block';
			};

			target.id = 'active';
			triangleDown.style.display = 'none';
			triangle.style.display = 'block';

			var timer = setInterval(function() {

				var timePassed = Date.now() - start;

				slideUp(timePassed);

				slide(timePassed);

				if (timePassed >= 500) {
					clearInterval(timer);
					return;
				}

			}, 20);

			function slide(timePassed) {

				list.style.height = timePassed / 5 + 'px';
			}

			function slideUp(timePassed) {

		    	for (var j = 0; j < lists.length; j++) {
		    		if (lists[j].id === 'before') {

		    			lists[j].style.height = 100 - timePassed / 5 + 'px';
		    		
		    		}
		    	}            	
	    	}

	    	function removeId() {
			    
		    	for (var j = 0; j < lists.length; j++) {
		    		lists[j].id = '';
		    	}	
	    	}

			list.id = 'before';
		}

	}
		

})();