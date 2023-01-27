import { forwardRef } from 'react';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';
import { NavLink } from 'react-router-dom';
import { useProfileContext } from 'store/contexts';
import { dashBoardLinks, roles } from 'common/lookup-data';
import { mapEnumObject } from 'common/helpers';

const SideBar = forwardRef(({ showNav }, ref) => {
  const { myProfile } = useProfileContext();

  const sideBarLinks = dashBoardLinks(myProfile?.role);

  return (
    <>
      <div ref={ref} className='fixed z-30 w-56 h-full bg-gray-100 shadow-sm'>
        <NavLink
          to={`/${myProfile?.role}/dashboard`}
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

const SideBarButton = ({ link, name, icon, role }) => {
  const { bgColorLight, txtColor } = mapEnumObject(role, roles);
  return (
    <li className='relative'>
      <NavLink
        to={link}
        className={({
          isActive,
        }) => `pl-6 py-3 mx-5 capitalize rounded text-center cursor-pointer mb-3 flex items-center transition-colors
          ${
            isActive
              ? `${bgColorLight} ${txtColor}`
              : `text-gray-500 hover:${bgColorLight} hover:${txtColor}`
          }`}
      >
        <div className='mr-2'>
          <AppIcon Icon={defaultStyles.icons[icon]} className='text-xl' />
        </div>
        <div>
          <p> {name}</p>
        </div>
      </NavLink>
    </li>
  );
};
