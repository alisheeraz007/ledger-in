import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ButtonToolbar,
  Form,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
// import AccountMiddileware from "../../../../../../redux/middleWare/accountMiddileWare";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Dropdown } from "semantic-ui-react";
import ConfirmModal from "../confirmation/confirm";
// import { ConfirmModal } from "../confirmation/confirm";
// export default function SwitchLabels() {
//   const [state, setState] = React.useState({
//     paid: true,
//     recieves: true,
//   });

//   const handleChange = (event) => {
//     setState({ ...state, [event.target.name]: event.target.checked });
//   };
const options = [
  { key: "RS", text: "RS", value: "RS" },
  { key: "%", text: "%", value: "%" },
];
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 32,
    height: 19,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 15,
    height: 15,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
function SaleDeleteDialog(props) {
  let [method, setMethod] = useState("");
  let [paymentPaid, setPayemntPaid] = useState("");
  // Customers UI Context
  const [state, setState] = React.useState({
    checkedC: true,
    firstAttempt: false,
  });

  let {
    id,
    onHide,
    initialValues,
    setreceivedPayment,
    setPayment_Type,
    saveProductClick,
    entryArr,
    changeType,
    SetpriceType,
    setdiscount,
    setPercent,
    setPercentagePrice,
    percent,
    returnItem,
    setPaidPay,
    assets,
    setAssettype,
    assettype,
    setCheckDate,
    checkDate,
    checkDes,
    setCheckDes,
    setAsk,
    setCashBal
  } = props;
  const [show, setShow] = useState(false);


  console.log(assets,"ahsdiauskdbsk")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    changeType(event.target.checked);
    SetpriceType(event.target.checked ? "retailPrice" : "wholeSalePrice");
  };
  useEffect(() => {
    if (entryArr.length && !state.firstAttempt) {
      let customer = entryArr[0].customer.CustomerType;
      setState({
        checkedC: customer ? (customer == "WholeSealer" ? false : true) : true,
        firstAttempt: true,
      });
    }
  }, [entryArr]);

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues()}
        onSubmit={(values) => {
          // console.log(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue, setValues, handleReset }) => (
          <>
            <Form className="form form-label-right">
              <div
                className="col-lg-12"
                style={{
                  padding: "0",
                  margin: "12px 0px",
                }}
              >
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid
                      item
                      style={{
                        fontWeight: state.checkedC ? "unset" : "bold",
                        fontSize: "15px",
                      }}
                    >
                      Whole Sealer
                    </Grid>
                    <Grid item>
                      <AntSwitch
                        checked={state.checkedC}
                        onChange={handleChange}
                        name="checkedC"
                      />
                    </Grid>
                    <Grid
                      item
                      style={{
                        fontWeight: !state.checkedC ? "unset" : "bold",
                        fontSize: "15px",
                      }}
                    >
                      Retailer
                    </Grid>
                  </Grid>
                </Typography>
              </div>
              <div className="form-group row">
                <div className="mt-5 col-lg-6">
                  {initialValues().netAmount ?
                    <Field
                      style={{
                        color: "red",
                      }}
                      name="netAmount"
                      disabled={true}
                      component={Input}
                      placeholder="Total Amount"
                      label="Total Amount"
                    />
                    :
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
                  }
                </div>
                <div
                  className="mt-5 col-lg-6 inputDrop"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className=" col-lg-8" style={{ padding: "0px" }}>
                    <Field

                      name="discount"
                      component={Input}
                      onChange={(ev) => {
                        setFieldValue("discount", ev.target.value);
                        if (percent === "%") {
                          setPercentagePrice(
                            (Number(initialValues().TotalAmount) *
                              Number(ev.target.value)) /
                            100
                          );
                        } else {
                          setPercentagePrice(ev.target.value);
                        }
                        setdiscount(ev.target.value);
                      }}
                      placeholder="Discount"
                      label="Discount"
                    />
                  </div>
                  <div
                    className="col-lg-4"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      padding: "0px",
                      marginTop: "2%",
                    }}
                  >
                    <Dropdown
                      placeholder=""
                      fluid
                      className="form-control"
                      selection
                      scrolling
                      options={options}
                      defaultValue="%"
                      onChange={(e, { value }) => {
                        setPercent(value);
                      }}
                    />
                  </div>
                </div>

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
                    {assets
                      .filter((obj) => obj.main_Heads === "Assets" && (obj.HeadType.toLowerCase() === "cash" || obj.HeadType.toLowerCase() === "bank" || obj.HeadType.toLowerCase() === "cheque"))
                      .map((Head) => (
                        <option key={Head.HeadType} value={Head.HeadType}>
                          {Head.HeadType}
                        </option>
                      ))}
                  </Select>
                </div>
                {/* {(method === "Bank" || method === 'Cheque') && method ? (
                  <div className="mt-5 col-lg-6">
                    <Select
                      // disabled={id ? true :s//sd false}
                      name="payment_Type"
                      label="Payment Type"
                      // defaultValue={
                      //   assettype === "Cheque"
                      //     ? "Cheque"
                      //     : null
                      // }
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
                )} */}

                {props.returnItem && initialValues().netAmount < 0 ? (
                  <div className="mt-5 col-lg-6">
                    <Field
                      name="payemntPaid"
                      component={Input}
                      onChange={(ev) => {
                        setPaidPay(ev.target.value);
                        setFieldValue("payemntPaid", ev.target.value);
                      }}
                      onKeyDown={(ev) => {
                        if (ev.keyCode == 13 && entryArr.length) {
                          saveProductClick();
                        }
                      }}
                      placeholder="Payment Paid"
                      label="Payment Paid"
                      defaultValue={0}
                    />
                  </div>
                ) : (
                  <div className="mt-5 col-lg-6">
                    <Field
                      name="receivedPayment"
                      component={Input}
                      onChange={(ev) => {
                        setreceivedPayment(ev.target.value);
                        setFieldValue("receivedPayment", ev.target.value);
                      }}
                      onKeyDown={(ev) => {
                        if (ev.keyCode == 13 && entryArr.length) {
                          saveProductClick();
                        }
                      }}
                      placeholder="Recieved Payment"
                      label="Recieved Payment"
                      defaultValue={0}
                    />
                  </div>
                )}
                {method !== "Cash" && method !== "Bank" && method ? (
                  <>
                    <div className="mt-5 col-lg-6">
                      <Field
                        name="checkDate"
                        component={Input}
                        onChange={(ev) => {
                          setCheckDate(new Date(ev.target.value).getTime())
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
                          setCheckDes(ev.target.value)
                          setFieldValue("checkDes", ev.target.value);
                        }}
                        placeholder="Check Description"
                        label="Description"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </Form>
            {values.netAmount >= Number(values.receivedPayment) ?
              <button
                type="submit"
                className="btn btn-primary ml-2"
                disabled={!entryArr.length}
                style={{ float: "right" }}
                onClick={saveProductClick}
              >
                Sale And Make Invoice
              </button>
              :
              <ConfirmModal save={() =>
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  disabled={!entryArr.length}
                  style={{ float: "right" }}
                  onClick={() => {
                    setCashBal("cashBack")
                    setAsk('cashBack')
                    saveProductClick('', 'cashBack');
                    handleClose();
                  }}
                >
                  Sale And CashBack
                </button>
              } savebal={() =>
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  disabled={!entryArr.length}
                  style={{ float: "right" }}
                  onClick={() => {
                    setAsk('bal');
                    setCashBal('bal');
                    saveProductClick('', 'bal');
                    handleClose();
                  }}
                >
                  Sale And Add Balance
                </button>
              }
                // open={show}
                // setOpen={setShow}
                // handleClickOpen={handleShow}
                // handleClose={handleClose}
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            }


          </>
        )}
      </Formik>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    // DeleteEntry: (id) => dispatch(AccountMiddileware.DeleteEntry(id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleDeleteDialog);
