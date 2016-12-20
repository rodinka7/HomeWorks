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
        localStorage.object = JSON.stringify(photosObj);
        return photosObj; 
    });
};

let filterFn = (photosObj, sort, val) => {
    var obj = {};
    switch (sort) {
        case 'comments':
            for (let item in photosObj){
                if (photosObj[item].comments.count === +val){
                    obj[item] = photosObj[item];
                }
            }
             return obj;
        case 'likes':
            for (let item in photosObj){
                if (photosObj[item].likes.count === +val){
                    obj[item] = photosObj[item];
                }
            }
            return obj;
        case 'reposts':
            for (let item in photosObj){
                if (photosObj[item].reposts.count === +val){
                    obj[item] = photosObj[item];
                }
            }
            return obj;
        case 'date':
            var regexp = /^\d{2}.\d{2}.\d{4}$/;
            if (regexp.test(val)) {
                var valDate = val.split('.');

                for (let item in photosObj){
                    var objDate = new Date(photosObj[item].created * 1000);
                    if ((objDate.getDate() === +valDate[0]) &&
                        (objDate.getMonth()+1 === +valDate[1]) &&
                        (objDate.getFullYear() === +valDate[2])) {
                        obj[item] = photosObj[item];
                    }
                }
                return obj;
            };

    }
};

let sortFn = (val) => {
    let obj = JSON.parse(localStorage.object),
    arr = [];
   
    for (let item in obj) {
        arr.push(obj[item]);
    }
    switch (val) {
        case 'comments':
            arr.sort(function(a,b){
                return b.comments.count - a.comments.count;
            });   
        case 'likes':
            arr.sort(function(a,b){
                return b.likes.count - a.likes.count;
            });
        case 'reposts':
            arr.sort(function(a,b){
                return b.reposts.count - a.reposts.count;
            });
        case 'date':
    }
    console.log(arr)
    return arr;
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

results.addEventListener('change', function(e){
    var val = e.target.value;
    sortFn(val).then(function(photos){
        console.log(photos)
        innerDiv.innerHTML = View.render('photos', {list: photos});
    })
    /*return sortFn(val).then(function(photos){
        results.innerHTML = View.render('photos', {list: photos});
    })*/     
                    /*if (e.target.classList.contains('button')){
                        e.preventDefault();
                        var form = document.forms.form, 
                            sort,
                            val; 
                        if (form.comments.value){
                            sort = form.comments.id;
                            val = form.comments.value;
                        } else if (form.likes.value) {
                            sort = form.likes.id;
                            val = form.likes.value;
                        } else if (form.reposts.value) {
                            sort = form.reposts.id;
                            val = form.reposts.value;
                        } else if (form.date.value) {
                            sort = form.date.id;
                            val = form.date.value;
                        };
                        var obj = filterFn(photos, sort, val);
                        console.log(obj)
                        results.innerHTML = View.render('photos', {list: obj});       
                    }*/
});