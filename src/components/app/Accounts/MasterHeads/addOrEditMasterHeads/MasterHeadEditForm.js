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
import { values } from "lodash";
import { toast } from "react-toastify";

// Validation schema
const MasterHeadEditSchema = Yup.object().shape({
  model: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Model is required"),
  manufacture: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Manufacture is required"),
});

function MasterHeadEditForm({
  initialValues,
  btnRef,
  saveMasterHead,
  id,
  saveHeadTypes,
  setSelectedAccount,
  TypeButtonText,
  TypeForEdit,
  setTable,
  setTable2,
  ...props
}) {
  let [main_Heads, setmain_Heads] = useState("Assets");
  let [TypeValue, setTypeValue] = useState("");
  let [HeadTypeList, setHeadTypeList] = useState([]);
  let [selectedVal, setSelectedVal] = useState("");
  let [openingBalance, setOpeningBalance] = useState("");
  let [ShowInput, setShowInput] = useState(false);
  let [subHead, setSubHead] = useState('')
  useEffect(() => {
    // clear selections list
    let arr = []
    if (props.AccountReducer.entities) {
      arr = props.AccountReducer.entities;
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
  }, [props.AccountReducer.entities, main_Heads]);
  useEffect(() => {
    if (id > -1) {
      setSelectedVal(initialValues.HeadType);
    }
  }, [id, props]);
  useEffect(() => {
    console.log(TypeForEdit.type)
  }, [TypeForEdit])
  useEffect(() => {
    if (TypeForEdit) {
      setTypeValue(
        typeof TypeForEdit === "string" ? TypeForEdit.type : TypeForEdit.type
      );
      setOpeningBalance(
        typeof TypeForEdit === "string" ? "" : TypeForEdit.openingBalance
      );
      initialValues.type =
        typeof TypeForEdit === "string" ? TypeForEdit.type : TypeForEdit.type;
      initialValues.openingBalance =
        typeof TypeForEdit === "string" ? "" : TypeForEdit.openingBalance;

      setShowInput(true);
    }
  }, [TypeForEdit]);
  const handleAddition = (e, { value }) => {
    // alert('ru8n');
    if (e.keyCode == 13 || e.button === 0) {
      // console.log(main_Heads)
      saveMasterHead({ HeadType: value, main_Heads });
    }
  };
  const HandleSelect = (e, { value }) => {
    setSelectedAccount(value);
    setSelectedVal(value);
    setTable2(value)
    // console.log(value)
    setSubHead(value)
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
      // validationSchema={MasterHeadEditSchema}
      // onSubmit={(values) => {
      //   saveHeadTypes(values)
      // }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group col-lg-12">
                <div className="col-lg-12">
                  <Select
                    disabled={id ? true : false}
                    name="main_Heads"
                    label="Head"
                    onChange={(ev) => {
                      setFieldValue("main_Heads", ev.target.value);
                      // console.log(ev.target.value)
                      setmain_Heads(ev.target.value);
                      setTable(ev.target.value)
                    }}
                  >
                    {Main_Heads.map((Head) => (
                      <option key={Head} value={Head}>
                        {Head}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="row mt-5 col-lg-12">
                  <div className="col-lg-7">
                    <label >Sub Heads</label>
                    <br />
                    <Dropdown
                      placeholder="Sub Heads"
                      fluid
                      search
                      value={selectedVal}
                      selection
                      scrolling
                      allowAdditions
                      onAddItem={handleAddition}
                      options={HeadTypeList}
                      onChange={HandleSelect}
                    />
                    {/* </Segment>{" "} */}
                  </div>
                  {selectedVal && (
                    <div
                      className="col-lg-5"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <br />
                      <button
                        onClick={() => {
                          setShowInput(true);
                        }}
                        className="btn btn-primary ml-2"
                      >
                        Add Category
                      </button>
                    </div>
                  )}
                </div>
                {ShowInput && (
                  <div className="row mt-5 col-lg-12">
                    <div className="col-lg-8">
                      <Field
                        onClick={() => console.log(values)}
                        name="type"
                        component={Input}
                        value={TypeValue}
                        onChange={(ev) => {
                          {
                            // values.main_Heads === "Expenses"
                            // ? setFieldValue("", ev.target.value)
                            setTypeValue(ev.target.value)
                            setFieldValue("type", ev.target.value);
                            // setFieldValue("type", ev.target.value);
                          }
                        }}
                        placeholder={`${selectedVal} Type`}
                        label={`${selectedVal} Type`}
                      />
                    </div>
                    {/* {values.main_Heads === "Expenses" ? (
                      <div className="col-lg-8">
                        <Field
                          name="type"
                          value={TypeValue}
                          component={Input}
                          onChange={(ev) => {
                            setTypeValue(ev.target.value);
                          }}
                          placeholder={`${values.main_Heads} Type`}
                          label={`${values.main_Heads} Type`}
                        />
                      </div>
                    ) : null} */}

                    <div className="col-lg-8">
                      <Field
                        name="openingBalance"
                        value={openingBalance}
                        component={Input}
                        onChange={(ev) => {
                          setOpeningBalance(ev.target.value);
                          setFieldValue("type", TypeValue);
                          setFieldValue("openingBalance", ev.target.value);
                        }}
                        placeholder="opening Balance"
                        label="opening Balance"
                      />
                    </div>
                    <div
                      className="col-lg-4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <br />
                      <button
                        // disabled={TypeValue}
                        onClick={() => {
                          // // if (selectedVal) {
                          if (!values.type) {
                            toast.error(`${selectedVal} Type Is Necessary`, {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            })
                          } else {

                            saveHeadTypes({ ...values, main_Heads: main_Heads, HeadType: subHead, openingBalance: values.openingBalance ? values.openingBalance : 0 })
                            // // console.log()
                            //   // saveHeadTypes({
                            //   //   ...values,
                            //   //   HeadType: selectedVal,
                            //   //   openingBalance: values.openingBalance
                            //   //     ? values.openingBalance
                            //   //     : 0,
                            //   //   main_Heads: main_Heads
                            //   // });
                            setFieldValue("type", "");
                            setTypeValue("");
                            setFieldValue("openingBalance", "");
                            setOpeningBalance("");
                            setShowInput(false)
                            // // }
                          }


                          // props.AddAccountHead( { data: [values] }, values.main_Heads,'Added Sub Head')

                        }
                        }

                        className="btn btn-primary ml-2"
                      >
                        {TypeButtonText}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button> */}
            </Form>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MasterHeadEditForm);
