/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
// import * as actions from "../../../_redux/products/productsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
// import { Specifications } from "../product-specifications/Specifications";
// import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import { withRouter } from "react-router-dom";
// import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
// import { Remarks } from "../product-remarks/Remarks";

function ProductEdit(props) {
  // Subheader
  let {
    history,
    match: {
      params: { id },
    },
  } = props;
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [bar_code, setbar_code] = useState("");
  const initProduct = {
    id: undefined,
    bar_code: bar_code,
    product_name: "",
    description: "",
    color: "Red",
    price: "",
    quantity: "",
    retailPrice: "",
    wholeSalePrice: "",
    date: new Date(),
  };

  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  // const { actionsLoading, productForEdit } = useSelector(
  //   (state) => ({
  //     actionsLoading: state.products.actionsLoading,
  //     productForEdit: state.products.productForEdit,
  //   }),
  //   shallowEqual
  // );
  const [productForEdit, setproductForEdit] = useState("");
  useEffect(() => {
    //   // server call for getting Customer by ids
    if (id && props.ProductReducer.entities) {
      setproductForEdit(
        props.ProductReducer.entities.filter((obj) => obj.db_id == id)[0]
      );
    }
    let arr = props.ProductReducer.entities
      .filter(
        (obj) =>
          obj.bar_code.slice(3, 5) ==
            makingLength_2(new Date().getMonth() + 1) &&
          obj.bar_code.slice(0, 2) ==
            makingLength_2(new Date().getFullYear(), 2)
      )
      .map((a, i) => {
        return a.bar_code;
      });
    let sort = arr.sort((a, b) => Number(b.slice(6)) - Number(a.slice(6)));
    if (arr.length < 1) {
      Code(1);
    } else {
      Code(Number(sort[0].slice(6)) + 1);
    }
  }, [id, props]);

  // useEffect(() => {
  //   dispatch(actions.fetchProduct(id));
  // }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Product";
    if (productForEdit && id) {
      _title = `Edit product '${productForEdit.bar_code}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  const saveProduct = (values) => {

    if (!id) {
      props.AddProduct({ ...values, date: values.date.getTime() });
      // backToProductsList();
    } else {
      props.EditProduct({ ...values, date: values.date.getTime() }, id);
      backToProductsList();
    }
  };

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProductsList = () => {
    history.push(`/e-commerce/products`);
  };
  const makingLength_2 = (value, length) => {
    if (length && length !== 2) {
      value = value.toString();
      let correctValue =
        value.length === 1
          ? "000" + value
          : value.length === 2
          ? "00" + value
          : value.length === 3
          ? "0" + value
          : value;
      return correctValue;
    } else if (length === 2) {
      value = value.toString();
      let correctValue = value.slice(value.length - 2);
      return correctValue;
    }
    // else if (length === 2) {
    //   value = value.toString();
    //   let correctValue = value.slice(value.length - 2);
    //   return correctValue;
    // }
    else {
      value = value.toString();
      let correctValue = value.length === 1 ? "0" + value : value;
      return correctValue;
    }
  };
  const Code = (value) => {
    let d = new Date();
    let year = makingLength_2(d.getFullYear(), 2);
    let month = makingLength_2(d.getMonth() + 1);
    let index = makingLength_2(value, 3);
    // return `${year}-${month}-${index}`;
    setbar_code(`${year}-${month}-${index}`);
    return value;
  };
  return (
    <Card>
      {/* {actionsLoading && <ModalProgressBar />} */}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            style={{ display: "none" }}
            onClick={saveProductClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5 d-flex" style={{ justifyContent: "center" }}>
          <Card
            style={{ padding: "20px", background: "aliceblue" }}
            className="col-lg-8"
          >
            <ProductEditForm
              // actionsLoading={actionsLoading}
              Code={Code}
              product={productForEdit || initProduct}
              btnRef={btnRef}
              saveProductClick={saveProductClick}
              saveProduct={saveProduct}
            />
          </Card>
        </div>
      </CardBody>
    </Card>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddProduct: (data) => dispatch(ProductMiddileware.AddProduct(data)),
    EditProduct: (data, id) =>
      dispatch(ProductMiddileware.EditProduct(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductEdit));
