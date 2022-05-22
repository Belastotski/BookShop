import Book from '../modules/book.js'

export default class BooksList extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        if (this.list === undefined) this.list = new Map();
        this.className = 'books-list';
        this.render();
    }

    add(...node) {
        if (this.list === undefined) this.list = new Map();
        node.forEach( el => {
            if (this.has(el)) el = this.get(el); 
            this.list.set(el, this.has(el) ? this.list.get(el) + 1 : 1 )
        });
        this.render();
        return this;
    }

    addElement(fn) {
        this.additional = el;
    } 

    

    del(node) {
        if (this.list.has(node)) {
            let count = this.list.get(node);
            if (count === 1) {
                this.list.delete(node);
            } else this.list.set(node, count - 1);
        }
        this.render ();
    }

    clear() {
        this.list.clear();
    }

    render(){
        if (!this._title) this._title = 'Books List';
        this.innerHTML = '';
        let title;
        if (typeof this._title === 'function' ) title = this._title();
        else {
            title = this.createElement('h2', 'list-title');
            title.innerHTML = this._title;
        }
        this.append(title);

        if (!this.list.size) {
            const info = this.createElement('h3', 'list-info');
            info.textContent = 'list is empty';
            this.append(info); 

        } else this.list.forEach((count,el) => {
            const node = this.createElement('book-s');
            node.set(el,count);
            node.setAttribute('draggable',this.drag || "false");
            this.append(node)
        });
    }

    createElement(tag, ...classes) {
        const node = document.createElement(tag);
        if (classes.length) classes.forEach( el => node.classList.add(el));
        return node;
    }

    size() {
        let size = 0;
        this.list.forEach((val) => size += val);
        return size;
    }

    hide() {
        this.classList.add('hide');
    }
    show() {
        this.classList.remove('hide');
        this.render();
    }

    isShown() {
        return this.classList.contains('hide');
    }

    has(val) {
        let has = false;
        this.list.forEach( (count, node) => {
            if(this.isEqual(val,node) ) has = true;
        }) 
        return has;
    }
    get(val) {
        let has = undefined;
        this.list.forEach( (count, node) => {
            if( this.isEqual(val,node) ) has = node;
        }) 
        return has;
    }
    isEqual(book1, book2) {
        return JSON.stringify(book1) === JSON.stringify(book2);
    }

    sum(fn) {
        let sum = 0;
        this.list?.forEach( (count, node) => sum += fn(count, node));
        return sum;
    }

    setTitle(fn) {
        this._title = fn;
    }

    draggable(val=true) {
        this.drag = val;
        this.render();
    }

}