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
import * as uiHelpers from "../CustomersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import {
  CustomersUIProvider,
  useCustomersUIContext,
} from "../CustomersUIContext";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
import { Regexfilter, Regexfilter_New } from "../../../../redux/constants";
import CustomerActions from "../../../../redux/actions/CustomerAction";

const CustomersTable = (props) => {
  let { ShowButton } = props;
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: customersUIContext.openDeleteCustomerDialog,
    };
  }, [customersUIContext]);

  const [TotalLength, setTotalLEngth] = useState(0);
  const [entities, SetEntities] = useState([]);
  const [filterVal, setfilterVal] = useState({
    CustomerName: "",
    phoneNumber: "",
    email: "",
    Address: "",
    CustomerType: "",
  });
  function paginationFn(
    { pageSize, pageNumber },
    CustomerArr = props.CustomerReducer.entities
  ) {
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = CustomerArr;
    setTotalLEngth(arr.length);
    props.setResetFilter(false);
    SetEntities(arr.slice(showFrom, showTo));
  }
  useEffect(() => {
    customersUIProps.setIds([]);
    if (props.CustomerReducer.entities) {
      paginationFn(customersUIProps.queryParams);
    }
  }, [customersUIProps.queryParams, props]);
  const getvalue = (ev) => {
    props.setShowButton(true);
    setfilterVal({
      ...filterVal,
      [ev.target.name]: ev.target.value,
    });
    paginationFn(
      customersUIProps.queryParams,
      Regexfilter_New(props.CustomerReducer.entities, {
        ...filterVal,
        [ev.target.name]: ev.target.value,
      })
    );
  };
  useEffect(() => {
    if (props.ResetFilter) {
      setfilterVal({
        CustomerName: "",
        phoneNumber: "",
        email: "",
        Address: "",
      });
      props.setShowButton(false);
    }
  }, [props.ResetFilter]);
  const columns = [
    {
      dataField: "CustomerName",
      text: "Customer Name",
      headerFormatter: () => {
        return (
          <div>
            <p>Customer Name</p>
            {ShowButton && (
              <input
                name="CustomerName"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.CustomerName}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "phoneNumber",
      text: "phone Number",
      headerFormatter: () => {
        return (
          <div>
            <p>phone Number</p>
            {ShowButton && (
              <input
                name="phoneNumber"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.phoneNumber}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "email",
      text: "Email",
      headerFormatter: () => {
        return (
          <div>
            <p>Email</p>
            {ShowButton && (
              <input
                name="email"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.email}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "Address",
      text: "Address",
      headerFormatter: () => {
        return (
          <div>
            <p>Address</p>
            {ShowButton && (
              <input
                name="Address"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.Address}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "CustomerType",
      text: "Address",
      headerFormatter: () => {
        return (
          <div>
            <p>Customer Type</p>
            {ShowButton && (
              <input
                name="CustomerType"
                autocomplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.CustomerType}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
        openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: TotalLength,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: customersUIProps.queryParams.pageSize,
    page: customersUIProps.queryParams.pageNumber,
  };
  // let constantDataFn = () => {
  //   let obj = {
  //     CustomerName: "Customer",
  //     phoneNumber: "",
  //     email: "",
  //     Address: "",
  //     db_id: "",
  //   };
  //   let arr = [];
  //   for (var i = 0; i < 10000; i++) {
  //     arr.push({ ...obj, CustomerName: `Customer${i}`, db_id: i });
  //   }
  //   props.GetAllCustomer(arr);
  // };
  return (
    <>
      {/* <button onClick={constantDataFn}>SetConstantData</button> */}
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={props.CustomerReducer.entities.length ? false : true}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive table-hover table-sm"
                classes="table table-head-custom  table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="db_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  customersUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: customersUIProps.ids,
                //   setIds: customersUIProps.setIds,
                // })}
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
};
function mapDispatchToProps(dispatch) {
  return {
    GetAlluser: (data) => dispatch(CustomerMiddileware.GetAllUser()),
    GetAllCustomer: (arr) => dispatch(CustomerActions.GetAllCustomer(arr)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomersTable);
