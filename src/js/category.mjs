import { getItemsByCategory, getAllItems } from './externalServices';
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
    renderListWithTemplate(cardTemplate, el, items.data);

}
export async function handleSearch(search, selector) {

    // get list of all items
    let listToSearch = await getAllItems();

    let numberCheck = Number(search);
    let uniqueList = [];
    if (typeof numberCheck == 'number' && !isNaN(numberCheck)) {
        let numberList = [];
        console.log(listToSearch)
        console.log(typeof listToSearch.data[0].id)
        numberList = listToSearch.data.filter(item => item.id.toString().includes(search));
        console.log(numberList);
        uniqueList = numberList
    } else {
        // console.log(listToSearch.data);
        let searchedList = [];
        let searchDrop = [];

        searchedList = listToSearch.data.filter(item => item.name.includes(search));

        searchDrop = listToSearch.data.filter(item => filterWithDrops(item, search));
        console.log(searchDrop)
        const addedLists = searchedList.concat(searchDrop);
        uniqueList = [...new Set(addedLists)]
    }

    // add the title
    const pageTitle = document.querySelector('#category-title');
    pageTitle.innerHTML = `Search for: ${search}`;

    // get the html element
    const el = document.querySelector(selector);

    // send through template
    // render out the product list to the element
    renderListWithTemplate(cardTemplate, el, uniqueList);

}

function filterWithDrops(item, search) {
    if (item.drops) {

        if (item.drops.includes(search)) {
            return true;
        }
        let check = false;
        item.drops.forEach((drop) => {
            if (drop.includes(search)) {
                check = true
            }
        })
        if (check) {
            return true;
        }
        return false;
    }

    return false;
}

// make a template
function cardTemplate(item) {
    let output = `
    <li>
        <a class="card" href="/item/index.html?itemId=${item.id}">
            <img src="${item.image}" alt="A picture of a ${item.name} from BoTW.">

            <h3 class="card-title">${item.name}</h3>
            <h3 class="card-id">Id ${item.id}</h3>
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