import { IconButton, Theme, Toolbar, Typography, AppBar, makeStyles, createStyles, Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { get } from 'lodash'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import OtherMenuList from "./components/OtherMenuList";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LoginContext } from "../../../contextProviders/LoginContextProvider";
import ModalConfirmLogout from "./components/ModalConfirmLogout";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 9999
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontStyle: 'BOLD',
      fontFamily: 'Kanit',
      paddingRight: 100
    },
    otherNavText: {
      paddingLeft: 10,
      fontSize: '1.3rem',
      fontFamily: 'Kanit',
    },
    otherNavIcon: {
      marginLeft: 'auto',
      paddingBottom: 5
    },
    otherNavIconSelectedheros: {
      marginLeft: 'auto',
      paddingBottom: 5,
      color: '#c6ff00'
    },
    otherNavIconSelectedfav: {
      marginLeft: 'auto',
      paddingBottom: 5,
      color: '#f50057'
    },
    naviagtionWrapper: {
      //paddingLeft:480,
      // [theme.breakpoints.down('lg')]:{
      //   paddingLeft:180
      // },
      // [theme.breakpoints.down('md')]:{
      //   paddingLeft:220
      // }
    },
    appbar: {
      backgroundColor: '#333437',
    }
  }),
);

const NavBar = () => {
  const router = useRouter()
  const pathname = get(router, 'pathname')
  const theme = useTheme();
  const matchesMediaQueryMediumAndBelow = useMediaQuery(theme.breakpoints.down('md'))
  const { logoutHandler } = useContext(LoginContext)
  const classes = useStyles();
  const [isOpenModalConfirmLogout, setIsOpenModalConfirmLogout] = useState(false)
  const openModalConfirmLogouHandler = () => {
    setIsOpenModalConfirmLogout(true)
  }
  const closeModalConfirmLogouHandler = () => {
    setIsOpenModalConfirmLogout(false)
  }
  const onConfirmLogout = () => {
    logoutHandler()
    closeModalConfirmLogouHandler()
  }

  return (
    <div className={classes.root}>
      <ModalConfirmLogout
        isOpenModal={isOpenModalConfirmLogout}
        handleCloseModal={closeModalConfirmLogouHandler}
        onConfirmLogout={onConfirmLogout}
      />
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Grid container>
            <Grid item className={classes.naviagtionWrapper} style={{ zIndex: 9999 }} xs={10} sm={matchesMediaQueryMediumAndBelow ? 10 : 6} md={3} lg={2}>
              <IconButton onClick={(e) => {
                e.preventDefault()
                typeof window !== 'undefined' && router.push('/')
              }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <HomeIcon style={{ color: pathname === '/' ? '#f7e1af' : 'white' }} />
                <Typography style={{ color: pathname === '/' ? '#f7e1af' : 'white' }} className={classes.otherNavText}>
                  ส่งของเข้าบ้าน
                </Typography>
              </IconButton>
            </Grid>
            {matchesMediaQueryMediumAndBelow ? <></> : <Grid item className={classes.naviagtionWrapper} md={6} lg={8}>
              <IconButton onClick={(e) => {
                e.preventDefault()
                typeof window !== 'undefined' && router.push('/Datamanagement')
              }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <AddCircleOutlineIcon style={{ color: pathname === '/Datamanagement' ? '#f7e1af' : 'white' }} />
                <Typography style={{ color: pathname === '/Datamanagement' ? '#f7e1af' : 'white' }} className={classes.otherNavText}>
                  เพิ่ม/แก้ไขข้อมูล
                </Typography>
              </IconButton>
            </Grid>}
            {matchesMediaQueryMediumAndBelow ? <></> : <Grid item className={classes.naviagtionWrapper}>
              <IconButton onClick={(e) => {
                e.preventDefault()
                openModalConfirmLogouHandler()
              }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <ExitToAppIcon />
                <Typography className={classes.otherNavText}>
                  ออกจากระบบ
                </Typography>
              </IconButton>
            </Grid>}
            {matchesMediaQueryMediumAndBelow ? <OtherMenuList /> : <></>}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar