import { makeStyles, createStyles, Theme } from "@material-ui/core";

const drawerWidthLgUp = "20%";
export const appConsoleStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      display: "flex",
    },
    drawer: {
      zIndex: 1,
      width: drawerWidthLgUp,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidthLgUp, boxSizing: 'border-box' },
    },
    drawerPaper: {
      width: drawerWidthLgUp,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    AppConsoleVillagerWrapper: {
      height: '90vh'
    },
    villageHomeListWrapper: {

    },
    summaryInfoWrapper: {
      height: '30vh'
    },
  })
);
