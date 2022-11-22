import React from 'react';
import { AppIcon, TempImageUrl } from 'components';
import Label from './Label';
import defaultStyles from 'common/config';

const FormImageInput = ({
  onChange,
  onClick,
  uploadedImgUrls,
  pickedImages,
  disabled,
  handleDelete,
  handleUpload,
  ...otherProps
}) => {
  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col'>
          <Label text='images' className='mb-0' />
          <p className='mt-0 text-sm text-gray-400'>
            The first image will be the cover (max 6) - Upload{' '}
            {uploadedImgUrls.length > 0 ? 6 - uploadedImgUrls.length : 6} more
          </p>
          <label className='block' htmlFor='images'>
            <div className='mt-3 bg-dark text-white rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out mr-3 px-7 py-3 w-full text-center'>
              {pickedImages > 0
                ? `Picked ${pickedImages} images`
                : 'Pick your images'}
            </div>
            <input
              id='images'
              type='file'
              name='images'
              accept='image/*'
              onChange={onChange}
              className='invisible'
              {...otherProps}
            />
          </label>
        </div>
        <button
          disabled={disabled}
          onClick={handleUpload}
          type='button'
          className='disabled:cursor-not-allowed mt-12 flex justify-center items-center px-3 py-3 text-2xl rounded-xl disabled:bg-teal-500 bg-teal-500 hover:bg-teal-700 transition duration-150 ease-in-out active:bg-teal-800 text-white'
        >
          <AppIcon Icon={defaultStyles.icons.upload} />
        </button>
      </div>
      {uploadedImgUrls?.length > 0 &&
        uploadedImgUrls.map((image) => (
          <TempImageUrl
            key={image}
            handleDeleteImage={() => handleDelete(image)}
            imgUrl={image}
            className='rounded-sm'
          />
        ))}
    </>
  );
};

export default FormImageInput;
