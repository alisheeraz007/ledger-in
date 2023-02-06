import AuthAction from "../actions/authAction";
import * as firebase from "firebase";
import { auth, db } from "../../../app/Firebaseconfig";
import SupplierProductActions from "../actions/SupplierProductAction";
import { toast } from "react-toastify";
// import ProductTableMock from "../../../app/modules/ECommerce/__mocks__/ProductTableMock";
export default class SupplierProductMiddileware {
  static GetAllProduct() {
    return (dispatch) => {
      db.collection("All_SupplierProducts").onSnapshot(function(snapshot) {
        let arr = [];
        snapshot.docs.forEach(function(change) {
          arr.push({ ...change.data(), db_id: change.id });
        });
        dispatch(SupplierProductActions.GetAllProduct(arr));
      });
    };
  }
  static AddProduct(data) {
    data.id = Math.random();
    return (dispatch) => {
      db.collection("All_SupplierProducts")
        .add(data)
        .then((doc) => {
          dispatch(SupplierProductActions.AddProduct({ ...data, db_id: doc.id }));
          // toast("Product Add SuccessFully", {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   newestOnTop: false,
          //   closeOnClick: true,
          //   rtl: false,
          //   pauseOnFocusLoss: false,
          //   draggable: false,
          //   pauseOnHover: false,
          // });
        });
    };
  }
  static EditProduct(data, id) {
    return (dispatch) => {
      db.collection("All_SupplierProducts")
        .doc(id)
        .update(data)
        // .then(() => {
        //   // toast("Product Update SuccessFully", {
        //   //   position: "top-right",
        //   //   autoClose: 2000,
        //   //   hideProgressBar: false,
        //   //   newestOnTop: false,
        //   //   closeOnClick: true,
        //   //   rtl: false,
        //   //   pauseOnFocusLoss: false,
        //   //   draggable: false,
        //   //   pauseOnHover: false,
        //   // });
        // });
    };
  }
  static DeleteSupProduct(id) {
    return (dispatch) => {
      db.collection("All_SupplierProducts")
        .doc(id)
        .delete()
        .then(() => {
          // toast("Product Deleted SuccessFully", {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   newestOnTop: false,
          //   closeOnClick: true,
          //   rtl: false,
          //   pauseOnFocusLoss: false,
          //   draggable: false,
          //   pauseOnHover: false,
          // });
        });
    };
  }
}
