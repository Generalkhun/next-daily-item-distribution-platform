import React, { useContext, useState } from "react";
import { NextViewport, VillagerHomeData } from "../../../type";
import ReactMapGL from "react-map-gl";
import { DisplayingVillagerDataContext } from "../../../contextProviders/DisplayingVillagerDataContextProvider";
import { get } from "lodash";
import DrawingLayer from "./components/DrawingLayer";

const MapWithHomeLocations = () => {

  /**
   * Mapbox
   * 
   */
  const [viewport, setViewport] = useState<any>({
    width: '66vw',
    height: '90vh',
    // The latitude and longitude of the center of distribution place
    latitude: 13.68474450590383,
    longitude: 100.47730858426843,
    zoom: 17
  });
  return (
    /**
        * Map box 
        */
    <>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
        {...viewport}
        onViewportChange={(nextViewport: NextViewport) => setViewport(nextViewport)}
      >
        <>
          <DrawingLayer
          />
        </>
      </ReactMapGL>
    </>
  );
};

export default MapWithHomeLocations;
