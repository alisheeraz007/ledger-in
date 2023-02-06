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
} from "../../../../../_metronic/_helpers";
import * as uiHelpers from "../indivisualUIHelpers";
import {
  CardHeaderToolbar,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
import ActionsColumnFormatter from "./ActionsColumnFormatter";
import { useSaleUIContext } from "../indivisualUIContext";
import EntryListModal from "./AllSaleListModal/TableModal";
import SaleDeleteDialog from "./AllSaleListModal/Sale-delete-Dialog/SaleDeleteDialog";
import SVG from "react-inlinesvg";
import { SaleFilter } from "../../Sale/Sale-filter/SaleFilter";
import {
  SaleRegexFilter,

  indivisualReport,
  GetFormattedDate,
  AmountTotal,
  // checkA
} from "../../../../redux/constants";
import { Dropdown, Segment } from "semantic-ui-react";
import SaleDetDialogue from "./PruchaseDetails";

const IndivisualReport = (props) => {
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
  const [OptionList, setOptionList] = useState([]);
  const [DeleteId, setDeleteId] = useState(false);
  const [seeFull, setSeeFull] = useState(false);
  const [Id, setId] = useState("");
  const [filterVal, setfilterVal] = useState({
    from: new Date(),
    to: new Date(),
    // CustomerName: "",
    // TotalSaleItem: "",
    // TotalAmount: "",
    // invoiceNumber: "",
    // netAmount: "",
    // ReturnNetAmount: "",
    // balance: "",
    // returnBalance: ""
    // discount: "",
  });
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  let [row, setRow] = useState("")


  const handleClickOpen = (scrollType, row) => () => {
    // console.log(row)
    setRow(row);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let [report, setReport] = useState("");
  let [reportAcc, setReportAcc] = useState("")
  let [reportCust, setReportCust] = useState("")
  useEffect(() => {
    // let sort = Object.values(barCodesArr).sort(
    if (props.AccountReducer.All_entries) {
      let sort = props.AccountReducer.All_entries
      // .sort(
      //   (a, b) =>
      //     Number(String(b.date).slice(0)) - Number(String(a.date).slice(0))
      // );
      setReport(sort);
    }
    if (props.AccountReducer.Account_entries) {
      let sort = props.AccountReducer.Account_entries
      // .sort(
      //   (a, b) =>
      //     Number(String(b.date).slice(0)) - Number(String(a.date).slice(0))
      // );
      setReportAcc(sort);
    }
    if (props.CustomerReducer.entities) {
      let sort = props.CustomerReducer.entities
      // .sort(
      //   (a, b) =>
      //     Number(String(a.date).slice(0)) - Number(String(b.date).slice(0))
      // );
      setReportCust(sort);
    }
    // );
  }, [props.AccountReducer.All_entries]);
  function paginationFn(
    { pageSize, pageNumber },
    Entry = (indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust))
  ) {
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = allEntry.length ? allEntry : Entry;
    setTotalLength(arr.length);
    setResetFilter(false);
    SetEntities(arr.slice(showFrom, showTo));
    // console.log(arr.slice(showFrom, showTo));
    // console.log(Entry);
  }

  // useEffect(() => {
  //   console.log(entities)
  // }, [entities])


  useEffect(() => {
    if (props.CustomerReducer.entities) {
      let arr = props.CustomerReducer.entities;
      let arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push({
          name: arr[i].db_id,
          value: arr[i].db_id,
          text:
            i == 0
              ? arr[i].CustomerName
              : arr[i].CustomerName + " " + `(${arr[i].phoneNumber})`,
        });
      }
      setOptionList(arr2);
      if (props.id) {
        setId(props.Id);
      }
    }
  }, [props.CustomerReducer.entities, props.id]);
  let arr = 0;
  function makeObject(amount, i) {
    arr += amount
    return arr;
  }

  useEffect(() => {
  }, [report]);
  useEffect(() => {
    if (report[0] && props.AccountReducer.All_entries) {
      // error
      // error
      setallEntry(
        indivisualReport(
          props.id ? props.id : Id,
          report,
          reportAcc,
          reportCust

        )
      );
      setfilterVal({
        ...filterVal,
        from: new Date(report[0] ? report[0].date : null),
        to: new Date(
          report[
            report.length - 1
          ].date
        ),
      });
    }
  }, [report]);
  useEffect(() => {
    customersUIProps.setIds([]);
    if (props.CustomerReducer.entities) {
      paginationFn(customersUIProps.queryParams);
    }
  }, [customersUIProps.queryParams, props, report]);
  useEffect(() => {
    paginationFn(customersUIProps.queryParams, allEntry);
  }, [allEntry]);
  const getvalue = (ev, name) => {
    setShowButton(true);
    setfilterVal({
      ...filterVal,
      [name ? name : ev.target.name]: name ? ev : ev.target.value,
    });
    SetEntities([]);
    if (name) {
      paginationFn(
        customersUIProps.queryParams,
        SaleRegexFilter(
          indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust),
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
          indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust),
          ev,
          "date",
          {
            ...filterVal,
            [name ? name : ev.target.name]: name ? ev : ev.target.value,
          }
        )
      );
    } else if (report) {
      setallEntry(
        SaleRegexFilter(
          indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust),
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
          indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust),
          ev.target.value,
          ev.target.name,
          {
            ...filterVal,
            // error
            // error

            from: filterVal.from ? filterVal.from : new Date(report[0].date),
            to: filterVal.to
              ? filterVal.to
              : new Date(report[report.length - 1].date),
            [ev.target.name]: ev.target.value,
          }
        )
      );
    }
  };
  useEffect(() => {
    if ((ResetFilter, report)) {
      // setfilterVal({
      //   from: new Date(report[0].date),
      //   to: new Date(
      //     report[
      //       report.length - 1
      //     ].date
      //   ),
      //   CustomerName: "",
      //   TotalSaleItem: "",
      //   TotalAmount: "",
      //   InvoiceNumber: "",
      //   // discount: "",
      // });
      setShowButton(false);
      setallEntry(
        (indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust))
      );
      paginationFn(
        customersUIProps.queryParams,
        (indivisualReport(props.id ? props.id : Id, report, reportAcc, reportCust))
      );
    }
  }, [ResetFilter, report]);
  const columns = [
    {
      dataField: "date",
      text: "Date",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <>
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>
              {GetFormattedDate(row.date || row.Date)}
            </div>
            <div style={{ fontSize: "12px" }}>
              {new Date(row.date || row.Date).toLocaleTimeString()}
            </div>
          </>
        );
      },
      footer: (cellContent, row, rowIndex) => {
        return <p></p>;
      },
    },
    {
      dataField: "product_name",
      text: "Description",
      headerFormatter: () => {
        return (
          <div>
            <p>Description</p>
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
      formatter: (cellContent, row, rowIndex) => {
        return (<div>

          {row.invoiceNumber ? (
            row.exchangeRef ?
              <p onClick={
                // () => {
                handleClickOpen('paper', row)
                // }
              } style={{ cursor: "pointer" }}>
                Exchange  <b>({row.TotalSaleItem})</b> Items with Invoice Number <b>({row.exchangeRef})</b> by{" "}
                <b>{row.SaleItem[0].customer.CustomerName}</b>
              </p>
              :
              <p onClick={
                // () => {
                handleClickOpen('paper', row)
                // }
              } style={{ cursor: "pointer" }}>
                Sold  <b>({row.TotalSaleItem})</b> Items To{" "}
                <b>{row.SaleItem[0].customer.CustomerName} </b>
              Invoice Number <b>({row.invoiceNumber})</b>
              </p>
          ) : row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? (
            row.price < 0 ?
              <p>Paid To <b>{row.Customer.CustomerName}</b></p>
              :
              <p>Reacieved From <b>{row.Customer.CustomerName}</b></p>
          ) : row.main_Heads === "Return" || row.main_heads === "Return" ? (
            <p onClick={
              // () => {
              handleClickOpen('paper', row)
              // }
            } style={{ cursor: "pointer" }}>Sale Return from {" "}
              <b>{row.retrunInvoiceArr? row.retrunInvoiceArr[0]?.customer.CustomerName : null}</b> Invoice Number <b>({row.RinvoiceNumber})</b></p>
          ) : (
                  <p>Previous Balance (<b>Initial</b>)</p>
                )}
        </div>
        )
      },
      footer: (cellContent, row, rowIndex) => {
        return <p></p>;
      },
    },
    {
      dataField: "netAmount",
      text: "Total Amount",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Total Amount</p>
            {ShowButton && (
              <input
                name="netAmount"
                value={filterVal.netAmount}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.exchangeRef ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.TotalAmount)}
          </p>
        ) : row.invoiceNumber ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.netAmount)}
          </p>
        ) : row.ReturnNetAmount ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.ReturnNetAmount}
          </p>
        ) : row.HeadType && row.HeadType.toLowerCase() === "account recievable" ?
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  0
              </p> :
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {row.previousBalance}
                </p>;
        // : <p
        //   style={{
        //     textAlign: "center",
        //     fontWeight: "bold",
        //     fontSize: "14px",
        //   }}
        // >
        //   {row.price}
        // </p>;
      },
      footer: (cellContent, row, rowIndex) => {
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                color: "#B5B5C3",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
              }}
            >
              Total Purchase Amount
              <br />
              {AmountTotal(props.id ? props.id : Id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalPurchase}
            </span>
          </p>
        );
      },
    },
    {
      dataField: "receivedPayment",
      text: "Recieved Amount",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Recieved Amount</p>
            {ShowButton && (
              <input
                name="receivedPayment"
                value={filterVal.receivedPayment}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.invoiceNumber ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.receivedPayment}
          </p>
        ) : row.main_Heads === "Return" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.ReturnRecievedPayment < 0 ? 0 : row.ReturnRecievedPayment}
          </p>
        ) : row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.price > 0 ? row.price : 0}
          </p>
        ) : (
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  0
                </p>
              );
      },
      footer: (cellContent, row, rowIndex) => {
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                color: "#B5B5C3",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
              }}

            >
              Total Recieved Amount
              <br />
              {AmountTotal(props.id ? props.id : Id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalRecieved}
            </span>
          </p>
        );
      },
    },
    {
      dataField: "returnAmount",
      text: "Paid Amount",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Paid Amount</p>
            {ShowButton && (
              <input
                name="returnAmount"
                value={filterVal.returnAmount}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.exchangeRef ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.paidPayment)}
          </p>
        )
          :
          row.invoiceNumber ? (
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {Number(row.receivedPayment) - Number(row.netAmount) < 0 ? 0 : Number(row.receivedPayment) - Number(row.netAmount)}
            </p>
          ) : row.main_Heads === "Return" ? (
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {Number(row.ReturnNetAmount)}
            </p>
          ) : row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? (
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {row.price < 0 ? -row.price : 0}
            </p>
          ) : (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    0
                  </p>
                );
      },
      footer: (cellContent, row, rowIndex) => {
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {/* <span
              style={{
                fontWeight: "600",
                color: "#B5B5C3",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
              }}

            >
              Total Recieved Amount
              <br />
              {AmountTotal(props.id ? props.id : Id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalRecieved}
            </span> */}
          </p>
        );
      },
    },
    {
      dataField: "balance",
      text: "Balance",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Balance</p>
            {ShowButton && (
              <input
                name="quantity"
                value={filterVal.balance}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.exchangeRef ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.ReturnAmount) + Number(row.TotalAmount) - Number(row.discount)}
            {/* {Number(row.balance)} */}
          </p>
        ) : row.invoiceNumber ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.balance) < 0 ? Number(row.ReturnAmount) + Number(row.balance) : Number(row.balance)}
          </p>
        ) : row.returnBalance ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.returnBalance}
          </p>
        ) : row.sup === "reciever" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.price)}
          </p>
        ) : row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.price < 0 ? -row.price : -row.price}
          </p>
        ) : (
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      0
                    </p>
                  );
      },
      footer: (cellContent, row, rowIndex) => {
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          ></p>
        );
      },
    },
    {
      dataField: "Totalbalance",
      text: "Total Balance",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Total Balance</p>
            {ShowButton && (
              <input
                name="balance"
                value={filterVal.Totalbalance}
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
          // onClick={() => console.log(row)}
          >
            {/* {row.balance + row.previousBalance} */}
            {/* {balance(row.balance)} */}
            {makeObject(
              row.CustomerName
                ? Number(row.previousBalance)
                : row.exchangeRef ?
                  Number(row.paidPayment) + Number(row.TotalAmount)
                  : row.invoiceNumber
                    ? Number(Number(row.balance) < 0 ? Number(row.ReturnAmount) + Number(row.balance) : Number(row.balance))
                    : row.ReturnNetAmount
                      ? Number(row.returnBalance)
                      : row.HeadType && row.HeadType.toLowerCase() === "account recievable"
                        ? Number(-row.price)
                        : Number(row.Balance)
              ,
              rowIndex
            )}
          </p>
        );
      },
      footer: (cellContent, row, rowIndex) => {
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                color: "#B5B5C3",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
              }}
            >
              Total Balance
              <br />
              {AmountTotal(props.id ? props.id : Id, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance}
            </span>
          </p>
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
        <CardHeader
          title="Indivisual Report"
          style={{ padding: "7px 25px !important" }}
        >
          {!props.id ? (
            <div
              className="col-sm-6"
              style={{ display: "flex", padding: "5px" }}
            >
              <label
                style={{
                  padding: "0px 7px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0px" }}>Customer Name</h3>
              </label>
              <br />
              <Dropdown
                placeholder="Customer Name"
                fluid
                search
                value={Id}
                // disabled={CustomerAdd}
                selection
                scrolling
                options={OptionList}
                onChange={(e, { value }) => {
                  setId(value);
                  setallEntry(
                    indivisualReport(value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities)
                  );
                }}
                style={{ width: "65%", display: "flex", alignItems: "center" }}
              />
              {/* </Segment>{" "} */}
            </div>
          ) : null}
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
            {/* 
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
            </button> */}
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
          <SaleDetDialogue open={open}
            setOpen={setOpen}
            scroll={scroll}
            setScroll={setScroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            row={row}
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
export default connect(mapStateToProps, mapDispatchToProps)(IndivisualReport);
