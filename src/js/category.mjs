import { getItemsByCategory } from './externalServices';
import { renderListWithTemplate, createElement } from './utils';

export async function createCategoryCards(category, selector) {
    // get items
    const items = await getItemsByCategory(category);

    // add the title
    const pageTitle = document.querySelector('#category-title');
    pageTitle.innerHTML = category;

    // get the html element
    const el = document.querySelector(selector);

    // send through template
    // render out the product list to the element
    if (category == 'creatures') {

        // renderListWithTemplate(cardTemplate, el, items.data.food);
        createElement('h2', 'Food', '.title', 'after')
        renderListWithTemplate(cardTemplate, el, items.data.food);

        //create a seperate list for non-food
        // non food header
        createElement('h2', 'Non Food', selector, 'after', 'title', 'non-food-header');

        // non food list
        createElement('ul', '', '#non-food-header', 'after', 'card-list', 'non-food-list');

        const newList = document.querySelector('#non-food-list');
        renderListWithTemplate(cardTemplate, newList, items.data.non_food);

    } else {
        renderListWithTemplate(cardTemplate, el, items.data);
    }

}

// make a template
function cardTemplate(item) {
    let output = `
    <li>
        <a class="card" href="/item/index.html?itemId=${item.id}">
            <img src="${item.image}" alt="A picture of a ${item.name} from BoTW.">

            <h3 class="card-title">${item.name}</h3>
            <h3 class="locations">Locations</h3>
            <div>`;

    if (item.common_locations === null) {
        output += `<p>No common locations</p>`;

    } else {
        item.common_locations.forEach(function (value) {
            output += `<p>${value}</p>`;
        })
    }

    output += `
            </div>
        </a>
    </li>`;

    return output;
}

export function setActiveCategory(selector) {
    let activeCategory = document.querySelector(`#header-end`).querySelector(`.${selector}`)
    activeCategory.setAttribute('class', 'active');
}