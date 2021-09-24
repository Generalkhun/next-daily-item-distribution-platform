import { includes, get, map, split, filter, isEmpty } from 'lodash'
import inside from 'point-in-polygon';
import { VillagerHomeData } from '../../type'

export const dataPrepFromVillagerDataContextToDisplayOnList = (displayVillagerState: any) => {
    console.log('dataPrepFromVillagerDataContextToDisplayOnList displayVillagerState', displayVillagerState);
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
    console.log('filterVillagerDataContextWithDrawnRectangle : filteredVillagerState', filteredVillagerState);


    return { ...displayVillagerState, displayVillagerData: filteredVillagerState }
}

const mapVillagerDataFromContextToDisplayInConsole = (displayVillagerState: any) => {
    const displayVillagerData = get(displayVillagerState, 'displayVillagerData')
    const currentSelectedItemId = get(displayVillagerState, 'filterCondition.itemCatSelected')

    return map(displayVillagerData, (villager) => {
        const itemsRecieved = get(villager, 'ITEM_RECIEVED')
        const isItemRecieved = findRecievedItem(currentSelectedItemId, itemsRecieved)

        return {
            homeId: get(villager, 'HOME_ID'),
            homeLocation: [parseFloat(get(villager, 'HOUSE_LOCATION_LAT')), parseFloat(get(villager, 'HOUSE_LOCATION_LNG'))] as [number, number],
            homeRepresentativesName: get(villager, 'HOUSE_REPRESENTATIVES_NAME'),
            isItemRecieved: isItemRecieved,
            homeRepresentativesImg: get(villager, 'IMG_URL'),
            numberOfFamilyMember: get(villager, 'FAMILY_SIZE'),
            homeRepresentativesContactNum: get(villager, 'CONTACT_NUMBER'),
            addressAdditionalDescription: get(villager, 'ADDR_DESCRIPTION'),
        }
    })
}


export const findRecievedItem = (currentSelectedItemId: number, itemsRecieved: string): boolean => {
    const itemsRecievedArray = split(itemsRecieved, ',')
    return includes(itemsRecievedArray, currentSelectedItemId.toString())
}