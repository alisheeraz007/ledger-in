import AuthAction from "../actions/authAction";
import * as firebase from "firebase";
import { auth, db } from "../../../app/Firebaseconfig";
import ProductActions from "../actions/ProductAction";
import { toast } from "react-toastify";
import AccountActions from "../actions/AccountAction";
// import ProductTableMock from "../../../app/modules/ECommerce/__mocks__/ProductTableMock";
export default class AccountMiddileware {
  static GetAllAccount() {
    return (dispatch) => {
      db.collection("Account").onSnapshot(function(snapshot) {
        let arr = [];
        snapshot.docs.forEach(function(Val) {
          Val.data().data.forEach(function(value) {
            arr.push({
              ...value,
              // typesLength: value.types ? value.types.length : 0,
            });
          });

        });
        // console.log(arr)
        dispatch(AccountActions.GetAllAccount(arr));
      });
    };
  }
  static AddAccountHead(data, main_Heads, toastMes) {
    // console.log(data,main_Heads,toastMes);
    return (dispatch) => {
      db.collection("Account")
        .doc(main_Heads)
        .set(data)
        .then((doc) => {
          // console.log(doc.id)
          // dispatch(AccountActions.AddAccountHead({ ...data, db_id: doc.id }));
          toast(`${toastMes} Head SuccessFully`, {
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
  static DeleteAccountEntry(id) {
    return (dispatch) => {
      db.collection("All_Entries")
        .doc(id)
        .delete()
        .then(() => {
          toast("Entry Deleted SuccessFully", {
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
  static AddEntry(data, customeText) {
    return (dispatch) => {
      db.collection("All_Entries")
        .add(data)
        .then((doc) => {
          // console.log(doc.id)
          // dispatch(AccountActions.AddAccountHead({ ...data, db_id: doc.id }));
          toast(customeText ? customeText : `Add Sale SuccessFully`, {
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
  static GetAllEntry() {
    return (dispatch) => {
      db.collection("All_Entries").onSnapshot(function(snapshot) {
        let arr = [];
        let accountEntries = [];
        snapshot.docs.forEach(function(change) {
          if (change.data().HeadType == "Sale") {
            arr.push({
              ...change.data(),
              TotalSaleItem: change.data().SaleItem.length,
              db_id: change.id,
            });
          } else {
            accountEntries.push({
              ...change.data(),
              db_id: change.id,
            });
          }
        });
        dispatch(AccountActions.Get_AllEntries(arr, accountEntries));
      });
    };
  }
  static EditEntry(data, customeText) {
    return (dispatch) => {
      db.collection("All_Entries")
        .doc(data.db_id)
        .update(data)
        .then(() => {
          toast(customeText ? customeText :"Entry Update SuccessFully", {
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
  static DeleteEntry(id) {
    return (dispatch) => {
      db.collection("All_Entries")
        .doc(id)
        .delete()
        .then(() => {
          toast("Entry Deleted SuccessFully", {
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
