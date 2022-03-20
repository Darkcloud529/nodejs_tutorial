const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('./abcdef.js');
}, 1000);

// 프로미스의 에러는 catch하지 않아도 알아서 처리합니다
// 다만 프로미스를 사용할 때는 항상 catch를 붙여주는 것을 권장!