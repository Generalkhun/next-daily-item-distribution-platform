import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  makeStyles
} from "@material-ui/core";
import { get, map } from "lodash";
import React, { useContext } from "react";
import { DisplayingVillagerDataContext } from "../../../../../contextProviders/DisplayingVillagerDataContextProvider";
import { VillagerHomeData } from "../../../../../type";
import VillagerHome from "./components/VillagerHome";

interface Props {
  isShowOnlyWaitingVillager: boolean;
  villagerHomeListData: Array<VillagerHomeData>;
  onClickVillager: (villager: VillagerHomeData) => void;
  selectedVillagerInfo: any;
}

const useStyles = makeStyles({
  villagerListItem: {
    color: 'white'
  }
})
const VillagerHomeList = (props: Props) => {
  const {
    villagerHomeListData,
    onClickVillager,
    selectedVillagerInfo,
  } = props;

  const classes = useStyles()

  // get mapdata from dispalyVillagerData context
  const { displayVillagerState, displayVillagerDispatch } = useContext
    (DisplayingVillagerDataContext)
  const isShowOnlyWaitingVillager = get(displayVillagerState, 'filterCondition.displayOnlyNotrecieved')


  // functions
  const onClickVillagerHandler = (villagerHomeData: any) => {
  
    // update focus villager inside the context
    displayVillagerDispatch({type:'updateFocusingVillager', payload: villagerHomeData.homeId})

    // perform the selecting effect
    onClickVillager(villagerHomeData)
  }
  return (
    <>
      {map(villagerHomeListData, (villagerHomeData: VillagerHomeData, index) => (
        <>
          {!(isShowOnlyWaitingVillager && villagerHomeData.isItemRecieved) ? (
            <ListItem
              className={classes.villagerListItem}
              button
              key={villagerHomeData.homeId}
              onClick={() => onClickVillagerHandler(villagerHomeData)}
              selected={selectedVillagerInfo.homeId === villagerHomeData.homeId}
            >
              <VillagerHome
                key={index}
                personName={villagerHomeData.homeRepresentativesName}
                foodRecieveStatus={villagerHomeData.isItemRecieved}
                personImgUrl={villagerHomeData.homeRepresentativesImg}
                numberOfFamilyMembers={villagerHomeData.numberOfFamilyMember}
                homeRepresentativesContactNum={villagerHomeData.homeRepresentativesContactNum}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      ))}
    </>
  );
};

export default VillagerHomeList;
