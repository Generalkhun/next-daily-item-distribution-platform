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
import { get } from 'lodash'
import VillagerHomeList from "./components/VillagerHomeList";
import { appConsoleStyles } from "./styles";
import { VillagerHomeData } from "../../../type";
import { DisplayingVillagerDataContext } from "../../../contextProviders/DisplayingVillagerDataContextProvider";
import { mapVillagerDataFromContextToDisplayInConsole } from "../../../helpers/utils/mapVillagerDataFromContextToDisplayInConsole";

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

  console.log('displayVillagerState',displayVillagerState);
  
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

      <Paper variant="outlined">
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
      </Paper>

      <Paper variant="outlined">
        ยอดรวม
      </Paper>
    </>

  );
};

export default AppConsoleVillager;
