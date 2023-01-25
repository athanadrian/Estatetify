import { useContext, createContext, useReducer, useEffect } from 'react';
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
  getDocs,
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
import {
  checkCancellingDate,
  getDatesLeft,
  getFirebaseErrorMessage,
} from 'common/helpers';
import { useListingContext } from './listingsContext';
import { subscriptionPlans } from 'common/lookup-data';
import { useAuthContext } from './authContext';
import { useProfileContext } from './profileContext';

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
const DAY_MINUTES = 1000 * 60 * 60 * 24;
const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn, user } = useAuthContext();
  const { fetchMyListings } = useListingContext();
  const { getProfileUser, profileUser } = useProfileContext();
  const setLoading = (status) => {
    dispatch({ type: SET_LOADING, payload: { status } });
  };

  useEffect(() => {
    if (loggedIn) getProfileUser(user?.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, user]);

  useEffect(() => {
    let interval;
    if (profileUser?.role === 'admin') {
      console.log('Admin Action');
      interval = setInterval(async () => {
        await cancelSubscription();
      }, DAY_MINUTES);
    }

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    // const timeOut = setTimeout(async () => {
    //   await cancelSubscription();
    // }, 3000);
    // return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser]);

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

  const fetchMySubscriptions = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, 'subscriptions'),
          where('userRef', '==', user?.uid)
          //orderBy('timestamp', 'desc')
        );
        const subscriptions = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          subscriptions.push({ id: doc.id, ...doc.data() });
        });
        return subscriptions;
      } catch (error) {
        console.log('😱 Error get My subscriptions: ', error.message);
      }
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

  const checkForMyActiveSubscriptions = async () => {
    const allSubscriptions = await fetchMySubscriptions();
    const myListings = await fetchMyListings();
    if (allSubscriptions && myListings) {
      const activeSubscriptions = allSubscriptions
        .filter((sub) => sub?.isActive)
        .map((sub) => {
          const subscriptionPlan = subscriptionPlans.find(
            (subPlan) => subPlan.plan.toLowerCase() === sub?.plan.toLowerCase()
          );
          return {
            subscriptionPlanId: subscriptionPlan.id,
            plan: subscriptionPlan.plan,
            expiringDate: sub?.expiringDate,
            listingsLeft: subscriptionPlan.listings - myListings.length,
            relativeDays: getDatesLeft(sub?.expiringDate, sub?.createdDate),
          };
        });
      const currentTopActiveSubscription = activeSubscriptions.find(
        (as) =>
          as.subscriptionPlanId ===
          Math.max(...activeSubscriptions.map((as) => as.subscriptionPlanId))
      );
      const hasActiveSubscriptionPlans = Boolean(currentTopActiveSubscription);
      dispatch({
        type: CHECK_FOR_ACTIVE_SUBSCRIPTION_PLANS,
        payload: {
          allSubscriptions,
          activeSubscriptions,
          hasActiveSubscriptionPlans,
          currentTopActiveSubscription,
        },
      });
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const q = query(
        collection(db, 'subscriptions'),
        orderBy('timestamp', 'desc')
      );
      const subscriptions = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        subscriptions.push({ id: doc.id, ...doc.data() });
      });
      return subscriptions;
    } catch (error) {
      console.log('😱 Error get My subscriptions: ', error.message);
    }
  };

  const cancelSubscription = async () => {
    const subscriptions = await fetchSubscriptions();
    // .filter(
    //   (sub) => sub?.isActive
    // );
    const activeSubs = subscriptions.filter((sub) => sub?.isActive);
    console.log('cancel subs', activeSubs);
    let cancelledSubscriptions = 0;
    activeSubs.forEach(async (aSub) => {
      // check if aSub expiration date is today
      const isCancellingDate = checkCancellingDate(aSub.expiringDate);
      if (isCancellingDate) {
        try {
          console.log('sub expired', aSub.id);
          console.log('deleted', new Date());
          const subRef = doc(db, 'subscriptions', aSub.id);
          await updateDoc(subRef, {
            isActive: false,
          });
          cancelledSubscriptions++;
          //TODO
          // send notification to user *aSub.userRef*
        } catch (error) {
          console.log('😱 Error cancelling subscriptions: ', error.message);
        }
      }
      console.log('cancelled: ', cancelledSubscriptions);
      // update aSub change isActive to false
    });
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
