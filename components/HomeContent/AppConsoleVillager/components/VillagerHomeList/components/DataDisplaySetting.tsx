import { Grid, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { get, map } from 'lodash'
import React, { useContext } from 'react'
import { DisplayingVillagerDataContext } from '../../../../../../contextProviders/DisplayingVillagerDataContextProvider'
import { GoogleSheetDataContext } from '../../../../../../contextProviders/GoogleSheetContextProvider'
import { SimpleListMenu } from '../../../../../common/SimpleListMenu'
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
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>เลือกกลุ่มบ้านที่ต้องการดูข้อมูล</Typography>
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
                        <Typography>ดูเฉพาะบ้านที่ยังไม่ได้รับของ</Typography>
                    }
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <Button>ดูเฉพาะพื้นที่</Button>
            </Grid>
            <Grid item xs={12} lg={4}>
                <SimpleListMenu
                    options={itemCatListOptions}
                />
            </Grid>

        </Grid>
    )
}

export default DataDisplaySetting
