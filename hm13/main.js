var fs = require('fs');
var utils = require('./utils.js');
var http = require('http');
var path = require('path');
var config = require('./config.json');

var server = http.createServer(function(req, res) {
    // req - запрос от браузер
    // res - ответ сервера
    var url = req.url;

    if (url == '/') {
        url += config.defaultPage;
    }

    var target = './public' + url;
    var code = 200;

    console.log('поступил запрос', url);

    if (!fs.existsSync(target)) {
        target = `./public/${config.page404}`;
        code = 404;
    }

    var ext = path.extname(target);
    var mimeType = config.mime[ext].type;
    var encoding = config.mime[ext].encoding;

    utils.readFile(target, encoding)
        .then(content => {
            res.setHeader('Content-Type', `${mimeType}; charset=utf-8`);
            res.writeHead(code);
            res.write(content);
            res.end();
        });

    req.on('data', function(data){
        utils.writeFile(target, data)
            .then(content => {
                res.setHeader('Content-Type', `${mimeType}; charset=utf-8`);
                res.writeHead(code);
                res.write(content);
                res.end();
            });

    });
});

server.listen(8888);
