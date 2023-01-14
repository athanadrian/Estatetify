import {
  SET_LOADING,
  GET_ALL_SUBSCRIPTIONS_BEGIN,
  GET_ALL_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_BY_USER_BEGIN,
  GET_SUBSCRIPTIONS_BY_USER_SUCCESS,
  GET_MY_SUBSCRIPTIONS_BEGIN,
  GET_MY_SUBSCRIPTIONS_SUCCESS,
  GET_PLAN_SUBSCRIPTIONS_BEGIN,
  GET_PLAN_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTION_BEGIN,
  GET_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_BEGIN,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR,
  EDIT_SUBSCRIPTION_BEGIN,
  EDIT_SUBSCRIPTION_SUCCESS,
  EDIT_SUBSCRIPTION_ERROR,
  DELETE_SUBSCRIPTION_BEGIN,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_ERROR,
} from '../actions/subscriptionsActions';

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: action.payload.status,
    };
  }

  if (action.type === GET_ALL_SUBSCRIPTIONS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_ALL_SUBSCRIPTIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      subscriptions: action.payload.subscriptions,
    };
  }

  if (action.type === GET_PLAN_SUBSCRIPTIONS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_PLAN_SUBSCRIPTIONS_SUCCESS) {
    let planSubscriptions = action.payload.subscriptions;
    return {
      ...state,
      isLoading: false,
      planSubscriptions,
    };
  }

  if (action.type === GET_SUBSCRIPTIONS_BY_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_SUBSCRIPTIONS_BY_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      subscriptions: action.payload.subscriptions,
    };
  }

  if (action.type === GET_MY_SUBSCRIPTIONS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_MY_SUBSCRIPTIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      subscriptions: action.payload.subscriptions,
    };
  }

  if (action.type === GET_SUBSCRIPTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_SUBSCRIPTION_SUCCESS) {
    const subscription = action.payload.subscription;
    return {
      ...state,
      isLoading: false,
      subscription,
    };
  }

  if (action.type === EDIT_SUBSCRIPTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_SUBSCRIPTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CREATE_SUBSCRIPTION_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CREATE_SUBSCRIPTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_SUBSCRIPTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === EDIT_SUBSCRIPTION_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DELETE_SUBSCRIPTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DELETE_SUBSCRIPTION_SUCCESS) {
    const subscriptions = state.subscriptions.filter(
      (subscription) => subscription.id !== action.payload.id
    );
    return {
      ...state,
      isLoading: false,
      subscriptions,
    };
  }

  if (action.type === DELETE_SUBSCRIPTION_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  throw new Error(`Error can not find action: ${action.type}`);
};

export default reducer;
