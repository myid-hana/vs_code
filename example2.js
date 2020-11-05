/* 
value 가 프로미스 객체인지 아닌지 알 수 없는 경우, Promise.resolve() 를 사용하면 연결된 then 메서드를 실행한다. 
    value 가 프로미스 객체면, resolve 된 then 메서드를 실행한다. 
    value 가 프로미스 객체가 아니면, value 를 인자로 보내면서 then 메서드를 실행한다. 
*/

Promise.resolve( /* value */ );

Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello');
    }, 1000);
})).then((data) => {
    console.log('value 가 프로미스 객체일때', data);
});

Promise.resolve('foo').then((data) => {
    console.log('value 가 프로미스 객체가 아닐 때', data);
})

/* Promise.reject() 를 사용하면, catch 로 연결된 rejected 상태로 연결된다. */

Promise.reject( /* value: 주로 에러 객체가 온다 */ );

Promise.reject(new Error('reason')).then(error => {

}).catch((error) => {
    console.log(error);
})

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
            resolve('hello');
        }, ms);
    });
}

Promise.all([p(1000), p(2000), p(3000), p(4000)]).then((messages) => {
    console.log(messages);
});