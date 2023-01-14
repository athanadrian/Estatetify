import { AppIcon } from 'components';
import React from 'react';

const FeatureItem = ({ icon, title, description, border }) => {
  return (
    <div
      className={`md:p-8 lg:p-14 ${border} flex flex-col items-center justify-center`}
    >
      <div className='md:p-8 lg:p-14'>
        <div className='text-primary mx-auto inline-block'>
          <AppIcon Icon={icon} size={42} />
        </div>
        <h3 className='mt-12 text-xl font-bold text-darker font-pj'>{title}</h3>
        <p className='mt-5 text-base text-dark font-pj'>{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
