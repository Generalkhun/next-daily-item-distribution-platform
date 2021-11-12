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
import useSelectItemCat from "../../../hooks/useSelectItemCat";
import useSelectItemCatGetItemImg from "../../../hooks/useSelectItemCatGetItemImg";
interface Props {
  open: boolean;
  setOpen: any;
  mapCenterLocation: [number, number];
  onClickVillager: (villager: VillagerHomeData) => void;
  selectedVillagerInfo: VillagerHomeData;
  setOpenVillagerConsole: any;
  isShowOnlyWaitingVillager: boolean;
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
  const villagerHomeListData = dataPrepFromVillagerDataContextToDisplayOnList(displayVillagerState)
  const villagersCount = villagerHomeListData.length

  // calculate for summary info
  const [itemCatId, itemCatTitle] = useSelectItemCat()
  const itemCatImageURL = useSelectItemCatGetItemImg()
  const summaryInfoItemName = itemCatTitle
  const summaryInfoTotalHome = calcTotalHome(villagerHomeListData)
  const summaryInfoTotalPeople = calcTotalPeople(villagerHomeListData)
  const summaryInfoTotalNonRecievedItemHome = calcTotalNonRecievedItemHome(villagerHomeListData)
  const summaryInfoTotalNonRecievedItemPeople = calcTotalNonRecievedItemPeople(villagerHomeListData)

  // calculate displaying counts
  const displayingVillagerCounts = get(displayVillagerState, 'filterCondition.displayOnlyNotrecieved') ? summaryInfoTotalNonRecievedItemHome : summaryInfoTotalHome
  return (
    <div className={classes.AppConsoleVillagerWrapper}>
      <Paper variant="outlined">
        <DataDisplaySetting />
      </Paper>
      <Paper variant="outlined" style={{ paddingBottom: 5 }} className={styles.summaryInfoWrapper}>
        <Grid container>
          <Grid item lg={4} style={{ marginLeft: 10 }}>
            <Paper elevation={0}>
              <img height='100vh' src={itemCatImageURL} style={{ marginTop: 10 }} />
            </Paper>
          </Grid>
          <Grid item lg={6} style={{ marginLeft: 40 }}>
            <SummaryInfo
              summaryInfoItemName={summaryInfoItemName}
              summaryInfoTotalHome={summaryInfoTotalHome}
              summaryInfoTotalPeople={summaryInfoTotalPeople}
              summaryInfoTotalNonRecievedItemHome={summaryInfoTotalNonRecievedItemHome}
              summaryInfoTotalNonRecievedItemPeople={summaryInfoTotalNonRecievedItemPeople}
            />
          </Grid>

        </Grid>

      </Paper>

      <Typography style={{ paddingTop: 15 }}>{`รายชื่อตัวแทนบ้าน (${displayingVillagerCounts})`}</Typography>
      <Paper variant="outlined" className={styles.villageHomeListWrapper} style={{height:'45vh'}}>
        <Grid container >
          <Grid item xs={12} lg={6} >
            <List>
              <VillagerHomeList
                villagerHomeListData={slice(villagerHomeListData, 0, villagersCount / 2)}
                onClickVillager={onClickVillager}
              />
            </List>
          </Grid>
          <Grid item xs={12} lg={6} >
            <List>
              <VillagerHomeList
                villagerHomeListData={slice(villagerHomeListData, (villagersCount / 2), villagersCount)}
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
