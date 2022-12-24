import React, { useContext, useEffect, useState } from 'react'
import HomeContent from '../components/HomeContent'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { fetchSheetItemCatData, fetchSheetVillagerData } from '../helpers/utils/getSheetDataOnMainPages'
import useCursor from '../hooks/useCursor'
import { LoginContext } from '../contextProviders/LoginContextProvider'
import { ExtraNavigationBtn } from '../components/common/ExtraNavigationBtn'

const Home = () => {
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
            initializeVillagerSheetData(initialVillagerRsp)
            displayVillagerDispatch({ type: 'initialVillagerData', payload: initialVillagerRsp })
            setDoneFetchingVillagerData(true)
        }).catch(err => { throw new Error(err) })

        // set item cat google sheet data in the context
        fetchSheetItemCatData().then((fetchSheetItemCatRsp) => {
            // get item cat sheet data in the context
            initializeItemCatSheetData(fetchSheetItemCatRsp)
        }).catch(err => { throw new Error(err) })
    }, [])

    return (
        <div style={{ cursor: currentCursor }}>
            {doneFetchingVillagerData && <HomeContent />}
            <ExtraNavigationBtn />
        </div>
    )
}

export default Home