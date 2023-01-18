import React, { useEffect } from 'react';
import { subscriptionPlans } from 'common/lookup-data';
import { SubscriptionPlanDetails } from 'components';
import { useNavigate, useParams } from 'react-router';
import { useAuthContext, useCommonContext } from 'store/contexts';

const Subscription = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useAuthContext();
  const { saveURL } = useCommonContext();

  const subscription = subscriptionPlans.find(
    (sub) => sub.plan.toLowerCase() === plan
  );

  const url = window.location.href;

  const handleProceedPayment = () => {
    if (loggedIn) {
      navigate('/checkout-details', { state: plan });
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
    <SubscriptionPlanDetails
      subscription={subscription}
      handleProceedPayment={handleProceedPayment}
    />
  );
};

export default Subscription;
