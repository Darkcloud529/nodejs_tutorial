const http = require('http');

const server = http.createServer((req,res) => {
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello smlee</p>');
})
    // .listen(8080, () => {// 서버 연결
    //     console.log('8080번 포트에서 서버 대기중입니다!');
    // });
    .listen(8080);
    server.on('listening', (error) =>{
        console.log(error);
    });
    server.on('error', (error) => {
        console.log(error);
    });


