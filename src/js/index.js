import Book from '../modules/book.js'
import BooksList from '../modules/booksList.js'
import DeliveryForm from '../modules/deliveryform/deliveryForm.js'
import {popShow, popHide, addBtnClose} from './pop.js';
// import {Switcher} from '../modules/command.js';

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
    form.hide();
})
title.addEventListener('click', (e) => { 
    booksList.show();
    bagList.hide();
    form.hide();
})

booksArray.forEach( book => {
    book.btn2 =  function(e) {
    const newBook = Object.assign({}, book);
    newBook.addit = 'Remove';
    newBook.btn2 = function(e) {
        bagList.del(newBook);
        bag.innerHTML = bagList.size();
    }
    bagList.add(newBook);
    bag.innerHTML = bagList.size();
    }
    book.btn1 = function(e){
        const pop = popShow(book, e.clientX, e.clientY);
        addBtnClose.apply(pop ,[popHide]);
        
    }
    booksList.add(book);
})

bagList.setTitle(() => {

    const panel = document.createElement('div');
    panel.className = 'title-panel';
    const desc = document.createElement('div');
    desc.className = 'title-desc';
    const sum = bagList.sum((c,o) =>c * o.price);
    desc.innerHTML = `Bags. Total: $${sum}`;
    panel.append(desc);
    if (bagList.size()) {
        const submitBtn = document.createElement('button');
        submitBtn.classList.add('btn');
        submitBtn.textContent = 'Confirm';
        panel.append(submitBtn);
        submitBtn.addEventListener('click', () => {
            booksList.hide();
            bagList.hide();
            const books = [...bagList.list.keys()].map(book => `${book.title} x${bagList.list.get(book)}`);
            form.show(sum,...books);
        })
        }
    return panel;
})



wrapper.append(header);
wrapper.append(form);
wrapper.append(booksList);
wrapper.append(bagList);
bagList.hide();

// setTimeout(() =>form.setPrice(50), 200);
// setTimeout(() =>form.setBooks('123','eee','fdsfdf'), 200);
// setTimeout(() =>form.hide(), 2000);
// setTimeout(() =>form.show(), 5000);






