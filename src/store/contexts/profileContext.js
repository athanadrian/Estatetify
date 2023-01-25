import {
  updateProfile,
  db,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  getDoc,
} from 'firebase.config';

import { useContext, createContext, useReducer, useEffect } from 'react';

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
import reducer from '../reducers/profileReducer';
import { toast } from 'react-toastify';
import { useAuthContext } from './authContext';

const initialState = {
  isLoading: false,
  myProfile: undefined,
  profileUser: undefined,
  users: [],
};

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, loggedIn } = useAuthContext();

  useEffect(() => {
    getMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

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

  const getMyProfile = async () => {
    dispatch({ type: GET_MY_PROFILE_BEGIN });
    try {
      if (loggedIn) {
        const userRef = doc(db, 'users', user?.uid);
        onSnapshot(userRef, (userDoc) => {
          if (userDoc.exists()) {
            dispatch({
              type: GET_MY_PROFILE_SUCCESS,
              payload: { myProfile: { ...userDoc.data(), uid: user?.uid } },
            });
          }
        });
      } else {
        dispatch({
          type: GET_MY_PROFILE_SUCCESS,
          payload: { myProfile: null },
        });
      }
    } catch (error) {
      console.log('😱 Error Get My Profile: ', error.message);
      dispatch({ type: GET_MY_PROFILE_ERROR });
      toast.error('😱 Error: Could not get profile');
    }
  };

  const getProfileUser = async (id) => {
    if (id) {
      dispatch({ type: GET_USER_PROFILE_BEGIN });
      try {
        const userRef = doc(db, 'users', id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: { profileUser: { ...userDoc.data(), uid: id } },
          });
        }
      } catch (error) {
        console.log('😱 Error Get User: ', error.message);
        dispatch({ type: GET_USER_PROFILE_ERROR });
        toast.error('😱 Error: Could not get user data');
      }
    }
  };

  const updateUser = async (userData) => {
    const { fullName, mobile, avatar, call, sms, viber, whatsApp, role } =
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
        const userRef = doc(db, 'users', user?.uid);
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
        //TODO
        //Check if onSnapshot does the update job
        await getMyProfile();
        dispatch({ type: UPDATE_USER_SUCCESS });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.log('😱 Error Update User: ', error.message);
      dispatch({ type: UPDATE_USER_ERROR });
      toast.error('😱 Error: ', error.message);
    }
  };

  const changeUserRole = async (userId, role) => {
    dispatch({ type: CHANGE_USER_ROLE_BEGIN });
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role,
      });
      dispatch({ type: CHANGE_USER_ROLE_SUCCESS });
      toast.success(`User role updated to ${role} successfully!`);
    } catch (error) {
      console.log('😱 Error Change User Role: ', error.message);
      dispatch({ type: CHANGE_USER_ROLE_ERROR });
      toast.error('😱 Error: ', error.message);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getAllProfiles,
        getProfileUser,
        getMyProfile,
        updateUser,
        changeUserRole,
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
