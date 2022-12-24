import React, { useContext, useEffect, useState } from 'react'
import HomeContent from '../components/HomeContent'
import { GoogleSheetDataContext } from '../contextProviders/GoogleSheetContextProvider'
import { DisplayingVillagerDataContext } from '../contextProviders/DisplayingVillagerDataContextProvider'
import { fetchSheetItemCatData, fetchSheetVillagerData } from '../helpers/utils/getSheetDataOnMainPages'
import useCursor from '../hooks/useCursor'
import { LoginContext } from '../contextProviders/LoginContextProvider'
import { ExtraNavigationBtn } from '../components/common/ExtraNavigationBtn'
import { useWindowSize } from '../hooks/useWindowResize'

interface Props {

}

const Home = (props: Props) => {
    // set data to the context on useEffect
    const { initializeVillagerSheetData, initializeItemCatSheetData } = useContext(GoogleSheetDataContext)
    const { displayVillagerDispatch } = useContext(DisplayingVillagerDataContext)
    const [doneFetchingVillagerData, setDoneFetchingVillagerData] = useState(false)
    const [currentCursor] = useCursor()
    const [width, height] = useWindowSize()
    const [isShowDesktopOnlyScreen, setIsShowDesktopOnlyScreen] = useState<boolean>(false)

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
    useEffect(() => {
        if (width < 1280) {
            setIsShowDesktopOnlyScreen(true)
        }
    }, [width])
    return (
        <div>
            {isShowDesktopOnlyScreen ?
                <div style={{
                    height: '100vh',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px'
                }}>
                    <img src="https://img.icons8.com/ios/50/null/imac.png" /><span>This app is currently available on desktop only</span>
                </div>
                :
                <div style={{ cursor: currentCursor }}>
                    {doneFetchingVillagerData && <HomeContent />}
                    <ExtraNavigationBtn />
                </div>}
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