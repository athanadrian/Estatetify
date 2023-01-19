import React from 'react';
import { AppIcon, ContactModal, ProfileAvatar } from 'components';
import defaultStyles from 'common/config';
import logo from 'images/estatetify-app.svg';
import { NavButton } from './NavButton';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    {
      name: 'home',
      link: '/home',
      auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
    },
    {
      name: 'offers',
      link: '/offers',
      auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
    },
    {
      name: 'buy',
      link: '/listings/sale',
      auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
    },
    {
      name: 'rent',
      link: '/listings/rent',
      auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
    },
    {
      name: 'sell',
      link: '/listings/add',
      auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
    },
    {
      name: 'pricing',
      link: '/subscription-plans',
      auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
    },
    {
      name: 'dashboard',
      link: `/${myProfile?.role}/dashboard`,
      auth: ['real-estater', 'agent', 'admin'],
    },
  ];

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
            {links.map(({ name, link, auth }) => {
              if (auth.some((a) => a === myProfile?.role)) {
                return <NavButton key={name} name={name} link={link} />;
              } else return null;
            })}
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
            {links.map(({ name, link, auth }) => {
              if (auth.some((a) => a === myProfile?.role)) {
                return (
                  <NavButton
                    myProfile={myProfile}
                    sidebar
                    key={name}
                    name={name}
                    link={link}
                    onClick={toggleMenu}
                  />
                );
              } else return null;
            })}
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
