module.exports = function(coords, myMap, count, place){
    return new ymaps.Placemark(coords, {
        balloonContentBody: [
            `<div class="popup__header">
                <span class="popup__header-inner">
                    <i class="fa fa-map-marker popup__header-marker" aria-hidden="true"></i>
                    <script type="text/x-handlebars-template" id="place">
                        {{#each list}}
                        <span>{{place}}</span>
                        {{/each}}
                    </script>
                    
                    <span class="popup__header-text">

                    </span>
                </span>
            </div>
            <div class="popup__main">
                <div class="popup__main-reviews">
                    Пока отзывов нет ...
                </div>
                <script type="text/x-handlebars-template" id="review">
                    {{#each list}}
                    <div class="popup__main-review">
                        <span class="popup__main-name">{{name}}</span>
                        <span class="popup__main-place">{{place}}</span>
                        <span class="popup__main-date">{{date}}</span>
                        <div class="popup__main-text">{{message}}</div>
                    </div>
                    {{/each}}
                </script>
                <div class="popup__main-add clearfix">
                    <div class="popup__main-add-header">ВАШ ОТЗЫВ</div>
                    <form name="form" method="POST">
                        <input type="text" name="name" placeholder="Ваше имя" class="popup__input">
                        <input type="text" name="place" placeholder="Укажите место" class="popup__input">
                        <textarea name="message" placeholder="Поделитесь впечатлениями" class="popup__textarea"></textarea>
                        <button class="btn" id="btn">Добавить</button>
                    </form>
                </div>
            </div>`
        ].join('')
    }, {
        iconColor: '#ff8663',
        iconContent: count,
        hintContent: place
    });
};