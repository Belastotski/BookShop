export function createElement(tag, ...classes) {
    const node = document.createElement(tag);
    if (classes.length) classes.forEach( el => node.classList.add(el));
    return node;
}