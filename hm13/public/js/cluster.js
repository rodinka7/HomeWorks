let balloonLayout = require('./balloon.js');

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