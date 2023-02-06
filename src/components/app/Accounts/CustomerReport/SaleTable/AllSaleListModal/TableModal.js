import React, { useEffect, useMemo, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import EntryTable from "./entryTable";
import ReturnTable from "./returnTable";

function EntryListModal(props) {
  // Customers UI Context
  let { Entry, show, onHide } = props;
  const TotaltFn = () => {
    let obj = Entry;
    let TotalAmount = 0;
    let TotalQuantity = 0;
    let netAmount = 0;
    let entryArr = obj.SaleItem;
    const receivedPayment = obj.receivedPayment;
    let discount = obj.discount;
      for (var i = 0; i < entryArr.length; i++) {
        TotalAmount += Number(entryArr[i].TotalAmount);
        TotalQuantity += Number(entryArr[i].quantity);
        netAmount = TotalAmount - Number(discount);
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
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          All products
        </Modal.Title>
      </Modal.Header>
      {Entry ? (
        <Modal.Body>
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
          <h4 style={{ textAlign: 'center' }}>Sell Invoice</h4>
          <EntryTable Entries={Entry ? Entry.SaleItem : []} />
          {Entry.returnInvoice ? (
            <ReturnTable
              Entries={
                Entry.returnInvoice ? Entry.returnInvoice.retrunInvoiceArr : []
              }
            />
          ) : null}
          <div className="col-md-6" style={{ float: "right" }}>
            <Table borderless={true} className="col-md-12">
              <tbody>
                <tr>
                  <th>Total Amount</th>
                  <td>Rs. {TotaltFn().TotalAmount}/-</td>
                </tr>
                {TotaltFn().discount ? (
                  <tr>
                    <th>Discount</th>
                    <td>Rs. {TotaltFn().discount}/-</td>
                  </tr>
                ) : null}
                <tr>
                  <th>Net Amount</th>
                  <td>Rs. {Number(TotaltFn().netAmount)}/-</td>
                </tr>
                <tr>
                  <th>Payment Recieved</th>
                  <td>Rs. {TotaltFn().receivedPayment}/-</td>
                </tr>
                {TotaltFn().ReturnAmount ? (
                  <tr>
                    <th>Return Amount</th>
                    <td style={{ color: "red" }}>
                      Rs. {Number(TotaltFn().ReturnAmount)}/-
                    </td>
                  </tr>
                ) : null}
                {TotaltFn().balance ? (
                  <tr>
                    <th>Balance</th>
                    <td style={{ color: "red" }}>Rs. {TotaltFn().balance}/-</td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      ) : null}
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
