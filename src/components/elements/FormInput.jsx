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
      className={`border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none
      disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-dark ${className} `}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default FormInput;
