import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from 'images/estatetify-app.svg';
import { onAuthStateChanged, auth } from 'firebase.config';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setAuthenticated(true);
      else setAuthenticated(false);
    });
  }, []);

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
          onClick={() => navigate('/home')}
        >
          <img src={logo} alt='logo' width={28} height={28} />
          <p className='pl-2'>Estatetify</p>
        </div>
        <ul
          className={
            'flex items-center mobile:text-sm tablet:text-sm laptop:text-base space-x-10'
          }
        >
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
