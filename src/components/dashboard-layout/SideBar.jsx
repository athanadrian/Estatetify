import { forwardRef, useEffect } from 'react';
import { AppIcon } from 'components';
import SideBarButton from './SideBarButton';
import defaultStyles from 'common/config';
import { NavLink } from 'react-router-dom';
import { useProfileContext } from 'store/contexts';

const SideBar = forwardRef(({ showNav }, ref) => {
  const { getMyProfile, myProfile } = useProfileContext();

  useEffect(() => {
    getMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sideBarLinks = [
    {
      name: 'Users',
      link: `/${myProfile?.role}/users`,
      icon: 'users',
      auth: ['admin'],
    },
    {
      name: 'listings',
      link: `/${myProfile?.role}/listings`,
      icon: 'listings',
      auth: ['real-estater', 'admin'],
    },
    {
      name: 'add listing',
      link: `/${myProfile?.role}/add-listing`,
      icon: 'add_property',
      auth: ['real-estater', 'admin'],
    },
    {
      name: 'manage',
      link: `/${myProfile?.role}manage`,
      icon: 'manage',
      auth: ['real-estater', 'admin'],
    },
  ];
  return (
    <>
      <div ref={ref} className='fixed w-56 h-full bg-gray-100 shadow-sm'>
        <NavLink
          to='/real-estater/dashboard'
          className={({ isActive }) =>
            `flex flex-col items-center hover:text-${
              myProfile?.role
            }-500 justify-center mt-6 mb-14 text-primary ${
              isActive && `text-${myProfile?.role}-500`
            }`
          }
        >
          <AppIcon Icon={defaultStyles.icons.dashboard} size={40} />
          <p className='text-lg'>Dashboard</p>
        </NavLink>
        <ul className='flex flex-col'>
          {sideBarLinks.map(({ link, name, icon, auth }) => {
            if (auth.some((a) => a === myProfile?.role)) {
              return (
                <SideBarButton
                  key={name}
                  link={link}
                  icon={icon}
                  name={name}
                  role={myProfile?.role}
                />
              );
            } else return null;
          })}
        </ul>
      </div>
    </>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
