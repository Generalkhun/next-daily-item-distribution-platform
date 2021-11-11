import { get } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { findSelectedItemCatImgfromId } from '../helpers/utils/calcSummaryInfo'


const useSelectItemCatGetItemImg = () => {
    // get mapdata from dispalyVillagerData context
    const { displayVillagerState, displayVillagerDispatch } = useContext
        (DisplayingVillagerDataContext)

    // get item cat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)
    return findSelectedItemCatImgfromId(get(displayVillagerState, 'filterCondition.itemCatSelected'), googleSheetItemCatData)
}

export default useSelectItemCatGetItemImg
