import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase.config';

import { useContext, createContext, useReducer } from 'react';

import {
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
import reducer from '../reducers/authReducer';
import { toast } from 'react-toastify';
import { getFirebaseErrorMessage } from 'common/helpers';

const initialState = {
  isLoading: false,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signUpUser = async (signUpData) => {
    const { fullName, email, password } = signUpData;
    dispatch({ type: SIGN_UP_USER_BEGIN });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: fullName });
      const user = userCredential.user;
      const userData = { ...signUpData };
      delete userData.password;
      userData.mobile = '';
      userData.avatar = '';
      userData.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), userData);
      dispatch({ type: SIGN_UP_USER_SUCCESS });
      toast.success('Sign up was successful!');
    } catch (error) {
      dispatch({ type: SIGN_UP_USER_ERROR });
      console.log('😱 Error Sign-up: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };
  const signInUser = async (signInData) => {
    const { email, password } = signInData;
    dispatch({ type: SIGN_IN_USER_BEGIN });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        dispatch({ type: SIGN_IN_USER_SUCCESS });
        toast.success(
          `${userCredential.user.displayName} successfully logged in!`
        );
      }
    } catch (error) {
      dispatch({ type: SIGN_IN_USER_ERROR });
      console.log('😱 Error Sign-in: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const resetPassword = async (email) => {
    dispatch({ type: RESET_PASSWORD_BEGIN });
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({ type: RESET_PASSWORD_SUCCESS });
      toast.success('Email was sent');
    } catch (error) {
      dispatch({ type: RESET_PASSWORD_ERROR });
      console.log('😱 Error Forgot-Password: ', error.message);
      return toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUpUser,
        signInUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
