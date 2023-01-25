import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AppIcon } from 'components';
import defaultStyles from 'common/config';
import {
  useAuthContext,
  //useCommonContext,
  useListingContext,
  useProfileContext,
} from 'store/contexts';
import NavProfileButton from './NavProfileButton';
import { mainMenuLinks } from 'common/lookup-data';

const NavBarTopMenu = ({ showMenu, toggleMenu }) => {
  const { loggedIn } = useAuthContext();
  const { userFavorites } = useListingContext();
  const { myProfile } = useProfileContext();
  //const { openModal } = useCommonContext();

  // const handleContactUs = () => {
  //   openModal();
  //   if (showMenu) toggleMenu();
  // };
  const navBarLinks = mainMenuLinks(myProfile?.role);
  return (
    <>
      <div className='hidden laptop:flex mx-auto'>
        <ul className='flex items-center justify-around space-x-10'>
          {navBarLinks.map(({ name, link }) => (
            <NavButton key={name} name={name} link={link} />
          ))}
          {/* <li className='relative group'>
            <NavLink
              to={`/${myProfile?.role}/dashboard`}
              className={({ isActive }) =>
                `capitalize cursor-pointer py-[22px] text-[15px] font-semibold text-dark border-b-[3px] border-b-transparent ${
                  isActive && 'text-darker border-b-primary'
                }`
              }
            >
              dashboard
            </NavLink>
            <div className='absolute group-hover:flex -bottom-[22px] hidden h-1 w-full bg-primary' />
          </li> */}
          {/* //TODO 
            //Check if Contact us link should be on the BigMenu
            */}
          {/* <li className='relative group'>
              <button
                onClick={handleContactUs}
                className='bg-gray-100 text-orange-700 text-lg font-md py-0.5 px-2 border-[1px] border-solid border-gray-300 rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out truncate'
              >
                Contact us
              </button>
              <div className='absolute group-hover:flex -bottom-[17px] hidden h-1 w-full bg-primary' />
            </li> */}
        </ul>
      </div>
      <div className='flex items-center justify-center space-x-5'>
        <NavBarAuthSection
          userFavorites={userFavorites}
          showMenu={showMenu}
          loggedIn={loggedIn}
          toggleMenu={toggleMenu}
        />
      </div>
    </>
  );
};
export default NavBarTopMenu;

const NavButton = ({ link, name }) => {
  return (
    <div>
      <li className='relative group'>
        <NavLink
          to={link}
          className={({ isActive }) =>
            `capitalize cursor-pointer py-[25px] text-[15px] font-semibold text-dark border-b-[3px] border-b-transparent ${
              isActive && 'text-darker border-b-primary'
            }`
          }
        >
          {name}
        </NavLink>
        <div className='absolute group-hover:flex -bottom-[25px] hidden h-1 w-full bg-primary' />
      </li>
    </div>
  );
};

const NavBarAuthSection = ({
  userFavorites,
  showMenu,
  loggedIn,
  toggleMenu,
}) => {
  return (
    <>
      {userFavorites.length > 0 && !showMenu && (
        <Link
          to='/favorites'
          onClick={() => {
            if (showMenu) toggleMenu();
          }}
          className='relative'
        >
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
        <NavProfileButton showMenu={showMenu} toggleMenu={toggleMenu} />
      ) : (
        <div className='text-gray-400 items-center flex py-2 min-h-[56px]'>
          <Link to='/sign-in'>Log in</Link>
          <div className=' text-white rounded-full px-4 py-1.5 bg-primary ml-6'>
            <Link to='/sign-up'> Sign up</Link>
          </div>
        </div>
      )}
    </>
  );
};
