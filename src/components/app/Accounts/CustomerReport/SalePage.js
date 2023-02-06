import React from "react";
import { Route } from "react-router-dom";
import { SaleCard } from "./SaleCard";
import { IndivisualUIProvider } from "./indivisualUIContext";
export function Sale({ history }) {
  const SaleUIEvents = {
    newSaleButtonClick: () => {
      history.push("/Account/Sale/new");
    },
    openEditSalePage: (id) => {
      history.push(`/Account/Sale/${id}/edit`);
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

  return (
    <IndivisualUIProvider SaleUIEvents={SaleUIEvents}>
      <SaleCard />
    </IndivisualUIProvider>
  );
}
