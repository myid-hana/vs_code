function Person(name, age) {
    this.name = name;
    this.age = age;
    // this.hello = function () {
    //     console.log('hello', this.name, this.age);
    // };
}

Person.prototype.hello = function() {
    console.log('hello2', this.name, this.age);
}

const p = new Person('hana', 30);

p.hello();
console.log(p.toString());

console.log(Person.prototype);
// console.log(Person.prototype.toString);
// console.log(Person.prototype.constructor);
// console.log(Person.prototype.hello);

// console.log(Object.prototype);
// console.log(Object.prototype.toString);
// console.log(Object.prototype.constructor);