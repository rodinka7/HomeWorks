let balloon = require('./balloon.js'),
	onsubmit = require('./onsubmit.js'),
	start = require('./start.js');

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