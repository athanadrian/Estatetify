import { Features, Footer, LandView } from 'components';
import React from 'react';

const LandingPage = () => {
  return (
    <div className='w-screen h-screen'>
      <LandView />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
