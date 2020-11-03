class A {
    _name = 'no name';
    //언더바가 있는 변수는 클래스 내부에서만 사용하는 변수로써 외부에서 접근할 수 없다. 
    //외부에서는 get 과 set 을 이용해 변수에 접근하게 된다. 

    get name() {
        return this._name + '@@@';
    }

    set name(value) {
        this._name = value + '!!!';
    }
}

const a = new A();
console.log(a.name); //no name@@@
//get 함수가 실행된다. _name 변수가 선언 됐을 때의 최초값을 알 수 없다. 
a.name = 'hana';
//set 함수가 실행된다. _name 에 'hana!!!'가 할당된다.
console.log(a.name); //hana!!!@@@
//get 함수가 실행된다. _name 에 할당된 값을 알 수 없다.
console.log(a._name); //hana!!!
//_name 에 현재 저장되어 있는 값이 출력된다. 

class B {
    _name = 'no name';

    get name() {
        return this._name + '@@@';
    }
}

const b = new B();
b.name = 'hana';
//set 함수가 없기 때문에 _name 변수에 값이 할당되지 않는다. 
console.log(b); //_name = 'no name' 
//_name 의 값이 변하지 않고 마치 readonly 인 것처럼 작동된다. 



// static 변수 함수

class C {
    static age = 30; //static 변수
    static hello() { //static 함수 
        console.log('hello hana', C.age); 
        //static 변수에 접근할 때는 this 를 사용하는 것이 아니라 클래스이름.변수이름 으로 접근한다. 
        /* 이렇게 접근한 변수는 new 생성자를 통해 생성된 객체 인스턴스의 변수가 아니라 
        처음에 선언된 클래스 C 의 변수이다. */
    }
}

console.log(C, C.age);
C.hello();