var fs = require('fs');

module.exports = {
    readFile(fileName, encoding) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, encoding, function(error, content) {
                if (error) {
                    reject(error);
                } else {
                    resolve(content)
                }
            });
        });
    },
    writeFile(fileName, data, encoding) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, data, encoding, function(error, content) {
                if (error) {
                    reject(error);
                } else {
                    resolve(content)
                }
            });
        });
    },
    readPost(req) {
        return new Promise((resolve,reject)=>{
            var post = '';
        
            req.on('data', (chunk) => {
                post +=chunk;
            });

            req.on('end', ()=>{
                resolve(post);
            });

            req.on('error', ()=>{
                reject();
            });
        });
    }
};