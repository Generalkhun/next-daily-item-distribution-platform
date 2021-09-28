import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import React, { useReducer, useState } from 'react';
import { DropzoneArea } from "material-ui-dropzone";
import { Button, Paper } from '@material-ui/core';
import { isEmpty } from 'lodash';
interface Props {

}

const addVillagerFormReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateHomeRepresentativesName':
      return { ...state, homeRepresentativesName: action.payload }
    case 'updatehomeRepresentativesContactNum':
      return { ...state, homeRepresentativesContactNum: action.payload }
    case 'updateHomeLocation':
      return { ...state, homeLocation: action.payload }
    case 'updateHomeRepresentativesImg':
      return { ...state, homeRepresentativesImg: action.payload }
    case 'updateAddressAdditionalDescription':
      return { ...state, addressAdditionalDescription: action.payload }
  }
}

const AddVillager = (props: Props) => {
  const [isOpenConfirmHomeLocationModal, setIsOpenConfirmHomeLocationModal] = useState(false)
  const [addVillagerFormstate, addVillagerFormDispatch] = useReducer(addVillagerFormReducer, {
    homeRepresentativesName: "",
    homeRepresentativesContactNum: null,
    numberOfFamilyMember: null,
    homeLocation: [],
    homeRepresentativesImg: "",
    addressAdditionalDescription: "",
  })

  const updateFileHandler = (loadedFiles: any) => {
    console.log("loadedFiles", loadedFiles);
    addVillagerFormDispatch({ type: 'updateHomeRepresentativesImg', payload: loadedFiles });
  };

  const onUpdateHomeLocation = () => {
    if (isEmpty(addVillagerFormstate.homeLocation)) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        addVillagerFormDispatch({ type: 'updateHomeRepresentativesImg', payload: [position.coords.latitude, position.coords.longitude] });
      });
    }
  }
  const openLocationConFirmHandler = () => {
    
  }
  const clickAddHomeLocationHandler = () => {
    onUpdateHomeLocation()
    openLocationConFirmHandler()
  }
  const submitAddVillagerHandler = () => {
    // validate all fields

    // display confirmation modal

    // 
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="required"
                label="ชื่อตัวแทนบ้าน"
                defaultValue=""
                value={addVillagerFormstate.homeRepresentativesName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="outlined-required"
                label="เบอร์ติดต่อ"
                defaultValue=""
                value={addVillagerFormstate.homeRepresentativesContactNum}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="required"
                label="จำนวนสมาชิกในบ้าน"
                defaultValue=""
                type='number'
                value={addVillagerFormstate.numberOfFamilyMember}
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
        fullWidth
        required
        id="required"
        label="ตำแหน่งที่อยู่"
        defaultValue=""
        disabled={!isEmpty(addVillagerFormstate.homeLocation)}
        onFocus={onUpdateHomeLocation}
        value={addVillagerFormstate.homeLocation}
      />
      <TextField
        fullWidth
        required
        label="รายละเอียดตำแหน่งที่อยู่"
        defaultValue=""
        value={addVillagerFormstate.addressAdditionalDescription}
      />

      <Button variant='contained' onClick={submitAddVillagerHandler} fullWidth>เพิ่มบ้าน</Button>
    </>

  )
}

export default AddVillager


// "^0([8|9|6])([0-9]{8}$)"
