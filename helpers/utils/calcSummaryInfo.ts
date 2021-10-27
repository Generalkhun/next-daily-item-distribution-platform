import { filter, reduce, find, get } from "lodash"

interface selectedItem {
    itemCatId: string
    itemCatTitle: string
}
export const findSelectedItemCatfromId = (selectedItemCatId: string, googleSheetItemCatData: any): selectedItem => {
    const itemCatRecordOnSheet = find(googleSheetItemCatData, (sheetData) => sheetData.ITEM_ID === selectedItemCatId)
    return {
        itemCatId: selectedItemCatId,
        itemCatTitle: get(itemCatRecordOnSheet, 'ITEM_TITLE')
    }

}
export const calcTotalHome = (villagerHomeListData: any): number => {

    return villagerHomeListData.length

}
export const calcTotalPeople = (villagerHomeListData: any): number => {
    return reduce(villagerHomeListData, (carry, current) => {
        return carry + parseInt(current.numberOfFamilyMember)
    }, 0)
}

export const calcTotalNonRecievedItemHome = (villagerHomeListData: any): number => {
    const recievedHouse = filter(villagerHomeListData, (villager) => !villager.isItemRecieved)
    return recievedHouse.length

}

export const calcTotalNonRecievedItemPeople = (villagerHomeListData: any): number => {
    const recievedHouse = filter(villagerHomeListData, (villager) => !villager.isItemRecieved)
    return reduce(recievedHouse, (carry, current) => {
        return carry + parseInt(current.numberOfFamilyMember)
    }, 0)

}