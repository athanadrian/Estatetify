import React from 'react';

const ListingItem = ({ id, listing }) => {
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
    </div>
  );
};

export default ListingItem;
