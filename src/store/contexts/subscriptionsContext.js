import { useContext, createContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';
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
  EDIT_SUBSCRIPTION_BEGIN,
  EDIT_SUBSCRIPTION_SUCCESS,
  EDIT_SUBSCRIPTION_ERROR,
  DELETE_SUBSCRIPTION_BEGIN,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_ERROR,
} from '../actions/subscriptionsActions';
import reducer from '../reducers/subscriptionsReducer';
import { getFirebaseErrorMessage } from 'common/helpers';

const initialState = {
  isLoading: false,
  subscription: undefined,
  subscriptions: [],
  totalSubscriptions: 0,
};

const SubscriptionContext = createContext();

const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

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

  const getPlanSubscriptions = (plan, lim) => {
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
      const q = query(
        collection(db, 'subscriptions'),
        where('userRef', '==', user?.uid)
        //orderBy('timestamp', 'desc')
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

  const createSubscription = async (subscription) => {
    dispatch({ type: CREATE_SUBSCRIPTION_BEGIN });
    try {
      const subscriptionData = {
        ...subscription,
        timestamp: serverTimestamp(),
        userRef: user.uid,
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

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        setLoading,
        getAllSubscriptions,
        getMySubscriptions,
        getSubscriptionsByUser,
        getPlanSubscriptions,
        getSubscription,
        createSubscription,
        editSubscription,
        deleteSubscription,
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
