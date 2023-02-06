import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/customers/customersActions";
import { CustomerEditDialogHeader } from "./CustomerEditDialogHeader";
import { CustomerEditForm } from "./CustomerEditForm";
import { useCustomersUIContext } from "../../../../e-commerce/customers/CustomersUIContext";
import CustomerMiddileware from "../../../../../redux/middleWare/CustomerMIddileWare";
import { connect } from "react-redux";

function CustomerEditDialog(props) {
  // Customers UI Context
  let { id, show, onHide } = props;
  const customersUIContext = useCustomersUIContext();
  const initCustomer = {
    CustomerName: "",
    email: "",
    phoneNumber: "",
    Address: "",
    CustomerType: "Retailer",
  };
  const customersUIProps = useMemo(() => {
    return {
      initCustomer: initCustomer,
    };
  }, [customersUIContext]);
  const [customerForEdit, setCustomerForEdit] = useState("");
  // Customers Redux state
  // const dispatch = useDispatch();
  // const { actionsLoading, customerForEdit } = useSelector(
  //   (state) => ({
  //     actionsLoading: state.customers.actionsLoading,
  //     customerForEdit: state.customers.customerForEdit,
  //   }),
  //   shallowEqual
  // );

  useEffect(() => {
    //   // server call for getting Customer by id
    if (id && props.CustomerReducer.entities) {
      setCustomerForEdit(
        props.CustomerReducer.entities.filter((obj) => obj.id == id)[0]
      );
    }
  }, [id]);

  // server request for saving customer
  const saveCustomer = (customer, id) => {
    if (!id) {
      props.AddCustomer(customer);
      onHide();
      // server request for creating customer
      // dispatch(actions.createCustomer(customer)).then(() => onHide());
    } else {
      onHide();
      // server request for updating customer
      props.EditCustomer(customer, id);
      // dispatch(actions.updateCustomer(customer)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="sm"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerEditDialogHeader id={id} customerForEdit={customerForEdit} />
      <CustomerEditForm
        saveCustomer={saveCustomer}
        // actionsLoading={actionsLoading}
        customer={customerForEdit || customersUIProps.initCustomer}
        onHide={onHide}
      />
    </Modal>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddCustomer: (data) => dispatch(CustomerMiddileware.AddCustomer(data)),
    EditCustomer: (data, id) =>
      dispatch(CustomerMiddileware.EditCustomer(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditDialog);
