import React, { useState } from 'react';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import { useListingContext } from 'store/contexts';
import { displayPrice, mapEnumObject } from 'common/helpers';
import { floors } from 'common/lookup-data';
import { useNavigate } from 'react-router';
import Moment from 'react-moment';

const ListingItem = ({ id, listing }) => {
  const navigate = useNavigate();
  const { editListing, deleteListing, logo } = useListingContext();
  const [showOwnerInfo, setShowOwnerInfo] = useState(false);
  const showFloor =
    listing.category === 'condo' ||
    listing.category === 'office' ||
    listing.category === 'apartment';

  const floorObj = mapEnumObject(listing.floor, floors);

  const offerStyle =
    'text-[#457b9d] mt-2 font-semibold line-through decoration-red-500';
  const regularStyle = 'text-[#457b9d] mx-2 mt-2 font-semibold';
  return (
    <li className='relative mx-3 w-80 h-fit rounded-lg border border-gray-400 m-[10px]'>
      <div
        className='z-0 m-0 h-[250px] w-full overflow-hidden cursor-pointer'
        onClick={() => navigate(`/listings/${listing.type}/${id}`)}
      >
        <img
          className=' overflow-hidden rounded-t-lg hover:scale-105 transition-scale duration-200 ease-in'
          src={listing.imgUrls.length > 0 ? listing.imgUrls[0] : logo}
          alt={listing.title}
          loading='lazy'
        />
      </div>
      <Moment
        fromNow
        className='uppercase text-white bg-primary  px-4 py-1 text-xs rounded absolute top-3 left-3 z-10 shadow-lg'
      >
        <div>{listing?.timestamp.toDate()}</div>
      </Moment>
      <div className='uppercase text-white bg-darker  px-4 py-1 text-xs rounded absolute top-3 right-3 z-10 shadow-lg'>
        FOR {listing.type}
      </div>
      {showOwnerInfo && (
        <div
          className={`${
            !showOwnerInfo
              ? ''
              : 'bg-transparent h-[120px] w-16 absolute bottom-[300px] -right-10 z-50'
          }`}
        >
          <div className='flex flex-col h-full justify-center items-center space-y-3 transition-transform duration-300 ease-in-out'>
            <div className='bg-primary text-white rounded-full w-[48px] h-[48px] justify-center items-center flex'>
              <AppIcon
                className='text-[26px] cursor-pointer'
                Icon={defaultStyles.icons.email}
              />
            </div>
            <AppIcon
              className='text-primary text-5xl cursor-pointer'
              Icon={defaultStyles.icons.info}
            />
          </div>
        </div>
      )}
      <div
        className='absolute w-12 h-12  bottom-60 right-3 cursor-pointer'
        onClick={() => setShowOwnerInfo(!showOwnerInfo)}
      >
        <img
          className='rounded-full shadow-sm'
          src={listing?.userPhoto}
          alt='Owner'
        />
      </div>
      <div className='px-3 py-5'>
        <h1 className='text-dark text-sm font-bold mb-3 truncate'>
          {listing.title}
        </h1>
        <div className='flex items-center space-x-1'>
          <AppIcon
            Icon={defaultStyles.icons.location}
            className='h-4 w-4 text-primary'
          />
          <p className='text-gray-400 text-xs font-medium truncate'>
            {listing?.geolocation?.address || listing.address}
          </p>
        </div>
      </div>
      <div className='flex flex-row px-3 pb-5 justify-start text-gray-400'>
        <div className='flex flex-col items-center justify-center text-lg font-medium'>
          <AppIcon Icon={defaultStyles.icons[listing.category]} />
          <p className='capitalize pt-1 text-xs'>{listing.category}</p>
        </div>
        <div className='flex flex-col items-center justify-center text-lg font-medium'>
          <AppIcon Icon={defaultStyles.icons.squareFeet} />
          <p className='mx-6 pt-1 text-xs'>
            {listing.squareFeet} m<sup>2</sup>
          </p>
        </div>
        {showFloor && (
          <div className='flex flex-col items-center justify-center text-lg font-medium'>
            <AppIcon Icon={defaultStyles.icons.floors} />
            <p className='pt-1 text-xs capitalize'>{floorObj.code} floor</p>
          </div>
        )}
      </div>
      <div className='flex flex-row px-3 pb-5 border-gray-400 border-b justify-between text-gray-400'>
        <div className='flex flex-col items-center justify-center text-lg font-medium'>
          <AppIcon Icon={defaultStyles.icons.rooms} />
          <p className='pt-1 text-xs capitalize'>
            {listing.rooms > 1 ? `${listing.rooms} rooms` : '1 room'}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center text-lg font-medium'>
          <AppIcon Icon={defaultStyles.icons.beds} />
          <p className='pt-1 text-xs capitalize'>
            {listing.beds > 1 ? `${listing.beds} beds` : '1 bed'}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center text-lg font-medium'>
          <AppIcon Icon={defaultStyles.icons.bathrooms} />
          <p className='pt-1 text-xs capitalize'>
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : '1 bath'}
          </p>
        </div>
        {listing.parking && (
          <div className='flex flex-col items-center justify-center text-lg font-medium'>
            <AppIcon Icon={defaultStyles.icons.warehouse} />
            <p className='pt-1 text-xs'>{listing.parking} Garage</p>
          </div>
        )}
      </div>
      <div className='flex flex-row justify-start px-3 py-3 items-center'>
        <p className={`${listing.offer ? offerStyle : regularStyle}`}>
          €{displayPrice(listing.regularPrice)}
        </p>

        {listing.offer && (
          <p className={`text-[#457b9d] mx-2 mt-2 font-semibold`}>
            €
            {listing.offerPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
        )}
        <span className='text-[#457b9d] mt-2 font-semibold'>
          {listing.type === 'rent' && ' / month'}
        </span>
        <div className='text-light'>
          {deleteListing && (
            <AppIcon
              Icon={defaultStyles.icons.delete}
              className='absolute bottom-4 right-2 h-4 cursor-pointer text-red-500'
              onClick={() => deleteListing(listing.id)}
            />
          )}
          {editListing && (
            <AppIcon
              Icon={defaultStyles.icons.edit}
              className='absolute bottom-4 right-7 h-4 cursor-pointer text-dark'
              onClick={() => editListing(listing.id)}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default ListingItem;
