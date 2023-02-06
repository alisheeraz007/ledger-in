import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
// import "./printModal.css";
import ReactDOM from "react-dom";
import Barcode from "react-barcode";
import { date } from "yup";

function SalePrintDialog(props) {
  let {
    show,
    onHide,
    component,
    SaveAndPrint,
    Entry,
    CalculationTable,
    receivedPayment,
    invoice,
    ask
  } = props;

  return (
    <Modal
      size="sm"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Body id="salePrint">
        <div className="PrintModalHeader">
          <h3>Techsoftech</h3>
          <p
            style={{
              margin: "5px 0px 0px 0px",
              fontSize: "13px",
            }}
          >
           32 C 21 commercial street 
          </p>
          <p
            style={{
              margin: "0px 0px 0px 0px",
              fontSize: "13px",
            }}
          >
         Phase 2, Karachi
          </p>
          <p style={{ fontSize: "13px",marginTop:'3px' }}>(0336)-2486932</p>
          <h6
            style={{
              margin: "5px 0px",
              padding: "2px",
              fontSize: "15px",
            }}
          >
            Sale Reciept
          </h6>
        </div>
        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <table>
            <thead>
              <tr>
                <th style={{ marginRight: "5px", fontSize: "12px" }}>
                  Invoice Number
                </th>
                <td style={{ fontSize: "12px" }}>{invoice}</td>
              </tr>
              <tr>
                <th style={{ marginRight: "5px", fontSize: "12px" }}>
                  Date & Time
                </th>
                <td style={{ fontSize: "12px" }}>
                  {new Date().toDateString()} &{" "}
                  {new Date().toLocaleTimeString()}
                </td>
              </tr>
              <tr>
                <th style={{ marginRight: "5px", fontSize: "12px" }}>
                  Customer Name
                </th>
                <td style={{ fontSize: "12px" }}>
                  {Entry[0] && Entry[0].customer.CustomerName}
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "25px",
          }}
        >
          {component()}
        </div>
        <div
          className="barCode"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Barcode
            value={invoice}
            width="2"
            format="CODE128"
            font="monospace"
            height="50"
            fontSize="14"
          />
          {/* mountNode */}
        </div>
        <div
          className="col-sm-12"
          style={{
            // float: "right",
            padding: 0,
            marginBottom: "25px",
          }}
        >
          {CalculationTable()}
        </div>
        {/* <div
          className="col-sm-12"
          style={{
            textAlign: "center",
          }}
        >
          <h2>You Saved {receivedPayment}</h2>
        </div> */}
        <div className="detailShop">
          <p style={{textAlign:'left'}}>RETURN & EXHANGE POLICY</p>
          {/* line Change */}
          <p className="points">-NO CASH REFUNDS</p> 
          {/* line Change */}
          <p className="points">-Unwashed and unworn items with original price tag attached can be exchnage within 30 days.</p>
          <p className="points">-Item bought on sale can not be exchange or return.</p>
        <h5 style={{textAlign:'center',fontSize:'12px'}}><b>Thank You for shopping at Techsoftech.</b> </h5>
        {/* <hr/> */}
        <p  style={{textAlign:'center', fontSize:'9px',borderTop:"1px solid black", margin:'5px',padding:'5px'}}>Software Development By Techsoftechnologies: 0336-2486932 </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onHide} className="btn btn-primary">
          Cancel
        </button>
        <button className="btn btn-danger" onClick={()=>SaveAndPrint('',ask)}>
          Print & Save
        </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(SalePrintDialog);
