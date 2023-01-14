import { useContext, createContext, useReducer } from 'react';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_PROFILE_MODAL,
  CLOSE_PROFILE_MODAL,
  SHOW_GRID_VIEW,
  SAVE_URL,
} from '../actions/commonActions';
import reducer from '../reducers/commonReducer';

const initialState = {
  showModal: false,
  showProfileModal: false,
  showGrid: true,
  previousURL: undefined,
  logo: 'https://firebasestorage.googleapis.com/v0/b/estatetify-db.appspot.com/o/logo512.png?alt=media&token=008a2f5b-86b5-4334-95c4-bf48071260b8',
};

const CommonContext = createContext();

const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  const openProfileModal = () => {
    dispatch({ type: OPEN_PROFILE_MODAL });
  };

  const closeProfileModal = () => {
    dispatch({ type: CLOSE_PROFILE_MODAL });
  };

  const showGridView = (status) => {
    dispatch({ type: SHOW_GRID_VIEW, payload: { status } });
  };

  const saveURL = (url) => {
    dispatch({ type: SAVE_URL, payload: { url } });
  };

  return (
    <CommonContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        openProfileModal,
        closeProfileModal,
        showGridView,
        saveURL,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

const useCommonContext = () => {
  return useContext(CommonContext);
};

export { CommonProvider, useCommonContext };
