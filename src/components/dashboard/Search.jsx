import { AppIcon } from 'components';
import React from 'react';
import defaultStyles from 'common/config';

const Search = ({ value, onChange }) => {
  return (
    <div className='ml-10 sm:ml-0 max-w-lg'>
      <div className='relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg'>
        <input
          className='peer w-full rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-primary focus:outline-none'
          type='text'
          name='search'
          id='search'
          placeholder='search listing'
          value={value}
          onChange={onChange}
        />
        <div className='flex items-center rounded-l-lg border border-slate-400 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300 peer-focus:border-primary peer-focus:bg-primary peer-focus:text-white'>
          <AppIcon Icon={defaultStyles.icons.feature_search} size={22} />
        </div>
      </div>
    </div>
  );
};

export default Search;
