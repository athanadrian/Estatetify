import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppIcon,
  AuthButton,
  FormInput,
  GoogleButton,
  PageHeader,
} from 'components';
import defaultStyles from 'common/config';
import { useAuthContext } from 'store/contexts';
import { useAuth } from 'hooks/useAuth';

const initialState = {
  fullName: '',
  email: '',
  password: '',
};

const singImage =
  'https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80';

const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { signUpUser } = useAuthContext();
  const [values, setValues] = useState(initialState);
  const [isHidden, setHidden] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleTogglePassword = () => {
    setHidden((preState) => !preState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpUser(values);
  };

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  return (
    <section>
      <PageHeader title='Sign up' />
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={singImage} alt='key' className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
            <FormInput
              name='fullName'
              type='text'
              placeholder='Full Name'
              value={values.fullName}
              onChange={handleChange}
            />
            <FormInput
              name='email'
              type='email'
              placeholder='Email Address'
              value={values.email}
              onChange={handleChange}
            />
            <div className='relative'>
              <FormInput
                name='password'
                type={`${isHidden ? 'password' : 'text'}`}
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
              />
              <AppIcon
                link
                tooltip={isHidden ? 'Show Password' : 'Hide Password'}
                Icon={
                  isHidden
                    ? defaultStyles.icons.showPassword
                    : defaultStyles.icons.hidePassword
                }
                onClick={handleTogglePassword}
                className='absolute right-3 top-4'
              />
            </div>
            <div className='flex justify-between items-center w-full mt-5'>
              <p className='text-sm text-primary'>
                Already have an account?{' '}
                <Link
                  to='/sign-in'
                  className='text-sm text-teal-500 transition duration-200 ease-in-out  hover:text-teal-600 hover:underline'
                >
                  {' '}
                  Sign in
                </Link>
              </p>
              {/* <p className='text-sm text-dark'>Forgot password?</p> */}
            </div>
            <AuthButton>Sign up</AuthButton>
          </form>
          <GoogleButton />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
