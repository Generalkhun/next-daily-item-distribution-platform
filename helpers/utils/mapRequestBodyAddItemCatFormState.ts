import { get, isEmpty } from "lodash"
import { VillagerToAddObject } from "../../type"

export const mapRequestBodyAddItemCatFormState = (addItemCatFormstate: VillagerToAddObject, imgURLGGdrive: string, currentTotalItemCat: number) => {

    const ITEM_ID = currentTotalItemCat + 1
    const ITEM_TITLE = get(addItemCatFormstate, 'itemCatName')
    const DAYS_TO_SHORTS = get(addItemCatFormstate, 'itemToShortageDays')
    const ITEM_IMG_URL = imgURLGGdrive

    const mappedAddItemCatData = {
        ITEM_ID,
        ITEM_TITLE,
        DAYS_TO_SHORTS,
        ITEM_IMG_URL,
    }
    console.log('mappedAddItemCatData', mappedAddItemCatData);

    return mappedAddItemCatData

}