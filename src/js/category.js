import { createCategoryCards } from "./category.mjs";
import { getParam } from "./utils";

const category = getParam('category');

createCategoryCards(category, '.card-list');