import { useContext, createContext, useReducer } from 'react';

import { OPEN_MODAL, CLOSE_MODAL } from '../actions/commonActions';
import reducer from '../reducers/commonReducer';

const initialState = {
  showModal: false,
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

  return (
    <CommonContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
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
