import { getLocalStorage, createElement, createQuantityForm, menuClick } from "./utils"
import { getItemById } from "./externalServices";

document.querySelector('#menu').addEventListener('click', () => {
    menuClick();
});

renderCollectionList();

function renderCollectionList() {

    const list = getLocalStorage('list');
    console.log(list);
    
    list.sort((p1, p2) => (p1.itemId > p2.itemId) ? 1 : (p1.itemId < p2.itemId) ? -1 : 0);

    list.map((item, index) =>
        
        createItem(item, index)
  );
}

// function that works for 1 item to output it on page
async function createItem(listItem, index){
    index += 1;

    // console.log('create')
    const itemResponse = await getItemById(listItem.itemId);
    const item = itemResponse.data;
    // console.log(item)
    createElement('div', '', '.collection-list', 'append', 'list-item', `item-${index}`);
    createElement('img', '', `#item-${index}`, 'append', 'list-img', `img-${index}`);
    let image = document.querySelector(`#img-${index}`);
    image.setAttribute('src', item.image);
    image.setAttribute('alt', `A picture of a(n) ${item.name} from BoTW`);
    if (listItem.drop){
        createElement('h2', `${listItem.drop} from ${item.name}`, `#img-${index}`, 'after', 'title', `title-${index}`);
    } else {
        createElement('h2', item.name, `#img-${index}`, 'after', 'title', `title-${index}`);
    }
    
    // quantity
    const form = createQuantityForm(item.name, 'Update', index, listItem.quantity);
    document.querySelector(`#title-${index}`).after(form);

    // createElement('h3', `want ${listItem.quantity}`, `#title-${index}`, 'after')

    // remove
    createElement('span', 'X', `#add-${item.name.replace(/\s+/g, '-')}${index}`, 'after', 'remove-item', `remove-item-${index}`);

    addDropFromListener(`add-${item.name.replace(/\s+/g, '-')}${index}`, index, listItem);
    document.querySelector(`#remove-item-${index}`).addEventListener('click', () => { removeFromList(index) })

}

function addDropFromListener(formName, index, item){
    document.forms[formName].addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('pushed button' + index)
        if (item.drop){
            updateList(e.target, index, true);
        } else {
            updateList(e.target, index);
        }
        
    });
}

function removeFromList(index) {
    console.log('remove')
    const key = 'list'
    let currentArray = JSON.parse(localStorage.getItem(key));
    currentArray.sort((p1, p2) => (p1.itemId > p2.itemId) ? 1 : (p1.itemId < p2.itemId) ? -1 : 0);
    console.log(currentArray)
    index -= 1;
    currentArray.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(currentArray));

    document.querySelector('.collection-list').innerHTML = '';
    renderCollectionList()
}

function updateList(form, index, drop){

}