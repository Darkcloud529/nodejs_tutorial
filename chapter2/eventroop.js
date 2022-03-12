// 이벤트 루프 기억하기
// 호출스택, 백그라운드, 테스크 큐

function oneMore() {
    console.log("one more");
}
function run() {
    console.log('run run');
    setTimeout(() => {
        console.log('wow');
    },0)
    new Promise((resolve) => {
        resolve('hi');
    })
    .then(console.log);
    oneMore();
}
setTimeout(run, 5000);
