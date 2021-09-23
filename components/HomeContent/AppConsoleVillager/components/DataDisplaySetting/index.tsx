import { Grid, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { get, map } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../../../../../contextProviders/DisplayingVillagerDataContextProvider'
import { GoogleSheetDataContext } from '../../../../../contextProviders/GoogleSheetContextProvider'
import { ItemCatListSelector } from './components/ItemCatListSelector'
import { DrawRectangleMode } from 'react-map-gl-draw';
interface Props {

}

const DataDisplaySetting = (props: Props) => {
    // get dispatcher from dispalyVillagerData context
    const { displayVillagerState, displayVillagerDispatch } = useContext
        (DisplayingVillagerDataContext)

    // get itemCat data from the context
    const { googleSheetItemCatData } = useContext(GoogleSheetDataContext)

    console.log('googleSheetItemCatData', googleSheetItemCatData);
    const itemCatListOptions = map(googleSheetItemCatData, (itemCatData) => itemCatData.ITEM_TITLE)


    const isShowOnlyWaitingVillager = get(displayVillagerState, 'filterCondition.displayOnlyNotrecieved')

    const changeShowConditionHandler = () => {
        // change context data
        displayVillagerDispatch({ type: 'filterByFoodRecieved' })
    }
    const toggleSelectByAreaHandler = () => {
        // change context data
        displayVillagerDispatch({ type: 'toggleDrawableMapModeOn' })
    }
    return (
        <Grid container>
            <Grid item xs={12}>
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
                    style={{ fontSize: 0.5 }}
                    control={
                        <Checkbox
                            checked={isShowOnlyWaitingVillager}
                            onChange={changeShowConditionHandler}
                            name="checkedDisplayNonRecievedHouse"
                        />
                    }
                    label={
                        <Typography>เฉพาะบ้านที่ยังไม่ได้รับของ</Typography>
                    }
                />
            </Grid>


            <Grid item xs={12} lg={4}>
                <Button onClick={toggleSelectByAreaHandler}>ดูเฉพาะพื้นที่</Button>
            </Grid>

        </Grid>
    )
}

export default DataDisplaySetting
