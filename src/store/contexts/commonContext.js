import { useContext, createContext, useReducer } from 'react';

import { OPEN_MODAL, CLOSE_MODAL } from '../actions/commonActions';
import reducer from '../reducers/commonReducer';

const initialState = {
  showModal: false,
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
