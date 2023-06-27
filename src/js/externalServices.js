const baseURL = 'https://botw-compendium.herokuapp.com/api/v2';



export async function getItemsByCategory(category) {
    const response = await fetch(baseURL + `/category/${category}`);
    const data = await convertToJson(response);
    return data;
}

async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "servicesError", message: data };
    }
}

export async function getItemById(id) {
    const response = await fetch(baseURL + `/entry/${id}`);
    const data = await convertToJson(response);
    return data;
}