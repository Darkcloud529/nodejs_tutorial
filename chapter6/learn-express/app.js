const express = require('express');
const path = require('path');
const app = express();

// 작성할 때 순서가 중요합니다. 
// 위에서부터 아래로 진행됩니다!
app.set( 'port', process.env.PORT || 3000);

app.use((req,res,next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next(); // 다음 라우터 중에 일치하는 것을 실행함.
});

// 라우터 매개 변수 설정
// app.get('/category/:name', (req,res) => {
//     res.send(`hello ${req.params.name}`);
// });

// 모든 get 요청 주소에 실행한다는 뜻
// app.get('*', (req,res) => {
//     res.send('hello everybody');
// });

app.get('/', (req,res, next) => {
    //res.send('Hello, Express');
    console.log('GET / 요청에서만 실행됩니다.');
    next();
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈 포트에서 대기 중');
});