/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import GroupIcon from "@material-ui/icons/Group";
import { connect } from "react-redux";
import { Icon } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ReceiptIcon from '@material-ui/icons/Receipt';
function AsideMenuList({ layoutProps, ...props }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {props.authReducer.user &&
        props.authReducer.user.userType !== "user" ? (
          <>
            {/* Applications */}
            {/* begin::section */}
            <li className="menu-section ">
              <h4 className="menu-text">Applications</h4>
              <i className="menu-icon flaticon-more-v2"></i>
            </li>
            {/* end:: section */}

            {/* eCommerce */}
            {/*begin::1 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/e-commerce",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link menu-toggle" to="/e-commerce">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  />
                </span>
                <span className="menu-text">eCommerce</span>
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  <li
                    className="menu-item menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">eCommerce</span>
                    </span>
                  </li>
                  {/*begin::2 Level*/}
                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/e-commerce",
                      true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                  >
                    <NavLink className="menu-link menu-toggle" to="/e-commerce">
                      <span className="svg-icon menu-icon">
                      <ReceiptIcon />
                        {/* <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  /> */}
                      </span>
                      <span className="menu-text">Sale</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li
                          className="menu-item menu-item-parent"
                          aria-haspopup="true"
                        >
                          <span className="menu-link">
                            <span className="menu-text">Sale</span>
                          </span>
                        </li>
                        {/*begin::2 Level*/}
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/e-commerce/Sale/new"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink className="menu-link" to="/e-commerce/Sale/new">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Invoice</span>
                          </NavLink>
                        </li>
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/e-commerce/Sale-return"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/e-commerce/Sale-return"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Sale Return</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/Customers/Suppliers",
                      true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                  >
                    <NavLink className="menu-link menu-toggle" to="/Account">
                      <span className="svg-icon menu-icon">
                        <GroupIcon />
                        {/* <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  /> */}
                      </span>
                      <span className="menu-text">Customers/Suppliers</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li
                          className="menu-item menu-item-parent"
                          aria-haspopup="true"
                        >
                          <span className="menu-link">
                            <span className="menu-text">
                              Customers/Suppliers
                            </span>
                          </span>
                        </li>
                        {/*begin::2 Level*/}
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/e-commerce/customers"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/e-commerce/customers"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Customers</span>
                          </NavLink>
                        </li>
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/e-commerce/suppliers"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/e-commerce/suppliers"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Suppliers</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/Products",
                      true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                  >
                    <NavLink className="menu-link menu-toggle" to="/Account">
                      <span className="svg-icon menu-icon">
                        <MoveToInboxIcon />
                        {/* <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  /> */}
                      </span>
                      <span className="menu-text">Products</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li
                          className="menu-item menu-item-parent"
                          aria-haspopup="true"
                        >
                          <span className="menu-link">
                            <span className="menu-text">
                            Products
                            </span>
                          </span>
                        </li>
                        {/*begin::2 Level*/}
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/e-commerce/products"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/e-commerce/products"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">All Products</span>
                          </NavLink>
                        </li>
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/e-commerce/barcode"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/e-commerce/barcode"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Barcodes</span>
                          </NavLink>
                        </li>
                        <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/purchase"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/e-commerce/purchase">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Purchases</span>
                    </NavLink>
                  </li>
                      </ul>
                    </div>
                  </li>

                  {/* <li
                    className={`menu-item ${getMenuItemActive(
                      "/e-commerce/Users"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/e-commerce/Users">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Users</span>
                    </NavLink>
                  </li> */}
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}

          
                  {/*end::2 Level*/}
                </ul>
              </div>
            </li>
            {/* /e-commerce/suppliers */}
            {/*end::1 Level*/}
            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/Account",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link menu-toggle" to="/Account">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  />
                </span>
                <span className="menu-text">Accounts</span>
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  <li
                    className="menu-item menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">Accounts</span>
                    </span>
                  </li>
                  {/*begin::2 Level*/}
                
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Account/Master-Heads"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Account/Master-Heads">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Master Heads</span>
                    </NavLink>
                  </li>
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Account/Master-Head/new"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink
                      className="menu-link"
                      to="/Account/Master-Head/new"
                    >
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Create Master Heads</span>
                    </NavLink>
                  </li>
                  

                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Account/journalEntries"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Account/journalEntries">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">New Journal Entry</span>
                    </NavLink>
                  </li>
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Account/GeneralEntries"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Account/GeneralEntries">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">General Journal Entries</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ul>
              </div>
            </li>
            {/* reports */}

            <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/Report",
                true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
            >
              <NavLink className="menu-link menu-toggle" to="/Account">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  />
                </span>
                <span className="menu-text">Reports</span>
              </NavLink>
              <div className="menu-submenu">
                <i className="menu-arrow" />
                <ul className="menu-subnav">
                  <li
                    className="menu-item menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">Reports</span>
                    </span>
                  </li>
                  {/*begin::2 Level*/}

                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/CustomerReports",
                      true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                  >
                    <NavLink className="menu-link menu-toggle" to="/Account">
                      <span className="svg-icon menu-icon">
                        <GroupIcon />
                        {/* <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}
                  /> */}
                      </span>
                      <span className="menu-text">Customer Reports</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li
                          className="menu-item menu-item-parent"
                          aria-haspopup="true"
                        >
                          <span className="menu-link">
                            <span className="menu-text">Customer Report</span>
                          </span>
                        </li>
                        {/*begin::2 Level*/}
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/Report/CustomerReport"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/Report/CustomerReport"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">
                              All Customer Report
                            </span>
                          </NavLink>
                        </li>
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/Report/Indivisual-customer-report"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/Report/Indivisual-customer-report"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">
                              Indivisual Customer Report
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/SuppliersReports",
                      true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                  >
                    <NavLink className="menu-link menu-toggle" to="/Account">
                      <span className="svg-icon menu-icon">
                        <LocalShippingIcon />
                      </span>
                      <span className="menu-text">Suppliers Reports</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li
                          className="menu-item menu-item-parent"
                          aria-haspopup="true"
                        >
                          <span className="menu-link">
                            <span className="menu-text">Suppliers Report</span>
                          </span>
                        </li>
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/Report/AllSuppliersReport"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/Report/AllSuppliersReport"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">
                              All Supplier Report
                            </span>
                          </NavLink>
                        </li>
                        <li
                          className={`menu-item ${getMenuItemActive(
                            "/Report/SupplierReport"
                          )}`}
                          aria-haspopup="true"
                        >
                          <NavLink
                            className="menu-link"
                            to="/Report/SupplierReport"
                          >
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">
                              Indivisual Suppliers Report
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Report/StockReport"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Report/StockReport">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Stock Report</span>
                    </NavLink>
                  </li>
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Report/SaleList"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Report/SaleList">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sale List</span>
                    </NavLink>
                  </li>

                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Report/ExpenseReport"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Report/ExpenseReport">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Expense Report</span>
                    </NavLink>
                  </li>
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/Report/BankCash"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/Report/BankCash">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Bank And Cash Report</span>
                    </NavLink>
                  </li>

                  {/*end::2 Level*/}
                </ul>
              </div>
            </li>
          </>
        ) : null}
      </ul>
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
    AccountReducer: state.AccountReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AsideMenuList);
