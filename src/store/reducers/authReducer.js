import {
  GET_USER_LOGIN_STATE,
  GET_USER_LOGOUT_STATE,
  SIGN_UP_USER_BEGIN,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_ERROR,
  SIGN_IN_USER_BEGIN,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../actions/authActions';

const reducer = (state, action) => {
  if (action.type === GET_USER_LOGIN_STATE) {
    const user = action.payload.user;
    return {
      ...state,
      user,
      loggedIn: true,
    };
  }

  if (action.type === GET_USER_LOGOUT_STATE) {
    return {
      ...state,
      loggedIn: false,
      user: null,
    };
  }

  if (action.type === SIGN_UP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SIGN_UP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === SIGN_UP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SIGN_IN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SIGN_IN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === SIGN_IN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === RESET_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === RESET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === RESET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
