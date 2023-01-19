import React from 'react';
import { Layout } from 'components';

const Dashboard = () => {
  return (
    <Layout>
      <div className='grid lg:grid-cols-3 gap-5 mb-16'>
        <div className='rounded bg-white h-40 shadow-sm'></div>
        <div className='rounded bg-white h-40 shadow-sm'></div>
        <div className='rounded bg-white h-40 shadow-sm'></div>
      </div>
      <div className='grid col-1 bg-white h-96 shadow-sm'></div>
    </Layout>
  );
};

export default Dashboard;
