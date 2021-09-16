import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface Props {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  changeShowConditionHandler: () => void;
  isShowOnlyWaitingVillager: boolean;
}

export default function ModalConfirmStatusChange(props: Props) {
  const classes = useStyles();

  const {
    isOpenModal,
    handleCloseModal,
    isShowOnlyWaitingVillager,
    changeShowConditionHandler,
  } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpenModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenModal}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">ตั้งค่า</h2>
          <p id="transition-modal-description">ตั้งค่าการแสดงผลข้อมูล</p>
          <FormControlLabel
            style={{ fontSize: 1 }}
            control={
              <Checkbox
                checked={isShowOnlyWaitingVillager}
                onChange={changeShowConditionHandler}
                name="checkedA"
              />
            }
            label={
              <Typography>แสดงข้อมูลเฉพาะบ้านที่ยังไม่ได้รับข้าว</Typography>
            }
          />
        </div>
      </Fade>
    </Modal>
  );
}
