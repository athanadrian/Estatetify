import React from 'react';
import AppButton from './elements/AppButton';

const Filter = () => {
  return (
    <div className='relative flex flex-col mx-20 bottom-20 opacity-80 z-20'>
      <div className='flex flex-row bg-light box-content w-fit rounded-t-xl cursor-pointer'>
        <div className='px-16 py-4 font-semibold text-base text-gray-500 rounded-t-xl bg-white'>
          Rent
        </div>
        <div className='px-16 py-4 font-semibold text-base text-gray-500'>
          Buy
        </div>
      </div>
      <div className='sticky flex flex-col space-y-3 justify-between bg-white p-10 rounded-r-xl rounded-bl-xl  drop-shadow-xl w-full laptop:space-y-0 laptop:flex-row'>
        <div className='flex flex-col'>
          <div className='text-gray-400 mb-2'>Location</div>
          <div className='text-night font-bold text-xl'>Athens</div>
        </div>
        <div className='flex flex-col'>
          <div className='text-gray-400 mb-2'>Category</div>
          <div className='text-night font-bold text-xl'>Apartment</div>
        </div>
        <div className='flex flex-col'>
          <div className='text-gray-400 mb-2'>Size</div>
          <div className='text-night font-bold text-xl'>
            120 m<sup>2</sup>- 150 m<sup>2</sup>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-gray-400 mb-2'>Price Range</div>
          <div className='text-night font-bold text-xl'>€85,000 - €98,000</div>
        </div>

        {/* <button className='bg-primary text-white px-7 py-3 rounded-md'>
            Search
          </button> */}
        <AppButton label='Search' className='laptop:w-max w-full' />
      </div>
    </div>
  );
};

export default Filter;
