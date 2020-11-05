class B {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class C {
    //클래스에 필드를 직접 써주는 방식.(node 12ver. 이상에서 지원)
    name;
    age;
}

class D {
    name = 'GGGG';
    age = 0;
    //인강에서는 여기에서 기본값을 설정할 수 있다고 했는데 안된다.....ㅠ 

    constructor(name='djkj', age='30') { //변수에 기본값을 설정
        //객체를 생성할 때 자원을 초기셋팅하는 거 
        this.name = name;
        this.age = age;
    }
}


console.log(new B('hana', 30));
const c = new C();
c.name = 'skdfjs';
c.age = 'sldfkj;'
console.log(c);
console.log(new D());

class StaticEx {
    static a = 'TTT';
    static b = 'RRRR';
    constructor() {
        console.log('hello', StaticEx.a, this.b);
    }
}

new StaticEx();

class StaticEx2 {
    static name = '이 클래스의 이름은 무엇인가';
}

console.log(StaticEx2);