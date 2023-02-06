import { Button } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import EntryTable from "./entryTable";
// import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReturnDialog from "./ReturnDialogue";
// import Button from "@material-ui/core/Button";

function EntryListModal(props) {
  // Customers UI Context
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  let [checked, setChecked] = React.useState(false);
  let [returnData, setReturnData] = useState("");
  const handleClose = () => {
    setOpen(false);
    setReturnData([]);
    setChecked(false);
  };
  let [returnTrue, setReturnTrue] = useState(false);

  let { Entry, show, onHide } = props;

  const TotaltFn = () => {
    let obj = Entry;
    let TotalAmount = 0;
    let TotalQuantity = 0;
    let netAmount = 0;
    let entryArr = obj.SaleItem;
    const receivedPayment = obj.receivedPayment;
    let discount = obj.discount;
    if (entryArr) {
      for (var i = 0; i < entryArr.length; i++) {
        TotalAmount += Number(entryArr[i].TotalAmount);
        TotalQuantity += Number(entryArr[i].quantity);
        netAmount = TotalAmount - Number(discount);
      }
    }
    return {
      TotalAmount,
      netAmount,
      balance:
        Number(receivedPayment) < TotalAmount
          ? TotalAmount - Number(receivedPayment) - Number(discount)
          : 0,
      ReturnAmount:
        Number(receivedPayment) > netAmount
          ? Number(receivedPayment) - netAmount
          : 0,
      receivedPayment: receivedPayment,
      // payment_Type,
      TotalQuantity,
      discount,
    };
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        onHide();
        handleClose();
      }}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          All productssss
        </Modal.Title>
        {/* <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={()=>setReturnTrue(true)}
          >
            Return
          </Button> */}
      </Modal.Header>
      {Entry ? (
        <Modal.Body>
          {Entry.DeliveredBy && (
            <Table borderless className="col-md-4">
              <tbody>
                <tr>
                  <th>Enter By :</th>
                  <td>
                    {Entry.DeliveredBy.fullname || Entry.DeliveredBy.firstName}
                  </td>
                </tr>
                <tr>
                  <th>Enter Date:</th>
                  <td>{new Date(Entry.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Enter Time:</th>
                  <td>{new Date(Entry.date).toLocaleTimeString()}</td>
                </tr>
              </tbody>
            </Table>
          )}
          <EntryTable
            Entries={Entry ? Entry.SaleItem || Entry.retrunInvoiceArr : []}
            setChecked={setChecked}
            checked={checked}
            setReturnData={setReturnData}
            returnData={returnData}
            returnTrue={returnTrue}
          />
          <div className="col-md-6" style={{ float: "right" }}>
            <Table borderless={true} className="col-md-12">
              {Entry.main_heads != "Return" ?
                <tbody>
                  <tr>
                    <th>Total Amount</th>
                    <td>Rs. {Entry.TotalAmount}/-</td>
                  </tr>
                  {Entry.discount ? (
                    <tr>
                      <th>Discount</th>
                      <td>Rs. {Entry.discount}/-</td>
                    </tr>
                  ) : null}
                  <tr>
                    <th>Net Amount</th>
                    <td>Rs. {Entry.ReturnNetAmount ? Entry.ReturnNetAmount : Entry.netAmount}/-</td>
                  </tr>
                  {/* <tr></tr> */}
                  <tr>
                    <th>Payment Recieved</th>
                    <td>Rs. {Entry.receivedPayment}/-</td>
                  </tr>
                  {Entry.ReturnAmount ? (
                    <tr>
                      {Entry.ReturnRecievedPayment ?
                        <>
                          <th>Payable</th>
                          <td style={{ color: "red" }}>
                            Rs. {Entry.ReturnRecievedPayment}/-
                    </td>
                        </>
                        :
                        <>
                          <th>Return Amount</th>
                          <td style={{ color: "red" }}>
                            Rs. {Entry.ReturnAmount}/-
                    </td>
                        </>
                      }
                    </tr>
                  ) : null}
                  {Entry.balance ? (
                    <tr onClick={()=>console.log(Entry)}>
                      <th>Balance</th>
                      <td style={{ color: "red" }}>Rs. {Entry.balance}/-</td>
                    </tr>
                  ) : null}
                </tbody>
                : <tbody>
                  <tr>
                    <th>Total Amount</th>
                    <td>Rs. {Entry.ReturnTotalAmount}/-</td>
                  </tr>

                  <tr onClick={Entry}>
                    <th>Net Amount</th>
                    <td>Rs. {Entry.ReturnNetAmount}/-</td>
                  </tr>
                  {/* <tr></tr> */}
                  <tr>
                    <th>Payable</th>
                    <td>Rs. {Entry.ReturnRecievedPayment}/-</td>
                  </tr>
                  {Entry.ReturnAmount ? (
                    <tr>
                      <th>Return Amount</th>
                      <td style={{ color: "red" }}>
                        Rs. {Entry.ReturnAmount}/-
                </td>
                    </tr>
                  ) : <tr>
                      <th>Return Amount</th>
                      <td style={{ color: "red" }}>
                        Rs. 0/-
            </td>
                    </tr>}
                  {Entry.balance ? (
                    <tr onClick={() => console.log(Entry)}>
                      <th>Balancessss</th>
                      <td style={{ color: "red" }}>Rs. {Entry.balance}/-</td>
                    </tr>
                  ) : null}
                </tbody>}
            </Table>
          </div>
        </Modal.Body>
      ) : null}
      <Modal.Footer>
        {/* <ReturnDialog checked={checked} setChecked={setChecked}  returnData={returnData} setReturnData={setReturnData}  /> */}
      </Modal.Footer>
    </Modal>
  );
}
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryListModal);
