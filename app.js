const express = require('express');
let app = express(); //애플리케이션을 리턴한다. 

app.set('view engine', 'pug'); //템플릿과 express 를 연결 
app.set('views', './views'); //템플릿이 있는 디렉토리
app.locals.pretty = true; //html 구조를 예쁘게 보기

app.use(express.static('public')); //정적인 데이터가 위치할 디렉토리를 지정한다. 

app.get('/template', (req, res) => { //views 내의  template 를 라우팅
    res.render('temp', {
        time: Date(),
        title: 'Pug Title'
    }) //temp 라는 template 파일은 웹페이지로 전송, time 변수를 temp 파일에 넘김.
});

//get 함수를 라우터라고 한다. 라우터는 사용자의 접속을 어떤 컨트롤러에 연결할 것인가 중개를 해주는 역할. 
app.get('/', (req, res) => { //겟방식으로 홈에 접속한 사용자에게 처음 노출될 화면 
    res.send('hello this is home page😚'); //컨트롤러
});
app.get('/login', function (req, res) {
    res.send('login page');
})
app.listen(3000, () => {
    console.log('Connected 3000 port!!');
});