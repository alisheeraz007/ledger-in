import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import SaleEditForm from "./SaleEditForm";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import AccountMiddileWare from "../../../../redux/middleWare/accountMiddileWare";
import EntryTable from "./entryTable";
import { SaleUIProvider } from "../AccountUIContext";
import { update } from "lodash";
import SaleConfirmModal from "./Sale-confirmModal/SaleConfirmModal";
import { Divider } from "@material-ui/core";
import { Table } from "react-bootstrap";
import SalePrintDialog from "./SalePrint/PrintModal";
import { toast } from "react-toastify";
import {
  printElm,
  exchange,
  AvaliableProductQuantity,
  AmountTotal,
} from "../../../../redux/constants";
import { withRouter } from "react-router-dom";
import ReturnTable from "./returnTable";

function SaleEdit(props) {
  const [initProduct, setInitProduct] = useState({
    // date: new Date(),
    // price: 0,
    // quantity: 1,
    // bar_code: "",
    // product_name: "",
    // TotalAmount: 0,
    // Customer_name: props.CustomerReducer.entities
    //   .filter(obj => obj.CustomerName.toLowerCase() === 'walking customer')[0] ? props.CustomerReducer.entities.filter(obj => obj.CustomerName.toLowerCase() === 'walking customer')[0].db_id : null
  });
  let {
    history,
    match: {
      params: { id: paramsID },
    },
  } = props;
  useEffect(() => {
    if (props.CustomerReducer.entities
      .filter(obj => obj.CustomerName.toLowerCase() === 'walking customer')[0]) {
      setInitProduct({
        date: new Date(),
        price: 0,
        quantity: 1,
        bar_code: "",
        product_name: "",
        TotalAmount: 0,
        Customer_name: props.CustomerReducer.entities
          .filter(obj => obj.CustomerName.toLowerCase() === 'walking customer')[0] ? props.CustomerReducer.entities.filter(obj => obj.CustomerName.toLowerCase() === 'walking customer')[0].db_id : null
      })
      // console.log(props.CustomerReducer.entities
      //   .filter(obj => obj.CustomerName.toLowerCase() === 'walking customer')[0].db_id
      // )
    }
  }, [props.CustomerReducer])
  // Subheader

  let [invoicePath, SetInvoicePath] = useState("");
  useEffect(() => {
    SetInvoicePath(paramsID);
  }, [paramsID]);
  const suhbeader = useSubheader();
  const [Loading, setLoading] = useState(false);
  const [changeprops, setchangeprops] = useState(false);
  const [PrintModal, setPrintModal] = useState(false);
  const [bar_code, setbar_code] = useState("");
  let [cashBal, setCashBal] = useState("")

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
  let [assettype, setAssettype] = useState("Cash");
  const [title, setTitle] = useState("");
  const [payment_Type, setPayment_Type] = useState(
    assettype === "Cash" ? "Cash" : assettype === "Cheque" ? "Cheque" : null
  );
  const [entryArr, setEntryArr] = useState([]);
  const [entryArr2, setEntryArr2] = useState([]);
  const [entryArr3, setEntryArr3] = useState([])
  const [priceType, SetpriceType] = useState("retailPrice");
  let [percentagePrice, setPercentagePrice] = useState(0);
  let [percent, setPercent] = useState("%");
  let [paidPay, setPaidPay] = useState(0);
  let [checkDate, setCheckDate] = useState("");
  let [checkDes, setCheckDes] = useState("");
  const [avaliableQuantity, setAvaliableQuantity] = useState("");
  let [quan, setQuan] = useState("");
  let [autoFocus, setAutoFocus] = useState(true);
  const [CustomerName, setCustomerName] = useState("")
  const [Editdata, setEditData] = useState("")
  const [SaleForEdit, setSaleForEdit] = useState("");
  useEffect(() => {
    if (paramsID) {
      let Data = props.AccountReducer.All_entries.filter(
        (obj) => obj.db_id == paramsID
      )[0];
      let Data2 = props.AccountReducer.All_entries.filter(
        (obj) => obj.invoiceNumber == paramsID
      )[0];

      if (Data2) {
        let customerName = Data2.SaleItem[0].Customer_name;
        setInitProduct({
          ...initProduct,
          Customer_name: customerName,
        });


      }

      // );
      if (Data) {
        setEntryArr(Data.SaleItem);
        setReceivedPayment(Data.receivedPayment);
        setPayment_Type(Data.payment_Type);
        console.log(Data.SaleItem)
        setEditData(Data)
        setInitProduct({
          date: new Date(),
          price: 0,
          quantity: 1,
          bar_code: "",
          product_name: "",
          TotalAmount: 0,
          Customer_name: Data.SaleItem ? Data.SaleItem[0].Customer_name : null
        })

      }
    }
  }, [paramsID, props, entryArr]);
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
  useEffect(() => {
    console.log(Editdata)
  }, [Editdata])
  let [arr, setarr] = useState([]);
  let [confirm, setConfirm] = useState("");
  const update = (values, quantity, i) => {
    console.log("update runn")
    setConfirm(quantity);
    let arr = values;
    arr[i].quantity = quantity;
    setarr(arr);


    setchangeprops(!changeprops);

  };
  useEffect(() => {

    setEntryArr(arr);
    console.log("sett")

  }, [confirm]);

  const Delete = (i) => {
    setSaleForEdit("");
    if (entryArr3.length) {
      let oldArr = entryArr3;
      let arr = oldArr.splice(i, 1);
      if (paramsID && SaleForEdit) {
        setEntryArr3(arr);
      } else {
        setEntryArr3(oldArr);
      }
    } else {

      let oldArr = entryArr;
      let arr = oldArr.splice(i, 1);
      if (paramsID && SaleForEdit) {
        setEntryArr(arr);
      } else {
        setEntryArr(oldArr);
      }
    }
    setchangeprops(!changeprops);
  };
  useEffect(() => {
    let _title = id ? "Edit Sale" : "Add Sale";
    setTitle(_title);
    suhbeader.setTitle(_title);
  }, [SaleForEdit, id]);

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
      setEntryArr2(arr);
      setchangeprops(!changeprops);
      // console.log('this')
    } else {
      values.customer = customerid;
      values.product = props.ProductReducer.entities.filter(
        (obj) => obj.db_id == values.product_name
      )[0];
      setEntryArr([...entryArr, values]);
      setEntryArr2([...entryArr2, values]);
      if (props.AccountReducer.All_entries.filter(
        (obj) => obj.db_id == paramsID
      )[0]) {
        setEntryArr3([...entryArr, values]);
      }
      // console.log('that')
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

  const TotaltFn = () => {
    let TotalAmount = 0;
    let TotalQuantity = 0;
    let payable = 0;
    let paid = paidPay;
    let recievable = 0;
    let ReturnBalance = returnItem ? returnItem.returnBalance : 0;
    let netAmount = 0;
    // let ReturnBalance = 10;
    for (var i = 0; i < (entryArr3.length ? entryArr3.length : entryArr.length); i++) {
      TotalAmount += entryArr3.length ? Number(entryArr3[i].price * entryArr3[i].quantity) : Number(entryArr[i].price * entryArr[i].quantity);
      TotalQuantity += entryArr3.length ? Number(entryArr3[i].quantity) : Number(entryArr[i].quantity);
    }
    payable = ReturnBalance
      ? Number(TotalAmount) -
        Number(percentagePrice - ReturnBalance) +
        Number(paid) <
        0
        ? Number(TotalAmount) -
        Number(percentagePrice - ReturnBalance) +
        Number(paid)
        : 0
      : TotalAmount - percentagePrice;
    // recievable = payable > 0 ? payable : 0;
    recievable =
      Number(paidPay) + TotalAmount - Number(percentagePrice - ReturnBalance) >
        0
        ? Number(paidPay) +
        TotalAmount -
        Number(percentagePrice - ReturnBalance)
        : 0;
    netAmount =
      netAmount +
      (ReturnBalance
        ? TotalAmount - (percentagePrice - ReturnBalance)
        : TotalAmount - percentagePrice);
    return {
      TotalAmount,
      balance: paid ? ReturnBalance + TotalAmount - Number(percentagePrice) + Number(paid) :
        Number(receivedPayment) < TotalAmount
          ? TotalAmount - Number(receivedPayment) - Number(percentagePrice)
          : 0,
      ReturnAmount:
        Number(receivedPayment) > netAmount
          ? Number(receivedPayment) - netAmount
          : 0,
      receivedPayment,
      payment_Type,
      ReturnBalance: ReturnBalance ? ReturnBalance : null,
      TotalQuantity,
      discount: percentagePrice,
      netAmount,
      payable,
      recievable,
      paidPayment: paid
    };
  };
  let [ask, setAsk] = useState("")
  const Code = (value) => {
    let d = new Date();
    let year = makingLength_2(d.getFullYear(), 2);
    let month = makingLength_2(d.getMonth() + 1);
    let index = makingLength_2(value, 3);
    // return `${year}-${month}-${index}`;
    setbar_code(`${year}${month}${index}`);
    return value;
  };
  let [returnItem, setReturnItem] = useState("");
  const btnRef = useRef();
  // useEffect(()=>{console.log(receivedPayment)},[receivedPayment])
  const saveProductClick = (values, Bal) => {
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
        assettype: assettype,
        checkDes: checkDes,
        checkDate: checkDate,
        bankStatus: assettype.toLowerCase() === 'cheque' ? 'In Draw' : null,
        ...TotaltFn(),
        receivedPayment: Bal === 'cashBack' ? TotaltFn().receivedPayment - TotaltFn().ReturnAmount : Bal === 'bal' ? receivedPayment : TotaltFn().receivedPayment,
        balance: Bal === 'bal' ? TotaltFn().receivedPayment > TotaltFn().TotalAmount ? -(TotaltFn().balance + TotaltFn().ReturnAmount) : TotaltFn().balance + TotaltFn().ReturnAmount : Bal === 'cashBack' ? 0 : TotaltFn().balance,
        ReturnAmount: Bal === 'bal' ? 0 : TotaltFn().ReturnAmount,
        DeliveredBy: props.authReducer.user,
      });
    } else {
      if (props.AccountReducer.All_entries.filter(
        (obj) => obj.db_id == paramsID
      )[0]) {
        props.EditEntry({

          ...props.AccountReducer.All_entries.filter(
            (obj) => obj.db_id == paramsID
          )[0],
          ...TotaltFn(),
          priceType,
          SaleItem: entryArr3.length ? entryArr3 : entryArr,
          // TotalAmount,
        });
      } else if (props.AccountReducer.All_entries.filter(
        (obj) => obj.invoiceNumber == paramsID
      )[0]) {

        props.AddEntry({
          main_Heads: "Income",
          HeadType: "Sale",
          date: new Date().getTime(),
          SaleItem: entryArr,
          invoiceNumber: bar_code,
          priceType,
          assettype: assettype,
          checkDes: checkDes,
          checkDate: checkDate,
          ...TotaltFn(),
          receivedPayment: Bal === 'cashBack' ? TotaltFn().receivedPayment - TotaltFn().ReturnAmount : Bal === 'bal' ? receivedPayment : TotaltFn().receivedPayment,
          balance: Bal === 'bal' ? TotaltFn().balance + TotaltFn().ReturnAmount : Bal === 'cashBack' ? 0 : TotaltFn().balance,
          exchangeRef: paramsID,
          DeliveredBy: props.authReducer.user,
          bankStatus: assettype.toLowerCase() === 'Cheque' ? 'In Draw' : null,
        });
      }



      setReturnItem([]);
      props.history.push("/dashboard");
    }

    // let [percentagePrice, setPercentagePrice] = useState(0);
    // let [paidPay, setPaidPay] = useState("");
    setPaidPay("");
    setPercentagePrice(0);
    setEntryArr([]);
    setPrintModal(false);
    setReceivedPayment(0);
    setdiscount(0);
    // TotaltFn().discount=0
    // BackToSaleList();
  };
  useEffect(() => {
    console.log(entryArr)
  }, [entryArr])
  useEffect(() => {
    if (props.AccountReducer.All_entries && invoicePath) {
      setReturnItem(exchange(invoicePath, props.AccountReducer.All_entries));
    }
  }, [props.AccountReducer.All_entries, invoicePath]);
  const BackToSaleList = () => {
    history.push(`/Account/SaleList`);
  };

  return (
    <Card>
      {Loading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          {returnItem ? (
            <button
              type="button"
              // ref={btnRef}
              className="btn btn-light "
              onClick={() => {
                setEntryArr([]);
                setPrintModal(false);
                setReceivedPayment(0);
                if (returnItem) {
                  props.EditEntry({
                    ...props.AccountReducer.All_entries.filter(
                      (obj) => obj.invoiceNumber === invoicePath
                    )[0],
                    returnInvoice: "",
                  });
                  setTimeout(() => {

                    props.history.push('/Account/Sale/new')
                  }, 200);
                }
              }}
            >
              {" "}
              Clear (F4)
            </button>
          ) : (
              <button
                type="button"
                // ref={btnRef}
                className="btn btn-light "
                onClick={() => {
                  setEntryArr([]);
                  setPrintModal(false);
                  setReceivedPayment(0);
                  // if (returnItem) {
                  //   props.EditEntry({
                  //     ...props.AccountReducer.All_entries.filter(
                  //       (obj) => obj.invoiceNumber === invoicePath
                  //     )[0],
                  //     returnInvoice: "",
                  //   });
                  // }
                }}
              >
                {" "}
              Clear (F4)
              </button>
            )}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5 form-group row">
          <div className="col-lg-6">
            <Card style={{ padding: "20px", background: "aliceblue" }}>
              <SaleEditForm
                ButtonText={SaleForEdit !== "" ? "update Entry" : "Add Entry"}
                id={id}
                paramsID={paramsID}
                setSaleForEdit={setSaleForEdit}
                initialValues={SaleForEdit === "" ? initProduct : SaleForEdit}
                btnRef={btnRef}
                Entries={entryArr3.length ? entryArr3 : entryArr}
                SaleForEdit={SaleForEdit}
                saveSale={SaleForEdit === "" ? saveSale : update}
                returnItem={returnItem}
                avaliableQuantity={avaliableQuantity}
                setAvaliableQuantity={setAvaliableQuantity}
                autoFocus={autoFocus}
                setAutoFocus={setAutoFocus}
                CustomerName={CustomerName}
                setCustomerName={setCustomerName}
              />
            </Card>
          </div>
          <div
            className="col-lg-6"
            style={{
              height: "410px",
              overflow: "auto",
            }}
          >
            <SaleUIProvider SaleUIEvents={SaleUIEvents}>
              {entryArr.length || returnItem ? (
                <EntryTable
                  changeprops={changeprops}
                  ShowPagination={true}
                  Entries={entryArr3.length ? entryArr3 : entryArr}
                  setEntryArr={setEntryArr}
                  returnEntries={returnItem}
                  avaliableQuantity={avaliableQuantity}
                  update={update}
                  setAvaliableQuantity={setAvaliableQuantity}
                  setQuan={setQuan}
                  autoFocus={autoFocus}
                  setAutoFocus={setAutoFocus}
                  setConfirm={setConfirm}
                  paramsID={paramsID}
                />
              ) : null}
              {/* {
                 returnItem.returnInvoiceArr.length ? (
                <ReturnTable
                  changeprops={changeprops}
                  ShowPagination={true}
                  Entries={returnItem.returnInvoiceArr}
                />
              ) : null} */}
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
                setCashBal={setCashBal}
                setreceivedPayment={(ev) => setReceivedPayment(ev)}
                setdiscount={(ev) => setdiscount(ev)}
                setPayment_Type={(ev) => setPayment_Type(ev)}
                saveProductClick={() => setPrintModal(!PrintModal)}
                entryArr={entryArr3.length ? entryArr3 : entryArr}
                changeType={changeType}
                setPercentagePrice={setPercentagePrice}
                SetpriceType={SetpriceType}
                setPercent={setPercent}
                percent={percent}
                returnItem={returnItem}
                setPaidPay={setPaidPay}
                assets={props.AccountReducer.entities}
                setAssettype={setAssettype}
                checkDate={checkDate}
                setCheckDate={setCheckDate}
                checkDes={checkDes}
                setCheckDes={setCheckDes}
                ask={ask}
                setAsk={setAsk}
                initialValues={() => {
                  return {
                    assettype,
                    TotalAmount: TotaltFn().TotalAmount,
                    payment_Type,
                    receivedPayment: receivedPayment,
                    discount,
                    percentagePrice,
                    exchangeBalance: TotaltFn().ReturnBalance,
                    netAmount: TotaltFn().netAmount,
                  };
                }}
              />
            </Card>
          </div>
          <div className="col-lg-4">
            <Table borderless={true} className="col-md-12">
              <tbody>
                {TotaltFn().ReturnBalance ? (
                  <tr >
                    <th>Exchange Balance</th>
                    <td style={{ color: "red" }}>
                      Rs. {TotaltFn().ReturnBalance}/-
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th>Total Amount</th>
                  <td>Rs. {TotaltFn().TotalAmount}/-</td>
                </tr>
                {TotaltFn().discount ? (
                  <tr>
                    <th>Discount</th>
                    <td>Rs. (-{TotaltFn().discount}/-)</td>
                  </tr>
                ) : (
                    <tr>
                      <th>Discount</th>
                      <td>Rs. (0/-)</td>
                    </tr>
                  )}
                {/* pay amount */}
                <tr
                  style={{
                    borderTop: "2px solid #00000038",
                    borderBottom: "2px solid #00000038",
                  }}
                >
                  <th>Net Amount</th>
                  <td>Rs. {TotaltFn().netAmount}/-</td>
                </tr>
                {receivedPayment ? (
                  <tr>
                    <th>Payment Recieved</th>
                    <td>Rs. {receivedPayment}/-</td>
                  </tr>
                ) : null}
                {TotaltFn().payable && invoicePath && TotaltFn().payable < 0 ? (
                  <tr>
                    <th>Payable Amount</th>
                    <td>Rs. {-TotaltFn().payable}/-</td>
                  </tr>
                ) : TotaltFn().ReturnAmount ? (
                  <tr>
                    <th>Cash Back</th>
                    <td style={{ color: "red" }}>
                      Rs. ({TotaltFn().ReturnAmount}/-)
                    </td>
                  </tr>
                ) : (
                      <tr>
                        <th>Cash Back</th>
                        <td style={{ color: "red" }}>Rs. (0/-)</td>
                      </tr>
                    )}

                {TotaltFn().recievable ? (
                  <tr>
                    <th>Recievable Amount</th>
                    <td>Rs. {TotaltFn().recievable}/-</td>
                  </tr>
                ) : null}
                { }
                {TotaltFn().balance && !returnItem ? (
                  <tr>
                    <th>Current Balance</th>
                    <td>Rs. {TotaltFn().balance}/-</td>
                  </tr>
                ) : null}
                {/* {CustomerName && CustomerName.toLowerCase() != 'walking customer' ? */}
                {Number(AmountTotal(CustomerName ? CustomerName.value : CustomerName.value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance) != 0 ?
                  <tr onClick={() => console.log(CustomerName)}>
                    <th>Previous Balance</th>
                    <td> <b>Rs. {AmountTotal(CustomerName ? CustomerName.value : CustomerName.value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance}/- </b></td>
                  </tr>
                  : null}
                      <tr>
                        <th>Total Balance (crn + prv)</th>
                        <td><b>Rs. {Number(AmountTotal(CustomerName ? CustomerName.value : CustomerName.value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance)
                          + Number(cashBal === 'cashBack' ? '0' : cashBal === 'bal' ? TotaltFn().balance : TotaltFn().balance)}/-</b></td>
                      </tr>
                {/* : null} */}
              </tbody>
            </Table>
          </div>
          <SalePrintDialog
            show={PrintModal}
            SaveAndPrint={saveProductClick}
            onHide={() => {
              setPrintModal(!PrintModal);
            }}
            ask={ask}
            CalculationTable={() => {
              return (
                <table borderless={true} className="col-md-12">
                  <tbody>
                    {TotaltFn().ReturnBalance ? (
                      <tr>
                        <th>Exchange Balance</th>
                        <td style={{ color: "red" }}>
                          Rs. {TotaltFn().ReturnBalance}/-
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <th>Total Amount</th>
                      <td>Rs. {TotaltFn().TotalAmount}/-</td>
                    </tr>
                    {TotaltFn().discount ? (
                      <tr>
                        <th>Discount</th>
                        <td>Rs. (-{TotaltFn().discount}/-)</td>
                      </tr>
                    ) : (
                        <tr>
                          <th>Discount</th>
                          <td>Rs. (0/-)</td>
                        </tr>
                      )}
                    {/* pay amount */}
                    <tr
                      style={{
                        borderTop: "2px solid #00000038",
                        borderBottom: "2px solid #00000038",
                      }}
                    >
                      <th>Net Amount</th>
                      <td>Rs. {TotaltFn().netAmount}/-</td>
                    </tr>
                    {receivedPayment ? (
                      <tr>
                        <th>Payment Recieved</th>
                        <td>Rs. {receivedPayment}/-</td>
                      </tr>
                    ) : null}
                    {TotaltFn().payable && invoicePath && TotaltFn().payable < 0 ? (
                      <tr>
                        <th>Payable Amount</th>
                        <td>Rs. {-TotaltFn().payable}/-</td>
                      </tr>
                    ) : TotaltFn().ReturnAmount ? (
                      <tr>
                        <th>Cash Back</th>
                        <td style={{ color: "red" }}>
                          {cashBal === 'bal' ? `0` : cashBal === 'cashBack' ? `Rs. (${TotaltFn().ReturnAmount}/-)` : `Rs. (${TotaltFn().ReturnAmount}/-)`}
                        </td>
                      </tr>
                    ) : (

                          <tr>
                            <th>Cash Back</th>
                            <td style={{ color: "red" }}>Rs. (0/-)</td>
                          </tr>
                        )}

                    {TotaltFn().recievable ? (
                      <tr>
                        <th>Recievable Amount</th>
                        <td>Rs. {TotaltFn().recievable}/-</td>
                      </tr>
                    ) : null}
                    {TotaltFn().balance && !returnItem ? (
                      <tr style={{
                        borderTop: "2px solid #00000038",
                        // borderBottom: "2px solid #00000038",
                        marginTop: '15px'
                      }}>
                        <th>Current Balance</th>
                        <td>{cashBal === 'cashBack' ? `0` : cashBal === 'bal' ? ` Rs. ${TotaltFn().balance}/-` : ` Rs. ${TotaltFn().balance}/-`}</td>
                      </tr>
                    ) : null}
                    {/* {CustomerName.toLowerCase() != 'walking customer' ? */}
                    {Number(AmountTotal(CustomerName ? CustomerName.value : CustomerName.value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance) != 0 ?
                      <>
                        <tr
                          onClick={() => console.log(CustomerName)}>
                          <th>Previous Balance</th>
                          <td><b>Rs. {AmountTotal(CustomerName ? CustomerName.value : CustomerName.value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance}/-</b></td>
                        </tr>
                      </>
                      : null}
                    {/* {TotaltFn().balance && !returnItem ? ( */}
                      <tr>
                        <th>Total Balance (crn + prv)</th>
                        <td><b>Rs. {Number(AmountTotal(CustomerName ? CustomerName.value : CustomerName.value, props.AccountReducer.All_entries, props.AccountReducer.Account_entries, props.CustomerReducer.entities).TotalBalance)
                          + Number(cashBal === 'cashBack' ? '0' : cashBal === 'bal' ? TotaltFn().balance : TotaltFn().balance)}/-</b></td>
                      </tr>
                    {/* ) : null} */}
                    {/* : null} */}
                  </tbody>
                </table>
              );
            }}
            receivedPayment={receivedPayment}
            Entry={entryArr}
            invoice={Editdata ? Editdata.invoiceNumber : bar_code}
            component={() => {
              return (
                <SaleUIProvider SaleUIEvents={SaleUIEvents}>
                  {entryArr.length ? (
                    <EntryTable
                      TotalAmount={TotaltFn().TotalAmount}
                      TotalQuantity={TotaltFn().TotalQuantity}
                      ShowPagination={false}
                      Entries={entryArr3.length ? entryArr3 : entryArr}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SaleEdit));
