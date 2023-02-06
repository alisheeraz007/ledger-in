import React from "react";
import { Route } from "react-router-dom";
// import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
// import ProductDeleteDialog from "./product-delete-dialog/ProductDeleteDialog";
// import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
// import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
// import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import { AccountCard } from "./AccountCard";
import { AccountUIProvider } from "./AccountUIContext";
import MasterHeadDeleteDialog from "./MasterHead-delete-dialog/MasterHeadDeleteDialog";
export function MasterHead({ history }) {
  const AccountsUIEvents = {
    newAccountsButtonClick: () => {
      history.push("/Account/Master-Head/new");
    },
    openEditAccountPage: (id) => {
      history.push(`/Account/Master-Head/${id}/edit`);
    },
    openDeleteAccountDialog: (id) => {
      history.push(`/Account/Master-Heads/${id}/delete`);
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

  return (
    <AccountUIProvider AccountsUIEvents={AccountsUIEvents}>
      <AccountCard />
    </AccountUIProvider>
  );
}
