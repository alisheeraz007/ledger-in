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
import {
  Input,
  Select,
} from "../../../../../../../_metronic/_partials/controls";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Dropdown } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccountMiddileWare from "../../../../../../redux/middleWare/accountMiddileWare";

import {
  printElm,
  FindInvoice,
  returnTotal,
} from "../../../../../../redux/constants";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
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
  let [Return, setReturn] = useState(false);
  const classes = useStyles();
  // Customers UI Context
  const [state, setState] = React.useState({
    checkedC: true,
    firstAttempt: false,
  });
  let [method, setMethod] = useState("");
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
    paid,
    setPaid,
    updateRetrurnArr,
    Inv,
    // returnInvoice,
    // paid,
    discount,
    returnInvoice,
    assets,
    setAssettype,
    assettype,
    setCheckDate,
    checkDate,
    checkDes,
    setCheckDes,
    payment_Type,
    setOldInvoice = { setOldInvoice },
    setReturnInvoice = { setReturnInvoice },
  } = props;

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
              {!Return ? (
                <div className="buttons">
                  <h4 style={{ textAlign: "center" }}>Return Or Exchange</h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => setReturn(true)}
                    >
                      Return Cash
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={initialValues().ReturnAmount ? false : true}
                      onClick={() => {

                        props.EditEntry(
                          {
                            ...props.AccountReducer.All_entries.filter(
                              (obj) => obj.invoiceNumber === Inv
                            )[0],
                            returnInvoice: {
                              DeliveredBy: {
                                ...props.AccountReducer.All_entries.filter(
                                  (obj) => obj.invoiceNumber === Inv
                                )[0].DeliveredBy,
                              },
                              retrunInvoiceArr: returnInvoice,
                              ...returnTotal(returnInvoice, discount, paid),
                              date: new Date().getTime(),
                              assettype: assettype,
                              payment_Type: payment_Type,
                              main_heads: "Return",
                              returnInvoiceNumber: Inv

                              // returnBalance: 0
                            },
                          },
                          "Exchange in process"
                        );
                        setTimeout(() => {
                          props.history.push(`/Account/Sale/${Inv}/exchange`);
                        }, 500);
                      }}
                    >
                      Exchange Product
                    </Button>
                  </div>
                </div>
              ) : (
                  <>
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
                      <div className="col-lg-6">
                        <Field
                          style={{
                            color: "red",
                          }}
                          name="ReturnAmount"
                          disabled={true}
                          component={Input}
                          placeholder="Total Amount"
                          label="Total Amount"
                        />
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
                            .filter((obj) => obj.main_Heads === "Assets")
                            .map((Head) => (
                              <option key={Head.HeadType} value={Head.HeadType}>
                                {Head.HeadType}
                              </option>
                            ))}
                        </Select>
                      </div>
                      {method !== "Cash" && method ? (
                        <div className="mt-5 col-lg-6">
                          <Select
                            // disabled={id ? true : false}
                            name="payment_Type"
                            label="Payment Type"
                            defaultValue={
                              assettype === "Cheque" ? "Cheque" : null
                            }
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

                      {/* <div
                      className="mt-5 col-lg-6 inputDrop"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="col-lg-8" style={{ padding: "0px" }}>
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
                            // setdiscount(ev.target.value);
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
                    </div> */}
                      {/* <div className="mt-5 col-lg-6">
                      <Field
                        name="Paid Payment"
                        component={Input}
                        onChange={(ev) => {
                          setreceivedPayment(ev.target.value);
                          setFieldValue("receivedPayment", ev.target.value);
                        }}
                        // onKeyDown={(ev) => {
                        //   if (ev.keyCode == 13 && entryArr.length) {
                        //     saveProductClick();
                        //   }
                        // }}
                        placeholder="Recieved Payment"
                        label="Recieved Payment"
                      />
                    </div> */}
                      <div className="mt-5 col-lg-6">
                        <Field
                          name="PaidPayment"
                          component={Input}
                          onChange={(ev) => {
                            setPaid(ev.target.value);
                            setFieldValue("PaidPayment", ev.target.value);
                          }}
                          // onKeyDown={(ev) => {
                          //   if (ev.keyCode == 13 && entryArr.length) {
                          //     saveProductClick();
                          //   }
                          // }}
                          placeholder="Paid Payment"
                          label="Paid Payment"
                        />
                      </div>
                    </div>
                  </>
                )}
            </Form>
          </>
        )}
      </Formik>
      {Return ? (
        <button
          type="submit"
          className="btn btn-primary ml-2"
          // disabled={!entryArr.length}
          style={{ float: "right" }}
          onClick={() => {

            props.EditEntry(
              {
                ...props.AccountReducer.All_entries.filter(
                  (obj) => obj.invoiceNumber === Inv
                )[0],
                returnInvoice: {
                  DeliveredBy: {
                    ...props.AccountReducer.All_entries.filter(
                      (obj) => obj.invoiceNumber === Inv
                    )[0].DeliveredBy,
                  },
                  retrunInvoiceArr: returnInvoice,
                  ...returnTotal(returnInvoice, discount, paid),
                  date: new Date().getTime(),
                  assettype: assettype === "Cheque" ? "Bank" : assettype,
                  payment_Type: payment_Type,
                  main_Heads: "Return",
                  paidPayment: paid,
                  returnInvoiceNumber: Inv

                },
              },
              "Cash has been returned"
            );
            setReturn(false);
            setOldInvoice([]);
            setReturnInvoice([]);
            setPaid("");
          }}
        >
          Return Cash
        </button>
      ) : null}
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddEntry: (data) => dispatch(AccountMiddileWare.AddEntry(data)),
    EditEntry: (data, customeText) =>
      dispatch(AccountMiddileWare.EditEntry(data, customeText)),
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
)(withRouter(SaleDeleteDialog));
