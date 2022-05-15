export default class BooksList extends HTMLElement {


    connectedCallback(){
        if (this.list === undefined) this.list = new Map();
        this.className = 'books-list';
        this.render();
    }

    add(...node) {
        if (this.list === undefined) this.list = new Map();
        node.forEach( el => this.list.set(el, this.list.has(el) ? this.list.get(el) + 1 : 1 ));
        this.render();
        return this;
    }

    del(node) {
        if (this.list.has(node)) {
            count = this.list.get(node);
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
        if (!this.title) this.title = 'Books List';
        this.innerHTML = '';
        const title = this.createElement('h2', 'list-title');
        title.innerHTML = this.title;
        title.className = 'list-title';
        this.append(title);
        if (!this.list.size) {
            const info = this.createElement('h3', 'list-info');
            info.textContent = 'list is empty';
            this.append(info); 

        } else this.list.forEach((count,node) => this.append(node))
    }

    createElement(tag, ...classes) {
        const node = document.createElement(tag);
        if (classes.length) classes.forEach( el => node.classList.add(el));
        return node;
    }


}