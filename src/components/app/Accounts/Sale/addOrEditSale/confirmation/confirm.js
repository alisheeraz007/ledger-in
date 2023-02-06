// import { Button } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
import { Modal, Table, Button } from "react-bootstrap";
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function ConfirmModal(props) {
    let {
        //     open,
        //     setOpen,
        //     handleClickOpen,
        //     handleClose,
        show,
        setShow,
        handleClose,
        handleShow
    } = props



    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleShow} style={{ float: "right" }} type="submit"
                className="btn btn-primary ml-2">
                Sale And Add Details
      </Button>
            <Modal
                // open={open}
                // TransitionComponent={Transition}
                show={show} onHide={handleClose}
            // keepMounted
            // onClose={handleClose}
            // aria-labelledby="alert-dialog-slide-title"
            // aria-describedby="alsert-dialog-slide-description"
            >
                {/* <DialogTitle id="alert-dialog-slide-title">{"Confirm Your Sale"}</DialogTitle> */}
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Your Sale</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <DialogContentText id="alert-dialog-slide-description"> */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                        <p style={{ margin: "0", width: "60%" }}>Did you want to return the remaining ammount?</p>
                        {props.save()}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                        <p style={{ margin: "0", width: "60%" }}>Did you want add the remaining ammount to the customer balance?</p>
                        {props.savebal()}
                    </div>
                    {/* </DialogContentText> */}
                </Modal.Body>
                <Modal.Footer>
                    {/* {props.save()} */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ConfirmModal
