import { useContext, useState } from "react";
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
  Grid,
  Paper
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from "clsx";
import { get, slice } from 'lodash'
import VillagerHomeList from "./components/VillagerHomeList";
import { appConsoleStyles } from "./styles";
import { VillagerHomeData } from "../../../type";
import { DisplayingVillagerDataContext } from "../../../contextProviders/DisplayingVillagerDataContextProvider";
import { mapVillagerDataFromContextToDisplayInConsole } from "../../../helpers/utils/mapVillagerDataFromContextToDisplayInConsole";
import styles from './AppConsoleVillager.module.css'

interface Props {
  open: boolean;
  setOpen: any;
  mapCenterLocation: [number, number];
  onClickVillager: (villager: VillagerHomeData) => void;
  selectedVillagerInfo: VillagerHomeData;
  setOpenVillagerConsole: any;
  isShowOnlyWaitingVillager: boolean;
  handleOpenModalSetting: () => void;
}


const useStyles = appConsoleStyles
const AppConsoleVillager = (props: Props) => {
  // get mapdata from dispalyVillagerData context
  const { displayVillagerState, displayVillagerDispatch } = useContext
    (DisplayingVillagerDataContext)

  const {
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

  console.log('displayVillagerState', displayVillagerState);

  const villagerHomeListData = mapVillagerDataFromContextToDisplayInConsole(displayVillagerState)
  console.log('AppConsoleVillager villagerHomeListData', villagerHomeListData);

  return (
    <>
      <Paper variant="outlined">
        <Grid container>
          <Grid item xs={12}>
            <Typography>เลือกกลุ่มบ้านที่ต้องการดูข้อมูล</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Button>จากแผนที่</Button>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Button onClick={handleOpenModalSetting}>จากเงื่อนไขอื่น</Button>
          </Grid>

        </Grid>
      </Paper>

      <Paper variant="outlined" className={styles.villageHomeListWrapper}>
        <Typography>รายชื่อ</Typography>
        <Grid container >
          <Grid item xs={12} lg={6} >
            <List>
              <VillagerHomeList
                isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
                villagerHomeListData={slice(villagerHomeListData, 0, villagerHomeListData.length / 2)}
                onClickVillager={onClickVillager}
                selectedVillagerInfo={selectedVillagerInfo}
              />
            </List>
          </Grid>
          <Grid item xs={12} lg={6} >
            <List>
              <VillagerHomeList
                isShowOnlyWaitingVillager={isShowOnlyWaitingVillager}
                villagerHomeListData={slice(villagerHomeListData, (villagerHomeListData.length / 2) + 1, villagerHomeListData.length)}
                onClickVillager={onClickVillager}
                selectedVillagerInfo={selectedVillagerInfo}
              />
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Paper variant="outlined">
        ยอดรวม
      </Paper>
    </>

  );
};

export default AppConsoleVillager;
