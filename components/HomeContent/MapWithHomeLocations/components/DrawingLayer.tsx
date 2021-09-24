import React, { useContext, useRef, useState } from 'react'

import { Editor, DrawRectangleMode } from 'react-map-gl-draw';
import { get, isEmpty, map } from 'lodash'
import { DisplayingVillagerDataContext } from '../../../../contextProviders/DisplayingVillagerDataContextProvider';
import { Feature, Layer } from 'react-mapbox-gl';
import { GeoJSONLayer } from 'react-mapbox-gl/lib/geojson-layer';
import { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import inside from "point-in-polygon";
import { findRecievedItem } from '../../../../helpers/utils/mapVillagerDataFromContextToDisplayInConsole';
interface Props {
}

const DrawingLayer = () => {

    //  const [isStaticRegRendered, setIsStaticRegRendered] = useState(false)
    // const [baseMarkers, setBaseMarkers] = useState<any>();
    const [selectedMarkers, setSelectedMarkers] = useState<any>();
    const [selectedAreaLatLng, setSelectedAreaLatLng] = useState<any>([])
    // const [features, setFeatures] = useState([]); // displaying rectangle on map
    const { displayVillagerState, displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    const isStaticRegRendered = get(displayVillagerState, 'isStaticRegRendered') // render static regtangle
    const mode = get(displayVillagerState, 'isDrawableMapMode') ? new DrawRectangleMode() : null
    const displayVillgerData = get(displayVillagerState, 'displayVillgerData')
    const isShowOnlyWaitingVillager = get(displayVillagerState, 'filterCondition.displayOnlyNotrecieved')
    const displayedRectangle = get(displayVillagerState, 'mapRectangle')
    console.log('isShowOnlyWaitingVillager', isShowOnlyWaitingVillager);

    // console.log('DrawingLayer displayVillagerState', displayVillagerState);
    // console.log('selectedAreaLatLng.length', selectedAreaLatLng.length);
    // console.log('isStaticRegRendered', isStaticRegRendered);
    const villagerList = get(displayVillagerState, 'displayVillagerData')
    const selectedItemCat = get(displayVillagerState, 'filterCondition.itemCatSelected')

    const isFilterByArea = get(displayVillagerState, 'filterCondition.isFilterByArea')
    console.log('isFilterByArea', isFilterByArea);



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

    console.log('baseMarkers', baseMarkers);



    const updateHandler = (val: any) => {
        console.log('val', val);

        displayVillagerDispatch({ type: 'updateMapRectangle', payload: val.data })
        if (val.editType === "addFeature") {
            const polygon = val.data[0].geometry.coordinates[0];
            //const polygon = displayedRectangle[0].geometry.coordinates[0];

            const newSelectedMarkers = map(baseMarkers, (baseMarker) => {
                console.log('baseMarker', baseMarker);

                const { longitude, latitude } = get(baseMarker, 'props');
                const isInsidePolygon = inside([longitude, latitude], polygon);
                return (
                    { ...baseMarker, isDisplay: isInsidePolygon }
                )
            })
            console.log('newSelectedMarkers', newSelectedMarkers);

            setSelectedMarkers(newSelectedMarkers);

            displayVillagerDispatch({ type: 'toggleDrawableMapModeOff' })
            //setFeatures([]);
        }

    }

    return (
        <>
            {
                isStaticRegRendered ? <>
                </>
                    :
                    <Editor
                        clickRadius={12}
                        // mode={new DrawRectangleMode()}
                        mode={mode as any}
                        //onSelect={(feature: any) => clickCreatingRectangleAreaHandler(feature)}
                        onUpdate={updateHandler}
                        //onSelect={clickCreatingRectangleAreaHandler}
                        features={displayedRectangle}
                    />
            }
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


