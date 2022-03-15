// const value = require('./var');
// const odd = value.odd;
// const even = value.even;
//console.log(value);


// 구조분해 할당 이용

const {odd, even} = require('./var');
//import 문법
//import {odd, even} from './var';

function checkOddOrEven(number) {
    if(number % 2) {
        return odd;
    } else {
        return even;
    }
};

module.exports = checkOddOrEven;
// export 문법
// export default checkOddOrEven;
