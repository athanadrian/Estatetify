import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import logo from 'images/estatetify-app.svg';
import { AppIcon, FormInput, Label, PageHeader } from 'components';
import defaultStyles from 'common';
import { useAuth } from 'hooks/useAuth';
import { updateProfile, doc, db, updateDoc } from 'firebase.config';

const initialValues = {
  fullName: '',
  email: '',
};

const Profile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    if (user)
      setValues((preValues) => ({
        ...preValues,
        fullName: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        user?.displayName !== values.fullName ||
        user?.photoURL !== values.avatar
      ) {
        // update data firebase/auth
        await updateProfile(user, {
          displayName: values.fullName,
          photoURL: values.avatar,
        });
        // update data in firestore

        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, {
          displayName: values.fullName,
          photoURL: values.avatar,
        });
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.log('😱 Error Profile: ', error.message);
      toast.error('😱 Error: ', error.message);
    }
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
      <PageHeader text='Profile' />
      <div className='flex flex-col justify-center items-center gap-5 w-full md:w-[50%] mx-auto px-3 mt-6'>
        <form onSubmit={handleSubmit}>
          <div
            src={logo}
            className='relative w-48 h-48 rounded-full mb-6 mx-auto'
          >
            <img src={values.avatar || logo} alt='' />
            <button
              type='button'
              className='flex justify-center items-center absolute px-3 py-0.5 bottom-0 -right-2 w-max rounded-xl bg-teal-500 hover:bg-teal-700 transition duration-150 ease-in-out active:bg-teal-800 text-white'
            >
              <AppIcon Icon={defaultStyles.icons.image_edit} />
              <span className='ml-1'>change</span>
            </button>
          </div>
          {isEditable && <Label text='Full Name' />}
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
          <Link
            to='/listings/add'
            className='flex justify-center items-center bg-blue-500 px-4 py-2 text-md mt-6 text-center text-light rounded w-full shadow-md font-medium capitalize hover:bg-blue-700 transition duration-1000 ease-in-out hover:shadow-lg active:bg-blue-800'
          >
            <AppIcon
              Icon={defaultStyles.icons.add_property}
              //size={28}
              className='text-light border-light border rounded-full p-1 text-xl'
            />
            <span className='ml-1'> Sell & rent a property</span>
          </Link>
          <div className='flex flex-row justify-between w-full mt-3 whitespace-nowrap'>
            <p className='flex justify-center items-center text-md text-primary'>
              Update your info?
              <span
                className='flex justify-center items-center text-teal-500 hover:text-teal-700 hover:underline cursor-pointer ml-1 transition duration-150 ease-in-out'
                onClick={(e) => {
                  isEditable && handleSubmit(e);
                  handleEditInfo();
                }}
              >
                {isEditable ? 'Save' : 'Edit'}
                {isEditable ? (
                  <AppIcon
                    Icon={defaultStyles.icons.save}
                    link
                    nav
                    className='ml-1'
                  />
                ) : (
                  <AppIcon
                    Icon={defaultStyles.icons.edit}
                    link
                    nav
                    className='ml-1'
                  />
                )}
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
