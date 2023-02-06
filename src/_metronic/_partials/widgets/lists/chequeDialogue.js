import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import AccountMiddileWare from "../../../../components/redux/middleWare/accountMiddileWare";
import { withRouter } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [ReturnDes, setReturnDes] = useState("")

  return (
    <div>
      {/* <Button variant="outlined" color="primary">
        Slide in alert dialog
      </Button> */}
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Cleared
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Check Clearance"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Cheque Cleared ?
          {/* <textarea placeholder="Discription" className="form-control " style={{width:"40vw"}} /> */}
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                handleClose();
                // console.log(props.value)
                props.saveStatus({ ...props.value, bankStatus: 'Cleared', payment_Type: 'Bank', payment_mode: 'Bank', Payment_method: props.value.DepositBank,assettype:props.value.assettype === 'Cheque'? 'Bank' : props.value.assettype }, 'Bank')

              }}
              color="primary"
            >
              Cleared
            </Button>
          </DialogContentText>
          <hr />
          <DialogContentText id="alert-dialog-slide-description">
            Check Returned?
          <textarea onChange={(ev) => setReturnDes(ev.target.value)} placeholder="Discription" className="form-control " style={{ width: "40vw" }} />

            <Button
              style={{ float: 'right' }}
              onClick={() => {
                handleClose();
                props.saveStatus({ ...props.value, bankStatus: 'Returned', ReturnDes: ReturnDes }, 'Bank')
              }}
              color="primary"
            >
              Return
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddEntry: (data) => dispatch(AccountMiddileWare.AddEntry(data)),
    EditEntry: (data) => dispatch(AccountMiddileWare.EditEntry(data)),
    // EditProduct: (data, id) =>
    //   dispatch(ProductMiddileware.EditProduct(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AlertDialogSlide));
