import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProductsUIHelpers";

const ProductsUIContext = createContext();

export function useProductsUIContext() {
  return useContext(ProductsUIContext);
}

export const ProductsUIConsumer = ProductsUIContext.Consumer;

export function ProductsUIProvider({ productsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const setQueryParams = useCallback((nextQueryParams) => {
    setpageNumber(nextQueryParams().pageNumber);
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

  const ChangePageNumber = (number) => {
    setQueryParamsBase({
      ...queryParams,
      pageNumber: number,
    });
  };
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    ChangePageNumber,
    newProductButtonClick: productsUIEvents.newProductButtonClick,
    openEditProductPage: productsUIEvents.openEditProductPage,
    openDeleteProductDialog: productsUIEvents.openDeleteProductDialog,
    openDeleteProductsDialog: productsUIEvents.openDeleteProductsDialog,
    openFetchProductsDialog: productsUIEvents.openFetchProductsDialog,
    openUpdateProductsStatusDialog:
      productsUIEvents.openUpdateProductsStatusDialog,
  };

  return (
    <ProductsUIContext.Provider value={value}>
      {children}
    </ProductsUIContext.Provider>
  );
}
