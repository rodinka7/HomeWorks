/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var map = __webpack_require__(1),
		common = __webpack_require__(2);

	map();
	common();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(){
		let myMap,
			myPlacemark;

		ymaps.ready(init);

		function init(){
			myMap = new ymaps.Map('map', {
				center: [50.45466,30.5238],
				zoom: 10,
				controls: ['zoomControl', 'fullscreenControl']
			}, {
				searchControlProvider: 'yandex#search'
			});
			
			myMap.events.add('click', function(e){
				let coords = e.get('coords');

				myPlacemark = createPlacemark(coords);
				myMap.geoObjects.add(myPlacemark);

	            getAddress(coords);
			});

			function createPlacemark(coords) {
		        return new ymaps.Placemark(coords, {
		            iconColor: '#ff8663'
	        	});
		    };

		    function getAddress(coords) {
		        myPlacemark.properties.set('iconCaption', 'поиск...');
		        ymaps.geocode(coords).then(function (res) {
		            var firstGeoObject = res.geoObjects.get(0);

		            myPlacemark.properties
		                .set({
		                    iconCaption: firstGeoObject.properties.get('name'),
		                    balloonContent: firstGeoObject.properties.get('text')
		                });
	        	});
	    	}
	        

		}
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(){
		let arr = [];

		function requestGet(){
			return new Promise(function(resolve){
				let xhr = new XMLHttpRequest();
				xhr.open('GET','post.json');
				xhr.send();
				xhr.onload = function(){
					resolve(xhr.response);
				}
			});
		};

		function handlebar(res){
			let result = JSON.parse(res);
			console.log(result)
			let source = review.innerHTML,
				source2 = place.innerHTML,
				fn = Handlebars.compile(source),
				fn2 = Handlebars.compile(source2);
			
			document.querySelector('.popup__main-reviews').innerHTML = fn({list: result}); 
			document.querySelector('.popup__header-text').innerHTML = fn2({list: result}); 
		};

		requestGet().then(function(res){
			if (res.length){
				handlebar(res);
			}
		});

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
			
			arr.push(formdata);
			
			return new Promise(function(resolve, reject){
				
				let	xhr = new XMLHttpRequest();
				
				xhr.open('POST','/');
				xhr.send(JSON.stringify(arr));	
				
				xhr.onreadystatechange = function(e){
					if (xhr.readyState === 4){
						resolve();
					}
				}
			}).then(function(){
				return requestGet();		
			}).then(function(res){
				handlebar(res);
			})
		})

	};

/***/ }
/******/ ]);