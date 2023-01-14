import React from 'react';
import { features } from 'common/lookup-data';
import FeatureItem from './FeatureItem';

const Features = () => {
  return (
    <section className='py-12 bg-white sm:py-16 lg:py-20'>
      <div className='px-4 mx-auto max-w-[90rem] sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold leading-tight text-darker sm:text-4xl xl:text-5xl font-pj'>
            Find your next perfect place with ease
          </h2>
          <p className='mt-4 text-base leading-7 text-dark sm:mt-8 font-pj'>
            Estatetify will help you find your home fast, easy and comfortable.
            Our expert support are always available.
          </p>
        </div>
        <div className='grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24'>
          {features.map(({ id, icon, title, description, border }) => (
            <FeatureItem
              key={id}
              icon={icon}
              title={title}
              description={description}
              border={border}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
