import React, { useContext, useState } from 'react'

import { Editor, DrawRectangleMode } from 'react-map-gl-draw';
import { get, isEmpty } from 'lodash'
import { DisplayingVillagerDataContext } from '../../../../contextProviders/DisplayingVillagerDataContextProvider';
interface Props {

}

const DrawingLayer = (props: Props) => {
    const [selectedAreaLatLng, setSelectedAreaLatLng] = useState<any>([])
    const { displayVillagerState, displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    console.log('DrawingLayer displayVillagerState', displayVillagerState);
    console.log('selectedAreaLatLng.length', selectedAreaLatLng.length);


    const clickCreatingRectangleAreaHandler = (feature: any) => {
        const currentMapCoords = get(feature, 'mapCoords')
        // if mapCoords in feature returning undefine and we already got 2 locations, means that we got the rectangle
        if (selectedAreaLatLng.length === 1) {
            // save in the context if have 2 locations already
            displayVillagerDispatch({ type: 'filterByArea', payload: [...selectedAreaLatLng,currentMapCoords] })

            // reset selectedAreaLatLng state
            setSelectedAreaLatLng([])
            return
        }
        
        // else, we push the location into selectedAreaLatLng 
        setSelectedAreaLatLng((previousLocsState: any) => [...previousLocsState, currentMapCoords])

    }
    return (
        <Editor
            clickRadius={12}
            mode={new DrawRectangleMode()}
            onSelect={(feature: any) => clickCreatingRectangleAreaHandler(feature)}
        />
    )
}

export default DrawingLayer


