import React from 'react';
import { AppIcon } from 'components';
import { features } from 'common/lookup-data';

const Features = () => {
  return (
    <div>
      <div className='sm:grid xs:grid-col-1 sm:grid-cols-2 md:grid-cols-2  laptop:grid-cols-4 desktop:grid-cols-4'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='mx-auto box-content xs:w-72 tablet:text-sm mobile:w-64 tablet:w-64 laptop:w-52 desktop:w-64 xs:py-4 mobile:py-4 tablet:py-6 laptop:py-8 desktop:py-10 xs:px-4 mobile:px-4 tablet:px-4 laptop:px-6 desktop:px-8 bg-white hover:drop-shadow-lg rounded-xl cursor-pointer m-10'
          >
            <div className='flex flex-row items-center mb-3'>
              <div className='text-white bg-primary xs:px-4 mobile:px-2 tablet:px-2 laptop:px-3 desktop:px-4 xs:py-2 mobile:py-1 tablet:py-1 laptop:py-2 desktop:py-3 xs:mr-2 mobile:mr-2 tablet:mr-3 laptop:mr-4 rounded-lg xs:text-lg mobile:text-lg tablet:text-xl laptop:text-2xl'>
                <AppIcon Icon={feature.icon} />
              </div>
              <p className='text-darker font-bold xs:text-lg mobile:text-md tablet:text-md laptop:text-lg'>
                {feature.title}
              </p>
            </div>
            <div className='text-gray-400'>{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
