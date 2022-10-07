import React from 'react';

import AppIcon from './AppIcon';
import defaultStyles from 'common';

const GoogleButton = () => {
  return (
    <div className='mt-4'>
      <button
        type='submit'
        className='flex justify-center items-center flex-1 bg-red-700 px-4 py-2 text-lg text-center text-white rounded w-full shadow-md font-medium uppercase  hover:bg-red-800 transition duration-1000 ease-in-out hover:shadow-lg active:bg-red-900'
      >
        <AppIcon
          Icon={defaultStyles.icons.google}
          className='text-2xl bg-white rounded-full mr-2'
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleButton;
