import { useEffect } from 'react';
import { useCommonContext, useProfileContext } from 'store/contexts';
import Modal from './elements/Modal';
import ProfileCard from './ProfileCard';

const ProfileModal = ({ profileId }) => {
  const { showProfileModal, closeProfileModal } = useCommonContext();
  const { getProfileUser, profileUser } = useProfileContext();

  useEffect(() => {
    getProfileUser(profileId);
  }, [profileId]);

  return (
    <>
      <Modal open={showProfileModal} close={closeProfileModal}>
        <div className='relative w-full max-w-2xl tablet:px-0 tablet:py-8 px-2 py-4 mx-auto bg-white rounded-md'>
          <div className='m-3'>
            <ProfileCard profileUser={profileUser} className='w-full' />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
