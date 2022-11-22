import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import logo from 'images/estatetify-app.svg';
import {
  AppIcon,
  FormInput,
  Label,
  PageHeader,
  TempImageUrl,
} from 'components';
import defaultStyles from 'common/config';
import { useAuth } from 'hooks/useAuth';
import { useListingContext, useProfileContext } from 'store/contexts';
import ListingItemList from 'components/ListingItemList';
import { toast } from 'react-toastify';

const initialValues = {
  fullName: '',
  email: '',
  mobile: '',
  avatar: '',
  avatarImg: null,
  imgUrl: '',
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { getProfileUser, updateUser, profileUser } = useProfileContext();
  const {
    handleUploadImageToStorage,
    deleteImageFromStorage,
    listings,
    getMyListings,
    isLoading,
  } = useListingContext();

  const [values, setValues] = useState(initialValues);
  const [isEditable, setEditable] = useState(false);

  const { fullName, mobile, email, avatar, avatarImg, imgUrl } = values;
  useEffect(() => {
    if (profileUser !== undefined) {
      setValues((preValues) => ({
        ...preValues,
        fullName: profileUser?.fullName,
        mobile: profileUser?.mobile,
        email: profileUser?.email,
        avatar: profileUser?.avatar,
      }));
    }
  }, [profileUser]);

  useEffect(() => {
    if (user !== undefined && user?.uid) getProfileUser(user?.uid);
    getMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files)
      setValues((preValues) => ({ ...preValues, avatarImg: e.target.files }));

    if (!e.target.files)
      setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete values.avatarImg;
    delete values.imgUrl;
    await updateUser(values);
  };

  const handleEditInfo = () => {
    setEditable((preVal) => !preVal);
  };

  const handleLogout = () => {
    logOut();
    navigate('/home');
  };

  const handleChangeAvatar = async () => {
    const avatarUrl = await Promise.all(
      [...avatarImg].map((aImg) => handleUploadImageToStorage(aImg))
    ).catch((error) => {
      console.log('😱 Error Add Avatar: ', error);
      toast.error('Avatar not uploaded!');
    });
    setValues((preValues) => ({
      ...preValues,
      imgUrl: avatarUrl[0],
      avatar: avatarUrl[0],
    }));
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteImageFromStorage(imgUrl);
      setValues((preValues) => ({ ...preValues, imgUrl: '', avatar: '' }));
      toast.success('Temporary avatar removed successfully');
    } catch (error) {
      console.log('😱 Error remove Avatar: ', error);
      toast.error('Temporary avatar was not removed!');
    }
  };

  return (
    <>
      <section className='max-w-md mx-auto px-2'>
        <PageHeader title='My Profile' />
        <div>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center'
          >
            <div className='w-48 h-48 rounded-full mb-6 mx-auto'>
              <img
                src={avatar || logo}
                alt='avatar'
                className='rounded-full w-48 h-48'
              />
              {/* <button
                onClick={handleToggleAvatar}
                type='button'
                className='flex justify-center items-center absolute px-3 py-0.5 bottom-0 -right-2 w-max rounded-xl bg-teal-500 hover:bg-teal-700 transition duration-150 ease-in-out active:bg-teal-800 text-white'
              >
                <AppIcon
                  Icon={
                    changeAvatar
                      ? defaultStyles.icons.cancel
                      : defaultStyles.icons.image_edit
                  }
                  className={`${changeAvatar ? 'text-red-500' : ''}`}
                />
                <span className={`ml-1 ${changeAvatar ? 'text-red-500' : ''}`}>
                  {changeAvatar ? 'Cancel' : 'Change'}
                </span>
              </button> */}
            </div>
            {isEditable && (
              <>
                <Label text='Change Avatar' className='mt-0' />{' '}
                <div className='flex items-center justify-between w-full'>
                  <div className='flex flex-col w-full'>
                    <label className='block'>
                      <span className='sr-only'>Choose Avatar</span>
                      <input
                        type='file'
                        name='avatarImg'
                        accept='.jpg,.png,.jpeg'
                        onChange={handleChange}
                        className='mt-3 mb-6 block w-fit text-sm text-gray-500 file:mr-4 file:py-3 file:px-7 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-dark file:text-white hover:file:bg-darker hover:file:shadow-lg transition duration-150 ease-in-out'
                      />
                    </label>
                  </div>
                  <button
                    onClick={handleChangeAvatar}
                    type='button'
                    className='flex justify-center items-center px-3 py-3 text-2xl rounded-xl bg-teal-500 hover:bg-teal-700 transition duration-150 ease-in-out active:bg-teal-800 text-white'
                  >
                    <AppIcon Icon={defaultStyles.icons.upload} />
                  </button>
                </div>
                {imgUrl && (
                  <TempImageUrl
                    handleDeleteImage={handleDeleteAvatar}
                    imgUrl={imgUrl}
                    className='rounded-full'
                  />
                )}
              </>
            )}
            <div
              className={`w-full ${isEditable ? 'space-y-3' : 'space-y-5'} `}
            >
              {isEditable && <Label text='Full Name' className='mt-0' />}
              <FormInput
                type='text'
                name='fullName'
                placeholder='Full Name'
                value={fullName}
                onChange={handleChange}
                className='placeholder:text-primary w-full'
                disabled={!isEditable}
              />
              {isEditable && <Label text='Mobile' className='mt-0' />}
              <FormInput
                type='text'
                name='mobile'
                placeholder='Mobile +...'
                value={mobile}
                onChange={handleChange}
                className='placeholder:text-primary w-full'
                disabled={!isEditable}
              />
              {isEditable && <Label text='Email' className='mt-0' />}
              <FormInput
                type='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={handleChange}
                className='w-full'
                disabled
              />
              <div className='h-1' />
              <Link
                to='/listings/add'
                className='flex justify-center items-center w-full px-7 py-3 bg-primary text-white font-medium text-sm uppercase rounded shadow-md hover:bg-darker hover:shadow-lg focus:bg-darker focus:shadow-lg active:bg-darker active:shadow-lg transition duration-150 ease-in-out'
              >
                <AppIcon
                  Icon={defaultStyles.icons.add_property}
                  className='text-light border-light border rounded-full p-1 text-xl'
                />
                <span className='ml-3'> Sell & rent a property</span>
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
            </div>
          </form>
        </div>
      </section>
      <>
        {!isLoading && listings.length > 0 && (
          <div className='mx-auto xl:mx-20 px-3 pt-6'>
            <PageHeader title='My Listings' />
            <ListingItemList listings={listings} />
          </div>
        )}
      </>
    </>
  );
};

export default Profile;
