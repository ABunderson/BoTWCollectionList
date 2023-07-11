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

document.querySelector('#category-name-sort').addEventListener('click', () => {
    if (category){
        createCategoryCards(category, '.card-list', 'nameSort');
    } else if (search){
        handleSearch(search, '.card-list', 'nameSort');
    }
})

document.querySelector('#category-id-sort').addEventListener('click', () => {
    if (category){
        createCategoryCards(category, '.card-list', 'idSort');
    } else if (search){
        handleSearch(search, '.card-list', 'idSort');
    }
})


searchForm();