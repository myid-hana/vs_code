const fs = require('fs');

//Sync
console.log('111');
let data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);

//Async
console.log('222');
fs.readFile('data.txt', {encoding:'utf-8'}, function (err, data) {
    console.log('33');
    console.log(data);
})
console.log('44');