import { get } from "lodash"
import { VillagerToAddObject } from "../../type"

export const mapRequestBodyAddVillagerFormState = (addVillagerFormstate: VillagerToAddObject) => {
    return {
        HOME_ID: get(addVillagerFormstate, 'homeId'),
        HOUSE_REPRESENTATIVES_NAME: get(addVillagerFormstate, 'homeRepresentativesName'),
        HOUSE_LOCATION_LAT: get(addVillagerFormstate, 'homeLocation')[0],
        HOUSE_LOCATION_LNG: get(addVillagerFormstate, 'homeLocation')[1],
        CONTACT_NUMBER: get(addVillagerFormstate, 'homeRepresentativesContactNum'),
        FAMILY_SIZE: get(addVillagerFormstate, 'numberOfFamilyMember'),
        ADDR_DESCRIPTION: get(addVillagerFormstate, 'addressAdditionalDescription'),
        ITEM_RECIEVED: get(addVillagerFormstate, 'isItemRecieved'),
        IMG_URL: get(addVillagerFormstate, 'homeRepresentativesImg')
    }

}