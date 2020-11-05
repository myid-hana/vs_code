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