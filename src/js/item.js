import { getParam, formDataToJSON, setLocalStorage } from "./utils";
import { createItemInformation } from "./item.mjs";
import { getItemById } from "./externalServices";

const itemId = getParam('itemId');

createItemInformation(itemId);

// document.getElementById().addEventListener(click(), () => {
//     console.log('clicked add button');
// })

//   // sort by price if it is
//   document.getElementById('priceSort').addEventListener('click', () => {
//     productList('.product-list', category, 'price');
//   });


// document.forms['add-item'].addEventListener('submit', (e) => {
//     e.preventDefault();
//     addToList(e.target, itemId);
// });

// function addToList(formElement, itemId, drop) {
//     const json = formDataToJSON(formElement)
//     let itemArray;
//     if (drop) { 
//         console.log('have a drop')
//     } else {
//         itemArray = { 'itemId': itemId, 'quantity': json.quantity };
//     }

//     console.log(itemArray)
//     // setLocalStorage('list', itemArray)
// }

// document.forms['add-drop'].addEventListener('submit', (e) => {
//     e.preventDefault();
//     addToList(e.target, itemId, true);
// });