import React, { useContext, useEffect, useState } from "react";
import { NextViewport } from "../../../type";
import ReactMapGL from "react-map-gl";
import DrawingLayer from "./components/DrawingLayer";
import { CENTER_OF_DISTRIBUTION_LAT, CENTER_OF_DISTRIBUTION_LNG } from "../../../constants";
import { DisplayingVillagerDataContext } from "../../../contextProviders/DisplayingVillagerDataContextProvider";
import { filter, get } from "lodash";
import useCursor from "../../../hooks/useCursor";

const MapWithHomeLocations = () => {
  const { displayVillagerState } = useContext(DisplayingVillagerDataContext)
  const displayVillagerData = get(displayVillagerState, 'displayVillagerData')
  const focusedVillagerId = get(displayVillagerState, 'focusedVillagerId').toString()

  /**
   * Hooks
   */
  const [currentCursor] = useCursor()

  /**
   * Mapbox
   * 
   */
  const [viewport, setViewport] = useState<NextViewport>({
    width: '65.4vw',
    height: '88.5vh',
    // The latitude and longitude of the center of distribution place
    latitude: CENTER_OF_DISTRIBUTION_LAT,
    longitude: CENTER_OF_DISTRIBUTION_LNG,
    zoom: 17
  });

  const changeMapCenter = (newLat: number, newLng: number) => {
    setViewport((prevViewPort: NextViewport) => ({
      ...prevViewPort,
      latitude: newLat,
      longitude: newLng,
    }))
  }

  // set map center as an after effect based on focusing villager location
  useEffect(() => {
    // find focused villager location
    const focusedVillager = filter(displayVillagerData, (villagerData) => {
      return villagerData.HOME_ID === focusedVillagerId.toString()
    })
    const newMapCenterLat = parseFloat(get(focusedVillager[0], 'HOUSE_LOCATION_LAT'))
    const newMapCenterLng = parseFloat(get(focusedVillager[0], 'HOUSE_LOCATION_LNG'))
    changeMapCenter(newMapCenterLat, newMapCenterLng)
  }, [displayVillagerState])
  return (
    /**
    * Map box 
    */
    <>
      {displayVillagerState &&
        <ReactMapGL
          getCursor={e => currentCursor}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken='pk.eyJ1IjoiZ2VuZXJhbGtodW4iLCJhIjoiY2t0bGl5NXduMXdmaTJ2bXA3NXgyMXR4aiJ9.dBaNof7U4QoJImXeDk1QXg'
          {...viewport}
          onViewportChange={(nextViewport: NextViewport) => setViewport(nextViewport)}
        >
          <>
            <DrawingLayer
            />
          </>
        </ReactMapGL>
      }
    </>
  );
};

export default MapWithHomeLocations;
