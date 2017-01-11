let onsubmit = require('./onsubmit.js'),
	cluster = require('./cluster.js'),
	balloonOpen = require('./balloonOpen.js'),
	start = require('./start.js');

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