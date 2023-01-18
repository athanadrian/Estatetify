import { useContext, createContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import {
  db,
  onSnapshot,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  limit,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase.config';

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
  CREATE_PURCHASE_BEGIN,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_ERROR,
  EDIT_SUBSCRIPTION_BEGIN,
  EDIT_SUBSCRIPTION_SUCCESS,
  EDIT_SUBSCRIPTION_ERROR,
  DELETE_SUBSCRIPTION_BEGIN,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_ERROR,
  SET_SHIPPING_ADDRESS,
  SET_BILLING_ADDRESS,
  CHECK_FOR_ACTIVE_SUBSCRIPTION_PLANS,
} from '../actions/subscriptionsActions';
import reducer from '../reducers/subscriptionsReducer';
import { getDatesLeft, getFirebaseErrorMessage } from 'common/helpers';
import { useListingContext } from './listingsContext';
import { subscriptionPlans } from 'common/lookup-data';
import { useAuthContext } from './authContext';

const initialState = {
  isLoading: false,
  hasActiveSubscriptionPlans: false,
  isEnrolled: false,
  isSubscriptionPlanEnrolled: false,
  currentTopActiveSubscription: undefined,
  subscription: undefined,
  purchase: undefined,
  subscriptions: [],
  activeSubscriptions: [],
  totalSubscriptions: 0,
  shippingAddress: null,
  billingAddress: null,
};

const SubscriptionContext = createContext();

const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuthContext();
  const { getMyListings, listings } = useListingContext();
  const { loggedIn } = useAuthContext();
  const setLoading = (status) => {
    dispatch({ type: SET_LOADING, payload: { status } });
  };

  const getAllSubscriptions = async () => {
    dispatch({ type: GET_ALL_SUBSCRIPTIONS_BEGIN });
    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      const subscriptionQuery = query(
        subscriptionsRef
        //orderBy('timestamp', 'desc')
        //limit(lim)
      );
      onSnapshot(subscriptionQuery, (snapshot) => {
        const subscriptions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({
          type: GET_ALL_SUBSCRIPTIONS_SUCCESS,
          payload: { subscriptions },
        });
      });
    } catch (error) {
      console.log('😱 Error get all subscriptions: ', error.message);
    }
  };

  const getSubscriptionsByPlan = (plan, lim) => {
    dispatch({ plan: GET_PLAN_SUBSCRIPTIONS_BEGIN });
    try {
      const subscriptionsRef = collection(db, 'subscriptions');
      const subscriptionQuery = query(
        subscriptionsRef,
        where('plan', '==', plan),
        orderBy('timestamp', 'desc'),
        limit(lim)
      );
      onSnapshot(subscriptionQuery, (snapshot) => {
        const subscriptions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({
          type: GET_PLAN_SUBSCRIPTIONS_SUCCESS,
          payload: { subscriptions },
        });
      });
    } catch (error) {
      console.log('😱 Error get plan subscriptions: ', error.message);
    }
  };

  const getSubscriptionsByUser = (userId) => {
    dispatch({ type: GET_SUBSCRIPTIONS_BY_USER_BEGIN });
    try {
      const q = query(
        collection(db, 'subscriptions'),
        where('userRef', '==', userId)
      );
      onSnapshot(q, (snapshot) => {
        const subscriptions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({
          type: GET_SUBSCRIPTIONS_BY_USER_SUCCESS,
          payload: { subscriptions },
        });
      });
    } catch (error) {
      console.log('😱 Error get User subscriptions: ', error.message);
    }
  };

  const getMySubscriptions = () => {
    dispatch({ type: GET_MY_SUBSCRIPTIONS_BEGIN });
    try {
      if (user) {
        const q = query(
          collection(db, 'subscriptions'),
          where('userRef', '==', user?.uid),
          orderBy('timestamp', 'desc')
        );

        onSnapshot(q, (querySnapshot) => {
          const subscriptions = [];
          querySnapshot.forEach((doc) => {
            subscriptions.push({ id: doc.id, ...doc.data() });
          });
          dispatch({
            type: GET_MY_SUBSCRIPTIONS_SUCCESS,
            payload: { subscriptions },
          });
        });
      }
    } catch (error) {
      console.log('😱 Error get My subscriptions: ', error.message);
    }
  };

  const getSubscription = async (subscriptionId) => {
    if (subscriptionId) {
      dispatch({ type: GET_SUBSCRIPTION_BEGIN });
      if (subscriptionId) {
        try {
          const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
          const subscriptionDoc = await getDoc(subscriptionRef);
          if (subscriptionDoc.exists())
            return dispatch({
              type: GET_SUBSCRIPTION_SUCCESS,
              payload: { subscription: subscriptionDoc.data() },
            });
        } catch (error) {
          console.log('😱 Error get subscription: ', error.message);
        }
      }
    }
  };

  const createSubscription = async (subscriptionInfo) => {
    dispatch({ type: CREATE_SUBSCRIPTION_BEGIN });
    try {
      const subscriptionData = {
        ...subscriptionInfo,
        timestamp: serverTimestamp(),
      };
      dispatch({
        type: CREATE_SUBSCRIPTION_SUCCESS,
      });
      return await addDoc(collection(db, 'subscriptions'), subscriptionData);
    } catch (error) {
      dispatch({
        type: CREATE_SUBSCRIPTION_ERROR,
      });
      console.log('😱 Error Creating subscription: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const createPurchase = async (purchaseInfo) => {
    dispatch({ type: CREATE_PURCHASE_BEGIN });
    try {
      const purchaseData = {
        ...purchaseInfo,
        timestamp: serverTimestamp(),
      };
      dispatch({
        type: CREATE_PURCHASE_SUCCESS,
      });
      return await addDoc(collection(db, 'purchases'), purchaseData);
    } catch (error) {
      dispatch({
        type: CREATE_PURCHASE_ERROR,
      });
      console.log('😱 Error Creating purchase: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const editSubscription = async (id, subscription) => {
    dispatch({ type: EDIT_SUBSCRIPTION_BEGIN });
    try {
      const subscriptionData = {
        ...subscription,
        timestamp: serverTimestamp(),
        userRef: user.uid,
      };
      const updatedSubscription = await updateDoc(
        doc(db, 'subscriptions', id),
        subscriptionData
      );
      dispatch({
        type: EDIT_SUBSCRIPTION_SUCCESS,
        payload: { subscription: updatedSubscription },
      });
    } catch (error) {
      dispatch({
        type: EDIT_SUBSCRIPTION_ERROR,
      });
      console.log('😱 Error Editing subscription: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const deleteSubscription = async (subscription) => {
    dispatch({ type: DELETE_SUBSCRIPTION_BEGIN });
    try {
      await deleteDoc(doc(db, 'subscriptions', subscription?.id));
      toast.success('subscription deleted successfully!');
      dispatch({
        type: DELETE_SUBSCRIPTION_SUCCESS,
        payload: { id: subscription?.id },
      });
    } catch (error) {
      dispatch({
        type: DELETE_SUBSCRIPTION_ERROR,
      });
      console.log('😱 Error Deleting subscription: ', error.message);
      toast.error('😱 Error: ' + getFirebaseErrorMessage(error.message));
    }
  };

  const saveShippingAddressToState = (address) => {
    dispatch({
      type: SET_SHIPPING_ADDRESS,
      payload: { shippingAddress: address },
    });
  };

  const saveBillingAddressToState = (address) => {
    dispatch({
      type: SET_BILLING_ADDRESS,
      payload: { billingAddress: address },
    });
  };

  const checkForMyActiveSubscriptions = () => {
    console.log('ctx enrolled');
    getMySubscriptions();
    getMyListings();
    const activeSubscriptions = state.subscriptions
      .filter((sub) => sub.isActive)
      .map((sub) => {
        const subscriptionPlan = subscriptionPlans.find(
          (subPlan) => subPlan.plan.toLowerCase() === sub.plan.toLowerCase()
        );
        return {
          subscriptionPlanId: subscriptionPlan.id,
          plan: subscriptionPlan.plan,
          expiringDate: sub.expiringDate,
          listingsLeft: subscriptionPlan.listings - listings.length,
          daysLeft: getDatesLeft(sub.expiringDate, sub.createdDate),
        };
      });
    const currentTopActiveSubscription = activeSubscriptions.find(
      (as) =>
        as.subscriptionPlanId ===
        Math.max(...activeSubscriptions.map((as) => as.subscriptionPlanId))
    );

    const hasActiveSubscriptionPlans = Boolean(currentTopActiveSubscription);
    const isEnrolled = loggedIn && hasActiveSubscriptionPlans;
    dispatch({
      type: CHECK_FOR_ACTIVE_SUBSCRIPTION_PLANS,
      payload: {
        hasActiveSubscriptionPlans,
        isEnrolled,
        currentTopActiveSubscription,
        activeSubscriptions,
      },
    });
  };

  const checkIsEnrolledSubscription = (plan) => {
    getMySubscriptions();
    let activeSub = null;
    const activeSubscriptions = state.subscriptions.filter(
      (sub) => sub.isActive
    );
    activeSubscriptions.forEach((sub) => {
      if (sub.plan.toLowerCase() === plan.toLowerCase()) activeSub = sub;
    });
    if (activeSub && loggedIn) return true;
  };

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        setLoading,
        getAllSubscriptions,
        getMySubscriptions,
        getSubscriptionsByUser,
        getSubscriptionsByPlan,
        getSubscription,
        createSubscription,
        createPurchase,
        editSubscription,
        deleteSubscription,
        saveShippingAddressToState,
        saveBillingAddressToState,
        checkForMyActiveSubscriptions,
        checkIsEnrolledSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscriptionContext = () => {
  return useContext(SubscriptionContext);
};

export { SubscriptionProvider, useSubscriptionContext };
