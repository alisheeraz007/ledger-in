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
} from "../../../../components/redux/constants";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AlertDialogSlide from "./chequeDialogue";
import AccountMiddileware from "../../../../components/redux/middleWare/accountMiddileWare";
import ChequeForm from './chequeForm'
import ChequeDetail from "./chequeDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ListsWidget1({ className, ...props }) {
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
  function saveProduct(value, type) {
    // props.EditEntry({

    //   ...props.AccountReducer.All_entries.filter(
    //     (obj) => obj.db_id == paramsID
    //   )[0],
    //   ...TotaltFn(),
    //   priceType,
    //   SaleItem: entryArr,
    //   // TotalAmount,
    // });
    if (value.invoiceNumber) {
      props.EditEntry({
        ...props.AccountReducer.All_entries.filter(
          (obj) => obj.invoiceNumber === value.invoiceNumber
        )[0],
        main_Heads: "Recieved",
        HeadType: "Sale",
        date: new Date().getTime(),
        SaleItem: value.SaleItem,
        TotalAmount: value.TotalAmount,
        discount: value.discount,
        assettype: type,
        checkDes: value.checkDes,
        checkDate: value.checkDate,
        // ...TotaltFn(),

        DeliveredBy: props.authReducer.user,
      });
    } else if (value.db_id && !value.invoiceNumber) {
      props.EditEntry({
        ...props.AccountReducer.Account_entries.filter(
          (obj) => obj.db_id === value.db_id
        )[0],
        // main_Heads: "Recieved",
        // HeadType: "Sale",
        // date: new Date().getTime(),
        // SaleItem: value.SaleItem,
        // TotalAmount: value.TotalAmount,
        // discount: value.discount,
        // assettype: type,
        // checkDes: value.checkDes,
        // checkDate: value.checkDate,
        // ...TotaltFn(),

        // DeliveredBy: props.authReducer.user,

        assettype: type,
        payment_Type: type,
      });
    }
  }
  function saveStatus(value, type) {
    // props.EditEntry({

    //   ...props.AccountReducer.All_entries.filter(
    //     (obj) => obj.db_id == paramsID
    //   )[0],
    //   ...TotaltFn(),
    //   priceType,
    //   SaleItem: entryArr,
    //   // TotalAmount,
    // });
    if (value.invoiceNumber) {
      props.EditEntry({
        ...props.AccountReducer.All_entries.filter(
          (obj) => obj.invoiceNumber === value.invoiceNumber
        )[0],
        main_Heads: "Recieved",
        HeadType: "Sale",
        date: new Date().getTime(),
        // SaleItem: value.SaleItem,
        // TotalAmount: value.TotalAmount,
        // discount: value.discount,
        // assettype: type,
        // checkDes: value.checkDes,
        // checkDate: value.checkDate,
        // ...TotaltFn(),
        ...value,
        DeliveredBy: props.authReducer.user,
      });
    } else if (value.db_id && !value.invoiceNumber) {
      // console.log({
      //   ...props.AccountReducer.Account_entries.filter(
      //     (obj) => obj.db_id === value.db_id
      //   )[0], ...value
      // })
      props.EditEntry({
        ...props.AccountReducer.Account_entries.filter(
          (obj) => obj.db_id === value.db_id
        )[0],
        // main_Heads: "Recieved",
        // HeadType: "Sale",
        // date: new Date().getTime(),
        // SaleItem: value.SaleItem,
        // TotalAmount: value.TotalAmount,
        // discount: value.discount,
        // assettype: type,
        // checkDes: value.checkDes,
        // checkDate: value.checkDate,
        // ...TotaltFn(),

        // DeliveredBy: props.authReducer.user,

        ...value
      });
    }
  }
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span
              className="font-weight-bolder text-dark"
            >
              Cheque
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              {TodayFilter(props.AccountReducer.All_entries).filter(
                (obj) => obj.payment_mode === ("Cheque" || "cheque")
              ).length +
                TodayReturnsFilter(props.AccountReducer.All_entries).filter(
                  (obj) => obj.payment_mode === ("Cheque" || "cheque")
                ).length}
              Entries
            </span>
          </h3>
        </div>
        {/* <div className="card-header align-items-center border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              Opening Balance
            </span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {OpeningBalance(
                props.AccountReducer.All_entries,
                props.AccountReducer.Account_entries
              )}
              /-
            </span>
          </h5>
        </div> */}
        {/* Body */}
        <div className="card-body pt-4 " style={{ overflow: "auto" }}>
          <div className="timeline timeline-5 mt-3">
            {entries &&
              accountEntries &&
              [
                ...TodayFilter(entrySep(props.AccountReducer.All_entries)),
                // ...TodayReturnsFilter(props.AccountReducer.All_entries),
                ...TodayFilter(props.AccountReducer.Account_entries),
              ]
                .sort(
                  (a, b) =>
                    Number(String(b.date).slice(0)) -
                    Number(String(a.date).slice(0))
                )
                .map((value, i) => {
                  return (value.payment_mode === ("Cheque" || "cheque") &&
                    value.main_Heads === "Income") ||
                    (value.assettype === ("Cheque" || "cheque") &&
                      value.main_Heads === "Income") ? (
                      <div className="timeline-item align-items-start">

                        <div className="timeline-label font-weight-bolder text-dark-75 font-size-sm">
                          {new Date(value.date).getHours()} :
                        {new Date(value.date).getMinutes()}
                        </div>
                        <div className="timeline-badge pl-3 ">
                          <i className="fa fa-genderless text-success icon-xl"></i>
                        </div>
                        <div className="timeline-content d-flex">
                          {value.type && value.type.toLowerCase() === "income" ?
                            <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                              {value.SaleItem ? value.SaleItem.length : null} Recieved
                           Amount To{" "}
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
                                (Rs. {value.price}
                             /-) Paid Via Cheque
                             {
                                  value.bankStatus === "In Draw" ?
                                    <span style={{ color: "#ff000082" }}> not Deposit Yet</span>
                                    : value.bankStatus === "In Clearence" ?
                                      <span style={{ color: "#ff000082" }}> not Cleared Yet</span>
                                      : null
                                }
                              </span>
                            </span>
                            :
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
                                (Rs. {value.TotalAmount - Number(value.discount)}
                            /-) Paid Via Cheque
                            {
                                  value.bankStatus === "In Draw" ?
                                    <span style={{ color: "#ff000082" }}> not Deposit Yet</span>
                                    : value.bankStatus === "In Clearence" ?
                                      <span style={{ color: "#ff000082" }}> not Cleared Yet</span>
                                      : null
                                }
                              </span>
                            </span>
                          }
                        </div>
                        <div
                          className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                          style={{ fontStyle: "italic", width: "77px" }}
                        >
                          {value.bankStatus === "In Draw" ?
                            <ChequeForm
                              value={value}
                              saveStatus={saveStatus}
                            />
                            : value.bankStatus === "In Clearence" ?
                              <AlertDialogSlide
                                value={value}
                                saveStatus={saveStatus}
                              />
                              : value.bankStatus === "Returned" ?
                                <ChequeDetail
                                  value={value}
                                  saveStatus={saveStatus}
                                />
                                : null}
                        </div>
                      </div>
                    ) : (value.payment_mode === ("Cheque" || "cheque") &&
                      (value.main_heads === "Return" || value.main_Heads === "Return")) ||
                      (value.payment_mode === ("Cheque" || "cheque") &&
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
                      ) : (value.payment_mode === ("Cheque" || "cheque") &&
                        value.main_Heads === "Expenses") ||
                        (value.payment_mode === ("Cheque" || "cheque") &&
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
                                    Transfer From {value.payment_Type}
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
                        ) : (value.payment_mode === ("Cheque" || "cheque") &&
                          value.main_Heads === "Assets" &&
                          value.HeadType.toLowerCase() === "account recievable" &&
                          value.price > 0)
                          ||
                          (value.payment_mode === ("Cheque" || "cheque") &&
                            value.main_Heads === "Assets" &&
                            value.HeadType.toLowerCase() === "account recievable" &&
                            value.price > 0)
                          ? (
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
                                  {value.SaleItem ? value.SaleItem.length : null} Payment
                          Recieved from{" "}
                                  <span style={{ textTransform: "capitalize" }}>
                                    {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}{" "}
                                    {value.Customer.CustomerName}
                                  </span>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      color: "#0000006b",
                                      fontWeight: "800",
                                    }}
                                  >
                                    (Rs. {value.price}
                            /-) Paid Via Cheque
                                      {
                                      value.bankStatus === "In Draw" ?
                                        <span style={{ color: "#ff000082" }}> not Deposit Yet</span>
                                        : value.bankStatus === "In Clearence" ?
                                          <span style={{ color: "#ff000082" }}> not Cleared Yet</span>
                                          : null
                                    }
                                  </span>
                                </span>
                              </div>
                              <div
                                className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                style={{ fontStyle: "italic", width: "77px" }}
                              >
                                {value.bankStatus === "In Draw" ?
                                  <ChequeForm
                                    value={value}
                                    saveStatus={saveStatus}
                                  />
                                  : value.bankStatus === "In Clearence" ?
                                    <AlertDialogSlide
                                      value={value}
                                      saveStatus={saveStatus}
                                    />
                                    : value.bankStatus === "Returned" ?
                                      <ChequeDetail
                                        value={value}
                                        saveStatus={saveStatus}
                                      />
                                      : null}
                              </div>
                            </div>
                          ) : null;
                })}
          </div>
        </div>
        {/* footer */}
        <Divider />
        {/* <div className="card-header align-items-center border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">Cash In Hand</span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {cashInHand(
                TodayFilter(props.AccountReducer.All_entries),
                TodayFilter(props.AccountReducer.Account_entries),
                TodayReturnsFilter(props.AccountReducer.All_entries),
                OpeningBalance(
                  props.AccountReducer.All_entries,
                  props.AccountReducer.Account_entries
                )

              )}
            
              /-
            </span>
          </h5>
        </div> */}
      </div>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddEntry: (data) => dispatch(AccountMiddileware.AddEntry(data)),
    EditEntry: (data) => dispatch(AccountMiddileware.EditEntry(data)),
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
export default connect(mapStateToProps, mapDispatchToProps)(ListsWidget1);
