import React, { useContext, useEffect, useState } from 'react'
import styles from './Layouts.module.css'
import NavBar from './Navbar'
import { LoginContext } from '../../contextProviders/LoginContextProvider'
import { useWindowSize } from '../../hooks/useWindowResize'

const Layout: React.FC = ({ children }) => {
    const { isLogin } = useContext(LoginContext)
    const [width] = useWindowSize()
    const [isShowDesktopOnlyScreen, setIsShowDesktopOnlyScreen] = useState<boolean>(false)
    useEffect(() => {
        if (width < 1280) {
            setIsShowDesktopOnlyScreen(true)
        }
    }, [width])
    return (
        <div>
            {isShowDesktopOnlyScreen ? <div>
                {/* render nav bar only when logged in */}
                {isLogin ? <NavBar /> : <></>}
                <div className={styles.bodyWrapper}>
                    {children}
                </div>
            </div> : <div style={{
                height: '100vh',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <img src="https://img.icons8.com/ios/50/null/imac.png" /><span>This app is currently available on desktop only</span>
            </div>}
        </div>

    )
}

export default Layout