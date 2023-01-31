import React, { useEffect } from 'react';
import { Layout, AppIcon } from 'components';
import {
  useListingContext,
  useProfileContext,
  useSubscriptionContext,
} from 'store/contexts';
import defaultStyles from 'common/config';
import { groupedListingsByKey, mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { checkForMyActiveSubscriptions, currentTopActiveSubscription } =
    useSubscriptionContext();
  const { myProfile } = useProfileContext();
  const { getMySubscriptions, subscriptions } = useSubscriptionContext();
  const { getMyListings, listings } = useListingContext();
  const { txtColor } = mapEnumObject(myProfile?.role, roles);

  useEffect(() => {
    checkForMyActiveSubscriptions();
    getMySubscriptions();
    getMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryListings = groupedListingsByKey('category', listings);
  const typeListings = groupedListingsByKey('type', listings);
  const offerListings = listings.filter((listing) => listing.offer).length;
  const {
    subscriptionId,
    createdDate,
    expiringDate,
    relativeDays,
    subscriptionListings,
    listingsLeft,
    planListings,
  } = currentTopActiveSubscription;
  const leftPercentage = 100 - (listingsLeft * 100) / planListings;
  const getYearDate = (date) => date.substr(date.length - 4);
  //cl
  return (
    <Layout>
      <div className='px-6 pt-6 2xl:container'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Link
            to={`/${myProfile?.role}/listings`}
            className='md:col-span-2 lg:col-span-1'
          >
            <div className='h-full py-8 px-6 space-y-4 rounded-xl border border-gray-300 bg-white'>
              <div className='flex justify-center mx-auto'>
                <AppIcon
                  Icon={defaultStyles.icons.listings}
                  size={60}
                  className={txtColor}
                />
              </div>
              <div>
                <h5 className='text-xl text-gray-600 text-center'>Listings</h5>
                <div className='mt-2 flex justify-center gap-4'>
                  <h3 className='text-3xl font-bold text-gray-700'>
                    {listings?.length} total
                  </h3>
                </div>
                <span className='block text-center text-gray-500'>
                  listed properties
                </span>
              </div>
              <table className='w-full text-gray-600'>
                <tbody>
                  {typeListings.map((listing, index) => (
                    <tr key={index}>
                      <td className='py-2'>
                        <div className='flex items-center'>
                          <AppIcon
                            Icon={defaultStyles.icons[listing?.key]}
                            size={20}
                            className='mr-2 text-primary'
                          />
                          For {listing?.key}
                        </div>
                      </td>
                      <td className='text-gray-500'>{listing?.count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className='py-2'>
                      <div className='flex items-center'>
                        <AppIcon
                          Icon={defaultStyles.icons.offers}
                          size={20}
                          className='mr-2 text-primary'
                        />
                        Offers
                      </div>
                    </td>
                    <td className='text-gray-500'>{offerListings}</td>
                  </tr>
                  <tr>
                    <td className='py-2'>
                      <div className='flex items-center'>
                        <AppIcon
                          Icon={defaultStyles.icons.subscriptions}
                          size={20}
                          className='mr-2 text-primary'
                        />
                        Current Plan
                      </div>
                    </td>
                    <td className='text-gray-500'>{subscriptionListings}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Link>
          <Link
            to={`/${myProfile?.role}/subscriptions/${subscriptionId}`}
            className='h-full py-6 px-6 rounded-xl border border-gray-200 bg-white'
          >
            <div className='flex desktop:flex-row justify-between items-center md:flex-col'>
              <div className='flex justify-start items-center space-x-3'>
                <AppIcon
                  Icon={defaultStyles.icons.subscriptions}
                  size={40}
                  className={txtColor}
                />
                <h5 className='text-xl text-gray-700'>Subscriptions</h5>
              </div>
              <p className='text-xl'>
                Total{' '}
                <span className={`font-bold ${txtColor}`}>
                  {subscriptions?.length}
                </span>
              </p>
            </div>
            <div className='my-6'>
              <div className='text-lg text-darker font-semibold'>Usage</div>
              <div className='mt-2 flex justify-center gap-4'>
                <h1 className='text-5xl font-bold text-gray-700'>
                  {leftPercentage}%
                </h1>
                <div className='flex items-end gap-1 '>
                  <span className='text-green-500'>{listingsLeft}</span> /
                  <span className='text-darker'>{planListings}</span>
                </div>
              </div>
              <span className='text-gray-500'>
                listings used of current subscription
              </span>
            </div>
            <h5 className='text-lg text-left text-green-500 font-semibold border-b border-dashed border-green-500 pb-1'>
              Current Subscription
            </h5>
            <table className='mt-3 -mb-2 w-full text-gray-600'>
              <tbody>
                <tr>
                  <td className='py-2'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.created_date}
                        size={20}
                        className='mr-2 text-primary'
                      />
                      Issued:
                    </div>
                  </td>
                  <td className='text-gray-500'>{getYearDate(createdDate)}</td>
                </tr>
                <tr>
                  <td className='py-2'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.expiring_date}
                        size={20}
                        className='mr-2 text-primary'
                      />
                      <span>Expiring:</span>
                    </div>
                  </td>
                  <td className='py-2 text-gray-500'>
                    {getYearDate(expiringDate)}
                  </td>
                </tr>
                <tr>
                  <td className='py-2'>
                    <div className='flex items-center'>
                      <AppIcon
                        Icon={defaultStyles.icons.elapsed_days}
                        size={20}
                        className='mr-2 text-primary'
                      />
                      Started:
                    </div>
                  </td>
                  <td className='text-gray-500'>
                    {relativeDays.elapsedDays === 0
                      ? ' today'
                      : relativeDays.elapsedDays === 1
                      ? ' a day ago'
                      : ` ${relativeDays.elapsedDays} days ago`}
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
          <Link to='/profile'>
            <div className='lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-dark'>
              <div className='mb-2 flex justify-center'>
                <ProfileAvatar profile={myProfile} />
              </div>
              <>
                <div className='w-full text-center text-gray-700 font-semibold relative pt-3 md:pt-0'>
                  <div className='text-2xl text-white leading-tight'>
                    {myProfile?.fullName}
                  </div>
                  <div
                    className={`capitalize text-2xl ${txtColor} leading-tight`}
                  >
                    {myProfile?.role}
                  </div>
                  <p className='mt-1 text-base text-gray-300 hover:text-gray-400 cursor-pointer'>
                    <span className='border-b border-dashed border-gray-500 pb-1'>
                      {myProfile?.email}
                    </span>
                  </p>
                  <p className='mt-1 text-base text-gray-300 hover:text-gray-400 cursor-pointer'>
                    <span className='border-b border-dashed border-gray-500 pb-1'>
                      {myProfile?.mobile}
                    </span>
                  </p>
                  <div className='mt-3'>
                    <h1 className='w-full text-2xl font-bold text-primary'>
                      Contact via
                    </h1>
                    <SocialOwnerButtons profileUser={myProfile} />
                  </div>
                  <div className='text-sm text-gray-300 pt-1 md:pt-0'>
                    Joined:
                    <Moment
                      fromNow
                      className='ml-1 text-sm font-bold text-light hover:text-gray-400 border-b border-dashed border-gray-500 pb-1'
                    >
                      {myProfile?.timestamp.toDate()}
                    </Moment>
                  </div>
                </div>
              </>
            </div>
          </Link>
        </div>
      </div>
      <div className='px-6 pt-6 2xl:container w-full'>
        <ListingsCategoryCards
          txtColor={txtColor}
          categoryListings={categoryListings}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;

const SocialOwnerButtons = ({ profileUser }) => {
  return (
    <ul className='flex justify-center gap-3.5 my-1 text-gray-300 tablet:pb-4'>
      <li className='w-7 h-7 p-4 rounded bg-primary text-light flex items-center justify-center text-2xl'>
        <AppIcon tooltip='Email ©' Icon={defaultStyles.icons.email} />
      </li>
      {profileUser?.call && (
        <li className='w-7 h-7 p-4 rounded bg-yellow-700 text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='Mobile ©' Icon={defaultStyles.icons.call} />
        </li>
      )}
      {profileUser?.sms && (
        <li className='w-7 h-7 p-4 rounded bg-black text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='SMS ©' Icon={defaultStyles.icons.sms} />
        </li>
      )}
      {profileUser?.viber && (
        <li className='w-7 h-7 p-4 rounded bg-purple-700 text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='Viber ©' Icon={defaultStyles.icons.viber} />
        </li>
      )}
      {profileUser?.whatsApp && (
        <li className='w-7 h-7 p-4 rounded bg-green-700 text-light flex items-center justify-center text-2xl'>
          <AppIcon tooltip='WhatsApp ©' Icon={defaultStyles.icons.whatsApp} />
        </li>
      )}
    </ul>
  );
};

const ProfileAvatar = ({ profile, className, onClick, size = 24 }) => {
  const role = profile?.role;
  const { brdColor, txtColor } = mapEnumObject(role, roles);

  return (
    <div className='relative' onClick={onClick}>
      {profile?.avatar ? (
        <div>
          <img
            className={`relative rounded-full shadow-sm w-28 h-28 p-0.5 border ${brdColor}`}
            src={profile?.avatar}
            alt={profile?.fullName ?? 'Owner'}
            title={profile?.fullName ?? 'Owner'}
          />
          <span className={`absolute ${txtColor} top-0 right-2`}>
            <AppIcon Icon={defaultStyles.icons.star} />
          </span>
        </div>
      ) : (
        <div
          className={`relative bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border ${brdColor}`}
        >
          <span className={`absolute ${txtColor} top-0 -right-1`}>
            <AppIcon Icon={defaultStyles.icons.star} />
          </span>
          <div
            className={`bg-light w-full h-full ${txtColor} flex justify-center items-center rounded-full`}
          >
            <AppIcon
              size={size}
              Icon={defaultStyles.icons.profile}
              tooltip={profile?.fullName ?? 'owner'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ListingsCategoryCards = ({ categoryListings, txtColor }) => {
  return (
    <>
      <div className='content grid grid-cols-2 desktop:grid-cols-5 mt-3 gap-8'>
        {categoryListings.map((listing, index) => (
          <ListingsCategoryCard
            key={index}
            category={listing.key}
            quantity={listing?.count}
            txtColor={txtColor}
          />
        ))}
      </div>
    </>
  );
};

const ListingsCategoryCard = ({ category, quantity, txtColor }) => {
  return (
    <div className='text-center p-8 cursor-pointer rounded-md shadow-[0_0_20px_0_rgba(112,121,138,0.2)]'>
      <div className='flex justify-center'>
        <AppIcon
          className='text-primary'
          size={48}
          Icon={defaultStyles.icons[category]}
        />
      </div>
      <h4 className='mt-2 capitalize font-semibold tracking-wider'>
        {category}
      </h4>
      <label>
        <span className={`${txtColor} font-semibold`}>{quantity}</span> listings
      </label>
    </div>
  );
};
