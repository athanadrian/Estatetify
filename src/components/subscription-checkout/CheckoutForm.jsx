import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { PageHeader, PricingSummary } from 'components';
import {
  useAuthContext,
  useProfileContext,
  useSubscriptionContext,
} from 'store/contexts';

const CheckoutForm = ({ price, plan, role }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const {
    shippingAddress,
    billingAddress,
    createPurchase,
    createSubscription,
  } = useSubscriptionContext();
  const { changeUserRole } = useProfileContext();
  const { user } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const savePurchase = async () => {
    const today = new Date();
    const years = plan === 'free' ? 10 : 1;
    const nextYearToday = new Date(
      new Date().setFullYear(new Date().getFullYear() + years)
    );
    const purchasedDate = today.toDateString();
    const purchasedTime = today.toLocaleTimeString();
    const nextYearDate = nextYearToday.toDateString();

    const purchaseData = {
      userRef: user?.uid,
      userEmail: user?.email,
      purchasedDate,
      purchasedTime,
      purchaseAmount: price,
      subscriptionPlan: plan,
      shippingAddress,
      billingAddress,
    };
    const newPurchase = await createPurchase(purchaseData);

    const subscriptionData = {
      userRef: user?.uid,
      userEmail: user?.email,
      purchaseRef: newPurchase.id,
      plan,
      isActive: true,
      createdDate: purchasedDate,
      expiringDate: nextYearDate,
    };
    await createSubscription(subscriptionData);

    await changeUserRole(user?.uid, role);
    toast.success(
      `Purchase saved to DB, subscription ${plan.toUpperCase()} activated`
    );
    navigate('/checkout-success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3003/checkout-success',
        },
        redirect: 'if_required',
      })
      .then((result) => {
        // result = ok->paymentIntent || error
        if (result.error) {
          toast.error(`Error: ${result.error.message}`);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          switch (result.paymentIntent.status) {
            case 'succeeded':
              setIsLoading(false);
              toast.success('Payment Successful');
              savePurchase(result.paymentIntent);
              break;

            default:
              break;
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <section className='sm:max-w-[95%] max-w-[95%] p-5 bg-white mx-auto my-10'>
      <PageHeader title='Checkout' className='mb-6 font-normal' />
      <div className='grid sm:grid-cols-2'>
        <div className='my-5 sm:mr-5 '>
          <PricingSummary pricingPlan={plan} />
        </div>
        <div className='my-5 sm:mr-5 '>
          <h1 className='border-b pb-1 mb-2 text-3xl text-darker font-thin tracking-wider'>
            Stripe Checkout
          </h1>
          <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement
              className='mb-6'
              id='payment-element'
              options={paymentElementOptions}
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id='submit'
              className='bg-[#5469d4] text-white rounded-[4px] border-0 py-3 px-4 text-base font-semibold cursor-pointer block transition-all duration-200 ease-in w-full shadow-[0px 4px 5.5px 0px rgba(0,0,0,0.07)] hover:contrast-[115%] disabled:opacity-50 disabled:cursor-default   '
            >
              <span id='button-text'>
                {isLoading ? (
                  <div className='spinner' id='spinner'></div>
                ) : (
                  'Pay now'
                )}
              </span>
            </button>
            {message && (
              <div
                className='text-[rgb(105,115,134)] text-lg pt-5 text-center'
                id='payment-message'
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
