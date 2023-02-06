import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UsersUIHelpers";

const UsersUIContext = createContext();

export function useUsersUIContext() {
  return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({ UsersUIEvents, children }) {
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

  const initUsers = {
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    type: 1,
    userType: "user",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initUsers,
    newUsersButtonClick: UsersUIEvents.newUsersButtonClick,
    openEditUsersDialog: UsersUIEvents.openEditUsersDialog,
    openDeleteUsersDialog: UsersUIEvents.openDeleteUsersDialog,
    openDeleteUsersDialog: UsersUIEvents.openDeleteUsersDialog,
    openFetchUsersDialog: UsersUIEvents.openFetchUsersDialog,
    openUpdateUsersStatusDialog: UsersUIEvents.openUpdateUsersStatusDialog,
  };

  return (
    <UsersUIContext.Provider value={value}>{children}</UsersUIContext.Provider>
  );
}
