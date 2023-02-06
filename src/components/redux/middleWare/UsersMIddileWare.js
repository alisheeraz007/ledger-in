import AuthAction from "../actions/authAction";
import * as firebase from "firebase";
import { auth, db } from "../../../app/Firebaseconfig";
import UsersActions from "../actions/UsersAction";
import { toast } from "react-toastify";
export default class UsersMiddileware {
  static GetAllUser() {
    return (dispatch) => {
      db.collection("All_user").onSnapshot(function(snapshot) {
        let arr = [];
        snapshot.docs.forEach(function(change) {
          arr.push({ ...change.data(), db_id: change.id });
        });
        dispatch(UsersActions.GetAllUsers(arr));
      });
    };
  }
  static AddUsers(data) {
    return (dispatch) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(function(firebaseUser) {
          db.collection("All_user")
            .doc(firebaseUser.user.uid)
            .set(data)
            .then((doc) => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  let obj = JSON.parse(localStorage.getItem("Login_User"));
                  toast("User Add SuccessFully", {
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
                  setTimeout(() => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(obj.email, obj.password);
                  }, 2000);
                });
            });
        });
    };
  }
  static EditUsers(data, id) {
    return (dispatch) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.oldPassword)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(data.password)
            .then(() => {
              db.collection("All_user")
                .doc(id)
                .update(data)
                .then(() => {
                  firebase.auth().signOut();
                  let obj = JSON.parse(localStorage.getItem("Login_User"));
                  setTimeout(() => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(obj.email, obj.password);
                  }, 2000);
                  toast("User Update SuccessFully", {
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
            });
        });
    };
  }
  static DeleteUsers(id) {
    return (dispatch) => {
      db.collection("All_user")
        .doc(id)
        .delete()
        .then(() => {
          toast("User Deleted SuccessFully", {
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
