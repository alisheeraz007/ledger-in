import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AccountReducer from "./reducers/AccountReducer";
// import logger from "redux-logger";
import authReducer from "./reducers/authReducer";
import CustomerReducer from "./reducers/CustomerReducer";
import ProductReducer from "./reducers/ProductReducer";
import UsersReducer from "./reducers/UsersReducer";
import SupplierReducer from "./reducers/SuppliersReducer";
import SupplyProductReducer from "./reducers/SupplierProductReducer";

const rootReducer = combineReducers({
  authReducer,
  CustomerReducer,
  ProductReducer,
  UsersReducer,
  AccountReducer,
  SupplierReducer,
  SupplyProductReducer,
});
let middleWare = applyMiddleware(thunk);

const store = createStore(rootReducer, middleWare);

export default store;
