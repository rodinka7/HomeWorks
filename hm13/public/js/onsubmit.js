let start = require('./start.js'),
	balloonOpen = require('./balloonOpen.js'),
	cluster = require('./cluster.js');

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