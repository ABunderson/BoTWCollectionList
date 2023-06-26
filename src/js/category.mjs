import { getItemsByCategory } from './externalServices';
import { renderListWithTemplate } from './utils';

export async function createCategoryCards(category, selector) {
    // get items
    const items = await getItemsByCategory(category);

    // add the title
    const pageTitle = document.querySelector('.title');
    pageTitle.innerHTML = category;

    // get the html element
    const el = document.querySelector(selector);

    // send through template
    // render out the product list to the element
    if (category == 'creatures') {

        // renderListWithTemplate(cardTemplate, el, items.data.food);
        let headerFood = document.createElement('h2');
        headerFood.innerHTML = 'Food';
        pageTitle.after(headerFood)
        renderListWithTemplate(cardTemplate, el, items.data.food);

        //create a seperate list for non-food
        // non food header
        let headerNonFood = document.createElement('h2');
        headerNonFood.innerHTML = "Non Food";
        el.after(headerNonFood)

        // non food list
        let newList = document.createElement('ul');
        newList.setAttribute('class', 'card-list');
        newList.setAttribute('id', 'non-food-list');
        headerNonFood.after(newList)
        renderListWithTemplate(cardTemplate, newList, items.data.non_food);

    } else {
        renderListWithTemplate(cardTemplate, el, items.data);
    }

}

// make a template
function cardTemplate(item) {
    let output;
    if (item.common_locations === null) {
        output = `
        <li>
            <a class="card" href="/category/index.html?category=creatures">
                <img src="${item.image}" alt="A picture of a ${item.name} from BoTW.">

                <h3 class="card-title">${item.name}</h3>
                <h3 class="locations">Locations</h3>
                <div>
                    <p>No common locations</p>
                </div>
            </a>
        </li>`;
    } else {
        // console.log(item.common_locations.length)
        if (item.common_locations.length === 1) {
            output = `
                    <li>
                        <a class="card" href="/category/index.html?category=creatures">
                            <img src="${item.image}" alt="A picture of a ${item.name} from BoTW.">
                    
                            <h3 class="card-title">${item.name}</h3>
                            <h3 class="locations">Locations</h3>
                            <div>
                                <p>${item.common_locations}</p>
                            </div>
                        
                        </a>
                    </li>`;
        } else {
            output = `
                    <li>
                        <a class="card" href="/category/index.html?category=creatures">
                            <img src="${item.image}" alt="A picture of a ${item.name} from BoTW.">
                  
                                <h3 class="card-title">${item.name}</h3>
                                <h3 class="locations">Locations</h3>
                                <div>
                                    <p>${item.common_locations[0]}</p>
                                    <p>${item.common_locations[1]}</p>
                                </div>
                           
                        </a>
                    </li>`;
        }
    };

    return output;
}