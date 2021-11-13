import { HomeWorkSharp } from '@material-ui/icons'
import { getServers } from 'dns'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import HomeContent from '../components/HomeContent'
import { getAllVillagerDataFromGoogleSheet, getItemCatDataFromGoogleSheet } from '../helpers/api/googleSheetApi'
import { get } from 'lodash'
import { formatGoogleSheetDataResponse } from '../helpers/utils/formatGoogleSheetDataResponse'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { GET_ITEMCAT_GGSHEET_DATA, GET_VILLAGER_GGSHEET_DATA } from '../constants'
import { fetchSheetItemCatData, fetchSheetVillagerData } from '../helpers/utils/getSheetDataOnMainPages'
import useCursor from '../hooks/useCursor'
import { LoginContext } from '../contextProviders/LoginContextProvider'

interface Props {

}

//const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
const Home = (props: Props) => {
    // set data to the context on useEffect
    const { initializeVillagerSheetData, initializeItemCatSheetData } = useContext(GoogleSheetDataContext)
    const { displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    const [doneFetchingVillagerData, setDoneFetchingVillagerData] = useState(false)
    const [currentCursor] = useCursor()

    // auth management
    const { isLogin, logoutHandler } = useContext(LoginContext)
    useEffect(() => {
        // if not logged in yet, send back to login page
        if (!isLogin) {
            logoutHandler()
        }

        // set villager google sheet data in the context
        fetchSheetVillagerData().then((initialVillagerRsp) => {
            console.log('initialVillagerRsp', initialVillagerRsp);
            initializeVillagerSheetData(initialVillagerRsp)
            displayVillagerDispatch({ type: 'initialVillagerData', payload: initialVillagerRsp })
            setDoneFetchingVillagerData(true)

        })

        // set item cat google sheet data in the context
        fetchSheetItemCatData().then((fetchSheetItemCatRsp) => {
            console.log('fetchSheetItemCatRsp', fetchSheetItemCatRsp);

            // get item cat sheet data in the context
            initializeItemCatSheetData(fetchSheetItemCatRsp)
        })
    }, [])
    return (
        <div style={{ cursor: currentCursor }}>
            {doneFetchingVillagerData && <HomeContent />}

        </div>
    )
}

export default Home

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