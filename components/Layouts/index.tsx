import React from 'react'
import styles from './Layouts.module.css'
import { Grid } from '@material-ui/core'
import NavBar from './Navbar'

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <NavBar/>
            <div className={styles.bodyWrapper}>
            {children}
            </div>
          
        </div>
    )
}

export default Layout