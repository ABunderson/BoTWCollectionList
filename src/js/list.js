import { menuClick, setHamActiveCategory, searchForm } from "./utils"
import { renderCollectionList } from "./list.mjs";

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

renderCollectionList();

setHamActiveCategory('list');

searchForm();