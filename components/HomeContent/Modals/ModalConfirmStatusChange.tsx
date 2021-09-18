import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

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
}

export default function ModalConfirmStatusChange(props: Props) {
  const classes = useStyles();

  const { isOpenModal, handleCloseModal } = props;

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
          <h2 id="transition-modal-title">ยืนยันการส่งข้าวสำเร็จ</h2>
          <p id="transition-modal-description">
            หากแน่ใจว่าส่งข้าวสำเร็จแล้ว ให้กดยืนยัน
          </p>
          <Button>
              ยืนยัน
          </Button>
          <Button onClick ={handleCloseModal}>
              ยกเลิก
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
