import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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
    }
})
const AddItemCat = (props: Props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant='h4'>เพิ่มประเภทสิ่งของ</Typography>
        </div>
    )
}

export default AddItemCat
