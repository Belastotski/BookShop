export  function popShow(el) {
        const back = createElement('div','back');
        const popup = createElement('div','pop');
        const desc = createElement('div','description');
        const title = createElement('h2','title');
        desc.innerHTML = el.description || 'no description';
        title.textContent = el.title || 'no title';
        popup.append(title, desc);
        const bd = document.querySelector('body');
        bd.style.overflow = 'hidden';
        bd.append(back);
        back.addEventListener('click', popHide)
        bd.append(popup);
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