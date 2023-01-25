import React from 'react';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';
import { mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';

const SubscriptionPlanAvatar = ({ role }) => {
  const { txtColor, brdColor } = mapEnumObject(role, roles);
  return (
    <div
      className={`relative bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border ${brdColor}`}
    >
      <span className={`absolute ${txtColor} top-0 -right-1`}>
        <AppIcon Icon={defaultStyles.icons.star} />
      </span>
      <div
        className={`bg-light w-full h-full ${txtColor} flex justify-center items-center rounded-full`}
      >
        <AppIcon size={24} Icon={defaultStyles.icons.profile} tooltip={role} />
      </div>
    </div>
  );
};

export default SubscriptionPlanAvatar;
