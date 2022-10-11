import { useAuth } from 'hooks/useAuth';
import { updateProfile, db, doc, updateDoc } from 'firebase.config';

import { useContext, createContext, useReducer } from 'react';

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '../actions/profileActions';
import reducer from '../reducers/profileReducer';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  listing: {},
  listings: [],
};

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const updateUser = async (userData) => {
    const { fullName, avatar } = userData;
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      if (user?.displayName !== fullName || user?.photoURL !== avatar) {
        // update data firebase/auth
        await updateProfile(user, {
          displayName: fullName,
          photoURL: avatar,
        });
        // update data in firestore
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, {
          displayName: fullName,
          photoURL: avatar,
        });
        dispatch({ type: UPDATE_USER_SUCCESS });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.log('😱 Error Profile: ', error.message);
      dispatch({ type: UPDATE_USER_ERROR });
      toast.error('😱 Error: ', error.message);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        displayAlert,
        updateUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfileContext };
