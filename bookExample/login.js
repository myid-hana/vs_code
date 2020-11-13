import Axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";

//이메일과 비밀번호를 입력하고 로그인 버튼을 눌러서 서버에 토큰을 요청해서 받아오기. 


//lacalStorage 에 토큰이 있으면 토큰을 리턴해주는 함수. 
function getToken() {
    return localStorage.getItem('token');
}

async function login(event) { //로그인 버튼을 누르면 실행되는 함수. 
    event.preventDefault();
    event.stopPropagation(); //부모 태그로의 이벤트 전파(Bubble Up) 방지. 

    const emailElement = document.querySelector('#email');
    const passwordElement = document.querySelector('#password');

    const email = emailElement.value;
    const password = passwordElement.value;

    console.log(email, password);

    try {
        const res = await Axios.post('https://api.marktube.tv/v1/me', {
            email,
            password,
        });
        console.log(res);
        const {
            token
        } = res.data; //응답의 body 내용을 token 상수에 넣는다. 
        if (token === undefined) { //토큰이 없으면 리턴하고 login 함수에서 빠져나간다. 
            return;
        }
        localStorage.setItem('token', token); //토큰 값이 있으면 localStorage 에 token 값을 저장한다. 
        // location = '/index.html';
    } catch (error) { //post 요청 중에 에러가 발생한 경우 
        console.log(error);
        const data = error.response.data; //에러 응답의 body 를 data 상수에 넣는다. 
        if (data) {
            const state = data.error;
            if (state === 'USER_NOT_EXIST') {
                alert('사용자가 존재하지 않습니다.');
            } else if (state === 'PASSWORD_NOT_MATCH') {
                alert('비밀번호가 틀렸습니다.');
            }
        }
    }
}

function bindLoginButton() {  //제출 버튼이 눌리면 login 함수를 실행한다.  
    const form = document.querySelector('#form-login');
    form.addEventListener('submit', login);  
}

async function main() {
    // 버튼에 이벤트 연결
    bindLoginButton();

    // 토큰 체크
    const token = getToken();  
    if (token !== null) { //localStorage 에 token 이 없으면 
        // location.assign('/login.html');  //사용자의 위치를 이동시킨다. 
        return;
    }
}

document.addEventListener('DOMContentLoaded', main);  //DOM element 들이 로드되면 main 함수를 실행한다. 