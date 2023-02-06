import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import AccountMiddileWare from "../../../../components/redux/middleWare/accountMiddileWare";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import { chequeType, paymentModeTypes } from "../../../../components/redux/constants";
import DatePicker from "react-datepicker";




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ChequeForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [showForm, setShowForm] = useState(false)
  let [ChequeType, setChequeType] = useState('Gross Cheque')
  const [date, setDate] = useState(new Date())
  const [payment_Type, setPayment_Type] = useState("")
  const [ChequePost, setChequePost] = useState("")
  const [initialValues, setInitialValues] = useState({
    main_Heads: "Assets",
    HeadType: "",
    type: "",
    description: "",
    price: "",
    date: new Date().getTime(),
    payment_mode: "Cash",
  });
  const [returnCheque, setReturnCheque] = useState(false)
  // useEffect(()=>{
  //   if (props.AccountReducer.entities) {
  //     let arr = props.AccountReducer.entities.filter(obj => obj.main_Heads.toLowerCase() === 'assets')
  //     let arr2 = (arr.filter(obj => obj.HeadType === 'Bank')[0].types)
  //     console.log(arr2)
  //     return arr2
  //   }
  // },[props.AccountReducer.entities])
  return (
    <div>
      {props.value.bankStatus === 'Returned' ?
        <Button variant="outlined" style={{ color: "red", border: "1px solid red" }} onClick={() => {
          handleClickOpen();
          setReturnCheque(true)
        }}>
          Details
      </Button>
        :
        <Button variant="outlined" style={{ color: "red", border: "1px solid red" }} onClick={handleClickOpen}>
          Deposit
      </Button>
      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="chequeFormModal"

      >

        <>

          <DialogTitle id="alert-dialog-slide-title">
            {"Deposit"}
          </DialogTitle>
          <DialogContent
          >
            <DialogContentText id="alert-dialog-slide-description">
              <div
                style={{ width: "552px" }}
              >
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                // validationSchema={MasterHeadEditSchema}
                // onSubmit={(values) => {
                //   if (ChequeType === 'Gross Cheque') {

                //   } else if (ChequeType === 'Gross Cheque') {
                //     // console.log({ ...values, bankStatus: 'In Clearence', DepositBank: values.payment_Type, PCDate: values.ChequePost,DOD:values.date},'Bank')
                //     console.log('CASH')
                //   }
                // }}
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
                        <div className="row col-lg-12">
                          <div style={{ textAlign: 'center' }} className="col-lg-12">
                            <h3>{ChequeType === 'Gross Cheque' ? 'Bank Details' : ChequeType}</h3>
                          </div>
                          <div className="col-lg-4" style={{ borderRight: "1px solid black" }}>
                            <div className="mt-5 col-lg-12" >
                              <Select
                                // disabled={id ? true : false}
                                name="ChequeType"
                                label="Cheque Type"
                                value={ChequeType}
                                onChange={(ev) => {
                                  // setvalues.HeadType(ev.target.value);
                                  setChequeType(ev.target.value);
                                  setFieldValue("ChequeType", ev.target.value);
                                  // setFieldValue("ChequeType", ev.target.value);
                                }}
                              >
                                {/* <option value={""}>Select.....</option> */}

                                {chequeType.length ?
                                  chequeType.map((a) =>

                                    // return (
                                    <option key={a} value={a}>
                                      {a}
                                    </option>
                                    // );

                                  ) : null}
                              </Select>
                            </div>
                            <div className="mt-5 col-lg-12">
                              <h6>Amount:</h6>
                              <p>{props.value.price ? props.value.price : Number(props.value.receivedPayment) - Number(props.value.balance)}</p>

                            </div>
                            <div className="mt-5 col-lg-12">
                              <h6>Description:</h6>
                              <p>{props.value.discription}</p>

                            </div>
                          </div>
                          <div className="row col-lg-8">
                            {ChequeType === 'Gross Cheque' ?

                              <>
                                <div className="mt-5 col-lg-6">
                                  <Select
                                    // disabled={id ? true : false}
                                    name="payment_Type"
                                    label="Bank Account"
                                    // defaultValue={
                                    //   assettype === "Cheque" ? "Cheque" : null
                                    // }
                                    onChange={(ev) => {
                                      // setvalues.HeadType(ev.target.value);
                                      setPayment_Type(ev.target.value);
                                      setFieldValue("payment_Type", ev.target.value);
                                      // setFieldValue("payment_mode", ev.target.value);
                                    }}
                                  >
                                    <option value={""}>Select.....</option>

                                    {paymentModeTypes(props.AccountReducer.entities, 'Bank') && paymentModeTypes(props.AccountReducer.entities, 'Bank').length ?
                                      paymentModeTypes(props.AccountReducer.entities, 'Bank').map((a) =>

                                        // return (
                                        <option key={a.type} value={a.type}>
                                          {a.type}
                                        </option>
                                        // );

                                      ) : null}
                                  </Select>
                                </div>

                                <div className="mt-5 col-lg-6">
                                  <Select
                                    // disabled={id ? true : false}
                                    name="ChequePost"
                                    label="Post/Current Date"
                                    // defaultValue={
                                    //   assettype === "Cheque" ? "Cheque" : null
                                    // }
                                    onChange={(ev) => {
                                      // setvalues.HeadType(ev.target.value);
                                      setChequePost(ev.target.value);
                                      setFieldValue("ChequePost", ev.target.value);
                                      // setFieldValue("payment_mode", ev.target.value);
                                    }}
                                  >
                                    <option value={""}>Select.....</option>

                                    {['Post Date', 'Current Date'].map((a) =>

                                      // return (
                                      <option key={a} value={a}>
                                        {a}
                                      </option>
                                      // );

                                    )}
                                  </Select>
                                </div>
                                <div
                                  className="mt-5 col-lg-6"
                                  style={{ display: "flex", flexDirection: "column" }}
                                >
                                  <label>Date Of Deposit</label>
                                  <DatePicker
                                    name="date"
                                    label="Date"
                                    placeholderText="Date"
                                    className="form-control"
                                    style={{ width: "40%" }}
                                    selected={date}
                                    autoComplete="off"
                                    onChange={(ev) => {
                                      // getvalue(e, "from");
                                      setFieldValue("date", ev);
                                      setDate(ev);

                                    }}
                                    popperModifiers={{
                                      offset: {
                                        enabled: true,
                                        offset: "0px, 0px"
                                      },
                                      preventOverflow: {
                                        enabled: true,
                                        escapeWithReference: false,
                                        boundariesElement: "scrollParent"
                                      }
                                    }}
                                  />
                                </div>
                                {/* <div className="mt-5 col-lg-6">
                          <Select
                          // disabled={id ? true : false}
                          name="payment_Type"
                          label="Bank Account"
                          // defaultValue={
                            //   assettype === "Cheque" ? "Cheque" : null
                              // }
                              onChange={(ev) => {
                                // setvalues.HeadType(ev.target.value);
                                // setPayment_Type(ev.target.value);
                                // setFieldValue("payment_Type", ev.target.value);
                                // setFieldValue("payment_mode", ev.target.value);
                              }}
                              >
                            <option value={""}>Select.....</option>
                            
                            {paymentModeTypes(props.AccountReducer.entities, 'Bank').length ?
                            paymentModeTypes(props.AccountReducer.entities, 'Bank').map((a) =>
                            
                            // return (
                              <option key={a.type} value={a.type}>
                              {a.type}
                              </option>
                              // );
                              
                              ) : null}
                              </Select>
                            </div> */}

                              </>
                              :
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
                                <DialogContentText id="alert-dialog-slide-description">
                                  Did You Withdraw Your Amount (Rs.{" "}
                                  {props.value.price ? props.value.price : Number(props.value.receivedPayment) - Number(props.value.balance)}
                            /-) In Cash ?

                              </DialogContentText>
                              </div>
                            }
                          </div>
                        </div>
                        {ChequeType === 'Gross Cheque' ?
                          <button
                            type="submit"
                            className="btn btn-primary ml-2"
                            // onSubmit={() => {
                            //   if (values.type && values.price && values.HeadType) {
                            //     handleSubmit();
                            //     // handleReset();
                            //   }
                            // }}
                            onClick={(ev) => {
                              ev.preventDefault()
                              handleClose();
                              props.saveStatus({ ...props.value, bankStatus: 'In Clearence', DepositBank: values.payment_Type, PCDate: values.ChequePost, DOD: values.date }, 'Bank')

                            }}
                            style={{ float: "right" }}
                          // ref={btnRef}
                          >
                            Save
                     </button>
                          :
                          <button
                            type="submit"
                            className="btn btn-primary ml-2"
                            // onSubmit={() => {
                            //   if (values.type && values.price && values.HeadType) {
                            //     handleSubmit();
                            //     handleReset();
                            //   }
                            // }}
                            style={{ float: "right" }}

                            onClick={(ev) => {
                              handleClose();
                              ev.preventDefault()
                              props.saveStatus({ ...props.value, bankStatus: 'Cleared', payment_Type: 'Cash', payment_mode: 'Cash', assettype: props.value.assettype === "Cheque" ? 'Cash' : props.value.assettype }, 'Cash')
                            }}
                          // color="primary"
                          >
                            WITHDRAW
               </button>
                        }
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
            </DialogContentText>

            <DialogContentText id="alert-dialog-slide-description">

            </DialogContentText>

          </DialogContent>
        </>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>

      </Dialog>
    </div >
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
)(withRouter(ChequeForm));
