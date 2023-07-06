import { menuClick } from "./utils"
import { renderCollectionList } from "./list.mjs";

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

renderCollectionList();