import * as firebase from "firebase";
// // Sameer
// const firebaseConfig = {
//   apiKey: "AIzaSyAniuTwibzCrXzcSm0RYB4lp_xWJkLDhUA",
//   authDomain: "sameer-ms-wear.firebaseapp.com",
//   databaseURL: "https://sameer-ms-wear.firebaseio.com",
//   projectId: "sameer-ms-wear",
//   storageBucket: "sameer-ms-wear.appspot.com",
//   messagingSenderId: "970542842626",
//   appId: "1:970542842626:web:d52c50c17c4d3ea893781b",
//   measurementId: "G-J38EN4JKNC",
// };
// // Credentials
// // fd_@gmail.com
// // 123456

// saqib
const firebaseConfig = {
  apiKey: "AIzaSyBAIpjGaAL0iJNsdZ_oDky771QBIVWnaNE",
  authDomain: "ledger-in.firebaseapp.com",
  projectId: "ledger-in",
  storageBucket: "ledger-in.appspot.com",
  messagingSenderId: "261767973361",
  appId: "1:261767973361:web:26c2a11983150f33d55c50",
  measurementId: "G-Z3SWT6LJX5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export var secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
export const db = firebase.app().firestore();
export const auth = firebase.app().auth();
