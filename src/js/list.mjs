import { getLocalStorage, createElement, setLocalStorage } from "./utils"

export function renderCollectionList() {

    const list = getLocalStorage('list');
    document.querySelector('.collection-list').innerHTML = '';

    list.sort((p1, p2) => (p1.item.name > p2.item.name) ? 1 : (p1.item.name < p2.item.name) ? -1 : 0);

    list.map((listItem, index) =>

        createItem(listItem, index)
    );
}

// function that works for 1 item to output it on page
function createItem(listItem, index) {

    createElement('div', '', '.collection-list', 'append', 'list-item', `item-${index}`);

    // header
    if (listItem.drop) {
        createElement('h2', `${listItem.item.name} - ${listItem.drop}`, `#item-${index}`, 'append', 'title', `title-${index}`);
    } else {
        createElement('h2', listItem.item.name, `#item-${index}`, 'append', 'title', `title-${index}`);
    }

    // image
    createElement('img', '', `#title-${index}`, 'after', 'list-img', `img-${index}`);
    let image = document.querySelector(`#img-${index}`);
    image.setAttribute('src', listItem.item.image);
    image.setAttribute('alt', `A picture of a(n) ${listItem.item.name} from BoTW`);
    
    // quantity
    createElement('p', 'Collect: ', `#img-${index}`, 'after', 'quantity-p', `quantity-${index}`);
    createElement('span', '- ', `#quantity-${index}`, 'append', 'list-button', `minus-${index}`);
    createElement('input', '', `#quantity-${index}`, 'append', 'list-number', `quantity-${index}-number`)
    let quantity = document.querySelector(`#quantity-${index}-number`);
    quantity.setAttribute('value', listItem.quantity);
    createElement('span', ' +', `#quantity-${index}`, 'append', 'list-button', `add-${index}`);
    createElement('span', ' X', `#quantity-${index}`, 'append', 'remove-item', `remove-item-${index}`);

    // listeners
    document.querySelector(`#remove-item-${index}`).addEventListener('click', () => { removeFromList(index) })
    // plus 1
    document.querySelector(`#add-${index}`).addEventListener('click', () => { addToQuantity(listItem, index) })
    // minus 1
    document.querySelector(`#minus-${index}`).addEventListener('click', () => { removeFromQuantity(listItem, index) })
    // update value
    document.querySelector(`#quantity-${index}-number`).addEventListener('change', () => { updateQuantity(listItem, index) })
}

function addToQuantity(listItem, index) {
    let number = Number(listItem.quantity);
    number += 1;
    listItem.quantity = number;

    removeFromList(index);
    setLocalStorage('list', listItem);
    renderCollectionList();
}

function removeFromQuantity(listItem, index) {
    let number = Number(listItem.quantity);
    number -= 1;
    listItem.quantity = number;

    removeFromList(index);
    setLocalStorage('list', listItem);
    renderCollectionList();
}


function updateQuantity(listItem, index) {
    const number = document.querySelector(`#quantity-${index}-number`).value;

    if (Number.isInteger(Number(number))) {

        listItem.quantity = number;
        removeFromList(index);

        if (listItem.quantity > 0) {
            setLocalStorage('list', listItem);
            renderCollectionList();
        }

    } else {
        renderCollectionList();
    }
}

function removeFromList(index) {
    const key = 'list'
    let currentArray = JSON.parse(localStorage.getItem(key));
    
    currentArray.sort((p1, p2) => (p1.item.name > p2.item.name) ? 1 : (p1.item.name < p2.item.name) ? -1 : 0);
    currentArray.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(currentArray));

    renderCollectionList()
}