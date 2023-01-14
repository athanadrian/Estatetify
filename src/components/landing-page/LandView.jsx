import React from 'react';

import homeImage from 'images/Estatetify.png';
import { Link } from 'react-router-dom';

const LandView = () => {
  return (
    <>
      <div className='relative'>
        <div>
          <img src={homeImage} alt='Estatetify' height={400} width='100%' />
        </div>
        <div className='absolute bottom-5 tablet:bottom-20 laptop:bottom-32 desktop:bottom-48 ml-20 xs:ml-10'>
          <h1 className='text-darker font-bold text-xl tablet:text-4xl laptop:text-6xl mb-3'>
            Find your next <span className='text-primary'>perfect</span>
            <br /> place with ease
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm w-[70%] tablet:w-full laptop:w-full desktop:w-full'>
            Estatetify will help you find your home fast, easy and comfortable.
            <br />
            Our expert support are always available.{' '}
          </div>
          <Link
            to='/home'
            className='text-xs sm:text-sm w-[60%] tablet:w-full laptop:w-full desktop:w-full text-primary font-bold hover:text-dark hover:underline'
          >
            Let's Start now...
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandView;
