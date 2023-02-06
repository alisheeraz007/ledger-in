import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import * as actions from "../../../_redux/customers/customersActions";
import { CustomerEditDialogHeader } from "./CustomerEditDialogHeader";
import { CustomerEditForm } from "./CustomerEditForm";
import { useCustomersUIContext } from "../CustomersUIContext";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
import SuppliersMiddleware from "../../../../redux/middleWare/SuppliersMiddleWare";
import { connect } from "react-redux";
import { Card } from "../../../../../_metronic/_partials/controls";

function CustomerEditDialog(props) {
  // Customers UI Context
  let { id, show, onHide } = props;
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      initCustomer: customersUIContext.initCustomer,
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
    if (id && props.SupplierReducer.entities) {
      setCustomerForEdit(
        props.SupplierReducer.entities.filter((obj) => obj.db_id == id)[0]
      );
    }
  }, [id]);

  // server request for saving customer
  const saveCustomer = (customer, id) => {
    if (!id) {
      props.AddSupplier(customer);
      onHide();
      // server request for creating customer
      // dispatch(actions.createCustomer(customer)).then(() => onHide());
    } else {
      onHide();
      // server request for updating customer
      props.EditSupplier({...customer,date:customerForEdit.date}, id);
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
      AddSupplier: (data) => dispatch(SuppliersMiddleware.AddSupplier(data)),
      EditSupplier: (data, id) =>
        dispatch(SuppliersMiddleware.EditSupplier(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    SupplierReducer: state.SupplierReducer,

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditDialog);
