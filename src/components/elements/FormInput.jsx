import React from 'react';

const FormInput = ({
  name,
  type = 'text',
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <input
      name={name}
      type={type}
      className={`focus:ring-0 focus:outline-none w-full px-4 py-2 rounded text-xl placeholder:text-light placeholder:text-lg bg-white text-gray-700 border border-gray-300 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;
