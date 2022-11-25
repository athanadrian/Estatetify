import { useEffect } from 'react';

import { useProfileContext, useCommonContext } from 'store/contexts';
import AppButton from './elements/AppButton';
import Modal from './elements/Modal';
import ProfileCard from './ProfileCard';

const ProfileModal = ({ profileUser }) => {
  const { showProfileModal, closeProfileModal } = useCommonContext();

  return (
    <>
      <Modal open={showProfileModal} close={closeProfileModal}>
        <ProfileCard profileUser={profileUser} />
      </Modal>
    </>
  );
};

export default ProfileModal;
