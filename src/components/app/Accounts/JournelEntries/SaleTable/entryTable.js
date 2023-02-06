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
import * as uiHelpers from "../AccountUIHelpers";
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
import { SaleUIProvider, useSaleUIContext } from "../AccountUIContext";
import EntryListModal from "./AllSaleListModal/TableModal";
import SaleDeleteDialog from "./AllSaleListModal/Sale-delete-Dialog/SaleDeleteDialog";
import SVG from "react-inlinesvg";
import { SaleFilter } from "../Sale-filter/SaleFilter";
import { SaleRegexFilter, TodayFilter } from "../../../../redux/constants";

const GeneralJournalEntries = (props) => {
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
  const [filterVal, setfilterVal] = useState({
    from: new Date(),
    to: new Date(),
    main_Heads: "",
    type: "",
    price: "",
    // discount: "",
  });
  function paginationFn(
    { pageSize, pageNumber },
    Entry = TodayFilter(props.AccountReducer.Account_entries)
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
    setallEntry(TodayFilter(props.AccountReducer.Account_entries));
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
          props.AccountReducer.Account_entries,
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
          props.AccountReducer.Account_entries,
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
          props.AccountReducer.Account_entries,
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
          props.AccountReducer.Account_entries,
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
        main_Heads: "",
        type: "",
        price: "",
        // discount: "",
      });
      setShowButton(false);
      setallEntry(TodayFilter(props.AccountReducer.Account_entries));
      paginationFn(
        customersUIProps.queryParams,
        TodayFilter(props.AccountReducer.Account_entries)
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
      formatter: (cellContent, row) => (
        <div>
          {new Date(row.date).toLocaleDateString()}{" "}
          {new Date(row.date).toLocaleTimeString()}
        </div>
      ),
    },
    {
      dataField: "main_Heads",
      text: "Main head",
      headerFormatter: () => {
        return (
          <div>
            <p>Main head</p>
            {ShowButton && (
              <input
                name="main_Heads"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.mainHeads}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "type",
      text: "Type",
      headerFormatter: () => {
        return (
          <div>
            <p>Type</p>
            {ShowButton && (
              <input
                name="type"
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                value={filterVal.type}
                className="headerInput"
              />
            )}
          </div>
        );
      },
    },
    {
      dataField: "price",
      text: "Amount",
      headerFormatter: () => {
        return (
          <div>
            <p>Amount</p>
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
    props.authReducer.user && props.authReducer.user.userType !== "user"
      ? {
          dataField: "action",
          text: "Actions",
          formatter: ActionsColumnFormatter,
          formatExtraData: {
            openEditCustomerDialog: customersUIProps.openEditSalePage,
            openDeleteCustomerDialog: (i) => setDeleteId(i),
            // openSaleListDialog: (i) => setModalId(entities[i]),
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
        }
      : {},
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
        <CardHeader title="General Entries">
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
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralJournalEntries);
