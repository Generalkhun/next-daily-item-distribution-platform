import { Grid, ListItem } from '@material-ui/core'
import { map } from 'lodash'
import React, { useState } from 'react'
import AddItemCat from '../components/DataManagementContent/AddItemCat'
import AddVillager from '../components/DataManagementContent/AddVillager'
import { MENUS_DATA_MGT } from '../constants'

interface Props {

}

const datamanagement = (props: Props) => {
    const [selectedMenu, setSelectedMenu] = useState(0)
    const onClickSelectMenu = (idx: number) => {
        setSelectedMenu(idx)
    }
    return (
        <Grid container>
            <Grid item sm={1} md={2} lg={3}>
                {map(MENUS_DATA_MGT, (menu, idx) => {
                    return (<ListItem
                        key={idx}
                        button
                        onClick={() => onClickSelectMenu(idx)}
                        selected={selectedMenu === idx}
                    >
                        {menu.menuTitle}
                    </ListItem>)
                })}
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={5}>
                {selectedMenu === 0 ? <AddVillager /> : <></>}
                {selectedMenu === 1 ? <AddItemCat /> : <></>}
            </Grid>
            <Grid item sm={1} md={2} lg={3}></Grid>
        </Grid>
    )
}

export default datamanagement
