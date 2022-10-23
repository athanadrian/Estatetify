import { OPEN_MODAL, CLOSE_MODAL } from '../actions/commonActions';

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

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
