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

	let onsubmit = __webpack_require__(2),
		cluster = __webpack_require__(4),
		balloonOpen = __webpack_require__(6),
		start = __webpack_require__(3);

	module.exports = function(){
		ymaps.ready(init);

		function init(){
			let myMap,
				placemarkCoords,
				placemarkAddress,
				reviewObj = [],
				placemarkObj = [];

			start('GET', '../post.json').then((res) => {
				myMap = new ymaps.Map('map', {
					center: [50.45466, 30.5238],
					zoom: 10,
					controls: ['zoomControl', 'fullscreenControl']
				}, {
					searchControlProvider: 'yandex#search'
				});

				myMap.events.add('click', function(event){
					let coords = event.get('coords');
			
					placemarkCoords = [coords[0].toPrecision(6), coords[1].toPrecision(6)];
					 
					function getAddress(coords){
						return ymaps.geocode(coords).then(function(res) {
							var firstGeoObject = res.geoObjects.get(0);
							return firstGeoObject.properties.get('text');
						});
					};

					getAddress(placemarkCoords).then(function(address) {
						placemarkAddress = address;
						balloonOpen(placemarkCoords, placemarkAddress, reviewObj, myMap);
					});
				});

				document.addEventListener('click', function(event){
					onsubmit(event, placemarkObj, reviewObj, myMap, placemarkCoords, placemarkAddress);
				});

				if (res){
					placemarkObj = JSON.parse(res);
					var placemarks = [];
					placemarkObj.forEach(function(item){
						var data = {
							balloonContentHeader: `${item.place}</br><a href="#" class="openMapBallon" data-coords="${item.coords}" data-address="${item.address}">${item.address}</a>`,
							balloonContentBody: item.message,
							balloonContentFooter: item.date,
							place: item.place,
							name: item.name,
							address : item.address, 
							coords: item.coords,
						},
						options = {
							balloonPanelMaxMapArea: 0,
							openBalloonOnClick: false,
							iconColor: '#ff8663'
						};
						
						placemarks.push(new ymaps.Placemark(data.coords, data, options));
					});
					 var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
				        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
				        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
				            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
				            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
				    );

				    var cluster = new ymaps.Clusterer({
				        clusterDisableClickZoom: true,
				        clusterOpenBalloonOnClick: true,
				        // Устанавливаем стандартный макет балуна кластера "Карусель".
				        clusterBalloonContentLayout: 'cluster#balloonCarousel',
				        // Устанавливаем собственный макет.
				        clusterBalloonItemContentLayout: customItemContentLayout,
				        // Устанавливаем режим открытия балуна. 
				        // В данном примере балун никогда не будет открываться в режиме панели.
				        clusterBalloonPanelMaxMapArea: 0,
				        // Устанавливаем размеры макета контента балуна (в пикселях).
				        clusterBalloonContentLayoutWidth: 200,
				        clusterBalloonContentLayoutHeight: 130,
				        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
				        clusterBalloonPagerSize: 5,
				        clusterIconColor: '#ff8663'
				    });

					cluster.add(placemarks);
					
					myMap.geoObjects.add(cluster);
				};

				cluster.events.add('click', function (event){
					var placemark = event.get('target'),
						placemarkObj = placemark.properties.get('geoObjects');
					// если клик по множественной метке то выходим.
					
					if (placemarkObj !== undefined){
						return;
					};
				
					placemarkCoords = placemark.properties.get('coords');
					placemarkAddress = placemark.properties.get('address');
					
					reviewObj.push({
						name: placemark.properties.get('name'),
						place: placemark.properties.get('place'),
						date: placemark.properties.get('balloonContentFooter'),
						message: placemark.properties.get('balloonContentBody')
					});
					
					balloonOpen(placemarkCoords, placemarkAddress, reviewObj, myMap);
				});

				myMap.balloon.events.add('userclose', function(){
					placemarkAddress = placemarkCoords = null;
					reviewObj.length = 0;
				});
			});
		};
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let start = __webpack_require__(3),
		balloonOpen = __webpack_require__(6),
		cluster = __webpack_require__(4);

	module.exports = function(event, placemarkObj, reviewObj, myMap, placemarkCoords, placemarkAddress){
		event.preventDefault();

		let target = event.target;

		if (target.className === 'btn'){
			let form = document.querySelector('form');

			if (form.name.value === '' ||
				form.place.value === '' ||
				form.message.value === ''){
				alert('Заполните все поля формы!');
				return;
			};

			var date = new Date,
				month = date.getMonth() + 1;
				formatDate = date.getFullYear() + '.'+ month + '.' + date.getDate()+ ' ' + date.getHours()+ ':' + date.getMinutes()+ ':' + date.getSeconds();

			var data = {
				name: form.name.value, // имя
				place: form.place.value, // место
				message: form.message.value, // отзыв
				date: formatDate, // дата создания отзыва
				address : placemarkAddress,  // адрес
				coords: placemarkCoords,  // координаты.
			};

			placemarkObj.push(data);
			
			if(reviewObj.length === 0) {
				reviews.innerHTML = '';
			}

			var div = document.createElement('div');
			div.className = 'popup__main-review';
			div.innerHTML = `<span class="popup__main-name">${data.name}</span>
	                		<span class="popup__main-place">${data.place}</span>
	                		<span class="popup__main-date">${data.date}</span>
	                		<div class="popup__main-text">${data.message}</div>`;
			reviews.appendChild(div);

			var myLayout = new ymaps.templateLayoutFactory.createClass(
				'<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
					'<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
					'<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
			);

			var clusterer = new ymaps.Clusterer({
				clusterDisableClickZoom: true,
				clusterOpenBalloonOnClick: true,
				// Устанавливаем стандартный макет балуна кластера "Карусель".
				clusterBalloonContentLayout: 'cluster#balloonCarousel',
				// Устанавливаем собственный макет.
				clusterBalloonItemContentLayout: myLayout,
				// Устанавливаем режим открытия балуна. 
				// В данном примере балун никогда не будет открываться в режиме панели.
				clusterBalloonPanelMaxMapArea: 0,
				// Устанавливаем размеры макета контента балуна (в пикселях).
				clusterBalloonContentLayoutWidth: 200,
				clusterBalloonContentLayoutHeight: 130,
				// Устанавливаем максимальное количество элементов в нижней панели на одной странице
				clusterBalloonPagerSize: 5,
				clusterHideIconOnBalloonOpen: false,
				geoObjectHideIconOnBalloonOpen: false,
				clusterIconColor: '#ff8663'
			});

			var myPlacemark = new ymaps.Placemark(placemarkCoords, {
					balloonContentHeader: data.place + '</br><a href="#" class="openMapBallon" data-coords="' + placemarkCoords + '" data-address="' + placemarkAddress + '">' + placemarkAddress + '</a>',
					balloonContentBody: data.message, // отзыв
					balloonContentFooter: data.date, // дата создания
					place: data.place, // место
					name: data.name, // имя
					address : data.address, 
					coords: data.coords
				}, {
					balloonPanelMaxMapArea: 0,
					openBalloonOnClick: false,
					iconColor: '#ff8663'
				});
			
			clusterer.add(myPlacemark);
			myMap.geoObjects.add(clusterer);
			
			form.reset();

			start('POST', '/', JSON.stringify(placemarkObj)).then((res)=>{
				console.log('Данные отправлены на сервер');
			}, (error) => {
				console.log(error);
			});
		} else if (target.className === 'openMapBallon') {
			// получить адрес и координаты из data атрибутов.
			placemarkAddress = target.getAttribute('data-address');
			placemarkCoords = target.getAttribute('data-coords').split(',');
			
			// пробегать по массиву geoObjects и отбирать нужные отзывы по определенному адресу.
			reviewObj = placemarkObj.filter(function(item) {
				return item.address === placemarkAddress;
			});
			
			balloonOpen(placemarkCoords, placemarkAddress, reviewObj, myMap);
		};
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(method, url, data) {
		return new Promise(function(resolve, reject){
			let xhr = new XMLHttpRequest();
			
			xhr.open(method, url, true);
			
			xhr.onload = function(){
				if (this.status === 200){
					resolve(this.response)
				} else {
					reject(new Error(this.statusText));
				}
			}

			xhr.onerror = function(){
				reject(new Error('Ошибка сети'));
			}
			
			if (data === undefined){
				xhr.send();
			} else {
				xhr.send(data);
			};
		});
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let balloonLayout = __webpack_require__(5);

	module.exports = function(){
		return new ymaps.Clusterer({
			clusterDisableClickZoom: true,
			clusterOpenBalloonOnClick: true,
			// Устанавливаем стандартный макет балуна кластера "Карусель".
			clusterBalloonContentLayout: 'cluster#balloonCarousel',
			// Устанавливаем собственный макет.
			clusterBalloonItemContentLayout: balloonLayout(),
			// Устанавливаем режим открытия балуна. 
			// В данном примере балун никогда не будет открываться в режиме панели.
			clusterBalloonPanelMaxMapArea: 0,
			// Устанавливаем размеры макета контента балуна (в пикселях).
			clusterBalloonContentLayoutWidth: 200,
			clusterBalloonContentLayoutHeight: 130,
			// Устанавливаем максимальное количество элементов в нижней панели на одной странице
			clusterBalloonPagerSize: 5,
			clusterHideIconOnBalloonOpen: false,
			geoObjectHideIconOnBalloonOpen: false
		});
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(){
		return new ymaps.templateLayoutFactory.createClass(
			'<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
				'<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
				'<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
		);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(coords, address, reviewObj, myMap){
		var reviewsDiv = document.createElement('div');
		if(reviewObj.length > 0){
			reviewObj.forEach((item)=>{
				var div = document.createElement('div');
				div.className = 'popup__main-review';
				div.innerHTML = `<span class="popup__main-name">${item.name}</span>
	                    		<span class="popup__main-place">${item.place}</span>
	                    		<span class="popup__main-date">${item.date}</span>
	                    		<div class="popup__main-text">${item.message}</div>`;
				reviewsDiv.appendChild(div);
			});
		} else {
			reviewsDiv.innerHTML = 'Отзывов пока нет...';
		};

		console.log(reviewsDiv)
		myMap.balloon.open(coords,
			`<div class="popup">
				<div class="popup__header">
		            <span class="popup__header-inner">
		                <i class="fa fa-map-marker popup__header-marker" aria-hidden="true"></i>                
		                <span class="popup__header-text">${address}</span>
		            </span>
		        </div>
		        <div class="popup__main">
		            <div class="popup__main-reviews" id="reviews">
		                ${reviewsDiv.innerHTML}
		            </div>
		            
		            <div class="popup__main-add clearfix">
		                <div class="popup__main-add-header">ВАШ ОТЗЫВ</div>
		                <form name="form" method="POST">
		                    <input type="text" name="name" placeholder="Ваше имя" class="popup__input">
		                    <input type="text" name="place" placeholder="Укажите место" class="popup__input">
		                    <textarea name="message" placeholder="Поделитесь впечатлениями" class="popup__textarea"></textarea>
		                    <button class="btn" id="btn">Добавить</button>
		                </form>
		            </div>
		        </div>
		    </div>`,	   
			{
				closeButton: true
			}
		);
	};

/***/ }
/******/ ]);