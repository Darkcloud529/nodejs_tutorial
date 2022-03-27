const express = require('express');
const path = require('path');
const app = express();

// 작성할 때 순서가 중요합니다. 
// 위에서부터 아래로 진행됩니다!
// 범위가 넓은 미들웨어는 뒤쪽으로 이동
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

// 미들웨어는 연달아서 사용할 수 있다. 
// app.use((req,res,next) => {
//     console.log('1 요청에 다 실행됩니다.');
//     next(); 
// },(req,res,next) => {
//     console.log('2 요청에 다 실행됩니다.');
//     next(); 
// },(req,res,next) => {
//     console.log('3 요청에 다 실행됩니다.');
//     next(); 
// });

app.get('/', (req,res) => {
    // 요청 한번에 응답을 한 번만 보내야한다. 
    // 그런데 아래코드첢 요청 한번에 응답을 3번(sendFile, send, json)을 보내려 하면 아래와 같은 에러가 발생한다. 
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    res.sendFile(path.join(__dirname, 'index.html'));
    res.send('안녕하세요.');
    res.json({hello:'zerocho'});
    // 이미 응답을 보내고 난 후 writeHead()를 쓰면 똑같이 에러가 발생합니다. 
    res.writeHead()
});

app.get('/', (req,res, next) => {
    //res.send('Hello, Express');
    console.log('GET / 요청에서만 실행됩니다.');
    next();
},(req,res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.use((err,req,res,next) => {
    console.log(err);
    // 기본적으로 status(200)으로 설정되어 있다. 
    // 해커들이 status() 코드를 통해 해킹하는 경우가 있어
    // 에러 종류의 상관없이 통일하는 경우가 있다.
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈 포트에서 대기 중');
});