import { Grid, ListItem } from '@material-ui/core'
import { map } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import AddItemCat from '../components/DataManagementContent/AddItemCat'
import AddVillager from '../components/DataManagementContent/AddVillager'
import { MENUS_DATA_MGT } from '../constants'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { fetchSheetItemCatData, fetchSheetVillagerData } from '../helpers/utils/getSheetDataOnMainPages'
import { LoginContext } from '../contextProviders/LoginContextProvider'

const Datamanagement = () => {
    // set data to the context on useEffect
    const { initializeVillagerSheetData, initializeItemCatSheetData } = useContext(GoogleSheetDataContext)
    const { displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    const [doneFetchingVillagerData, setDoneFetchingVillagerData] = useState(false)

    // auth management
    const { isLogin, logoutHandler } = useContext(LoginContext)
    useEffect(() => {
        // if not logged in yet, send back to login page
        if (!isLogin) {
            logoutHandler()
        }

        // set villager google sheet data in the context
        fetchSheetVillagerData()
            .catch((err) => {
                throw new Error(err);
            })
            .then((initialVillagerRsp) => {
                initializeVillagerSheetData(initialVillagerRsp)
                displayVillagerDispatch({ type: 'initialVillagerData', payload: initialVillagerRsp })
                setDoneFetchingVillagerData(true)
            })

        // set item cat google sheet data in the context
        fetchSheetItemCatData().then((fetchSheetItemCatRsp) => {

            // get item cat sheet data in the context
            initializeItemCatSheetData(fetchSheetItemCatRsp)
        })
    }, [])
    const [selectedMenu, setSelectedMenu] = useState(0)
    const onClickSelectMenu = (idx: number) => {
        setSelectedMenu(idx)
    }
    return (
        <>
            {doneFetchingVillagerData &&
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
                </Grid>}
        </>
    )
}

export default Datamanagement