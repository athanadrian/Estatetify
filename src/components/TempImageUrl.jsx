import React from 'react';
import defaultStyles from 'common/config';
import AppIcon from './elements/AppIcon';

const TempImageUrl = ({ handleDeleteImage, imgUrl, className }) => {
  return (
    <div className='flex items-center justify-between w-full mb-6'>
      <img
        src={imgUrl}
        alt='temp avatar'
        className={`rounded-full w-12 h-12 ${className}`}
      />
      <button
        onClick={handleDeleteImage}
        type='button'
        className='flex justify-center items-center px-3 py-3 text-xl text-red-500 hover:text-red-700 transition duration-150 ease-in-out'
      >
        <AppIcon Icon={defaultStyles.icons.delete} />
      </button>
    </div>
  );
};

export default TempImageUrl;
