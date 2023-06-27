import { getParam } from "./utils";
import { createItemInformation } from "./item.mjs";

const itemId = getParam('itemId');

createItemInformation(itemId);