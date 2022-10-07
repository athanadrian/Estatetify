import React from 'react';

const AuthButton = ({ children }) => {
  return (
    <>
      <button
        type='submit'
        className='block bg-blue-500 px-4 py-2 text-lg mt-6 text-center text-white rounded w-full shadow-md font-medium uppercase hover:bg-blue-700 transition duration-1000 ease-in-out hover:shadow-lg active:bg-blue-800'
      >
        {children}
      </button>
      <div className='my-4 flex items-center before:border-t before:border-light before:flex-1 after:border-t after:border-light after:flex-1'>
        <p className='text-md mx-4 text-center text-primary'>OR</p>
      </div>
    </>
  );
};

export default AuthButton;
