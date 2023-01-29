import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import logo from 'images/estatetify-app.svg';
import {
  AppIcon,
  FormInput,
  Label,
  PageHeader,
  TempImageUrl,
  ListingsList,
  ProfileModal,
} from 'components';
import defaultStyles from 'common/config';
import {
  useAuthContext,
  useCommonContext,
  useListingContext,
  useProfileContext,
} from 'store/contexts';

const initialValues = {
  fullName: '',
  email: '',
  mobile: '',
  avatar: '',
  role: '',
  avatarImg: null,
  imgUrl: '',
  call: false,
  sms: false,
  viber: false,
  whatsApp: false,
};

const Profile = () => {
  const navigate = useNavigate();
  const { logOut } = useAuthContext();
  const {
    updateUser,
    myProfile,
    isLoading: isProfileLoading,
  } = useProfileContext();
  const {
    handleUploadImageToStorage,
    deleteImageFromStorage,
    listings,
    getMyListings,
    isLoading,
  } = useListingContext();
  const { openProfileModal } = useCommonContext();

  const [values, setValues] = useState(initialValues);
  const [isEditable, setEditable] = useState(false);
  const {
    fullName,
    mobile,
    email,
    avatar,
    avatarImg,
    imgUrl,
    call,
    sms,
    viber,
    whatsApp,
  } = values;
  useEffect(() => {
    if (myProfile !== undefined) {
      setValues((preValues) => ({
        ...preValues,
        fullName: myProfile?.fullName,
        mobile: myProfile?.mobile,
        email: myProfile?.email,
        avatar: myProfile?.avatar,
        role: myProfile?.role,
        sms: myProfile?.sms,
        call: myProfile?.call,
        viber: myProfile?.viber,
        whatsApp: myProfile?.whatsApp,
      }));
    }
  }, [myProfile]);
  useEffect(() => {
    getMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files)
      setValues((preValues) => ({ ...preValues, avatarImg: e.target.files }));

    if (!e.target.files)
      setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setValues((preValues) => ({ ...preValues, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete values.avatarImg;
    delete values.imgUrl;
    await updateUser({ ...values, uid: myProfile?.uid });
  };

  const handleEditInfo = () => {
    setEditable((preVal) => !preVal);
  };

  const handleLogout = async () => {
    await logOut();
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

  //if (isProfileLoading) return <Loader />;
  return (
    <>
      {!isProfileLoading && myProfile && (
        <section className='max-w-md mx-auto px-2'>
          <PageHeader title='My Profile' />
          <div>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col justify-center items-center'
            >
              <div className='relative w-48 h-48 rounded-full mb-6 mx-auto'>
                <img
                  src={avatar || logo}
                  alt='avatar'
                  className='rounded-full w-48 h-48'
                />
                <button
                  onClick={openProfileModal}
                  type='button'
                  className='flex justify-center items-center absolute px-3 py-1 bottom-0 left-32 w-max rounded bg-dark hover:bg-darker transition duration-150 ease-in-out active:bg-teal-800 text-white'
                >
                  <AppIcon Icon={defaultStyles.icons.profile} />
                  <span className='ml-2 text-light'>My eCard</span>
                </button>
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
                  className='placeholder:text-gray-500 w-full'
                  disabled={!isEditable}
                />
                {isEditable && <Label text='Mobile' className='mt-0' />}
                <FormInput
                  type='text'
                  name='mobile'
                  placeholder='mobile (+country code)'
                  value={mobile}
                  onChange={handleChange}
                  className='placeholder:text-gray-500 w-full'
                  disabled={!isEditable}
                />
                {isEditable && (
                  <>
                    <Label text='Contact Via' className='mb-0' />
                    <p className='text-gray-400'>
                      The mobile you register will be used for your contact apps
                    </p>
                  </>
                )}
                <div
                  className={`flex justify-between px-4 py-2 rounded ${
                    !isEditable
                      ? ' cursor-not-allowed bg-gray-300 text-dark'
                      : ' bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <SocialCheckBox
                    label='Call'
                    name='call'
                    disabled={!isEditable}
                    onChange={handleChecked}
                    checked={call}
                    value={call}
                  />
                  <SocialCheckBox
                    label='SMS'
                    name='sms'
                    disabled={!isEditable}
                    onChange={handleChecked}
                    checked={sms}
                    value={sms}
                  />
                  <SocialCheckBox
                    label='Viber'
                    name='viber'
                    disabled={!isEditable}
                    onChange={handleChecked}
                    checked={viber}
                    value={viber}
                  />
                  <SocialCheckBox
                    label='WhatsApp'
                    name='whatsApp'
                    disabled={!isEditable}
                    onChange={handleChecked}
                    checked={whatsApp}
                    value={whatsApp}
                  />
                </div>
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
                        <>
                          <AppIcon
                            Icon={defaultStyles.icons.save}
                            link
                            nav
                            className='ml-0.5'
                          />
                        </>
                      ) : (
                        <AppIcon
                          Icon={defaultStyles.icons.edit}
                          link
                          nav
                          className='ml-1'
                        />
                      )}
                    </span>
                    {isEditable && (
                      <span
                        onClick={handleEditInfo}
                        className='ml-3 cursor-pointer text-red-500 flex justify-center items-center'
                      >
                        Cancel
                        <AppIcon
                          Icon={defaultStyles.icons.cancel}
                          link
                          nav
                          className='ml-0.5'
                        />
                      </span>
                    )}
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
      )}
      <>
        {!isLoading && listings.length > 0 && (
          <div className='mx-auto xl:mx-20 px-3 pt-6'>
            <PageHeader title='My Listings' view total={listings.length} />
            <ListingsList listings={listings} />
          </div>
        )}
      </>
      <ProfileModal owner profileUser={myProfile} />
    </>
  );
};

export default Profile;

const SocialCheckBox = ({
  label,
  name,
  checked,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className='block '>
      <div className='mt-2'>
        <label className='inline-flex items-center'>
          <input
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
            type='checkbox'
            disabled={disabled}
            className='w-4 h-4'
          />
          <span className='ml-2'>{label}</span>
        </label>
      </div>
    </div>
  );
};
