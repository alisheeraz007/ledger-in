import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import ProductDeleteDialog from "./product-delete-dialog/ProductDeleteDialog";
// import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
// import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
// import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import  ProductsCard  from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";

export function SupplierStockReportPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/Report/SupplierReport/new");
    },
    openEditProductPage: (row) => {
      row.purchaseInvoice ?
      history.push(`/Report/SupplierReport/${row.db_id}/edit`)
      : row.journalInvoice ?
      history.push(`/Account/journalEntries/${row.db_id}/edit`)
      :
      console.log(row)
    },
    openDeleteProductDialog: (id,row) => {
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
    <ProductsUIProvider productsUIEvents={productsUIEvents}>

      <ProductsCard />
    </ProductsUIProvider>
  );
}
