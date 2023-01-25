import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AppIcon } from 'components';
import defaultStyles from 'common/config';
import {
  useAuthContext,
  useCommonContext,
  useListingContext,
  useProfileContext,
} from 'store/contexts';
import NavProfileButton from './NavProfileButton';
import { mainMenuLinks } from 'common/lookup-data';

const NavBarCenterMenu = ({ toggleMenu, showMenu }) => {
  const { loggedIn } = useAuthContext();
  const { userFavorites } = useListingContext();
  const { myProfile } = useProfileContext();
  const { openModal } = useCommonContext();
  const navBarLinks = mainMenuLinks(myProfile?.role);

  const handleContactUs = () => {
    openModal();
    if (showMenu) toggleMenu();
  };

  return (
    <>
      <div
        className={`${
          showMenu
            ? 'fixed laptop:hidden inset-0 bg-[rgba(0,0,0,0.7)] w-screen h-screen opacity-100 flex items-center justify-center z-999 transition-all ease-in-out duration-300'
            : 'hidden'
        }`}
      >
        <ul className='relative py-24 px-8 w-[90%] h-[95vh] rounded-xl bg-white z-[9999] flex items-center flex-col space-y-8'>
          {navBarLinks.map(({ name, link }) => (
            <NavButton
              myProfile={myProfile}
              sidebar
              key={name}
              name={name}
              link={link}
              onClick={toggleMenu}
            />
          ))}
          {/* <li className='relative group w-48'>
            <NavLink
              to={`/${myProfile?.role}/dashboard`}
              onClick={toggleMenu}
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
                  Icon={defaultStyles.icons.dashboard}
                  className='mr-4'
                  size={24}
                />
                dashboard
              </div>
            </NavLink>
          </li> */}
          <li className='relative group'>
            <button
              onClick={handleContactUs}
              className='bg-gray-100 text-orange-700 text-lg font-md py-0.5 px-2 border-[1px] border-solid border-gray-300 rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out truncate'
            >
              Contact us
            </button>
          </li>
          <div className='absolute -top-2 left-8 text-red-700'>
            <AppIcon
              onClick={toggleMenu}
              link
              Icon={defaultStyles.icons.cancel}
              size={28}
            />
          </div>
          <div className='absolute top-7 w-full h-1 border-b shadow-sm' />
          <div className='absolute -top-6 right-8 flex items-center justify-center space-x-5'>
            <NavBarAuthSection
              userFavorites={userFavorites}
              showMenu={!showMenu}
              loggedIn={loggedIn}
              toggleMenu={toggleMenu}
            />
          </div>
        </ul>
      </div>
    </>
  );
};
export default NavBarCenterMenu;

const NavBarAuthSection = ({
  userFavorites,
  showMenu,
  loggedIn,
  toggleMenu,
}) => {
  return (
    <>
      {userFavorites.length > 0 && !showMenu && (
        <Link to='/favorites' onClick={toggleMenu} className='relative'>
          <AppIcon
            Icon={defaultStyles.icons.favorite}
            className='text-red-500 text-xl'
            link
          />
          <div className='absolute -right-2 -top-2 p-0.5 w-[14px] h-[14px] bg-darker text-[10px] text-white rounded-full text-center flex items-center justify-center'>
            {userFavorites.length}
          </div>
        </Link>
      )}
      {loggedIn ? (
        <NavProfileButton center showMenu={showMenu} toggleMenu={toggleMenu} />
      ) : (
        <div className='text-gray-400 items-center flex'>
          <Link to='/sign-in' onClick={toggleMenu}>
            Log in
          </Link>
          <div className=' text-white rounded-full px-4 py-1.5 bg-primary ml-6'>
            <Link to='/sign-up' onClick={toggleMenu}>
              {' '}
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const NavButton = ({ link, name, onClick, myProfile }) => {
  return (
    <div>
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
    </div>
  );
};
