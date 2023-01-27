import React from 'react';
import { Menu } from '@headlessui/react';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';

const TableActionsMenu = ({ children }) => {
  return (
    <Menu as='div' className='relative'>
      <Menu.Button>
        <AppIcon nav Icon={defaultStyles.icons.actions} />
      </Menu.Button>
      <Menu.Items className=' origin-top-right absolute grow right-0 mt-2 w-40 z-50 rounded-md shadow-lg bg-gray-100 ring-1 ring-darker ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
        {children}
      </Menu.Items>
    </Menu>
  );
};

export default TableActionsMenu;
