import React from 'react';

const AppButton = ({ onClick, label, type, className }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${className} mb-6 w-full px-7 py-3 bg-primary text-white font-medium text-sm uppercase rounded shadow-md hover:bg-darker hover:shadow-lg focus:bg-darker focus:shadow-lg active:bg-darker active:shadow-lg transition duration-150 ease-in-out`}
      >
        {label}
      </button>
    </>
  );
};

export default AppButton;
