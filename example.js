function A(name) {
    this.name = name;
    return name;
}

function B() {
    this.hello = function () {
        console.log("hello");
        return this;
    }
}

const a = new A('hana');
const b = new B();

// console.log(a);
// console.log(a.name);
console.log(b.hello());