import "core-js/stable";
import {
    async
} from 'regenerator-runtime';
import "regenerator-runtime/runtime";
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
            //reject(new Error('reason'));
        }, ms);
    });
}

//Promise 객체를 리턴하는 함수를 await 로 호출하는 방법 
//await 를 사용하는 경우, 항상 async 함수 안에서 사용되어야 한다. 
(async function main() {
    try {
        const ms = await p(1000); //비동기된 처리가 끝날 때까지 기다렸다가 ms 값을 리턴하고 아래줄을 실행한다. 
        console.log(ms + ' hello');
    } catch (error) {
        console.log(error);
    }
})();

//Promise 객체가 rejected 된 경우의 처리를 위해 try catch 를 이용한다.  

//async function 에서 return 되는 값은 Promise.resolve 함수로 감싸서 리턴된다. 
//new Promise 를 생성하지 않고 async 함수 자체를 사용하는 방법. 
async function asyncP() {
    const ms = await p(1000);
    return 'hana' + ms; //여기서는 Promise.resolve('hana') 로 리턴된다. 
}

(async function () {
    try {
        const name = await asyncP(); //비동기된 처리가 끝날 때까지 기다렸다가 ms 값을 리턴하고 아래줄을 실행한다. 
        console.log(name + ' wow');
    } catch (error) {
        console.log(error);
    }
})();