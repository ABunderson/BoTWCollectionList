import { createCategoryCards, setActiveCategory } from "./category.mjs";
import { getParam, menuClick, setHamActiveCategory } from "./utils";

const category = getParam('category');

setHamActiveCategory(category);
createCategoryCards(category, '.card-list');

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

window.addEventListener('load', () => { (setActiveCategory(category)) })