process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를 고장내주마');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);

// uncaughtException : 예측 불가능한, 모든 에러를 처리
// 노드 공식 문서에서는 uncaughtException이벤트를 최후의 수단으로 사용할 것을 명시하고 있다. 
// uncaughtException은 단순히 에러 내용을 기록하는 정도로 사용하고, 에러를 기록한 후 process.exit()으로
// 프로세스를 종료하는 것이 좋다.  
