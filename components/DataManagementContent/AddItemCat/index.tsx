import { Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { find, get } from 'lodash'
import { isEmpty } from 'lodash'
import { DropzoneArea } from 'material-ui-dropzone'
import React, { useContext, useReducer, useState } from 'react'
import { ADD_ITEM_CAT_SERVICE_URL } from '../../../constants'
import { GoogleSheetDataContext } from '../../../contextProviders/GoogleSheetContextProvider'
import { saveImgToGGDrive } from '../../../helpers/api/saveImgToGGDriveAPI'
import { getGGDriveImgURLViewWithId } from '../../../helpers/utils/getGGDriveImgURLViewWithId'
import { mapRequestBodyAddItemCatFormState } from '../../../helpers/utils/mapRequestBodyAddItemCatFormState'
import ConfirmationItemAddedModal from './components/ConfirmationItemAddedModal'
interface Props {

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
    imgInputWrapper: {
        marginTop: 10,
        width: 400,
        height: 250,
        marginBottom: 50
    }
})

const addItemCatFormReducer = (state: any, action: any) => {

    switch (action.type) {
        case 'updateItemCatName':
            return { ...state, itemCatName: action.payload }
        case 'updateItemRecievedType':
            return { ...state, itemToShortageDays: action.payload === 'repetitive' ? null : state.itemToShortageDays, itemRecievedType: action.payload }
        case 'updateItemToShortageDays':
            return { ...state, itemToShortageDays: action.payload > 0 ? action.payload : 0 }
        case 'updateItemCatImg':
            return { ...state, itemCatImg: action.payload }
        case 'validateOnSubimit':
            return { ...state, isValidated: true }


    }

}
const addItemCatFormInitialState = {
    itemCatName: '',
    itemRecievedType: '',
    itemToShortageDays: null,
    itemCatImg: {},
    isValidated: false
}

const AddItemCat = (props: Props) => {
    const classes = useStyles()
    const [addItemCatFormstate, addItemCatFormDispatch] = useReducer(addItemCatFormReducer, addItemCatFormInitialState)
    console.log('addItemCatFormstate', addItemCatFormstate);

    const itemCatName = get(addItemCatFormstate, 'itemCatName')
    const itemRecievedType = get(addItemCatFormstate, 'itemRecievedType')
    const itemToShortageDays = get(addItemCatFormstate, 'itemToShortageDays')
    const itemCatImg = get(addItemCatFormstate, 'itemCatImg')
    const isValidated = get(addItemCatFormstate, 'isValidated')

    const [isOpenConfirmSubmitItemModal, setIsOpenConfirmSubmitItemModal] = useState(false)

    // get item cat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)


    console.log('googleSheetItemCatData', googleSheetItemCatData);

    const currentTotalItemCat = googleSheetItemCatData && googleSheetItemCatData.length
    console.log('currentTotalItemCat', currentTotalItemCat);

    const isItemAlreadyExit = (itemName: string): boolean => {
        const existedItem = find(googleSheetItemCatData, (itemCat) => {
            return itemCat.ITEM_TITLE === itemName
        })
        if (existedItem) {
            return true
        }
        return false
    }
    const openConfirmSubmitItemModalHandler = () => {
        setIsOpenConfirmSubmitItemModal(true)
    }
    const closeConfirmSubmitItemModalHandler = () => {
        setIsOpenConfirmSubmitItemModal(false)
    }
    const submitAddItemCatHandler = () => {

        // validate all fields
        addItemCatFormDispatch({ type: 'validateOnSubimit' })
        if (
            isEmpty(itemCatName) ||
            isItemAlreadyExit(itemCatName) ||
            isEmpty(itemRecievedType) ||
            isEmpty(itemCatImg) ||
            (itemRecievedType === 'repetitive' && isEmpty(itemToShortageDays))
        ) {
            return
        }

        // display confirmation modal
        openConfirmSubmitItemModalHandler()

    }
    const onConfirmAddItem = async () => {

        // save image in google drive first (if have)

        const itemCatImg = get(addItemCatFormstate, 'itemCatImg')
        let imgURLGGdrive = ''
        if (!isEmpty(itemCatImg)) {
            const imgSavedGGdriveResp = await saveImgToGGDrive((itemCatImg || [])[0])
            imgURLGGdrive = getGGDriveImgURLViewWithId(get(imgSavedGGdriveResp, 'imgIdGGdrive'))
        }
        // save all info in google sheeet
        const res = await axios({
            method: 'post',
            url: ADD_ITEM_CAT_SERVICE_URL,
            data: mapRequestBodyAddItemCatFormState(addItemCatFormstate, imgURLGGdrive, currentTotalItemCat)
        })
        console.log('res', res);

        //get props again by refresh
        window.location.reload();


    }

    return (
        <div className={classes.root}>
            <Typography variant='h6'>??????????????????????????????????????????????????????</Typography>
            <Grid container className={classes.topSectionFormWrapper}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error={isValidated && (isEmpty(itemCatName) || isItemAlreadyExit(itemCatName))}
                        required
                        placeholder='???????????????????????????????????????????????????????????? ???????????? ??????????????????????????? ??????????????????????????? ????????????????????????????????????'
                        id="required"
                        label="???????????????????????????????????????????????????"
                        defaultValue=""
                        value={get(addItemCatFormstate, 'homeRepresentativesName')}
                        helperText={isValidated ? (isEmpty(itemCatName) ? "???????????????????????????????????????" : (isItemAlreadyExit(itemCatName) ? "????????????????????????????????????????????????????????????" : "")) : ""}
                        onChange={(e) => addItemCatFormDispatch({ type: 'updateItemCatName', payload: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <FormControl component="fieldset" error={isValidated && isEmpty(itemRecievedType)}>
                        <FormLabel component="legend">??????????????????????????????????????????????????????????????????</FormLabel>
                        <RadioGroup
                            aria-label="itemRecievedType"
                            name="controlled-radio-buttons-group"
                            value={itemRecievedType}
                            onChange={(e) => addItemCatFormDispatch({ type: 'updateItemRecievedType', payload: e.target.value })}
                        >
                            <FormControlLabel value="oneTime" control={<Radio />} label="??????????????????????????????????????????????????????" />
                            <FormControlLabel value="repetitive" control={<Radio />} label="???????????????????????????????????????????????????" />


                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {itemRecievedType === 'repetitive' ?
                        <TextField
                            fullWidth
                            error={isValidated && isEmpty(itemToShortageDays)}
                            required
                            placeholder='??????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                            id='required'
                            label='???????????????????????????????????????????????????????????????????????? (?????????) ??????????????????????????????????????????'
                            defaultValue=''
                            type='number'
                            value={itemToShortageDays}
                            helperText={(get(addItemCatFormstate, 'isValidated') && isEmpty(get(addItemCatFormstate, 'itemToShortageDays'))) ? "??????????????????????????? 1 ?????????" : ''}
                            onChange={(e) => addItemCatFormDispatch({ type: 'updateItemToShortageDays', payload: e.target.value })}
                        />
                        :
                        <></>
                    }
                </Grid>
                <Grid item xs={12}>

                    <Paper className={classes.imgInputWrapper}>
                        <Typography style={{ color: isValidated && isEmpty(itemCatImg) ? 'red' : 'black' }}>{`?????????????????????????????????????????????????????? ${isValidated && isEmpty(itemCatImg) ? '(????????????????????????)' : ''}`}</Typography>
                        <DropzoneArea
                            onChange={(loadedFiles) => addItemCatFormDispatch({ type: 'updateItemCatImg', payload: loadedFiles })}
                            clearOnUnmount={true}
                            filesLimit={1}
                            acceptedFiles={["image/*"]}
                            showPreviews={false}
                            showPreviewsInDropzone={true}
                            dropzoneText={
                                ""
                            }
                            getFileAddedMessage={(fileName) =>
                                `?????????????????????????????? ${fileName} ??????????????????`
                            }
                            getFileRemovedMessage={(fileName) =>
                                `??????????????? ${fileName} ?????????????????????`
                            }
                            //previewText="?????????????????????????????????"
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
                <Button
                    variant='contained'
                    onClick={submitAddItemCatHandler}
                    fullWidth>????????????????????????????????????</Button>
            </Grid>

            {/* confirmation modal */}
            <ConfirmationItemAddedModal
                isOpenModal={isOpenConfirmSubmitItemModal}
                handleCloseModal={closeConfirmSubmitItemModalHandler}
                onConfirmAddItem={onConfirmAddItem}
                itemCatName={itemCatName}
                itemToShortageDays={itemToShortageDays}
                itemCatImgURL={itemCatImg}
            />
        </div>
    )
}

export default AddItemCat
