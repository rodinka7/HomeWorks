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