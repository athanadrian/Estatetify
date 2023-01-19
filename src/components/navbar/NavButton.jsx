import { AppIcon } from 'components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import defaultStyles from 'common/config';

export const NavButton = ({ sidebar, link, name, onClick, myProfile }) => {
  return (
    <div>
      {sidebar ? (
        <li className='relative group w-48'>
          <NavLink
            to={link}
            onClick={onClick}
            className={({ isActive }) =>
              `pl-4 py-2 mx-5 capitalize rounded-lg text-center cursor-pointer flex items-center transition-colors
            ${
              isActive
                ? `bg-${myProfile?.role}-100 text-${myProfile?.role}-500`
                : `text-gray-500 hover:bg-${myProfile?.role}-100 hover:text-${myProfile?.role}-500`
            }`
            }
          >
            <div className='flex justify-start items-center text-lg'>
              <AppIcon
                Icon={defaultStyles.icons[name]}
                className='mr-4'
                size={24}
              />
              {name}
            </div>
          </NavLink>
        </li>
      ) : (
        <li className='relative group'>
          <NavLink
            to={link}
            className={({ isActive }) =>
              `capitalize cursor-pointer py-[22px] text-[15px] font-semibold text-dark border-b-[3px] border-b-transparent ${
                isActive && 'text-darker border-b-primary'
              }`
            }
          >
            {name}
          </NavLink>
          <div className='absolute group-hover:flex -bottom-[22px] hidden h-1 w-full bg-primary' />
        </li>
      )}
    </div>
  );
};
