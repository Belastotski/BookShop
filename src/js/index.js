import BooksList from '../modules/booksList.js'
import Book from '../modules/book.js'
import DeliveryForm from '../modules/deliveryform/deliveryForm.js'
import {popShow, popHide, addBtnClose} from './pop.js';

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
customElements.define('delivery-form', DeliveryForm);
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
const bagList = document.createElement('books-list');
const form = document.createElement('delivery-form');

booksArray.forEach( book => {
    const book_ = document.createElement('book-s');
    book_.btn2.onclick = function(e){
        book_.btn2.onclick = '';
        bagList.add(book_.cloneNode(true));
    }
    book_.btn1.onclick = function(e){
        addBtnClose.apply(popShow.apply(book_),[popHide]);
        
    }
    booksList.add(book_)
    book_.set(book);
})

booksList._title = form;

wrapper.append(header);
wrapper.append(booksList);

// setTimeout(() =>form.setPrice(50), 200);
// setTimeout(() =>form.setBooks('123','eee','fdsfdf'), 200);
// setTimeout(() =>form.hide(), 2000);
// setTimeout(() =>form.show(), 5000);






