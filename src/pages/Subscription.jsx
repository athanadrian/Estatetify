import { subscriptions } from 'common/lookup-data';
import { SubscriptionDetails } from 'components';
import React from 'react';
import { useParams } from 'react-router';

const Subscription = () => {
  const { plan } = useParams();
  const subscription = subscriptions.find(
    (sub) => sub.plan.toLowerCase() === plan
  );
  return <SubscriptionDetails subscription={subscription} />;
};

export default Subscription;
