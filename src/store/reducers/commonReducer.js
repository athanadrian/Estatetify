import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
} from '../actions/commonActions';

const reducer = (state, action) => {
  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      showModal: true,
    };
  }
  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      showModal: false,
    };
  }
  if (action.type === OPEN_PROFILE_MODAL) {
    return {
      ...state,
      showProfileModal: true,
    };
  }
  if (action.type === CLOSE_PROFILE_MODAL) {
    return {
      ...state,
      showProfileModal: false,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
