import React, { useEffect } from 'react';

import {
  Loader,
  PageHeader,
  SubscriptionPlanFeatureItem,
  SubscriptionPlanSummary,
} from 'components';
import { roles, subscriptionPlans } from 'common/lookup-data';
import { mapEnumObject } from 'common/helpers';
import { useAuthContext, useSubscriptionContext } from 'store/contexts';

const SubscriptionPlans = () => {
  const { loggedIn } = useAuthContext();
  const { isLoading, checkForMyActiveSubscriptions, activeSubscriptions } =
    useSubscriptionContext();

  useEffect(() => {
    checkForMyActiveSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (isLoading) return <Loader />;
  return (
    <div className='mx-auto tablet:mx-4 px-3'>
      <PageHeader title='Subscription Plans' />
      <h2 className='px-3 text-darker text-center text-2xl mt-5 font-semibold tracking-wider'>
        Pick the package that suits your needs and become
      </h2>
      <div className='flex flex-col md:flex-row w-full justify-around items-center mt-8 text-center'>
        {subscriptionPlans.map(({ id, role, plan, listings, price }) => {
          const { shadow } = mapEnumObject(role, roles);
          return (
            <SubscriptionPlanFeatureItem
              key={id}
              role={role}
              plan={plan}
              price={price}
              shadow={shadow}
              listings={listings}
              activeSubscriptions={activeSubscriptions}
            />
          );
        })}
      </div>
      {subscriptionPlans.map(({ id, list, plan, role }) => {
        const { txtColor, brdColor, shadow } = mapEnumObject(role, roles);

        return (
          <section
            key={id}
            className={`sm:max-w-[98%] rounded-xl ${brdColor} ${shadow} max-w-[90%] p-5 bg-white mx-auto my-10`}
          >
            <PageHeader
              title={`${plan} Plan`}
              className={`mb-1 font-normal text-left ${txtColor}`}
            />
            <SubscriptionPlanSummary
              page
              key={id}
              list={list}
              role={role}
              plan={plan}
              activeSubscriptions={activeSubscriptions}
            />
          </section>
        );
      })}
    </div>
  );
};

export default SubscriptionPlans;
