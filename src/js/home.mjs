import { getRanItemByCategory } from './utils.js'

export async function setImages(selector, category) {
    let img = document.getElementById(selector);
    const item = await getRanItemByCategory(category);
    const src = item.image;
    img.setAttribute('src', src);
    img.setAttribute('alt', `An image of a(n) ${item.name} from BoTW`)
}
