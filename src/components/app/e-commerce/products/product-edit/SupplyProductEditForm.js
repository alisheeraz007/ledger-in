// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, Card } from "../../../../../_metronic/_partials/controls";
import { Dropdown, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Table } from "react-bootstrap";
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  ProductStatusTitles,
  ProductConditionTitles,
} from "../ProductsUIHelpers";
import { throttle } from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { currentBalance } from "../../../../redux/constants";
// import { totalfn } from "./../../../../redux/constants";
import SalePrintDialog from './SalePrint/PrintModal'
import { ProductsUIProvider } from "../ProductsUIContext";
import EntryTable from './entryTable'
// Validation schema
const ProductEditSchema = Yup.object().shape({
  product_name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("product Name is required"),
  quantity: Yup.number()
    .min(0, "0 is minimum")
    .max(1000000, "1000000 is maximum")
    .required("quanity is required"),
  color: Yup.string().required("Color is required"),
  price: Yup.number()
    .min(1, "$1 is minimum")
    .max(1000000, "$1000000 is maximum")
    .required("Price is required"),
  bar_code: Yup.string().required("Bar code is required"),
});

function SupplyProductEditForm({
  product,
  btnRef,
  saveProduct,
  Code,
  setTotalAmount,
  // totalfn,
  setTotal,
  supplier,
  // price,
  // setPrice,
  // setQty,
  // qty
  assets,
  AccEn,
  productsArr,
  purchaseInvoice,
  setProAdd,
  user,
  proEditArr,
  id
}, props) {

  const productsUIEvents = {
    newProductButtonClick: () => {
      props.history.push("/e-commerce/products/new");
    },
    openEditProductPage: (id) => {
      props.history.push(`/e-commerce/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      props.history.push(`/e-commerce/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      props.history.push(`/e-commerce/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      props.history.push(`/e-commerce/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      props.history.push("/e-commerce/products/updateStatus");
    },
  };
  const [OptionList, setOptionList] = useState([]);
  let [date, setDate] = useState(new Date());
  let [qty, setQty] = useState("");
  let [price, setPrice] = useState("");
  let [paid, setPaid] = useState("");
  let [totalArr, setTotalArr] = useState("");
  let [method, setMethod] = useState("");
  let [assettype, setAssettype] = useState("Cash");
  let [paymentmode, setPaymentMode] = useState('Cash')
  const [payment_Type, setPayment_Type] = useState(
    assettype === "Cash" ? "Cash" : assettype === "Cheque" ? "Cheque" : null
  );
  let [checkDate, setCheckDate] = useState("");
  let [checkDes, setCheckDes] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [ProductStat, setProductStat] = useState([])
  let [ProductsArray, setProductArr] = useState([]);
  let [productObj, setProductObj] = useState({})
  useEffect(() => {
    if (proEditArr) {
      setProductArr(proEditArr)
    }
  }, [proEditArr])

  // function totalfn(price, qty, paid) {
  //   let TotalAmount = 0;
  //   let paymentPaid = 0;
  //   let balance = 0;
  //   TotalAmount += Number(price) * Number(qty);
  //   paymentPaid += Number(paid);
  //   balance += TotalAmount - paymentPaid;
  //   return {
  //     TotalAmount,
  //     paymentPaid,
  //     balance,
  //   };
  // }
  // useEffect(() => {
  //   console.log(ProductStat, "pro")
  // }, [ProductStat])
  function TotaltFn(Total, qty, Paid, bal, price) {
    let TotalAmount = 0;
    let quantity = 0;
    let PaymentPaid = 0;
    let balance = 0;
    let productPrice = 0;
    let TotalBalance = 0;

    if (qty) {
      quantity += Number(qty)
    }
    if (ProductStat.length) {
      ProductStat.map((a, i) => {
        TotalAmount += Number(a.price) * Number(a.quantity)
      })
      // TotalAmount += Number(price) * Number(qty)
    }
    if (Paid) {
      PaymentPaid += Number(Paid)
    }
    if (TotalAmount || Paid) {
      balance += Paid ? Number(TotalAmount) - Number(Paid) : Number(TotalAmount)
      // console.log(TotalAmount, Paid)
    }
    if (productsArr &&
      supplier &&
      AccEn) {
      TotalBalance += currentBalance(
        false,
        supplier,
        AccEn,
        props.SupplyProductReducer ? props.SupplyProductReducer.entities :null,
      )
    }
    return {
      TotalAmount: TotalAmount,
      quantity: quantity,
      balance: balance,
      PaymentPaid: PaymentPaid,
      TotalBalance: TotalBalance ? TotalBalance + balance : 0,
      previousBalance: TotalBalance

    }







    // let ReturnBalance = 10;
    // for (var i = 0; i < entryArr.length; i++) {
    //   TotalAmount += Number(entryArr[i].price * entryArr[i].quantity);
    //   TotalQuantity += Number(entryArr[i].quantity);
    // }
    // payable = ReturnBalance
    //   ? Number(TotalAmount) -
    //     Number(percentagePrice - ReturnBalance) +
    //     Number(paid) <
    //     0
    //     ? Number(TotalAmount) -
    //     Number(percentagePrice - ReturnBalance) +
    //     Number(paid)
    //     : 0
    //   : TotalAmount - percentagePrice;
    // // recievable = payable > 0 ? payable : 0;
    // recievable =
    //   Number(paidPay) + TotalAmount - Number(percentagePrice - ReturnBalance) >
    //     0
    //     ? Number(paidPay) +
    //     TotalAmount -
    //     Number(percentagePrice - ReturnBalance)
    //     : 0;
    // netAmount =
    //   netAmount +
    //   (ReturnBalance
    //     ? TotalAmount - (percentagePrice - ReturnBalance)
    //     : TotalAmount - percentagePrice);
    // return {
    // TotalAmount,
    // balance:
    //   Number(receivedPayment) < TotalAmount
    //     ? TotalAmount - Number(receivedPayment) - Number(percentagePrice)
    //     : 0,
    // ReturnAmount:
    //   Number(receivedPayment) > netAmount
    //     ? Number(receivedPayment) - netAmount
    //     : 0,
    // receivedPayment,
    // payment_Type,
    // ReturnBalance: ReturnBalance ? ReturnBalance : null,
    // TotalQuantity,
    // discount: percentagePrice,
    // netAmount,
    // payable,
    // recievable,
    // };
  };
  useEffect(() => {
    // setTotalArr(totalfn(price, qty, paid));
    setTotalArr(0);
  }, [price, qty, paid]);
  useEffect(() => {
    let arr = AVAILABLE_COLORS;
    let arr2 = [];
    for (var i = 0; i < arr.length; i++) {
      arr2.push({
        name: arr[i],
        value: arr[i],
        text: arr[i],
      });
    }
    setOptionList(arr2);
  }, []);
  function AddEntryFn(values) {
    let obj = {
      bar_code: values.bar_code,
      product_name: values.product_name,
      color: values.color,
      quantity: values.quantity,
      price: values.price,
      wholeSalePrice: values.wholeSalePrice,
      retailPrice: values.retailPrice,
      date: values.date,
      TotalAmount: values.TotalAmount ? values.TotalAmount : 0,
      PaymentPaid: values.PaymentPaid ? values.PaymentPaid : 0,
      date: date.getTime()
    }
    setProductArr([...ProductsArray, obj])
    // console.log(ProductsArray)
  }
  function removePro(obj) {
    ProductsArray.splice(ProductStat.indexOf(obj), 1)
    setProductArr(ProductsArray.splice(ProductStat.indexOf(obj), 1))

  }
  // console.log(ProductsArray)

  let [edit, setEdit] = useState(false)
  let [editObj, setEditObj] = useState("")
  function editPro(obj, setFieldValue, values) {
    setEditObj(obj)
    setDate(obj.date)
    setFieldValue("bar_code", obj.bar_code);
    setFieldValue("product_name", obj.product_name);
    setFieldValue("color", obj.color);
    setFieldValue("quantity", obj.quantity);
    setFieldValue("price", obj.price)
    setFieldValue("wholeSalePrice", obj.wholeSalePrice)
    setFieldValue("retailPrice", obj.retailPrice)
    setFieldValue("description", obj.description)
    // ProductsArray.splice(ProductStat.indexOf(obj), 0, values)
    // console.log(ProductsArray.splice(ProductStat.indexOf(obj), 0, values))
    // console.log(ProductStat.indexOf(obj))
    setEdit(true)
  }
  // useEffect(() => {
  //   if (productObj) {
  //   }
  // }, [productObj])
  useEffect(() => {
    // console.log(ProductsArray)
    setProAdd(ProductsArray)
    setProductStat(ProductsArray)

  }, [ProductsArray])
  // console.log(user)
  let [purchaseObj, setPurchaseObj] = useState({})
  function printModalFn(values, totalAmount, balance) {
    let obj = {
      purchasedBy: user,
      purchasedItems: ProductStat,
      supplier: supplier,
      purchaseInvoice: purchaseInvoice,
      TotalAmount: totalAmount,
      balance: balance,
      assettype: assettype,
      checkDate: checkDate,
      checkDes: checkDes,
      payment_Type: payment_Type,
      payment_mode: assettype,
      paid: "paid",
      TotalBalance: productsArr && supplier && AccEn ? currentBalance(
        productsArr,
        supplier,
        AccEn
      ) : null,
      PaymentPaid: values.PaymentPaid ? values.PaymentPaid : 0,
      date: date.getTime()
    }

    // console.log(values, obj)
    setPurchaseObj(obj)
    handleShow()


  }
  function editEntry(values) {
    let obj = {
      bar_code: values.bar_code,
      product_name: values.product_name,
      color: values.color,
      quantity: values.quantity,
      price: values.price,
      wholeSalePrice: values.wholeSalePrice,
      retailPrice: values.retailPrice,
      date: values.date,
      TotalAmount: values.TotalAmount ? values.TotalAmount : 0,
      PaymentPaid: values.PaymentPaid ? values.PaymentPaid : 0,
      date: typeof values.date === 'number' ? values.date : date
    }
    // console.log(date)
    // console.log(ProductStat.indexOf(editObj))
    // console.log(ProductsArray.splice(ProductStat.indexOf(editObj), 1))
    // console.log(ProductsArray.splice(ProductStat.indexOf(editObj), 1, obj))
    // console.log(ProductStat, editObj)

  }

  // useEffect(() => { console.log(purchaseObj) }, [purchaseObj])
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
      // onSubmit={(values) => {
      //   handleShow()
      //   // saveProduct({ ...values, date, paid: "paid", assettype: assettype ? assettype : "Cash", payment_mode: paymentmode }, totalArr);
      //   setDate(new Date());
      // }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <div className="row col-lg-12">

              <Card
                style={{ padding: "20px", background: "aliceblue" }}
                className="col-lg-7"
              >
                <Form className="form form-label-right">
                  <div className="form-group row">
                    <div
                      className="col-lg-4"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label>Date</label>
                      <DatePicker
                        name="date"
                        label="Date"
                        placeholderText="Date"
                        className="form-control"
                        style={{ width: "40%" }}
                        selected={date}
                        onChange={(ev) => {
                          // getvalue(e, "from");
                          // setFieldValue("date", ev);
                          setDate(ev);
                        }}
                      />
                    </div>

                    <div className="col-lg-4">
                      <Field
                        name="bar_code"
                        component={Input}
                        disabled={true}
                        onChange={(ev) => {
                          setFieldValue("bar_code", Code(ev.target.value));
                        }}
                        placeholder="Bar code"
                        label="Bar code"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="product_name"
                        component={Input}
                        placeholder="Product Name"
                        label="Product Name"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label>Color</label>
                      <br />
                      <Dropdown
                        placeholder="Color"
                        fluid
                        search
                        value={values.color}
                        selection
                        scrolling
                        allowAdditions
                        onAddItem={(ev, { value }) =>
                          setOptionList([
                            {
                              name: value,
                              value: value,
                              text: value,
                            },
                            ...OptionList,
                          ])
                        }
                        options={OptionList}
                        name="color"
                        onChange={(e, { value }) => {
                          setFieldValue("color", value);
                        }}
                      />
                    </div>
                    {/* </div> */}
                    {/* <div className="form-group row"> */}
                    <div className="col-lg-4">
                      <Field
                        type="number"
                        name="quantity"
                        component={Input}
                        value={values.quantity}
                        placeholder="Quantity"
                        label="Quantity"
                        customFeedbackLabel="Please enter Quantity"
                        onChange={(ev) => {
                          setFieldValue("quantity", ev.target.value);
                          setQty(ev.target.value);
                          // props.setQty(ev.target.value)
                        }}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        type="number"
                        name="price"
                        component={Input}
                        value={values.price}
                        placeholder="Cost Price"
                        label="Cost Price "
                        onChange={(ev) => {
                          setFieldValue("price", ev.target.value);
                          setPrice(ev.target.value);
                          // props.setPrice(ev.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        type="number"
                        name="wholeSalePrice"
                        component={Input}
                        placeholder="WholeSale Price"
                        label="WholeSale Price"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        type="number"
                        name="retailPrice"
                        component={Input}
                        placeholder="Retail Price"
                        label="Retail Price "
                      />
                    </div>


                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <Field
                      name="description"
                      as="textarea"
                      className="form-control"
                    />
                  </div>
                  {edit ?
                    <button
                      type="button"
                      className="btn btn-primary ml-2"
                      onClick={() => editEntry(values)}
                      // onSubmit={() => {
                      //   setFieldValue("PaymentPaid", "")

                      //   // handleSubmit();
                      // }}
                      style={{ float: "right" }}
                    // ref={btnRef}
                    >
                      Edit Item
                    </button>
                    :
                    <button
                      disabled={id ? true : false}
                      type="button"
                      className="btn btn-primary ml-2"
                      // style={id ? { cursor: 'grab',background:'black' } : null}
                      onClick={() => AddEntryFn(values)}
                      // onSubmit={() => {
                      //   setFieldValue("PaymentPaid", "")

                      //   // handleSubmit();
                      // }}
                      style={id ? { cursor: 'not-allowed', float: "right" } : { float: "right" }}
                    // ref={btnRef}
                    >
                      {id ?
                        "You Are Editing Previous Invoice You Can't Add New Items"
                        : 'Add Item'
                      }
                    </button>
                  }
                  <SalePrintDialog
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    // assettype={assettype}
                    // paymentmode={paymentmode}
                    // totalArr={totalArr}
                    saveProduct={saveProduct}
                    setProductStat={setProductStat}
                    supplier={supplier}
                    setProductArr={setProductArr}

                    // purchaseInvoice={purchaseInvoice}
                    CalculationTable={() => {
                      return (
                        <table borderless={true} className="col-md-12" style={{ fontSize: "11px" }}>
                          <tbody>
                            <tr>
                              <th>Total Amount</th>
                              <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).TotalAmount}/-</td>
                            </tr>
                            <tr>
                              <th>Paid Amount</th>
                              <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).PaymentPaid}/-</td>
                            </tr>
                            <tr>
                              <th>Previous Balance</th>
                              <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).previousBalance}/-</td>
                            </tr>
                            <tr>
                              <th>Current Balance Balance</th>
                              <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).balance}/-</td>
                            </tr>
                            <tr style={{ borderTop: '1px solid #EBEDF3' }}>
                              <th>Total Balance (crn + prv)</th>
                              <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).TotalBalance}/-</td>
                            </tr>

                          </tbody>
                        </table>
                      );
                    }}
                    values={purchaseObj}
                  />
                  {/* <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button> */}
                </Form>
              </Card>
              <div className="col-lg-5">
                <EntryTable Entries={ProductStat} removePro={removePro} setFieldValue={setFieldValue} editPro={editPro} values={values}
                  from={"formTable"} setProductArr={setProductArr} productsArr={ProductsArray} setProductStat={setProductStat}
                />
              </div>
            </div>
            <div className="row col-lg-12">
              <Card
                style={{ padding: "20px", background: "aliceblue" }}
                className="col-lg-8">
                <Form className="row">
                  <div className="col-lg-4">
                    <Field
                      type="number"
                      name="TotalAmount"
                      disabled
                      value={TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).TotalAmount}
                      component={Input}
                      placeholder="Total Amount"
                      label="Total Amount"
                    />
                  </div>

                  <div className="col-lg-4">
                    <Field
                      type="number"
                      name="PaymentPaid"
                      value={values.PaymentPaid}
                      component={Input}
                      placeholder="Payment Paid"
                      label="Payment Paid"
                      onChange={(ev) => {
                        setFieldValue("PaymentPaid", ev.target.value);
                        setPaid(ev.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      type="number"
                      name="Balance"
                      disabled
                      value={TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).balance}
                      component={Input}
                      placeholder="Balance Amount"
                      label="Balance Amount"
                    />
                  </div>
                  <div className=" col-lg-4">
                    <Select
                      // disabled={id ? true : false}
                      name="assettype"
                      label="Payment Through"
                      defaultValue="Cash"
                      onChange={(ev) => {
                        setMethod(ev.target.value);
                        setAssettype(ev.target.value);
                        setFieldValue("assettype", ev.target.value);
                        setPaymentMode("payment_mode", ev.target.value);
                      }}
                    >
                      <option value={""}>Select.....</option>
                      {assets
                        .filter((obj) => obj.main_Heads === "Assets" && (obj.HeadType.toLowerCase() === 'cash' || obj.HeadType.toLowerCase() === 'bank' || obj.HeadType.toLowerCase() === 'cheque'))
                        .map((Head) => (
                          <option key={Head.HeadType} value={Head.HeadType}>
                            {Head.HeadType}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {method !== "Cash" && method ? (
                    <div className="col-lg-4">
                      <Select
                        // disabled={id ? true : false}
                        name="payment_Type"
                        label="Payment Type"
                        defaultValue={assettype === "Cheque" ? "Cheque" : null}
                        onChange={(ev) => {
                          // setMethod(ev.target.value);
                          setPayment_Type(ev.target.value);
                          setFieldValue("payment_Type", ev.target.value);
                        }}
                      >
                        <option value={""}>Select.....</option>
                        {assets
                          .filter((obj) => obj.HeadType === method)
                          .map((Head) =>
                            Head.types.map((a, i) => {
                              return (
                                <option key={a.type} value={a.type}>
                                  {a.type}
                                </option>
                              );
                            })
                          )}
                      </Select>
                    </div>
                  ) : (
                      setPayment_Type("Cash")
                    )}

                  {method !== "Cash" && method !== "Bank" && method ? (
                    <>
                      <div className="col-lg-4">
                        <Field
                          name="checkDate"
                          component={Input}
                          onChange={(ev) => {
                            setCheckDate(new Date(ev.target.value).getTime());
                            setFieldValue("checkDate", ev.target.value);
                          }}
                          placeholder="Date"
                          label="Expiry Date"
                          type="date"
                        />
                      </div>
                      <div className="col-lg-12">
                        <Field
                          name="checkDes"
                          component={Input}
                          onChange={(ev) => {
                            setCheckDes(ev.target.value);
                            setFieldValue("checkDes", ev.target.value);
                          }}
                          placeholder="Check Description"
                          label="Description"
                        />
                      </div>
                    </>
                  ) : null}

                  <div className="col-lg-4" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <button
                      type="button"
                      className="btn btn-primary ml-2"
                      onClick={() => {
                        printModalFn(values,
                          TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).TotalAmount,
                          TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).balance);
                        // console.log(values, "values")
                      }}
                      // onSubmit={() => {
                      //   setFieldValue("PaymentPaid", "")

                      //   handleSubmit();
                      // }}
                      style={{ float: "right" }}
                    // ref={btnRef}
                    >
                      Purchase
              </button>
                  </div>
                </Form>
              </Card>
              <div className="col-lg-4">
                <Table borderless={true} className="col-md-12">
                  <tbody>
                    {/* {TotaltFn().ReturnBalance ? (
                    <tr >
                    <th>Exchange Balance</th>
                      <td style={{ color: "red" }}>
                      Rs. {TotaltFn().ReturnBalance}/-
                      </td>
                      </tr>
                    ) : null} */}
                    <tr>
                      <th>Total Amount</th>
                      <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).TotalAmount}/-</td>
                    </tr>
                    <tr>
                      <th>Paid Amount</th>
                      <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).PaymentPaid}/-</td>
                    </tr>
                    <tr>
                      <th>Balance</th>
                      <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).balance}/-</td>
                    </tr>

                    <tr onClick={() => console.log(currentBalance(
                      productsArr,
                      supplier,
                      AccEn
                    ))} style={{ borderTop: '1px solid #EBEDF3' }}>
                      <th>Total Balance</th>
                      <td>Rs. {TotaltFn(values.TotalAmount, values.quantity, values.PaymentPaid, values.ReturnBalance, values.price).TotalBalance}/-</td>
                    </tr>

                  </tbody>
                </Table>
              </div>

            </div>
          </>
        )}
      </Formik>

    </>
  );
}
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
)(withRouter(SupplyProductEditForm));