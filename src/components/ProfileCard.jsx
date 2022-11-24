import React from 'react';
import logo from 'images/estatetify-app.svg';
import Moment from 'react-moment';
import defaultStyles from 'common/config';

import AppIcon from './elements/AppIcon';
import { normalizeMobile } from 'common/helpers';
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
              <p className='mt-1 text-normal text-gray-300 hover:text-gray-400 cursor-pointer'>
                <span className='border-b border-dashed border-gray-500 pb-1'>
                  {profileUser?.email}
                </span>
              </p>
              <p className='mt-1 text-normal text-gray-300 hover:text-gray-400 cursor-pointer'>
                <span className='border-b border-dashed border-gray-500 pb-1'>
                  {profileUser?.mobile}
                </span>
              </p>
              <div className='mt-3 desktop:mt-9'>
                <h1 className='w-full text-2xl font-bold text-primary'>
                  Contact via
                </h1>
                <ul className='flex justify-end gap-3.5 my-3 text-gray-300 tablet:pb-4'>
                  <li className='w-7 h-7 p-4 rounded bg-primary text-light flex items-center justify-center text-2xl'>
                    <a
                      href={`mailto:${profileUser?.email}`}
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <AppIcon
                        tooltip='Email ©'
                        Icon={defaultStyles.icons.email}
                      />
                    </a>
                  </li>
                  {profileUser?.call && (
                    <li className='w-7 h-7 p-4 rounded bg-yellow-700 text-light flex items-center justify-center text-2xl'>
                      <a
                        href={`tel://${normalizeMobile(profileUser?.mobile)}`}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <AppIcon
                          tooltip='Mobile ©'
                          Icon={defaultStyles.icons.call}
                        />
                      </a>
                    </li>
                  )}
                  {profileUser?.sms && (
                    <li className='w-7 h-7 p-4 rounded bg-black text-light flex items-center justify-center text-2xl'>
                      <a
                        href={`sms://${normalizeMobile(profileUser?.mobile)}`}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <AppIcon
                          tooltip='SMS ©'
                          Icon={defaultStyles.icons.sms}
                        />
                      </a>
                    </li>
                  )}
                  {profileUser?.viber && (
                    <li className='w-7 h-7 p-4 rounded bg-purple-700 text-light flex items-center justify-center text-2xl'>
                      <a
                        href={`viber://chat?number=${normalizeMobile(
                          profileUser?.mobile
                        )}`}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <AppIcon
                          tooltip='Viber ©'
                          Icon={defaultStyles.icons.viber}
                        />
                      </a>
                    </li>
                  )}
                  {profileUser?.whatsApp && (
                    <li className='w-7 h-7 p-4 rounded bg-green-700 text-light flex items-center justify-center text-2xl'>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${normalizeMobile(
                          profileUser?.mobile
                        )}`}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <AppIcon
                          tooltip='WhatsApp ©'
                          Icon={defaultStyles.icons.whatsApp}
                        />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className='text-sm text-gray-300 md:absolute pt-3 md:pt-0 bottom-0 right-0'>
                Member since:
                <Moment
                  fromNow
                  className='ml-1 text-sm font-bold text-light hover:text-gray-400 border-b border-dashed border-gray-500 pb-1'
                >
                  {profileUser?.timestamp.toDate()}
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
