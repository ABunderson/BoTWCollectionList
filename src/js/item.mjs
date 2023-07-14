import { getItemById } from './externalServices';
import { createElement, loopAndCreateElement, addToList } from './utils';

export async function createItemInformation(itemId) {
    // console.log(itemId);
    if (!(itemId >= 1) || !(itemId <= 389)) {
        document.querySelector('.page-title').innerHTML = 'The item id is not correct. Please try again.';
        document.querySelector('#item-info').innerHTML = '';
        return;
        // console.log('wrong')
    }
    // get item from the api so have an object to work with
    const itemData = await getItemById(itemId);
    const item = itemData.data;

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
        createElement('h2', `${item.name} Drops`, '#description', 'after', 'title', 'drop-header');
        createElement('div', '', '#drop-header', 'after', 'title', 'drop-section');
        loopAndCreateElement('p', item.drops, '#drop-section', 'append', true);

        item.drops.forEach(function (drop) {
            addDropFromListener(`add-${drop.replace(/\s+/g, '-')}`, itemId);
        })
    }

    // if the item has an effect when cooking 
    if (item.cooking_effect) {
        createElement('h2', `${item.name} cooking effect`, '#description', 'after', 'title', 'cooking');
        createElement('p', `Hearts recovered: ${item.hearts_recovered}`, '#cooking', 'after');
        createElement('p', `Special effect: ${item.cooking_effect}`, '#cooking', 'after',);
    }

    // only if attack is set
    if (item.attack) {
        // weapon strength and defense
        createElement('h2', 'Equipment Strength', '#description', 'after', 'title', 'power');
        createElement('p', `Defense ${item.defense}`, '#power', 'after');
        createElement('p', `Attack ${item.attack}`, '#power', 'after');
    }

    //location
    if (item.common_locations) {
        loopAndCreateElement('p', item.common_locations, '#location', 'after');

    } else {
        createElement('p', 'No common locations', '#location', 'after');
    }

    // add event listeners
    addItemFormListener(itemId);
}

async function addItemFormListener(itemId) {
    document.forms['add-item'].addEventListener('submit', (e) => {
        e.preventDefault();
        const date = new Date();
        addToList(e.target, itemId, date);
    });
}

function addDropFromListener(formName, itemId) {
    document.forms[formName].addEventListener('submit', (e) => {
        e.preventDefault();
        const date = new Date();
        addToList(e.target, itemId, date, true);
    });
}
