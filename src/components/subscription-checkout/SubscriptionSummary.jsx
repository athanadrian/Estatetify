import React from 'react';
import { AppIcon } from 'components';

const SubscriptionSummary = ({ list }) => {
  const features = list.filter((feat) => feat.isFeature);
  return (
    <>
      <div className='my-5 sm:mr-5 '>
        <h1 className='border-b pb-1 text-3xl text-darker font-thin tracking-wider'>
          Features
        </h1>
        <div className='mt-2 p-2'>
          <ul>
            {features.map(({ text, description, featureIcon }, index) => (
              <li
                className='mb-4 font-light text-dark text-base sm:text-lg flex justify-start items-center'
                key={index}
              >
                <AppIcon
                  Icon={featureIcon}
                  size={22}
                  className='sm:mr-4 mr-8 text-primary'
                />
                <div className='flex flex-col'>
                  <p>{text}</p>
                  <p className='text-sm text-gray-400 mr-8 sm:mr-4'>
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubscriptionSummary;
