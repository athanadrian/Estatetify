import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavButton = ({ sidebar, link, name, onClick }) => {
  return (
    <div>
      {sidebar ? (
        <li className='relative group w-48'>
          <NavLink
            to={link}
            onClick={onClick}
            className={({ isActive }) =>
              ` inline-block text-center text-lg capitalize cursor-pointer font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                isActive &&
                'text-black bg-gray-200 rounded-xl w-full px-2 py-3 '
              }`
            }
          >
            {name}
          </NavLink>
        </li>
      ) : (
        <li className='relative group'>
          <NavLink
            to={link}
            className={({ isActive }) =>
              `capitalize cursor-pointer py-4 text-[15px] font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                isActive && 'text-black border-b-primary'
              }`
            }
          >
            {name}
          </NavLink>
          <div className='absolute group-hover:flex -bottom-[18px] hidden h-1 w-full bg-primary' />
        </li>
      )}
    </div>
  );
};
