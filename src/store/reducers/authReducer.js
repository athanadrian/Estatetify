import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
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
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'error',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
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
      //listings: action.payload.listings,
    };
  }

  if (action.type === SIGN_UP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
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
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
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
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
