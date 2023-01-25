import React, { useEffect } from 'react';
import { Layout, LayoutHeading, Loader, SubscriptionsTable } from 'components';

import { useSubscriptionContext } from 'store/contexts';

const Subscriptions = () => {
  const { getMySubscriptions, isLoading, subscriptions } =
    useSubscriptionContext();

  useEffect(() => {
    getMySubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <div className='bg-white pl-4 desktop:px-4 py-5 min-h-[50vh]'>
        <div className='overflow-x-auto w-full'>
          <LayoutHeading title='Subscriptions' />
          <SubscriptionsTable subscriptions={subscriptions} />
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
