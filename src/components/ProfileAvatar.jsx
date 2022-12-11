import React from 'react';
import { useCommonContext } from 'store/contexts';

const ProfileAvatar = ({ avatar, listing, onClick }) => {
  const { logo } = useCommonContext();

  return (
    <>
      <div
        className='absolute w-14 h-14  bottom-60 right-3 cursor-pointer'
        onClick={onClick}
      >
        <img
          className='rounded-full shadow-sm w-14 h-14 p-0.5 border border-light'
          src={avatar || logo}
          alt='Owner'
        />
      </div>
    </>
  );
};

export default ProfileAvatar;
