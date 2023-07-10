import { createCategoryCards, setActiveCategory, handleSearch } from "./category.mjs";
import { getParam, menuClick, setHamActiveCategory, searchForm } from "./utils";
import { getAllItems } from './externalServices'

const category = getParam('category');
const search = getParam('search');

if (category) {
    setHamActiveCategory(category);
    createCategoryCards(category, '.card-list');
    window.addEventListener('load', () => { (setActiveCategory(category)) })


}

if (search) {
    handleSearch(search, '.card-list');
}

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});


searchForm();