import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import ModalConfirmStatusChange from "../HomeContent/Modals/ModalConfirmStatusChange";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { get } from "lodash";
import { NextViewport } from "../../type";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 220,
    width: 400
  },
  contactButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
});

interface Props {
  key: number;
  homeLocation: [number, number]
  personName: string;
  isItemRecieved?: boolean;
  personImgUrl: string;
  numberOfFamilyMembers: number;
  homeRepresentativesContactNum: string
  isSelected?: boolean
  submissionHandlerMode?: boolean
  showMapMode?: boolean
  addressAdditionalDescription?: string

}

const VillagerDetailsCardManager = (props: Props) => {
  const classes = useStyles();
  const { submissionHandlerMode, showMapMode } = props


  // get villager data from props
  const lat = (get(props, 'homeLocation') || [0, 0])[0];
  const lng = (get(props, 'homeLocation') || [0, 0])[1];
  const addressAdditionalDescription = get(props, 'addressAdditionalDescription')
  const numberOfFamilyMembers = get(props, 'numberOfFamilyMembers')
  const personName = get(props, 'personName')
  const homeRepresentativesContactNum = get(props, 'homeRepresentativesContactNum')
  const isItemRecieved = get(props, 'isItemRecieved')
  const personImgUrl = get(props, 'personImgUrl')


  // viewport, used on show map mode only 
  const [viewport, setViewport] = useState<any>({
    width: '41vh',
    height: '40vh',
    // The latitude and longitude of the center of distribution place
    latitude: lat,
    longitude: lng,
    zoom: 16
  });

  const [isGetFood, setIsGetFood] = useState<boolean>(
    get(props, 'isItemRecieved') || true
  );

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggleGetFoodStatus = () => {
    setIsGetFood((prevStatus) => !prevStatus);
    handleOpenModal();
    console.log("ส่งแล้วว");
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <ModalConfirmStatusChange
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={personImgUrl}
            title="ข้อมูลตัวแทนบ้าน"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {personName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`เบอร์ติดต่อ: ${homeRepresentativesContactNum}`}
            </Typography>
            <Divider />
            <Typography variant="body2" color="textSecondary" component="p">
              {"จำนวนสมาชิกในบ้าน:" +
                " " +
                numberOfFamilyMembers}
            </Typography>
            <Divider />
            {submissionHandlerMode ? <Typography variant="body2" color="textSecondary" component="p">
              {`สถานะ: ${isItemRecieved
                ? "ได้รับแล้ว"
                : "ยังไม่ได้รับ"
                }`}
            </Typography> : <></>}
          </CardContent>
        </CardActionArea>
        <Divider />
        {submissionHandlerMode ? <><CardActions>
          <Grid container>
            <Grid item xs={12} lg={6} className={classes.contactButton}>
              <Button size="small" color="primary" variant="outlined" fullWidth>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                >
                  <img
                    width="50"
                    height="40"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/512px-Google_Maps_Logo_2020.svg.png"
                  />
                </a>
              </Button>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.contactButton}>
              <Button size="small" color="primary" variant="outlined" fullWidth>
                <img
                  width="40"
                  height="47"
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                />
              </Button>
            </Grid>
          </Grid>
        </CardActions>

          <CardActions>
            <Button
              onClick={toggleGetFoodStatus}
              fullWidth
              disabled={isItemRecieved}
              variant="contained"
              color={isItemRecieved ? undefined : "primary"}
            >
              ส่งสำเร็จแล้ว
            </Button>
          </CardActions></> : <></>}

        {showMapMode ?

          <>
            <p>ที่อยู่ : {addressAdditionalDescription}</p>
            <ReactMapGL
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken={process.env.MAPBOX_KEY}
              {...viewport}
              onViewportChange={(nextViewport: NextViewport) => setViewport(nextViewport)}
            >
              <Marker
                longitude={lng}
                latitude={lat}
              >
                <LocationOnIcon fontSize='large' color='error' />
              </Marker>
            </ReactMapGL>

          </>
          : <></>}

      </Card>
    </>
  );
}

export default VillagerDetailsCardManager
