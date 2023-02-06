import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import CustomerMiddileware from "../../../../redux/middleWare/CustomerMIddileWare";
// import * as actions from "../../../_redux/customers/customersActions";
import { useCustomersUIContext } from "../CustomersUIContext";
import SuppliersMiddleware from "../../../../redux/middleWare/SuppliersMiddleWare";


function CustomerDeleteDialog(props) {
  // Customers UI Context
  let { id, show, onHide } = props;
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
    };
  }, [customersUIContext]);

  // Customers Redux state
  // const dispatch = useDispatch();
  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.customers.actionsLoading }),
  //   shallowEqual
  // );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  // useEffect(() => {}, [isLoading, dispatch]);

  const deleteSupplier = () => {
    // server request for deleting customer by id
    // dispatch(actions.deleteSudeleteSupplier(id)).then(() => {
    // refresh list after deletion
    // dispatch(actions.fetchCustomers(customersUIProps.queryParams));
    // clear selections list
    props.DeleteSupplier(id);
    customersUIProps.setIds([]);
    // closing delete modal
    onHide();
    // });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {/* {isLoading && <ModalProgressBar />} */}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Supplier Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {!isLoading && ( */}
        <span>Are you sure to permanently delete this Supplier?</span>
        {/* )} */}
        {/* {isLoading && <span>Customer is deleting...</span>} */}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteSupplier}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
// function mapDispatchToProps(dispatch) {
//   return {
//     AddCustomer: (data) => dispatch(CustomerMiddileware.AddCustomer(data)),
//     EditCustomer: (data, id) =>
//       dispatch(CustomerMiddileware.EditCustomer(data, id)),
     
//   };
// }
// function mapStateToProps(state) {
//   return {
//     authReducer: state.authReducer,
//     CustomerReducer: state.CustomerReducer,
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditDialog);

function mapDispatchToProps(dispatch) {
  return {
    DeleteSupplier: (id) => dispatch(SuppliersMiddleware.DeleteSupplier(id)),
    AddSupplier: (data) => dispatch(SuppliersMiddleware.AddSupplier(data)),
    EditSupplier: (data, id) =>
      dispatch(SuppliersMiddleware.EditSupplier(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    SuppliersReducer: state.CustomerReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDeleteDialog);
