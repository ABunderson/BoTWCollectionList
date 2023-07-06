import { getItemById, getItemsByCategory } from "./externalServices";

export async function getRanItemByCategory(category) {

    const items = await getItemsByCategory(category);

    let item;
    if (category == 'creatures') {
        const ranNum = Math.floor(Math.random() * 11);

        if (ranNum % 2 == 0) {
            item = items.data.food[Math.floor(Math.random() * items.data.food.length)];
        } else {
            item = items.data.non_food[Math.floor(Math.random() * items.data.non_food.length)];
        }

    } else {
        item = items.data[Math.floor(Math.random() * items.data.length)];
    }
    return item;
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameter = urlParams.get(param);
    return parameter;
}

export function renderListWithTemplate(template, parentElement, list) {
    // console.log(list)
    parentElement.innerHTML = "";
    const htmlString = list.map(template);
    parentElement.insertAdjacentHTML('afterbegin', htmlString.join(""));
}

export function loopAndCreateElement(element, array, insertionId, position, form) {
    array.forEach(function (value) {
        let createdElement = document.createElement(element);
        createdElement.innerHTML = value;
        if (position === 'after') {
            document.querySelector(insertionId).after(createdElement);
        } else {
            document.querySelector(insertionId).append(createdElement);
        }
        if (form === true) {
            let form = createQuantityForm(value, 'Add');

            createdElement.after(form);
            createElement('hr', '', `#add-drop-${value.replace(/\s+/g, '-')}`);
        }
    })
}

export function createQuantityForm(value, buttonMessage, index, quantity) {
    // console.log('need a form');
    // create form
    let createForm = document.createElement('form');
    createForm.setAttribute('name', `add-${value.replace(/\s+/g, '-')}`);
    if (index){
        createForm.setAttribute('id', `add-${value.replace(/\s+/g, '-')}${index}`);
    } else {
    createForm.setAttribute('id', `add-${value.replace(/\s+/g, '-')}`);
    }


    // hidden input
    let createHiddenInput = document.createElement('input');
    createHiddenInput.setAttribute('hidden', '');
    if (index) {
        createHiddenInput.setAttribute('value', index);
    } else {
        createHiddenInput.setAttribute('value', value);
    }
    createHiddenInput.setAttribute('type', 'text');
    createHiddenInput.setAttribute('name', 'drop');
    createForm.append(createHiddenInput);

    // label
    let createLabel = document.createElement('label');
    createLabel.setAttribute('for', 'quantity');
    // createLabel.innerHTML = `Add ${value}`;
    createLabel.innerHTML = `Quantity`;

    createForm.append(createLabel);

    // input
    let createInput = document.createElement('input');
    createInput.setAttribute('required', '');
    if (quantity) {
        createInput.setAttribute('value', quantity);
    } else {
        createInput.setAttribute('value', 1);
    }
    createInput.setAttribute('name', 'quantity');
    createInput.setAttribute('type', 'number');
    createForm.append(createInput);

    // button
    let createButton = document.createElement('button');
    createButton.setAttribute('type', 'submit');
    createButton.innerHTML = buttonMessage;
    createForm.append(createButton);

    return createForm;
    // createdElement.after(createForm);
    // createElement('hr', '', `#add-drop-${value.replace(/\s+/g, '-')}`);

}

export function setHamActiveCategory(selector) {
    let activeCategory = document.querySelector(`#header-start`).querySelector(`.${selector}`)
    activeCategory.setAttribute('class', 'active');
}

export function createElement(element, value, insertionId, position, classAtribute, id) {
    let createElement = document.createElement(element);
    createElement.innerHTML = value;
    if (classAtribute) {
        createElement.setAttribute('class', classAtribute)
    }
    if (id) {
        createElement.setAttribute('id', id)
    }
    if (position === 'after') {
        document.querySelector(insertionId).after(createElement);
    }
    if (position === 'append') {
        document.querySelector(insertionId).append(createElement);
    }
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
    if (key == 'list') {
        let currentArray = JSON.parse(localStorage.getItem(key)) || [];
        currentArray.push(data);
        localStorage.setItem(key, JSON.stringify(currentArray));
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

export function menuClick() {
    // console.log('clicked the menu')
    let menu = document.querySelector('.menu');
    menu.classList.toggle('show');
    let menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('show');
    menuToggle.classList.toggle('hide');
    let menuList = document.querySelector('#menu-list');
    menuList.classList.toggle('hide');
}

export async function addToList(formElement, itemId, drop) {
    const json = formDataToJSON(formElement)
    let itemArray;
    let item = await getItemById(itemId);
    // console.log(item.data)
    item = item.data;
    if (drop) { 
        itemArray = { item, 'quantity': json.quantity, 'drop': json.drop };
    } else {
        itemArray = { item, 'quantity': json.quantity };
    }

    // console.log(itemArray)
    setLocalStorage('list', itemArray);
}