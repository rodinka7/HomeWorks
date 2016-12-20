/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let Model = __webpack_require__(1),
	    View = __webpack_require__(2),
	    Router = __webpack_require__(3);
	    
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
	            break; 
	        case 'likes':
	            arr.sort(function(a,b){
	                return b.likes.count - a.likes.count;
	            });
	            break;
	        case 'reposts':
	            arr.sort(function(a,b){
	                return b.reposts.count - a.reposts.count;
	            });
	            break;
	        case 'date':
	            arr.sort(function(a,b){
	                return b.created - a.created;
	            });
	    }
	    return arr;
	};

	tabs.addEventListener('click', function(e){
	    let target = e.target;

	    if (target.dataset.route){
	        Router.handle(target.dataset.route)
	    }
	});

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
	    var val = e.target.value,
	        sort = sortFn(val);

	    innerDiv.innerHTML = View.render('sort', {list: sort});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	    login: function(appId, perms) {
	        return new Promise(function(resolve, reject) {
	            VK.init({
	                apiId: appId
	            });
	            VK.Auth.getLoginStatus(function(response){
	                if(response.status === 'connected') {
	                    resolve(response);
	                } else {
	                    VK.Auth.login(function(response) {
	                        if (response.session) {
	                            resolve(response);
	                        } else {
	                            reject(new Error('Не удалось авторизоваться'));
	                        }
	                    }, perms);  
	                }
	            })            
	        });
	    },
	    callApi: function(method, params) {
	        return new Promise(function(resolve, reject) {
	            VK.api(method, params, function(response) {
	                if (response.error) {
	                    reject(new Error(response.error.error_msg));
	                } else {
	                    resolve(response.response);
	                }
	            });
	        });
	    },
	    getUser: function() {
	        return this.callApi('users.get', {name_case: 'gen'});
	    },
	    getMusic: function() {
	        return this.callApi('audio.get', {});
	    },
	    getFriends: function() {
	        return this.callApi('friends.get', { fields: 'photo_100, photo_50' });
	    },
	    getNews: function() {
	        return this.callApi('newsfeed.get', { filters: 'post', count: 20 });
	    },
	    getGroups: function() {
	        return this.callApi('groups.get', {});
	    },
	    getPhotos: function(id) {
	        return this.callApi('photos.get', {album_id: id, extended: 1});
	    },
	    getComments: function(id) {
	        return this.callApi('photos.getComments', {photo_id: id, extended: 1, v: 5.0});
	    },
	    getAlbums: function() {
	        return this.callApi('photos.getAlbums', {need_covers: 1});
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	    render: function(templateName, model) {
	        templateName = templateName + 'Template';

	        var templateElement = document.getElementById(templateName),
	            templateSource = templateElement.innerHTML,
	            renderFn = Handlebars.compile(templateSource);
	        return renderFn(model);
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	let Controller = __webpack_require__(4);

	module.exports = {
	    handle: function(route) {
	        var routeName = route + 'Route';

	        Controller[routeName]();
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let Model = __webpack_require__(1),
	    View = __webpack_require__(2);

	module.exports = {
	    musicRoute: function() {
	        return Model.getMusic().then(function(music) {
	            results.innerHTML = View.render('music', {list: music});
	        });
	    },
	    friendsRoute: function() {
	        return Model.getFriends().then(function(friends) {
	            results.innerHTML = View.render('friends', {list: friends});
	        });
	    },
	    newsRoute: function() {
	        return Model.getNews().then(function(news) {
	            results.innerHTML = View.render('news', {list: news.items});
	        });
	    },
	    groupsRoute: function() {
	        return Model.getNews().then(function(groups) {
	            results.innerHTML = View.render('groups', {list: groups.groups});
	        });
	    },
	    photosRoute: function() {
	        return Model.getAlbums().then(function(albums) {
	            results.innerHTML = View.render('albums', {list: albums});
	        });
	    }
	}

/***/ }
/******/ ]);