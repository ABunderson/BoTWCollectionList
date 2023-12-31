import { getParam, menuClick, searchForm } from './utils';
import { createItemInformation } from './item.mjs';


const itemId = getParam('itemId');

createItemInformation(itemId);

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

searchForm();