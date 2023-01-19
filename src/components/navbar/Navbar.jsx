import React from 'react';
import { AppIcon, ContactModal, ProfileAvatar } from 'components';
import defaultStyles from 'common/config';
import logo from 'images/estatetify-app.svg';
import { NavButton } from './NavButton';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  useAuthContext,
  useCommonContext,
  useListingContext,
  useProfileContext,
} from 'store/contexts';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuthContext();
  const { userFavorites } = useListingContext();
  const { getMyProfile, myProfile } = useProfileContext();
  const { openModal } = useCommonContext();
  const [showMenu, setMenu] = useState(false);

  const links = [
    { name: 'home', link: '/home' },
    { name: 'offers', link: '/offers' },
    { name: 'buy', link: '/listings/sale' },
    { name: 'rent', link: '/listings/rent' },
    { name: 'sell', link: '/listings/add' },
    { name: 'pricing', link: '/subscription-plans' },
  ];
  const showDashboard =
    loggedIn &&
    (myProfile?.role === 'real-estater' ||
      myProfile?.role === 'agent' ||
      myProfile?.role === 'admin');

  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  const handleContactUs = () => {
    openModal();
    if (showMenu) toggleMenu();
  };

  useEffect(() => {
    if (loggedIn) getMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <>
      <div className='bg-white border-b shadow-sm sticky top-0 z-40 flex items-center justify-between px-6 py-2'>
        <div className='laptop:hidden'>
          <AppIcon
            size={28}
            className='text-primary w-7 h-7'
            Icon={defaultStyles.icons.burger_menu}
            onClick={toggleMenu}
            link
          />
        </div>
        <div
          className='flex cursor-pointer justify-center items-center font-bold text-darker mobile:text-lg tablet:text-xl laptop:text-2xl'
          onClick={() => navigate('/')}
        >
          <img src={logo} alt='Estatetify' className='w-10' />
          <p className='pl-2'>Estatetify</p>
        </div>
        <div className='hidden laptop:flex mx-auto'>
          <ul className='flex items-center justify-around space-x-10'>
            {links.map((link) => (
              <NavButton key={link.name} name={link.name} link={link.link} />
            ))}
            {showDashboard && (
              <li className='relative group'>
                <NavLink
                  to={`/${myProfile?.role}/dashboard`}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `capitalize cursor-pointer py-[22px] text-[15px] font-semibold text-dark border-b-[3px] border-b-transparent ${
                      isActive && 'text-darker border-b-primary'
                    }`
                  }
                >
                  dashboard
                </NavLink>
                <div className='absolute group-hover:flex -bottom-[22px] hidden h-1 w-full bg-primary' />
              </li>
            )}
            <li className='relative group'>
              <button
                onClick={handleContactUs}
                className='bg-gray-100 text-orange-700 text-lg font-md py-0.5 px-2 border-[1px] border-solid border-gray-300 rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'
              >
                Contact us
              </button>
              <div className='absolute group-hover:flex -bottom-[17px] hidden h-1 w-full bg-primary' />
            </li>
          </ul>
        </div>
        <div
          className={`${
            showMenu
              ? 'fixed laptop:hidden inset-0 bg-[rgba(0,0,0,0.7)] w-screen h-screen opacity-100 flex items-center justify-center z-999 transition-all ease-in-out duration-300'
              : 'hidden'
          }`}
        >
          <ul className='relative py-24 px-8 w-[90%] h-[95vh] rounded-xl bg-white z-[9999] flex items-center flex-col space-y-8'>
            {links.map((link) => (
              <NavButton
                myProfile={myProfile}
                sidebar
                key={link.name}
                name={link.name}
                link={link.link}
                onClick={toggleMenu}
              />
            ))}
            {showDashboard && (
              <li className='relative group w-48'>
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
                      className={`mr-4 text-${myProfile?.role}-500`}
                      size={24}
                    />
                    dashboard
                  </div>
                </NavLink>
              </li>
            )}
            <li className='relative group'>
              <button
                onClick={handleContactUs}
                className='bg-gray-100 text-orange-700 text-lg font-md py-0.5 px-2 border-[1px] border-solid border-gray-300 rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'
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
              {renderAuthSection(
                userFavorites,
                !showMenu,
                loggedIn,
                myProfile,
                toggleMenu,
                navigate
              )}
            </div>
          </ul>
        </div>
        <div className='flex items-center justify-center space-x-5'>
          {renderAuthSection(
            userFavorites,
            showMenu,
            loggedIn,
            myProfile,
            navigate
          )}
        </div>
      </div>
      <ContactModal app />
    </>
  );
};
export default Navbar;

const renderAuthSection = (
  userFavorites,
  showMenu,
  loggedIn,
  myProfile,
  navigate,
  toggleMenu
) => {
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
        <div className='flex items-center cursor-pointer'>
          {showMenu ? (
            <ProfileAvatar
              profile={myProfile}
              className={`relative w-[50px] h-[50px] text-white flex justify-center items-center rounded-full ${
                showMenu && 'hidden'
              }`}
              onClick={() => navigate('/profile')}
            />
          ) : (
            <Link to='/profile'>
              <ProfileAvatar
                profile={myProfile}
                className='relative w-[50px] h-[50px] text-white flex justify-center items-center rounded-full'
                onClick={() => navigate('/profile')}
              />
            </Link>
          )}
        </div>
      ) : (
        <div className='text-gray-400 items-center flex'>
          <Link to='/sign-in'>Log in</Link>
          <div className=' text-white rounded-full px-4 py-1.5 bg-primary ml-6'>
            <Link to='/sign-up'> Sign up</Link>
          </div>
        </div>
      )}
    </>
  );
};
