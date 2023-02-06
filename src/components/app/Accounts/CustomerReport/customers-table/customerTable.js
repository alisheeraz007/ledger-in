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
import {
  CustomerReportTotal,
  Regexfilter,
  Regexfilter_New,
  Balance,
  AmountTotal
} from "../../../../redux/constants";
import { ActionsColumnFormatter } from './column-formatters/ActionsColumnFormatter'
// import ActionsColumnFormatter from "./ActionsColumnFormatter";



const CustomersReport = (props) => {
  // Customers UI Context
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
  const [entities, SetEntities] = useState([]);
  const [AllEntriesArr, setAllEntriesArr] = useState([]);
  const [TotalLength, setTotalLEngth] = useState(0);
  const [filterVal, setfilterVal] = useState({
    CustomerName: "",
    TotalBilled: "",
    TotalRecieve: "",
    TotalBalance: "",
    TotalDiscount: ""
  });
  function paginationFn({ pageSize, pageNumber }, Entry = AllEntriesArr) {
    var perPage = pageSize;

    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = Entry;
    setTotalLEngth(arr.length);
    props.setResetFilter(false);
    SetEntities(arr.slice(showFrom, showTo));
  }
  // Customers Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    customersUIProps.setIds([]);
    if (props.CustomerReducer.entities) {
      let arr = CustomerReportTotal(
        props.CustomerReducer.entities,
        props.AccountReducer.All_entries
      );
      setAllEntriesArr(arr);
      paginationFn(customersUIProps.queryParams, arr);
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
      dataField: "previousBalance",
      text: "Intial Balance",
      headerFormatter: (cellcontent, row, rowIndex) => {
        return (
          <div>
            <p>Initial Balance</p>
            {ShowButton && (
              <input
                name="previousBalance"
                type="number"
                value={filterVal.previousBalance}
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
      dataField: "TotalBilled",
      text: "Total Billed",
      headerFormatter: () => {
        return (
          <div>
            <p>Total Billed</p>
            {ShowButton && (
              <input
                name="TotalBilled"
                type="number"
                autoComplete="off"
                value={filterVal.TotalBilled}
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "TotalRecieve",
      text: "Total Recieve",
      headerFormatter: () => {
        return (
          <div>
            <p>Total Recieve</p>
            {ShowButton && (
              <input
                name="TotalRecieve"
                type="number"
                value={filterVal.TotalRecieve}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellcontent, row, rowIndex) => {
        return (
          <>
            {AmountTotal(row.db_id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalRecieved}
          </>
        )
      }
    },
    // {
    //   dataField: "TotalDiscount",
    //   text: "Total Discount",
    //   headerFormatter: () => {
    //     return (
    //       <div>
    //         <p>Total Discount</p>
    //         {ShowButton && (
    //           <input
    //             name="TotalDiscount"
    //             type="number"
    //             value={filterVal.TotalDiscount}
    //             autocomplete="off"
    //             onChange={(ev) => getvalue(ev)}
    //             className="headerInput"
    //           />
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      dataField: "previousBalance",
      text: "Total Balance",
      headerFormatter: (cellcontent, row, rowIndex) => {
        return (
          <div>
            <p>Total Balance</p>
            {ShowButton && (
              <input
                name="previousBalance"
                type="number"
                value={filterVal.previousBalance}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellcontent, row, rowIndex) => {
        return (
          <div >
            {AmountTotal(row.db_id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance}
          </div>

        )
      }
    },
    {
      dataField: "action",
      text: "Report",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openReport: (i) => console.log(i),
        // openDeleteCustomerDialog: (i) => setDeleteId(i),
        // openSaleListDialog: (i) => setModalId(entities[i]),
        // // openIndivisualDialog: (i) => setSeeFull(entities[i]),
        checkUser: () => {
          return props.authReducer.user &&
            props.authReducer.user.userType !== "user"
            ? true
            : false;
        },
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
  return (
    <>
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
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    AccountReducer: state.AccountReducer,
    SupplyProductReducer: state.SupplyProductReducer,
    SuppliersReducer: state.SupplierReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomersReport);
