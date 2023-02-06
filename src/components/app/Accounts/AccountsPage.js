import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { ErrorPage1 } from "../ErrorPage";
// import { CustomersPage } from "./customers/CustomersPage";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";
import { CustomersReportPage } from "./CustomerReport/CustomersPage";
import MasterHeadEdit from "./MasterHeads/addOrEditMasterHeads/MasterHeadEdit";
import MasterHeadDeleteDialog from "./MasterHeads/MasterHead-delete-dialog/MasterHeadDeleteDialog";
import { MasterHead } from "./MasterHeads/masterHeadPage";
import { SaleUIProvider } from "./Sale/AccountUIContext";
import { SaleUIProvider as GeneralEntriesUIUIProvider } from "./JournelEntries/AccountUIContext";
import CustomerEditDialog from "./Sale/addOrEditSale/customer-edit-dialog/CustomerEditDialog";
import SaleEdit from "./Sale/addOrEditSale/SaleEdit";
import { Sale } from "./Sale/SalePage";
import SaleList from "./Sale/SaleTable/entryTable";
import { StockReportPage } from "./StockReport/ProductsPage";
import { ProductsUIProvider } from "./../e-commerce/SupplierReports/ProductsUIContext";
import JouneralEntries from "./JournelEntries/AddOrEditEntries/AddEntries";
import GeneralJournalEntries from "./JournelEntries/SaleTable/entryTable";
import IndivisualReport from "./CustomerReport/SaleTable/entryTable";
import { IndivisualUIProvider } from "./CustomerReport/indivisualUIContext";
import SaleReturn from "./Sale/addOrEditSale/Return/SaleReturn";
import { ExpenseUIProvider } from "../Expense/expenseUIContext";
import ExpenseReport from "../Expense/SaleTable/entryTable";
import BankCash from "./BankCash/SaleTable/entryTable";
import { BankUIProvider } from "./BankCash/bankUIContext";
import { SupplierStockReportPage } from "../e-commerce/SupplierReports/ProductsPage";
import { AllSupplierPage } from "./AllSuppliers/CustomersPage";
import ProductDeleteDialog from "../e-commerce/SupplierReports/product-delete-dialog/ProductDeleteDialog";
import ProductEdit from "../e-commerce/SupplierReports/product-edit/ProductEdit";
import SupplyProductEdit from "../e-commerce/products/product-edit/SupplyProductEdit";
// import ProductDeleteDialog from "./StockReport/product-delete-dialog/ProductDeleteDialog";

// import {SupplierUIProvider} from '../e-commerce/SupplierReports/SupplierUIContext'
function AccountsPage({ history, ...props }) {
  const [user, setUser] = useState(props.authReducer.user);
  useEffect(() => {
    setUser(props.authReducer.user);
  }, [props]);
  const SaleUIEvents = {
    newSaleButtonClick: () => {
      history.push("/Account/Sale/new");
    },
    openEditSalePage: (row) => {
      if (row.db_id) {

        if (row.journalInvoice) {
          history.push(`/Account/journalEntries/${row.db_id}/edit`)
        } else {
          if (row.RinvoiceNumber) {
            history.push(`/Account/Sale/${row.RinvoiceNumber}/edit`);
          } else {
            history.push(`/Account/Sale/${row.db_id}/edit`);
          }
        }
      } else {
        history.push(`/Account/Sale/${row}/edit`);
        // console.log(row)

      }
    },
    openDeleteSaleDialog: (id) => {
      history.push(`/Account/Sale/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/e-commerce/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/e-commerce/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/e-commerce/products/updateStatus");
    },
  };
  const GeneralEntriesUIEvents = {
    newSaleButtonClick: () => {
      history.push("/Account/Sale/new");
    },
    openEditSalePage: (id) => {
      history.push(`/Account/journalEntries/${id}/edit`);
    },
    openDeleteSaleDialog: (id) => {
      history.push(`/Account/Sale/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/e-commerce/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/e-commerce/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/e-commerce/products/updateStatus");
    },
  };
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/Report/SupplierReport/new");
    },
    openEditProductPage: (id) => {
      history.push(`/Report/SupplierReport/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/Report/SupplierReport/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/Report/SupplierReport/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/Report/SupplierReport/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/Report/SupplierReport/updateStatus");
    },
  };
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* Master Head Start */}
        <ContentRoute
          exact
          path="/Account/Master-Heads"
          component={MasterHead}
        />
        <ContentRoute
          path="/Account/Master-Head/new"
          component={MasterHeadEdit}
        />
        <ContentRoute
          path="/Account/Master-Head/:id/edit"
          component={MasterHeadEdit}
        />

        <Route path="/Account/Master-Heads/:id/delete">
          {({ history, match }) =>
          (
            <MasterHeadDeleteDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push("/Account/Master-Heads");
              }}
            />
          )
          }
        </Route>
        {/* Master Head End */}

        {/* Sale Start */}
        <ContentRoute
          exact
          path="/Account/Sale"
          component={Sale}
        />
        <ContentRoute
          exact
          path="/Report/CustomerReport"
          component={CustomersReportPage}
        />
        <ContentRoute
          exact
          path="/Report/AllSuppliersReport"
          component={AllSupplierPage}
        />

        <ContentRoute
          exact
          path="/Report/Indivisual-customer-report/:id"
          component={({ history, match }) => {
            return (
              <IndivisualUIProvider SaleUIEvents={SaleUIEvents}>
                <IndivisualReport id={match.params.id} />
              </IndivisualUIProvider>
            )
          }}
        />

        <ContentRoute
          exact
          path="/Report/Indivisual-customer-report"
          component={({ history, match }) => {
            return (
              <IndivisualUIProvider SaleUIEvents={SaleUIEvents}>
                <IndivisualReport id={match.params.id} />
              </IndivisualUIProvider>
            )
          }}
        />

        <ContentRoute
          path="/Account/Sale/:id/edit"
          component={SaleEdit}
        />
        <ContentRoute
          path="/Account/Sale/:id/exchange"
          component={SaleEdit}
        />
        <Route path="/Account/Sale/customers/new">
          {({ history, match }) => (
            <CustomerEditDialog
              show={match != null}
              onHide={() => {
                history.push("/Account/Sale/new");
              }}
            />
          )}
        </Route>
        <ContentRoute
          exact
          path="/Report/SaleList"
          component={() => {
            return (
              <SaleUIProvider SaleUIEvents={SaleUIEvents}>
                <SaleList />
              </SaleUIProvider>
            );
          }}
        />
        <ContentRoute
          exact
          path="/Report/SupplierReport"
          component={({ history, match }) => {
            return (
              // <SupplierUIProvider SaleUIEvents={SaleUIEvents}>
              <SupplierStockReportPage id={match.params.id} history={history} />
              // </SupplierUIProvider>
            );
          }}
        />
        <ContentRoute
          exact
          path="/Report/SupplierReport/:id"
          component={({ history, match }) => {
            return (
              // <SupplierUIProvider SaleUIEvents={SaleUIEvents}>
              <SupplierStockReportPage id={match.params.id} history={history} />
              // </SupplierUIProvider>
            );
          }}
        />
        <ContentRoute
          exact
          path="/Report/SupplierReport/:id/delete"
          component={({ history, match }) => (
            // return (
            <ProductsUIProvider productsUIEvents={productsUIEvents} >
              <ProductDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push("/Report/SupplierReport");
                }}
              />
            </ProductsUIProvider>
            // );
          )}
        />
        <ContentRoute
          exact
          path="/Report/SupplierReport/:id/edit"
          // component={({ history, match }) => (
          //   // return (
          //   <ProductsUIProvider productsUIEvents={productsUIEvents} >
          //     <ProductEdit
          //       show={match != null}
          //       id={match && match.params.id}
          //       onHide={() => {
          //         history.push("/Report/SupplierReport");
          //       }}
          //     />
          //   </ProductsUIProvider>

          //   // );
          // )}
          component={SupplyProductEdit}
        />
        {/* End Sale */}
        <ContentRoute
          exact
          path="/Report/StockReport"
          component={StockReportPage}
        />
        <ContentRoute
          exact
          path="/Account/journalEntries"
          component={JouneralEntries}
        />
        <ContentRoute
          exact
          path="/Account/journalEntries/:id/edit"
          component={JouneralEntries}
        />
        <ContentRoute
          exact
          path="/Account/GeneralEntries"
          component={() => {
            return (
              <GeneralEntriesUIUIProvider
                SaleUIEvents={GeneralEntriesUIEvents}
              >
                <GeneralJournalEntries />
              </GeneralEntriesUIUIProvider>
            )
          }}
        />
        <ContentRoute
          exact
          path="/Report/ExpenseReport"
          component={({ history, match }) => {
            return (
              <ExpenseUIProvider SaleUIEvents={SaleUIEvents}>
                <ExpenseReport id={match.params.id} />
              </ExpenseUIProvider>
            )
          }}
        />
        <ContentRoute
          exact
          path="/Report/BankCash"
          component={({ history, match }) => {
            return (
                // <BankUIProvider SaleUIEvents={SaleUIEvents}>
                //   <BankCash id={match.params.id} />
                // </BankUIProvider>
                <BankUIProvider SaleUIEvents={SaleUIEvents}>
                  <BankCash id={match.params.id} />
                </BankUIProvider>
              )
          }}
        />
      </Switch>
    </Suspense>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountsPage));
