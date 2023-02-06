/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import AccountMiddileware from "../../../../redux/middleWare/accountMiddileWare";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
// import * as actions from "../../../_redux/products/productsActions";
import { useAccountUIContext } from "../AccountUIContext";

function MasterHeadDeleteDialog(props) {
  let { id, show, onHide } = props;
  // Products UI Context
  const productsUIContext = useAccountUIContext();
  const productsUIProps = useMemo(() => {
    return {
      // setIds: productsUIContext.setIds,
      // queryParams: productsUIContext.queryParams,
    };
  }, [productsUIContext]);

  // Products Redux state
  const dispatch = useDispatch();
  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.products.actionsLoading }),
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
  useEffect(() => {}, [dispatch]);

  const deleteProduct = () => {
    let oldarr = props.AccountReducer.entities;
    let selectedObj = props.AccountReducer.entities[id];
    oldarr.splice(id, 1);
    let arr = oldarr.filter((obj) => obj.main_Heads == selectedObj.main_Heads);
    props.AddAccountHead(
      {
        data: arr,
      },
      selectedObj.main_Heads,
      "Delete"
    );
    // productsUIProps.setIds([]);
    onHide();
    // });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/* {isLoading && <ModalProgressBar variant="query" />} */}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {!isLoading && ( */}
        <span>Are you sure to permanently delete this Account Head?</span>
        {/* )} */}
        {/* {isLoading && <span>Product is deleting...</span>} */}
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
            onClick={deleteProduct}
            className="btn btn-delete btn-elevate"
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
    AddAccountHead: (data, main_Heads, ToastMes) =>
      dispatch(AccountMiddileware.AddAccountHead(data, main_Heads, ToastMes)),
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
)(MasterHeadDeleteDialog);
