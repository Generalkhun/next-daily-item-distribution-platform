import { ClassNames } from "@emotion/react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { villagerHomeListData } from "../../mockData";
import { VillagerHomeData } from "../../type";
import AppConsoleVillager from "./AppConsoleVillager";
import dynamic from 'next/dynamic'
import ModalSetting from "./Modals/ModalSetting";
import VillagerConsole from "./VillagerConsole";
/**
 * Dynamic imports
 */
const MapWithHomeLocations = dynamic(() => import("./MapWithHomeLocations"), {
  // loading: () => "Loading...",
  ssr: false
});


const useStyles = makeStyles({
  mapContainer: {
    height: "60vh",
  },
  homeContentContainer: {
    height: '90vh',
    marginLeft:'10px',
    marginTop:'10px'
  }
});
function HomeContent() {
  /**
   * Component states
   */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openVillagerConsole, setOpenVillagerConsole] = useState(false);
  const [mapCenterLocation, setMapCenterLocation] = useState<[number, number]>([
    13.684634695264908, 100.47727857693796,
  ]);
  const [selectedVillagerInfo, setSelectedVillagerInfo] =
    useState<VillagerHomeData>({} as VillagerHomeData);
  const [isShowOnlyWaitingVillager, setIsShowOnlyWaitingVillager] =
    useState(false);
  /**
   * Hooks
   */
  const classes = useStyles();

  /**
   * Functions
   */
  const onClickVillager = (
    villager: VillagerHomeData,
    isFromClickLocation?: boolean,
  ) => {
    setSelectedVillagerInfo(villager);
    setOpenVillagerConsole(true);
    setMapCenterLocation([parseFloat(villager.homeLocation[0]), parseFloat(villager.homeLocation[1])]);
  };


  return (
    <>
      <Grid container className={classes.homeContentContainer}>
        <Grid item xs={12} lg={4}>
          <AppConsoleVillager
            open={drawerOpen}
            setOpen={setDrawerOpen}
            setOpenVillagerConsole={setOpenVillagerConsole}
            mapCenterLocation={mapCenterLocation}
            onClickVillager={onClickVillager}
            selectedVillagerInfo={selectedVillagerInfo}
            isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
          />
        </Grid>
        <Grid item xs={12} lg={8} style={{ paddingTop: 10, paddingRight: 10 }}>
          <Paper className={classes.mapContainer}>
            <MapWithHomeLocations />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeContent;
