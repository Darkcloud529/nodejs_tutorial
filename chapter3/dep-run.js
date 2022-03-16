// 순환 참조
// dep1의 모듈 exports가 함수가 아니라 빈 객체로 표시 됩니다. 
// 이렇게 순환 참조가 있을 경우에는 순환 참조되는 대상을 빈 객체로 만듭니다. 

const dep1 = require('./dep1');
const dep2 = require('./dep2');

dep1();
dep2();