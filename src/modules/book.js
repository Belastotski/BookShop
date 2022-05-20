export default class Book extends HTMLElement {

    constructor(){
        super();
        this.shadow = this.attachShadow({mode:'open'});
        if (!this._style) this._style = document.createElement('style');
        this._style.innerHTML = `@import "./src/modules/book.css"`;
        if (!this.content) this.content = this.createElement('div' , 'content');
        if (!this.img) this.img = this.createElement('div', 'img');
        if (!this._title) this._title = this.createElement('h2', 'title');
        if (!this.author) this.author = this.createElement('h4' , 'author');
        if (!this.price) this.price = this.createElement('div', 'price');
        if (!this._count) this._count = this.createElement('div', 'count');
        if (!this.buttonsPanel) this.buttonsPanel = this.createElement('div', 'buttons-panel');
        if (!this.btn1) this.btn1 = this.createElement('button','btn', 'btn1');
        if (!this.btn2) this.btn2 = this.createElement('button', 'btn','btn2');
        this.btn1.innerHTML = 'Show more';
        this.btn2.innerHTML = 'Add to bag';
        this.buttonsPanel.append(this.btn1,this.btn2);
        this.content.append(this.author,this._title,this.price,this._count,this.buttonsPanel);
    }

    connectedCallback(){
    }

    render(){
        this.shadow.innerHTML = '';
        this.shadow.append(this._style,this.img,this.content);
    }

    createElement(tag, ...classes) {
        const node = document.createElement(tag);
        if (classes.length) classes.forEach( el => node.classList.add(el));
        return node;
    }
    set({imageLink, title, description, author, price}) {
        this.render();
        this.description = description;
        this.img.style.backgroundImage = `url('${imageLink}')`;
        this._title.innerHTML = title;

        this.author.innerHTML = author;
        this.price.innerHTML = `price: $${price}`;
        return this;
    } 

    set count(val) {
        this._count.innerHTML =  val > 1?  `quantity: ${val} pcs` : '';
    }


}