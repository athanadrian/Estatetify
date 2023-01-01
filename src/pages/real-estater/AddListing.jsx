import { Layout } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';

const AddListing = () => {
  return (
    <Layout>
      <div className='bg-white flex justify-center items-center h-[80vh]'>
        <div className='flex justify-center items-center flex-col'>
          <h2 className='laptop:text-[8rem] text-[4rem] text-primary'>
            R-Add Listing
          </h2>
          <p className='mb-8 text-center'>
            You must have an active subscription to access your management
            panel!{' '}
          </p>
          <button className='bg-gray-200 text-primary text-2xl font-normal py-1.5 px-2 my-0 mr-1.5 ml-0 border-[1px] border-solid border-transparent rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'>
            <Link to='/home'>&larr; Back To Home</Link>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddListing;
