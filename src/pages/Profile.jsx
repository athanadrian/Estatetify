import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import logo from 'images/estatetify-app.svg';
import { AppIcon, FormInput, Label, PageHeader, ListingItem } from 'components';
import defaultStyles from 'common/config';
import { useAuth } from 'hooks/useAuth';
import { useListingContext, useProfileContext } from 'store/contexts';

const initialValues = {
  fullName: '',
  email: '',
  avatar: '',
};

const Profile = () => {
  const { user, logOut } = useAuth();
  const { getProfileUser, updateUser, profileUser } = useProfileContext();
  const { listings, getMyListings, isLoading, deleteListing } =
    useListingContext();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [isEditable, setEditable] = useState(false);

  const { fullName, email, avatar } = values;
  useEffect(() => {
    if (profileUser !== undefined) {
      setValues((preValues) => ({
        ...preValues,
        fullName: profileUser?.fullName,
        email: profileUser?.email,
        avatar: profileUser?.avatar,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser]);

  useEffect(() => {
    if (user !== undefined) getMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user !== undefined) getProfileUser(user?.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(values);
  };

  const handleEditInfo = () => {
    setEditable((preVal) => !preVal);
  };

  const handleEditListing = (id) => {
    navigate(`/listings/edit/${id}`);
  };

  const handleDeleteListing = async (listing) => {
    if (
      window.confirm(
        `Are you sure you want to delete listing ${listing?.data?.title}`
      )
    ) {
      await deleteListing(listing);
    }
  };

  const handleLogout = () => {
    logOut();
    navigate('/home');
  };

  return (
    <>
      <section className='max-w-6xl flex flex-col justify-center items-center mx-auto'>
        <PageHeader text='Profile' />
        <div className='flex flex-col justify-center items-center gap-5 w-full md:w-[50%] mx-auto px-3 mt-6'>
          <form onSubmit={handleSubmit}>
            <div className='relative w-48 h-48 rounded-full mb-6 mx-auto'>
              <img
                src={avatar || logo}
                alt='avatar'
                className='w-full rounded-full'
              />
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
              value={fullName}
              onChange={handleChange}
              disabled={!isEditable}
            />
            <FormInput
              type='email'
              name='email'
              placeholder='Full Name'
              value={email}
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
      <div className='flex flex-col justify-center items-center max-w-6xl 2xl:max-w-full px-3 mt-6 mx-auto'>
        {!isLoading && listings.length > 0 && (
          <>
            <h2 className='text-2xl text-darker tracking-wider font-bold text-center mb-6'>
              My Listings
            </h2>
            <div className='flex justify-center items-center'>
              <ul className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full mx-auto'>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    id={listing?.id}
                    listing={listing?.data}
                    editListing={() => handleEditListing(listing?.id)}
                    deleteListing={() => handleDeleteListing(listing)}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
