import React from 'react';

const FormLookUpSelect = ({
  value,
  name,
  className,
  onChange,
  listData,
  ...otherProps
}) => {
  return (
    <select
      value={value ?? ''}
      name={name}
      onChange={onChange}
      className={className}
      {...otherProps}
    >
      <option defaultValue value=''>
        Select
      </option>
      {listData?.map((listItem) => (
        <option key={listItem.id} value={listItem.enum}>
          {listItem.title}
        </option>
      ))}
    </select>
  );
};

export default FormLookUpSelect;
