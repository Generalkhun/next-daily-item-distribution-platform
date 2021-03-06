import { get } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { findSelectedItemCatfromId } from '../helpers/utils/calcSummaryInfo'


const useSelectItemCat = () => {
    // get mapdata from dispalyVillagerData context
    const { displayVillagerState, displayVillagerDispatch } = useContext
        (DisplayingVillagerDataContext)

    // get item cat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)
    const { itemCatId, itemCatTitle } = findSelectedItemCatfromId(get(displayVillagerState, 'filterCondition.itemCatSelected'), googleSheetItemCatData)
    return [itemCatId,itemCatTitle]
}

export default useSelectItemCat
