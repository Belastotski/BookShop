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


wrapper.append(header);

