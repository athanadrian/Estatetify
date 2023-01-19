import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';

const SideBarButton = ({ link, name, icon, role }) => {
  return (
    <li className='relative'>
      <NavLink
        to={link}
        className={({
          isActive,
        }) => `pl-6 py-3 mx-5 capitalize rounded text-center cursor-pointer mb-3 flex items-center transition-colors
          ${
            isActive
              ? `bg-${role}-100 text-${role}-500`
              : `text-gray-500 hover:bg-${role}-100 hover:text-${role}-500`
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
