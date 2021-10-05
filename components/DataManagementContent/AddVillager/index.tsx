import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import React, { useReducer, useState } from 'react';
import { DropzoneArea } from "material-ui-dropzone";
import { Button, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { get, isEmpty } from 'lodash';
import ConfirmHomeLocationModal from './components/ConfirmHomeLocationModal';
import ConfirmSubmitModal from './components/ConfirmSubmitModal';
import axios from 'axios';
import { mapRequestBodyAddVillagerFormState } from '../../../helpers/utils/mapRequestBodyAddVillagerFormState';
import { validatePhoneNum } from '../../../helpers/utils/formValidations';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { readImgURL } from '../../../helpers/utils/readImgURL';
import { saveVillagerImgToGGDrive } from '../../../helpers/api/saveVillagerImgToGGDriveAPI';
import { getGGDriveImgURLViewWithId } from '../../../helpers/utils/getGGDriveImgURLViewWithId';
interface Props {

}

const addVillagerFormReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateHomeRepresentativesName':
      return { ...state, homeRepresentativesName: action.payload }
    case 'updateHomeRepresentativesContactNum':
      return { ...state, homeRepresentativesContactNum: action.payload }
    case 'updateNumberOfFamilyMember':
      return { ...state, numberOfFamilyMember: parseInt(action.payload) >= 1 ? action.payload : '1' }
    case 'updateHomeLocation':
      return { ...state, homeLocation: action.payload }
    case 'updateHomeRepresentativesImg':
      return {
        ...state,
        homeRepresentativesImg: action.payload,
        homeRepresentativesImgURL: readImgURL(action.payload[0])
      }
    case 'updateAddressAdditionalDescription':
      return { ...state, addressAdditionalDescription: action.payload }
    case 'validateOnSubimit':
      return { ...state, isValidated: true }

    default:
      return state
  }
}

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  topSectionFormWrapper: {
    marginTop: 20,
    marginLeft: 20,
    paddingBottom: 20
  },
  topSectionLowerPartWrapper: {
    marginTop: 20
  },
  numFamMembers: {
    marginLeft: 10,
  },
  imgInputWrapper: {
    marginTop: 10,
    width: 400,
    height: 250
  }
})
const AddVillager = (props: Props) => {
  const classes = useStyles()
  const [isOpenConfirmHomeLocationModal, setIsOpenConfirmHomeLocationModal] = useState(false)
  const [isOpenConfirmSubmitModal, setIsOpenConfirmSubmitModal] = useState(false)

  const [addVillagerFormstate, addVillagerFormDispatch] = useReducer(addVillagerFormReducer, {
    isValidated: false,
    // mandatory fields
    homeRepresentativesName: "",
    isValidHomeRepresentativesName: false,

    homeRepresentativesContactNum: "",
    isValidHomeRepresentativesContactNum: false,

    numberOfFamilyMember: 0,
    isShowErrorNumberOfFamilyMember: false,
    homeLocation: [],
    isValidHomeLocation: false,

    // optional fields
    homeRepresentativesImg: "",
    homeRepresentativesImgURL: "",
    addressAdditionalDescription: "",
  })


  const closeConfirmHomeLocationHandler = () => {
    setIsOpenConfirmHomeLocationModal(false)
  }
  const closeConfirmSubmitHandler = () => {
    setIsOpenConfirmSubmitModal(false)
  }
  const updateFileHandler = (loadedFiles: any) => {
    console.log("loadedFiles", loadedFiles);
    addVillagerFormDispatch({ type: 'updateHomeRepresentativesImg', payload: loadedFiles });
  };

  const onUpdateHomeLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      addVillagerFormDispatch({ type: 'updateHomeLocation', payload: [position.coords.latitude, position.coords.longitude] });
      //close modal
      closeConfirmHomeLocationHandler()
    });
    // if (isEmpty(addVillagerFormstate.homeLocation)) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    //     addVillagerFormDispatch({ type: 'updateHomeLocation', payload: [position.coords.latitude, position.coords.longitude] });
    //   });
    // }
  }
  const openConfirmSubmitModalHandler = () => {
    setIsOpenConfirmSubmitModal(true)
  }
  const openLocationConFirmHandler = () => {
    setIsOpenConfirmHomeLocationModal(true)
  }
  const clickAddHomeLocationHandler = () => {
    // onUpdateHomeLocation()
    openLocationConFirmHandler()
  }
  const submitAddVillagerHandler = () => {
    // validate all fields
    addVillagerFormDispatch({ type: 'validateOnSubimit' })
    if (
      isEmpty(get(addVillagerFormstate, 'homeRepresentativesName')) ||
      !validatePhoneNum(get(addVillagerFormstate, 'homeRepresentativesContactNum')) ||
      isEmpty(get(addVillagerFormstate, 'numberOfFamilyMember')) ||
      isEmpty(get(addVillagerFormstate, 'homeLocation'))
    ) {
      return
    }

    // display confirmation modal
    openConfirmSubmitModalHandler()

  }
  const confirmSubmitAddVillagerHandler = async () => {

    // save image in google drive first

    const imgSavedGGdriveResp = await saveVillagerImgToGGDrive((get(addVillagerFormstate, 'homeRepresentativesImg') || [])[0])
    const imgURLGGdrive = getGGDriveImgURLViewWithId(get(imgSavedGGdriveResp, 'imgIdGGdrive'))
    // const imgURLGGdrive = get(imgURLGGdriveResp, 'imgURLGGdrive')
    // save all info in giigle sheeet
    const res = await axios({
      method: 'post',
      url: 'api/addVillagerToGGSheet',
      data: mapRequestBodyAddVillagerFormState(addVillagerFormstate, imgURLGGdrive)
    })
    console.log('res', res);
  }
  return (
    <div className={classes.root}>
      <Typography variant='h4'>เพิ่มข้อมูลบ้าน</Typography>
      <Grid container className={classes.topSectionFormWrapper}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'homeRepresentativesName'))}
            required
            placeholder='ชื่อที่จำง่าย เช่น พี่หมาย บังมานพ'
            id="required"
            label="ชื่อตัวแทนบ้าน"
            defaultValue=""
            value={get(addVillagerFormstate, 'homeRepresentativesName')}
            helperText={(get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'homeRepresentativesName'))) ? "จำเป็นต้องใส่" : ""}
            onChange={(e) => addVillagerFormDispatch({ type: 'updateHomeRepresentativesName', payload: e.target.value })}
          />
        </Grid>
        <Grid container className={classes.topSectionLowerPartWrapper}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={get(addVillagerFormstate, 'isValidated') && !validatePhoneNum(get(addVillagerFormstate, 'homeRepresentativesContactNum'))}
              required
              placeholder='เบอร์มือถือสิบหลัก'
              id="outlined-required"
              label="เบอร์ติดต่อ"
              defaultValue=""
              value={get(addVillagerFormstate, 'homeRepresentativesContactNum')}
              helperText={(get(addVillagerFormstate, 'isValidated') && !validatePhoneNum(get(addVillagerFormstate, 'homeRepresentativesContactNum'))) ? "เบอร์ไม่ถูกต้อง" : ""}
              onChange={(e) => addVillagerFormDispatch({ type: 'updateHomeRepresentativesContactNum', payload: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.numFamMembers}
              error={get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'numberOfFamilyMember'))}
              required
              id="required"
              label="จำนวนสมาชิกในบ้าน"
              defaultValue=""
              type='number'
              value={get(addVillagerFormstate, 'numberOfFamilyMember')}
              helperText={(get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'numberOfFamilyMember'))) ? "ต้องมีอย่างน้อย 1 คน" : ""}
              onChange={(e) => addVillagerFormDispatch({ type: 'updateNumberOfFamilyMember', payload: e.target.value })}
            />
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <IconButton onClick={clickAddHomeLocationHandler} >
        <AddLocationAltIcon />
        <Typography>
          เพิ่มตำแหน่งที่อยู่ (ตามตำแหน่งอุปกรณ์)
        </Typography>
      </IconButton>

      <TextField
        error={get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'homeLocation'))}
        fullWidth
        required
        id="required"
        label="ตำแหน่งที่อยู่"
        defaultValue=""
        disabled={true}
        onFocus={onUpdateHomeLocation}
        value={get(addVillagerFormstate, 'homeLocation')}
      />
      <Divider style={{ paddingTop: 10, marginBottom: 10 }} />
      <TextField
        fullWidth
        placeholder='ข้อมูลเพิ่มเติมเพื่อช่วยจำ เช่น ตรงข้ามร้านขายข้าวแกง ใกล้ปากซอย 3'
        label="รายละเอียดตำแหน่งที่อยู่"
        defaultValue=""
        value={get(addVillagerFormstate, 'addressAdditionalDescription')}
        onChange={(e) => addVillagerFormDispatch({ type: 'updateAddressAdditionalDescription', payload: e.target.value })}
      />
      <Paper className={classes.imgInputWrapper}>
        <Typography>ภาพตัวแทนบ้าน</Typography>
        <DropzoneArea
          onChange={updateFileHandler}
          clearOnUnmount={true}
          filesLimit={1}
          acceptedFiles={["image/*"]}
          showPreviews={false}
          showPreviewsInDropzone={true}
          dropzoneText={
            ""
          }
          getFileAddedMessage={(fileName) =>
            `อัพโหลดภาพ ${fileName} สำเร็จ`
          }
          getFileRemovedMessage={(fileName) =>
            `นำภาพ ${fileName} ออกแล้ว`
          }
          //previewText="ตัวอย่างภาพ"
          previewGridProps={{
            container: {
              spacing: 1,
              direction: "column",
              alignItems: "center",
            },
          }}
        />
      </Paper>

      <Button
        variant='contained'
        onClick={submitAddVillagerHandler}
        fullWidth>
        เพิ่มบ้าน
      </Button>

      {/* Modals */}
      <ConfirmSubmitModal
        isOpenModal={isOpenConfirmSubmitModal}
        handleCloseModal={closeConfirmSubmitHandler}
        onConfirmSubmitAddVillagerHandler={confirmSubmitAddVillagerHandler}
        addVillagerFormstate={addVillagerFormstate}
      />
      <ConfirmHomeLocationModal
        isOpenModal={isOpenConfirmHomeLocationModal}
        handleCloseModal={closeConfirmHomeLocationHandler}
        onUpdateHomeLocation={onUpdateHomeLocation}
      />
    </div>

  )
}

export default AddVillager