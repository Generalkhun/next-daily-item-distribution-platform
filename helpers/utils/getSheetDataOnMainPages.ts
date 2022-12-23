import axios from "axios"
import { GET_ITEMCAT_GGSHEET_DATA, GET_VILLAGER_GGSHEET_DATA } from "../../constants"

export const fetchSheetVillagerData = async () => {
    const sheetVillagerDataRsp = await axios({
        method: 'get',
        url: GET_VILLAGER_GGSHEET_DATA
    })
    return sheetVillagerDataRsp.data.villagerData
}

export const fetchSheetItemCatData = async () => {
    const sheetItemCatDataRsp = await axios({
        method: 'get',
        url: GET_ITEMCAT_GGSHEET_DATA
    })
    return sheetItemCatDataRsp.data.itemCatData
}