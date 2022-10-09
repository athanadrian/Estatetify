import React from 'react';

const PageHeader = ({ text }) => {
  return (
    <h1 className='text-3xl text-darker tracking-wider font-bold text-center mt-6'>
      {text}
    </h1>
  );
};

export default PageHeader;
