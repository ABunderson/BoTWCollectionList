import { menuClick, setHamActiveCategory, searchForm, addCustomToList } from './utils';
import { renderCollectionList } from './list.mjs';

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

renderCollectionList();

setHamActiveCategory('list');

searchForm();

document.querySelector('#list-name-sort').addEventListener('click', () => {
    renderCollectionList('nameSort');
})

document.querySelector('#list-date-sort').addEventListener('click', () => {
    renderCollectionList('dateSort');
})

document.querySelector('#list-quantity-sort').addEventListener('click', () => {
    renderCollectionList('quantitySort');
})

document.forms['custom-item'].addEventListener('submit', (e) => {
    e.preventDefault();
    addCustomToList(e.target);
    window.location = '/list/index.html';
});