function Person() {

}

Person.prototype.hello = function () {
    console.log('hello');
}

function Korean(region) {
    this.region = region;
    this.where = function () {
        console.log('where', this.region);
    };
}

Korean.prototype = Person.prototype;

const k = new Korean('Seoul');
const p = new Person();

k.where();
k.hello();
// p.where();  
p.hello();


//객체 리터럴
const A = {
    name: 'hana',
    hello1() {
        console.log('hello1');
    },
    hello2: function() {
        console.log('hello2');
    },
    hello3: () => {
        console.log('hello3');
    }
}

A.hello1();
A.hello2();
A.hello3();


//인자의 변수명과 프로퍼티의 변수명이 같은 경우 프로퍼티값을 인자값으로 바로 초기화해줌.
function a(a1, a2) {
    a1,
    a2

    return a1 + a2;
};

console.log(a(2, 3));