import { getItemsByCategory } from "./externalServices";

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
    console.log(list)
    parentElement.innerHTML = "";
    const htmlString = list.map(template);
    parentElement.insertAdjacentHTML('afterbegin', htmlString.join(""));
}

export function loopAndCreateElement(element, array, insertionId, position, form) {
    array.forEach(function (value) {
        let createdElement = document.createElement(element);
        createdElement.innerHTML = value;
        if (position === 'after'){
        document.querySelector(insertionId).after(createdElement);
        } else {
            document.querySelector(insertionId).append(createdElement);
        }
        if (form === true) {
            // console.log('need a form');
            // create form
            let createForm = document.createElement('form');
            createForm.setAttribute('name', `add-drop-${value.replace(/\s+/g, '-')}`);
            createForm.setAttribute('id', `add-drop-${value.replace(/\s+/g, '-')}`);


            // hidden input
            let createHiddenInput = document.createElement('input');
            createHiddenInput.setAttribute('hidden', '');
            createHiddenInput.setAttribute('value', value);
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
            createInput.setAttribute('value', 1);
            createInput.setAttribute('name', 'quantity');
            createInput.setAttribute('type', 'number');
            createForm.append(createInput);

            // button
            let createButton = document.createElement('button');
            createButton.setAttribute('type', 'submit');
            createButton.innerHTML = 'Add';
            createForm.append(createButton);


            createdElement.after(createForm);
            createElement('hr', '', `#add-drop-${value.replace(/\s+/g, '-')}`);
        }
    })
}

export function createElement(element, value, insertionId, classAtribute, id) {
    let createElement = document.createElement(element);
    createElement.innerHTML = value;
    if (classAtribute) {
        createElement.setAttribute('class', classAtribute)
    }
    if (id) {
        createElement.setAttribute('id', id)
    }
    document.querySelector(insertionId).after(createElement);
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

export function menuClick(){
    console.log('clicked the menu')
    let menu = document.querySelector('.menu');
    menu.classList.toggle('show');
    let menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('show');
    menuToggle.classList.toggle('hide');
    let menuList = document.querySelector('#menu-list');
    menuList.classList.toggle('hide');
}