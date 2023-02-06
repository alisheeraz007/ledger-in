/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import { Divider } from "@material-ui/core";
import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import {
  TodayFilter,
  TodayReturnsFilter,
  TotalSaleAmount,
} from "../../../../components/redux/constants";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";
function ListsWidget9({ className, ...props }) {

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
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">Today Sales</span>
            <span
             
              className="text-muted mt-3 font-weight-bold font-size-sm"
            >
              {TodayFilter(props.AccountReducer.All_entries).filter(
                (obj) => obj.main_Heads === "Income"
              ).length +
                TodayReturnsFilter(props.AccountReducer.All_entries).filter(
                  (obj) => obj.main_heads === "Return"
                ).length}
              Entries
            </span>
          </h3>
          {/* <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownMenu1 />
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
        </div>
        {/* Body */}
        <div className="card-body pt-4 " style={{ overflow: "auto" }}>
          <div className="timeline timeline-5 mt-3">
            {props.AccountReducer.All_entries &&
              TodayFilter(entrySep(props.AccountReducer.All_entries))
                .sort(
                  (a, b) =>
                    Number(String(b.date).slice(0)) -
                    Number(String(a.date).slice(0))
                )
                .map((value, i) => {
                  return value.main_Heads === "Income" ||
                    value.main_Heads === "Income" ? (
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
                          {value.SaleItem.length} Items Sold To{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {value.SaleItem[0].customer.CustomerName
                              ? value.SaleItem[0].customer.CustomerName
                              : value.SaleItem[0].customer.firstName}
                          </span>
                        </span>
                      </div>
                      <div
                        className="timeline-label font-weight-bolder text-dark-75 font-size-sm"
                        style={{ fontStyle: "italic", width: "77px" }}
                      >
                        Rs. {value.TotalAmount - value.discount}/-
                      </div>
                    </div>
                  ) : value.main_Heads === "Return" ||
                    value.main_heads === "Return" ? (
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
                  ) : null;
                })}
          </div>
        </div>
        {/* footer */}
        <Divider />
        <div className="card-header align-items-center border-0">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">Total Amount</span>
          </h3>
          <h5 className="card-title align-items-end flex-column">
            <span className="font-weight-bolder text-dark">
              Rs.{" "}
              {TotalSaleAmount(TodayFilter(props.AccountReducer.All_entries))}/-
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListsWidget9);
