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
import JouneralEntriesForm from "./AddEntriesFoam";
// import { Specifications } from "../product-specifications/Specifications";
// import { SpecificationsUIProvider } from "../product-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import AccountMiddileWare from "../../../../redux/middleWare/accountMiddileWare";
// import { RemarksUIProvider } from "../product-remarks/RemarksUIContext";
// import { Remarks } from "../product-remarks/Remarks";
import { OverlayTrigger, Tooltip, Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { currentBalance, printElm } from "../../../../redux/constants"
// const initProduct = {
//   main_Heads: "Assets",
//   HeadType: "",
//   type: "",
//   description: "",
//   price: "",
//   date: new Date().getTime(),
//   payment_mode: "Cash",
// };

function JouneralEntries(props) {
  // Subheader
  let {
    history,
    match: {
      params: { id },
    },
  } = props;
  const suhbeader = useSubheader();

  // Tabs
  const [SelectedAccount, setSelectedAccount] = useState("");
  const [title, setTitle] = useState("");
  const [initProduct, setInitProduct] = useState({
    main_Heads: "Expenses",
    HeadType: "",
    type: "",
    description: "",
    price: "",
    date: new Date().getTime(),
    payment_mode: "Cash",
  });
  const [TypesArr, setTypesArr] = useState([]);
  const [MasterHeadForEdit, setMasterHeadForEdit] = useState("");
  const [TypeForEdit, setTypeForEdit] = useState("");
  const [TypeIndexForEdit, setTypeIndexForEdit] = useState("");
  let [checkDate, setCheckDate] = useState("")
  let [assettype, setAssettype] = useState("");
  let [payment_Type, setPayment_Type] = useState('Cash')
  let [Payment_method, setPayment_method] = useState('')
  useEffect(() => {
    if (id && props.AccountReducer.Account_entries) {
      let arr = props.AccountReducer.Account_entries.filter(
        (obj) => obj.db_id == id
      )[0];
      setInitProduct({ ...arr, type: arr.type });
      console.log({ ...arr, type: arr.type })
    }
  }, [id, props]);
  useEffect(() => {
    let arr = props.AccountReducer.Account_entries.filter(
      (obj) => obj.HeadType == SelectedAccount
    )[0];
    if (arr) {
      setTypesArr(arr.types);
    }
  }, [SelectedAccount, props]);

  useEffect(() => {
    let _title = id ? "Edit Expense Entry" : "Expense Entry";
    setTitle(_title);
    suhbeader.setTitle(_title);
  }, [MasterHeadForEdit, id]);

  const saveEntries = (values, print) => {
    if (print === "print") {
      if (id) {
        props.EditEntry(values);
        history.goBack();
      } else {
        printElm('EntryPrint')
        // console.log(print)
        props.AddEntry(values, "Add entry SuccessFully");
      }
    } else if (print != "print") {

      if (values.type && values.price) {
        if (id) {
          props.EditEntry(values);
          history.goBack();
        } else {
          // console.log(print)
          props.AddEntry(values, "Add entry SuccessFully");
        }
      }
    }
  };

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const BackToMasterHeadList = () => {
    history.push(`/Account/Master-Heads`);
  };

  return (
    <>
      <Card>
        {/* {actionsLoading && <ModalProgressBar />} */}
        <CardHeader title={title}>
          <CardHeaderToolbar></CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Card
            style={{
              padding: "20px 5px",
              background: "aliceblue",
              margin: "auto",
            }}
            className="col-lg-8"
          >
            <JouneralEntriesForm
              id={id}
              initialValues={MasterHeadForEdit || initProduct}
              btnRef={btnRef}
              setSelectedAccount={(e) => setSelectedAccount(e)}
              saveEntries={saveEntries}
              TypeForEdit={TypeForEdit}
              TypeButtonText={TypeForEdit ? "Edit Type" : "Add Type"}
              setAssettype={setAssettype}
              checkDate={checkDate}
              setCheckDate={setCheckDate}
              setPayment_Type={setPayment_Type}
              payment_Type={payment_Type}
              assets={props.AccountReducer.entities}
              Payment_method={Payment_method}
              setPayment_method={setPayment_method}


            />
          </Card>
        </CardBody>
      </Card>
    </>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    AddAccountHead: (data, main_Heads, ToastMEs) =>
      dispatch(AccountMiddileWare.AddAccountHead(data, main_Heads, ToastMEs)),
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
    SupplierReducer: state.SupplierReducer,
    SupplyProductReducer: state.SupplyProductReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(JouneralEntries);
