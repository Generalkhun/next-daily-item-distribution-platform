import { Grid, Avatar, ListItemText, Theme, Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import React, { ReactElement } from "react";
import { StyledBadgeUrgent } from "./StyledBadgeUrgent";
import { StyledBadgeNormal } from "./StyledBadgeNormal";

import PeopleIcon from "@material-ui/icons/People";

interface Props {
  key: number;
  personName: string;
  foodRecieveStatus: boolean;
  personImgUrl: string;
  numberOfFamilyMembers: number;
  homeRepresentativesContactNum: string
}
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    avatarSizeLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  });
});
function VillagerHome(props: Props) {
  const { personName, foodRecieveStatus, personImgUrl, numberOfFamilyMembers, homeRepresentativesContactNum } =
    props;
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        {foodRecieveStatus ? (
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
          primary={personName} secondary={"โทร: " + homeRepresentativesContactNum + " สมาชิก: " + numberOfFamilyMembers + " คน "}
          style={{ paddingLeft: 20 }}
        />
      </Grid>
    </Grid>
  );
}

export default VillagerHome;
