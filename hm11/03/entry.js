Handlebars.registerHelper('formatTime', function(time) {
    var minutes = parseInt(time / 60),
        seconds = time - minutes * 60;

    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
});

Handlebars.registerHelper('formatDate', function(ts) {
    return new Date(ts * 1000).toLocaleString();
});

new Promise(function(resolve) {
    window.onload = resolve;
}).then(function() {
    return Model.login(5755700, 2 | 8 | 8192 | 262144 | 4);
}).then(function() {
    return Model.getUser().then(function(users) {
        header.innerHTML = View.render('header', users[0]);
    });
}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});

let comments = (photos) => {
    return new Promise(function(resolve){
        photos.forEach(function(item){
            item.message = [];
            if (item.comments.count > 0) {
                return Model.getComments(item.pid).then(function(comments){
                    comments.items.forEach(function(itemComments){
                        comments.profiles.forEach(function(itemProfiles){
                            if (itemComments.from_id === itemProfiles.id){
                                var arr = [];
                                arr.date = itemComments.date;
                                arr.text = itemComments.text;
                                arr.name = itemProfiles.first_name;
                                arr.last = itemProfiles.last_name;
                                arr.photo = itemProfiles.photo;
                                item.message.push(arr);
                            }
                        })
                    })
                });
            } else {
                item.message.text = 'К этому фото нет комментариев!';
            }
        });
        resolve(photos);
    });
};