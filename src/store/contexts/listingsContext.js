import { useAuth } from 'hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';
import {
  storage,
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
  db,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase.config';

import { useContext, createContext, useReducer } from 'react';
import logo from 'images/estatetify-app.svg';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SET_LOADING,
  GET_ALL_LISTINGS_BEGIN,
  GET_ALL_LISTINGS_SUCCESS,
  GET_LISTINGS_BY_USER_BEGIN,
  GET_LISTINGS_BY_USER_SUCCESS,
  GET_MY_LISTINGS_BEGIN,
  GET_MY_LISTINGS_SUCCESS,
  GET_LISTING_BEGIN,
  GET_LISTING_SUCCESS,
  CREATE_LISTING_BEGIN,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_ERROR,
  EDIT_LISTING_BEGIN,
  EDIT_LISTING_SUCCESS,
  EDIT_LISTING_ERROR,
  DELETE_LISTING_BEGIN,
  DELETE_LISTING_SUCCESS,
  DELETE_LISTING_ERROR,
} from '../actions/listingsActions';
import reducer from '../reducers/listingsReducer';
import { toast } from 'react-toastify';
import { getFirebaseErrorMessage, getFirestoreImage } from 'common/helpers';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  logo: 'https://firebasestorage.googleapis.com/v0/b/estatetify-db.appspot.com/o/logo512.png?alt=media&token=008a2f5b-86b5-4334-95c4-bf48071260b8',
  listing: undefined,
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

  const setLoading = (status) => {
    dispatch({ type: SET_LOADING, payload: { status } });
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
    dispatch({ type: GET_LISTING_BEGIN });
    if (listingId) {
      try {
        const listingRef = doc(db, 'listings', listingId);
        const listingDoc = await getDoc(listingRef);
        if (listingDoc.exists())
          return dispatch({
            type: GET_LISTING_SUCCESS,
            payload: { listing: listingDoc.data() },
          });
      } catch (error) {
        console.log('😱 Error get building: ', error.message);
      }
    }
  };

  const createListing = async (listing) => {
    dispatch({ type: CREATE_LISTING_BEGIN });
    try {
      const listingData = {
        ...listing,
        timestamp: serverTimestamp(),
        userPhoto: user.photoURL ?? logo,
        userRef: user.uid,
      };
      dispatch({
        type: CREATE_LISTING_SUCCESS,
      });
      return await addDoc(collection(db, 'listings'), listingData);
    } catch (error) {
      dispatch({
        type: CREATE_LISTING_ERROR,
        payload: { msg: error.message },
      });
      console.log('😱 Error Creating listing: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const editListing = async (id, listing) => {
    dispatch({ type: EDIT_LISTING_BEGIN });
    try {
      const listingData = {
        ...listing,
        timestamp: serverTimestamp(),
        userPhoto: user.photoURL ?? logo,
        userRef: user.uid,
      };
      const updatedListing = await updateDoc(
        doc(db, 'listings', id),
        listingData
      );
      dispatch({
        type: EDIT_LISTING_SUCCESS,
        payload: { listing: updatedListing },
      });
    } catch (error) {
      dispatch({
        type: EDIT_LISTING_ERROR,
        payload: { msg: error.message },
      });
      console.log('😱 Error Editing listing: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const deleteListing = async (listing) => {
    dispatch({ type: DELETE_LISTING_BEGIN });
    try {
      await deleteDoc(doc(db, 'listings', listing?.id)).then(() => {
        // Create a reference to the file to delete
        listing?.data?.imgUrls.forEach(async (img) => {
          const imgToDelete = getFirestoreImage(img);
          const fileRef = ref(storage, imgToDelete);
          // Delete the file
          return await deleteObject(fileRef)
            .then(() => {
              console.log('File deleted successfully');
            })
            .catch((error) => {
              console.log('Uh-oh, an error occurred!');
            });
        });
      });
      toast.success('Listing deleted successfully!');
      dispatch({
        type: DELETE_LISTING_SUCCESS,
        payload: { id: listing?.id },
      });
    } catch (error) {
      dispatch({
        type: DELETE_LISTING_ERROR,
        payload: { msg: error.message },
      });
      console.log('😱 Error Deleting listing: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
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
        setLoading,
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
