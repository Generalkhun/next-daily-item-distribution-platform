import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { isEmpty } from "lodash";

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
    onConfirmLogout: () => void;
}

export default function InvalidUsernamePasswordModal(props: Props) {
    const classes = useStyles();

    const { isOpenModal, handleCloseModal, onConfirmLogout } = props;

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
                    <p id="transition-modal-description">
                        ต้องการออกจากระบบหรือไม่?
                    </p>
                    <Button onClick={onConfirmLogout}>
                        ยืนยัน
                    </Button>
                    <Button onClick={handleCloseModal}>
                        ยกเลิก
                    </Button>

                </div>
            </Fade>
        </Modal>
    );
}
