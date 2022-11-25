import { useState } from 'react';

import { useCommonContext } from 'store/contexts';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import Label from './elements/Label';
import AppButton from './elements/AppButton';
import Modal from './elements/Modal';

const ContactModal = ({ fullName, email, title }) => {
  const [message, setMessage] = useState('');
  const { showModal, closeModal } = useCommonContext();

  return (
    <>
      <Modal open={showModal} close={closeModal}>
        <div className='flex items-center justify-center flex-none w-12 h-12 mx-auto bg-dark text-white text-2xl rounded-full'>
          <AppIcon Icon={defaultStyles.icons.email} />
        </div>
        <div className='mt-2 text-center sm:ml-4 sm:text-left sm:mt-0'>
          <h4 className='text-lg text-dark'>
            Send your message to{' '}
            <span className='font-semibold text-darker'>{fullName}</span> for
            the property{' '}
            <span className='font-semibold text-darker'>{title}</span>
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
              href={`mailto:${email}?subject=${title}&body=${message}`}
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
      </Modal>
    </>
  );
};

export default ContactModal;
