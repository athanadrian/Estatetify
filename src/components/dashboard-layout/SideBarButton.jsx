import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';
import { mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';

const SideBarButton = ({ link, name, icon, role }) => {
  const { bgColorLight, txtColor } = mapEnumObject(role, roles);
  return (
    <li className='relative'>
      <NavLink
        to={link}
        className={({
          isActive,
        }) => `pl-6 py-3 mx-5 capitalize rounded text-center cursor-pointer mb-3 flex items-center transition-colors
          ${
            isActive
              ? `${bgColorLight} ${txtColor}`
              : `text-gray-500 hover:${bgColorLight} hover:${txtColor}`
          }`}
      >
        <div className='mr-2'>
          <AppIcon Icon={defaultStyles.icons[icon]} className='text-xl' />
        </div>
        <div>
          <p> {name}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default SideBarButton;
