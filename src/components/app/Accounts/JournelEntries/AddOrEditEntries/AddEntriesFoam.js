// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import { AVAILABLE_COLORS, Main_Heads } from "../AccountUIHelpers";
import { Dropdown, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { currentBalance, paymentMode, paymentModeTypes } from "./../../../../redux/constants";
import JournalPrintDialog from './SalePrint/PrintModal'

// Validation schema
const MasterHeadEditSchema = Yup.object().shape({});

function JouneralEntriesForm({
  initialValues,
  btnRef,
  saveEntries,
  id,
  saveHeadTypes,
  setSelectedAccount,
  TypeButtonText,
  TypeForEdit,
  setAssettype,
  assettype,
  setCheckDate,
  checkDate,
  assets,
  setPayment_Type,
  payment_Type,
  setPayment_method,
  Payment_method,
  ...props
}) {
  let [main_Heads, setmain_Heads] = useState("Expenses");
  let [TypeValue, setTypeValue] = useState("");
  let [HeadTypeList, setHeadTypeList] = useState([]);
  let [TypeList, setTypeList] = useState([]);
  let [selectedVal, setSelectedVal] = useState("");
  let [price, setprice] = useState("");
  let [ShowInput, setShowInput] = useState(false);
  let [method, setMethod] = useState("");
  let [CheckDes, setCheckDes] = useState("");
  const [show, setShow] = useState(false);
  const [purchaseInvoice, setPurchaseInvoice] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    // clear selections list
    if (props.AccountReducer.entities) {
      let arr = props.AccountReducer.entities;
      //   return ;
      // });
      let arr2 = [];
      setHeadTypeList([]);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].main_Heads === main_Heads) {
          arr2.push({
            name: arr[i].HeadType,
            value: arr[i].HeadType,
            text: arr[i].HeadType,
            main_Heads: arr[i].main_Heads,
          });
        }
      }
      setHeadTypeList(arr2);
    }
  }, [props.AccountReducer.entities, main_Heads, id]);
  useEffect(() => {
    if (id) {
      setSelectedVal(initialValues.HeadType);
      setmain_Heads(initialValues.main_Heads);
    }
  }, [id, props]);
  useEffect(() => {
    if (TypeForEdit) {
      setTypeValue(
        typeof TypeForEdit === "string" ? TypeForEdit : TypeForEdit.type
      );
      setprice(typeof TypeForEdit === "string" ? "" : TypeForEdit.price);
      initialValues.type =
        typeof TypeForEdit === "string" ? TypeForEdit : TypeForEdit.type;
      initialValues.price =
        typeof TypeForEdit === "string" ? "" : TypeForEdit.price;

      setShowInput(true);
    }
  }, [TypeForEdit]);
  const HandleSelect = (e, { value }) => {
    setSelectedAccount(value);
    setSelectedVal(value);
    let typeArr = [];
    let arr = props.AccountReducer.entities;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].HeadType === value && arr[i].types && arr[i].main_Heads === main_Heads) {
        for (var j = 0; j < arr[i].types.length; j++) {
          let type = arr[i].types[j];
          typeArr.push({
            name: typeof type === "string" ? type : type.type,
            value: typeof type === "string" ? type : type.type,
            text: typeof type === "string" ? type : type.type,
            HeadType: arr[i].HeadType,
          });
        }
      }
    }
    setTypeList(typeArr);
  };
  let [supplier, setSupplier] = useState("");
  let [supplierOpt, setSupplierOpt] = useState("");

  // useEffect(() => {}, [props.SupplierReducer]);
  useEffect(() => {
    if (props.SuppliersReducer) {
      props.SuppliersReducer.entities &&
        props.SuppliersReducer.entities.map((Head) => (
          <option key={Head.db_id} value={Head.db_id}>
            {Head.product_name}
          </option>
        ));
    }
    if (props.SupplierReducer) {
      let arr = props.SupplierReducer.entities;
      let arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push({
          name: arr[i].SupplierName,
          value: arr[i],
          text: i == 0 ? arr[i].SupplierName : arr[i].SupplierName,
        });
      }
      setSupplierOpt(arr2);
    }
  }, [props.SupplierReducer]);
  let [customer, setCustomer] = useState("");
  let [customerOpt, setCustomerOpt] = useState("");
  useEffect(() => {
    if (props.CustomerReducer) {
      props.CustomerReducer.entities &&
        props.CustomerReducer.entities.map((Head) => (
          <option key={Head.db_id} value={Head.db_id}>
            {Head.product_name}
          </option>
        ));
    }
    if (props.CustomerReducer) {
      let arr = props.CustomerReducer.entities;
      let arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push({
          name: arr[i].CustomerName,
          value: arr[i],
          text: i == 0 ? arr[i].CustomerName : arr[i].CustomerName,
        });
      }
      setCustomerOpt(arr2);
    }
  }, [props.SupplierReducer]);

  // useEffect(() => { console.log(assets) }, [assets])
  // useEffect(() => {
  //   if (props.AccountReducer.entities) {
  //     let arr = props.AccountReducer.entities.filter(obj => obj.main_Heads.toLowerCase() === 'assests')
  //     console.log(arr.filter(obj => obj.HeadType === payment_Type)[0].types)
  //     console.log(arr)
  //   }
  // }, [payment_Type, props.AccountReducer])
  useEffect(() => {
    if (props.AccountReducer.Account_entries) {
      let arr = props.AccountReducer.Account_entries.filter(
        (obj) =>
          obj.journalInvoice &&
          obj.journalInvoice.toString().slice(3, 5) ==
          makingLength_3(new Date().getMonth() + 1) &&
          obj.journalInvoice.toString().slice(1, 3) ==
          makingLength_3(new Date().getFullYear(), 2)
      ).map((a, i) => {
        return a.journalInvoice;
      });
      let sort = arr.sort(
        (a, b) => Number(b.toString().slice(5)) - Number(a.toString().slice(5))
      );
      // console.log(arr)
      if (sort.length < 1) {
        Code2(1);
      } else {
        Code2(Number(sort[0].toString().slice(5)) + 1, "hsadusajiuj");
      }
    }
  }, [props]);

  const makingLength_3 = (value, length) => {
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

  const Code2 = (value) => {
    let d = new Date();
    let year = makingLength_3(d.getFullYear(), 2);
    let month = makingLength_3(d.getMonth() + 1);
    let index = makingLength_3(value, 3);
    // return `${year}-${month}-${index}`;
    setPurchaseInvoice(`J${year}${month}${index}`);
    // console.log(`J${year}${month}${index}`);
    return value;
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        // validationSchema={MasterHeadEditSchema}
        onSubmit={(values, action) => {
          if (values.HeadType && (values.HeadType.toLowerCase() === "account recievable" || values.HeadType.toLowerCase() === "account payable")) {
            handleShow(true)

          } else {

            saveEntries({
              ...values,
              assettype: values.assettype ? values.assettype : "Cash",
              previousBalance: currentBalance(
                props.SupplyProductReducer.entities,
                supplier,
                props.AccountReducer.Account_entries,
              ),
              type: values.type ? values.type : "Expense",
              bankStatus: values.payment_Type === 'Cheque' ? 'In Draw' : null,
              journalInvoice: purchaseInvoice,
              user: props.authReducer.user
            });
            // setmain_Heads(ev.target.value);
            action.setFieldValue("HeadType", '')
            action.setFieldValue('assettype', '')
            action.setFieldValue('type', '')
            action.setFieldValue("Customer", '');
            action.setFieldValue('supplier', '')
            action.setFieldValue("payment_Type", '');
            action.setFieldValue("payment_mode", '');
            action.setFieldValue("Payment_method", "");
            action.setFieldValue("price", '');
            action.setFieldValue("assettype", '');
            action.setFieldValue("checkDate", '');
            action.setFieldValue("checkDes", '');
            action.setFieldValue("description", '');
            // action.setFieldValue("main_Heads",main_Heads);
          }
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          setValues,
          resetForm,
          handleReset,
        }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group col-lg-12">
                <div className="col-lg-6">
                  <Select
                    disabled={id ? true : false}
                    name="main_Heads"
                    label="Head"
                    onChange={(ev) => {
                      setmain_Heads(ev.target.value);
                      setFieldValue("HeadType", '')
                      setFieldValue('assettype', '')
                      setFieldValue('type', '')
                      setFieldValue("Customer", '');
                      setFieldValue('supplier', '')
                      setFieldValue("payment_Type", '');
                      setFieldValue("payment_mode", '');
                      setFieldValue("Payment_method", "");
                      setFieldValue("price", '');
                      setFieldValue("assettype", '');
                      setFieldValue("checkDate", '');
                      setFieldValue("checkDes", '');
                      setFieldValue("description", '');
                      setFieldValue("main_Heads", ev.target.value);
                    }}
                  >
                    {/* {Main_Heads.map((Head) => ( */}
                    <option value="Expense">
                      Expenses
                    </option>
                    {/* ))} */}
                  </Select>
                </div>
                <div className="row mt-5 col-lg-12">
                  <div className="col-lg-6">
                    <label >Account Type</label>
                    <br />
                    <Dropdown
                      placeholder="Account Type"
                      fluid
                      search
                      value={values.HeadType}
                      selection
                      scrolling
                      // allowAdditions
                      // onAddItem={handleAddition}
                      options={HeadTypeList}
                      onChange={(ev, obj) => {
                        HandleSelect(ev, obj);
                        setFieldValue("HeadType", obj.value);
                        setFieldValue("assettype", obj.value);
                        // setMethod(ev.target.value)

                        // setFieldValue("type", obj.value);
                      }}
                    />
                    {/* </Segment>{" "} */}
                  </div>
                </div>

                {/* {TypeList.length && values.main_Heads.toLowerCase() != "income" ? ( */}
                {values.HeadType ?

                  <div className="row mt-5 col-lg-12">
                    <div className="col-lg-6">
                      <label onClick={()=>console.log(values.type)}>{values.HeadType} Type</label>
                      <br />
                      <Dropdown
                        placeholder="Type"
                        fluid
                        search
                        value={values.type}
                        selection
                        scrolling
                        options={TypeList}
                        onChange={(ev, { value }) => {
                          setFieldValue("type", value);
                        }}
                      />
                    </div>
                  </div>
                  : null}
                {/* ) :
                  //  values.main_Heads.toLowerCase() === "income"?(
                  //   setFieldValue("type","Income")
                  // ):
                  null
                } */}
                {values.type.toLowerCase() === "suppliers" ? (
                  <div className="mt-5 col-lg-6">
                    <label>Supplier Name</label>
                    <br />
                    <Dropdown
                      placeholder="Supplier Name"
                      style={{ height: "40px" }}
                      fluid
                      search
                      // value={values.product_name}
                      // disabled={CustomerAdd}
                      selection
                      scrolling
                      options={supplierOpt}
                      onChange={(e, { value }, ev) => {
                        setSupplier(value);
                        setFieldValue("supplier", value);
                      }}
                    />
                  </div>
                ) : values.type.toLowerCase() === "customer" ? (
                  <div className="mt-5 col-lg-6">
                    <label>Customer Name</label>
                    <br />
                    <Dropdown
                      placeholder="Customer Name"
                      style={{ height: "40px" }}
                      fluid
                      search
                      // value={values.product_name}
                      // disabled={CustomerAdd}
                      selection
                      scrolling
                      options={customerOpt}
                      onChange={(e, { value }, ev) => {
                        setCustomer(value);
                        setFieldValue("Customer", value);
                      }}
                    />
                  </div>
                ) : (
                  null
                )}
                <div className="mt-5 col-lg-6">
                  <Field
                    name="price"
                    value={values.price}
                    component={Input}
                    onChange={(ev) => {
                      setprice(ev.target.value);
                      setFieldValue("price", ev.target.value);
                    }}
                    placeholder="Amount"
                    label="Amount"
                  />
                </div>
                {/* {(values.HeadType.toLowerCase() !== "cash" && values.HeadType.toLowerCase() != "account recievable" && values.HeadType.toLowerCase() != "account payable") && values.HeadType ? ( */}
                <div className=' row col-lg-12'>
                  {/* <div className="col-lg-6" >

                    <div className="mt-5 col-lg-12">
                      <Select
                        // disabled={id ? true : false}
                        name="payment_Type"
                        label="Payment Type"
                        // defaultValue={
                        //   assettype === "Cheque" ? "Cheque" : null
                        // }
                        onChange={(ev) => {
                          // setvalues.HeadType(ev.target.value);
                          setPayment_Type(ev.target.value);
                          setFieldValue("payment_Type", ev.target.value);
                          setFieldValue("payment_mode", ev.target.value);
                        }}
                      >
                        <option value={""}>Select.....</option>

                        {paymentMode.length ?
                          paymentMode.map((a) =>

                            // return (
                            <option key={a} value={a}>
                              {a}
                            </option>
                            // );

                          ) : null}
                      </Select>
                    </div>
                  </div> */}
                  {/* {values.payment_Type ?

                    <div className="col-lg-6" >
                      <div className="mt-5 col-lg-12">
                        <Select
                          name="Payment_method"
                          label="Payment Method"
                          onChange={(ev) => {
                            setPayment_method(ev.target.value);
                            setFieldValue("Payment_method", ev.target.value);
                          }}
                        >
                          <option value={""}>Select.....</option>

                          {paymentModeTypes(props.AccountReducer.entities, payment_Type) ?
                            paymentModeTypes(props.AccountReducer.entities, payment_Type).map((a) =>

                              // return (
                              <option key={a.type} value={a.type}>
                                {a.type}
                              </option>
                              // );

                            ) : null}
                        </Select>
                      </div>
                    </div>
                    : null} */}
                  {/* {payment_Type.toLowerCase() === "cheque"
                    ? (
                      <>
                        <div className="mt-5 col-lg-6">
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
                        <div className="mt-5 col-lg-12">
                          <Field
                            name="checkDes"
                            component={Input}
                            onChange={(ev) => {
                              setCheckDes(ev.target.value);
                              setFieldValue("checkDes", ev.target.value);
                            }}
                            placeholder="Cheque Description"
                            label="Cheque Description"
                          />
                        </div>
                      </>

                    ) : null} */}
                </div>
                {/* ) : null} */}




                {/*  */}
                {/* {values.HeadType.toLowerCase() === "account recievable" ||
                  values.HeadType.toLowerCase() === "account payable" ? (
                    <>
                      <div className="mt-5  col-lg-6">
                        <Select
                          // disabled={id ? true : false}
                          name="assettype"
                          label="Payment Through"
                          defaultValue="Cash"
                          onChange={(ev) => {
                            setMethod(ev.target.value);
                            setAssettype(ev.target.value);
                            setFieldValue("assettype", ev.target.value);
                          }}
                        >
                          <option value={""}>Select.....</option>
                          {assets && assets
                            .filter((obj) => obj.main_Heads === "Assests" && obj.HeadType.toLowerCase() != "account recievable")
                            .map((Head) => (
                              <option key={Head.HeadType} value={Head.HeadType}>
                                {Head.HeadType}
                              </option>
                            ))}
                        </Select>
                      </div>



                    </>
                  ) : null} */}
                {/* {payment_Type.toLowerCase() === "cheque"
                  // && values.HeadType.toLowerCase() != "bank" && values.HeadType.toLowerCase() != "account recievable" && values.HeadType) 
                  // ||
                  // values.assettype && values.assettype.toLowerCase() === "cheque"
                  // && values.assettype.toLowerCase() != "bank" && values.assettype 
                  ? (
                    <>
                      <div onClick={() => console.log(values.HeadType)} className="mt-5 col-lg-6">
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
                      <div className="mt-5 col-lg-12">
                        <Field
                          name="checkDes"
                          component={Input}
                          onChange={(ev) => {
                            setCheckDes(ev.target.value);
                            setFieldValue("checkDes", ev.target.value);
                          }}
                          placeholder="Cheque Description"
                          label="Cheque Description"
                        />
                      </div>
                    </>
                  ) : null} */}

                {/*  */}
                <div className="mt-5 col-lg-6">
                  <Field
                    name="description"
                    component={Input}
                    onChange={(ev) => {
                      setFieldValue("description", ev.target.value);
                    }}
                    label="description"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary ml-2"
                onSubmit={() => {
                  if (values.type && values.price && values.HeadType) {
                    // handleReset();
                  }
                }}
                onClick={(e) => {
                  if (values.HeadType && (values.HeadType != "Account Recievable" || values.HeadType != "Account Payable")) {
                    e.preventDefault();
                    handleSubmit();
                    // console.log(values)
                    // setTimeout(() => {
                    //   setFieldValue("HeadType", '')
                    //   setFieldValue('assettype', '')
                    //   setFieldValue('type', '')
                    //   setFieldValue("Customer", '');
                    //   setFieldValue('supplier', '')
                    //   setFieldValue("payment_Type", '');
                    //   setFieldValue("payment_mode", '');
                    //   setFieldValue("Payment_method", "");
                    //   setFieldValue("price", '');
                    //   setFieldValue("assettype", '');
                    //   setFieldValue("checkDate", '');
                    //   setFieldValue("checkDes", '');
                    //   setFieldValue("description", '');
                    // }, 500);
                  }
                }}
                style={{ float: "right" }}
              // ref={btnRef}
              >
                Save
              </button>
            </Form>
            <JournalPrintDialog
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
              data={values}
              journalInvoice={purchaseInvoice}
              saveEntries={saveEntries}
              setFieldValue={setFieldValue}
            // assettype={assettype}
            // paymentmode={paymentmode}
            // totalArr={totalArr}
            //  saveProduct={saveProduct}
            //  setProductStat={setProductStat}
            //  supplier={supplier}
            //  setProductArr={setProductArr}
            />
          </>
        )}
      </Formik>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    // AddAccountHead: (data, main_Heads, ToastMEs) =>
    //   dispatch(AccountMiddileWare.AddAccountHead(data, main_Heads, ToastMEs)),
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
    SupplierReducer: state.SupplierReducer,
    SupplyProductReducer: state.SupplyProductReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JouneralEntriesForm);
