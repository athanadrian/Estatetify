import React from 'react';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import { useCommonContext } from 'store/contexts';

const PageHeader = ({ title, subtitle, className, view, total }) => {
  const { showGridView, showGrid } = useCommonContext();

  return (
    <>
      {title && (
        <h1
          className={`text-darker font-bold text-4xl mt-5 mb-3 tracking-wider text-center ${className}`}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className='text-gray-400 text-base font-medium'>{subtitle}</h2>
      )}
      {view && (
        <div className='flex justify-center items-center mt-3 mb-2 gap-3 border-gray-300 border-b pb-2'>
          <AppIcon
            tooltip='Grid View'
            Icon={defaultStyles.icons.gridView}
            size={22}
            className={showGrid ? 'text-primary' : 'text-gray-400'}
            onClick={() => showGridView(true)}
          />

          <AppIcon
            tooltip='List View'
            Icon={defaultStyles.icons.listView}
            size={24}
            className={showGrid ? 'text-gray-400' : 'text-primary'}
            onClick={() => showGridView(false)}
          />

          <p className='text-darker'>
            <b>{total}</b> Listing{total > 1 ? 's' : ''} found.
          </p>
        </div>
      )}
    </>
  );
};

export default PageHeader;
