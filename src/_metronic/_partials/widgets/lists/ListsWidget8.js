/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import {
  OpeningBalance,
  TodayFilter,
  TotalSaleAmount,
  cashInHand,
  TodayReturnsFilter,
  TotalBankCash,
  totalCashBank,
} from "../../../../components/redux/constants";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ListWidget8({ className, ...props }) {
  const classes = useStyles();

  let [entries, setEntries] = useState("");
  let [accountEntries, setAccountEntries] = useState("");
  useEffect(() => {
    setAccountEntries(
      props.AccountReducer.Account_entries.sort(
        (a, b) => Number(b.toString().slice(4)) - Number(a.toString().slice(4))
      )
    );
    setEntries(
      props.AccountReducer.All_entries.sort(
        (a, b) => Number(b.toString().slice(4)) - Number(a.toString().slice(4))
      )
    );
  }, [props.AccountReducer.All_entries, props.AccountReducer.Account_entries]);
  function entrySep(arr) {
    let arr2 = [];
    arr.map((a, i) => [arr2.push(a)]);
    arr.map((a, i) => {
      if (a.returnInvoice) {
        arr2.push(a.returnInvoice);
      }
    });
    return arr2;
  }
  let [accounts, setAccounts] = useState("");
  useEffect(() => {
    if (
      props.AccountReducer.entities.filter(
        (obj) => obj.HeadType === ("Bank" || "bank")
      )[0]
    ) {
      setAccounts(
        props.AccountReducer.entities.filter(
          (obj) => obj.HeadType === ("Bank" || "bank")
        )[0].types
      );
    }
  }, [props.AccountReducer.entities]);
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3
            style={{ width: "100%" }}
            className="card-title align-items-start flex-column"
          >
            <span className="font-weight-bolder text-dark">Bank</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span
                style={{ width: "30%" }}
                className="text-muted mt-3 font-weight-bold font-size-sm"
              >
                {TodayFilter(props.AccountReducer.All_entries).filter(
                  (obj) => obj.payment_mode ? obj.payment_mode.toLowerCase() === "bank" : obj.assettype.toLowerCase() === "bank"
                ).length +
                  TodayFilter(props.AccountReducer.Account_entries).filter(
                    (obj) => obj.payment_mode ? obj.payment_mode.toLowerCase() === "bank" : obj.assettype.toLowerCase() === "bank"
                  ).length +
                  TodayFilter(props.SupplyProductReducer.entities).filter(
                    (obj) =>
                      obj.payment_mode ? obj.payment_mode.toLowerCase() === "bank" : obj.assettype.toLowerCase() === "bank" ||
                        obj.payment_mode ? obj.payment_mode.toLowerCase() === "cheque" : obj.assettype.toLowerCase() === "cheque"
                  ).length +
                  TodayReturnsFilter(props.AccountReducer.All_entries).filter(
                    (obj) => obj.payment_mode ? obj.payment_mode.toLowerCase() === "cheque" : obj.assettype.toLowerCase() === "bank"
                  ).length}
                Entries
              </span>
              <span
                style={{
                  display: "flex",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#00000047",
                  // alignItems:"center",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                {accounts
                  ? accounts.length
                    ? accounts.map((a, i) => {
                      return (
                        <p style={{ margin: "0px", marginRight: "2px" }}>
                          {" "}
                          {a.type}{" "}
                        </p>
                      );
                    })
                    : null
                  : null}
              </span>
            </div>
          </h3>
        </div>
        <div className="card-header align-items-center border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              Total Bank Balance
            </span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {totalCashBank(
                props.AccountReducer.All_entries,
                props.AccountReducer.Account_entries,
                props.AccountReducer.entities,
                props.SupplyProductReducer.entities,
                'bank'
              )}
              /-
            </span>
          </h5>
        </div>
        {/* Body */}
        <div className="card-body pt-4 " style={{ overflow: "auto" }}>
          <div className="timeline timeline-5 mt-3">
            {entries &&
              accountEntries &&
              [
                ...TodayFilter(entrySep(props.AccountReducer.All_entries)),
                // ...TodayReturnsFilter(props.AccountReducer.All_entries),
                ...TodayFilter(props.AccountReducer.Account_entries),
                ...TodayFilter(props.SupplyProductReducer.entities),
              ]
                .sort(
                  (a, b) =>
                    Number(String(b.date).slice(0)) -
                    Number(String(a.date).slice(0))
                )
                .map((value, i) => {
                  return (value.payment_Type && value.payment_Type.toLowerCase() === "bank" &&
                    value.main_Heads === "Income") ||
                    (value.assettype && value.assettype.toLowerCase() === "bank" &&
                      value.main_Heads === "Income") ? (
                      <div className="timeline-item align-items-start">
                        {/* <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                      {new Date(
                        value.date
                      ).getHours()}{" "}
                      :
                      {new Date(
                        value.date
                      ).getMinutes()}
                    </div> */}

                        {/* {value.main_Heads === "Income" ? ( */}

                        <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                          {new Date(value.date).getHours()} :
                        {new Date(value.date).getMinutes()}
                        </div>
                        <div className="timeline-badge pl-3 ">
                          <i className="fa fa-genderless text-success icon-xl"></i>
                        </div>
                        <div className="timeline-content d-flex">
                          {value.HeadType && value.main_Heads && value.main_Heads === 'Income' && value.HeadType != "Sale" ?
                            <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                              {value.SaleItem ? value.SaleItem.length : null} Received
                          Amount{" "}
                              <span style={{ textTransform: "capitalize" }}>
                                {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                            ({value.type}){" "}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#0000006b",
                                  fontWeight: "800",
                                }}
                              >
                                Transfer On {value.Payment_method ? value.Payment_method : value.payment_Type}
                              </span>
                            </span>
                            : value.HeadType && value.main_Heads && value.main_Heads === 'Income' && value.HeadType === "Sale" ?
                              <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                {value.SaleItem ? value.SaleItem.length : null} Items
                          Sold To{" "}
                                <span style={{ textTransform: "capitalize" }}>
                                  {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                            ({value.HeadType}){" "}
                                  {value.SaleItem ? value.SaleItem[0].customer.CustomerName : null}
                                </span>
                                <br />
                                <span
                                  style={{
                                    fontSize: "11px",
                                    color: "#0000006b",
                                    fontWeight: "800",
                                  }}
                                >
                                  Transfer On {value.Payment_method ? value.Payment_method : value.payment_Type}
                                </span>
                              </span>
                              : null}
                        </div>
                        {value.HeadType && value.main_Heads && value.main_Heads === 'Income' && value.HeadType != "Sale" ?
                          <div
                            className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                            style={{ fontStyle: "italic", width: "77px" }}
                          >
                            Rs. {value.price}
                       /-
                     </div>
                          : value.HeadType && value.main_Heads && value.main_Heads === 'Income' && value.HeadType === "Sale" ?
                            <div
                              className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                              style={{ fontStyle: "italic", width: "77px" }}
                            >
                              Rs. {value.TotalAmount - Number(value.discount)}
                        /-
                      </div>
                            : null}
                      </div>
                    ) : (value.payment_mode && value.payment_mode.toLowerCase() === "bank" &&
                      (value.main_heads === "Return" || value.main_Heads === "Return")) ||
                      (value.payment_mode && value.payment_mode.toLowerCase() === "bank" &&
                        value.main_heads === "Return") ? (
                        <div className="timeline-item align-items-start">
                          <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                            {new Date(value.date).getHours()} :
                        {new Date(value.date).getMinutes()}
                          </div>

                          <div className="timeline-badge pl-3 ">
                            <i className="fa fa-genderless text-success icon-xl"></i>
                          </div>

                          <div className="timeline-content d-flex">
                            <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                              {value.length} Items has{" "}
                              <span style={{ color: "#ff4500" }}>Returned</span>{" "}
                          from{" "}
                              <span style={{ textTransform: "capitalize" }}>
                                ({`Paid`}){" "}
                                {value.retrunInvoiceArr ? value.retrunInvoiceArr[0]?.customer.CustomerName
                                  ? value.retrunInvoiceArr[0]?.customer.CustomerName
                                  : value.retrunInvoiceArr[0]?.customer.firstName : null}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#0000006b",
                                  fontWeight: "800",
                                }}
                              >
                                Paid On {value.payment_Type}
                              </span>
                            </span>
                          </div>
                          <div
                            className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                            style={{ fontStyle: "italic", width: "77px" }}
                          >
                            Rs. {value.ReturnNetAmount}
                        /-
                      </div>
                        </div>
                      ) : (value.payment_mode && value.payment_mode.toLowerCase() === "bank" &&
                        value.main_Heads === "Expenses") ||
                        (value.payment_mode && value.payment_mode.toLowerCase() === "bank" &&
                          value.main_Heads === "Expenses") ? (
                          <>
                            <div className="timeline-item align-items-start">
                              <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                                {new Date(value.date).getHours()} :
                          {new Date(value.date).getMinutes()}
                              </div>
                              <div className="timeline-badge pl-3 ">
                                <i className=" dashCircle fa fa-genderless text-success icon-xl"></i>
                              </div>
                              <div className="timeline-content d-flex">
                                <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                  Paid
                                  <span style={{ textTransform: "capitalize" }}>
                                    {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                              ({value.main_Heads}){" "}
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      color: "#0000006b",
                                      fontWeight: "800",
                                    }}
                                  >
                                    Transfer From {value.Payment_method ? value.Payment_method : value.payment_Type}
                                  </span>
                                </span>
                              </div>
                              <div
                                className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                style={{ fontStyle: "italic", width: "77px" }}
                              >
                                Rs. {value.price}
                          /-
                        </div>
                            </div>
                          </>
                        ) : // ) : null}
                        (value.payment_mode && value.payment_mode.toLowerCase() === "bank" &&
                          (value.main_Heads === "Income" ||
                            value.main_Heads === "Recieved")) ||
                          (value.payment_mode && value.payment_mode.toLowerCase() === "bank" &&
                            (value.main_Heads === "Income" ||
                              value.main_Heads === "Recieved")) ? (
                            <>
                              <div className="timeline-item align-items-start">
                                <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                                  {new Date(value.date).getHours()} :
                          {new Date(value.date).getMinutes()}
                                </div>
                                <div className="timeline-badge pl-3 ">
                                  <i className=" fa fa-genderless text-success icon-xl"></i>
                                </div>
                                <div className="timeline-content d-flex">
                                  <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                    1 Cheque Transfer{" "}
                                    <span style={{ textTransform: "capitalize" }}>
                                      {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                              ({value.main_Heads}) to your bank account
                            </span>
                                    <br />
                                    {/* <span
                            style={{
                              fontSize: "11px",
                              color: "#0000006b",
                              fontWeight: "800",
                            }}
                          >
                            Transfer From Cheque
                          </span> */}
                                  </span>
                                </div>
                                <div
                                  className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                  style={{ fontStyle: "italic", width: "77px" }}
                                >
                                  Rs.{value.TotalAmount - Number(value.discount)}
                          /-
                        </div>
                              </div>
                            </>
                          ) : ((value.payment_mode && value.payment_mode.toLowerCase() === "bank") &&
                            (value.main_Heads === "Liabilities" ||
                              (value.main_Heads === "Assets" &&
                                (value.supplier || value.Customer)))) ||
                            ((value.payment_mode && value.payment_mode.toLowerCase() === "bank") &&
                              (value.main_Heads === "Liabilities" ||
                                (value.main_Heads === "Assets" &&
                                  (value.supplier || value.Customer)))) ? (
                              <>
                                <div className="timeline-item align-items-start">
                                  <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                                    {new Date(value.date).getHours()} :
                          {new Date(value.date).getMinutes()}
                                  </div>
                                  <div className="timeline-badge pl-3 ">
                                    <i className="  fa fa-genderless text-success icon-xl"></i>
                                  </div>
                                  <div className="timeline-content d-flex">
                                    <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                      {value.main_Heads === "Liabilities"
                                        ? "Paid To"
                                        : value.main_Heads === "Assets"
                                          ? "Recieved from"
                                          : null}{" "}
                                      <span style={{ textTransform: "capitalize" }}>
                                        {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                              (
                              {value.supplier
                                          ? value.supplier.SupplierName
                                          : value.Customer.CustomerName}
                              )
                            </span>
                                      <br />
                                      {/* <span
                      style={{
                        fontSize: "11px",
                        color: "#0000006b",
                        fontWeight: "800",
                      }}
                    >
                      withdrawed From Cheque
                    </span> */}
                                    </span>
                                  </div>
                                  <div
                                    className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                    style={{ fontStyle: "italic", width: "77px" }}
                                  >
                                    Rs.{value.price ? value.price : 0}
                          /-
                        </div>
                                </div>
                              </>
                            ) : ((value.payment_mode && value.payment_mode.toLowerCase() === "bank" ||
                              value.payment_mode && value.payment_mode.toLowerCase() === "cheque") &&
                              (value.paid === "paid" ||
                                (value.paid === "paid" && value.supplier))) ||
                              ((value.payment_mode && value.payment_mode.toLowerCase() === "bank" ||
                                value.payment_mode && value.payment_mode.toLowerCase() === "cheque") &&
                                (value.paid === "paid" ||
                                  (value.paid === "paid" && value.supplier))) ? (
                                <>
                                  <div className="timeline-item align-items-start">
                                    <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                                      {new Date(value.date).getHours()} :
                          {new Date(value.date).getMinutes()}
                                    </div>
                                    <div className="timeline-badge pl-3 ">
                                      {value.paid === "paid" || value.supplier ?

                                        <i className=" dashCircle fa fa-genderless text-success icon-xl"></i>
                                        :

                                        <i className="  fa fa-genderless text-success icon-xl"></i>
                                      }
                                    </div>
                                    <div className="timeline-content d-flex">
                                      <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                        Purchased {value.quantity} 
                            From
                            <span style={{ textTransform: "capitalize" }}>
                                          {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                              ({value.supplier.SupplierName})
                            </span>
                                        <br />
                                        <span
                                          style={{
                                            fontSize: "11px",
                                            color: "#0000006b",
                                            fontWeight: "800",
                                          }}
                                        >
                                          Paid From ({value.payment_Type})
                            </span>
                                      </span>
                                    </div>
                                    <div
                                      className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                      style={{ fontStyle: "italic", width: "77px" }}
                                    >
                                      Rs.{value.PaymentPaid ? value.PaymentPaid : 0}
                          /-
                        </div>
                                  </div>
                                </>
                              ) : null;
                })}
          </div>
        </div>
        {/* footer */}
        <Divider />
        <div className="card-header align-items-center border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              Today Cash In Bank
            </span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {totalCashBank(
                TodayFilter(props.AccountReducer.All_entries),
                TodayFilter(props.AccountReducer.Account_entries),
                TodayFilter(props.AccountReducer.entities),
                TodayFilter(props.SupplyProductReducer.entities),
                'bank'
              )}
              /-
            </span>
          </h5>
        </div>
      </div>
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
    SupplyProductReducer: state.SupplyProductReducer,
    SuppliersReducer: state.SupplierReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListWidget8);
