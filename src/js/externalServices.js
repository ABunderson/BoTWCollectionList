const baseURL = 'https://botw-compendium.herokuapp.com/api/v3/compendium';


// Get all items in a specific category
export async function getItemsByCategory(category) {
    const response = await fetch(baseURL + `/category/${category}`);
    const data = await convertToJson(response);
    return data;
}

// convert the item(s) from the compendium into a json
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "servicesError", message: data };
    }
}

// Get one item by id
export async function getItemById(id) {
    const response = await fetch(baseURL + `/entry/${id}`);
    const data = await convertToJson(response);
    return data;
}

// Get all items in the compendium
export async function getAllItems() {
    const response = await fetch(baseURL + `/all`);
    const data = await convertToJson(response);
    return data;
}