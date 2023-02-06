import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AccountUIHelpers";

const AccountUIContext = createContext();

export function useAccountUIContext() {
  return useContext(AccountUIContext);
}

export const AccountUIConsumer = AccountUIContext.Consumer;

export function AccountUIProvider({ AccountsUIEvents, children }) {
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
    newAccountButtonClick: AccountsUIEvents.newAccountsButtonClick,
    openEditAccountPage: AccountsUIEvents.openEditAccountPage,
    openDeleteProductDialog: AccountsUIEvents.openDeleteProductDialog,
    openDeleteAccountDialog: AccountsUIEvents.openDeleteAccountDialog,
    openFetchAccountDialog: AccountsUIEvents.openFetchAccountDialog,
    openUpdateAccountStatusDialog:
      AccountsUIEvents.openUpdateAccountStatusDialog,
  };

  return (
    <AccountUIContext.Provider value={value}>
      {children}
    </AccountUIContext.Provider>
  );
}
