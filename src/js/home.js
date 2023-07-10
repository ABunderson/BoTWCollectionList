import { setImages } from "./home.mjs";
import { searchForm, menuClick, loadHeaderFooter, formDataToJSON } from './utils.js';

// loadHeaderFooter();
setImages('monster-image', 'monsters');
setImages('creature-image', 'creatures')
setImages('equipment-image', 'equipment')
setImages('material-image', 'materials')
setImages('treasure-image', 'treasure')


document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});


// window.addEventListener('load', () => { (setSelector()) })

searchForm();

