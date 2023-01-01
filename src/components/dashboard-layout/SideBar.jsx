import { AppIcon } from 'components';
import { forwardRef } from 'react';
import SideBarButton from './SideBarButton';
import defaultStyles from 'common/config';
import { NavLink } from 'react-router-dom';

const SideBar = forwardRef(({ showNav }, ref) => {
  const sideBarLinks = [
    {
      name: 'listings',
      link: '/real-estater/listings',
      icon: 'listings',
    },
    {
      name: 'add listing',
      link: '/real-estater/add-listing',
      icon: 'add_property',
    },
    { name: 'manage', link: '/real-estater/manage', icon: 'manage' },
  ];
  return (
    <>
      <div ref={ref} className='fixed w-56 h-full bg-gray-100 shadow-sm'>
        <NavLink
          to='/real-estater/dashboard'
          className={({ isActive }) =>
            `flex flex-col items-center justify-center mt-6 mb-14 text-primary ${
              isActive && 'text-orange-500'
            }`
          }
        >
          <AppIcon Icon={defaultStyles.icons.dashboard} size={40} />
          <p className='text-lg'>Dashboard</p>
        </NavLink>
        <ul className='flex flex-col'>
          {sideBarLinks.map(({ link, name, icon }) => (
            <SideBarButton key={name} link={link} icon={icon} name={name} />
          ))}
        </ul>
      </div>
    </>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
