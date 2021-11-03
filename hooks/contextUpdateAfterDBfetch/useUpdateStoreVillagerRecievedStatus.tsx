import { filter } from "lodash";
import { useContext } from "react"
import { DisplayingVillagerDataContext } from "../../contextProviders/DisplayingVillagerDataContextProvider";

interface I {
    villagerId: string
    updatedRecievedItemList: string
}
interface R {
    updateVillagerRecievedStatus: ({ villagerId, updatedRecievedItemList }: I) => void
}
export const useUpdateStoreVillagerRecievedStatus = (): R => {
    // get from context
    const { displayVillagerState, displayVillagerDispatch } = useContext
        (DisplayingVillagerDataContext)

    const updateVillagerRecievedStatus = ({ villagerId, updatedRecievedItemList }: I) => {
        displayVillagerDispatch({ type: 'updateSuccessVillagerItemRecievedStatus', payload: { villagerId, updatedRecievedItemList  } })
    }
    return { updateVillagerRecievedStatus }
}