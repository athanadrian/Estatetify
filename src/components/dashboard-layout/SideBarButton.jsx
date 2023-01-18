import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';

const SideBarButton = ({ link, name, icon }) => {
  return (
    <li className='relative'>
      <NavLink
        to={link}
        className={({
          isActive,
        }) => `pl-6 py-3 mx-5 capitalize rounded text-center cursor-pointer mb-3 flex items-center transition-colors
          ${
            isActive
              ? 'bg-orange-100 text-orange-500'
              : 'text-gray-400 hover:bg-orange-100 hover:text-orange-500'
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
