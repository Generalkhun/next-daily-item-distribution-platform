import { get } from "lodash"
import { VillagerToAddObject } from "../../type"

export const mapRequestBodyAddVillagerFormState = (addVillagerFormstate: VillagerToAddObject, imgURLGGdrive: string) => {
    const mappedAddVillagerData = {
        HOME_ID: get(addVillagerFormstate, 'homeId'),
        HOUSE_REPRESENTATIVES_NAME: get(addVillagerFormstate, 'homeRepresentativesName'),
        HOUSE_LOCATION_LAT: get(addVillagerFormstate, 'homeLocation')[0],
        HOUSE_LOCATION_LNG: get(addVillagerFormstate, 'homeLocation')[1],
        CONTACT_NUMBER: get(addVillagerFormstate, 'homeRepresentativesContactNum'),
        FAMILY_SIZE: get(addVillagerFormstate, 'numberOfFamilyMember'),
        ADDR_DESCRIPTION: get(addVillagerFormstate, 'addressAdditionalDescription'),
        ITEM_RECIEVED: "",
        IMG_URL: imgURLGGdrive
    }
    console.log('mappedAddVillagerData', mappedAddVillagerData);

    return mappedAddVillagerData

}