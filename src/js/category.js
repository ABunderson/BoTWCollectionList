import { createCategoryCards, setActiveCategory, handleSearch, handleEmpty, categorySortSelectors } from './category.mjs';
import { getParam, menuClick, setHamActiveCategory, searchForm } from './utils';

const category = getParam('category');
const search = getParam('search');
const categories = ['creatures', 'equipment', 'materials', 'monsters', 'treasure'];

if (category && !categories.includes(category)) {
    handleEmpty();

} else if (category) {

    categorySortSelectors(category);
    createCategoryCards(category, '.card-list');
    setHamActiveCategory(category);

    window.addEventListener('load', () => { (setActiveCategory(category)) });
}

if (search) {
    categorySortSelectors(false, search);
    handleSearch(search, '.card-list');
}

if (!search && !category) {
    handleEmpty();
}

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

searchForm();
