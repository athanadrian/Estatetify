import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppIcon, ContactModal } from 'components';
import defaultStyles from 'common/config';
import logo from 'images/estatetify-app.svg';
import NavBarTopMenu from './NavBarTopMenu';
import NavBarCenterMenu from './NavBarCenterMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };

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
        <NavBarTopMenu toggleMenu={toggleMenu} showMenu={showMenu} />
        <NavBarCenterMenu toggleMenu={toggleMenu} showMenu={showMenu} />
      </div>
      <ContactModal app />
    </>
  );
};
export default Navbar;
