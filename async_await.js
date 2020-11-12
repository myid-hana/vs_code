/*
async function 함수이름() {}    
const 함수이름 = async () => {}
함수이름 앞에 async 를 붙여서 사용한다. 
*/

//async-await 는 Promise 를 기반으로 하고, 코드의 흐름을 위에서 아래의 방향으로 짤 수 있다는 것이 장점이다. 

//Promise 객체를 리턴하는 함수
function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
}
//Promise 객체를 이용해서 비동기 로직을 수행할 때 
p(1000).then((ms) => {
    console.log(ms + ' hello');
})
//Promise 객체를 리턴하는 함수를 await 로 호출하는 방법 
//await 를 사용하는 경우, 항상 async 함수 안에서 사용되어야 한다. 
async function main() {
    const ms = await p(1000); //비동기된 처리가 끝날 때까지 기다렸다가 ms 값을 리턴하고 아래줄을 실행한다. 
    console.log(ms + ' hello');
}
main();