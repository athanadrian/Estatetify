import { useState } from 'react';

import { useCommonContext } from 'store/contexts';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import Label from './elements/Label';
import AppButton from './elements/AppButton';
import Modal from './elements/Modal';

const ContactModal = ({ listing }) => {
  const [message, setMessage] = useState('');
  const { showModal, closeModal } = useCommonContext();
  return (
    <>
      {showModal ? (
        <>
          <Modal open={showModal} close={closeModal}>
            <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
              <div className='mt-3 sm:flex'>
                <div className='flex items-center justify-center flex-none w-12 h-12 mx-auto bg-dark text-white text-2xl rounded-full'>
                  <AppIcon Icon={defaultStyles.icons.email} />
                </div>
                <div className='mt-2 text-center sm:ml-4 sm:text-left sm:mt-0'>
                  <h4 className='text-lg text-dark'>
                    Send your message to{' '}
                    <span className='font-semibold text-darker'>
                      {listing?.profile?.fullName}
                    </span>{' '}
                    for the property{' '}
                    <span className='font-semibold text-darker'>
                      {listing?.title}
                    </span>
                  </h4>
                  <Label text='Message' />
                  <textarea
                    name='description'
                    value={message}
                    type='text'
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='message owner'
                    className='mb-3 focus:outline-none w-full min-h-max px-4 py-2 text-base placeholder:capitalize placeholder:text-light text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white'
                    rows={3}
                    required
                  />
                  <div className='items-center gap-2 mt-3 sm:flex'>
                    <a
                      className='w-full'
                      target='_blank'
                      rel='noreferrer noopener'
                      href={`mailto:${listing?.profile?.email}?subject=${listing?.title}&body=${message}`}
                    >
                      <AppButton label='Send Message' />
                    </a>
                    <AppButton
                      onClick={closeModal}
                      label='cancel'
                      className='bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-600'
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
};
// <>
//   {open ? (
//     <>
//       <div className='fixed inset-0 z-10 overflow-y-auto'>
//         <div
//           className='fixed inset-0 w-full h-full bg-black opacity-40'
//           onClick={close}
//         >
//           <div className='flex items-center min-h-screen px-4 py-8'>
//             <div className='relative w-full max-w-lg tablet:max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg'>
//               <div className='my-3 sm:flex'>{children}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   ) : null}
// </>
//);
//};
export default ContactModal;
