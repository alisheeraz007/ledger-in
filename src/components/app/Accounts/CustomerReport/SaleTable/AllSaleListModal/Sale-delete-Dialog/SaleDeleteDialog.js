import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import AccountMiddileware from "../../../../../../redux/middleWare/accountMiddileWare";

function SaleDeleteDialog(props) {
  // Customers UI Context
  let { id, show, onHide } = props;

  useEffect(() => {
    if (!id) {
      onHide();
    }
  }, [id]);

  const deleteEntry = () => {
    if (id.returnInvoiceNumber) {
      props.EditEntry(
        {
          ...props.AccountReducer.All_entries.filter(
            (obj) => obj.invoiceNumber === id.returnInvoiceNumber
          )[0],
          returnInvoice: '',
        },
        "Entry Deleted Successfully"
      );
    } else
      props.DeleteEntry(id.db_id);
    onHide();
  };
  // console.log(id)

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Delete Entry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure to permanently delete this Entry?</span>
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
            onClick={deleteEntry}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    DeleteEntry: (id) => dispatch(AccountMiddileware.DeleteEntry(id)),
    EditEntry: (data, customeText) => dispatch(AccountMiddileware.EditEntry(data, customeText)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    AccountReducer: state.AccountReducer,
    CustomerReducer: state.CustomerReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleDeleteDialog);
