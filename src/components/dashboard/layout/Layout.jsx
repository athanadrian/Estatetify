/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, Fragment } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import { Transition } from '@headlessui/react';

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setShowNav(false);
      setMobile(true);
    } else {
      setShowNav(true);
      setMobile(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      addEventListener('resize', handleResize);
    }
    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter='transform transition duration-[400ms]'
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leave='transform transition duration-[400ms] ease-in-out'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        <SideBar showNav={showNav} />
      </Transition>
      <main
        className={`pt-14 transition-all duration-[400ms] ${
          showNav && !isMobile ? 'pl-56' : ''
        }`}
      >
        <div className='px-4 md:px-16'>{children}</div>
      </main>
    </>
  );
};

export default Layout;
