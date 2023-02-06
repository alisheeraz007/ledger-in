import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {
  DatePickerField,
  Input,
  Select,
} from "./../../../../../../_metronic/_partials/controls";
import { Formik, Form, Field } from "formik";
import SaleEditForm from "../SaleEditForm";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import AccountMiddileWare from "../../../../../redux/middleWare/accountMiddileWare";
import EntryTable from "./entryTable";
import { SaleUIProvider } from "../../AccountUIContext";
import { update } from "lodash";
import SaleConfirmModal from "./Sale-confirmModal/SaleConfirmModal";
import { Divider } from "@material-ui/core";
import { Table } from "react-bootstrap";
import SalePrintDialog from "../SalePrint/PrintModal";
import { toast } from "react-toastify";
import {
  printElm,
  FindInvoice,
  returnTotal,
} from "../../../../../redux/constants";
const initProduct = {
  date: new Date(),
  price: 0,
  quantity: 1,
  bar_code: "",
  product_name: "",
  TotalAmount: 0,
  Customer_name: "NMSREYx0ZbLdz8XZF6HQ",
};

function SaleReturn(props) {
  // Subheader
  let {
    history,
    match: {
      params: { id: paramsID },
    },
  } = props;
  const suhbeader = useSubheader();
  const [Loading, setLoading] = useState(false);
  const [changeprops, setchangeprops] = useState(false);
  const [PrintModal, setPrintModal] = useState(false);
  const [bar_code, setbar_code] = useState("");

  // Tabs
  let [id, setId] = useState("");
  const SaleUIEvents = {
    newSaleButtonClick: () => {
      history.push("/Account/Sale/new");
    },
    openEditSalePage: (id) => {
      // history.push(`/Account/Sale/${id}/edit`);
      edit(id);
    },
    openDeleteSaleDialog: (i) => {
      // history.push(`/Account/Sale/${id}/delete`);
      Delete(i);
    },
    openDeleteProductsDialog: () => {
      history.push(`/e-commerce/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/e-commerce/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/e-commerce/products/updateStatus");
    },
  };
  const [receivedPayment, setReceivedPayment] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [title, setTitle] = useState("");
  let [assettype, setAssettype] = useState("Cash");
  const [payment_Type, setPayment_Type] = useState(
    assettype === "Cash" ? "Cash" : assettype === "Cheque" ? "Cheque" : null
  );
  const [entryArr, setEntryArr] = useState([]);
  const [priceType, SetpriceType] = useState("retailPrice");
  let [percentagePrice, setPercentagePrice] = useState(0);
  let [percent, setPercent] = useState("%");
  const [oldInvoice, setOldInvoice] = useState("");
  const [returnInvoice, setReturnInvoice] = useState([]);
  const [returnInvoiceset, setReturnInvoiceset] = useState(false);
  const [SaleForEdit, setSaleForEdit] = useState("");
  let [paid, setPaid] = useState("");
  let [checkDate, setCheckDate] = useState("");
  let [checkDes, setCheckDes] = useState("");
  useEffect(() => {
    if (paramsID) {
      let Data = props.AccountReducer.All_entries.filter(
        (obj) => obj.db_id == paramsID
      )[0];
      // );
      if (Data) {
        setEntryArr(Data.SaleItem);
        setReceivedPayment(Data.receivedPayment);
        setPayment_Type(Data.payment_Type);
      }
    }
  }, [paramsID, props]);
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      // ...
      if (event.keyCode == 115) {
        // props.history.push("/Account/Sale/new");
        setEntryArr([]);
        setPrintModal(false);
        setReceivedPayment(0);
      }
    });
  }, []);
  const edit = (i) => {
    setId(i);
    setSaleForEdit(entryArr[i]);
  };
  const update = (values, rowIndex) => {
    setSaleForEdit("");
    // values.customer = props.CustomerReducer.entities.filter(
    //   (obj) => obj.db_id == values.Customer_name
    // )[0];
    // values.product = props.ProductReducer.entities.filter(
    //   (obj) => obj.db_id == values.product_name
    // )[0];
    let oldArr = returnInvoice;
    let arr = oldArr.splice(rowIndex, 1, values);
    setReturnInvoice(oldArr);
    setchangeprops(!changeprops);
    setId("");
  };
  // useEffect(()=>{
  // },[returnInvoice])
  const Delete = (i) => {
    setSaleForEdit("");
    let oldArr = returnInvoice;
    let arr = oldArr.splice(i, 1);
    setReturnInvoice(oldArr);
    setchangeprops(!changeprops);
  };
  useEffect(() => {
    let _title = "Sale Return";
    setTitle(_title);
    suhbeader.setTitle(_title);
  }, [SaleForEdit, id]);

  // ENTRY OBJECT

  // props.EditEntry({
  //   ...props.AccountReducer.All_entries.filter(
  //     (obj) => obj.db_id == paramsID
  //   )[0],
  //   ...TotaltFn(),
  //   priceType,
  //   SaleItem: entryArr,
  //   // TotalAmount,
  // });

  const saveSale = (values) => {
    let arr = entryArr;

    let customerid = props.CustomerReducer.entities.filter(
      (obj) => obj.db_id == values.Customer_name
    )[0];
    let obj = arr.filter((obj) => obj.product_name === values.product_name)[0];
    if (obj) {
      let index = arr.findIndex((i) => i.product_name === values.product_name);
      obj.quantity = Number(obj.quantity) + 1;
      obj.TotalAmount = Number(obj.quantity) * Number(obj.price);
      arr.splice(index, 1, obj);
      setEntryArr(arr);
      setchangeprops(!changeprops);
    } else {
      values.customer = customerid;
      values.product = props.ProductReducer.entities.filter(
        (obj) => obj.db_id == values.product_name
      )[0];
      setEntryArr([...entryArr, values]);
    }
  };
  const changeType = (value) => {
    if (entryArr.length) {
      let oldArr = entryArr;
      let arr = [];
      for (var i = 0; i < oldArr.length; i++) {
        if (value) {
          arr.push({
            ...oldArr[i],
            price: oldArr[i].product.retailPrice
              ? oldArr[i].product.retailPrice
              : oldArr[i].product.price,
            TotalAmount: oldArr[i].product.retailPrice
              ? Number(oldArr[i].quantity) *
                Number(oldArr[i].product.retailPrice)
              : Number(oldArr[i].quantity) * Number(oldArr[i].product.price),
          });
        } else {
          arr.push({
            ...oldArr[i],
            price: oldArr[i].product.wholeSalePrice
              ? Number(oldArr[i].product.wholeSalePrice)
              : Number(oldArr[i].product.price),
            TotalAmount: oldArr[i].product.wholeSalePrice
              ? Number(oldArr[i].quantity) *
                Number(oldArr[i].product.wholeSalePrice)
              : Number(oldArr[i].quantity) * Number(oldArr[i].product.price),
          });
        }
      }
      setEntryArr(arr);
    }
  };
  useEffect(() => {
    if (props.AccountReducer.All_entries) {
      let arr = props.AccountReducer.All_entries.filter(
        (obj) =>
          obj.invoiceNumber &&
          obj.invoiceNumber.toString().slice(2, 4) ==
            makingLength_2(new Date().getMonth() + 1) &&
          obj.invoiceNumber.toString().slice(0, 2) ==
            makingLength_2(new Date().getFullYear(), 2)
      ).map((a, i) => {
        return a.invoiceNumber;
      });
      let sort = arr.sort(
        (a, b) => Number(b.toString().slice(4)) - Number(a.toString().slice(4))
      );
      if (sort.length < 1) {
        Code(1);
      } else {
        Code(Number(sort[0].toString().slice(4)) + 1);
      }
    }
  }, [props]);
  const makingLength_2 = (value, length) => {
    if (length && length !== 2) {
      value = value.toString();
      let correctValue =
        value.length === 1
          ? "000" + value
          : value.length === 2
          ? "00" + value
          : value.length === 3
          ? "0" + value
          : value;
      return correctValue;
    } else if (length === 2) {
      value = value.toString();
      let correctValue = value.slice(value.length - 2);
      return correctValue;
    } else {
      value = value.toString();
      let correctValue = value.length === 1 ? "0" + value : value;
      return correctValue;
    }
  };

  const Code = (value) => {
    let d = new Date();
    let year = makingLength_2(d.getFullYear(), 2);
    let month = makingLength_2(d.getMonth() + 1);
    let index = makingLength_2(value, 3);
    // return `${year}-${month}-${index}`;
    setbar_code(`${year}${month}${index}`);
    return value;
  };
  const btnRef = useRef();
  const saveProductClick = (values) => {
    // setInvoiceCode(invoiceCode++);
    printElm("salePrint");
    if (!paramsID) {
      props.AddEntry({
        main_Heads: "Income",
        HeadType: "Sale",
        date: new Date().getTime(),
        SaleItem: entryArr,
        invoiceNumber: bar_code,
        priceType,
        ...TotaltFn(),

        DeliveredBy: props.authReducer.user,
      });
    } else {
      props.EditEntry({
        ...props.AccountReducer.All_entries.filter(
          (obj) => obj.db_id == paramsID
        )[0],
        ...TotaltFn(),
        priceType,
        SaleItem: entryArr,
        // TotalAmount,
      });
    }
    setEntryArr([]);
    setPrintModal(false);
    setReceivedPayment(0);
    setdiscount(0);
    // BackToSaleList();
  };

  const TotaltFn = () => {
    let TotalAmount = 0;
    let TotalQuantity = 0;
    for (var i = 0; i < entryArr.length; i++) {
      TotalAmount += Number(entryArr[i].TotalAmount);
      TotalQuantity += Number(entryArr[i].quantity);
    }
    return {
      TotalAmount,
      balance:
        Number(receivedPayment) < TotalAmount
          ? TotalAmount - Number(receivedPayment) - Number(percentagePrice)
          : 0,
      ReturnAmount:
        Number(receivedPayment) > TotalAmount
          ? Number(receivedPayment) - TotalAmount + Number(percentagePrice)
          : 0,
      receivedPayment,
      payment_Type,
      TotalQuantity,
      discount: percentagePrice,
      netAmount: TotalAmount - percentagePrice,
    };
  };

  useEffect(() => {
  }, [returnInvoice, returnInvoiceset]);
  const BackToSaleList = () => {
    history.push(`/Account/SaleList`);
  };
  let [Inv, setInv] = useState("");
  useEffect(() => {
    // if (oldInvoice) {
    if (oldInvoice.returnInvoice) {
      setReturnInvoice(oldInvoice.returnInvoice.retrunInvoiceArr);
      // }
    }
    //  else if (!oldInvoice) {
    //   setReturnInvoice([]);
    // }
  }, [oldInvoice]);
  return (
    <Card>
      {Loading && <ModalProgressBar />}
      <CardHeader title={title}>
        <div style={{ padding: "10px" }}>
          <label className="d-flex" style={{ alignItems: "center" }}>
            <h3 style={{ margin: "0px", padding: "0px 8px" }}>
              Invoice Number
            </h3>
            <input
              className="form-control col-lg-7"
              autoFocus
              onChange={() => {
                setOldInvoice([]);
                setReturnInvoice([]);
              }}
              onKeyDown={(ev) => {
                setInv(ev.target.value);
                if (ev.keyCode === 13) {
                  setOldInvoice(
                    FindInvoice(
                      ev.target.value,
                      props.AccountReducer.All_entries
                    )
                  );
                }
              }}
            />
          </label>
        </div>

        <CardHeaderToolbar>
          {/* <button
            type="button"
            // ref={btnRef}
            className="btn btn-light "
            onClick={() => {
              setEntryArr([]);
              setPrintModal(false);
              setReceivedPayment(0);
            }}
          >
            {" "}
            Clear (F4)
          </button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5 form-group row">
          <div
            className="col-lg-6"
            style={{
              height: "410px",
              overflow: "auto",
              background: "#ff00000d",
              borderRight: "1px solid #0000001c",
              padding: "5px",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Old Invoice</h3>
            <SaleUIProvider SaleUIEvents={SaleUIEvents}>
              {oldInvoice.returnInvoice ? (
               <div style={{position:'absolute',left:"50%",top:"50%",transform:" translate(-50%, -50%)"}}>
               <h4
                 style={{
                   fontSize: "30px",
                   transform: "rotate(-45deg)",
                   color: "#00000026",
                 }}
               >
                 Already Return
               </h4>
             </div>
              ) : null}
              {oldInvoice
                ? [
                    oldInvoice.SaleItem && oldInvoice.SaleItem.length ? (
                      <EntryTable
                        changeprops={changeprops}
                        ShowPagination={true}
                        Entries={oldInvoice.SaleItem}
                        oldInvoice={oldInvoice}
                        id={0}
                        setReturnInvoice={(obj) => {
                          setReturnInvoice(obj);
                          setReturnInvoiceset(!returnInvoiceset);
                          setEntryArr([]);
                        }}
                        returnInvoice={returnInvoice}
                      />
                    ) : null,
                  ]
                : null}
            </SaleUIProvider>
          </div>
          <div
            className="col-lg-6"
            style={{ background: "#f3f6f9", padding: "5px", }}
          >
            <h3 style={{ textAlign: "center" }}>Return Invoice</h3>
            <SaleUIProvider SaleUIEvents={SaleUIEvents}>
              {oldInvoice.returnInvoice ? (
                <div style={{position:'absolute',left:"50%",top:"50%",transform:" translate(-50%, -50%)"}}>
                  <h4
                    style={{
                      fontSize: "30px",
                      transform: "rotate(-45deg)",
                      color: "#00000026",
                    }}
                  >
                    Already Return
                  </h4>
                </div>
              ) : null}
              {returnInvoice
                ? [
                    returnInvoice.length ? (
                      <EntryTable
                        changeprops={changeprops}
                        ShowPagination={true}
                        Entries={returnInvoice}
                        id={1}
                        returnInvoice={returnInvoice}
                        setEntryArr={() => setEntryArr([])}
                        setReturnInvoice={setReturnInvoice}
                        returnInvoice={returnInvoice}
                        updateRetrurnArr={update}
                        delete={Delete}
                      />
                    ) : null,
                  ]
                : null}
            </SaleUIProvider>
          </div>
        </div>
        <Divider />
        <div className="mt-5 form-group row">
          <div
            className="col-lg-8"
            style={{
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Card style={{ padding: "20px", background: "aliceblue" }}>
              <SaleConfirmModal
                setreceivedPayment={(ev) => setReceivedPayment(ev)}
                setdiscount={(ev) => setdiscount(ev)}
                setPayment_Type={(ev) => setPayment_Type(ev)}
                saveProductClick={() => setPrintModal(!PrintModal)}
                entryArr={entryArr}
                changeType={changeType}
                setPercentagePrice={setPercentagePrice}
                SetpriceType={SetpriceType}
                setPercent={setPercent}
                percent={percent}
                paid={paid}
                setPaid={setPaid}
                updateRetrurnArr={update}
                returnInvoice={returnInvoice}
                Inv={Inv}
                // paid={paid}
                discount={discount}
                assets={props.AccountReducer.entities}
                setAssettype={setAssettype}
                assettype={assettype}
                checkDate={checkDate}
                setCheckDate={setCheckDate}
                checkDes={checkDes}
                setCheckDes={setCheckDes}
                payment_Type={payment_Type}
                setOldInvoice={setOldInvoice}
                setReturnInvoice={setReturnInvoice}
                initialValues={() => {
                  return {
                    ReturnAmount: returnTotal(
                      returnInvoice,
                      discount,
                      receivedPayment
                    ).ReturnTotalAmount,
                    payment_Type,
                    receivedPayment: receivedPayment,
                    discount,
                    percentagePrice,
                  };
                }}
              />
            </Card>
          </div>
          <div className="col-lg-4">
            <Table borderless={true} className="col-md-12">
              <tbody>
                <tr>
                  <th>
                    Total Amount
                  </th>
                  <td>
                    Rs.{" "}
                    {
                      returnTotal(returnInvoice, discount, paid)
                        .ReturnTotalAmount
                    }
                    /-
                  </td>
                </tr>
                {/* {TotaltFn().discount ? (
                  <tr>
                    <th>Discount</th>
                    <td>Rs. {TotaltFn().discount}/-</td>
                  </tr>
                ) : null} */}
                <tr>
                  <th>Net Amount</th>
                  <td>
                    Rs.{" "}
                    {returnTotal(returnInvoice, discount, paid).ReturnNetAmount}
                    /-
                  </td>
                </tr>
                {
                  <tr>
                  <th>Paid Payment</th>
                  <td style={{ color: "red" }}>Rs. {paid}/-</td>
                </tr>
                }
                {returnTotal(returnInvoice, discount, paid)
                  .ReturnRecievedPayment > 0 ? (
                  <tr>
                    <th>Recieved Payment</th>
                    <td>
                      Rs.{" "}
                      {
                        returnTotal(returnInvoice, discount, paid)
                          .ReturnRecievedPayment
                      }
                      /-
                    </td>
                  </tr>
                ) : null}
                {returnTotal(returnInvoice, discount, paid).returnBalance ? (
                  <tr>
                    <th>Balance</th>
                    <td style={{ color: "red" }}>
                      Rs.{" "}
                      {returnTotal(returnInvoice, discount, paid).returnBalance}
                      /-
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </div>
          <SalePrintDialog
            show={PrintModal}
            SaveAndPrint={saveProductClick}
            onHide={() => {
              setPrintModal(!PrintModal);
            }}
            CalculationTable={() => {
              return (
                <table borderless={true} className="col-md-12">
                  <tbody>
                    <tr>
                      <th style={{ fontSize: "13px" }}>Total Amount</th>
                      <td style={{ fontSize: "13px" }}>
                        Rs.{" "}
                        {returnTotal(returnInvoice, discount, receivedPayment)
                          .TotalAmount
                          ? returnTotal(
                              returnInvoice,
                              discount,
                              receivedPayment
                            ).TotalAmount
                          : TotaltFn().TotalAmount}
                        /-
                      </td>
                    </tr>
                    {TotaltFn().discount ? (
                      <tr>
                        <th style={{ fontSize: "13px" }}>Discount</th>
                        <td style={{ fontSize: "13px" }}>
                          Rs. {TotaltFn().discount}/-
                        </td>
                      </tr>
                    ) : null}
                    {/* {TotaltFn().netAmount ? ( */}
                    <tr
                      style={{
                        borderTop: "1px solid black",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <th style={{ fontSize: "14px" }}>Net Amount</th>
                      <td style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Rs. {TotaltFn().netAmount}/-
                      </td>
                    </tr>
                    {/* ) : null} */}
                    <tr>
                      <th style={{ fontSize: "14px" }}> </th>
                      <td style={{ fontSize: "14px", fontWeight: "bold" }}></td>
                    </tr>
                    <br />
                    <tr>
                      <th style={{ fontSize: "13px" }}>Payment Recieved</th>
                      <td style={{ fontSize: "13px" }}>
                        Rs. {receivedPayment}/-
                      </td>
                    </tr>
                    {TotaltFn().ReturnAmount ? (
                      <tr>
                        <th style={{ fontSize: "13px", fontWeight: "bold" }}>
                          Return Amount
                        </th>
                        <td style={{ fontSize: "13px", fontWeight: "bold" }}>
                          Rs. {TotaltFn().ReturnAmount}/-
                        </td>
                      </tr>
                    ) : null}
                    {TotaltFn().balance ? (
                      <tr>
                        <th style={{ fontSize: "13px" }}>Balance</th>
                        <td style={{ fontSize: "13px" }}>
                          Rs. {TotaltFn().balance}/-
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              );
            }}
            receivedPayment={receivedPayment}
            Entry={entryArr}
            invoice={bar_code}
            component={() => {
              return (
                <SaleUIProvider SaleUIEvents={SaleUIEvents}>
                  {entryArr.length ? (
                    <EntryTable
                      TotalAmount={TotaltFn().TotalAmount}
                      TotalQuantity={TotaltFn().TotalQuantity}
                      ShowPagination={false}
                      Entries={entryArr}
                    />
                  ) : null}
                </SaleUIProvider>
              );
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddEntry: (data) => dispatch(AccountMiddileWare.AddEntry(data)),
    EditEntry: (data) => dispatch(AccountMiddileWare.EditEntry(data)),
    // EditProduct: (data, id) =>
    //   dispatch(ProductMiddileware.EditProduct(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleReturn);
