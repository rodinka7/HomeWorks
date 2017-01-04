let balloon = require('./common.js'),
	start = require('./start.js');

module.exports = function(){
	let myMap,
		myPlacemark,
		result = [];

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
					myPlacemark = createPlacemark(item.coords, result.count, item.place);
					myMap.geoObjects.add(myPlacemark);
				});
			}
		});

		myMap.events.add('click', function(e){
			let coords = e.get('coords');

			console.log(coords)
			balloon(coords).then((res) => {
				result = JSON.parse(res);

				myPlacemark = createPlacemark(coords, result.length, res[0].place);
				myMap.geoObjects.add(myPlacemark);
			});
		});

		function createPlacemark(coords, count, place) {
	        return new ymaps.Placemark(coords, {
	            iconColor: '#ff8663',
	            iconContent: count,
	            hintContent: place
        	});
	    };

	}
};