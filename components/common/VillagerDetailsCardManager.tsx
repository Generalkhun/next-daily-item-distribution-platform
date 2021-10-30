import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, Paper } from "@material-ui/core";
import ModalConfirmStatusChange from "../HomeContent/Modals/ModalConfirmStatusChange";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { get } from "lodash";
import { NextViewport } from "../../type";
import useSelectItemCat from "../../hooks/useSelectItemCat";
import axios from "axios";
import { UPDATE_ADD_RECIEVED_ITEM_CAT_SERVICE_URL } from "../../constants";
import { useFindRecievedItemList } from "../../hooks/useFindRecievedItemList";

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
  addrDescriptionWrapper: {
    borderColor: 'white'
  }
});

interface Props {
  key: number;
  homeLocation: [string, string]
  personId: string;
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
  const lat = parseFloat((get(props, 'homeLocation') || [0, 0])[0]);
  const lng = parseFloat((get(props, 'homeLocation') || [0, 0])[1]);
  const addressAdditionalDescription = get(props, 'addressAdditionalDescription')
  const numberOfFamilyMembers = get(props, 'numberOfFamilyMembers')
  const personId = get(props, 'personId')
  const personName = get(props, 'personName')
  const homeRepresentativesContactNum = get(props, 'homeRepresentativesContactNum')
  const isItemRecieved = get(props, 'isItemRecieved')
  const personImgUrl = get(props, 'personImgUrl')

  /**
   * Hooks
   */
  // get item cat name and recieved item list from the context
  const [itemCatId, itemCatTitle] = useSelectItemCat()
  const recievedItemList = useFindRecievedItemList(personId)

  // viewport, used on show map mode only 
  const [viewport, setViewport] = useState<any>({
    width: '41vh',
    height: '40vh',
    // The latitude and longitude of the center of distribution place
    latitude: lat,
    longitude: lng,
    zoom: 16
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggleGetFoodStatus = () => {
    handleOpenModal();
    console.log("ส่งแล้วว");
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const onConfirmSubmitItemSuccessHandler = async () => {

    //sent put request to add recieved item on user record
    const res = await axios({
      method: 'put',
      url: UPDATE_ADD_RECIEVED_ITEM_CAT_SERVICE_URL,
      data: {
        itemCatId,
        personId,
      }
    })
    console.log('res', res);

    // await updateVillagerItemRecievedStatus(itemCatId,personId)

    //close modal
    setIsOpenModal(false);
  }
  return (
    <>
      <ModalConfirmStatusChange
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        onConfirmSubmitItemSuccessHandler={onConfirmSubmitItemSuccessHandler}
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
              <Paper variant='outlined' className={classes.addrDescriptionWrapper}>
                <Typography variant='body2'>{`รายละเอียดที่อยู่: ${!!addressAdditionalDescription ? addressAdditionalDescription : '-'}`}</Typography>
              </Paper>
              {/* <Button size="small" color="primary" variant="outlined" fullWidth>
                <img
                  width="40"
                  height="47"
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                />
              </Button> */}
            </Grid>
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
              {isItemRecieved ? `ได้รับ ${itemCatTitle} แล้ว` : `ส่ง ${itemCatTitle} สำเร็จ`}
            </Button>
          </CardActions></> : <></>}

        {showMapMode ?

          <>
            <p>ที่อยู่ : {addressAdditionalDescription}</p>
            <ReactMapGL
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken='pk.eyJ1IjoiZ2VuZXJhbGtodW4iLCJhIjoiY2t0bGl5NXduMXdmaTJ2bXA3NXgyMXR4aiJ9.dBaNof7U4QoJImXeDk1QXg'
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
