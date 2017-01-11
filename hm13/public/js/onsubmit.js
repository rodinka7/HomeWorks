let start = require('./start.js'),
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

		console.log(data)
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

		var myPlacemark = new ymaps.Placemark( placemarkCoords, {
				balloonContentHeader: data.place + '</br><a href="#" class="openMapBallon" data-coords="' + placemarkCoords + '" data-address="' + placemarkAddress + '">' + placemarkAddress + '</a>', // плюс сюда адрес ссылкой вставить.
				balloonContentBody: data.message, // отзыв
				balloonContentFooter: data.date, // дата создания
				place: data.place, // место
				name: data.name, // имя
				address : data.address, 
				coords: data.coords
			}, {
				balloonPanelMaxMapArea: 0,
				openBalloonOnClick: false
			},{
				iconColor: '#ff8663'
			});

		cluster().add(myPlacemark);
		
		myMap.geoObjects.add(cluster());
		
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
		
		balloonOpen(placemarkCoords, placemarkAddress, reviewObj);
	};
};