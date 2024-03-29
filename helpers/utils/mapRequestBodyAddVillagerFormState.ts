import { get, isEmpty } from "lodash"
import { VillagerToAddObject } from "../../type"

export const mapRequestBodyAddVillagerFormState = (addVillagerFormstate: VillagerToAddObject, imgURLGGdrive: string, currentTotalVillagers: number) => {

    const HOME_ID = currentTotalVillagers + 1
    const HOUSE_REPRESENTATIVES_NAME = get(addVillagerFormstate, 'homeRepresentativesName')
    const HOUSE_LOCATION_LAT = '"' + get(addVillagerFormstate, 'homeLocation')[0] + '"'
    const HOUSE_LOCATION_LNG = '"' + get(addVillagerFormstate, 'homeLocation')[1] + '"'
    const contactNumberFromState = '"' + get(addVillagerFormstate, 'homeRepresentativesContactNum') + '"'
    const CONTACT_NUMBER = isEmpty(contactNumberFromState) ? "" : contactNumberFromState
    const FAMILY_SIZE = get(addVillagerFormstate, 'numberOfFamilyMember')
    const addressDescriptionFromState = get(addVillagerFormstate, 'addressAdditionalDescription')
    const ADDR_DESCRIPTION = isEmpty(addressDescriptionFromState) ? "" : addressDescriptionFromState
    const ITEM_RECIEVED = '""'
    const IMG_URL = imgURLGGdrive
    const ITEM_RECIEVED_EXP_DATE = '""'

    const mappedAddVillagerData = {
        HOME_ID,
        HOUSE_REPRESENTATIVES_NAME,
        HOUSE_LOCATION_LAT,
        HOUSE_LOCATION_LNG,
        CONTACT_NUMBER,
        FAMILY_SIZE,
        ADDR_DESCRIPTION,
        ITEM_RECIEVED,
        IMG_URL,
        ITEM_RECIEVED_EXP_DATE,
    }

    return mappedAddVillagerData

}