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

if (document.querySelector('.collection-list')) {
    document.querySelector('#list-name-sort').addEventListener('click', () => {
        console.log('name sort')
        renderCollectionList('nameSort');
    })

    document.querySelector('#list-date-sort').addEventListener('click', () => {
        console.log('date sort')
        renderCollectionList('dateSort');
    })

    document.querySelector('#list-quantity-sort').addEventListener('click', () => {
        console.log('quan sort')
        renderCollectionList('quantitySort');
    })
}