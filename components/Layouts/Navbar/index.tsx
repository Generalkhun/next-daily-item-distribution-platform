import { IconButton, Theme, Toolbar, Typography, AppBar, makeStyles, createStyles, Grid } from "@material-ui/core";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { get } from 'lodash'
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
      fontFamily: 'Cinzel',
      paddingRight: 100
    },
    otherNavText: {
      paddingLeft: 10,
      fontSize: '1.3rem',
      fontFamily: 'Cinzel',
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
      marginTop: 12,
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

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Grid container>
            <Grid item className={classes.naviagtionWrapper} style={{ zIndex: 9999 }} xs={6} sm={6} md={6} lg={6}>
              <IconButton onClick={(e) => {
                e.preventDefault()
                typeof window !== 'undefined' && router.push('/')
              }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Typography className={classes.otherNavText}>
                  ส่งของเข้าบ้าน
                </Typography>
              </IconButton>
            </Grid>
            <Grid item className={classes.naviagtionWrapper}>
              <IconButton onClick={(e) => {
                e.preventDefault()
                typeof window !== 'undefined' && router.push('/datamanagement')
              }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Typography className={classes.otherNavText}>
                  เพิ่ม/แก้ไขข้อมูล
                </Typography>
              </IconButton>
            </Grid>
            <Grid item className={classes.naviagtionWrapper}>
              <IconButton onClick={(e) => {
                e.preventDefault()
                typeof window !== 'undefined' && router.push('/datamanagement')
              }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Typography className={classes.otherNavText}>
                  ออกจากระบบ
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar