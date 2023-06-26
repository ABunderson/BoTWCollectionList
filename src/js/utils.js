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