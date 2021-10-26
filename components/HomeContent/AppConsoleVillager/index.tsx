import React, { useContext } from "react";
import {
  Typography,
  useTheme,
  List,
  Grid,
  Paper
} from "@material-ui/core";
import { get, slice } from 'lodash'
import VillagerHomeList from "./components/VillagerHomeList";
import { appConsoleStyles } from "./styles";
import { VillagerHomeData } from "../../../type";
import styles from './AppConsoleVillager.module.css'
import { calcTotalHome, calcTotalNonRecievedItemHome, calcTotalNonRecievedItemPeople, calcTotalPeople, findSelectedItemCatfromId } from "../../../helpers/utils/calcSummaryInfo";
import SummaryInfo from "./components/SummaryInfo";
import { GoogleSheetDataContext } from "../../../contextProviders/GoogleSheetContextProvider";
import DataDisplaySetting from "./components/DataDisplaySetting";
import { DisplayingVillagerDataContext } from "../../../contextProviders/DisplayingVillagerDataContextProvider";
import { dataPrepFromVillagerDataContextToDisplayOnList } from "../../../helpers/utils/dataPrepFromVillagerDataContextToDisplayOnList";
import useSelectItemCatName from "../../../hooks/useSelectItemCatName";
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
  const { displayVillagerState } = useContext
    (DisplayingVillagerDataContext)

  const {
    onClickVillager,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const villagerHomeListData = dataPrepFromVillagerDataContextToDisplayOnList(displayVillagerState)

  // calculate for summary info
  const summaryInfoItemName = useSelectItemCatName()
  // const summaryInfoItemName = findSelectedItemCatfromId(get(displayVillagerState, 'filterCondition.itemCatSelected'), googleSheetItemCatData)
  const summaryInfoTotalHome = calcTotalHome(villagerHomeListData)
  const summaryInfoTotalPeople = calcTotalPeople(villagerHomeListData)
  const summaryInfoTotalNonRecievedItemHome = calcTotalNonRecievedItemHome(villagerHomeListData)
  const summaryInfoTotalNonRecievedItemPeople = calcTotalNonRecievedItemPeople(villagerHomeListData)

  return (
    <div className={classes.AppConsoleVillagerWrapper}>
      <Paper variant="outlined">
        <DataDisplaySetting
        />
      </Paper>

      <Paper variant="outlined" className={styles.summaryInfoWrapper}>
        <Typography>ยอดรวม</Typography>
        <SummaryInfo
          summaryInfoItemName={summaryInfoItemName}
          summaryInfoTotalHome={summaryInfoTotalHome}
          summaryInfoTotalPeople={summaryInfoTotalPeople}
          summaryInfoTotalNonRecievedItemHome={summaryInfoTotalNonRecievedItemHome}
          summaryInfoTotalNonRecievedItemPeople={summaryInfoTotalNonRecievedItemPeople}
        />
      </Paper>

      <Paper variant="outlined" className={styles.villageHomeListWrapper}>
        <Typography>รายชื่อ</Typography>
        <Grid container >
          <Grid item xs={12} lg={6} >
            <List>
              <VillagerHomeList
                villagerHomeListData={slice(villagerHomeListData, 0, villagerHomeListData.length / 2)}
                onClickVillager={onClickVillager}
              />
            </List>
          </Grid>
          <Grid item xs={12} lg={6} >
            <List>
              <VillagerHomeList
                villagerHomeListData={slice(villagerHomeListData, (villagerHomeListData.length / 2), villagerHomeListData.length)}
                onClickVillager={onClickVillager}
              />
            </List>
          </Grid>
        </Grid>
      </Paper>


    </div>

  );
};

export default AppConsoleVillager;
