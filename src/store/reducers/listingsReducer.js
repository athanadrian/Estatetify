import {
  SET_LOADING,
  GET_ALL_LISTINGS_BEGIN,
  GET_ALL_LISTINGS_SUCCESS,
  GET_HOME_LISTINGS_SUCCESS,
  GET_HOME_LISTINGS_BEGIN,
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
  GET_TYPE_LISTINGS_BEGIN,
  GET_TYPE_LISTINGS_SUCCESS,
  GET_MORE_TYPE_LISTINGS_BEGIN,
  GET_MORE_TYPE_LISTINGS_SUCCESS,
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

const reducer = (state, action) => {
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

  if (action.type === GET_HOME_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_HOME_LISTINGS_SUCCESS) {
    const listingsLocations = action.payload.locations;
    const totalListings = action.payload.totalListings;
    const prices = action.payload.prices;
    const offerListings = action.payload.listings
      .filter((listing) => listing.offer)
      .slice(0, 4);
    const rentListings = action.payload.listings
      .filter((listing) => listing.type === 'rent')
      .slice(0, 4);
    const saleListings = action.payload.listings
      .filter((listing) => listing.type === 'sale')
      .slice(0, 4);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const tmpCities = listingsLocations.filter((loc) => loc.city !== undefined);
    const cities = [...new Set(tmpCities.map((loc) => loc.city))];
    const states = listingsLocations.map((loc) => loc.state);
    const countries = listingsLocations.map((loc) => loc.country);
    return {
      ...state,
      isLoading: false,
      offerListings,
      rentListings,
      saleListings,
      minPrice,
      maxPrice,
      tmpCities,
      cities,
      states,
      countries,
      totalListings,
    };
  }

  if (action.type === GET_FILTERED_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_FILTERED_LISTINGS_SUCCESS) {
    const price = action.payload.price;
    const filteredListings = action.payload.listings;
    let tempListings = filteredListings;
    if (price) {
      tempListings = filteredListings.filter(
        (listing) => listing.regularPrice <= price
      );
    }
    return {
      ...state,
      isLoading: false,
      filteredListings: tempListings,
    };
  }

  if (action.type === CLEAR_FILTERED_LISTINGS) {
    return {
      ...state,
      filteredListings: [],
    };
  }

  if (action.type === GET_OFFER_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_OFFER_LISTINGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      offerListings: action.payload.listings,
      lastVisibleOfferListing: action.payload.lastVisibleOfferListing,
    };
  }

  if (action.type === GET_MORE_OFFER_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_MORE_OFFER_LISTINGS_SUCCESS) {
    const offerListings = [...state.offerListings, ...action.payload.listings];
    return {
      ...state,
      isLoading: false,
      offerListings,
      lastVisibleOfferListing: action.payload.lastVisibleOfferListing,
    };
  }

  if (action.type === GET_TYPE_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_TYPE_LISTINGS_SUCCESS) {
    let typeListings = [];
    const type = action.payload.type;
    if (type === 'rent') {
      typeListings = action.payload.listings;
    } else {
      typeListings = action.payload.listings;
    }
    return {
      ...state,
      isLoading: false,
      typeListings,
      lastVisibleTypeListing: action.payload.lastVisibleTypeListing,
    };
  }

  if (action.type === GET_MORE_TYPE_LISTINGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_MORE_TYPE_LISTINGS_SUCCESS) {
    let typeListings = [...state.typeListings];
    const type = action.payload.type;
    if (type === 'rent') {
      typeListings = [...typeListings, ...action.payload.listings];
    } else {
      typeListings = [...typeListings, ...action.payload.listings];
    }
    return {
      ...state,
      isLoading: false,
      typeListings,
      lastVisibleTypeListing: action.payload.lastVisibleTypeListing,
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
    };
  }

  if (action.type === CREATE_LISTING_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CREATE_LISTING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_LISTING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === EDIT_LISTING_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DELETE_LISTING_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DELETE_LISTING_SUCCESS) {
    const listings = state.listings.filter(
      (listing) => listing.id !== action.payload.id
    );
    return {
      ...state,
      isLoading: false,
      listings,
    };
  }

  if (action.type === DELETE_LISTING_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === ADD_LISTING_TO_FAVORITES) {
    const listing = action.payload.listing;
    const userFavorites = [...state.userFavorites, listing];
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    return {
      ...state,
      userFavorites,
    };
  }

  if (action.type === REMOVE_LISTING_FROM_FAVORITES) {
    const { id } = action.payload.listing;
    const userFavorites = state.userFavorites.filter((fav) => fav.id !== id);
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    return {
      ...state,
      userFavorites,
    };
  }

  if (action.type === REMOVE_ALL_FAVORITES) {
    const userFavorites = [];
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    return {
      ...state,
      userFavorites,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
