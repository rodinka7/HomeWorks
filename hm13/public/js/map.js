let balloon = require('./balloon.js'),
	onsubmit = require('./onsubmit.js'),
	handlebar = require('./handlebar.js'),
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
				result = JSON.parse(res);				

				result.forEach((item) => {
					myPlacemark = new ymaps.Placemark(item.coords,{
						balloonContentBody: balloon(),
				        iconContent: result.length
					}, {
						iconColor: '#ff8663'
					});

					myMap.geoObjects.add(myPlacemark);

					myPlacemark.balloon.events.add('open', () => {
						handlebar();
					})
				});

			}
		});

		myMap.events.add('click', function(e){			
			return new Promise(function(resolve){
				coords = e.get('coords');

				myPlacemark = new ymaps.Placemark(coords,{
					balloonContentBody: balloon(),
			        iconContent: result.length
				}, {
					iconColor: '#ff8663'
				});

				myMap.geoObjects.add(myPlacemark);
				myPlacemark.balloon.open();
				
				myPlacemark.balloon.events.add('open', () => {
					handlebar();
					resolve();
				})
			}).then(() => {
				onsubmit(coords);
			});
		});

	}
};