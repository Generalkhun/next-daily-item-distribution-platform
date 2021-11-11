import { Grid, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { get, map } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../../../../../contextProviders/DisplayingVillagerDataContextProvider'
import { GoogleSheetDataContext } from '../../../../../contextProviders/GoogleSheetContextProvider'
import { ItemCatListSelector } from './components/ItemCatListSelector'
import { DrawRectangleMode } from 'react-map-gl-draw';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
interface Props {

}

const DataDisplaySetting = (props: Props) => {
    // get dispatcher from dispalyVillagerData context
    const { displayVillagerState, displayVillagerDispatch } = useContext
        (DisplayingVillagerDataContext)

    // get itemCat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)
    const itemCatListOptions = map(googleSheetItemCatData, (itemCatData) => itemCatData.ITEM_TITLE)


    const isShowOnlyWaitingVillager = get(displayVillagerState, 'filterCondition.displayOnlyNotrecieved')
    const isFilterByArea = get(displayVillagerState, 'filterCondition.isFilterByArea')
    const changeShowConditionHandler = () => {
        // change context data
        displayVillagerDispatch({ type: 'filterByFoodRecieved' })
    }
    const toggleSelectByAreaHandler = () => {
        // if isFilterByArea is off, turn it on 
        if (!isFilterByArea) {
            displayVillagerDispatch({ type: 'togglefilterByAreaOn' })
        }

        // change context data
        displayVillagerDispatch({ type: 'toggleDrawableMapModeOn' })

        // reset rectangle on map
        displayVillagerDispatch({ type: 'updateMapRectangle', payload: [] })

    }
    const onTurnFilterByAreaOffHandler = () => {
        displayVillagerDispatch({ type: 'togglefilterByAreaOff' })
        displayVillagerDispatch({ type: 'toggleDrawableMapModeOff' })
    }
    return (
        <Grid container>
            <Grid item xs={12} style={{marginTop:5, marginLeft:5}}>
                <Typography>เลือกดูข้อมูล</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
                <ItemCatListSelector
                    options={itemCatListOptions}
                    displayVillagerDispatch={displayVillagerDispatch}
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <FormControlLabel
                    style={{ marginTop: 25 }}
                    control={
                        <Checkbox
                            checked={isShowOnlyWaitingVillager}
                            onChange={changeShowConditionHandler}
                            name="checkedDisplayNonRecievedHouse"
                        />
                    }
                    label={
                        <Typography style={{fontSize:15}}>เฉพาะบ้านที่ยังไม่ได้รับของ</Typography>
                    }
                />
            </Grid>


            <Grid item xs={12} lg={4}>
                <Button style={{ marginTop: 30, fontSize: 15 }} onClick={toggleSelectByAreaHandler} endIcon={<PhotoSizeSelectSmallIcon/>}>
                    ดูเฉพาะพื้นที่
                
                </Button>
                {isFilterByArea ? <CancelIcon onClick={onTurnFilterByAreaOffHandler} /> : <></>}
            </Grid>

        </Grid>
    )
}

export default DataDisplaySetting
