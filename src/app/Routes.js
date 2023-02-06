/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
  withRouter,
} from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import { AuthPage } from "../components/app/auth/AuthPage";
import Dashbaord from "../components/app/Dashboard/index";
import ECommercePage from "../components/app/e-commerce/eCommercePage";
import { Layout } from "../_metronic/layout";
// import CustomerMiddileware from "../components/redux/middleWare/CustomerMIddileWare";
import ProductMiddileware from "../components/redux/middleWare/ProductMIddileWare";
import AuthMiddleWare from "../components/redux/middleWare/authMiddleWare";
import UsersMiddileware from "../components/redux/middleWare/UsersMIddileWare";
import AccountsPage from "../components/app/Accounts/AccountsPage";
import AccountMiddileware from "../components/redux/middleWare/accountMiddileWare";
import SupplierMiddileware from "../components/redux/middleWare/SuppliersMiddleWare";
import SupplierProductMiddileware from "../components/redux/middleWare/SupplierProductMIddileWare";
import ProductBarcode from "../components/app/e-commerce/products/ProductBarcode";
import { auth } from "./Firebaseconfig";
import CustomerMiddileware from "./../components/redux/middleWare/CustomerMIddileWare";

function Routes(props) {

  const [user, setUser] = useState(props.authReducer.user);
  // console.log(user)
  useEffect(() => {
    props.routGuard();
    auth.onAuthStateChanged((Loginuser) => {
      if (Loginuser) {
        props.GetAllusers();
        props.GetAllCustomer();
        props.GetAllProduct();
        props.GetAllAccount();
        props.GetAllEntries();
        props.GetAllSupplier();
        props.GetAllSupPro();
      }
    });
  }, []);
  useEffect(() => {
    setUser(props.authReducer.user);
  }, [props]);
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      // ...
      if (event.keyCode == 113) {
        props.history.push("/e-commerce/Sale/new");
      }
    });
  }, []);
  let obj = localStorage.getItem("Login_User");
  return (
    <Switch>
      {(obj !== "null" || obj) && user && (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect from="/auth/login" to="/dashboard" />
      )}
      {(obj == "null" || !obj) && user == null ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/">
          <AuthPage />
        </Route>
      ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect exact from="/" to="/dashboard" />
          // <Redirect exact from="/" to="/dashboard" />
          // yahan masla hai
          // yahan masla hai
        )}
      {(obj == "null" || !obj) && user == null ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
          <Layout>
            <Route
              path="/dashboard"
              component={() => {
                return <Dashbaord />;
              }}
            />
            <Route path="/e-commerce" component={ECommercePage} />
            <Route path="/Account" component={AccountsPage} />
            <Route path="/Report" component={AccountsPage} />
            {/* <Route path="/Indivisual-Reports" component={ProductBarcode} /> */}
          </Layout>
        )}
    </Switch>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    GetAllCustomer: (data) => dispatch(CustomerMiddileware.GetAllUser()),
    GetAllusers: (data) => dispatch(UsersMiddileware.GetAllUser()),
    GetAllProduct: (data) => dispatch(ProductMiddileware.GetAllProduct()),
    routGuard: (data) => dispatch(AuthMiddleWare.routGuard()),
    GetAllAccount: (data) => dispatch(AccountMiddileware.GetAllAccount()),
    GetAllEntries: (data) => dispatch(AccountMiddileware.GetAllEntry()),
    GetAllSupplier: (data) =>
      dispatch(SupplierMiddileware.GetAllSupplier(data)),
    GetAllSupPro: (data) =>
      dispatch(SupplierProductMiddileware.GetAllProduct(data)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Routes));
