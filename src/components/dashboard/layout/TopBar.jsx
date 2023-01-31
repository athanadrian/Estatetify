import React from 'react';

import { AppIcon } from 'components';
import defaultStyles from 'common/config';

const TopBar = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? 'pl-56' : ''
      }`}
    >
      <div className='pl-4 md:pl-8 flex items-center'>
        <AppIcon
          className='text-primary cursor-pointer'
          Icon={
            showNav
              ? defaultStyles.icons.closeDashboard
              : defaultStyles.icons.openDashboard
          }
          size={24}
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      {/* <div className='flex items-center pr-4 md:pr-16'>
        <NotificationButton />
         <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center items-center'>
              <span className='hidden md:block font-medium text-gray-700'>
                {profileUser?.fullName}
              </span>
              <AppIcon
                Icon={defaultStyles.icons.arrow_down}
                className='ml-2 h-4 w-4 text-gray-700'
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform scale-95'
            enterTo='transform scale-100'
            leave='transition ease-in duration=75'
            leaveFrom='transform scale-100'
            leaveTo='transform scale-95'
          >
            <Menu.Items className='absolute right-0 w-56 z-50 mt-2 origin-top-right bg-gray-200 rounded shadow-sm'>
              <div className='p-1'>
                <Menu.Item>
                  <Link
                    to='/real-estater/subscriptions'
                    className='flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center'
                  >
                    <AppIcon
                      Icon={defaultStyles.icons.subscriptions}
                      className='mr-2'
                    />
                    Subscriptions
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to='/profile'
                    className='flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center'
                  >
                    <AppIcon
                      Icon={defaultStyles.icons.profile}
                      className='mr-2'
                    />
                    Profile
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu> 
      </div> */}
    </div>
  );
};

export default TopBar;
