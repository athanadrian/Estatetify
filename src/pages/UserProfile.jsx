import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Loader,
  PageHeader,
  ProfileCard,
  ListingsList,
  ContactModal,
} from 'components';
import { useListingContext, useProfileContext } from 'store/contexts';

const UserProfile = () => {
  const { ownerId } = useParams();
  const { getProfileUser, profileUser } = useProfileContext();
  const {
    listings,
    getListingsByUser,
    isLoading: isListingsLoading,
  } = useListingContext();

  useEffect(() => {
    if (ownerId) {
      getProfileUser(ownerId);
      getListingsByUser(ownerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  if (isListingsLoading) return <Loader />;
  return (
    <>
      <section className='max-w-6xl flex flex-col justify-center items-center mx-auto'>
        <PageHeader title='Owner Profile' />
        <ProfileCard profileUser={profileUser} className='w-2/3' />
      </section>
      <div className='mx-auto xl:mx-20 px-3 pt-6'>
        <>
          <PageHeader
            title={`Listings by ${profileUser?.fullName}`}
            view
            total={listings.length}
          />
          <ListingsList listings={listings} />
        </>
      </div>
      <ContactModal
        listing={{ title: 'in your listings' }}
        profile={profileUser}
      />
    </>
  );
};

export default UserProfile;
