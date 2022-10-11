import React from 'react';

const FormSelect = ({
  value,
  name,
  className,
  onChange,
  listData,
  ...otherProps
}) => {
  return (
    <select
      value={value !== null ? value : ''}
      name={name}
      onChange={onChange}
      className={`px-4 py-3 w-full rounded shadow-lg bg-dark transition duration-150 hover:bg-darker focus:bg-darker focus:ring-0 focus:outline-none text-white ${className}`}
    >
      {value === null && <option value=''>Select {name}</option>}
      {listData?.map((listItem) => (
        <option key={listItem.id} value={listItem.enum}>
          {listItem.title}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
