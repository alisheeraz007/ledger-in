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
  totalCashBank,
} from "../../../../components/redux/constants";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";

function ListsWidgetCashFlow({ className, ...props }) {
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
    // console.log(arr2)
    return arr2;
  }
  function quantityFn(obj){
   let total = 0
    obj.purchasedItems.map((a,i)=>{
      total += Number(a.quantity)
    })
    
    
    return (total)
  } 
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <div>
              <span className="font-weight-bolder text-dark">Cash Flow</span>
            </div>
            <span

              className="text-muted mt-3 font-weight-bold font-size-sm"
            >
              {TodayFilter(props.AccountReducer.All_entries).filter(
                (obj) => obj.assettype === "Cash" || obj.assettype === "cash"
              ).length +
                TodayFilter(props.AccountReducer.Account_entries).filter(
                  (obj) => obj.assettype === ("Cash" || "cash")
                ).length +
                TodayFilter(props.SupplyProductReducer.entities).filter(
                  (obj) => obj.assettype === ("Cash" || "cash")
                ).length +
                TodayReturnsFilter(props.AccountReducer.All_entries).filter(
                  (obj) => obj.assettype === "Cash" || obj.assettype === "cash"
                ).length}
              Entries
            </span>
          </h3>
        </div>
        <div className="card-header align-items-center border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              Opening Balance
            </span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {OpeningBalance(
                totalCashBank(
                  (props.AccountReducer.All_entries),
                  (props.AccountReducer.Account_entries),
                  (props.AccountReducer.entities),
                  (props.SupplyProductReducer.entities),
                  'cash'
                ),
                totalCashBank(
                  TodayFilter(props.AccountReducer.All_entries),
                  TodayFilter(props.AccountReducer.Account_entries),
                  TodayFilter(props.AccountReducer.entities),
                  TodayFilter(props.SupplyProductReducer.entities),
                  'cash'
                )
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
                  return (value.payment_Type ? (
                    value.assettype.toLowerCase() === "cash" &&
                    value.main_Heads === "Income"
                  ) : null) ? (
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
                              {value.SaleItem ? value.SaleItem.length : null} Recieved Amount
                          {" "}
                              <span style={{ textTransform: "capitalize" }}>
                                {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                            ({value.type}){" "}
                                {/* {value.SaleItem ? value.SaleItem[0].customer.CustomerName : null} */}
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
                              </span>
                              : null}
                        </div>
                        {value.HeadType && value.main_Heads && value.main_Heads === 'Income' && value.HeadType != "Sale" ?
                          <div
                            className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                            style={{ fontStyle: "italic", width: "77px" }}
                            // onClick={() => console.log(value)}
                          >
                            Rs. {value.price}sss
                              /-
                              </div>
                          : value.HeadType && value.main_Heads && value.main_Heads === 'Income' && value.HeadType === "Sale" ?
                            <div
                              className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                              style={{ fontStyle: "italic", width: "77px" }}
                              // onClick={() => console.log(value)}
                            >
                              {/* Rs. {value.TotalAmount - Number(value.discount)} */}
                              Rs. {value.receivedPayment}
                        /-
                      </div>
                            : null}
                      </div>
                    ) : (value.payment_Type &&
                      value.payment_Type.toLowerCase() === "cash" &&
                      (value.main_heads === "Return" || value.main_Heads === "Return")
                    ) ? (
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
                              {value.retrunInvoiceArr?.length} Items has{" "}
                              <span style={{ color: "#ff4500" }}>Returned</span>{" "}
                          from{" "}
                              <span style={{ textTransform: "capitalize" }}>
                                ({`Paid`}){" "}
                                {value.retrunInvoiceArr ? value.retrunInvoiceArr[0]?.customer.CustomerName
                                  ? value.retrunInvoiceArr[0]?.customer.CustomerName
                                  : value.retrunInvoiceArr[0]?.customer.firstName : null}
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
                      ) : value.payment_mode && value.payment_mode.toLowerCase() === "cash" &&
                        value.main_Heads === "Expenses" ? (
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
                        ) : value.payment_mode && value.payment_mode.toLowerCase() === "cash" &&
                          (value.main_Heads === "Income" ||
                            value.main_Heads === "Recieved") ? (
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
                                  {value.type && value.type.toLowerCase() === 'income' ?

                                    <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                      Received
                                        Amount{" "}
                                      <span style={{ textTransform: "capitalize" }}>
                                        {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                                         ({value.type}){" "}
                                        {/* <span style={{ textTransform: "capitalize" }}> */}
                                        {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                                      </span>
                                      <br />

                                    </span>

                                    : <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg">
                                      1 Cheque withdrawed{" "}
                                      <span style={{ textTransform: "capitalize" }}>
                                        {/* {value.returnInvoice ? `Paid` : value.main_Heads} */}
                                        ({value.main_Heads})
                                        </span>
                                      <br />

                                    </span>
                                  }
                                </div>
                                {value.type && value.type.toLowerCase() === "income" ?
                                  <div
                                    className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                    style={{ fontStyle: "italic", width: "77px" }}
                                  >
                                    Rs.{value.price}
                                      /-
                                    </div>
                                  :

                                  <div
                                    className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                                    style={{ fontStyle: "italic", width: "77px" }}
                                  >
                                    Rs.{value.TotalAmount - Number(value.discount)}
                          /-
                        </div>
                                }
                              </div>
                            </>
                          ) :
                          value.payment_mode && value.payment_mode.toLowerCase() === "cash" &&
                            (value.main_Heads === "Liabilities" ||
                              (value.main_Heads === "Assets" &&
                                (value.supplier || value.Customer))) ? (

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
                                    <span
                                      className="font-weight-bolder text-dark-75 pl-3 font-size-lg"
                                    >
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
                            ) : value.payment_mode && value.payment_mode.toLowerCase() === "cash" &&
                              (value.paid === "paid" ||
                                (value.paid === "paid" && value.supplier)) ? (
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
                                        Purchased {quantityFn(value)} Items
                                         From
                                          <span style={{ textTransform: "capitalize" }}>
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
            <span className="font-weight-bolder text-dark">Cash In Hand</span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {/* {cashInHand(
                TodayFilter(props.AccountReducer.All_entries),
                TodayFilter(props.AccountReducer.Account_entries),
                TodayReturnsFilter(props.AccountReducer.All_entries),
                OpeningBalance(
                  props.AccountReducer.All_entries,
                  props.AccountReducer.Account_entries,
                  "",
                  props.AccountReducer.entities,
                  "cash",
                  "Cash In Draw",
                  []
                ),
                "cash",
                TodayFilter(props.SupplyProductReducer.entities)

              )} */}
              {totalCashBank(
                (props.AccountReducer.All_entries),
                (props.AccountReducer.Account_entries),
                (props.AccountReducer.entities),
                (props.SupplyProductReducer.entities),
                'cash'
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsWidgetCashFlow);
