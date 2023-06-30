import { setImages } from "./home.mjs";
import { menuClick } from './utils.js';

setImages('monster-image', 'monsters');
setImages('creature-image', 'creatures')
setImages('equipment-image', 'equipment')
setImages('material-image', 'materials')
setImages('treasure-image', 'treasure')

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});