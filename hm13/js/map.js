module.exports = function(){
	let myMap;

	ymaps.ready(init);

	function init(){
		myMap = new ymaps.Map('map', {
			center: [50.45466,30.5238],
			zoom: 10
		}, {
			searchControlProvider: 'yandex#search'
		});
	}
};