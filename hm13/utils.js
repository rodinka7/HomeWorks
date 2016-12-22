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
    writeFile(fileName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, data, function(error, content) {
                if (error) {
                    reject(error);
                } else {
                    resolve(content)
                }
            });
        });
    },

};