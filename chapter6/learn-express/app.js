const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// 작성할 때 순서가 중요합니다. 
// 위에서부터 아래로 진행됩니다!
// 범위가 넓은 미들웨어는 뒤쪽으로 이동
app.set( 'port', process.env.PORT || 3000);

// 미들웨어들간에도 순서가 중요하다!
// 미들웨어는 내부적으로 next를 호출한다!
app.use(morgan('dev'));
app.use(cookieParser('smleepassword'));
app.use(express.json());// 클라이언트에서 json 데이터를 보냈을때 json 데이터를 파싱해서 req.body에 담아줌 
app.use(express.urlencoded({extended:true}));// form 데이터를 파싱해줌, true : qs , false : querystring
app.use('/', express.static(path.join(__dirname, 'public'))); // 정적 파일들을 제공하는 라우터 역할 

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

// app.get('/', (req,res) => {
//     // 요청 한번에 응답을 한 번만 보내야한다. 
//     // 그런데 아래코드첢 요청 한번에 응답을 3번(sendFile, send, json)을 보내려 하면 아래와 같은 에러가 발생한다. 
//     // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     res.sendFile(path.join(__dirname, 'index.html'));
//     res.send('안녕하세요.');
//     res.json({hello:'zerocho'});
//     // 이미 응답을 보내고 난 후 writeHead()를 쓰면 똑같이 에러가 발생합니다. 
//     res.writeHead()
// });

// app.use((req,res,next) => {
//     console.log('1 요청에 실행하고 싶어요.');
//     next();
// }, (req,res,next) => {
//     try {
//         console.log(asdfasdfasdf);
//     } catch(error) {
//         // 에러를 전달할 때는 next()를 사용한다.
//         next(error);
//     }
// });

// route를 분기할때도 next()를 사용한다. 
// app.get('/', (req,res,next) => {
//     if(true) {
//         next('route');
//     } else {
//         next();
//     }
// }, (req, res) => {
//     console.log('실행되나요?');
// });


app.get('/', (req, res, next) => {
    //res.send('Hello, Express');
    // 4장 쿠키 생성과 비교해보기
    req.cookies; // {mycookie: 'test'}
    req.signedCookies; // 암호화된 쿠키 사용 
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()};  HttpOnly; Path=/`,
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.sendFile(path.join(__dirname, '/index.html'));
});

// 모든 에러는 여기서 처리가 됨.
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