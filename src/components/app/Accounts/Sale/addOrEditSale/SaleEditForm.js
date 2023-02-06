// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  DatePickerField,
  Input,
  Select,
} from "../../../../../_metronic/_partials/controls";
import { Dropdown, Segment } from "semantic-ui-react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { AvaliableProductQuantity } from "../../../../redux/constants";

// Validation schema
const SaleEditSchema = Yup.object().shape({
  Customer_name: Yup.string().required("Customer Name is required"),
  bar_code: Yup.string().required("Bar Code is required"),
  product_name: Yup.string().required("Product name is required"),
  quantity: Yup.string().required("Quantity is required"),
});

function SaleEditForm(props) {
  let {
    initialValues,
    Entries,
    saveSale,
    id,
    paramsID,
    history,
    ButtonText,
    setSaleForEdit,
    SaleForEdit,
    setAutoFocus,
    autoFocus,
    setCustomerName
  } = props;
  const [CustomerAdd, setCustomerAdd] = useState(false);
  const [OptionList, setOptionList] = useState([]);
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
    }
  }, [props.CustomerReducer.entities, id]);
  let [proOpt, setPropOpt] = useState("");

  useEffect(() => {
    props.ProductReducer.entities &&
      props.ProductReducer.entities.map((Head) => (
        <option key={Head.db_id} value={Head.db_id}>
          {Head.product_name}
        </option>
      ));

    if (props.ProductReducer.entities) {
      let arr = props.ProductReducer.entities;
      let arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push({
          name: arr[i].bar_code,
          value: arr[i].bar_code,
          text: i == 0 ? arr[i].product_name : arr[i].product_name,
        });
      }
      setPropOpt(arr2);
    }
  }, [props.ProductReducer.entities, id]);
  useEffect(() => {
    if (SaleForEdit) {
      let value = props.ProductReducer.entities.filter(
        (obj) => obj.bar_code == initialValues.bar_code
      )[0];
      props.setAvaliableQuantity(
        AvaliableProductQuantity(
          [...props.AccountReducer.All_entries],
          value.quantity,
          value
        )
      );
    }
  }, [SaleForEdit]);
  useEffect(() => {
    if (!Entries.length) {
      setCustomerAdd(false);
    }
  }, [Entries]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...initialValues,
          Customer_name: OptionList.filter(
            (obj) => obj.name === initialValues.Customer_name
          )[0]
            ? initialValues.Customer_name
            : null,
        }}
        onSubmit={(values) => {
          if (
            values.quantity &&
            values.Customer_name &&
            values.product_name &&
            values.price
          ) {
            saveSale(values);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue, setValues, handleReset }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-12">
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <label onClick={()=>console.log(OptionList)}>Customer Name</label>
                      <br />
                      <Dropdown
                        placeholder="Customer Name"
                        fluid
                        search
                        value={values.Customer_name}
                        disabled={CustomerAdd}
                        selection
                        scrolling
                        options={OptionList}
                        onChange={(e, obj) => {
                          setFieldValue("Customer_name", obj.value);
                          setCustomerName(obj)
                        }}
                      />
                      {/* </Segment>{" "} */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                      }}
                      className="col-sm-6"
                    >
                      <button
                        type="button"
                        // style={{ width:"100%"}}
                        // ref={btnRef}
                        className="btn btn-primary"
                        onClick={() =>
                          history.push("/Account/Sale/customers/new")
                        }
                      >
                        Add Customer
                      </button>
                      {values.bar_code ? (
                        <button
                          type="button"
                          // style={{ width:"100%"}}
                          // ref={btnRef}
                          className="btn btn-danger"
                          onClick={() =>
                            setValues({
                              date: new Date(),
                              main_Heads: "Income",
                              HeadType: "Sale",
                              price: "",
                              quantity: 1,
                              bar_code: "",
                              product_name: "",
                              TotalAmount: "",
                              Customer_name: values.Customer_name,
                            })
                          }
                        >
                          Clear
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <Field
                    component={Input}
                    onKeyDown={(ev) => {
                      setFieldValue("bar_code", ev.target.value);
                      let obj = props.ProductReducer.entities.filter(
                        (obj) => obj.bar_code == ev.target.value
                      )[0];
                      let Customer = props.CustomerReducer.entities.filter(
                        (obj) => obj.db_id == values.Customer_name
                      )[0];
                      if (ev.keyCode == 13 && obj) {
                        setFieldValue(
                          "product_name",
                          ev.target.value ? obj && obj.db_id : ""
                        );
                        setFieldValue(
                          "price",
                          // ev.target.value && ev.target.value
                          //   ? obj && obj.price
                          //   : ""
                          Customer.CustomerType
                            ? Customer.CustomerType == "Retailer"
                              ? obj.retailPrice
                              : Customer.CustomerType == "WholeSealer"
                                ? obj.wholeSalePrice
                                : obj.retailPrice
                            : obj.retailPrice
                              ? obj.retailPrice
                              : obj.price
                        );
                        setFieldValue(
                          "TotalAmount",
                          obj && Customer.CustomerType
                            ? Customer.CustomerType == "Retailer"
                              ? Number(values.quantity) *
                              Number(obj.retailPrice)
                              : Customer.CustomerType == "WholeSealer"
                                ? Number(values.quantity) *
                                Number(obj.wholeSalePrice)
                                : Number(values.quantity) *
                                Number(obj.retailPrice)
                            : obj.retailPrice
                              ? Number(values.quantity) * Number(obj.retailPrice)
                              : Number(values.quantity) * Number(obj.price)
                        );
                        props.setAvaliableQuantity(
                          AvaliableProductQuantity(
                            [...props.AccountReducer.All_entries, ...Entries],
                            obj.quantity,
                            obj
                          )
                        );
                      }
                      let value = ev.target.value;
                      if (ev.keyCode == 13) {
                        setCustomerAdd(true);
                        setTimeout(() => {
                          if (
                            obj &&
                            AvaliableProductQuantity(
                              [...props.AccountReducer.All_entries, ...Entries],
                              obj.quantity,
                              obj
                            ) > 0
                          ) {
                            handleSubmit({
                              ...values,

                              product_name: value ? obj && obj.db_id : "",
                              price: value && value ? obj && obj.price : "",
                              TotalAmount:
                                obj &&
                                Number(values.quantity) * Number(obj.price),
                            });

                            setTimeout(() => {
                              setValues({
                                date: new Date(),
                                main_Heads: "Income",
                                HeadType: "Sale",
                                price: "",
                                quantity: 1,
                                bar_code: "",
                                product_name: "",
                                TotalAmount: "",
                                Customer_name: values.Customer_name,
                                // receivedPayment: "",
                                // Balance: "",
                              });
                              props.setAvaliableQuantity("");
                            }, 500);
                          } else if (
                            obj &&
                            !AvaliableProductQuantity(
                              [...props.AccountReducer.All_entries, ...Entries],
                              obj.quantity,
                              obj
                            )
                          ) {
                            toast.error("Quantity not found", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          } else {
                            toast.error("Record not found", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          }
                        }, 300);
                      }
                    }}
                    onClick={() => setAutoFocus(true)}
                    name="bar_code"
                    autoFocus={autoFocus ? true : false}
                    label="Product Code"
                  />
                </div>

                {/* <div className="col-lg-6">
                  <Select
                    // disabled={id ? true : false}
                    // disabled
                    name="product_name"
                    label="Product Name"
                    // search
                    // placeholder="Customer Name"
                    fluid
                    search
                    // value={values.Customer_name}
                    // disabled={CustomerAdd}
                    selection
                    scrolling
                    // options={OptionList}

                  >
                    <option value={""}>Select.....</option>
                    {props.ProductReducer.entities &&
                      props.ProductReducer.entities.map((Head) => (
                        <option key={Head.db_id} value={Head.db_id}>
                          {Head.product_name}
                        </option>
                      ))}
                  </Select>
                </div> */}
                <div onClick={()=>console.log(values.Customer_name)} className="col-sm-6">
                  <label>Product Name</label>
                  <br />
                  <Dropdown
                    placeholder="Product Name"
                    fluid
                    search
                    value={values.product_name}
                    // disabled={CustomerAdd}
                    selection
                    scrolling
                    options={proOpt}
                    onChange={(e, { value }, ev) => {
                      setFieldValue("product_name", value);
                    }}
                    onKeyDown={(ev) => {
                      if (values.Customer_name) {

                        setFieldValue("bar_code", values.product_name);
                        let obj = props.ProductReducer.entities.filter(
                          (obj) => obj.bar_code == values.product_name
                        )[0];
                        let Customer = props.CustomerReducer.entities.filter(
                          (obj) => obj.db_id == values.Customer_name
                        )[0];
                        if (ev.keyCode == 13 && obj) {
                          setFieldValue(
                            "product_name",
                            values.product_name ? obj && obj.db_id : ""
                          );
                          setFieldValue(
                            "price",
                            // ev.target.value && ev.target.value
                            //   ? obj && obj.price
                            //   : ""
                            Customer.CustomerType
                              ? Customer.CustomerType == "Retailer"
                                ? obj.retailPrice
                                : Customer.CustomerType == "WholeSealer"
                                  ? obj.wholeSalePrice
                                  : obj.retailPrice
                              : obj.retailPrice
                                ? obj.retailPrice
                                : obj.price
                          );
                          setFieldValue(
                            "TotalAmount",
                            obj && Customer.CustomerType
                              ? Customer.CustomerType == "Retailer"
                                ? Number(values.quantity) *
                                Number(obj.retailPrice)
                                : Customer.CustomerType == "WholeSealer"
                                  ? Number(values.quantity) *
                                  Number(obj.wholeSalePrice)
                                  : Number(values.quantity) *
                                  Number(obj.retailPrice)
                              : obj.retailPrice
                                ? Number(values.quantity) * Number(obj.retailPrice)
                                : Number(values.quantity) * Number(obj.price)
                          );
                          props.setAvaliableQuantity(
                            AvaliableProductQuantity(
                              [...props.AccountReducer.All_entries, ...Entries],
                              obj.quantity,
                              obj
                            )
                          );
                        }
                        let value = ev.target.value;
                        if (ev.keyCode == 13) {
                          setCustomerAdd(true);
                          setTimeout(() => {
                            if (
                              obj &&
                              AvaliableProductQuantity(
                                [...props.AccountReducer.All_entries, ...Entries],
                                obj.quantity,
                                obj
                              ) > 0
                            ) {
                              handleSubmit({
                                ...values,

                                product_name: value ? obj && obj.db_id : "",
                                price: value && value ? obj && obj.price : "",
                                TotalAmount:
                                  obj &&
                                  Number(values.quantity) * Number(obj.price),
                              });

                              setTimeout(() => {
                                setValues({
                                  date: new Date(),
                                  main_Heads: "Income",
                                  HeadType: "Sale",
                                  price: "",
                                  quantity: 1,
                                  bar_code: "",
                                  product_name: "",
                                  TotalAmount: "",
                                  Customer_name: values.Customer_name,
                                  // receivedPayment: "",
                                  // Balance: "",
                                });
                                props.setAvaliableQuantity("");
                              }, 500);
                            } else if (
                              obj &&
                              !AvaliableProductQuantity(
                                [...props.AccountReducer.All_entries, ...Entries],
                                obj.quantity,
                                obj
                              )
                            ) {
                              toast.error("Quantity not found", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                            } else {
                              toast.error("Record not found", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                            }
                          }, 300);
                        }
                      } else {
                        toast.error("Please Select Customer", {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        })
                      }

                    }}
                  />
                  {/* </Segment>{" "} */}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="quantity"
                    type="number"
                    component={Input}
                    onChange={(ev) => {
                      if (Number(ev.target.value) <= props.avaliableQuantity) {
                        setFieldValue("quantity", ev.target.value);
                        setFieldValue(
                          "TotalAmount",
                          Number(ev.target.value) * Number(values.price)
                        );
                      }
                    }}
                    placeholder="Quantity"
                    label="Quantity"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="price"
                    component={Input}
                    disabled={true}
                    placeholder="Price"
                    label="Price"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    style={{
                      color: "red",
                    }}
                    name="TotalAmount"
                    disabled={true}
                    component={Input}
                    placeholder="Total Amount"
                    label="Total Amount"
                  />
                </div>
              </div>
              {props.avaliableQuantity ? (
                <div
                  style={{
                    textAlign: "right",
                    color: "red",
                  }}
                >
                  <span style={{ fontStyle: "italic" }}>Stock in Hand</span>{" "}
                  <span className="ml-1">{props.avaliableQuantity}</span>
                </div>
              ) : null}
              <button
                type="button"
                // ref={btnRef}
                className="btn btn-primary col-lg-12"
                onClick={() => {
                  props.setAvaliableQuantity("");
                  if (
                    values.quantity &&
                    values.Customer_name &&
                    values.product_name &&
                    values.price
                  ) {
                    handleSubmit(values);

                    setTimeout(() => {
                      setValues({
                        date: new Date(),
                        main_Heads: "Income",
                        HeadType: "Sale",
                        price: "",
                        quantity: 1,
                        bar_code: "",
                        product_name: "",
                        TotalAmount: "",
                        Customer_name: values.Customer_name,
                      });
                    }, 500);
                  } else {
                    toast.error("Please Fill all filed", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                }}
              >
                {ButtonText}
              </button>
              {/* </div> */}
            </Form>
          </>
        )}
      </Formik>
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
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SaleEditForm));
