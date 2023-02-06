import AuthAction from "../actions/authAction";
import * as firebase from "firebase";
import { auth, db } from "../../../app/Firebaseconfig";
import CustomerActions from "../actions/CustomerAction";
import { toast } from "react-toastify";
export default class CustomerMiddileware {
  static GetAllUser() {
    return (dispatch) => {
      db.collection("All_Customers").onSnapshot(function(snapshot) {
        let arr = [];
        snapshot.docs.forEach(function(change) {
          arr.push({ ...change.data(), db_id: change.id });
          //   console.log(arr);
        });
        dispatch(CustomerActions.GetAllCustomer(arr));
      });
    };
  }
  static AddCustomer(data) {
    return (dispatch) => {
      db.collection("All_Customers")
        .add(data)
        .then((doc) => {
          dispatch(CustomerActions.AddCustoemr({ ...data, db_id: doc.id }));
          // alert("new user Addd");
          toast("Customer Add SuccessFully", {
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
  static EditCustomer(data, id) {
    return (dispatch) => {
      db.collection("All_Customers")
        .doc(id)
        .update(data)
        .then(() => {
          toast("Customer Update SuccessFully", {
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
  static DeleteCustomer(id) {
    return (dispatch) => {
      db.collection("All_Customers")
        .doc(id)
        .delete()
        .then(() => {
          toast("Customer Deleted SuccessFully", {
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
