import { filter } from "lodash";
import { useContext } from "react"
import { DisplayingVillagerDataContext } from "../contextProviders/DisplayingVillagerDataContextProvider"

export const useFindRecievedItemExpirationDateList = (personId: string): string => {
    // get from context
    const { displayVillagerState } = useContext
        (DisplayingVillagerDataContext)
    const selectedVillager = filter(displayVillagerState.allVillagerData, (villager) => {
        return villager.HOME_ID === personId
    })
    return selectedVillager[0].ITEM_RECIEVED_EXP_DATE
}