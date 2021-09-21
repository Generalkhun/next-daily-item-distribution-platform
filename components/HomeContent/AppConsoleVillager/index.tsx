import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  CssBaseline,
  Drawer,
  Divider,
  List,
  Checkbox,
  FormControlLabel,
  Grid
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";

import VillagerHomeList from "./components/VillagerHomeList";
import { appConsoleStyles } from "./styles";
import { VillagerHomeData } from "../../../type";

interface Props {
  open: boolean;
  setOpen: any;
  mapCenterLocation: [number, number];
  villagerHomeListData: Array<VillagerHomeData>;
  onClickVillager: (villager: VillagerHomeData) => void;
  selectedVillagerInfo: VillagerHomeData;
  setOpenVillagerConsole: any;
  isShowOnlyWaitingVillager: boolean;
  handleOpenModalSetting: () => void;
}


const useStyles = appConsoleStyles
const AppConsoleVillager = (props: Props) => {
  const {
    villagerHomeListData,
    onClickVillager,
    open,
    setOpen,
    selectedVillagerInfo,
    setOpenVillagerConsole,
    isShowOnlyWaitingVillager,
    handleOpenModalSetting
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenVillagerConsole(false);
  };

  return (
    <>
      <div className={classes.drawerHeader}>
        <Grid container>
          <Grid item xs={12}>
            <Typography>เลือกแสดงผลข้อมูลบ้าน</Typography>
          </Grid>
         
          <Grid item xs={12} lg={6}>
            <Button>จากตำแหน่งบนแผนที่</Button>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Button onClick={handleOpenModalSetting}>จากเงื่อนไขอื่น</Button>
          </Grid>

        </Grid>

      </div>
      <Divider />
      <Typography>รายชื่อ</Typography>
      <List>
        <VillagerHomeList
          isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
          villagerHomeListData={villagerHomeListData}
          onClickVillager={onClickVillager}
          selectedVillagerInfo={selectedVillagerInfo}
        />
      </List>
      {/* total supplies */}
      <>
        ยอดรวม
      </>
    </>

  );
};

export default AppConsoleVillager;
