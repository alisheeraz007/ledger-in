import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
// import { ProductsFilter } from "./products-filter/ProductsFilter";
// import ProductsTable from "./products-table/ProductsTable";
// import { ProductsGrouping } from "./products-grouping/ProductsGrouping";
import { useSaleUIContext } from "./indivisualUIContext";
import SaleEdit from "./addOrEditSale/SaleEdit";
// import MasterHeadTable from "./MasterHeadTable/MasterHeadTable";

export function SaleCard() {
  const productsUIContext = useSaleUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newSaleButtonClick: productsUIContext.newSaleButtonClick,
      openDeleteSaleDialog: productsUIContext.openDeleteSaleDialog,
      openEditSalePage: productsUIContext.openEditSalePage,
      openUpdateProductsStatusDialog:
        productsUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
    };
  }, [productsUIContext]);

  return (
    <Card>
      <CardHeader title="All Sale list">
      </CardHeader>
      <CardBody>
        {/* <ProductsFilter />
        {productsUIProps.ids.length > 0 && (
          <>
            <ProductsGrouping />
          </>
        )}
        <ProductsTable /> */}
        {/* <MasterHeadTable /> */}
      </CardBody>
    </Card>
  );
}
