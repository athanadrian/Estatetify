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
      className={`focus:ring-0 focus:outline-none w-full px-4 py-3 rounded text-base placeholder:capitalize placeholder:text-light placeholder:text-base bg-white text-gray-700 border border-gray-300 
      disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-dark ${className} `}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default FormInput;
