import React, { useContext, useEffect, useState } from 'react'
import styles from './Layouts.module.css'
import NavBar from './Navbar'
import { LoginContext } from '../../contextProviders/LoginContextProvider'

const Layout: React.FC = ({ children }) => {
    const { isLogin } = useContext(LoginContext)
    return (
        <div>
            {/* render nav bar only when logged in */}
            {isLogin ? <NavBar /> : <></>}
            <div className={styles.bodyWrapper}>
                {children}
            </div>
        </div>
    )
}

export default Layout