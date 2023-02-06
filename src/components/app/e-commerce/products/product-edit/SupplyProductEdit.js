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
// import { Specifications } from "../product-specifications/Specifications";
// import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import ProductMiddileware from "../../../../redux/middleWare/ProductMIddileWare";
import SupplierMiddileware from "../../../../redux/middleWare/SuppliersMiddleWare";
import SupplierProductMiddileware from "../../../../redux/middleWare/SupplierProductMIddileWare";
// import SupplierProductMiddileware from "../../../../redux/middleWare/SupplierProductMiddileware";
import { withRouter } from "react-router-dom";
import { Dropdown, Select } from "semantic-ui-react";
// import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
// import { Remarks } from "../product-remarks/Remarks";
import { currentBalance, matchSupProduct, printElmPurchase } from "./../../../../redux/constants";
import SupplyProductEditForm from "./SupplyProductEditForm";
import { toast } from "react-toastify";

function SupplyProductEdit(props) {
  // Subheader
  let {
    history,
    match: {
      params: { id },
    },
  } = props;
  const suhbeader = useSubheader();
  const [user, setUser] = useState(props.authReducer.user);

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const [bar_code, setbar_code] = useState("");
  const [purchaseInvoice, setPurchaseInvoice] = useState("")
  const [proAdd, setProAdd] = useState({})
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
  // useEffect(() => {
  //   console.log(...props.ProductReducer.entities)
  // }, [props.ProductReducer])
  const [productForEdit, setproductForEdit] = useState("");
  const [proEditArr, setProEditArr] = useState([])
  useEffect(() => {
    //   // server call for getting Customer by id
    if (id && props.SupplyProductReducer.entities) {
      setproductForEdit(
        props.SupplyProductReducer.entities.filter((obj) => obj.db_id == id)[0]
      );
    }
    setProEditArr(productForEdit.purchasedItems)

    let arr = (proAdd.length ? [...props.ProductReducer.entities, ...proAdd] : props.ProductReducer.entities)
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
    // console.log(arr, "arrss")
    let sort = arr.sort((a, b) => Number(b.slice(6)) - Number(a.slice(6)));
    if (arr.length < 1) {
      Code(1);
    } else {
      Code(Number(sort[0].slice(6)) + 1);
    }
  }, [id, props, proAdd]);

  // useEffect(() => {
  //   dispatch(actions.fetchProduct(id));
  // }, [id, dispatch]);
  useEffect(() => { console.log(proEditArr) }, [proEditArr]);

  useEffect(() => {
    let _title = id ? "" : "New Supplier Product";
    if (productForEdit && id) {
      _title = `Edit Purchase Invoice ${productForEdit.purchaseInvoice}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  let [supplier, setSupplier] = useState("");
  useEffect(() => {
  }, [props.SupplyProductReducer.entities, supplier]);
  useEffect(() => {
    if (id && props.SuppliersReducer.entities) {
      setSupplier(
        props.SupplyProductReducer.entities.filter((obj) => obj.db_id === id)[0]
          .supplier
      );
    }
  }, [id, props.SupplyProductReducer]);


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
        props.SupplyProductReducer.entities,
        props.ProductReducer.entities
      ).rowId
    );
    setProId(
      matchSupProduct(
        id,
        props.SupplyProductReducer.entities,
        props.ProductReducer.entities
      ).proId
    );
  }, [props.SupplyProductReducer]);

  const saveProduct = (values, totalArr) => {

    printElmPurchase('purchasePrint')
    // console.log(values)
    if (!id) {
      if (values) {
        // for(let i = 0; i < values.purchasedItems.length)
        values.purchasedItems.map((a, i) => {
          props.AddProduct({ ...a, date: values.date, PaymentPaid: a.PaymentPaid ? a.PaymentPaid : 0, TotalAmount: a.TotalAmount ? a.TotalAmount : 0 });
        })
      }
      props.SupAddProduct(values);
      // backToProductsList();
    } else {
      if (values) {
        // for(let i = 0; i < values.purchasedItems.length)
        console.log(values)
        values.purchasedItems.map((a, i) => {
          if (props.ProductReducer) {
            props.ProductReducer.entities.map((b, j) => {
              if (b.bar_code === a.bar_code) {
                props.EditProduct({ ...a, date: values.date, PaymentPaid: a.PaymentPaid ? a.PaymentPaid : 0, TotalAmount: a.TotalAmount ? a.TotalAmount : 0 }, b.db_id);
                // console.log(rowId)
              }
              // else {
              //   toast.error(`You Are Editing Previous Purchase Make New Invoice For New Products `, {
              //     position: "top-right",
              //     autoClose: 5000,
              //     hideProgressBar: false,
              //     closeOnClick: true,
              //     pauseOnHover: true,
              //     draggable: true,
              //     progress: undefined,
              //   })
              // }
              props.SupEditProduct({
                ...values,
                date: typeof values.date === 'number' ? values.date : values.date.getTime(),
                supplier: supplier,
                ...totalArr,
              }, rowId);
            })
          }
        })
      }

      // if (!rowId && !proId) {
      //   props.EditProduct({ ...values, date: values.date.getTime() }, id);
      //   props.SupEditProduct({
      //     ...values,
      //     date: values.date.getTime(),
      //     supplier: supplier,
      //     ...totalArr,
      //   });
      // } else if (rowId && proId) {
      //   props.EditProduct(
      //     {
      //       ...values,
      //       date: productForEdit.date,
      //       // TotalAmount:
      //       //   values.TotalAmount > 0
      //       //     ? values.TotalAmount
      //       //     : productForEdit.TotalAmount,
      //       // PaymentPaid:
      //       //   values.PaymentPaid > 0
      //       //     ? values.PaymentPaid
      //       //     : productForEdit.PaymentPaid,
      //       // balance:
      //       //   values.balance > 0 ? values.balance : productForEdit.balance,
      //     },
      //     proId
      //   );
      //   props.SupEditProduct(
      //     {
      //       ...values,

      //       ...totalArr,

      //       date: productForEdit.date,

      //       // SaleQuantity: Number(values.SaleQuantity) > 0?
      //       // Number(values.SaleQuantity) : productForEdit.SaleQuantity,

      //       TotalAmount: Number(values.TotalAmount) > 0
      //         ? Number(values.TotalAmount)
      //         : productForEdit.TotalAmount,

      //       price: Number(values.price) > 0
      //         ? Number(values.price)
      //         : productForEdit.price,

      //       retailPrice: Number(values.retailPrice) > 0
      //         ? Number(values.retailPrice)
      //         : productForEdit.retailPrice,

      //       wholeSalePrice: Number(values.wholeSalePrice) > 0
      //         ? Number(values.wholeSalePrice)
      //         : productForEdit.wholeSalePrice,

      //       balance: Number(values.balance) > 0
      //         ? Number(values.balance)
      //         : productForEdit.balance,

      //       paymentPaid: values.PaymentPaid > 0
      //         ? values.PaymentPaid
      //         : productForEdit.PaymentPaid,

      //       balance: values.balance > 0 ? values.balance : productForEdit.balance,

      //       supplier: supplier,
      //     },
      //     rowId
      //   );
      // }
      // backToProductsList();
    }
  };
  let [total, setTotal] = useState("");
  function totalfn(price, qty, paid) {
    let TotalAmount = 0;
    let paymentPaid = 0;
    let balance = 0;
    TotalAmount += Number(price) * Number(qty);
    paymentPaid += Number(paid);
    balance += TotalAmount - paymentPaid;
    return {
      TotalAmount,
      paymentPaid,
      balance,
    };
  }
  let [supplierOpt, setSupplierOpt] = useState("");
  // useEffect(() => {
  //   let supArr = [];
  //   if (props.SuppliersReducer) {
  //     props.SuppliersReducer.entities.map((a, i) => {
  //       supArr.push(a.SupplierName);
  //     });
  //     setSupplierOpt(supArr);
  //   }
  // }, [props.SuppliersReducer]);
  useEffect(() => {
    props.SuppliersReducer.entities &&
      props.SuppliersReducer.entities.map((Head) => (
        <option key={Head.db_id} value={Head.db_id}>
          {Head.product_name}
        </option>
      ));

    if (props.SuppliersReducer.entities) {
      let arr = props.SuppliersReducer.entities;
      let arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push({
          name: arr[i].SupplierName,
          value: arr[i],
          text: i == 0 ? arr[i].SupplierName : arr[i].SupplierName,
        });
      }
      setSupplierOpt(arr2);
    }
  }, [props.SuppliersReducer.entities]);

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  // let assets = props.AccountReducer.entities;

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
  let [payAmount, setPayAmount] = useState("");

  // useEffect(() => {
  //   if (props.SupplyProductReducer.entities) {
  //     console.log(props.SupplyProductReducer.entities)
  //   }
  // }, [props.SupplyProductReducer])

  useEffect(() => {
    if (props.SupplyProductReducer.entities) {
      let arr = props.SupplyProductReducer.entities.filter(
        (obj) =>
          obj.purchaseInvoice &&
          obj.purchaseInvoice.toString().slice(3, 5) ==
          makingLength_3(new Date().getMonth() + 1) &&
          obj.purchaseInvoice.toString().slice(1, 3) ==
          makingLength_3(new Date().getFullYear(), 2)
      ).map((a, i) => {
        return a.purchaseInvoice;
      });
      let sort = arr.sort(
        (a, b) => Number(b.toString().slice(5)) - Number(a.toString().slice(5))
      );
      // console.log(arr)
      if (sort.length < 1) {
        Code2(1);
      } else {
        Code2(Number(sort[0].toString().slice(5)) + 1, "hsadusajiuj");
      }
    }
  }, [props]);

  const makingLength_3 = (value, length) => {
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
    } else {
      value = value.toString();
      let correctValue = value.length === 1 ? "0" + value : value;
      return correctValue;
    }
  };

  const Code2 = (value) => {
    let d = new Date();
    let year = makingLength_3(d.getFullYear(), 2);
    let month = makingLength_3(d.getMonth() + 1);
    let index = makingLength_3(value, 3);
    // return `${year}-${month}-${index}`;
    setPurchaseInvoice(`P${year}${month}${index}`);
    // console.log(`P${year}${month}${index}`);
    return value;
  };
  // useEffect(() => {

  //   Code2()
  // }, [])





  return (
    <Card>
      {/* {actionsLoading && <ModalProgressBar />} */}
      <CardHeader title={title}>
        {!id ? (
          <div
            className="col-lg-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Dropdown
              placeholder="Supplier Name"
              style={{ height: "40px" }}
              fluid
              search
              // value={values.product_name}
              // disabled={CustomerAdd}
              selection
              scrolling
              options={supplierOpt}
              onChange={(e, { value }, ev) => {
                setSupplier(value);
                // console.log(value)
              }}
            />
          </div>
        ) : null}
        {/* <Select placeholder="Select your country" options={supplierOpt} /> */}
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
        <div
          className="mt-5 d-flex flex-wrap"
          style={{ justifyContent: "center" }}
        >
          {supplier ? (
            <>

              <SupplyProductEditForm
                // actionsLoading={actionsLoading}
                Code={Code}
                product={initProduct}
                proEditArr={proEditArr}
                btnRef={btnRef}
                saveProductClick={saveProductClick}
                saveProduct={saveProduct}
                supplier={supplier}
                totalfn={totalfn}
                setTotal={setTotal}
                assets={props.AccountReducer.entities}
                productsArr={props.SupplyProductReducer.entities}
                AccEn={props.AccountReducer.Account_entries}
                purchaseInvoice={purchaseInvoice}
                proAdd={proAdd}
                setProAdd={setProAdd}
                user={user}
                id={id}

              // setPrice={setPrice}
              // price={price}
              // setQty={setQty}
              // qty={qty}
              // totalfn={totalfn}
              />
              {/* <div>

              </div> */}
            </>
          ) : null}
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
    SupAddProduct: (data) =>
      dispatch(SupplierProductMiddileware.AddProduct(data)),
    SupEditProduct: (data, id) =>
      dispatch(SupplierProductMiddileware.EditProduct(data, id)),
  };
}
function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    CustomerReducer: state.CustomerReducer,
    ProductReducer: state.ProductReducer,
    SupplyProductReducer: state.SupplyProductReducer,
    SuppliersReducer: state.SupplierReducer,
    AccountReducer: state.AccountReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SupplyProductEdit));
