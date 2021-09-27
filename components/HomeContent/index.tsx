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
    height: "90vh",
  },
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

  const [isOpenModalSetting, setIsOpenModalSetting] = useState(false);
  const [map, setMap] = useState(null as any);
  /**
   * Hooks
   */
  const classes = useStyles();

  /**
   * Functions
   */
  const changeShowConditionHandler = () => {
    setIsShowOnlyWaitingVillager((prev) => !prev);
    setOpenVillagerConsole(false);
  };
  const onClickVillager = (
    villager: VillagerHomeData,
    isFromClickLocation?: boolean
  ) => {
    setSelectedVillagerInfo(villager);
    setOpenVillagerConsole(true);
    setMapCenterLocation(villager.homeLocation);
  };
  const handleCloseModalSetting = () => {
    setIsOpenModalSetting(false);
  };

  const handleOpenModalSetting = () => {
    setIsOpenModalSetting(true);
  };

  return (
    <>
      <ModalSetting
        isOpenModal={isOpenModalSetting}
        handleCloseModal={handleCloseModalSetting}
        isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
        changeShowConditionHandler={changeShowConditionHandler}
      />

      <Grid container>
        <Grid item xs={12} lg={4}>
            <AppConsoleVillager
              open={drawerOpen}
              setOpen={setDrawerOpen}
              setOpenVillagerConsole={setOpenVillagerConsole}
              mapCenterLocation={mapCenterLocation}
              onClickVillager={onClickVillager}
              selectedVillagerInfo={selectedVillagerInfo}
              isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
              handleOpenModalSetting={handleOpenModalSetting}
            />
        </Grid>
        <Grid item xs={12} lg={8} style={{ paddingTop: 10, paddingRight: 10 }}>
          <Paper className={classes.mapContainer}>
            <MapWithHomeLocations
              setDrawerOpen={setDrawerOpen}
              mapCenterLocation={mapCenterLocation}
              villagerHomeListData={villagerHomeListData}
              onClickVillager={onClickVillager}
              setMap={setMap}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeContent;
