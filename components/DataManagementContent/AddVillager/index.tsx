import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import React, { useReducer, useState } from 'react';
import { DropzoneArea } from "material-ui-dropzone";
import { Button, Paper } from '@material-ui/core';
import { get, isEmpty } from 'lodash';
import ConfirmHomeLocationModal from './components/ConfirmHomeLocationModal';
import ConfirmSubmitModal from './components/ConfirmSubmitModal';
import axios from 'axios';
import { mapRequestBodyAddVillagerFormState } from '../../../helpers/utils/mapRequestBodyAddVillagerFormState';
import { validatePhoneNum } from '../../../helpers/utils/formValidations';
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
      return { ...state, homeRepresentativesImg: action.payload }
    case 'updateAddressAdditionalDescription':
      return { ...state, addressAdditionalDescription: action.payload }
    case 'validateOnSubimit':
      return { ...state, isValidated: true }

    default:
      return state
  }
}

const AddVillager = (props: Props) => {
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
    addressAdditionalDescription: "",
  })

  const closeConfirmHomeLocationHandler = () => {
    setIsOpenConfirmHomeLocationModal(false)
  }
  const closeConfirmSubmitHandler = () => {
    setIsOpenConfirmHomeLocationModal(false)
  }
  const updateFileHandler = (loadedFiles: any) => {
    console.log("loadedFiles", loadedFiles);
    addVillagerFormDispatch({ type: 'updateHomeRepresentativesImg', payload: loadedFiles });
  };

  const onUpdateHomeLocation = () => {
    if (isEmpty(addVillagerFormstate.homeLocation)) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        addVillagerFormDispatch({ type: 'updateHomeLocation', payload: [position.coords.latitude, position.coords.longitude] });
      });
    }
    closeConfirmHomeLocationHandler()
  }
  const openConfirmSubmitModalHandler = () => {
    setIsOpenConfirmSubmitModal(true)
  }
  const openLocationConFirmHandler = () => {
    setIsOpenConfirmHomeLocationModal(true)
  }
  const clickAddHomeLocationHandler = () => {
    onUpdateHomeLocation()
    openLocationConFirmHandler()
  }
  const submitAddVillagerHandler = () => {
    // validate all fields
    addVillagerFormDispatch({ type: 'validateOnSubimit' })
    console.log('get(addVillagerFormstate, "homeRepresentativesName")', get(addVillagerFormstate, 'homeRepresentativesName'));

    // display confirmation modal
    // openConfirmSubmitModalHandler()

  }
  const confirmSubmitAddVillagerHandler = async () => {

    // save data 
    console.log('addVillagerFormstate', addVillagerFormstate);
    const res = await axios({
      method: 'post',
      url: 'api/addVillager',
      data: mapRequestBodyAddVillagerFormState(addVillagerFormstate)
    })
    console.log('res', res);
  }
  return (
    <>
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
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <TextField
                error={get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'homeRepresentativesName'))}
                required
                id="required"
                label="ชื่อตัวแทนบ้าน"
                defaultValue=""
                value={get(addVillagerFormstate, 'homeRepresentativesName')}
                helperText={(get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'homeRepresentativesName'))) ? "จำเป็นต้องใส่" : ""}
                onChange={(e) => addVillagerFormDispatch({ type: 'updateHomeRepresentativesName', payload: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                error={get(addVillagerFormstate, 'isValidated') && !validatePhoneNum(get(addVillagerFormstate, 'homeRepresentativesContactNum'))}
                required
                id="outlined-required"
                label="เบอร์ติดต่อ"
                defaultValue=""
                value={get(addVillagerFormstate, 'homeRepresentativesContactNum')}
                helperText={(get(addVillagerFormstate, 'isValidated') && !validatePhoneNum(get(addVillagerFormstate, 'homeRepresentativesContactNum'))) ? "เบอร์ไม่ถูกต้อง" : ""}
                onChange={(e) => addVillagerFormDispatch({ type: 'updateHomeRepresentativesContactNum', payload: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                error={get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'numberOfFamilyMember'))}
                required
                id="required"
                label="จำนวนสมาชิกในบ้าน"
                defaultValue=""
                type='number'
                value={get(addVillagerFormstate, 'numberOfFamilyMember')}
                helperText={(get(addVillagerFormstate, 'isValidated') && isEmpty(get(addVillagerFormstate, 'numberOfFamilyMember'))) ? "จำเป็นต้องใส่" : ""}
                onChange={(e) => addVillagerFormDispatch({ type: 'updateNumberOfFamilyMember', payload: e.target.value })}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ width: 500, height: 400 }}>
            <DropzoneArea
              onChange={updateFileHandler}
              clearOnUnmount={true}
              filesLimit={1}
              acceptedFiles={["image/*"]}
              showPreviews={true}
              showPreviewsInDropzone={false}
              dropzoneText={
                "อัพโหลดภาพตัวแทนบ้าน"
              }
              getFileAddedMessage={(fileName) =>
                `อัพโหลดภาพ ${fileName} สำเร็จ`
              }
              getFileRemovedMessage={(fileName) =>
                `นำภาพ ${fileName} ออกแล้ว`
              }
              previewText="ตัวอย่างภาพ"
              previewGridProps={{
                container: {
                  spacing: 1,
                  direction: "column",
                  alignItems: "center",
                },
              }}
            />
          </Paper>

        </Grid>
      </Grid>

      <Divider />

      <Button onClick={clickAddHomeLocationHandler} fullWidth variant='contained'>เพิ่มคำแหน่งที่อยู่</Button>

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
      <TextField
        fullWidth
        label="รายละเอียดตำแหน่งที่อยู่"
        defaultValue=""
        value={get(addVillagerFormstate, 'addressAdditionalDescription')}
        onChange={(e) => addVillagerFormDispatch({ type: 'updateAddressAdditionalDescription', payload: e.target.value })}
      />

      <Button
        variant='contained'
        onClick={submitAddVillagerHandler}
        fullWidth>
        เพิ่มบ้าน
      </Button>
    </>

  )
}

export default AddVillager