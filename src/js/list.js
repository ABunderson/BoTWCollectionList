import { menuClick, setHamActiveCategory, searchForm, addCustomToList } from './utils';
import { renderCollectionList } from './list.mjs';

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

renderCollectionList();

setHamActiveCategory('list');

searchForm();

document.forms['custom-item'].addEventListener('submit', (e) => {
    e.preventDefault();
    addCustomToList(e.target);
    window.location = '/list/index.html';
});