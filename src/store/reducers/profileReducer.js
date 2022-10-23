import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '../actions/profileActions';

const reducer = (state, action) => {
  if (action.type === GET_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      profileUser: action.payload.profileUser,
    };
  }

  if (action.type === GET_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
