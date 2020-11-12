/* 
value 가 프로미스 객체인지 아닌지 알 수 없는 경우, Promise.resolve() 를 사용하면 연결된 then 메서드를 실행한다. 
    value 가 프로미스 객체면, resolve 된 then 메서드를 실행한다. 
    value 가 프로미스 객체가 아니면, value 를 인자로 보내면서 then 메서드를 실행한다. 
*/

Promise.resolve( /* value */ ); //value 에는 promise 객체를 넣을 수도 있고 일반값을 넣을 수도 있음.

Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    }, 1000);
})).then((data) => { //프로미스 객체인 경우, resolve 된 결과를 받아서 then 이 실행된다. 
    console.log('value 가 프로미스 객체일때', data);
});

Promise.resolve('foo').then((data) => { //then 메서드가 없는 경우, 바로 fullfilled 된다. 
    console.log('value 가 프로미스 객체가 아닐 때', data);
});

/* Promise.reject() 를 사용하면, catch 로 연결된 rejected 상태로 연결된다. */

Promise.reject( /* value: 주로 에러 객체가 온다 */ );

Promise.reject(new Error('reason')).then(error => {}).catch((error) => {
    console.log(error);
});

/* 
프로미스 객체 여러 개를 생성하여, 
배열로 만들어 인자로 넣고 Promise.all 을 실행하면 
배열의 모든 프로미스 객체들이 fulfilled 되었을 때, then 의 함수가 실행된다. 
then 의 함수의 인자로 프로미스 객체들의 resolve 인자값을 배열로 돌려준다. 
*/

//Promise.all([프로미스 객체들]);

function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms + ' hello');
        }, ms);
    });
}

Promise.all([p(1000), p(2000), p(3000), p(4000)]).then((messages) => {
    console.log(messages);
}); //모두 동시에 시작해서 전부 fullfilled 된 이후에 실행된다. 

/* 
프로미스 객체 여러 개를 생성하여, 
배열로 만들어 인자로 넣고 Promise.race 를 실행하면 
배열의 모든 프로미스 객체들 중 가장 먼저 fulfilled 된 것으로, then 의 함수가 실행된다. 
then 의 함수의 인자로 가장 먼저 fullfilled 된 프로미스 객체의 resolve 인자값을 배열로 돌려준다. 
*/

//Promise.race([프로미스 객체들]);

Promise.race([p(1000), p(2000), p(3000), p(4000)]).then((messages) => {
    console.log(messages);
});