import React from 'react';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import { useListingContext } from 'store/contexts';
import { displayPrice, mapEnumObject } from 'common/helpers';
import { floors } from 'common/lookup-data';

const ListingItem = ({ id, listing }) => {
  const { editListing, deleteListing } = useListingContext();
  const showFloor =
    listing.category === 'condo' ||
    listing.category === 'office' ||
    listing.category === 'apartment';

  const floorObj = mapEnumObject(listing.floor, floors);
  const offerStyle =
    'text-[#457b9d] mt-2 font-semibold line-through decoration-red-500';
  const regularStyle = 'text-[#457b9d] mx-2 mt-2 font-semibold';
  return (
    <div className='relative box-content mx-3 w-80 h-fit rounded-lg border border-gray-400'>
      <div className='z-0 m-0 w-fit'>
        <img
          className='rounded-t-lg'
          src={listing.imgUrls[0]}
          alt={listing.title}
        />
        {/* <img
              className='h-[200px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
              loading='lazy'
              src={listing.imgUrls[0]}
              alt={listing.title}
            /> */}
      </div>
      <div className='uppercase text-white bg-darker  px-4 py-1 text-xs rounded absolute top-3 right-3 z-10'>
        FOR {listing.type}
      </div>
      <div className='absolute w-12 h-12  bottom-60 right-3'>
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
        {listing.offer && (
          <p className={`${listing.offer ? offerStyle : regularStyle}`}>
            €{displayPrice(listing.regularPrice)}
          </p>
        )}
        <p className={`text-[#457b9d] mx-2 mt-2 font-semibold`}>
          €{listing.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
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
    </div>
  );
};

export default ListingItem;
