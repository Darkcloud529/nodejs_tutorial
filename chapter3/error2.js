const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdef.js', (err) => {
        if(err) {
            console.error(err);
        }
    });
}, 1000);