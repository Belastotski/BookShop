import Book from '../modules/book.js'
import BooksList from '../modules/booksList.js'
import DeliveryForm from '../modules/deliveryform.js'
import {popShow, popHide, addBtnClose} from './pop.js';
import {createElement} from '../modules/command.js';

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
const body = document.querySelector('body');
const wrapper = createElement('main','wrapper');
wrapper.id = 'add';
const header = createElement('div','header');
const title = createElement('div','title');
title.innerHTML = `<div><h1> Book Shop </h1> Best book shop</div>`;
const bag = createElement('div','bag');
bag.addEventListener('drop', e => {
    e.preventDefault();
    const book = e.dataTransfer.getData("book");
        const newBook =  JSON.parse(book);
        newBook.addit = 'Remove';
        newBook.btn2 = function(e) {
            bagList.del(newBook);
            bag.innerHTML = bagList.size();
        }
        bagList.add(newBook);
        bag.innerHTML = bagList.size();
    
})
bag.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
})
header.append(title,bag);
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

booksList.draggable();
bagList.setTitle(() => {
    const panel = createElement('div','title-panel');
    const desc = createElement('div', 'title-desc');
    const sum = bagList.sum((c,o) =>c * o.price);
    desc.innerHTML = `Bags. Total: $${sum}`;
    panel.append(desc);
    if (bagList.size()) {
        const submitBtn = createElement('button','btn');
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

let fragment = document.createDocumentFragment();
wrapper.append(header,form,booksList,bagList);
fragment.append(wrapper);
body.append(fragment);
bagList.hide();








