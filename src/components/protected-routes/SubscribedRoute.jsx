import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAuth } from 'hooks/useAuth';
import { SignIn } from 'pages';
import Loader from '../Loader';
import {
  useListingContext,
  useProfileContext,
  useSubscriptionContext,
} from 'store/contexts';

const SubscribedRoute = () => {
  const { loggedIn, isLoading, user } = useAuth();
  const { getProfileUser, profileUser } = useProfileContext();
  const {
    getAllSubscriptions,
    getMySubscriptions,
    getSubscriptionsByUser,
    subscriptions,
    subscription,
    getSubscription,
  } = useSubscriptionContext();
  const { getMyListings, listings } = useListingContext();

  console.log('user subscriptions', subscriptions);
  console.log('listings', listings.length);

  useEffect(() => {
    if (loggedIn && user) {
      getProfileUser(user?.uid);
      getMySubscriptions();
      getMyListings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loggedIn]);

  if (isLoading) return <Loader />;
  return (
    <>
      {loggedIn ? (
        //&& profileUser?.role === 'owner'
        <Outlet />
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default SubscribedRoute;
