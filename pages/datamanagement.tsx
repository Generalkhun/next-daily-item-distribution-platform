import { Grid, ListItem } from '@material-ui/core'
import { map } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import AddItemCat from '../components/DataManagementContent/AddItemCat'
import AddVillager from '../components/DataManagementContent/AddVillager'
import { GET_ITEMCAT_GGSHEET_DATA, GET_VILLAGER_GGSHEET_DATA, MENUS_DATA_MGT } from '../constants'
import { HomeWorkSharp } from '@material-ui/icons'
import { getServers } from 'dns'
import { getAllVillagerDataFromGoogleSheet, getItemCatDataFromGoogleSheet } from '../helpers/api/googleSheetApi'
import { get } from 'lodash'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import axios from 'axios'

interface Props {

}

const datamanagement = (props: Props) => {
    // set data to the context on useEffect
    const { initializeVillagerSheetData, initializeItemCatSheetData } = useContext(GoogleSheetDataContext)
    const { displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    useEffect(() => {
        // fetch all data from google sheet and save in the context
        const fetchSheetVillagerData = async () => {
            const sheetVillagerDataRsp = await axios({
                method: 'get',
                url: GET_VILLAGER_GGSHEET_DATA
            })
            return sheetVillagerDataRsp
        }

        const fetchSheetItemCatData = async () => {
            const sheetItemCatDataRsp = await axios({
                method: 'get',
                url: GET_ITEMCAT_GGSHEET_DATA
            })
            return sheetItemCatDataRsp
        }
        // set villager google sheet data in the context
        initializeVillagerSheetData(fetchSheetVillagerData())
        displayVillagerDispatch({ type: 'initialVillagerData', payload: fetchSheetVillagerData() })

        // get item cat sheet data in the context
        initializeItemCatSheetData(fetchSheetItemCatData())
    }, [])
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

// export const getStaticProps: GetStaticProps = async (context) => {

//     // fetch all data from google sheet and save in the context
//     const sheetVillagerDataRsp = await getAllVillagerDataFromGoogleSheet()
//     const sheetitemCatDataRsp = await getItemCatDataFromGoogleSheet()

//     return {
//         props: {
//             sheetData: {
//                 sheetVillagerDataRsp,
//                 sheetitemCatDataRsp
//             }

//         }
//     }

// }