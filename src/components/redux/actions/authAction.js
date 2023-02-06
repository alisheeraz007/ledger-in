import {
  ROUT_GUARD,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../constants";

export default class AuthActions {
  static routGuardAction(data) {
    return {
      type: ROUT_GUARD,
      payload: data,
    };
  }
  static signin(data) {
    return {
      type: SIGNIN,
      payload: data,
    };
  }

  static signinSuccess(data) {
    return {
      type: SIGNIN_SUCCESS,
      payload: data,
    };
  }
  static signinFailure(error) {
    return {
      type: SIGNIN_FAILURE,
      error: error,
    };
  }

  static signup(data) {
    return {
      type: SIGNUP,
      payload: data,
    };
  }

  static signupSuccess(data) {
    return {
      type: SIGNUP_SUCCESS,
      payload: data,
    };
  }

  static signupFailure(error) {
    return {
      type: SIGNUP_FAILURE,
      error: error,
    };
  }

  static logout(data) {
    return {
      type: LOGOUT,
      payload: data,
    };
  }

  static logoutSuccess() {
    return {
      type: LOGOUT_SUCCESS,
    };
  }

  static logoutFailure(error) {
    return {
      type: LOGOUT_FAILURE,
      error: error,
    };
  }
}
