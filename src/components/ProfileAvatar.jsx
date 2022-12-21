import React from 'react';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
const ProfileAvatar = ({ profile, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {profile?.avatar ? (
        <img
          className='rounded-full shadow-sm w-[50px] h-[50px] p-0.5 border border-light'
          src={profile?.avatar}
          alt={profile?.fullName ?? 'Owner'}
          title={profile?.fullName ?? 'Owner'}
        />
      ) : (
        <div className='bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border border-light'>
          <div className='bg-primary w-full h-full text-white flex justify-center items-center rounded-full'>
            <AppIcon
              size={24}
              Icon={defaultStyles.icons.profile}
              tooltip={profile?.fullName ?? 'owner'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
