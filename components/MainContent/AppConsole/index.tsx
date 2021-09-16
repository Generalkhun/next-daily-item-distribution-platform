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
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";

import VillagerHomeList from "../VillagerHomeList";
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
const AppConsole = (props: Props) => {
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6">ส่งข้าวเข้าบ้าน</Typography>

          {/* Setting modal open */}
          <IconButton onClick={handleOpenModalSetting}>
            <SettingsIcon />
          </IconButton>

          {/* Logout */}
          <Button color="inherit" className={classes.logoutButton}>
            ออกจากระบบ
          </Button>
        </Toolbar>
      </AppBar>
      {/* Villager data list display */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <HomeIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <VillagerHomeList
            isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
            villagerHomeListData={villagerHomeListData}
            onClickVillager={onClickVillager}
            selectedVillagerInfo={selectedVillagerInfo}
          />
        </List>
      </Drawer>
    </div>
  );
};

export default AppConsole;
