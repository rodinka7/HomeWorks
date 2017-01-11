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
						coords: item.coords
					},
					options = {
						balloonPanelMaxMapArea: 0,
						openBalloonOnClick: false
					};
					
					placemarks.push(new ymaps.Placemark(data.coords, data, options));
				});

				cluster().add(placemarks);
				
				myMap.geoObjects.add(cluster());
			};

			cluster().events.add('click', function (event){
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