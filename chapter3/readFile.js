const fs = require('fs');

fs.readFile('./readtext.txt', (err,data) => {
    if(err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});