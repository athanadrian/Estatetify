import subscriptions from 'common/lookup-data/subscription-plans';
import { PageHeader } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import SubscriptionPlanCard from './SubscriptionPlanCard';

const SubscriptionPlanList = () => {
  return (
    <section className='flex flex-col items-center mx-auto my-10 md:max-w-[95%] max-w-[80%]'>
      <PageHeader title='Select Your Subscription Plan' />
      <Link to='/subscription-plans '>
        <p className='px-3 text-base text-gray-400 hover:text-gray-600 hover:first:hover:opacity-100 transition duration-150 ease-in-out'>
          Pick the package that suits your needs and................
          <span className='text-sm opacity-70'>learn more</span>
        </p>
      </Link>
      <div className='flex flex-col md:flex-row w-full justify-around items-center mt-8 text-center'>
        {subscriptions.map((item, index) => (
          <SubscriptionPlanCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlanList;
