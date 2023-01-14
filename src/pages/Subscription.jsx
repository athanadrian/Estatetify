import { subscriptions } from 'common/lookup-data';
import { SubscriptionDetails } from 'components';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCommonContext } from 'store/contexts';

const Subscription = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { saveURL } = useCommonContext();

  const subscription = subscriptions.find(
    (sub) => sub.plan.toLowerCase() === plan
  );

  const url = window.location.href;

  const handleProceedPayment = () => {
    if (loggedIn) {
      navigate('/checkout');
    } else {
      saveURL(url);
      navigate('/sign-in');
    }
  };

  useEffect(() => {
    saveURL(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SubscriptionDetails
      subscription={subscription}
      handleProceedPayment={handleProceedPayment}
    />
  );
};

export default Subscription;
