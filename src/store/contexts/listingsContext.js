import { useState, useContext, createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
import {
  storage,
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
  db,
  onSnapshot,
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

import {
  SET_LOADING,
  GET_ALL_LISTINGS_BEGIN,
  GET_HOME_LISTINGS_SUCCESS,
  GET_HOME_LISTINGS_BEGIN,
  GET_ALL_LISTINGS_SUCCESS,
  GET_LISTINGS_BY_USER_BEGIN,
  GET_LISTINGS_BY_USER_SUCCESS,
  GET_MY_LISTINGS_BEGIN,
  GET_MY_LISTINGS_SUCCESS,
  GET_FILTERED_LISTINGS_BEGIN,
  GET_FILTERED_LISTINGS_SUCCESS,
  CLEAR_FILTERED_LISTINGS,
  GET_OFFER_LISTINGS_BEGIN,
  GET_OFFER_LISTINGS_SUCCESS,
  GET_MORE_OFFER_LISTINGS_BEGIN,
  GET_MORE_OFFER_LISTINGS_SUCCESS,
  GET_MORE_TYPE_LISTINGS_BEGIN,
  GET_MORE_TYPE_LISTINGS_SUCCESS,
  GET_TYPE_LISTINGS_BEGIN,
  GET_TYPE_LISTINGS_SUCCESS,
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
import { getFirebaseErrorMessage, getFirestoreImage } from 'common/helpers';
import { sizes } from 'common/lookup-data';

const userFavorites = localStorage.getItem('userFavorites');

const initialState = {
  isLoading: false,
  isLoadingLocations: false,
  listing: undefined,
  minPrice: null,
  maxPrice: null,
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
  uProgress: 0,
  totalListings: null,
};

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);

  const setLoading = (status) => {
    dispatch({ type: SET_LOADING, payload: { status } });
  };

  const clearFilteredListings = () => {
    dispatch({ type: CLEAR_FILTERED_LISTINGS });
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
      let listings = [];
      const listingsDocs = await getDocs(listingQuery);
      listingsDocs.forEach((listingDoc) => {
        return listings.push({
          id: listingDoc.id,
          ...listingDoc.data(),
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

  const getHomeData = async (lim) => {
    dispatch({ type: GET_HOME_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(listingsRef, orderBy('timestamp', 'desc'));
      let listings = [];
      let locations = [];
      let prices = [];
      onSnapshot(listingQuery, (snapshot) => {
        snapshot.docs.map((doc) => {
          listings.push({
            id: doc.id,
            ...doc.data(),
          });
          locations.push(doc.data().geolocation);
          prices.push(doc.data().regularPrice);
          return {
            locations,
            prices,
          };
        });
        dispatch({
          type: GET_HOME_LISTINGS_SUCCESS,
          payload: {
            totalListings: snapshot.docs.length,
            listings,
            locations,
            prices,
          },
        });
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
            whereConditions.push(where('squareFeet', '>=', sq.min ?? 0));
            whereConditions.push(where('squareFeet', '<=', sq.max ?? 10000));
          } else if (key === 'city' && filters['city']) {
            whereConditions.push(
              where('geolocation.city', '==', filters['city'])
            );
          } else if (filters[key] && key !== 'price') {
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
      listingsDocs.forEach(async (listingDoc) => {
        let listing = {
          id: listingDoc.id,
          ...listingDoc.data(),
        };
        filteredListings.push({
          ...listing,
        });
        dispatch({
          type: GET_FILTERED_LISTINGS_SUCCESS,
          payload: { filteredListings, price: +filters.price },
        });
      });
    } catch (error) {
      console.log('😱 Error get filtered listings: ', error.message);
    }
  };

  const getOfferListings = async (lim) => {
    dispatch({ type: GET_OFFER_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('offer', '==', true),
        //orderBy('timestamp', 'desc'),
        limit(lim)
      );
      onSnapshot(listingQuery, (snapshot) => {
        const listings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const lastVisibleOfferListing = snapshot.docs[snapshot.docs.length - 1];
        dispatch({
          type: GET_OFFER_LISTINGS_SUCCESS,
          payload: { listings, lastVisibleOfferListing },
        });
      });
    } catch (error) {
      console.log('😱 Error get offer listings: ', error.message);
    }
  };

  const getMoreOfferListings = async (lim) => {
    dispatch({ type: GET_MORE_OFFER_LISTINGS_BEGIN });
    try {
      const listingsRef = collection(db, 'listings');
      const listingQuery = query(
        listingsRef,
        where('offer', '==', true),
        //orderBy('timestamp', 'desc'),
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
          ...listingDoc.data(),
        });
      });
      dispatch({
        type: GET_MORE_OFFER_LISTINGS_SUCCESS,
        payload: { listings, lastVisibleOfferListing },
      });
    } catch (error) {
      console.log('😱 Error get more offer listings: ', error.message);
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
      onSnapshot(listingQuery, (snapshot) => {
        const listings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const lastVisibleTypeListing = snapshot.docs[snapshot.docs.length - 1];
        dispatch({
          type: GET_TYPE_LISTINGS_SUCCESS,
          payload: { listings, lastVisibleTypeListing },
        });
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
      let listings = [];
      listingsDocs.forEach((listingDoc) => {
        return listings.push({
          id: listingDoc.id,
          ...listingDoc.data(),
        });
      });
      dispatch({
        type: GET_MORE_TYPE_LISTINGS_SUCCESS,
        payload: { type, listings, lastVisibleTypeListing },
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
      listingsDocs.forEach(async (listingDoc) => {
        let listing = {
          id: listingDoc.id,
          ...listingDoc.data(),
        };
        listings.push({
          ...listing,
        });
        dispatch({
          type: GET_LISTINGS_BY_USER_SUCCESS,
          payload: { listings },
        });
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
    listingsDocs.forEach(async (listingDoc) => {
      let listing = {
        id: listingDoc.id,
        ...listingDoc.data(),
      };
      listings.push({
        ...listing,
      });
      dispatch({
        type: GET_MY_LISTINGS_SUCCESS,
        payload: { listings },
      });
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
    return new Promise((resolve, reject) => {
      const fileName = `${user?.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log('Upload is ' + progress + '% done');
          setTimeout(() => setUploadProgress(0), 5000);
        },
        (error) => {
          console.log('😱 Error Uploading Image: ', error.message);
          toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
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
        uploadProgress,
        setUploadProgress,
        setLoading,
        getAllListings,
        getHomeData,
        getMyListings,
        getListingsByUser,
        getFilteredListings,
        getOfferListings,
        getMoreOfferListings,
        getTypeListings,
        getMoreTypeListings,
        getListing,
        createListing,
        editListing,
        deleteListing,
        handleUploadImageToStorage,
        deleteImageFromStorage,
        addRemoveFavorite,
        removeAllFavorites,
        clearFilteredListings,
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
