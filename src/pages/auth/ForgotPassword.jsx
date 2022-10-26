import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthButton, FormInput, GoogleButton, PageHeader } from 'components';
import { useAuthContext } from 'store/contexts';

const singImage =
  'https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80';

const ForgotPassword = () => {
  const { resetPassword } = useAuthContext();
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  return (
    <section>
      <PageHeader title='Forgot Password' />
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={singImage} alt='key' className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
            <FormInput
              name='email'
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={handleChange}
            />
            <div className='flex justify-between items-center w-full mt-5 whitespace-nowrap'>
              <p className='text-sm text-primary'>
                Don't have an account yet?
                <Link
                  to='/sign-up'
                  className='text-sm text-red-500 hover:text-red-600 hover:underline transition duration-200 ease-in-out'
                >
                  Sign up
                </Link>
              </p>
              <Link
                to='/sign-in'
                className='text-sm text-blue-500 hover:underline hover:text-blue-700 transition duration-200 ease-in-out'
              >
                Sign in instead
              </Link>
            </div>
            <AuthButton>Send a reset email</AuthButton>
          </form>
          <GoogleButton />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
