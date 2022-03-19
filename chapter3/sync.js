const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readtext.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readtext.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readtext.txt');
console.log('3번', data.toString());
console.log('끝');

//서버 초기화할 때 이런 방식으로 코딩을 한다!
