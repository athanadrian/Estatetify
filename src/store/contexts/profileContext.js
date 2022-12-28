import { useAuth } from 'hooks/useAuth';
import {
  updateProfile,
  db,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase.config';

import { useContext, createContext, useReducer } from 'react';

import {
  GET_ALL_PROFILES_BEGIN,
  GET_ALL_PROFILES_SUCCESS,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from '../actions/profileActions';
import reducer from '../reducers/profileReducer';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  profileUser: undefined,
  users: [],
};

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  const getAllProfiles = async (lim) => {
    dispatch({ type: GET_ALL_PROFILES_BEGIN });
    try {
      const listingsRef = collection(db, 'users');
      const listingQuery = query(
        listingsRef,
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      let profiles = [];
      const profilesDocs = await getDocs(listingQuery);
      profilesDocs.forEach((listingDoc) => {
        return profiles.push({
          id: listingDoc.id,
          ...listingDoc.data(),
        });
      });
      dispatch({
        type: GET_ALL_PROFILES_SUCCESS,
        payload: { profiles },
      });
    } catch (error) {
      console.log('😱 Error get all profiles: ', error.message);
    }
  };

  const getProfileUser = async (id) => {
    if (id) {
      dispatch({ type: GET_USER_BEGIN });
      try {
        const userRef = doc(db, 'users', id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: { profileUser: { ...userDoc.data(), uid: id } },
          });
        }
      } catch (error) {
        console.log('😱 Error Get User: ', error.message);
        dispatch({ type: GET_USER_ERROR });
        toast.error('😱 Error: Could not get user data');
      }
    }
  };

  const updateUser = async (userData) => {
    console.log('userData', userData);
    const { fullName, mobile, avatar, call, sms, viber, whatsApp, role, uid } =
      userData;
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      if (
        user?.displayName !== fullName ||
        user?.mobile !== mobile ||
        user?.avatar !== avatar
      ) {
        // update data firebase/auth
        await updateProfile(user, {
          displayName: fullName,
        });
        // update data in firestore
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          fullName,
          avatar,
          mobile,
          call,
          sms,
          viber,
          whatsApp,
          role,
        });
        await getProfileUser(uid);
        dispatch({ type: UPDATE_USER_SUCCESS });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.log('😱 Error Update User: ', error.message);
      dispatch({ type: UPDATE_USER_ERROR });
      toast.error('😱 Error: ', error.message);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getAllProfiles,
        getProfileUser,
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
