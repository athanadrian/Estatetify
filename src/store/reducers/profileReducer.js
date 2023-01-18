import {
  GET_ALL_PROFILES_BEGIN,
  GET_ALL_PROFILES_SUCCESS,
  GET_USER_PROFILE_BEGIN,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_MY_PROFILE_BEGIN,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CHANGE_USER_ROLE_BEGIN,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_ERROR,
} from '../actions/profileActions';

const reducer = (state, action) => {
  if (action.type === GET_ALL_PROFILES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_ALL_PROFILES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      profiles: action.payload.profiles,
    };
  }

  if (action.type === GET_USER_PROFILE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_USER_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      profileUser: action.payload.profileUser,
    };
  }

  if (action.type === GET_USER_PROFILE_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_MY_PROFILE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_MY_PROFILE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      myProfile: action.payload.myProfile,
    };
  }

  if (action.type === GET_MY_PROFILE_ERROR) {
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

  if (action.type === CHANGE_USER_ROLE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CHANGE_USER_ROLE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CHANGE_USER_ROLE_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
