import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='flex justify-center items-center flex-col'>
        <h2 className='text-primary text-center text-5xl'>
          Checkout <span className='hidden sm:inline-block'>was</span>{' '}
          Successful
        </h2>
        <p className='mb-8 text-dark'>Thank you for your purchase</p>
        <button className='bg-gray-200 text-darker text-2xl font-normal py-1.5 px-2 my-0 mr-1.5 ml-0 border-[1px] border-solid border-transparent rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'>
          <Link to='/home'>&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
