// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/products/productsActions";
import * as uiHelpers from "../ProductsUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Input, Pagination } from "../../../../../_metronic/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import {
  AvaliableProductQuantity,
  Regexfilter,
  Regexfilter_New,
  TotalSaleProductQuantity,
} from "../../../../redux/constants";
import { Field, Formik } from "formik";
import SwapVertIcon from '@material-ui/icons/SwapVert';

function ProductsTable(props) {
  let { ShowButton } = props;
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditProductPage: productsUIContext.openEditProductPage,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
    };
  }, [productsUIContext]);
  const [entities, SetEntities] = useState([]);
  const [AllEntriesArr, setAllEntriesArr] = useState([]);
  const [TotalLength, setTotalLEngth] = useState(0);
  let [sortDir, setSortDir] = useState(false)
  const [filterVal, setfilterVal] = useState({
    bar_code: "",
    product_name: "",
    price: "",
    quantity: "",
    avaliableQuantity: "",
    SaleQuantity: "",
  });

  function paginationFn({ pageSize, pageNumber }, ProductArr = AllEntriesArr) {
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = ProductArr.map((row) => {
      let obj = {
        ...row,
        SaleQuantity: TotalSaleProductQuantity(
          props.AccountReducer.All_entries,
          row.quantity,
          row
        ),
      };
      return obj;
    });
    setTotalLEngth(arr.length);
    props.setResetFilter(false);
    SetEntities(sortDir ?
      arr
        .sort((a2, b2) => {
          let a = a2.bar_code,
            b = b2.bar_code;
          return a == b ? 0 : a < b ? 1 : -1;
        })
        .slice(showFrom, showTo) :
      arr
        .sort((a2, b2) => {
          let a = a2.bar_code,
            b = b2.bar_code;
          return a == b ? 0 : a > b ? 1 : -1;
        })
        .slice(showFrom, showTo)
    );
  }
  useEffect(() => {
    productsUIProps.setIds([]);
    if (props.ProductReducer.entities) {
      let arr = props.ProductReducer.entities.map((row) => {
        let obj = {
          ...row,
          price: row.price.toString(),
          quantity: row.quantity.toString(),
          SaleQuantity: TotalSaleProductQuantity(
            props.AccountReducer.All_entries,
            row.quantity,
            row
          ).toString(),
          avaliableQuantity: AvaliableProductQuantity((sortDir ?
            props.AccountReducer.All_entries.sort((a2, b2) => {
              let a = a2.bar_code,
                b = b2.bar_code;
              return a == b ? 0 : a < b ? 1 : -1;
            })
            :
            props.AccountReducer.All_entries.sort((a2, b2) => {
              let a = a2.bar_code,
                b = b2.bar_code;
              return a == b ? 0 : a > b ? 1 : -1;
            })),
            row.quantity,
            row
          ).toString(),
        };
        return obj;
      });
      setAllEntriesArr(arr);
      paginationFn(productsUIProps.queryParams, arr);
    }
  }, [productsUIProps.queryParams, props, sortDir]);
  const getvalue = (ev) => {
    props.setShowButton(true);
    setfilterVal({
      ...filterVal,
      [ev.target.name]: ev.target.value,
    });
    paginationFn(
      productsUIProps.queryParams,
      Regexfilter_New(AllEntriesArr, {
        ...filterVal,
        [ev.target.name]: ev.target.value,
      })
    );
  };
  useEffect(() => {
    if (props.ResetFilter) {
      setfilterVal({
        bar_code: "",
        product_name: "",
        price: "",
        quantity: "",
        avaliableQuantity: "",
        SaleQuantity: "",
      });
      props.setShowButton(false);
    }
  }, [props.ResetFilter]);
  const columns = [
    {
      dataField: "bar_code",
      text: "BarCode",
      headerFormatter: () => {
        return (
          <div>
            <p>BarCode <button className="barSort" onClick={() => setSortDir(sortDir ? false : true)}><SwapVertIcon /></button></p>
            {ShowButton && (
              <input
                name="bar_code"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.bar_code}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "product_name",
      text: "Product",
      headerFormatter: () => {
        return (
          <div>
            <p>Product</p>
            {ShowButton && (
              <input
                name="product_name"
                value={filterVal.product_name}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "price",
      text: "Price",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Price</p>
            {ShowButton && (
              <input
                name="price"
                value={filterVal.price}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return <p style={{ textAlign: "center" }}>{row.price}</p>;
      },
    },
    {
      dataField: "quantity",
      text: "Total Qty",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Total Qty</p>
            {ShowButton && (
              <input
                name="quantity"
                value={filterVal.quantity}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return <p style={{ textAlign: "center" }}>{row.quantity}</p>;
      },
    },
    {
      dataField: "SaleQuantity",
      text: "Sale Qty",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Sale Qty</p>

            {ShowButton && (
              <input
                name="SaleQuantity"
                value={filterVal.SaleQuantity}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return <p style={{ textAlign: "center" }}>{row.SaleQuantity}</p>;
      },
    },
    {
      dataField: "avaliableQuantity",
      text: "Qty In Stock",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Qty In Stock</p>
            {ShowButton && (
              <input
                name="avaliableQuantity"
                value={filterVal.avaliableQuantity}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.avaliableQuantity}
          </p>
        );
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: TotalLength,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: productsUIProps.queryParams.pageSize,
    page: productsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={false} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive table-hover table-sm"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  productsUIProps.setQueryParams
                )}
                onSort={(ev) => console.log(ev, "sort")}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
