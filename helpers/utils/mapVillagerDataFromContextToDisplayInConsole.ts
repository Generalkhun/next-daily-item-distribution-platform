import { includes, get, map } from 'lodash'
import { VillagerHomeData } from '../../type'
export const mapVillagerDataFromContextToDisplayInConsole = (displayVillagerState: any) => {
    const displayVillagerData = get(displayVillagerState, 'displayVillagerData')
    const currentSelectedItemId = get(displayVillagerState, 'filterCondition.itemCatSelected')

    return map(displayVillagerData, (villager) => {
        const itemsRecieved = get(villager, 'ITEM_RECIEVED')
        const isItemRecieved = findRecievedItem(currentSelectedItemId, itemsRecieved)

        return {
            homeId: get(villager, 'HOME_ID'),
            homeLocation: [parseFloat(get(villager, 'HOUSE_LOCATION_LAT')), parseFloat(get(villager, 'HOUSE_LOCATION_LNG'))] as [number,number],
            homeRepresentativesName: get(villager, 'HOUSE_REPRESENTATIVES_NAME'),
            isItemRecieved: isItemRecieved,
            homeRepresentativesImg: get(villager, 'IMG_URL'),
            numberOfFamilyMember: get(villager, 'FAMILY_SIZE'),
            homeRepresentativesContactNum: get(villager, 'CONTACT_NUMBER'),
            addressAdditionalDescription: get(villager, 'ADDR_DESCRIPTION'),
        }
    })
}


const findRecievedItem = (currentSelectedItemId: number, itemsRecieved: string):boolean => {
    const itemsRecievedArray = itemsRecieved.split(',')
    return includes(itemsRecievedArray, currentSelectedItemId.toString())
}