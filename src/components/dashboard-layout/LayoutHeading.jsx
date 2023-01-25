import React from 'react';

const LayoutHeading = ({ title, className }) => {
  return (
    <h2 className={`text-darker text-3xl  mb-5 font-light ${className}`}>
      {title}
    </h2>
  );
};

export default LayoutHeading;
