import { get } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'

interface Props {

}
const useCursor = () => {
    const { displayVillagerState, displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    const isDrawableMapMode = get(displayVillagerState, 'isDrawableMapMode')
    return [isDrawableMapMode ? 'crosshair' : 'pointer']
}

export default useCursor
