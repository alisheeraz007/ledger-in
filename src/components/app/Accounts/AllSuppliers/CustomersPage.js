import React from "react";
import { Route } from "react-router-dom";
// import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
import  CustomerEditDialog  from "./customer-edit-dialog/CustomerEditDialog";
// import { CustomerDeleteDialog } from "./customer-delete-dialog/CustomerDeleteDialog";
// import { CustomersDeleteDialog } from "./customers-delete-dialog/CustomersDeleteDialog";
// import { CustomersFetchDialog } from "./customers-fetch-dialog/CustomersFetchDialog";
// import { CustomersUpdateStateDialog } from "./customers-update-status-dialog/CustomersUpdateStateDialog";
import { CustomersUIProvider } from "./CustomersUIContext";
import { CustomersCard } from "./CustomersCard";
import  CustomerDeleteDialog  from './customer-delete-dialog/CustomerDeleteDialog';
import { SupplierStockReportPage } from "../../e-commerce/SupplierReports/ProductsPage";

export function AllSupplierPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push("/Report/AllSuppliersReport/new");
    },
    openEditCustomerDialog: (id) => {
      history.push(`/Report/AllSuppliersReport/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/Report/AllSuppliersReport/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/Report/AllSuppliersReport/deleteCustomers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/Report/AllSuppliersReport/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push("/Report/AllSuppliersReport/updateStatus");
    },
    // openIndivisualDialog: (id) => {
    //   history.push(`/Report/SupplierReport/${id}`)
    // }
  }

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      {/* <CustomersLoadingDialog /> */}
       <Route path="/Report/AllSuppliersReport/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push("/Report/AllSuppliersReport");
            }}
          />
        )}
      </Route>
      <Route path="/Report/AllSuppliersReport/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Report/AllSuppliersReport");
            }}
          />
        )}
      </Route>
      <Route path="/Report/AllSuppliersReport/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Report/AllSuppliersReport");
            }}
          />
        )}
      </Route>
      {/* <Route path="/Report/SupplierReport/:id">
        {({ history, match }) => (
          <SupplierStockReportPage
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Report/AllSuppliersReport");
            }}
          />
        )}
      </Route> */}
      <CustomersCard />
    </CustomersUIProvider>
  );
}
