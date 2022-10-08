import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import logo from 'images/estatetify-app.svg';
import { AppIcon, FormInput } from 'components';
import defaultStyles from 'common';
import { useAuth } from 'hooks/useAuth';

const Profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  console.log('user', user);
  const initialValues = {
    fullName: '',
    email: '',
  };
  const [values, setValues] = useState(initialValues);
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    if (user)
      setValues((preValues) => ({
        ...preValues,
        fullName: user?.displayName,
        email: user?.email,
      }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditInfo = () => {
    setEditable((preVal) => !preVal);
  };

  const handleLogout = () => {
    logOut();
    navigate('/home');
  };

  return (
    <section className='max-w-6xl flex flex-col justify-center items-center mx-auto'>
      <h1 className='text-3xl font-bold text-center mt-6'>Profile</h1>
      <div className='flex flex-col justify-center items-center gap-5 w-full md:w-[50%] mx-auto px-3 mt-6'>
        <form onSubmit={handleSubmit}>
          <div
            src={logo}
            className='relative w-48 h-48 rounded-full mb-6 mx-auto'
          >
            <img src={user?.photoURL || logo} alt='' />
            <button className='flex justify-center items-center absolute px-3 py-0.5 bottom-0 -right-2 w-max rounded-xl bg-teal-500 hover:bg-teal-700 transition duration-150 ease-in-out active:bg-teal-800 text-white'>
              <AppIcon Icon={defaultStyles.icons.image_edit} />
              <span className='ml-1'>change</span>
            </button>
          </div>
          <FormInput
            type='text'
            name='fullName'
            placeholder='Full Name'
            value={values.fullName}
            onChange={handleChange}
            disabled={!isEditable}
          />
          <FormInput
            type='email'
            name='email'
            placeholder='Full Name'
            value={values.email}
            onChange={handleChange}
            className='mt-6'
            disabled
          />
          <button
            type='submit'
            className='block bg-blue-500 px-4 py-2 text-lg mt-6 text-center text-white rounded w-full shadow-md font-medium uppercase hover:bg-blue-700 transition duration-1000 ease-in-out hover:shadow-lg active:bg-blue-800'
          >
            Update profile
          </button>
          <div className='flex flex-row justify-between w-full mt-3'>
            <p className='text-md text-primary'>
              Update your info?
              <span
                className='text-teal-500 hover:text-teal-700 hover:underline cursor-pointer ml-1 transition duration-150 ease-in-out'
                onClick={handleEditInfo}
              >
                {isEditable ? 'Cancel' : 'Edit'}
              </span>
            </p>
            <p
              className='text-md text-red-500 cursor-pointer hover:underline hover:text-red-700 transition duration-150 ease-in-out'
              onClick={handleLogout}
            >
              Sign out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
