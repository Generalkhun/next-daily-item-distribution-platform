import { HomeWorkSharp } from '@material-ui/icons'
import { getServers } from 'dns'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useContext, useEffect } from 'react'
import HomeContent from '../components/HomeContent'
import { getAllVillagerDataFromGoogleSheet } from '../helpers/api/googleSheetApi'
import { get } from 'lodash'
import { formatGoogleSheetDataResponse } from '../helpers/utils/formatGoogleSheetDataResponse'

interface Props {

}

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    // set data to the context on useEffect
    // const { initialGoogleSheetData, googleSheetDataState } = useContext(googleSheetDataContext)

    useEffect(() => {
        // set google sheet data in the context
        // initialGoogleSheetData(sheetData)
        console.log('props.sheetDataRsp', props.sheetDataRsp);


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
    const sheetData = await getAllVillagerDataFromGoogleSheet()

    const sheetDataRsp = formatGoogleSheetDataResponse(sheetData.data.values)

    return {
        props: {
            sheetDataRsp
        }
    }

}