// const value = require('./var');
// const odd = value.odd;
// const even = value.even;
//console.log(value);


// 구조분해 할당 이용

const {odd, even} = require('./var');

function checkOddOrEven(number) {
    if(number % 2) {
        return odd;
    } else {
        return even;
    }
};

module.exports = checkOddOrEven;

