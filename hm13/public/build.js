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

	var map = __webpack_require__(1);

	map();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let balloon = __webpack_require__(3),
		onsubmit = __webpack_require__(4),
		start = __webpack_require__(5);

	module.exports = function(){
		let myMap,
			myPlacemark,
			result = [],
			element;

		ymaps.ready(init);

		function init(){
			myMap = new ymaps.Map('map', {
				center: [50.45466,30.5238],
				zoom: 10,
				controls: ['zoomControl', 'fullscreenControl']
			}, {
				searchControlProvider: 'yandex#search'
			});

			start().then((res) => {
				if(res.length){
					result = JSON.parse(res)

					result.forEach((item) => {
						myPlacemark = createPlacemark(item.coords, result.length, item.place);
						myMap.geoObjects.add(myPlacemark);
					});
				}
			});

			myMap.events.add('click', function(e){
				coords = e.get('coords');
				
				result = JSON.parse(res);

				myPlacemark = balloon(coords, myMap, result.length, result[0].place);
				myPlacemark.balloon.open();
				myMap.geoObjects.add(myPlacemark);
				
			});

		}
	};

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = function(coords, myMap, count, place){
	    return new ymaps.Placemark(coords, {
	        balloonContentBody: [
	            `<div class="popup__header">
	                <span class="popup__header-inner">
	                    <i class="fa fa-map-marker popup__header-marker" aria-hidden="true"></i>
	                    <script type="text/x-handlebars-template" id="place">
	                        {{#each list}}
	                        <span>{{place}}</span>
	                        {{/each}}
	                    </script>
	                    
	                    <span class="popup__header-text">

	                    </span>
	                </span>
	            </div>
	            <div class="popup__main">
	                <div class="popup__main-reviews">
	                    Пока отзывов нет ...
	                </div>
	                <script type="text/x-handlebars-template" id="review">
	                    {{#each list}}
	                    <div class="popup__main-review">
	                        <span class="popup__main-name">{{name}}</span>
	                        <span class="popup__main-place">{{place}}</span>
	                        <span class="popup__main-date">{{date}}</span>
	                        <div class="popup__main-text">{{message}}</div>
	                    </div>
	                    {{/each}}
	                </script>
	                <div class="popup__main-add clearfix">
	                    <div class="popup__main-add-header">ВАШ ОТЗЫВ</div>
	                    <form name="form" method="POST">
	                        <input type="text" name="name" placeholder="Ваше имя" class="popup__input">
	                        <input type="text" name="place" placeholder="Укажите место" class="popup__input">
	                        <textarea name="message" placeholder="Поделитесь впечатлениями" class="popup__textarea"></textarea>
	                        <button class="btn" id="btn">Добавить</button>
	                    </form>
	                </div>
	            </div>`
	        ].join('')
	    }, {
	        iconColor: '#ff8663',
	        iconContent: count,
	        hintContent: place
	    });
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(){
		return new Promise(function(resolve){
			let result = [];

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
				result = JSON.parse(res);
				
				let source = review.innerHTML,
					source2 = place.innerHTML,
					fn = Handlebars.compile(source),
					fn2 = Handlebars.compile(source2);
				
				document.querySelector('.popup__main-reviews').innerHTML = fn({list: result}); 
				document.querySelector('.popup__header-text').innerHTML = fn2({list: result}); 
			};

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
					handlebar(res);
					document.forms.form.reset();
					resolve(res);
				})
			})
		});
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function() {
		return new Promise(function(resolve){
			let result = [];

			function requestGet(){
				return new Promise(function(resolve){
					let xhr = new XMLHttpRequest();
					xhr.open('GET','post.json');
					xhr.send();
					xhr.onload = function(){
						console.log(xhr.response)
						resolve(xhr.response);
					}
				});
			};

			function handlebar(res){
				result = JSON.parse(res);
				
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
					resolve(res);
				}
			});
		});
	}

/***/ }
/******/ ]);