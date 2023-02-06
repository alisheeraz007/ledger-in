// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import DatePicker from "react-datepicker";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/customers/customersActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
  toAbsoluteUrl,
} from "../../../../_metronic/_helpers";
import * as uiHelpers from "../expenseUIHelpers";
import {
  CardHeaderToolbar,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  DatePickerField,
} from "../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../redux/middleWare/CustomerMIddileWare";
import ActionsColumnFormatter from "./ActionsColumnFormatter";
import { useSaleUIContext } from "../expenseUIContext";
import EntryListModal from "./AllSaleListModal/TableModal";
import SaleDeleteDialog from "./AllSaleListModal/Sale-delete-Dialog/SaleDeleteDialog";
import SVG from "react-inlinesvg";
// import { SaleFilter } from "../../Sale/Sale-filter/SaleFilter";
import {
  SaleRegexFilter,
  TodayFilter,
  indivisualReport,
  GetFormattedDate,
  // checkA
} from "../../../redux/constants";
import { Dropdown, Segment } from "semantic-ui-react";

const ExpenseReport = (props) => {
  const customersUIContext = useSaleUIContext();
  const [TotalLength, setTotalLength] = useState(0);
  const [allEntry, setallEntry] = useState([]);
  const [ResetFilter, setResetFilter] = useState(false);
  const [ShowButton, setShowButton] = useState(false);

  const customersUIProps = useMemo(() => {
    return {
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      openEditSalePage: customersUIContext.openEditSalePage,
      openDeleteSaleDialog: customersUIContext.openDeleteSaleDialog,
    };
  }, [customersUIContext]);

  const [entities, SetEntities] = useState([]);
  const [ModalId, setModalId] = useState(false);
  const [DeleteId, setDeleteId] = useState(false);
  const [seeFull, setSeeFull] = useState(false);
  const [filterVal, setfilterVal] = useState({
    from: new Date(),
    to: new Date(),
    // CustomerName: "",
    // TotalSaleItem: "",
    // price: "",
    // // InvoiceNumber: "",
    // main_Heads: "",
    // // // main_heads: "",
    // // ReturnNetAmount: "",
    // payment_Type: "",
    // // discount: "",
    // type: "",
    // assettype: "",
  });
  function entrySep(arr) {
    let arr2 = [];
    arr.map((a, i) => [arr2.push(a)]);
    arr.map((a, i) => {
      if (a.returnInvoice) {
        arr2.push({
          ...a.returnInvoice,
          TotalAmount: a.returnInvoice.ReturnTotalAmount,
          main_Heads: a.returnInvoice.main_heads
            ? a.returnInvoice.main_heads
            : a.returnInvoice.main_Heads,
          SaleItem: [...a.returnInvoice.retrunInvoiceArr],
          TotalSaleItem: a.returnInvoice.retrunInvoiceArr?.length,
          invoiceNumber: "---",
        });
      }
    });
    return arr2;
  }
  function paginationFn(
    { pageSize, pageNumber },
    Entry = TodayFilter(
      props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
        (a, b) =>
          Number(String(b.date).slice(0)) - Number(String(a.date).slice(0))
      )
    )
  ) {
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = allEntry.length ? allEntry : Entry;
    setTotalLength(arr.length);
    setResetFilter(false);
    SetEntities(arr.slice(showFrom, showTo));
  }
  // Customers Redux state
  useEffect(() => {
    setallEntry(
      TodayFilter(
        props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
          (a, b) =>
            Number(String(b.date)) - Number(String(a.date))
        )
      )
    );
  }, [props, props.AccountReducer]);
  useEffect(() => {
    customersUIProps.setIds([]);
    if (props.CustomerReducer.entities) {
      paginationFn(customersUIProps.queryParams);
    }
  }, [customersUIProps.queryParams, props]);
  useEffect(() => {
    paginationFn(customersUIProps.queryParams, allEntry);
  }, [allEntry]);
  const getvalue = (ev, name, newValue, newName) => {
    setShowButton(true);

    if (newValue) {
      setfilterVal({
        ...filterVal,
        [newName]: newValue,
      });
    } else {
      setfilterVal({
        ...filterVal,
        [name ? name : ev.target.name]: name ? ev : ev.target.value,
      });
    }
    SetEntities([]);
    if (name) {
      paginationFn(
        customersUIProps.queryParams,
        SaleRegexFilter(
          props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
            (a, b) =>
              Number(String(b.date)) - Number(String(a.date))
          ),
          ev,
          "date",
          {
            ...filterVal,
            [name ? name : ev.target.name]: name ? ev : ev.target.value,
          }
        )
      );
      setallEntry(
        SaleRegexFilter(
          props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
            (a, b) =>
              Number(String(b.date)) - Number(String(a.date))
          ),
          ev,
          "date",
          {
            ...filterVal,
            [name ? name : ev.target.name]: name ? ev : ev.target.value,
          }
        )
      );
    } else {
      setallEntry(
        SaleRegexFilter(
          props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
            (a, b) =>
              Number(String(b.date)) - Number(String(a.date))
          ),
          ev.target.value,
          ev.target.name,
          {
            ...filterVal,
            [ev.target.name]: ev.target.value,
          }
        )
      );
      paginationFn(
        customersUIProps.queryParams,
        SaleRegexFilter(
          props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
            (a, b) =>
              Number(String(b.date)) - Number(String(a.date))
          ),
          ev.target.value,
          ev.target.name,
          {
            ...filterVal,
            [ev.target.name]: ev.target.value,
          }
        )
      );
    }
  };
  useEffect(() => {
    if (ResetFilter) {
      setfilterVal({
        from: new Date(),
        to: new Date(),
        // CustomerName: "",
        // TotalSaleItem: "",
        // price: "",
        // // InvoiceNumber: "",
        // main_Heads: "",
        // // // main_heads: "",
        // // ReturnNetAmount: "",
        // payment_Type: "",
        // // discount: "",
        // type: "",
        // assettype: "",
      });
      setShowButton(false);
      setallEntry(
        TodayFilter(
          props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
            (a, b) =>
              Number(String(b.date).slice(0)) - Number(String(a.date).slice(0))
          )
        )
      );
      paginationFn(
        customersUIProps.queryParams,
        TodayFilter(
          props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses').sort(
            (a, b) =>
              Number(String(b.date).slice(0)) - Number(String(a.date).slice(0))
          )
        )
      );
    }
  }, [ResetFilter]);
  const columns = [
    {
      dataField: "Date",
      text: "date",
      headerFormatter: () => {
        return (
          <div>
            <p>Date</p>
            {ShowButton && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <DatePicker
                  name="from"
                  placeholderText="from"
                  className="headerInput"
                  style={{ width: "40%" }}
                  selected={filterVal.from}
                  onChange={(e) => {
                    getvalue(e, "from");
                  }}
                />
                <DatePicker
                  name="to"
                  placeholderText="To"
                  className="headerInput"
                  style={{ width: "40%" }}
                  selected={filterVal.to}
                  onChange={(e) => {
                    getvalue(e, "to");
                  }}
                />
              </div>
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => (
        <>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>
            {GetFormattedDate(row.date)}
          </div>
          <div style={{ fontSize: "12px" }}>
            {new Date(row.date).toLocaleTimeString()}
          </div>
        </>
      ),
    },
    {
      dataField: "type",
      text: "Description",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Description</p>
      //       {ShowButton && (
      //         <input
      //           name="type"
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.type}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div>
          Paid
        </div>
      ),
    },
    // {
    //   dataField: "Customer Name",
    //   text: "Customer Name",
    //   headerFormatter: () => {
    //     return (
    //       <div>
    //         <p>Customer Name</p>
    //         {ShowButton && (
    //           <input
    //             name="CustomerName"
    //             autoComplete="off"
    //             onChange={(ev) => getvalue(ev)}
    //             value={filterVal.CustomerName}
    //             className="headerInput"
    //           />
    //         )}
    //       </div>
    //     );
    //   },
    //   formatter: (cellContent, row) => (
    //     <div>
    //       {row.SaleItem
    //         ? row.SaleItem &&
    //         row.SaleItem[0].customer.CustomerName &&
    //         row.SaleItem[0].customer.CustomerName
    //         : null}
    //     </div>
    //   ),
    // },
    {
      dataField: "assettype",
      text: "Head Type",
    //   headerFormatter: (a, row) => {
    //     return (
    //       <div>
    //         <p>Head Type</p>
    //         {ShowButton && (
    //           <input
    //             name="assettype"
    //             autoComplete="off"
    //             onChange={(ev) => getvalue(ev)}
    //             value={filterVal.assettype}
    //             className="headerInput"
    //           />
    //         )}
    //       </div>
    //     );
    //   },
    },
    {
      dataField: "payment_Type",
      text: "Payment Through",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Payment Through</p>
      //       {ShowButton && (
      //         <input
      //           name="payment_Type"
      //           autocomplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.payment_Type}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row, rowIndex) => {
        return (
          <>{row.payment_Type ? row.payment_Type : row.payment_mode}</>
        )
      }
    },
    {
      dataField: "main_Heads",
      text: "Main Heads",
      // headerFormatter: (a, row) => {
      //   return (
      //     <div>
      //       <p>Main Head</p>
      //       {ShowButton && (
      //         <input
      //           name="main_Heads"
      //           autocomplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.main_Heads}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row, rowindex) => {
        return <p onClick={() => console.log(row)}>{row.main_Heads ? row.main_Heads : row.main_heads}</p>;
      },
    },
    {
      dataField: "price",
      text: "Total Price",
      // headerFormatter: (a, row) => {
      //   return (
      //     <div>
      //       <p>Total Price</p>
      //       {ShowButton && (
      //         <input
      //           name="price"
      //           autoComplete="off"
      //           onChange={(ev) => {
      //             getvalue(ev);
      //           }}
      //           value={filterVal.price}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div>
            <b>{row.price}</b>
          </div>
        );
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCustomerDialog: customersUIProps.openEditSalePage,
        openDeleteCustomerDialog: (i) => setDeleteId(i),
        openSaleListDialog: (i) => setModalId(entities[i]),
        // openIndivisualDialog: (i) => setSeeFull(entities[i]),
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
      <Card>
        <CardHeader title="Expense Report">
          <CardHeaderToolbar>
            {ShowButton && (
              <button
                onClick={() => setResetFilter(true)}
                // onClick={() => console.log(props.AccountReducer.Account_entries.filter(obj => obj.main_Heads.toLowerCase() === 'expenses'))}
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
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <PaginationProvider pagination={paginationFactory(paginationOptions)}>
            {({ paginationProps, paginationTableProps }) => {
              return (
                <Pagination isLoading={false} paginationProps={paginationProps}>
                  <BootstrapTable
                    wrapperClasses="table-responsive table-hover table-sm"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    keyField="db_id"
                    data={entities === null ? [] : entities}
                    columns={columns}
                    defaultSorted={uiHelpers.defaultSorted}
                    onTableChange={getHandlerTableChange(
                      customersUIProps.setQueryParams
                    )}
                    {...paginationTableProps}
                  >
                    <PleaseWaitMessage entities={entities} />
                    <NoRecordsFoundMessage entities={entities} />
                  </BootstrapTable>
                </Pagination>
              );
            }}
          </PaginationProvider>
          <EntryListModal
            Entry={ModalId}
            show={ModalId ? true : false}
            onHide={() => setModalId(false)}
          />
          <SaleDeleteDialog
            id={DeleteId}
            show={DeleteId ? true : false}
            onHide={() => setDeleteId(false)}
          />
        </CardBody>
      </Card>
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
    AccountReducer: state.AccountReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseReport);
