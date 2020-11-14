import Axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";

function getToken() {
    return localStorage.getItem('token');
}

async function addBook(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('was-validated');


    const titleElement = document.querySelector('#title');
    const messageElement = document.querySelector('#message');
    const authorElement = document.querySelector('#author');
    const urlElement = document.querySelector('#url');

    const title = titleElement.value;
    const message = messageElement.value;
    const author = authorElement.value;
    const url = urlElement.value;

    console.log(title, message, author, url);

    try {
        const token = getToken();
        if (token === null) {
            location.href = '/login';
            return;
        }

        const res = await Axios.post('https://api.marktube.tv/v1/book', {
            title,
            message,
            author,
            url,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log('addBook error', error);
        return null;
    }
}

function bindAddBookButton() {
    const form = document.querySelector('#form_add_book');
    form.addEventListener('submit', addBook);
}

async function main() {
    // 버튼에 이벤트 연결
    bindAddBookButton();

    // 토큰 체크
    const token = getToken();
    if (token === null) {
        location.assign('/login.html');
        return;
    }
}

document.addEventListener('DOMContentLoaded', main);