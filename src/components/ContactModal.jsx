import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

import { useCommonContext } from 'store/contexts';
import Modal from './elements/Modal';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks/useAuth';

const ContactModal = ({ app, listing, profile }) => {
  const [isLoading, setLoading] = useState(false);
  const contactForm = useRef();
  const { showModal, logo, closeModal } = useCommonContext();
  const { isAuthenticated, user } = useAuth();

  const toEmail = app ? 'estatetify.app@gmail.com' : profile?.email;
  const defaultMessage = app ? '' : `I am interested in ${listing?.title}`;
  const toFullName = app ? 'Estatetify' : profile?.fullName;
  const listingName = app ? 'Estatetify' : listing?.title;

  const clearForm = () => {
    contactForm.current.reset();
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_API_KEY,
        'template_toabvtw',
        contactForm.current,
        'Qhq-u8uot2rRgOK9q'
      )
      .then(
        (result) => {
          setLoading(false);
          toast.success(
            `Email was send to ${
              app ? ' Estatetify' : ' the owner successfully.'
            }`
          );
          closeModal();
          console.log(result.text);
        },
        (error) => {
          setLoading(false);
          console.log(error.text);
        }
      );
  };

  return (
    <>
      {showModal ? (
        <>
          <Modal open={showModal} close={closeModal}>
            <div className='relative mx-auto flex-1 w-full max-w-lg mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8'>
              <div className='flex items-center gap-x-4 mb-8'>
                <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
                  <img src={logo} alt='atana'></img>
                </div>
                <div>
                  <div className='font-bold text-lg'>{toFullName}</div>
                  <span className='text-primary text-sm'>{toEmail}</span>
                </div>
              </div>
              {!isLoading ? (
                <form
                  ref={contactForm}
                  className='flex flex-col gap-y-4'
                  onSubmit={sendEmail}
                >
                  <input
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Name*'
                    name='user_name'
                    required
                    defaultValue={isAuthenticated ? user?.fullName : ''}
                  />
                  <input
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Email*'
                    name='user_email'
                    required
                    defaultValue={isAuthenticated ? user?.email : ''}
                  />
                  <input
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Phone'
                    name='user_phone'
                  />
                  <input type='hidden' name='owner_email' value={toEmail} />
                  <input
                    type='hidden'
                    name='listing_title'
                    value={listingName}
                  />
                  <input type='hidden' name='owner_name' value={toFullName} />
                  <textarea
                    className='border border-gray-300 focus:border-dark rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none'
                    type='text'
                    name='message'
                    placeholder='Message*'
                    defaultValue={defaultMessage}
                  />
                  <div className='flex gap-x-2'>
                    <button
                      className='bg-dark hover:bg-darker text-white rounded p-4 text-sm w-full transition'
                      type='submit'
                    >
                      Send email
                    </button>
                    <button
                      type='button'
                      onClick={clearForm}
                      className='border border-dark text-dark hover:border-dark hover:text-dark rounded p-4 text-sm w-full transition'
                    >
                      Clear
                    </button>
                  </div>
                </form>
              ) : (
                <Loader />
              )}
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
};
export default ContactModal;
