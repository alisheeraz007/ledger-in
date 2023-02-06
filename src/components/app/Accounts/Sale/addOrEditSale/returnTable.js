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
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "../AccountUIHelpers";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
import { ActionsColumnFormatter } from "./ActionsColumnFormatter";
import { useCustomersUIContext } from "../../../e-commerce/customers/CustomersUIContext";
import { SaleUIProvider, useSaleUIContext } from "../AccountUIContext";

const ReturnTable = (props) => {
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
  }, [props, props.Entries, props.changeprops]);
  // Table columns
  const columns = [
    {
      dataField: "product.product_name",
      text: "Product",
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
      text: "Quantity",
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCustomerDialog: customersUIProps.openEditSalePage,
        openDeleteCustomerDialog: customersUIProps.openDeleteSaleDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
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
                  onTableChange={getHandlerTableChange(
                    customersUIProps.setQueryParams
                  )}
                  // {...paginationTableProps}
                >
                  <PleaseWaitMessage entities={entities} />
                  <NoRecordsFoundMessage entities={entities} />
                </BootstrapTable>
          //     </Pagination>
          //   );
          // }}
        // {/* </PaginationProvider> */}
      ) : (
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
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReturnTable);
