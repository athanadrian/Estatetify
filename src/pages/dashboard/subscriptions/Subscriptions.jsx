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
      <LayoutHeading
        icon='subscriptions'
        quantity={subscriptions.length}
        title='Subscriptions'
        className='mb-2'
      />
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
          <SubscriptionsTable subscriptions={subscriptions} />
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
