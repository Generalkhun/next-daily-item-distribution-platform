import React, { useContext, useState } from "react";
import { Button, Link } from "@material-ui/core";
import { VillagerHomeData } from "../../../type";
import ReactMapGL, { Marker } from "react-map-gl";
import { DisplayingVillagerDataContext } from "../../../contextProviders/DisplayingVillagerDataContextProvider";
import { get, map } from "lodash";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DrawingLayer from "./components/DrawingLayer";
import { Feature, Layer } from 'react-mapbox-gl';
interface Props {
  setDrawerOpen: any;
  mapCenterLocation: [number, number];
  villagerHomeListData: Array<VillagerHomeData>;
  onClickVillager: (villager: VillagerHomeData, isFromClickLocation: boolean) => void;
  setMap: any;
  isShowOnlyWaitingVillager: boolean;
}

interface NextViewport {
  width: string
  height: string
  // The latitude and longitude of the center of London
  latitude: number
  longitude: number
  zoom: number
}
const compareLatLng = (
  latlngA: [number, number],
  latlngB: [number, number]
) => {
  if (latlngA[0] === latlngB[0] && latlngA[1] === latlngB[1]) {
    return true;
  }
  return false;
};

const MapWithHomeLocations = (props: Props) => {

  // get mapdata from dispalyVillagerData context
  const { displayVillagerState, displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
  console.log('displayVillagerState', displayVillagerState);

  const villagerList = get(displayVillagerState, 'displayVillagerData')

  const {
    mapCenterLocation,
    villagerHomeListData,
    onClickVillager,
    setDrawerOpen,
    setMap,
    isShowOnlyWaitingVillager,
  } = props;
  const handleClickLocation = (event: any, villager: VillagerHomeData) => {
    console.log("this is", villager);
    const isFromClickLocation = true
    onClickVillager(villager, isFromClickLocation);
    setDrawerOpen(true);
  };

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

  // Only rerender markers if props.data has changed
  const baseMarkers = React.useMemo(() => map(villagerList,
    villager => (
      <Marker key={villager.HOME_ID} longitude={parseFloat(villager.HOUSE_LOCATION_LNG)} latitude={parseFloat(villager.HOUSE_LOCATION_LAT)} >
        <LocationOnIcon color='success' />
      </Marker>
    )
  ), [villagerList]);
  // // Regtangle drawer tool
  // const [geojson,setGeojson] = useState<any>({
  //   type: 'FeatureCollection',
  //   features: []
  // })
  // const editableLayer = new EditableGeoJsonLayer(
  //   {
  //     id: 'geojson',
  //     data: geojson,
  //     mode: 'drawPoint',
  //     onEdit: ({ updatedData }) => {
  //       setGeojson({ geojson: updatedData });
  //     }
  //   }
  // );

  return (
    /**
        * Map box 
        */
    <>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        // mapboxApiAccessToken={process.env.MAPBOX_KEY}
        mapboxApiAccessToken='pk.eyJ1IjoiZ2VuZXJhbGtodW4iLCJhIjoiY2t0bGl5NXduMXdmaTJ2bXA3NXgyMXR4aiJ9.dBaNof7U4QoJImXeDk1QXg'
        {...viewport}
        onViewportChange={(nextViewport: NextViewport) => setViewport(nextViewport)}
      >
        <>
          {baseMarkers}
          <DrawingLayer
            baseMarkers={baseMarkers}
          />
          {/* <MapGLDraw
          mode={selectedMode}
          features={features}
          selectedFeatureId={selectedFeatureId}
          onSelect={this._onSelect}
          onUpdate={this._onUpdate}
          getEditHandleStyle={this._getEditHandleStyle}
          getFeatureStyle={this._getFeatureStyle}
         /> */}
          {/* <Editor
          clickRadius={12}
          mode={new DrawRectangleMode()}
        /> */}

        </>
      </ReactMapGL>
    </>



    /**
     * Leaflet 
     * */
    // <MapContainer
    //   style={{ height: "90vh", width: "100%" }}
    //   center={mapCenterLocation}
    //   zoom={18}
    //   scrollWheelZoom={true}
    //   whenCreated={setMap}
    // >
    //   <ChangeView center={mapCenterLocation} zoom={18} />
    //   {/* Map Tiles */}
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />

    //   {villagerHomeListData.map((villager, index) => {
    //     const isSameLocWithFocusLoc = compareLatLng(
    //       villager.homeLocation,
    //       mapCenterLocation
    //     );
    //     return (
    //       <>
    //         {!(isShowOnlyWaitingVillager && villager.isFoodRecieved) ? (
    //           <CircleMarker
    //             key={index}
    //             center={villager.homeLocation}
    //             pathOptions={{
    //               color: villager.isFoodRecieved ? "green" : "red",
    //             }}
    //             radius={isSameLocWithFocusLoc ? 12 : 5}
    //             eventHandlers={{
    //               click: (event) => handleClickLocation(event, villager),
    //             }}
    //           >
    //             <Popup>
    //               <Button
    //                 size="small"
    //                 color={villager.isFoodRecieved ? "primary" : "secondary"}
    //                 variant="outlined"
    //               >
    //                 <a
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   href={`https://www.google.com/maps/search/?api=1&query=${villager.homeLocation[0]},${villager.homeLocation[1]}`}
    //                 >
    //                   {"ดูใน goole map"}
    //                 </a>
    //               </Button>
    //             </Popup>
    //           </CircleMarker>
    //         ) : (
    //           <></>
    //         )}
    //       </>
    //     );
    //   })}
    // </MapContainer>
  );
};

export default MapWithHomeLocations;
