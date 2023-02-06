/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import SupplierProductMiddileware from "../../../../redux/middleWare/SupplierProductMIddileWare";
// import * as actions from "../../../_redux/products/productsActions";
import { useProductsUIContext } from "../ProductsUIContext";
import { matchSupProduct } from "./../../../../redux/constants";

function ProductDeleteDialog(props) {
  let { id, show, onHide } = props;
  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
    };
  }, [productsUIContext]);

  // Products Redux state
  const dispatch = useDispatch();
  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.products.actionsLoading }),
  //   shallowEqual
  // );
  const [rowId, setRowId] = useState("");
  const [proId, setProId] = useState("");
  useEffect(() => {
    // setRowId(
    //   matchSupProduct(
    //     id,
    //     props.ProductReducer.entities,
    //     props.SupplyProductReducer.entities
    //   ).rowId
    // );
    setRowId(
      matchSupProduct(
        id,
        props.ProductReducer.entities,
        props.SupplyProductReducer.entities
      ).rowId
    );
    setProId(
      matchSupProduct(
        id,
        props.ProductReducer.entities,
        props.SupplyProductReducer.entities
      ).proId
    );
  }, [props.SupplyProductReducer]);
  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  // useEffect(() => {}, [dispatch]);
  const deleteProduct = () => {
    // server request for deleting product by id
    // dispatch(actions.deleteProduct(id)).then(() => {
    //   // refresh list after deletion
    //   dispatch(actions.fetchProducts(productsUIProps.queryParams));
    //   // clear selections list
    if (rowId && proId) {
      props.DeleteProduct(rowId);
      props.DeleteSupProduct(proId);
      productsUIProps.setIds([]);
      onHide();
    } else {
      props.DeleteProduct(id);
      productsUIProps.setIds([]);
      onHide();
    }

    // closing delete modal
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
        <Modal.Title id="example-modal-sizes-title-lg">
          Product Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {!isLoading && ( */}
        <span>Are you sure to permanently delete this product?</span>
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
    DeleteProduct: (id) => dispatch(ProductMiddileware.DeleteProduct(id)),
    DeleteSupProduct: (id) =>
      dispatch(SupplierProductMiddileware.DeleteSupProduct(id)),
  };
}

function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    SupplyProductReducer: state.SupplyProductReducer,
    ProductReducer: state.ProductReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDeleteDialog);
