import subscriptions from 'common/lookup-data/subscriptions';
import { PageHeader } from 'components';
import React from 'react';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = () => {
  return (
    <section className='flex flex-col items-center mx-auto my-10 md:max-w-[95%] max-w-[80%]'>
      <PageHeader title='Select Your Subscription' />
      <PageHeader subtitle='Pick the subscription that suits your needs.... ' />
      <div className='flex flex-col md:flex-row w-full justify-around items-center mt-8 text-center'>
        {subscriptions.map((item, index) => (
          <SubscriptionCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default SubscriptionList;
