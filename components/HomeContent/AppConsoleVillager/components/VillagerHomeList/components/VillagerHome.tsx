import { Grid, Avatar, ListItemText, Theme, Typography, Button } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { StyledBadgeUrgent } from "./StyledBadgeUrgent";
import { StyledBadgeNormal } from "./StyledBadgeNormal";
import ModalVillagerDetails from "./ModalVillagerDetails";

interface Props {
  key: number;
  homeLocation: [string, string]
  personId: string;
  personName: string;
  isItemRecieved: boolean;
  personImgUrl: string;
  numberOfFamilyMembers: number;
  homeRepresentativesContactNum: string
  isSelected: boolean
  addressAdditionalDescription: string
}
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    avatarSizeLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    seeDetailButton: {
      marginTop: 15
    }

  });
});
function VillagerHome(props: Props) {
  const { personName, isItemRecieved, personImgUrl, numberOfFamilyMembers, homeRepresentativesContactNum, isSelected } =
    props;
  const classes = useStyles();
  const onClickSeeDetailHandler = (props: Props) => {

    setIsOpenModalVillagerDetail(true)
  }
  const [isOpenModalVillagerDetail, setIsOpenModalVillagerDetail] = useState(false)
  const handleCloseModalVillagerDetail = () => {
    setIsOpenModalVillagerDetail(false)
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={2}>
          {isItemRecieved ? (
            <StyledBadgeNormal
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar
                alt={personName}
                src={personImgUrl}
                className={classes.avatarSizeLarge}
              />

            </StyledBadgeNormal>
          ) : (
            <StyledBadgeUrgent
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar
                alt={personName}
                src={personImgUrl}
                className={classes.avatarSizeLarge}
              />
            </StyledBadgeUrgent>
          )}
        </Grid>
        <Grid item xs={12} lg={10}>
          <ListItemText
            primary={personName} secondary={<Typography style={{ color: 'gray',fontSize:10.6 }}>{"โทร: " + homeRepresentativesContactNum + " สมาชิก: " + numberOfFamilyMembers + " คน "}</Typography>}
            style={{ paddingLeft: 30, color: 'black' }}
          />
        </Grid>
        {isSelected ? <Button onClick={() => onClickSeeDetailHandler(props)} className={classes.seeDetailButton} variant='contained' fullWidth >ดูรายละเอียด</Button> : <></>}
      </Grid>
      {/* Modal showing villager details */}
      <ModalVillagerDetails
        isOpenModal={isOpenModalVillagerDetail}
        handleCloseModal={handleCloseModalVillagerDetail}
        //villagerDetail={props as any}
        {...props}
      />
    </>
  );
}

export default VillagerHome;
