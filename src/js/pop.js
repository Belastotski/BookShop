export  function popShow() {
        const back = createElement('div','back');
        const popup = createElement('div','pop');
        const desc = createElement('div','description');
        desc.innerHTML = this.description || 'no description';
        popup.append(this._title.cloneNode(true), desc);
        const bd = document.querySelector('body');
        bd.style.overflow = 'hidden';
        bd.append(back);
        back.addEventListener('click', popHide)
        this.parentNode.append(popup);
        return popup;
}

export function popHide() {
    const bd = document.querySelector('body');
    bd.style.overflow = 'auto';
    document.querySelector('.back').remove();
    const pop = document.querySelector('.pop');
    if (pop) pop.remove();
}

function createElement(tag, ...classes) {
    const node = document.createElement(tag);
    if (classes.length) classes.forEach( el => node.classList.add(el));
    return node;
}

export function addBtnClose(fn) {
    const close = createElement('div', 'btn-close');
    close.innerHTML = 'x';
    this.append(close);
    close.addEventListener('click', () => {
        this.remove();
        if (fn) fn();
    })
}