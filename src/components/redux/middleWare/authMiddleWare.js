import AuthAction from "../actions/authAction";
import * as firebase from "firebase";
import { auth, db } from "../../../app/Firebaseconfig";
import { toast } from "react-toastify";
export default class AuthMiddleWare {
  static routGuard() {
    return (dispatch) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          dispatch(AuthAction.routGuardAction(true));
          AuthAction.signinSuccess(null);
        } else {
          dispatch(AuthAction.routGuardAction(true));
          let obj = JSON.parse(localStorage.getItem("Login_User"));
          db.collection("All_user")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (obj && !obj.email) {
                if (doc.data()) {
                  localStorage.setItem(
                    "Login_User",
                    JSON.stringify({ ...doc.data(), uid: user.uid })
                  );

                  dispatch(
                    AuthAction.signinSuccess({
                      ...doc.data(),
                      uid: user.uid,
                    })
                  );
                } else {
                  auth.signOut();
                }
              } else if (obj && doc.data().email == obj.email) {
                localStorage.setItem("Login_User", JSON.stringify(obj));
                dispatch(
                  AuthAction.signinSuccess({
                    ...doc.data(),
                    uid: user.uid,
                  })
                );
              }
            });
        }
      });
    };
  }
  static signIn(data) {
    return (dispatch) => {
      dispatch(AuthAction.signin(true));
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((user) => {
          db.collection("All_user")
            .doc(user.user.uid)
            .get()
            .then((doc) => {
              if (doc.data()) {
                console.log(doc.data())
                localStorage.setItem(
                  "Login_User",
                  JSON.stringify({ ...doc.data(), uid: user.user.uid })
                );

                dispatch(
                  AuthAction.signinSuccess({
                    ...doc.data(),
                    uid: user.user.uid,
                  })
                );
                toast("LogIn Succesfull", {
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
              } else {
                auth.signOut();
                toast.error("Your Account has been deleted", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            });
        })
        .catch((error) => {
          console.log(error)
          dispatch(AuthAction.signinFailure(error));
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
  }
  static signUp(data) {
    return (dispatch) => {
      // dispatch(AuthAction.signup(true));

      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((Newuser) => {
          data.uid = Newuser.user.uid;
          db.collection("All_user")
            .doc(Newuser.user.uid)
            .set(data)
            .then(() => {
              // alert("new user Addd");
              dispatch(AuthAction.signinSuccess(data));
              window.location.href = "/dashboard"
              toast("LogIn Succesfull", {
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
    };
  }

  // static forgetPassword(email) {
  //   var auth = firebase.auth();
  //   var emailAddress = "user@example.com";

  //   auth.sendPasswordResetEmail(emailAddress).then(function () {
  //     // Email sent.
  //   }).catch(function (error) {
  //     // An error happened.
  //   });
  // }

  static logout(data) {
    return (dispatch) => {
      dispatch(AuthAction.logout(true));
      firebase
        .auth()
        .signOut()
        .then((user) => {
          dispatch(AuthAction.logoutSuccess(user));
          localStorage.setItem("Login_User", null);
        })
        .catch((error) => dispatch(AuthAction.logoutFailure(error)));
    };
  }
}
