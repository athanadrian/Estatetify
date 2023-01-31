import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
  SHOW_GRID_VIEW,
  SAVE_URL,
  FILTER_BY_SEARCH,
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
  if (action.type === SHOW_GRID_VIEW) {
    const showGrid = action.payload.status;
    return {
      ...state,
      showGrid,
    };
  }
  if (action.type === SAVE_URL) {
    const previousURL = action.payload.url;
    return {
      ...state,
      previousURL,
    };
  }

  if (action.type === FILTER_BY_SEARCH) {
    const filteredItems = action.payload.filteredItems;
    return {
      ...state,
      filteredItems,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
