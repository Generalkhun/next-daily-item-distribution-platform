import { get, isEmpty } from "lodash"
import { VillagerToAddObject } from "../../type"

export const mapRequestBodyAddItemCatFormState = (addItemCatFormstate: VillagerToAddObject, imgURLGGdrive: string, currentTotalItemCat: number) => {

    const ITEM_ID = currentTotalItemCat + 1
    const ITEM_TITLE = get(addItemCatFormstate, 'itemCatName')
    const DAYS_TO_SHORTS = get(addItemCatFormstate, 'itemToShortageDays')
    const ITEM_IMG_URL = imgURLGGdrive


    // const HOME_ID = currentTotalVillagers + 1
    // const HOUSE_REPRESENTATIVES_NAME = get(addVillagerFormstate, 'homeRepresentativesName')
    // const HOUSE_LOCATION_LAT = '"' + get(addVillagerFormstate, 'homeLocation')[0] + '"'
    // const HOUSE_LOCATION_LNG = '"' + get(addVillagerFormstate, 'homeLocation')[1] + '"'
    // const contactNumberFromState = '"' + get(addVillagerFormstate, 'homeRepresentativesContactNum') + '"'
    // const CONTACT_NUMBER = isEmpty(contactNumberFromState) ? "" : contactNumberFromState
    // const FAMILY_SIZE = get(addVillagerFormstate, 'numberOfFamilyMember')
    // const addressDescriptionFromState = get(addVillagerFormstate, 'addressAdditionalDescription')
    // const ADDR_DESCRIPTION = isEmpty(addressDescriptionFromState) ? "" : addressDescriptionFromState
    // const ITEM_RECIEVED = '""'
    // const IMG_URL = imgURLGGdrive

    const mappedAddItemCatData = {
        ITEM_ID,
        ITEM_TITLE,
        DAYS_TO_SHORTS,
        ITEM_IMG_URL,
    }
    console.log('mappedAddItemCatData', mappedAddItemCatData);

    return mappedAddItemCatData

}