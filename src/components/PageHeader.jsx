import React from 'react';

const PageHeader = ({ title, subtitle, className }) => {
  return (
    <>
      {title && (
        <h1
          className={`text-darker font-bold text-4xl my-5 tracking-wider text-center ${className}`}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className='text-gray-400 text-base font-medium'>{subtitle}</h2>
      )}
    </>
  );
};

export default PageHeader;
