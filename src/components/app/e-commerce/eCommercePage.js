import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
// import { ProductsPage } from "./products/ProductsPage";
// import { ProductEdit } from "./products/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import { ProductsPage } from "./products/ProductsPage";
import ProductEdit from "./products/product-edit/ProductEdit";
import { UsersPage } from "./users/UsersPage";
import { ErrorPage1 } from "../ErrorPage";
import { connect } from "react-redux";
import { ProductsUIProvider } from "./products/ProductsUIContext";
import ProductsCard from "./products/ProductsCard";
import ProductDeleteDialog from "./products/product-delete-dialog/ProductDeleteDialog";
import ProductBarcode from "./products/ProductBarcode";
import { SupplierPage } from "./Suppliers/CustomersPage";
import SupplyProductEdit from "./products/product-edit/SupplyProductEdit";
import SaleReturn from "../Accounts/Sale/addOrEditSale/Return/SaleReturn";
import SaleEdit from "../Accounts/Sale/addOrEditSale/SaleEdit";

const ECommercePage = (props) => {
  const [user, setUser] = useState(props.authReducer.user);
  useEffect(() => {
    setUser(props.authReducer.user);
  }, [props]);
  const productsUIEvents = {
    newProductButtonClick: () => {
      props.history.push("/e-commerce/products/new");
    },
    openEditProductPage: (id) => {
      props.history.push(`/e-commerce/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      props.history.push(`/e-commerce/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      props.history.push(`/e-commerce/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      props.history.push(`/e-commerce/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      props.history.push("/e-commerce/products/updateStatus");
    },
  };
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          // <Redirect
          //   exact={true}
          //   from="/e-commerce"
          //   to="/e-commerce/customers"
          // />
        }
        {/* <Route path="/ecommerce/barcode" component={ProductBarcode} /> */}

        <ContentRoute path="/e-commerce/customers" component={CustomersPage} />
        <ContentRoute
          path="/e-commerce/suppliers"
          // exact
          component={SupplierPage}
        />
            <ContentRoute
          path="/e-commerce/purchase"
          // exact
          component={SupplyProductEdit}
        />
        <ContentRoute
          path="/e-commerce/barcode"
          exact
          component={ProductBarcode}
        />
         <ContentRoute path="/e-commerce/Sale/new" component={SaleEdit} />
        <ContentRoute
          path="/e-commerce/Sale-return"
          component={SaleReturn}
        />
        {/* <ContentRoute
          path="/e-commerce/USers"
          component={UsersPage}
        /> */}
        <ProductsUIProvider productsUIEvents={productsUIEvents}>
          <ContentRoute
            path="/e-commerce/products/new"
            exact
            component={ProductEdit}
          />
          <ContentRoute
            path="/e-commerce/products/:id/edit"
            exact
            component={ProductEdit}
          />

          <ContentRoute
            path="/e-commerce/products"
            exact
            component={ProductsCard}
          />

          <Route path="/e-commerce/products/:id/delete">
            {({ history, match }) => (
              <ProductDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/e-commerce/products");
                }}
              />
            )}
          </Route>
        </ProductsUIProvider>
      </Switch>
    </Suspense>
  );
};
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ECommercePage));
