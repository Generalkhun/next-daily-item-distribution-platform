import { filter } from "lodash";
import { useContext } from "react"
import { DisplayingVillagerDataContext } from "../contextProviders/DisplayingVillagerDataContextProvider"
import { GoogleSheetDataContext } from "../contextProviders/GoogleSheetContextProvider";

export const useFindItemDayToShorts = (itemCatId: string): string => {

    // get item cat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)
    const focusedItem = filter(googleSheetItemCatData, (itemCat) => {
        return itemCat.ITEM_ID === itemCatId
    })
    return focusedItem[0].DAYS_TO_SHORTS
}