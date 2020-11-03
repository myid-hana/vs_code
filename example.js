//표준 내장 객체 

const a = new Array('white', 'black', 'red');
//배열을 만들어 주는 객체.

console.log(a, typeof a);
//배열을 만들어 주는 객체이기 때문에 결국 a 는 배열이면서 객체이다. 

console.log(a instanceof Array); //true
console.log(a instanceof Object); //true
//a 는 Array 와 Object 둘 다의 instance 이다. 

// 리터럴로도 만들어 줄 수 있음. 
const b = ['yellow', 'green', 'blue'];
console.log(b, typeof b); //object

console.log(b.slice(0, 1)); //yellow(0번째 인자에서부터 1개 추출)
console.log(Array.prototype.slice);
// b 가 Array 의 instance 이기 때문에 Array 가 prototype 에 만들어 놓은 slice 함수를 사용할 수 있다. 
console.log(Object.prototype.slice); //undefined
// slilce 함수는 Array 에서 만들어 놓은 함수이고, Object 에서 만든 게 아니기 때문에 결과는 undefined