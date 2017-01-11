module.exports = function(coords, address, reviewObj, myMap){
	var reviewsDiv = document.createElement('div');
	if(reviewObj.length > 0){
		reviewObj.forEach((item)=>{
			var div = document.createElement('div');
			div.className = 'popup__main-review';
			div.innerHTML = `<span class="popup__main-name">${item.name}</span>
                    		<span class="popup__main-place">${item.place}</span>
                    		<span class="popup__main-date">${item.date}</span>
                    		<div class="popup__main-text">${item.message}</div>`;
			reviewsDiv.appendChild(div);
		});
	} else {
		reviewsDiv.innerHTML = 'Отзывов пока нет...';
	};

	console.log(reviewsDiv)
	myMap.balloon.open(coords,
		`<div class="popup">
			<div class="popup__header">
	            <span class="popup__header-inner">
	                <i class="fa fa-map-marker popup__header-marker" aria-hidden="true"></i>                
	                <span class="popup__header-text">${address}</span>
	            </span>
	        </div>
	        <div class="popup__main">
	            <div class="popup__main-reviews" id="reviews">
	                ${reviewsDiv.innerHTML}
	            </div>
	            
	            <div class="popup__main-add clearfix">
	                <div class="popup__main-add-header">ВАШ ОТЗЫВ</div>
	                <form name="form" method="POST">
	                    <input type="text" name="name" placeholder="Ваше имя" class="popup__input">
	                    <input type="text" name="place" placeholder="Укажите место" class="popup__input">
	                    <textarea name="message" placeholder="Поделитесь впечатлениями" class="popup__textarea"></textarea>
	                    <button class="btn" id="btn">Добавить</button>
	                </form>
	            </div>
	        </div>
	    </div>`,	   
		{
			closeButton: true
		}
	);
};