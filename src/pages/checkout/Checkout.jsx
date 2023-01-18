import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { PageHeader, CheckoutForm } from 'components';
import { useAuthContext, useSubscriptionContext } from 'store/contexts';
import { subscriptionPlans } from 'common/lookup-data';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState('Initializing Checkout...');
  const [clientSecret, setClientSecret] = useState('');
  const { shippingAddress, billingAddress } = useSubscriptionContext();
  const { user } = useAuthContext();

  const subscription = subscriptionPlans.find(
    (sub) => sub.plan.toLowerCase() === state.toLowerCase()
  );
  const { price, role } = subscription;
  //TODO
  //CREATE STRIPE TOKEN & CREATE CUSTOMER
  //const userId = user?.uid;
  const userEmail = user?.email;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:3002/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: state === 'free' ? 1 : price,
        userEmail,
        //userId,
        shippingAddress,
        billingAddress,
        plan: state,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage('Failed to initialize checkout procedure!');
        toast.error(`Something went wrong: ${error}`);
      });
  }, [
    price,
    userEmail,
    //userId,
    shippingAddress,
    billingAddress,
    state,
  ]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {!clientSecret && (
        <section className='sm:max-w-[95%] max-w-[95%] p-5 bg-white mx-auto my-10'>
          <PageHeader title={message} className='mb-6 font-normal' />
        </section>
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm plan={state} price={price} role={role} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
