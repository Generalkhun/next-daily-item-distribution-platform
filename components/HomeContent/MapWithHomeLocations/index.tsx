import React, { useState } from "react";
import { NextViewport } from "../../../type";
import ReactMapGL from "react-map-gl";
import DrawingLayer from "./components/DrawingLayer";
import { CENTER_OF_DISTRIBUTION_LAT, CENTER_OF_DISTRIBUTION_LNG } from "../../../constants";

const MapWithHomeLocations = () => {

  /**
   * Mapbox
   * 
   */
  const [viewport, setViewport] = useState<any>({
    width: '66vw',
    height: '90vh',
    // The latitude and longitude of the center of distribution place
    latitude: CENTER_OF_DISTRIBUTION_LAT,
    longitude: CENTER_OF_DISTRIBUTION_LNG,
    zoom: 17
  });
  return (
    /**
        * Map box 
        */
    <>
      <ReactMapGL
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
    </>
  );
};

export default MapWithHomeLocations;
