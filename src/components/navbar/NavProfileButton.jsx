import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

import { AppIcon, ProfileAvatar } from 'components';
import defaultStyles from 'common/config';
import { useAuthContext, useProfileContext } from 'store/contexts';
import { mapEnumObject } from 'common/helpers';
import { dashBoardLinks, roles } from 'common/lookup-data';

const NavProfileButton = ({ center, showMenu, toggleMenu }) => {
  const { myProfile } = useProfileContext();
  const { logOut } = useAuthContext();

  const profileButtonLinks = dashBoardLinks(myProfile?.role);

  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button
            className={`inline-flex w-full justify-center items-center ${
              showMenu && 'hidden'
            }`}
          >
            <Link to='/profile'>
              <ProfileAvatar
                profile={myProfile}
                className='relative w-[50px] h-[50px] text-white flex justify-center items-center rounded-full md:mr-4'
                onClick={() => {
                  if (!showMenu && center) toggleMenu();
                }}
              />
            </Link>
            <span className='hidden md:block font-medium text-gray-700 capitalize truncate'>
              {myProfile?.role}
            </span>
            <AppIcon
              Icon={defaultStyles.icons.arrow_down}
              className='ml-2 h-4 w-4 text-gray-700'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform scale-95'
          enterTo='transform scale-100'
          leave='transition ease-in duration=75'
          leaveFrom='transform scale-100'
          leaveTo='transform scale-95'
        >
          <Menu.Items className='absolute right-0 w-56 z-50 mt-2 origin-top-right bg-gray-200 rounded shadow-sm focus:outline-none'>
            <div className='p-1'>
              {profileButtonLinks.map(({ link, name, icon, auth }) => {
                if (auth.some((a) => a === myProfile?.role)) {
                  return (
                    <TopΒarMenuItem
                      key={name}
                      link={link}
                      icon={icon}
                      name={name}
                      role={myProfile?.role}
                      showMenu={showMenu}
                      toggleMenu={toggleMenu}
                      center={center}
                    />
                  );
                } else return null;
              })}
              <Menu.Item key='logOut'>
                <div
                  className='flex hover:text-red-600 text-gray-600 rounded p-2 text-sm transition-colors items-center cursor-pointer'
                  onClick={() => {
                    if (!showMenu && center) toggleMenu();
                    logOut();
                  }}
                >
                  <AppIcon Icon={defaultStyles.icons.logout} className='mr-2' />
                  logout
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default NavProfileButton;

const TopΒarMenuItem = ({
  center,
  toggleMenu,
  showMenu,
  link,
  icon,
  name,
  role,
}) => {
  const { bgColor } = mapEnumObject(role, roles);
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={link}
          className={`capitalize flex ${
            active ? `${bgColor} text-white` : 'text-gray-700'
          } rounded p-2 text-sm group transition-colors items-center`}
          onClick={() => {
            if (!showMenu && center) toggleMenu();
          }}
        >
          <AppIcon Icon={defaultStyles.icons[icon]} className='mr-2' />
          {name}
        </Link>
      )}
    </Menu.Item>
  );
};
