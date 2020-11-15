import Axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";

/* 
1. 토큰을 확인한다. 
2. bookid 를 이용해서 책 정보를 요청한다. 
3. 받아온 정보를 랜더링 해준다. 
 */

function getToken() { //토큰을 가져온다. 
    return localStorage.getItem('token');
}

async function getBook(bookId) {
    const token = localStorage.getItem('token');
    if (token == null) {
        location.assign('/login.html');
    }

    try {
        const res = await Axios.get(`https://api.marktube.tv/v1/book/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('getBook error', error);
        return null;
    }
}

function render(book) {
    const liEliment = document.querySelector('#list');
    const bookEliment = document.createElement('div');
    bookEliment.innerHTML =
        `<span>title: ${book.title}</span><br>
        <span>author: ${book.author}</span><br>
        <span>message: ${book.message}</span><br>
        <span>url: ${book.url}</span><br>
        <button>책 내용 변경하기</button><button>책 삭제하기</button>`;
    liEliment.appendChild(bookEliment);
}

function getUrlParams() { //url에서 bookid 추출하기. 
    var vars = {};
    if (window.location.search.length !== 0)
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            key = decodeURIComponent(key);
            if (typeof vars[key] === "undefined") {
                vars[key] = decodeURIComponent(value);
            } else {
                vars[key] = [].concat(vars[key], decodeURIComponent(value));
            }
        });
    return vars;
};


async function main() {
    //1. 토큰을 확인한다. 
    const token = getToken(); //token 이 있는지 확인하고 없으면 로그인 페이지로 이동. 
    if (token == null) {
        location.assign('/login.html');
        return;
    }

    // 2. 나의 책을 서버에서 받아오기
    const urlParams = getUrlParams();
    const bookId = urlParams.id;
    const book = await getBook(bookId);
    if (book === null) {
        return;
    }

    // 3. 받아온 책을 그리기
    render(book);
}

document.addEventListener('DOMContentLoaded', main);