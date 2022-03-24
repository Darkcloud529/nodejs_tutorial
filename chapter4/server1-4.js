// https, http2 모듈은 거의 유사함
const https = require('https');
//const http2 = require('http2');
const fs = require('fs');

// https -> createServer
// http2 -> createSecureServer
https.createServer({
// Let's Encrypt 기관에서 무료 발급이 가능
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
// 포트 번호는 443!
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });