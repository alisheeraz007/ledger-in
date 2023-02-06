// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/products/productsActions";
import * as uiHelpers from "../ProductsUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Input, Pagination } from "../../../../../_metronic/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import {
  AvaliableProductQuantity,
  Regexfilter,
  Regexfilter_New,
  TotalSaleProductQuantity,
  SupplierAcc,
  GetFormattedDate,
  currentBalance,
  // SupplierTotal,
  // SupplierPaid
} from "../../../../redux/constants";
import { Field, Formik } from "formik";
import PurchaseDialogue from "./PruchaseDetails";

function ProductsTable(props) {
  let { ShowButton } = props;
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditProductPage: productsUIContext.openEditProductPage,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
    };
  }, [productsUIContext]);
  const [entities, SetEntities] = useState([]);
  const [AllEntriesArr, setAllEntriesArr] = useState([]);
  const [TotalLength, setTotalLEngth] = useState(0);
  const [filterVal, setfilterVal] = useState({
    bar_code: "",
    product_name: "",
    price: "",
    quantity: "",
    avaliableQuantity: "",
    SaleQuantity: "",
  });
  let [productsArr, setProductsArr] = useState("");
  let [supplier, setSupplier] = useState("");
  let [totalBalance, setTotalBalance] = useState("");

  useEffect(() => {
    let arr = [];
    let paidArr = [];
    for (let i = 0; i < props.SupplyProductReducer.entities.length; i++) {
      if (
        props.SupplyProductReducer.entities[i].supplier.db_id ===
        props.supplier.db_id
      ) {
        arr.push(props.SupplyProductReducer.entities[i]);
      }
    }
    // if(props.AccountReducer.Account_entries){
    for (let i = 0; i < props.AccountReducer.Account_entries.length; i++) {
      if (
        props.AccountReducer.Account_entries[i].supplier &&
        props.AccountReducer.Account_entries[i].supplier.db_id ===
        props.supplier.db_id
      ) {
        paidArr.push({
          ...props.AccountReducer.Account_entries[i],
          sup:
            props.AccountReducer.Account_entries[i].main_Heads === "Liabilities"
              ? "paid"
              : props.AccountReducer.Account_entries[i].main_Heads === "Assets"
                ? "reciever"
                : null,
        });
      }
    }
    // }
    setProductsArr([...arr, props.supplier, ...paidArr]);
  }, [
    props.SupplyProductReducer,
    props.supplier,
    supplier,
    props.AccountReducer,
  ]);
  function quantityFn(obj) {
    let total = 0
    obj.purchasedItems.map((a, i) => {
      total += Number(a.quantity)
    })


    return (total)
  }
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  let [row, setRow] = useState("")


  const handleClickOpen = (scrollType, row) => () => {
    setRow(row);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function paginationFn({ pageSize, pageNumber }, ProductArr = AllEntriesArr) {
    var perPage = pageSize;
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    let arr = ProductArr.map((row) => {
      let obj = {
        ...row,
        SaleQuantity: TotalSaleProductQuantity(
          props.AccountReducer.All_entries,
          row.quantity,
          row
        ),
      };
      return obj;
    });
    setTotalLEngth(arr.length);
    props.setResetFilter(false);
    SetEntities(
      arr
        .sort((a2, b2) => {
          let a = a2.date,
            b = b2.date;
          return a == b ? 0 : a > b ? 1 : -1;
        })
        .slice(showFrom, showTo)
    );
  }
  useEffect(() => {
    productsUIProps.setIds([]);
    if (productsArr) {
      let arr = productsArr.map((row) => {
        let obj = {
          ...row,
          price: row.price ? row.price.toString() : null,
          quantity: row.quantity ? row.quantity.toString() : null,
          SaleQuantity: TotalSaleProductQuantity(
            props.AccountReducer.All_entries,
            row.quantity,
            row
          ).toString(),
          avaliableQuantity: AvaliableProductQuantity(
            props.AccountReducer.All_entries.sort((a2, b2) => {
              let a = a2.bar_code,
                b = b2.bar_code;
              return a == b ? 0 : a > b ? 1 : -1;
            }),
            row.quantity,
            row
          ).toString(),
        };
        return obj;
      });
      setAllEntriesArr(arr);
      paginationFn(productsUIProps.queryParams, arr);
    }
  }, [productsUIProps.queryParams, props, productsArr]);
  const getvalue = (ev) => {
    props.setShowButton(true);
    setfilterVal({
      ...filterVal,
      [ev.target.name]: ev.target.value,
    });
    paginationFn(
      productsUIProps.queryParams,
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
  let [balTotal, setBalTotal] = useState(0);
  function balance(bal, paid) {
    let total = balTotal + bal;
    setBalTotal(total);
    return total;
  }
  let [balAr, setBalArr] = useState();
  let [balI, setBalI] = useState();
  let arr = 0;
  function makeObject(amount, i) {
    arr += amount
    return arr;
  }

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
        return (

          <div >
            {row.id ? (

              <p onClick={
                // () => {
                handleClickOpen('paper', row)
                // }
              }>
                Purchased <b>{quantityFn(row)}</b> Items
              </p>
            ) : row.sup === "paid" ? (
              row.price > 0 ?
                // row.price 
                <p>Paid</p>
                : <p>Recieved</p>

            ) : row.sup === "reciever" ? (
              <p>Recieved</p>
            ) : (
                    <p>Previous Balance (Initial)</p>
                  )}
          </div>
        )
      },
      footer: (cellContent, row, rowIndex) => {
        return <p></p>;
      },
    },
    {
      dataField: "TotalAmount",
      text: "Total Amount",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Total Amount</p>
            {ShowButton && (
              <input
                name="TotalAmount"
                value={filterVal.TotalAmount}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.id && row.paid != 'paid' ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {Number(row.price) * Number(row.quantity)}
          </p>
        ) : row.paid === 'paid' ?
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {row.TotalAmount}
            </p>
            : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {row.Balance ? row.Balance : 0}
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
              Total Purchase Amount
              <br />
              {
                SupplierAcc(
                  props.supplier,
                  productsArr,
                  props.AccountReducer.Account_entries
                ).Total
              }
            </span>
          </p>
        );
      },
    },
    {
      dataField: "paymentPaid",
      text: "Payemnt Paid",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Paid Amount</p>
            {ShowButton && (
              <input
                name="paymentPaid"
                value={filterVal.paymentPaid}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.id ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.paymentPaid || row.PaymentPaid}
          </p>
        ) : row.sup === "paid" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.price > 0 ? row.price : 0}
          </p>
        ) : row.sup === "reciever" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            0
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
              Total Paid Amount
              <br />
              {
                SupplierAcc(
                  props.supplier,
                  productsArr,
                  props.AccountReducer.Account_entries
                ).paid
              }
            </span>
          </p>
        );
      },
    },
    {
      dataField: "quantity",
      text: "Recieved Amount",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Recieved Amount</p>
            {ShowButton && (
              <input
                name="quantity"
                value={filterVal.quantity}
                autoComplete="off"
                onChange={(ev) => getvalue(ev)}
                className="headerInput"
              />
            )}
          </div>
        );
      },
      formatter: (cellContent, row, rowIndex) => {
        return row.id ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            0
          </p>
        ) : row.sup === "paid" ? (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {row.price < 0 ? -row.price : 0}
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
      dataField: "balance",
      text: "Total Balance",
      headerFormatter: () => {
        return (
          <div>
            <p style={{ textAlign: "center" }}>Total Balance</p>
            {ShowButton && (
              <input
                name="balance"
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
        return (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {/* {row.balance + row.previousBalance} */}
            {/* {balance(row.balance)} */}
            {makeObject(
              row.Balance
                ? Number(row.Balance)
                : row.id && row.paid != "paid"
                  ? Number(row.price) * Number(row.quantity) - Number(row.paymentPaid)
                  : row.sup === "paid"
                    ? Number(-row.price)
                    : row.sup === "reciever"
                      ? Number(row.balance)
                      : row.paid === "paid"
                        ? Number(row.balance)
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
              {currentBalance(
                false,
                props.supplier,
                props.AccountReducer.Account_entries,
                props.SupplyProductReducer.entities
              )}
            </span>
          </p>
        );
      },
    },
    props.authReducer.user && props.authReducer.user.userType !== "user"
      ? {
        dataField: "action",
        text: "Actions",
        formatter: columnFormatters.ActionsColumnFormatter,
        formatExtraData: {
          openEditProductPage: productsUIProps.openEditProductPage,
          openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
        },
        classes: "text-right pr-0",
        headerClasses: "text-right pr-3",
        style: {
          minWidth: "100px",
        },
      }
      : "",
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: TotalLength,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: productsUIProps.queryParams.pageSize,
    page: productsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={false} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive table-hover table-sm"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  productsUIProps.setQueryParams
                )}
                onSort={(ev) => console.log(ev, "sort")}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
      <PurchaseDialogue open={open}
        setOpen={setOpen}
        scroll={scroll}
        setScroll={setScroll}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        row={row}
      />
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {};
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
    SupplierReducer: state.SupplierReducer,
    SupplyProductReducer: state.SupplyProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
