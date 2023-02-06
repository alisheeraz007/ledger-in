import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
// import { ProductsFilter } from "./products-filter/ProductsFilter";
// import ProductsTable from "./products-table/ProductsTable";
// import { ProductsGrouping } from "./products-grouping/ProductsGrouping";
import { useAccountUIContext } from "./AccountUIContext";
import MasterHeadTable from "./MasterHeadTable/MasterHeadTable";

export function AccountCard() {
  const productsUIContext = useAccountUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newAccountsButtonClick: productsUIContext.newAccountButtonClick,
      openDeleteAccountDialog: productsUIContext.openDeleteAccountDialog,
      openEditAccountPage: productsUIContext.openEditAccountPage,
      openUpdateProductsStatusDialog:
        productsUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
    };
  }, [productsUIContext]);

  return (
    <Card>
      <CardHeader title="Master Heads list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newAccountsButtonClick}
          >
            New Master head
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MasterHeadTable />
      </CardBody>
    </Card>
  );
}
