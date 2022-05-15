import BooksList from '../modules/booksList.js'
import Book from '../modules/book.js'

let booksArray = [];

await fetch('./books.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            booksArray = [...data];
        });

customElements.define('books-list', BooksList);
customElements.define('book-s', Book);
const wrapper = document.getElementById('app');
wrapper.classList.add('wrapper');
const header = document.createElement('div');
const title = document.createElement('div');
title.innerHTML = `<div><h1> Book Shop </h1> Best book shop</div>`;
title.className = 'title';
const bag = document.createElement('div');
bag.className = 'bag'; 
header.append(title,bag);
header.className = 'header';
const booksList = document.createElement('books-list');

booksArray.forEach( book => {
    const book_ = document.createElement('book-s');
    console.log(book_);
    booksList.add(book_)
    book_.set(book);
})

booksList.add('book');

wrapper.append(header);
wrapper.append(booksList);




