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
    let photosObj = {};
    photos.forEach(item => {
      photosObj[item.pid] = item;
    })

    return Promise.all(
        photos.filter(item => item.comments.count).map(function(item){
            return Model.getComments(item.pid).then(function(comments){
                photosObj[item.pid].comments = comments;
            });
        })
    ).then(() => {
        for (let item in photosObj){
            let comments = photosObj[item].comments;

            if (!comments.count) {
                photosObj[item].text = 'К этому фото нет комментариев!';
            } else {
                comments.items.forEach(function(itemItem){
                    comments.profiles.forEach(function(itemProfile){
                        if (itemItem.from_id === itemProfile.id) {
                            itemItem.first_name = itemProfile.first_name;
                            itemItem.last_name = itemProfile.last_name;
                            itemItem.photo = itemProfile.photo;
                        }
                    })    
                })
            }
        }
        results.addEventListener('input', function(e){
            if(e.target.classList.contains('input')){
                var val = e.target.value,
                    sort = e.target.id;
                
                if (sort === 'comments'){
                    var obj = {};
                    for (let item in photosObj){
                        if (photosObj[item].comments.count === +val){
                            obj[item] = photosObj[item];
                        }
                    }
                     console.log(obj)
                } else if (sort === 'likes'){
                    var obj = {};
                    for (let item in photosObj){
                        if (photosObj[item].likes.count === +val){
                            obj[item] = photosObj[item];
                        }
                    }
                    photosObj = obj;
                } else if (sort === 'reposts'){
                    var obj = {};
                    for (let item in photosObj){
                        if (photosObj[item].likes.count === +val){
                            obj[item] = photosObj[item];
                        }
                    }
                    console.log(obj)
                } else if (sort === 'date'){
                    var regexp = /^\d{2}.\d{2}.\d{4}$/;
                    if (regexp.test(val)) {
                        var obj = {},
                            valDate = val.split('.');

                        for (let item in photosObj){
                            var objDate = new Date(photosObj[item].created * 1000);
                            if ((objDate.getDate() === +valDate[0]) &&
                                (objDate.getMonth()+1 === +valDate[1]) &&
                                (objDate.getFullYear() === +valDate[2])) {
                                console.log(objDate.getDate(), objDate.getMonth()+1, objDate.getFullYear())
                                obj[item] = photosObj[item];
                            }
                        }
                        console.log(obj)
                    }
                }
            }
        });
        return photosObj; 
    });
};

results.addEventListener('click', function(e){
    if(e.target.classList.contains('album')){
        let target = e.target;
        return Model.getPhotos(target.id).then(function(photos){
            return comments(photos).then(function(photos){
                results.innerHTML = View.render('photos', {list: photos});
            })
        })
    }
});