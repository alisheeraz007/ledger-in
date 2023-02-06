import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AccountUIHelpers";

const SaleUIContext = createContext();

export function useSaleUIContext() {
  return useContext(SaleUIContext);
}

export const SaleUIConsumer = SaleUIContext.Consumer;

export function SaleUIProvider({ SaleUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newSaleButtonClick: SaleUIEvents.newSaleButtonClick,
    openEditSalePage: SaleUIEvents.openEditSalePage,
    openDeleteProductDialog: SaleUIEvents.openDeleteProductDialog,
    openDeleteSaleDialog: SaleUIEvents.openDeleteSaleDialog,
    openFetchSaleDialog: SaleUIEvents.openFetchSaleDialog,
    openUpdateSaletatusDialog:
      SaleUIEvents.openUpdateSaletatusDialog,
  };

  return (
    <SaleUIContext.Provider value={value}>
      {children}
    </SaleUIContext.Provider>
  );
}
