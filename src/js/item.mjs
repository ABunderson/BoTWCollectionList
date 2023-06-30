import { getItemById } from "./externalServices";
import { createElement, loopAndCreateElement, formDataToJSON, setLocalStorage } from "./utils";

export async function createItemInformation(itemId) {
    // get item from the api so have an object to work with
    const itemData = await getItemById(itemId);
    const item = itemData.data;
    console.log(item);

    // put name on page
    document.querySelector('.page-title').innerHTML = item.name;
    // put id on page
    document.querySelector('#id').innerHTML = `Id ${item.id}`;
    document.querySelector('#item-id').setAttribute('value', itemId);

    // put img on page
    let img = document.querySelector('#item-img');
    img.setAttribute('src', item.image);
    img.setAttribute('alt', `A picture of a(n) ${item.name} from BoTW.`);

    // put description on page
    document.querySelector('#description').innerHTML = item.description;

    // if the item has drops
    if (item.drops && item.drops.length > 0) {
        createElement('h2', `${item.name} Drops`, '#description', 'title', 'drop-header');
        createElement('div', '', '#drop-header', 'title', 'drop-section')
        loopAndCreateElement('p', item.drops, '#drop-section', 'append', true)
        item.drops.forEach(function(drop) {
          addDropFromListener(`add-drop-${drop.replace(/\s+/g, '-')}`, itemId);  
        })
        
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
        loopAndCreateElement('p', item.common_locations, '#location', 'after');

    } else {
        createElement('p', 'No common locations', '#location');
    }

    // add event listeners
    addItemFormListener(itemId);
}

function addItemFormListener(itemId) {
    document.forms['add-item'].addEventListener('submit', (e) => {
        e.preventDefault();
        addToList(e.target, itemId);
    });
}

function addDropFromListener(formName, itemId){
    document.forms[formName].addEventListener('submit', (e) => {
        e.preventDefault();
        addToList(e.target, itemId, true);
    });
}


function addToList(formElement, itemId, drop) {
    const json = formDataToJSON(formElement)
    let itemArray;
    if (drop) { 
        itemArray = { 'itemId': itemId, 'quantity': json.quantity, 'drop': json.drop };
    } else {
        itemArray = { 'itemId': itemId, 'quantity': json.quantity };
    }

    console.log(itemArray)
    setLocalStorage('list', itemArray);
}
