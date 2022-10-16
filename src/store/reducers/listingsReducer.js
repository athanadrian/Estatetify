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

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'error',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: action.payload.status,
    };
  }

  if (action.type === GET_ALL_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_ALL_LISTINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      listings: action.payload.listings,
    };
  }
  if (action.type === GET_LISTINGS_BY_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_LISTINGS_BY_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      listings: action.payload.listings,
    };
  }
  if (action.type === GET_MY_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_MY_LISTINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      listings: action.payload.listings,
    };
  }

  if (action.type === GET_LISTING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_LISTING_SUCCESS) {
    const listing = action.payload.listing;

    // if (listing) {
    //   for (const key in listing?.configuration) {
    //     listing[key] = listing?.configuration[key];
    //   }
    // }
    return {
      ...state,
      isLoading: false,
      listing,
    };
  }

  if (action.type === EDIT_LISTING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_LISTING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'listing successfully created',
    };
  }

  if (action.type === CREATE_LISTING_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    };
  }

  if (action.type === CREATE_LISTING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_LISTING_SUCCESS) {
    //const { listingDoc } = action.payload;
    // for (const key in listing?.configuration) {
    //   listing[key] = listing?.configuration[key];
    // }
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'listing successfully updated',
      //listingDoc,
    };
  }

  if (action.type === EDIT_LISTING_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_LISTING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DELETE_LISTING_SUCCESS) {
    console.log('reducer state listings', state.listings);
    const listings = state.listings.filter(
      (listing) => listing.id !== action.payload.id
    );
    console.log('reducer state listings after', listings);
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'listing deleted successfully',
      listings,
    };
  }

  if (action.type === DELETE_LISTING_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.msg,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
