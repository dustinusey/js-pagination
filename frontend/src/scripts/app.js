// user data
import data from './data.js'

// hamburger menu logic
const hamMenu = document.getElementById('hamMenu');
const nav = document.getElementById('nav');
hamMenu.addEventListener('click', e => {
    nav.classList.toggle('show');
    hamMenu.classList.toggle('active');
});

// pagination logic
// variables
const pagination = document.getElementById('pagination');
const totalItems = data.length;
const itemsPerPage = 12;
let pageCount = Math.ceil(totalItems / itemsPerPage);
let currentPage = 1;
// functions
// generate the pagination buttons
function handlePagination(pages) {
    pagination.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">${i}</li>`;
    }
}
// generate a list of users based on the current page
function handleUsers(userData) {
    employeeList.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const users = userData.slice(start, end);
    users.forEach(user => {
        employeeList.innerHTML += `<li class="user-card">
            <img src="${user.picture.thumbnail}" alt="">
            <span class="name">${user.name.first} ${user.name.last}</span>
            <div class="user-info">
                <span>${user.email}</span>
                <span>${user.registered.date}</span>
            </div>
        </li>`;
    });
}
// handle changing the page when a new page is clicked
function handlePageChange(e) {
    if (e.target.classList.contains('page-item')) {
        currentPage = Number(e.target.innerText);
        handlePagination(pageCount);
        handleUsers(data);
    }
}
// event listeners for pagination button clicks
pagination.addEventListener('click', handlePageChange);
handlePagination(pageCount);
handleUsers(data);

// search logic
// variables
const searchContainer = document.getElementById('searchContainer');

//functions
// add search ui to the page
function createSearch() {
    let searchIcon = document.createElement('i');
    searchIcon.classList = 'fa-solid fa-magnifying-glass';
    searchContainer.appendChild(searchIcon);
    let search = document.createElement('input');
    search.id = 'userSearch';
    search.placeholder = 'Search...';
    searchContainer.appendChild(search);
}

createSearch();
const userSearch = document.getElementById('userSearch');
userSearch.addEventListener('keyup', e => {
    currentPage = 1;
    const search = e.target.value.toLowerCase();
    const users = data.filter(user => {
        return user.name.first.toLowerCase().includes(search) || user.name.last.toLowerCase().includes(search);
    });
    pageCount = Math.ceil(users.length / itemsPerPage);
    handleUsers(users);
    handlePagination(pageCount);
});