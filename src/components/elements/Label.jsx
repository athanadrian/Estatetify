import React from 'react';

const Label = ({ text, className }) => {
  return (
    <div
      className={`text-dark w-full fond-bold text-md mt-6 mb-1 capitalize ${className}`}
    >
      {text}
    </div>
  );
};

export default Label;
