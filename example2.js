//생성자를 통해서 프로미스 객체를 만들 수 있습니다.
//생성자의 인자로 executor 라는 함수를 이용합니다. 

//new Promise( excutor );

/* excutor 함수는 resolve 와 reject 를 인자로 가진다. 
    (resolve, reject) => {...}
resolve 와 reject 는 함수다. 
    resolve(), reject() */

//생성자를 통해서 프로미스 객체를 만드는 순간을 pending (대기) 상태라고 한다. 
//pending 상태로 도입된 후에, excutor 함수 인자 중 하나인 resolve 함수를 실행하면, fulfilled (이행) 상태가 된다. 
//excutor 함수 인자 중 하나인 reject 함수를 실행하면, rejected (거부) 상태가 된다. 

function p() {
    return new Promise((resolve, reject) => {
        //pending
        setTimeout(() => {
            resolve('hello world');
            // reject(new Error('bad'));
        }, 1000);
    });
}

/* then 을 설정하는 시점을 정확히 하고, 
함수의 실행과 동시에 프로미스 객체를 만들면서 pending 이 시작하도록 하기 위해 
프로미스 객체를 생성하면서 리턴하는 함수 (p) 를 만들어 함수 (p) 실행과 동시에 then 을 설정한다. */

/* excutor 의 resolve 함수를 실행할 때 인자를 넣어서 실행하면, 
then 의 callback 함수의 인자로 받을 수 있다. 
    resolve('hello');
    then((message) => {...}) 
    reject 도 동일 
    reject('error');
    then((reason) => {...}) */

/* 프로미스 객체가 rejected 되는 시점에 p.catch 안에 설정한 callback 함수가 실행된다. */

/* 

then 함수에서 다시 프로미스 객체를 리턴하는 방법을 통해 체이닝 하면, 
비동기 작업을 순차적으로 아래로 표현할 수 있다. 

p.then(() => {  첫 then 함수를 실행하여 p()를 실행하고 
    return p();
}).then(() =>  p())  다음 then 함수를 실행한다. 이런식으로 계속 체인을 늘릴 수 있음... 
....
*/

p().then(message => { //fulfilled 이후에 실행
    //callback 작성 공간
    console.log('1초후 실행됨', message);
}).catch(error => {
    console.log('1초후 거절됨', error);
}).finally(() => {
    console.log('끝!');
});

/* fulfilled 되거나 rejected 된 후에 최종적으로 실행할 것이 있다면, .finally() 를 설정하고, 함수를 인자로 넣는다. */ 