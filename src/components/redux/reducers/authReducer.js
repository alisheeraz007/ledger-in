import {
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ROUT_GUARD
} from "../constants";
const initialState = {
  isUserSecureGuard: false,
  user: null,
  isLoading: false,
  isError: false,
  error: {},
  // user: undefined,
  authToken: undefined
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ROUT_GUARD:
      return {
        ...state,
        isUserSecureGuard: action.payload
      };
    case SIGNIN:
    case SIGNUP:
    case LOGOUT:
      return {
        ...state,
        isLoading: true
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLogOut: false,
        isError: false
      };
    case SIGNIN_FAILURE:
    case SIGNUP_FAILURE:
    case LOGOUT_FAILURE:
      // alert(action.error.message);
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isUserSecureGuard: false,
        user: null,
        isLoading: false,
        isError: false,
        error: {}
      };
    default:
      return state;
  }
}
