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
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import {
  AvaliableProductQuantity,
  Regexfilter,
  Regexfilter_New,
  GetFormattedDate,
} from "../../../../redux/constants";

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
      ChangePageNumber: productsUIContext.ChangePageNumber,
    };
  }, [productsUIContext]);

  // Getting curret state of products list from store (Redux)
  // const { currentState } = useSelector(
  //   (state) => ({ currentState: state.products }),
  //   shallowEqual
  // );
  const [entities, SetEntities] = useState([]);
  const [AllEntriesArr, setAllEntriesArr] = useState([]);
  const [TotalLength, setTotalLEngth] = useState(0);
  const [filterVal, setfilterVal] = useState({
    bar_code: "",
    product_name: "",
    price: "",
    color: "",
    description: "",
    avaliableQuantity: "",
    wholeSalePrice: "",
    retailPrice: "",
  });
  const { totalCount, listLoading } = props.ProductReducer;
  function paginationFn(
    { pageSize, pageNumber },
    ProductArr = props.ProductReducer.entities
  ) {
    // pageNumber = 2
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = ProductArr;
    // productsUIProps.setIds([]);
    // productsUIProps.ChangePageNumber(pageNumber);
    props.setFrom(showFrom);
    setTotalLEngth(arr.length);
    props.setResetFilter(false);
    SetEntities(
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
    productsUIProps.setIds("change");
    if (props.ProductReducer.entities) {
      let arr = props.ProductReducer.entities.map((row) => {
        let obj = {
          ...row,
          price: row.price.toString(),
          quantity: row.quantity.toString(),
          avaliableQuantity: AvaliableProductQuantity(
            props.AccountReducer.All_entries.sort((a2, b2) => {
              let a = a2.bar_code,
                b = b2.bar_code;
              return a == b ? 0 : a > b ? 1 : -1;
            }),
            row.quantity,
            row
          ).toString(),
        };
        return obj;
      });
      setAllEntriesArr(arr);
      paginationFn(productsUIProps.queryParams, arr);
    }
  }, [productsUIProps.queryParams, props]);
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
        color: "",
        avaliableQuantity: "",
        description: "",
      });
      props.setShowButton(false);
    }
  }, [props.ResetFilter]);

  const columns = [
    {
      dataField: "date",
      text: "Date",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <>
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>
              {GetFormattedDate(row.date)}
            </div>
            <div style={{ fontSize: "12px" }}>
              {new Date(row.date).toLocaleTimeString()}
            </div>
          </>
        );
      },
    },
    {
      dataField: "bar_code",
      text: "BarCode",
      headerFormatter: () => {
        return (
          <div>
            <p>BarCode</p>
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
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.product_name}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "color",
      text: "Color",
      formatter: columnFormatters.ColorColumnFormatter,
      headerFormatter: () => {
        return (
          <div>
            <p>color</p>
            {ShowButton && (
              <input
                name="color"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.color}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },

    {
      dataField: "quantity",
      text: "Quantity",
      headerFormatter: () => {
        return (
          <div>
            <p>Quantity</p>
            {ShowButton && (
              <input
                name="quantity"
                autocomplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.quantity}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "price",
      text: "Cost Price",
      headerFormatter: () => {
        return (
          <div>
            <p>Cost price</p>
            {ShowButton && (
              <input
                name="price"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.price}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "wholeSalePrice",
      text: "WholeSale Price",
      headerFormatter: () => {
        return (
          <div>
            <p>WholeSale Price</p>
            {ShowButton && (
              <input
                name="wholeSalePrice"
                autocomplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.wholeSalePrice}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "retailPrice",
      text: "retailPrice",
      headerFormatter: () => {
        return (
          <div>
            <p>Retail Price</p>
            {ShowButton && (
              <input
                name="retailPrice"
                autocomplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.retailPrice}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "description",
      text: "Description",
      headerFormatter: () => {
        return (
          <div>
            <p>Description</p>
            {ShowButton && (
              <input
                name="description"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.description}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    props.authReducer.user && props.authReducer.user.userType !== "user"
      ? {
          dataField: "action",
          text: "Actions",
          formatter: columnFormatters.ActionsColumnFormatter,
          formatExtraData: {
            openEditProductPage: productsUIProps.openEditProductPage,
            openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
          },
          classes: "text-right pr-0",
          headerClasses: "text-right pr-3",
          style: {
            minWidth: "100px",
          },
        }
      : "",
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
  return {};
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
