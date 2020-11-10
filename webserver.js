const http = require('http'); //http 모듈 사용

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => { //서버를 만든다.
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n'); //응답이 끝나면 해당 문구를 출력한다.
}).listen(port, hostname, () => { //만들어진 서버가 이 컴퓨터의 1337번 포트에 리스닝하도록 하고 ip 는 hostname 이다.
    console.log(`Server running at http://${hostname}:${port}/`);
});