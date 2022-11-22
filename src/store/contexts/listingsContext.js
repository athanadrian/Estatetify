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
  limit,
  where,
  orderBy,
  startAfter,
  serverTimestamp,
} from 'firebase.config';

import { useContext, createContext, useReducer } from 'react';
import {
  SET_LOADING,
  GET_ALL_LISTINGS_BEGIN,
  GET_ALL_LISTINGS_SUCCESS,
  GET_ALL_LISTINGS_LOCATIONS_BEGIN,
  GET_ALL_LISTINGS_LOCATIONS_SUCCESS,
  GET_LISTINGS_BY_USER_BEGIN,
  GET_LISTINGS_BY_USER_SUCCESS,
  GET_MY_LISTINGS_BEGIN,
  GET_MY_LISTINGS_SUCCESS,
  GET_FILTERED_LISTINGS_BEGIN,
  GET_FILTERED_LISTINGS_SUCCESS,
  GET_OFFER_LISTINGS_BEGIN,
  GET_OFFER_LISTINGS_SUCCESS,
  GET_MORE_OFFER_LISTINGS_BEGIN,
  GET_MORE_OFFER_LISTINGS_SUCCESS,
  GET_MORE_TYPE_LISTINGS_BEGIN,
  GET_MORE_TYPE_LISTINGS_SUCCESS,
  GET_TYPE_LISTINGS_BEGIN,
  GET_TYPE_LISTINGS_SUCCESS,
  GET_RENT_LISTINGS_BEGIN,
  GET_RENT_LISTINGS_SUCCESS,
  GET_SALE_LISTINGS_BEGIN,
  GET_SALE_LISTINGS_SUCCESS,
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
  ADD_LISTING_TO_FAVORITES,
  REMOVE_LISTING_FROM_FAVORITES,
  REMOVE_ALL_FAVORITES,
} from '../actions/listingsActions';
import reducer from '../reducers/listingsReducer';
import { toast } from 'react-toastify';
import { getFirebaseErrorMessage, getFirestoreImage } from 'common/helpers';
import { sizes } from 'common/lookup-data';

const userFavorites = localStorage.getItem('userFavorites');

const initialState = {
  isLoading: false,
  isLoadingLocations: false,
  listing: undefined,
  listings: [],
  listingsLocations: [],
  cities: [],
  states: [],
  countries: [],
  filteredListings: [],
  offerListings: [],
  lastVisibleOfferListing: null,
  rentListings: [],
  saleListings: [],
  typeListings: [],
  lastVisibleTypeListing: null,
  userFavorites: JSON.parse(userFavorites) ?? [],
};

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  const setLoading = (status) => {
    dispatch({ type: SET_LOADING, payload: { status } });
  };

  const addRemoveFavorite = async ({ listing, favorite = true }) => {
    try {
      if (favorite) {
        dispatch({
          type: ADD_LISTING_TO_FAVORITES,
          payload: { listing },
        });
        toast.success('Listing added to your favorites successfully!');
      } else {
        dispatch({
          type: REMOVE_LISTING_FROM_FAVORITES,
          payload: { listing },
        });
        toast.success('Listing removed from your favorites successfully!');
      }
    } catch (error) {
      console.log('😱 Error Add/Remove Listing: ', error.response.data.msg);
    }
  };

  const removeAllFavorites = (id) => {
    dispatch({
      type: REMOVE_ALL_FAVORITES,
    });
    toast.success('All favorites removed successfully!');
  };

  const getAllListings = async (lim) => {
    dispatch({ type: GET_ALL_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      let listings = [];
      listingsDocs.forEach((listingDoc) => {
        return listings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_ALL_LISTINGS_SUCCESS,
        payload: { listings },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getFilteredListings = async (filters, lim) => {
    dispatch({ type: GET_FILTERED_LISTINGS_BEGIN });
    try {
      let whereConditions = [];
      if (filters) {
        Object.keys(filters).forEach((key) => {
          if (key === 'squareFeet' && filters['squareFeet']) {
            const sq = sizes.find(
              (size) => size.enum === filters['squareFeet']
            );
            whereConditions.push(where('squareFeet', '>=', sq.min));
            whereConditions.push(where('squareFeet', '<=', sq.max));
          } else if (key === 'city' && filters['city']) {
            whereConditions.push(
              where('geolocation.city', '==', filters['city'])
            );
          } else if (filters[key]) {
            whereConditions.push(where(key, '==', filters[key]));
          }
        });
      }
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        //orderBy('timestamp', 'desc'),
        ...whereConditions,
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      let filteredListings = [];
      listingsDocs.forEach((listingDoc) => {
        return filteredListings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_FILTERED_LISTINGS_SUCCESS,
        payload: { filteredListings },
      });
    } catch (error) {
      console.log('😱 Error get filtered listings: ', error.message);
    }
  };

  const getListingsLocations = async () => {
    dispatch({ type: GET_ALL_LISTINGS_LOCATIONS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(listingsRef, orderBy('timestamp', 'desc'));
      const listingsDocs = await getDocs(listingQuery);
      let listingsLocations = [];
      listingsDocs.forEach((listingDoc) => {
        return listingsLocations.push({
          ...listingDoc.data().geolocation,
        });
      });
      dispatch({
        type: GET_ALL_LISTINGS_LOCATIONS_SUCCESS,
        payload: { listingsLocations },
      });
    } catch (error) {
      console.log('😱 Error get all listings locations: ', error.message);
    }
  };

  const getOfferListings = async (lim) => {
    dispatch({ type: GET_OFFER_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      const lastVisibleOfferListing =
        listingsDocs.docs[listingsDocs.docs.length - 1];
      let listings = [];
      listingsDocs.forEach((listingDoc) => {
        return listings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_OFFER_LISTINGS_SUCCESS,
        payload: { listings, lastVisibleOfferListing },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getMoreOfferListings = async (lim) => {
    dispatch({ type: GET_MORE_OFFER_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(state.lastVisibleOfferListing),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      const lastVisibleOfferListing =
        listingsDocs.docs[listingsDocs.docs.length - 1];
      let listings = [];
      listingsDocs.forEach((listingDoc) => {
        return listings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_MORE_OFFER_LISTINGS_SUCCESS,
        payload: { listings, lastVisibleOfferListing },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getRentListings = async (lim) => {
    dispatch({ type: GET_RENT_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('type', '==', 'rent'),
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      let rentListings = [];
      listingsDocs.forEach((listingDoc) => {
        return rentListings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_RENT_LISTINGS_SUCCESS,
        payload: { rentListings },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getSaleListings = async (lim) => {
    dispatch({ type: GET_SALE_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('type', '==', 'sale'),
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      let saleListings = [];
      listingsDocs.forEach((listingDoc) => {
        return saleListings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_SALE_LISTINGS_SUCCESS,
        payload: { saleListings },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getTypeListings = async (type, lim) => {
    dispatch({ type: GET_TYPE_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('type', '==', type),
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      const lastVisibleTypeListing =
        listingsDocs.docs[listingsDocs.docs.length - 1];
      let typeListings = [];
      listingsDocs.forEach((listingDoc) => {
        return typeListings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_TYPE_LISTINGS_SUCCESS,
        payload: { type, typeListings, lastVisibleTypeListing },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getMoreTypeListings = async (type, lim) => {
    dispatch({ type: GET_MORE_TYPE_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('type', '==', type),
        orderBy('timestamp', 'desc'),
        startAfter(state.lastVisibleTypeListing),
        limit(lim)
      );
      const listingsDocs = await getDocs(listingQuery);
      const lastVisibleTypeListing =
        listingsDocs.docs[listingsDocs.docs.length - 1];
      let typeListings = [];
      listingsDocs.forEach((listingDoc) => {
        return typeListings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_MORE_TYPE_LISTINGS_SUCCESS,
        payload: { type, typeListings, lastVisibleTypeListing },
      });
    } catch (error) {
      console.log('😱 Error get all listings: ', error.message);
    }
  };

  const getListingsByUser = async (userId) => {
    dispatch({ type: GET_LISTINGS_BY_USER_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('userRef', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const listingsDocs = await getDocs(listingQuery);

      let listings = [];
      listingsDocs.forEach((listingDoc) => {
        return listings.push({
          id: listingDoc.id,
          data: listingDoc.data(),
        });
      });
      dispatch({
        type: GET_LISTINGS_BY_USER_SUCCESS,
        payload: { listings },
      });
    } catch (error) {
      console.log('😱 Error get User listing: ', error.message);
    }
  };

  const getMyListings = async () => {
    dispatch({ type: GET_MY_LISTINGS_BEGIN });
    const listingsRef = collection(db, 'listings');
    const listingQuery = query(
      listingsRef,
      where('userRef', '==', user.uid),
      orderBy('timestamp', 'desc')
    );
    const listingsDocs = await getDocs(listingQuery);
    let listings = [];
    listingsDocs.forEach((listingDoc) => {
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
          console.log('😱 Error get listing: ', error.message);
        }
      }
    }
  };

  const createListing = async (listing) => {
    dispatch({ type: CREATE_LISTING_BEGIN });
    try {
      const listingData = {
        ...listing,
        timestamp: serverTimestamp(),
        userRef: user.uid,
      };
      dispatch({
        type: CREATE_LISTING_SUCCESS,
      });
      return await addDoc(collection(db, 'listings'), listingData);
    } catch (error) {
      dispatch({
        type: CREATE_LISTING_ERROR,
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
          await deleteImageFromStorage(img);
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
      });
      console.log('😱 Error Deleting listing: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const deleteImageFromStorage = async (image) => {
    const imgToDelete = getFirestoreImage(image);
    const fileRef = ref(storage, imgToDelete);
    // Delete the file
    return await deleteObject(fileRef)
      .then(() => {
        console.log('File deleted successfully');
        toast.success('File removed from DB successfully');
      })
      .catch((error) => {
        console.log('Uh-oh, an error occurred!');
      });
  };

  const handleUploadImageToStorage = async (image) => {
    console.log('ctx image', image);
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
        setLoading,
        getAllListings,
        getListingsLocations,
        getMyListings,
        getListingsByUser,
        getFilteredListings,
        getOfferListings,
        getMoreOfferListings,
        getTypeListings,
        getMoreTypeListings,
        getRentListings,
        getSaleListings,
        getListing,
        createListing,
        editListing,
        deleteListing,
        handleUploadImageToStorage,
        deleteImageFromStorage,
        addRemoveFavorite,
        removeAllFavorites,
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
