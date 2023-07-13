import { getItemsByCategory, getAllItems } from './externalServices';
import { renderListWithTemplate, createElement } from './utils';

export async function createCategoryCards(category, selector, sort) {
    // get items
    let items = await getItemsByCategory(category);
    items = items.data;
    console.log(items);

    // add the title
    const pageTitle = document.querySelector('#category-title');
    pageTitle.innerHTML = category;

    // get the html element
    const el = document.querySelector(selector);

    if (sort === 'nameSort') {
        items.sort((p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);

        if (checkForSort(items)) {
            items.sort((p1, p2) => (p1.name < p2.name) ? 1 : (p1.name > p2.name) ? -1 : 0);
        }
    } else if (sort === 'idSort') {
        items.sort((p1, p2) => (Number(p1.id) > Number(p2.id)) ? 1 : (Number(p1.id) < Number(p2.id)) ? -1 : 0);

        if (checkForSort(items)) {
            items.sort((p1, p2) => (Number(p1.id) < Number(p2.id)) ? 1 : (Number(p1.id) > Number(p2.id)) ? -1 : 0);
        }
    }
    // clear page
    el.innerHTML = '';

    // send through template
    // render out the product list to the element
    renderListWithTemplate(cardTemplate, el, items);

}

export async function handleSearch(search, selector, sort) {

    // get list of all items
    let listToSearch = await getAllItems();

    let numberCheck = Number(search);
    let uniqueList = [];
    if (typeof numberCheck == 'number' && !isNaN(numberCheck)) {
        let numberList = [];
        // console.log(listToSearch)
        // console.log(typeof listToSearch.data[0].id)
        numberList = listToSearch.data.filter(item => item.id.toString().includes(search));
        // console.log(numberList);
        uniqueList = numberList;
    } else {
        // console.log(listToSearch.data);
        let searchedList = [];
        let searchDrop = [];

        searchedList = listToSearch.data.filter(item => item.name.includes(search));

        searchDrop = listToSearch.data.filter(item => filterWithDrops(item, search));
        // console.log(searchDrop)
        const addedLists = searchedList.concat(searchDrop);
        uniqueList = [...new Set(addedLists)];
    }



    // add the title
    const pageTitle = document.querySelector('#category-title');
    pageTitle.innerHTML = `Search for: ${search}`;

    // make sure there is something returned
    if (uniqueList.length === 0) {
        createElement('h2', 'Looks like nothing matches your search', '#category-title', 'after');
        document.querySelector('#category-items').innerHTML = '';
        return;
    }

    // get the html element
    const el = document.querySelector(selector);

    // sort 
    if (sort === 'nameSort') {
        uniqueList.sort((p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);

        if (checkForSort(uniqueList)) {
            uniqueList.sort((p1, p2) => (p1.name < p2.name) ? 1 : (p1.name > p2.name) ? -1 : 0);
        }
    } else if (sort === 'idSort') {
        uniqueList.sort((p1, p2) => (Number(p1.id) > Number(p2.id)) ? 1 : (Number(p1.id) < Number(p2.id)) ? -1 : 0);

        if (checkForSort(uniqueList)) {
            uniqueList.sort((p1, p2) => (Number(p1.id) < Number(p2.id)) ? 1 : (Number(p1.id) > Number(p2.id)) ? -1 : 0);
        }
    }

    // clear html
    el.innerHTML = '';

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
                check = true;
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
    const activeCategory = document.querySelector(`#header-end`).querySelector(`.${selector}`);
    activeCategory.setAttribute('class', 'active');
}

function checkForSort(list) {
    const firstItemName = document.getElementsByClassName('card-title')[0].innerHTML;
    const sortFirstItemName = list[0].name;

    if (0 === firstItemName.localeCompare(sortFirstItemName)) {
        // console.log('already sort')
        return true;
    } else {
        // console.log('not sorted')
        return false;
    }
}

export function handleEmpty() {
    document.querySelector('#category-title').innerHTML = 'Sorry it looks like there are no items here.';
    document.querySelector('#category-items').innerHTML = '';
}

export function categorySortSelectors(category, search) {

    document.querySelector('#category-name-sort').addEventListener('click', () => {
        if (category) {
            createCategoryCards(category, '.card-list', 'nameSort');
        } else if (search) {
            handleSearch(search, '.card-list', 'nameSort');
        }
    })

    document.querySelector('#category-id-sort').addEventListener('click', () => {
        if (category) {
            createCategoryCards(category, '.card-list', 'idSort');
        } else if (search) {
            handleSearch(search, '.card-list', 'idSort');
        }
    })
}