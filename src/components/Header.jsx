import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from 'images/estatetify-app.svg';
import { useAuth } from 'hooks/useAuth';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import { useListingContext } from 'store/contexts';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { userFavorites } = useListingContext();

  const Links = [
    { name: 'home', link: '/home' },
    { name: 'offers', link: '/offers' },
    {
      name: `${isAuthenticated ? 'profile' : 'sign'}`,
      link: `${isAuthenticated ? '/profile' : '/sign-in'}`,
    },
  ];

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto p-3'>
        <div
          className='flex cursor-pointer justify-center items-center font-bold text-darker mobile:text-lg tablet:text-xl laptop:text-2xl'
          onClick={() => navigate('/')}
        >
          <img src={logo} alt='logo' width={28} height={28} />
          <p className='pl-2'>Estatetify</p>
        </div>
        <ul
          className={
            'flex items-center mobile:text-sm tablet:text-sm laptop:text-base space-x-10'
          }
        >
          {userFavorites.length > 0 && (
            <Link to='/favorites' className='relative'>
              <AppIcon
                Icon={defaultStyles.icons.favorite}
                className='text-red-500 text-2xl'
              />
              <div className='absolute -right-2 -top-2 p-0.5 w-4 h-4 bg-darker text-xs text-white rounded-full text-center flex items-center justify-center'>
                {userFavorites.length}
              </div>
            </Link>
          )}
          {Links.map((link) => (
            <li key={link.link} className='mobile:mx-2 tablet:mx-3 laptop:mx-5'>
              <NavLink
                to={link.link}
                className={({ isActive }) =>
                  `capitalize cursor-pointer py-4 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                    isActive && 'text-black border-b-darker'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {/* <button className='bg-primary text-white px-4 py-2 rounded-md'>
            Contact Us 
          </button>*/}
        </ul>
      </header>
    </div>
  );
};

export default Header;
