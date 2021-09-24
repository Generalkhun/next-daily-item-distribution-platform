import React, { useContext, useEffect, useRef, useState } from 'react'

import { Editor, DrawRectangleMode } from 'react-map-gl-draw';
import { get, isEmpty, map } from 'lodash'
import { DisplayingVillagerDataContext } from '../../../../contextProviders/DisplayingVillagerDataContextProvider';
import { Feature, Layer } from 'react-mapbox-gl';
import { GeoJSONLayer } from 'react-mapbox-gl/lib/geojson-layer';
import { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import inside from "point-in-polygon";
import { findRecievedItem } from '../../../../helpers/utils/dataPrepFromVillagerDataContextToDisplayOnList';
interface Props {
}

const DrawingLayer = () => {
    const [selectedMarkers, setSelectedMarkers] = useState<any>();
    const { displayVillagerState, displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)

    // get states from the context
    const mode = get(displayVillagerState, 'isDrawableMapMode') ? new DrawRectangleMode() : null
    const isShowOnlyWaitingVillager = get(displayVillagerState, 'filterCondition.displayOnlyNotrecieved')
    const displayedRectangle = get(displayVillagerState, 'mapRectangle')
    const villagerList = get(displayVillagerState, 'displayVillagerData')
    const selectedItemCat = get(displayVillagerState, 'filterCondition.itemCatSelected')

    const isFilterByArea = get(displayVillagerState, 'filterCondition.isFilterByArea')

    // create base markers to render without having the selected rectangle, showing conditions are recieved selected item
    const baseMarkers = map(villagerList,
        villager => {
            const recieved = findRecievedItem(selectedItemCat, get(villager, 'ITEM_RECIEVED'))
            return (
                <Marker key={villager.HOME_ID} longitude={parseFloat(villager.HOUSE_LOCATION_LNG)} latitude={parseFloat(villager.HOUSE_LOCATION_LAT)} >
                    {(isShowOnlyWaitingVillager) ? (recieved ? <></> : <LocationOnIcon color={'error'} />)
                        :
                        <LocationOnIcon color={recieved ? 'success' : 'error'} />}
                </Marker>
            )
        }
    )



    // updating markers function, adding isDisplay on wether its inside the rectangle or not
    const selectedMarkersCreationHandler = (baseMarkers: any, polygon: any) => {
        const newSelectedMarkers = map(baseMarkers, (baseMarker) => {
            const { longitude, latitude } = get(baseMarker, 'props');
            const isInsidePolygon = inside([longitude, latitude], polygon);
            return (
                { ...baseMarker, isDisplay: isInsidePolygon }
            )
        })
        setSelectedMarkers(newSelectedMarkers);
        // update displaying marker inside the context to re-render the displaying list


    }


    /**
     * Create side effect to force re creating new selectedMarkers again 
     * for the edge case that if rectangle is already rendered, 
     * when the filtering condition in the context changed, all marker should be re-render to
     *  */
    useEffect(() => {
        if (!isEmpty(displayedRectangle)) {
            selectedMarkersCreationHandler(baseMarkers, displayedRectangle[0].geometry.coordinates[0])
        }
    }, [displayVillagerState])

    const updateHandler = (val: any) => {
        displayVillagerDispatch({ type: 'updateMapRectangle', payload: val.data })
        if (val.editType === "addFeature") {
            const polygon = val.data[0].geometry.coordinates[0];
            selectedMarkersCreationHandler(baseMarkers, polygon) // add created markers to state
            displayVillagerDispatch({ type: 'toggleDrawableMapModeOff' })
        }

    }
    return (
        <>
            <Editor
                clickRadius={12}
                mode={mode as any}
                onUpdate={updateHandler}
                features={displayedRectangle}
            />
            {/* markers */}
            {isFilterByArea ?
                (
                    isEmpty(displayedRectangle) ? baseMarkers : (
                        map(selectedMarkers,
                            (selectedMarker: any) => {
                                return (<>
                                    {selectedMarker.isDisplay ? selectedMarker : <></>}
                                </>
                                )
                            }
                        )
                    )
                )

                : baseMarkers
            }


        </>


    )
}

export default DrawingLayer


