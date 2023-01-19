import React from 'react';
import AppIcon from '../elements/AppIcon';
import defaultStyles from 'common/config';

const ProfileAvatar = ({ profile, className, onClick, size = 24 }) => {
  const role = profile?.role;

  return (
    <div className={className} onClick={onClick}>
      {profile?.avatar ? (
        <div>
          <img
            className={`relative rounded-full shadow-sm w-[50px] h-[50px] p-0.5 border border-${role}-500`}
            src={profile?.avatar}
            alt={profile?.fullName ?? 'Owner'}
            title={profile?.fullName ?? 'Owner'}
          />
          <span className={`absolute text-${role}-500 top-0 -right-1`}>
            <AppIcon Icon={defaultStyles.icons.star} />
          </span>
        </div>
      ) : (
        <div
          className={`relative bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border border-${role}-500`}
        >
          <span className={`absolute text-${role}-500 top-0 -right-1`}>
            <AppIcon Icon={defaultStyles.icons.star} />
          </span>
          <div
            className={`bg-light w-full h-full text-${role}-500 flex justify-center items-center rounded-full`}
          >
            <AppIcon
              size={size}
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
