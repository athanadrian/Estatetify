import React from 'react';

const FormProgressBar = ({ uploadProgress }) => {
  return (
    <>
      {uploadProgress === 0 ? null : (
        <div className='bg-gray-400 border-[1px] border-transparent border-solid rounded-[10px] mb-6'>
          <div
            className='progress-bar border-[1px] border-transparent border-solid rounded-[10px] text-white text-sm font-medium py-0 px-4'
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress < 100
              ? `Uploading ${uploadProgress}`
              : `Upload Complete ${uploadProgress}%`}
          </div>
        </div>
      )}
    </>
  );
};

export default FormProgressBar;
