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
} from "./../../../../../_metronic/_helpers";
import * as uiHelpers from "../bankUIHelpers";
import {
  CardHeaderToolbar,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  DatePickerField,
} from "./../../../../../_metronic/_partials/controls";
import { connect } from "react-redux";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
import ActionsColumnFormatter from "./ActionsColumnFormatter";
import { useSaleUIContext } from "../bankUIContext";
import EntryListModal from "./AllSaleListModal/TableModal";
import SaleDeleteDialog from "./AllSaleListModal/Sale-delete-Dialog/SaleDeleteDialog";
import SVG from "react-inlinesvg";
import { Input, Select } from "../../../../../_metronic/_partials/controls";

// import { SaleFilter } from "../../Sale/Sale-filter/SaleFilter";
import {
  SaleRegexFilter,
  TodayFilter,
  indivisualReport,
  GetFormattedDate,
  TotalBankCash,
  totalCashBank,
} from "../../../../redux/constants";
import { Dropdown, Segment } from "semantic-ui-react";

const BankCash = (props) => {
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
  let [method, setMethod] = useState("");
  let [assettype, setAssettype] = useState("");
  let [assets, setAssets] = useState("");
  let [ReportType, setReportType] = useState("");
  const [filterVal, setfilterVal] = useState({
    from: new Date(),
    to: new Date(),
    // HeadType: "",
    // type: "",
    // payment_mode: "",
    // // description: "",
    // price: "",
  });
  function entrySep(arr, accArr, ReportType, supPro) {
    let arr2 = [];
    let check = ''
    if (arr) {
      arr && arr
        .filter((obj) => obj.payment_mode ? obj.payment_mode === ReportType : obj.assettype === ReportType)
        .map((a, i) => [arr2.push(a)]);
      arr && arr.map((a, i) => {
        if (a.returnInvoice && a.returnInvoice.assettype === ReportType) {
          arr2.push(a.returnInvoice);
        }
      });
      // console.log('found')
    }
    if (supPro) {
      supPro
        .filter((obj) => obj.payment_mode ? obj.payment_mode === ReportType : obj.assettype === ReportType)
        .map((a, i) => [arr2.push(a)]);
    }
    if (accArr) {
      accArr
        .filter((obj) => obj.payment_mode === ReportType)
        .map((a, i) => [arr2.push(a)]);
      // console.log(accArr)
    }
    return arr2;
  }
  let [report, setReport] = useState("");
  useEffect(() => {
    setAssets(props.AccountReducer.entities);
  }, [props.AccountReducer.entities]);
  useEffect(() => {
    if (props.AccountReducer.Account_entries) {
      let sort = entrySep(
        props.AccountReducer.All_entries,
        props.AccountReducer.Account_entries,
        ReportType,
        props.SupplyProductReducer.entities
      ).sort(
        (a, b) =>
          Number(String(b.date).slice(0)) - Number(String(a.date).slice(0))
      );
      setReport(sort);
    }
  }, [props.AccountReducer.Account_entries, ReportType]);

  function paginationFn(
    { pageSize, pageNumber },
    Entry = entrySep(
      { ...props.AccountReducer.All_entries, type: "allEntry" },
      { ...props.AccountReducer.Account_entries, type: "allAccount" },
      ReportType,
      { ...props.SupplyProductReducer.entities, type: "AllSup" }
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


  useEffect(() => {
    if (report) {
      setallEntry(report);
      setfilterVal({
        ...filterVal,
        from: new Date(),
        to: new Date(),
      });
    }
  }, [props, props.AccountReducer, report]);
  useEffect(() => {
    customersUIProps.setIds([]);
    if (report) {
      paginationFn(customersUIProps.queryParams);
    }
  }, [customersUIProps.queryParams, props]);
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
          report,
          ev,
          "date",
          {
            ...filterVal,
            [name ? name : ev.target.name]: name ? ev : ev.target.value,
          },
          true
        )
      );
      setallEntry(
        SaleRegexFilter(
          report,
          ev,
          "date",
          {
            ...filterVal,
            [name ? name : ev.target.name]: name ? ev : ev.target.value,
          },
          true
        )
      );
    } else {
      setallEntry(
        SaleRegexFilter(
          report,
          ev.target.value,
          ev.target.name,
          {
            ...filterVal,
            [ev.target.name]: ev.target.value,
          },
          true
        )
      );
      paginationFn(
        customersUIProps.queryParams,
        SaleRegexFilter(
          report,
          ev.target.value,
          ev.target.name,
          {
            ...filterVal,
            [ev.target.name]: ev.target.value,
          },
          true
        )
      );
    }
  };
  useEffect(() => {
    if (ResetFilter) {
      setfilterVal({
        from: new Date(),
        to: new Date(),
        // HeadType: "",
        // type: "",
        // payment_mode: "",
        // description: "",
        // price: "",
      });
      setShowButton(false);
      setallEntry(report);
      paginationFn(customersUIProps.queryParams, report);
    }
  }, [ResetFilter]);
  function quantityFn(obj) {
    let total = 0
    obj.purchasedItems.map((a, i) => {
      total += Number(a.quantity)
    })


    return (total)
  }
  const columns = [
    {
      dataField: "date",
      text: "Date",
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
                  autoComplete="off"
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
                  autoComplete="off"
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
      formatter: (cellContent, row) => (
        <div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>
            {GetFormattedDate(row.date)}
          </div>
          <div style={{ fontSize: "12px" }}>
            {new Date(row.date).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      dataField: "description",
      text: "Description",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Description</p>
      //       {ShowButton && (
      //         <input
      //           name="description"
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.description}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div style={{ textTransform: "uppercase" }}>
          {row.HeadType && row.HeadType.toLowerCase() === "account payable" ? (
            row.price > 0 ? (
              <>
                Paid to <b>{row.supplier.SupplierName}</b>
              </>
            ) : (
                <>
                  Recieved from <b>{row.supplier.SupplierName}</b>
                </>
              )
          ) :
            row.HeadType && row.HeadType.toLowerCase() === "account recievable" ? (
              row.price < 0 ? (
                <>
                  Paid to <b>{row.Customer.CustomerName}</b>
                </>
              ) : (
                  <>
                    Recieved from <b>{row.Customer.CustomerName}</b>
                  </>
                )
            ) :
              row.main_Heads && row.main_Heads.toLowerCase() === "return" ? (
                <>
                  Return {row.retrunInvoiceArr?row.retrunInvoiceArr[0]?.returnQty : null} Items from{" "}
                  <b>{row.retrunInvoiceArr ? row.retrunInvoiceArr[0]?.customer.CustomerName : null}</b>
                </>
              ) : row.HeadType && row.HeadType.toLowerCase() === "sale" ? (
                <>
                  Sold ({row.TotalQuantity}) items to{" "}
                  <b> {row.SaleItem[0].customer.CustomerName} </b>{" "}
                </>
              ) : row.main_Heads && row.main_Heads.toLowerCase() === "expenses" ? (
                <>Spend in ({row.type})</>
              ) : row.type && row.type.toLowerCase() === "income" ?
                      <>
                        Recieved Amount
                      </> : row.paid === 'paid' ?
                        <>
                          Purchased <b>{quantityFn(row)}</b> Items

                        </>
                        : (
                          <>
                            Your Asset <b>{row.type}</b>

                          </>
                        )}
        </div>
      ),
    },
    {
      dataField: "assettype",
      text: "Paid Through",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Paid Through</p>
      //       {ShowButton && (
      //         <input
      //           name="assettype"
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.assettype}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div style={{ textTransform: "uppercase" }}>
          {row.assettype && row.assettype && row.assettype
            // indivisualReport(props.id,props.AccountReducer.All_entries)
          }
        </div>
      ),
    },
    {
      dataField: "payment_Type",
      text: "Payment Type",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Payment Type</p>
      //       {ShowButton && (
      //         <input
      //           name="payment_Type"
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.payment_Type}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div style={{ textTransform: "uppercase" }}>
          {row.payment_Type || row.assettype}
        </div>
      ),
    },
    {
      dataField: "main_heads" || "main_hHads",
      text: "Main Heads",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Main Heads</p>
      //       {ShowButton && (
      //         <input
      //           name={"main_heads" || "main_Heads"}
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.main_heads || filterVal.main_heads}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div style={{ textTransform: "uppercase" }}>
          {row.paid === "paid" ? "Assets" : row.main_heads || row.main_Heads}
        </div>
      ),
    },
    {
      dataField: "HeadType",
      text: "Head Type",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Head Type</p>
      //       {ShowButton && (
      //         <input
      //           name={"main_heads" || "main_Heads"}
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.HeadType}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div style={{ textTransform: "uppercase" }}>{row.paid === "paid" ? "Purchase" : row.HeadType}</div>
      ),
    },

    {
      dataField: "netAmount" || "ReturnNetAmount",
      text: "Amount",
      // headerFormatter: () => {
      //   return (
      //     <div>
      //       <p>Amount</p>
      //       {ShowButton && (
      //         <input
      //           name={"netAmount" || "ReturnNetAmount"}
      //           autoComplete="off"
      //           onChange={(ev) => getvalue(ev)}
      //           value={filterVal.netAmount || filterVal.ReturnNetAmount}
      //           className="headerInput"
      //         />
      //       )}
      //     </div>
      //   );
      // },
      formatter: (cellContent, row) => (
        <div
          style={{ textTransform: "uppercase" }}
        >
          {row.paid === 'paid' ? Number(row.PaymentPaid) : row.netAmount || row.ReturnNetAmount || row.price}
        </div>
      ),
    },
    // {
    //   dataField: "action",
    //   text: "Remove",
    //   formatter: ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditCustomerDialog: customersUIProps.openEditSalePage,
    //     openDeleteCustomerDialog: (i) => setDeleteId(i),
    //     openSaleListDialog: (i) => setModalId(entities[i]),
    //     // openIndivisualDialog: (i) => setSeeFull(entities[i]),
    //     checkUser: () => {
    //       return props.authReducer.user &&
    //         props.authReducer.user.userType !== "user"
    //         ? true
    //         : false;
    //     },
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
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
      <div
        className="d-flex"
        style={{ flexWrap: "wrap", justifyContent: "space-between" }}
      >
        <div className="col-lg-5">
          <Card style={{ height: "120px" }}>
            <CardHeader title="Total Cash"></CardHeader>
            <CardBody style={{ display: "flex", alignItems: "center" }}>
              <h2 style={{ fontWeight: "200" }}>
                RS{" "}
                {/* {TotalBankCash(
                  props.AccountReducer.All_entries,
                  props.AccountReducer.Account_entries,
                  props.AccountReducer.entities,
                  "cash",
                  "Total Cash ",
                  props.SupplyProductReducer.entities
                )} */}
                {totalCashBank(
                  props.AccountReducer.All_entries,
                  props.AccountReducer.Account_entries,
                  props.AccountReducer.entities,
                  props.SupplyProductReducer.entities,
                  "cash"
                )}
              </h2>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-5">
          <Card style={{ height: "120px" }}>
            <CardHeader title="Total Bank Balance"></CardHeader>
            <CardBody style={{ display: "flex", alignItems: "center" }}>
              <h2 style={{ fontWeight: "200" }}>
                RS{" "}
                {/* {TotalBankCash(
                  props.AccountReducer.All_entries,
                  props.AccountReducer.Account_entries,
                  props.AccountReducer.entities,
                  "bank",
                  "Total Cash In Bank",
                  props.SupplyProductReducer.entities
                )} */}
                {totalCashBank(
                  props.AccountReducer.All_entries,
                  props.AccountReducer.Account_entries,
                  props.AccountReducer.entities,
                  props.SupplyProductReducer.entities,
                  "bank"
                )}
              </h2>
            </CardBody>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader
          title="Bank And Cash Report"
          style={{ padding: "7px 25px !important" }}
        >
          <div className=" col-lg-6" style={{ padding: "10px" }}>
            {/* <Select
                    // disabled={id ? true : false}
                    name="assettype"
                    label="Payment Through"
                    defaultValue="Cash"
                    onChange={(ev) => {
                      setMethod(ev.target.value);
                      setAssettype(ev.target.value);
                      // setFieldValue("assettype", ev.target.value);
                    }}
                  >
                    <option value={""}>Select.....</option>
                    {assets ?
                      assets.filter((obj) => obj.main_Heads === "Assets")
                      .map((Head) => (
                        <option key={Head.HeadType} value={Head.HeadType}>
                          {Head.HeadType}
                        </option>
                      )):null}
                  </Select> */}
            <select
              className="form-control"
              onChange={(ev) => setReportType(ev.target.value)}

            >
              <option>Select.....</option>
              {assets
                ? assets
                  .filter(
                    (obj) =>
                      obj.main_Heads === "Assets" &&
                      (obj.HeadType.toLowerCase() === "cash" || obj.HeadType.toLowerCase() === "bank" || obj.HeadType.toLowerCase() === "cheque")
                  )
                  .map((Head) => (
                    <option key={Head.HeadType} value={Head.HeadType}>
                      {Head.HeadType}
                    </option>
                  ))
                : null}
            </select>
          </div>

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
    SupplyProductReducer: state.SupplyProductReducer,
    SuppliersReducer: state.SupplierReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BankCash);
