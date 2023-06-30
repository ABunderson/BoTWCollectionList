import { createCategoryCards } from "./category.mjs";
import { getParam, menuClick } from "./utils";

const category = getParam('category');

createCategoryCards(category, '.card-list');

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});