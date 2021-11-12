import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
export const StyledBadgeUrgent = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "red",
      color: "red",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        content: '""',
      },
    },
  })
)(Badge);
