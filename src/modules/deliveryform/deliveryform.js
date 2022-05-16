export default class DeliveryForm extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        const _style = document.createElement('style');
        _style.innerHTML = '@import "./src/modules/deliveryform/deliveryform.css"'
        fetch('./src/modules/deliveryform/deliveryform.html')
        .then(response => {
            return response.text();
        })
        .then(data => {
            this.shadow.append(_style);
            this.shadow.innerHTML += data;
            this.date = this.shadow.getElementById('date');
            let _date = new Date();
            _date.setDate(_date.getDate() + 1);
            this.date.valueAsDate = _date;
            this.date.min = `${_date.getFullYear()}-${_date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : (_date.getMonth() + 1)}-${_date.getDate()}`;
            this.form = this.shadow.getElementById('form');
            let gifts = this.shadow.querySelectorAll('.gift');
            gifts.forEach( el => {
                el.onchange = (e) => {
                    const checked = [...gifts].filter(el => el.checked);
                    console.log(el);
                    if (checked.length > 2) 
                        checked[ checked[0] == el? 1 : 0 ].checked =false;
                }
            });
            
        });
    }
    connectedCallback(){

    }

    setBooks(...books) {
        this.books = [...books];
        this.shadow.getElementById('books').innerText = '   ' + this.books.join(', ');
    }
    setPrice(p) {
        this.price = p;
        this.shadow.getElementById('price').innerHTML = `Total price: $${this.price || 0}`
    }

    hide() {
        console.log(this.form)
        
        this.form.style.display = 'none';
    }
    show() {
        this.form.style.display = 'flex';
    }
}