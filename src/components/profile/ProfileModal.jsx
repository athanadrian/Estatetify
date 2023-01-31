import { Modal } from 'components';
import { useCommonContext } from 'store/contexts';
import ProfileCard from './ProfileCard';

const ProfileModal = ({ profileUser, owner }) => {
  const { showProfileModal, closeProfileModal } = useCommonContext();

  return (
    <>
      <Modal open={showProfileModal} close={closeProfileModal}>
        <div className='relative w-full max-w-xl tablet:px-0 tablet:py-8 px-2 py-4 mx-auto bg-white rounded-md'>
          {/* className='w-full max-w-xl tablet:px-0 tablet:py-8 px-2 py-4 flex flex-col justify-center items-center mx-auto' */}
          <div className='m-3'>
            <ProfileCard
              owner={owner}
              profileUser={profileUser}
              className='w-full'
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
