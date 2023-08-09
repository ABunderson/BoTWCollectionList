import { menuClick, setHamActiveCategory, searchForm, addCustomToList } from './utils';
import { renderCollectionList, setSort } from './list.mjs';

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

try {

    document.querySelector('#list-name-sort').addEventListener('click', () => {
        // console.log('name sort')

        setSort('nameSort')
        renderCollectionList();
    })

    document.querySelector('#list-date-sort').addEventListener('click', () => {
        // console.log('date sort')

        setSort('dateSort')
        renderCollectionList();
    })

    document.querySelector('#list-quantity-sort').addEventListener('click', () => {
        // console.log('quan sort')

        setSort('quantitySort')
        renderCollectionList();
    })
} catch (e) {
    // console.log('the list is empty')
}



