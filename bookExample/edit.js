import Axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";

function getToken() {
    return localStorage.getItem('token');
}

async function edit(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('was-validated');

    const bookId = getUrlParams();
    const token = getToken();

    const titleElement = document.querySelector('#title');
    const messageElement = document.querySelector('#message');
    const authorElement = document.querySelector('#author');
    const urlElement = document.querySelector('#url');

    const title = titleElement.value;
    const message = messageElement.value;
    const author = authorElement.value;
    const url = urlElement.value;

    try {
        if (title === '' || message === '' || author === '' || url === '') {
            return;
        }

        //console.log(bookId);
        const res = await Axios.patch(`https://api.marktube.tv/v1/book/${bookId}`, {
            title,
            message,
            author,
            url
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        //console.log(res);
    } catch (error) {
        console.log('editBook error', error);
        return null;
    }
}

function submitFormEditBook() {
    const form = document.querySelector('#form_edit_book');
    form.addEventListener('submit', edit);
}

function getUrlParams() { //url에서 bookid 추출하기. 
    // var vars = {};
    // if (window.location.search.length !== 0)
    //     window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    //         key = decodeURIComponent(key);
    //         if (typeof vars[key] === "undefined") {
    //             vars[key] = decodeURIComponent(value);
    //         } else {
    //             vars[key] = [].concat(vars[key], decodeURIComponent(value));
    //         }
    //     });
    // return vars;
    const bookId = new URL(location.href).searchParams.get('id');
    //console.log(`bookId = ${bookId}`);
    return bookId;
};

async function main() {

    // 1. 토큰 체크
    const token = getToken();
    if (token === null) {
        location.assign('/login.html');
        return;
    }

    submitFormEditBook();
}

document.addEventListener('DOMContentLoaded', main);