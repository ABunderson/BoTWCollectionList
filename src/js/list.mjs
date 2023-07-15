import { getLocalStorage, createElement, setLocalStorage } from './utils';

let sortVariable;
// console.log('in outer ' + sortVariable)

export function renderCollectionList(sort) {

    const list = getLocalStorage('list');
    console.log(sort)

    if (list === null) {
        // console.log('list null')
        document.querySelector('#collection-items').innerHTML = '';
        createElement('h2', `Looks like you don't have any items. Add some to start your list!`, '#main-collection-header', 'after');
        return;
    } else if (list.length <= 0) {
        // console.log(list)
        // console.log('empty list')
        document.querySelector('#collection-items').innerHTML = '';
        createElement('h2', `Looks like you don't have any items. Add some to start your list!`, '#main-collection-header', 'after');
        return;
    }


    // sort here
    list.sort((p1, p2) => (p1.date > p2.date) ? 1 : (p1.date < p2.date) ? -1 : 0);

    if (sort === 'nameSort') {
        sortVariable = sort;

        list.sort((p1, p2) => (p1.drop > p2.drop) ? 1 : (p1.drop < p2.drop) ? -1 : 0 || (p1.item.name > p2.item.name) ? 1 : (p1.item.name < p2.item.name) ? -1 : 0);

        if (checkForSortList(list)) {
            list.sort((p1, p2) => (p1.drop < p2.drop) ? 1 : (p1.drop > p2.drop) ? -1 : 0 || (p1.item.name < p2.item.name) ? 1 : (p1.item.name > p2.item.name) ? -1 : 0);
        }

    } else if (sort === 'dateSort') {
        sortVariable = sort;
        list.sort((p1, p2) => (p1.date > p2.date) ? 1 : (p1.date < p2.date) ? -1 : 0);

        if (checkForSortList(list)) {
            list.sort((p1, p2) => (p1.date < p2.date) ? 1 : (p1.date > p2.date) ? -1 : 0);
        }

    } else if (sort === 'quantitySort') {
        sortVariable = sort;
        list.sort((p1, p2) => (Number(p1.quantity) > Number(p2.quantity)) ? 1 : (Number(p1.quantity) < Number(p2.quantity)) ? -1 : 0);

        if (checkForSortList(list)) {
            list.sort((p1, p2) => (Number(p1.quantity) < Number(p2.quantity)) ? 1 : (Number(p1.quantity) > Number(p2.quantity)) ? -1 : 0);
        }
    }

    // console.log('in run ' + sortVariable)
    document.querySelector('.collection-list').innerHTML = '';

    list.map((listItem, index) =>
        createItem(listItem, index)
    );

    //clear locations
    document.querySelector('.locations-list').innerHTML = '';

    // output the different locations to search
    list.forEach(listItem => getLocations(listItem));
}

// function that works for 1 item to output it on page
function createItem(listItem, index) {

    createElement('div', '', '.collection-list', 'append', 'list-item', `item-${index}`);

    // header
    if (listItem.drop) {
        createElement('h3', `${listItem.item.name} - ${listItem.drop}`, `#item-${index}`, 'append', 'title', `title-${index}`);
    } else {
        createElement('h3', listItem.item.name, `#item-${index}`, 'append', 'title', `title-${index}`);
    }

    // image
    if (listItem.item.image) {
        createElement('img', '', `#title-${index}`, 'after', 'list-img', `img-${index}`);
        let image = document.querySelector(`#img-${index}`);
        image.setAttribute('src', listItem.item.image);
        image.setAttribute('alt', `A picture of a(n) ${listItem.item.name} from BoTW`);

        // start quantity
        createElement('p', 'Collect: ', `#img-${index}`, 'after', 'quantity-p', `quantity-${index}`);
    } else {
        // start quantity
        createElement('p', 'Collect: ', `#title-${index}`, 'after', 'quantity-p', `quantity-${index}`);
    }

    // quantity

    createElement('span', '-', `#quantity-${index}`, 'append', 'list-add', `minus-${index}`);
    createElement('input', '', `#quantity-${index}`, 'append', 'list-number', `quantity-${index}-number`);
    let quantity = document.querySelector(`#quantity-${index}-number`);
    quantity.setAttribute('value', listItem.quantity);
    createElement('span', '+', `#quantity-${index}`, 'append', 'list-minus', `add-${index}`);
    createElement('span', ' X', `#quantity-${index}`, 'append', 'remove-item', `remove-item-${index}`);

    // listeners
    document.querySelector(`#remove-item-${index}`).addEventListener('click', () => { removeFromList(listItem, true) });
    // plus 1
    document.querySelector(`#add-${index}`).addEventListener('click', () => { addToQuantity(listItem, index) });
    // minus 1
    document.querySelector(`#minus-${index}`).addEventListener('click', () => { removeFromQuantity(listItem, index) });
    // update value
    document.querySelector(`#quantity-${index}-number`).addEventListener('change', () => { updateQuantity(listItem, index) });
}

function addToQuantity(listItem, index) {
    let number = Number(listItem.quantity);
    number += 1;
    listItem.quantity = number;

    removeFromList(listItem, false);
    setLocalStorage('list', listItem);
    renderCollectionList(sortVariable);
}

function removeFromQuantity(listItem) {
    let number = Number(listItem.quantity);
    number -= 1;
    listItem.quantity = number;

    if (number <= 0) {
        removeFromList(listItem, true);

    } else {
        removeFromList(listItem, false);
        setLocalStorage('list', listItem);
        renderCollectionList(sortVariable);
    }
}


function updateQuantity(listItem, index) {
    const number = document.querySelector(`#quantity-${index}-number`).value;

    if (Number.isInteger(Number(number))) {

        listItem.quantity = number;
        removeFromList(listItem, false);

        if (listItem.quantity > 0) {
            setLocalStorage('list', listItem);
            renderCollectionList(sortVariable);
        }

    } else {
        renderCollectionList(sortVariable);
    }
}

function removeFromList(listItem, reload) {
    const key = 'list';
    let currentArray = JSON.parse(localStorage.getItem(key));
    const itemPosition = currentArray.findIndex((item) => item.date == listItem.date);

    currentArray.splice(itemPosition, 1);
    localStorage.setItem(key, JSON.stringify(currentArray));

    if (reload) {
        renderCollectionList(sortVariable);
    }
}

function getLocations(listItem) {

    // get the array of locations
    if (listItem.item.common_locations) {

        let locations = listItem.item.common_locations;
        // loop through array
        locations.forEach(location =>
            outputLocation(listItem, location)
        )

    } else {
        //items without a common location
        outputLocation(listItem, 'no-location', 'No Common Locations');
    }
}

function outputLocation(listItem, location, noLocationValue) {
    // check if the header has already been created
    if (document.querySelector(`#${location.replace(/\s+/g, '-')}`)) {

        // check for drop 
        if (listItem.drop) {
            // add item in
            createElement('p', `${listItem.item.name} - ${listItem.drop} - ${listItem.quantity}`, `#${location.replace(/\s+/g, '-')}`, 'after');
        } else {
            // add item in
            createElement('p', `${listItem.item.name} - ${listItem.quantity}`, `#${location.replace(/\s+/g, '-')}`, 'after');
        }

    } else {
        if (noLocationValue) {
            // create the header
            createElement('h3', noLocationValue, '.locations-list', 'append', '', `${location.replace(/\s+/g, '-')}`);
        } else {
            // create the header
            createElement('h3', `${location}`, '.locations-list', 'append', '', `${location.replace(/\s+/g, '-')}`);
        }
        // check for drop 
        if (listItem.drop) {
            // add item in
            createElement('p', `${listItem.item.name} - ${listItem.drop} - ${listItem.quantity}`, `#${location.replace(/\s+/g, '-')}`, 'after');
        } else {
            // add item in
            createElement('p', `${listItem.item.name} - ${listItem.quantity}`, `#${location.replace(/\s+/g, '-')}`, 'after');
        }
    }
}

function checkForSortList(list) {
    const firstItemName = document.getElementsByClassName('title')[0].innerHTML;
    const firstItemQuantity = Number(document.querySelector('#quantity-0-number').value);

    let sortFirstItemName;
    if (list[0].drop) {
        sortFirstItemName = `${list[0].item.name} - ${list[0].drop}`;
    } else {
        sortFirstItemName = list[0].item.name;
    }
    const sortFirstItemQuantity = Number(list[0].quantity);

    if (0 === firstItemName.localeCompare(sortFirstItemName) && firstItemQuantity === sortFirstItemQuantity) {
        return true;
    } else {
        return false;
    }
}

function listSortSelectors() {

    document.querySelector('#list-name-sort').addEventListener('click', () => {
        // console.log('name sort')
        renderCollectionList('nameSort');
    })

    document.querySelector('#list-date-sort').addEventListener('click', () => {
        renderCollectionList('dateSort');
    })

    document.querySelector('#list-quantity-sort').addEventListener('click', () => {
        renderCollectionList('quantitySort');
    })
}