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

let comments = (photos) => {
    return Model.getComments().then(function(comments){ 
        photos.forEach(function(item){
            if(item.comments.count == 0) {
                item.comments.mess = 'К этому фото нет комментариев!';
            } else {
                item.comments.message = [];
                comments.forEach(function(jtem){
                    if (item.pid === jtem.pid){
                        var obj = {};
                        obj.date = jtem.date;
                        obj.message = jtem.message;

                        return Model.getUsers(jtem.from_id).then(function(user){
                            obj.photo = user[0].photo_50;
                            obj.name = user[0].first_name;
                            obj.last = user[0].last_name;
                            item.comments.message.push(obj);
                        });
                    }
                });
            }
        });
    })
};

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
