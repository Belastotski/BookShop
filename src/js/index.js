import Book from '../modules/book.js'
import BooksList from '../modules/booksList.js'
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
customElements.define('book-s', Book);
customElements.define('books-list', BooksList);
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
bag.addEventListener('click', (e) => {
    if ( !(+bag.innerHTML) && bagList.isShown()) return;
    booksList.hide();
    bagList.show();
})

booksArray.forEach( book => {
    book.btn2 =  function(e) {
    book.addit = 'Remove';
    book.btn2 = function(e) {
        bagList.del(book);
    }
    bagList.add(book);
    bag.innerHTML = bagList.size();
    }
    book.btn1 = function(e){
        const pop = popShow(book, e.clientX, e.clientY);
        addBtnClose.apply(pop ,[popHide]);
        
    }
    booksList.add(book);


})

bagList._title = 'Bags';

wrapper.append(header);
wrapper.append(form);
wrapper.append(booksList);
wrapper.append(bagList);
bagList.hide();

// setTimeout(() =>form.setPrice(50), 200);
// setTimeout(() =>form.setBooks('123','eee','fdsfdf'), 200);
// setTimeout(() =>form.hide(), 2000);
// setTimeout(() =>form.show(), 5000);






