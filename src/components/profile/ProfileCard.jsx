import React from 'react';
import Moment from 'react-moment';
import defaultStyles from 'common/config';

import { mapEnumObject, normalizeMobile } from 'common/helpers';
import { useCommonContext } from 'store/contexts';
import { AppIcon } from 'components';
import { roles } from 'common/lookup-data';

const ProfileCard = ({ className, profileUser, owner }) => {
  const { openModal } = useCommonContext();
  const { txtColor, brdColor } = mapEnumObject(profileUser?.role, roles);
  console.log('profileUser', profileUser);
  return (
    <>
      <div className={`mx-auto  ${className} px-4`}>
        <div className='rounded-lg shadow-lg bg-dark w-full flex flex-row flex-wrap p-3 antialiased'>
          <div className={`sm:w-1/2 w-full flex items-center justify-center `}>
            <div className='container w-fit rounded-full flex justify-center relative'>
              {profileUser?.avatar ? (
                <>
                  <img
                    alt='my avatar'
                    className={`border  p-1.5  ${brdColor} rounded-full sm:w-full w-2/3 shadow-lg antialiased`}
                    src={profileUser?.avatar}
                  />
                  <span
                    className={`absolute ${txtColor} top-2 md:right-[45px] right-[110px]`}
                  >
                    <AppIcon Icon={defaultStyles.icons.star} size={24} />
                  </span>
                </>
              ) : (
                <div
                  className={`relative bg-transparent w-64 h-64 p-1 rounded-full flex justify-center items-center border ${brdColor}`}
                >
                  <div
                    className={`bg-light w-full h-full ${txtColor} flex justify-center items-center rounded-full`}
                  >
                    <AppIcon
                      size={100}
                      Icon={defaultStyles.icons.profile}
                      tooltip={profileUser?.fullName ?? 'owner'}
                    />
                  </div>
                  <span
                    className={`absolute ${txtColor} top-0 md:right-[45px] right-[50px]`}
                  >
                    <AppIcon Icon={defaultStyles.icons.star} size={24} />
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='md:w-1/2 w-full px-3 flex flex-row flex-wrap'>
            <div className='w-full text-center text-gray-700 font-semibold relative pt-3 md:pt-0'>
              <div className='text-2xl text-white leading-tight'>
                {profileUser?.fullName}
              </div>
              <div className={`capitalize text-2xl ${txtColor} leading-tight`}>
                {profileUser?.role}
              </div>
              <p className='mt-1 text-base text-gray-300 hover:text-gray-400 cursor-pointer'>
                <span className='border-b border-dashed border-gray-500 pb-1'>
                  {profileUser?.email}
                </span>
              </p>
              <p className='mt-1 text-base text-gray-300 hover:text-gray-400 cursor-pointer'>
                <span className='border-b border-dashed border-gray-500 pb-1'>
                  {profileUser?.mobile}
                </span>
              </p>
              <div className='mt-3 desktop:mt-9'>
                <h1 className='w-full text-2xl font-bold text-primary'>
                  Contact via
                </h1>
                {owner ? (
                  <SocialOwnerButtons profileUser={profileUser} />
                ) : (
                  <SocialUserButtons
                    profileUser={profileUser}
                    openModal={openModal}
                  />
                )}
              </div>
              <div className='text-sm text-gray-300 md:absolute pt-3 md:pt-0 bottom-0 right-0'>
                Joined:
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

const SocialUserButtons = ({ openModal, profileUser }) => {
  return (
    <ul className='flex justify-center gap-3.5 my-3 text-gray-300 tablet:pb-4'>
      <li className='w-7 h-7 p-4 rounded bg-primary text-light flex items-center justify-center text-2xl'>
        <AppIcon
          tooltip='Email ©'
          onClick={openModal}
          Icon={defaultStyles.icons.email}
        />
      </li>
      {profileUser?.call && (
        <li className='w-7 h-7 p-4 rounded bg-yellow-700 text-light flex items-center justify-center text-2xl'>
          <a
            href={`tel://${normalizeMobile(profileUser?.mobile)}`}
            target='_blank'
            rel='noreferrer noopener'
          >
            <AppIcon tooltip='Mobile ©' Icon={defaultStyles.icons.call} />
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
            <AppIcon tooltip='SMS ©' Icon={defaultStyles.icons.sms} />
          </a>
        </li>
      )}
      {profileUser?.viber && (
        <li className='w-7 h-7 p-4 rounded bg-purple-700 text-light flex items-center justify-center text-2xl'>
          <a
            href={`viber://chat?number=${normalizeMobile(profileUser?.mobile)}`}
            target='_blank'
            rel='noreferrer noopener'
          >
            <AppIcon tooltip='Viber ©' Icon={defaultStyles.icons.viber} />
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
            <AppIcon tooltip='WhatsApp ©' Icon={defaultStyles.icons.whatsApp} />
          </a>
        </li>
      )}
    </ul>
  );
};
const SocialOwnerButtons = ({ profileUser }) => {
  return (
    <ul className='flex justify-center gap-3.5 my-3 text-gray-300 tablet:pb-4'>
      <li className='w-7 h-7 p-4 rounded bg-primary text-light flex items-center justify-center text-2xl'>
        <AppIcon tooltip='Email ©' Icon={defaultStyles.icons.email} />
      </li>
      {profileUser?.call && (
        <li className='w-7 h-7 p-4 rounded bg-yellow-700 text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='Mobile ©' Icon={defaultStyles.icons.call} />
        </li>
      )}
      {profileUser?.sms && (
        <li className='w-7 h-7 p-4 rounded bg-black text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='SMS ©' Icon={defaultStyles.icons.sms} />
        </li>
      )}
      {profileUser?.viber && (
        <li className='w-7 h-7 p-4 rounded bg-purple-700 text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='Viber ©' Icon={defaultStyles.icons.viber} />
        </li>
      )}
      {profileUser?.whatsApp && (
        <li className='w-7 h-7 p-4 rounded bg-green-700 text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='WhatsApp ©' Icon={defaultStyles.icons.whatsApp} />
        </li>
      )}
    </ul>
  );
};
