import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { totalReturnAmount } from "./../../../../../redux/constants";

export default function ReturnDialog(props) {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const [state, setState] = React.useState({
    refund: false,
    Exchange: false,
    // checkedF: true,
    // checkedG: true,
  });
  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [returnAmount, setReturnAmount] = useState("");
  useEffect(() => {
    setReturnAmount(totalReturnAmount(props.returnData));
  }, [totalReturnAmount(props.returnData)]);


  return (
    <div>
      {props.checked ? (
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={handleClickOpen}
        >
          Return
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
        //   disabled
        onClick={handleClickOpen}

        >
          Return
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Exchange/Refund"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.refund}
                  onChange={handleChangeCheck}
                  name="refund"
                  color="primary"
                />
              }
              label="Are you sure you want to return the amount (1999) of these product
              to Ali"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={state.Exchange}
                  onChange={handleChangeCheck}
                  name="Exchange"
                  color="primary"
                />
              }
              label="Are you sure you want to Exchange these product to Ali"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
