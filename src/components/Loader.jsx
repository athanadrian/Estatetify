import React from 'react';
import loader from 'images/loader.svg';

const Loader = () => {
  return (
    <div className='flex justify-center items-center bg-darker bg-opacity-50 z-50 fixed right-0 left-0 top-0 bottom-0'>
      <img src={loader} alt='loading...' className='h-32' />
    </div>
  );
};

export default Loader;
