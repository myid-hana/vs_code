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

const p = new Promise((resolve, reject) => {
    //pending
    setTimeout(() => {
        resolve(); //fulfilled
    }, 1000)
})

p.then(() => { //fulfilled 이후에 실행
    //callback 작성 공간
    console.log('1초후 ');
})

console.log(p);