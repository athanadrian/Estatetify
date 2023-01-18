import React from 'react';
import { Features, LandView, SubscriptionPlanList } from 'components';

const LandingPage = () => {
  return (
    <div className='w-full'>
      <LandView />
      <Features />
      <SubscriptionPlanList />
    </div>
  );
};

export default LandingPage;
