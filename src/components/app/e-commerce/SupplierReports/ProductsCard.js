import React, { useEffect, useMemo, useState } from "react";
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
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
function StockReportCard(props) {
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
  let [supplier, setSupplier] = useState("");
  let [supplierOpt, setSupplierOpt] = useState("");
  useEffect(() => {}, [props.SupplierReducer]);
  useEffect(() => {
    if (props.SuppliersReducer) {
      props.SuppliersReducer.entities &&
        props.SuppliersReducer.entities.map((Head) => (
          <option key={Head.db_id} value={Head.db_id}>
            {Head.product_name}
          </option>
        ));
    }
    if (props.SupplierReducer) {
      let arr = props.SupplierReducer.entities;
      let arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push({
          name: arr[i].SupplierName,
          value: arr[i],
          text: i == 0 ? arr[i].SupplierName : arr[i].SupplierName,
        });
      }
      setSupplierOpt(arr2);
    }
  }, [props.SupplierReducer]);
  let [id,setId] = useState("")
  useEffect(()=>{
    setId(props.history.location.pathname.slice(23))
  },[props.id])
  useEffect(()=>{
    if(props.SupplierReducer.entities && id){
      for(let i = 0 ; i < props.SupplierReducer.entities.length;i++ ){
        if(props.SupplierReducer.entities[i].db_id === id )
        setSupplier(props.SupplierReducer.entities[i])
      }
    }
  },[id,props.SupplierReducer.entities])

  return (
    <Card>
      <CardHeader title="Supplier Indivisual Report">
        {!id ?
          <div
          className="col-lg-4"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Dropdown
            placeholder="Supplier Name"
            style={{ height: "40px" }}
            fluid
            search
            // value={values.product_name}
            // disabled={CustomerAdd}
            selection
            scrolling
            options={supplierOpt}
            onChange={(e, { value }, ev) => {
              setSupplier(value);
            }}
            />
        </div>
          :null}
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
          {/* <button
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
          </button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {supplier ?
          <ProductsTable
            ResetFilter={ResetFilter}
            setResetFilter={setResetFilter}
            ShowButton={ShowButton}
            setShowButton={setShowButton}
            supplier={supplier}
          />
        :null}
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
    SupplierReducer: state.SupplierReducer,
    SupplyProductReducer: state.SupplyProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StockReportCard));
