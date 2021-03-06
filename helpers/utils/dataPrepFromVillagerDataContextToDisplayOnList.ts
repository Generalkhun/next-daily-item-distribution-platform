import { includes, get, map, split, filter, isEmpty } from 'lodash'
import inside from 'point-in-polygon';
import { removeExpiredRecievedItems } from './removeExpiredRecievedItems';

export const dataPrepFromVillagerDataContextToDisplayOnList = (displayVillagerState: any) => {
    const isFilterByarea = get(displayVillagerState, 'filterCondition.isFilterByArea')
    const regtangleDrawn = get(displayVillagerState, 'mapRectangle')

    let filteredVillagerData = displayVillagerState
    // if filtered by area, should use mapRectangle to determine if the villager is inside the map or not 
    if (isFilterByarea && !isEmpty(regtangleDrawn)) {
        filteredVillagerData = filterVillagerDataContextWithDrawnRectangle(displayVillagerState, regtangleDrawn)
    }

    return mapVillagerDataFromContextToDisplayInConsole(filteredVillagerData)

}

const filterVillagerDataContextWithDrawnRectangle = (displayVillagerState: any, regtangleDrawn: any) => {

    const displayVillagerData = get(displayVillagerState, 'displayVillagerData')
    // filter only villager data that inside the polygon
    const filteredVillagerState = filter(displayVillagerData, (villager) => {

        return inside([parseFloat(villager.HOUSE_LOCATION_LNG), parseFloat(villager.HOUSE_LOCATION_LAT)], regtangleDrawn[0].geometry.coordinates[0])
    })
    return { ...displayVillagerState, displayVillagerData: filteredVillagerState }
}

const mapVillagerDataFromContextToDisplayInConsole = (displayVillagerState: any) => {
    const displayVillagerData = get(displayVillagerState, 'displayVillagerData')
    const currentSelectedItemId = get(displayVillagerState, 'filterCondition.itemCatSelected')

    return map(displayVillagerData, (villager) => {
        //const itemsRecieved = get(villager, 'ITEM_RECIEVED')
        const nonExpiredRecievedItemsArray = removeExpiredRecievedItems(get(villager, 'ITEM_RECIEVED'),get(villager, 'ITEM_RECIEVED_EXP_DATE'))
        const isItemRecieved = findRecievedItem(currentSelectedItemId, nonExpiredRecievedItemsArray)

        return {
            homeId: get(villager, 'HOME_ID'),
            homeLocation: [get(villager, 'HOUSE_LOCATION_LAT'), get(villager, 'HOUSE_LOCATION_LNG')] as [string, string],
            homeRepresentativesName: get(villager, 'HOUSE_REPRESENTATIVES_NAME'),
            isItemRecieved: isItemRecieved,
            homeRepresentativesImg: get(villager, 'IMG_URL'),
            numberOfFamilyMember: get(villager, 'FAMILY_SIZE'),
            homeRepresentativesContactNum: get(villager, 'CONTACT_NUMBER'),
            addressAdditionalDescription: get(villager, 'ADDR_DESCRIPTION'),
        }
    })
}


export const findRecievedItem = (currentSelectedItemId: number, nonExpiredRecievedItemsArray: string[]): boolean => {
    //const itemsRecievedArray = split(itemsRecieved, ',')
    return includes(nonExpiredRecievedItemsArray, currentSelectedItemId.toString())
}