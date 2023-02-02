import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AppIcon, Layout } from 'components';
import { useSubscriptionContext } from 'store/contexts';
import { getDatesLeft, mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';
import defaultStyles from 'common/config';

const SubscriptionDetails = () => {
  const { subscriptionId } = useParams();
  const [showPayment, setShowPayment] = useState(false);

  const { getSubscription, subscription, getPurchase, purchase } =
    useSubscriptionContext();
  useEffect(() => {
    getSubscription(subscriptionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  const { txtColor, brdColor, bgColor } = mapEnumObject(
    subscription?.role,
    roles
  );

  useEffect(() => {
    getPurchase(subscription?.purchaseRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscription?.purchaseRef]);

  const { elapsedDays } = getDatesLeft(
    subscription?.expiringDate,
    subscription?.createdDate
  );

  const togglePayment = () => {
    setShowPayment(!showPayment);
  };

  return (
    <Layout>
      <div className='container mx-auto'>
        <div>
          <div className='bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto'>
            <div
              className={`rounded-md w-24 h-8 flex items-center justify-center uppercase font-semibold ${
                subscription?.isActive ? 'bg-green-800' : 'bg-red-500'
              } text-white tracking-wider absolute -right-3 -top-3`}
            >
              {subscription?.isActive ? 'Active' : 'Expired'}
            </div>
            <div className='relative flex justify-center'>
              <div className='absolute -top-10'>
                <div
                  className={`relative bg-transparent w-[80px] h-[80px] p-0.5 rounded-full flex justify-center items-center border ${brdColor}`}
                >
                  <span className={`absolute ${txtColor} top-0 right-1`}>
                    <AppIcon Icon={defaultStyles.icons.star} />
                  </span>
                  <div
                    className={`bg-light w-full h-full ${txtColor} flex justify-center items-center rounded-full`}
                  >
                    <AppIcon
                      size={35}
                      Icon={defaultStyles.icons.profile}
                      tooltip={subscription?.role}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-16'>
              <h1
                className={`font-bold capitalize text-center text-3xl ${txtColor}`}
              >
                {subscription?.plan} Plan
              </h1>
              <p className='text-center text-sm text-gray-400 font-medium'>
                year plan
              </p>
              <p>
                <span></span>
              </p>
              <div className='my-5 px-6'>
                <div
                  className={`text-white ${bgColor} rounded-lg text-center font-medium leading-6 px-6 py-3`}
                >
                  <span className='font-bold tracking-widest capitalize'>
                    {subscription?.role}
                  </span>
                </div>
              </div>

              <div className='w-full'>
                <h3 className='font-medium text-darker text-left px-6'>
                  Subscription Details
                </h3>
                <div className='mt-5 w-full flex flex-col items-center overflow-hidden text-sm'>
                  <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.created_date}
                        size={24}
                        className='mr-2 text-primary'
                      />
                      Issued
                    </div>
                    <span className='text-gray-500 ml-2 text-xs'>
                      {subscription?.createdDate}
                    </span>
                  </div>

                  <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.expiring_date}
                        size={24}
                        className='mr-2 text-primary'
                      />
                      Expires
                    </div>
                    <span className='text-gray-500 ml-2 text-xs'>
                      {subscription?.expiringDate}
                    </span>
                  </div>

                  <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.elapsed_days}
                        size={26}
                        className='mr-2 text-primary'
                      />
                      Started
                    </div>
                    <span className='text-gray-500 ml-2 text-xs'>
                      {elapsedDays === 0
                        ? ' today'
                        : elapsedDays === 1
                        ? ' a day ago'
                        : ` ${elapsedDays} days ago`}
                    </span>
                  </div>
                  <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center justify-between hover:bg-gray-100 transition duration-150'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.payment_receipt}
                        size={24}
                        className='mr-2 text-primary'
                      />
                      Payment
                    </div>
                    <div
                      className='flex items-center text-primary hover:text-primary/80'
                      onClick={togglePayment}
                    >
                      <span className='ml-2 text-xs text-right'>
                        {subscription?.purchaseRef}
                      </span>
                      <AppIcon
                        link
                        Icon={defaultStyles.icons.arrow_down}
                        size={18}
                        className='ml-2'
                      />
                    </div>
                  </div>
                  {showPayment && (
                    <>
                      <h3 className='font-medium text-base mt-2 text-darker self-start px-6'>
                        Payment Details
                      </h3>
                      <div className='mt-5 w-full flex flex-col items-center overflow-hidden text-sm'>
                        <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                          <div className='flex items-center'>
                            <AppIcon
                              Icon={defaultStyles.icons.created_date}
                              size={24}
                              className='mr-2 text-primary'
                            />
                            Purchased
                          </div>
                          <span className='text-gray-500 ml-2 text-xs'>
                            {purchase?.purchasedDate}, {purchase?.purchasedTime}
                          </span>
                        </div>

                        <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                          <div className='flex items-center'>
                            <AppIcon
                              Icon={defaultStyles.icons.feature_low_cost}
                              size={24}
                              className='mr-2 text-primary'
                            />
                            Amount
                          </div>
                          <span className='text-gray-500 ml-2 text-xs'>
                            {purchase?.purchaseAmount}€
                          </span>
                        </div>
                        <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-start justify-between hover:bg-gray-100 transition duration-150'>
                          <div className='flex  items-center '>
                            <AppIcon
                              Icon={defaultStyles.icons.profile}
                              size={24}
                              className='mr-2 text-primary'
                            />
                            Account
                          </div>
                          <div className='flex flex-col space-y-1.5 items-start text-primary hover:text-primary/80'>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.billingAddress?.name}
                            </span>
                            {purchase?.billingAddress?.line2 && (
                              <span className='ml-2 text-xs text-right'>
                                {purchase?.billingAddress?.phone}
                              </span>
                            )}
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.userEmail}
                            </span>
                          </div>
                        </div>
                        <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-start justify-between hover:bg-gray-100 transition duration-150'>
                          <div className='flex  items-center '>
                            <AppIcon
                              Icon={defaultStyles.icons.payment_receipt}
                              size={24}
                              className='mr-2 text-primary'
                            />
                            Billing Address
                          </div>
                          <div className='flex flex-col space-y-1.5 items-start text-primary hover:text-primary/80'>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.billingAddress?.line1}
                            </span>
                            {purchase?.billingAddress?.line2 && (
                              <span className='ml-2 text-xs text-right'>
                                {purchase?.billingAddress?.line2}
                              </span>
                            )}
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.billingAddress?.postal_code}
                            </span>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.billingAddress?.city}
                            </span>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.billingAddress?.state},
                              {purchase?.billingAddress?.country}
                            </span>
                          </div>
                        </div>
                        <div className='border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-start justify-between hover:bg-gray-100 transition duration-150'>
                          <div className='flex  items-center '>
                            <AppIcon
                              Icon={defaultStyles.icons.payment_receipt}
                              size={24}
                              className='mr-2 text-primary'
                            />
                            Shipping Address
                          </div>
                          <div className='flex flex-col space-y-1.5 items-start text-primary hover:text-primary/80'>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.shippingAddress?.line1}
                            </span>
                            {purchase?.shippingAddress?.line2 && (
                              <span className='ml-2 text-xs text-right'>
                                {purchase?.shippingAddress?.line2}
                              </span>
                            )}
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.shippingAddress?.postal_code}
                            </span>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.shippingAddress?.city}
                            </span>
                            <span className='ml-2 text-xs text-right'>
                              {purchase?.shippingAddress?.state},
                              {purchase?.shippingAddress?.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionDetails;
