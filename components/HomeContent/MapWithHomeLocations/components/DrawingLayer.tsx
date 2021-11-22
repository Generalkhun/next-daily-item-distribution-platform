import React, { useContext, useEffect, useState } from 'react'

import { Editor, DrawRectangleMode } from 'react-map-gl-draw';
import { get, isEmpty, map } from 'lodash'
import { DisplayingVillagerDataContext } from '../../../../contextProviders/DisplayingVillagerDataContextProvider';
import { Layer, Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import inside from "point-in-polygon";
import { findRecievedItem } from '../../../../helpers/utils/dataPrepFromVillagerDataContextToDisplayOnList';
import { CENTER_OF_DISTRIBUTION_LAT, CENTER_OF_DISTRIBUTION_LNG } from '../../../../constants';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { removeExpiredRecievedItems } from '../../../../helpers/utils/removeExpiredRecievedItems';
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
    const focusedVillagerId = get(displayVillagerState, 'focusedVillagerId').toString()
    const isFilterByArea = get(displayVillagerState, 'filterCondition.isFilterByArea')

    // functions
    const onClickMarkerHandler = (villagerHomeId: string) => {
        console.log('onClickMarkerHandler villagerHomeId', villagerHomeId);

        // update clicked homeId to a focus villager inside the context
        displayVillagerDispatch({ type: 'updateFocusingVillager', payload: villagerHomeId.toString() })

    }
    // create base markers to render without having the selected rectangle, showing conditions are recieved selected item
    const baseMarkers = map(villagerList,
        villager => {
            const nonExpiredRecievedItemsArray = removeExpiredRecievedItems(get(villager, 'ITEM_RECIEVED'),get(villager, 'ITEM_RECIEVED_EXP_DATE'))
            const recieved = findRecievedItem(selectedItemCat, nonExpiredRecievedItemsArray)
            console.log('recieved item baseMarkers',recieved);
            
            return (
                <Marker
                    onClick={() => onClickMarkerHandler(villager.HOME_ID)}
                    key={villager.HOME_ID}
                    longitude={parseFloat(villager.HOUSE_LOCATION_LNG)}
                    latitude={parseFloat(villager.HOUSE_LOCATION_LAT)} >
                    <>
                        {

                            (isShowOnlyWaitingVillager) ? (recieved ? <></> : <LocationOnIcon fontSize={focusedVillagerId === villager.HOME_ID ? 'large' : 'small'} color={'error'} />)
                                :
                                <LocationOnIcon fontSize={focusedVillagerId === villager.HOME_ID ? 'large' : 'small'} color={recieved ? 'success' : 'error'} />

                        }
                    </>
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

            {/* center of distrubution */}
            <Marker
                latitude={CENTER_OF_DISTRIBUTION_LAT}
                longitude={CENTER_OF_DISTRIBUTION_LNG}
            >
                <AccountBalanceIcon fontSize='large' />
            </Marker>


        </>


    )
}

export default DrawingLayer


