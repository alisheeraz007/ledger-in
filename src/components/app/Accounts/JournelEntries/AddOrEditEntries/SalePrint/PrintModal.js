import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
// import "./printModal.css";
import ReactDOM from "react-dom";
import Barcode from "react-barcode";
import { date } from "yup";
import { Button } from "react-bootstrap";
import { AmountTotal, currentBalance } from "../../../../../redux/constants";
// import EntryTable from "../entryTable";

function JournalPrintDialog(props) {
  let {
    show,
    handleClose,
    handleShow,
    table,
    data,
    // setProductArr,
    supplier,
    saveEntries,
    journalInvoice,
    setFieldValue,
    // // onHide,
    // // component,
    // // SaveAndPrint,
    // // Entry,
    // CalculationTable,

    // // receivedPayment,
    // // invoice,
    // saveProduct,
    // assettype,
    // paymentmode,
    // totalArr,
    // setProductStat
  } = props;
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  let [date, setDate] = useState(new Date());
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
  </Button> */}
      <Modal
        show={show} onHide={handleClose}
      // size="sm"
      // show={show}
      // onHide={onHide}
      // aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body id="EntryPrint">
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
            <p style={{ fontSize: "13px", marginTop: '3px' }}>(0336)-2486932</p>
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
                  <th style={{ marginRight: "15px", fontSize: "12px" }}>
                    Invoice Number
                </th>
                  <td style={{ fontSize: "12px" }}>{journalInvoice}</td>
                </tr>
                <tr>
                  <th style={{ marginRight: "15px", fontSize: "12px" }}>
                    Date & Time
                </th>
                  <td style={{ fontSize: "12px" }}>
                    {new Date().toDateString()} &{" "}
                    {new Date().toLocaleTimeString()}
                  </td>
                </tr>
                {data.supplier && props.authReducer.user ?
                  <>
                    <tr>
                      <th style={{ marginRight: "15px", fontSize: "12px" }}>
                        Supplier Name
                </th>
                      <td style={{ fontSize: "12px" }}>
                        {data.supplier.SupplierName}
                      </td>
                    </tr>
                    {Number(data.price) > 0 ?
                      <>
                        <tr>
                          <th style={{ marginRight: "15px", fontSize: "12px" }}>
                            Paid
              </th>
                          <td style={{ fontSize: "12px" }}>
                            {Number(data.price)}
                          </td>
                        </tr>
                        <tr>
                          <th style={{ marginRight: "15px", fontSize: "12px" }}>
                            Paid by
          </th>
                          <td style={{ fontSize: "12px" }}>
                            {props.authReducer.user.username}

                          </td>
                        </tr>
                      </>
                      : Number(data.price) <= 0 ?
                        <>
                          <tr>
                            <th style={{ marginRight: "15px", fontSize: "12px" }}>
                              recieved
                             </th>
                            <td style={{ fontSize: "12px" }}>
                              {-Number(data.price)}

                            </td>
                          </tr>
                          <tr>
                            <th onClick={() => console.log(props.authReducer.user.username)} style={{ marginRight: "15px", fontSize: "12px" }}>
                              Recieved by
                             </th>
                            <td style={{ fontSize: "12px" }}>
                              {props.authReducer.user.username}

                            </td>
                          </tr>
                        </> : null}
                    <tr>
                      <th onClick={() => console.log(props.authReducer.user.username)} style={{ marginRight: "15px", fontSize: "12px" }}>
                        Previous Balance
                      </th>
                      <td style={{ fontSize: "12px" }}>
                        {currentBalance(
                          false,
                          data.supplier,
                          props.AccountReducer ? props.AccountReducer.Account_entries : null,
                          props.SupplyProductReducer ? props.SupplyProductReducer.entities : null,
                        )}

                      </td>
                    </tr>

                    <tr>
                      <th onClick={() => console.log(props.authReducer.user.username)} style={{ marginRight: "15px", fontSize: "12px" }}>
                        Updated Balance
                      </th>
                      <td style={{ fontSize: "12px" }}>
                        {currentBalance(
                          false,
                          data.supplier,
                          props.AccountReducer ? props.AccountReducer.Account_entries : null,
                          props.SupplyProductReducer ? props.SupplyProductReducer.entities : null,
                        ) - (Number(data.price))}

                      </td>
                    </tr>
                  </>
                  : data.Customer && props.authReducer.user ?
                    <>
                      <tr>
                        <th style={{ marginRight: "15px", fontSize: "12px" }}>
                          Customer Name
                          </th>
                        <td style={{ fontSize: "12px" }}>
                          {data.Customer.CustomerName}
                        </td>
                      </tr>
                      {Number(data.price) < 0 ?
                        <>
                          <tr>
                            <th style={{ marginRight: "15px", fontSize: "12px" }}>
                              Paid
                           </th>
                            <td style={{ fontSize: "12px" }}>
                              {-Number(data.price)}
                            </td>
                          </tr>
                          <tr>
                            <th style={{ marginRight: "15px", fontSize: "12px" }}>
                              Paid by
          </th>
                            <td style={{ fontSize: "12px" }}>
                              {props.authReducer.user.username}

                            </td>
                          </tr>
                        </>
                        : Number(data.price) >= 0 ?
                          <>
                            <tr>
                              <th style={{ marginRight: "15px", fontSize: "12px" }}>
                                recieved
                             </th>
                              <td style={{ fontSize: "12px" }}>
                                {Number(data.price)}

                              </td>
                            </tr>
                            <tr>
                              <th style={{ marginRight: "15px", fontSize: "12px" }}>
                                Recieved by
            </th>
                              <td style={{ fontSize: "12px" }}>
                                {props.authReducer.user.username}

                              </td>
                            </tr>
                          </>
                          : null}
                             <tr>
                        <th onClick={() => console.log(data.Customer)} style={{ marginRight: "15px", fontSize: "12px" }}>
                          Updated Balance
            </th>
                        <td style={{ fontSize: "12px" }}>
                          {Number(AmountTotal(data.Customer ? data.Customer.db_id : data.Customer.db_id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance)}

                        </td>
                      </tr>
                      <tr>
                        <th onClick={() => console.log(data.Customer)} style={{ marginRight: "15px", fontSize: "12px" }}>
                          Updated Balance
            </th>
                        <td style={{ fontSize: "12px" }}>
                          {Number(AmountTotal(data.Customer ? data.Customer.db_id : data.Customer.db_id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance)
                            - Number(data.price)}

                        </td>
                      </tr>
                    </>
                    : null}



              </thead>
            </table>
          </div>

          <div
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              marginBottom: "25px",
            }}
          >
            {/* {data.HeadType.toLowerCase() === "account recievable" ?
              Number(data.price) < 0 ?
                <div>
                  <p>Paid To {data.Customer.CustomerName} </p>
                  <p>{data.price}</p>
                </div>
                : Number(data.price) >= 0 ?
                  <div>
                    <p>Paid To {data.Customer.CustomerName} </p>
                    <p>{-Number(data.price)}</p>
                  </div>
                  : null
              : null
            } */}

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
              value={journalInvoice}
              width="2"
              format="CODE128"
              font="monospace"
              height="50"
              fontSize="14"
            />
          </div>
          <div
            className="col-sm-12"
            style={{
              padding: 0,
              marginBottom: "25px",
            }}
          >
          </div>


          <div className="detailShop">
            <p className="points">-NO CASH REFUNDS</p>
            <p className="points">-Unwashed and unworn items with original price tag attached can be exchnage within 30 days.</p>
            <p className="points">-Item bought on sale can not be exchange or return.</p>
            <h5 style={{ textAlign: 'center', fontSize: '12px' }}><b>Thank You for shopping at Techsoftech.</b> </h5>
            <p style={{ textAlign: 'center', fontSize: '9px', borderTop: "1px solid black", margin: '5px', padding: '5px' }}>Software Development By Techsoftechnologies: 0336-2486932 </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleClose()}
            className="btn btn-primary">
            Cancel
        </button>
          <button className="btn btn-danger"
            onClick={() => {
              handleClose();
              saveEntries({
                ...data,
                assettype: data.assettype ? data.assettype : "Cash",
                type: data.type ? data.type : "Income",
                bankStatus: data.payment_Type === 'Cheque' ? 'In Draw' : null,
                journalInvoice: journalInvoice,
                user: props.authReducer.user

              }, "print");
              setTimeout(() => {
                setFieldValue("HeadType", '')
                setFieldValue('assettype', '')
                setFieldValue('type', '')
                setFieldValue("Customer", '');
                setFieldValue('supplier', '')
                setFieldValue("payment_Type", '');
                setFieldValue("payment_mode", '');
                setFieldValue("Payment_method", "");
                setFieldValue("price", '');
                setFieldValue("assettype", '');
                setFieldValue("checkDate", '');
                setFieldValue("checkDes", '');
                setFieldValue("description", '');
              }, 500);
            }}
          >
            Print & Save
        </button>
        </Modal.Footer>
      </Modal>
    </>

  );
}
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
    SupplierReducer: state.SupplierReducer,
    SupplyProductReducer: state.SupplyProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(JournalPrintDialog);
