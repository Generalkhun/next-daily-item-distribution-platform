import { get } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { findSelectedItemCatfromId } from '../helpers/utils/calcSummaryInfo'


const useSelectItemCatName = () => {
    // get mapdata from dispalyVillagerData context
    const { displayVillagerState, displayVillagerDispatch } = useContext
        (DisplayingVillagerDataContext)

    // get item cat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)
    return findSelectedItemCatfromId(get(displayVillagerState, 'filterCondition.itemCatSelected'), googleSheetItemCatData)
}

export default useSelectItemCatName
