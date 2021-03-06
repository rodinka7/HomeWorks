var Model = {
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
};