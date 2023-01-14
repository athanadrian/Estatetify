import React from 'react';
import { Features, LandView, SubscriptionList } from 'components';

const LandingPage = () => {
  return (
    <div className='w-full'>
      <LandView />
      <Features />
      <SubscriptionList />
    </div>
  );
};

export default LandingPage;
