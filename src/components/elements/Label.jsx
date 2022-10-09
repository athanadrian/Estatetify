import React from 'react';

const Label = ({ text, className }) => {
  return (
    <p
      className={`text-dark fond-semibold text-md mt-6 mb-1 capitalize ${className}`}
    >
      {text}
    </p>
  );
};

export default Label;
