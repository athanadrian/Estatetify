import React from 'react';
import AppIcon from '../elements/AppIcon';
import defaultStyles from 'common/config';
import { mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';

const ProfileAvatar = ({ profile, className, onClick, size = 24 }) => {
  const border = mapEnumObject(profile?.role, roles).border;
  const color = mapEnumObject(profile?.role, roles).color;

  return (
    <div className={className} onClick={onClick}>
      {profile?.avatar ? (
        <div>
          <img
            className={`relative rounded-full shadow-sm w-[50px] h-[50px] p-0.5 border ${border}`}
            src={profile?.avatar}
            alt={profile?.fullName ?? 'Owner'}
            title={profile?.fullName ?? 'Owner'}
          />
          <span className={`absolute ${color} top-0 -right-1`}>
            <AppIcon Icon={defaultStyles.icons.star} />
          </span>
        </div>
      ) : (
        <div
          className={`relative bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border border-${border}`}
        >
          <span className={`absolute ${color} top-0 -right-1`}>
            <AppIcon Icon={defaultStyles.icons.star} />
          </span>
          <div
            className={`bg-light w-full h-full ${color} flex justify-center items-center rounded-full`}
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
