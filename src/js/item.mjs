import { getItemById } from "./externalServices";
import { createElement, loopAndCreateElement } from "./utils";

export async function createItemInformation(itemId) {
    // get item from the api so have an object to work with
    const itemData = await getItemById(itemId);
    const item = itemData.data;
    console.log(item);

    // put name on page
    document.querySelector('.page-title').innerHTML = item.name;
    // put id on page
    document.querySelector('#id').innerHTML = `Id ${item.id}`;

    // put img on page
    let img = document.querySelector('#item-img');
    img.setAttribute('src', item.image);
    img.setAttribute('alt', `A picture of a(n) ${item.name} from BoTW.`);

    // put description on page
    document.querySelector('#description').innerHTML = item.description;

    // if the item has drops
    if (item.drops && item.drops.length > 0) {
        createElement('h2', `${item.name} Drops`, '#description', 'title', 'drop-header');
        loopAndCreateElement('p', item.drops, '#drop-header');
    }

    // if the item has an effect when cooking 
    if (item.cooking_effect) {
        createElement('h2', `${item.name} cooking effect`, '#description', 'title', 'cooking');
        createElement('p', `Hearts recovered: ${item.hearts_recovered}`, '#cooking');
        createElement('p', `Special effect: ${item.cooking_effect}`, '#cooking');
    }

    // only if attack is set
    if (item.attack) {
        // weapon strength and defense
        createElement('h2', 'Equipment Strength', '#description', 'title', 'power');
        createElement('p', `Defense ${item.defense}`, '#power');
        createElement('p', `Attack ${item.attack}`, '#power');
    }

    //location
    if (item.common_locations) {
        loopAndCreateElement('p', item.common_locations, '#location');

    } else {
        createElement('p', 'No common locations', '#location');
    }
}