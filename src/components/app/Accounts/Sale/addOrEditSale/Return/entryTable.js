// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/customers/customersActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../AccountUIHelpers";
import { Pagination } from "./../../../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../../redux/middleWare/CustomerMIddileWare";
import { ActionsColumnFormatter } from "./ActionsColumnFormatter";
import { useCustomersUIContext } from "../../../../e-commerce/customers/CustomersUIContext";
import { SaleUIProvider, useSaleUIContext } from "../../AccountUIContext";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import { toast } from "react-toastify";
import ClearIcon from "@material-ui/icons/Clear";
import { returnTotal } from "../../../../../redux/constants";
import { object } from "prop-types";

const EntryTable = (props) => {
  const customersUIContext = useSaleUIContext();
  const customersUIProps = useMemo(() => {
    return {
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      openEditSalePage: customersUIContext.openEditSalePage,
      openDeleteSaleDialog: customersUIContext.openDeleteSaleDialog,
    };
  }, [customersUIContext]);
  // useEffect(() => {
  //   props.GetAlluser();
  // }, []);
  const [entities, SetEntities] = useState([]);
  // const { totalCount, listLoading } = p;
  function paginationFn({ pageSize, pageNumber }) {
    var perPage = pageSize;

    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    SetEntities(props.Entries.slice(showFrom, showTo));
  }
  // Customers Redux state
  const dispatch = useDispatch();
  // useEffect(() => {
  //   props.GetAlluser();
  // }, []);
  useEffect(() => {
    // clear selections list
    customersUIProps.setIds([]);
    SetEntities([]);
    if (props.Entries) {
      paginationFn(customersUIProps.queryParams);
    }
  }, [props, props.Entries, props.changeprops, props.returnInvoice]);
  // let [returnArr,setReturnArr] = useState([]);
  let arr = props.returnInvoice;
  let [returnQty, setReturnQty] = useState("");
  const [abc, setAbc] = useState({});

  function ReturnItem(i, data, bar_code) {
    //  if(props.returnInvoice){
    const found = props.returnInvoice.find((obj) => obj.bar_code === bar_code);
    if (found) {
      toast.error(`This Product (${bar_code}) is alreday included`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!found) {
      arr.push(data);
      props.setReturnInvoice(arr);
    }

  }
  let [Edit, setEdit] = useState("");
  let [qty, setQty] = useState("");
  let [q, setQ] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  function quantityAmount(price, qty, i) {
    if (qty === undefined || qty < 0) {
      return 0;
    } else {
      let Amount = 0;
      Amount = Number(price) * Number(qty);
      setReturnAmount(Amount);
      return Amount;
    }
  }

  let [disable, setDisable] = useState(false);

  const columns = [
    {
      dataField: "product.product_name",
      text: "Product",
      // formatter: (cellContent,row,rowIndex) =>
      // props.id === 1 && row.returnQty ?(
      //   <>
      //   {row.product.product_name}({row.returnQty}Already Return)
      //   </>
      // ):   <>
      // {row.product.product_name}
      // </>
    },
    {
      dataField: "bar_code",
      text: "BarCode",
    },
    {
      dataField: "price",
      text: "price",
    },
    {
      dataField: "quantity",
      text: "Qty",
      headerFormatter: () => (props.id === 1 ? <>Remain Qty</> : <>Qty</>),
      formatter: (cellContent, row, rowIndex) =>
        props.id === 0 ? (
          <p>{row.quantity}</p>
        ) : props.id === 1 && row.returnQty ? (
          <p>
            {" "}
            {row.quantity - row.returnQty}{" "}
          </p>
        ) : (
          Number(row.quantity)
        ),
    },
    {
      dataField: "action",
      text: `${props.id === 0 ? "Return" : "Rtrn Qty"}`,
      formatter: (cellContent, row, rowIndex) =>
        props.id === 0 ? (
          <button
            title="Return Item"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => {
              ReturnItem(
                rowIndex,
                {
                  ...row,
                  returnQty: Number(row.returnQty)
                    ? Number(row.quantity) - Number(row.returnQty)
                    : Number(row.quantity),
                  ReturnAmount: quantityAmount(
                    row.price,
                    Number(
                      row.returnQty < row.quantity
                        ? row.returnQty
                        : row.quantity
                    ),
                    rowIndex
                  ),
                },
                row.bar_code
              );
           
            }}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <AssignmentReturnIcon />
            </span>
          </button>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="5"
            ></input> */}
            <input
              className="returnQty"
              type="number"
              placeholder="+1"
              id="quantity"
              name="quantity"
              min="1"
              max={row.quantity}
              // defaultValue={
              //   row.returnQty ? row.quantity - row.returnQty : row.quantity
              // }
              value={row.returnQty}
              onChange={(ev) => {
                // setQ(ev.target.value);
                // if (ev.target.value < Number(row.quantity)) {
                //   setQty(Number(row.quantity) - ev.target.value);
                // }
                props.updateRetrurnArr(
                  {
                    ...row,
                    returnQty:
                      Number(ev.target.value) === 0
                        ? ""
                        : Number(ev.target.value),
                    ReturnAmount: quantityAmount(
                      row.price,
                      Number(
                        ev.target.value < row.quantity
                          ? ev.target.value
                          : row.quantity
                      ),
                      rowIndex
                    ),
                  },
                  rowIndex
                );
         
              }}

              style={{
                width: "61px",
                height: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
              }}
            />
          </div>
        ),
    },
    {
      dataField: "ReturnAmount",
      text: "Rtn Amount",
      headerFormatter: () => (props.id === 1 ? <>Rtrn Amount</> : null),
      formatter: (cellContent, row, rowIndex) =>
        props.id === 1 ? (
          <div
            style={{
              display: "flex",
              alignItems: "0px",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <h6
              style={{ margin: "0px" }}
            >
              {" "}
              {/* {abc[rowIndex]=== "undefine" ? abc[rowIndex] * row.price :row.quantity * row.price }
              {quantityAmount(
                row.price,
                abc[rowIndex + 1]
                  ? Number(abc[rowIndex + 1])
                  : Number(row.quantity),
                rowIndex
              )} */}
              {row.returnQty
                ? row.returnQty * row.price
                : row.quantity * row.price}
            </h6>{" "}
            <button
              style={{
                background: "transparent",
                border: "none",
                padding: "0px",
                width: "30px",
              }}
              onClick={() =>
                props.id === 1
                  ?
                    [props.delete(rowIndex), props.setEntryArr()]
                  : null
              }
            >
              <ClearIcon />
            </button>{" "}
          </div>
        ) : null,
    },


  ];

 
  const Printcolumns = [
    {
      dataField: "product.product_name",
      text: "Product",
      footer: (ev) => {
        return (
          <div style={{ fontSize: "12px" }}>Items:({props.Entries.length})</div>
        );
      },
    },
    {
      dataField: "quantity",
      text: "Qty",
      footer: (ev) => {
        return (
          <div style={{ fontSize: "12px" }}>Qty :({props.TotalQuantity})</div>
        );
      },
    },
    {
      dataField: "price",
      text: "Rate",
      footer: (ev) => {
        return;
      },
    },
    {
      dataField: "TotalAmount",
      text: "Total",
      footer: (ev) => {
        return (
          <div style={{ fontSize: "12px" }}>Total({props.TotalAmount})</div>
        );
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: props.Entries.length,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: customersUIProps.queryParams.pageSize,
    page: customersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      {props.ShowPagination ? (
        // <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        //   {({ paginationProps, paginationTableProps }) => {
        // return (
        // <Pagination isLoading={false} paginationProps={paginationProps}>
        <BootstrapTable
          wrapperClasses="table-responsive table-hover table-sm"
          bordered={true}
          classes="table table-head-custom table-vertical-center overflow-auto"
          bootstrap4
          bodyClasses="invoiceTableBody"
          // remote
          keyField="product.db_id"
          data={props.Entries}
          columns={columns}
          onTableChange={getHandlerTableChange(customersUIProps.setQueryParams)}
          // {...paginationTableProps}
        >
          <PleaseWaitMessage entities={entities} />
          <NoRecordsFoundMessage entities={entities} />
        </BootstrapTable>
      ) : (
        //     </Pagination>
        //   );
        // }}
        // {/* </PaginationProvider> */}
        <BootstrapTable
          wrapperClasses="table-responsive table-hover table-sm"
          bordered={false}
          classes="table table-head-custom table-vertical-center overflow-auto table-th-padding tableCustomize"
          style={{
            maxHeight: "89%",
          }}
          bootstrap4
          // remote
          keyField="product.db_id"
          data={props.Entries}
          columns={Printcolumns}
          footer={(ev) => console.log(ev)}
          // defaultSorted={uiHelpers.defaultSorted}
          onTableChange={getHandlerTableChange(customersUIProps.setQueryParams)}
        >
          <PleaseWaitMessage entities={props.Entries} />
          <NoRecordsFoundMessage entities={props.Entries} />
        </BootstrapTable>
      )}
    </>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    GetAlluser: (data) => dispatch(CustomerMiddileware.GetAllUser()),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    AccountReducer: state.AccountReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryTable);
