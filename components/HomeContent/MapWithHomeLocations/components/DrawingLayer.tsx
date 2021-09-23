import React, { useContext, useRef, useState } from 'react'

import { Editor, DrawRectangleMode } from 'react-map-gl-draw';
import { get, isEmpty, map } from 'lodash'
import { DisplayingVillagerDataContext } from '../../../../contextProviders/DisplayingVillagerDataContextProvider';
import { Feature, Layer } from 'react-mapbox-gl';
import { GeoJSONLayer } from 'react-mapbox-gl/lib/geojson-layer';
import { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import inside from "point-in-polygon";
interface Props {
    baseMarkers: Array<any>
}

const DrawingLayer = ({ baseMarkers }: Props) => {
    //  const [isStaticRegRendered, setIsStaticRegRendered] = useState(false)
    const [selectedMarkers, setSelectedMarkers] = useState<any>([]);
    const [selectedAreaLatLng, setSelectedAreaLatLng] = useState<any>([])
    const [features, setFeatures] = useState([]); // displaying rectangle on map
    const { displayVillagerState, displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    const isStaticRegRendered = get(displayVillagerState, 'isStaticRegRendered') // render static regtangle
    const mode = get(displayVillagerState, 'isDrawableMapMode') ? new DrawRectangleMode() : null
    const displayVillgerData = get(displayVillagerState, 'displayVillgerData')
    console.log('DrawingLayer displayVillagerState', displayVillagerState);
    console.log('selectedAreaLatLng.length', selectedAreaLatLng.length);
    console.log('isStaticRegRendered', isStaticRegRendered);


    const clickCreatingRectangleAreaHandler = (feature: any) => {
        const currentMapCoords = get(feature, 'mapCoords')
        // if mapCoords in feature returning undefine and we already got 2 locations, means that we got the rectangle
        if (selectedAreaLatLng.length === 1) {
            // save in the context if have 2 locations already
            //displayVillagerDispatch({ type: 'filterByArea', payload: [...selectedAreaLatLng, currentMapCoords] })

            // reset selectedAreaLatLng state
            //setSelectedAreaLatLng([])

            // set map mode to non drawable
            displayVillagerDispatch({ type: 'toggleDrawableMapModeOff' })
            return
        }

        // else, we push the location into selectedAreaLatLng 
        //setSelectedAreaLatLng((previousLocsState: any) => [...previousLocsState, currentMapCoords])

    }
    const updateHandler = (val: any) => {
        setFeatures(val.data);
        if (val.editType === "addFeature") {
            const polygon = val.data[0].geometry.coordinates[0];
            const newSelectedMarkers = map(baseMarkers, (baseMarker) => {
                const { longitude, latitude } = get(baseMarker, 'props');
                const isInsidePolygon = inside([longitude, latitude], polygon);
                return (
                    { ...baseMarker, toggle: isInsidePolygon }
                )
            })
            console.log('newSelectedMarkers', newSelectedMarkers);

            setSelectedMarkers(newSelectedMarkers);
            setFeatures([]);
            displayVillagerDispatch({ type: 'toggleDrawableMapModeOff' })
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
                        features={features}
                    />
            }
            {/* markers */}
            {selectedMarkers.map(
                (selectedMarker: any) => {
                    const toggle = get(selectedMarker, 'toggle')
                    return (
                        <Marker key={get(selectedMarker, 'key')} latitude={get(selectedMarker, 'props.latitude')} longitude={get(selectedMarker, 'props.longitude')}>
                            <span
                                style={{
                                    backgroundColor: toggle ? "red" : "black",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    display: "block"
                                }}
                            />
                        </Marker>
                    )
                }
            )}

        </>


    )
}

export default DrawingLayer


