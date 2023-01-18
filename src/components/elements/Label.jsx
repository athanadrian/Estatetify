import React from 'react';

const Label = ({ text, className, required }) => {
  return (
    <div
      className={`text-dark w-full fond-bold text-md mt-6 mb-1 capitalize ${className}`}
    >
      {text} {required && <span className='text-red-500'>*</span>}
    </div>
  );
};

export default Label;
