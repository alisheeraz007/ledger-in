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
import SupplierMiddileware from "../../../../redux/middleWare/SuppliersMiddleWare";
import {
  Regexfilter,
  Regexfilter_New,
  SupplierAcc,
  remainBal,
  currentBalance,
} from "../../../../redux/constants";
import SupplierActions from "../../../../redux/actions/SuppliersAction";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { withRouter } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";

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
  // useEffect(()=>{props.GetAllSupplier()},[])
  function paginationFn(
    { pageSize, pageNumber },
    CustomerArr = props.SupplierReducer.entities
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
    if (props.SupplierReducer.entities) {
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
      Regexfilter_New(props.SupplierReducer.entities, {
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
      dataField: "SupplierName",
      text: "Supplier Name",
      headerFormatter: () => {
        return (
          <div>
            <p>Supplier Name</p>
            {ShowButton && (
              <input
                name="SupplierName"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.SupplierName}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "CompanyName",
      text: "Supplier Company",
      headerFormatter: () => {
        return (
          <div>
            <p>Supplier Company</p>
            {ShowButton && (
              <input
                name="CompanyName"
                autocomplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.CompanyName}
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
      dataField: "Balance",
      text: "Balance",
      headerFormatter: () => {
        return (
          <div>
            <p>Balance</p>
            {ShowButton && (
              <input
                name="Balance"
                autocomplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.Balance}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return (
          <p>
            {currentBalance(
              false,
              row,
              props.AccountReducer.Account_entries,
              props.SupplyProductReducer.entities,
            )}
          </p>
        );
      },
    },

    {
      dataField: "action",
      text: "Actions",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            <a
              title="Edit customer"
              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
              onClick={() =>
                props.history.push(`/Report/SupplierReport/${row.db_id}`)
              }
            >
              <AssessmentIcon />
            </a>
            {/* <a
          title="Edit customer"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          // onClick={() => openEditCustomerDialog(row.db_id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </a>
        <> </>
  
        <a
          title="Delete customer"
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          // onClick={() => openDeleteCustomerDialog(row.db_id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
          </span>
        </a> */}
          </>
        );
      },
      //  columnFormatters.ActionsColumnFormatter,
      // formatExtraData: {
      //   openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
      //   openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
      //   openIndivisualDialog: customersUIProps.openIndivisualDialog
      // },
      // classes: "text-right pr-0",
      // headerClasses: "text-right pr-3",
      // style: {
      //   minWidth: "100px",
      // },
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
              isLoading={props.SupplierReducer.entities.length ? false : true}
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
    // GetAllSupplier: (data) => dispatch(SupplierMiddileware.GetAllSupplier(data)),
    // Supplier: (arr) => dispatch(SupplierActions.GetAllSupplier(arr)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    SupplierReducer: state.SupplierReducer,
    SupplyProductReducer: state.SupplyProductReducer,
    AccountReducer: state.AccountReducer,
    // SupplierReducer: state.SupplierReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomersTable));
