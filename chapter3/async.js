const fs = require('fs');

console.log('시작');
fs.readFile('./readtext.txt', (err,data) => {
    if(err) {
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readtext.txt', (err,data) => {
    if(err) {
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readtext.txt', (err,data) => {
    if(err) {
        throw err;
    }
    console.log('3번', data.toString());
});
console.log('끝');

/// 시작과 끝은 순서대로 찍히고
// 1,2,3번은 랜덤하다!