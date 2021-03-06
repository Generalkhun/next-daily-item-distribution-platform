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
import VillagerDetailsCardManager from "../../../../../../common/VillagerDetailsCardManager";
import VillagerTransactionHistory from "./components/VillagerTransactionHistory";

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
  personId:string
  handleCloseModal: () => void;
  key: number;
  homeLocation: [string, string]
  personName: string;
  isItemRecieved: boolean;
  personImgUrl: string;
  numberOfFamilyMembers: number;
  homeRepresentativesContactNum: string
  isSelected: boolean
  addressAdditionalDescription:string
}

export default function ModalVillagerDetails(props: Props) {
  const classes = useStyles();

  const {
    isOpenModal,
    handleCloseModal,
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
          <h2 id="transition-modal-title">ข้อมูลตัวแทนบ้าน</h2>
          <p id="transition-modal-description"></p>
          <VillagerDetailsCardManager submissionHandlerMode={true} {...props} />
          <VillagerTransactionHistory />
        </div>
      </Fade>
    </Modal>
  );
}
