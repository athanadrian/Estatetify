import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';

const NotificationButton = () => {
  return (
    <Popover className='relative'>
      <Popover.Button className='outline-none mr-4 md:mr-8 text-primary'>
        <AppIcon Icon={defaultStyles.icons.notification} size={24} link />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform scale-95'
        enterTo='transform scale-100'
        leave='transition ease-in duration=75'
        leaveFrom='transform scale-100'
        leaveTo='transform scale-95'
      >
        <Popover.Panel className='absolute -right-16 sm:right-4 z-50 mt-2 bg-light shadow-sm rounded max-w-xs sm:max-w-sm w-screen'>
          <div className='relative p-3'>
            <div className='flex justify-between items-center w-full'>
              <p className='text-gray-700 font-medium'>Notifications</p>
              <button className='text-sm text-orange-500'>
                Mark all as read
              </button>
            </div>
            <div className='mt-4 grid gap-4 grid-cols-1 overflow-hidden'>
              <div className='flex'>
                <div className='rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center'>
                  <AppIcon
                    Icon={defaultStyles.icons.checkIcon}
                    className='h-4 w-4 text-green-600'
                  />
                </div>
                <div className='ml-4'>
                  <p className='font-medium text-gray-700'>
                    Notification Title
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    Test Notification text for design
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center'>
                  <AppIcon
                    Icon={defaultStyles.icons.checkIcon}
                    className='h-4 w-4 text-green-600'
                  />
                </div>
                <div className='ml-4'>
                  <p className='font-medium text-gray-700'>
                    Notification Title
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    Test Notification text for design
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center'>
                  <AppIcon
                    Icon={defaultStyles.icons.checkIcon}
                    className='h-4 w-4 text-green-600'
                  />
                </div>
                <div className='ml-4'>
                  <p className='font-medium text-gray-700'>
                    Notification Title
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    Test Notification text for design
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center'>
                  <AppIcon
                    Icon={defaultStyles.icons.checkIcon}
                    className='h-4 w-4 text-green-600'
                  />
                </div>
                <div className='ml-4'>
                  <p className='font-medium text-gray-700'>
                    Notification Title
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    Test Notification text for design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationButton;
