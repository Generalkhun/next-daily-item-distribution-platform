import {
    Toolbar,
    IconButton,
    makeStyles,
    createStyles,
    Theme,
    useTheme,
    CssBaseline,
    Drawer,
    Grid,
  } from "@material-ui/core";
  import CancelIcon from "@material-ui/icons/Cancel";
import { VillagerHomeData } from "../../type";
import VillagerConsoleBox from "./components/VillagerConsoleBox";
  
  interface Props {
    openVillagerConsole: boolean;
    setOpenVillagerConsole: any;
    // mapCenterLocation: [number, number];
    // villagerHomeListData: Array<VillagerHomeData>;
    // onClickVillager: (villager: VillagerHomeData) => void;
    selectedVillagerInfo: VillagerHomeData;
  }
  
  const drawerWidth = "60%"
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: "none",
      },
      root: {
        display: "flex",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: theme.zIndex.drawer - 1,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      villagerInfoBox: {
          paddingTop: 20,
      }
    })
  );
  const VillagerConsole = (props: Props) => {
    const { openVillagerConsole, setOpenVillagerConsole, selectedVillagerInfo } =
      props;
    const classes = useStyles();
    const theme = useTheme();
  
    const handleVillagerConsoleClose = () => {
      setOpenVillagerConsole(false);
    };
    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* Villager data list display */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="top"
          open={openVillagerConsole}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />s
          <Grid container>
            <Grid item xs={5}></Grid>
            <Grid item xs={6} className={classes.villagerInfoBox}>
            <VillagerConsoleBox
              selectedVillagerInfo={selectedVillagerInfo}
            />
            </Grid>
          </Grid>
  
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleVillagerConsoleClose}>
              <CancelIcon />
            </IconButton>
          </div>
        </Drawer>
      </div>
    );
  };
  
  export default VillagerConsole;
  