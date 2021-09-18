import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import React from "react";
import { VillagerHomeData } from "../../../../../type";
import VillagerHome from "./components/VillagerHome";

interface Props {
  isShowOnlyWaitingVillager: boolean;
  villagerHomeListData: Array<VillagerHomeData>;
  onClickVillager: (villager: VillagerHomeData) => void;
  selectedVillagerInfo: any;
}

const VillagerHomeList = (props: Props) => {
  const {
    villagerHomeListData,
    onClickVillager,
    selectedVillagerInfo,
    isShowOnlyWaitingVillager,
  } = props;

  return (
    <>
      {villagerHomeListData.map((villagerHomeData: VillagerHomeData, index) => (
        <>
          {!(isShowOnlyWaitingVillager && villagerHomeData.isFoodRecieved) ? (
            <ListItem
              button
              key={villagerHomeData.homeId}
              onClick={() => onClickVillager(villagerHomeData)}
              selected={selectedVillagerInfo.homeId === villagerHomeData.homeId}
            >
              <VillagerHome
                key={index}
                personName={villagerHomeData.homeRepresentativesName}
                foodRecieveStatus={villagerHomeData.isFoodRecieved}
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
    // {villagerHomeListData.map((villagerHomeData:VillagerHomeData, index) => (
    //     <ListItem button key={villagerHomeData.homeId}>
    //       <ListItemIcon>
    //         {index % 2 === 0 ? <HomeIcon /> : <HomeIcon />}
    //       </ListItemIcon>
    //       <ListItemText primary={villagerHomeData.homeRepresentativesName} />
    //     </ListItem>
    //   ))}
  );
};

export default VillagerHomeList;
