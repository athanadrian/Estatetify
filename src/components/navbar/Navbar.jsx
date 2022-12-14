import React from 'react';
import { AppIcon, ContactModal, ProfileAvatar } from 'components';
import defaultStyles from 'common/config';
import logo from 'images/estatetify-app.svg';
import { NavButton } from './NavButton';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import {
  useCommonContext,
  useListingContext,
  useProfileContext,
} from 'store/contexts';
import { useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { userFavorites } = useListingContext();
  const { getProfileUser, profileUser } = useProfileContext();
  const { openModal } = useCommonContext();
  const [path, setPath] = useState('');
  const [showMenu, setMenu] = useState(false);

  const links = [
    { name: 'home', link: '/home' },
    { name: 'buy', link: '/listings/sale' },
    { name: 'sell', link: '/listings/add' },
    { name: 'rent', link: '/listings/rent' },
    { name: 'offers', link: '/offers' },
  ];

  const showDashboard = user && profileUser?.role !== 'user';

  useEffect(() => {
    if (profileUser?.role === 'admin') setPath('/admin/dashboard');
    if (profileUser?.role === 'real-estater')
      setPath('/real-estater/dashboard');
  }, [profileUser]);

  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  const handleContactUs = () => {
    openModal();
    if (showMenu) toggleMenu();
  };

  useEffect(() => {
    getProfileUser(user?.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                  to={path}
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
          <ul className='relative py-24 px-8 w-[90%] h-[95vh] rounded-xl bg-white z-[9999] flex items-center flex-col space-y-10'>
            {links.map((link) => (
              <NavButton
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
                  to={path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `inline-block text-lg capitalize cursor-pointer font-semibold text-dark border-b-[3px] border-b-transparent ${
                      isActive &&
                      'text-darker text-center bg-gray-200 rounded-xl w-full px-2 py-3'
                    }`
                  }
                >
                  dashboard
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
                isAuthenticated,
                profileUser,
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
            isAuthenticated,
            profileUser,
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
  isAuthenticated,
  profileUser,
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
      {isAuthenticated ? (
        <div className='flex items-center cursor-pointer'>
          <ProfileAvatar
            profile={profileUser}
            className='w-[50px] h-[50px] text-white flex justify-center items-center rounded-full'
            onClick={() => navigate('/profile')}
          />
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
