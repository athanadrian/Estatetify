import React from 'react';
import logo from 'images/estatetify-app.svg';
import Moment from 'react-moment';

const ProfileCard = ({ profileUser }) => {
  return (
    <>
      <div className='mx-auto w-2/3'>
        <div className='rounded-lg shadow-lg bg-dark w-full flex flex-row flex-wrap p-3 antialiased'>
          <div className='md:w-1/3 w-full'>
            <img
              alt='my avatar'
              className='rounded-lg shadow-lg antialiased'
              src={profileUser?.avatar || logo}
            />
          </div>
          <div className='md:w-2/3 w-full px-3 flex flex-row flex-wrap'>
            <div className='w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0'>
              <div className='text-2xl text-white leading-tight'>
                {profileUser?.fullName}
              </div>
              <div className='text-normal text-gray-300 hover:text-gray-400 cursor-pointer'>
                <span className='border-b border-dashed border-gray-500 pb-1'>
                  {profileUser?.email}
                </span>
              </div>
              <div className='text-sm text-gray-300 md:absolute pt-3 md:pt-0 bottom-0 right-0'>
                Member since:
                <Moment
                  fromNow
                  className='ml-1 text-sm font-bold text-gray-300 hover:text-gray-400 border-b border-dashed border-gray-500 pb-1'
                >
                  <span>{profileUser?.timestamp.toDate()}</span>
                </Moment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
