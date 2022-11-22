import React from 'react';
import { useCommonContext } from 'store/contexts';

const ProfileAvatar = ({ avatar, onClick }) => {
  const { logo } = useCommonContext();

  return (
    <div
      className='absolute w-12 h-12  bottom-60 right-3 cursor-pointer'
      onClick={onClick}
    >
      <img
        className='rounded-full shadow-sm w-12 h-12'
        src={avatar || logo}
        alt='Owner'
      />
    </div>
  );
};

export default ProfileAvatar;
