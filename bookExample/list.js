import Axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";

function getToken() {
    return localStorage.getItem('token');
}

async function getUserByToken(token) {
    try {
        const res = await Axios.get('https://api.marktube.tv/v1/me', { //사용자 정보를 요청하는 api 
            headers: {
                Authorization: `Bearer ${token}`, //token 으로 사용자 정보를 요청. 
            },
        });
        console.log(res.data);
        return res.data; //사용자정보(email, name)을 리턴. 
    } catch (error) {
        console.log('getUserByToken error', error);
        return null;
    }
}

async function logout() {
    const token = getToken();
    if (token === null) { //로그아웃 버튼을 눌렀을 때 token 이 없으면 로그인 페이지로 이동. 
        location.assign('/login.html');
        return;
    }
    try {
        await Axios.delete('https://api.marktube.tv/v1/me', { //delete 로 api 에 token 삭제 요청. 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log('logout error', error);
    } finally {
        localStorage.clear();
        alert('로그아웃되었습니다.');
        location.assign('/login.html');
    }
}

async function getBooks(token) {
    try {
        const res = await Axios.get('https://api.marktube.tv/v1/book', { //책 정보를 요청하는 api. 
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log('getBooks error', error);
        return null;
    }
}

async function deleteBook(bookId) {
    const token = getToken();
    if (token === null) {
        location.assign('/login.html');
        return;
    }
    await Axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, { //delete 로 api 에 book 삭제 요청. 
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return;
}

function bindLogoutButton() {
    const btnLogout = document.querySelector('#btn_logout');
    btnLogout.addEventListener('click', logout);
}

function bindLoginButton() {
    const btnLogin = document.querySelector('#btn_login');
    btnLogin.addEventListener('click', login);
}

function login() {
    location.assign('/login.html');
}

function getUserName(user) {
    const userName = user.name;
    const boldElement = document.querySelector('#user_name');
    boldElement.innerHTML = userName;
}

function render(books) {
    const listElement = document.querySelector('#list');
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const bookElement = document.createElement('div');
        bookElement.classList.value = 'col-md-4';
        bookElement.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <p class="card-text">${book.title === '' ? '제목 없음' : book.title}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <a href="/book?id=${book.bookId}">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                >
                  View
                </button>
              </a>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary btn-delete"
                data-book-id="${book.bookId}"
              >
                Delete
              </button>
            </div>
            <small class="text-muted">${new Date(
              book.createdAt,
            ).toLocaleString()}</small>
          </div>
        </div>
      </div>
      `;
        listElement.append(bookElement);
    }
    document.querySelectorAll('.btn-delete').forEach(element => {
        element.addEventListener('click', async event => {
            const bookId = event.target.dataset.bookId;
            try {
                await deleteBook(bookId);
                location.reload();
            } catch (error) {
                console.log(error);
            }
        });
    });
}

async function main() {
    // 버튼에 이벤트 연결
    bindLogoutButton();
    bindLoginButton();

    // 토큰 체크
    const token = getToken();
    if (token === null) {
        location.assign('/login.html');
        return;
    }

    // 토큰으로 서버에서 나의 정보 받아오기
    const user = await getUserByToken(token);
    if (user === null) {
        localStorage.clear();
        location.assign('/login.html');
        return;
    }
    getUserName(user);

    // 나의 책을 서버에서 받아오기
    const books = await getBooks(token);
    if (books === null) {
        return;
    }

    // 받아온 책을 그리기
    render(books);
}

document.addEventListener('DOMContentLoaded', main);