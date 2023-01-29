import React, { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { SubscriptionPlans } from 'pages';
import { Loader } from 'components';
import { useAuthContext, useSubscriptionContext } from 'store/contexts';
import { subscriptionPlans } from 'common/lookup-data';
import { getDatesLeft } from 'common/helpers';

const SubscribedRoute = () => {
  const { loggedIn, isLoading, user } = useAuthContext();
  const { getMySubscriptions, subscriptions: mySubscriptions } =
    useSubscriptionContext();
  const [activeStatus, setActiveStatus] = useState(null);

  const getSubscriptionStatus = useCallback(() => {
    const aSubs = mySubscriptions
      .filter((sub) => sub.isActive)
      .map((sub) => {
        const sPlan = subscriptionPlans.find(
          (sPlan) => sPlan.plan.toLowerCase() === sub.plan.toLowerCase()
        );
        return {
          sPlanId: sPlan.id,
          plan: sPlan.plan,
          expiringDate: sub.expiringDate,
          listingsLeft: sPlan.listings - sub.listingsAdded.length,
          daysLeft: getDatesLeft(sub.expiringDate, sub.createdDate),
        };
      });
    return aSubs.find(
      (as) => as.sPlanId === Math.max(...aSubs.map((as) => as.sPlanId))
    );
  }, [mySubscriptions]);

  useEffect(() => {
    if (loggedIn && user) {
      getMySubscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loggedIn]);

  useEffect(() => {
    setActiveStatus(getSubscriptionStatus());
  }, [getSubscriptionStatus]);
  const isSubscripted =
    loggedIn && activeStatus && activeStatus?.listingsLeft > 0;
  if (isLoading) return <Loader />;

  return <>{isSubscripted ? <Outlet /> : <SubscriptionPlans />}</>;
};

export default SubscribedRoute;
