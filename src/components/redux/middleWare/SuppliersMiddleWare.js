import AuthAction from "../actions/authAction";
import * as firebase from "firebase";
import { auth, db } from "../../../app/Firebaseconfig";
import CustomerActions from "../actions/SuppliersAction";
import { toast } from "react-toastify";
export default class CustomerMiddileware {
  static GetAllSupplier() {
    return (dispatch) => {
      db.collection("All_Supplier").onSnapshot(function(snapshot) {
        let arr = [];
        snapshot.docs.forEach(function(change) {
          arr.push({ ...change.data(), db_id: change.id });
        });
        dispatch(CustomerActions.GetAllSupplier(arr));
      });
    };
  }
  static AddSupplier(data) {
    return (dispatch) => {
      db.collection("All_Supplier")
        .add(data)
        .then((doc) => {
          dispatch(CustomerActions.AddSupplier({ ...data, db_id: doc.id }));
          // alert("new user Addd");
          toast("Supplier Add SuccessFully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: false,
            pauseOnHover: false,
          });
        });
    };
  }
  static EditSupplier(data, id) {
    return (dispatch) => {
      db.collection("All_Supplier")
        .doc(id)
        .update(data)
        .then(() => {
          toast("Supplier Update SuccessFully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: false,
            pauseOnHover: false,
          });
        });
    };
  }
  static DeleteSupplier(id) {
    return (dispatch) => {
      db.collection("All_Supplier")
        .doc(id)
        .delete()
        .then(() => {
          toast("Supplier Deleted SuccessFully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: false,
            pauseOnHover: false,
          });
        });
    };
  }
}
