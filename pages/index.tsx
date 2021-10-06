import { HomeWorkSharp } from '@material-ui/icons'
import { getServers } from 'dns'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useContext, useEffect } from 'react'
import HomeContent from '../components/HomeContent'
import { getAllVillagerDataFromGoogleSheet, getItemCatDataFromGoogleSheet } from '../helpers/api/googleSheetApi'
import { get } from 'lodash'
import { formatGoogleSheetDataResponse } from '../helpers/utils/formatGoogleSheetDataResponse'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'

interface Props {

}

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    // set data to the context on useEffect
    const { initializeVillagerSheetData, initializeItemCatSheetData } = useContext(GoogleSheetDataContext)
    const { displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    useEffect(() => {
        // set villager google sheet data in the context
        initializeVillagerSheetData(get(props, 'sheetData.sheetVillagerDataRsp'))
        displayVillagerDispatch({ type: 'initialVillagerData', payload: get(props, 'sheetData.sheetVillagerDataRsp') })

        // get item cat sheet data in the context
        initializeItemCatSheetData(get(props, 'sheetData.sheetitemCatDataRsp'))
    }, [])
    return (
        <>
            <HomeContent />
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {

    // fetch all data from google sheet and save in the context
    const sheetVillagerDataRsp = await getAllVillagerDataFromGoogleSheet()
    const sheetitemCatDataRsp = await getItemCatDataFromGoogleSheet()
    
    return {
        props: {
            sheetData: {
                sheetVillagerDataRsp,
                sheetitemCatDataRsp
            }

        }
    }

}