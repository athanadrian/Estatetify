import { useAuth } from 'hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  db,
  addDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase.config';

import { useContext, createContext, useReducer } from 'react';

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  GET_ALL_LISTINGS_BEGIN,
  GET_ALL_LISTINGS_SUCCESS,
  GET_LISTINGS_BY_USER_BEGIN,
  GET_LISTINGS_BY_USER_SUCCESS,
  GET_MY_LISTINGS_BEGIN,
  GET_MY_LISTINGS_SUCCESS,
  GET_LISTING_BEGIN,
  GET_LISTING_SUCCESS,
  EDIT_LISTING_BEGIN,
  EDIT_LISTING_SUCCESS,
  EDIT_LISTING_ERROR,
  DELETE_LISTING_BEGIN,
  DELETE_LISTING_SUCCESS,
  DELETE_LISTING_ERROR,
} from '../actions/listingsActions';
import reducer from '../reducers/listingsReducer';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  listing: {},
  listings: [],
};

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
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

  const getListings = async () => {
    dispatch({ type: GET_ALL_LISTINGS_BEGIN });
    try {
      // dispatch({
      //   type: GET_ALL_LISTINGS_SUCCESS,
      //   payload: { listings },
      // });
    } catch (error) {
      console.log('😱 Error get listings: ', error.message);
    }
  };

  const getListingsByUser = async (userId) => {
    dispatch({ type: GET_LISTINGS_BY_USER_BEGIN });
    const listingsRef = collection(db, 'listings');
    const listingQuery = query(
      listingsRef,
      where('userRef', '==', userId),
      orderBy('timestamp', 'desc')
    );
    const listingSnap = await getDocs(listingQuery);
    let listings = [];
    listingSnap.forEach((listingDoc) => {
      return listings.push({
        id: listingDoc.id,
        data: listingDoc.data(),
      });
    });
    dispatch({
      type: GET_MY_LISTINGS_SUCCESS,
      payload: { listings },
    });
  };

  const getMyListings = async () => {
    dispatch({ type: GET_MY_LISTINGS_BEGIN });
    const listingsRef = collection(db, 'listings');
    const listingQuery = query(
      listingsRef,
      where('userRef', '==', user.uid),
      orderBy('timestamp', 'desc')
    );
    const listingSnap = await getDocs(listingQuery);
    let listings = [];
    listingSnap.forEach((listingDoc) => {
      return listings.push({
        id: listingDoc.id,
        data: listingDoc.data(),
      });
    });
    dispatch({
      type: GET_MY_LISTINGS_SUCCESS,
      payload: { listings },
    });
  };

  const getListing = async (listingId) => {
    if (listingId) {
      dispatch({ type: GET_LISTING_BEGIN });
      try {
        // const { data } = await clientApi.get(`/buildings/${buildingId}`);
        // dispatch({
        //   type: GET_LISTING_SUCCESS,
        //   payload: { listing: data.listing },
        // });
      } catch (error) {
        console.log('😱 Error get building: ', error.message);
      }
    }
  };

  const createListing = async (listing) => {
    const listingData = {
      ...listing,
      timestamp: serverTimestamp(),
      userRef: user.uid,
    };
    console.log('ctx listingData', listingData);
    return await addDoc(collection(db, 'listings'), listingData);
  };

  const editListing = async (id, listing) => {
    dispatch({ type: EDIT_LISTING_BEGIN });
    try {
      // dispatch({
      //   type: EDIT_LISTING_SUCCESS,
      //   payload: { listing },
      // });
    } catch (error) {
      dispatch({
        type: EDIT_LISTING_ERROR,
        payload: { msg: error.message },
      });
    }
    clearAlert();
  };

  const deleteListing = async (id) => {
    dispatch({ type: DELETE_LISTING_BEGIN });
    try {
      // dispatch({
      //   type: DELETE_LISTING_SUCCESS,
      //   payload: { id },
      // });
    } catch (error) {
      dispatch({
        type: DELETE_LISTING_ERROR,
        payload: { msg: error.message },
      });
    }
    clearAlert();
  };

  const handleUploadImageToStorage = async (image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${user?.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              return console.log('Upload is successful');
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <ListingContext.Provider
      value={{
        ...state,
        displayAlert,
        getListings,
        getMyListings,
        getListingsByUser,
        getListing,
        createListing,
        editListing,
        deleteListing,
        handleUploadImageToStorage,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

const useListingContext = () => {
  return useContext(ListingContext);
};

export { ListingProvider, useListingContext };
