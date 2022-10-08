import React from 'react';

const FormInput = ({
  name,
  type = 'text',
  placeholder,
  className,
  value,
  onChange,
  ...otherProps
}) => {
  return (
    <input
      name={name}
      type={type}
      className={`focus:ring-0 focus:outline-none w-full px-4 py-2 rounded text-lg placeholder:text-light placeholder:text-lg bg-white text-gray-700 border border-gray-300 ${className} 
      disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-dark`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default FormInput;
