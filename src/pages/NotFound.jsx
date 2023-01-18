import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='flex justify-center items-center flex-col'>
        <h2 className='text-[10rem]'>404</h2>
        <p className='mb-8'>Opppppsss, page not found.</p>
        <button className='bg-gray-200 text-2xl font-normal py-1.5 px-2 my-0 mr-1.5 ml-0 border-[1px] border-solid border-transparent rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'>
          <Link to='/home'>&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
