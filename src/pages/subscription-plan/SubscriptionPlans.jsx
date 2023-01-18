import React, { useEffect } from 'react';
import { AppIcon, PageHeader, SubscriptionSummary } from 'components';
import defaultStyles from 'common/config';
import { roles, subscriptionPlans } from 'common/lookup-data';
import { mapEnumObject } from 'common/helpers';
import { useSubscriptionContext } from 'store/contexts';

const SubscriptionPlans = () => {
  const { checkForMyActiveSubscriptions, hasActiveSubscriptionPlans } =
    useSubscriptionContext();

  useEffect(() => {
    checkForMyActiveSubscriptions('basic');
  }, []);

  return (
    <>
      <div className='mx-auto tablet:mx-4 px-3'>
        <PageHeader
          title={`${hasActiveSubscriptionPlans && 'ACTIVE '}Subscription Plans`}
        />
        <h2 className='px-3 text-darker text-center text-2xl mt-5 font-semibold tracking-wider'>
          Pick the package that suits your needs and become
        </h2>
        <div className='flex flex-col md:flex-row w-full justify-around items-center mt-8 text-center'>
          {subscriptionPlans.map(({ id, role, plan, listings }) => (
            <SubscriptionFeature
              key={id}
              role={role}
              plan={plan}
              color={mapEnumObject(role, roles).color}
              shadow={mapEnumObject(role, roles).shadow}
              listings={listings}
            />
          ))}
        </div>
        {subscriptionPlans.map(({ id, list, plan, role }) => (
          <section
            key={id}
            className='sm:max-w-[95%] max-w-[95%] p-5 bg-white mx-auto my-10'
          >
            <PageHeader
              title={`${plan} Plan`}
              className={`mb-1 font-normal text-left text-${
                mapEnumObject(role, roles).color
              }`}
            />
            <SubscriptionSummary key={id} list={list} />
          </section>
        ))}
      </div>
    </>
  );
};

export default SubscriptionPlans;

const SubscriptionFeature = ({ color, shadow, role, plan, listings }) => {
  return (
    <div
      className={`md:w-[31%] w-[90%] mb-12 p-6 bg-white rounded-xl ${shadow} hover:scale-105`}
    >
      <div className='flex md:flex-col md:gap-3 desktop:flex-row justify-between items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div
            className={`relative bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border border-${color}`}
          >
            <span className={`absolute text-${color} top-0 -right-1`}>
              <AppIcon Icon={defaultStyles.icons.star} />
            </span>
            <div
              className={`bg-light w-full h-full text-${color} flex justify-center items-center rounded-full`}
            >
              <AppIcon
                size={24}
                Icon={defaultStyles.icons.profile}
                tooltip={role}
              />
            </div>
          </div>
          <p
            className={`capitalize font-bold text-xl text-${color} tracking-wider`}
          >
            {role}
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className={`capitalize text-xl text-${color} tracking-wider`}>
            {plan} Plan
          </p>
          <p className='text-sm tracking-wide text-gray-500'>
            Manage {listings === 1000 ? 'unlimited' : `up to ${listings}`}{' '}
            listings
          </p>
        </div>
      </div>
    </div>
  );
};
