import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { ProductsFilter } from "./products-filter/ProductsFilter";
import ProductsTable from "./products-table/ProductsTable";
import { useProductsUIContext } from "./ProductsUIContext";
import { connect } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
function ProductsCard(props) {
  const productsUIContext = useProductsUIContext();
  const [ResetFilter, setResetFilter] = useState(false);
  const [ShowButton, setShowButton] = useState(false);

  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newProductButtonClick: productsUIContext.newProductButtonClick,
      openDeleteProductsDialog: productsUIContext.openDeleteProductsDialog,
      openEditProductPage: productsUIContext.openEditProductPage,
      openUpdateProductsStatusDialog:
        productsUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
    };
  }, [productsUIContext]);
  let[from,setFrom]=useState("")
  return (
    <Card>
      <CardHeader title="Products list">
        <CardHeaderToolbar>
          {ShowButton && (
            <button
              onClick={() => setResetFilter(true)}
              className="btn btn-light ml-2"
              style={{
                padding: "8px",
              }}
            >
              <i
                className="fa fa-redo"
                style={{
                  fontSize: "1.1rem",
                }}
              ></i>
              Reset
            </button>
          )}
          <button
            onClick={() => {
              setShowButton(!ShowButton);
              if (ShowButton) {
                setResetFilter(true);
              }
            }}
            className={`btn ${ShowButton ? "btn-dark" : "btn-light"} ml-2`}
            style={{
              padding: "8px",
            }}
          >
            <i
              className="fa fa-filter"
              style={{
                fontSize: "1.1rem",
              }}
            ></i>
            filter
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newProductButtonClick}
          >
            New Product
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <ProductsFilter /> */}
        <ProductsTable
          ResetFilter={ResetFilter}
          setResetFilter={setResetFilter}
          ShowButton={ShowButton}
          setShowButton={setShowButton}
          from={from}
          setFrom={setFrom}
        />
      </CardBody>
    </Card>
  );
}
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsCard);
