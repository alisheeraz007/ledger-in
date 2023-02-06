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
import * as uiHelpers from "../../indivisualUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../../redux/middleWare/CustomerMIddileWare";
import { ActionsColumnFormatter } from "./ActionsColumnFormatter";
// import { useCustomersUIContext } from "../../../e-commerce/customers/CustomersUIContext";
import { SaleUIProvider, useSaleUIContext } from "../../indivisualUIContext";

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
  }, [props, props.Entries]);
  // Table columns
  const columns = [
    {
      dataField: "customer",
      text: "Customer Name",
      formatter: (cellContent, row) => (
        <div>
          {row.customer && row.customer.CustomerName
            ? row.customer.CustomerName
            : row.customer.firstName + " " + row.customer.lastName}
        </div>
      ),
    },
    {
      dataField: "product.product_name",
      text: "Product Name",
    },
    {
      dataField: "bar_code",
      text: "Bar Code",
    },
    {
      dataField: "price",
      text: "price",
    },
    {
      dataField: "quantity",
      text: "Quantity",
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
      {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => { */}
      {/* return (
            <Pagination isLoading={false} paginationProps={paginationProps}> */}
      <BootstrapTable
        wrapperClasses="table-responsive table-hover table-sm"
        bordered={true}
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        // remote
        keyField="product.db_id"
        data={props.Entries}
        columns={columns}
        // defaultSorted={uiHelpers.defaultSorted}
        onTableChange={getHandlerTableChange(customersUIProps.setQueryParams)}
        // {...paginationTableProps}
      >
        <PleaseWaitMessage entities={entities} />
        <NoRecordsFoundMessage entities={entities} />
      </BootstrapTable>
      {/* </Pagination>
          );
        }}
      </PaginationProvider> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(EntryTable);
