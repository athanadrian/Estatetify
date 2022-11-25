import { useCommonContext } from 'store/contexts';
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
