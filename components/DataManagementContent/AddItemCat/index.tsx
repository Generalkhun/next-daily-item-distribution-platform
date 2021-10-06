import { Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { get } from 'lodash'
import { isEmpty } from 'lodash'
import React, { useReducer } from 'react'

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
})

const addItemCatFormReducer = (state: any, action: any) => {

    switch (action.type) {
        case 'updateItemCatName':
            return { ...state, itemCatName: action.payload }

    }

}
const addItemCatFormInitialState = {
    itemCatName: '',
    itemToShortageDate: null,
    itemCatImg: {},
}
const AddItemCat = (props: Props) => {
    const classes = useStyles()
    const [addItemCatFormstate, addItemCatFormDispatch] = useReducer(addItemCatFormReducer, addItemCatFormInitialState)
    return (
        <div className={classes.root}>
            <Typography variant='h4'>เพิ่มประเภทสิ่งของ</Typography>
            <Grid container className={classes.topSectionFormWrapper}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error={get(addItemCatFormstate, 'isValidated') && isEmpty(get(addItemCatFormstate, 'itemCatName'))}
                        required
                        placeholder='ชื่อสิ่งของเตรียมแจก เช่น ข้าวกล่อง ถุงยังชีพ ชุดตรวจโควิท'
                        id="required"
                        label="ชื่อประเภทสิ่งของ"
                        defaultValue=""
                        value={get(addItemCatFormstate, 'homeRepresentativesName')}
                        helperText={(get(addItemCatFormstate, 'isValidated') && isEmpty(get(addItemCatFormstate, 'itemCatName'))) ? "จำเป็นต้องใส่" : ""}
                        onChange={(e) => addItemCatFormDispatch({ type: 'updateItemCatName', payload: e.target.value })}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default AddItemCat
